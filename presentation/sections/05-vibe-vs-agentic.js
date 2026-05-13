/* Section 5 — Vibe Coding vs. Agentic Engineering
   Zwei Arbeitsweisen Seite an Seite. */

const TAG = 's05-vibe-vs-agentic';

const ROWS = [
  { dim: 'Eingabe',          vibe: 'Bauchgefühl-Prompt',     agentic: 'Klare Spezifikation' },
  { dim: 'Kontext',          vibe: 'Was das Modell zufällig weiß', agentic: 'Skills, AGENTS.md, MCP' },
  { dim: 'Workflow',          vibe: '„Mal sehen, was rauskommt"',   agentic: 'Plan → Code → Review' },
  { dim: 'Review',           vibe: 'Vorschlag akzeptieren',  agentic: 'Diff für Diff geprüft' },
  { dim: 'Wiederholbarkeit', vibe: 'Einmalig — beim nächsten Mal anders', agentic: 'Reproduzierbar' },
  { dim: 'Skaliert auf …',   vibe: 'Spielzeug-Probleme',     agentic: 'Produktionscode' },
];

class Section05 extends HTMLElement {
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
          animation: s05-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: s05-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: s05-fade 600ms var(--db-ease) 350ms forwards;
        }
        ${TAG} .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--db-space-5);
          margin-bottom: var(--db-space-5);
        }
        ${TAG} .col {
          background: var(--db-bg);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-5);
          opacity: 0;
          transform: translateX(-12px);
          animation: s05-slide 600ms var(--db-ease) 550ms forwards;
        }
        ${TAG} .col.agentic {
          background: var(--db-cool-gray-100);
          border-top: 4px solid var(--db-red);
          transform: translateX(12px);
          animation-delay: 720ms;
        }
        ${TAG} .col.vibe {
          background: var(--db-bg);
          border: 1px solid var(--db-border);
          border-top: 4px solid var(--db-cool-gray-400);
        }
        ${TAG} .col h2 {
          margin: 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
        }
        ${TAG} .col.vibe h2 { color: var(--db-text-muted); }
        ${TAG} .col.agentic h2 { color: var(--db-red); }
        ${TAG} .col .tag {
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text-muted);
          font-style: italic;
          margin: 0 0 var(--db-space-5);
          padding-bottom: var(--db-space-4);
          border-bottom: 1px solid var(--db-border);
        }
        ${TAG} .col.agentic .tag { border-bottom-color: var(--db-cool-gray-200); }
        ${TAG} dl {
          margin: 0;
          display: grid;
          gap: var(--db-space-3);
        }
        ${TAG} dl div { display: block; }
        ${TAG} dt {
          font-size: var(--db-fs-caption);
          line-height: var(--db-lh-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-subtle);
          margin-bottom: 2px;
        }
        ${TAG} dd {
          margin: 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
        }
        ${TAG} .col.agentic dd { color: var(--db-text-strong); font-weight: 700; }

        ${TAG} .punch {
          margin: 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: s05-fade 600ms var(--db-ease) 1000ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes s05-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s05-slide {
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 860px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Zwei Arbeitsweisen</span>
        <h1>Vibe Coding vs. Agentic Engineering</h1>
        <p class="lede">
          Beide nutzen dasselbe Modell. Beide schreiben Code. Nur eine der beiden
          skaliert über das Wochenend-Projekt hinaus.
        </p>
        <div class="grid">
          <div class="col vibe">
            <h2>Vibe Coding</h2>
            <p class="tag">„Mal eben schnell …"</p>
            <dl>
              ${ROWS.map(r => `
                <div>
                  <dt>${r.dim}</dt>
                  <dd>${r.vibe}</dd>
                </div>
              `).join('')}
            </dl>
          </div>
          <div class="col agentic">
            <h2>Agentic Engineering</h2>
            <p class="tag">„Bevor ich loslege …"</p>
            <dl>
              ${ROWS.map(r => `
                <div>
                  <dt>${r.dim}</dt>
                  <dd>${r.agentic}</dd>
                </div>
              `).join('')}
            </dl>
          </div>
        </div>
        <p class="punch">
          Das Werkzeug ist dasselbe. Was sich ändert, ist die <b>Praxis</b>.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section05);
