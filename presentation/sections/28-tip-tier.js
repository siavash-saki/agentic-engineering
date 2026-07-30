/* Tip 9 — Das richtige Modell-Tier wählen
   Visualization: three lanes (Reasoning · Standard · Fast) with
   qualitative speed/cost bars and an example task per tier. Tier-based,
   not version-named — model names change, the tiers stay. */

import { getLang } from '../core/i18n.js';

const TAG = 's28-tip-tier';

const CONTENT = {
  en: {
    h1: 'The right <b>tier</b> for the job',
    lede: `One hammer for every nail is slow — and expensive. Pick the right
          tier and you only pay for depth where it actually earns its keep.`,
    meterSpeed: 'Speed',
    meterCost: 'Cost',
    taskTag: 'Typical job',
    footer: `Model names change every few months. <b>Pick the tier, not the
          version</b> — whatever's available right now lives in the tool.`,
    models: [
      {
        name: 'Reasoning',
        role: 'Hard problems · Architecture',
        speed: 35, cost: 95,
        task: 'Plan the breakup of an 80k-LOC monolith into modules',
        delay: 380,
      },
      {
        name: 'Standard',
        role: 'Features · Tests · Implementation',
        speed: 70, cost: 50,
        task: 'Build a feature, write the tests',
        delay: 500,
        primary: true,
      },
      {
        name: 'Fast',
        role: 'Edits · Renames · Small patches',
        speed: 95, cost: 18,
        task: 'Rename a variable, fix a typo',
        delay: 620,
      },
    ],
  },
  de: {
    h1: 'Die richtige <b>Modellklasse</b>',
    lede: `Ein Hammer für jeden Nagel ist teuer — und langsam. Wer die richtige
          Klasse wählt, bezahlt für Tiefe nur dort, wo sie nötig ist.`,
    meterSpeed: 'Tempo',
    meterCost: 'Kosten',
    taskTag: 'Typische Aufgabe',
    footer: `Modellnamen ändern sich alle paar Monate. <b>Wähle die Klasse,
          nicht die Version</b> — was aktuell verfügbar ist, steht im Tool.`,
    models: [
      {
        name: 'Reasoning',
        role: 'Harte Probleme · Architektur',
        speed: 35, cost: 95,
        task: 'Migration eines 80k-LOC-Monolithen in Module entwerfen',
        delay: 380,
      },
      {
        name: 'Standard',
        role: 'Features · Tests · Implementierung',
        speed: 70, cost: 50,
        task: 'Feature implementieren, Tests schreiben',
        delay: 500,
        primary: true,
      },
      {
        name: 'Schnell',
        role: 'Edits · Renames · kleine Patches',
        speed: 95, cost: 18,
        task: 'Variable umbenennen, Typo fixen',
        delay: 620,
      },
    ],
  },
};

class SectionTip09 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--ae-text);
          max-width: 820px;
          margin: 0 0 var(--ae-space-5);
        }

        ${TAG} .lanes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--ae-space-4);
        }
        /* Standard is the tier the audience should default to — the answer,
           by ring and depth, not by a tinted background. */
        ${TAG} .lane {
          padding: var(--ae-space-4);
          display: grid;
          gap: var(--ae-space-3);
        }

        ${TAG} .lane .name {
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          font-weight: 900;
          color: var(--ae-text-strong);
          margin: 0;
        }
        ${TAG} .lane.primary .name { color: var(--ae-red); }
        ${TAG} .lane .role {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-text-muted);
        }

        ${TAG} .meters { display: grid; gap: 8px; }
        ${TAG} .meter {
          display: grid;
          grid-template-columns: 60px 1fr;
          align-items: center;
          gap: 10px;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ae-text-muted);
        }
        /* The gauges are the point of this slide:
           a track you can see, a fill you cannot miss, filling from empty
           on mount. Resting width is the value — the animation only
           describes the departure from zero. */
        ${TAG} .meter .track {
          height: 10px;
          background: var(--ae-cool-gray-200);
          border-radius: 999px;
          overflow: hidden;
        }
        ${TAG} .meter .fill {
          display: block;
          height: 100%;
          background: var(--ae-red);
          width: var(--w);
          border-radius: inherit;
        }

        ${TAG} .task {
          margin-top: auto;
          padding-top: var(--ae-space-3);
          border-top: 1px dashed var(--ae-border);
          font-size: var(--ae-fs-small);
          line-height: 1.45;
          color: var(--ae-text);
        }
        ${TAG} .task .tag {
          display: block;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-red);
          margin-bottom: 4px;
        }

        ${TAG} .footer {
          margin: var(--ae-space-5) 0 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text-muted);
          text-align: center;
        }
        ${TAG} .footer b { color: var(--ae-text-strong); }

        @keyframes tip09-fill { from { width: 0; } }

        @media (max-width: 900px) {
          ${TAG} .lanes { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">9</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="lanes">
          ${t.models.map((m, i) => `
            <div class="lane fg-card ${m.primary ? 'fg-card--answer' : ''} fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="role">${m.role}</div>
              <h3 class="name">${m.name}</h3>
              <div class="meters">
                <div class="meter">
                  <span>${t.meterSpeed}</span>
                  <span class="track">
                    <span class="fill" style="--w: ${m.speed}%; animation: tip09-fill 700ms var(--ae-ease) calc(60ms + ${5 + i} * var(--fg-beat)) both;"></span>
                  </span>
                </div>
                <div class="meter">
                  <span>${t.meterCost}</span>
                  <span class="track">
                    <span class="fill" style="--w: ${m.cost}%; animation: tip09-fill 700ms var(--ae-ease) calc(60ms + ${5 + i} * var(--fg-beat) + 160ms) both;"></span>
                  </span>
                </div>
              </div>
              <div class="task">
                <span class="tag">${t.taskTag}</span>
                ${m.task}
              </div>
            </div>
          `).join('')}
        </div>

        <p class="footer fg-in" style="--fg-at: 12">
          ${t.footer}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip09);
