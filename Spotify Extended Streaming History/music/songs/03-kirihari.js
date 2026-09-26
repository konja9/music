// No.3 切り貼り — experimental hip-hop with a beat switch
(() => {
// "sample" chords (F minor) and the beat-switch chords a half step down (E minor)
const C = {
  Fm9:    { sym: "Fm9",          root: 29, v: ["Ab3", "C4", "Eb4", "G4"] },
  Dbmaj7: { sym: "D♭maj7",       root: 37, v: ["Ab3", "C4", "Db4", "F4"] },
  Bbm9:   { sym: "B♭m9",         root: 34, v: ["Db4", "F4", "Ab4", "C5"] },
  C7b9:   { sym: "C7(♭9)",       root: 36, v: ["Bb3", "Db4", "E4", "G4"] },
  Em9:    { sym: "Em9",          root: 28, v: ["G3", "B3", "D4", "F#4"] },
  Cmaj7:  { sym: "Cmaj7(♯11)",   root: 36, v: ["B3", "E4", "F#4", "G4"] },
  Am9:    { sym: "Am9",          root: 33, v: ["G3", "B3", "C4", "E4"] },
  B7alt:  { sym: "B7(♯5♭9)",     root: 35, v: ["A3", "D#4", "G4", "C5"] },
};
const LOOP = ["Fm9", "Dbmaj7", "Bbm9", "C7b9"];
const SWITCH = ["Em9", "Cmaj7", "Am9", "B7alt"];
const SECTIONS = [
  { id: "intro",  name: "イントロ",       bars: 4,  chords: LOOP, intensity: 0.25 },
  { id: "a",      name: "ビートA",        bars: 16, chords: LOOP, intensity: 0.6 },
  { id: "switch", name: "ビートスイッチ", bars: 8,  chords: SWITCH, intensity: 1 },
  { id: "glitch", name: "グリッチ",       bars: 4,  chords: ["C7b9"], intensity: 0.85 },
  { id: "b",      name: "ビートB",        bars: 16, chords: LOOP, intensity: 0.7 },
  { id: "outro",  name: "アウトロ",       bars: 8,  chords: [...LOOP, ...LOOP], intensity: 0.25 },
];
// lead for beat B (original): [step, note, durSteps] per bar
const MEL = [
  [[0, "C5", 3], [3, "Eb5", 3], [6, "F5", 2], [8, "G5", 4], [12, "Ab5", 2], [14, "G5", 2]],
  [[0, "F5", 6], [6, "Eb5", 2], [8, "C5", 6]],
  [[2, "Db5", 2], [4, "F5", 2], [6, "Ab5", 4], [10, "G5", 2], [12, "F5", 4]],
  [[0, "E5", 4], [4, "Db5", 4], [8, "Bb4", 4], [12, "G4", 4]],
];
const MEL_HI = [
  [[0, "G5", 3], [3, "Ab5", 3], [6, "C6", 2], [8, "Bb5", 4], [12, "Ab5", 2], [14, "G5", 2]],
  [[0, "F5", 4], [4, "Ab5", 4], [8, "C6", 8]],
  [[0, "Db6", 4], [4, "C6", 2], [6, "Ab5", 2], [8, "F5", 4], [12, "Db5", 4]],
  [[0, "E5", 2], [2, "G5", 2], [4, "Bb5", 2], [6, "Db6", 2], [8, "C6", 8]],
];

SONGS.push({
  id: "kirihari", no: 3, title: "切り貼り", date: "2026-09-26",
  bpm: 88, swing: 0.26, key: "F マイナー → E マイナー", genre: "実験的ヒップホップ", tail: 4,
  masterGain: 0.8, comp: { threshold: -20, ratio: 4, attack: 0.004, release: 0.16 },
  accent: { light: "#b8336a", dark: "#ef7aa8" },
  blurb: "ソウルのレコードから切り出したような和音を、刻んで、音程を変えて、並べ直したビートです。途中で予告なしに半音下のキーと倍テンポのトラップに切り替わり、テープが止まるように崩れてから元のビートに戻ります。",
  parts: [["drums", "ドラム"], ["bass", "808"], ["chop", "サンプル"], ["lead", "リード"], ["noise", "レコードノイズ"]],
  why: [
    ["サンプル風の上ネタ", "刻んで並べ直した和音", "Fm9 → D♭maj7 → B♭m9 → C7(♭9) を、こもった音色で細かく刻んで鳴らしています。小節の最後の一切れは1オクターブ下げ、回転数を落としたレコードのようにしています。", [["Kanye West", 22], ["A Tribe Called Quest", 7], ["Common", 9]]],
    ["ビートスイッチ", "予告なしの転換", "8小節だけ、キーを半音下げ、ハイハットを3連の連打が入るトラップに変えます。展開の途中で曲ががらっと変わるのは、よく聴いているアーティストたちがよく使う手です。", [["JPEGMAFIA", 23], ["Kendrick Lamar", 33], ["Tyler, The Creator", 20]]],
    ["すべる808", "歪ませたサブベース", "低音は音程がすべる808で、音と音をつなげてオクターブを上下させています。軽く歪ませて、小さいスピーカーでも聞こえるようにしました。", [["Denzel Curry", 6], ["Doechii", 6]]],
    ["テープストップ", "グリッチの4小節", "和音を16分で連打しながら半音ずつ下げていき、ドラムも細かく刻んで崩します。最後の1拍は無音にしてからビートBに戻ります。", [["JPEGMAFIA", 23]]],
    ["ヨレたスウィング", "16分に26%", "裏の16分を大きめに遅らせた、手打ち風のブーンバップです。", [["A Tribe Called Quest", 7], ["Kendrick Lamar", 33]]],
    ["リード", "矩形波＋ビブラート", "ビートBではシンセのメロディを重ねます。後半の8小節は音域を上げています。", [["Tyler, The Creator", 20]]],
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const ch = kit.ch;
    const reverb = new Tone.Reverb({ decay: 2.6, preDelay: 0.02, wet: 1 });
    kit.bus("rev", -8, reverb);
    const delay = new Tone.FeedbackDelay({ delayTime: "8n", feedback: 0.35, wet: 1 });
    kit.bus("dly", -12, new Tone.Filter(1800, "lowpass"), delay);
    kit.channel("drums", -6, { rev: -24 }); kit.channel("bass", -7); kit.channel("chop", -9, { rev: -14 }); kit.channel("lead", -15, { rev: -12, dly: -6 }); kit.channel("noise", -22);

    // seeded random so the crackle is the same every play
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    // chopped "sample": FM keys through a dusty band-limited filter
    const chopLP = new Tone.Filter(2600, "lowpass", -24);
    const chopHP = new Tone.Filter(180, "highpass");
    const chopCrush = kit.shaper(24);
    const chop = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 2, modulationIndex: 2.5,
      oscillator: { type: "triangle" }, modulation: { type: "sine" },
      envelope: { attack: 0.004, decay: 0.5, sustain: 0.35, release: 0.08 },
      modulationEnvelope: { attack: 0.002, decay: 0.3, sustain: 0.1, release: 0.1 },
    });
    chop.maxPolyphony = 32;
    const wow = new Tone.Vibrato({ frequency: 0.7, depth: 0.05 });
    chop.chain(chopHP, chopCrush, chopLP, wow, ch.chop);

    // 808: gliding sine, driven
    const b808 = new Tone.MonoSynth({
      oscillator: { type: "sine" }, portamento: 0.06,
      envelope: { attack: 0.003, decay: 0.8, sustain: 0.55, release: 0.25 },
      filter: { frequency: 900 }, filterEnvelope: { baseFrequency: 800, octaves: 0 },
    });
    const b808Dist = new Tone.Distortion(0.35);
    b808.chain(b808Dist, ch.bass);

    // drums
    const drumBus = new Tone.Gain(1);
    const drumCrush = new Tone.CrossFade(0);
    const drumShaper = kit.shaper(14);
    drumBus.connect(drumCrush.a); drumBus.connect(drumShaper); drumShaper.connect(drumCrush.b);
    const drumLP = new Tone.Filter(20000, "lowpass");
    drumCrush.chain(drumLP, ch.drums);
    const kick = new Tone.MembraneSynth({ pitchDecay: 0.03, octaves: 5, envelope: { attack: 0.001, decay: 0.28, sustain: 0 } }).connect(drumBus);
    const snareN = new Tone.NoiseSynth({ noise: { type: "pink" }, envelope: { attack: 0.001, decay: 0.16, sustain: 0 }, volume: -5 });
    snareN.chain(new Tone.Filter(2200, "bandpass", -12), drumBus);
    const snareB = new Tone.MembraneSynth({ pitchDecay: 0.015, octaves: 2, envelope: { attack: 0.001, decay: 0.1, sustain: 0 }, volume: -9 }).connect(drumBus);
    const rim = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.05, release: 0.02 }, harmonicity: 3.1, modulationIndex: 10, resonance: 2500, octaves: 0.6, volume: -22 });
    rim.connect(drumBus);
    const hat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.03, sustain: 0 }, volume: -18 });
    hat.chain(new Tone.Filter(9000, "highpass"), drumBus);
    const ohat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.002, decay: 0.22, sustain: 0 }, volume: -22 });
    ohat.chain(new Tone.Filter(7500, "highpass"), drumBus);

    // lead
    const lead = new Tone.MonoSynth({
      oscillator: { type: "square" }, portamento: 0.04,
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.2 },
      filter: { type: "lowpass", Q: 2 }, filterEnvelope: { attack: 0.01, decay: 0.3, sustain: 0.4, baseFrequency: 700, octaves: 2.2 },
    });
    lead.chain(new Tone.Vibrato({ frequency: 5.5, depth: 0.08 }), ch.lead);

    // vinyl: constant hiss + seeded clicks
    const hiss = new Tone.Noise("brown");
    const hissG = new Tone.Gain(0.35);
    hiss.chain(new Tone.Filter(1200, "highpass"), hissG, ch.noise);
    const click = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.0005, decay: 0.004, sustain: 0 }, volume: 2 });
    click.chain(new Tone.Filter(3000, "highpass"), ch.noise);

    const k = (i, s, v = 0.95) => at(T(i, s), t => { kick.triggerAttackRelease("C1", "8n", t, v); flash("drums", t); });
    const sn = (i, s, v = 0.9) => at(T(i, s) + human(0.006), t => { snareN.triggerAttackRelease("16n", t, v); snareB.triggerAttackRelease("A2", "16n", t, v); });
    const h = (i, s, v = 0.45) => at(T(i, s) + human(0.006), t => hat.triggerAttackRelease("32n", t, v));
    const oh = (i, s, v = 0.5) => at(T(i, s), t => ohat.triggerAttackRelease("8n", t, v));
    const rm = (i, s, v = 0.6) => at(T(i, s), t => rim.triggerAttackRelease("C5", "32n", t, v));
    const cp = (i, s, voicing, dur, v, shift = 0) => at(T(i, s) + human(0.004), t => {
      chop.triggerAttackRelease(voicing.map(n => f(m(n) + shift)), D(dur), t, v); flash("chop", t);
    });
    const bb = (i, s, midi, dur, v = 0.9) => at(T(i, s), t => { b808.triggerAttackRelease(f(midi), D(dur), t, v); flash("bass", t); });

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const v = chord.v, r = chord.root;

      // per-bar state
      at(T(i, 0), t => {
        chopLP.frequency.cancelScheduledValues(t);
        if (id === "intro") chopLP.frequency.linearRampToValueAtTime(600 + 350 * (local + 1), t + BAR);
        else if (id === "outro") chopLP.frequency.linearRampToValueAtTime(Math.max(400, 2600 - 280 * (local + 1)), t + BAR);
        else chopLP.frequency.setValueAtTime(id === "switch" ? 4200 : 2600, t);
        drumCrush.fade.setValueAtTime(id === "switch" ? 0.35 : id === "glitch" ? 0.7 : 0.12, t);
        drumLP.frequency.setValueAtTime(id === "outro" ? 1200 : 20000, t);
        hissG.gain.setValueAtTime(id === "switch" ? 0.1 : id === "intro" || id === "outro" ? 0.6 : 0.35, t);
        if (id !== "switch") chop.set({ envelope: { attack: 0.004 } });   // in case playback jumped out of the switch
      });
      // crackle
      for (let c = 0, n = 3 + Math.floor(rnd() * 4); c < n; c++) {
        const s = rnd() * 16, v2 = 0.2 + rnd() * 0.6;
        at(T(i, s), t => click.triggerAttackRelease("64n", t, v2));
      }

      // ----- chopped sample -----
      if (id === "intro" || id === "a" || id === "b" || id === "outro") {
        cp(i, 0, v, 3, 0.7); cp(i, 3, v, 2.5, 0.55); cp(i, 6, v, 2, 0.6); cp(i, 10, v, 3.5, 0.62);
        cp(i, 14, v, 2, 0.5, -12);                   // the slowed-down last slice
        if (local % 4 === 3 && id !== "outro") { cp(i, 15, v, 0.5, 0.45); cp(i, 15.5, v, 0.5, 0.5); }
      } else if (id === "switch") {
        // swelling pads, reversed-sample feel
        at(T(i, 0), t => { chop.set({ envelope: { attack: 0.6 } }); chop.triggerAttackRelease(v.map(n => f(m(n) + 12)), D(7), t, 0.45); flash("chop", t); });
        at(T(i, 8), t => { chop.triggerAttackRelease(v, D(7), t, 0.4); });
        at(T(i, 15.9), t => chop.set({ envelope: { attack: 0.004 } }));
      } else if (id === "glitch") {
        // tape stop: 16th stutters sliding down a half step at a time
        for (let s = 0; s < 16; s++) {
          if (local === 3 && s >= 12) break;
          const shift = -Math.floor((local * 16 + s) / 4);
          cp(i, s, v, 0.7, 0.35 + 0.02 * (s % 4), Math.max(shift, -14));
        }
      }

      // ----- 808 -----
      if (id === "a" || id === "b") {
        bb(i, 0, r, 6); bb(i, 7, r, 2.5, 0.7); bb(i, 10, r, 3, 0.8);
        if (local % 2 === 1) { bb(i, 13, r + 12, 1.2, 0.7); bb(i, 14, r, 2, 0.8); }   // octave hop -> glide
      } else if (id === "switch") {
        bb(i, 0, r, 5); bb(i, 5, r + 12, 1.1, 0.7); bb(i, 6, r, 4, 0.85); bb(i, 11, r + 7, 1.5, 0.7); bb(i, 12, r + 5, 3, 0.8);
      } else if (id === "glitch" && local < 3) {
        bb(i, 0, r, 3, 0.9); bb(i, 8, r - (local + 1), 3, 0.8);
      } else if (id === "outro" && local === 7) {
        bb(i, 0, 29, 12, 0.8);
      }

      // ----- drums -----
      if (id === "intro" && local === 3) {
        sn(i, 12, 0.4); sn(i, 14, 0.6); sn(i, 15, 0.8);
      } else if (id === "a" || id === "b") {
        k(i, 0); k(i, 7, 0.6); k(i, 10, 0.85); if (local % 4 === 3) k(i, 15, 0.5);
        sn(i, 4); sn(i, 12); sn(i, 9, 0.15);
        for (let s = 0; s < 16; s += 2) h(i, s, s % 4 === 0 ? 0.5 : 0.35);
        h(i, 7, 0.2); h(i, 11, 0.22);
        if (id === "b") { rm(i, 6, 0.5); rm(i, 14, 0.4); }
        if (local % 8 === 7) oh(i, 14, 0.55);
      } else if (id === "switch") {
        k(i, 0, 1); k(i, 6, 0.8); if (local % 2) k(i, 11, 0.8);
        sn(i, 8, 1);
        for (let s = 0; s < 16; s++) {
          const roll = (local % 2 === 1 && s >= 12) || (local % 4 === 2 && s >= 6 && s < 8);
          if (roll) { for (let r3 = 0; r3 < 3; r3++) h(i, s + r3 / 3, 0.25 + 0.1 * r3); }
          else h(i, s, s % 2 ? 0.3 : 0.5);
        }
        if (local === 7) { sn(i, 12, 0.6); sn(i, 13, 0.7); sn(i, 14, 0.8); sn(i, 15, 0.9); }
      } else if (id === "glitch") {
        const every = [2, 1, 1, 0.5][local];
        for (let s = 0; s < 16; s += every) {
          if (local === 3 && s >= 12) break;            // one beat of silence before beat B
          if (s % 4 === 0) k(i, s, 0.9); else sn(i, s, 0.3 + (s / 16) * 0.5);
        }
      } else if (id === "outro" && local < 4) {
        k(i, 0, 0.7); sn(i, 12, 0.5);
        for (let s = 0; s < 16; s += 4) h(i, s, 0.3);
      }

      // ----- lead (beat B) -----
      if (id === "b") {
        const phrase = (local >= 8 ? MEL_HI : MEL)[local % 4];
        phrase.forEach(([s, n, d]) => at(T(i, s), t => { lead.triggerAttackRelease(n, D(d) * 0.9, t, 0.75); flash("lead", t); }));
      }
    });

    hiss.start();
    return { releaseAll() { chop.releaseAll(); b808.triggerRelease(); lead.triggerRelease(); } };
  },
});
})();
