// No.10 抜き出し — the first Strudel song: dark jazz sampling. Piano and flute recordings are chopped (chop / striate),
// played backwards (negative speed), cut with begin / end, and pitched; the bridge holds a B♭ minor chord while the bass
// falls a half step per bar under crushed, distorted drums.
// Rendered with render/render-strudel.mjs (1 cycle = 1 bar). Sample names: see render/render-strudel.mjs.
SONG({
  id: "nukidashi", no: 10, title: "抜き出し", date: "2026-09-27",
  bpm: 84, key: "B♭ マイナー", genre: "ジャズ・サンプリング（Strudel）", tailBars: 2,
  accent: { light: "#3f6b5c", dark: "#86c2ad" },
  blurb: "Strudel で作った最初の曲です。ジャズのピアノとフルートの録音を細かく刻み、逆回しにし、途中から切り出して並べ直しています。ブリッジでは B♭m の和音を動かさずにベースだけが半音ずつ落ちていき、ドラムを削って歪ませます。",
  chords: {
    Bbm9:  { sym: "B♭m9" }, Eb9: { sym: "E♭9" }, Gbmaj7: { sym: "G♭maj7" }, F7b13: { sym: "F7(♭13)" },
    BbmBb: { sym: "B♭m" }, BbmA: { sym: "B♭m/A" }, BbmAb: { sym: "B♭m/A♭" }, BbmG: { sym: "B♭m/G" },
    BbmGb: { sym: "B♭m/G♭" }, BbmF: { sym: "B♭m/F" }, BbmE: { sym: "B♭m/E" }, F7: { sym: "F7" },
  },
  sections: [
    { id: "intro",  name: "針",       bars: 4,  chords: ["Bbm9", "Eb9", "Gbmaj7", "F7b13"], intensity: 0.3 },
    { id: "a",      name: "ループ",   bars: 16, chords: ["Bbm9", "Eb9", "Gbmaj7", "F7b13"], intensity: 0.7 },
    { id: "b",      name: "半分の速さ", bars: 8, chords: ["Bbm9", "Eb9", "Gbmaj7", "F7b13"], intensity: 0.45 },
    { id: "bridge", name: "落ちる",   bars: 8,  chords: ["BbmBb", "BbmA", "BbmAb", "BbmG", "BbmGb", "BbmF", "BbmE", "F7"], intensity: 1 },
    { id: "a2",     name: "ループ2",  bars: 12, chords: ["Bbm9", "Eb9", "Gbmaj7", "F7b13"], intensity: 0.8 },
    { id: "outro",  name: "止まる",   bars: 4,  chords: ["Bbm9", "Eb9", "Gbmaj7", "Bbm9"], intensity: 0.25 },
  ],
  why: [
    ["刻んだピアノ", "chop / begin / end", "ピアノの和音の録音を、音の途中から切り出して細かく刻み、1小節ごとに切り出す位置をずらしています。Strudel ではこれが数語で書けます。", [["Ahmad Jamal Trio", 7], ["Enrico Pieranunzi", 12]]],
    ["逆回しの吸い込み", "負の再生速度", "和音を逆向きに再生して、元の音の頭が次の小節の頭に来るように置いています。", [["Radiohead", 10], ["James Blake", 8]]],
    ["フルートの切れ端", "striate", "フルートの録音を細い帯に分けて並べ直し、左右に振っています。", [["Nujabes", 5]]],
    ["半分の速さ", "回転数を落とす", "8小節だけ、ピアノの切れ端を半分の速さ（1オクターブ下）にし、ドラムもハーフタイムにします。", [["Madlib", 2], ["Kanye West", 22]]],
    ["落ちるベース", "B♭m のまま", "ブリッジでは上の B♭m を固定したまま、ベースだけを B♭ → A → A♭ → G → G♭ → F → E と半音ずつ下げます。ドラムはビットを削って歪ませます。「17時のシグナル」のブリッジと同じ考え方です。", [["Nine Inch Nails", 40], ["JPEGMAFIA", 23]]],
    ["ヨレたビート", "swingBy", "ハイハットとスネアの裏を遅らせた、手打ち風のビートです。ドラムは TR-808 の実機録音です。", [["A Tribe Called Quest", 7], ["Common", 9]]],
  ],
  code: `
// ----- material -----
const prog = "<[bb2,db4,f4,ab4,c5] [eb2,g3,db4,f4,bb4] [gb2,f3,bb3,db4,f4] [f2,a3,eb4,db5]>"
const roots = "<bb1 eb2 gb1 f1>"
const fallRoots = "<bb1 a1 ab1 g1 gb1 f1 e1 f1>"

// the piano "record": chords cut from the middle of the recording, the cut point moving every bar
const chopRec = note(prog).s("piano").struct("x ~ x x ~ x ~ x").begin("<0 .08 .16 .04>").end("<.35 .5 .4 .6>")
  .chop(2).gain(.55).lpf(3600).room(.25).size(.6).pan(rand.range(-.25, .25))
// reversed swell into the next bar: the start of the recording, played backwards, landing on the downbeat
const swell = note("<[~ ~ ~ [eb2,g3,db4,f4]] [~ ~ ~ [gb2,f3,bb3,db4]] [~ ~ ~ [f2,a3,eb4,db5]] [~ ~ ~ [bb2,db4,f4,ab4]]>")
  .s("piano").speed(-1).begin(0).end(.12).gain(.5).room(.5).size(.8).pan("<-.5 .5>")
// flute fragments, striated and spread left/right
const flute = note("<[~ f5 ab5 bb5] [db6 ~ c6 ~] [bb5 ~ ~ f5] [~ eb5 f5 ~]>").s("flute").begin(.05).clip(.7)
  .striate(2).gain(.45).pan("<-.5 .5 -.3 .3>").room(.4).delay(.25).delaytime(.535).delayfeedback(.3)
// bass: electric bass samples, low-passed, and a sine underneath
const bass = stack(
  note(roots).s("basselectric").struct("x ~ ~ x ~ ~ x ~").lpf(700).gain(.75),
  note(roots).s("sine").struct("x ~ ~ x ~ ~ x ~").gain(.35).release(.2)
)
// TR-808 recordings, swung
const drums = stack(
  s("bdmid ~ ~ bdmid ~ ~ bdmid ~").speed(.85),
  s("~ sdmid ~ sdmid").speed(.95).gain(.8),
  s("~ rim ~ rim").gain(.3).late(.02),
  s("hh*8").gain("[.45 .3]*4").pan(.3).swingBy(1/6, 4)
).gain(.8).lpf(7000)

// ----- sections -----
const intro = stack(chopRec.lpf(1200).gain(.45), swell)
const loop = stack(chopRec, swell, bass, drums)
const loopFlute = stack(loop, flute)
const half = stack(
  chopRec.speed(.5).gain(.5),
  flute.speed(.5).gain(.35).room(.7),
  note(roots).s("sine").struct("x ~ ~ ~").gain(.4).release(.6),
  s("bdmid ~ ~ ~, ~ ~ sdmid ~, hh*4").gain(.6).speed(.85)
)
const bridge = stack(
  note("[bb3,db4,f4]").s("piano").struct("x ~ x x ~ x ~ x").chop(4).gain(.5).distort(.4).room(.3),
  note(fallRoots).s("basselectric").struct("x ~ ~ x ~ ~ x ~").lpf(900).distort(.5).gain(.7),
  note(fallRoots).s("sine").gain(.35),
  stack(s("bdmid ~ bdmid ~ bdmid ~ bdmid ~").speed(.8), s("~ sdsnappy ~ sdsnappy"), s("hh*16").gain(.35).pan(.3))
    .coarse(4).crush(6).distort(.35).gain(.7),
  s("~ ~ ~ vhours1290").begin(.1).end(.5).speed(.8).gain(.4).room(.6).pan(-.4)
)
const outro = stack(chopRec.lpf(1500).gain(.4), swell.gain(.35), note(roots).s("sine").struct("x ~ ~ ~").gain(.3))

arrange(
  [4, intro],
  [8, loop], [8, loopFlute],
  [8, half],
  [8, bridge],
  [12, loopFlute],
  [4, outro]
).gain(.8)
`,
});
