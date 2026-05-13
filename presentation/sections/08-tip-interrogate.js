/* Tip 1 — Den Agenten befragen
   Visualization: chat exchange — user asks, agent replies with
   what it understood + what's still open. Open items pulse red. */

const TAG = 's08-tip-interrogate';

class SectionTip01 extends HTMLElement {
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
          animation: tip01-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip01-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: tip01-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .chat {
          display: grid;
          gap: var(--db-space-3);
          margin-bottom: var(--db-space-5);
        }
        ${TAG} .msg {
          padding: var(--db-space-3) var(--db-space-4);
          border-radius: 14px;
          max-width: 520px;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          opacity: 0;
        }
        ${TAG} .msg.user {
          justify-self: end;
          background: var(--db-red);
          color: #fff;
          border-bottom-right-radius: 4px;
          animation: tip01-slide-r 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .msg.agent {
          justify-self: start;
          background: var(--db-cool-gray-100);
          color: var(--db-text-strong);
          border-bottom-left-radius: 4px;
          max-width: 760px;
          padding: var(--db-space-4) var(--db-space-5);
          animation: tip01-slide-l 500ms var(--db-ease) 900ms forwards;
        }

        ${TAG} .agent-label {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
          margin-bottom: var(--db-space-2);
        }
        ${TAG} .agent-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--db-space-4);
        }
        ${TAG} .col-title {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 var(--db-space-2);
        }
        ${TAG} .col-title.good { color: #137333; }
        ${TAG} .col-title.open { color: var(--db-red); }
        ${TAG} .col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 6px;
        }
        ${TAG} .col li {
          position: relative;
          padding-left: 22px;
          font-size: var(--db-fs-small);
          line-height: 1.45;
          color: var(--db-text);
          opacity: 0;
        }
        ${TAG} .col.good li::before {
          content: "✓";
          position: absolute;
          left: 0; top: 0;
          color: #137333;
          font-weight: 700;
        }
        ${TAG} .col.open li::before {
          content: "?";
          position: absolute;
          left: 4px; top: 0;
          color: var(--db-red);
          font-weight: 900;
        }
        ${TAG} .col li:nth-child(1) { animation: tip01-pop 400ms var(--db-ease) 1300ms forwards; }
        ${TAG} .col li:nth-child(2) { animation: tip01-pop 400ms var(--db-ease) 1450ms forwards; }
        ${TAG} .col li:nth-child(3) { animation: tip01-pop 400ms var(--db-ease) 1600ms forwards; }
        ${TAG} .col.open li {
          animation-name: tip01-pop-pulse;
          animation-duration: 600ms;
        }

        ${TAG} .punch {
          margin: 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip01-fade 600ms var(--db-ease) 2100ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip01-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip01-slide-r {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tip01-slide-l {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tip01-pop {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip01-pop-pulse {
          0%   { opacity: 0; transform: translateY(6px); }
          60%  { opacity: 1; transform: translateY(0); background: rgba(236, 0, 22, 0.08); }
          100% { opacity: 1; transform: translateY(0); background: transparent; }
        }

        @media (max-width: 860px) {
          ${TAG} .agent-cols { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 1 · Disziplin</span>
        <h1>Befragen, <b>bevor</b> er codet</h1>
        <p class="lede">
          „Was hast du verstanden? Welche Fragen sind offen?" — Halluzinationen
          zeigen sich in der Antwort, nicht erst im Diff.
        </p>

        <div class="chat">
          <div class="msg user">Implementiere die Login-API.</div>
          <div class="msg agent">
            <div class="agent-label">Bevor ich loslege …</div>
            <div class="agent-cols">
              <div class="col good">
                <div class="col-title good">Verstanden</div>
                <ul>
                  <li>JWT-Token für Authentifizierung</li>
                  <li>Endpoint <code>/api/login</code></li>
                  <li>Bestehende User-Tabelle</li>
                </ul>
              </div>
              <div class="col open">
                <div class="col-title open">Offen</div>
                <ul>
                  <li>SSO oder lokale Passwörter?</li>
                  <li>Refresh-Token-Strategie?</li>
                  <li>Rate Limiting nötig?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p class="punch">
          Drei Fragen sparen <b>drei Stunden Debugging</b>.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip01);
