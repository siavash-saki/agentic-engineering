/* Section 24 — Setup, slide 1 of 2: the whole set on one page.
   The organising split is portability, not a feature list: three of these
   have one spelling everywhere and two are respelled by every tool. Both
   halves are dated claims, and the mapping well is the evidence for the
   second half rather than a lookup table — the previous version of this
   talk carried thirty paths across two slides and nobody could read them. */

import { getLang } from '../core/i18n.js';

const TAG = 's24-setup-kit';

const CONTENT = {
  en: {
    h1: 'Five things you give it — three of them <span class="fg-mark fg-mark--sweep">standard</span>',
    lede: `You have already met four. The memory file, skills and MCP each had a
           slide in Build; and the second model that read the diff in Review was
           a subagent. Here is the whole set, and the line that decides how much
           of it travels with you.`,
    groups: [
      {
        label: 'Portable',
        h: 'One spelling, every tool',
        items: [
          { t: 'Memory',
            d: 'The project’s standing brief: the stack, the conventions, what is out of scope. Read at the start of every session.',
            std: 'AGENTS.md',
            keeper: 'Agentic AI Foundation, Linux Foundation' },
          { t: 'Skills',
            d: 'A procedure the model loads only once it becomes relevant. Written once, used by any agent that reads the format.',
            std: 'SKILL.md',
            keeper: 'Open standard, published spec at agentskills.io' },
          { t: 'MCP',
            d: 'The systems it is allowed to reach: the tracker, the database, the docs, the design tool.',
            std: 'Model Context Protocol',
            keeper: 'Agentic AI Foundation, Linux Foundation' },
        ],
      },
      {
        label: 'Tool-specific',
        h: 'A different spelling in each',
        items: [
          { t: 'Hooks',
            d: 'A command that fires on an event — before a tool call, on stop — every time, whatever the model decides. Policy it cannot talk its way around.' },
          { t: 'Subagents',
            d: 'A second agent with its own context window and a narrower job. Its work never enters yours; you get the result.' },
        ],
        mapLabel: 'The same feature, three spellings',
        map: [
          ['Claude Code', 'settings.json → hooks'],
          ['Codex',       '.codex/hooks.json'],
          ['Cursor',      '.cursor/hooks.json'],
        ],
      },
    ],
    note: `And plugins — one installable bundle of the five, so a team ships its
           setup instead of describing it in a README. <b>No common format for
           those either.</b>`,
    foot: 'Governance checked August 2026 · tool paths July 2026 — re-check before relying on them.',
  },
  de: {
    h1: 'Fünf Dinge, die du ihm gibst — drei davon <span class="fg-mark fg-mark--sweep">Standard</span>',
    lede: `Vier davon sind dir schon begegnet. Memory-Datei, Skills und MCP hatten
           je eine Folie in Build; und das zweite Modell, das im Review den Diff
           gelesen hat, war ein Subagent. Hier ist der ganze Satz — und die Linie,
           die entscheidet, wie viel davon mitreist.`,
    groups: [
      {
        label: 'Portabel',
        h: 'Eine Schreibweise, jedes Tool',
        items: [
          { t: 'Memory',
            d: 'Der ständige Auftrag des Projekts: der Stack, die Konventionen, was nicht dazugehört. Wird zu Beginn jeder Session gelesen.',
            std: 'AGENTS.md',
            keeper: 'Agentic AI Foundation, Linux Foundation' },
          { t: 'Skills',
            d: 'Ein Ablauf, den das Modell erst lädt, wenn er relevant wird. Einmal geschrieben, von jedem Agenten nutzbar, der das Format liest.',
            std: 'SKILL.md',
            keeper: 'Offener Standard, Spezifikation auf agentskills.io' },
          { t: 'MCP',
            d: 'Die Systeme, die er erreichen darf: Ticket-System, Datenbank, Doku, Design-Tool.',
            std: 'Model Context Protocol',
            keeper: 'Agentic AI Foundation, Linux Foundation' },
        ],
      },
      {
        label: 'Tool-spezifisch',
        h: 'In jedem Tool anders geschrieben',
        items: [
          { t: 'Hooks',
            d: 'Ein Befehl, der bei einem Ereignis feuert — vor einem Tool-Call, beim Stop — jedes Mal, unabhängig davon, was das Modell entscheidet. Policy, die es nicht aushebeln kann.' },
          { t: 'Subagents',
            d: 'Ein zweiter Agent mit eigenem Kontextfenster und engerem Auftrag. Seine Arbeit landet nie in deiner; du bekommst das Ergebnis.' },
        ],
        mapLabel: 'Dasselbe Feature, drei Schreibweisen',
        map: [
          ['Claude Code', 'settings.json → hooks'],
          ['Codex',       '.codex/hooks.json'],
          ['Cursor',      '.cursor/hooks.json'],
        ],
      },
    ],
    note: `Und Plugins — ein installierbares Bündel aus den fünf, damit ein Team
           sein Setup ausliefert statt es im README zu beschreiben. <b>Auch dafür
           gibt es kein gemeinsames Format.</b>`,
    foot: 'Governance geprüft August 2026 · Tool-Pfade Juli 2026 — vor Gebrauch erneut prüfen.',
  },
};

