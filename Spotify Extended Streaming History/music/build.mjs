// Build the site:
//   dist/index.html  — the player: plays the rendered audio (audio/<stem>.mp3 + .peaks.json) with song info
//   dist/engine.html — the Tone.js engine page with every songs/*.js, used only to record them (render/render-tone.mjs)
//   dist/samples/, dist/audio/ — copies for the two pages
// Usage: node music/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SONG_DIR = path.join(ROOT, "songs");
const OUT_DIR = path.join(ROOT, "dist");

const files = fs.readdirSync(SONG_DIR).filter(f => /^\d{2,}-[\w-]+\.js$/.test(f)).sort();
if (!files.length) throw new Error("songs/ に曲ファイルがありません");

const REQUIRED = ["id", "no", "title", "date", "bpm", "key", "genre", "blurb", "accent", "chords", "sections", "parts", "why", "build"];
const bundle = [];
const seen = new Map();
const metas = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(SONG_DIR, f), "utf8");
  // quick metadata check: evaluate the file against a throwaway SONGS array
  const SONGS = [];
  new Function("SONGS", "Tone", src)(SONGS, new Proxy({}, { get: () => () => ({}) }));
  if (SONGS.length !== 1) throw new Error(`${f}: SONGS.push はちょうど1回にしてください（${SONGS.length}回）`);
  const s = SONGS[0];
  const missing = REQUIRED.filter(k => s[k] == null);
  if (missing.length) throw new Error(`${f}: 必須項目がありません: ${missing.join(", ")}`);
  if (seen.has(s.id)) throw new Error(`${f}: id "${s.id}" が ${seen.get(s.id)} と重複しています`);
  if (!/^[A-Za-z0-9_-]+$/.test(s.id)) throw new Error(`${f}: id は英数字・-・_ のみ（#リンクに使うため）`);
  for (const sec of s.sections) for (const c of sec.chords) if (!s.chords[c]) throw new Error(`${f}: セクション ${sec.id} のコード "${c}" が chords にありません`);
  seen.set(s.id, f);
  metas.push({ song: s, stem: f.replace(/\.js$/, "") });
  bundle.push(`// ===== ${f} =====\n${src.trim()}\n`);
  console.log(`  ${f}  No.${s.no}  ${s.title}  (${s.genre})`);
}

// sample folders -> manifests + copy to dist/samples/
//   pitched: every file is a note name ("As3.mp3" = A#3)  -> SAMPLES      (kit.sampler / kit.buffers)
//   named:   every file is a plain name ("bd-long.wav")   -> SAMPLE_SETS  (kit.hits)
const SAMPLE_DIR = path.join(ROOT, "samples");
const samples = {}, sampleSets = {};
let sampleFiles = 0;
fs.rmSync(path.join(OUT_DIR, "samples"), { recursive: true, force: true });
for (const inst of fs.readdirSync(SAMPLE_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()) {
  if (!/^[a-z0-9-]+$/.test(inst)) throw new Error(`samples/${inst}: フォルダ名は英小文字・数字・- のみ`);
  const notes = {}, named = {};
  for (const f of fs.readdirSync(path.join(SAMPLE_DIR, inst)).sort()) {
    const mm = /^([A-G])(s?)(-?\d)\.(mp3|wav)$/.exec(f), nm = /^([a-z0-9-]+)\.(mp3|wav)$/.exec(f);
    if (mm) notes[mm[1] + (mm[2] ? "#" : "") + mm[3]] = f;
    else if (nm) named[nm[1]] = f;
    else throw new Error(`samples/${inst}/${f}: ファイル名は "As3.mp3"（音名）か "bd-long.wav"（英小文字の名前）の形にしてください`);
    fs.mkdirSync(path.join(OUT_DIR, "samples", inst), { recursive: true });
    fs.copyFileSync(path.join(SAMPLE_DIR, inst, f), path.join(OUT_DIR, "samples", inst, f));
    sampleFiles++;
  }
  const nNotes = Object.keys(notes).length, nNamed = Object.keys(named).length;
  if (nNotes && nNamed) throw new Error(`samples/${inst}: 音名のファイルと名前のファイルが混ざっています`);
  if (!nNotes && !nNamed) throw new Error(`samples/${inst}: mp3 / wav がありません`);
  if (nNotes) samples[inst] = notes; else sampleSets[inst] = named;
}

const template = fs.readFileSync(path.join(ROOT, "site", "template.html"), "utf8");
const html = template
  .replace("/*__SAMPLES__*/", () => `const SAMPLES = ${JSON.stringify(samples)};\nconst SAMPLE_SETS = ${JSON.stringify(sampleSets)};`)
  .replace("/*__SONGS__*/", () => bundle.join("\n").replace(/<\/script/gi, "<\\/script"));
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "engine.html"), html);
console.log(`dist/engine.html: ${files.length}曲, ${Math.round(html.length / 1024)}KB（書き出し用）`);

