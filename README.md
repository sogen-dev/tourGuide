# 広研ラスペア旅行サイト

`旅行のしおりver4.5.pdf` をもとに、ローカル公開と GitHub Pages 公開の両方に対応する静的サイトとして整理したものです。

## ページ構成

- `index.html`: 入口ページ
- `pages/schedule.html`: 日程
- `pages/rules.html`: ルール
- `pages/members.html`: メンバー
- `pages/packing.html`: 持ち物
- `pages/appendix.html`: 付録

## 主なファイル

- `styles.css`: 共通スタイル
- `script.js`: 持ち物ページのチェック保存
- `assets/docs/travel-guide.pdf`: 原本PDF
- `assets/images/cover.png`: 表紙画像
- `start-local.ps1`: ローカルサーバー起動用スクリプト

## ローカルで開く方法

PowerShell でこのフォルダに移動して、次を実行します。

```powershell
.\start-local.ps1
```

起動後に表示される `http://localhost:8000` をブラウザで開いてください。

## GitHub Pages に載せる方法

1. このフォルダを GitHub リポジトリに push する
2. GitHub の `Settings` を開く
3. `Pages` を選ぶ
4. `Build and deployment` で `Deploy from a branch` を選ぶ
5. ブランチを `main`、フォルダを `/ (root)` にする
6. 保存後、数分で公開URLが発行される

## 補足

- 情報は `日程 / ルール / メンバー / 持ち物 / 付録` の階層に分割しています。
- `持ち物` は独立ページ、`付録` は原本PDF中心のページです。
- 持ち物チェックはブラウザの `localStorage` に保存されます。
