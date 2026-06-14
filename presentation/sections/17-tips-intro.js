/* Section 17 — Best Practices chapter opener
   Bridges the SDD chapter into the Tips chapter. Without this slide the
   deck jumps cold from anti-patterns straight into "Tip 1", which is a
   confusing context switch. Lists all ten tips at a glance so the audience
   knows what's coming. */

const TAG = 's17-tips-intro';

const TIPS = [
  { n: '01', title: 'Befragen, bevor er codet' },
  { n: '02', title: 'Eine Session pro Mental-Kontext' },
  { n: '03', title: 'Auto-Accept ist die Falle' },
  { n: '04', title: 'Was du zweimal tust, wird ein Skill' },
  { n: '05', title: 'Lass den Agenten dich interviewen' },
  { n: '06', title: 'Klein committen, früh und oft' },
  { n: '07', title: 'Verwirrt? Neue Session' },
  { n: '08', title: 'Das passende Tier wählen' },
  { n: '09', title: 'Mehrere Anbieter ausprobieren' },
  { n: '10', title: 'Projekt-Regeln schreiben & pflegen' },
];

class Section17Intro extends HTMLElement {
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
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: s17i-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: s17i-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 940px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: s17i-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--db-space-3) var(--db-space-5);
        }
        ${TAG} .tip {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: var(--db-space-3);
          padding: var(--db-space-3) var(--db-space-4);
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius);
          border-left: 3px solid var(--db-red);
          opacity: 0;
          transform: translateY(8px);
        }
        ${TAG} .tip .n {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: var(--db-fs-caption);
          font-weight: 700;
          color: var(--db-red);
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .tip .t {
          font-size: var(--db-fs-body);
          line-height: 1.3;
          color: var(--db-text-strong);
          font-weight: 700;
        }

        @keyframes s17i-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s17i-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 760px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Best Practices</span>
        <h1>Zehn <b>Disziplinen</b></h1>
        <p class="lede">
          Der Workflow trägt nicht von alleine. Auf den folgenden Folien:
          zehn Praktiken, die den Unterschied machen zwischen einem
          hilfreichen und einem produktivitätskostenden KI-Coding-Tool.
        </p>

        <div class="grid">
          ${TIPS.map((t, i) => `
            <div class="tip" style="animation: s17i-rise 400ms var(--db-ease) ${500 + i * 80}ms forwards">
              <span class="n">${t.n}</span>
              <span class="t">${t.title}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section17Intro);
