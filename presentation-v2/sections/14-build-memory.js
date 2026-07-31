/* Section 15 — One memory file.
   The tool mapping is a dated claim: it will be wrong within months, so
   the footer carries the date it was checked. */

import { getLang } from '../core/i18n.js';

const TAG = 's14-build-memory';

const CONTENT = {
  en: {
    h1: 'One memory file, read by every tool',
    lede: `Each tool looks for its own file. Keeping four of them in sync is a
           job nobody does, so keep one file and point the others at it.`,
    cmdLabel: 'In the repository root',
    cmd: 'ln -s AGENTS.md CLAUDE.md',
    holdsLabel: 'What belongs in it',
    holds: [
      { t: 'The stack, and why', d: 'What is agreed, so it is not re-litigated every session.' },
      { t: 'Conventions', d: 'How commits are written, where tests live, what the build command is.' },
      { t: 'What is out of scope', d: 'Explicitly, with the reason. An agent will propose a deferred idea every time otherwise.' },
      { t: 'How you work', d: 'The loop itself: plan first, one commit per step, who reviews.' },
    ],
    mapLabel: 'Where each tool looks for it',
    map: [
      ['Claude Code', 'CLAUDE.md → AGENTS.md'],
      ['Codex',       'AGENTS.md'],
      ['Copilot',     'AGENTS.md · .github/copilot-instructions.md'],
      ['Cursor',      'AGENTS.md · .cursor/rules/'],
    ],
    foot: 'Tool paths verified July 2026 — re-check before relying on them.',
  },
  de: {
    h1: 'Eine Memory-Datei, gelesen von jedem Tool',
    lede: `Jedes Tool sucht seine eigene Datei. Vier davon synchron zu halten ist
           eine Aufgabe, die niemand erledigt — also eine Datei pflegen und die
           anderen darauf zeigen lassen.`,
    cmdLabel: 'Im Repository-Root',
    cmd: 'ln -s AGENTS.md CLAUDE.md',
    holdsLabel: 'Was hineingehört',
    holds: [
      { t: 'Der Stack, und warum', d: 'Was entschieden ist, damit es nicht jede Session neu verhandelt wird.' },
      { t: 'Konventionen', d: 'Wie Commits geschrieben werden, wo Tests liegen, wie gebaut wird.' },
      { t: 'Was nicht dazugehört', d: 'Ausdrücklich, mit Begründung. Sonst schlägt ein Agent jede zurückgestellte Idee erneut vor.' },
      { t: 'Wie gearbeitet wird', d: 'Der Loop selbst: erst planen, ein Commit pro Schritt, wer reviewt.' },
    ],
    mapLabel: 'Wo jedes Tool danach sucht',
    map: [
      ['Claude Code', 'CLAUDE.md → AGENTS.md'],
      ['Codex',       'AGENTS.md'],
      ['Copilot',     'AGENTS.md · .github/copilot-instructions.md'],
      ['Cursor',      'AGENTS.md · .cursor/rules/'],
    ],
    foot: 'Tool-Pfade geprüft Juli 2026 — vor Gebrauch erneut prüfen.',
  },
};

class Section15 extends HTMLElement {
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

        ${TAG} .cmd {
          display: inline-flex;
          align-items: baseline;
          gap: var(--ae-space-3);
          background: var(--fg-mint);
          border-radius: var(--ae-radius);
          padding: var(--ae-space-3) var(--ae-space-4);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .cmd code {
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-small);
          color: var(--fg-green-d);
          font-weight: 500;
        }

        ${TAG} .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: var(--ae-space-5);
          align-items: start;
        }
        ${TAG} .holds .lbl { margin-bottom: var(--ae-space-3); }
        ${TAG} .holds ul { margin: 0; padding: 0; list-style: none; }
        ${TAG} .holds li {
          padding: var(--ae-space-3) 0;
          border-bottom: 1px solid var(--fg-hair);
        }
        ${TAG} .holds li:last-child { border-bottom: 0; }
        ${TAG} .holds h3 {
          margin: 0 0 2px;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .holds p:not(.fg-label) { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); color: var(--fg-body); }

        ${TAG} .map .lbl { margin-bottom: var(--ae-space-3); }

        @media (max-width: 1000px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="cmd fg-in" style="--fg-at: 3">
          <span class="fg-label">${t.cmdLabel}</span>
          <code>${t.cmd}</code>
        </div>

        <div class="grid">
          <div class="holds fg-in" style="--fg-at: 4">
            <p class="fg-label lbl">${t.holdsLabel}</p>
            <ul>
              ${t.holds.map((h, i) => `
                <li class="fg-in" style="--fg-at: ${5 + i}">
                  <h3>${h.t}</h3>
                  <p>${h.d}</p>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="map fg-in" style="--fg-at: 6">
            <p class="fg-label lbl">${t.mapLabel}</p>
            <div class="fg-card">
              <dl class="fg-rows">
                ${t.map.map(([k, v]) => `
                  <div class="fg-rows__r"><dt>${k}</dt><dd>${v}</dd></div>
                `).join('')}
              </dl>
            </div>
            <div class="fg-foot"><span>${t.foot}</span></div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section15);
