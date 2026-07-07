window.LEARN_DATA = window.LEARN_DATA || {};
window.LEARN_DATA.typescript = {
  name: "TypeScript",
  color: "#3178c6",
  tagline: "JavaScript に型を加えた言語。フロントエンドからサーバーまで Web 開発の定番。",
  docs: [
    {
      id: "basics",
      title: "基本と変数",
      body: `
<p>TypeScript は <strong>JavaScript に静的型付けを加えた言語</strong>です。コンパイル(トランスパイル)すると JavaScript になります。</p>
<pre><code>let name: string = "太郎";   // 型注釈付き
let age = 20;                // 型推論で number になる
const PI = 3.14;             // 再代入不可の定数

console.log(\`\${name}さんは\${age}歳です\`);  // テンプレートリテラル(バッククォート)</code></pre>
<h2>ポイント</h2>
<ul>
<li><code>let</code> は再代入可、<code>const</code> は再代入不可。<code>var</code> は古い書き方なので使わない</li>
<li>型注釈は <code>変数名: 型</code> の形。初期値があれば省略しても推論される</li>
<li>文字列の埋め込みはバッククォート <code>\`\${...}\`</code></li>
<li>変数名はキャメルケース(<code>userName</code>)が慣習</li>
</ul>`
    },
    {
      id: "types",
      title: "型システムの基本",
      body: `
<h2>基本の型</h2>
<pre><code>let s: string = "hello";
let n: number = 42;        // 整数も小数も number
let b: boolean = true;
let arr: number[] = [1, 2, 3];        // 配列
let tuple: [string, number] = ["太郎", 20];  // タプル
let anything: any = "何でも入る";      // any は型チェックを放棄(乱用注意)
let u: unknown = getValue();           // any より安全な「不明」型</code></pre>
<h2>ユニオン型とリテラル型</h2>
<pre><code>let id: string | number = 123;   // どちらかの型を許す
id = "abc";                       // OK

type Status = "open" | "closed";  // 特定の文字列だけ許す
let s2: Status = "open";          // "pending" はエラー</code></pre>
<h2>null / undefined</h2>
<pre><code>let maybe: string | null = null;
// strictNullChecks が有効なら、null チェックせずに使うとコンパイルエラー
if (maybe !== null) {
  console.log(maybe.length);      // ここでは string と確定
}</code></pre>`
    },
    {
      id: "control",
      title: "制御構文と演算子",
      body: `
<h2>条件分岐とループ</h2>
<pre><code>const score = 85;
if (score >= 80) {
  console.log("合格");
} else if (score >= 60) {
  console.log("再試験");
} else {
  console.log("不合格");
}

for (let i = 0; i < 5; i++) { }        // 通常の for

const fruits = ["りんご", "みかん"];
for (const fruit of fruits) { }        // 要素を取り出す for...of

fruits.forEach((fruit) => console.log(fruit));  // メソッドでも書ける</code></pre>
<h2>等価演算子は === を使う</h2>
<pre><code>1 == "1"    // true  (型変換して比較 — バグの元)
1 === "1"   // TSでは型エラー / JSでは false(型も比較)</code></pre>
<h2>便利な演算子</h2>
<pre><code>const value = input ?? "デフォルト";  // null合体: null/undefined なら右側
const len = user?.name?.length;        // オプショナルチェーン: 途中が無ければ undefined
const label = ok ? "OK" : "NG";        // 三項演算子</code></pre>`
    },
    {
      id: "functions",
      title: "関数とアロー関数",
      body: `
<pre><code>// 関数宣言(引数と戻り値に型を付ける)
function add(a: number, b: number): number {
  return a + b;
}

// アロー関数(現代のTS/JSで最もよく使う)
const multiply = (a: number, b: number): number => a * b;

// 省略可能な引数(?)とデフォルト値
function greet(name: string, greeting: string = "こんにちは"): string {
  return \`\${greeting}、\${name}さん\`;
}

// 戻り値なしは void
function log(message: string): void {
  console.log(message);
}</code></pre>
<h2>コールバックとしてのアロー関数</h2>
<pre><code>const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);     // [2, 4, 6, 8]
const evens = nums.filter((n) => n % 2 === 0);  // [2, 4]
const sum = nums.reduce((acc, n) => acc + n, 0); // 10</code></pre>`
    },
    {
      id: "interface",
      title: "インターフェースと型エイリアス",
      body: `
<p>オブジェクトの形(プロパティと型)を定義するのに <code>interface</code> や <code>type</code> を使います。</p>
<pre><code>interface User {
  name: string;
  age: number;
  email?: string;          // ? は省略可能なプロパティ
  readonly id: number;     // readonly は変更不可
}

const user: User = { name: "太郎", age: 20, id: 1 };
user.age = 21;      // OK
// user.id = 2;     // エラー: readonly</code></pre>
<h2>type エイリアス</h2>
<pre><code>type Point = { x: number; y: number };
type ID = string | number;             // ユニオン型に名前を付けられる</code></pre>
<h2>interface と type の使い分け</h2>
<ul>
<li>オブジェクトの形には <code>interface</code>(拡張 <code>extends</code> がしやすい)</li>
<li>ユニオン型・タプルなどには <code>type</code></li>
<li>迷ったらチーム内でどちらかに統一すればOK</li>
</ul>`
    },
    {
      id: "class",
      title: "クラスとジェネリクス",
      body: `
<h2>クラス</h2>
<pre><code>class Person {
  // コンストラクタ引数に修飾子を付けるとプロパティ宣言も兼ねる
  constructor(
    public name: string,
    private age: number,
  ) {}

  introduce(): string {
    return \`\${this.name}(\${this.age}歳)です\`;
  }
}

const p = new Person("太郎", 20);
console.log(p.name);   // OK(public)
// p.age               // エラー(private)</code></pre>
<h2>ジェネリクス</h2>
<p>型を引数のように受け取る仕組みです。</p>
<pre><code>function first&lt;T&gt;(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]);        // n は number | undefined
const s = first(["a", "b"]);       // s は string | undefined</code></pre>`
    },
    {
      id: "async",
      title: "非同期処理 (Promise / async / await)",
      body: `
<p>通信など時間のかかる処理は <strong>Promise</strong> で表現し、<code>async / await</code> で同期処理のように書けます。</p>
<pre><code>// fetch は Promise を返す
async function fetchUser(id: number): Promise&lt;User&gt; {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) {
    throw new Error(\`HTTP \${res.status}\`);
  }
  return await res.json();
}

// 呼び出し側も await する(await は async 関数の中でのみ使える)
async function main() {
  try {
    const user = await fetchUser(1);
    console.log(user.name);
  } catch (e) {
    console.error("取得失敗:", e);
  }
}</code></pre>
<h2>ポイント</h2>
<ul>
<li><code>async</code> 関数の戻り値は必ず <code>Promise</code> に包まれる</li>
<li><code>await</code> は Promise の完了を待って中身を取り出す</li>
<li>複数を並行で待つには <code>await Promise.all([p1, p2])</code></li>
</ul>`
    },
    {
      id: "modern",
      title: "モダンな書き方(分割代入・スプレッド)",
      body: `
<h2>分割代入</h2>
<pre><code>const user = { name: "太郎", age: 20 };
const { name, age } = user;          // オブジェクトから取り出す

const nums = [1, 2, 3];
const [firstNum, secondNum] = nums;  // 配列から取り出す</code></pre>
<h2>スプレッド構文</h2>
<pre><code>const base = { name: "太郎", age: 20 };
const updated = { ...base, age: 21 };   // コピーして一部だけ変更

const a = [1, 2];
const b = [...a, 3, 4];                 // [1, 2, 3, 4]</code></pre>
<h2>モジュール (import / export)</h2>
<pre><code>// util.ts
export function double(n: number): number { return n * 2; }
export const VERSION = "1.0";

// main.ts
import { double, VERSION } from "./util";</code></pre>
<p>イミュータブル(元のオブジェクトを変更せずコピーを作る)な書き方は React などのフレームワークで特に重要です。</p>`
    }
  ],
  quiz: [
    {
      id: "ts-1",
      type: "choice",
      level: "基礎",
      question: "再代入しない変数を宣言するのに最も適切なキーワードはどれ?",
      choices: ["const", "let", "var", "static"],
      answer: 0,
      explanation: "再代入不可の const を基本とし、再代入が必要なときだけ let を使います。var は使いません。"
    },
    {
      id: "ts-2",
      type: "choice",
      level: "基礎",
      question: "TypeScript で変数に型注釈を付ける正しい書き方はどれ?",
      choices: ['let name: string = "太郎"', 'let string name = "太郎"', 'string name = "太郎"', 'let name = (string)"太郎"'],
      answer: 0,
      explanation: "TypeScript の型注釈は「変数名: 型」の形式で、変数名の後ろに書きます。"
    },
    {
      id: "ts-3",
      type: "choice",
      level: "基礎",
      question: "次のコードの出力はどれ?",
      code: 'const nums = [1, 2, 3];\nconst doubled = nums.map((n) => n * 2);\nconsole.log(doubled);',
      choices: ["[2, 4, 6]", "[1, 2, 3]", "[1, 2, 3, 1, 2, 3]", "6"],
      answer: 0,
      explanation: "map は各要素に関数を適用した新しい配列を返します。元の配列は変更されません。"
    },
    {
      id: "ts-4",
      type: "fill",
      level: "基礎",
      question: "値と型の両方が等しいことを比較する演算子は?(記号で)",
      answer: "===",
      explanation: "== は型変換を伴い意図しない結果になるため、厳密等価の === を使うのが原則です。"
    },
    {
      id: "ts-5",
      type: "choice",
      level: "基礎",
      question: "文字列型と数値型の両方を許す型の書き方はどれ?",
      choices: ["string | number", "string & number", "string + number", "(string, number)"],
      answer: 0,
      explanation: "| はユニオン型で「どちらかの型」を表します。& は交差型で「両方の性質を持つ型」です。"
    },
    {
      id: "ts-6",
      type: "choice",
      level: "中級",
      question: "interface のプロパティ email?: string の ? の意味はどれ?",
      choices: ["省略可能なプロパティ", "null しか入らない", "読み取り専用", "非公開プロパティ"],
      answer: 0,
      explanation: "? を付けたプロパティは省略できます(値は string | undefined になります)。"
    },
    {
      id: "ts-7",
      type: "fill",
      level: "中級",
      question: "Promise の完了を待って結果を取り出すキーワードは?",
      answer: "await",
      explanation: "await は async 関数の中で Promise の解決を待ちます。"
    },
    {
      id: "ts-8",
      type: "choice",
      level: "中級",
      question: "次のコードの出力はどれ?",
      code: 'const input: string | null = null;\nconst value = input ?? "デフォルト";\nconsole.log(value);',
      choices: ["デフォルト", "null", "undefined", "エラーになる"],
      answer: 0,
      explanation: "?? (null合体演算子) は左辺が null または undefined のとき右辺を返します。"
    },
    {
      id: "ts-9",
      type: "choice",
      level: "中級",
      question: "async 関数の戻り値の型として正しいのはどれ?",
      code: 'async function getName(): ??? {\n  return "太郎";\n}',
      choices: ["Promise<string>", "string", "await string", "async<string>"],
      answer: 0,
      explanation: "async 関数の戻り値は必ず Promise に包まれるため Promise<string> になります。"
    },
    {
      id: "ts-10",
      type: "choice",
      level: "中級",
      question: "次のコードの出力はどれ?",
      code: 'const base = { name: "太郎", age: 20 };\nconst updated = { ...base, age: 21 };\nconsole.log(updated.age, base.age);',
      choices: ["21 20", "21 21", "20 20", "20 21"],
      answer: 0,
      explanation: "スプレッド構文はコピーを作るため、updated.age は 21 になり、元の base.age は 20 のままです。"
    },
    {
      id: "ts-11",
      type: "choice",
      level: "中級",
      question: "user?.name の ?.(オプショナルチェーン)の動作はどれ?",
      choices: [
        "user が null / undefined なら undefined を返し、エラーにしない",
        "user が null ならエラーを投げる",
        "name プロパティを削除する",
        "user を必ず string に変換する"
      ],
      answer: 0,
      explanation: "?. は途中が null / undefined のとき評価を止めて undefined を返すため、安全にプロパティへアクセスできます。"
    },
    {
      id: "ts-12",
      type: "fill",
      level: "中級",
      question: "他のファイルから関数や変数を読み込むときに使うキーワードは?",
      answer: "import",
      explanation: "import { double } from \"./util\"; のように読み込みます。公開する側は export を使います。"
    },
    {
      id: "ts-13",
      type: "choice",
      level: "上級",
      question: "ジェネリクス function first<T>(items: T[]): T の T の意味はどれ?",
      choices: [
        "呼び出し時に決まる型パラメータ",
        "タプル型の略",
        "テスト専用の型",
        "常に any と同じ意味"
      ],
      answer: 0,
      explanation: "T は型パラメータで、first([1,2]) なら T = number、first([\"a\"]) なら T = string と呼び出しごとに決まります。"
    },
    {
      id: "ts-14",
      type: "choice",
      level: "上級",
      question: "any と unknown の違いとして正しいのはどれ?",
      choices: [
        "unknown は型チェックしてからでないと使えないが、any は何でも許されてしまう",
        "any の方が unknown より安全",
        "unknown は数値のみ格納できる",
        "両者に違いはない"
      ],
      answer: 0,
      explanation: "any は型チェックを完全に放棄します。unknown は使う前に型の絞り込みが必須なので安全です。"
    },
    {
      id: "ts-15",
      type: "choice",
      level: "上級",
      question: "次のコードの出力はどれ?",
      code: 'const nums = [1, 2, 3, 4];\nconst result = nums\n  .filter((n) => n % 2 === 0)\n  .reduce((acc, n) => acc + n, 0);\nconsole.log(result);',
      choices: ["6", "10", "24", "[2, 4]"],
      answer: 0,
      explanation: "filter で偶数 [2, 4] を残し、reduce で合計するので 2 + 4 = 6 です。"
    }
  ]
};
