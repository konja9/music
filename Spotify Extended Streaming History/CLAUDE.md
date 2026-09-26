# Spotify Extended Streaming History

このフォルダには、ユーザーの Spotify 拡張ストリーミング履歴（`Streaming_History_*.json`）があります。元データは編集しないこと。`ip_addr` は公開物に含めないこと。

## オリジナル曲と「履歴盤」サイト

`music/` に、履歴をもとに作ったオリジナル曲（Tone.js、ブラウザ内で合成）と、それをまとめたサイトがあります。詳細は `music/README.md`。

**新しい曲を作ったら、必ずサイトにも追加すること**（ユーザーの依頼: 「新しく曲を作成したら、自動で追加して」）:
1. `music/songs/NN-id.js` として作る（NN は次の番号）
2. `node music/build.mjs && node music/test.mjs` で全曲 OK を確認する
3. `music/dist/index.html` を既存の Artifact `https://claude.ai/artifact/5uTy27eZjMLx2i6Y1AehtP` に `url` を指定して公開し直す（新しい URL を作らない）

曲を足すだけならブラウザ（claude-in-chrome）での確認はしない。build と test で十分。ブラウザで確かめるのは `music/site/template.html`（プレイヤーや共通の土台）を変えたときだけ。

曲作りの参考:
- アーティスト別の再生時間は `music/listening-summary.json`（`periods.all.topArtists`）。解説に書く時間はここから取る。
- ユーザーは「17時のシグナル」のブリッジ（固定した上の和音と半音で下がるベース、削って歪ませたドラム）を特に気に入った。暗く歪んだ音が好み。
- 既存曲のメロディやフレーズは使わない。
