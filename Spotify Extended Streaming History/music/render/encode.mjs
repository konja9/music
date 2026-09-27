// Turn recorded/rendered PCM (render/out/<stem>.pcm + .json) into the published audio:
//   trims to the song, checks for dropouts, matches loudness across songs, encodes MP3, writes waveform peaks.
// Usage (from music/): LAMEJS=/path/to/node_modules/@breezystack/lamejs/dist/lamejs.js node render/encode.mjs [stem ...]
// lamejs (LGPL) is only used here, on the build machine; install it outside the repo (see README).
// Output: audio/<stem>.mp3, audio/<stem>.peaks.json
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IN = path.join(ROOT, "render", "out"), OUT = path.join(ROOT, "audio");
if (!process.env.LAMEJS) throw new Error("LAMEJS に @breezystack/lamejs の dist/lamejs.js のパスを指定してください");
const lamejs = await import(pathToFileURL(process.env.LAMEJS).href);
fs.mkdirSync(OUT, { recursive: true });

const TARGET_DB = -16;      // gated loudness target (mean power of 400 ms blocks, like LUFS without the K-filter)
const CEIL = 0.89;          // -1 dBFS
const KNEE = 0.7;           // soft limiter starts here
const KBPS = 192, PEAKS = 800;

const want = process.argv.slice(2);
const stems = fs.readdirSync(IN).filter(f => f.endsWith(".json")).map(f => f.slice(0, -5)).filter(s => !want.length || want.includes(s)).sort();
const db = x => 20 * Math.log10(Math.max(x, 1e-9));

for (const stem of stems) {
  const meta = JSON.parse(fs.readFileSync(path.join(IN, stem + ".json"), "utf8"));
  const raw = fs.readFileSync(path.join(IN, stem + ".pcm"));
  const all = new Int16Array(raw.buffer, raw.byteOffset, raw.length / 2);
  const sr = meta.sampleRate;
  const start = meta.originFrame ?? 0;
  const n = Math.min(Math.round(meta.lengthSec * sr), all.length / 2 - start);
  const L = new Float32Array(n), R = new Float32Array(n);
  for (let i = 0; i < n; i++) { L[i] = all[2 * (start + i)] / 32768; R[i] = all[2 * (start + i) + 1] / 32768; }

  // dropouts: exact-zero runs over 10 ms right after audible sound (inside the song, away from the ends)
  const drops = [];
  for (let i = sr, run = 0; i < n - 2 * sr; i++) {
    if (L[i] === 0 && R[i] === 0) run++;
    else { if (run > sr / 100) { let p = 0; for (let k = i - run - Math.round(sr / 10); k < i - run; k++) p += L[k] * L[k]; if (Math.sqrt(p / (sr / 10)) > 0.01) drops.push(+((i - run) / sr).toFixed(2)); } run = 0; }
  }

  // gated loudness
  const blk = Math.round(0.4 * sr), hop = Math.round(0.1 * sr), pw = [];
  for (let i = 0; i + blk <= n; i += hop) { let s = 0; for (let k = i; k < i + blk; k++) s += (L[k] * L[k] + R[k] * R[k]) / 2; pw.push(s / blk); }
  const abs = pw.filter(p => db(Math.sqrt(p)) > -50), mean0 = abs.reduce((a, b) => a + b, 0) / Math.max(1, abs.length);
  const rel = abs.filter(p => p > mean0 / 10), loud = db(Math.sqrt(rel.reduce((a, b) => a + b, 0) / Math.max(1, rel.length)));
  const gain = 10 ** ((TARGET_DB - loud) / 20);

  // gain + soft limiter above the knee, never over the ceiling
  let peakIn = 0, limited = 0;
  const lim = x => { const a = Math.abs(x); if (a <= KNEE) return x; limited++; return Math.sign(x) * (KNEE + (CEIL - KNEE) * Math.tanh((a - KNEE) / (CEIL - KNEE))); };
  for (let i = 0; i < n; i++) { peakIn = Math.max(peakIn, Math.abs(L[i] * gain), Math.abs(R[i] * gain)); L[i] = lim(L[i] * gain); R[i] = lim(R[i] * gain); }

  // MP3
  const enc = new lamejs.Mp3Encoder(2, sr, KBPS), parts = [], CH = 1152;
  const l16 = new Int16Array(n), r16 = new Int16Array(n);
  for (let i = 0; i < n; i++) { l16[i] = Math.round(L[i] * 32767); r16[i] = Math.round(R[i] * 32767); }
  for (let i = 0; i < n; i += CH) { const b = enc.encodeBuffer(l16.subarray(i, i + CH), r16.subarray(i, i + CH)); if (b.length) parts.push(Buffer.from(b)); }
  const tail = enc.flush(); if (tail.length) parts.push(Buffer.from(tail));
  const mp3 = Buffer.concat(parts);
  fs.writeFileSync(path.join(OUT, stem + ".mp3"), mp3);

  // waveform peaks (max |x| per bucket, 0..1)
  const peaks = [];
  for (let b = 0; b < PEAKS; b++) { let m = 0; for (let i = Math.floor(b * n / PEAKS); i < Math.floor((b + 1) * n / PEAKS); i++) m = Math.max(m, Math.abs(L[i]), Math.abs(R[i])); peaks.push(+m.toFixed(3)); }
  fs.writeFileSync(path.join(OUT, stem + ".peaks.json"), JSON.stringify({ duration: +(n / sr).toFixed(3), peaks }));

  let peakOut = 0; for (let i = 0; i < n; i++) peakOut = Math.max(peakOut, Math.abs(L[i]), Math.abs(R[i]));
  console.log(`${stem}: ${(n / sr).toFixed(1)}s  loudness ${loud.toFixed(1)} dB -> ${TARGET_DB} (gain ${db(gain).toFixed(1)} dB)  peak ${db(peakIn).toFixed(1)} -> ${db(peakOut).toFixed(1)} dBFS  limited ${(100 * limited / (2 * n)).toFixed(2)}%  mp3 ${(mp3.length / 1048576).toFixed(1)}MB  dropouts ${drops.length ? drops.join(",") : "none"}`);
}
