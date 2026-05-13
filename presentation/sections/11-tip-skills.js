/* Tip 4 — Custom Skills
   Visualization: a slash command types itself at the top, then expands
   into a skill definition with structured steps below. */

const TAG = 's11-tip-skills';

class SectionTip04 extends HTMLElement {
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
          animation: tip04-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip04-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: tip04-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .terminal {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          background: #1c1f24;
          color: #e6e8eb;
          border-radius: var(--db-radius);
          padding: var(--db-space-3) var(--db-space-4);
          font-size: 15px;
          line-height: 1.6;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: tip04-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .terminal .prompt { color: #94a3b8; }
        ${TAG} .terminal .cmd {
          color: var(--db-red);
          font-weight: 700;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          animation: tip04-type 1200ms steps(20, end) 800ms forwards;
        }
        ${TAG} .terminal .caret {
          display: inline-block;
          width: 9px;
          height: 18px;
          background: #e6e8eb;
          animation: tip04-blink 800ms steps(2, end) infinite;
          margin-left: 2px;
        }

        ${TAG} .expand {
          margin-top: var(--db-space-4);
          background: var(--db-cool-gray-100);
          border-left: 4px solid var(--db-red);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          padding: var(--db-space-4) var(--db-space-5);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--db-space-3) var(--db-space-5);
          opacity: 0;
          transform: translateY(-8px);
          animation: tip04-unfold 500ms var(--db-ease) 2100ms forwards;
        }
        ${TAG} .expand .skill-label {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
          padding-top: 4px;
        }
        ${TAG} .expand ol {
          margin: 0;
          padding: 0;
          list-style: none;
          counter-reset: step;
          display: grid;
          gap: 8px;
        }
        ${TAG} .expand li {
          counter-increment: step;
          padding-left: 32px;
          position: relative;
          font-size: var(--db-fs-body);
          line-height: 1.45;
          color: var(--db-text);
          opacity: 0;
        }
        ${TAG} .expand li::before {
          content: counter(step);
          position: absolute;
          left: 0; top: 1px;
          width: 22px; height: 22px;
          background: var(--db-red);
          color: #fff;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        ${TAG} .expand li:nth-child(1) { animation: tip04-pop 400ms var(--db-ease) 2400ms forwards; }
        ${TAG} .expand li:nth-child(2) { animation: tip04-pop 400ms var(--db-ease) 2550ms forwards; }
        ${TAG} .expand li:nth-child(3) { animation: tip04-pop 400ms var(--db-ease) 2700ms forwards; }
        ${TAG} .expand li:nth-child(4) { animation: tip04-pop 400ms var(--db-ease) 2850ms forwards; }
        ${TAG} .expand li b { color: var(--db-red); font-weight: 700; }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip04-fade 600ms var(--db-ease) 3200ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip04-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip04-type {
          to { width: 14ch; }
        }
        @keyframes tip04-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes tip04-unfold {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip04-pop {
          to { opacity: 1; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 4 · Disziplin</span>
        <h1>Was Sie zweimal tun, wird ein <b>Skill</b></h1>
        <p class="lede">
          Wiederkehrende Workflows als Custom Skill speichern. Ein Befehl,
          jedes Mal derselbe Standard.
        </p>

        <div class="terminal">
          <span class="prompt">›</span>
          <span class="cmd">/db-pr-review</span>
          <span class="caret"></span>
        </div>

        <div class="expand">
          <div class="skill-label">Skill-<br>Definition</div>
          <ol>
            <li>Lies den <b>Git-Diff</b> der aktuellen Branch</li>
            <li>Prüfe gegen <b>DB-Codestyle</b> und interne Conventions</li>
            <li>Markiere <b>Sicherheits-</b> und Logging-Auffälligkeiten</li>
            <li>Schreibe strukturierte <b>Review-Notes</b> als PR-Kommentar</li>
          </ol>
        </div>

        <p class="punch">
          Vier Schritte, einmal definiert. <b>Hundertmal genutzt.</b>
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip04);