// ---------- the player ----------
// timing comes from the song's bpm and bar counts; the audio starts exactly at bar 0
function trackOf(s, stem) {
  const peaksFile = path.join(ROOT, "audio", stem + ".peaks.json");
  if (!fs.existsSync(peaksFile) || !fs.existsSync(path.join(ROOT, "audio", stem + ".mp3"))) return null;
  const { duration, peaks } = JSON.parse(fs.readFileSync(peaksFile, "utf8"));
  const BAR = 240 / s.bpm, r3 = x => +x.toFixed(3);
  let bar = 0; const sections = [], bars = [], sheet = [];
  s.sections.forEach((sec, si) => {
    const start = bar * BAR, syms = [];
    for (let i = 0; i < sec.bars; i++) { const c = s.chords[sec.chords[i % sec.chords.length]]; bars.push([r3(bar * BAR), c.sym, si]); syms.push(c.sym); bar++; }
    sections.push({ name: sec.name, start: r3(start), end: r3(bar * BAR), o: sec.intensity ?? 0.5 });
    sheet.push({ name: sec.name, syms });
  });
  const { id, no, title, date, bpm, key, meter, genre, blurb, accent, why } = s;
  return { id, no, title, date, bpm, key, meter, genre, blurb, accent, why, sections, bars, sheet, duration, peaks, src: `audio/${stem}.mp3` };
}
// Strudel songs (songs/NN-id.strudel.js): the same metadata, the music itself is Strudel code (rendered by render/render-strudel.mjs)
for (const f of fs.readdirSync(SONG_DIR).filter(f => /^\d{2,}-[\w-]+\.strudel\.js$/.test(f)).sort()) {
  let song = null;
  new Function("SONG", fs.readFileSync(path.join(SONG_DIR, f), "utf8"))(x => { song = x; });
  const need = ["id", "no", "title", "date", "bpm", "key", "genre", "blurb", "accent", "chords", "sections", "why", "code"].filter(k => song?.[k] == null);
  if (need.length) throw new Error(`${f}: 必須項目がありません: ${need.join(", ")}`);
  if (seen.has(song.id)) throw new Error(`${f}: id "${song.id}" が ${seen.get(song.id)} と重複しています`);
  for (const sec of song.sections) for (const c of sec.chords) if (!song.chords[c]) throw new Error(`${f}: セクション ${sec.id} のコード "${c}" が chords にありません`);
  seen.set(song.id, f);
  metas.push({ song, stem: f.replace(/\.strudel\.js$/, "") });
  console.log(`  ${f}  No.${song.no}  ${song.title}  (${song.genre})`);
}
const tracks = [];
fs.rmSync(path.join(OUT_DIR, "audio"), { recursive: true, force: true });
fs.mkdirSync(path.join(OUT_DIR, "audio"), { recursive: true });
for (const { song, stem } of metas.sort((a, b) => a.song.no - b.song.no)) {
  const t = trackOf(song, stem);
  if (!t) { console.log(`  （音声なし）${stem}: render/ で書き出してから build してください`); continue; }
  fs.copyFileSync(path.join(ROOT, "audio", stem + ".mp3"), path.join(OUT_DIR, "audio", stem + ".mp3"));
  tracks.push(t);
}
const player = fs.readFileSync(path.join(ROOT, "site", "player.html"), "utf8")
  .replace("/*__TRACKS__*/", () => `const TRACKS = ${JSON.stringify(tracks).replace(/<\//g, "<\\/")};`);
fs.writeFileSync(path.join(OUT_DIR, "index.html"), player);
console.log(`dist/index.html: プレイヤー ${tracks.length}曲, ${Math.round(player.length / 1024)}KB  dist/audio/: ${tracks.length}ファイル（index.html と一緒に公開する）`);
console.log(`dist/samples/: 音程つき${Object.keys(samples).length}種, 名前つき${Object.keys(sampleSets).length}種, ${sampleFiles}ファイル（書き出し用。公開しない）`);
