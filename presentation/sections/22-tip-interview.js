/* Tip 5 — Lass den Agenten dich interviewen
   Visualization: the agent drives the conversation with questions on the
   left; on the right, a spec sheet fills in answer by answer. */

const TAG = 's22-tip-interview';

const QA = [
  { q: 'Welches Problem löst die Funktion?',     a: 'CSV-Export für Reporting-Team' },
  { q: 'Wer ruft sie auf — UI oder Job?',         a: 'Wöchentlicher Cron-Job' },
  { q: 'Welche Felder, in welcher Reihenfolge?',  a: 'ID, Datum, Region, Auslastung' },
  { q: 'Wie groß werden die Exporte?',            a: '~ 80 MB · streamen, nicht buffern' },
];

class SectionTip05 extends HTMLElement {
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
          color: var(--db-red); font-size: var(--db-fs-h4); letter-spacing: 0.04em; font-weight: 900;
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: tip05-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip05-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: tip05-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .stage {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: var(--db-space-5);
          align-items: start;
        }

        ${TAG} .qa-stream {
          display: grid;
          gap: 8px;
        }
        ${TAG} .qa {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(8px);
        }
        ${TAG} .q, ${TAG} .a {
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 13px;
          line-height: 1.35;
        }
        ${TAG} .q {
          background: var(--db-cool-gray-100);
          color: var(--db-text-strong);
          border-bottom-left-radius: 3px;
          justify-self: start;
          max-width: 100%;
        }
        ${TAG} .a {
          background: var(--db-red);
          color: #fff;
          border-bottom-right-radius: 3px;
          justify-self: end;
          max-width: 100%;
          font-weight: 700;
        }
        ${TAG} .qa .sep {
          color: var(--db-red);
          font-weight: 900;
          font-size: 14px;
        }

        ${TAG} .qa:nth-child(1) { animation: tip05-pop 400ms var(--db-ease) 450ms forwards; }
        ${TAG} .qa:nth-child(2) { animation: tip05-pop 400ms var(--db-ease) 750ms forwards; }
        ${TAG} .qa:nth-child(3) { animation: tip05-pop 400ms var(--db-ease) 1050ms forwards; }
        ${TAG} .qa:nth-child(4) { animation: tip05-pop 400ms var(--db-ease) 1350ms forwards; }

        ${TAG} .spec {
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius);
          padding: var(--db-space-4);
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          line-height: 1.7;
          color: var(--db-text-strong);
          position: relative;
          opacity: 0;
          animation: tip05-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .spec::before {
          content: "SPEC.md";
          position: absolute;
          top: -10px; left: 14px;
          background: var(--db-red);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 3px;
        }
        ${TAG} .spec ul {
          margin: 12px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 6px;
        }
        ${TAG} .spec li {
          opacity: 0;
          padding-left: 18px;
          position: relative;
        }
        ${TAG} .spec li::before {
          content: "-";
          position: absolute;
          left: 0;
          color: var(--db-red);
          font-weight: 700;
        }
        ${TAG} .spec li b { color: var(--db-red); font-weight: 700; }
        ${TAG} .spec li:nth-child(1) { animation: tip05-pop 400ms var(--db-ease) 700ms forwards; }
        ${TAG} .spec li:nth-child(2) { animation: tip05-pop 400ms var(--db-ease) 1000ms forwards; }
        ${TAG} .spec li:nth-child(3) { animation: tip05-pop 400ms var(--db-ease) 1300ms forwards; }
        ${TAG} .spec li:nth-child(4) { animation: tip05-pop 400ms var(--db-ease) 1600ms forwards; }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip05-fade 600ms var(--db-ease) 1800ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip05-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip05-pop {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          ${TAG} .stage { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 5</span>
        <h1>Lass den Agenten <b>dich</b> interviewen</h1>
        <p class="lede">
          Du weißt, was du willst — aber nicht alles, was relevant ist.
          Dreh die Richtung um: der Agent fragt, du antwortest.
        </p>

        <div class="stage">
          <div class="qa-stream">
            ${QA.map(p => `
              <div class="qa">
                <div class="q">${p.q}</div>
                <div class="sep">→</div>
                <div class="a">${p.a}</div>
              </div>
            `).join('')}
          </div>

          <div class="spec">
            <ul>
              <li>Zweck: <b>CSV-Export Reporting</b></li>
              <li>Trigger: <b>Cron, wöchentlich</b></li>
              <li>Schema: <b>ID, Datum, Region, Auslastung</b></li>
              <li>Performance: <b>Streamed, ~80 MB</b></li>
            </ul>
          </div>
        </div>

        <p class="punch">
          Aus vier Fragen entsteht eine <b>Spec</b> — der Vertrag aus dem SDD-Kapitel.
          Aus Vermutungen entsteht Code.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip05);
