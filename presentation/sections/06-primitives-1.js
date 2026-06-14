/* Section 6 — Primitives Part 1
   Memory · Skills · MCP — drei framework-unabhängige Bausteine. */

const TAG = 's06-primitives-1';

const PRIMITIVES = [
  {
    num: '01',
    name: 'Memory',
    blurb: 'Markdown-Datei mit dauerhaften Anweisungen, die der Agent bei jedem Session-Start liest — Build-Befehle, Coding-Standards, Architekturentscheidungen.',
    why:   'Einmal aufschreiben, jede Session dabei.',
    rows: [
      ['Claude Code', 'CLAUDE.md  +  @AGENTS.md'],
      ['Copilot',     'AGENTS.md  +  .github/copilot-instructions.md'],
      ['Codex',       'AGENTS.md'],
      ['Kiro',        'AGENTS.md  +  .kiro/steering/'],
    ],
  },
  {
    num: '02',
    name: 'Skills',
    blurb: 'Wiederverwendbare, benannte Prozeduren — ein Release-Playbook, eine Security-Review-Checkliste. Als Markdown gespeichert, vom Modell auf Abruf geladen.',
    why:   '„Tribal Knowledge" wird Code — auditierbar, teilbar.',
    rows: [
      ['Claude Code', 'Skills  (.claude/skills/*/SKILL.md)'],
      ['Copilot',     'Agent Skills  (.github/skills/)'],
      ['Codex',       '— (über Custom Agents)'],
      ['Kiro',        'Prompts  (.kiro/prompts/)'],
    ],
  },
  {
    num: '03',
    name: 'MCP',
    blurb: 'Model Context Protocol — offener Standard, damit Agenten mit externen Systemen reden: Jira, Postgres, GitHub, ein interner Wissens-Hub.',
    why:   'Ein Server, jedes Tool. Wechsel ist reversibel.',
    rows: [
      ['Claude Code', '.mcp.json  +  ~/.claude.json'],
      ['Copilot',     '~/.copilot/mcp-config.json'],
      ['Codex',       '.codex/config.toml'],
      ['Kiro',        '.kiro/settings/mcp.json'],
    ],
  },
];

class Section06 extends HTMLElement {
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
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: s06-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: s06-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 900px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: s06-fade 600ms var(--db-ease) 350ms forwards;
        }
        ${TAG} .lede b { color: var(--db-red); font-weight: 700; }
        ${TAG} .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-4);
        }
        ${TAG} .card {
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-5);
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(12px);
          animation: s06-rise 600ms var(--db-ease) forwards;
        }
        ${TAG} .card:nth-child(1) { animation-delay: 550ms; }
        ${TAG} .card:nth-child(2) { animation-delay: 700ms; }
        ${TAG} .card:nth-child(3) { animation-delay: 850ms; }

        ${TAG} .card .head {
          display: flex;
          align-items: center;
          gap: var(--db-space-3);
          margin-bottom: var(--db-space-3);
        }
        ${TAG} .card .num {
          flex-shrink: 0;
          width: 36px; height: 36px;
          background: var(--db-red);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--db-fs-small);
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .card h2 {
          margin: 0;
          font-size: var(--db-fs-h3);
          line-height: var(--db-lh-h3);
          color: var(--db-text-strong);
        }
        ${TAG} .card .blurb {
          margin: 0 0 var(--db-space-4);
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
        }

        ${TAG} .map {
          margin: 0 0 var(--db-space-4);
          padding: var(--db-space-3) 0;
          border-top: 1px solid var(--db-cool-gray-200);
          border-bottom: 1px solid var(--db-cool-gray-200);
          display: grid;
          gap: 6px;
        }
        ${TAG} .map div { display: grid; grid-template-columns: 96px 1fr; gap: var(--db-space-3); align-items: baseline; }
        ${TAG} .map dt {
          margin: 0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-subtle);
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .map dd {
          margin: 0;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px;
          line-height: 18px;
          color: var(--db-text-strong);
          word-break: break-word;
        }

        ${TAG} .why {
          margin: auto 0 0;
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          font-weight: 700;
          color: var(--db-red);
        }
        ${TAG} .why::before {
          content: "→ ";
          font-weight: 700;
        }

        @keyframes s06-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s06-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          ${TAG} .cards { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Bausteine · Teil 1</span>
        <h1>Memory · Skills · MCP</h1>
        <p class="lede">
          Drei framework-unabhängige Bausteine. Dieselben Konzepte in jedem Tool —
          nur unter <b>anderen Namen</b>.
        </p>
        <div class="cards">
          ${PRIMITIVES.map(p => `
            <div class="card">
              <div class="head">
                <div class="num">${p.num}</div>
                <h2>${p.name}</h2>
              </div>
              <p class="blurb">${p.blurb}</p>
              <dl class="map">
                ${p.rows.map(([k, v]) => `
                  <div><dt>${k}</dt><dd>${v}</dd></div>
                `).join('')}
              </dl>
              <p class="why">${p.why}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section06);
