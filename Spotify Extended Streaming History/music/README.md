# 履歴盤 — Spotify の再生履歴から作ったオリジナル曲

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

## 保留中: 書き出してプレイヤーで公開する形式（未使用）

音声ファイルに書き出して公開する形式を試しかけたが、Suno で作る方針に変わったため保留にした。今のサイトと build には組み込んでいない。
- `render/render-tone.mjs`: Tone.js の曲をヘッドレス Chromium で実時間再生して録音する（`render/out/` に PCM。git には入れない）
- `render/encode.mjs`: 録音を曲の長さに切り、音量をそろえて MP3 と波形データ（`audio/`）にする
- `site/player.html`: 書き出した MP3 を再生するプレイヤーの試作（`/*__TRACKS__*/` に曲情報を入れる想定）
- `audio/05-zankyo.*`: 試しに書き出した No.05
