window.LEARN_DATA = window.LEARN_DATA || {};
window.LEARN_DATA.csharp = {
  name: "C#",
  color: "#68217a",
  tagline: "Microsoft 製の静的型付け言語。Windows アプリ、Unity ゲーム、Web (ASP.NET) で活躍。",
  docs: [
    {
      id: "basics",
      title: "基本と変数",
      body: `
<p>C# は<strong>静的型付け言語</strong>で、変数には型があります。文は必ずセミコロン <code>;</code> で終わります。</p>
<pre><code>string name = "太郎";     // 文字列
int age = 20;             // 整数
double height = 170.5;    // 浮動小数点数
bool isStudent = true;    // 真偽値

// var を使うと型をコンパイラが推論してくれる
var city = "東京";        // string と推論される

Console.WriteLine($"{name}さんは{age}歳です");  // $"..." で文字列補間</code></pre>
<h2>ポイント</h2>
<ul>
<li>ブロックは波かっこ <code>{ }</code> で表す</li>
<li>コメントは <code>//</code>(1行)または <code>/* */</code>(複数行)</li>
<li>変数名はキャメルケース(<code>userName</code>)、クラス名はパスカルケース(<code>UserAccount</code>)が慣習</li>
<li><code>var</code> は「型がない」のではなく「型を推論させる」だけ(型は固定される)</li>
</ul>`
    },
    {
      id: "types",
      title: "データ型と型変換",
      body: `
<h2>主な型</h2>
<pre><code>int i = 100;          // 32ビット整数
long l = 10000000000; // 64ビット整数
double d = 3.14;      // 倍精度浮動小数点数
decimal m = 19.99m;   // 高精度(金額計算向き)
char c = 'A';         // 1文字(シングルクォート)
string s = "ABC";     // 文字列(ダブルクォート)
bool b = true;        // 真偽値</code></pre>
<h2>型変換</h2>
<pre><code>int num = int.Parse("42");          // 文字列 → 整数(失敗すると例外)
bool ok = int.TryParse("42", out int result);  // 失敗しても例外を出さない
string text = 123.ToString();       // 数値 → 文字列
double x = 10;                      // int → double は暗黙変換OK
int y = (int)3.99;                  // double → int はキャストが必要(3 になる)</code></pre>
<p><code>null</code> を許容する型は <code>int?</code> のように <code>?</code> を付けます(null許容型)。</p>`
    },
    {
      id: "control",
      title: "制御構文 (if / for / while / switch)",
      body: `
<h2>条件分岐</h2>
<pre><code>int score = 85;
if (score >= 80)
{
    Console.WriteLine("合格");
}
else if (score >= 60)
{
    Console.WriteLine("再試験");
}
else
{
    Console.WriteLine("不合格");
}</code></pre>
<h2>switch 文と switch 式</h2>
<pre><code>string rank = score switch
{
    >= 80 => "A",
    >= 60 => "B",
    _     => "C"   // _ はどれにも当てはまらない場合
};</code></pre>
<h2>ループ</h2>
<pre><code>for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);          // 0〜4
}

string[] fruits = { "りんご", "みかん" };
foreach (string fruit in fruits)   // コレクションの列挙は foreach
{
    Console.WriteLine(fruit);
}

int n = 0;
while (n < 3) { n++; }</code></pre>`
    },
    {
      id: "methods",
      title: "メソッド",
      body: `
<p>C# の関数は<strong>メソッド</strong>と呼ばれ、クラスの中に定義します。戻り値の型を先頭に書きます。</p>
<pre><code>class Calculator
{
    // int を返すメソッド
    public int Add(int a, int b)
    {
        return a + b;
    }

    // 戻り値なしは void
    public void PrintSum(int a, int b)
    {
        Console.WriteLine(Add(a, b));
    }

    // 式形式(1行なら => で書ける)
    public int Square(int x) => x * x;
}</code></pre>
<h2>ポイント</h2>
<ul>
<li>デフォルト引数: <code>void Greet(string name = "ゲスト")</code></li>
<li>名前付き引数: <code>Greet(name: "太郎")</code></li>
<li><code>static</code> を付けるとインスタンスを作らずに呼べる(<code>Math.Max(1, 2)</code> など)</li>
</ul>`
    },
    {
      id: "collections",
      title: "配列とコレクション (List / Dictionary)",
      body: `
<h2>配列(固定長)</h2>
<pre><code>int[] nums = { 1, 2, 3 };
nums[0];         // 1
nums.Length;     // 3</code></pre>
<h2>List(可変長リスト)</h2>
<pre><code>var list = new List&lt;int&gt; { 1, 2, 3 };
list.Add(4);          // 追加
list.Remove(1);       // 値を指定して削除
list.Count;           // 要素数(配列は Length、List は Count)</code></pre>
<h2>Dictionary(キーと値)</h2>
<pre><code>var user = new Dictionary&lt;string, string&gt;
{
    ["name"] = "太郎",
    ["city"] = "東京"
};
user["name"];                       // "太郎"
if (user.TryGetValue("age", out var age))  // 安全な取得
{
    Console.WriteLine(age);
}</code></pre>
<p><code>List&lt;int&gt;</code> の <code>&lt;int&gt;</code> は<strong>ジェネリクス</strong>で、格納する型を指定します。</p>`
    },
    {
      id: "class",
      title: "クラスとプロパティ",
      body: `
<p>C# はオブジェクト指向言語で、すべてのコードはクラス(または構造体)に属します。</p>
<pre><code>class Person
{
    // 自動実装プロパティ(get/set を自動生成)
    public string Name { get; set; }
    public int Age { get; private set; }   // 外部からは読み取り専用

    // コンストラクタ(クラス名と同じ名前)
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public string Introduce() => $"{Name}({Age}歳)です";
}

var p = new Person("太郎", 20);   // new でインスタンス生成
Console.WriteLine(p.Introduce());</code></pre>
<h2>継承とインターフェース</h2>
<pre><code>interface IAnimal { string Cry(); }

class Dog : IAnimal            // : で継承・実装
{
    public string Cry() => "ワン!";
}</code></pre>`
    },
    {
      id: "errors",
      title: "例外処理 (try / catch)",
      body: `
<pre><code>try
{
    int num = int.Parse("abc");   // FormatException が発生
}
catch (FormatException e)
{
    Console.WriteLine($"変換エラー: {e.Message}");
}
catch (Exception e)               // その他すべての例外
{
    Console.WriteLine($"エラー: {e.Message}");
}
finally
{
    Console.WriteLine("必ず実行される");
}</code></pre>
<h2>例外を投げる</h2>
<pre><code>void SetAge(int age)
{
    if (age < 0)
        throw new ArgumentException("年齢は0以上にしてください");
}</code></pre>
<ul>
<li>よく見る例外: <code>NullReferenceException</code>, <code>FormatException</code>, <code>ArgumentException</code>, <code>IndexOutOfRangeException</code></li>
<li>捕捉は「具体的な例外 → 一般的な例外」の順に書く</li>
</ul>`
    },
    {
      id: "linq",
      title: "LINQ(コレクション操作)",
      body: `
<p><strong>LINQ</strong> は配列やリストを SQL のように宣言的に処理できる C# の強力な機能です。<code>using System.Linq;</code> で使えます。</p>
<pre><code>var nums = new List&lt;int&gt; { 5, 3, 8, 1, 9 };

var evens   = nums.Where(x => x % 2 == 0).ToList();  // 絞り込み → [8]
var doubled = nums.Select(x => x * 2).ToList();      // 変換 → [10, 6, 16, 2, 18]
var sorted  = nums.OrderBy(x => x).ToList();         // 昇順 → [1, 3, 5, 8, 9]
var total   = nums.Sum();                            // 26
var top     = nums.Max();                            // 9
bool hasBig = nums.Any(x => x > 8);                  // true</code></pre>
<h2>メソッドチェーン</h2>
<pre><code>var result = nums
    .Where(x => x > 2)       // 2より大きい
    .OrderByDescending(x => x)
    .Take(2)                 // 上位2件
    .ToList();               // [9, 8]</code></pre>
<p><code>x => x * 2</code> は<strong>ラムダ式</strong>(その場で書く小さな関数)です。</p>`
    }
  ],
  quiz: [
    {
      id: "cs-1",
      type: "choice",
      level: "基礎",
      question: "C# で文字列型を宣言する正しいキーワードはどれ?",
      choices: ["string", "String型は存在しない", "str", "text"],
      answer: 0,
      explanation: "C# の文字列型は string です(System.String の別名)。Python のような str ではありません。"
    },
    {
      id: "cs-2",
      type: "choice",
      level: "基礎",
      question: "C# の変数宣言 var name = \"太郎\"; の説明として正しいのはどれ?",
      choices: [
        "コンパイラが型を string と推論し、以後型は固定される",
        "name はどんな型の値でも再代入できる",
        "実行時まで型が決まらない",
        "var は定数を宣言するキーワード"
      ],
      answer: 0,
      explanation: "var は型推論であり動的型ではありません。一度 string と推論されたら他の型は代入できません。"
    },
    {
      id: "cs-3",
      type: "fill",
      level: "基礎",
      question: "コレクションの全要素を順に処理するループのキーワードは?(for ではない方)",
      answer: "foreach",
      explanation: "foreach (var item in collection) { ... } でコレクションを列挙します。"
    },
    {
      id: "cs-4",
      type: "choice",
      level: "基礎",
      question: "次のコードの出力はどれ?",
      code: 'int x = (int)3.99;\nConsole.WriteLine(x);',
      choices: ["3", "4", "3.99", "エラーになる"],
      answer: 0,
      explanation: "double から int へのキャストは小数点以下を切り捨てます(四捨五入ではない)。"
    },
    {
      id: "cs-5",
      type: "choice",
      level: "基礎",
      question: "戻り値を返さないメソッドの戻り値の型はどれ?",
      choices: ["void", "null", "none", "empty"],
      answer: 0,
      explanation: "戻り値なしのメソッドは void を指定します。例: public void Print() { ... }"
    },
    {
      id: "cs-6",
      type: "fill",
      level: "基礎",
      question: "クラスからインスタンスを生成するときに使う演算子(キーワード)は?",
      answer: "new",
      explanation: "var p = new Person(...); のように new でインスタンスを生成します。"
    },
    {
      id: "cs-7",
      type: "choice",
      level: "中級",
      question: "配列と List<T> の要素数を取得するプロパティの正しい組み合わせはどれ?",
      choices: [
        "配列は Length、List は Count",
        "配列は Count、List は Length",
        "どちらも Size",
        "どちらも len()"
      ],
      answer: 0,
      explanation: "配列は Length プロパティ、List<T> は Count プロパティです。混同しやすいので注意しましょう。"
    },
    {
      id: "cs-8",
      type: "choice",
      level: "中級",
      question: "次のコードの出力はどれ?",
      code: 'var nums = new List<int> { 5, 3, 8, 1 };\nvar result = nums.Where(x => x > 3).ToList();\nConsole.WriteLine(string.Join(",", result));',
      choices: ["5,8", "3,5,8", "8", "5,3,8,1"],
      answer: 0,
      explanation: "Where は条件を満たす要素だけを残す LINQ メソッドです。3 より大きいのは 5 と 8 です。"
    },
    {
      id: "cs-9",
      type: "choice",
      level: "中級",
      question: "int? age = null; の int? が表すものはどれ?",
      choices: [
        "null を代入できる int(null許容型)",
        "整数の配列",
        "読み取り専用の int",
        "まだ型が決まっていない変数"
      ],
      answer: 0,
      explanation: "int? は Nullable<int> の省略形で、通常は null を持てない値型に null を許容させます。"
    },
    {
      id: "cs-10",
      type: "fill",
      level: "中級",
      question: "例外を捕まえるときに try と組み合わせて使うキーワードは?",
      answer: "catch",
      explanation: "C# では try / catch / finally で例外を処理します(Python の except に相当)。"
    },
    {
      id: "cs-11",
      type: "choice",
      level: "中級",
      question: "プロパティ public string Name { get; private set; } の説明として正しいのはどれ?",
      choices: [
        "外部から読み取れるが、書き込みはクラス内部からのみ可能",
        "外部から書き込めるが、読み取りはクラス内部からのみ可能",
        "読み書きとも外部から自由にできる",
        "コンパイルエラーになる"
      ],
      answer: 0,
      explanation: "get は public、set は private なので、外からは読み取り専用になります。"
    },
    {
      id: "cs-12",
      type: "choice",
      level: "中級",
      question: "LINQ の Select メソッドの役割はどれ?",
      choices: [
        "各要素を変換して新しいシーケンスを作る",
        "条件に合う要素だけを残す",
        "要素を並べ替える",
        "要素の合計を計算する"
      ],
      answer: 0,
      explanation: "Select は写像(変換)です。絞り込みは Where、並べ替えは OrderBy、合計は Sum です。"
    },
    {
      id: "cs-13",
      type: "choice",
      level: "上級",
      question: "int.Parse と int.TryParse の違いとして正しいのはどれ?",
      choices: [
        "Parse は失敗すると例外を投げるが、TryParse は false を返す",
        "TryParse は失敗すると例外を投げるが、Parse は false を返す",
        "機能はまったく同じ",
        "TryParse は小数のみ変換できる"
      ],
      answer: 0,
      explanation: "int.Parse(\"abc\") は FormatException を投げますが、int.TryParse は bool で成否を返すため安全です。"
    },
    {
      id: "cs-14",
      type: "choice",
      level: "上級",
      question: "次のコードの出力はどれ?",
      code: 'string rank = 75 switch\n{\n    >= 80 => "A",\n    >= 60 => "B",\n    _     => "C"\n};\nConsole.WriteLine(rank);',
      choices: ["B", "A", "C", "エラーになる"],
      answer: 0,
      explanation: "switch 式は上から順に評価されます。75 は >= 80 を満たさず >= 60 を満たすので \"B\" です。"
    },
    {
      id: "cs-15",
      type: "fill",
      level: "上級",
      question: "インスタンスを作らずにクラスから直接呼べるメソッドにするための修飾子は?",
      answer: "static",
      explanation: "static メソッドはインスタンス不要で ClassName.Method() の形で呼び出せます。例: Math.Max(1, 2)"
    }
  ]
};
