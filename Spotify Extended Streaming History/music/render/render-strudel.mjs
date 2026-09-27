// Render the Strudel songs (songs/NN-id.strudel.js) offline to WAV with Strudel's renderPatternAudio,
// then store them as render/out/<stem>.pcm + .json for render/encode.mjs.
// Usage (from music/):
//   STRUDEL=/path/to/node_modules/@strudel/web/dist/index.mjs PLAYWRIGHT=$(npm root -g)/playwright node render/render-strudel.mjs [id ...]
// Strudel (AGPL) runs only here on the build machine; install it outside the repo (npm i @strudel/web@1.3.0).
// Samples from samples/ are registered under names mini-notation can read (no "-"):
//   pitched folders keep their name (piano, harp, bass-electric -> basselectric, guitar-nylon -> guitarnylon ...)
//   tr808/bd-long.wav -> bdlong, hat-closed -> hh, hat-open -> oh ...   voice/end-of-track.wav -> vendoftrack ...
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "render", "out"), SAMPLE_DIR = path.join(ROOT, "samples");
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
if (!process.env.STRUDEL) throw new Error("STRUDEL に @strudel/web の dist/index.mjs のパスを指定してください");
fs.mkdirSync(OUT, { recursive: true });

// ---------- the sample map Strudel sees ----------
export const TR808_NAMES = { "hat-closed": "hh", "hat-open": "oh" };
export function sampleMap() {
  const map = {};
  for (const inst of fs.readdirSync(SAMPLE_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
    for (const f of fs.readdirSync(path.join(SAMPLE_DIR, inst))) {
      const note = /^([A-G])(s?)(-?\d)\.(mp3|wav)$/.exec(f), named = /^([a-z0-9-]+)\.(mp3|wav)$/.exec(f);
      if (note) { const k = inst.replace(/-/g, ""); (map[k] ||= {})[note[1] + (note[2] ? "#" : "") + note[3]] = `${inst}/${f}`; }
      else if (named) {
        const name = inst === "tr808" ? (TR808_NAMES[named[1]] || named[1].replace(/-/g, "")) : inst === "voice" ? "v" + named[1].replace(/-/g, "") : inst + named[1].replace(/-/g, "");
        map[name] = [`${inst}/${f}`];
      }
    }
  }
  return map;
}

// ---------- songs ----------
export function loadStrudelSongs() {
  return fs.readdirSync(path.join(ROOT, "songs")).filter(f => /^\d{2,}-[\w-]+\.strudel\.js$/.test(f)).sort().map(f => {
    let song; new Function("SONG", fs.readFileSync(path.join(ROOT, "songs", f), "utf8"))(s => { song = s; });
    return { stem: f.replace(/\.strudel\.js$/, ""), song };
  });
}

// ---------- WAV (as written by Strudel) -> Int16 stereo interleaved ----------
function wavToPcm(buf) {
  let o = 12, fmt, data;
  while (o < buf.length) { const id = buf.toString("ascii", o, o + 4), size = buf.readUInt32LE(o + 4); if (id === "fmt ") fmt = { ch: buf.readUInt16LE(o + 10), sr: buf.readUInt32LE(o + 12), bits: buf.readUInt16LE(o + 22), tag: buf.readUInt16LE(o + 8) }; if (id === "data") data = buf.subarray(o + 8, o + 8 + size); o += 8 + size + (size % 2); }
  const frames = data.length / (fmt.bits / 8) / fmt.ch, out = new Int16Array(frames * 2);
  for (let i = 0; i < frames; i++) for (let c = 0; c < 2; c++) {
    const k = i * fmt.ch + Math.min(c, fmt.ch - 1);
    const v = fmt.bits === 16 ? data.readInt16LE(k * 2) / 32768 : fmt.bits === 32 && fmt.tag === 3 ? data.readFloatLE(k * 4) : data.readInt32LE(k * 4) / 2147483648;
    out[i * 2 + c] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
  }
  return { pcm: Buffer.from(out.buffer), sr: fmt.sr, frames };
}

// render one pattern (code string) for `cycles` bars at `cps`; returns { pcm, sr, frames, errors }
export async function renderCode(browser, code, cps, cycles, name = "render") {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.route("**/*", async route => {
    const u = new URL(route.request().url());
    if (u.hostname !== "local.render") return route.fulfill({ status: 404, body: "" });
    if (u.pathname === "/strudel.html") return route.fulfill({ contentType: "text/html; charset=utf-8", body: `<!doctype html><meta charset="utf-8"><script type="module">import * as S from "/strudel/index.mjs"; window.S = S; window.ready = true;</script>` });
    if (u.pathname.startsWith("/strudel/")) { const p = path.join(path.dirname(process.env.STRUDEL), u.pathname.slice(9)); if (fs.existsSync(p)) return route.fulfill({ body: fs.readFileSync(p), contentType: "application/javascript" }); }
    if (u.pathname.startsWith("/samples/")) { const p = path.join(SAMPLE_DIR, decodeURIComponent(u.pathname.slice(9))); if (fs.existsSync(p)) return route.fulfill({ body: fs.readFileSync(p), contentType: p.endsWith(".wav") ? "audio/wav" : "audio/mpeg" }); }
    return route.fulfill({ status: 404, body: "" });
  });
  await page.goto("https://local.render/strudel.html");
  await page.waitForFunction(() => window.ready);
  const download = page.waitForEvent("download", { timeout: 600000 });
  await page.evaluate(async ({ code, cps, cycles, map, name }) => {
    await S.initStrudel({ prebake: () => S.samples(map, "https://local.render/samples/") });
    const pattern = await S.evaluate(code, false);
    await S.renderPatternAudio(pattern, cps, 0, cycles, 44100, 256, false, name);
  }, { code, cps, cycles, map: sampleMap(), name });
  const d = await download;
  const wav = fs.readFileSync(await d.path());
  await page.close();
  return { ...wavToPcm(wav), errors };
}

// ---------- CLI ----------
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const want = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  for (const { stem, song } of loadStrudelSongs().filter(s => !want.length || want.includes(s.song.id))) {
    const bars = song.sections.reduce((a, s) => a + s.bars, 0), tail = song.tailBars ?? 2;
    const t0 = Date.now();
    const r = await renderCode(browser, song.code, song.bpm / 240, bars + tail, stem);
    fs.writeFileSync(path.join(OUT, stem + ".pcm"), r.pcm);
    const lengthSec = (bars + tail) * 240 / song.bpm;
    fs.writeFileSync(path.join(OUT, stem + ".json"), JSON.stringify({ id: song.id, stem, sampleRate: r.sr, frames: r.frames, originFrame: 0, lengthSec, errors: r.errors }));
    console.log(`${stem}: ${(r.frames / r.sr).toFixed(1)}s rendered (${bars} bars + ${tail}), wall ${((Date.now() - t0) / 1000).toFixed(0)}s${r.errors.length ? "  ERR " + r.errors.slice(0, 5).join(" | ") : ""}`);
  }
  await browser.close();
}
