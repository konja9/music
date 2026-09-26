// No.8 スキップ — sample collage built only from the newer material: real TR-808 hits, harp / nylon guitar / xylophone
// slices, stretched cello and contrabass, reversed organ, and a synthesized voice reading words from the listening history.
// the song "skips": three times it is cut off mid-bar, a voice says "skip", and a different "track" starts
(() => {
const C = {
  Dm9:    { sym: "Dm9",          root: 26, v: ["F3", "A3", "C4", "E4"] },
  Bbmaj7: { sym: "B♭maj7(♯11)",  root: 34, v: ["F3", "A3", "D4", "E4"] },
  Gm11:   { sym: "Gm11",         root: 31, v: ["F3", "Bb3", "C4", "D4"] },
  A7b9:   { sym: "A7(♭9)",       root: 33, v: ["G3", "Bb3", "C#4", "E4"] },
  Fmaj9:  { sym: "Fmaj9",        root: 29, v: ["E3", "G3", "A3", "C4"] },
  Em7b5:  { sym: "Em7(♭5)",      root: 28, v: ["D3", "G3", "Bb3", "C4"] },
  C6:     { sym: "C6",           root: 36, v: ["E3", "G3", "A3", "C4"] },
};
// the fall: the contrabass holds D while the harp's D minor chord sinks a half step per bar
["Dm", "C♯m/D", "Cm/D", "Bm/D", "B♭m/D", "Am/D", "A♭m/D", "Gm/D"].forEach((sym, k) => {
  C["fall" + k] = { sym, root: 26, v: ["D4", "F4", "A4"], drop: k };
});
const LOOP = ["Dm9", "Bbmaj7", "Gm11", "A7b9"];
const SECTIONS = [
  { id: "intro", name: "再生",        bars: 4,  chords: LOOP, intensity: 0.3 },
  { id: "a",     name: "1曲目",       bars: 12, chords: LOOP, intensity: 0.7 },
  { id: "b",     name: "2曲目",       bars: 8,  chords: ["Fmaj9", "Em7b5", "A7b9", "Dm9"], intensity: 0.5 },
  { id: "c",     name: "3曲目",       bars: 6,  chords: ["Bbmaj7", "C6", "Dm9", "C6"], intensity: 0.6 },
  { id: "fall",  name: "沈む",        bars: 8,  chords: [0, 1, 2, 3, 4, 5, 6, 7].map(k => "fall" + k), intensity: 1 },
  { id: "a2",    name: "1曲目をもう一度", bars: 12, chords: LOOP, intensity: 0.8 },
  { id: "outro", name: "停止",        bars: 4,  chords: ["Dm9", "Bbmaj7", "Gm11", "Dm9"], intensity: 0.25 },
];
// where each "track" is skipped: { section: { bar: step } } — each skip comes sooner than the last
const CUT = { a: { 11: 10 }, b: { 7: 6 }, c: { 5: 4 }, fall: { 7: 8 } };

// harp / nylon chord slices (original): [step, source, offset (s), lenSteps, speed, vel]
const TOP_A = [
  [[0, "harp", 0, 3, 1, 1], [3, "nylon", 0.2, 2, 1, 0.7], [6, "harp", 0, 2, 1, 0.8], [8, "harp", 0.5, 3, 1, 0.7], [11, "nylon", 0, 1, 1, 0.6], [12, "harp", 0.1, 3, 0.5, 0.8]],
  [[0, "nylon", 0, 2, 1, 0.9], [2, "nylon", 0.3, 1, 1, 0.6], [4, "harp", 0, 3, 1, 0.8], [8, "harp", 0.25, 2, 0.5, 0.75], [10, "nylon", 0, 2, 1, 0.7], [14, "harp", 0.6, 2, 1, 0.6]],
];
// voice slices like cut-up vocals (original): [step, word, offset (s), lenSteps, speed]
const VOX_A = [
  [[4, "play", 0.05, 2, 1], [6, "play", 0.12, 1, 1.5], [12, "next", 0.05, 2, 1]],
  [[2, "skip", 0.05, 1, 1.26], [3, "skip", 0.05, 1, 1], [8, "play", 0.1, 2, 0.75], [14, "next", 0.15, 2, 1.5]],
];
const VOX_B = [
  [[0, "shuffle", 0.05, 2, 1], [3, "shuffle", 0.2, 1, 1.5], [6, "repeat", 0.05, 2, 0.75], [12, "play", 0.05, 1, 2]],
  [[4, "next", 0.05, 1, 1], [5, "next", 0.05, 1, 1.26], [6, "next", 0.05, 2, 1.5], [10, "skip", 0.05, 3, 0.5]],
];

SONGS.push({
  id: "skip", no: 8, title: "スキップ", date: "2026-09-26",
  bpm: 92, swing: 0.08, key: "D マイナー", genre: "サンプル・コラージュ", tail: 4,
  masterGain: 0.8, comp: { threshold: -20, ratio: 3, attack: 0.008, release: 0.2 },
  accent: { light: "#4a5d78", dark: "#9fb3cf" },
  blurb: "再生履歴の「スキップ」を曲にしました。合成した声が「skip」と言うたびに、小節の途中で曲が切れて別の曲が始まり、飛ばすまでの時間はだんだん短くなります。ドラムは本物の TR-808 の録音、上ネタはハープとナイロン弦ギター、背景はチェロとコントラバスを引き伸ばした音です。ヘッドホン推奨です。",
  parts: [["top", "ハープ・ギター・木琴"], ["voice", "声"], ["bed", "持続音・逆回転"], ["bass", "808の低音"], ["drums", "TR-808"]],
  why: [
    ["飛ばされる曲", "小節の途中で切れる", "3回、曲が小節の途中で断ち切られ、合成した声の「skip」のあとに別の曲が始まります。1曲目は10、2曲目は6、3曲目は4ステップ目で切れ、飛ばすまでがだんだん短くなります。スキップ率がいちばん高いのは藤井風（36%）でした。", [["藤井風", 13], ["Enrico Pieranunzi", 12]]],
    ["飛ばされない曲", "最後まで聴く", "最後は1曲目に戻り、今度は切らずに最後まで流します。スキップ率がいちばん低いのはさよならポニーテール（3%）で、ほとんど飛ばさずに聴いています。", [["さよならポニーテール", 17], ["Aimer", 9]]],
    ["合成した声", "履歴の言葉を読む", "play、skip、next、shuffle といった操作の言葉と、「one thousand two hundred ninety hours（約1,290時間）」などの履歴の数字を合成音声で読ませ、切り刻んで左右に振っています。", [["Radiohead", 10]]],
    ["本物の808", "実機の録音", "ドラムは TR-808 の実機から録った音です。いちばん低いキックは音程を変えてベースラインとして鳴らしています。", [["Kanye West", 22], ["JPEGMAFIA", 23]]],
    ["沈む和音", "コントラバスは D のまま", "「沈む」では、引き伸ばしたコントラバスが D を鳴らし続け、ハープの和音だけが1小節ごとに半音ずつ下がっていきます。ドラムは削って歪ませ、最後は「end of track」で止まります。", [["Nine Inch Nails", 40], ["JPEGMAFIA", 23]]],
    ["引き伸ばした弦", "チェロとコントラバス", "チェロとコントラバスの録音を細かい粒に分けて並べ直し、音程を保ったまま何倍にも伸ばして背景にしています。オルガンの和音は逆再生で区間の頭に吸い込ませています。", [["Radiohead", 10]]],
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const ch = kit.ch;
    let seed = 23; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const vel = v => v * (0.85 + 0.3 * rnd());

    kit.bus("rev", -8, new Tone.Filter(7000, "lowpass"), new Tone.Reverb({ decay: 3.2, preDelay: 0.02, wet: 1 }));
    kit.bus("dly", -12, new Tone.Filter(3000, "lowpass"), new Tone.PingPongDelay({ delayTime: D(3), feedback: 0.3, wet: 1 }));
    const st = { stereo: true };
    kit.channel("top", -6, { rev: -14 }, st);
    kit.channel("voice", -1, { rev: -10, dly: -10 }, st);
    kit.channel("bed", -6, { rev: -6 }, st);
    kit.channel("bass", -10);
    kit.channel("drums", -8, { rev: -26 }, st);
    // light tape saturation over the song (tanh keeps small signals at unity gain)
    const glue = new Tone.Gain(1);
    glue.chain(new Tone.WaveShaper(x => Math.tanh(1.5 * x) / 1.5, 4096), new Tone.Filter(14000, "lowpass"), kit.master);
    for (const k of ["top", "voice", "bed", "bass", "drums"]) { ch[k].disconnect(kit.master); ch[k].connect(glue); }

    // material
    const harp = kit.buffers("harp"), nylon = kit.buffers("guitar-nylon"), xylo = kit.buffers("xylophone");
    const cello = kit.buffers("cello"), bassArco = kit.buffers("contrabass"), organRev = kit.buffers("organ", { reverse: true });
    const tr = kit.hits("tr808"), trRev = kit.hits("tr808", { reverse: true }), voice = kit.hits("voice");
    const SRC = { harp, nylon };

    // part inputs
    const topLP = new Tone.Filter(7000, "lowpass", -24);
    const topIn = new Tone.Gain(1).chain(new Tone.Filter(150, "highpass"), topLP, ch.top);
    const voiceIn = new Tone.Gain(1).chain(new Tone.Filter(200, "highpass"), new Tone.Filter(6000, "lowpass"), ch.voice);
    const bedDist = new Tone.Distortion({ distortion: 0.8, wet: 0 });
    const bedIn = new Tone.Gain(1);
    bedIn.chain(bedDist, new Tone.Chorus({ frequency: 0.25, delayTime: 7, depth: 0.5, spread: 180, wet: 0.5 }).start(), new Tone.StereoWidener(0.65), ch.bed);
    const bassDist = new Tone.Distortion({ distortion: 0.6, wet: 0.35 });
    const bassIn = new Tone.Gain(1).chain(bassDist, new Tone.Filter(1400, "lowpass"), ch.bass);
    const crushXf = new Tone.CrossFade(0), crushShaper = kit.shaper(10);
    const drumDist = new Tone.Distortion({ distortion: 0.7, wet: 0 });
    const drumIn = new Tone.Gain(1);
    drumIn.connect(crushXf.a); drumIn.connect(crushShaper); crushShaper.connect(crushXf.b);
    crushXf.chain(drumDist, ch.drums);

    // one-shot slice of a buffer (fresh source per hit); nodes take the destination's context explicitly
    const live = new Map(), grains = new Map();       // source -> time it ends on its own
    const play = (buf, t, o = {}) => {
      const context = o.dest.context, rate = o.rate ?? 1;
      const src = new Tone.ToneBufferSource({ context, url: buf, playbackRate: rate, fadeIn: o.fadeIn ?? 0.003, fadeOut: o.fadeOut ?? 0.02, curve: "linear" });
      const pan = o.pan ? new Tone.Panner({ context, pan: o.pan }) : null;
      if (pan) src.chain(pan, o.dest); else src.connect(o.dest);
      src.onended = () => { live.delete(src); src.dispose(); if (pan) pan.dispose(); };
      const off = Math.min(Math.max(0, o.offset ?? 0), Math.max(0, buf.duration - 0.05));
      live.set(src, t + (o.dur ?? (buf.duration - off) / rate));
      src.start(t, off, o.dur, o.gain ?? 1);
      return src;
    };
    const note = (set, midi, t, o = {}) => { const p = set.pick(midi); return play(p.buf, t, { ...o, rate: p.rate * (o.speed ?? 1) }); };
    const slice = (set, midis, t, o = {}) => midis.forEach(n => note(set, n, t, { ...o, gain: (o.gain ?? 1) / Math.sqrt(midis.length) }));
    // reversed swell whose end (the original attack) lands on tEnd, spread left/right
    const swell = (set, midis, tEnd, len, gain = 0.8) => midis.forEach(n => {
      const p = set.pick(n);
      [-0.6, 0.6].forEach((pan, j) => at(tEnd - len + j * 0.012, t => play(p.buf, t, { rate: p.rate, offset: Math.max(0, p.buf.duration - len * p.rate), dur: len, pan, gain: gain / Math.sqrt(midis.length), fadeIn: 0.05, fadeOut: 0.01, dest: bedIn })));
    });
    // granular stretch: keeps pitch (detune) while crawling through the recording
    const grain = (set, midi, t, dur, o = {}) => {
      const p = set.pick(midi), len = p.buf.duration, dest = o.dest ?? bedIn, context = dest.context;
      const from = Math.max(0, Math.min(o.from ?? 0.2, len - 0.3)), to = Math.max(from + 0.2, Math.min(o.to ?? 1.5, len - 0.05));
      const gp = new Tone.GrainPlayer({ context, url: p.buf, playbackRate: o.speed ?? 0.3, detune: 1200 * Math.log2(p.rate), grainSize: 0.18, overlap: 0.09, loop: true, loopStart: from, loopEnd: to });
      const env = new Tone.Gain({ context, gain: 0 }), pan = new Tone.Panner({ context, pan: o.pan ?? 0 });
      gp.chain(env, pan, dest);
      const g = o.gain ?? 0.5, fade = Math.min(0.6, dur / 3);
      env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(g, t + fade);
      env.gain.setValueAtTime(g, t + dur - fade); env.gain.linearRampToValueAtTime(0, t + dur);
      gp.start(t, from); gp.stop(t + dur + 0.05);
      grains.set(gp, { env, end: t + dur });
      gp.onstop = () => setTimeout(() => { grains.delete(gp); gp.dispose(); env.dispose(); pan.dispose(); }, 1500);
    };
    // the skip: everything still sounding is cut at t (only sources that would still be playing)
    const stopAll = t => {
      live.forEach((end, src) => { if (end > t) src.stop(t); });
      grains.forEach((g, gp) => { if (g.end > t) { g.env.gain.cancelScheduledValues(t); g.env.gain.setValueAtTime(g.env.gain.getValueAtTime(t), t); g.env.gain.linearRampToValueAtTime(0, t + 0.02); } });
    };
    const asSet = buf => ({ pick: () => ({ buf, rate: 1 }) });       // an unpitched recording used where a note set is expected
    const drum = (name, t, o = {}) => play((o.rev ? trRev : tr)[name], t, { dest: drumIn, fadeIn: 0.001, fadeOut: 0.01, ...o });
    const say = (word, t, o = {}) => { play(voice[word], t, { dest: voiceIn, fadeIn: 0.005, ...o }); flash("voice", t); };

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const r = chord.root;
      const tones = chord.v.map(n => m(n) - (chord.drop ?? 0));
      const cut = CUT[id] && CUT[id][local];
      const on = s => cut == null || s < cut;                          // nothing is scheduled after the skip
      const theme = id === "a" || id === "a2";

      // per-bar state (robust to seeking)
      at(T(i, 0), t => {
        topLP.frequency.setValueAtTime({ intro: 2500, b: 3500, fall: 4500, outro: 2200 }[id] ?? 7000, t);
        bedDist.wet.setValueAtTime(id === "fall" ? 0.6 : 0, t);
        bassDist.wet.setValueAtTime(id === "fall" ? 0.85 : 0.35, t);
        crushXf.fade.setValueAtTime(id === "fall" ? 0.65 : 0.05, t);
        drumDist.wet.setValueAtTime(id === "fall" ? 0.45 : 0.05, t);
      });

      // ----- the skips and the spoken cues -----
      if (cut != null) {
        at(T(i, cut), t => {
          stopAll(t);
          drum("rim", t, { rate: 1.6, gain: 0.7 });                    // the button
          if (id === "fall") say("end-of-track", t + 0.02, { gain: 1 });
          else say("skip", t + 0.02, { gain: 1, pan: rnd() < 0.5 ? -0.2 : 0.2 });
        });
      }
      if (id === "intro" && local === 0) at(T(i, 0), t => say("play", t, { gain: 1 }));
      if (id === "a2" && local === 0) at(T(i, 0), t => say("repeat", t, { gain: 0.9 }));
      if (id === "outro" && local === 1) at(T(i, 4), t => say("pause", t, { gain: 0.9 }));
      if (id === "outro" && local === 3) at(T(i, 0), t => say("no-signal", t, { gain: 0.9 }));
      // "one thousand two hundred ninety hours", stretched over two bars
      if (id === "fall" && local === 0) at(T(i, 0), t => grain(asSet(voice["hours-1290"]), 0, t, 2 * BAR, { speed: 0.35, from: 0.1, to: 2.9, gain: 0.8, dest: voiceIn }));
      if (id === "c" && local === 2) at(T(i, 0), t => say("seventeen-hundred", t, { gain: 0.7, pan: -0.5 }));
      if (id === "b" && local === 4) at(T(i, 8), t => say("plays-1143", t, { gain: 0.5, rate: 0.8, pan: 0.5 }));

      // ----- top: harp / nylon slices, xylophone -----
      const topHit = (s, fn) => { if (on(s)) at(T(i, s) + human(0.003), t => { fn(t); flash("top", t); }); };
      if (theme) {
        const g = id === "a2" && local >= 8 ? 1 - (local - 7) * 0.15 : 1;
        TOP_A[local % 2].forEach(([s, src, off, len, speed, v]) => topHit(s, t => slice(SRC[src], tones, t, { offset: off, dur: D(len) * 0.95, speed, gain: vel(v) * g * (1 + off), pan: (rnd() * 2 - 1) * 0.25, dest: topIn })));
        topHit(15, t => note(xylo, tones[tones.length - 1] + 24, t, { dur: D(1), gain: vel(0.35), pan: 0.5, dest: topIn }));
      } else if (id === "intro") {
        [0, 6].forEach(s => topHit(s, t => slice(harp, tones, t, { dur: D(6), gain: 0.6, pan: s ? 0.3 : -0.3, dest: topIn })));
      } else if (id === "b") {
        // track 2: slow nylon picking, one note at a time
        [0, 3, 6, 8, 11, 14].forEach((s, j) => topHit(s, t => note(nylon, tones[j % tones.length] + (j > 3 ? 12 : 0), t, { dur: D(3), gain: vel(0.7), pan: j % 2 ? 0.35 : -0.35, dest: topIn })));
      } else if (id === "c") {
        // track 3: bright xylophone 16ths through the chord
        for (let s = 0; s < 16; s++) topHit(s, t => note(xylo, tones[s % tones.length] + 24 + (s % 8 === 7 ? 12 : 0), t, { dur: D(1), gain: vel(s % 4 === 0 ? 0.55 : 0.35), pan: s % 2 ? 0.5 : -0.5, dest: topIn }));
        [0, 8].forEach(s => topHit(s, t => slice(harp, tones, t, { dur: D(4), gain: 0.5, dest: topIn })));
      } else if (id === "fall") {
        // the same D minor chord, a half step lower every bar
        [0, 3, 6, 8, 11, 14].forEach(s => topHit(s, t => slice(harp, tones, t, { offset: s % 3 ? 0.2 : 0, dur: D(s === 0 || s === 8 ? 3 : 2), gain: vel(0.9), pan: (rnd() * 2 - 1) * 0.3, dest: topIn })));
      } else if (id === "outro" && local < 3) {
        topHit(0, t => slice(harp, tones, t, { dur: D(12), gain: 0.55 - local * 0.12, dest: topIn }));
      }

      // ----- voice slices -----
      const vox = list => list.forEach(([s, word, off, len, speed], j) => { if (on(s)) at(T(i, s) + human(0.004), t => say(word, t, { offset: off, dur: D(len) * 0.9, rate: speed, gain: vel(0.85), pan: (i + j) % 2 ? 0.7 : -0.7 })); });
      if (id === "a" && local >= 2) vox(VOX_A[local % 2]);
      else if (id === "a2" && local >= 1 && local < 10) vox(VOX_B[local % 2]);
      else if (id === "fall" && local >= 2 && local % 2 === 0) vox([[4, "skip", 0.05, 1, 0.75], [12, "skipped", 0.05, 2, 0.5]]);

      // ----- bed: stretched strings, reversed organ -----
      if (id === "intro" || id === "b" || (theme && local % 2 === 0) || id === "outro") {
        if (on(0)) at(T(i, 0), t => {
          const len = (id === "intro" || id === "outro" || id === "b" ? 1 : 2) * BAR + 0.3;
          grain(cello, r + 24, t, len, { speed: 0.25, gain: id === "outro" ? 0.45 - local * 0.1 : 0.4, pan: -0.4 });
          grain(cello, r + 31, t, len, { speed: 0.3, gain: 0.3, pan: 0.4 });
          flash("bed", t);
        });
      }
      if (id === "fall") at(T(i, 0), t => { grain(bassArco, 38, t, BAR + (local === 7 ? -D(8) : 0.3), { speed: 0.2, gain: 0.4 }); flash("bed", t); });
      // reversed organ swells into the next bar at phrase ends and before each new "track"
      const next = BARS[i + 1];
      if (next && on(12) && (local % 4 === 3 || (next.sec !== sec && next.local === 0 && cut == null))) {
        swell(organRev, next.chord.v.map(n => m(n) - (next.chord.drop ?? 0)), T(i + 1, 0), D(4), 0.7);
      }

      // ----- bass: the long 808 kick, retuned to the root (it sits at about G1) -----
      const bn = (s, midi, len, v) => { if (on(s)) at(T(i, s), t => { play(tr["bd-long"], t, { rate: 2 ** ((midi - 31) / 12), dur: D(len), gain: vel(v), dest: bassIn, fadeOut: 0.05 }); flash("bass", t); }); };
      if (theme && !(id === "a2" && local >= 10)) [[0, 0, 5, 1], [7, 0, 2, 0.8], [10, 0, 3, 0.9], [14, 12, 2, 0.6]].forEach(([s, iv, len, v]) => bn(s, r + iv, len, v));
      else if (id === "b") { bn(0, r, 8, 0.9); bn(11, r, 4, 0.6); }
      else if (id === "c") [0, 6, 8, 14].forEach(s => bn(s, r, 2, 0.85));
      else if (id === "fall") [[0, 6], [6, 2], [8, 4], [12, 3]].forEach(([s, len]) => bn(s, 26, len, 1));
      else if (id === "outro" && local === 0) bn(0, r, 12, 0.8);

      // ----- drums: TR-808 recordings -----
      const dg = id === "fall" ? 0.55 : 1;                            // the crushed, distorted drums of the fall need less level in
      const hit = (s, name, v = 1, o = {}) => { if (on(s)) at(T(i, s) + (o.late ? 0 : human(0.003)), t => { drum(name, t, { gain: vel(v) * dg, ...o }); if (name.startsWith("bd") || name.startsWith("sd")) flash("drums", t); }); };
      if (theme && !(id === "a2" && local >= 10)) {
        hit(0, "bd-mid"); if (local % 2) hit(7, "bd-short", 0.6); hit(10, "bd-mid", 0.8);
        hit(4, "sd-mid"); hit(4, "clap", 0.6, { pan: 0.1 }); hit(12, "sd-mid"); hit(12, "clap", 0.6, { pan: -0.1 });
        const roll = local % 4 === 3;
        for (let s = 0; s < (roll ? 12 : 16); s += 2) hit(s, "hat-closed", s % 4 === 0 ? 0.6 : 0.4, { pan: 0.3 });
        if (roll) for (let r3 = 0; r3 < 6; r3++) hit(12 + r3 * 2 / 3, "hat-closed", 0.3 + 0.07 * r3, { pan: 0.3 });
        if (local % 2) hit(14, "hat-open", 0.5, { pan: -0.3 });
      } else if (id === "a2") {
        hit(0, "bd-mid", 0.7); hit(12, "rim", 0.6);
      } else if (id === "b") {
        // track 2: half time, rim and cowbell, congas
        hit(0, "bd-mid", 0.9); hit(8, "sd-tone", 0.8); hit(6, "rim", 0.6, { pan: 0.2 }); hit(14, "cowbell", 0.35, { pan: -0.4 });
        [3, 10, 11].forEach((s, j) => hit(s, j ? "conga-high" : "conga-low", 0.5, { pan: j ? 0.5 : -0.5 }));
      } else if (id === "c") {
        // track 3: four on the floor with maracas and clave
        [0, 4, 8, 12].forEach(s => hit(s, "bd-short", 0.9)); [4, 12].forEach(s => hit(s, "clap", 0.7));
        for (let s = 0; s < 16; s++) hit(s, "maracas", s % 2 ? 0.3 : 0.5, { pan: 0.4 });
        [0, 3, 6, 10, 12].forEach(s => hit(s, "clave", 0.4, { pan: -0.4 }));
      } else if (id === "fall") {
        hit(0, "bd-mid"); hit(3, "bd-mid", 0.7); hit(8, "bd-mid"); hit(11, "bd-mid", 0.7);
        hit(4, "sd-snappy"); hit(12, "sd-snappy"); if (local % 2) hit(14.5, "sd-snappy", 0.5);
        for (let s = 0; s < 16; s += 0.5) hit(s, "hat-closed", s % 1 ? 0.25 : 0.45, { pan: 0.3 });
        if (local === 0) hit(0, "cymbal", 0.6);
        if (local === 6) at(T(i + 1, 0) - D(8), t => drum("cymbal", t, { rev: true, gain: 0.6, dur: D(8) }));   // reversed cymbal into the last bar
      } else if (id === "intro" && local === 3) {
        [12, 13, 14, 15].forEach((s, j) => hit(s, "tom-" + ["high", "high", "mid", "low"][j], 0.5 + 0.1 * j, { pan: 0.4 - j * 0.25 }));
      } else if (id === "outro" && local === 0) {
        hit(0, "bd-mid", 0.8); hit(0, "cymbal", 0.5);
      }
    });

    return {
      releaseAll() {
        live.forEach((end, s) => { try { s.stop(); } catch {} });
        grains.forEach((g, gp) => { try { gp.stop(); } catch {} });
      },
    };
  },
});
})();
