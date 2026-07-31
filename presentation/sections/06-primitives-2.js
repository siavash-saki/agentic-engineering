/* Section 6 — Primitives Part 2
   Hooks · Subagents · Scope — die drei verbleibenden Bausteine.
   Tool mappings verified against official docs, July 2026. */

import { getLang } from '../core/i18n.js';

const TAG = 's06-primitives-2';

const CONTENT = {
  en: {
    h1: 'Hooks · Subagents · Scope',
    primitives: [
      {
        num: '04',
        name: 'Hooks',
        blurb: 'Deterministic shell commands that fire on lifecycle events — before or after a tool call, on a prompt, on stop. What the model forgets, the hook never does. By now every major tool has them.',
        why:   'Policy the model can\'t talk its way around.',
        rows: [
          ['Claude Code', 'settings.json  →  hooks'],
          ['Copilot',     '.github/hooks/'],
          ['Codex',       '.codex/hooks.json'],
          ['Kiro',        '.kiro/hooks/'],
          ['Cursor',      '.cursor/hooks.json'],
        ],
      },
      {
        num: '05',
        name: 'Subagents',
        blurb: 'Specialized agents with their own system prompt and a tighter tool set, so the main agent can hand off subtasks. Separate context, run in parallel.',
        why:   'Save context budget. Win parallelism.',
        rows: [
          ['Claude Code', '.claude/agents/*.md'],
          ['Copilot',     '.github/agents/*.agent.md'],
          ['Codex',       '.codex/agents/*.toml'],
          ['Kiro',        '.kiro/agents/*.md'],
          ['Cursor',      '.cursor/agents/*.md'],
        ],
      },
      {
        num: '06',
        name: 'Scope',
        blurb: 'Every primitive lives at two levels: in the project (committed, shared) or in your home directory (personal). All five tools also ship a managed enterprise layer on top.',
        why:   'Commit team standards. Keep personal stuff local.',
        rows: [
          ['Project',     './.&lt;tool&gt;/  →  committed, shared with the team'],
          ['User',        '~/.&lt;tool&gt;/  →  local, personal'],
          ['Enterprise',  'managed policy  →  IT-controlled, can\'t be overridden'],
        ],
      },
    ],
    stamp: 'Tool mappings verified against official docs · July 2026',
  },
  de: {
    h1: 'Hooks · Subagents · Scope',
    primitives: [
      {
        num: '04',
        name: 'Hooks',
        blurb: 'Deterministische Shell-Befehle, die bei Lifecycle-Events feuern — vor/nach einem Tool-Call, beim Prompt, beim Stop. Was das Modell vergisst, vergisst der Hook nicht. Inzwischen in jedem großen Tool.',
        why:   'Policy, die das Modell nicht aushebeln kann.',
        rows: [
          ['Claude Code', 'settings.json  →  hooks'],
          ['Copilot',     '.github/hooks/'],
          ['Codex',       '.codex/hooks.json'],
          ['Kiro',        '.kiro/hooks/'],
          ['Cursor',      '.cursor/hooks.json'],
        ],
      },
      {
        num: '05',
        name: 'Subagents',
        blurb: 'Spezialisierte Agenten mit eigenem System-Prompt und engerem Tool-Set, an die der Haupt-Agent Teilaufgaben delegieren kann. Eigener Kontext, parallelisierbar.',
        why:   'Kontext-Budget schonen. Parallelität gewinnen.',
        rows: [
          ['Claude Code', '.claude/agents/*.md'],
          ['Copilot',     '.github/agents/*.agent.md'],
          ['Codex',       '.codex/agents/*.toml'],
          ['Kiro',        '.kiro/agents/*.md'],
          ['Cursor',      '.cursor/agents/*.md'],
        ],
      },
      {
        num: '06',
        name: 'Scope',
        blurb: 'Jeder Baustein lebt auf zwei Ebenen: im Projekt (committed, geteilt) oder im Home-Verzeichnis (persönlich). Alle fünf Tools haben zusätzlich eine verwaltete Enterprise-Ebene.',
        why:   'Team-Standards committen. Persönliches lokal halten.',
        rows: [
          ['Projekt',     './.&lt;tool&gt;/  →  committed, vom Team geteilt'],
          ['Benutzer',    '~/.&lt;tool&gt;/  →  lokal, persönlich'],
          ['Enterprise',  'Managed Policy  →  IT-verwaltet, nicht überschreibbar'],
        ],
      },
    ],
    stamp: 'Tool-Zuordnungen geprüft gegen offizielle Doku · Stand Juli 2026',
  },
};

class Section06 extends HTMLElement {
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
        ${TAG} .wrap {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        /* No lede on this slide: the heading carries straight into the cards,
           so the heading owns the gap the lede used to hold open. */
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-5);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 { color: var(--fg-ink); }
        ${TAG} .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--ae-space-4);
        }
        /* Three primitives, no hierarchy between them: peers at one depth.
           Rows land in sync across the cards, same as slide 5. */
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

        /* Tool name is prose, its path is code. Where a row carries both a
           path and an explanation of it, only the path gets the mono face —
           "IT-controlled, can't be overridden" is a sentence, not a command. */
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
        ${TAG} .map div.hl { background: var(--fg-mint); }
        ${TAG} .map div.hl dt { color: var(--fg-green-d); }
        ${TAG} .map dt {
          margin: 0;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 500;
          color: var(--fg-muted);
          white-space: nowrap;
        }
        ${TAG} .map dd {
          margin: 0;
          font-size: calc(var(--ae-fs-caption) * 0.94);
          line-height: var(--ae-lh-caption);
          overflow-wrap: break-word;
        }
        ${TAG} .map dd .plain {
          font-family: var(--ae-font);
          font-size: calc(1em / 0.94);
          color: var(--fg-body);
        }
        ${TAG} .map dd .note {
          font-family: var(--ae-font);
          font-size: calc(1em / 0.94);
          color: var(--fg-muted);
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
        <div class="cards">
          ${t.primitives.map((p, ci) => `
            <div class="card fg-card fg-hover fg-in" style="--fg-at: ${3 + ci}">
              <div class="head">
                <span class="fg-badge">${p.num}</span>
                <h2 class="fg-hover-title">${p.name}</h2>
              </div>
              <p class="blurb">${p.blurb}</p>
              <dl class="map">
                ${p.rows.map(([k, v], ri) => {
                  const [code, ...rest] = v.split('→');
                  const note = rest.join('→').trim();
                  /* "managed policy" is prose, not a path — it does not get
                     the code face just because its neighbours are paths. */
                  const looksPath = /[./~]/.test(code);
                  return `<div class="fg-in" style="--fg-at: ${6 + ri}" data-tool="${k}"><dt>${k}</dt><dd><span class="${looksPath ? 'fg-code' : 'plain'}">${code.trim()}</span>${
                    note ? ` <span class="note">— ${note}</span>` : ''
                  }</dd></div>`;
                }).join('')}
              </dl>
              <p class="why fg-takeaway fg-in" style="--fg-at: 11"><span>${p.why}</span></p>
            </div>
          `).join('')}
        </div>
        <p class="stamp fg-in" style="--fg-at: 12">${t.stamp}</p>
      </div>
    `;
    /* Cross-card highlight, same device as slide 5. */
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

customElements.define(TAG, Section06);
