# サンプル音源のクレジット

`samples/` の mp3 は tonejs-instruments のサンプルです。

- 作者: Nicholaus P. Brosowsky（tonejs-instruments）
- ライセンス: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
- 取得元: npm の `tonejs-instrument-<楽器>-mp3` 1.1.x（Makefully Studios による npm パッケージ）
- 元の録音はパブリックドメインの素材で、配布元で無音の削除・音量合わせ・ノイズ除去・音程補正などが行われています
- このリポジトリでは、容量を抑えるために音を間引いています（ファイルの中身は変えていません）

| フォルダ | パッケージ |
|---|---|
| `trumpet/` | tonejs-instrument-trumpet-mp3 |
| `trombone/` | tonejs-instrument-trombone-mp3 |
| `saxophone/` | tonejs-instrument-saxophone-mp3 |
| `guitar-electric/` | tonejs-instrument-guitar-electric-mp3 |
| `bass-electric/` | tonejs-instrument-bass-electric-mp3 |
| `piano/` | tonejs-instrument-piano-mp3 |
| `harp/` | tonejs-instrument-harp-mp3 |
| `xylophone/` | tonejs-instrument-xylophone-mp3 |
| `guitar-nylon/` | tonejs-instrument-guitar-nylon-mp3 |
| `cello/` | tonejs-instrument-cello-mp3 |
| `contrabass/` | tonejs-instrument-contrabass-mp3 |
| `organ/` | tonejs-instrument-organ-mp3 |

ファイル名の `s` はシャープです（`As3.mp3` = A#3）。

## TR-808（`tr808/`）

- Roland TR-808 の実機から録音したサンプル集（Michael Fischer / Technopolis、1994年）
- 取得元: npm の `@fluid-music/tr-808`
- 配布元の説明文（`TR808.TXT`）に「ABSOLUTELY FREE」とある。正式なライセンス文はない
- 116音から19音を選び、分かりやすい名前に付け替えた（中身は変えていない）: `bd-long`=BD0010、`bd-mid`=BD2550、`bd-short`=BD5000、`sd-snappy`=SD2510、`sd-mid`=SD5050、`sd-tone`=SD7500、`clap`=CP、`hat-closed`=CH、`hat-open`=OH25、`cowbell`=CB、`rim`=RS、`clave`=CL、`maracas`=MA、`cymbal`=CY5050、`tom-low`=LT25、`tom-mid`=MT50、`tom-high`=HT75、`conga-low`=LC50、`conga-high`=HC50

## 合成した声（`voice/`）

- このリポジトリの `tools/make-voice.mjs` で、meSpeak（eSpeak の JavaScript 版、GPL）を使って合成した英語の音声
- 読ませた言葉は再生履歴の操作と数字（play、skip、「one thousand two hundred ninety hours」など）。生成した音声はこのプロジェクトの出力で、eSpeak 自体は含まない
