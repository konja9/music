// No.2 断線
(() => {
// fixed upper triad (D F A) over a falling bass — the idea taken from the previous bridge
const TOP = ["D4", "F4", "A4"];
const C = {
  Dm:     { sym: "Dm",          root: 38, v: TOP },
  DmCs:   { sym: "Dm/C♯",       root: 37, v: TOP },
  DmC:    { sym: "Dm/C",        root: 36, v: TOP },
  DmB:    { sym: "Dm/B",        root: 35, v: TOP },
  Bbmaj7: { sym: "B♭maj7",      root: 34, v: TOP },
  DmA:    { sym: "Dm/A",        root: 33, v: TOP },
  DmG:    { sym: "Dm/G",        root: 31, v: TOP },
  A7:     { sym: "A7",          root: 33, v: ["C#4", "E4", "G4"] },
  Bb:     { sym: "B♭",          root: 34, v: ["D4", "F4", "Bb4"] },
  Gm:     { sym: "Gm",          root: 31, v: ["D4", "G4", "Bb4"] },
  A:      { sym: "A",           root: 33, v: ["C#4", "E4", "A4"] },
  Asus:   { sym: "Asus4",       root: 33, v: ["D4", "E4", "A4"] },
  Bbadd9: { sym: "B♭(add9)",    root: 34, v: ["C4", "D4", "F4"] },
  Gm9:    { sym: "Gm9",         root: 31, v: ["Bb3", "D4", "F4", "A4"] },
};
const VERSE = ["Dm", "DmCs", "DmC", "DmB", "Bbmaj7", "DmA", "DmG", "A7"];
const DROP = ["Dm", "Bb", "Gm", "A", "Dm", "Bb", "Gm", "Asus"];
const SECTIONS = [
  { id: "intro",  name: "イントロ",   bars: 8,  chords: VERSE },
  { id: "verse",  name: "ヴァース",   bars: 16, chords: [...VERSE, ...VERSE] },
  { id: "build",  name: "ビルド",     bars: 8,  chords: ["Bbadd9", "Bbadd9", "Gm9", "Gm9", "Bbadd9", "Bbadd9", "Asus", "A"] },
  { id: "drop",   name: "ドロップ",   bars: 16, chords: [...DROP, ...DROP] },
  { id: "break",  name: "ピアノ",     bars: 8,  chords: VERSE },
  { id: "drop2",  name: "ドロップ2",  bars: 16, chords: [...DROP, ...DROP] },
  { id: "outro",  name: "アウトロ",   bars: 4,  chords: ["Dm", "DmCs", "DmC", "Dm"] },
];

// drop lead (original): [step, note, durSteps] per bar of the 8-bar phrase
const MEL = [
  [[0, "D5", 3], [3, "F5", 3], [6, "A5", 2], [8, "G5", 4], [12, "F5", 2], [14, "E5", 2]],
  [[0, "D5", 6], [6, "F5", 2], [8, "C5", 4], [12, "D5", 4]],
  [[0, "Bb4", 3], [3, "D5", 3], [6, "G5", 2], [8, "F5", 4], [12, "D5", 4]],
  [[0, "C#5", 8], [8, "E5", 4], [12, "A4", 4]],
  [[0, "D5", 3], [3, "F5", 3], [6, "A5", 2], [8, "Bb5", 4], [12, "A5", 2], [14, "G5", 2]],
  [[0, "F5", 6], [6, "D5", 2], [8, "F5", 4], [12, "Bb5", 4]],
  [[0, "A5", 3], [3, "G5", 3], [6, "F5", 2], [8, "D5", 4], [12, "Bb4", 4]],
  [[0, "C#5", 4], [4, "D5", 4], [8, "E5", 4], [12, "A5", 4]],
];
const MEL_LAST = [[0, "D5", 16]];

SONGS.push({
  file: "02-dansen.js",
  id: "dansen",
  no: 2,
  title: "断線",
  date: "2026-09-26",
  bpm: 104,
  swing: 0,
  key: "D マイナー",
  genre: "インダストリアル",
  tail: 5,
  masterGain: 0.75,
  comp: {
    "threshold": -18,
    "ratio": 4,
    "attack": 0.005,
    "release": 0.15
  },
  accent: {
    "light": "#1f8ea6",
    "dark": "#5cc8e0"
  },
  blurb: "「17時のシグナル」のブリッジで使った手法を曲全体に広げました。上の和音を動かさずにベースだけ半音ずつ下げ、ドラムを削って歪ませています。途中で一度ピアノだけになります。音量は大きめです。",
  parts: [
    [
      "drums",
      "ドラム"
    ],
    [
      "bass",
      "ベース"
    ],
    [
      "pad",
      "パッド・シーケンス"
    ],
    [
      "lead",
      "リード"
    ],
    [
      "piano",
      "ピアノ"
    ],
    [
      "noise",
      "ノイズ"
    ]
  ],
  why: [
    [
      "動かない和音",
      "D・F・A 固定",
      "上の三和音をほとんど動かさず、ベースだけを D → C♯ → C → B → B♭ → A と半音ずつ下げます。ヴァースとピアノのパートがこの進行です。",
      [
        [
          "Nine Inch Nails",
          40
        ],
        [
          "Radiohead",
          10
        ]
      ]
    ],
    [
      "削れて歪むドラム",
      "ビット削り＋ディストーション",
      "ドラム全体の解像度を落としてから歪ませています。ヴァースは弱め、ビルドで徐々に上げ、最後のドロップで最大になります。",
      [
        [
          "Nine Inch Nails",
          40
        ],
        [
          "JPEGMAFIA",
          23
        ]
      ]
    ],
    [
      "ノイズ",
      "ドローン／ライザー",
      "イントロは帯域をしぼったノイズがゆっくり開き、ビルドで8小節かけて上がっていきます。ドロップ直前に一瞬すべての音を止めます。",
      [
        [
          "Nine Inch Nails",
          40
        ]
      ]
    ],
    [
      "ポンプする和音",
      "キックでダッキング",
      "ドロップではキックのたびにパッドと16分のシーケンスの音量を一瞬下げ、全体を脈打たせています。",
      [
        [
          "Kanye West",
          22
        ],
        [
          "JPEGMAFIA",
          23
        ]
      ]
    ],
    [
      "ピアノだけの8小節",
      "The Fragile 的な静けさ",
      "すべての音を止めてピアノだけでヴァースの進行を弾き、最後はドラムの32分の連打で次のドロップに入ります。よく聴いているNINの4曲はすべて『The Fragile』の収録曲です。",
      [
        [
          "Nine Inch Nails",
          40
        ],
        [
          "James Blake",
          8
        ]
      ]
    ],
    [
      "潰したリード",
      "矩形波＋強い歪み",
      "ドロップのメロディは、歪ませてから解像度を落とした矩形波で鳴らしています。2回目は1オクターブ上を重ねます。",
      [
        [
          "Denzel Curry",
          6
        ],
        [
          "JPEGMAFIA",
          23
        ]
      ]
    ]
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const master = kit.master;
    const reverb = new Tone.Reverb({ decay: 4.5, preDelay: 0.03, wet: 1 });
    kit.bus("rev", -8, reverb);
    const ch = kit.ch;
    kit.channel("drums", -7, { rev: -20 }); kit.channel("bass", -9); kit.channel("pad", -16, { rev: -10 }); kit.channel("lead", -15, { rev: -12 }); kit.channel("noise", -20, { rev: -6 }); kit.channel("piano", -10, { rev: -4 });

    // drums: bus -> lowpass (muffle) -> crusher crossfade -> distortion
    const drumLP = new Tone.Filter(20000, "lowpass");
    const crushXf = new Tone.CrossFade(0);
    const crushShaper = new Tone.WaveShaper(x => Math.round(x * 10) / 10, 4096);
    const drumDist = new Tone.Distortion({ distortion: 0.75, wet: 0 });
    const drumBus = new Tone.Gain(1);
    drumBus.connect(drumLP);
    drumLP.connect(crushXf.a); drumLP.connect(crushShaper); crushShaper.connect(crushXf.b);
    crushXf.chain(drumDist, ch.drums);
    const kick = new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 7, oscillator: { type: "sine" }, envelope: { attack: 0.001, decay: 0.5, sustain: 0, release: 0.1 } }).connect(drumBus);
    const snareN = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.2, sustain: 0 }, volume: -6 });
    snareN.chain(new Tone.Filter(1500, "bandpass", -12), drumBus);
    const snareB = new Tone.MembraneSynth({ pitchDecay: 0.02, octaves: 2, envelope: { attack: 0.001, decay: 0.14, sustain: 0 }, volume: -8 }).connect(drumBus);
    const clap = new Tone.NoiseSynth({ noise: { type: "pink" }, envelope: { attack: 0.004, decay: 0.12, sustain: 0 }, volume: -10 });
    clap.chain(new Tone.Filter(1100, "bandpass"), drumBus);
    const hat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.03, sustain: 0 }, volume: -17 });
    hat.chain(new Tone.Filter(8500, "highpass"), drumBus);
    const metal = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 1.4, release: 0.4 }, harmonicity: 5.1, modulationIndex: 32, resonance: 3200, octaves: 1.5, volume: -24 });
    metal.connect(drumBus);
    const clank = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.12, release: 0.05 }, harmonicity: 3.1, modulationIndex: 16, resonance: 2200, octaves: 1, volume: -22 });
    clank.connect(drumBus);

    // bass: saw -> distortion + clean sub
    const bassDist = new Tone.Distortion({ distortion: 0.6, wet: 0.5 });
    const bassLP = new Tone.Filter(900, "lowpass");
    const bass = new Tone.MonoSynth({
      oscillator: { type: "fatsawtooth", count: 2, spread: 18 },
      filter: { type: "lowpass", Q: 3, rolloff: -24 },
      envelope: { attack: 0.003, decay: 0.2, sustain: 0.6, release: 0.08 },
      filterEnvelope: { attack: 0.003, decay: 0.15, sustain: 0.3, release: 0.15, baseFrequency: 90, octaves: 3.2 },
    });
    const sub = new Tone.MonoSynth({ oscillator: { type: "sine" }, envelope: { attack: 0.003, decay: 0.3, sustain: 0.9, release: 0.08 }, filter: { frequency: 300 }, filterEnvelope: { baseFrequency: 250, octaves: 0 }, volume: -3 });
    bass.chain(bassDist, bassLP, ch.bass); sub.connect(ch.bass);

    // pad: detuned saws -> distortion -> filter -> sidechain duck
    const padFilter = new Tone.Filter(1400, "lowpass");
    const duck = new Tone.Gain(1);
    const pad = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "fatsawtooth", count: 3, spread: 32 }, envelope: { attack: 0.6, decay: 0.4, sustain: 0.85, release: 2.4 } });
    pad.maxPolyphony = 16;
    pad.chain(new Tone.Distortion(0.6), padFilter, duck, ch.pad);
    // 16th ostinato
    const ostFilter = new Tone.Filter(1200, "lowpass", -24);
    const ost = new Tone.MonoSynth({ oscillator: { type: "square" }, envelope: { attack: 0.002, decay: 0.09, sustain: 0.1, release: 0.05 }, filterEnvelope: { baseFrequency: 400, octaves: 2.5, decay: 0.08, sustain: 0.1 }, volume: -12 });
    ost.chain(ostFilter, duck);

    // lead: square -> heavy distortion -> crush
    const lead = new Tone.MonoSynth({
      oscillator: { type: "square" },
      filter: { type: "lowpass", Q: 4, rolloff: -24 },
      envelope: { attack: 0.005, decay: 0.2, sustain: 0.7, release: 0.2 },
      filterEnvelope: { attack: 0.01, decay: 0.3, sustain: 0.5, release: 0.2, baseFrequency: 700, octaves: 2.6 },
      portamento: 0.03,
    });
    const leadHi = new Tone.MonoSynth({ oscillator: { type: "sawtooth" }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.2 }, filterEnvelope: { baseFrequency: 1200, octaves: 2 }, portamento: 0.03, volume: -9 });
    const leadDist = new Tone.Distortion(0.85);
    const leadCrush = new Tone.WaveShaper(x => Math.round(x * 6) / 6, 4096);
    lead.chain(leadDist, leadCrush, new Tone.Filter(3500, "lowpass"), ch.lead);
    leadHi.chain(leadDist);

    // clean piano for the break
    const piano = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 2, modulationIndex: 1.2,
      oscillator: { type: "triangle" }, modulation: { type: "sine" },
      envelope: { attack: 0.002, decay: 2.2, sustain: 0.08, release: 1.6 },
      modulationEnvelope: { attack: 0.002, decay: 0.25, sustain: 0, release: 0.2 },
    });
    piano.maxPolyphony = 16;
    piano.connect(ch.piano);

    // noise: drone / riser / tail
    const noiseF = new Tone.Filter(400, "bandpass", -12);
    const noiseG = new Tone.Gain(0);
    const noise = new Tone.Noise("pink");
    noise.chain(noiseF, noiseG, ch.noise);

    const isDrop = id => id === "drop" || id === "drop2";

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const drop = isDrop(id);

      // per-bar mix state (set every bar so seeking lands in the right state)
      at(T(i, 0), time => {
        const crush = { intro: 0, verse: 0.35, build: Math.min(0.9, 0.2 + local * 0.1), drop: 0.55, break: 0, drop2: 0.7, outro: 0.3 }[id];
        const dist = { intro: 0, verse: 0.25, build: 0.3 + local * 0.05, drop: 0.5, break: 0, drop2: 0.6, outro: 0.2 }[id];
        crushXf.fade.setValueAtTime(crush, time);
        drumDist.wet.setValueAtTime(dist, time);
        drumLP.frequency.cancelScheduledValues(time);
        drumLP.frequency.setValueAtTime(id === "intro" ? 350 + local * 60 : 20000, time);
        padFilter.frequency.cancelScheduledValues(time);
        if (id === "intro") padFilter.frequency.linearRampToValueAtTime(300 + 150 * (local + 1), time + BAR);
        else if (id === "build") padFilter.frequency.linearRampToValueAtTime(800 + 400 * (local + 1), time + BAR);
        else padFilter.frequency.setValueAtTime(drop ? 2600 : 1400, time);
        ostFilter.frequency.cancelScheduledValues(time);
        ostFilter.frequency.linearRampToValueAtTime(id === "build" ? 900 + 500 * local : drop ? 2200 : 1100, time + BAR);
        bassDist.wet.setValueAtTime(drop ? 0.8 : 0.5, time);
        // noise bed
        noiseG.gain.cancelScheduledValues(time); noiseF.frequency.cancelScheduledValues(time);
        if (id === "intro") { noiseG.gain.setValueAtTime(0.25, time); noiseF.frequency.setValueAtTime(250 + 60 * local, time); noiseF.frequency.linearRampToValueAtTime(250 + 60 * (local + 1), time + BAR); }
        else if (id === "build") { const g0 = local / 8, g1 = (local + 1) / 8; noiseG.gain.setValueAtTime(0.7 * g0, time); noiseG.gain.linearRampToValueAtTime(local === 7 ? 0 : 0.7 * g1, time + BAR - 0.02); noiseF.frequency.setValueAtTime(400 * 2 ** (local * 0.55), time); noiseF.frequency.exponentialRampToValueAtTime(400 * 2 ** ((local + 1) * 0.55), time + BAR); }
        else if (id === "break") { noiseG.gain.setValueAtTime(0.08, time); noiseF.frequency.setValueAtTime(3000, time); }
        else if (id === "outro") { noiseG.gain.setValueAtTime(0.35 * (1 - local / 4), time); noiseG.gain.linearRampToValueAtTime(0.35 * (1 - (local + 1) / 4), time + BAR); noiseF.frequency.setValueAtTime(900 - local * 150, time); }
        else noiseG.gain.setValueAtTime(0, time);
      });

      // pad
      if (id !== "break") {
        const vel = id === "intro" ? 0.35 : drop ? 0.55 : 0.45;
        at(T(i, 0), t => { pad.triggerAttackRelease(chord.v, D(id === "outro" && local === 3 ? 40 : 15), t, vel); flash("pad", t); });
      }

      // ostinato: 16ths through the chord tones
      if (id === "verse" || id === "build" || id === "drop2") {
        const tones = chord.v.map(m);
        const seq = [tones[0], tones[1], tones[2], tones[1]];
        for (let s = 0; s < 16; s++) {
          if (id === "verse" && local < 4 && s % 2) continue;
          const n = seq[s % 4] + (s % 8 === 6 ? 12 : 0);
          at(T(i, s), t => ost.triggerAttackRelease(f(n), D(0.8), t, s % 4 === 0 ? 0.9 : 0.6));
        }
      }

      // kick-driven duck on pad + ostinato
      const duckAt = t => { duck.gain.cancelScheduledValues(t); duck.gain.setValueAtTime(0.25, t); duck.gain.linearRampToValueAtTime(1, t + 0.22); };

      // drums
      const k = (step, vel = 0.95, dk = false) => at(T(i, step), t => { kick.triggerAttackRelease("C1", "8n", t, vel); flash("drums", t); if (dk) duckAt(t); });
      const sn = (step, vel = 0.9) => at(T(i, step) + human(), t => { snareN.triggerAttackRelease("16n", t, vel); snareB.triggerAttackRelease("G2", "16n", t, vel); });
      const cl = (step, vel = 0.8) => at(T(i, step) + 0.008, t => clap.triggerAttackRelease("16n", t, vel));
      const h = (step, vel = 0.45) => at(T(i, step) + human(), t => hat.triggerAttackRelease("32n", t, vel));
      const crash = () => at(T(i, 0), t => metal.triggerAttackRelease("C3", "1n", t, 0.7));
      const ck = (step, vel = 0.6) => at(T(i, step), t => clank.triggerAttackRelease("G4", "32n", t, vel));

      if (id === "intro") {
        if (local % 4 === 0) crash();
        if (local >= 4) [0, 4, 8, 12].forEach(s => k(s, 0.7));
      } else if (id === "verse") {
        if (local % 8 === 0) crash();
        k(0); k(3, 0.7); k(8); k(11, 0.55); sn(4); sn(12);
        for (let s = 0; s < 16; s += 2) h(s, s % 4 === 2 ? 0.5 : 0.35);
        if (local % 2 === 1) ck(14); ck(7, 0.35);
        if (local === 15) { sn(13, 0.5); sn(14, 0.7); sn(15, 0.9); }
      } else if (id === "build") {
        [0, 4, 8, 12].forEach(s => { if (!(local === 7 && s >= 12)) k(s, 0.9); });
        const every = local < 2 ? 4 : local < 6 ? 2 : 1;
        for (let s = 0; s < 16; s += every) {
          if (local === 7 && s >= 12) break; // silence right before the drop
          sn(s, Math.min(1, 0.35 + (local * 16 + s) / 128 * 0.65));
        }
      } else if (drop) {
        if (local % 4 === 0) crash();
        k(0, 1, true); k(6, 0.85, true); k(8, 1, true); k(10, 0.7); k(14, 0.7, true);
        if (id === "drop2") k(3, 0.6);
        sn(4, 1); sn(12, 1); cl(4); cl(12);
        for (let s = 0; s < 16; s++) h(s, s % 2 ? (id === "drop2" ? 0.5 : 0.35) : 0.5);
        ck(2, 0.4); ck(10, 0.4);
        if (local === 15 && id === "drop") { k(12, 0.9); sn(13, 0.8); sn(14, 0.9); sn(15, 1); }
      } else if (id === "break" && local === 7) {
        // glitch: 32nd-note stutter into the last drop
        for (let s = 8; s < 16; s += 0.5) {
          const v = 0.3 + (s - 8) / 8 * 0.7;
          at(T(i, s), t => { snareN.triggerAttackRelease("64n", t, v); if (s % 2 === 0) kick.triggerAttackRelease("C1", "32n", t, v * 0.8); });
        }
      } else if (id === "outro") {
        if (local === 0) crash();
        if (local < 2) [0, 4, 8, 12].forEach(s => k(s, 0.8 - local * 0.3 - s / 40));
      }

      // bass
      const r = chord.root;
      const bn = (step, midi, dur, vel) => at(T(i, step), t => {
        bass.triggerAttackRelease(f(midi), D(dur), t, vel); sub.triggerAttackRelease(f(midi), D(dur), t, vel); flash("bass", t);
      });
      if (id === "verse") {
        for (let s = 0; s < 16; s += 2) bn(s, r, 1.6, s % 4 === 0 ? 1 : 0.6);
      } else if (id === "build") {
        const br = local >= 6 ? 33 : r;
        for (let s = 0; s < 16; s += local < 4 ? 2 : 1) { if (local === 7 && s >= 12) break; bn(s, br, local < 4 ? 1.6 : 0.8, 0.55 + local * 0.05); }
      } else if (drop) {
        [[0, 3], [3, 3], [6, 2], [8, 3], [11, 3], [14, 2]].forEach(([s, d], j) => bn(s, r, d * 0.9, j % 3 === 0 ? 1 : 0.75));
      } else if (id === "outro") {
        bn(0, r, local === 3 ? 30 : 15, 0.8);
      }

      // lead in drops
      if (drop) {
        const phrase = local === 15 && id === "drop2" ? MEL_LAST : MEL[local % 8];
        phrase.forEach(([s, n, d]) => at(T(i, s), t => {
          lead.triggerAttackRelease(n, D(d) * 0.92, t, 0.85); flash("lead", t);
          if (id === "drop2") leadHi.triggerAttackRelease(f(m(n) + 12), D(d) * 0.92, t, 0.6);
        }));
      }

      // break: clean piano plays the falling line
      if (id === "break") {
        const vs = chord.v.map(n => f(m(n)));
        at(T(i, 0), t => { piano.triggerAttackRelease([f(r + 12), ...vs], D(14), t, 0.45); flash("piano", t); });
        const top = m(chord.v[chord.v.length - 1]) + 12;
        if (local % 2 === 0) at(T(i, 8), t => piano.triggerAttackRelease(f(top), D(6), t, 0.3));
        else at(T(i, 10), t => piano.triggerAttackRelease(f(top - 3), D(5), t, 0.28));
      }
      if (id === "outro" && local === 3) {
        at(T(i, 8), t => piano.triggerAttackRelease(["D5", "A5"], D(24), t, 0.3));
      }
    });

    noise.start();
    return { releaseAll() { pad.releaseAll(); piano.releaseAll(); [bass, sub, lead, leadHi, ost].forEach(s => s.triggerRelease()); } };
  },
});
})();
