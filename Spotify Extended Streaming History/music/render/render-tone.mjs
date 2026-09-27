// Record the Tone.js songs (songs/NN-id.js) to raw PCM by playing them in real time in headless Chromium.
// Offline rendering is not used: sample slices created inside scheduled callbacks stay silent under Tone.Offline.
// Usage (from music/):
//   node build.mjs
//   TONE_JS=/path/to/tone@14.8.49/build/Tone.js PLAYWRIGHT=$(npm root -g)/playwright node render/render-tone.mjs [id ...]
// cdnjs is not reachable from the build machine, so Tone.js is served from a local copy (npm "tone@14.8.49").
// Output: render/out/<file-stem>.pcm (Int16 stereo interleaved) + .json ({ sampleRate, frames, id })
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist"), OUT = path.join(ROOT, "render", "out");
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
if (!process.env.TONE_JS) throw new Error("TONE_JS に Tone.js（14.8.49）のパスを指定してください");
fs.mkdirSync(OUT, { recursive: true });

// song ids and file stems from songs/*.js (Tone.js songs only)
const files = fs.readdirSync(path.join(ROOT, "songs")).filter(f => /^\d{2,}-[\w-]+\.js$/.test(f) && !f.endsWith(".strudel.js")).sort();
const songs = files.map(f => { const S = []; new Function("SONGS", "Tone", fs.readFileSync(path.join(ROOT, "songs", f), "utf8"))(S, new Proxy({}, { get: () => () => ({}) })); return { stem: f.replace(/\.js$/, ""), id: S[0].id }; });
const want = process.argv.slice(2);
const todo = want.length ? songs.filter(s => want.includes(s.id)) : songs;

const RECORDER = `class Rec extends AudioWorkletProcessor {
  constructor() { super(); this.buf = []; this.n = 0; this.on = true; this.port.onmessage = e => { if (e.data === "stop") { this.flush(); this.on = false; } }; }
  flush() { if (!this.buf.length) return; const len = this.buf.reduce((a, b) => a + b[0].length, 0), L = new Float32Array(len), R = new Float32Array(len); let o = 0;
    for (const [l, r] of this.buf) { L.set(l, o); R.set(r, o); o += l.length; } this.port.postMessage({ L, R }, [L.buffer, R.buffer]); this.buf = []; this.n = 0; }
  process(inputs) { if (!this.on) return false; if (!this.started) { this.started = true; this.port.postMessage({ first: currentFrame }); } const i = inputs[0]; if (i && i.length) { const l = i[0], r = i[1] || i[0]; this.buf.push([l.slice(), r.slice()]); this.n += l.length; if (this.n >= sampleRate) this.flush(); } else { const z = new Float32Array(128); this.buf.push([z, z]); this.n += 128; } return true; }
}
registerProcessor("rec", Rec);`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--autoplay-policy=no-user-gesture-required"] });
for (const song of todo) {
  const page = await browser.newPage();
  await page.route("**/*", async route => {
    const u = new URL(route.request().url());
    if (u.hostname === "cdnjs.cloudflare.com" && u.pathname.endsWith("/Tone.js")) return route.fulfill({ body: fs.readFileSync(process.env.TONE_JS), contentType: "application/javascript" });
    const p = path.join(DIST, decodeURIComponent(u.pathname));
    if (u.hostname === "local.render" && fs.existsSync(p)) return route.fulfill({ body: fs.readFileSync(p), contentType: p.endsWith(".html") ? "text/html; charset=utf-8" : p.endsWith(".wav") ? "audio/wav" : "audio/mpeg" });
    return route.fulfill({ status: 404, body: "" });
  });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  const pcmPath = path.join(OUT, song.stem + ".pcm");
  const fd = fs.openSync(pcmPath, "w");
  let frames = 0;
  await page.exposeFunction("__chunk", b64 => { const b = Buffer.from(b64, "base64"); fs.writeSync(fd, b); frames += b.length / 4; });
  await page.goto("https://local.render/engine.html#" + song.id);
  await page.waitForFunction(() => window.RIREKI && window.Tone);
  // install the recorder on the destination before playback starts (the first song select keeps this context)
  const sr = await page.evaluate(async code => {
    const tctx = Tone.getContext(), ctx = tctx.rawContext;          // rawContext is a standardized-audio-context wrapper
    await tctx.addAudioWorkletModule(URL.createObjectURL(new Blob([code], { type: "application/javascript" })));
    const node = tctx.createAudioWorkletNode("rec", { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
    const sink = ctx.createGain(); sink.gain.value = 0; node.connect(sink); sink.connect(ctx.destination);
    Tone.getDestination().output.connect(node);
    window.__startFrame = null;
    node.port.onmessage = e => {
      if (e.data.first != null) { window.__firstFrame = e.data.first; return; }
      const { L, R } = e.data, i16 = new Int16Array(L.length * 2);
      for (let k = 0; k < L.length; k++) { i16[2 * k] = Math.max(-32768, Math.min(32767, Math.round(L[k] * 32767))); i16[2 * k + 1] = Math.max(-32768, Math.min(32767, Math.round(R[k] * 32767))); }
      let s = ""; const u8 = new Uint8Array(i16.buffer); for (let k = 0; k < u8.length; k += 8192) s += String.fromCharCode.apply(null, u8.subarray(k, k + 8192));
      window.__chunk(btoa(s));
    };
    window.__rec = node;
    return ctx.sampleRate;
  }, RECORDER);
  const t0 = Date.now();
  await page.click("#play");
  await page.waitForFunction(() => Tone.getTransport().state === "started", null, { timeout: 60000 });
  // context time at which the transport was at 0 s
  const origin = await page.evaluate(() => { const tr = Tone.getTransport(); return Tone.now() - tr.seconds; });
  const firstFrame = await page.evaluate(() => window.__firstFrame);   // context frame of recorded frame 0
  const end = await page.evaluate(id => window.RIREKI.SONGS.find(s => s.id === id).geo.END, song.id);
  // wait for the song to end (the page stops the transport at END)
  await page.waitForFunction(() => Tone.getTransport().state !== "started", null, { timeout: (end + 60) * 1000, polling: 500 });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.__rec.port.postMessage("stop"));
  await page.waitForTimeout(1500);
  fs.closeSync(fd);
  const meta = { id: song.id, stem: song.stem, sampleRate: sr, frames, originFrame: Math.max(0, Math.round(origin * sr) - firstFrame), lengthSec: end, errors };
  fs.writeFileSync(path.join(OUT, song.stem + ".json"), JSON.stringify(meta));
  console.log(`${song.stem}: ${(frames / sr).toFixed(1)}s recorded, song ${end.toFixed(1)}s, origin ${(meta.originFrame / sr).toFixed(3)}s, wall ${((Date.now() - t0) / 1000).toFixed(0)}s${errors.length ? "  ERR " + errors.join(" | ") : ""}`);
  await page.close();
}
await browser.close();
