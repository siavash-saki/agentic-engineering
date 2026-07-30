/* Section 19 — Best Practices chapter opener
   Bridges the SDD chapter into the tips chapter. Lists all ten tips at a
   glance; titles match the tip slides 1:1 in both languages. Order is
   session-chronological: brief → verify → context → safety net → assets →
   model strategy. */

import { getLang } from '../core/i18n.js';

const TAG = 's19-tips-intro';

const CONTENT = {
  en: {
    h1: 'Ten <b>disciplines</b>',
    lede: `The workflow won't carry itself. Ten practices that decide whether
          your AI coding tool earns its keep — or quietly burns your hours.`,
    tips: [
      { n: '01', title: 'Make the agent ask' },
      { n: '02', title: 'Give it a feedback loop' },
      { n: '03', title: 'One session per mental context' },
      { n: '04', title: 'Confused? Fresh session' },
      { n: '05', title: 'Review every diff' },
      { n: '06', title: 'Commit small, early, often' },
      { n: '07', title: 'Do it twice? Make it a Skill' },
      { n: '08', title: 'Project rules, kept alive' },
      { n: '09', title: 'The right tier for the job' },
      { n: '10', title: 'Use them all' },
    ],
  },
  de: {
    h1: 'Zehn <b>Disziplinen</b>',
    lede: `Der Workflow trägt sich nicht von allein. Zehn Praktiken entscheiden,
          ob dein KI-Coding-Tool seinen Platz verdient — oder still deine
          Stunden verbrennt.`,
    tips: [
      { n: '01', title: 'Lass den Agenten fragen' },
      { n: '02', title: 'Gib ihm eine Feedback-Schleife' },
      { n: '03', title: 'Eine Session pro Kontext' },
      { n: '04', title: 'Verwirrt? Neue Session' },
      { n: '05', title: 'Jeden Diff reviewen' },
      { n: '06', title: 'Klein committen — früh und oft' },
      { n: '07', title: 'Zweimal getan? Mach einen Skill draus' },
      { n: '08', title: 'Projekt-Regeln, lebendig gehalten' },
      { n: '09', title: 'Die richtige Modellklasse' },
      { n: '10', title: 'Nutze sie alle' },
    ],
  },
};

class Section19Intro extends HTMLElement {
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
          max-width: 1200px;
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
          max-width: 940px;
          margin: 0 0 var(--ae-space-5);
        }

        /* The chapter hub, redesigned as a wall of ten tiles — the chapter's
           table of contents as objects, not a list. Tiles land in reading
           order and answer the pointer; the big ordinal is the tile's face. */
        ${TAG} .grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--ae-space-3);
        }
        ${TAG} .tip {
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-2);
          padding: var(--ae-space-4);
          min-height: 8.5em;
        }
        ${TAG} .tip .n {
          /* an ordinal is a number, not code */
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h3);
          line-height: 1;
          font-weight: 700;
          color: var(--ae-red);
          font-variant-numeric: tabular-nums;
          transition: color 200ms var(--ae-ease);
        }
        ${TAG} .tip .t {
          font-size: var(--ae-fs-small);
          line-height: 1.3;
          color: var(--ae-text-strong);
          font-weight: 700;
          margin-top: auto;
        }

        @media (max-width: 1024px) {
          ${TAG} .grid { grid-template-columns: repeat(2, 1fr); }
          ${TAG} .tip { min-height: 0; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="grid">
          ${t.tips.map((tip, i) => `
            <div class="tip fg-card fg-hover fg-in" style="--fg-at: ${3 + Math.floor(i / 2)}">
              <span class="n">${tip.n}</span>
              <span class="t fg-hover-title">${tip.title}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section19Intro);
