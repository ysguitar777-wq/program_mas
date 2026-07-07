window.LEARN_DATA = window.LEARN_DATA || {};
window.LEARN_DATA.python = {
  name: "Python",
  color: "#3776ab",
  tagline: "シンプルな文法で学びやすく、AI・データ分析・Web など幅広く使われる言語。",
  docs: [
    {
      id: "basics",
      title: "基本と変数",
      body: `
<p>Python は<strong>インデント(字下げ)でブロックを表す</strong>のが最大の特徴です。変数は型を書かずに代入するだけで作れます。</p>
<pre><code>name = "太郎"      # 文字列
age = 20           # 整数
height = 170.5     # 浮動小数点数
is_student = True  # 真偽値 (True / False)

print(f"{name}さんは{age}歳です")  # f文字列で埋め込み</code></pre>
<h2>ポイント</h2>
<ul>
<li>行末のセミコロンは不要</li>
<li>コメントは <code>#</code> から行末まで</li>
<li><code>f"..."</code>(f文字列)で変数を <code>{}</code> に埋め込める</li>
<li>変数名はスネークケース(<code>user_name</code>)が慣習</li>
</ul>`
    },
    {
      id: "types",
      title: "データ型",
      body: `
<p>Python の主な組み込み型は次のとおりです。<code>type()</code> で型を確認できます。</p>
<pre><code>i = 10          # int(整数)
f = 3.14        # float(浮動小数点数)
s = "hello"     # str(文字列)
b = True        # bool(真偽値)
n = None        # None(値が無いことを表す)

print(type(i))  # &lt;class 'int'&gt;</code></pre>
<h2>型変換</h2>
<pre><code>num = int("42")      # 文字列 → 整数
text = str(3.14)     # 数値 → 文字列
pi = float("3.14")   # 文字列 → 浮動小数点数</code></pre>
<p>文字列と数値は自動では連結できません。<code>"age: " + str(20)</code> のように明示的に変換します。</p>`
    },
    {
      id: "control",
      title: "制御構文 (if / for / while)",
      body: `
<h2>条件分岐</h2>
<pre><code>score = 85
if score >= 80:
    print("合格")
elif score >= 60:
    print("再試験")
else:
    print("不合格")</code></pre>
<p><code>elif</code>(else if の意味)と <code>else</code> は省略可能です。条件式に括弧は不要です。</p>
<h2>ループ</h2>
<pre><code>for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

fruits = ["りんご", "みかん"]
for fruit in fruits:      # リストの要素を順に取り出す
    print(fruit)

n = 0
while n < 3:              # 条件が True の間繰り返す
    n += 1</code></pre>
<ul>
<li><code>break</code> でループを抜け、<code>continue</code> で次の周回へ進む</li>
<li><code>range(start, stop)</code> は stop を<strong>含まない</strong></li>
</ul>`
    },
    {
      id: "functions",
      title: "関数",
      body: `
<p>関数は <code>def</code> で定義します。戻り値は <code>return</code> で返します。</p>
<pre><code>def greet(name, greeting="こんにちは"):
    """あいさつ文を返す関数(docstring)"""
    return f"{greeting}、{name}さん"

print(greet("太郎"))                  # こんにちは、太郎さん
print(greet("花子", greeting="やあ"))  # やあ、花子さん</code></pre>
<h2>ポイント</h2>
<ul>
<li>デフォルト引数(<code>greeting="こんにちは"</code>)で省略可能な引数を作れる</li>
<li>キーワード引数(<code>greeting="やあ"</code>)で名前を指定して渡せる</li>
<li><code>return</code> が無い関数は <code>None</code> を返す</li>
<li>ラムダ式 <code>lambda x: x * 2</code> で小さな無名関数も書ける</li>
</ul>`
    },
    {
      id: "collections",
      title: "コレクション (list / dict / tuple / set)",
      body: `
<h2>リスト(順序あり・変更可)</h2>
<pre><code>nums = [1, 2, 3]
nums.append(4)      # 末尾に追加 → [1, 2, 3, 4]
nums[0]             # 1(先頭は添字 0)
nums[-1]            # 4(負の添字は末尾から)
nums[1:3]           # [2, 3](スライス)
len(nums)           # 4(要素数)</code></pre>
<h2>辞書(キーと値のペア)</h2>
<pre><code>user = {"name": "太郎", "age": 20}
user["name"]            # "太郎"
user["email"] = "t@example.com"   # 追加
for key, value in user.items():
    print(key, value)</code></pre>
<h2>タプルとセット</h2>
<pre><code>point = (10, 20)     # タプル: 変更不可
tags = {"a", "b"}    # セット: 重複なし・順序なし</code></pre>`
    },
    {
      id: "class",
      title: "クラスとオブジェクト",
      body: `
<p>クラスは <code>class</code> で定義し、<code>__init__</code> が初期化メソッド(コンストラクタ)です。メソッドの第1引数は必ず <code>self</code> になります。</p>
<pre><code>class Dog:
    def __init__(self, name):
        self.name = name          # インスタンス変数

    def bark(self):
        return f"{self.name}: ワン!"

dog = Dog("ポチ")       # インスタンス生成(new は不要)
print(dog.bark())       # ポチ: ワン!</code></pre>
<h2>継承</h2>
<pre><code>class Puppy(Dog):
    def bark(self):                    # メソッドの上書き(オーバーライド)
        return f"{self.name}: きゃん!"</code></pre>
<p>親クラスのメソッドは <code>super().bark()</code> のように呼び出せます。</p>`
    },
    {
      id: "errors",
      title: "エラー処理 (try / except)",
      body: `
<p>実行時エラー(例外)は <code>try / except</code> で捕まえます。</p>
<pre><code>try:
    num = int("abc")           # ValueError が発生
except ValueError as e:
    print(f"変換エラー: {e}")
except Exception as e:
    print(f"その他のエラー: {e}")
else:
    print("エラーなし")         # 例外が出なかった時のみ
finally:
    print("必ず実行される")</code></pre>
<h2>例外を投げる</h2>
<pre><code>def set_age(age):
    if age < 0:
        raise ValueError("年齢は0以上にしてください")</code></pre>
<ul>
<li>よく見る例外: <code>ValueError</code>, <code>TypeError</code>, <code>KeyError</code>, <code>IndexError</code>, <code>ZeroDivisionError</code></li>
<li><code>finally</code> はエラーの有無にかかわらず必ず実行される(後片付けに使う)</li>
</ul>`
    },
    {
      id: "pythonic",
      title: "Python らしい書き方(内包表記など)",
      body: `
<h2>リスト内包表記</h2>
<p>ループでリストを作る処理を 1 行で書けます。</p>
<pre><code>squares = [x ** 2 for x in range(5)]          # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]  # 条件付き</code></pre>
<h2>よく使う組み込み関数</h2>
<pre><code>nums = [3, 1, 4, 1, 5]
sorted(nums)          # [1, 1, 3, 4, 5]
sum(nums)             # 14
max(nums), min(nums)  # 5, 1
list(enumerate(nums)) # [(0, 3), (1, 1), ...] 添字付きループに便利</code></pre>
<h2>with 文(リソース管理)</h2>
<pre><code>with open("data.txt", encoding="utf-8") as f:
    text = f.read()
# with を抜けると自動でファイルが閉じられる</code></pre>`
    },
    {
      id: "numpy-pandas",
      title: "応用: データ分析 (NumPy / pandas)",
      body: `
<p>ここからは応用編です。Python がAI・データ分析で選ばれる最大の理由が <strong>NumPy</strong> と <strong>pandas</strong> です。まずインストールします。</p>
<pre><code># 仮想環境を作ってからインストールするのが基本
python -m venv .venv
source .venv/bin/activate   # Windows は .venv\\Scripts\\activate
pip install numpy pandas</code></pre>
<h2>NumPy — 高速な数値計算</h2>
<pre><code>import numpy as np

arr = np.array([1, 2, 3, 4])
arr * 2          # ループ不要で全要素を一括計算 → [2 4 6 8]
arr.mean()       # 2.5(平均)
arr.reshape(2, 2)  # 形状変更(行列に)

# 100万件でもforループの数十倍高速に計算できる</code></pre>
<h2>pandas — 表形式データの操作</h2>
<p>Excel の表のようなデータを <code>DataFrame</code> として扱います。</p>
<pre><code>import pandas as pd

df = pd.read_csv("sales.csv")     # CSVを読み込む(Excelはread_excel)
df.head()                          # 先頭5行を確認
df.info()                          # 列の型・欠損を確認

df["price"].mean()                 # 列の平均
df[df["price"] > 1000]             # 条件で行を絞り込み
df.groupby("category")["price"].sum()   # カテゴリ別に集計
df.sort_values("date")             # 並べ替え
df.dropna()                        # 欠損値のある行を除去</code></pre>
<ul>
<li>分析の流れ: <strong>読み込み → 確認(head/info) → 前処理(欠損・型) → 集計/分析</strong></li>
<li>大規模データには高速な <code>Polars</code> という選択肢もある</li>
</ul>`
    },
    {
      id: "visualization",
      title: "応用: データ可視化 (Matplotlib)",
      body: `
<p>分析結果はグラフにすると一気に理解しやすくなります。定番は <strong>Matplotlib</strong> です。</p>
<pre><code>pip install matplotlib</code></pre>
<h2>基本のグラフ</h2>
<pre><code>import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [10, 30, 25, 40, 55]

plt.plot(x, y, marker="o")     # 折れ線グラフ
plt.title("Sales Trend")
plt.xlabel("Month")
plt.ylabel("Sales")
plt.grid(True)
plt.show()                     # 画面に表示(plt.savefig("out.png")で保存)</code></pre>
<h2>よく使うグラフの種類</h2>
<pre><code>plt.bar(labels, values)        # 棒グラフ(カテゴリ比較)
plt.scatter(x, y)              # 散布図(2変数の関係)
plt.hist(data, bins=20)        # ヒストグラム(分布)
plt.pie(sizes, labels=labels)  # 円グラフ(構成比)</code></pre>
<h2>pandas との連携</h2>
<pre><code># DataFrame から直接グラフを描ける
df.groupby("category")["price"].sum().plot(kind="bar")
plt.show()</code></pre>
<ul>
<li><code>seaborn</code>: Matplotlib ベースで統計グラフを美しく簡単に描ける</li>
<li><code>Plotly</code>: マウスで操作できるインタラクティブなグラフ(Web向き)</li>
<li>グラフ選びの基本 — 推移は折れ線、比較は棒、関係は散布図、分布はヒストグラム</li>
</ul>`
    },
    {
      id: "sklearn",
      title: "応用: 機械学習入門 (scikit-learn)",
      body: `
<p><strong>scikit-learn</strong> は機械学習の定番ライブラリです。「データから規則性を学習して予測する」流れを最小のコードで体験できます。</p>
<pre><code>pip install scikit-learn</code></pre>
<h2>機械学習の基本の流れ</h2>
<ol>
<li>データを「学習用」と「テスト用」に分ける</li>
<li>モデルに学習させる(<code>fit</code>)</li>
<li>予測する(<code>predict</code>)</li>
<li>精度を評価する(<code>score</code>)</li>
</ol>
<pre><code>from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# 1. データ準備(あやめの品種分類データ)
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)

# 2. 学習
model = RandomForestClassifier()
model.fit(X_train, y_train)

# 3. 予測
pred = model.predict(X_test)

# 4. 評価
print(model.score(X_test, y_test))   # 正解率(例: 0.95)</code></pre>
<h2>代表的な問題のタイプ</h2>
<ul>
<li><strong>分類</strong>: カテゴリを当てる(迷惑メール判定など) — RandomForestClassifier, LogisticRegression</li>
<li><strong>回帰</strong>: 数値を予測する(家賃予測など) — LinearRegression, RandomForestRegressor</li>
<li><strong>クラスタリング</strong>: 似たものをグループ分け — KMeans</li>
</ul>
<p>どのモデルも <code>fit</code> → <code>predict</code> という同じ使い方なので、1つ覚えれば他にも応用できます。</p>`
    },
    {
      id: "deep-learning",
      title: "応用: ディープラーニングと生成AI",
      body: `
<p>画像認識や自然言語処理など複雑な問題には<strong>ディープラーニング</strong>(深層学習)を使います。Python はこの分野の事実上の標準言語です。</p>
<h2>PyTorch — ディープラーニングの定番</h2>
<pre><code>pip install torch</code></pre>
<pre><code>import torch
import torch.nn as nn

# テンソル(GPU で計算できる多次元配列)
x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
print(x * 2)

# ニューラルネットワークの定義(層を重ねる)
model = nn.Sequential(
    nn.Linear(4, 16),   # 入力4 → 中間16
    nn.ReLU(),          # 活性化関数
    nn.Linear(16, 3),   # 中間16 → 出力3クラス
)</code></pre>
<p>学習の流れは「順伝播 → 損失計算 → 逆伝播 → パラメータ更新」の繰り返しです。まずは scikit-learn で機械学習の流れを掴んでから進むと理解しやすいです。</p>
<h2>生成AIを使う・作る</h2>
<ul>
<li><strong>Hugging Face Transformers</strong>: 公開されている学習済みAIモデル(翻訳・要約・画像生成など)を数行で利用できる</li>
<li><strong>LLM API</strong>: Anthropic (Claude) や OpenAI などのAPIを Python から呼び出せば、自作アプリにチャットAIや文章生成を組み込める(各社が公式 Python SDK を提供)</li>
<li><strong>LangChain</strong>: LLM を使ったアプリ(RAG・エージェントなど)を組み立てるフレームワーク</li>
</ul>
<h2>学習ロードマップ</h2>
<ol>
<li>pandas でデータの扱いに慣れる</li>
<li>scikit-learn で機械学習の流れを掴む</li>
<li>PyTorch でディープラーニングの仕組みを学ぶ</li>
<li>API や Transformers で生成AIをアプリに組み込む</li>
</ol>`
    },
    {
      id: "py-ecosystem",
      title: "応用: 役立つライブラリと開発環境",
      body: `
<h2>開発環境</h2>
<ul>
<li><strong>venv</strong>: プロジェクトごとにライブラリを分離する仮想環境(標準機能)。<code>python -m venv .venv</code></li>
<li><strong>Jupyter Notebook / JupyterLab</strong>: コードと結果とメモを1つのノートにまとめられる。データ分析の必須ツール(VS Code でも使える)</li>
<li><strong>uv</strong>: 高速なパッケージ・環境管理ツール。pip の次世代として普及中</li>
</ul>
<h2>データ取得・Web</h2>
<ul>
<li><strong>requests</strong>: HTTP 通信の定番。<code>requests.get(url).json()</code> でAPIからデータ取得</li>
<li><strong>FastAPI</strong>: 高速でモダンなWeb API フレームワーク。機械学習モデルをAPI化して公開するのに最適</li>
<li><strong>Streamlit</strong>: Python だけでデータ分析アプリのWeb画面が作れる。デモやダッシュボードに便利</li>
</ul>
<pre><code># FastAPI の最小例: 学習済みモデルをAPIにする
from fastapi import FastAPI

app = FastAPI()

@app.get("/predict")
def predict(value: float):
    result = model.predict([[value]])   # 学習済みモデルで予測
    return {"prediction": result[0]}</code></pre>
<h2>その他の定番</h2>
<ul>
<li><strong>Polars</strong>: pandas より高速な DataFrame ライブラリ(Rust 製)</li>
<li><strong>openpyxl</strong>: Excel ファイルの読み書き(業務自動化に)</li>
<li><strong>pytest</strong>: テストの定番フレームワーク</li>
<li><strong>Pillow / OpenCV</strong>: 画像処理</li>
</ul>
<p>まずは <code>venv + pandas + Jupyter</code> の組み合わせから始めるのがおすすめです。</p>`
    }
  ],
  quiz: [
    {
      id: "py-1",
      type: "choice",
      level: "基礎",
      question: "Python でコードブロック(if文の中身など)を表すのに使うのはどれ?",
      choices: ["インデント(字下げ)", "波かっこ { }", "begin / end", "セミコロン"],
      answer: 0,
      explanation: "Python はインデントでブロックを表します。波かっこは使いません。"
    },
    {
      id: "py-2",
      type: "choice",
      level: "基礎",
      question: "次のコードの出力はどれ?",
      code: 'for i in range(3):\n    print(i)',
      choices: ["0 1 2", "1 2 3", "0 1 2 3", "エラーになる"],
      answer: 0,
      explanation: "range(3) は 0, 1, 2 を生成します。終端の 3 は含まれません。"
    },
    {
      id: "py-3",
      type: "fill",
      level: "基礎",
      question: "関数を定義するときに使うキーワードは?",
      answer: "def",
      explanation: "Python では def キーワードで関数を定義します。例: def greet(name):"
    },
    {
      id: "py-4",
      type: "choice",
      level: "基礎",
      question: "次のコードの出力はどれ?",
      code: 'nums = [10, 20, 30]\nprint(nums[-1])',
      choices: ["30", "10", "20", "エラーになる"],
      answer: 0,
      explanation: "負の添字は末尾から数えます。nums[-1] は最後の要素 30 です。"
    },
    {
      id: "py-5",
      type: "choice",
      level: "基礎",
      question: "文字列 \"42\" を整数に変換する正しい書き方はどれ?",
      choices: ['int("42")', 'str(42)', '"42".to_int()', 'Integer.parse("42")'],
      answer: 0,
      explanation: "int() で文字列を整数に変換します。str() は逆に数値を文字列にします。"
    },
    {
      id: "py-6",
      type: "fill",
      level: "基礎",
      question: "例外を捕まえるときに try と組み合わせて使うキーワードは?",
      answer: "except",
      explanation: "Python では try / except で例外を処理します(他言語の catch に相当)。"
    },
    {
      id: "py-7",
      type: "choice",
      level: "中級",
      question: "次のコードの出力はどれ?",
      code: 'squares = [x ** 2 for x in range(4)]\nprint(squares)',
      choices: ["[0, 1, 4, 9]", "[1, 4, 9, 16]", "[0, 1, 4, 9, 16]", "[2, 4, 6, 8]"],
      answer: 0,
      explanation: "リスト内包表記です。range(4) の 0〜3 をそれぞれ 2 乗して [0, 1, 4, 9] になります。"
    },
    {
      id: "py-8",
      type: "choice",
      level: "中級",
      question: "辞書 user = {\"name\": \"太郎\"} から存在しないキー \"age\" を user[\"age\"] で参照すると?",
      choices: ["KeyError が発生する", "None が返る", "0 が返る", "空文字列が返る"],
      answer: 0,
      explanation: "存在しないキーの参照は KeyError になります。user.get(\"age\") なら None が返り安全です。"
    },
    {
      id: "py-9",
      type: "fill",
      level: "基礎",
      question: "クラスの初期化メソッド(コンストラクタ)の名前は?(アンダースコア込みで)",
      answer: "__init__",
      explanation: "クラスのコンストラクタは __init__ メソッドとして定義します。"
    },
    {
      id: "py-10",
      type: "choice",
      level: "中級",
      question: "次のコードの出力はどれ?",
      code: 'def add(a, b=10):\n    return a + b\n\nprint(add(5))',
      choices: ["15", "5", "エラーになる", "None"],
      answer: 0,
      explanation: "b はデフォルト引数なので省略でき、b=10 が使われて 5 + 10 = 15 になります。"
    },
    {
      id: "py-11",
      type: "choice",
      level: "中級",
      question: "タプル (1, 2, 3) の特徴として正しいものはどれ?",
      choices: ["作成後に要素を変更できない", "要素の重複が許されない", "キーと値のペアを持つ", "要素は自動的にソートされる"],
      answer: 0,
      explanation: "タプルはイミュータブル(変更不可)なコレクションです。重複禁止はセット、キーと値は辞書の特徴です。"
    },
    {
      id: "py-12",
      type: "choice",
      level: "中級",
      question: "try / except / finally について正しいのはどれ?",
      choices: [
        "finally は例外の有無にかかわらず必ず実行される",
        "finally は例外が起きたときだけ実行される",
        "except は複数書けない",
        "try の中では関数を呼べない"
      ],
      answer: 0,
      explanation: "finally ブロックは例外が発生してもしなくても必ず実行されます。後片付け処理に使います。"
    },
    {
      id: "py-13",
      type: "fill",
      level: "中級",
      question: "ファイルを自動で閉じるためにファイルを開くときに使う文(キーワード)は?",
      answer: "with",
      explanation: "with open(...) as f: と書くと、ブロックを抜けるときに自動でファイルが閉じられます。"
    },
    {
      id: "py-14",
      type: "choice",
      level: "上級",
      question: "次のコードの出力はどれ?",
      code: 'nums = [1, 2, 3]\ncopy = nums\ncopy.append(4)\nprint(nums)',
      choices: ["[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "エラーになる"],
      answer: 0,
      explanation: "copy = nums は同じリストへの参照をコピーするだけです。copy への追加は nums にも反映されます。独立したコピーが欲しい場合は nums.copy() や nums[:] を使います。"
    },
    {
      id: "py-15",
      type: "choice",
      level: "上級",
      question: "メソッド定義の第1引数 self の意味として正しいのはどれ?",
      choices: [
        "呼び出し元のインスタンス自身を指す",
        "クラスの静的変数を指す",
        "親クラスを指す",
        "省略しても自動で補われる飾り"
      ],
      answer: 0,
      explanation: "self はそのメソッドを呼び出したインスタンス自身です。dog.bark() は Dog.bark(dog) と同じ意味になります。"
    }
  ]
};
