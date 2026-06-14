/* Tip 9 — Mehrere Anbieter nutzen
   Visualization: provider cards showing each model family's typical
   strengths. Encourages trying them all to learn capabilities. */

const TAG = 's26-tip-multimodel';

const PROVIDERS = [
  {
    name: 'Claude',
    vendor: 'Anthropic',
    initial: 'C',
    accent: '#D97757',
    strengths: ['Frontend & UI', 'Refactoring', 'Lange Aufgaben'],
    weakness: 'Teurer bei reinem Code-Output',
    delay: 600,
  },
  {
    name: 'GPT',
    vendor: 'OpenAI',
    initial: 'G',
    accent: '#10A37F',
    strengths: ['Backend & Logik', 'Tool-Use', 'Strukturierte Daten'],
    weakness: 'Knapper, weniger Kontext-Treue',
    delay: 900,
  },
  {
    name: 'Gemini',
    vendor: 'Google',
    initial: 'G',
    accent: '#4285F4',
    strengths: ['Sehr langer Kontext', 'Multimodal', 'Günstig'],
    weakness: 'Schwächer bei Tool-Chains',
    delay: 1200,
  },
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
          animation: tipMM-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tipMM-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: tipMM-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-4);
        }
        ${TAG} .card {
          position: relative;
          background: var(--db-bg);
          border: 1px solid var(--db-border);
          border-radius: var(--db-radius);
          padding: var(--db-space-4);
          display: grid;
          gap: var(--db-space-3);
          opacity: 0;
          transform: translateY(12px);
          overflow: hidden;
        }
        ${TAG} .card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--accent, var(--db-red));
        }

        ${TAG} .head {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        ${TAG} .badge {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--accent, var(--db-red));
          color: #fff;
          font-weight: 900;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        ${TAG} .name {
          font-size: var(--db-fs-h4);
          line-height: 1.1;
          font-weight: 900;
          color: var(--db-text-strong);
          margin: 0;
        }
        ${TAG} .vendor {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
        }

        ${TAG} .strengths {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        ${TAG} .strengths li {
          padding: 4px 10px;
          background: color-mix(in srgb, var(--accent) 14%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          color: var(--db-text-strong);
          border-radius: 999px;
          font-size: var(--db-fs-small);
          font-weight: 700;
          opacity: 0;
          transform: translateY(6px);
        }
        ${TAG} .card.r1 .strengths li:nth-child(1) { animation: tipMM-rise 300ms var(--db-ease) 800ms forwards; }
        ${TAG} .card.r1 .strengths li:nth-child(2) { animation: tipMM-rise 300ms var(--db-ease) 900ms forwards; }
        ${TAG} .card.r1 .strengths li:nth-child(3) { animation: tipMM-rise 300ms var(--db-ease) 1000ms forwards; }
        ${TAG} .card.r2 .strengths li:nth-child(1) { animation: tipMM-rise 300ms var(--db-ease) 1100ms forwards; }
        ${TAG} .card.r2 .strengths li:nth-child(2) { animation: tipMM-rise 300ms var(--db-ease) 1200ms forwards; }
        ${TAG} .card.r2 .strengths li:nth-child(3) { animation: tipMM-rise 300ms var(--db-ease) 1300ms forwards; }
        ${TAG} .card.r3 .strengths li:nth-child(1) { animation: tipMM-rise 300ms var(--db-ease) 1400ms forwards; }
        ${TAG} .card.r3 .strengths li:nth-child(2) { animation: tipMM-rise 300ms var(--db-ease) 1500ms forwards; }
        ${TAG} .card.r3 .strengths li:nth-child(3) { animation: tipMM-rise 300ms var(--db-ease) 1600ms forwards; }

        ${TAG} .weakness {
          margin-top: auto;
          padding-top: var(--db-space-3);
          border-top: 1px dashed var(--db-border);
          font-size: var(--db-fs-small);
          line-height: 1.45;
          color: var(--db-text);
        }
        ${TAG} .weakness .tag {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
          margin-bottom: 4px;
        }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tipMM-fade 600ms var(--db-ease) 1850ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tipMM-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tipMM-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          ${TAG} .cards { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 9</span>
        <h1>Verschiedene Anbieter — <b>verschiedene Stärken</b></h1>
        <p class="lede">
          Kein Anbieter ist überall der beste. Wer alle drei großen Modelle
          regelmäßig nutzt, lernt ihre Stärken und Schwächen kennen — und wählt
          beim Start einer Aufgabe das richtige Werkzeug. Viele Coding-Agenten
          (z.&nbsp;B. Claude Code, Copilot, Cursor) geben dir Zugriff auf mehrere davon.
        </p>

        <div class="cards">
          ${PROVIDERS.map((p, i) => `
            <div class="card r${i + 1}" style="--accent: ${p.accent}; animation: tipMM-rise 500ms var(--db-ease) ${p.delay}ms forwards;">
              <div class="head">
                <div class="badge">${p.initial}</div>
                <div>
                  <h3 class="name">${p.name}</h3>
                  <div class="vendor">${p.vendor}</div>
                </div>
              </div>
              <ul class="strengths">
                ${p.strengths.map(s => `<li>${s}</li>`).join('')}
              </ul>
              <div class="weakness">
                <span class="tag">Schwäche</span>
                ${p.weakness}
              </div>
            </div>
          `).join('')}
        </div>

        <p class="punch">
          Probiere sie aus. <b>Du erkennst Stärken erst, wenn du sie kennst.</b>
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip09);
