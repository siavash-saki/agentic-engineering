/* Section 12 — SDD: Rate-Limiting · Spec (1/3 of the triptych)
   Persistent crumb at top shows the trio. The next two slides reuse the
   same template with the active segment shifted right. */

const TAG = 's12-sdd-spec';

class Section12SDD extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--db-space-5) var(--db-gutter);
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
          margin-bottom: var(--db-space-2);
          opacity: 0;
          animation: sdd12-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-4);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: sdd12-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }

        ${TAG} .crumb {
          display: flex;
          align-items: center;
          gap: var(--db-space-2);
          margin: 0 0 var(--db-space-4);
          opacity: 0;
          animation: sdd12-fade 500ms var(--db-ease) 340ms forwards;
        }
        ${TAG} .crumb .seg {
          font-size: var(--db-fs-small);
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1.5px solid var(--db-cool-gray-200);
          color: var(--db-text-muted);
          background: var(--db-bg);
        }
        ${TAG} .crumb .seg.active {
          background: var(--db-red);
          border-color: var(--db-red);
          color: #fff;
        }
        ${TAG} .crumb .arrow {
          color: var(--db-cool-gray-400);
          font-weight: 700;
        }

        ${TAG} .doc {
          background: var(--db-cool-gray-100);
          border-left: 4px solid var(--db-red);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          padding: var(--db-space-4) var(--db-space-5);
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          line-height: 1.65;
          color: var(--db-text-strong);
          position: relative;
          opacity: 0;
          animation: sdd12-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .doc::before {
          content: "specs/rate-limiting.md";
          position: absolute;
          top: -10px;
          left: 16px;
          background: var(--db-red);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 3px;
        }
        ${TAG} .doc h2 {
          margin: var(--db-space-3) 0 4px;
          font-size: 13px;
          font-weight: 700;
          color: var(--db-red);
          font-family: inherit;
        }
        ${TAG} .doc h2:first-of-type { margin-top: 0; }
        ${TAG} .doc .feat {
          font-size: 14px;
          font-weight: 700;
          color: var(--db-text-strong);
          margin: 0 0 var(--db-space-3);
        }
        ${TAG} .doc p, ${TAG} .doc ul {
          margin: 0 0 var(--db-space-3);
        }
        ${TAG} .doc ul {
          padding-left: 18px;
          list-style: none;
        }
        ${TAG} .doc li {
          position: relative;
          padding-left: 0;
        }
        ${TAG} .doc li::before {
          content: "-";
          position: absolute;
          left: -14px;
          color: var(--db-red);
          font-weight: 700;
        }

        ${TAG} .caption {
          margin: var(--db-space-4) 0 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          text-align: center;
          opacity: 0;
          animation: sdd12-fade 600ms var(--db-ease) 900ms forwards;
        }
        ${TAG} .caption b { color: var(--db-red); }

        @keyframes sdd12-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Beispiel · Rate-Limiting</span>
        <h1>Spec — das <b>Was</b></h1>

        <div class="crumb">
          <span class="seg active">Spec</span>
          <span class="arrow">→</span>
          <span class="seg">Plan</span>
          <span class="arrow">→</span>
          <span class="seg">Tasks</span>
        </div>

        <div class="doc">
          <p class="feat"># Feature: Rate-Limiting für die öffentliche Such-API</p>

          <h2>## Kontext</h2>
          <p>Der Endpoint <code>/search</code> ist öffentlich erreichbar und wird
          von einzelnen Clients überlastet. Wir brauchen Missbrauchsschutz, ohne
          legitime Nutzer auszusperren.</p>

          <h2>## Akzeptanzkriterien</h2>
          <ul>
            <li>Gegeben ein Client unter dem Limit, wenn er einen Request sendet,
                dann antwortet die API normal (200).</li>
            <li>Gegeben ein Client über 100 Requests/Minute, wenn er einen weiteren
                Request sendet, dann antwortet die API mit 429 und einem
                Retry-After-Header.</li>
          </ul>

          <h2>## Erfolgskriterien</h2>
          <ul>
            <li>Zusätzliche Latenz p99 &lt; 5 ms.</li>
            <li>Keine False Positives für legitime Clients in der Stichprobe.</li>
          </ul>

          <h2>## Out of Scope</h2>
          <ul>
            <li>Pro-Endpoint differenzierte Limits.</li>
            <li>Abrechnung / Billing.</li>
          </ul>

          <h2>## Offene Fragen</h2>
          <ul>
            <li>Limit pro Token oder pro IP?</li>
            <li>Sliding Window oder Fixed Window?</li>
          </ul>
        </div>

        <p class="caption">
          Kein Wort über Redis, Middleware oder Algorithmus. Nur <b>Verhalten</b>.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section12SDD);
