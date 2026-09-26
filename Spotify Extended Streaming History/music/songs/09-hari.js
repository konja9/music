// No.9 針を落とす — jazz-sampling hip-hop: a piano "record" chopped into a loop, a flute hook cut from recordings,
// horn stabs, a walking bass, and dusty, heavily swung TR-808 drums. the loop is later "flipped" a whole step down
(() => {
const C = {
  Am9:    { sym: "Am9",           root: 33, third: 3, v: ["G3", "B3", "C4", "E4"] },
  D13:    { sym: "D13",           root: 38, third: 4, v: ["F#3", "C4", "E4", "B4"] },
  Gmaj9:  { sym: "Gmaj9",         root: 31, third: 4, v: ["F#3", "A3", "B3", "D4"] },
  Cmaj9:  { sym: "Cmaj9",         root: 36, third: 4, v: ["E3", "G3", "B3", "D4"] },
  Fsm7b5: { sym: "F♯m7(♭5)",      root: 30, third: 3, v: ["E3", "A3", "C4"] },
  B7b9:   { sym: "B7(♭9)",        root: 35, third: 4, v: ["A3", "C4", "D#4", "F#4"] },
  Em9:    { sym: "Em9",           root: 28, third: 3, v: ["G3", "B3", "D4", "F#4"] },
  E7alt:  { sym: "E7(♭9♭13)",     root: 28, third: 4, v: ["G#3", "D4", "F4", "C5"] },
};
const LOOP = ["Am9", "D13", "Gmaj9", "Cmaj9", "Fsm7b5", "B7b9", "Em9", "E7alt"];
// the flip: the same loop, re-chopped and pitched a whole step down
const FLIP_SYM = { Am9: "Gm9", D13: "C13", Gmaj9: "Fmaj9", Cmaj9: "B♭maj9", Fsm7b5: "Em7(♭5)", B7b9: "A7(♭9)", Em9: "Dm9", E7alt: "D7(♭9♭13)" };
for (const [k, sym] of Object.entries(FLIP_SYM)) C[k + "_flip"] = { ...C[k], sym, root: C[k].root - 2, drop: 2 };
const SECTIONS = [
  { id: "intro", name: "針を落とす", bars: 4,  chords: ["Am9", "D13", "Gmaj9", "Cmaj9"], intensity: 0.3 },
  { id: "a",     name: "ループ",     bars: 16, chords: [...LOOP, ...LOOP], intensity: 0.7 },
  { id: "b",     name: "ソロ",       bars: 8,  chords: LOOP, intensity: 0.5 },
  { id: "c",     name: "フリップ",   bars: 8,  chords: LOOP.map(k => k + "_flip"), intensity: 0.9 },
  { id: "a2",    name: "ループ2",    bars: 12, chords: [...LOOP, ...LOOP.slice(0, 4)], intensity: 0.75 },
  { id: "outro", name: "針を上げる", bars: 4,  chords: ["Am9", "D13", "Gmaj9", "Am9"], intensity: 0.25 },
];

// piano chord slices "from the record" (original): [step, offset (s), lenSteps, speed, vel]
const CHOP = [
  [[0, 0, 3, 1, 1], [3, 0.4, 2, 1, 0.6], [6, 0, 4, 1, 0.85], [10, 0.2, 2, 1, 0.6], [12, 0, 3, 1, 0.8], [15, 0.5, 1, 1, 0.5]],
  [[0, 0, 4, 1, 0.95], [5, 0.3, 2, 1, 0.6], [7, 0, 3, 1, 0.8], [11, 0.6, 2, 1, 0.55], [13, 0, 3, 1, 0.75]],
];
const CHOP_FLIP = [
  [[0, 0.2, 2, 1, 1], [2, 0, 2, 1, 0.8], [4, 0, 1, 1, 0.7], [5, 0, 1, 1, 0.6], [6, 0.4, 3, 0.5, 0.85], [10, 0, 2, 1, 0.8], [12, 0.1, 4, 1, 0.9]],
  [[0, 0, 3, 1, 1], [4, 0.6, 2, 1, 0.6], [6, 0, 1, 1, 0.7], [7, 0, 1, 1, 0.6], [8, 0.3, 4, 0.5, 0.85], [13, 0, 3, 1, 0.8]],
];
// flute hook, cut from recordings (original): per 2 bars, [step, note, lenSteps]
const FLUTE = [
  [[2, "E5", 2], [4, "G5", 1], [5, "A5", 3], [10, "B5", 2], [12, "A5", 3]],
  [[0, "G5", 2], [2, "E5", 2], [6, "D5", 2], [8, "E5", 5]],
];

SONGS.push({
  id: "hari", no: 9, title: "針を落とす", date: "2026-09-26",
  bpm: 88, swing: 0.3, key: "A マイナー", genre: "ジャズ・サンプリング・ヒップホップ", tail: 4,
  masterGain: 0.8, comp: { threshold: -20, ratio: 3, attack: 0.01, release: 0.2 },
  accent: { light: "#8a5a2b", dark: "#d9a66c" },
  blurb: "ジャズのレコードに針を落として、ピアノの和音を切り出してループにしたような曲です。大きくヨレたビートの上で、フルートの短いフレーズとホーンの切れ端が鳴り、後半では同じネタを並べ替えて全音下げた「フリップ」に変わります。最後は回転が止まるように終わります。",
  parts: [["chop", "ピアノのループ"], ["flute", "フルート"], ["horns", "サックス・トランペット"], ["bass", "ベース"], ["drums", "ドラム"]],
  why: [
    ["レコードから切り出したピアノ", "和音の途中から切る", "ピアノの和音を、音の頭からだけでなく途中からも切り出し、帯域を狭めてわずかに回転を揺らし、レコードから抜いたように並べています。進行は Am9 → D13 → Gmaj9 → Cmaj9 → F♯m7(♭5) → B7(♭9) → Em9 → E7 のジャズの8小節です。", [["Ahmad Jamal Trio", 7], ["Enrico Pieranunzi", 12]]],
    ["ヨレたビート", "16分に30%のスウィング", "裏の16分を大きく遅らせ、キックとスネアの位置を少しずつずらした、手打ちのようなビートです。ドラムは TR-808 の実機録音を、こもらせて少し削っています。", [["A Tribe Called Quest", 7], ["Common", 9]]],
    ["フルートのフック", "短く切って左右に", "フルートの録音を短く切って2小節のフレーズを作り、音ごとに左右へ振っています。", [["Nujabes", 5]]],
    ["フリップ", "同じネタを並べ替えて全音下げる", "後半の8小節は、同じピアノのネタを別の順番で切り直し、全音下げて、ところどころ回転数を半分に落としています。ドラムも削って歪ませ、少し暗くしています。", [["Kanye West", 22], ["Madlib", 2]]],
    ["歩くベース", "4分音符で進む", "ベースはコードの根音・3度・5度と、次のコードへ半音で寄る音を4分音符で弾いて、歩くように進みます。", [["Robert Glasper", 9], ["Mac Miller", 5]]],
    ["ホーンの切れ端", "サックスとトランペット", "「ソロ」では、サックスとトランペットの録音を和音の形に重ねて短く切り、合いの手のように差し込んでいます。上には引き伸ばしたトランペットが薄く鳴ります。", [["Woody Shaw", 7], ["Kendrick Lamar", 33]]],
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const ch = kit.ch;
    let seed = 31; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const vel = v => v * (0.85 + 0.3 * rnd());

    kit.bus("rev", -9, new Tone.Filter(6000, "lowpass"), new Tone.Reverb({ decay: 2.6, preDelay: 0.02, wet: 1 }));
    kit.bus("dly", -13, new Tone.Filter(2500, "lowpass"), new Tone.PingPongDelay({ delayTime: D(3), feedback: 0.3, wet: 1 }));
    const st = { stereo: true };
    kit.channel("chop", -6, { rev: -16 }, st);
    kit.channel("flute", -11, { rev: -10, dly: -12 }, st);
    kit.channel("horns", -9, { rev: -9 }, st);
    kit.channel("bass", -9);
    kit.channel("drums", -9, { rev: -26 }, st);
    const glue = new Tone.Gain(1);
    glue.chain(new Tone.WaveShaper(x => Math.tanh(1.5 * x) / 1.5, 4096), new Tone.Filter(13000, "lowpass"), kit.master);
    for (const k of ["chop", "flute", "horns", "bass", "drums"]) { ch[k].disconnect(kit.master); ch[k].connect(glue); }

    // material
    const piano = kit.buffers("piano"), pianoRev = kit.buffers("piano", { reverse: true });
    const flute = kit.buffers("flute"), sax = kit.buffers("saxophone"), trumpet = kit.buffers("trumpet");
    const bassE = kit.buffers("bass-electric"), tr = kit.hits("tr808");

    // part inputs: the "record" is band-limited with a slight wow
    const chopLP = new Tone.Filter(5000, "lowpass", -24);
    const chopDist = new Tone.Distortion({ distortion: 0.5, wet: 0 });
    const chopIn = new Tone.Gain(1).chain(new Tone.Filter(140, "highpass"), chopLP, new Tone.Vibrato({ frequency: 0.5, depth: 0.02 }), chopDist, ch.chop);
    const fluteIn = new Tone.Gain(1).chain(new Tone.Filter(250, "highpass"), new Tone.Filter(7000, "lowpass"), ch.flute);
    const hornIn = new Tone.Gain(1).chain(new Tone.Filter(200, "highpass"), new Tone.Filter(5000, "lowpass"), ch.horns);
    const bassDist = new Tone.Distortion({ distortion: 0.5, wet: 0 });
    const bassIn = new Tone.Gain(1.6).chain(new Tone.Filter(900, "lowpass", -24), bassDist, ch.bass);
    const crushXf = new Tone.CrossFade(0), crushShaper = kit.shaper(16);
    const drumDist = new Tone.Distortion({ distortion: 0.6, wet: 0 });
    const drumLP = new Tone.Filter(6500, "lowpass");
    const drumIn = new Tone.Gain(1);
    drumIn.connect(crushXf.a); drumIn.connect(crushShaper); crushShaper.connect(crushXf.b);
    crushXf.chain(drumLP, drumDist, ch.drums);

    // one-shot slice of a buffer (fresh source per hit); nodes take the destination's context explicitly
    const live = new Map(), grains = new Map();
    const play = (buf, t, o = {}) => {
      const context = o.dest.context, rate = o.rate ?? 1;
      const src = new Tone.ToneBufferSource({ context, url: buf, playbackRate: rate, fadeIn: o.fadeIn ?? 0.003, fadeOut: o.fadeOut ?? 0.02, curve: "linear" });
      const pan = o.pan ? new Tone.Panner({ context, pan: o.pan }) : null;
      if (pan) src.chain(pan, o.dest); else src.connect(o.dest);
      src.onended = () => { live.delete(src); src.dispose(); if (pan) pan.dispose(); };
      if (o.rampTo) { src.playbackRate.setValueAtTime(rate, t); src.playbackRate.exponentialRampToValueAtTime(rate * o.rampTo, t + o.dur); }
      const off = Math.min(Math.max(0, o.offset ?? 0), Math.max(0, buf.duration - 0.05));
      live.set(src, t + (o.dur ?? (buf.duration - off) / rate));
      src.start(t, off, o.dur, o.gain ?? 1);
      return src;
    };
    const note = (set, midi, t, o = {}) => { const p = set.pick(midi); return play(p.buf, t, { ...o, rate: p.rate * (o.speed ?? 1) }); };
    const slice = (set, midis, t, o = {}) => midis.forEach(n => note(set, n, t, { ...o, gain: (o.gain ?? 1) / Math.sqrt(midis.length) }));
    const grain = (set, midi, t, dur, o = {}) => {
      const p = set.pick(midi), len = p.buf.duration, dest = o.dest, context = dest.context;
      const from = Math.max(0, Math.min(o.from ?? 0.2, len - 0.3)), to = Math.max(from + 0.2, Math.min(o.to ?? 1.2, len - 0.05));
      const gp = new Tone.GrainPlayer({ context, url: p.buf, playbackRate: o.speed ?? 0.25, detune: 1200 * Math.log2(p.rate), grainSize: 0.16, overlap: 0.08, loop: true, loopStart: from, loopEnd: to });
      const env = new Tone.Gain({ context, gain: 0 }), pan = new Tone.Panner({ context, pan: o.pan ?? 0 });
      gp.chain(env, pan, dest);
      const g = o.gain ?? 0.3, fade = Math.min(0.6, dur / 3);
      env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(g, t + fade);
      env.gain.setValueAtTime(g, t + dur - fade); env.gain.linearRampToValueAtTime(0, t + dur);
      gp.start(t, from); gp.stop(t + dur + 0.05);
      grains.set(gp, t + dur);
      gp.onstop = () => setTimeout(() => { grains.delete(gp); gp.dispose(); env.dispose(); pan.dispose(); }, 1500);
    };

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const r = chord.root;
      const drop = chord.drop ?? 0;
      const tones = [...chord.v.map(n => m(n) - drop), r + 24];
      const loop = id === "a" || id === "a2";
      const next = BARS[i + 1];

      // per-bar state (robust to seeking)
      at(T(i, 0), t => {
        chopLP.frequency.cancelScheduledValues(t);
        if (id === "intro") { chopLP.frequency.setValueAtTime(700 + local * 500, t); chopLP.frequency.linearRampToValueAtTime(1200 + local * 900, t + BAR); }
        else if (id === "outro") { chopLP.frequency.setValueAtTime(4000 - local * 900, t); chopLP.frequency.linearRampToValueAtTime(3100 - local * 900, t + BAR); }
        else chopLP.frequency.setValueAtTime(id === "b" ? 3000 : 5000, t);
        chopDist.wet.setValueAtTime(id === "c" ? 0.3 : 0, t);
        bassDist.wet.setValueAtTime(id === "c" ? 0.5 : 0, t);
        crushXf.fade.setValueAtTime(id === "c" ? 0.5 : 0.15, t);
        drumDist.wet.setValueAtTime(id === "c" ? 0.3 : 0, t);
      });

      // ----- chop: the piano "record" -----
      const chop = (pat, g = 1) => pat.forEach(([s, off, len, speed, v]) => at(T(i, s) + human(0.004), t => {
        slice(piano, tones, t, { offset: off, dur: D(len) * 0.95, speed, gain: vel(v) * g * (1 + off * 1.5), pan: (rnd() * 2 - 1) * 0.2, dest: chopIn });
        flash("chop", t);
      }));
      if (id === "intro") chop([[0, 0, 6, 1, 0.8], [8, 0.3, 6, 1, 0.6]]);
      else if (loop) chop(CHOP[local % 2], id === "a2" && local >= 8 ? 1 - (local - 7) * 0.15 : 1);
      else if (id === "b") chop([[0, 0, 8, 0.5, 0.8]]);                  // half-speed: the record slowed under the solo
      else if (id === "c") chop(CHOP_FLIP[local % 2], 0.6);             // distortion in the flip adds level
      else if (id === "outro") {
        if (local < 3) chop([[0, 0, 6, 1, 0.8 - local * 0.15], [8, 0.3, 6, 1, 0.6 - local * 0.12]]);
        else at(T(i, 0), t => { slice(piano, tones, t, { dur: D(10), gain: 0.8, rampTo: 0.1, dest: chopIn }); flash("chop", t); });   // the turntable stops
      }
      // rewind into the flip: reversed slices, faster and faster
      if (id === "b" && local === 7) for (let s = 10; s < 16; s++) at(T(i, s), t => { slice(pianoRev, tones, t, { offset: 0, dur: D(1), speed: 1.4 + (s - 10) * 0.3, gain: 0.7, pan: s % 2 ? 0.5 : -0.5, dest: chopIn }); flash("chop", t); });

      // ----- flute hook -----
      if ((id === "a" && local >= 4) || (id === "a2" && local < 8)) {
        const up = id === "a2" ? 12 : 0;
        FLUTE[local % 2].forEach(([s, n, len], j) => at(T(i, s) + human(0.004), t => {
          note(flute, m(n) + up, t, { offset: 0.06, dur: D(len) * 0.92, gain: vel(0.8), pan: (i + j) % 2 ? 0.45 : -0.45, fadeIn: 0.01, fadeOut: 0.04, dest: fluteIn });
          flash("flute", t);
        }));
      }

      // ----- horns: stabs in the solo, a stretched trumpet above -----
      if (id === "b") {
        const top = tones.slice(-3, -1).map(n => n + 12);
        [[0, 2, 0.9], [6, 1, 0.7], [10, 1, 0.75], [11, 2, 0.8]].forEach(([s, len, v], j) => { if (local % 2 || s < 8) at(T(i, s) + human(0.004), t => {
          slice(sax, top, t, { offset: 0.05, dur: D(len), gain: vel(v), pan: -0.4, fadeOut: 0.03, dest: hornIn });
          slice(trumpet, top.map(n => n + 12), t, { offset: 0.05, dur: D(len), gain: vel(v) * 0.7, pan: 0.4, fadeOut: 0.03, dest: hornIn });
          flash("horns", t);
        }); });
        if (local % 2 === 0) at(T(i, 0), t => grain(trumpet, tones[tones.length - 2] + 12, t, 2 * BAR, { dest: hornIn, pan: local % 4 ? 0.5 : -0.5, gain: 0.25 }));
      } else if (id === "c" && local % 2 === 1) {
        at(T(i, 14), t => { slice(sax, tones.slice(-3, -1), t, { offset: 0.05, dur: D(2), gain: 0.8, fadeOut: 0.03, dest: hornIn }); flash("horns", t); });
      }

      // ----- bass: walking quarter notes (root, third, fifth, approach to the next root) -----
      const bn = (s, midi, len, v) => at(T(i, s) + human(0.004), t => { note(bassE, midi, t, { offset: 0.02, dur: D(len), gain: vel(v), fadeOut: 0.04, dest: bassIn }); flash("bass", t); });
      if (loop || id === "b") {
        const nr = next ? next.chord.root - (next.chord.drop ?? 0) : r;
        const approach = nr > r ? nr - 1 : nr + 1;
        [[0, r], [4, r + chord.third], [8, r + 7], [12, approach]].forEach(([s, n]) => bn(s, n, 3.6, s === 0 ? 1 : 0.8));
        if (local % 4 === 3) bn(15, approach, 1, 0.5);
      } else if (id === "c") {
        bn(0, r, 6, 1); bn(8, r, 4, 0.9); bn(14, r + 12, 2, 0.6);
      } else if (id === "outro" && local < 3) {
        bn(0, r, 12, 0.8);
      }

      // ----- drums: dusty, swung TR-808 -----
      const dg = id === "c" ? 0.6 : 1;                                // crushed, distorted drums in the flip need less level in
      const hit = (s, name, v = 1, o = {}) => at(T(i, s) + human(0.004), t => { play(tr[name], t, { dest: drumIn, fadeIn: 0.001, fadeOut: 0.01, gain: vel(v) * dg, ...o }); if (name.startsWith("bd") || name.startsWith("sd")) flash("drums", t); });
      if (loop || id === "c") {
        const heavy = id === "c";
        hit(0, "bd-mid", 1, { rate: 0.85 }); hit(7, "bd-mid", 0.6, { rate: 0.85 }); hit(10, "bd-mid", 0.9, { rate: 0.85 });
        if (heavy) { hit(3, "bd-mid", 0.6, { rate: 0.85 }); hit(8, "bd-long", 0.7, { rate: 0.9, dur: D(4) }); }
        for (const s of [4, 12]) { hit(s, heavy ? "sd-snappy" : "sd-mid", 1, { rate: 0.95 }); hit(s, heavy ? "clap" : "rim", 0.5, { pan: 0.1 }); }
        hit(9, "rim", 0.25, { pan: -0.2 }); hit(14, "rim", 0.2, { pan: 0.2 });
        for (let s = 0; s < 16; s += 2) hit(s, "hat-closed", s % 4 === 0 ? 0.55 : 0.4, { rate: 0.9, pan: 0.3 });
        if (local % 2) hit(14, "hat-open", 0.4, { pan: -0.3, rate: 0.9 });
      } else if (id === "b") {
        hit(0, "bd-mid", 0.8, { rate: 0.85 }); hit(10, "bd-mid", 0.6, { rate: 0.85 });
        [4, 12].forEach(s => hit(s, "rim", 0.6));
        for (let s = 0; s < 16; s += 4) hit(s, "hat-closed", 0.4, { pan: 0.3, rate: 0.9 });
      } else if (id === "outro" && local < 2) {
        hit(0, "bd-mid", 0.8 - local * 0.2, { rate: 0.85 }); hit(12, "rim", 0.5 - local * 0.15);
      } else if (id === "intro" && local === 3) {
        [12, 14].forEach(s => hit(s, "rim", 0.4));
      }
    });

    return {
      releaseAll() {
        live.forEach((end, s) => { try { s.stop(); } catch {} });
        grains.forEach((end, gp) => { try { gp.stop(); } catch {} });
      },
    };
  },
});
})();
