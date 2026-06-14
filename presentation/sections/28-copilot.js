/* Section 28 — Agenten in der Praxis
   Montag-morgen-Aktionsplan. Tool-unabhängig formuliert. */

import { getLang } from '../core/i18n.js';

const TAG = 's28-copilot';

const CONTENT = {
  en: {
    eyebrow: 'Get concrete',
    h1: 'Monday morning — <b>where do you start?</b>',
    lede: `Three concrete moves. Each one fits in a sane block of time —
          and each one pays off from day one.`,
    steps: [
      {
        when:  'Today',
        time:  '15 minutes',
        title: 'Set up Memory',
        body:  'Drop a Memory file in your repo root — <code>AGENTS.md</code>, <code>CLAUDE.md</code> or <code>.github/copilot-instructions.md</code>, depending on your tool. Three sections is plenty:',
        bullets: [
          'Build command &amp; test command',
          'The coding standards you actually enforce',
          '"Always do X" / "Never do Y"',
        ],
      },
      {
        when:  'This week',
        time:  '1 hour',
        title: 'Write your first Skill',
        body:  'Take a recurring task — code-review checklist, release steps, onboarding — and capture it as a Skill:',
        bullets: [
          '<code>.&lt;tool&gt;/skills/&lt;name&gt;/SKILL.md</code>',
          'Call it on demand with <code>/&lt;name&gt;</code>',
          'Auto-loaded by the model when the description fits',
        ],
      },
      {
        when:  'This month',
        time:  'Half a day',
        title: 'Wire up an MCP server',
        body:  'Let the agent talk to the systems you live in — Git platform, docs, semantic code search:',
        bullets: [
          'MCP config in the repo — <code>.mcp.json</code> or <code>.vscode/mcp.json</code>',
          'e.&nbsp;g. <code>git</code>, <code>docs</code>, <code>semantic-code</code>',
          'Configure it once — every MCP-aware IDE picks it up',
        ],
      },
    ],
    punch: 'The tools will change. <b>The practice stays.</b>',
  },
  de: {
    eyebrow: 'Konkret werden',
    h1: 'Montag morgen — <b>was tun?</b>',
    lede: `Drei konkrete Schritte. Jeder davon ist in einer überschaubaren Zeit
          machbar — und jeder davon zahlt sich ab dem ersten Tag aus.`,
    steps: [
      {
        when:  'Heute',
        time:  '15 Minuten',
        title: 'Memory anlegen',
        body:  'Im Repo-Root eine Memory-Datei anlegen — je nach Tool <code>AGENTS.md</code>, <code>CLAUDE.md</code> oder <code>.github/copilot-instructions.md</code>. Drei Abschnitte reichen:',
        bullets: [
          'Build-Befehl &amp; Test-Befehl',
          'Coding-Standards, die ihr wirklich anwendet',
          '„Immer X tun" / „Niemals Y tun"',
        ],
      },
      {
        when:  'Diese Woche',
        time:  '1 Stunde',
        title: 'Erstes Skill schreiben',
        body:  'Eine wiederkehrende Aufgabe — Code-Review-Checkliste, Release-Schritte, Onboarding — als Skill speichern:',
        bullets: [
          '<code>.&lt;tool&gt;/skills/&lt;name&gt;/SKILL.md</code>',
          'Slash-aufrufbar via <code>/&lt;name&gt;</code>',
          'Vom Modell auto-geladen, wenn Beschreibung passt',
        ],
      },
      {
        when:  'Diesen Monat',
        time:  'Ein Halbtag',
        title: 'MCP-Server konfigurieren',
        body:  'Den Agenten mit euren wichtigsten Systemen reden lassen — Git-Plattform, Doku, semantische Code-Suche:',
        bullets: [
          'MCP-Konfig im Repo — <code>.mcp.json</code> oder <code>.vscode/mcp.json</code>',
          'z.&nbsp;B. <code>git</code>, <code>docs</code>, <code>semantic-code</code>',
          'Einmal konfiguriert — jede MCP-fähige IDE nutzt ihn',
        ],
      },
    ],
    punch: 'Die Werkzeuge ändern sich. <b>Die Praxis bleibt.</b>',
  },
};

class Section28 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
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
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: s10-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h1);
          line-height: var(--db-lh-h1);
          opacity: 0;
          animation: s10-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 900px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: s10-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-4);
          margin-bottom: var(--db-space-6);
        }
        ${TAG} .step {
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-5);
          display: flex;
          flex-direction: column;
          gap: var(--db-space-3);
          opacity: 0;
          transform: translateY(12px);
          animation: s10-rise 600ms var(--db-ease) forwards;
          position: relative;
          overflow: hidden;
        }
        ${TAG} .step::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--db-red);
        }
        ${TAG} .step:nth-child(1) { animation-delay: 500ms; }
        ${TAG} .step:nth-child(2) { animation-delay: 650ms; }
        ${TAG} .step:nth-child(3) { animation-delay: 800ms; }

        ${TAG} .step .when {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--db-space-3);
          margin-top: 2px;
        }
        ${TAG} .step .when .label {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--db-red);
        }
        ${TAG} .step .when .time {
          font-size: var(--db-fs-caption);
          color: var(--db-text-muted);
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .step h3 {
          margin: 0;
          font-size: var(--db-fs-h3);
          line-height: var(--db-lh-h3);
          color: var(--db-text-strong);
        }
        ${TAG} .step p {
          margin: 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
        }
        ${TAG} .step ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
        }
        ${TAG} .step li {
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text);
          padding-left: 16px;
          position: relative;
        }
        ${TAG} .step li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--db-red);
          font-weight: 700;
        }
        ${TAG} code {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px;
          padding: 1px 4px;
          background: var(--db-bg);
          border-radius: 2px;
          color: var(--db-text-strong);
        }

        ${TAG} .punch {
          margin: 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: s10-fade 600ms var(--db-ease) 1100ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes s10-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s10-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          ${TAG} .steps { grid-template-columns: 1fr; }
          ${TAG} h1 { font-size: var(--db-fs-h2); line-height: var(--db-lh-h2); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>
        <p class="lede">${t.lede}</p>

        <div class="steps">
          ${t.steps.map(s => `
            <div class="step">
              <div class="when">
                <span class="label">${s.when}</span>
                <span class="time">${s.time}</span>
              </div>
              <h3>${s.title}</h3>
              <p>${s.body}</p>
              <ul>
                ${s.bullets.map(b => `<li>${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <p class="punch">${t.punch}</p>
      </div>
    `;
  }
}

customElements.define(TAG, Section28);
