/* Tip 8 — Das richtige Modell wählen
   Visualization: three model lanes (Opus / Sonnet / Haiku) with
   speed/cost bars and an example task that "routes" into each lane. */

const TAG = 's16-tip-model';

const MODELS = [
  {
    name: 'Opus 4.7',
    role: 'Reasoning · Architektur',
    speed: 35, cost: 95,
    task: 'Migration eines 80k-LOC Monolithen in Module entwerfen',
    delay: 600,
  },
  {
    name: 'Sonnet 4.6',
    role: 'Standard · Implementierung',
    speed: 70, cost: 50,
    task: 'Feature implementieren, Tests schreiben',
    delay: 900,
    primary: true,
  },
  {
    name: 'Haiku 4.5',
    role: 'Schnell · Edits',
    speed: 95, cost: 18,
    task: 'Variable umbenennen, Typo fixen',
    delay: 1200,
  },
];

class SectionTip08 extends HTMLElement {
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
          animation: tip08-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip08-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: tip08-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .lanes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-4);
        }
        ${TAG} .lane {
          background: var(--db-bg);
          border: 1px solid var(--db-border);
          border-radius: var(--db-radius);
          padding: var(--db-space-4);
          display: grid;
          gap: var(--db-space-3);
          opacity: 0;
          transform: translateY(12px);
        }
        ${TAG} .lane.primary {
          background: var(--db-cool-gray-100);
          border: none;
          border-top: 4px solid var(--db-red);
          border-radius: 0 0 var(--db-radius) var(--db-radius);
        }

        ${TAG} .lane .name {
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          font-weight: 900;
          color: var(--db-text-strong);
          margin: 0;
        }
        ${TAG} .lane.primary .name { color: var(--db-red); }
        ${TAG} .lane .role {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
        }

        ${TAG} .meters { display: grid; gap: 8px; }
        ${TAG} .meter {
          display: grid;
          grid-template-columns: 60px 1fr 36px;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--db-text-muted);
        }
        ${TAG} .meter .track {
          height: 6px;
          background: var(--db-cool-gray-100);
          border-radius: 999px;
          overflow: hidden;
        }
        ${TAG} .lane.primary .meter .track { background: var(--db-cool-gray-200, #e6ecf0); }
        ${TAG} .meter .fill {
          height: 100%;
          background: var(--db-red);
          width: 0;
          border-radius: inherit;
        }
        ${TAG} .meter .val {
          text-align: right;
          color: var(--db-text-strong);
          font-variant-numeric: tabular-nums;
        }

        ${TAG} .task {
          margin-top: auto;
          padding-top: var(--db-space-3);
          border-top: 1px dashed var(--db-border);
          font-size: var(--db-fs-small);
          line-height: 1.45;
          color: var(--db-text);
        }
        ${TAG} .task .tag {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-red);
          margin-bottom: 4px;
        }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip08-fade 600ms var(--db-ease) 1700ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip08-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip08-rise {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip08-fill { to { width: var(--w); } }

        @media (max-width: 900px) {
          ${TAG} .lanes { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 8 · Disziplin</span>
        <h1>Das passende Modell für die <b>passende Aufgabe</b></h1>
        <p class="lede">
          Ein Hammer für jeden Nagel ist teuer — und langsam. Wer das richtige
          Modell wählt, bezahlt für Tiefe nur dort, wo sie nötig ist.
        </p>

        <div class="lanes">
          ${MODELS.map((m, i) => `
            <div class="lane ${m.primary ? 'primary' : ''}"
                 style="animation: tip08-rise 500ms var(--db-ease) ${m.delay}ms forwards;">
              <div class="role">${m.role}</div>
              <h3 class="name">${m.name}</h3>
              <div class="meters">
                <div class="meter">
                  <span>Tempo</span>
                  <span class="track">
                    <span class="fill" style="--w: ${m.speed}%; animation: tip08-fill 700ms var(--db-ease) ${m.delay + 200}ms forwards;"></span>
                  </span>
                  <span class="val">${m.speed}</span>
                </div>
                <div class="meter">
                  <span>Kosten</span>
                  <span class="track">
                    <span class="fill" style="--w: ${m.cost}%; animation: tip08-fill 700ms var(--db-ease) ${m.delay + 350}ms forwards;"></span>
                  </span>
                  <span class="val">${m.cost}</span>
                </div>
              </div>
              <div class="task">
                <span class="tag">Typische Aufgabe</span>
                ${m.task}
              </div>
            </div>
          `).join('')}
        </div>

        <p class="punch">
          Standard ist Sonnet. <b>Opus, wenn's hart wird. Haiku, wenn's schnell muss.</b>
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip08);
