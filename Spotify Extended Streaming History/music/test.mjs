// Dry-run every song in dist/index.html against a fake Tone.js + DOM.
// Catches runtime errors, bad note names and NaN times before publishing.
// Usage: node music/build.mjs && node music/test.mjs
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(ROOT, "dist", "engine.html"), "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);

const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const midiOf = n => {
  const m = /^([A-G])(b|#)?(-?\d)$/.exec(n);
  if (!m) throw new Error("音名が不正です: " + n);
  return 12 * (+m[3] + 1) + { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === "b" ? -1 : m[2] === "#" ? 1 : 0);
};
const isDur = x => typeof x === "string" && /^\d/.test(x);
const checkNote = x => { if (typeof x === "string" && !isDur(x)) midiOf(x); else if (typeof x === "number" && !isFinite(x)) throw new Error("周波数が不正: " + x); };

// anything-goes proxy for DOM / audio nodes
function any(name = "x") {
  const fn = function () {};
  return new Proxy(fn, {
    get(t, k) {
      if (k === "then") return undefined;
      if (k === Symbol.iterator) return function* () {};
      if (k === Symbol.toPrimitive) return () => 0;
      if (k === "value") return 0;
      if (k in t && k !== "name" && k !== "length") return t[k];
      return any(name + "." + String(k));
    },
    set(t, k, v) { t[k] = v; return true; },
    apply() { return any(name + "()"); },
    construct() { return any("new " + name); },
  });
}

let stats;
function makeSynth() {
  const trig = (a, b, c, d) => {
    // Synths: (note, dur, time, vel); NoiseSynth: (dur, time, vel)
    [].concat(a).forEach(checkNote);
    for (const x of [b, c]) if (typeof x === "number" && !isFinite(x)) throw new Error("時刻が NaN です");
    stats.notes++;
  };
  return new Proxy({}, {
    get(t, k) {
      if (k === "triggerAttackRelease" || k === "triggerAttack") return trig;
      if (k === "start" || k === "stop") return (...args) => { for (const x of args) if (typeof x === "number" && !isFinite(x)) throw new Error(k + " の引数が不正: " + x); if (k === "start") stats.notes++; return t; };
      if (k === "then") return undefined;
      if (k in t) return t[k];
      return any(String(k));
    },
    set(t, k, v) { t[k] = v; return true; },
  });
}
const transport = {
  events: [],
  schedule(fn, t) { if (typeof t !== "number" || !isFinite(t)) throw new Error("schedule の時刻が不正: " + t); this.events.push([t, fn]); },
  cancel() { this.events = []; }, bpm: {}, state: "stopped", seconds: 0, start() {}, stop() {}, pause() {},
};
const Tone = new Proxy({
  Frequency: (n, unit) => ({
    toMidi: () => (typeof n === "number" ? n : midiOf(n)),
    toNote: () => { if (!Number.isInteger(n)) throw new Error("MIDI番号が整数ではありません: " + n); return NAMES[n % 12] + (Math.floor(n / 12) - 1); },
    toFrequency: () => 440,
  }),
  Transport: transport, getTransport: () => transport, getDraw: () => ({ schedule() {} }), getDestination: () => any("dest"), getContext: () => any("ctx"), setContext() {}, start: async () => {},
  Draw: { schedule() {} }, Context: function () { return any("ctx"); },
}, { get: (t, k) => (k in t ? t[k] : function () { return makeSynth(); }) });

const el = () => any("el");
const sandbox = {
  Tone, console, Math, Object, Array, Number, String, Set, Map, JSON, Promise, Symbol, Error, isFinite, setTimeout: () => 0,
  document: { getElementById: el, createElement: el, documentElement: any("root"), title: "" },
  location: { hash: "" }, history: { replaceState() {} },
  matchMedia: () => ({ matches: false, addEventListener() {} }),
  MutationObserver: function () { return { observe() {} }; },
  getComputedStyle: () => ({ getPropertyValue: () => "" }),
  requestAnimationFrame: () => 0, addEventListener() {}, devicePixelRatio: 1,
};
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const s of scripts) vm.runInContext(s, sandbox);

const { SONGS, makeKit } = sandbox.RIREKI;
let failed = 0;
for (const song of SONGS) {
  stats = { notes: 0 };
  transport.events = [];
  try {
    const kit = makeKit(song, transport, {});
    const api = song.build(transport, kit) || {};
    for (const [k] of song.parts) if (!kit.ch[k]) throw new Error(`parts の "${k}" に対応するチャンネルがありません`);
    const evs = transport.events.sort((a, b) => a[0] - b[0]);
    for (const [t, fn] of evs) fn(t);
    if (api.releaseAll) api.releaseAll();
    const last = evs.length ? evs[evs.length - 1][0] : 0;
    if (last > kit.END) throw new Error(`最後のイベント ${last.toFixed(1)}s が曲の終わり ${kit.END.toFixed(1)}s より後です`);
    const len = `${Math.floor(kit.END / 60)}:${String(Math.round(kit.END % 60)).padStart(2, "0")}`;
    console.log(`OK   No.${String(song.no).padStart(2, "0")} ${song.title}  ${len}  events ${evs.length}  notes ${stats.notes}`);
  } catch (e) {
    failed++;
    console.log(`FAIL No.${String(song.no).padStart(2, "0")} ${song.title}: ${e.message}`);
  }
}
if (failed) { console.log(`${failed}曲でエラー`); process.exit(1); }
console.log(`全${SONGS.length}曲 OK`);
