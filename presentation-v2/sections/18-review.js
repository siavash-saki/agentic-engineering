/* Section 19 — Review, chapter opener.
   Two questions that get conflated, separated here and kept separate for
   the rest of the chapter. The point of the slide is that answering one
   of them feels like answering both. */

import { getLang } from '../core/i18n.js';

const TAG = 's18-review';

const CONTENT = {
  en: {
    kicker: 'Step 3 of 3',
    h1: 'Review',
    lede: `Two questions. They have different answers, different evidence, and
           different people answering them.`,
    qs: [
      {
        n: '1',
        q: 'Did we build what we agreed?',
        meas: 'Measured against the plan',
        by: 'Answered by you',
        d: 'Walk the acceptance criteria one at a time. Each row needs evidence, not an opinion. This is the question the plan exists to make answerable.',
      },
      {
        n: '2',
        q: 'Is the code any good?',
        meas: 'Measured against the craft',
        by: 'Answered by a model that was not there',
        d: 'Structure, edge cases, error handling, the test that cannot fail. This one cannot be answered by the model that wrote the code, and often not by you either.',
      },
    ],
    note: `Most people answer the second question badly and the first one not at
           all — then run the tests and call it review.
           <b>"It runs" answers neither.</b>`,
  },
  de: {
    kicker: 'Schritt 3 von 3',
    h1: 'Review',
    lede: `Zwei Fragen. Sie haben unterschiedliche Antworten, unterschiedliche
           Belege und unterschiedliche Beantworter.`,
    qs: [
      {
        n: '1',
        q: 'Wurde geliefert, was vereinbart war?',
        meas: 'Gemessen am Plan',
        by: 'Beantwortet von dir',
        d: 'Die Akzeptanzkriterien einzeln durchgehen. Jede Zeile braucht einen Beleg, keine Einschätzung. Für diese Frage existiert der Plan.',
      },
      {
        n: '2',
        q: 'Taugt der Code etwas?',
        meas: 'Gemessen am Handwerk',
        by: 'Beantwortet von einem Modell, das nicht dabei war',
        d: 'Struktur, Randfälle, Fehlerbehandlung, der Test, der nicht scheitern kann. Diese Frage kann das Modell, das den Code geschrieben hat, nicht beantworten — und oft du auch nicht.',
      },
    ],
    note: `Die meisten beantworten die zweite Frage schlecht und die erste gar
           nicht — dann laufen die Tests, und das heißt dann Review.
           <b>„Es läuft" beantwortet keine von beiden.</b>`,
  },
};

class Section19 extends HTMLElement {
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
        ${TAG} .kicker {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-green);
          margin: 0 0 var(--ae-space-2);
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h1);
          line-height: var(--ae-lh-h1);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-6); }

        ${TAG} .qs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-5);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .q { display: flex; flex-direction: column; gap: var(--ae-space-3); }
        ${TAG} .q .head { display: flex; align-items: flex-start; gap: var(--ae-space-3); }
        ${TAG} .q h3 {
          margin: 0;
          font-size: var(--ae-fs-h3);
          line-height: 1.15;
          color: var(--fg-ink);
        }
        ${TAG} .q .meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ae-space-2) var(--ae-space-4);
        }
        ${TAG} .q .meta span {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          color: var(--fg-green-d);
        }
        ${TAG} .q .d {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        @media (max-width: 960px) {
          ${TAG} .qs { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <p class="kicker fg-in" style="--fg-at: 1">${t.kicker}</p>
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="qs">
          ${t.qs.map((q, i) => `
            <div class="q fg-card fg-card--raised fg-hover fg-in" style="--fg-at: ${3 + i * 2}">
              <div class="head">
                <span class="fg-badge">${q.n}</span>
                <h3 class="fg-hover-title">${q.q}</h3>
              </div>
              <div class="meta">
                <span>${q.meas}</span>
                <span>${q.by}</span>
              </div>
              <p class="d">${q.d}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 8"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section19);
