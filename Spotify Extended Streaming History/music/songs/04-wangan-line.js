// No.4 湾岸ライン — fusion / city pop, last chorus up a whole step
(() => {
const C = {
  Gmaj9:  { sym: "Gmaj9",    root: 31, v: ["A3", "B3", "D4", "F#4"] },
  Fsm7:   { sym: "F♯m7",     root: 30, v: ["A3", "C#4", "E4"] },
  Em9:    { sym: "Em9",      root: 28, v: ["G3", "B3", "D4", "F#4"] },
  A7sus:  { sym: "A7sus4",   root: 33, v: ["G3", "D4", "E4"] },
  A7:     { sym: "A7",       root: 33, v: ["G3", "C#4", "E4"] },
  Bm7:    { sym: "Bm7",      root: 35, v: ["A3", "D4", "F#4"] },
  E9:     { sym: "E9",       root: 28, v: ["G#3", "D4", "F#4"] },
  Fs7s9:  { sym: "F♯7(♯9)",  root: 30, v: ["A#3", "E4", "A4"] },
  Em7:    { sym: "Em7",      root: 28, v: ["G3", "B3", "D4"] },
  A13:    { sym: "A13",      root: 33, v: ["G3", "C#4", "F#4"] },
  Dmaj9:  { sym: "Dmaj9",    root: 38, v: ["A3", "C#4", "E4", "F#4"] },
  A6:     { sym: "A6",       root: 33, v: ["F#3", "A3", "C#4", "E4"] },
  AonG:   { sym: "A/G",      root: 31, v: ["A3", "C#4", "E4"] },
};
// the final chorus: same chords, a whole step up
const UP_SYM = { Dmaj9: "Emaj9", Bm7: "C♯m7", Gmaj9: "Amaj9", A6: "B6", Fsm7: "G♯m7", Em9: "F♯m9", A7sus: "B7sus4" };
for (const [k, sym] of Object.entries(UP_SYM)) C[k + "_up"] = { ...C[k], sym, up: 2 };

const VERSE = ["Gmaj9", "Fsm7", "Em9", "A7sus"];
const PRE = ["Bm7", "E9", "Gmaj9", "Fs7s9", "Bm7", "E9", "Em7", "A13"];
const CHORUS = ["Dmaj9", "Bm7", "Gmaj9", "A6", "Fsm7", "Bm7", "Em9", "A7sus"];
const SOLO = ["Gmaj9", "AonG", "Fsm7", "Bm7"];
const SECTIONS = [
  { id: "intro",   name: "イントロ",   bars: 4, chords: ["Gmaj9", "AonG", "Fsm7", "Bm7"], intensity: 0.7 },
  { id: "verse",   name: "Aメロ",      bars: 8, chords: VERSE, intensity: 0.4 },
  { id: "pre",     name: "Bメロ",      bars: 8, chords: PRE, intensity: 0.55 },
  { id: "chorus",  name: "サビ",       bars: 8, chords: CHORUS, intensity: 0.9 },
  { id: "verse2",  name: "Aメロ2",     bars: 8, chords: VERSE, intensity: 0.45 },
  { id: "solo",    name: "ギターソロ", bars: 8, chords: SOLO, intensity: 1 },
  { id: "slap",    name: "ベース",     bars: 4, chords: ["Em7", "A7"], intensity: 0.5 },
  { id: "chorus2", name: "サビ",       bars: 8, chords: CHORUS, intensity: 0.9 },
  { id: "chorus3", name: "転調サビ",   bars: 8, chords: CHORUS.map(c => c + "_up"), intensity: 1 },
  { id: "outro",   name: "アウトロ",   bars: 4, chords: ["Gmaj9_up", "A7sus_up", "Dmaj9_up", "Dmaj9_up"], intensity: 0.6 },
];

// melodies: [step, note, durSteps, bendFromSemitones?]
const VERSE_MEL = [
  [[4, "B4", 2], [6, "D5", 2], [8, "F#5", 4], [12, "E5", 4]],
  [[0, "C#5", 6], [8, "A4", 2], [10, "C#5", 2], [12, "E5", 4]],
  [[4, "G4", 2], [6, "B4", 2], [8, "D5", 4], [12, "E5", 2], [14, "F#5", 2]],
  [[0, "E5", 8], [12, "A4", 4]],
];
const VERSE_END = [[0, "E5", 4], [4, "F#5", 4], [8, "G5", 4], [12, "A5", 4]];
const PRE_MEL = [
  [[0, "F#5", 4], [4, "D5", 4], [8, "B4", 8]],
  [[0, "G#5", 4], [4, "F#5", 4], [8, "D5", 8]],
  [[0, "F#5", 4], [4, "E5", 4], [8, "D5", 4], [12, "B4", 4]],
  [[0, "A#4", 8], [8, "C#5", 8]],
  [[0, "F#5", 4], [4, "D5", 4], [8, "B4", 8]],
  [[0, "G#5", 4], [4, "F#5", 4], [8, "D5", 8]],
  [[0, "E5", 4], [4, "F#5", 4], [8, "G5", 4], [12, "B5", 4]],
  [[0, "A5", 14, 2]],
];
const CHORUS_MEL = [
  [[0, "F#5", 2], [2, "A5", 2], [4, "B5", 4, 2], [8, "A5", 2], [10, "F#5", 2], [12, "E5", 4]],
  [[0, "D5", 3], [3, "F#5", 3], [6, "E5", 2], [8, "D5", 4], [12, "B4", 4]],
  [[0, "B4", 2], [2, "D5", 2], [4, "F#5", 4], [8, "A5", 4, 1], [12, "G5", 4]],
  [[0, "F#5", 6], [6, "E5", 2], [8, "C#5", 4], [12, "E5", 4]],
  [[0, "C#5", 2], [2, "E5", 2], [4, "A5", 4, 2], [8, "F#5", 4], [12, "E5", 4]],
  [[0, "D5", 3], [3, "F#5", 3], [6, "A5", 2], [8, "B5", 6, 2], [14, "A5", 2]],
  [[0, "G5", 4], [4, "F#5", 2], [6, "E5", 2], [8, "D5", 2], [10, "E5", 2], [12, "F#5", 4]],
  [[0, "E5", 8, 2], [8, "A4", 2], [10, "C#5", 2], [12, "E5", 2], [14, "G5", 2]],
];
const PENTA = ["D", "E", "F#", "A", "B"];
const penta = (from, count, dir) => {             // run through D major pentatonic
  const all = [];
  for (let o = 3; o <= 6; o++) for (const n of PENTA) all.push(n + o);
  let i = all.indexOf(from); const out = [];
  for (let c = 0; c < count; c++) { out.push(all[i]); i += dir; }
  return out;
};
const SOLO_MEL = [
  [[0, "A5", 4, 2], [4, "B5", 2], [6, "A5", 2], [8, "F#5", 4], [12, "E5", 4]],
  [[0, "D5", 2], [2, "E5", 2], [4, "F#5", 2], [6, "A5", 2], [8, "B5", 2], [10, "D6", 2], [12, "E6", 4, 2]],
  [[0, "C#6", 4], [4, "A5", 2], [6, "F#5", 2], [8, "E5", 2], [10, "C#5", 2], [12, "A4", 4]],
  [[0, "B4", 2], [2, "D5", 2], [4, "F#5", 4], [8, "B5", 8, 2]],
  penta("D6", 16, -1).map((n, k) => [k, n, 1]),
  penta("A4", 16, 1).map((n, k) => [k, n, 1]),
  [[0, "A5", 1], [1, "B5", 1], [2, "D6", 2], [4, "A5", 1], [5, "B5", 1], [6, "D6", 2], [8, "B5", 1], [9, "D6", 1], [10, "E6", 2], [12, "B5", 1], [13, "D6", 1], [14, "E6", 2]],
  [[0, "F#6", 8, 2], [8, "E6", 2], [10, "D6", 2], [12, "B5", 4]],
];

SONGS.push({
  id: "wangan-line", no: 4, title: "湾岸ライン", date: "2026-09-26",
  bpm: 116, swing: 0.08, key: "D メジャー → E メジャー", genre: "フュージョン／シティポップ", tail: 4,
  masterGain: 0.8, comp: { threshold: -18, ratio: 3, attack: 0.008, release: 0.2 },
  accent: { light: "#1d8a55", dark: "#58c987" },
  blurb: "夜の首都高を想定した、明るくて速いフュージョンです。クラビネット風のカッティングとスラップ風のベースの上で、ギター風のリードが歌います。最後のサビで全音上がります。",
  parts: [["drums", "ドラム"], ["bass", "スラップベース"], ["keys", "クラビ・エレピ"], ["brass", "ブラス"], ["lead", "ギター・リード"]],
  why: [
    ["ギター風のリード", "チョーキング", "歪ませたノコギリ波に、全音下から持ち上げるチョーキングを入れています。ソロの後半はペンタトニックを16分で駆け上がり、駆け下ります。", [["高中正義", 6], ["Stevie Wonder", 16]]],
    ["スラップ風ベース", "親指と、はじく音", "ルートを親指で叩く音と、1オクターブ上をはじく音を交互に入れています。ソロの後の4小節はベースとドラムだけです。", [["Vulfpeck", 13], ["Thundercat", 7]]],
    ["カッティング", "クラビネット風", "フィルタが開いて閉じる短い和音を、16分の裏に散らして刻んでいます。", [["Vulfpeck", 13], ["Jamiroquai", 6], ["Stevie Wonder", 16]]],
    ["コード進行", "王道進行とセカンダリードミナント", "ソロは Gmaj9 → A/G → F♯m7 → Bm7 の、J-POPでおなじみの進行です。BメロはE9やF♯7(♯9)を挟んで、サビへの期待を高めています。", [["KIRINJI", 7], ["星野源", 63]]],
    ["ブラス", "合いの手", "イントロとサビの終わりに、短い和音のブラスを差し込んでいます。", [["Jamiroquai", 6], ["Michael Jackson", 8]]],
    ["転調", "最後のサビを全音上へ", "最後の8小節で D から E へ上がり、そのままアウトロで終わります。", [["星野源", 63]]],
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const ch = kit.ch;
    const reverb = new Tone.Reverb({ decay: 2.2, preDelay: 0.015, wet: 1 });
    kit.bus("rev", -9, reverb);
    const delay = new Tone.FeedbackDelay({ delayTime: "8n.", feedback: 0.28, wet: 1 });
    kit.bus("dly", -12, new Tone.Filter(3000, "lowpass"), delay);
    kit.channel("drums", -7, { rev: -22 }); kit.channel("bass", -8); kit.channel("keys", -12, { rev: -14 }); kit.channel("brass", -13, { rev: -10 }); kit.channel("lead", -12, { rev: -14, dly: -9 });

    // clav: plucky filtered pulse
    const clav = new Tone.PolySynth(Tone.MonoSynth, {
      oscillator: { type: "pulse", width: 0.3 },
      envelope: { attack: 0.002, decay: 0.12, sustain: 0.05, release: 0.05 },
      filter: { type: "bandpass", Q: 4 }, filterEnvelope: { attack: 0.002, decay: 0.09, sustain: 0.1, release: 0.05, baseFrequency: 500, octaves: 3 },
    });
    clav.maxPolyphony = 24;
    clav.connect(ch.keys);
    // EP pad for verses
    const ep = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 1, modulationIndex: 3,
      envelope: { attack: 0.004, decay: 1.4, sustain: 0.3, release: 0.9 },
      modulationEnvelope: { attack: 0.002, decay: 0.3, sustain: 0.1, release: 0.5 },
      volume: -4,
    });
    ep.maxPolyphony = 16;
    ep.chain(new Tone.Tremolo({ frequency: 4, depth: 0.3 }).start(), ch.keys);

    // slap bass
    const bass = new Tone.MonoSynth({
      oscillator: { type: "fatsawtooth", count: 2, spread: 10 },
      envelope: { attack: 0.002, decay: 0.18, sustain: 0.4, release: 0.06 },
      filter: { type: "lowpass", Q: 5, rolloff: -24 },
      filterEnvelope: { attack: 0.001, decay: 0.1, sustain: 0.2, release: 0.1, baseFrequency: 160, octaves: 4 },
    });
    const sub = new Tone.MonoSynth({ oscillator: { type: "sine" }, envelope: { attack: 0.003, decay: 0.2, sustain: 0.7, release: 0.06 }, filterEnvelope: { baseFrequency: 300, octaves: 0 }, volume: -6 });
    bass.connect(ch.bass); sub.connect(ch.bass);

    // brass stabs
    const brass = new Tone.PolySynth(Tone.MonoSynth, {
      oscillator: { type: "fatsawtooth", count: 3, spread: 16 },
      envelope: { attack: 0.03, decay: 0.2, sustain: 0.6, release: 0.12 },
      filter: { type: "lowpass", Q: 1 }, filterEnvelope: { attack: 0.04, decay: 0.2, sustain: 0.5, baseFrequency: 700, octaves: 2.5 },
    });
    brass.maxPolyphony = 16;
    brass.connect(ch.brass);

    // guitar-ish lead
    const lead = new Tone.MonoSynth({
      oscillator: { type: "fatsawtooth", count: 2, spread: 8 }, portamento: 0.025,
      envelope: { attack: 0.006, decay: 0.3, sustain: 0.7, release: 0.18 },
      filter: { type: "lowpass", Q: 1.5 }, filterEnvelope: { attack: 0.01, decay: 0.25, sustain: 0.6, baseFrequency: 1100, octaves: 2 },
    });
    const leadVib = new Tone.Vibrato({ frequency: 5.8, depth: 0.04 });
    lead.chain(new Tone.Distortion(0.45), new Tone.Chorus({ frequency: 1.2, delayTime: 3, depth: 0.4, wet: 0.3 }).start(), leadVib, new Tone.Filter(4200, "lowpass"), ch.lead);

    // drums
    const drumBus = new Tone.Gain(1).connect(ch.drums);
    const kick = new Tone.MembraneSynth({ pitchDecay: 0.03, octaves: 5, envelope: { attack: 0.001, decay: 0.3, sustain: 0 } }).connect(drumBus);
    const snareN = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.14, sustain: 0 }, volume: -7 });
    snareN.chain(new Tone.Filter(2500, "bandpass", -12), drumBus);
    const snareB = new Tone.MembraneSynth({ pitchDecay: 0.015, octaves: 2, envelope: { attack: 0.001, decay: 0.1, sustain: 0 }, volume: -9 }).connect(drumBus);
    const hat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.03, sustain: 0 }, volume: -18 });
    hat.chain(new Tone.Filter(9000, "highpass"), drumBus);
    const ohat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.002, decay: 0.18, sustain: 0 }, volume: -21 });
    ohat.chain(new Tone.Filter(8000, "highpass"), drumBus);
    const clap = new Tone.NoiseSynth({ noise: { type: "pink" }, envelope: { attack: 0.003, decay: 0.1, sustain: 0 }, volume: -12 });
    clap.chain(new Tone.Filter(1300, "bandpass"), drumBus);
    const crash = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 1.3, release: 0.4 }, harmonicity: 5.1, modulationIndex: 30, resonance: 4200, octaves: 1.5, volume: -28 });
    crash.connect(drumBus);

    const tr = (n, up) => (up ? f(m(n) + up) : n);
    const leadNote = (i, s, n, d, bend, up) => at(T(i, s), t => {
      const note = tr(n, up);
      lead.triggerAttackRelease(note, D(d) * 0.94, t, 0.8); flash("lead", t);
      if (bend) {
        const target = Tone.Frequency(note).toFrequency();
        const from = Tone.Frequency(m(note) - bend, "midi").toFrequency();
        lead.frequency.cancelScheduledValues(t);           // replace the trigger's own glide with the bend
        lead.frequency.setValueAtTime(from, t);
        lead.frequency.exponentialRampToValueAtTime(target, t + Math.min(0.14, D(d) * 0.4));
      }
    });
    const phrase = (i, list, up = 0) => list.forEach(([s, n, d, bend]) => leadNote(i, s, n, d, bend, up));

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const up = chord.up || 0;
      const v = chord.v.map(n => tr(n, up));
      const r = chord.root + up;
      const next = BARS[i + 1]?.chord || chord;
      const nextR = next.root + (next.up || 0);
      const isChorus = id === "chorus" || id === "chorus2" || id === "chorus3";

      // ----- keys -----
      const cl = (s, dur = 0.6, vel = 0.6) => at(T(i, s) + human(0.004), t => { clav.triggerAttackRelease(v.map(n => f(m(n) + 12)), D(dur), t, vel); flash("keys", t); });
      if (id === "verse" || id === "verse2") {
        at(T(i, 0), t => { ep.triggerAttackRelease(v, D(7), t, 0.5); flash("keys", t); });
        at(T(i, 10), t => ep.triggerAttackRelease(v, D(5), t, 0.35));
        if (id === "verse2") [3, 6, 11, 14].forEach(s => cl(s, 0.5, 0.45));
      } else if (id === "pre") {
        [0, 3, 6, 8, 11, 14].forEach(s => cl(s, 0.6, s % 4 === 0 ? 0.65 : 0.5));
      } else if (isChorus || id === "solo" || id === "intro") {
        [0, 3, 6, 8, 10, 11, 14].forEach(s => cl(s, 0.5, s % 4 === 0 ? 0.7 : 0.5));
        if (isChorus) at(T(i, 0), t => ep.triggerAttackRelease(v, D(14), t, 0.3));
      } else if (id === "outro") {
        at(T(i, 0), t => { ep.triggerAttackRelease(v, D(local === 3 ? 20 : 14), t, 0.45); flash("keys", t); });
      }

      // ----- bass -----
      const bn = (s, midi, dur, vel, pop = false) => at(T(i, s) + human(0.003), t => {
        bass.triggerAttackRelease(f(midi), D(dur), t, pop ? Math.min(1, vel + 0.2) : vel);
        if (!pop) sub.triggerAttackRelease(f(midi), D(dur), t, vel * 0.8);
        flash("bass", t);
      });
      let appr = nextR - 1; if (Math.abs(appr - r) > 7) appr += appr > r ? -12 : 12;
      if (id === "intro" || id === "verse" || id === "verse2") {
        bn(0, r, 3, 0.9); bn(6, r, 1, 0.6); bn(7, r + 7, 1, 0.55); bn(8, r + 12, 2, 0.7, true); bn(11, r, 2, 0.7); bn(14, r + 10, 1, 0.5); bn(15, appr, 1, 0.7);
      } else if (id === "slap") {
        // solo slap break: thumb / pop / ghost
        const pat = [[0, 0, 1, 1], [2, 12, 1, 0.8, 1], [3, 0, 1, 0.35], [4, 10, 1, 0.7, 1], [5, 0, 1, 0.35], [6, 12, 1, 0.85, 1], [7, 7, 1, 0.6], [8, 0, 1, 0.9], [9, 0, 1, 0.35], [10, 12, 1, 0.8, 1], [11, 10, 1, 0.6, 1], [12, 7, 1, 0.7], [13, 5, 1, 0.6], [14, 3, 1, 0.65], [15, 2, 1, 0.7]];
        pat.forEach(([s, iv, d, vel, pop]) => bn(s, r + iv, d, vel, !!pop));
      } else if (id !== "outro") {
        bn(0, r, 2, 0.95); bn(2, r + 12, 1, 0.7, true); bn(3, r, 1, 0.4); bn(6, r, 1, 0.7); bn(7, r + 12, 1, 0.65, true);
        bn(8, r, 2, 0.85); bn(10, r + 12, 1, 0.7, true); bn(11, r + 7, 1, 0.55); bn(12, r + 10, 1, 0.6); bn(14, r + 12, 1, 0.65, true); bn(15, appr, 1, 0.75);
      } else {
        bn(0, r, local === 3 ? 20 : 14, 0.85);
      }

      // ----- brass -----
      const br = (s, dur, vel = 0.7) => at(T(i, s), t => { brass.triggerAttackRelease(v.map(n => f(m(n) + 12)), D(dur), t, vel); flash("brass", t); });
      if (id === "intro") { br(0, 2); br(3, 1, 0.6); br(6, 2); if (local === 3) { br(10, 1); br(12, 3, 0.85); } }
      if (isChorus && local === 7) { br(8, 1.5); br(10, 1.5); br(12, 3, 0.85); }
      if (id === "pre" && local === 3) { br(0, 6, 0.55); }
      if (id === "outro" && local === 2) { br(0, 2); br(3, 1, 0.6); br(6, 10, 0.8); }

      // ----- drums -----
      const k = (s, vv = 0.95) => at(T(i, s), t => { kick.triggerAttackRelease("C1", "8n", t, vv); flash("drums", t); });
      const sn = (s, vv = 0.9) => at(T(i, s) + human(0.004), t => { snareN.triggerAttackRelease("16n", t, vv); snareB.triggerAttackRelease("B2", "16n", t, vv); });
      const h = (s, vv = 0.45) => at(T(i, s) + human(0.004), t => hat.triggerAttackRelease("32n", t, vv));
      const oh = (s, vv = 0.5) => at(T(i, s), t => ohat.triggerAttackRelease("16n", t, vv));
      const cp = (s, vv = 0.7) => at(T(i, s) + 0.006, t => clap.triggerAttackRelease("16n", t, vv));
      const cr = () => at(T(i, 0), t => crash.triggerAttackRelease("C4", "1n", t, 0.7));
      const fill = () => { sn(12, 0.6); sn(13, 0.7); sn(14, 0.85); sn(15, 1); };
      if (id === "intro") {
        if (local === 0) cr();
        k(0); k(8); sn(4); sn(12); for (let s = 0; s < 16; s += 2) h(s, 0.45);
        if (local === 3) fill();
      } else if (id === "verse" || id === "verse2") {
        if (local === 0) cr();
        k(0); k(10, 0.8); sn(4); sn(12); sn(7, 0.15); sn(15, 0.12);
        for (let s = 0; s < 16; s++) h(s, s % 2 ? 0.25 : 0.45);
        if (local === 7) fill();
      } else if (id === "pre") {
        k(0); k(8); k(10, 0.6); sn(4); sn(12);
        for (let s = 0; s < 16; s += 2) h(s, 0.5); [2, 6, 10, 14].forEach(s => oh(s, 0.35));
        if (local === 7) { sn(8, 0.5); sn(10, 0.6); fill(); }
      } else if (isChorus || id === "solo") {
        if (local === 0 || local === 4) cr();
        [0, 4, 8, 12].forEach(s => k(s)); sn(4); sn(12); cp(4); cp(12);
        for (let s = 0; s < 16; s++) if (s % 4 !== 2) h(s, s % 2 ? 0.3 : 0.5);
        [2, 6, 10, 14].forEach(s => oh(s, 0.5));
        if (local === 7 && id !== "chorus3") fill();
      } else if (id === "slap") {
        k(0); k(8); cp(4, 0.8); cp(12, 0.8);
        for (let s = 0; s < 16; s += 2) h(s, 0.4);
        if (local === 3) { k(12); fill(); }
      } else if (id === "outro") {
        if (local === 0 || local === 3) cr();
        if (local < 3) { [0, 4, 8, 12].forEach(s => k(s, 0.85)); sn(4); sn(12); for (let s = 0; s < 16; s += 2) h(s, 0.4); }
        else { k(0, 1); }
      }

      // ----- lead -----
      if (id === "verse" || id === "verse2") phrase(i, local === 7 ? VERSE_END : VERSE_MEL[local % 4]);
      else if (id === "pre") phrase(i, PRE_MEL[local]);
      else if (isChorus) phrase(i, CHORUS_MEL[local], up);
      else if (id === "solo") phrase(i, SOLO_MEL[local]);
      else if (id === "outro" && local === 2) phrase(i, [[0, "E5", 2], [2, "F#5", 2], [4, "A5", 2], [6, "B5", 2], [8, "C#6", 8, 2]], 2);
      else if (id === "outro" && local === 3) phrase(i, [[0, "D6", 16, 1]], 2);
    });

    return { releaseAll() { clav.releaseAll(); ep.releaseAll(); brass.releaseAll(); [bass, sub, lead].forEach(s => s.triggerRelease()); } };
  },
});
})();
