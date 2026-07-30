/* Tip 10 — Use them all
   Rebuilt without the static strengths/weaknesses table (it would age in
   months and start arguments). The point: strengths shift with every
   release — familiarity is the asset. Three habits instead of claims;
   the third ties back to the cross-model review slide. */

import { getLang } from '../core/i18n.js';

const TAG = 's29-tip-models';

const CONTENT = {
  en: {
    h1: '<b>Use them all</b>',
    lede: `No provider stays ahead — the strengths shift with every release.
          Any static comparison chart is wrong within months.
          <b>Familiarity is the asset.</b>`,
    habits: [
      {
        name: 'Rotate',
        body: 'Use every frontier family regularly — on real work, not toy prompts. That\'s the only way you learn what each one is good at right now.',
      },
      {
        name: 'Compare',
        body: 'When it matters, run the same task through two models — and diff the answers. Disagreement is information.',
      },
      {
        name: 'Keep a reserve',
        body: 'Independent review needs a reviewer that isn\'t the author\'s twin. A second family in rotation is what makes cross-model review possible.',
      },
    ],
  },
  de: {
    h1: '<b>Nutze sie alle</b>',
    lede: `Kein Anbieter bleibt vorn — die Stärken verschieben sich mit jedem
          Release. Jede statische Vergleichstabelle ist in wenigen Monaten
          falsch. <b>Vertrautheit ist das Kapital.</b>`,
    habits: [
      {
        name: 'Rotieren',
        body: 'Jede Frontier-Familie regelmäßig nutzen — an echter Arbeit, nicht an Spielprompts. Nur so lernst du, was jede gerade gut kann.',
      },
      {
        name: 'Vergleichen',
        body: 'Wenn es zählt: dieselbe Aufgabe durch zwei Modelle — und die Antworten vergleichen. Uneinigkeit ist Information.',
      },
      {
        name: 'Reserve halten',
        body: 'Unabhängiges Review braucht einen Reviewer, der nicht der Zwilling des Autors ist. Eine zweite Familie im Einsatz macht Cross-Model-Review erst möglich.',
      },
    ],
  },
};

class SectionTip10 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--ae-text);
          max-width: 860px;
          margin: 0 0 var(--ae-space-6);
        }
        ${TAG} .lede b { color: var(--ae-red); font-weight: 700; }

        ${TAG} .habits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--ae-space-4);
        }
        ${TAG} .habit {
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-3);
        }
        /* The provider dots shuffle on hover — strengths shift with every
           release, so no dot keeps the front spot for long. */
        ${TAG} .habit .dots span { transition: transform 300ms var(--ae-ease); }
        ${TAG} .habit:hover .dots span:nth-child(1) { transform: translateX(36px); }
        ${TAG} .habit:hover .dots span:nth-child(2) { transform: translateX(-18px); }
        ${TAG} .habit:hover .dots span:nth-child(3) { transform: translateX(-18px); }

        ${TAG} .habit .dots {
          display: flex;
          gap: 6px;
        }
        ${TAG} .habit .dots span {
          width: 12px; height: 12px;
          border-radius: 50%;
        }
        ${TAG} .habit .dots span:nth-child(1) { background: #D97757; }
        ${TAG} .habit .dots span:nth-child(2) { background: #10A37F; }
        ${TAG} .habit .dots span:nth-child(3) { background: #4285F4; }

        ${TAG} .habit h3 {
          margin: 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          font-weight: 900;
          color: var(--ae-text-strong);
        }
        ${TAG} .habit p {
          margin: 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
        }

        @media (max-width: 900px) {
          ${TAG} .habits { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">10</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="habits">
          ${t.habits.map((h, i) => `
            <div class="habit fg-card fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="dots" aria-hidden="true"><span></span><span></span><span></span></div>
              <h3 class="fg-hover-title">${h.name}</h3>
              <p>${h.body}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip10);
