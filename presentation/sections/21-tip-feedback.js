/* Tip 2 — Give it a feedback loop
   The highest-leverage practice: an agent that can verify its own work
   converges; one that can't just generates. Visualization: open loop vs
   closed loop. Punch is one of the deck's six keepers. */

import { getLang } from '../core/i18n.js';

const TAG = 's21-tip-feedback';

const CONTENT = {
  en: {
    h1: 'Give it a <b>feedback loop</b>',
    lede: `An agent that can verify its own work converges. One that can't
          just generates — and you become its only test.`,
    openLabel: 'Open loop',
    openChips: [
      { text: 'Agent writes code', cls: '' },
      { text: '"looks done"',      cls: 'shrug' },
      { text: 'You debug it later', cls: 'bad' },
    ],
    closedLabel: 'Closed loop',
    closedChips: [
      { text: 'Agent writes code', cls: '' },
      { text: 'Tests · Types · Lint · Build', cls: 'check' },
      { text: 'Green? Done.', cls: 'good' },
    ],
    loopBack: 'red → agent fixes, runs again',
    note: `Want more quality somewhere? Add a criterion or a check —
          exhortation in prose does nothing.`,
    punch: 'Agents build <b>what is checked</b>.',
  },
  de: {
    h1: 'Gib ihm eine <b>Feedback-Schleife</b>',
    lede: `Ein Agent, der seine Arbeit selbst prüfen kann, konvergiert. Einer,
          der es nicht kann, produziert nur — und du bist sein einziger Test.`,
    openLabel: 'Offene Schleife',
    openChips: [
      { text: 'Agent schreibt Code', cls: '' },
      { text: '„sieht fertig aus"',  cls: 'shrug' },
      { text: 'Du debuggst später',  cls: 'bad' },
    ],
    closedLabel: 'Geschlossene Schleife',
    closedChips: [
      { text: 'Agent schreibt Code', cls: '' },
      { text: 'Tests · Types · Lint · Build', cls: 'check' },
      { text: 'Grün? Fertig.', cls: 'good' },
    ],
    loopBack: 'rot → Agent korrigiert, prüft erneut',
    note: `Mehr Qualität an einer Stelle? Ergänze ein Kriterium oder einen
          Check — Appelle in Prosa bewirken nichts.`,
    punch: 'Agenten bauen, <b>was geprüft wird</b>.',
  },
};

class SectionTip02 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    const chips = (list) => list.map((c, i) => `
      ${i > 0 ? '<span class="arr" aria-hidden="true">→</span>' : ''}
      <span class="chip ${c.cls}">${c.text}</span>
    `).join('');
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
          max-width: 860px;
          margin: 0 0 var(--ae-space-5);
        }

        /* This is a comparison, and the closed loop is the answer: it alone
           carries the deep elevation and the ring, and its loop is not a
           caption — it is drawn, arcing from green back to the start. */
        ${TAG} .row {
          display: grid;
          grid-template-columns: 150px 1fr;
          align-items: center;
          gap: var(--ae-space-4);
          padding: var(--ae-space-4) var(--ae-space-5);
        }
        ${TAG} .row + .row { margin-top: var(--ae-space-4); }
        ${TAG} .chainwrap { position: relative; }
        ${TAG} .backarc {
          position: absolute;
          left: 6%;
          right: 6%;
          top: calc(100% - 4px);
          width: 88%;
          height: 30px;
          overflow: visible;
          pointer-events: none;
        }
        ${TAG} .backarc path { stroke-width: 2; opacity: 0.7; }
        ${TAG} .backarc polygon { opacity: 0.7; }

        ${TAG} .row .side-label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.3;
        }
        ${TAG} .row.open   .side-label { color: var(--ae-cool-gray-400); }
        ${TAG} .row.closed .side-label { color: var(--ae-red); }

        ${TAG} .chain {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        ${TAG} .chip {
          padding: 8px 14px;
          border-radius: 999px;
          font-size: var(--ae-fs-small);
          font-weight: 700;
          background: var(--ae-cool-gray-100);
          color: var(--ae-text-strong);
          border: 1.5px solid transparent;
        }
        ${TAG} .chip.shrug {
          background: var(--ae-bg);
          border: 1.5px dashed var(--ae-cool-gray-400);
          color: var(--ae-text-muted);
          font-style: italic;
        }
        ${TAG} .chip.bad {
          /* warning wears the palette's clay, not an off-palette red */
          background: rgba(180, 85, 44, 0.10);
          border-color: var(--fg-clay);
          color: var(--fg-clay);
        }
        ${TAG} .chip.check {
          background: var(--ae-red);
          color: #fff;
        }
        ${TAG} .chip.good {
          background: #DDF1E3;
          border-color: #6FBE89;
          color: #1A5C2F;
        }
        ${TAG} .arr {
          color: var(--ae-cool-gray-400);
          font-weight: 700;
        }

        ${TAG} .row.closed .loopback {
          flex-basis: 100%;
          font-size: var(--ae-fs-caption);
          color: var(--ae-text-muted);
          padding-left: 4px;
          padding-top: 26px;
        }
        ${TAG} .row.closed .loopback::before {
          content: "↺ ";
          color: var(--ae-red);
          font-weight: 900;
        }

        ${TAG} .note {
          margin: var(--ae-space-4) 0 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text-muted);
          text-align: center;
        }

        ${TAG} .punch {
          margin: var(--ae-space-4) 0 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--ae-text-strong);
          text-align: center;
        }
        ${TAG} .punch b { color: var(--ae-red); }

        @media (max-width: 860px) {
          ${TAG} .row { grid-template-columns: 1fr; gap: var(--ae-space-2); }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">2</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="row open fg-card fg-hover fg-in" style="--fg-at: 3">
          <div class="side-label">${t.openLabel}</div>
          <div class="chain">${chips(t.openChips)}</div>
        </div>

        <div class="row closed fg-card fg-card--answer fg-hover fg-in" style="--fg-at: 5">
          <div class="side-label">${t.closedLabel}</div>
          <div class="chainwrap">
            <div class="chain">
              ${chips(t.closedChips)}
              <span class="loopback">${t.loopBack}</span>
            </div>
            <svg class="backarc fg-wire" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="100" d="M 96 2 C 96 24, 4 24, 4 4" style="--fg-at: 8; --fg-dur-draw: 800ms"/>
              <polygon points="0,8 4,0 8,8" fill="var(--fg-green)"
                style="animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + 8 * var(--fg-beat) + 700ms)"/>
            </svg>
          </div>
        </div>

        <p class="note fg-in" style="--fg-at: 10">${t.note}</p>

        <p class="punch fg-in" style="--fg-at: 12">${t.punch}</p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip02);
