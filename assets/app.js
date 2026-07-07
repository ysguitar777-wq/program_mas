/* CodeLearn — プログラミング学習サイト (Vanilla JS SPA) */
(function () {
  "use strict";

  const DATA = window.LEARN_DATA || {};
  const LANG_ORDER = ["python", "csharp", "typescript", "rust"];
  const LANG_META = {
    python: { badge: "Py" },
    csharp: { badge: "C#" },
    typescript: { badge: "TS" },
    rust: { badge: "Rs" },
  };
  const app = document.getElementById("app");

  /* ---------- ユーティリティ ---------- */

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function levelClass(level) {
    if (level === "上級") return "lv-adv";
    if (level === "中級") return "lv-mid";
    return "lv-basic";
  }

  /* ---------- テーマ切替 ---------- */

  const THEME_KEY = "codelearn-theme";

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    let theme = null;
    try { theme = localStorage.getItem(THEME_KEY); } catch (e) { /* noop */ }
    if (theme !== "dark" && theme !== "light") {
      theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* noop */ }
      });
    }
  }

  /* ---------- シンタックスハイライト ---------- */

  const KEYWORDS = {
    python:
      "def|return|if|elif|else|for|while|in|not|and|or|import|from|as|class|try|except|finally|with|lambda|pass|break|continue|raise|True|False|None|print|range|self|global|yield|async|await|is|del",
    csharp:
      "using|namespace|class|interface|public|private|protected|static|void|int|string|bool|double|decimal|char|long|float|var|new|return|if|else|for|foreach|while|switch|case|break|continue|try|catch|finally|throw|null|true|false|out|ref|readonly|get|set|this|base|enum|struct|record|async|await|in",
    typescript:
      "const|let|var|function|return|if|else|for|while|of|in|new|class|interface|type|extends|implements|export|import|from|async|await|try|catch|finally|throw|null|undefined|true|false|string|number|boolean|any|unknown|void|never|readonly|public|private|protected|static|enum|as|this",
    rust:
      "fn|let|mut|const|if|else|for|while|loop|in|match|impl|struct|enum|trait|pub|use|mod|return|break|continue|move|ref|as|true|false|Some|None|Ok|Err|String|Vec|self|crate|where|dyn|async|await|unsafe",
  };

  const HIGHLIGHT_RE = {};
  for (const lang of LANG_ORDER) {
    const string = `"(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*'|\`(?:\\\\.|[^\`\\\\])*\``;
    const comment = lang === "python" ? "#[^\\n]*" : "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/";
    const number = "\\b\\d[\\d_]*(?:\\.\\d+)?\\b";
    HIGHLIGHT_RE[lang] = new RegExp(
      `(${string})|(${comment})|\\b(${KEYWORDS[lang]})\\b|(${number})`,
      "g"
    );
  }

  function highlightElement(el, lang) {
    const re = HIGHLIGHT_RE[lang];
    if (!re) return;
    const src = el.textContent;
    re.lastIndex = 0;
    let out = "";
    let last = 0;
    let m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      const cls = m[1] ? "tok-str" : m[2] ? "tok-com" : m[3] ? "tok-kw" : "tok-num";
      out += `<span class="${cls}">${esc(m[0])}</span>`;
      last = re.lastIndex;
    }
    out += esc(src.slice(last));
    el.innerHTML = out;
  }

  // 描画後に呼ぶ: コードのハイライト + コピーボタンを付ける
  // pre に data-lang があればそれを優先(none なら色分けしない)
  function enhanceCodeBlocks(lang) {
    app.querySelectorAll("pre").forEach((pre) => {
      const codeEl = pre.querySelector("code") || pre;
      const preLang = pre.dataset.lang || lang;
      if (preLang && HIGHLIGHT_RE[preLang]) highlightElement(codeEl, preLang);

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "コピー";
      btn.addEventListener("click", () => {
        const text = codeEl.textContent;
        const done = () => {
          btn.textContent = "✓ コピー済み";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "コピー";
            btn.classList.remove("copied");
          }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, () => {});
        }
      });
      pre.appendChild(btn);
    });
  }

  /* ---------- localStorage による進捗管理 ---------- */

  const STORE_KEY = "codelearn-progress-v1";

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch (e) {
      /* プライベートブラウズ等では保存しない */
    }
  }

  // 問題ごとの成績: store.results[lang][questionId] = { correct: n, wrong: n, lastWrong: bool }
  function recordAnswer(lang, qid, isCorrect) {
    const store = loadStore();
    store.results = store.results || {};
    store.results[lang] = store.results[lang] || {};
    const r = store.results[lang][qid] || { correct: 0, wrong: 0, lastWrong: false };
    if (isCorrect) {
      r.correct++;
      r.lastWrong = false;
    } else {
      r.wrong++;
      r.lastWrong = true;
    }
    store.results[lang][qid] = r;
    saveStore(store);
  }

  function getMasteredCount(lang) {
    const store = loadStore();
    const results = (store.results && store.results[lang]) || {};
    return Object.values(results).filter((r) => r.correct > 0 && !r.lastWrong).length;
  }

  function getWrongQuestions() {
    const store = loadStore();
    const results = store.results || {};
    const out = [];
    for (const lang of LANG_ORDER) {
      const data = DATA[lang];
      if (!data) continue;
      const langResults = results[lang] || {};
      for (const q of data.quiz) {
        const r = langResults[q.id];
        if (r && r.lastWrong) out.push({ lang, q });
      }
    }
    return out;
  }

  /* ---------- ルーティング ----------
     サンドボックス環境(Artifact 等)では <a href="#/..."> のクリックが
     実ページ遷移になり Forbidden になることがあるため、クリックを横取りして
     JS 内部の状態だけで画面を切り替える。URL の hash は可能なら同期する。 */

  let currentRoute = null;

  function navigate(hash) {
    currentRoute = hash;
    if (location.hash !== hash) {
      try {
        history.pushState(null, "", hash);
      } catch (e) {
        /* サンドボックスで URL を書き換えられない場合は内部状態のみで動く */
      }
    }
    route();
  }

  function route() {
    const hash = currentRoute || location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);

    window.scrollTo(0, 0);

    if (parts.length === 0) return renderHome();
    if (parts[0] === "docs" && DATA[parts[1]]) return renderDocs(parts[1], parts[2]);
    if (parts[0] === "quiz" && DATA[parts[1]]) return startQuiz(parts[1], parts[2] === "review");
    if (parts[0] === "review") return renderReview();
    if (parts[0] === "glossary") return renderGlossary();
    if (parts[0] === "guide") return renderGuide(parts[1]);
    return renderHome();
  }

  // "#/" で始まるリンクはすべて内部ルーティングで処理する
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (!a) return;
    e.preventDefault();
    navigate(a.getAttribute("href"));
  });

  /* ---------- ホーム ---------- */

  function renderHome() {
    let totalQ = 0;
    let totalDocs = 0;
    let totalMastered = 0;

    const cards = LANG_ORDER.map((key) => {
      const d = DATA[key];
      if (!d) return "";
      const total = d.quiz.length;
      const mastered = getMasteredCount(key);
      const pct = total ? Math.round((mastered / total) * 100) : 0;
      totalQ += total;
      totalDocs += d.docs.length;
      totalMastered += mastered;
      return `
        <article class="lang-card" style="--lang-color:${esc(d.color)}">
          <div class="lang-card-head">
            <span class="lang-badge">${esc(LANG_META[key].badge)}</span>
            <h2>${esc(d.name)}</h2>
          </div>
          <p class="tagline">${esc(d.tagline)}</p>
          <div class="progress-row">
            <div class="progress-bar"><span style="width:${pct}%"></span></div>
            <span class="progress-pct">${pct}%</span>
          </div>
          <div class="progress-label">習得済み ${mastered} / ${total} 問</div>
          <div class="card-actions">
            <a class="btn" href="#/docs/${key}">📖 ドキュメント</a>
            <a class="btn btn-primary" href="#/quiz/${key}">✏️ 問題を解く</a>
          </div>
        </article>`;
    }).join("");

    app.innerHTML = `
      <section class="hero">
        <span class="eyebrow">Python · C# · TypeScript · Rust</span>
        <h1>プログラミングを、<br><span class="grad">効率よく</span>学ぼう</h1>
        <p>ドキュメントで学び、問題を解いて定着させる。間違えた問題は自動で「復習」に集まるので、弱点だけを繰り返し鍛えられます。</p>
        <div class="hero-stats">
          <div class="stat-chip"><span class="num">4</span><span class="label"> 言語</span></div>
          <div class="stat-chip"><span class="num">${totalDocs}</span><span class="label"> 章のドキュメント</span></div>
          <div class="stat-chip"><span class="num">${totalQ}</span><span class="label"> 問の演習</span></div>
          <div class="stat-chip"><span class="num">${totalMastered}</span><span class="label"> 問 習得済み</span></div>
        </div>
      </section>
      <div class="lang-grid">${cards}</div>
      <section class="extra-grid">
        <a class="extra-card" href="#/glossary">
          <span class="extra-icon">📚</span>
          <span>
            <strong>用語集</strong>
            <span class="extra-desc">「API って何?」に答える、よく使われる ${(window.GLOSSARY || []).length} 語をカテゴリ別・検索付きで</span>
          </span>
        </a>
        <a class="extra-card" href="#/guide">
          <span class="extra-icon">🛠</span>
          <span>
            <strong>おまけ: このサイトの作り</strong>
            <span class="extra-desc">今見ているこのサイト自体の HTML / CSS / JS の仕組みをコード付きで解説</span>
          </span>
        </a>
      </section>`;
  }

  /* ---------- おまけ: このサイトの作り ---------- */

  function renderGuide(chapterId) {
    const guide = window.SITE_GUIDE || [];
    if (guide.length === 0) return renderHome();
    const chapter = guide.find((c) => c.id === chapterId) || guide[0];
    const idx = guide.indexOf(chapter);

    const sidebar = guide
      .map(
        (c, i) =>
          `<a href="#/guide/${c.id}" class="${c.id === chapter.id ? "active" : ""}">
             <span class="idx">${String(i + 1).padStart(2, "0")}</span>${esc(c.title)}</a>`
      )
      .join("");

    const prev = guide[idx - 1];
    const next = guide[idx + 1];

    app.innerHTML = `
      <div class="breadcrumb"><a href="#/">ホーム</a> / おまけ: このサイトの作り</div>
      <div class="docs-layout" style="--lang-color:var(--accent)">
        <aside class="docs-sidebar">
          <div class="sidebar-title"><span class="lang-dot"></span>サイトの作り</div>
          ${sidebar}
        </aside>
        <article class="docs-content">
          <div class="chapter-no">BEHIND THE SITE ${String(idx + 1).padStart(2, "0")} / ${String(guide.length).padStart(2, "0")}</div>
          <h1>${esc(chapter.title)}</h1>
          ${chapter.body}
          <div class="docs-nav-links">
            <span>${prev ? `<a class="btn" href="#/guide/${prev.id}">← ${esc(prev.title)}</a>` : ""}</span>
            <span>${
              next
                ? `<a class="btn" href="#/guide/${next.id}">${esc(next.title)} →</a>`
                : `<a class="btn btn-primary" href="#/">ホームへ戻る</a>`
            }</span>
          </div>
        </article>
      </div>`;

    // 各コードブロックの data-lang に従ってハイライトする
    enhanceCodeBlocks(null);
  }

  /* ---------- 用語集 ---------- */

  function renderGlossary() {
    const terms = window.GLOSSARY || [];
    const cats = [...new Set(terms.map((t) => t.cat))];
    let activeCat = "すべて";
    let query = "";

    app.innerHTML = `
      <h1 class="page-title">用語集</h1>
      <p class="page-sub">プログラミングでよく使われる ${terms.length} 語。検索とカテゴリで絞り込めます。</p>
      <div class="glossary-controls">
        <input class="search-input" id="glossary-search" type="search"
               placeholder="用語を検索(例: API、変数、async...)" aria-label="用語を検索">
        <div class="cat-chips" id="cat-chips">
          ${["すべて"].concat(cats).map((c) => `<button class="chip${c === "すべて" ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}
        </div>
      </div>
      <p class="glossary-count" id="glossary-count"></p>
      <div class="glossary-list" id="glossary-list"></div>`;

    const listEl = document.getElementById("glossary-list");
    const countEl = document.getElementById("glossary-count");

    function renderList() {
      const q = query.trim().toLowerCase();
      const filtered = terms.filter((t) => {
        if (activeCat !== "すべて" && t.cat !== activeCat) return false;
        if (!q) return true;
        return (t.term + t.en + t.def).toLowerCase().includes(q);
      });
      countEl.textContent = `${filtered.length} 語を表示中`;
      listEl.innerHTML = filtered.length
        ? filtered
            .map(
              (t) => `
              <div class="glossary-item">
                <div class="glossary-head">
                  <span class="glossary-term">${esc(t.term)}</span>
                  <span class="glossary-en">${esc(t.en)}</span>
                  <span class="glossary-cat">${esc(t.cat)}</span>
                </div>
                <p class="glossary-def">${esc(t.def)}</p>
              </div>`
            )
            .join("")
        : `<div class="review-empty"><p>「${esc(query)}」に一致する用語が見つかりませんでした。</p></div>`;
    }

    document.getElementById("glossary-search").addEventListener("input", (e) => {
      query = e.target.value;
      renderList();
    });

    document.getElementById("cat-chips").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      activeCat = chip.dataset.cat;
      document.querySelectorAll("#cat-chips .chip").forEach((c) => c.classList.toggle("active", c === chip));
      renderList();
    });

    renderList();
  }

  /* ---------- ドキュメント ---------- */

  function renderDocs(lang, chapterId) {
    const d = DATA[lang];
    const chapter = d.docs.find((c) => c.id === chapterId) || d.docs[0];
    const idx = d.docs.indexOf(chapter);

    const sidebar = d.docs
      .map(
        (c, i) =>
          `<a href="#/docs/${lang}/${c.id}" class="${c.id === chapter.id ? "active" : ""}">
             <span class="idx">${String(i + 1).padStart(2, "0")}</span>${esc(c.title)}</a>`
      )
      .join("");

    const prev = d.docs[idx - 1];
    const next = d.docs[idx + 1];

    app.innerHTML = `
      <div class="breadcrumb"><a href="#/">ホーム</a> / ${esc(d.name)} ドキュメント</div>
      <div class="docs-layout" style="--lang-color:${esc(d.color)}">
        <aside class="docs-sidebar">
          <div class="sidebar-title"><span class="lang-dot"></span>${esc(d.name)}</div>
          ${sidebar}
          <div class="sidebar-cta">
            <a class="btn btn-primary" href="#/quiz/${lang}">✏️ 問題を解く</a>
          </div>
        </aside>
        <article class="docs-content">
          <div class="chapter-no">CHAPTER ${String(idx + 1).padStart(2, "0")} / ${String(d.docs.length).padStart(2, "0")}</div>
          <h1>${esc(chapter.title)}</h1>
          ${chapter.body}
          <div class="docs-nav-links">
            <span>${prev ? `<a class="btn" href="#/docs/${lang}/${prev.id}">← ${esc(prev.title)}</a>` : ""}</span>
            <span>${
              next
                ? `<a class="btn" href="#/docs/${lang}/${next.id}">${esc(next.title)} →</a>`
                : `<a class="btn btn-primary" href="#/quiz/${lang}">✏️ 問題を解いて確認する</a>`
            }</span>
          </div>
        </article>
      </div>`;

    enhanceCodeBlocks(lang);
  }

  /* ---------- クイズ ---------- */

  let quizState = null;

  function startQuiz(lang, reviewOnly) {
    const d = DATA[lang];
    let pool = d.quiz;

    if (reviewOnly) {
      const wrongIds = new Set(
        getWrongQuestions()
          .filter((w) => w.lang === lang)
          .map((w) => w.q.id)
      );
      pool = d.quiz.filter((q) => wrongIds.has(q.id));
      if (pool.length === 0) {
        navigate("#/quiz/" + lang);
        return;
      }
    }

    quizState = {
      lang,
      reviewOnly: !!reviewOnly,
      questions: shuffle(pool),
      index: 0,
      correct: 0,
      answered: false,
    };
    renderQuestion();
  }

  function renderQuestion() {
    const s = quizState;
    const d = DATA[s.lang];
    const q = s.questions[s.index];
    const total = s.questions.length;
    const pct = Math.round((s.index / total) * 100);

    let body;
    if (q.type === "fill") {
      body = `
        <form class="fill-form" id="fill-form">
          <input class="fill-input" id="fill-input" type="text" autocomplete="off"
                 spellcheck="false" placeholder="答えを入力..." aria-label="答えを入力">
          <button class="btn btn-primary" type="submit">回答する</button>
        </form>`;
    } else {
      const choices = shuffle(q.choices.map((c, i) => ({ text: c, isAnswer: i === q.answer })));
      s.currentChoices = choices;
      const keys = ["A", "B", "C", "D", "E"];
      body = `
        <div class="choices">
          ${choices
            .map(
              (c, i) =>
                `<button class="choice-btn" data-i="${i}"><span class="key">${keys[i]}</span><span>${esc(c.text)}</span></button>`
            )
            .join("")}
        </div>`;
    }

    app.innerHTML = `
      <div class="quiz-panel">
        <div class="quiz-meta">
          <span>${esc(d.name)} ${s.reviewOnly ? "(復習モード)" : ""} — 第 ${s.index + 1} 問 / 全 ${total} 問</span>
          <span class="quiz-level ${levelClass(q.level)}">${esc(q.level || "基礎")}</span>
        </div>
        <div class="quiz-progress-track"><span style="width:${pct}%"></span></div>
        <div class="quiz-question">${esc(q.question)}</div>
        ${q.code ? `<pre><code>${esc(q.code)}</code></pre>` : ""}
        ${body}
        <div id="feedback-area"></div>
      </div>`;

    s.answered = false;
    enhanceCodeBlocks(s.lang);

    if (q.type === "fill") {
      const form = document.getElementById("fill-form");
      const input = document.getElementById("fill-input");
      input.focus();
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (s.answered) return;
        const given = input.value.trim();
        if (!given) return;
        const accepted = [q.answer].concat(q.accept || []);
        const ok = accepted.some((a) => a.toLowerCase() === given.toLowerCase());
        input.disabled = true;
        form.querySelector("button").disabled = true;
        finishAnswer(ok, q, given);
      });
    } else {
      app.querySelectorAll(".choice-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (s.answered) return;
          const i = Number(btn.dataset.i);
          const picked = s.currentChoices[i];
          app.querySelectorAll(".choice-btn").forEach((b, j) => {
            b.disabled = true;
            if (s.currentChoices[j].isAnswer) b.classList.add("correct");
          });
          if (!picked.isAnswer) btn.classList.add("wrong");
          finishAnswer(picked.isAnswer, q);
        });
      });
    }
  }

  function finishAnswer(ok, q, given) {
    const s = quizState;
    s.answered = true;
    if (ok) s.correct++;
    recordAnswer(s.lang, q.id, ok);

    const isLast = s.index === s.questions.length - 1;
    const answerText =
      q.type === "fill" ? `正解: <code>${esc(q.answer)}</code>` : "";

    document.getElementById("feedback-area").innerHTML = `
      <div class="feedback ${ok ? "ok" : "ng"}">
        <strong>${ok ? "⭕ 正解!" : "❌ 不正解" + (given !== undefined ? `(あなたの回答: ${esc(given)})` : "")}</strong>
        ${!ok && answerText ? `<p>${answerText}</p>` : ""}
        <p>${esc(q.explanation)}</p>
      </div>
      <button class="btn btn-primary" id="next-btn">${isLast ? "結果を見る" : "次の問題へ →"}</button>`;

    const nextBtn = document.getElementById("next-btn");
    nextBtn.focus();
    nextBtn.addEventListener("click", () => {
      if (isLast) {
        renderResult();
      } else {
        s.index++;
        renderQuestion();
      }
    });
  }

  function renderResult() {
    const s = quizState;
    const d = DATA[s.lang];
    const total = s.questions.length;
    const pct = Math.round((s.correct / total) * 100);
    const wrongCount = total - s.correct;

    let message;
    if (pct === 100) message = "完璧です!次の言語にも挑戦してみましょう。";
    else if (pct >= 70) message = "よくできました!間違えた問題を復習して定着させましょう。";
    else message = "ドキュメントを読み直してから、もう一度挑戦してみましょう。";

    app.innerHTML = `
      <div class="quiz-panel quiz-result">
        <h1>${esc(d.name)} の結果</h1>
        <div class="score-ring" style="--pct:${pct}">
          <div class="inner">
            <span class="pct">${pct}%</span>
            <span class="frac">${s.correct} / ${total} 問正解</span>
          </div>
        </div>
        <p class="message">${esc(message)}</p>
        <div class="result-actions">
          ${wrongCount > 0 ? `<button class="btn btn-primary" id="retry-review-btn">間違えた問題を復習</button>` : ""}
          <button class="btn" id="retry-btn">もう一度挑戦</button>
          <a class="btn" href="#/docs/${s.lang}">📖 ドキュメントを読む</a>
          <a class="btn" href="#/">ホームへ</a>
        </div>
      </div>`;

    const reviewBtn = document.getElementById("retry-review-btn");
    if (reviewBtn) {
      reviewBtn.addEventListener("click", () => navigate(`#/quiz/${s.lang}/review`));
    }
    document.getElementById("retry-btn").addEventListener("click", () => navigate(`#/quiz/${s.lang}`));
  }

  /* ---------- 復習ページ ---------- */

  function renderReview() {
    const wrong = getWrongQuestions();

    if (wrong.length === 0) {
      app.innerHTML = `
        <h1 class="page-title">復習</h1>
        <div class="review-empty">
          <div class="big">🎉</div>
          <p>復習が必要な問題はありません。</p>
          <p>問題を解いて間違えると、ここに表示されます。</p>
          <p style="margin-top:20px"><a class="btn btn-primary" href="#/">ホームへ戻る</a></p>
        </div>`;
      return;
    }

    const byLang = {};
    for (const w of wrong) {
      byLang[w.lang] = byLang[w.lang] || [];
      byLang[w.lang].push(w.q);
    }

    const sections = Object.entries(byLang)
      .map(([lang, qs]) => {
        const d = DATA[lang];
        const items = qs
          .map(
            (q) => `
            <div class="review-item">
              <div class="lang-tag">${esc(d.name)} / ${esc(q.level || "基礎")}</div>
              <div class="q">${esc(q.question)}</div>
            </div>`
          )
          .join("");
        return `
          <section class="review-section" style="--lang-color:${esc(d.color)}">
            <div class="review-section-head">
              <h2><span class="lang-dot"></span>${esc(d.name)}</h2>
              <span class="count">${qs.length} 問</span>
              <a class="btn btn-primary" href="#/quiz/${lang}/review">この言語を復習する</a>
            </div>
            <div class="review-list">${items}</div>
          </section>`;
      })
      .join("");

    app.innerHTML = `
      <h1 class="page-title">復習</h1>
      <p class="page-sub">最後に間違えた問題の一覧です。正解すると一覧から消えます。</p>
      ${sections}`;
  }

  /* ---------- 起動 ---------- */

  initTheme();
  // 戻る/進むボタンと手動の hash 変更(popstate は hash 遷移でも発火する)
  window.addEventListener("popstate", () => {
    currentRoute = location.hash;
    route();
  });
  route();
})();
