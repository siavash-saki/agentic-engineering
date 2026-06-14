/* Section 8 — Empfohlener Workflow
   Fünf-Phasen-Fluss. Die Disziplinen folgen als eigene Tip-Slides. */

const TAG = 's09-workflow';

const PHASES = [
  { num: '1', name: 'Explore',  body: 'Den Agenten Code lesen lassen, bevor er schreibt. Existierende Muster, Tests, Konventionen finden.' },
  { num: '2', name: 'Discuss',  body: 'Den Ansatz durchsprechen, bevor Code entsteht. Annahmen sichtbar machen.' },
  { num: '3', name: 'Plan',     body: 'Expliziter Plan — auf Papier oder im Plan-Mode. Erst freigeben, dann implementieren.' },
  { num: '4', name: 'Code',     body: 'Den Plan ausführen. Kleine Schritte. Bei Abweichung zurück zur Diskussion.' },
  { num: '5', name: 'Review',   body: 'Jeden Diff lesen. Keine Akzeptanz auf Vertrauensbasis — auch nicht beim eigenen Agenten.' },
];

class Section09 extends HTMLElement {
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
          animation: s09-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: s09-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 900px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: s09-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .flow {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--db-space-2);
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
          animation: s09-rise 500ms var(--db-ease) forwards;
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

        ${TAG} .loop {
          margin-top: var(--db-space-4);
          padding: var(--db-space-3) var(--db-space-5);
          background: var(--db-cool-gray-100);
          border-left: 4px dashed var(--db-cool-gray-400);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text);
          display: flex;
          align-items: center;
          gap: var(--db-space-3);
          opacity: 0;
          animation: s09-fade 500ms var(--db-ease) 1100ms forwards;
        }
        ${TAG} .loop .icon {
          font-size: 20px;
          color: var(--db-cool-gray-400);
          line-height: 1;
        }
        ${TAG} .loop b { color: var(--db-text-strong); }

        ${TAG} .next-up {
          margin-top: var(--db-space-5);
          padding: var(--db-space-4) var(--db-space-5);
          background: var(--db-cool-gray-100);
          border-left: 4px solid var(--db-red);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          opacity: 0;
          animation: s09-fade 500ms var(--db-ease) 1300ms forwards;
        }
        ${TAG} .next-up b { color: var(--db-red); }

        @keyframes s09-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s09-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          ${TAG} .flow { grid-template-columns: repeat(2, 1fr); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Empfohlener Workflow</span>
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

        <div class="loop">
          <span class="icon" aria-hidden="true">↺</span>
          <span><b>Bei Abweichung</b> in Code zurück zu Discuss — Annahmen prüfen, nicht den Plan biegen.</span>
        </div>

        <p class="next-up">
          Auf den folgenden Slides: die <b>Artefakte</b>, die Discuss und Plan
          produzieren — und die menschlichen Freigaben dazwischen.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section09);
