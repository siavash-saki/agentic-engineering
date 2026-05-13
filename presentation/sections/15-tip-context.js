/* Tip 7 — Kontext frisch halten
   Visualization: a context bar fills with colored topic chunks until
   it becomes muddied with confusion markers. A "Neue Session" reset
   reveals a clean empty bar below. */

const TAG = 's15-tip-context';

const CHUNKS = [
  { l: 26, c: '#2563eb', t: 'Auth-Bug' },
  { l: 14, c: '#7c3aed', t: 'Search' },
  { l: 18, c: '#0891b2', t: 'CSS' },
  { l: 10, c: '#16a34a', t: 'Tests' },
  { l: 22, c: '#ca8a04', t: 'Refactor' },
];

class SectionTip07 extends HTMLElement {
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
          animation: tip07-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip07-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: tip07-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .bar-row {
          margin-bottom: var(--db-space-4);
          opacity: 0;
        }
        ${TAG} .bar-row.old   { animation: tip07-fade 500ms var(--db-ease) 500ms forwards; }
        ${TAG} .bar-row.fresh { animation: tip07-fade 500ms var(--db-ease) 2400ms forwards; }
        ${TAG} .bar-label {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        ${TAG} .bar-label .meta {
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          font-size: var(--db-fs-small);
          color: var(--db-text-muted);
        }
        ${TAG} .bar-row.old .bar-label { color: var(--db-text-muted); }
        ${TAG} .bar-row.fresh .bar-label { color: var(--db-red); }

        ${TAG} .bar {
          height: 36px;
          border-radius: 6px;
          background: var(--db-cool-gray-100);
          display: flex;
          overflow: hidden;
          position: relative;
        }
        ${TAG} .bar.old {
          box-shadow: inset 0 0 0 2px var(--db-red);
        }
        ${TAG} .bar .chunk {
          height: 100%;
          position: relative;
          opacity: 0;
        }
        ${TAG} .bar .chunk::after {
          content: attr(data-t);
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
        }
        ${TAG} .bar.old .chunk:nth-child(1) { animation: tip07-pop 300ms var(--db-ease) 700ms forwards; }
        ${TAG} .bar.old .chunk:nth-child(2) { animation: tip07-pop 300ms var(--db-ease) 900ms forwards; }
        ${TAG} .bar.old .chunk:nth-child(3) { animation: tip07-pop 300ms var(--db-ease) 1100ms forwards; }
        ${TAG} .bar.old .chunk:nth-child(4) { animation: tip07-pop 300ms var(--db-ease) 1300ms forwards; }
        ${TAG} .bar.old .chunk:nth-child(5) { animation: tip07-pop 300ms var(--db-ease) 1500ms forwards; }

        ${TAG} .bar.old .noise {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent 0 8px,
            rgba(236, 0, 22, 0.18) 8px 12px
          );
          opacity: 0;
          animation: tip07-fade 400ms var(--db-ease) 1700ms forwards;
        }
        ${TAG} .bar.old .warn {
          position: absolute;
          top: -10px;
          right: 8px;
          background: var(--db-red);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 2px 8px;
          border-radius: 3px;
          opacity: 0;
          animation: tip07-fade 400ms var(--db-ease) 1800ms forwards;
        }

        ${TAG} .reset-row {
          display: flex;
          justify-content: center;
          margin: var(--db-space-3) 0 var(--db-space-2);
          opacity: 0;
          animation: tip07-fade 400ms var(--db-ease) 2000ms forwards;
        }
        ${TAG} .reset {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          background: var(--db-red);
          color: #fff;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: var(--db-fs-small);
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        ${TAG} .reset::before {
          content: "↻";
          font-size: 16px;
        }

        ${TAG} .bar.fresh {
          box-shadow: inset 0 0 0 2px #2dba4e;
          background: #f0fdf4;
        }
        ${TAG} .bar.fresh::after {
          content: "leer · klare Köpfe";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #137333;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip07-fade 600ms var(--db-ease) 2700ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip07-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip07-pop {
          to { opacity: 1; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 7 · Disziplin</span>
        <h1>Verwirrt? <b>Neue Session</b></h1>
        <p class="lede">
          Ein verwirrter Agent bleibt verwirrt. Kontext, der einmal vergiftet ist,
          wird mit jedem Prompt schlimmer — nicht besser.
        </p>

        <div class="bar-row old">
          <div class="bar-label">
            <span>Session — 90 min alt</span>
            <span class="meta">5 Themen, mehrere Korrekturen, Halluzinationen</span>
          </div>
          <div class="bar old">
            ${CHUNKS.map(ch => `
              <div class="chunk" data-t="${ch.t}" style="background: ${ch.c}; width: ${ch.l}%;"></div>
            `).join('')}
            <div class="noise"></div>
            <div class="warn">vermischt</div>
          </div>
        </div>

        <div class="reset-row">
          <span class="reset">/clear · Neue Session</span>
        </div>

        <div class="bar-row fresh">
          <div class="bar-label">
            <span>Session — frisch</span>
            <span class="meta">eine Aufgabe, klarer Anfang</span>
          </div>
          <div class="bar fresh"></div>
        </div>

        <p class="punch">
          <b>Neustarten</b> ist schneller als <b>geradebiegen</b>.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip07);
