/* Section 28 — The smallest version.
   Six lines a person can do on their next task without adopting
   anything. No folder to create, no file naming convention, no tool. */

import { getLang } from '../core/i18n.js';

const TAG = 's27-monday';

const CONTENT = {
  en: {
    h1: 'The smallest version that works',
    lede: `Nothing here needs a folder structure, a naming convention or a new
           tool. Take the next thing you were going to build and do this
           instead.`,
    steps: [
      { n: '1', t: 'Do not ask for code yet',   d: 'Ask the agent to read the files that matter and summarise what it found.' },
      { n: '2', t: 'Make it ask',               d: '"Ask me every question you need answered to build this without guessing."' },
      { n: '3', t: 'Answer, and decide',        d: 'The questions are the requirements. The answers are yours to give, not its to assume.' },
      { n: '4', t: 'Put it in a markdown file', d: 'What it should do, what is out of scope, and how you will know it worked.' },
      { n: '5', t: 'Then build',                d: 'In steps. One commit each. The file stays in the prompt the whole time.' },
      { n: '6', t: 'Check, then have it read',  d: 'Walk your own criteria first. Then have a different model read the diff.' },
    ],
    recapLabel: 'And that is the whole thing',
    recap: ['Plan', 'Build', 'Review'],
    note: `Step 4 is the one people skip, and it is the one that makes steps 5
           and 6 possible. <b>Everything else in this talk is turning the
           dial.</b>`,
  },
  de: {
    h1: 'Die kleinste Fassung, die funktioniert',
    lede: `Nichts davon braucht eine Ordnerstruktur, eine Namenskonvention oder
           ein neues Werkzeug. Nimm die nächste Aufgabe und mach es
           so.`,
    steps: [
      { n: '1', t: 'Noch keinen Code verlangen', d: 'Den Agenten die relevanten Dateien lesen und zusammenfassen lassen.' },
      { n: '2', t: 'Fragen lassen',              d: '„Stell mir jede Frage, die du beantwortet brauchst, um das ohne Raten zu bauen."' },
      { n: '3', t: 'Antworten und entscheiden',  d: 'Die Fragen sind die Anforderungen. Die Antworten gibst du, nicht das Modell.' },
      { n: '4', t: 'In eine Markdown-Datei',     d: 'Was es tun soll, was nicht dazugehört, und woran du erkennst, dass es klappt.' },
      { n: '5', t: 'Dann bauen',                 d: 'In Schritten. Ein Commit je Schritt. Die Datei bleibt die ganze Zeit im Prompt.' },
      { n: '6', t: 'Prüfen, dann lesen lassen',  d: 'Erst die eigenen Kriterien durchgehen. Dann ein anderes Modell den Diff lesen lassen.' },
    ],
    recapLabel: 'Und das ist alles',
    recap: ['Plan', 'Build', 'Review'],
    note: `Schritt 4 ist der, den man auslässt, und der, der die Schritte 5 und 6
           erst möglich macht. <b>Alles andere in diesem Vortrag ist der
           Regler.</b>`,
  },
};

class Section28 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-5); }

        ${TAG} .steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ae-space-4);
          margin-bottom: var(--ae-space-6);
        }
        ${TAG} .s { display: flex; flex-direction: column; gap: var(--ae-space-2); }
        ${TAG} .s .head { display: flex; align-items: center; gap: var(--ae-space-3); }
        ${TAG} .s h3 {
          margin: 0;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .s p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        ${TAG} .s--key { box-shadow: var(--fg-d3), var(--fg-ring); }

        ${TAG} .recap { margin-bottom: var(--ae-space-5); }
        ${TAG} .recap .lbl { margin-bottom: var(--ae-space-2); }
        ${TAG} .recap .run {
          display: flex;
          align-items: center;
          gap: var(--ae-space-3);
          flex-wrap: wrap;
        }
        ${TAG} .recap .st {
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h1);
          line-height: 1.05;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--fg-ink);
        }
        ${TAG} .recap .ar {
          color: var(--fg-green);
          font-weight: 700;
          font-size: var(--ae-fs-h3);
        }

        @media (max-width: 1000px) {
          ${TAG} .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          ${TAG} .steps { grid-template-columns: 1fr; }
          ${TAG} .recap .st { font-size: var(--ae-fs-h2); }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="steps">
          ${t.steps.map((s, i) => `
            <div class="s fg-card ${s.n === '4' ? 's--key' : ''} fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="head">
                <span class="fg-badge">${s.n}</span>
                <h3 class="fg-hover-title">${s.t}</h3>
              </div>
              <p>${s.d}</p>
            </div>
          `).join('')}
        </div>

        <div class="recap fg-in" style="--fg-at: 9">
          <p class="fg-label lbl">${t.recapLabel}</p>
          <div class="run">
            ${t.recap.map((r, i) => `
              ${i ? `<span class="ar" aria-hidden="true">→</span>` : ''}
              <span class="st">${r}</span>
            `).join('')}
          </div>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section28);
