/* Section 3 — Klein anfangen
   AI startet überkomplex — gegen die Best Practice „start small". */

const TAG = 's03-start-small';

class Section03Start extends HTMLElement {
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
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: s03s-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-4);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: s03s-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }

        ${TAG} .hero {
          margin: 0;
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-4);
          opacity: 0;
          transform: translateY(12px);
          animation: s03s-rise 600ms var(--db-ease) 380ms forwards;
        }
        ${TAG} .hero img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: var(--db-radius);
        }
        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: s03s-fade 600ms var(--db-ease) 800ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes s03s-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s03s-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          ${TAG} h1 { font-size: var(--db-fs-h3); line-height: var(--db-lh-h3); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Klein anfangen</span>
        <h1>KI startet <b>überkomplex</b> — du musst sie klein halten</h1>

        <div class="hero">
          <img src="assets/start-small.png" alt="Waterfall · Agile · AI — Build-Progressionen im Vergleich">
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section03Start);
