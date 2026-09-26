// No.5 残響 — dark ambient ballad: sparse piano, sudden sub, one distorted swell
(() => {
const C = {
  Cm9:    { sym: "Cm9",         root: 36, v: ["Eb3", "G3", "Bb3", "D4"] },
  Abmaj7: { sym: "A♭maj7",      root: 32, v: ["Ab3", "C4", "Eb4", "G4"] },
  EbG:    { sym: "E♭maj7/G",    root: 31, v: ["Bb3", "D4", "Eb4", "G4"] },
  Fm9:    { sym: "Fm9",         root: 29, v: ["Ab3", "C4", "Eb4", "G4"] },
  Abadd9: { sym: "A♭(add9)",    root: 32, v: ["Bb3", "C4", "Eb4", "Ab4"] },
  CmEb:   { sym: "Cm/E♭",       root: 39, v: ["G3", "C4", "Eb4"] },
  G7sus:  { sym: "G7sus4",      root: 31, v: ["F3", "C4", "D4"] },
  G7b9:   { sym: "G7(♭9)",      root: 31, v: ["F3", "B3", "D4", "Ab4"] },
  Cm:     { sym: "Cm",          root: 36, v: ["C4", "Eb4", "G4"] },
};
const CYCLE = ["Cm9", "Abmaj7", "EbG", "Fm9"];
const CLIMAX = ["Abadd9", "Fm9", "CmEb", "G7sus", "Abadd9", "Fm9", "CmEb", "G7b9"];
const SECTIONS = [
  { id: "intro",   name: "イントロ", bars: 4, chords: CYCLE, intensity: 0.15 },
  { id: "verse",   name: "ヴァース", bars: 8, chords: CYCLE, intensity: 0.35 },
  { id: "drop",    name: "低音",     bars: 8, chords: CYCLE, intensity: 0.65 },
  { id: "inter",   name: "間奏",     bars: 4, chords: ["Abmaj7", "Fm9", "Abmaj7", "G7sus"], intensity: 0.25 },
  { id: "climax",  name: "歪み",     bars: 8, chords: CLIMAX, intensity: 1 },
  { id: "outro",   name: "アウトロ", bars: 6, chords: ["Cm9", "Abmaj7", "EbG", "Fm9", "Cm", "Cm"], intensity: 0.15 },
];
// piano right hand (original): [step, note, durSteps]
const INTRO_MEL = [[[4, "G5", 6], [12, "D5", 4]], [[8, "Eb5", 8]], [[4, "C5", 12]], [[0, "Bb4", 6], [8, "G4", 8]]];
const VERSE_MEL = [
  [[8, "G4", 4], [12, "Bb4", 4]],
  [[0, "C5", 8], [10, "Bb4", 2], [12, "G4", 4]],
  [[4, "Bb4", 4], [8, "D5", 8]],
  [[0, "C5", 6], [8, "Ab4", 8]],
  [[8, "G4", 4], [12, "Eb5", 4]],
  [[0, "D5", 8], [8, "C5", 4], [12, "Bb4", 4]],
  [[4, "G4", 4], [8, "Bb4", 4], [12, "Eb5", 4]],
  [[0, "D5", 16]],
];
const CLIMAX_MEL = [
  [[0, "Eb5", 4], [4, "C5", 4], [8, "Bb4", 8]],
  [[0, "Ab4", 4], [4, "C5", 4], [8, "Eb5", 8]],
  [[0, "G5", 8], [8, "F5", 4], [12, "Eb5", 4]],
  [[0, "D5", 16]],
  [[0, "Eb5", 4], [4, "F5", 4], [8, "G5", 8]],
  [[0, "Ab5", 8], [8, "G5", 4], [12, "F5", 4]],
  [[0, "Eb5", 8], [8, "D5", 4], [12, "C5", 4]],
  [[0, "B4", 8], [8, "D5", 8]],
];

SONGS.push({
  id: "zankyo", no: 5, title: "残響", date: "2026-09-26",
  bpm: 68, swing: 0, key: "C マイナー", genre: "アンビエント／バラード", tail: 7,
  masterGain: 0.85, comp: { threshold: -22, ratio: 2.5, attack: 0.02, release: 0.3 },
  accent: { light: "#5b4fc4", dark: "#a99cf0" },
  blurb: "間の多いピアノと長い残響から始まり、途中で急に深い低音が入ってきます。後半で一度だけ全体を大きく歪ませ、最後はまたピアノだけに戻って消えていきます。静かな場所で、少し大きめの音量で聴いてください。",
  parts: [["piano", "ピアノ"], ["voice", "声のようなパッド"], ["sub", "サブベース"], ["drums", "キック・スネア"], ["noise", "テープノイズ"]],
  why: [
    ["急に落ちる低音", "1オクターブ上から滑り落ちるサブ", "「低音」の頭で、サブベースが1オクターブ上から滑り落ちて入ってきます。それまで低い音をほとんど鳴らさないのは、この落差を作るためです。", [["James Blake", 8]]],
    ["間の多いピアノ", "テープのゆらぎ", "ピアノには、ごくわずかに音程を揺らすビブラートをかけ、古いテープで再生しているような不安定さを出しています。残響は8秒近くあります。", [["Radiohead", 10], ["Nine Inch Nails", 40]]],
    ["声のようなパッド", "母音に近い帯域", "人の声の帯域に寄せたパッドを長く伸ばし、「低音」では短く刻んで、切り刻んだ声のように使います。", [["James Blake", 8], ["宇多田ヒカル", 14]]],
    ["心音のキック", "ドッ、ドッ", "ヴァースは2つ続く柔らかいキックだけで、脈のように鳴らしています。スネアは3拍目に1発だけで、大きな残響をつけています。", [["James Blake", 8]]],
    ["一度だけの歪み", "Ab(add9) → G7(♭9)", "後半の8小節だけ、サブ、パッド、スネアを強く歪ませて削ります。「断線」や「17時のシグナル」のブリッジと同じ系統の音です。", [["Nine Inch Nails", 40], ["Radiohead", 10]]],
    ["コード", "Cm9 → A♭maj7 → E♭maj7/G → Fm9", "上の声部がほとんど動かず、ベースだけが下りていく循環です。", [["Radiohead", 10], ["Aimer", 9]]],
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const ch = kit.ch;
    const reverb = new Tone.Reverb({ decay: 7.5, preDelay: 0.04, wet: 1 });
    kit.bus("rev", -4, new Tone.Filter(5000, "lowpass"), reverb);
    kit.channel("piano", -8, { rev: -3 }); kit.channel("voice", -16, { rev: -2 }); kit.channel("sub", -7); kit.channel("drums", -10, { rev: -6 }); kit.channel("noise", -24, { rev: -12 });

    // piano with tape wobble
    const piano = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 2, modulationIndex: 1.1,
      oscillator: { type: "triangle" }, modulation: { type: "sine" },
      envelope: { attack: 0.003, decay: 3.2, sustain: 0.06, release: 2.4 },
      modulationEnvelope: { attack: 0.002, decay: 0.3, sustain: 0, release: 0.3 },
    });
    piano.maxPolyphony = 24;
    const pianoWow = new Tone.Vibrato({ frequency: 0.45, depth: 0.035 });
    const pianoDist = new Tone.Distortion({ distortion: 0.5, wet: 0 });
    piano.chain(pianoWow, pianoDist, new Tone.Filter(4200, "lowpass"), ch.piano);

    // voice-like pad: detuned saws through two formant-ish bands
    const voice = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "fatsawtooth", count: 3, spread: 22 }, envelope: { attack: 1.2, decay: 0.5, sustain: 0.8, release: 3 } });
    voice.maxPolyphony = 24;
    const f1 = new Tone.Filter({ type: "bandpass", frequency: 700, Q: 3 });
    const f2 = new Tone.Filter({ type: "bandpass", frequency: 1150, Q: 4 });
    const voiceSum = new Tone.Gain(1.6);
    const voiceDist = new Tone.Distortion({ distortion: 0.8, wet: 0 });
    voice.connect(f1); voice.connect(f2); f1.connect(voiceSum); f2.connect(voiceSum);
    voiceSum.chain(new Tone.Vibrato({ frequency: 4.6, depth: 0.05 }), voiceDist, ch.voice);
    const chopVoice = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "fatsawtooth", count: 2, spread: 14 }, envelope: { attack: 0.01, decay: 0.15, sustain: 0.3, release: 0.25 } });
    chopVoice.maxPolyphony = 12;
    chopVoice.connect(f1); chopVoice.connect(f2);

    // sub bass
    const sub = new Tone.MonoSynth({
      oscillator: { type: "sine" }, portamento: 0.35,
      envelope: { attack: 0.02, decay: 0.6, sustain: 0.85, release: 1.2 },
      filterEnvelope: { baseFrequency: 400, octaves: 0 },
    });
    const subDist = new Tone.Distortion({ distortion: 0.9, wet: 0 });
    sub.chain(subDist, new Tone.Filter(900, "lowpass"), ch.sub);

    // heartbeat kick + one big snare
    const drumXf = new Tone.CrossFade(0);
    const drumShaper = kit.shaper(8);
    const drumBus = new Tone.Gain(1);
    drumBus.connect(drumXf.a); drumBus.connect(drumShaper); drumShaper.connect(drumXf.b);
    drumXf.connect(ch.drums);
    const kick = new Tone.MembraneSynth({ pitchDecay: 0.06, octaves: 4, envelope: { attack: 0.002, decay: 0.45, sustain: 0 } }).connect(drumBus);
    const snareN = new Tone.NoiseSynth({ noise: { type: "pink" }, envelope: { attack: 0.002, decay: 0.3, sustain: 0 }, volume: -4 });
    snareN.chain(new Tone.Filter(1800, "bandpass", -12), drumBus);
    const snareB = new Tone.MembraneSynth({ pitchDecay: 0.02, octaves: 2, envelope: { attack: 0.001, decay: 0.2, sustain: 0 }, volume: -8 }).connect(drumBus);

    // tape noise
    const tape = new Tone.Noise("brown");
    const tapeG = new Tone.Gain(0.5);
    tape.chain(new Tone.Filter(350, "highpass"), new Tone.Filter(3500, "lowpass"), tapeG, ch.noise);

    const pn = (i, s, notes, dur, vel) => at(T(i, s) + human(0.01), t => { piano.triggerAttackRelease(notes, D(dur), t, vel); flash("piano", t); });
    const mel = (i, list, vel = 0.42, oct = 0) => list.forEach(([s, n, d]) => pn(i, s, oct ? f(m(n) + oct) : n, d, vel));

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const v = chord.v, r = chord.root;
      const climax = id === "climax";

      // per-bar state
      at(T(i, 0), t => {
        subDist.wet.setValueAtTime(climax ? 0.7 : 0, t);
        voiceDist.wet.setValueAtTime(climax ? 0.6 : 0, t);
        pianoDist.wet.setValueAtTime(climax && local >= 4 ? 0.25 : 0, t);
        drumXf.fade.setValueAtTime(climax ? 0.75 : 0, t);
        f1.frequency.setValueAtTime(id === "drop" ? 600 : 700, t);
        tapeG.gain.cancelScheduledValues(t);
        if (id === "outro") { tapeG.gain.setValueAtTime(0.6 * (1 - local / 6), t); tapeG.gain.linearRampToValueAtTime(0.6 * (1 - (local + 1) / 6), t + BAR); }
        else tapeG.gain.setValueAtTime(id === "intro" ? 0.7 : climax ? 0.3 : 0.45, t);
      });

      // ----- piano -----
      const low = f(r + 12);
      if (id === "intro") {
        mel(i, INTRO_MEL[local], 0.38);
      } else if (id === "verse") {
        pn(i, 0, low, 14, 0.4); pn(i, 4, v, 10, 0.3);
        mel(i, VERSE_MEL[local]);
      } else if (id === "drop") {
        pn(i, 0, [low, ...v], 14, 0.38);
        mel(i, VERSE_MEL[local], 0.36, 12);
      } else if (id === "inter") {
        pn(i, 0, v, 16, 0.3);
        if (local % 2 === 0) pn(i, 8, f(m(v[v.length - 1]) + 12), 8, 0.3);
      } else if (climax) {
        for (let s = 0; s < 16; s += 4) pn(i, s, [low, ...v], 4, s === 0 ? 0.55 : 0.38);
        mel(i, CLIMAX_MEL[local], 0.55, 12);
      } else if (id === "outro") {
        if (local < 4) { pn(i, 0, v, 14, 0.3); mel(i, VERSE_MEL[local + 4], 0.3); }
        else if (local === 4) { pn(i, 0, [f(r), ...v], 28, 0.32); pn(i, 8, "G5", 20, 0.22); }
      }

      // ----- voice pad -----
      if (id === "verse" || id === "drop" || id === "inter" || climax || (id === "outro" && local < 4)) {
        at(T(i, 0), t => { voice.triggerAttackRelease(v.map(n => f(m(n) + 12)), D(15), t, climax ? 0.6 : 0.35); flash("voice", t); });
      }
      if (id === "drop" || climax) {
        const top = m(v[v.length - 1]) + 24;
        [[6, 0], [7, 0], [14, -2], [15, -5]].forEach(([s, iv]) => at(T(i, s), t => { chopVoice.triggerAttackRelease(f(top + iv), D(0.7), t, 0.5); flash("voice", t); }));
      }

      // ----- sub -----
      if (id === "drop" || climax) {
        if ((id === "drop" && local === 0) || (climax && local === 0)) {
          // the drop: start an octave up and slide down
          at(T(i, 0), t => { sub.triggerAttack(f(r + 12), t, 1); sub.setNote(f(r), t + 0.05); sub.triggerRelease(t + D(15)); flash("sub", t); });
        } else {
          at(T(i, 0), t => { sub.triggerAttackRelease(f(r), D(15), t, 0.9); flash("sub", t); });
        }
      } else if (id === "outro" && local === 4) {
        at(T(i, 0), t => { sub.triggerAttackRelease(f(r), D(28), t, 0.8); flash("sub", t); });
      }

      // ----- drums -----
      const k = (s, vel) => at(T(i, s), t => { kick.triggerAttackRelease("F1", "8n", t, vel); flash("drums", t); });
      const sn = (s, vel) => at(T(i, s), t => { snareN.triggerAttackRelease("8n", t, vel); snareB.triggerAttackRelease("G2", "8n", t, vel); });
      if (id === "verse" || id === "inter") { k(0, 0.55); k(3, 0.35); }
      else if (id === "drop") { k(0, 0.7); k(3, 0.45); sn(8, 0.8); if (local % 4 === 3) k(11, 0.4); }
      else if (climax) { k(0, 0.95); k(3, 0.6); k(10, 0.7); sn(8, 1); if (local === 7) { sn(12, 0.7); sn(14, 0.85); } }
    });

    tape.start();
    return { releaseAll() { piano.releaseAll(); voice.releaseAll(); chopVoice.releaseAll(); sub.triggerRelease(); } };
  },
});
})();
