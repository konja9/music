// Make the synthesized voice samples in samples/voice/ with meSpeak (eSpeak, GPL).
// meSpeak is not a dependency of this repo; install it somewhere temporary and point MESPEAK at it:
//   mkdir /tmp/voicegen && cd /tmp/voicegen && npm init -y && npm i mespeak@2.0.2
//   MESPEAK=/tmp/voicegen/node_modules/mespeak node music/tools/make-voice.mjs
// The generated audio is our own output (words from the listening history), not a copy of eSpeak.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const MESPEAK = process.env.MESPEAK;
if (!MESPEAK) throw new Error("MESPEAK に mespeak のフォルダを指定してください（先頭のコメント参照）");
const mespeak = require(MESPEAK);
mespeak.loadConfig(require(path.join(MESPEAK, "src/mespeak_config.json")));
mespeak.loadVoice(require(path.join(MESPEAK, "voices/en/en-us.json")));

// words from the listening history: player actions and numbers from listening-summary.json
const WORDS = {
  "play": "play",
  "skip": "skip",
  "next": "next",
  "shuffle": "shuffle",
  "repeat": "repeat",
  "pause": "pause",
  "end-of-track": "end of track",
  "no-signal": "no signal",
  "seventeen-hundred": "seventeen hundred",                             // the busiest hour: 17:00
  "hours-1290": "one thousand two hundred ninety hours",                // total listening, about 1,290 hours
  "plays-1143": "one thousand one hundred forty three",                  // plays of the most played artist
  "skipped": "skipped",
};

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "samples", "voice");
fs.mkdirSync(OUT, { recursive: true });
for (const [name, text] of Object.entries(WORDS)) {
  const wav = mespeak.speak(text, { rawdata: true, speed: 150, pitch: 40, wordgap: 1 });
  if (!wav) throw new Error("合成に失敗しました: " + text);
  fs.writeFileSync(path.join(OUT, name + ".wav"), Buffer.from(wav));
  console.log(`  ${name}.wav  "${text}"  ${Math.round(wav.byteLength / 1024)}KB`);
}
