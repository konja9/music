// No.11 二十四時間 — one day of listening, 0:00 to 23:00, two bars per hour. Each hour's listening time (JST, all years)
// opens the filter and brings in layers; each hour's skip rate thins the notes out and lets a voice say "skip".
// Rendered with render/render-strudel.mjs (1 cycle = 1 bar).

// listening time per hour 0..23, normalised to the busiest hour (17:00 = 107.5 h)
const LEVEL = [0.254, 0.131, 0.078, 0.058, 0.042, 0.095, 0.189, 0.307, 0.379, 0.494, 0.611, 0.705, 0.708, 0.693, 0.641, 0.780, 0.930, 1.0, 0.963, 0.800, 0.638, 0.571, 0.498, 0.425];
// share of plays skipped per hour
const SKIP = [0.43, 0.51, 0.39, 0.46, 0.25, 0.44, 0.32, 0.20, 0.30, 0.28, 0.27, 0.15, 0.15, 0.19, 0.16, 0.18, 0.18, 0.20, 0.13, 0.19, 0.14, 0.23, 0.23, 0.24];
const PROG = ["Fsm9", "Dmaj7", "Bm11", "Cs7b9"];            // one chord per hour, repeating
const perHour = (from, to) => { const out = []; for (let h = from; h <= to; h++) out.push(PROG[h % 4], PROG[h % 4]); return out; };

