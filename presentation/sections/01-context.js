/* Section 1 — Context & Goal
   Working pattern for other sections: light DOM, DB base styles inherited,
   only section-specific layout and animations defined here. */

const TAG = 's01-context';

class Section01 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ${TAG} {
          display: block;
          padding: var(--db-space-9) var(--db-gutter);
          overflow: auto;
          background: var(--db-bg);
        }
        ${TAG} .wrap {
          max-width: 880px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          letter-spacing: 0;
          text-transform: none;
          font-weight: 900;
          margin-bottom: var(--db-space-5);
          opacity: 0;
          animation: s01-fade 600ms var(--db-ease) 100ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: s01-fade 700ms var(--db-ease) 250ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 760px;
          margin: 0 0 var(--db-space-7);
          opacity: 0;
          animation: s01-fade 700ms var(--db-ease) 450ms forwards;
        }
        ${TAG} .goals-title {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
          margin-bottom: var(--db-space-4);
          opacity: 0;
          animation: s01-fade 600ms var(--db-ease) 700ms forwards;
        }
        ${TAG} ul.goals {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: var(--db-space-3);
        }
        ${TAG} ul.goals li {
          position: relative;
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-4) var(--db-space-5);
          padding-left: calc(var(--db-space-5) + 8px);
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          opacity: 0;
          transform: translateX(-12px);
          animation: s01-slide 600ms var(--db-ease) forwards;
        }
        ${TAG} ul.goals li::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: var(--db-red);
          border-radius: var(--db-radius-md) 0 0 var(--db-radius-md);
        }
        ${TAG} ul.goals li b { color: var(--db-red); font-weight: 700; }
        ${TAG} ul.goals li:nth-child(1) { animation-delay: 880ms; }
        ${TAG} ul.goals li:nth-child(2) { animation-delay: 1020ms; }
        ${TAG} ul.goals li:nth-child(3) { animation-delay: 1160ms; }
        ${TAG} .note {
          margin: var(--db-space-6) 0 0;
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text-muted);
          opacity: 0;
          animation: s01-fade 600ms var(--db-ease) 1400ms forwards;
        }
        ${TAG} .note code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.92em;
          color: var(--db-text);
        }
        @keyframes s01-fade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s01-slide {
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          ${TAG} { padding: var(--db-space-7) var(--db-gutter); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Agentic Engineering</span>
        <h1>KI-Coding-Tools <b>bewusst</b> einsetzen</h1>
        <p class="lede">
          Die meisten von uns nutzen KI-Coding-Tools täglich. Wenige nutzen sie
          bewusst. In diesem Vortrag geht es um die Lücke zwischen beidem —
          und die Engineering-Praxis, die sie schließt.
        </p>
        <div class="goals-title">Was du mitnimmst</div>
        <ul class="goals">
          <li><b>Vibe Coding</b> vs <b>Agentic Engineering</b></li>
          <li>Ein mentales Modell für die framework-unabhängigen Konzepte hinter jedem KI-Coding-Tool</li>
          <li>Einen Workflow, den du ab Montagmorgen anwenden kannst — in Claude Code, Copilot, Cursor oder Codex</li>
        </ul>
      </div>
    `;
  }
}

customElements.define(TAG, Section01);
