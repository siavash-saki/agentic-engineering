/* Section 16 — Skills and MCP.
   Two ways to give an agent something it does not have: a procedure it
   can load, and a system it can reach. Both mappings are dated claims. */

import { getLang } from '../core/i18n.js';

const TAG = 's15-build-skills';

const CONTENT = {
  en: {
    h1: 'Procedures it can load, systems it can reach',
    lede: `Two mechanisms, one purpose: stop re-explaining the same thing in
           every session, and stop copy-pasting from other systems into the
           prompt.`,
    cards: [
      {
        t: 'Skills',
        sub: 'A procedure, on demand',
        d: 'Anything you have now explained twice — the release steps, the review checklist, how a new endpoint gets wired up — belongs in a file the model loads when it is relevant, not in a chat you are about to close.',
        testLabel: 'The test',
        test: 'You have typed it twice. Write it down the second time.',
        map: [
          ['Claude Code', '.claude/skills/<name>/SKILL.md'],
          ['Codex',       '.agents/skills/'],
          ['Cursor',      '.cursor/skills/'],
        ],
      },
      {
        t: 'MCP',
        sub: 'A system, connected',
        d: 'Servers let the agent reach the issue tracker, the database, the docs, the design tool. The agent stops guessing at things it could look up, and you stop pasting.',
        testLabel: 'The test',
        test: 'You are copying from another window into the prompt.',
        map: [
          ['Claude Code', '.mcp.json'],
          ['Codex',       '.codex/config.toml'],
          ['Cursor',      '.cursor/mcp.json'],
        ],
      },
    ],
    foot: 'Tool paths verified July 2026 — re-check before relying on them.',
  },
  de: {
    h1: 'Abläufe zum Laden, Systeme zum Erreichen',
    lede: `Zwei Mechanismen, ein Zweck: nicht in jeder Session dasselbe erneut
           erklären, und nicht aus anderen Systemen in den Prompt kopieren.`,
    cards: [
      {
        t: 'Skills',
        sub: 'Ein Ablauf, bei Bedarf',
        d: 'Alles, was zum zweiten Mal erklärt wurde — die Release-Schritte, die Review-Checkliste, wie ein neuer Endpunkt angeschlossen wird — gehört in eine Datei, die das Modell bei Bedarf lädt, und nicht in einen Chat, den du gleich schließt.',
        testLabel: 'Die Probe',
        test: 'Du hast es zweimal getippt. Beim zweiten Mal aufschreiben.',
        map: [
          ['Claude Code', '.claude/skills/<name>/SKILL.md'],
          ['Codex',       '.agents/skills/'],
          ['Cursor',      '.cursor/skills/'],
        ],
      },
      {
        t: 'MCP',
        sub: 'Ein System, angebunden',
        d: 'Server geben dem Agenten Zugriff auf Issue-Tracker, Datenbank, Doku, Design-Tool. Der Agent rät nicht mehr bei Dingen, die er nachschlagen könnte, und du kopierst nicht mehr.',
        testLabel: 'Die Probe',
        test: 'Du kopierst aus einem anderen Fenster in den Prompt.',
        map: [
          ['Claude Code', '.mcp.json'],
          ['Codex',       '.codex/config.toml'],
          ['Cursor',      '.cursor/mcp.json'],
        ],
      },
    ],
    foot: 'Tool-Pfade geprüft Juli 2026 — vor Gebrauch erneut prüfen.',
  },
};

class Section16 extends HTMLElement {
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
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-5); }

        ${TAG} .cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-5);
        }
        ${TAG} .c { display: flex; flex-direction: column; gap: var(--ae-space-3); }
        ${TAG} .c h3 { margin: 0; font-size: var(--ae-fs-h3); line-height: 1.15; color: var(--fg-ink); }
        ${TAG} .c .sub { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); font-weight: 600; color: var(--fg-green-d); }
        ${TAG} .c .d { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); color: var(--fg-body); }
        ${TAG} .c .test { margin: 0; }

        @media (max-width: 960px) {
          ${TAG} .cards { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="cards">
          ${t.cards.map((c, i) => `
            <div class="c fg-card fg-card--raised fg-hover fg-in" style="--fg-at: ${3 + i * 2}">
              <div>
                <h3 class="fg-hover-title">${c.t}</h3>
                <p class="sub">${c.sub}</p>
              </div>
              <p class="d">${c.d}</p>
              <p class="fg-takeaway test"><span>${c.test}</span></p>
              <div class="fg-map">
                <dl class="fg-rows">
                  ${c.map.map(([k, v]) => `
                    <div class="fg-rows__r"><dt>${k}</dt><dd>${v}</dd></div>
                  `).join('')}
                </dl>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="fg-foot fg-in" style="--fg-at: 8"><span>${t.foot}</span></div>
      </div>
    `;
  }
}

customElements.define(TAG, Section16);
