// No.7 継ぎ目 — sample collage: recorded notes used as material (chopped, reversed, slowed, stretched), in stereo
// recorded samples are never "played" as instruments here; every hit is a slice of a buffer (kit.buffers)
(() => {
const C = {
  Gm9:    { sym: "Gm9",          root: 31, v: ["Bb3", "D4", "F4", "A4"] },
  Ebmaj7: { sym: "E♭maj7(♯11)",  root: 27, v: ["G3", "Bb3", "D4", "A4"] },
  Cm11:   { sym: "Cm11",         root: 36, v: ["Bb3", "Eb4", "F4", "G4"] },
  D7b9:   { sym: "D7(♭9)",       root: 26, v: ["F#3", "C4", "Eb4", "A4"] },
};
// the switch: one Gm(add9) shape slowed a half step per bar by the tape, over a G pedal in the 808
["Gm(add9)", "F♯m/G", "Fm/G", "Em/G", "E♭m/G", "Dm/G", "D♭m/G", "Cm/G"].forEach((sym, k) => {
  C["tape" + k] = { sym, root: 31, v: ["G3", "Bb3", "D4", "A4"], drop: k };
});
const LOOP = ["Gm9", "Ebmaj7", "Cm11", "D7b9"];
const SECTIONS = [
  { id: "intro",  name: "逆回転",     bars: 4,  chords: LOOP, intensity: 0.3 },
  { id: "a",      name: "刻み",       bars: 16, chords: LOOP, intensity: 0.7 },
  { id: "b",      name: "引き伸ばし", bars: 8,  chords: ["Ebmaj7", "Cm11", "Ebmaj7", "D7b9"], intensity: 0.45 },
  { id: "switch", name: "伸びるテープ", bars: 8, chords: [0, 1, 2, 3, 4, 5, 6, 7].map(k => "tape" + k), intensity: 1 },
  { id: "a2",     name: "刻み2",      bars: 12, chords: LOOP, intensity: 0.8 },
  { id: "outro",  name: "巻き戻し",   bars: 6,  chords: ["Gm9", "Ebmaj7", "Cm11", "D7b9", "Gm9", "Gm9"], intensity: 0.25 },
];

// piano chord slices (original): [step, offset into the recording (s), lenSteps, tape speed, vel]
// tape speed 0.5 = the same slice an octave down and twice as slow, like a record at the wrong speed
const CHOP_A = [
  [[0, 0, 3, 1, 1], [3, 0.35, 2, 1, 0.7], [6, 0, 2, 1, 0.85], [8, 0.6, 3, 1, 0.7], [11, 0, 1, 1, 0.6], [12, 0.2, 2, 0.5, 0.8], [14, 0.9, 2, 1, 0.55]],
  [[0, 0, 2, 1, 1], [2, 0, 1, 1, 0.6], [3, 0.5, 3, 1, 0.7], [7, 0, 2, 1, 0.8], [10, 0.3, 2, 0.5, 0.75], [12, 0, 4, 1, 0.8]],
];
const CHOP_B = [
  [[0, 0, 2, 1, 1], [2, 0.25, 2, 1, 0.65], [4, 0, 1, 1, 0.7], [5, 0, 1, 1, 0.5], [6, 0.45, 2, 0.5, 0.8], [8, 0, 3, 1, 0.9], [11, 0.7, 1, 1, 0.55], [12, 0, 2, 1, 0.8], [14, 0.15, 2, 2, 0.5]],
  [[0, 0, 3, 1, 1], [4, 0.8, 2, 1, 0.6], [6, 0, 1, 1, 0.7], [7, 0, 1, 1, 0.55], [8, 0.3, 4, 0.5, 0.85], [13, 0, 1, 1, 0.6], [14, 0, 2, 1, 0.75]],
];
// sax slices like cut-up vocals (original): per 2-bar phrase, [step, note, lenSteps]
const VOX_A = [
  [[4, "D5", 1], [6, "F5", 1], [7, "G5", 2], [12, "F5", 1], [13, "D5", 2]],
  [[2, "Bb4", 1], [3, "C5", 1], [4, "D5", 3], [10, "A4", 1], [11, "Bb4", 1], [14, "G4", 2]],
];
const VOX_B = [
  [[0, "A5", 1], [1, "G5", 1], [2, "F5", 2], [8, "D6", 1], [9, "C6", 1], [10, "Bb5", 3]],
  [[4, "A5", 2], [6, "G5", 1], [7, "G5", 2], [12, "Eb5", 1], [13, "D5", 3]],
];
// stretched trumpet on top of the last theme: one note per 2 bars
const GHOST = ["D5", "F5", "Eb5", "D5", "Bb4", "C5"];

SONGS.push({
  id: "tsugime", no: 7, title: "継ぎ目", date: "2026-09-26",
  bpm: 86, swing: 0.12, key: "G マイナー", genre: "サンプル・コラージュ", tail: 4,
  masterGain: 0.8, comp: { threshold: -20, ratio: 3, attack: 0.01, release: 0.2 },
  accent: { light: "#7d7a14", dark: "#cfc95a" },
  blurb: "ピアノやサックスの録音を、弾かずに素材として切り刻み、逆に回し、回転数を落として並べ直したビートです。途中で、低音を止めたまま和音だけがテープのように半音ずつ沈んでいく「伸びるテープ」に切り替わります。このサイトで初めて音を左右に振り分けたので、ヘッドホンで聴いてください。",
  parts: [["chop", "ピアノの切り貼り"], ["voice", "サックスの切れ端"], ["tape", "逆回転・引き伸ばし"], ["bass", "808"], ["drums", "ドラム"]],
  why: [
    ["素材として使う録音", "切る・逆に回す・速度を変える", "ピアノやサックスの録音を、楽器として弾かせるのではなく素材として扱っています。和音の途中から切り出したり、回転数を落として1オクターブ下げたりして、並べ直しています。", [["JPEGMAFIA", 23], ["Kanye West", 22]]],
    ["逆回転の吸い込み", "次の小節の頭で終わる", "和音を逆再生して、元の音の頭がちょうど次の小節の頭に来るように置いています。左右に少しずらして2つ鳴らし、広がりを出しています。", [["Radiohead", 10], ["James Blake", 8]]],
    ["引き伸ばしとテープの減速", "音程を保って伸ばす／音程ごと落とす", "「引き伸ばし」では、ピアノの和音を細かい粒に分けて並べ直し、音程を保ったまま何倍にも伸ばしています。最後の2拍は回転数を落として、テープが止まるように沈みます。", [["Radiohead", 10], ["The Flaming Lips", 8]]],
    ["伸びるテープ", "ベースは G のまま、和音が半音ずつ落ちる", "ビートスイッチでは、808 を G に止めたまま、ピアノの和音のほうをテープの回転で1小節ごとに半音ずつ下げていきます。「17時のシグナル」のブリッジ（和音を固定してベースが下がる）を上下逆にした形です。", [["Nine Inch Nails", 40], ["JPEGMAFIA", 23]]],
    ["割れた808", "サイン波を歪ませる", "低音はピッチが落ちるサイン波の808で、強く歪ませて小さいスピーカーでも聞こえるようにしています。スネアには、トロンボーンの録音の頭だけを切って重ねています。", [["Denzel Curry", 6], ["Tyler, The Creator", 20]]],
    ["左右の広がり", "この曲から", "このサイトで初めて、音を左右に振り分けています。サックスの切れ端は左右交互、ピアノは1打ごとに少しずつ位置を変え、低音とキック・スネアは真ん中に置いています。", [["James Blake", 8]]],
  ],
  chords: C,
  sections: SECTIONS,
  build(transport, kit) {
    const { T, D, m, f, BAR, BARS, at, flash, human } = kit;
    const ch = kit.ch;
    // seeded random so every play is the same take
    let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    kit.bus("rev", -8, new Tone.Filter(7000, "lowpass"), new Tone.Reverb({ decay: 3.5, preDelay: 0.02, wet: 1 }));
    kit.bus("dly", -11, new Tone.Filter(3000, "lowpass"), new Tone.PingPongDelay({ delayTime: D(3), feedback: 0.35, wet: 1 }));
    const st = { stereo: true };
    kit.channel("chop", -6, { rev: -14 }, st);
    kit.channel("voice", -9, { rev: -10, dly: -10 }, st);
    kit.channel("tape", -4, { rev: -6 }, st);
    kit.channel("bass", -13);
    kit.channel("drums", -4, { rev: -26 }, st);
    // light tape saturation over the whole song (tanh keeps small signals at unity gain)
    const glue = new Tone.Gain(1);
    glue.chain(new Tone.WaveShaper(x => Math.tanh(1.5 * x) / 1.5, 4096), new Tone.Filter(14000, "lowpass"), kit.master);
    for (const k of ["chop", "voice", "tape", "bass", "drums"]) { ch[k].disconnect(kit.master); ch[k].connect(glue); }

    // source material
    const piano = kit.buffers("piano"), pianoRev = kit.buffers("piano", { reverse: true });
    const sax = kit.buffers("saxophone"), trombone = kit.buffers("trombone"), trumpet = kit.buffers("trumpet");
    const guitarRev = kit.buffers("guitar-electric", { reverse: true });

    // part inputs
    const chopLP = new Tone.Filter(6000, "lowpass", -24);
    const chopIn = new Tone.Gain(1).chain(new Tone.Filter(120, "highpass"), chopLP, ch.chop);
    const voiceBP = new Tone.Filter({ type: "bandpass", frequency: 1400, Q: 0.8 });
    const voiceIn = new Tone.Gain(1.4).chain(new Tone.Filter(300, "highpass"), voiceBP, ch.voice);
    const tapeIn = new Tone.Gain(1);
    tapeIn.chain(new Tone.Chorus({ frequency: 0.3, delayTime: 6, depth: 0.6, spread: 180, wet: 0.5 }).start(), new Tone.StereoWidener(0.7), ch.tape);

    // one-shot slice of a buffer; a fresh source per hit, so repeats never collide
    const live = new Set(), grains = new Set();
    // nodes made inside scheduled callbacks take the destination's context explicitly (safe under Tone.Offline too)
    const play = (buf, t, o = {}) => {
      const context = o.dest.context;
      const src = new Tone.ToneBufferSource({ context, url: buf, playbackRate: o.rate ?? 1, fadeIn: o.fadeIn ?? 0.004, fadeOut: o.fadeOut ?? 0.02, curve: "linear" });
      const pan = o.pan ? new Tone.Panner({ context, pan: o.pan }) : null;
      if (pan) src.chain(pan, o.dest); else src.connect(o.dest);
      src.onended = () => { live.delete(src); src.dispose(); if (pan) pan.dispose(); };
      live.add(src);
      if (o.rampTo) { src.playbackRate.setValueAtTime(o.rate ?? 1, t); src.playbackRate.exponentialRampToValueAtTime((o.rate ?? 1) * o.rampTo, t + o.dur); }
      const off = typeof o.offset === "function" ? o.offset(buf) : (o.offset ?? 0);     // offset can depend on the recording's length
      src.start(t, Math.min(Math.max(0, off), Math.max(0, buf.duration - 0.05)), o.dur, o.gain ?? 1);
      return src;
    };
    // a pitched slice: nearest recording, sped up / slowed down to the note, then by the tape factor
    const note = (set, midi, t, o = {}) => { const p = set.pick(midi); return play(p.buf, t, { ...o, rate: p.rate * (o.tape ?? 1) }); };
    // a chord slice = the same cut taken from every note of the chord
    const slice = (set, midis, t, o = {}) => midis.forEach(n => note(set, n, t, { ...o, gain: (o.gain ?? 1) / Math.sqrt(midis.length) }));
    // reversed swell whose end (the original attack) lands exactly on tEnd; two copies spread left/right
    const swell = (midis, tEnd, len, gain = 0.8, cut) => midis.forEach(n => {
      const p = pianoRev.pick(n);
      [-0.6, 0.6].forEach((pan, j) => {
        const t0 = tEnd - len + j * 0.012;
        at(t0, t => play(p.buf, t, { rate: p.rate, offset: Math.max(0, p.buf.duration - len * p.rate), dur: cut ?? len, pan, gain: gain / Math.sqrt(midis.length), fadeIn: 0.05, fadeOut: cut ? 0.005 : 0.01, dest: tapeIn }));
      });
    });
    // granular stretch: keeps the pitch (detune) while crawling through the recording (playbackRate)
    const grain = (set, midi, t, dur, o = {}) => {
      const p = set.pick(midi);
      const len = p.buf.duration;
      const from = Math.max(0, Math.min(o.from ?? 0.15, len - 0.3)), to = Math.max(from + 0.2, Math.min(o.to ?? 1.4, len - 0.05));
      const dest = o.dest ?? tapeIn, context = dest.context;
      const gp = new Tone.GrainPlayer({ context, url: p.buf, playbackRate: o.speed ?? 0.3, detune: 1200 * Math.log2(p.rate), grainSize: 0.16, overlap: 0.08, loop: true, loopStart: from, loopEnd: to });
      const env = new Tone.Gain({ context, gain: 0 });
      const pan = new Tone.Panner({ context, pan: o.pan ?? 0 });
      gp.chain(env, pan, dest);
      const g = o.gain ?? 0.5, fade = Math.min(0.6, dur / 3);
      env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(g, t + fade);
      env.gain.setValueAtTime(g, t + dur - fade); env.gain.linearRampToValueAtTime(0, t + dur);
      gp.start(t, from); gp.stop(t + dur + 0.05);
      grains.add(gp);
      gp.onstop = () => setTimeout(() => { grains.delete(gp); gp.dispose(); env.dispose(); pan.dispose(); }, 1500);
    };

    // 808 and kick
    const bassDist = new Tone.Distortion({ distortion: 0.6, wet: 0.5 });
    const b808 = new Tone.MembraneSynth({ pitchDecay: 0.09, octaves: 1.4, oscillator: { type: "sine" }, envelope: { attack: 0.003, decay: 1.4, sustain: 0.35, release: 0.35 } });
    b808.chain(bassDist, new Tone.Filter(1600, "lowpass"), ch.bass);
    const drumBus = new Tone.Gain(1);
    const crushXf = new Tone.CrossFade(0), crushShaper = kit.shaper(12);
    const drumDist = new Tone.Distortion({ distortion: 0.7, wet: 0 });
    drumBus.connect(crushXf.a); drumBus.connect(crushShaper); crushShaper.connect(crushXf.b);
    crushXf.chain(drumDist, ch.drums);
    const kick = new Tone.MembraneSynth({ pitchDecay: 0.03, octaves: 5, envelope: { attack: 0.001, decay: 0.22, sustain: 0 }, volume: -3 }).connect(drumBus);
    const snareN = new Tone.NoiseSynth({ noise: { type: "pink" }, envelope: { attack: 0.001, decay: 0.18, sustain: 0 }, volume: -6 });
    snareN.chain(new Tone.Filter(1800, "bandpass", -12), drumBus);
    const hat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.03, sustain: 0 }, volume: -18 });
    hat.chain(new Tone.Filter(8500, "highpass"), new Tone.Panner(0.35), drumBus);
    const ohat = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.002, decay: 0.24, sustain: 0 }, volume: -22 });
    ohat.chain(new Tone.Filter(7000, "highpass"), new Tone.Panner(-0.3), drumBus);


    const vel = v => v * (0.85 + 0.3 * rnd());
    let voxSide = 0;   // sax slices alternate left/right across phrases

    BARS.forEach((b, i) => {
      const { sec, local, chord } = b;
      const id = sec.id;
      const r = chord.root;
      const tone = [...chord.v.map(m), r + 24];                    // chord tones for the piano slices
      const tapeSpeed = 2 ** (-(chord.drop ?? 0) / 12);           // the switch: the tape runs slower every bar
      const theme = id === "a" || id === "a2";

      // per-bar state (robust to seeking)
      at(T(i, 0), t => {
        chopLP.frequency.cancelScheduledValues(t);
        if (id === "outro") { chopLP.frequency.setValueAtTime(3000 - local * 400, t); chopLP.frequency.linearRampToValueAtTime(2600 - local * 400, t + BAR); }
        else chopLP.frequency.setValueAtTime({ intro: 1800, a: 6000, b: 2500, switch: 4200, a2: 7000 }[id], t);
        voiceBP.frequency.setValueAtTime(id === "b" ? 900 : id === "a2" ? 1800 : 1400, t);
        crushXf.fade.setValueAtTime(id === "switch" ? 0.6 : 0.12, t);
        drumDist.wet.setValueAtTime(id === "switch" ? 0.4 : 0.08, t);
        bassDist.wet.setValueAtTime(id === "switch" ? 0.9 : 0.5, t);
      });

      // ----- chop: piano chord slices -----
      const chop = (pat, gainMul = 1) => pat.forEach(([s, off, len, speed, v]) => at(T(i, s) + human(0.003), t => {
        const pan = (rnd() * 2 - 1) * 0.2;
        // make-up gain for slices cut from later in the decay, like levelling chops by hand
        slice(piano, tone, t, { offset: off, dur: D(len) * 0.95, tape: speed * tapeSpeed, gain: vel(v) * gainMul * (1 + off * 1.5), pan, dest: chopIn });
        flash("chop", t);
      }));
      if (id === "a") chop(CHOP_A[local % 2]);
      else if (id === "a2") chop(CHOP_B[local % 2], local >= 8 ? 1 - (local - 7) * 0.15 : 1);
      else if (id === "switch") {
        if (local < 7) chop(CHOP_A[local % 2].map(([s, off, len, , v]) => [s, off, len, 1, v]), 0.75);
        else {
          chop(CHOP_A[1].filter(([s]) => s < 8).map(([s, off, len, , v]) => [s, off, len, 1, v]));
          // rewind: reversed slices, faster and faster
          for (let s = 8; s < 15; s++) at(T(i, s), t => { slice(pianoRev, tone, t, { offset: buf => buf.duration - 1.6 + (s - 8) * 0.18, dur: D(1), tape: 1.5 + (s - 8) * 0.3, gain: 0.8, pan: s % 2 ? 0.5 : -0.5, dest: chopIn }); flash("chop", t); });
        }
      } else if (id === "b") {
        if (local === 7) {
          at(T(i, 0), t => { slice(piano, tone, t, { dur: D(8), gain: 0.8, dest: chopIn }); flash("chop", t); });
          // tape stop: the last two beats sink to nothing
          at(T(i, 8), t => { slice(piano, tone, t, { offset: 0.1, dur: D(8), gain: 0.9, rampTo: 0.12, dest: chopIn }); flash("chop", t); });
        }
      } else if (id === "outro" && local < 4) {
        // slices get longer and lower as it winds down
        [[0, 0, 4], [6, 0.4, 4], [12, 0, 4]].forEach(([s, off, len]) => at(T(i, s), t => {
          slice(piano, tone, t, { offset: off, dur: D(len + local * 2), tape: 1 - local * 0.08, gain: 0.8 - local * 0.12, pan: (rnd() * 2 - 1) * 0.3, dest: chopIn }); flash("chop", t);
        }));
      }

      // ----- voice: sax slices, alternating left/right -----
      const vox = (list, speed = 1) => list.forEach(([s, n, len]) => { const pan = voxSide++ % 2 ? 0.7 : -0.7; at(T(i, s) + human(0.004), t => {
        note(sax, m(n), t, { offset: 0.05, dur: D(len) * 0.9 / speed, tape: speed, gain: vel(speed < 1 ? 0.5 : 0.8), pan, fadeOut: 0.03, dest: voiceIn });
        flash("voice", t);
      }); });
      if (id === "a" && local >= 4) vox(VOX_A[local % 2]);
      else if (id === "a2" && local < 10) vox(VOX_B[local % 2]);
      else if (id === "b" && local < 7 && local % 2 === 0) vox(VOX_A[0].map(([s, n, len]) => [s, n, len * 2]), 0.5);

      // ----- tape: reversed swells, stretched drones, reversed guitar -----
      const nextBar = T(i + 1, 0);
      if (id === "intro") {
        swell(tone, nextBar, D(8), 0.9);
        at(T(i, 0), t => { grain(trombone, r + 24, t, BAR + 0.4, { speed: 0.25, gain: 0.55, pan: local % 2 ? 0.4 : -0.4 }); flash("tape", t); });
      } else if (theme && local % 4 === 3 && !(id === "a2" && local === 11)) {
        swell(BARS[i + 1] ? [...BARS[i + 1].chord.v.map(m)] : tone, nextBar, D(4), 0.9);
      } else if (id === "b") {
        at(T(i, 0), t => {
          tone.forEach((n, j) => grain(piano, n + 12, t, BAR + 0.5, { speed: 0.3, from: 0.05, to: 1.2, gain: 0.35, pan: [-0.6, -0.2, 0.2, 0.6, 0][j] }));
          grain(trombone, r + 24, t, BAR + 0.5, { speed: 0.2, gain: 0.4 });
          flash("tape", t);
        });
      } else if (id === "switch") {
        [3, 7, 11, 15].forEach(s => { if (rnd() < 0.6) at(T(i, s), t => { note(guitarRev, 64 + Math.floor(rnd() * 12), t, { offset: 0.3, dur: D(1), gain: 0.6, pan: rnd() < 0.5 ? -0.8 : 0.8, dest: tapeIn }); flash("tape", t); }); });
      } else if (id === "outro") {
        if (local < 5) swell(tone, nextBar, D(6), 0.7);
        else swell(tone, T(i, 10), D(10), 0.9, D(6));     // the last swell is cut off before it lands
        if (local < 4) at(T(i, 0), t => grain(trombone, r + 24, t, BAR + 0.4, { speed: 0.2, gain: 0.45 - local * 0.08, pan: local % 2 ? 0.4 : -0.4 }));
      }
      if (id === "a2" && local % 2 === 0 && local < 12) {
        at(T(i, 0), t => { grain(trumpet, m(GHOST[local / 2]), t, 2 * BAR, { speed: 0.25, from: 0.2, to: 1.0, gain: 0.2, pan: local % 4 ? 0.5 : -0.5 }); flash("tape", t); });
      }

      // ----- bass: 808 -----
      const bn = (s, midi, len, v) => at(T(i, s), t => { b808.triggerAttackRelease(f(midi), D(len), t, vel(v)); flash("bass", t); });
      if (theme) {
        [[0, 0, 5, 1], [7, 0, 2, 0.8], [10, 0, 2, 0.9], [13, 12, 1, 0.7], [14, 0, 2, 0.8]].forEach(([s, iv, len, v]) => bn(s, r + iv, len, v));
      } else if (id === "b") {
        if (local < 7) bn(0, r, 14, 0.9);
        else {
          bn(0, r, 8, 0.9);
          at(T(i, 8), t => { b808.triggerAttackRelease(f(r), D(8), t, 0.9); b808.frequency.exponentialRampToValueAtTime(Tone.Frequency(r - 12, "midi").toFrequency(), t + D(8)); flash("bass", t); });
        }
      } else if (id === "switch") {
        [[0, 5], [6, 2], [8, 3], [11, 2], [14, 2]].forEach(([s, len]) => { if (local < 7 || s < 8) bn(s, 31, len, 1); });
      } else if (id === "outro" && local < 2) {
        [[0, 6], [10, 4]].forEach(([s, len]) => bn(s, r, len, 0.85));
      } else if (id === "outro" && local === 4) {
        bn(0, 31, 16, 0.8);
      }

      // ----- drums -----
      const k = (s, v = 1) => at(T(i, s), t => { kick.triggerAttackRelease("G1", "8n", t, vel(v)); flash("drums", t); });
      const sn = (s, v = 1) => at(T(i, s) + human(0.004), t => {
        const vv = vel(v);
        snareN.triggerAttackRelease("16n", t, vv);
        note(trombone, 50, t, { dur: 0.07, tape: 1.5, gain: vv * 0.8, fadeOut: 0.03, dest: drumBus });   // the recorded crack
      });
      const h = (s, v = 0.45) => at(T(i, s) + human(0.005), t => hat.triggerAttackRelease("32n", t, vel(v)));
      const oh = (s, v = 0.5) => at(T(i, s), t => ohat.triggerAttackRelease("8n", t, vel(v)));
      if (theme && !(id === "a2" && local >= 10)) {
        k(0); k(10, 0.85); if (local % 2) k(7, 0.6);
        sn(4); sn(12);
        const roll = local % 4 === 3;
        // no plain hat under the roll: two jittered hits on one step could arrive out of order
        for (let s = 0; s < (roll ? 12 : 16); s += 2) h(s, s % 4 === 0 ? 0.5 : 0.35);
        if (roll) for (let r3 = 0; r3 < 6; r3++) h(12 + r3 * 2 / 3, 0.25 + 0.05 * r3);   // triplet roll
        else { h(7, 0.2); h(15, 0.25); }
        if (local % 2) oh(14);
      } else if (id === "a2") {
        k(0, 0.8); sn(12, 0.7); for (let s = 0; s < 16; s += 4) h(s, 0.3);
      } else if (id === "b") {
        if (local < 7) { k(0, 0.9); sn(8, 0.9); for (let s = 0; s < 16; s += 4) h(s, 0.35); }
        else { k(0, 0.9); }
      } else if (id === "switch") {
        if (local < 7) {
          k(0); k(3, 0.7); k(8); k(11, 0.7); sn(4); sn(12); if (local % 2) sn(14.5, 0.5);
          for (let s = 0; s < 16; s += 0.5) h(s, s % 1 ? 0.2 : 0.4);
        } else {
          k(0); sn(4); for (let s = 0; s < 8; s += 0.5) h(s, 0.3 + s * 0.03);
        }
      } else if (id === "outro" && local < 2) {
        k(0, 0.8 - local * 0.2); sn(12, 0.6 - local * 0.2);
      }
    });

    return {
      releaseAll() {
        live.forEach(s => { try { s.stop(); } catch {} });
        grains.forEach(g => { try { g.stop(); } catch {} });
        b808.triggerRelease();
      },
    };
  },
});
})();
