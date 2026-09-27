# Spotify Extended Streaming History

このフォルダには、ユーザーの Spotify 拡張ストリーミング履歴（`Streaming_History_*.json`）があります。元データは編集しないこと。`ip_addr` は公開物に含めないこと。

## オリジナル曲と「履歴盤」サイト

`music/` に、履歴をもとに作ったオリジナル曲と、それをまとめたサイト（音声プレイヤー）があります。詳細は `music/README.md`。

- No.10 から、曲は Strudel で作り（`music/songs/NN-id.strudel.js`）、MP3 に書き出して公開する（ユーザーが採用した形式）。No.01〜09 は Tone.js の曲（`songs/NN-id.js`）を実時間で録音した MP3。
- 公開ページ（`dist/index.html`）は `audio/*.mp3` を再生するだけのプレイヤー。曲のコードやサンプルは公開しない。パートごとのミュートはない。

**新しい曲を作ったら、必ずサイトにも追加すること**（ユーザーの依頼: 「新しく曲を作成したら、自動で追加して」）:
1. `music/songs/NN-id.strudel.js` として作る（NN は次の番号。書き方は README）
2. 書き出す: `STRUDEL=<@strudel/web の dist/index.mjs> PLAYWRIGHT=$(npm root -g)/playwright node music/render/render-strudel.mjs <id>`。割れ（ピーク 1.0）がないか確かめ、あれば曲の gain を下げて書き直す
3. MP3 にする: `LAMEJS=<@breezystack/lamejs の dist/lamejs.js> node music/render/encode.mjs <stem>` → `music/audio/<stem>.mp3` と `.peaks.json`（コミットする）
4. `node music/build.mjs`
5. `music/dist/index.html` を既存の Artifact `https://claude.ai/artifact/5uTy27eZjMLx2i6Y1AehtP` に `url` を指定して公開し直す（新しい URL を作らない）。新しい曲の `audio/<stem>.mp3` を `files`（公開パス `audio/<stem>.mp3`、元は `music/dist/audio/`）で一緒に載せる。既存の MP3 は送らなければそのまま残る。`capabilities` は省略する（`downloads` の宣言が引き継がれる）

Strudel と lamejs はリポジトリに入れない（AGPL / LGPL。手元の書き出しだけに使う）。npm から一時ディレクトリに入れて使う。
Tone.js の曲を直したときは `node music/build.mjs && node music/test.mjs` のあと `render/render-tone.mjs` で録り直す（README）。

曲作りの参考:
- アーティスト別の再生時間は `music/listening-summary.json`（`periods.all.topArtists`）。解説に書く時間はここから取る。
- ユーザーは「17時のシグナル」のブリッジ（固定した上の和音と半音で下がるベース、削って歪ませたドラム）を特に気に入った。暗く歪んだ音が好み。
- 既存曲のメロディやフレーズは使わない。
- 生楽器（ブラス、サックス、ギター、ベース）は `kit.sampler()` で録音サンプルを使う（ユーザーが採用。No.06 から）。ドラム、パッド、歪んだ音はシンセのまま。新しい楽器のサンプルは `music/samples/` に足し、`CREDITS.md` に出典を書く。
- No.06 のあとも「音の安っぽさが消えない」という評価だった。伸ばす管楽器の1発サンプルで旋律を弾かせない。サンプルは素材として加工する（切る・逆再生・減速・引き伸ばし。No.07）か、ピアノなど減衰する楽器に使う。
- ずっと鳴り続けるノイズ（テープのヒスなど）は入れない。No.07 で「ずっとバックで大きなノイズが流れている」と指摘されて外した。
- サンプル・コラージュ（No.07）は「かなり感触がよい」という評価で、No.08 も同じ方式で作った。使えるサンプル: ピアノ、トランペット、トロンボーン、サックス、エレキギター、エレキベース、ハープ、木琴、ナイロン弦ギター、チェロ、コントラバス、オルガン、フルート（音程つき、`kit.buffers`）、TR-808 の実機録音、合成した英語の声（名前つき、`kit.hits`）。
- Tone.js の曲の音量の確認は実際の再生で `Tone.Meter` を使う。`Tone.Offline` の書き出しでは、コールバックの中で作るサンプルの切り貼りが鳴らない（だから録音も実時間）。
- 左右の振り分け（`kit.channel(..., { stereo: true })`）は No.07 で導入した。既存曲（No.01〜06）は、ユーザーの判断でモノラルのまま。
