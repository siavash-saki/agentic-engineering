/* Section 9 — Plan, chapter opener.
   Two questions and four moves. The moves are not phases and are not
   gated; they are what one person and one agent actually do between the
   idea and the agreed plan. */

import { getLang } from '../core/i18n.js';

const TAG = 's08-plan';

const CONTENT = {
  en: {
    kicker: 'Step 1 of 3',
    h1: 'Plan',
    lede: `Two questions, in this order: what should it do, and how should it
           be built. Answering the second one first is the most common way
           this goes wrong.`,
    moves: [
      { n: '1', t: 'Read',     d: 'The agent reads the code, the patterns and the tests before it proposes anything.' },
      { n: '2', t: 'Ask',      d: 'It asks until it can write the plan without guessing. The questions are where the requirements are.' },
      { n: '3', t: 'Converge', d: 'Options and trade-offs, decided by a person. This is a conversation, not a hand-off.' },
      { n: '4', t: 'Write',    d: 'The agreed answers go in a file. That file is what Build reads and what Review measures against.' },
    ],
    note: `In this step you are <b>a participant</b>. In the next two you are a
           judge. That difference is the whole reason this step takes the
           longest.`,
  },
  de: {
    kicker: 'Schritt 1 von 3',
    h1: 'Plan',
    lede: `Zwei Fragen, in dieser Reihenfolge: Was soll es tun, und wie soll es
           gebaut werden. Die zweite zuerst zu beantworten ist der häufigste
           Fehler.`,
    moves: [
      { n: '1', t: 'Lesen',   d: 'Der Agent liest Code, Muster und Tests, bevor er irgendetwas vorschlägt.' },
      { n: '2', t: 'Fragen',  d: 'Er fragt, bis er den Plan ohne Raten schreiben kann. In den Fragen stecken die Anforderungen.' },
      { n: '3', t: 'Klären',  d: 'Optionen und Abwägungen, entschieden von einem Menschen. Das ist ein Gespräch, keine Übergabe.' },
      { n: '4', t: 'Schreiben', d: 'Die geklärten Antworten kommen in eine Datei. Diese Datei liest Build, und gegen sie misst Review.' },
    ],
    note: `In diesem Schritt bist du <b>Beteiligter</b>. In den beiden folgenden
           bist du Prüfer. Genau deshalb dauert dieser Schritt am längsten.`,
  },
};

class Section09 extends HTMLElement {
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

        ${TAG} .moves {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--ae-space-4);
          position: relative;
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .moves .thread { position: absolute; left: 0; right: 0; top: 44%; height: 2px; }
        ${TAG} .mv { position: relative; display: flex; flex-direction: column; gap: var(--ae-space-2); }
        ${TAG} .mv .head { display: flex; align-items: center; gap: var(--ae-space-2); }
        ${TAG} .mv h3 { margin: 0; font-size: var(--ae-fs-h4); line-height: var(--ae-lh-h4); color: var(--fg-ink); }
        ${TAG} .mv p { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); color: var(--fg-body); }

        @media (max-width: 1100px) {
          ${TAG} .moves { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          ${TAG} .moves .thread { display: none; }
        }
        @media (max-width: 640px) {
          ${TAG} .moves { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <p class="kicker fg-in" style="--fg-at: 1">${t.kicker}</p>
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="moves">
          <svg class="thread fg-wire" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 1 L 100 1" style="--fg-at: 3; --fg-dur-draw: 1100ms"/>
          </svg>
          ${t.moves.map((m, i) => `
            <div class="mv fg-card fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="head">
                <span class="fg-badge">${m.n}</span>
                <h3 class="fg-hover-title">${m.t}</h3>
              </div>
              <p>${m.d}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 8"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section09);
