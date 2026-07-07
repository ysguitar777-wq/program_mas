window.GLOSSARY = [
  /* ---------- 基本 ---------- */
  { term: "変数", en: "variable", cat: "基本", def: "値に名前を付けて保存しておく箱。後から読み出したり(言語によっては)入れ替えたりできる。" },
  { term: "定数", en: "constant", cat: "基本", def: "一度決めたら変更できない値。TypeScript の const、C# の const、Rust のデフォルトの let などが該当する。" },
  { term: "型", en: "type", cat: "基本", def: "値の種類(整数・文字列・真偽値など)。型が合わない操作を防ぐことでバグを減らせる。" },
  { term: "関数", en: "function", cat: "基本", def: "処理をひとまとまりにして名前を付けたもの。入力(引数)を受け取り、結果(戻り値)を返せる。" },
  { term: "引数", en: "argument / parameter", cat: "基本", def: "関数に渡す入力値。定義側の受け口を仮引数(parameter)、呼び出し時に渡す実際の値を実引数(argument)と呼ぶ。" },
  { term: "戻り値", en: "return value", cat: "基本", def: "関数が処理の結果として呼び出し元に返す値。return 文で返す。" },
  { term: "ループ", en: "loop", cat: "基本", def: "同じ処理を繰り返す構文。for(回数や要素ごと)と while(条件を満たす間)が代表。" },
  { term: "配列", en: "array", cat: "基本", def: "複数の値を順番に並べて格納するデータ構造。先頭を 0 とする添字(インデックス)で要素にアクセスする。" },
  { term: "真偽値", en: "boolean", cat: "基本", def: "true(真)か false(偽)の2値だけを持つ型。条件分岐の判定に使う。" },
  { term: "null / None", en: "null", cat: "基本", def: "「値が無い」ことを表す特別な値。Python では None、C#/TS では null。Rust には無く Option 型で表現する。" },
  { term: "スコープ", en: "scope", cat: "基本", def: "変数が有効な範囲。関数の中で作った変数は基本的にその関数の中でしか使えない。" },
  { term: "演算子", en: "operator", cat: "基本", def: "計算や比較を表す記号。算術(+ - * /)、比較(== < >)、論理(&& || !)などがある。" },
  { term: "コメント", en: "comment", cat: "基本", def: "プログラムの動作に影響しないメモ書き。# や // の後ろに書き、コードの意図を残すために使う。" },

  /* ---------- 仕組み ---------- */
  { term: "コンパイル", en: "compile", cat: "仕組み", def: "人間が書いたソースコードを、実行前にまとめて機械が実行できる形式に変換すること。C#・Rust・TypeScript はコンパイルを経て動く。" },
  { term: "インタプリタ", en: "interpreter", cat: "仕組み", def: "ソースコードを実行しながら1行ずつ解釈する方式。Python が代表例。手軽に実行できる反面、実行時までエラーに気づきにくい。" },
  { term: "静的型付け / 動的型付け", en: "static / dynamic typing", cat: "仕組み", def: "型をコンパイル時に検査するのが静的型付け(C#・TypeScript・Rust)、実行時に決まるのが動的型付け(Python)。静的型付けは事前にバグを発見しやすい。" },
  { term: "ガベージコレクション", en: "garbage collection (GC)", cat: "仕組み", def: "使われなくなったメモリを自動で回収する仕組み。Python・C#・JS にはあるが、Rust は所有権システムで代替しておりGCを持たない。" },
  { term: "アルゴリズム", en: "algorithm", cat: "仕組み", def: "問題を解く手順のこと。同じ結果でも手順の工夫によって処理速度が大きく変わる。" },
  { term: "データ構造", en: "data structure", cat: "仕組み", def: "データの整理・格納のしかた。配列・リスト・辞書(ハッシュマップ)・木構造などがあり、用途によって使い分ける。" },
  { term: "再帰", en: "recursion", cat: "仕組み", def: "関数が自分自身を呼び出すこと。木構造の探索などに向くが、終了条件を忘れると無限ループになる。" },
  { term: "非同期処理", en: "asynchronous processing", cat: "仕組み", def: "通信やファイル読み込みなど時間のかかる処理を、完了を待たずに進める仕組み。async / await 構文で同期処理のように書ける。" },
  { term: "並行・並列処理", en: "concurrency / parallelism", cat: "仕組み", def: "複数の処理を切り替えながら進めるのが並行、複数のCPUコアで同時に実行するのが並列。Rust はこれを安全に書けるのが強み。" },
  { term: "メモリ", en: "memory", cat: "仕組み", def: "プログラムの実行中にデータを置いておく領域。確保と解放の管理を誤ると、クラッシュやメモリリークの原因になる。" },

  /* ---------- オブジェクト指向 ---------- */
  { term: "クラス", en: "class", cat: "オブジェクト指向", def: "データ(プロパティ)と操作(メソッド)をまとめた設計図。この設計図から実体(インスタンス)を作って使う。" },
  { term: "インスタンス", en: "instance", cat: "オブジェクト指向", def: "クラス(設計図)から作られた実体。new Person() のように生成し、それぞれが独立したデータを持つ。" },
  { term: "メソッド", en: "method", cat: "オブジェクト指向", def: "クラスに属する関数。そのインスタンスのデータを使って動作する。例: dog.bark()" },
  { term: "プロパティ", en: "property", cat: "オブジェクト指向", def: "インスタンスが持つデータ(属性)。例: user.name。C# では get/set を通じてアクセスを制御できる。" },
  { term: "コンストラクタ", en: "constructor", cat: "オブジェクト指向", def: "インスタンス生成時に呼ばれる初期化処理。Python の __init__、C#/TS の constructor が該当する。" },
  { term: "継承", en: "inheritance", cat: "オブジェクト指向", def: "既存のクラスの機能を引き継いで新しいクラスを作ること。共通部分を親クラスにまとめられる。" },
  { term: "インターフェース", en: "interface", cat: "オブジェクト指向", def: "「このメソッドを必ず持つ」という約束事だけを定めたもの。実装はそれぞれのクラスが行う。Rust では trait が近い役割。" },
  { term: "カプセル化", en: "encapsulation", cat: "オブジェクト指向", def: "内部のデータを外から直接触れないように隠し、決められた窓口(メソッド)経由でだけ操作させる設計。private 修飾子などで実現する。" },
  { term: "オーバーライド", en: "override", cat: "オブジェクト指向", def: "親クラスから継承したメソッドを、子クラスで上書きして動作を変えること。" },

  /* ---------- Web ---------- */
  { term: "フロントエンド / バックエンド", en: "frontend / backend", cat: "Web", def: "ブラウザ側で動く画面まわりがフロントエンド(HTML/CSS/JS・React など)、サーバー側の処理・データ管理がバックエンド(API・データベースなど)。" },
  { term: "API", en: "Application Programming Interface", cat: "Web", def: "プログラム同士が機能やデータをやり取りするための窓口。Web API は URL にリクエストを送り、JSON などで結果を受け取る形が一般的。" },
  { term: "HTTP / HTTPS", en: "HyperText Transfer Protocol", cat: "Web", def: "ブラウザとサーバーが通信するための決まりごと。HTTPS は通信を暗号化した安全な版。GET(取得)や POST(送信)などのメソッドがある。" },
  { term: "JSON", en: "JavaScript Object Notation", cat: "Web", def: "データを {\"name\": \"太郎\", \"age\": 20} のような形で表す軽量なデータ形式。API のやり取りの事実上の標準。" },
  { term: "DOM", en: "Document Object Model", cat: "Web", def: "HTML をプログラム(JS)から操作できるようにした木構造の表現。要素の追加・変更・イベント処理はDOMを通じて行う。" },
  { term: "SPA", en: "Single Page Application", cat: "Web", def: "ページ遷移せず、1枚のページの中身をJSで書き換えて画面を切り替えるWebアプリの作り方。このサイトもSPA。" },
  { term: "フレームワーク", en: "framework", cat: "Web", def: "アプリの土台となる骨組み。決められた作法に沿って書くことで、開発を大幅に効率化できる。例: React、Next.js、ASP.NET、axum。" },
  { term: "ライブラリ", en: "library", cat: "Web", def: "よく使う機能をまとめた部品集。必要なときに呼び出して使う。フレームワークより小さく、組み合わせは自由。例: NumPy、clap。" },
  { term: "データベース", en: "database (DB)", cat: "Web", def: "大量のデータを整理して保存・検索するための仕組み。表形式のリレーショナルDB(PostgreSQL、SQLite など)が代表的。" },
  { term: "SQL", en: "Structured Query Language", cat: "Web", def: "データベースを操作するための言語。SELECT(検索)、INSERT(追加)、UPDATE(更新)、DELETE(削除)が基本。" },
  { term: "ローカルストレージ", en: "localStorage", cat: "Web", def: "ブラウザにデータを保存できる仕組み。サーバー不要でユーザーごとの設定や進捗を残せる。このサイトの学習進捗もここに保存している。" },
  { term: "レスポンシブデザイン", en: "responsive design", cat: "Web", def: "PC・タブレット・スマホなど画面幅に応じてレイアウトが自動で切り替わるデザイン手法。CSSのメディアクエリなどで実現する。" },

  /* ---------- 開発ツール ---------- */
  { term: "Git", en: "Git", cat: "開発ツール", def: "ソースコードの変更履歴を記録・管理するバージョン管理システム。いつでも過去の状態に戻せ、複数人での開発を支える。" },
  { term: "GitHub", en: "GitHub", cat: "開発ツール", def: "Git のリポジトリをインターネット上で共有・公開できるサービス。コードレビューや公開(GitHub Pages)などの機能も持つ。" },
  { term: "リポジトリ", en: "repository", cat: "開発ツール", def: "プロジェクトのコードと変更履歴の保管庫。手元のものをローカルリポジトリ、GitHub 上のものをリモートリポジトリと呼ぶ。" },
  { term: "コミット", en: "commit", cat: "開発ツール", def: "変更内容をひとまとまりとして履歴に記録すること。「何を変えたか」のメッセージを添えて保存する。" },
  { term: "ブランチ", en: "branch", cat: "開発ツール", def: "履歴を枝分かれさせて、本流に影響を与えずに開発を進める仕組み。完成したら本流(main)に合流(マージ)する。" },
  { term: "パッケージ管理", en: "package manager", cat: "開発ツール", def: "ライブラリの導入・更新を自動化するツール。Python の pip、JS の npm、C# の NuGet、Rust の Cargo が各言語の定番。" },
  { term: "IDE", en: "Integrated Development Environment", cat: "開発ツール", def: "エディタ・実行・デバッグ機能が一体になった統合開発環境。Visual Studio、VS Code、JetBrains 系などが有名。" },
  { term: "CLI", en: "Command Line Interface", cat: "開発ツール", def: "文字コマンドでコンピュータを操作する方式(ターミナル)。開発ツールの多くはCLIで操作する。対義語はGUI。" },
  { term: "デバッグ", en: "debug", cat: "開発ツール", def: "バグ(不具合)の原因を探して直す作業。ブレークポイントで実行を止めて変数を確認するデバッガの活用が近道。" },
  { term: "リファクタリング", en: "refactoring", cat: "開発ツール", def: "動作を変えずにコードを読みやすく・修正しやすく整理すること。テストがあると安心して行える。" },

  /* ---------- エラー・テスト ---------- */
  { term: "バグ", en: "bug", cat: "エラー・テスト", def: "プログラムの不具合・誤り。意図しない動作の総称。" },
  { term: "構文エラー", en: "syntax error", cat: "エラー・テスト", def: "文法の書き間違いによるエラー。実行(コンパイル)前に検出され、プログラムは動かない。" },
  { term: "例外", en: "exception", cat: "エラー・テスト", def: "実行中に発生する異常事態(ファイルが無い、0で割ったなど)。try / catch(except)で捕まえて対処する。" },
  { term: "スタックトレース", en: "stack trace", cat: "エラー・テスト", def: "エラー発生時に表示される「どの関数を通ってきたか」の記録。エラー原因の場所を特定する最重要の手がかり。" },
  { term: "単体テスト", en: "unit test", cat: "エラー・テスト", def: "関数やクラスなど小さな単位が正しく動くかを自動で検証するテスト。pytest・xUnit・Vitest・cargo test などで書く。" },

  /* ---------- AI・データ ---------- */
  { term: "機械学習", en: "machine learning (ML)", cat: "AI・データ", def: "データから規則性を自動で学習し、予測や分類を行う技術。「学習(fit)→ 予測(predict)」が基本の流れ。" },
  { term: "ディープラーニング", en: "deep learning", cat: "AI・データ", def: "人間の脳を模したニューラルネットワークを何層も重ねた機械学習の手法。画像認識や自然言語処理で高い性能を発揮する。" },
  { term: "LLM / 生成AI", en: "Large Language Model", cat: "AI・データ", def: "大量のテキストから学習した大規模言語モデル。文章生成・要約・翻訳・コード生成などができる。Claude や GPT が代表例。" },
  { term: "モデル", en: "model", cat: "AI・データ", def: "機械学習でデータから学習した「予測の仕組み」そのもの。学習済みモデルを保存すれば、すぐに予測に使える。" },
  { term: "データフレーム", en: "DataFrame", cat: "AI・データ", def: "行と列を持つ表形式のデータ構造。pandas や Polars の中心概念で、Excel の表をプログラムで操作するイメージ。" }
];
