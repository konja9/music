// No.6 つまずき — jazz rock that sounds like odd meter: 3+3+2 accents and a 7-step riff over 4/4
// first song with recorded instruments (kit.sampler): brass, sax, guitar, bass. drums stay synthesized
(() => {
const C = {
  EmP:      { sym: "Em7",             root: 28, v: ["E3", "G3", "B3", "D4"] },
  Em9:      { sym: "Em9",             root: 28, v: ["G3", "B3", "D4", "F#4"] },
  Cmaj7s11: { sym: "Cmaj7(♯11)",      root: 36, v: ["E3", "G3", "B3", "F#4"] },
  Am11:     { sym: "Am11",            root: 33, v: ["G3", "C4", "D4", "E4"] },
  B7s9:     { sym: "B7(♯9)",          root: 35, v: ["D#3", "A3", "D4"] },
  FoE:      { sym: "Fmaj7(♯11)/E",    root: 28, v: ["F3", "A3", "B3", "E4"], pc: 41 },
  G13:      { sym: "G13",             root: 31, v: ["F3", "B3", "E4"] },
  B7alt:    { sym: "B7(♭9♭13)",       root: 35, v: ["A3", "C4", "D#4", "G4"] },
  Em11q:    { sym: "Em11",            root: 28, v: ["A3", "D4", "G4"] },
  Cq:       { sym: "Cmaj7(♯11)",      root: 36, v: ["F#3", "B3", "E4"] },
  // the fall: E G B fixed on top, bass down a half step per bar
  EmE:      { sym: "Em",              root: 40, v: ["B3", "E4", "G4"] },
  EmDs:     { sym: "Em/D♯",           root: 39, v: ["B3", "E4", "G4"] },
  EmD:      { sym: "Em/D",            root: 38, v: ["B3", "E4", "G4"] },
  EmCs:     { sym: "Em/C♯",           root: 37, v: ["B3", "E4", "G4"] },
  EmC:      { sym: "Em/C",            root: 36, v: ["B3", "E4", "G4"] },
  EmB:      { sym: "Em/B",            root: 35, v: ["B3", "E4", "G4"] },
  EmBb:     { sym: "Em/B♭",           root: 34, v: ["B3", "E4", "G4"] },
};
const A8 = ["Em9", "Cmaj7s11", "Am11", "B7s9", "Em9", "FoE", "G13", "B7alt"];
const SECTIONS = [
  { id: "intro", name: "イントロ", bars: 8,  chords: ["EmP"], intensity: 0.35 },
  { id: "a",     name: "テーマ",   bars: 16, chords: [...A8, ...A8], intensity: 0.75 },
  { id: "b",     name: "ソロ",     bars: 8,  chords: ["Em11q", "Em11q", "Cq", "Cq", "Em11q", "Em11q", "Cq", "B7s9"], intensity: 0.45 },
  { id: "maze",  name: "迷路",     bars: 8,  chords: ["EmP", "FoE", "EmP", "FoE", "EmP", "FoE", "G13", "B7s9"], intensity: 0.8 },
  { id: "kime",  name: "キメ",     bars: 4,  chords: ["Cmaj7s11", "B7s9", "Cmaj7s11", "B7alt"], intensity: 0.6 },
  { id: "fall",  name: "崩落",     bars: 8,  chords: ["EmE", "EmDs", "EmD", "EmCs", "EmC", "EmB", "EmBb", "B7s9"], intensity: 1 },
  { id: "a2",    name: "テーマ2",  bars: 16, chords: [...A8, ...A8], intensity: 0.9 },
  { id: "outro", name: "アウトロ", bars: 3,  chords: ["EmP", "EmP", "FoE"], intensity: 0.4 },
];

// the 3+3+2+3+3+2 grid every theme bar leans on
const ACC = [0, 3, 6, 8, 11, 14];
// 7-step riff (original): [offset in the 7-cycle, note, durSteps]
const RIFF7 = [[0, "E2", 2], [2, "G2", 1], [3, "E2", 1], [4, "A#2", 1], [5, "B2", 2]];
const RIFF_SHIFT = { EmP: 0, FoE: 0, G13: 3, B7s9: 7 };
// theme (original): [step, note, durSteps] per bar of the 8-bar phrase
const MEL_A = [
  [[0, "B4", 3], [3, "D5", 3], [6, "E5", 2], [8, "F#5", 3], [11, "G5", 3], [14, "F#5", 2]],
  [[0, "E5", 6], [6, "B4", 2], [8, "C5", 3], [11, "D5", 3], [14, "E5", 2]],
  [[0, "G5", 3], [3, "E5", 3], [6, "D5", 2], [8, "C5", 6], [14, "A4", 2]],
  [[0, "B4", 3], [3, "D5", 3], [6, "D#5", 2], [8, "F#5", 4], [12, "A5", 4]],
  [[0, "G5", 3], [3, "F#5", 3], [6, "E5", 2], [8, "B4", 3], [11, "D5", 3], [14, "E5", 2]],
  [[0, "F5", 6], [6, "E5", 2], [8, "C5", 3], [11, "B4", 3], [14, "A4", 2]],
  [[0, "B4", 3], [3, "D5", 3], [6, "F5", 2], [8, "E5", 8]],
  [[0, "D#5", 2], [3, "D#5", 2], [6, "D#5", 2], [8, "C5", 3], [11, "A4", 3], [14, "G4", 2]],
];
// last bar of each theme: hit together, then everyone stops at step 10
const MEL_END = [[0, "B4", 2], [3, "B4", 2], [6, "B4", 2], [8, "E5", 2]];
// sax solo over the quartal vamp (original)
const SOLO_B = [
  [[4, "B3", 2], [6, "C#4", 2], [8, "D4", 4], [12, "E4", 2], [14, "F#4", 2]],
  [[0, "G4", 6], [8, "F#4", 2], [10, "D4", 2], [12, "B3", 4]],
  [[2, "A3", 2], [4, "B3", 2], [6, "D4", 2], [8, "E4", 2], [10, "G4", 2], [12, "A4", 4]],
  [[0, "G#4", 2], [2, "A4", 2], [4, "G4", 4], [8, "E4", 8]],
  [[4, "E4", 2], [6, "F#4", 2], [8, "A4", 2], [10, "B4", 2], [12, "D5", 4]],
  [[0, "C#5", 4], [4, "B4", 2], [6, "A4", 2], [8, "F#4", 4], [12, "E4", 4]],
  [[0, "D4", 2], [2, "E4", 2], [4, "F4", 2], [6, "F#4", 2], [8, "G4", 2], [10, "G#4", 2], [12, "A4", 2], [14, "A#4", 2]],
  [[0, "B4", 12]],
];
// sax counter-line for the second half of the last theme
const SAX_A2 = [
  [[0, "D4", 8], [8, "F#4", 8]],
  [[0, "E4", 8], [8, "B3", 8]],
  [[0, "C4", 8], [8, "G4", 8]],
  [[0, "A4", 8], [8, "D#4", 8]],
  [[0, "D4", 8], [8, "G4", 8]],
  [[0, "A4", 8], [8, "B4", 8]],
  [[0, "F4", 8], [8, "E4", 8]],
];
// unison hits of the kime section (steps per bar)
const KIME = [[0, 3, 6, 10, 13], [0, 3, 6, 10, 13], [0, 2, 5, 7, 10, 12], [0, 3, 6]];

SONGS.push({
  id: "tsumazuki", no: 6, title: "つまずき", date: "2026-09-26",
  bpm: 120, swing: 0, key: "E マイナー", genre: "ジャズロック（変拍子風）", tail: 4,
  masterGain: 0.8, comp: { threshold: -20, ratio: 3, attack: 0.008, release: 0.18 },
  accent: { light: "#c0392b", dark: "#f07a6a" },
  blurb: "4拍子のまま、アクセントの位置をずらして変拍子のようにつまずかせたジャズロックです。16分7つで一周するリフが小節の頭からずれていき、全員で止まるキメのあとは、上の和音を固定したままベースが半音ずつ落ちて崩れます。ブラス、サックス、ギター、ベースに、初めて録音サンプルを使いました。",
  parts: [["guitar", "ギター"], ["brass", "ブラス"], ["sax", "サックス"], ["bass", "ベース"], ["drums", "ドラム"]],
  why: [
    ["変拍子に聞こえる4拍子", "3+3+2+3+3+2", "小節は4拍子のままですが、テーマのアクセントを3・3・2の区切りで置いています。ハイハットだけは4拍子を刻み続けるので、足がつまずくように感じます。", [["Geordie Greep", 13], ["Radiohead", 10]]],
    ["7つ刻みのリフ", "4拍子とずれていく", "イントロと「迷路」のギターは、16分7つで一周するリフです。キックはリフの頭に合わせ、スネアは2拍目と4拍目なので、ドラムの中でも拍がずれていきます。頭がそろうのは7小節に一度だけです。", [["Geordie Greep", 13]]],
    ["4度重ねのブラス", "トランペットとトロンボーン", "主題はトランペットの旋律に、4度下の音と、さらに4度下を1オクターブ下げたトロンボーンを重ねています。3度で重ねるより硬く、行き先があいまいに響きます。", [["Woody Shaw", 7], ["椎名林檎", 7]]],
    ["キメ", "全員で止まる", "テーマの終わりと「キメ」の4小節は、全員が同じ場所で打って、同じ場所で黙ります。無音も譜面の一部です。", [["Geordie Greep", 13], ["椎名林檎", 7]]],
    ["崩落", "固定した和音と半音で下がるベース", "「17時のシグナル」のブリッジと同じ考え方で、上の E・G・B を固定したまま、ベースを1小節ごとに半音ずつ下げていきます。ドラムはビットを削って歪ませ、ギターとブラスも強く歪ませます。最後の小節は途中で全部止めて、テーマに戻ります。", [["Nine Inch Nails", 40], ["JPEGMAFIA", 23]]],
    ["コード", "Em9 → Cmaj7(♯11) → Am11 → B7(♯9)", "テーマの後半では、E の上に F の和音を乗せた Fmaj7(♯11)/E で、半音ぶつかる暗さを足しています。サックスのソロは、4度重ねの Em11 と Cmaj7(♯11) の上で動きます。", [["Robert Glasper", 9], ["Radiohead", 10]]],
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const ch = kit.ch;
    const tr = (n, k) => f(m(n) + k);
    kit.bus("rev", -8, new Tone.Filter(6000, "lowpass"), new Tone.Reverb({ decay: 2.4, preDelay: 0.015, wet: 1 }));
    kit.channel("guitar", -11, { rev: -16 }); kit.channel("brass", -9, { rev: -10 }); kit.channel("sax", -9, { rev: -9 });
    kit.channel("bass", -7); kit.channel("drums", -9, { rev: -24 });

    // guitar: clean electric samples pushed through distortion and a speaker-ish filter
    const guitar = kit.sampler("guitar-electric", { release: 0.12 });
    const gDist = new Tone.Distortion({ distortion: 0.85, wet: 0.5 });
    const gTone = new Tone.Filter(3800, "lowpass", -24);
    guitar.chain(new Tone.Gain(1.6), gDist, new Tone.Filter(90, "highpass"), gTone, ch.guitar);
    const riserF = new Tone.Filter(300, "bandpass", -12);
    const riserG = new Tone.Gain(0);
    const riser = new Tone.Noise("pink");
    riser.chain(riserF, riserG, ch.guitar);

    // brass: trumpet + trombone
    const trumpet = kit.sampler("trumpet", { release: 0.25 });
    const trombone = kit.sampler("trombone", { release: 0.25, volume: -2 });
    const bDist = new Tone.Distortion({ distortion: 0.7, wet: 0 });
    const brassIn = new Tone.Gain(1);
    trumpet.connect(brassIn); trombone.connect(brassIn);
    brassIn.chain(bDist, new Tone.Filter(7000, "lowpass"), ch.brass);

    // sax
    const sax = kit.sampler("saxophone", { release: 0.3, volume: 3 });
    sax.chain(new Tone.Filter(6500, "lowpass"), ch.sax);

    // bass: electric bass samples + a sine underneath
    const bass = kit.sampler("bass-electric", { release: 0.12 });
    const sub = new Tone.MonoSynth({ oscillator: { type: "sine" }, envelope: { attack: 0.005, decay: 0.2, sustain: 0.8, release: 0.1 }, filterEnvelope: { baseFrequency: 300, octaves: 0 }, volume: -8 });
    const bassDist = new Tone.Distortion({ distortion: 0.8, wet: 0 });
    const bassIn = new Tone.Gain(1);
    bass.connect(bassIn); sub.connect(bassIn);
    bassIn.chain(bassDist, new Tone.Filter(2400, "lowpass"), ch.bass);

    // drums (synth), bit reduction + distortion for the fall
    const crushXf = new Tone.CrossFade(0);
    const crushShaper = kit.shaper(10);
    const drumDist = new Tone.Distortion({ distortion: 0.75, wet: 0 });
    const drumBus = new Tone.Gain(1);
    drumBus.connect(crushXf.a); drumBus.connect(crushShaper); crushShaper.connect(crushXf.b);
    crushXf.chain(drumDist, ch.drums);
    const kick = new Tone.MembraneSynth({ pitchDecay: 0.04, octaves: 6, envelope: { attack: 0.001, decay: 0.35, sustain: 0 } }).connect(drumBus);
    const snareN = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.16, sustain: 0 }, volume: -7 });
    snareN.chain(new Tone.Filter(1900, "bandpass", -12), drumBus);
    const snareB = new Tone.MembraneSynth({ pitchDecay: 0.015, octaves: 2, envelope: { attack: 0.001, decay: 0.11, sustain: 0 }, volume: -9 }).connect(drumBus);
    const hat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.03, sustain: 0 }, volume: -17 });
    hat.chain(new Tone.Filter(8500, "highpass"), drumBus);
    const ride = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.5, release: 0.2 }, harmonicity: 5.4, modulationIndex: 16, resonance: 5200, octaves: 1.1, volume: -30 });
    ride.connect(drumBus);
    const crashS = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 1.3, release: 0.4 }, harmonicity: 5.1, modulationIndex: 30, resonance: 3600, octaves: 1.5, volume: -25 });
    crashS.connect(drumBus);

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const theme = id === "a" || id === "a2";
      const v = chord.v, r = chord.root;
      const endBar = theme && local === 15;

      // per-bar state (robust to seeking)
      at(T(i, 0), t => {
        gDist.wet.setValueAtTime({ intro: 0.45, b: 0.2, fall: 1, outro: 0.6 }[id] ?? 0.75, t);
        gTone.frequency.setValueAtTime(id === "b" ? 2200 : id === "fall" ? 3000 : 3800, t);
        bDist.wet.setValueAtTime(id === "fall" ? 0.55 : 0, t);
        bassDist.wet.setValueAtTime(id === "fall" ? 0.6 : id === "maze" ? 0.2 : 0, t);
        crushXf.fade.setValueAtTime(id === "fall" ? 0.7 : 0, t);
        drumDist.wet.setValueAtTime(id === "fall" ? 0.4 : id === "maze" ? 0.15 : 0, t);
        riserG.gain.cancelScheduledValues(t);
        if (id !== "fall" || local < 6) riserG.gain.setValueAtTime(0, t);
        else {
          // two-bar riser that dies with the cut at step 12 of the last bar
          const peak = t + (7 - local) * BAR + D(12);
          riserF.frequency.cancelScheduledValues(t);
          riserF.frequency.setValueAtTime(300 + (local - 6) * 1500, t);
          riserF.frequency.exponentialRampToValueAtTime(6000, peak);
          riserG.gain.setValueAtTime(0.3 * (local - 6), t);
          riserG.gain.linearRampToValueAtTime(0.6, peak - 0.03);
          riserG.gain.linearRampToValueAtTime(0, peak);
        }
      });

      // helpers
      const g = (s, notes, dur, vel) => at(T(i, s) + human(0.004), t => { guitar.triggerAttackRelease(notes, D(dur), t, vel); flash("guitar", t); });
      const power = (s, dur, vel, low = chord.pc ?? r) => { let p = low; while (p < 40) p += 12; while (p > 51) p -= 12; g(s, [f(p), f(p + 7), f(p + 12)], dur, vel); };
      const bn = (s, midi, dur, vel) => at(T(i, s) + human(0.003), t => { bass.triggerAttackRelease(f(midi), D(dur), t, vel); sub.triggerAttackRelease(f(midi), D(dur) * 0.9, t, vel * 0.8); flash("bass", t); });
      const brass = (s, n, dur, vel, oct = 0) => at(T(i, s), t => {
        const top = m(n) + oct;
        trumpet.triggerAttackRelease([f(top), f(top - 5)], D(dur) * 0.92, t, vel);
        trombone.triggerAttackRelease(f(top - 22), D(dur) * 0.92, t, vel * 0.9);
        flash("brass", t);
      });
      const stab = (s, dur, vel) => at(T(i, s), t => {
        trumpet.triggerAttackRelease(v.slice(-2).map(n => tr(n, 12)), D(dur), t, vel);
        trombone.triggerAttackRelease(v[0], D(dur), t, vel * 0.9);
        flash("brass", t);
      });
      const sx = (list, vel) => list.forEach(([s, n, d]) => at(T(i, s) + human(0.006), t => { sax.triggerAttackRelease(n, D(d) * 0.95, t, vel); flash("sax", t); }));
      const k = (s, vel = 0.9) => at(T(i, s), t => { kick.triggerAttackRelease("E1", "8n", t, vel); flash("drums", t); });
      const sn = (s, vel = 0.9) => at(T(i, s) + human(0.003), t => { snareN.triggerAttackRelease("16n", t, vel); snareB.triggerAttackRelease("A2", "16n", t, vel); });
      const h = (s, vel = 0.45) => at(T(i, s) + human(0.005), t => hat.triggerAttackRelease("32n", t, vel));
      const rd = (s, vel = 0.5) => at(T(i, s), t => ride.triggerAttackRelease("E4", "16n", t, vel));
      const crash = (s = 0, vel = 0.6) => at(T(i, s), t => crashS.triggerAttackRelease("F3", "1n", t, vel));
      const cut = s => at(T(i, s), t => { [guitar, trumpet, trombone, sax, bass].forEach(x => x.releaseAll(t)); sub.triggerRelease(t); });
      // the 7-step riff: position counted from the start of the section so it drifts against the bar
      const riff = (vel, bassToo, kickToo) => {
        for (let s = 0; s < 16; s++) {
          const gs = local * 16 + s, off = gs % 7;
          const hit = RIFF7.find(([o]) => o === off);
          if (!hit) continue;
          let note = hit[1];
          if (chord === C.FoE && note === "G2") note = "F2";
          const nn = tr(note, RIFF_SHIFT[sec.chords[local % sec.chords.length]] ?? 0);
          g(s, nn, hit[2], off === 0 ? vel : vel * 0.8);
          if (bassToo === "all" || (bassToo && off === 0)) bn(s, m(nn) - 12, hit[2], off === 0 ? 0.95 : 0.7);
          if (kickToo && off === 0) k(s, 0.9);
        }
      };

      if (id === "intro") {
        riff(local < 4 ? 0.6 : 0.75, local >= 4, local >= 4);
        if (local >= 4) for (let s = 0; s < 16; s += 2) h(s, 0.3 + 0.05 * (local - 4));
        if (local === 7) { sn(12, 0.5); sn(13, 0.65); sn(14, 0.8); sn(15, 0.95); }
      } else if (theme) {
        const half = local >= 8 ? 1 : 0;
        const guitarUnison = id === "a" ? half === 1 : half === 0;
        if (local % 8 === 0) crash();
        if (endBar) {
          // hit together, then silence from step 10
          MEL_END.forEach(([s, n, d]) => {
            brass(s, n, d, 0.95, id === "a2" ? 12 : 0);
            power(s, d, 0.95, s === 8 ? 40 : 47);
            bn(s, s === 8 ? 28 : 35, d, 1);
            k(s, 1); sn(s, s === 8 ? 1 : 0.7);
          });
          crash(8, 0.7);
          cut(10);
        } else {
          const oct = id === "a2" && half ? 12 : 0;
          MEL_A[local % 8].forEach(([s, n, d]) => brass(s, n, d, ACC.includes(s) ? 0.85 : 0.7, oct));
          if (guitarUnison) MEL_A[local % 8].forEach(([s, n, d]) => g(s, tr(n, -12), d, 0.75));
          else ACC.forEach((s, j) => power(s, j === 0 || j === 3 ? 3 : 2, j === 0 ? 0.95 : 0.75));
          if (id === "a2" && half && SAX_A2[local - 8]) sx(SAX_A2[local - 8], 0.55);
          [r, r, r + 12, r, r + 7, r + 12].forEach((n, j) => bn(ACC[j], n, j === 0 || j === 3 ? 3 : 2, j === 0 ? 1 : 0.8));
          // drums: K . . S . . k . K . . k . . S .  (hats keep plain 8ths underneath)
          k(0, 1); sn(3, 0.9); k(6, 0.6); k(8, 0.95); k(11, 0.6); sn(14, 0.9); sn(10, 0.15);
          if (id === "a2") { for (let s = 0; s < 16; s += 2) rd(s, s % 4 === 0 ? 0.6 : 0.45); }
          else for (let s = 0; s < 16; s += 2) h(s, s % 4 === 0 ? 0.5 : 0.38);
          if (local === 14) { sn(12, 0.4); sn(13, 0.55); }
        }
      } else if (id === "b") {
        // half the density: quartal chords on a cleaner guitar, sax solo on top
        g(0, v, 6, 0.55);
        if (local % 2 === 1) g(10, v, 4, 0.45);
        sx(SOLO_B[local], 0.7);
        bn(0, r, 6, 0.9); bn(6, r + 7, 2, 0.6); bn(10, r + 12, 2, 0.6); bn(14, r + 10, 2, 0.6);
        k(0, 0.7); k(10, 0.5); sn(8, 0.35);
        [0, 4, 6, 8, 12, 14].forEach(s => rd(s, s % 4 === 0 ? 0.55 : 0.4));
        if (local === 7) { sn(12, 0.5); sn(14, 0.7); sn(15, 0.85); }
      } else if (id === "maze") {
        if (local === 0) crash();
        riff(0.85, "all", true);
        if (local % 2 === 0) stab(0, 3, 0.8);
        sn(4, 0.9); sn(12, 0.9);
        for (let s = 0; s < 16; s += 2) h(s, 0.42);
        if (local === 7) { sn(13, 0.6); sn(14, 0.8); sn(15, 1); }
      } else if (id === "kime") {
        KIME[local].forEach((s, j) => {
          const last = local === 3 && j === KIME[3].length - 1;
          const dur = last ? 4 : 2;
          power(s, dur, 0.95); stab(s, dur, 0.9); bn(s, r, dur, 1); k(s, 1); sn(s, 0.7);
          if (j === 0 && (local === 0 || local === 3)) crash(s, 0.7);
        });
        if (local === 3) { sn(12, 0.6); sn(13, 0.75); sn(14, 0.9); sn(15, 1); }
      } else if (id === "fall") {
        const last = local === 7;
        if (local % 2 === 0) crash();
        // held chord on a heavily distorted guitar; brass stabs on the 3+3+2 grid
        g(0, v, last ? 12 : 16, 0.8);
        (last ? [0, 3, 6, 8] : [0, 3, 6]).forEach(s => at(T(i, s), t => {
          trumpet.triggerAttackRelease(["B4", "E5", "G5"], D(2), t, 0.9); trombone.triggerAttackRelease("E3", D(2), t, 0.9); flash("brass", t);
        }));
        [[0, r, 3], [3, r, 3], [6, r + 12, 2], [8, r, 3], [11, r, 3], [14, r + 7, 2]].forEach(([s, n, d]) => { if (!last || s < 12) bn(s, n, d, s === 0 ? 1 : 0.8); });
        // drums: kick on the 7-cycle, half-time snare
        for (let s = 0; s < 16; s++) if ((local * 16 + s) % 7 === 0 && (!last || s < 12)) k(s, 1);
        sn(8, 1);
        for (let s = 0; s < (last ? 12 : 16); s++) h(s, s % 2 ? 0.25 : 0.5);
        if (last) { sn(10, 0.8); sn(11, 1); crash(8, 0.8); cut(12); }
      } else if (id === "outro") {
        if (local < 2) riff(0.7, true, false);
        else {
          power(0, 20, 1); stab(0, 20, 0.9); bn(0, 28, 20, 1); k(0, 1); crash(0, 0.8);
        }
      }
    });

    riser.start();
    return { releaseAll() { [guitar, trumpet, trombone, sax, bass].forEach(x => x.releaseAll()); sub.triggerRelease(); } };
  },
});
})();
