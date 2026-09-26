// Bundle every song in songs/*.js into one page: dist/index.html (+ dist/samples/)
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
  bundle.push(`// ===== ${f} =====\n${src.trim()}\n`);
  console.log(`  ${f}  No.${s.no}  ${s.title}  (${s.genre})`);
}

// sample instruments: samples/<inst>/<Note>.mp3 ("As3.mp3" = A#3) -> manifest + copy to dist/samples/
const SAMPLE_DIR = path.join(ROOT, "samples");
const samples = {};
let sampleFiles = 0;
fs.rmSync(path.join(OUT_DIR, "samples"), { recursive: true, force: true });
for (const inst of fs.readdirSync(SAMPLE_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()) {
  if (!/^[a-z0-9-]+$/.test(inst)) throw new Error(`samples/${inst}: フォルダ名は英小文字・数字・- のみ`);
  const map = {};
  for (const f of fs.readdirSync(path.join(SAMPLE_DIR, inst)).sort()) {
    const mm = /^([A-G])(s?)(-?\d)\.mp3$/.exec(f);
    if (!mm) throw new Error(`samples/${inst}/${f}: ファイル名は "As3.mp3" の形にしてください`);
    map[mm[1] + (mm[2] ? "#" : "") + mm[3]] = f;
    fs.mkdirSync(path.join(OUT_DIR, "samples", inst), { recursive: true });
    fs.copyFileSync(path.join(SAMPLE_DIR, inst, f), path.join(OUT_DIR, "samples", inst, f));
    sampleFiles++;
  }
  if (!Object.keys(map).length) throw new Error(`samples/${inst}: mp3 がありません`);
  samples[inst] = map;
}

const template = fs.readFileSync(path.join(ROOT, "site", "template.html"), "utf8");
const html = template
  .replace("/*__SAMPLES__*/", () => `const SAMPLES = ${JSON.stringify(samples)};`)
  .replace("/*__SONGS__*/", () => bundle.join("\n").replace(/<\/script/gi, "<\\/script"));
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "index.html"), html);
console.log(`dist/index.html: ${files.length}曲, ${Math.round(html.length / 1024)}KB`);
console.log(`dist/samples/: ${Object.keys(samples).length}楽器, ${sampleFiles}ファイル（index.html と一緒に公開する）`);
