# 履歴盤 — Spotify の再生履歴から作ったオリジナル曲

## 今の形式（No.10 から）

曲は **Strudel**（TidalCycles の JavaScript 版）で書き、手元で音声に書き出して、サイトは **書き出した MP3 を再生するプレイヤー** として公開する。
No.01〜09 は Tone.js で書いた曲を実時間で録音して MP3 にしたもの（下の「Tone.js の曲」は書き出し元として残している）。

| パス | 役割 |
|---|---|
| `songs/NN-id.strudel.js` | Strudel の曲。`SONG({ ...メタ情報, code: \`Strudel のコード\` })`。1サイクル = 1小節。区間は `arrange()` で並べる |
| `render/render-strudel.mjs` | Strudel の曲を Offline で書き出す（`render/out/` に PCM） |
| `render/render-tone.mjs` | Tone.js の曲を実時間で再生して録音する（Offline では切り貼りが鳴らないため） |
| `render/encode.mjs` | 曲の長さに切り、音量をそろえ（-16 dB 相当、ピーク -1 dBFS 以下）、MP3（192kbps）と波形データを `audio/` に作る |
| `audio/NN-id.mp3`, `.peaks.json` | 公開する音声（コミットする） |
| `site/player.html` | プレイヤー（波形・区間・コード表示・連続再生・ロック画面操作・ダウンロード） |
| `build.mjs` | `dist/index.html`（プレイヤー）と `dist/engine.html`（Tone.js の書き出し用）を作る |

### 新しい曲を作る手順

1. `songs/NN-id.strudel.js` を書く（No.10 をひな形にする）。メタ情報の `sections`（小節数とコード）は、プレイヤーの区間表示とコード表示に使う
2. 書き出す道具は手元の一時フォルダに入れる（リポジトリの依存にしない）
   ```
   mkdir -p /tmp/rireki && cd /tmp/rireki && npm init -y && npm i @strudel/web@1.3.0 @breezystack/lamejs@1.2.7
   ```
3. 書き出して MP3 にする（`music/` で実行）
   ```
   STRUDEL=/tmp/rireki/node_modules/@strudel/web/dist/index.mjs PLAYWRIGHT=$(npm root -g)/playwright node render/render-strudel.mjs <id>
   LAMEJS=/tmp/rireki/node_modules/@breezystack/lamejs/dist/lamejs.js node render/encode.mjs <NN-id>
   node build.mjs
   ```
   encode の出力で、長さ・音量・ピーク・音切れ（dropouts）を確認する
4. `dist/index.html` と `dist/audio/` の新しい MP3 を公開する

### Strudel で使えるサンプル名

`samples/` の音をそのまま使える。mini-notation では `-` が休符になるため、名前から `-` を外している。
- 音程つき: `piano` `harp` `xylophone` `guitarnylon` `guitarelectric` `basselectric` `cello` `contrabass` `organ` `flute` `saxophone` `trumpet` `trombone`（`note("c3").s("piano")`）
- TR-808: `bdlong` `bdmid` `bdshort` `sdsnappy` `sdmid` `sdtone` `clap` `hh`（クローズ）`oh`（オープン）`cowbell` `rim` `clave` `maracas` `cymbal` `tomlow` `tommid` `tomhigh` `congalow` `congahigh`
- 声: `vplay` `vskip` `vnext` `vshuffle` `vrepeat` `vpause` `vendoftrack` `vnosignal` `vseventeenhundred` `vhours1290` `vplays1143` `vskipped`
- Strudel の合成音（`sine` `sawtooth` `square` `triangle`）も使える

### 注意
- 全体の音量は `.gain()` で控えめに。書き出しの時点で 1.0 を超えると割れたまま残る
- Strudel（AGPL）と lamejs（LGPL）は書き出すときだけ使う。公開物は MP3 と自作のプレイヤーだけ

## Tone.js の曲（No.01〜09、書き出し元）

音はブラウザ内で Tone.js で鳴らします。ほとんどはシンセサイザーで、生楽器（ブラス、サックス、ギター、ベース）は `samples/` の録音サンプルを使えます（No.06 から）。

公開サイト（非公開の Artifact）: https://claude.ai/artifact/5uTy27eZjMLx2i6Y1AehtP

## 構成

