/* Section 7 — The gates.
   Two of them, both required: one before code exists, one before the work
   is called done. Drawn as a pipeline so the positions are unambiguous —
   a gate is a point on the line, not a card next to it. */

import { getLang } from '../core/i18n.js';

const TAG = 's07-gate';

const CONTENT = {
  en: {
    h1: 'Two agreements',
    lede: `A gate is a point where the work stops and a person decides. There are
           two, and both of them are yours.`,
    steps: ['Plan', 'Build', 'Review'],
    gates: [
      { n: '1', label: 'Before the code', desc: 'A person agrees the plan' },
      { n: '2', label: 'Before it is done', desc: 'A person accepts the result' },
    ],
    cards: [
      { t: 'Gate 1 — before Build',
        d: 'Without it you did not plan, you wrote a longer prompt. The agent may not cross it alone, however obvious the next step looks.' },
      { t: 'Gate 2 — after Review',
        d: 'The evidence is checked and the work is accepted, or it is not. An agent reporting its own success is not this gate.' },
    ],
    note: `The gates are the difference between the two dashboard prompts.
           <b>Everything else — how formal, how many files, who signs — is yours to choose.</b>`,
  },
  de: {
    h1: 'Zwei Freigaben',
    lede: `Ein Gate ist ein Punkt, an dem die Arbeit stoppt und ein Mensch
           entscheidet. Es gibt zwei, und beide gehören dir.`,
    steps: ['Plan', 'Build', 'Review'],
    gates: [
      { n: '1', label: 'Vor dem Code',   desc: 'Ein Mensch gibt den Plan frei' },
      { n: '2', label: 'Vor dem Fertig', desc: 'Ein Mensch nimmt das Ergebnis ab' },
    ],
    cards: [
      { t: 'Gate 1 — vor Build',
        d: 'Ohne das hast du nicht geplant, sondern nur länger geprompted. Der Agent darf es nicht allein überschreiten, so naheliegend der nächste Schritt auch aussieht.' },
      { t: 'Gate 2 — nach Review',
        d: 'Die Belege werden geprüft und die Arbeit abgenommen — oder eben nicht. Ein Agent, der seinen eigenen Erfolg meldet, ist nicht dieses Gate.' },
    ],
    note: `Die Gates sind der Unterschied zwischen den beiden Dashboard-Prompts.
           <b>Alles Weitere — wie formell, wie viele Dateien, wer unterschreibt — wählst du selbst.</b>`,
  },
};

/* Grid geography: steps in columns 1/3/5, gates in their own fixed
   columns, so a gate label can never collide with a neighbour. */
const STEP_COLS = [1, 3, 5];
const GATE_COLS = [2, 6];

class Section07 extends HTMLElement {
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
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-6); }

        ${TAG} .pipe {
          display: grid;
          grid-template-columns: 1fr 128px 1fr 40px 1fr 128px;
          grid-template-rows: auto 34px auto;
          margin-bottom: var(--ae-space-6);
        }
        /* Row 1 — the steps, standing on the line via a short tick. */
        ${TAG} .st {
          grid-row: 1;
          position: relative;
          align-self: end;
          text-align: center;
          padding-bottom: 20px;
        }
        ${TAG} .st::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          height: 17px;
          border-left: 1.5px solid var(--fg-hair);
        }
        ${TAG} .st h3 {
          margin: 0;
          font-size: var(--ae-fs-h3);
          line-height: 1.15;
          color: var(--fg-ink);
        }
        /* Row 2 — the line, its stops and the gates standing on it. */
        ${TAG} .track { grid-row: 2; grid-column: 1 / -1; width: 100%; height: 100%; }
        ${TAG} .nd {
          grid-row: 2;
          align-self: center;
          justify-self: center;
          width: 13px; height: 13px;
          border-radius: 50%;
          background: var(--fg-green);
          border: 2.5px solid var(--fg-paper);
          box-shadow: 0 0 0 1.5px var(--fg-green);
        }
        ${TAG} .gate {
          grid-row: 2;
          align-self: center;
          justify-self: center;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: var(--fg-green);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ae-fs-small);
          font-weight: 900;
        }
        ${TAG} .gd {
          grid-row: 3;
          padding-top: 12px;
          text-align: center;
        }
        ${TAG} .gd .l {
          font-size: var(--ae-fs-caption);
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--fg-green);
        }
        ${TAG} .gd .d {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }

        ${TAG} .cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-5);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .cards p { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); color: var(--fg-body); }

        @media (max-width: 1100px) {
          ${TAG} .pipe {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            grid-auto-rows: auto;
            gap: var(--ae-space-3);
          }
          ${TAG} .pipe > * { grid-row: auto !important; grid-column: auto !important; }
          ${TAG} .track, ${TAG} .nd { display: none; }
          ${TAG} .st { text-align: left; padding-bottom: 0; align-self: start; }
          ${TAG} .st::after { display: none; }
          ${TAG} .gate { justify-self: start; }
          ${TAG} .gd { text-align: left; padding-top: 0; }
          ${TAG} .cards { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="pipe">
          ${t.steps.map((s, i) => `
            <div class="st fg-in" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${3 + i}">
              <h3>${s}</h3>
            </div>
          `).join('')}

          <svg class="track fg-wire" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 17 L 100 17" style="--fg-at: 3; --fg-dur-draw: 1100ms"/>
          </svg>

          ${t.steps.map((s, i) => `
            <span class="nd" style="grid-column: ${STEP_COLS[i]}; animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + ${4 + i} * var(--fg-beat))" aria-hidden="true"></span>
          `).join('')}

          ${t.gates.map((g, i) => `
            <div class="gate fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${7 + i}">${g.n}</div>
            <div class="gd fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${7 + i}">
              <div class="l">${g.label}</div>
              <div class="d">${g.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="cards">
          ${t.cards.map((c, i) => `
            <div class="fg-card fg-hover fg-in" style="--fg-at: ${9 + i}">
              <h3 class="fg-card__title fg-hover-title">${c.t}</h3>
              <p>${c.d}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 12"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section07);
