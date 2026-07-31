/* Section 5 — The loop.
   The spine of the deck, stated once and never renamed. Three steps on a
   drawn line, one line of copy each. The audience will think "obviously"
   here; the next slide is what earns their attention back. */

import { getLang } from '../core/i18n.js';

const TAG = 's05-loop';

const CONTENT = {
  en: {
    h1: 'Plan → Build → Review',
    lede: `The whole method. Everything after this slide is one of these three
           steps, done more carefully.`,
    steps: [
      { n: '1', t: 'Plan',   d: 'Decide what it should do. Write it down.' },
      { n: '2', t: 'Build',  d: 'Small steps. One step, one commit.' },
      { n: '3', t: 'Review', d: 'Check it against the plan. Then let another model read it.' },
    ],
    note: `Not new. It has been the advice since long before agents existed.
           <b>What changed is why it has to be written down.</b>`,
  },
  de: {
    h1: 'Plan → Build → Review',
    lede: `Die ganze Methode. Alles nach dieser Folie ist einer dieser drei
           Schritte, sorgfältiger ausgeführt.`,
    steps: [
      { n: '1', t: 'Plan',   d: 'Entscheiden, was es tun soll. Aufschreiben.' },
      { n: '2', t: 'Build',  d: 'Kleine Schritte. Ein Schritt, ein Commit.' },
      { n: '3', t: 'Review', d: 'Gegen den Plan prüfen. Dann ein anderes Modell lesen lassen.' },
    ],
    note: `Nicht neu. Das ist der Rat, seit es Software gibt.
           <b>Neu ist, warum es aufgeschrieben wird.</b>`,
  },
};

class Section05 extends HTMLElement {
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
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h1);
          line-height: var(--ae-lh-h1);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-7); }

        ${TAG} .flow {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ae-space-5);
          position: relative;
          margin-bottom: var(--ae-space-6);
        }
        ${TAG} .flow .thread {
          position: absolute;
          left: 0; right: 0; top: 50%;
          height: 2px;
        }
        ${TAG} .step {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-3);
        }
        ${TAG} .step .head { display: flex; align-items: center; gap: var(--ae-space-3); }
        ${TAG} .step h3 {
          margin: 0;
          font-size: var(--ae-fs-h2);
          line-height: 1.1;
          color: var(--fg-ink);
        }
        ${TAG} .step p {
          margin: 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--fg-body);
        }
        @media (max-width: 1000px) {
          ${TAG} .flow { grid-template-columns: 1fr; }
          ${TAG} .flow .thread { display: none; }
          ${TAG} h1 { font-size: var(--ae-fs-h2); }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="flow">
          <svg class="thread fg-wire" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 1 L 100 1" style="--fg-at: 3; --fg-dur-draw: 1100ms"/>
          </svg>
          ${t.steps.map((s, i) => `
            <div class="step fg-card fg-card--raised fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="head">
                <span class="fg-badge">${s.n}</span>
                <h3 class="fg-hover-title">${s.t}</h3>
              </div>
              <p>${s.d}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 7"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section05);
