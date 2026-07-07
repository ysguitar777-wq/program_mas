# CodeLearn — プログラミング学習サイト

Python / C# / TypeScript / Rust を効率よく学習できる静的サイトです。
ビルド不要で、ブラウザで `index.html` を開くだけで動作します。

## 機能

- **ドキュメント** — 各言語 12〜13 章のドキュメント(コード例付き)。リファレンスとしても使えます。
  - 基礎編(8章): 文法・型・制御構文・関数・コレクション・クラス・エラー処理など
  - 応用編(4〜5章): Python は AI・機械学習・データ分析、C# はデスクトップアプリ(WPF/MVVM)、TypeScript は React / Next.js、Rust は CLI・Webサーバー・WebAssembly と、各言語の得意分野を実践的に解説。定番フレームワーク・ライブラリの紹介付き。
- **問題を出す** — 各言語 15 問のクイズ(選択式・穴埋め式)。回答すると即座に正誤と解説が表示されます。
- **効率よく学習できる工夫**
  - 間違えた問題は「復習」ページに自動で溜まり、復習モードで解き直せます(正解すると一覧から消えます)。
  - 言語ごとの習得状況(習得済み問題数)がホームに進捗バーで表示されます。
  - 進捗はブラウザの localStorage に保存されるため、次回アクセス時も引き継がれます。
  - 出題順はシャッフルされ、選択肢の並びも毎回変わります。

## 使い方

### ローカルで開く

```
index.html をブラウザで開くだけ(サーバー不要)
```

ローカルサーバーを使う場合:

```bash
python3 -m http.server 8000
# → http://localhost:8000 を開く
```

### GitHub Pages で公開する

リポジトリの Settings → Pages → Branch にこのブランチ(またはmain)/ root を指定するだけで公開できます。

## ディレクトリ構成

```
index.html          エントリーポイント
assets/
  style.css         スタイル(ダークモード自動対応)
  app.js            SPA ロジック(ルーティング / クイズ / 進捗管理)
data/
  python.js         Python のドキュメント + 問題データ
  csharp.js         C# のドキュメント + 問題データ
  typescript.js     TypeScript のドキュメント + 問題データ
  rust.js           Rust のドキュメント + 問題データ
```

## 問題・ドキュメントの追加方法

`data/*.js` の `docs` 配列 / `quiz` 配列に要素を追加するだけです。

```js
// 選択式問題
{
  id: "py-99",            // 一意なID(進捗管理に使用)
  type: "choice",
  level: "基礎",           // 基礎 / 中級 / 上級
  question: "問題文",
  code: "print(1 + 1)",    // 任意: コードブロック
  choices: ["正解", "誤答1", "誤答2", "誤答3"],
  answer: 0,               // choices 内の正解の添字(表示時にシャッフルされる)
  explanation: "解説文"
}

// 穴埋め式問題
{
  id: "py-100",
  type: "fill",
  level: "基礎",
  question: "問題文",
  answer: "def",           // 正解(大文字小文字は区別しない)
  accept: ["DEF"],         // 任意: 別解
  explanation: "解説文"
}
```
