/* Tip 10 — Projekt-Regeln schreiben & pflegen
   Visualization: a rules file at the top broadcasts its rules to three
   sessions below. A new rule fades in late to show that the file grows
   with the project. */

const TAG = 's19-tip-rules';

const RULES = [
  { text: 'Tests vor Implementierung',           neu: false },
  { text: 'Keine Mocks im Integrationstest',     neu: false },
  { text: 'Datenbank: Migration mit Rollback',   neu: false },
  { text: 'Logging: strukturiert, kein print()', neu: false },
  { text: 'Feature-Flag für jede Migration',     neu: true  },
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
          color: var(--db-red); font-size: var(--db-fs-h4); letter-spacing: 0.04em; font-weight: 900;
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
        ${TAG} .rules-file li.neu          { animation: tip09-pop 500ms var(--db-ease) 2700ms forwards; }
        ${TAG} .rules-file li .neu-badge {
          display: inline-block;
          margin-left: 8px;
          padding: 1px 6px;
          background: var(--db-red);
          color: #fff;
          font-size: 9px;
          letter-spacing: 0.08em;
          font-weight: 700;
          border-radius: 3px;
          vertical-align: 1px;
          opacity: 0;
          animation: tip09-fade 350ms var(--db-ease) 3000ms forwards;
        }

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
          animation: tip09-fade 600ms var(--db-ease) 3300ms forwards;
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
        <span class="db-eyebrow">Tip 10</span>
        <h1>Projekt-Regeln <b>schreiben</b> und <b>pflegen</b></h1>
        <p class="lede">
          Konventionen, Standards, Konstanten — was bei jedem Onboarding erklärt
          werden müsste, gehört in eine Datei, die jede Session liest. Pflege sie
          wie Code: passe sie an, wenn das Projekt wächst.
        </p>

        <div class="rules-file">
          <ul>
            ${RULES.map(r => `<li class="${r.neu ? 'neu' : ''}">${r.text}${r.neu ? '<span class="neu-badge">NEU</span>' : ''}</li>`).join('')}
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
          Einmal schreiben, <b>regelmäßig pflegen</b> — in jeder Session wirksam.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip09);
