/* おまけ: このサイト自身のコード解説 */
window.SITE_GUIDE = [
  {
    id: "overview",
    title: "全体像とファイル構成",
    body: `
<p>このサイトは <strong>HTML + CSS + JavaScript だけ</strong>で動く静的サイトです。ビルドツールもサーバー側の処理も不要で、ファイルをブラウザで開くだけで動きます。学んだ言語がそのまま「動くもの」になる、Web開発の最小構成のお手本として読んでみてください。</p>
<h2>ファイル構成</h2>
<pre><code>index.html          入り口(HTMLの骨組みだけ)
assets/
  style.css         見た目のすべて(デザイントークン+各画面のスタイル)
  app.js            動きのすべて(画面切替・クイズ・進捗保存)
data/
  python.js など     各言語のドキュメントと問題(データ)
  glossary.js       用語集データ
  site-guide.js     このページのデータ</code></pre>
<h2>設計の考え方: データとロジックの分離</h2>
<p>「問題を増やす」「章を足す」といった変更が <code>data/</code> のファイル追記だけで済むように、<strong>コンテンツ(データ)と仕組み(ロジック)を分離</strong>しています。app.js はデータの中身を知らず、「docs 配列を目次にして表示する」「quiz 配列から出題する」というルールだけを持ちます。</p>
<ul>
<li>データを差し替えれば別ジャンルの学習サイトにもなる(汎用性)</li>
<li>コンテンツ追加でロジックを壊す心配がない(安全性)</li>
<li>この分離はどんなアプリでも通用する基本設計</li>
</ul>`
  },
  {
    id: "html",
    title: "HTML: 骨組みは最小限",
    body: `
<p><code>index.html</code> を見ると、中身がほとんど無いことに気づきます。これが SPA(Single Page Application)の特徴です。</p>
<pre data-lang="none"><code>&lt;body&gt;
  &lt;header class="site-header"&gt;
    &lt;a href="#/" class="brand"&gt;CodeLearn&lt;/a&gt;
    &lt;nav class="global-nav"&gt;...&lt;/nav&gt;
  &lt;/header&gt;

  &lt;main id="app" class="container"&gt;
    &lt;!-- ここは空。中身はすべて JS が描画する --&gt;
  &lt;/main&gt;

  &lt;footer class="site-footer"&gt;...&lt;/footer&gt;

  &lt;!-- 読み込み順が重要: データ → アプリ本体 --&gt;
  &lt;script src="data/python.js"&gt;&lt;/script&gt;
  &lt;script src="data/csharp.js"&gt;&lt;/script&gt;
  ...
  &lt;script src="assets/app.js"&gt;&lt;/script&gt;
&lt;/body&gt;</code></pre>
<h2>ポイント</h2>
<ul>
<li><code>&lt;main id="app"&gt;</code> が「画面の描画先」。JSはこの1箇所だけを書き換える</li>
<li><code>&lt;script&gt;</code> は<strong>上から順に実行</strong>されるため、データ定義(data/*.js)を先に、それを使う app.js を最後に読み込む</li>
<li>ヘッダーとフッターはどの画面でも共通なので、HTMLに直接書いてJSでは触らない</li>
<li>データファイルは <code>window.LEARN_DATA.python = {...}</code> のようにグローバル変数へ登録するだけの単純な作りで、fetch を使わないため <code>file://</code> で直接開いても動く</li>
</ul>`
  },
  {
    id: "css-tokens",
    title: "CSS: デザイントークンとテーマ切替",
    body: `
<p>style.css の最初にあるのが<strong>デザイントークン</strong>(CSS変数)です。色・角丸・影などの「デザインの部品」に名前を付けて一元管理しています。</p>
<pre data-lang="none"><code>:root {
  --bg: #f4f6fb;          /* 背景色 */
  --surface: #ffffff;     /* カードの色 */
  --text: #10151f;        /* 文字色 */
  --accent: #4f6ef7;      /* アクセント色 */
  --radius: 14px;         /* 角丸 */
}

/* ダークテーマは「同じ名前の変数」を上書きするだけ */
[data-theme="dark"] {
  --bg: #0b0e14;
  --surface: #131824;
  --text: #e8ecf4;
  --accent: #7c93ff;
}

/* 使う側は変数名だけを参照する */
.lang-card {
  background: var(--surface);
  color: var(--text);
  border-radius: var(--radius);
}</code></pre>
<h2>この設計のうまみ</h2>
<ul>
<li><strong>テーマ切替が一瞬</strong>: <code>&lt;html data-theme="dark"&gt;</code> と属性を1つ変えるだけで、全画面の配色が切り替わる(JS側は1行)</li>
<li><strong>統一感</strong>: 色を直書きしないので「微妙に違う青が10種類ある」事故が起きない</li>
<li><strong>変更に強い</strong>: アクセント色を変えたければ変数1行の修正で全体に反映</li>
</ul>
<h2>レスポンシブ対応</h2>
<pre data-lang="none"><code>/* カードは「入るだけ並べて、入らなければ折り返す」 */
.lang-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 幅が狭いときだけレイアウトを変える(メディアクエリ) */
@media (max-width: 780px) {
  .docs-layout { grid-template-columns: 1fr; }  /* サイドバーを上に */
}</code></pre>
<p><code>auto-fit + minmax</code> のグリッドは、画面幅ごとの分岐を書かなくても自動で 4列 → 2列 → 1列 と変化します。スマホ対応の主役はこの1行です。</p>`
  },
  {
    id: "spa-routing",
    title: "JS: SPA ルーティング(画面切替)",
    body: `
<p>「ホーム」「ドキュメント」「クイズ」の切替は、ページ遷移ではなく <strong>URL の # 以降(ハッシュ)を見て描画関数を呼び分ける</strong>ことで実現しています。</p>
<pre data-lang="typescript"><code>// #/docs/python/basics のようなハッシュを分解して振り分ける
function route() {
  const hash = currentRoute || location.hash || "#/";
  const parts = hash.replace(/^#\\//, "").split("/").filter(Boolean);

  if (parts.length === 0) return renderHome();
  if (parts[0] === "docs")   return renderDocs(parts[1], parts[2]);
  if (parts[0] === "quiz")   return startQuiz(parts[1], parts[2] === "review");
  if (parts[0] === "review") return renderReview();
  return renderHome();  // 不明なURLはホームへ
}</code></pre>
<h2>リンククリックの横取り(イベントデリゲーション)</h2>
<p>リンクごとにイベントを付けるのではなく、<strong>document で1回だけ</strong>クリックを監視し、サイト内リンクなら既定の遷移を止めて自前で画面を切り替えます。</p>
<pre data-lang="typescript"><code>document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#/"]');  // サイト内リンクか?
  if (!a) return;
  e.preventDefault();               // 本来のページ遷移をキャンセル
  navigate(a.getAttribute("href")); // 自前で描画を切り替える
});

function navigate(hash) {
  currentRoute = hash;
  try {
    history.pushState(null, "", hash);  // URLも同期(戻るボタン対応)
  } catch (e) { /* サンドボックス環境では内部状態だけで動く */ }
  route();
}</code></pre>
<ul>
<li>後から追加されたリンクにも自動で効く(要素ごとの登録が不要)</li>
<li><code>popstate</code> イベントを拾えばブラウザの戻る/進むにも対応できる</li>
<li>実はこの方式は「埋め込み環境でリンクが Forbidden になる」不具合の修正として導入したもの。実際の開発でも、動く環境を増やすためにこうした書き換えがよく起こります</li>
</ul>`
  },
  {
    id: "quiz-logic",
    title: "JS: クイズの出題と採点",
    body: `
<p>問題は「ただのデータ」で、出題・採点のロジックとは完全に分かれています。</p>
<pre data-lang="typescript"><code>// data/python.js の問題データ(一部)
{
  id: "py-2",
  type: "choice",              // choice(選択式) or fill(穴埋め)
  level: "基礎",
  question: "次のコードの出力はどれ?",
  code: "for i in range(3):\\n    print(i)",
  choices: ["0 1 2", "1 2 3", "0 1 2 3", "エラーになる"],
  answer: 0,                   // choices の正解の位置
  explanation: "range(3) は 0, 1, 2 を生成します。"
}</code></pre>
<h2>シャッフル(フィッシャー・イェーツ法)</h2>
<p>出題順も選択肢の並びも毎回変えています。「後ろから順に、ランダムな相手と入れ替える」定番アルゴリズムです。</p>
<pre data-lang="typescript"><code>function shuffle(arr) {
  const a = arr.slice();                // 元の配列は壊さずコピー
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];        // 分割代入で交換
  }
  return a;
}</code></pre>
<h2>採点の流れ</h2>
<ol>
<li>選択式: シャッフル時に「これが正解」というフラグを一緒に持ち運ぶ(<code>{ text, isAnswer }</code>)</li>
<li>穴埋め式: 入力値と正解を小文字化して比較(別解は <code>accept</code> 配列で許容)</li>
<li>正誤を進捗ストアに記録 → 解説を表示 → 次の問題へ</li>
</ol>
<p>1問ごとの状態(何問目か・正解数)は <code>quizState</code> というオブジェクト1つにまとめてあり、画面は常に「状態から描画し直す」方針です。状態と表示を分けるこの考え方は React などのフレームワークにもつながります。</p>`
  },
  {
    id: "storage",
    title: "JS: localStorage での進捗保存",
    body: `
<p>進捗は<strong>ブラウザ内の localStorage</strong> に保存しています。サーバーもログインも不要で、次に開いたときも続きから学べます。</p>
<pre data-lang="typescript"><code>// 保存する形: 問題IDごとの成績
{
  "results": {
    "python": {
      "py-1": { "correct": 2, "wrong": 1, "lastWrong": false },
      "py-2": { "correct": 0, "wrong": 1, "lastWrong": true }
    }
  }
}</code></pre>
<pre data-lang="typescript"><code>const STORE_KEY = "codelearn-progress-v1";

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch (e) {
    return {};   // 壊れたデータや使えない環境でも動き続ける
  }
}

function recordAnswer(lang, qid, isCorrect) {
  const store = loadStore();
  // ...成績を更新して...
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}</code></pre>
<h2>設計のポイント</h2>
<ul>
<li>localStorage は<strong>文字列しか保存できない</strong>ため、<code>JSON.stringify / JSON.parse</code> で変換する</li>
<li>必ず <code>try / catch</code> で包む — プライベートブラウズや埋め込み環境では例外が出るため、「保存できなくてもサイト自体は動く」ようにしておく</li>
<li>キー名にバージョン(<code>-v1</code>)を入れておくと、将来データ構造を変えたとき古いデータと衝突しない</li>
<li>「復習」機能は <code>lastWrong: true</code>(最後に間違えた)の問題を集めているだけ。小さなデータ設計の工夫で機能が1つ生まれる例</li>
</ul>`
  },
  {
    id: "highlight",
    title: "JS: シンタックスハイライトの自作",
    body: `
<p>コードの色分けはライブラリを使わず、<strong>正規表現ベースの小さなトークナイザ</strong>を自作しています。仕組みは意外とシンプルです。</p>
<pre data-lang="typescript"><code>// 言語ごとに「文字列|コメント|キーワード|数値」を1つの正規表現に
const re = new RegExp(
  \`(\${string})|(\${comment})|\\\\b(\${keywords})\\\\b|(\${number})\`,
  "g"
);

function highlightElement(el, lang) {
  const src = el.textContent;   // いったん素のテキストに戻す
  let out = "", last = 0, m;
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index));          // マッチ間の地の文
    const cls = m[1] ? "tok-str"    // 文字列  → 水色
             : m[2] ? "tok-com"    // コメント → グレー
             : m[3] ? "tok-kw"     // キーワード → 赤
             : "tok-num";          // 数値    → 青
    out += \`&lt;span class="\${cls}"&gt;\${esc(m[0])}&lt;/span&gt;\`;
    last = re.lastIndex;
  }
  out += esc(src.slice(last));
  el.innerHTML = out;
}</code></pre>
<h2>学びどころ</h2>
<ul>
<li><strong>順序が仕様</strong>: 正規表現の候補は「文字列 → コメント → キーワード」の順。先に文字列を判定するので、文字列の中の <code>//</code> をコメントと誤認しない</li>
<li><strong>esc() を通す理由</strong>: ユーザー由来のテキストをそのまま <code>innerHTML</code> に入れると、HTMLとして解釈されてしまう(XSS 脆弱性)。<code>&lt;</code> を <code>&amp;lt;</code> に変換してから挿入するのが鉄則</li>
<li>完璧な構文解析ではないが、学習サイトの表示用途には十分。「100点の汎用ライブラリ」より「用途に足る小さな自作」が合理的な場面もある</li>
</ul>`
  },
  {
    id: "extend",
    title: "拡張のしかた(演習: 自分で改造してみよう)",
    body: `
<p>このサイトは改造して学ぶための素材でもあります。難易度順のおすすめ改造メニューです。</p>
<h2>Lv.1 — データを足す(コード変更なし)</h2>
<p><code>data/python.js</code> の <code>quiz</code> 配列に1問追加してみましょう。保存してリロードすれば出題されます。</p>
<pre data-lang="typescript"><code>{
  id: "py-99",                     // 他と重複しないID
  type: "choice",
  level: "基礎",
  question: "リストの要素数を返す関数は?",
  choices: ["len()", "size()", "count()", "length()"],
  answer: 0,
  explanation: "len(リスト) で要素数を取得します。"
}</code></pre>
<h2>Lv.2 — 見た目を変える(CSSのみ)</h2>
<ul>
<li><code>:root</code> の <code>--accent</code> を好きな色に変えて全体の雰囲気を変える</li>
<li>ダークテーマ側(<code>[data-theme="dark"]</code>)だけ配色を調整してみる</li>
</ul>
<h2>Lv.3 — 機能を足す(JS)</h2>
<ul>
<li>結果画面に「かかった時間」を表示する(開始時に <code>Date.now()</code> を記録して差を取る)</li>
<li>難易度(基礎/中級/上級)を選んで出題を絞るボタンを付ける(<code>pool.filter(q =&gt; q.level === 選択)</code>)</li>
<li>正解数に応じてバッジ(称号)を localStorage に保存する</li>
</ul>
<h2>Lv.4 — 公開する</h2>
<p>GitHub のリポジトリ設定 → Pages でブランチを指定すれば、URLが発行されて世界中(またはURLを知る人)からアクセスできます。ビルド不要の静的サイトなので設定はそれだけです。</p>
<h2>Lv.5 — 作り直してみる</h2>
<p>同じ機能を <strong>React + TypeScript</strong> で書き直すと、応用編で学んだ内容の絶好の練習になります。「状態から描画する」「データとUIを分ける」という設計はそのまま活きます。</p>`
  }
];
