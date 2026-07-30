/* Section 3 — Vibe Coding vs. Agentic Engineering
   The thesis slide: two ways to work, side by side. */

import { getLang } from '../core/i18n.js';

const TAG = 's03-vibe';

const CONTENT = {
  en: {
    title: 'Vibe Coding vs. Agentic Engineering',
    lede: `Same model. Both ship code. Only one of them survives past the
      weekend project.`,
    vibeTitle: 'Vibe Coding',
    vibeTag: '"Real quick, let me just …"',
    agenticTitle: 'Agentic Engineering',
    agenticTag: '"Before I touch a key …"',
    rows: [
      { dim: 'Input',          vibe: 'A gut-feel prompt',          agentic: 'A clear <b>specification</b>' },
      { dim: 'Context',        vibe: 'Whatever the model happens to know', agentic: 'Memory, Skills, MCP' },
      { dim: 'Workflow',       vibe: '"Let\'s see what comes out"',  agentic: 'Plan → Code → Review' },
      { dim: 'Review',         vibe: 'Accept the suggestion',      agentic: 'Checked diff by diff' },
      { dim: 'Repeatability',  vibe: 'One-shot — different next time', agentic: 'Repeatable' },
      { dim: 'Scales to …',    vibe: 'Toy problems',               agentic: 'Production code' },
    ],
  },
  de: {
    title: 'Vibe Coding vs. Agentic Engineering',
    lede: `Beide nutzen dasselbe Modell. Beide schreiben Code. Nur eine der beiden
      skaliert über das Wochenend-Projekt hinaus.`,
    vibeTitle: 'Vibe Coding',
    vibeTag: '„Mal eben schnell …"',
    agenticTitle: 'Agentic Engineering',
    agenticTag: '„Bevor ich loslege …"',
    rows: [
      { dim: 'Eingabe',          vibe: 'Bauchgefühl-Prompt',     agentic: 'Klare <b>Spezifikation</b>' },
      { dim: 'Kontext',          vibe: 'Was das Modell zufällig weiß', agentic: 'Memory, Skills, MCP' },
      { dim: 'Workflow',          vibe: '„Mal sehen, was rauskommt"',   agentic: 'Plan → Code → Review' },
      { dim: 'Review',           vibe: 'Vorschlag akzeptieren',  agentic: 'Diff für Diff geprüft' },
      { dim: 'Wiederholbarkeit', vibe: 'Einmalig — beim nächsten Mal anders', agentic: 'Wiederholbar' },
      { dim: 'Skaliert auf …',   vibe: 'Spielzeug-Probleme',     agentic: 'Produktionscode' },
    ],
  },
};

class Section03Vibe extends HTMLElement {
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
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede {
          margin: 0 0 var(--ae-space-6);
        }
        ${TAG} .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ae-space-5);
          align-items: start;
        }
        /* THE ANSWER IS MARKED BY DEPTH, NOT BY AN EDGE BAR.
           Both panels are the same white card. The agentic side carries the
           deepest elevation plus a hairline accent ring (.fg-card--answer),
           its heading is accent-coloured and heavier, and its values are ink
           rather than body grey. Every one of those cues survives greyscale;
           the 4px green line this replaces did not really. */
        ${TAG} .col h2 {
          margin: 0;
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          font-weight: 600;
          color: var(--fg-ink);
        }
        /* Not muted. The losing side of a comparison is still being read from
           the back of the room; greying it out makes it look disabled. */
        ${TAG} .col.agentic h2 { color: var(--fg-green-d); font-weight: 700; }
        ${TAG} .col .tag {
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-muted);
          font-style: italic;
          margin: var(--ae-space-2) 0 var(--ae-space-4);
          padding-bottom: var(--ae-space-4);
          border-bottom: 1px solid var(--fg-hair);
        }
        ${TAG} dl {
          margin: 0;
          display: grid;
          gap: var(--ae-space-3);
        }
        ${TAG} dl div { display: block; }
        /* A dimension label is prose, not code: body face, sentence case. */
        ${TAG} dt {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--fg-faint);
          margin-bottom: 2px;
        }
        ${TAG} dd {
          margin: 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--fg-body);
        }
        ${TAG} .col.agentic dd { color: var(--fg-ink); font-weight: 500; }
        ${TAG} .col.agentic dd b { color: var(--fg-green); font-weight: 600; }

        @media (max-width: 860px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.title}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>
        <div class="grid">
          <div class="col vibe fg-card fg-hover fg-in" style="--fg-at: 3">
            <h2 class="fg-hover-title">${t.vibeTitle}</h2>
            <p class="tag">${t.vibeTag}</p>
            <dl>
              ${t.rows.map(r => `
                <div>
                  <dt>${r.dim}</dt>
                  <dd>${r.vibe}</dd>
                </div>
              `).join('')}
            </dl>
          </div>
          <div class="col agentic fg-card fg-card--answer fg-hover fg-in" style="--fg-at: 5">
            <h2>${t.agenticTitle}</h2>
            <p class="tag">${t.agenticTag}</p>
            <dl>
              ${t.rows.map(r => `
                <div>
                  <dt>${r.dim}</dt>
                  <dd>${r.agentic}</dd>
                </div>
              `).join('')}
            </dl>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section03Vibe);
