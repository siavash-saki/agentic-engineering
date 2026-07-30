/* Tip 6 — Klein committen
   Visualization: two git timelines stacked. Top = one huge commit;
   bottom = many small commits with a rollback arrow pointing to one.
   Punch is one of the deck's six keepers. */

import { getLang } from '../core/i18n.js';

const TAG = 's25-tip-commits';

const CONTENT = {
  en: {
    h1: 'Commit small — <b>early and often</b>',
    lede: `
      Every commit is a checkpoint. Skip them and you burn hours
      the moment the agent takes a wrong turn.`,
    badLabel: 'Anti-Pattern',
    badSub: '"Big Bang" commit',
    goodLabel: 'Do this instead',
    goodSub: 'Small, semantic commits',
    rollback: 'roll back here',
    punch: `When something breaks: <b>one commit back</b> — not a whole day.`,
    small: [
      'login validation',
      'session token TTL',
      'CSRF middleware',
      'rate-limit auth',
      'audit log entry',
      'refactor guards',
      'unit-test auth',
    ],
  },
  de: {
    h1: 'Klein committen — <b>früh und oft</b>',
    lede: `
      Jeder Commit ist ein Reset-Punkt. Ohne sie verliert man Stunden,
      wenn der Agent eine falsche Abzweigung nimmt.`,
    badLabel: 'Anti-Pattern',
    badSub: '„Big Bang"-Commit',
    goodLabel: 'So besser',
    goodSub: 'Kleine, semantische Commits',
    rollback: 'hier zurück',
    punch: `Wenn etwas bricht: <b>ein Commit zurück</b> — nicht ein Tag.`,
    small: [
      'login validation',
      'session token TTL',
      'CSRF middleware',
      'rate-limit auth',
      'audit log entry',
      'refactor guards',
      'unit-test auth',
    ],
  },
};

