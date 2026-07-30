/* Section 5 — Primitives Part 1
   Memory · Skills · MCP — three framework-agnostic building blocks.
   Tool mappings verified against official docs, July 2026. */

import { getLang } from '../core/i18n.js';

const TAG = 's05-primitives-1';

const CONTENT = {
  en: {
    h1: 'Memory · Skills · MCP',
    lede: `Three framework-agnostic building blocks. The same concepts in every
          tool — and increasingly even under the <b>same file names</b>.`,
    primitives: [
      {
        num: '01',
        name: 'Memory',
        blurb: 'A markdown file of standing instructions the agent reads at every session start — build commands, coding standards, architecture decisions.',
        why:   'One file: AGENTS.md — the rest symlink or import it.',
        rows: [
          ['Claude Code', 'CLAUDE.md  (AGENTS.md via symlink / @import)'],
          ['Copilot',     'AGENTS.md  +  .github/copilot-instructions.md'],
          ['Codex',       'AGENTS.md  (native)'],
          ['Kiro',        'AGENTS.md  +  .kiro/steering/'],
          ['Cursor',      'AGENTS.md  +  .cursor/rules/'],
        ],
      },
      {
        num: '02',
        name: 'Skills',
        blurb: 'Reusable, named procedures — a release playbook, a review checklist. Stored as SKILL.md files, loaded by the model on demand. An open standard by now.',
        why:   'Tribal knowledge becomes code — auditable, shareable.',
        rows: [
          ['Claude Code', '.claude/skills/&lt;name&gt;/SKILL.md'],
          ['Copilot',     '.github/skills/'],
          ['Codex',       '.agents/skills/'],
          ['Kiro',        '.kiro/skills/'],
          ['Cursor',      '.cursor/skills/'],
        ],
      },
      {
        num: '03',
        name: 'MCP',
        blurb: 'Model Context Protocol — an open standard that lets agents talk to external systems: Jira, Postgres, GitHub, an internal knowledge hub.',
        why:   'One server, every tool. The switch is reversible.',
        rows: [
          ['Claude Code', '.mcp.json'],
          ['Copilot',     '.vscode/mcp.json  ·  ~/.copilot/'],
          ['Codex',       '.codex/config.toml'],
          ['Kiro',        '.kiro/settings/mcp.json'],
          ['Cursor',      '.cursor/mcp.json'],
        ],
      },
    ],
    stamp: 'Tool mappings verified against official docs · July 2026',
  },
  de: {
    h1: 'Memory · Skills · MCP',
    lede: `Drei framework-unabhängige Bausteine. Dieselben Konzepte in jedem Tool —
          inzwischen sogar zunehmend unter <b>denselben Dateinamen</b>.`,
    primitives: [
      {
        num: '01',
        name: 'Memory',
        blurb: 'Markdown-Datei mit dauerhaften Anweisungen, die der Agent bei jedem Session-Start liest — Build-Befehle, Coding-Standards, Architekturentscheidungen.',
        why:   'Eine Datei: AGENTS.md — der Rest verlinkt oder importiert sie.',
        rows: [
          ['Claude Code', 'CLAUDE.md  (AGENTS.md via Symlink / @import)'],
          ['Copilot',     'AGENTS.md  +  .github/copilot-instructions.md'],
          ['Codex',       'AGENTS.md  (nativ)'],
          ['Kiro',        'AGENTS.md  +  .kiro/steering/'],
          ['Cursor',      'AGENTS.md  +  .cursor/rules/'],
        ],
      },
      {
        num: '02',
        name: 'Skills',
        blurb: 'Wiederverwendbare, benannte Prozeduren — ein Release-Playbook, eine Review-Checkliste. Als SKILL.md gespeichert, vom Modell auf Abruf geladen. Inzwischen ein offener Standard.',
        why:   '„Tribal Knowledge" wird Code — auditierbar, teilbar.',
        rows: [
          ['Claude Code', '.claude/skills/&lt;name&gt;/SKILL.md'],
          ['Copilot',     '.github/skills/'],
          ['Codex',       '.agents/skills/'],
          ['Kiro',        '.kiro/skills/'],
          ['Cursor',      '.cursor/skills/'],
        ],
      },
      {
        num: '03',
        name: 'MCP',
        blurb: 'Model Context Protocol — offener Standard, damit Agenten mit externen Systemen reden: Jira, Postgres, GitHub, ein interner Wissens-Hub.',
        why:   'Ein Server, jedes Tool. Wechsel ist reversibel.',
        rows: [
          ['Claude Code', '.mcp.json'],
          ['Copilot',     '.vscode/mcp.json  ·  ~/.copilot/'],
          ['Codex',       '.codex/config.toml'],
          ['Kiro',        '.kiro/settings/mcp.json'],
          ['Cursor',      '.cursor/mcp.json'],
        ],
      },
    ],
    stamp: 'Tool-Zuordnungen geprüft gegen offizielle Doku · Stand Juli 2026',
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
        ${TAG} .fg-lede {
          max-width: 76ch;
          margin: 0 0 var(--ae-space-5);
        }
        /* Three primitives, no hierarchy between them: peers at one depth.
           The mapping rows land in sync ACROSS the cards — row by row, not
           card by card — because the point is that every tool has all three. */
        ${TAG} .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--ae-space-4);
        }
        ${TAG} .card {
          display: flex;
          flex-direction: column;
        }

        ${TAG} .card .head {
          display: flex;
          align-items: center;
          gap: var(--ae-space-3);
          margin-bottom: var(--ae-space-3);
        }
        ${TAG} .card h2 {
          margin: 0;
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h3);
          line-height: var(--ae-lh-h3);
          font-weight: 600;
          color: var(--fg-ink);
        }
        ${TAG} .card .blurb {
          margin: 0 0 var(--ae-space-4);
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        /* The mapping well: tool name is prose, its path is code. That split is
           the whole monospace rule, and this is the slide that shows it. */
        ${TAG} .map {
          margin: 0 0 var(--ae-space-4);
          display: grid;
          gap: 4px;
        }
        ${TAG} .map div {
          display: grid;
          grid-template-columns: minmax(84px, auto) 1fr;
          gap: var(--ae-space-3);
          align-items: baseline;
          padding: 1px 6px;
          margin: 0 -6px;
          border-radius: var(--ae-radius-sm);
          transition: background 180ms var(--ae-ease);
        }
        /* Hover a tool anywhere and the same tool lights up in every card:
           the lede's claim — same concepts in every tool — made touchable. */
        ${TAG} .map div.hl { background: var(--fg-mint); }
        ${TAG} .map div.hl dt { color: var(--fg-green-d); }
        ${TAG} .map dt {
          margin: 0;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 500;
          color: var(--fg-muted);
          /* Tool names are short and must not break; the path column absorbs
             the wrapping instead. */
          white-space: nowrap;
        }
        ${TAG} .map dd {
          margin: 0;
          font-family: var(--ae-font-mono);
          /* 0.94 so Plex Mono optically matches Inter beside it; still above
             the 14px floor at every viewport the deck is shown at. */
          font-size: calc(var(--ae-fs-caption) * 0.94);
          line-height: var(--ae-lh-caption);
          color: var(--fg-green-d);
          overflow-wrap: break-word;
        }

        ${TAG} .why {
          margin: auto 0 0;
          padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
        }

        ${TAG} .stamp {
          margin: var(--ae-space-4) 0 0;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-faint);
          text-align: right;
        }

        @media (max-width: 1024px) {
          ${TAG} .cards { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>
        <div class="cards">
          ${t.primitives.map((p, ci) => `
            <div class="card fg-card fg-hover fg-in" style="--fg-at: ${3 + ci}">
              <div class="head">
                <span class="fg-badge">${p.num}</span>
                <h2 class="fg-hover-title">${p.name}</h2>
              </div>
              <p class="blurb">${p.blurb}</p>
              <dl class="map">
                ${p.rows.map(([k, v], ri) => `
                  <div class="fg-in" style="--fg-at: ${6 + ri}" data-tool="${k}"><dt>${k}</dt><dd>${v}</dd></div>
                `).join('')}
              </dl>
              <p class="why fg-takeaway fg-in" style="--fg-at: 11"><span>${p.why}</span></p>
            </div>
          `).join('')}
        </div>
        <p class="stamp fg-in" style="--fg-at: 12">${t.stamp}</p>
      </div>
    `;
    /* Cross-card highlight: hovering a tool row lights that tool everywhere. */
    this.querySelectorAll('.map div[data-tool]').forEach(row => {
      row.addEventListener('mouseenter', () => {
        this.querySelectorAll(`.map div[data-tool="${CSS.escape(row.dataset.tool)}"]`)
          .forEach(r => r.classList.add('hl'));
      });
      row.addEventListener('mouseleave', () => {
        this.querySelectorAll('.map div.hl').forEach(r => r.classList.remove('hl'));
      });
    });
  }
}

customElements.define(TAG, Section05);
