/* CodeLearn — プログラミング学習サイト (Vanilla JS SPA) */
(function () {
  "use strict";

  const DATA = window.LEARN_DATA || {};
  const LANG_ORDER = ["python", "csharp", "typescript", "rust"];
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

  /* ---------- ルーティング ---------- */

  function route() {
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);

    window.scrollTo(0, 0);

    if (parts.length === 0) return renderHome();
    if (parts[0] === "docs" && DATA[parts[1]]) return renderDocs(parts[1], parts[2]);
    if (parts[0] === "quiz" && DATA[parts[1]]) return startQuiz(parts[1], parts[2] === "review");
    if (parts[0] === "review") return renderReview();
    return renderHome();
  }

  /* ---------- ホーム ---------- */

  function renderHome() {
    const cards = LANG_ORDER.map((key) => {
      const d = DATA[key];
      if (!d) return "";
      const total = d.quiz.length;
      const mastered = getMasteredCount(key);
      const pct = total ? Math.round((mastered / total) * 100) : 0;
      return `
        <div class="lang-card">
          <h2><span class="lang-dot" style="background:${esc(d.color)}"></span>${esc(d.name)}</h2>
          <p>${esc(d.tagline)}</p>
          <div class="progress-bar"><span style="width:${pct}%"></span></div>
          <div class="progress-label">習得済み ${mastered} / ${total} 問 (${pct}%)</div>
          <div class="card-actions">
            <a class="btn" href="#/docs/${key}">📖 ドキュメント</a>
            <a class="btn btn-primary" href="#/quiz/${key}">✏️ 問題を解く</a>
          </div>
        </div>`;
    }).join("");

    app.innerHTML = `
      <div class="hero">
        <h1>プログラミングを効率よく学ぼう</h1>
        <p>ドキュメントで学び、問題を解いて定着させる。間違えた問題は「復習」からやり直せます。</p>
      </div>
      <div class="lang-grid">${cards}</div>`;
  }

  /* ---------- ドキュメント ---------- */

  function renderDocs(lang, chapterId) {
    const d = DATA[lang];
    const chapter = d.docs.find((c) => c.id === chapterId) || d.docs[0];
    const idx = d.docs.indexOf(chapter);

    const sidebar = d.docs
      .map(
        (c) =>
          `<a href="#/docs/${lang}/${c.id}" class="${c.id === chapter.id ? "active" : ""}">${esc(c.title)}</a>`
      )
      .join("");

    const prev = d.docs[idx - 1];
    const next = d.docs[idx + 1];

    app.innerHTML = `
      <div class="breadcrumb"><a href="#/">ホーム</a> / ${esc(d.name)} ドキュメント</div>
      <div class="docs-layout">
        <aside class="docs-sidebar">
          <h3>${esc(d.name)}</h3>
          ${sidebar}
        </aside>
        <article class="docs-content">
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
        location.hash = "#/quiz/" + lang;
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
      body = `
        <div class="choices">
          ${choices
            .map(
              (c, i) =>
                `<button class="choice-btn" data-i="${i}">${esc(c.text)}</button>`
            )
            .join("")}
        </div>`;
    }

    app.innerHTML = `
      <div class="quiz-panel">
        <div class="quiz-meta">
          <span>${esc(d.name)} ${s.reviewOnly ? "(復習モード)" : ""} — 第 ${s.index + 1} 問 / 全 ${total} 問</span>
          <span class="quiz-level">${esc(q.level || "基礎")}</span>
        </div>
        <div class="quiz-progress-track"><span style="width:${pct}%"></span></div>
        <div class="quiz-question">${esc(q.question)}</div>
        ${q.code ? `<pre>${esc(q.code)}</pre>` : ""}
        ${body}
        <div id="feedback-area"></div>
      </div>`;

    s.answered = false;

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
        <div class="score">${s.correct} / ${total}</div>
        <p>正答率 ${pct}% — ${esc(message)}</p>
        <div class="result-actions">
          ${wrongCount > 0 ? `<button class="btn btn-primary" id="retry-review-btn">間違えた問題を復習</button>` : ""}
          <button class="btn" id="retry-btn">もう一度挑戦</button>
          <a class="btn" href="#/docs/${s.lang}">📖 ドキュメントを読む</a>
          <a class="btn" href="#/">ホームへ</a>
        </div>
      </div>`;

    // hash が変われば hashchange 経由で開始、同じなら直接開始する
    function goQuiz(hash, lang, review) {
      if (location.hash === hash) {
        startQuiz(lang, review);
      } else {
        location.hash = hash;
      }
    }
    const reviewBtn = document.getElementById("retry-review-btn");
    if (reviewBtn) {
      reviewBtn.addEventListener("click", () => goQuiz(`#/quiz/${s.lang}/review`, s.lang, true));
    }
    document.getElementById("retry-btn").addEventListener("click", () => goQuiz(`#/quiz/${s.lang}`, s.lang, false));
  }

  /* ---------- 復習ページ ---------- */

  function renderReview() {
    const wrong = getWrongQuestions();

    if (wrong.length === 0) {
      app.innerHTML = `
        <h1 class="page-title">復習</h1>
        <div class="review-empty">
          <p>🎉 復習が必要な問題はありません。</p>
          <p>問題を解いて間違えると、ここに表示されます。</p>
          <p style="margin-top:16px"><a class="btn btn-primary" href="#/">ホームへ戻る</a></p>
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
              <div>
                <div class="lang-tag">${esc(d.name)} / ${esc(q.level || "基礎")}</div>
                <div class="q">${esc(q.question)}</div>
              </div>
            </div>`
          )
          .join("");
        return `
          <div style="margin-bottom:28px">
            <h2 style="margin-bottom:8px">${esc(d.name)}(${qs.length} 問)
              <a class="btn btn-primary" style="margin-left:12px" href="#/quiz/${lang}/review">この言語を復習する</a>
            </h2>
            <div class="review-list">${items}</div>
          </div>`;
      })
      .join("");

    app.innerHTML = `
      <h1 class="page-title">復習</h1>
      <p class="page-sub">最後に間違えた問題の一覧です。正解すると一覧から消えます。</p>
      ${sections}`;
  }

  /* ---------- 起動 ---------- */

  window.addEventListener("hashchange", route);
  route();
})();