class Section24 extends HTMLElement {
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

        /* The portable group is the wider one: it carries a standard name and
           a keeper per item, and it is the half the audience should leave
           with. Depth is not spent here — both groups are peers of each
           other, and the slide's claim is the split, not a winner. */
        ${TAG} .cols {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: var(--ae-space-4);
          align-items: start;
        }
        ${TAG} .grp { display: flex; flex-direction: column; }
        ${TAG} .grp > h2 {
          margin: 2px 0 var(--ae-space-4);
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          font-weight: 600;
          color: var(--fg-ink);
        }

        ${TAG} .items { margin: 0; padding: 0; list-style: none; }
        ${TAG} .items li {
          padding: var(--ae-space-3) 0;
          border-bottom: 1px solid var(--fg-hair);
        }
        ${TAG} .items li:first-child { padding-top: 0; }
        ${TAG} .items li:last-child { border-bottom: 0; padding-bottom: 0; }
        ${TAG} .items h3 {
          margin: 0 0 2px;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .items p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        /* The standard's name is a file name or a protocol name, so it takes
           the code face; who keeps it is prose and does not. */
        ${TAG} .std {
          margin-top: 6px;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: var(--ae-space-2) var(--ae-space-3);
        }
        ${TAG} .keeper {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }

        ${TAG} .evidence { margin-top: var(--ae-space-4); }
        ${TAG} .evidence .fg-label { display: block; margin-bottom: var(--ae-space-2); }

        ${TAG} .fg-note { margin-top: var(--ae-space-5); }

        @media (max-width: 1000px) {
          ${TAG} .cols { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="cols">
          ${t.groups.map((g, gi) => `
            <section class="grp fg-card fg-in" style="--fg-at: ${3 + gi}">
              <p class="fg-label fg-label--accent">${g.label}</p>
              <h2>${g.h}</h2>
              <ul class="items">
                ${g.items.map((it, ii) => `
                  <li class="fg-in" style="--fg-at: ${5 + gi + ii}">
                    <h3>${it.t}</h3>
                    <p>${it.d}</p>
                    ${it.std ? `
                      <div class="std">
                        <span class="fg-code">${it.std}</span>
                        <span class="keeper">${it.keeper}</span>
                      </div>
                    ` : ''}
                  </li>
                `).join('')}
              </ul>
              ${g.map ? `
                <div class="evidence fg-in" style="--fg-at: 9">
                  <span class="fg-label">${g.mapLabel}</span>
                  <div class="fg-map">
                    <dl class="fg-rows">
                      ${g.map.map(([k, v]) => `
                        <div class="fg-rows__r"><dt>${k}</dt><dd>${v}</dd></div>
                      `).join('')}
                    </dl>
                  </div>
                </div>
              ` : ''}
            </section>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 10">${t.note}</p>
        <div class="fg-foot fg-in" style="--fg-at: 11"><span>${t.foot}</span></div>
      </div>
    `;
  }
}

customElements.define(TAG, Section24);
