/* Section 6 — What the loop buys you.
   Deliberately the lightest slide in the deck: one claim, three short
   consequences, one line of cost. An earlier draft argued this in two
   dense cards and did not survive being read aloud. */

import { getLang } from '../core/i18n.js';

const TAG = 's06-changed';

const CONTENT = {
  en: {
    h1: 'The agent builds <span class="fg-mark fg-mark--sweep">what you asked for</span>',
    lede: `Not something next to it. That is the whole return on the first step.`,
    points: [
      { t: 'No guessing',      d: 'Every blank you leave, the model fills in — plausibly, and silently.' },
      { t: 'No drifting',      d: 'It builds against a written plan, not against its memory of the chat.' },
      { t: 'You can check it', d: 'You did not write the code, so you need a yardstick. The plan is the yardstick.' },
    ],
    cost: 'The price is one conversation before the first line of code.',
  },
  de: {
    h1: 'Der Agent baut, <span class="fg-mark fg-mark--sweep">was du willst</span>',
    lede: `Nicht irgendwas daneben. Das ist der ganze Ertrag des ersten Schritts.`,
    points: [
      { t: 'Kein Raten',          d: 'Jede Lücke, die du lässt, füllt das Modell — plausibel und lautlos.' },
      { t: 'Kein Abdriften',      d: 'Er baut gegen einen geschriebenen Plan, nicht gegen sein Gedächtnis vom Chat.' },
      { t: 'Du kannst es prüfen', d: 'Der Code stammt nicht von dir, also brauchst du einen Maßstab. Der Plan ist der Maßstab.' },
    ],
    cost: 'Der Preis ist ein Gespräch vor der ersten Zeile Code.',
  },
};

class Section06 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-4);
          font-size: var(--ae-fs-h1);
          line-height: var(--ae-lh-h1);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-8); }

        ${TAG} .points {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ae-space-6);
          margin-bottom: var(--ae-space-7);
        }
        ${TAG} .p { display: flex; flex-direction: column; gap: var(--ae-space-2); }
        ${TAG} .p h3 {
          margin: 0;
          font-size: var(--ae-fs-h3);
          line-height: 1.15;
          color: var(--fg-green-d);
        }
        ${TAG} .p p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        ${TAG} .cost {
          margin: 0;
          padding-top: var(--ae-space-4);
          border-top: 1px solid var(--fg-hair);
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--fg-muted);
        }
        @media (max-width: 1000px) {
          ${TAG} .points { grid-template-columns: 1fr; gap: var(--ae-space-4); }
          ${TAG} h1 { font-size: var(--ae-fs-h2); }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="points">
          ${t.points.map((p, i) => `
            <div class="p fg-in" style="--fg-at: ${3 + i}">
              <h3>${p.t}</h3>
              <p>${p.d}</p>
            </div>
          `).join('')}
        </div>

        <p class="cost fg-in" style="--fg-at: 7">${t.cost}</p>
      </div>
    `;
  }
}

customElements.define(TAG, Section06);
