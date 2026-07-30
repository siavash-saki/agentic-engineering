/* Section 16 — Who reviews? Not the author.
   The independence ladder for the Review phase: same session → fresh
   session → different model family → human. The staffing question of
   Review, placed right after the workflow slide. */

import { getLang } from '../core/i18n.js';

const TAG = 's16-sdd-review';

const CONTENT = {
  en: {
    h1: 'The author never reviews <b>its own code</b>',
    lede: `The session that wrote the code inherits its own assumptions — it
          re-reads its reasoning and calls it correct. Independence is a ladder:`,
    meterLabel: 'Independence',
    rungs: [
      {
        name: 'Same session',
        body: 'Catches typos. Inherits every assumption and blind spot of the code it just wrote.',
        level: 1,
        quote: null,
      },
      {
        name: 'Fresh session, same model',
        body: 'The conversational bias is gone. The model family\'s blind spots stay.',
        level: 2,
        quote: '"A same-model pass is a separate-session review, not independence."',
      },
      {
        name: 'Different model family',
        body: 'Independent failure modes. One model builds, another reviews.',
        level: 3,
        quote: null,
      },
      {
        name: 'Human',
        body: 'The final gate. Always.',
        level: 4,
        quote: null,
      },
    ],
    practice: `From practice: cross-model review on the PR — what Claude wrote,
          GPT reviews. What GPT wrote, Claude reviews.`,
  },
  de: {
    h1: 'Der Autor reviewt <b>den eigenen Code</b> nicht',
    lede: `Die Session, die den Code geschrieben hat, erbt ihre eigenen Annahmen —
          sie liest ihre Argumentation erneut und findet sie richtig.
          Unabhängigkeit ist eine Leiter:`,
    meterLabel: 'Unabhängigkeit',
    rungs: [
      {
        name: 'Dieselbe Session',
        body: 'Findet Tippfehler. Erbt jede Annahme und jeden blinden Fleck des gerade geschriebenen Codes.',
        level: 1,
        quote: null,
      },
      {
        name: 'Neue Session, gleiches Modell',
        body: 'Der Gesprächs-Bias ist weg. Die blinden Flecken der Modellfamilie bleiben.',
        level: 2,
        quote: '„Ein Review im gleichen Modell ist eine zweite Session — keine Unabhängigkeit."',
      },
      {
        name: 'Andere Modellfamilie',
        body: 'Unabhängige Fehlermuster. Ein Modell baut, ein anderes reviewt.',
        level: 3,
        quote: null,
      },
      {
        name: 'Mensch',
        body: 'Das letzte Gate. Immer.',
        level: 4,
        quote: null,
      },
    ],
    practice: `Aus der Praxis: Cross-Model-Review am PR — was Claude geschrieben hat,
          reviewt GPT. Was GPT geschrieben hat, reviewt Claude.`,
  },
};

class Section16Review extends HTMLElement {
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
          max-width: 1050px;
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
          max-width: 900px;
          margin: 0 0 var(--ae-space-5);
        }

        ${TAG} .ladder {
          display: grid;
          gap: var(--ae-space-3);
        }
        /* The ladder climbs: rungs arrive least-
           independent first, each meter dot lighting one at a time as its
           rung lands — and the human rung is the answer, ring and all. */
        ${TAG} .rung {
          display: grid;
          grid-template-columns: minmax(240px, auto) 1fr auto;
          gap: var(--ae-space-4);
          align-items: center;
          padding: var(--ae-space-3) var(--ae-space-4);
        }

        ${TAG} .rung .name {
          font-weight: 700;
          color: var(--ae-text-strong);
          font-size: var(--ae-fs-body);
          line-height: 1.3;
        }
        ${TAG} .rung .body {
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text);
        }
        ${TAG} .rung .quote {
          display: block;
          margin-top: 4px;
          font-style: italic;
          color: var(--ae-red);
          font-weight: 700;
          font-size: var(--ae-fs-small);
        }

        ${TAG} .meter {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        ${TAG} .meter .dots {
          display: flex;
          gap: 5px;
        }
        ${TAG} .meter .dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--ae-cool-gray-200);
        }
        ${TAG} .meter .dot.on {
          background: var(--ae-red);
          animation: fg-appear 200ms var(--ae-ease) both;
        }
        ${TAG} .meter .lbl {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-text-subtle);
        }

        ${TAG} .practice {
          margin: var(--ae-space-5) 0 0;
          padding: var(--ae-space-3) var(--ae-space-5);
          background: var(--ae-cool-gray-100);
          border-radius: 0 var(--ae-radius) var(--ae-radius) 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
        }

        @media (max-width: 860px) {
          ${TAG} .rung { grid-template-columns: 1fr; gap: 6px; }
          ${TAG} .meter { align-items: flex-start; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="ladder">
          ${t.rungs.map((r, ri) => `
            <div class="rung fg-card ${ri === 3 ? 'fg-card--answer' : ''} fg-hover fg-in" style="--fg-at: ${3 + ri * 2}">
              <span class="name ${ri === 3 ? '' : 'fg-hover-title'}">${r.name}</span>
              <span class="body">
                ${r.body}
                ${r.quote ? `<span class="quote">${r.quote}</span>` : ''}
              </span>
              <span class="meter">
                <span class="dots">
                  ${[1, 2, 3, 4].map(i => `<span class="dot ${i <= r.level ? 'on' : ''}" ${i <= r.level ? `style="animation-delay: calc(60ms + ${3 + ri * 2} * var(--fg-beat) + ${i * 130}ms)"` : ''}></span>`).join('')}
                </span>
                <span class="lbl">${t.meterLabel}</span>
              </span>
            </div>
          `).join('')}
        </div>

        <p class="practice fg-in" style="--fg-at: 12">${t.practice}</p>
      </div>
    `;
  }
}

customElements.define(TAG, Section16Review);