class SectionTip06 extends HTMLElement {
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
          max-width: 1100px;
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
          max-width: 820px;
          margin: 0 0 var(--ae-space-5);
        }

        /* A comparison: the small-commits timeline is the answer and carries
           the ring; the big-bang row is its plain peer. */
        ${TAG} .row {
          display: grid;
          grid-template-columns: 130px 1fr;
          align-items: center;
          gap: var(--ae-space-4);
          padding: var(--ae-space-4) var(--ae-space-5);
        }
        ${TAG} .row + .row { margin-top: var(--ae-space-4); }
        ${TAG} .row .side-label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.3;
        }
        ${TAG} .row.bad  .side-label { color: var(--ae-cool-gray-400); }
        ${TAG} .row.good .side-label { color: var(--ae-red); }
        ${TAG} .row .side-label span {
          display: block;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          font-size: var(--ae-fs-small);
          color: var(--ae-text-muted);
          margin-top: 4px;
        }

        ${TAG} .timeline {
          position: relative;
          height: 80px;
          display: flex;
          align-items: center;
        }
        ${TAG} .timeline .axis {
          position: absolute;
          left: 0; right: 0; top: 50%;
          height: 2px;
          background: var(--ae-border);
          transform-origin: left center;
          animation: fg-extend var(--fg-dur-draw) var(--ae-ease) calc(60ms + 5 * var(--fg-beat)) both;
        }
        ${TAG} .row.bad .axis { background: var(--ae-cool-gray-300, #cbd1d6); }

        ${TAG} .commit {
          position: relative;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--fg-green);
          z-index: 2;
        }
        ${TAG} .row.good .commit { animation: fg-appear 250ms var(--ae-ease) both; }
        ${TAG} .row.good .commit:nth-child(2) { animation-delay: calc(60ms + 6 * var(--fg-beat)); }
        ${TAG} .row.good .commit:nth-child(3) { animation-delay: calc(60ms + 6 * var(--fg-beat) + 90ms); }
        ${TAG} .row.good .commit:nth-child(4) { animation-delay: calc(60ms + 6 * var(--fg-beat) + 180ms); }
        ${TAG} .row.good .commit:nth-child(5) { animation-delay: calc(60ms + 6 * var(--fg-beat) + 270ms); }
        ${TAG} .row.good .commit:nth-child(6) { animation-delay: calc(60ms + 6 * var(--fg-beat) + 360ms); }
        ${TAG} .row.good .commit:nth-child(7) { animation-delay: calc(60ms + 6 * var(--fg-beat) + 450ms); }
        ${TAG} .row.good .commit:nth-child(8) { animation-delay: calc(60ms + 6 * var(--fg-beat) + 540ms); }
        /* The "!" was the accent green on a mid grey — 1.1:1, effectively
           invisible. This is the anti-pattern marker, so it takes the warning
           hue and a white glyph. */
        ${TAG} .commit.huge {
          width: 56px; height: 56px;
          background: var(--fg-clay);
          border: 3px solid var(--fg-clay);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 22px;
          font-weight: 700;
        }
        ${TAG} .commit.huge::after {
          content: "+1247 / -893";
          position: absolute;
          left: 50%;
          top: calc(100% + 6px);
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          color: var(--ae-red);
          letter-spacing: 0.04em;
        }
        ${TAG} .row.good .timeline {
          display: grid;
          grid-template-columns: repeat(${t.small.length}, 1fr);
          align-items: center;
          /* the first and last labels are centred on their dot and would run
             off both ends of the frame without this */
          padding: 0 var(--ae-space-7);
          height: 104px;
        }
        ${TAG} .row.good .commit {
          justify-self: center;
        }
        ${TAG} .row.good .commit.focus {
          background: var(--ae-red);
          box-shadow: 0 0 0 6px rgba(14, 119, 52, 0.18);
          animation: fg-appear 250ms var(--ae-ease) both,
                     tip06-pulse 1800ms ease-in-out infinite;
          animation-delay: calc(60ms + 6 * var(--fg-beat) + 180ms), 1800ms;
        }
        ${TAG} .row.good .commit.focus::after {
          content: "${t.rollback}";
          position: absolute;
          left: 50%;
          bottom: calc(100% + 10px);
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--ae-red);
        }
        ${TAG} .row.good .commit.focus::before {
          content: "↓";
          position: absolute;
          left: 50%;
          bottom: 100%;
          transform: translate(-50%, -4px);
          color: var(--ae-red);
          font-weight: 900;
          font-size: var(--ae-fs-small);
        }
        /* Seven commit messages along one axis do not fit on a single line at
           any legible size, so they alternate onto two rows — which doubles the
           horizontal room each one has. Held at the 14px floor rather than the
           caption size: this is the densest label in the deck, and the floor is
           a floor, not a target. */
        ${TAG} .row.good .commit .lbl {
          position: absolute;
          top: calc(100% + 7px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: clamp(14px, 1.3vh, 16px);
          line-height: 1.3;
          color: var(--ae-text-muted);
        }
        ${TAG} .row.good .commit.alt .lbl { top: calc(100% + 30px); }

        ${TAG} .row.bad .timeline {
          display: flex;
          justify-content: center;
        }
        ${TAG} .row.bad .commit.huge .x {
          font-size: 28px;
          line-height: 1;
        }

        ${TAG} .punch {
          margin: var(--ae-space-5) 0 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--ae-text-strong);
          text-align: center;
        }
        ${TAG} .punch b { color: var(--ae-red); }

        @keyframes tip06-pulse {
          0%, 100% { box-shadow: 0 0 0 6px rgba(14, 119, 52, 0.10); }
          50%      { box-shadow: 0 0 0 12px rgba(14, 119, 52, 0.22); }
        }

        @media (max-width: 900px) {
          ${TAG} .row { grid-template-columns: 1fr; }
          ${TAG} .row.good .commit .lbl { display: none; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">6</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="row bad fg-card fg-hover fg-in" style="--fg-at: 3">
          <div class="side-label">${t.badLabel}<span>${t.badSub}</span></div>
          <div class="timeline">
            <div class="axis"></div>
            <div class="commit huge"><span class="x">!</span></div>
          </div>
        </div>

        <div class="row good fg-card fg-card--answer fg-hover fg-in" style="--fg-at: 5">
          <div class="side-label">${t.goodLabel}<span>${t.goodSub}</span></div>
          <div class="timeline">
            <div class="axis"></div>
            ${t.small.map((m, i) => `
              <div class="commit ${i === 3 ? 'focus' : ''} ${i % 2 ? 'alt' : ''}"><span class="lbl fg-source">${m}</span></div>
            `).join('')}
          </div>
        </div>

        <p class="punch fg-in" style="--fg-at: 12">${t.punch}</p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip06);
