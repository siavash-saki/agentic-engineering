/* Section 14 — SDD: Rate-Limiting · Tasks (3/3 of the triptych)
   Same template, last segment active. Closing punch lands the "three
   resolutions of the same feature" idea. */

const TAG = 's14-sdd-tasks';

class Section14SDD extends HTMLElement {
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
          animation: sdd14-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-4);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: sdd14-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }

        ${TAG} .crumb {
          display: flex;
          align-items: center;
          gap: var(--db-space-2);
          margin: 0 0 var(--db-space-4);
          opacity: 0;
          animation: sdd14-fade 500ms var(--db-ease) 340ms forwards;
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
        ${TAG} .crumb .seg.done {
          color: var(--db-text-strong);
          background: var(--db-bg);
          border-color: var(--db-cool-gray-300, #c8cdd2);
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
          font-size: 14px;
          line-height: 1.9;
          color: var(--db-text-strong);
          position: relative;
          opacity: 0;
          animation: sdd14-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .doc::before {
          content: "tasks.md";
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
        ${TAG} .doc .feat {
          font-size: 15px;
          font-weight: 700;
          color: var(--db-text-strong);
          margin: 0 0 var(--db-space-3);
        }
        ${TAG} .doc ul {
          margin: 0;
          padding-left: 34px;
          list-style: none;
        }
        ${TAG} .doc li {
          position: relative;
          opacity: 0;
        }
        ${TAG} .doc li::before {
          content: "[ ]";
          position: absolute;
          left: -34px;
          color: var(--db-red);
          font-weight: 700;
        }
        ${TAG} .doc li:nth-child(1) { animation: sdd14-pop 350ms var(--db-ease) 700ms forwards; }
        ${TAG} .doc li:nth-child(2) { animation: sdd14-pop 350ms var(--db-ease) 820ms forwards; }
        ${TAG} .doc li:nth-child(3) { animation: sdd14-pop 350ms var(--db-ease) 940ms forwards; }
        ${TAG} .doc li:nth-child(4) { animation: sdd14-pop 350ms var(--db-ease) 1060ms forwards; }
        ${TAG} .doc li:nth-child(5) { animation: sdd14-pop 350ms var(--db-ease) 1180ms forwards; }
        ${TAG} .doc li:nth-child(6) { animation: sdd14-pop 350ms var(--db-ease) 1300ms forwards; }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: sdd14-fade 600ms var(--db-ease) 1600ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes sdd14-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sdd14-pop {
          to { opacity: 1; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Beispiel · Rate-Limiting</span>
        <h1>Tasks — der <b>Schritt</b></h1>

        <div class="crumb">
          <span class="seg done">Spec</span>
          <span class="arrow">→</span>
          <span class="seg done">Plan</span>
          <span class="arrow">→</span>
          <span class="seg active">Tasks</span>
        </div>

        <div class="doc">
          <p class="feat"># Tasks: Rate-Limiting</p>
          <ul>
            <li>Redis-Verbindung in <code>config/redis.ts</code> aufsetzen</li>
            <li>Token-Bucket-Middleware implementieren</li>
            <li>429-Antwort mit Retry-After-Header</li>
            <li>Fail-open bei Redis-Timeout</li>
            <li>Integrationstest: über Limit → 429</li>
            <li>Integrationstest: unter Limit → 200</li>
          </ul>
        </div>

        <p class="punch">
          Dieselbe Sache, drei Auflösungen — <b>das Was</b>, <b>das Wie</b>, <b>der Schritt</b>.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section14SDD);
