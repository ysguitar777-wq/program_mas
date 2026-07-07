window.LEARN_DATA = window.LEARN_DATA || {};
window.LEARN_DATA.rust = {
  name: "Rust",
  color: "#ce422b",
  tagline: "メモリ安全と高速性を両立するシステムプログラミング言語。所有権が最大の特徴。",
  docs: [
    {
      id: "basics",
      title: "基本と変数",
      body: `
<p>Rust の変数は <code>let</code> で宣言し、<strong>デフォルトで不変(immutable)</strong>です。変更したい場合は <code>mut</code> を付けます。</p>
<pre><code>fn main() {
    let name = "太郎";        // 不変(再代入できない)
    let mut count = 0;        // mut を付けると可変
    count += 1;

    let age: u32 = 20;        // 型注釈(省略すれば推論される)

    println!("{}さんは{}歳です", name, age);
    println!("{name}さんは{age}歳です");   // 変数名の直接埋め込みもOK
}</code></pre>
<h2>ポイント</h2>
<ul>
<li>プログラムは <code>fn main()</code> から始まる</li>
<li>文はセミコロン <code>;</code> で終わる</li>
<li><code>println!</code> の <code>!</code> はマクロの印</li>
<li>変数名はスネークケース(<code>user_name</code>)が慣習</li>
<li>シャドーイング: 同名の <code>let</code> で変数を宣言し直せる(型を変えてもよい)</li>
</ul>`
    },
    {
      id: "types",
      title: "データ型",
      body: `
<h2>主な型</h2>
<pre><code>let i: i32 = -100;      // 符号付き整数 (i8, i16, i32, i64, i128)
let u: u32 = 100;       // 符号なし整数 (u8, u16, u32, u64, u128)
let f: f64 = 3.14;      // 浮動小数点数 (f32, f64)
let b: bool = true;     // 真偽値
let c: char = 'あ';     // 1文字(Unicode対応・シングルクォート)
let t: (i32, f64) = (1, 2.0);   // タプル
let arr: [i32; 3] = [1, 2, 3];  // 固定長配列</code></pre>
<h2>&str と String</h2>
<pre><code>let s1: &str = "hello";              // 文字列スライス(借用・固定)
let s2: String = String::from("hello"); // 所有権を持つ可変文字列
let s3 = format!("{} world", s1);    // 文字列の組み立て</code></pre>
<h2>型変換</h2>
<pre><code>let x = 3.99_f64;
let y = x as i32;                    // as でキャスト → 3(切り捨て)
let n: i32 = "42".parse().unwrap();  // 文字列 → 数値</code></pre>`
    },
    {
      id: "control",
      title: "制御構文 (if / loop / match)",
      body: `
<h2>if は式(値を返せる)</h2>
<pre><code>let score = 85;
let rank = if score >= 80 { "A" } else { "B" };  // if の結果を代入できる</code></pre>
<h2>ループ</h2>
<pre><code>for i in 0..5 {          // 0〜4(5 は含まない)
    println!("{i}");
}
for i in 0..=5 { }       // 0〜5(=を付けると終端を含む)

let mut n = 0;
while n < 3 { n += 1; }

loop {                   // 無限ループ
    n += 1;
    if n > 5 { break; }  // break で抜ける
}</code></pre>
<h2>match(パターンマッチ)</h2>
<pre><code>let num = 3;
match num {
    1 => println!("one"),
    2 | 3 => println!("two or three"),   // 複数パターン
    4..=9 => println!("4〜9"),
    _ => println!("その他"),              // _ は残り全部(網羅必須)
}</code></pre>
<p><code>match</code> は<strong>すべてのケースを網羅しないとコンパイルエラー</strong>になります。これがバグを防ぎます。</p>`
    },
    {
      id: "functions",
      title: "関数と式",
      body: `
<pre><code>// 引数と戻り値に型を書く(戻り値は -> )
fn add(a: i32, b: i32) -> i32 {
    a + b        // 最後の式が戻り値(セミコロンを付けない!)
}

fn greet(name: &str) {          // 戻り値なしは -> を省略
    println!("こんにちは、{name}さん");
}</code></pre>
<h2>式と文の違い(重要)</h2>
<pre><code>fn double(x: i32) -> i32 {
    x * 2      // ← 式: これが戻り値になる
    // x * 2;  // ← セミコロンを付けると「文」になり、() が返ってエラー
}</code></pre>
<h2>クロージャ(無名関数)</h2>
<pre><code>let double = |x: i32| x * 2;
let nums = vec![1, 2, 3];
let doubled: Vec&lt;i32&gt; = nums.iter().map(|x| x * 2).collect();</code></pre>`
    },
    {
      id: "ownership",
      title: "所有権と借用(Rust の核心)",
      body: `
<p>Rust には GC(ガベージコレクタ)がなく、<strong>所有権システム</strong>でメモリを管理します。</p>
<h2>所有権の3ルール</h2>
<ol>
<li>各値は、ただ1つの変数(所有者)が所有する</li>
<li>所有者がスコープを抜けると値は破棄される</li>
<li>代入や関数への受け渡しで所有権は<strong>移動(ムーブ)</strong>する</li>
</ol>
<pre><code>let s1 = String::from("hello");
let s2 = s1;                  // 所有権が s2 にムーブ
// println!("{}", s1);        // エラー! s1 はもう使えない

let s3 = s2.clone();          // 複製すれば両方使える(コスト有り)</code></pre>
<h2>借用(参照)</h2>
<p>所有権を渡さずに値を使わせるには <code>&</code> で<strong>借用</strong>します。</p>
<pre><code>fn calc_len(s: &String) -> usize {   // & は不変の借用
    s.len()
}

let s = String::from("hello");
let len = calc_len(&s);       // 貸すだけなので
println!("{s} は {len} 文字"); // s はまだ使える

let mut t = String::from("hi");
let r = &mut t;               // 可変の借用(同時に1つだけ)
r.push_str("!");</code></pre>
<ul>
<li>不変の借用 <code>&T</code> は同時に複数OK</li>
<li>可変の借用 <code>&mut T</code> は同時に<strong>1つだけ</strong>(データ競合を防ぐ)</li>
<li>i32 などの単純な型は Copy トレイトを持つためムーブせずコピーされる</li>
</ul>`
    },
    {
      id: "struct-enum",
      title: "構造体と列挙型",
      body: `
<h2>構造体 (struct)</h2>
<pre><code>struct Person {
    name: String,
    age: u32,
}

impl Person {                       // impl にメソッドを書く
    // 関連関数(コンストラクタの慣習は new)
    fn new(name: &str, age: u32) -> Person {
        Person { name: name.to_string(), age }
    }

    fn introduce(&self) -> String {  // &self でインスタンスを借用
        format!("{}({}歳)です", self.name, self.age)
    }
}

let p = Person::new("太郎", 20);
println!("{}", p.introduce());</code></pre>
<h2>列挙型 (enum)</h2>
<pre><code>enum Shape {
    Circle(f64),              // 値を持てる
    Rect { w: f64, h: f64 },  // 名前付きフィールドも可
}

fn area(s: &Shape) -> f64 {
    match s {
        Shape::Circle(r) => 3.14 * r * r,
        Shape::Rect { w, h } => w * h,
    }
}</code></pre>`
    },
    {
      id: "option-result",
      title: "Option と Result(エラー処理)",
      body: `
<p>Rust には <code>null</code> も例外もありません。代わりに <code>Option</code> と <code>Result</code> という enum を使います。</p>
<h2>Option&lt;T&gt; — 値が「あるかもしれない」</h2>
<pre><code>fn find_user(id: u32) -> Option&lt;String&gt; {
    if id == 1 { Some(String::from("太郎")) } else { None }
}

match find_user(1) {
    Some(name) => println!("見つかった: {name}"),
    None => println!("見つからない"),
}

// if let で簡潔に書ける
if let Some(name) = find_user(1) {
    println!("{name}");
}</code></pre>
<h2>Result&lt;T, E&gt; — 成功か失敗か</h2>
<pre><code>fn parse_num(s: &str) -> Result&lt;i32, String&gt; {
    s.parse().map_err(|_| format!("{s} は数値ではない"))
}

match parse_num("42") {
    Ok(n) => println!("成功: {n}"),
    Err(e) => println!("失敗: {e}"),
}</code></pre>
<ul>
<li><code>unwrap()</code> は中身を取り出すが、None / Err だと<strong>パニック(強制終了)</strong>する — 学習用・プロトタイプ向き</li>
<li><code>?</code> 演算子でエラーを呼び出し元へ伝播できる: <code>let n = parse_num(s)?;</code></li>
</ul>`
    },
    {
      id: "vec-iter",
      title: "Vec とイテレータ",
      body: `
<h2>Vec(可変長配列)</h2>
<pre><code>let mut v: Vec&lt;i32&gt; = Vec::new();
v.push(1);
v.push(2);

let v2 = vec![1, 2, 3];        // vec! マクロで初期化
let first = v2[0];             // 添字アクセス(範囲外はパニック)
let safe = v2.get(10);         // get は Option を返すので安全 → None</code></pre>
<h2>イテレータ</h2>
<pre><code>let nums = vec![1, 2, 3, 4, 5];

let doubled: Vec&lt;i32&gt; = nums.iter().map(|x| x * 2).collect();
let evens: Vec&lt;&i32&gt; = nums.iter().filter(|x| *x % 2 == 0).collect();
let sum: i32 = nums.iter().sum();      // 15
let max = nums.iter().max();           // Some(&5)</code></pre>
<h2>HashMap</h2>
<pre><code>use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert("太郎", 90);
if let Some(score) = scores.get("太郎") {
    println!("{score}");
}</code></pre>
<p>イテレータは<strong>遅延評価</strong>で、<code>collect()</code> などを呼ぶまで実際の処理は走りません。</p>`
    },
    {
      id: "rust-strengths",
      title: "応用: Rust が得意なこと(活用分野マップ)",
      body: `
<p>ここからは応用編です。Rust の強みは <strong>「C/C++ 並みの速度」と「メモリ安全」の両立</strong>、そして <strong>GC(ガベージコレクタ)が無いこと</strong>による安定した実行速度です。この強みが活きる分野を押さえましょう。</p>
<h2>Rust が選ばれている分野</h2>
<ul>
<li><strong>CLI ツール</strong>: 高速起動・単一バイナリで配布が簡単。<code>ripgrep</code>(高速grep)や <code>fd</code>、<code>bat</code> など人気ツールが Rust 製</li>
<li><strong>Web バックエンド</strong>: 少ないメモリで大量リクエストを高速処理。Discord や Cloudflare が採用</li>
<li><strong>WebAssembly (Wasm)</strong>: ブラウザ内でネイティブ級の速度が必要な処理(画像処理・ゲーム・エディタなど)。Figma のコア部分が有名</li>
<li><strong>デスクトップアプリ</strong>: <strong>Tauri</strong> を使うと Web 技術(HTML/JS)でUIを作り、本体を Rust で書ける軽量アプリが作れる(Electron より省メモリ)</li>
<li><strong>システム・組み込み</strong>: OS(Linuxカーネルにも採用)、組み込み機器、ブラウザエンジンなど、C/C++ の置き換え</li>
<li><strong>高速化エンジン</strong>: Python の Polars や JS の SWC など「他言語の道具の中身」としても活躍</li>
</ul>
<h2>最初のプロジェクト管理 — Cargo</h2>
<pre><code># Cargo はビルド・実行・パッケージ管理を全部こなす公式ツール
cargo new hello       # プロジェクト作成
cd hello
cargo run             # ビルドして実行
cargo add serde       # ライブラリ(クレート)を追加
cargo build --release # 最適化ビルド(配布用)</code></pre>
<p>ライブラリは<strong>クレート (crate)</strong> と呼ばれ、crates.io で公開されています。この後の章で「CLI」「Webサーバー」「WebAssembly」を順に体験します。</p>`
    },
    {
      id: "rust-cli",
      title: "応用: CLI ツール開発 (clap)",
      body: `
<p>Rust 入門後の最初のアプリに最適なのが <strong>CLI(コマンドラインツール)</strong>です。速く、単一ファイルで配れて、Rust の型システムの恩恵をすぐ感じられます。</p>
<h2>clap — 引数解析の定番クレート</h2>
<pre><code>cargo new wordcount
cd wordcount
cargo add clap --features derive</code></pre>
<pre><code>use clap::Parser;
use std::fs;

/// ファイルの行数・単語数を数えるツール
#[derive(Parser)]
struct Args {
    /// 対象ファイルのパス
    path: String,

    /// 単語数も表示する
    #[arg(short, long)]
    words: bool,
}

fn main() {
    let args = Args::parse();   // --help も自動生成される!

    let text = fs::read_to_string(&args.path)
        .expect("ファイルを読めませんでした");

    println!("行数: {}", text.lines().count());
    if args.words {
        let count = text.split_whitespace().count();
        println!("単語数: {count}");
    }
}</code></pre>
<pre><code>cargo run -- notes.txt --words
# 行数: 12
# 単語数: 84</code></pre>
<h2>ポイント</h2>
<ul>
<li>構造体に属性を付けるだけで、引数解析・ヘルプ・エラー表示が自動生成される</li>
<li><code>cargo build --release</code> で作った1つの実行ファイルをそのまま配布できる</li>
<li>組み合わせると便利: <code>anyhow</code>(エラー処理を簡潔に)、<code>indicatif</code>(進捗バー)、<code>colored</code>(色付き出力)</li>
</ul>`
    },
    {
      id: "rust-web",
      title: "応用: Web サーバー開発 (axum / tokio)",
      body: `
<p>Rust は<strong>高速・省メモリなWebバックエンド</strong>としても人気です。定番は非同期ランタイム <strong>tokio</strong> + Webフレームワーク <strong>axum</strong> の組み合わせです。</p>
<pre><code>cargo new api-server
cd api-server
cargo add tokio --features full
cargo add axum
cargo add serde --features derive
cargo add serde_json</code></pre>
<h2>JSON を返す最小のAPI</h2>
<pre><code>use axum::{routing::get, Json, Router};
use serde::Serialize;

#[derive(Serialize)]
struct User {
    id: u32,
    name: String,
}

async fn list_users() -> Json&lt;Vec&lt;User&gt;&gt; {
    Json(vec![
        User { id: 1, name: "太郎".to_string() },
        User { id: 2, name: "花子".to_string() },
    ])
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/users", get(list_users));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await.unwrap();
    axum::serve(listener, app).await.unwrap();
}</code></pre>
<pre><code>cargo run
# 別ターミナルで:
curl http://localhost:3000/users
# → [{"id":1,"name":"太郎"},{"id":2,"name":"花子"}]</code></pre>
<h2>ポイント</h2>
<ul>
<li><code>async fn</code> + <code>await</code> で非同期処理を書く(tokio が実行を管理)</li>
<li><strong>serde</strong> の <code>#[derive(Serialize)]</code> だけで構造体がJSONに変換できる</li>
<li>データベースは <code>sqlx</code>(SQLを型チェックできる)が定番</li>
<li>コンパイルが通れば落ちにくい、というRustの安心感がサーバー用途で特に効く</li>
</ul>`
    },
    {
      id: "rust-wasm-ecosystem",
      title: "応用: WebAssembly と定番クレート",
      body: `
<h2>WebAssembly (Wasm) — ブラウザで Rust を動かす</h2>
<p>Rust は WebAssembly 対応が最も進んだ言語です。ブラウザ内で重い計算(画像処理・物理演算・パーサーなど)をネイティブ級の速度で実行できます。</p>
<pre><code># wasm-pack でビルドすると JS から呼べるパッケージになる
cargo install wasm-pack
cargo new --lib mylib && cd mylib
cargo add wasm-bindgen</code></pre>
<pre><code>use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fib(n: u32) -> u64 {
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n {
        let next = a + b;
        a = b;
        b = next;
    }
    a
}</code></pre>
<pre><code>// JavaScript / TypeScript 側から普通の関数として呼べる
import init, { fib } from "./pkg/mylib.js";
await init();
console.log(fib(50));   // 高速に計算される</code></pre>
<h2>デスクトップアプリ — Tauri</h2>
<p><strong>Tauri</strong> は「UIはWeb技術(React等)、本体はRust」で作るデスクトップアプリのフレームワークです。Electron に比べて配布サイズ・メモリ使用量が大幅に小さく、TypeScript の知識と組み合わせられます。</p>
<h2>覚えておきたい定番クレート</h2>
<ul>
<li><strong>serde</strong>: JSON等との相互変換。Rust エコシステムの土台</li>
<li><strong>tokio</strong>: 非同期ランタイム(サーバー・並行処理)</li>
<li><strong>reqwest</strong>: HTTP クライアント(API呼び出し)</li>
<li><strong>anyhow / thiserror</strong>: エラー処理を書きやすくする</li>
<li><strong>rayon</strong>: <code>.iter()</code> を <code>.par_iter()</code> に変えるだけで並列処理</li>
<li><strong>clap / axum / sqlx</strong>: CLI / Web / DB(前章参照)</li>
</ul>
<h2>学習ロードマップ</h2>
<ol>
<li>所有権・Option/Result など本サイトの基礎編を固める</li>
<li>clap で CLI ツールを1本作る(最短で達成感が得られる)</li>
<li>axum で JSON API を作る、または Tauri でデスクトップアプリ化</li>
<li>必要になったら WebAssembly で「ブラウザの中の高速エンジン」に挑戦</li>
</ol>`
    }
  ],
  quiz: [
    {
      id: "rs-1",
      type: "choice",
      level: "基礎",
      question: "Rust の変数のデフォルトの性質として正しいのはどれ?",
      choices: ["不変(再代入できない)", "可変(自由に再代入できる)", "グローバル変数になる", "null で初期化される"],
      answer: 0,
      explanation: "let で宣言した変数はデフォルトで不変です。可変にするには let mut を使います。"
    },
    {
      id: "rs-2",
      type: "fill",
      level: "基礎",
      question: "変数を可変(再代入可能)にするために let の後に付けるキーワードは?",
      answer: "mut",
      explanation: "let mut count = 0; のように mut を付けると再代入できるようになります。"
    },
    {
      id: "rs-3",
      type: "choice",
      level: "基礎",
      question: "次のコードの出力はどれ?",
      code: 'fn main() {\n    for i in 0..3 {\n        print!("{} ", i);\n    }\n}',
      choices: ["0 1 2", "0 1 2 3", "1 2 3", "エラーになる"],
      answer: 0,
      explanation: "0..3 は 0 以上 3 未満の範囲です。3 を含めたい場合は 0..=3 と書きます。"
    },
    {
      id: "rs-4",
      type: "choice",
      level: "基礎",
      question: "関数の戻り値の型を指定する記号はどれ?",
      choices: ["->", "=>", ":", "::"],
      answer: 0,
      explanation: "fn add(a: i32, b: i32) -> i32 のように -> で戻り値の型を書きます。=> は match の腕で使います。"
    },
    {
      id: "rs-5",
      type: "choice",
      level: "中級",
      question: "次のコードがコンパイルエラーになる理由はどれ?",
      code: 'let s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);',
      choices: [
        "s1 の所有権が s2 にムーブされ、s1 は使えなくなったから",
        "String は代入できない型だから",
        "println! に文字列を渡せないから",
        "s2 が未使用だから"
      ],
      answer: 0,
      explanation: "String の代入は所有権のムーブです。ムーブ後の s1 は無効になります。両方使うには s1.clone() します。"
    },
    {
      id: "rs-6",
      type: "choice",
      level: "中級",
      question: "所有権を渡さずに値を関数に使わせる仕組みを何と呼ぶ?",
      choices: ["借用(参照)", "コピー", "シャドーイング", "ライフタイム"],
      answer: 0,
      explanation: "&値 で借用(参照)を渡せば、所有権を移動させずに値を使わせられます。"
    },
    {
      id: "rs-7",
      type: "choice",
      level: "中級",
      question: "可変の借用 &mut T のルールとして正しいのはどれ?",
      choices: [
        "同じ値への可変の借用は同時に1つしか存在できない",
        "同時にいくつでも作れる",
        "不変の借用と常に共存できる",
        "文字列にしか使えない"
      ],
      answer: 0,
      explanation: "データ競合を防ぐため、可変の借用は同時に1つだけです(そのあいだ不変の借用も作れません)。"
    },
    {
      id: "rs-8",
      type: "fill",
      level: "中級",
      question: "値が「あるかもしれないし、ないかもしれない」ことを表す標準の enum は?",
      answer: "Option",
      explanation: "Rust には null がなく、Option<T>(Some(値) または None)で値の有無を型として表現します。"
    },
    {
      id: "rs-9",
      type: "choice",
      level: "中級",
      question: "次のコードの出力はどれ?",
      code: 'let score = 85;\nlet rank = if score >= 80 { "A" } else { "B" };\nprintln!("{}", rank);',
      choices: ["A", "B", "true", "エラーになる"],
      answer: 0,
      explanation: "Rust の if は式なので値を返せます。85 >= 80 が true なので \"A\" が代入されます。"
    },
    {
      id: "rs-10",
      type: "choice",
      level: "中級",
      question: "match 式の特徴として正しいのはどれ?",
      choices: [
        "すべてのパターンを網羅しないとコンパイルエラーになる",
        "パターンは最大3つまで",
        "数値にしか使えない",
        "上から順ではなくランダムに評価される"
      ],
      answer: 0,
      explanation: "match は網羅性チェックがあり、考慮漏れをコンパイル時に検出します。残りは _ で受けられます。"
    },
    {
      id: "rs-11",
      type: "choice",
      level: "中級",
      question: "Result<T, E> の Ok / Err を返す関数のエラーを、呼び出し元へ簡潔に伝播させる演算子はどれ?",
      choices: ["?", "!", "&&", "=>"],
      answer: 0,
      explanation: "let n = parse_num(s)?; のように ? を付けると、Err の場合に即座に呼び出し元へ返します。"
    },
    {
      id: "rs-12",
      type: "choice",
      level: "上級",
      question: "Option の unwrap() を None に対して呼ぶとどうなる?",
      choices: [
        "パニック(プログラムが強制終了)する",
        "null が返る",
        "0 が返る",
        "コンパイルエラーになる"
      ],
      answer: 0,
      explanation: "unwrap() は None / Err のときパニックします。安全に扱うには match や if let、unwrap_or() を使います。"
    },
    {
      id: "rs-13",
      type: "choice",
      level: "上級",
      question: "次のコードの result の値はどれ?",
      code: 'let nums = vec![1, 2, 3, 4];\nlet result: i32 = nums.iter()\n    .filter(|x| *x % 2 == 0)\n    .sum();',
      choices: ["6", "10", "24", "4"],
      answer: 0,
      explanation: "filter で偶数 [2, 4] を残し、sum で合計するので 2 + 4 = 6 です。"
    },
    {
      id: "rs-14",
      type: "fill",
      level: "上級",
      question: "構造体にメソッドを実装するブロックを作るキーワードは?",
      answer: "impl",
      explanation: "impl Person { fn introduce(&self) ... } のように impl ブロックにメソッドを定義します。"
    },
    {
      id: "rs-15",
      type: "choice",
      level: "上級",
      question: "&str と String の説明として正しいのはどれ?",
      choices: [
        "&str は文字列スライス(借用)、String は所有権を持つ可変文字列",
        "&str の方が新しい書き方で String は非推奨",
        "String は数値も格納できる",
        "両者はまったく同じもの"
      ],
      answer: 0,
      explanation: "\"hello\" のようなリテラルは &str、実行時に組み立てる文字列は String::from() や format! で作る String を使います。"
    }
  ]
};
