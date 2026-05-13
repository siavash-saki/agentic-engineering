/* Tip 9 — Projekt-Regeln pflegen
   Visualization: a rules file at the top broadcasts its rules to three
   sessions below. Each session reads the file before it starts. */

const TAG = 's17-tip-rules';

const RULES = [
  'Tests vor Implementierung',
  'Keine Mocks im Integrationstest',
  'Datenbank: Migration mit Rollback',
  'Logging: strukturiert, kein print()',
];

const SESSIONS = [
  { who: 'Session A',  what: 'Auth refactor',       applied: 'Tests zuerst' },
  { who: 'Session B',  what: 'Search-API',          applied: 'Strukturiertes Log' },
  { who: 'Session C',  what: 'Reports-Migration',   applied: 'Mit Rollback' },
];

class SectionTip09 extends HTMLElement {
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
          animation: tip09-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip09-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: tip09-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .rules-file {
          background: var(--db-cool-gray-100);
          border-left: 4px solid var(--db-red);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          padding: var(--db-space-4) var(--db-space-5);
          position: relative;
          margin: 0 auto var(--db-space-5);
          max-width: 640px;
          opacity: 0;
          animation: tip09-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .rules-file::before {
          content: "AGENTS.md · CLAUDE.md · .cursorrules";
          position: absolute;
          top: -10px; left: 16px;
          background: var(--db-red);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 3px;
        }
        ${TAG} .rules-file ul {
          margin: 8px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 6px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          line-height: 1.5;
        }
        ${TAG} .rules-file li {
          position: relative;
          padding-left: 18px;
          color: var(--db-text-strong);
          opacity: 0;
        }
        ${TAG} .rules-file li::before {
          content: "-";
          position: absolute;
          left: 4px;
          color: var(--db-red);
          font-weight: 700;
        }
        ${TAG} .rules-file li:nth-child(1) { animation: tip09-pop 350ms var(--db-ease) 700ms forwards; }
        ${TAG} .rules-file li:nth-child(2) { animation: tip09-pop 350ms var(--db-ease) 850ms forwards; }
        ${TAG} .rules-file li:nth-child(3) { animation: tip09-pop 350ms var(--db-ease) 1000ms forwards; }
        ${TAG} .rules-file li:nth-child(4) { animation: tip09-pop 350ms var(--db-ease) 1150ms forwards; }

        ${TAG} .flow-lines {
          position: relative;
          height: 30px;
          opacity: 0;
          animation: tip09-fade 400ms var(--db-ease) 1400ms forwards;
        }
        ${TAG} .flow-lines svg {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
        }
        ${TAG} .flow-lines path {
          stroke: var(--db-red);
          stroke-width: 1.5;
          stroke-dasharray: 4 4;
          fill: none;
        }

        ${TAG} .sessions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-3);
        }
        ${TAG} .session {
          background: var(--db-bg);
          border: 1px solid var(--db-border);
          border-radius: var(--db-radius);
          padding: var(--db-space-3) var(--db-space-4);
          display: grid;
          gap: 6px;
          opacity: 0;
          transform: translateY(10px);
        }
        ${TAG} .session:nth-child(1) { animation: tip09-rise 400ms var(--db-ease) 1600ms forwards; }
        ${TAG} .session:nth-child(2) { animation: tip09-rise 400ms var(--db-ease) 1750ms forwards; }
        ${TAG} .session:nth-child(3) { animation: tip09-rise 400ms var(--db-ease) 1900ms forwards; }
        ${TAG} .session .who {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
        }
        ${TAG} .session .what {
          font-size: var(--db-fs-body);
          font-weight: 700;
          color: var(--db-text-strong);
        }
        ${TAG} .session .applied {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: var(--db-fs-small);
          color: var(--db-red);
          font-weight: 700;
          opacity: 0;
        }
        ${TAG} .session .applied::before {
          content: "✓";
          font-weight: 900;
        }
        ${TAG} .session:nth-child(1) .applied { animation: tip09-fade 400ms var(--db-ease) 2150ms forwards; }
        ${TAG} .session:nth-child(2) .applied { animation: tip09-fade 400ms var(--db-ease) 2300ms forwards; }
        ${TAG} .session:nth-child(3) .applied { animation: tip09-fade 400ms var(--db-ease) 2450ms forwards; }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip09-fade 600ms var(--db-ease) 2700ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip09-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip09-rise {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip09-pop { to { opacity: 1; } }

        @media (max-width: 860px) {
          ${TAG} .sessions { grid-template-columns: 1fr; }
          ${TAG} .flow-lines { display: none; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 9 · Disziplin</span>
        <h1>Projekt-Regeln <b>einmal</b> schreiben</h1>
        <p class="lede">
          Konventionen, Standards, Konstanten — was bei jedem Onboarding
          erklärt werden müsste, gehört in eine Datei, die jede Session liest.
        </p>

        <div class="rules-file">
          <ul>
            ${RULES.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <div class="flow-lines" aria-hidden="true">
          <svg viewBox="0 0 600 30" preserveAspectRatio="none">
            <path d="M 300 0 C 300 10, 100 10, 100 30"></path>
            <path d="M 300 0 L 300 30"></path>
            <path d="M 300 0 C 300 10, 500 10, 500 30"></path>
          </svg>
        </div>

        <div class="sessions">
          ${SESSIONS.map(s => `
            <div class="session">
              <div class="who">${s.who}</div>
              <div class="what">${s.what}</div>
              <div class="applied">${s.applied}</div>
            </div>
          `).join('')}
        </div>

        <p class="punch">
          Einmal geschrieben — in <b>jeder Session</b> wirksam.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip09);
