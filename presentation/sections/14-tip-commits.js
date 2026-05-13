/* Tip 6 — Klein committen
   Visualization: two git timelines stacked. Top = one huge commit;
   bottom = many small commits with a rollback arrow pointing to one. */

const TAG = 's14-tip-commits';

const SMALL = [
  'login validation',
  'session token TTL',
  'CSRF middleware',
  'rate-limit auth',
  'audit log entry',
  'refactor guards',
  'unit-test auth',
];

class SectionTip06 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--db-space-6) var(--db-gutter);
          background: var(--db-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: tip06-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip06-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: tip06-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .row {
          display: grid;
          grid-template-columns: 130px 1fr;
          align-items: center;
          gap: var(--db-space-4);
          padding: var(--db-space-4) 0;
          opacity: 0;
        }
        ${TAG} .row.bad  { animation: tip06-fade 500ms var(--db-ease) 500ms forwards; }
        ${TAG} .row.good { animation: tip06-fade 500ms var(--db-ease) 900ms forwards; }
        ${TAG} .row + .row { border-top: 1px solid var(--db-border); }
        ${TAG} .row .side-label {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.3;
        }
        ${TAG} .row.bad  .side-label { color: var(--db-cool-gray-400); }
        ${TAG} .row.good .side-label { color: var(--db-red); }
        ${TAG} .row .side-label span {
          display: block;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          font-size: var(--db-fs-small);
          color: var(--db-text-muted);
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
          background: var(--db-border);
        }
        ${TAG} .row.bad .axis { background: var(--db-cool-gray-300, #cbd1d6); }

        ${TAG} .commit {
          position: relative;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #2dba4e;
          z-index: 2;
        }
        ${TAG} .commit.huge {
          width: 56px; height: 56px;
          background: var(--db-cool-gray-400);
          border: 3px solid var(--db-red);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--db-red);
          font-size: 22px;
          font-weight: 900;
        }
        ${TAG} .commit.huge::after {
          content: "+1247 / -893";
          position: absolute;
          left: 50%;
          top: calc(100% + 6px);
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 11px;
          font-weight: 700;
          color: var(--db-red);
          letter-spacing: 0.04em;
        }
        ${TAG} .row.good .timeline {
          display: grid;
          grid-template-columns: repeat(${SMALL.length}, 1fr);
          align-items: center;
        }
        ${TAG} .row.good .commit {
          justify-self: center;
        }
        ${TAG} .row.good .commit.focus {
          background: var(--db-red);
          box-shadow: 0 0 0 6px rgba(236, 0, 22, 0.18);
          animation: tip06-pulse 1800ms ease-in-out 1600ms infinite;
        }
        ${TAG} .row.good .commit.focus::after {
          content: "hier zurück";
          position: absolute;
          left: 50%;
          bottom: calc(100% + 10px);
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--db-red);
        }
        ${TAG} .row.good .commit.focus::before {
          content: "↓";
          position: absolute;
          left: 50%;
          bottom: 100%;
          transform: translate(-50%, -4px);
          color: var(--db-red);
          font-weight: 900;
          font-size: 14px;
        }
        ${TAG} .row.good .commit .lbl {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 10px;
          color: var(--db-text-muted);
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }

        ${TAG} .row.bad .timeline {
          display: flex;
          justify-content: center;
        }
        ${TAG} .row.bad .commit.huge .x {
          font-size: 28px;
          line-height: 1;
        }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip06-fade 600ms var(--db-ease) 1600ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip06-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip06-pulse {
          0%, 100% { box-shadow: 0 0 0 6px rgba(236, 0, 22, 0.10); }
          50%      { box-shadow: 0 0 0 12px rgba(236, 0, 22, 0.22); }
        }

        @media (max-width: 900px) {
          ${TAG} .row { grid-template-columns: 1fr; }
          ${TAG} .row.good .commit .lbl { display: none; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 6 · Disziplin</span>
        <h1>Klein committen — <b>früh und oft</b></h1>
        <p class="lede">
          Jeder Commit ist ein Reset-Punkt. Ohne sie verliert man Stunden,
          wenn der Agent eine falsche Abzweigung nimmt.
        </p>

        <div class="row bad">
          <div class="side-label">Anti-Pattern<span>„Big Bang"-Commit</span></div>
          <div class="timeline">
            <div class="axis"></div>
            <div class="commit huge"><span class="x">!</span></div>
          </div>
        </div>

        <div class="row good">
          <div class="side-label">So besser<span>Kleine, semantische Commits</span></div>
          <div class="timeline">
            <div class="axis"></div>
            ${SMALL.map((m, i) => `
              <div class="commit ${i === 3 ? 'focus' : ''}"><span class="lbl">${m}</span></div>
            `).join('')}
          </div>
        </div>

        <p class="punch">
          Wenn etwas bricht: <b>ein Commit zurück</b> — nicht ein Tag.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip06);
