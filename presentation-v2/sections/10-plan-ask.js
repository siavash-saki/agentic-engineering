/* Section 11 — Make it ask.
   The questions are the content of this slide, not the instruction that
   produces them. Four real questions about a small feature, each one a
   decision that would otherwise have been made silently. */

import { getLang } from '../core/i18n.js';

const TAG = 's10-plan-ask';

const CONTENT = {
  en: {
    h1: 'Make it ask',
    lede: `A model that does not ask will guess, and a guess comes back looking
           exactly like an answer. So require the questions.`,
    instrLabel: 'The instruction',
    instr: 'We need rate limiting on the public API. Do not write anything yet. Ask me every question you need answered to write the plan without guessing.',
    qLabel: 'What comes back',
    questions: [
      'Per API key, per IP address, or per authenticated user?',
      'A fixed window or a sliding one? The existing cache supports both.',
      'What should a rejected request return — 429 with a Retry-After, or a queued response?',
      'Do internal service calls count against the same limit?',
    ],
    answerLabel: 'Why this matters',
    answer: `Four questions, four decisions. Without them the agent picks one
             answer for each — per IP, fixed window, plain 429, internal calls
             included — and all four are defensible, and none of them are yours.`,
    note: `The questions are where the requirements actually are.
           <b>You do not know what you left out until something asks.</b>`,
  },
  de: {
    h1: 'Fragen lassen',
    lede: `Ein Modell, das nicht fragt, rät — und ein geratener Wert kommt
           zurück und sieht aus wie eine Antwort. Also verlang die Fragen.`,
    instrLabel: 'Die Anweisung',
    instr: 'Wir brauchen Rate-Limiting auf der öffentlichen API. Schreib noch nichts. Stell mir jede Frage, die du beantwortet brauchst, um den Plan ohne Raten zu schreiben.',
    qLabel: 'Was zurückkommt',
    questions: [
      'Pro API-Key, pro IP-Adresse oder pro authentifiziertem Nutzer?',
      'Festes Zeitfenster oder gleitendes? Der bestehende Cache kann beides.',
      'Was gibt ein abgelehnter Request zurück — 429 mit Retry-After oder eine Queue-Antwort?',
      'Zählen interne Service-Aufrufe gegen dasselbe Limit?',
    ],
    answerLabel: 'Warum das zählt',
    answer: `Vier Fragen, vier Entscheidungen. Ohne sie wählt der Agent je eine
             Antwort — pro IP, festes Fenster, schlichtes 429, interne Aufrufe
             inbegriffen — und alle vier sind vertretbar, und keine davon ist deine.`,
    note: `In den Fragen stecken die Anforderungen.
           <b>Was fehlt, merkt man erst, wenn etwas nachfragt.</b>`,
  },
};

class Section11 extends HTMLElement {
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

        ${TAG} .instr {
          padding: var(--ae-space-4) var(--ae-space-5);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .instr .lbl { margin-bottom: var(--ae-space-2); }
        ${TAG} .instr p:not(.fg-label) {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: 1.5;
          color: var(--fg-ink);
        }

        ${TAG} .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: var(--ae-space-5);
          align-items: start;
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .qs { margin: 0; padding: 0; list-style: none; }
        ${TAG} .qs .lbl { margin-bottom: var(--ae-space-3); }
        ${TAG} .qs li {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: var(--ae-space-3);
          align-items: baseline;
          padding: var(--ae-space-3) 0;
          border-bottom: 1px solid var(--fg-hair);
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-ink);
        }
        ${TAG} .qs li:last-child { border-bottom: 0; }
        ${TAG} .qs .mark { color: var(--fg-green); font-weight: 700; }

        ${TAG} .why .lbl { margin-bottom: var(--ae-space-2); }
        ${TAG} .why p:not(.fg-label) {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        @media (max-width: 1000px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="instr fg-card fg-in" style="--fg-at: 3">
          <p class="fg-label lbl">${t.instrLabel}</p>
          <p class="fg-source">${t.instr}</p>
        </div>

        <div class="grid">
          <div class="fg-in" style="--fg-at: 4">
            <p class="fg-label lbl">${t.qLabel}</p>
            <ul class="qs">
              ${t.questions.map((q, i) => `
                <li class="fg-in" style="--fg-at: ${5 + i}">
                  <span class="mark" aria-hidden="true">?</span><span>${q}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="why fg-card fg-in" style="--fg-at: 8">
            <p class="fg-label lbl">${t.answerLabel}</p>
            <p>${t.answer}</p>
          </div>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 10"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section11);
