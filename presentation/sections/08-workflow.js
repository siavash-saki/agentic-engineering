/* Section 8 — Workflow & Best Practices
   Fünf-Phasen-Fluss plus drei Disziplinen. */

const TAG = 's08-workflow';

const PHASES = [
  { num: '1', name: 'Explore',  body: 'Den Agenten Code lesen lassen, bevor er schreibt. Existierende Muster, Tests, Konventionen finden.' },
  { num: '2', name: 'Discuss',  body: 'Den Ansatz durchsprechen, bevor Code entsteht. Annahmen sichtbar machen.' },
  { num: '3', name: 'Plan',     body: 'Expliziter Plan — auf Papier oder im Plan-Mode. Erst freigeben, dann implementieren.' },
  { num: '4', name: 'Code',     body: 'Den Plan ausführen. Kleine Schritte. Bei Abweichung zurück zur Diskussion.' },
  { num: '5', name: 'Review',   body: 'Jeden Diff lesen. Keine Akzeptanz auf Vertrauensbasis — auch nicht beim eigenen Agenten.' },
];

const PRACTICES = [
  {
    title: 'Den Agenten befragen',
    body:  'Vor dem Implementieren: „Was hast du verstanden? Was sind die offenen Fragen?" Halluzinationen tauchen in der Antwort auf, nicht im Code.',
  },
  {
    title: 'Parallele Sessions',
    body:  'Unabhängige Aufgaben gehen in separate Sessions oder Subagenten. Eine Session pro Mental-Kontext — sonst verschwimmen die Konversationen.',
  },
  {
    title: 'Jeden Diff reviewen',
    body:  'Auto-Accept ist die einzige nicht verhandelbare Regel. Wer den Diff nicht liest, übernimmt Code, den niemand verstanden hat.',
  },
];

class Section08 extends HTMLElement {
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
          animation: s08-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: s08-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 900px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: s08-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .flow {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--db-space-2);
          margin-bottom: var(--db-space-7);
          position: relative;
        }
        ${TAG} .phase {
          background: var(--db-cool-gray-100);
          border-top: 4px solid var(--db-red);
          padding: var(--db-space-4);
          display: flex;
          flex-direction: column;
          gap: var(--db-space-2);
          opacity: 0;
          transform: translateY(10px);
          animation: s08-rise 500ms var(--db-ease) forwards;
        }
        ${TAG} .phase:nth-child(1) { animation-delay: 500ms; }
        ${TAG} .phase:nth-child(2) { animation-delay: 620ms; }
        ${TAG} .phase:nth-child(3) { animation-delay: 740ms; }
        ${TAG} .phase:nth-child(4) { animation-delay: 860ms; }
        ${TAG} .phase:nth-child(5) { animation-delay: 980ms; }

        ${TAG} .phase .num {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--db-red);
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .phase h3 {
          margin: 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
        }
        ${TAG} .phase p {
          margin: 0;
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text);
        }

        ${TAG} .practices-title {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
          margin-bottom: var(--db-space-4);
          opacity: 0;
          animation: s08-fade 500ms var(--db-ease) 1150ms forwards;
        }
        ${TAG} .practices {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-4);
        }
        ${TAG} .practice {
          padding: var(--db-space-4) var(--db-space-5);
          padding-left: calc(var(--db-space-5) + 4px);
          background: var(--db-bg);
          border: 1px solid var(--db-border);
          border-radius: var(--db-radius);
          position: relative;
          opacity: 0;
          transform: translateY(10px);
          animation: s08-rise 500ms var(--db-ease) forwards;
        }
        ${TAG} .practice::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: var(--db-red);
          border-radius: var(--db-radius) 0 0 var(--db-radius);
        }
        ${TAG} .practice:nth-child(1) { animation-delay: 1250ms; }
        ${TAG} .practice:nth-child(2) { animation-delay: 1370ms; }
        ${TAG} .practice:nth-child(3) { animation-delay: 1490ms; }
        ${TAG} .practice h4 {
          margin: 0 0 var(--db-space-2);
          font-size: var(--db-fs-h5);
          line-height: var(--db-lh-h5);
          color: var(--db-text-strong);
        }
        ${TAG} .practice p {
          margin: 0;
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text);
        }

        @keyframes s08-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s08-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          ${TAG} .flow { grid-template-columns: repeat(2, 1fr); }
          ${TAG} .practices { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Wie man wirklich arbeitet</span>
        <h1>Explore → Discuss → Plan → Code → Review</h1>
        <p class="lede">
          Der Code ist der letzte Schritt — nicht der erste. Wer das umdreht,
          bekommt vom Modell genau das, was er hineingibt: Vermutungen.
        </p>

        <div class="flow">
          ${PHASES.map(p => `
            <div class="phase">
              <div class="num">${p.num} · Phase</div>
              <h3>${p.name}</h3>
              <p>${p.body}</p>
            </div>
          `).join('')}
        </div>

        <div class="practices-title">Drei Disziplinen, die den Unterschied machen</div>
        <div class="practices">
          ${PRACTICES.map(p => `
            <div class="practice">
              <h4>${p.title}</h4>
              <p>${p.body}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section08);
