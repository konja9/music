// No.1 17時のシグナル
(() => {
const C = {
  Gbmaj9:  { sym: "G♭maj9",     root: 30, v: ["Bb3", "Db4", "F4", "Ab4"] },
  Fm9:     { sym: "Fm9",        root: 29, v: ["Ab3", "C4", "Eb4", "G4"] },
  Ebm9:    { sym: "E♭m9",       root: 27, v: ["Gb3", "Bb3", "Db4", "F4"] },
  Ab13:    { sym: "A♭13",       root: 32, v: ["Gb3", "C4", "F4", "Bb4"] },
  F7s9:    { sym: "F7(♯9)",     root: 29, v: ["A3", "Eb4", "Ab4"] },
  Bbm9:    { sym: "B♭m9",       root: 34, v: ["Ab3", "C4", "Db4", "F4"] },
  Absus:   { sym: "A♭9sus4",    root: 32, v: ["Gb3", "Bb3", "Db4", "F4"] },
  Gbm7s11: { sym: "G♭maj7(♯11)", root: 30, v: ["Bb3", "C4", "Db4", "F4"] },
  F7alt:   { sym: "F7(♯9♭13)",  root: 29, v: ["A3", "Db4", "Eb4", "Ab4"] },
  Dbmaj9:  { sym: "D♭maj9",     root: 37, v: ["C4", "Eb4", "F4", "Ab4"] },
  Bbm:     { sym: "B♭m",        root: 34, v: ["F3", "Bb3", "Db4"] },
  BbmA:    { sym: "B♭m/A",      root: 33, v: ["F3", "Bb3", "Db4"] },
  BbmAb:   { sym: "B♭m/A♭",     root: 32, v: ["F3", "Bb3", "Db4"] },
  Ghd:     { sym: "Gm7(♭5)",    root: 31, v: ["F3", "Bb3", "Db4"] },
  Gbmaj7:  { sym: "G♭maj7",     root: 30, v: ["F3", "Bb3", "Db4"] },
  F7:      { sym: "F7",         root: 29, v: ["A3", "C4", "Eb4"] },
  Fsus:    { sym: "F7sus4",     root: 29, v: ["Bb3", "C4", "Eb4"] },
  F7b9:    { sym: "F7(♭9)",     root: 29, v: ["A3", "Eb4", "Gb4"] },
};
const A8 = ["Gbmaj9", "Fm9", "Ebm9", "Ab13", "Gbmaj9", "F7s9", "Bbm9", "Absus"];
const SECTIONS = [
  { id: "intro",  name: "イントロ", bars: 8,  chords: A8 },
  { id: "a",      name: "A",       bars: 16, chords: [...A8, ...A8] },
  { id: "b",      name: "B",       bars: 8,  chords: ["Bbm9", "Bbm9", "Gbm7s11", "Gbm7s11", "Ebm9", "Ebm9", "F7alt", "F7alt"] },
  { id: "bridge", name: "ブリッジ", bars: 8,  chords: ["Bbm", "BbmA", "BbmAb", "Ghd", "Gbmaj7", "F7", "Fsus", "F7b9"] },
  { id: "a2",     name: "A'",      bars: 16, chords: [...A8, ...A8] },
  { id: "outro",  name: "アウトロ", bars: 4,  chords: ["Gbmaj9", "Fm9", "Ebm9", "Dbmaj9"] },
];

// lead melody: [step, note, durSteps] per bar of the 8-bar A phrase (original)
const MEL_A = [
  [[2, "Db5", 2], [4, "Eb5", 2], [6, "F5", 6], [13, "Eb5", 1], [14, "Db5", 2]],
  [[0, "C5", 4], [6, "Ab4", 2], [8, "C5", 2], [10, "Eb5", 6]],
  [[2, "F5", 2], [4, "Gb5", 2], [6, "F5", 2], [8, "Eb5", 2], [10, "Db5", 4]],
  [[0, "C5", 6], [8, "Bb4", 2], [10, "Ab4", 2], [12, "F4", 4]],
  [[2, "Db5", 2], [4, "Eb5", 2], [6, "F5", 4], [10, "Ab5", 2], [12, "Bb5", 4]],
  [[0, "Ab5", 4], [4, "F5", 2], [6, "Eb5", 2], [8, "C5", 4], [12, "A4", 4]],
  [[0, "Bb4", 2], [2, "C5", 2], [4, "Db5", 4], [8, "F5", 2], [10, "Eb5", 2], [12, "Db5", 2], [14, "C5", 2]],
  [[0, "Db5", 8], [12, "Eb5", 4]],
];
const MEL_A_END = [[0, "Db5", 4], [4, "Eb5", 2], [6, "F5", 2], [8, "Ab5", 2], [10, "Bb5", 2], [12, "C6", 4]];
const MEL_A2_END = [[0, "F5", 16]];
const MEL_B = { 1: [[0, "F4", 4], [4, "Ab4", 4], [8, "Db5", 8]], 3: [[0, "C5", 6], [8, "Bb4", 8]], 5: [[0, "Gb4", 4], [4, "Bb4", 4], [8, "F5", 8]], 7: [[0, "Eb5", 4], [4, "Db5", 4], [8, "A4", 8]] };
const DB_SCALE = new Set([1, 3, 5, 6, 8, 10, 0]);

SONGS.push({
  file: "01-17ji-no-signal.js",
  id: "17ji-no-signal",
  no: 1,
  title: "17時のシグナル",
  date: "2026-09-26",
  bpm: 96,
  swing: 0.22,
  key: "D♭ メジャー",
  genre: "ネオソウル",
  tail: 5,
  masterGain: 0.8,
  comp: {
    "threshold": -20,
    "ratio": 3,
    "attack": 0.01,
    "release": 0.2
  },
  accent: {
    "light": "#c47a12",
    "dark": "#f0a640"
  },
  blurb: "再生がいちばん多い時間帯は17時台でした。夕方に流すことを想定して、履歴の上位の人たちの要素を混ぜた最初の曲です。ブリッジだけインダストリアルに振っていて、次の「断線」はそこから生まれました。",
  parts: [
    [
      "keys",
      "エレピ・ピアノ"
    ],
    [
      "bass",
      "ベース"
    ],
    [
      "drums",
      "ドラム"
    ],
    [
      "lead",
      "リード"
    ],
    [
      "pad",
      "パッド"
    ]
  ],
  why: [
    [
      "コードの響き",
      "maj9・m9・13th",
      "ポップスの形はそのままに、テンションを多めに入れたコードで進みます。Aは G♭maj9 → Fm9 → E♭m9 → A♭13 の4小節です。",
      [
        [
          "星野源",
          63
        ],
        [
          "Bialystocks",
          14
        ],
        [
          "KIRINJI",
          7
        ],
        [
          "藤井風",
          13
        ]
      ]
    ],
    [
      "エレピとリード",
      "Rhodes / Moog 風",
      "揺れのあるエレピでコードを刻み、リードは音程をすべらせながら歌うように動かしています。",
      [
        [
          "Stevie Wonder",
          16
        ],
        [
          "Jamiroquai",
          6
        ],
        [
          "Marvin Gaye",
          7
        ]
      ]
    ],
    [
      "ベース",
      "フィル多め",
      "次のコードへ半音で寄せたり、8小節ごとに下降するフレーズを入れたりしています。",
      [
        [
          "Thundercat",
          7
        ],
        [
          "Vulfpeck",
          13
        ],
        [
          "Robert Glasper",
          9
        ]
      ]
    ],
    [
      "ドラムのノリ",
      "16分に22%のスウィング",
      "裏の16分を少し後ろにずらし、叩くタイミングもわずかにばらつかせています。Bはハーフタイムです。",
      [
        [
          "Kendrick Lamar",
          33
        ],
        [
          "Tyler, The Creator",
          20
        ],
        [
          "A Tribe Called Quest",
          7
        ]
      ]
    ],
    [
      "ブリッジの歪み",
      "ビット削り＋ディストーション",
      "上の和音を固定してベースだけ半音ずつ下げ、ドラムとパッドを荒らしています。",
      [
        [
          "Nine Inch Nails",
          40
        ],
        [
          "JPEGMAFIA",
          23
        ],
        [
          "Radiohead",
          10
        ]
      ]
    ],
    [
      "ピアノの合いの手",
      "A'の偶数小節",
      "2小節ごとに、コードの音を上から下りる短いフレーズを入れています。",
      [
        [
          "Enrico Pieranunzi",
          12
        ],
        [
          "Ahmad Jamal Trio",
          8
        ]
      ]
    ]
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const master = kit.master;
    const reverb = new Tone.Reverb({ decay: 3.2, preDelay: 0.02, wet: 1 });
    kit.bus("rev", -6, reverb);
    const delay = new Tone.FeedbackDelay({ delayTime: "8n.", feedback: 0.3, wet: 1 });
    kit.bus("dly", -14, new Tone.Filter(2500, "lowpass"), delay);
    const ch = kit.ch;
    kit.channel("keys", -9, { rev: -10 }); kit.channel("bass", -8); kit.channel("drums", -6, { rev: -22 }); kit.channel("lead", -13, { rev: -12, dly: -8 }); kit.channel("pad", -15, { rev: -8 });

    // Rhodes-like EP
    const epFilter = new Tone.Filter(6000, "lowpass");
    const trem = new Tone.Tremolo({ frequency: 4.2, depth: 0.35, spread: 120 }).start();
    const chorus = new Tone.Chorus({ frequency: 0.6, delayTime: 3.5, depth: 0.5, wet: 0.35 }).start();
    const ep = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 1, modulationIndex: 3.2,
      oscillator: { type: "sine" }, modulation: { type: "sine" },
      envelope: { attack: 0.004, decay: 1.6, sustain: 0.28, release: 1.1 },
      modulationEnvelope: { attack: 0.002, decay: 0.35, sustain: 0.12, release: 0.6 },
    });
    ep.maxPolyphony = 24;
    ep.chain(epFilter, trem, chorus, ch.keys);

    // jazz piano fills
    const piano = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 2, modulationIndex: 1.4,
      oscillator: { type: "triangle" }, modulation: { type: "sine" },
      envelope: { attack: 0.002, decay: 0.9, sustain: 0.05, release: 0.6 },
      modulationEnvelope: { attack: 0.002, decay: 0.2, sustain: 0, release: 0.2 },
      volume: -6,
    }).connect(ch.keys);

    // bass
    const bassDist = new Tone.Distortion({ distortion: 0.5, wet: 0 });
    const bass = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      filter: { type: "lowpass", Q: 2.2, rolloff: -24 },
      envelope: { attack: 0.004, decay: 0.25, sustain: 0.55, release: 0.12 },
      filterEnvelope: { attack: 0.004, decay: 0.18, sustain: 0.25, release: 0.2, baseFrequency: 110, octaves: 2.8 },
      portamento: 0.015,
    });
    const sub = new Tone.MonoSynth({ oscillator: { type: "sine" }, envelope: { attack: 0.004, decay: 0.3, sustain: 0.8, release: 0.12 }, filter: { frequency: 400 }, filterEnvelope: { baseFrequency: 300, octaves: 0 }, volume: -4 });
    bass.chain(bassDist, ch.bass); sub.connect(ch.bass);

    // drums
    // bit reduction via waveshaper (no AudioWorklet needed)
    const crushXf = new Tone.CrossFade(0);
    const crushShaper = new Tone.WaveShaper(x => Math.round(x * 12) / 12, 4096);
    const drumDist = new Tone.Distortion({ distortion: 0.7, wet: 0 });
    const drumBus = new Tone.Gain(1);
    drumBus.connect(crushXf.a); drumBus.connect(crushShaper); crushShaper.connect(crushXf.b);
    crushXf.chain(drumDist, ch.drums);
    const crusher = { wet: crushXf.fade };
    const kick = new Tone.MembraneSynth({ pitchDecay: 0.045, octaves: 6, oscillator: { type: "sine" }, envelope: { attack: 0.001, decay: 0.42, sustain: 0, release: 0.1 } }).connect(drumBus);
    const snareN = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.17, sustain: 0 }, volume: -8 });
    snareN.chain(new Tone.Filter(1700, "bandpass", -12), drumBus);
    const snareB = new Tone.MembraneSynth({ pitchDecay: 0.02, octaves: 2, envelope: { attack: 0.001, decay: 0.12, sustain: 0 }, volume: -10 }).connect(drumBus);
    const hat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.035, sustain: 0 }, volume: -16 });
    hat.chain(new Tone.Filter(8000, "highpass"), drumBus);
    const ohat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.002, decay: 0.28, sustain: 0 }, volume: -20 });
    ohat.chain(new Tone.Filter(7000, "highpass"), drumBus);
    const metal = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 1.1, release: 0.3 }, harmonicity: 5.1, modulationIndex: 28, resonance: 3800, octaves: 1.4, volume: -26 });
    metal.frequency.value = 180;
    metal.connect(drumBus);

    // lead
    const vib = new Tone.Vibrato({ frequency: 5.2, depth: 0.06 });
    const lead = new Tone.MonoSynth({
      oscillator: { type: "fatsawtooth", count: 2, spread: 14 },
      filter: { type: "lowpass", Q: 3, rolloff: -24 },
      envelope: { attack: 0.02, decay: 0.3, sustain: 0.75, release: 0.25 },
      filterEnvelope: { attack: 0.03, decay: 0.4, sustain: 0.45, release: 0.3, baseFrequency: 500, octaves: 3.2 },
      portamento: 0.045,
    });
    lead.chain(vib, ch.lead);

    // pad + riser (bridge)
    const padFilter = new Tone.Filter(1600, "lowpass");
    const pad = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "fatsawtooth", count: 3, spread: 28 },
      envelope: { attack: 0.9, decay: 0.4, sustain: 0.85, release: 2.2 },
    });
    pad.chain(new Tone.Distortion(0.55), padFilter, ch.pad);
    const riserF = new Tone.Filter(300, "bandpass", -12);
    const riserG = new Tone.Gain(0);
    const riser = new Tone.Noise("pink");
    riser.chain(riserF, riserG, ch.pad);

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const isA = id === "a" || id === "a2";
      const next = BARS[i + 1]?.chord || chord;

      // per-bar mix state (robust to seeking)
      at(T(i, 0), time => {
        const intro = id === "intro";
        epFilter.frequency.cancelScheduledValues(time);
        epFilter.frequency.linearRampToValueAtTime(intro ? 500 + 700 * (local + 1) : id === "outro" ? 3000 : 6000, time + BAR);
        crusher.wet.setValueAtTime(id === "bridge" ? 0.55 : 0, time);
        drumDist.wet.setValueAtTime(id === "bridge" ? 0.35 : 0, time);
        bassDist.wet.setValueAtTime(id === "bridge" ? 0.45 : 0, time);
        if (id !== "bridge") riserG.gain.setValueAtTime(0, time);
      });

      // keys
      const v = chord.v;
      const play = (step, dur, vel) => at(T(i, step) + human(0.008), t => { ep.triggerAttackRelease(v, D(dur), t, vel); flash("keys", t); });
      if (id === "intro") { play(0, 15, 0.55); if (local % 2) play(10, 5, 0.35); }
      else if (isA) {
        if (local % 8 === 7) { play(0, 8, 0.6); play(10, 6, 0.45); }
        else { play(0, 3, 0.62); play(6, 2, 0.42); play(10, 5, 0.52); }
      } else if (id === "b") {
        if (local % 2 === 0) play(0, 16, 0.55); else { play(6, 3, 0.4); play(10, 6, 0.45); }
      } else if (id === "outro") {
        play(0, local === 3 ? 30 : 15, local === 3 ? 0.5 : 0.55);
      }

      // jazz piano fills in A'
      if (id === "a2" && local % 2 === 1 && local % 8 !== 7) {
        const run = v.map(n => m(n) + 12).reverse();
        run.forEach((n, k) => at(T(i, 12 + k), t => piano.triggerAttackRelease(f(n), D(1), t, 0.35 + 0.05 * k)));
      }

      // bass
      const r = chord.root;
      const bn = (step, midi, dur, vel) => at(T(i, step) + human(0.004), t => {
        bass.triggerAttackRelease(f(midi), D(dur), t, vel); sub.triggerAttackRelease(f(midi), D(dur), t, vel * 0.9); flash("bass", t);
      });
      let approach = next.root - 1; if (Math.abs(approach - r) > 7) approach += approach > r ? -12 : 12;
      if (isA) {
        if (local % 8 === 7) {
          bn(0, r, 3, 0.95); bn(4, r + 12, 2, 0.7);
          let n = r + 12; const run = [];
          while (run.length < 8) { n--; if (DB_SCALE.has(((n % 12) + 12) % 12)) run.push(n); }
          run.forEach((note, k) => bn(8 + k, note, 1, 0.6 + 0.04 * k));
        } else {
          bn(0, r, 2, 1); bn(3, r, 1, 0.45); bn(6, r + 7, 2, 0.8); bn(10, r + 12, 1, 0.7); bn(11, r + 7, 1, 0.5); bn(14, r, 1, 0.7); bn(15, approach, 1, 0.8);
        }
      } else if (id === "b") {
        bn(0, r, 6, 1); bn(6, r + 12, 1, 0.5); bn(7, r, 2, 0.7); bn(10, r + 7, 3, 0.8); bn(14, approach, 2, 0.7);
      } else if (id === "bridge") {
        bn(0, r, 8, 1); bn(8, r, 4, 0.8); bn(12, r, 2, 0.6); bn(14, r + 12, 2, 0.7);
      } else if (id === "outro") {
        bn(0, r, local === 3 ? 30 : 15, 0.8);
      }

      // drums
      const k = (step, vel = 0.9) => at(T(i, step), t => { kick.triggerAttackRelease("C1", "8n", t, vel); flash("drums", t); });
      const sn = (step, vel = 0.9) => at(T(i, step) + human(0.004), t => { snareN.triggerAttackRelease("16n", t, vel); snareB.triggerAttackRelease("G2", "16n", t, vel); });
      const h = (step, vel = 0.5) => at(T(i, step) + human(0.007), t => hat.triggerAttackRelease("32n", t, vel));
      const oh = (step, vel = 0.5) => at(T(i, step), t => ohat.triggerAttackRelease("8n", t, vel));
      const crash = () => at(T(i, 0), t => metal.triggerAttackRelease("C4", "1n", t, 0.6));
      if (id === "intro" && local >= 6) {
        for (let s = 0; s < 16; s += 2) h(s, 0.25 + 0.1 * (local - 6));
        if (local === 7) { sn(12, 0.3); sn(13, 0.45); sn(14, 0.6); sn(15, 0.8); }
      } else if (isA) {
        if (local === 0) crash();
        k(0); k(7, 0.55); k(10, 0.8); sn(4); sn(12); sn(9, 0.18); sn(15, 0.15);
        for (let s = 0; s < 16; s += 2) h(s, s % 4 === 0 ? 0.55 : 0.4);
        h(7, 0.2); h(13, 0.22);
        if (id === "a2") for (let s = 1; s < 16; s += 2) h(s, 0.18);
        if (local % 4 === 3) oh(14, 0.55);
        if (local === 15 && id === "a") { sn(13, 0.5); sn(14, 0.7); sn(15, 0.85); }
      } else if (id === "b") {
        if (local === 0) crash();
        k(0); k(3, 0.7); k(11, 0.8); sn(8); sn(14, 0.2);
        for (let s = 0; s < 16; s += 2) h(s, 0.45);
        if (local % 2 === 1) { h(13, 0.3); h(15, 0.35); }
        if (local === 7) { h(12, 0.3); h(13, 0.4); h(14, 0.5); h(15, 0.6); }
      } else if (id === "bridge") {
        if (local % 2 === 0) crash();
        k(0, 1); k(6, 0.8); k(8, 1); k(10, 0.6); sn(4, 1); sn(12, 1);
        for (let s = 0; s < 16; s++) h(s, s % 2 ? 0.3 : 0.55);
        if (local === 7) { sn(8, 0.6); sn(10, 0.7); sn(12, 0.85); sn(13, 0.9); sn(14, 1); sn(15, 1); }
      } else if (id === "outro" && local === 0) {
        crash();
      }

      // lead
      const ln = (step, note, dur, vel = 0.8) => at(T(i, step), t => { lead.triggerAttackRelease(note, D(dur) * 0.95, t, vel); flash("lead", t); });
      if (isA) {
        let phrase = MEL_A[local % 8];
        if (local === 15) phrase = id === "a" ? MEL_A_END : MEL_A2_END;
        phrase.forEach(([s, n, d]) => ln(s, n, d));
      } else if (id === "b" && MEL_B[local]) {
        MEL_B[local].forEach(([s, n, d]) => ln(s, n, d, 0.6));
      }

      // pad + riser in bridge
      if (id === "bridge") {
        at(T(i, 0), t => { pad.triggerAttackRelease(chord.v, D(15), t, 0.5); flash("pad", t); });
        if (local === 6) at(T(i, 0), t => {
          riserF.frequency.cancelScheduledValues(t);
          riserF.frequency.setValueAtTime(300, t); riserF.frequency.exponentialRampToValueAtTime(6000, t + 2 * BAR);
          riserG.gain.cancelScheduledValues(t);
          riserG.gain.setValueAtTime(0, t); riserG.gain.linearRampToValueAtTime(0.6, t + 2 * BAR - 0.05); riserG.gain.linearRampToValueAtTime(0, t + 2 * BAR);
        });
      }
    });

    riser.start();
    return { releaseAll() { ep.releaseAll(); piano.releaseAll(); pad.releaseAll(); [bass, sub, lead].forEach(s => s.triggerRelease()); } };
  },
});
})();