| パス | 役割 |
|---|---|
| `songs/NN-id.js` | 1曲 = 1ファイル。楽譜・音色・解説をすべて持つ |
| `site/template.html` | サイト本体（曲の一覧、プレイヤー、共通の音の土台 `kit`） |
| `samples/<楽器>/<音名>.mp3` | 生楽器の録音サンプル（`As3.mp3` = A#3）。出典とライセンスは `samples/CREDITS.md` |
| `samples/tr808/`, `samples/voice/` | 名前で呼ぶサンプル（`bd-long.wav` など。WAV も可）。`kit.hits()` で使う |
| `tools/make-voice.mjs` | 合成した声（`samples/voice/`）を作り直すスクリプト。meSpeak を一時的に入れて実行する（先頭のコメント参照） |
| `build.mjs` | `songs/*.js` を番号順に集めて `dist/index.html` を作る。`samples/` の一覧を埋め込み、`dist/samples/` にコピーする |
| `test.mjs` | Tone.js のダミーで全曲を最後まで空実行し、エラーを探す |
| `dist/index.html` | 公開するファイル（生成物。直接編集しない） |
| `dist/samples/` | 公開時に一緒に載せるサンプル（生成物。git には入れない） |
| `listening-summary.json` | 再生履歴の集計（アーティスト別の再生時間など。IPアドレスは含まない） |
| `tools/aggregate.mjs` | 元の履歴 JSON から `listening-summary.json` を作り直す |

## 新しい曲を追加する手順

1. `songs/` に次の番号でファイルを作る（例: `06-some-id.js`）。既存の曲ファイルをひな形にする。
2. ビルドしてから空実行チェックをする（test は dist を読むため、この順番で）。
   ```
   node music/build.mjs && node music/test.mjs
   ```
3. 全曲 OK なら、`music/dist/index.html` を上記 URL の Artifact に公開し直す。`dist/samples/` の mp3 も `files` で一緒に載せる（公開先のパスは `samples/<楽器>/<音名>.mp3`。変わっていなければ載せ直さなくても残る）。

曲ファイルの必須項目は `build.mjs` が確認します:
`id`（英数字と - _）, `no`, `title`, `date`, `bpm`, `key`, `genre`, `blurb`, `accent: {light, dark}`,
`chords`（`{sym, root(MIDI), v:[音名]}`）, `sections`（`{id, name, bars, chords:[chordsのキー], intensity}`）,
`parts`（`[[チャンネル名, 表示名]]`。`kit.channel()` で同じ名前のチャンネルを作ること）, `why`, `build(transport, kit)`。

`build()` 内で使える `kit`:
- `T(bar, step)` 16分単位の時刻（`swing` を反映）、`D(steps)` 長さ、`BAR`, `BARS`（各小節の `{sec, local, chord}`）
- `channel(name, dB, {rev, dly}, {stereo})`, `bus(name, dB, ...effects)`, `master`, `shaper(levels)`（ビット削り）
  - `channel` は既定でモノラルにまとめる（Tone.Channel の仕様）。左右に振り分けた音を通すときは `{ stereo: true }` を付ける（No.07 から）
- `at(time, fn)`（Transport に予約）, `flash(part, time)`（ミキサーのランプ）, `human(sec)`, `m(音名)→MIDI`, `f(MIDI)→音名`
- `sampler(楽器名, opts)` 録音サンプルの `Tone.Sampler`（楽器名は `samples/` のフォルダ名。再生前に読み込みを待つ）
- `hits(フォルダ名, {reverse})` 名前で呼ぶサンプル（TR-808 のドラム、合成した声）を `{ 名前: バッファ }` で返す。知らない名前はエラー（例: No.08）
- `buffers(楽器名, {reverse})` 録音をそのまま素材として使うためのバッファ一式。`pick(midi)` で最も近い録音と、その音にするための再生速度 `rate` を返す。切り刻み・逆再生・引き伸ばしに使う（例: No.07 の `play()` / `slice()` / `swell()` / `grain()`）
  - コールバックの中でノードを作るときは `context: 出力先.context` を渡す
  - 注意: `Tone.Offline` で書き出すと、コールバックの中で作った BufferSource（切り刻んだサンプル）が鳴らない。音量の確認は実際の再生（`Tone.Meter`）で行う
- `build()` は `{ releaseAll() }` を返す（一時停止・頭出し時に鳴っている音を止める）

注意: 音の状態（フィルタやエフェクト量）は小節の頭ごとに設定し直すこと。区間ジャンプしても正しい状態になるようにするためです。

## 録音サンプルを足す

1. `samples/<楽器>/` に `<音名>.mp3`（シャープは `s`。例: `Fs3.mp3`）を置く。3半音おきくらいで十分（Sampler が近い音から補う）
2. `samples/CREDITS.md` に出典とライセンスを書く
3. 曲では `const x = kit.sampler("<楽器>")` として、ほかのシンセと同じように `triggerAttackRelease` で鳴らす
4. `site/template.html` は変えなくてよい。build すれば一覧に入る

注意: `Tone.Transport` / `Tone.Draw` は使わず `Tone.getTransport()` / `Tone.getDraw()` を使う（曲を切り替えるたびに Tone の Context を作り直すため、古い方を指したままになる）。