SONG({
  id: "hours24", no: 11, title: "二十四時間", date: "2026-09-27",
  bpm: 92, key: "F♯ マイナー", genre: "データ・ビート（Strudel）", tailBars: 2,
  accent: { light: "#b3541e", dark: "#f08a55" },
  blurb: "再生履歴の1日を、0時から23時まで2小節ずつたどる曲です。その時間帯にどれだけ聴いていたかで、音の明るさと楽器の数とドラムの密度が決まります。いちばん聴いている17時に向かって厚くなり、深夜は薄く、よく飛ばす時間帯ほど音が抜け落ちます。",
  chords: { Fsm9: { sym: "F♯m9" }, Dmaj7: { sym: "Dmaj7(♯11)" }, Bm11: { sym: "Bm11" }, Cs7b9: { sym: "C♯7(♭9)" } },
  sections: [
    { id: "intro",   name: "時計",       bars: 2,  chords: ["Fsm9"], intensity: 0.1 },
    { id: "night",   name: "深夜 0〜4時", bars: 10, chords: perHour(0, 4), intensity: 0.15 },
    { id: "morning", name: "朝 5〜9時",   bars: 10, chords: perHour(5, 9), intensity: 0.35 },
    { id: "day",     name: "昼 10〜15時", bars: 12, chords: perHour(10, 15), intensity: 0.7 },
    { id: "evening", name: "夕方 16〜18時", bars: 6, chords: perHour(16, 18), intensity: 1 },
    { id: "late",    name: "夜 19〜23時", bars: 10, chords: perHour(19, 23), intensity: 0.6 },
    { id: "outro",   name: "日付が変わる", bars: 2, chords: ["Fsm9"], intensity: 0.1 },
  ],
  why: [
    ["1時間 = 2小節", "0時から23時まで", "曲全体が1日の時間割です。48小節で24時間を進み、区間の名前も時間帯になっています。", []],
    ["聴いた時間 = 音の厚さ", "17時が最大（107.5時間）", "各時間帯の再生時間が、フィルタの開き具合、ハープやピアノの有無、ドラムの細かさを決めます。いちばん少ない4時（4.5時間）はほとんど時計の音だけ、いちばん多い17時はチェロと木琴まで重なります。", []],
    ["飛ばした割合 = 音の抜け", "深夜は約半分を飛ばす", "スキップ率が高い時間ほど、ハープの音をランダムに抜き、「skip」という声を入れます。1時は51%、18時は13%でした。", []],
    ["17時の声", "seventeen hundred", "いちばん聴いている17時だけ、合成した声が「seventeen hundred」と読みます。1曲目の「17時のシグナル」と同じ時間です。", []],
    ["コード", "F♯m9 → Dmaj7(♯11) → Bm11 → C♯7(♭9)", "1時間ごとにコードが変わり、4時間で一巡します。", []],
  ],
  code: `
const LEVEL = ${JSON.stringify(LEVEL)}
const SKIP = ${JSON.stringify(SKIP)}
const hour = arr => cat(...arr).slow(2)                  // one value per hour = 2 bars
const lv = hour(LEVEL), sk = hour(SKIP)
const on = th => lv.fmap(v => v >= th)                    // a layer plays only in hours with enough listening
const at17 = hour(LEVEL.map((_, h) => h === 17))

const chords = "<[a3,c#4,e4,g#4] [f#3,a3,c#4,g#4] [a3,d4,e4,f#4] [f3,b3,d4,g#4]>".slow(2)
const roots = "<f#1 d2 b1 c#2>".slow(2)

// the clock: always there
const clock = s("clave ~ clave ~ clave ~ clave ~").gain(.18).pan("<-.4 .4>").speed(1.2)
// organ pad whose brightness follows the hour
const pad = note(chords).s("organ").attack(.5).release(1.5).gain(.2).lpf(lv.mul(3200).add(350)).room(.4).size(.7)
const sub = note(roots).s("sine").gain(.28).release(.4)
// harp arpeggio: louder with more listening, thinned out by the skip rate
const harp = note(chords).arp("0 1 2 3 1 2 3 2").s("harp").gain(lv.mul(.3).add(.12)).pan(sine.range(-.5, .5).slow(2))
  .room(.35).mask(on(.12)).degradeBy(sk.mul(.9))
// piano chords cut from the middle of the recording
const piano = note(chords).s("piano").struct("x ~ ~ x ~ x ~ ~").begin("<0 .1 .2 .05>").end(.45).chop(2)
  .gain(.38).lpf(3200).pan(rand.range(-.3, .3)).mask(on(.3))
const bass = note(roots).s("basselectric").struct("x ~ ~ x ~ ~ x ~").lpf(800).gain(.65).mask(on(.45))
const drums = stack(
  s("bdmid ~ ~ ~ bdmid ~ ~ ~").mask(on(.28)),
  s("~ ~ bdmid ~ ~ ~ bdmid ~").gain(.8).mask(on(.6)),
  s("~ sdmid ~ sdmid").gain(.85).mask(on(.48)),
  s("~ clap ~ clap").gain(.55).mask(on(.85)),
  s("hh*8").gain(.33).pan(.3).mask(on(.18)).degradeBy(lv.fmap(v => 1 - v)),
  s("hh*16").gain(.18).pan(-.3).mask(on(.75))
).speed(.9).gain(.75).swingBy(1/8, 4)
// the busiest hours (16-18) add cello and xylophone
const peak = stack(
  note(chords).s("cello").attack(.3).release(1).gain(.2).room(.5).mask(on(.9)),
  note(chords).arp("3 2 1 0 2 1 3 0").transpose(24).s("xylophone").gain(.16).pan(sine.range(.4, -.4)).mask(on(.9))
)
// voices: "skip" in hours that skip a lot, "seventeen hundred" at 17:00
const voices = stack(
  s("~ ~ ~ vskip").gain(.4).speed("<1 .8>").pan("<-.5 .5>").room(.4).mask(sk.fmap(v => v > .4)),
  s("vseventeenhundred ~").gain(.6).room(.4).mask(at17)
)

const day = stack(clock, pad, sub, harp, piano, bass, drums, peak, voices)
const intro = stack(clock, sub.gain(.6))
const outro = stack(clock, pad.lpf(500), s("vhours1290").begin(.05).gain(.35).room(.6))

arrange([2, intro], [48, day], [2, outro]).gain(.8)
`,
});
