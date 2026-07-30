/* Section 9 — Empfohlener Workflow
   Fünf-Phasen-Fluss. Die Artefakte folgen im SDD-Kapitel. */

import { getLang } from '../core/i18n.js';

const TAG = 's09-workflow';

const CONTENT = {
  en: {
    h1: 'Explore → Discuss → Plan → Code → Review',
    lede: `Code is the last step, not the first. Flip that order and the model
          hands you exactly what you fed it: guesses.`,
    phaseLabel: 'Phase',
    phases: [
      { num: '1', name: 'Explore',  body: 'Let the agent read the code before it writes a line. Surface the existing patterns, tests and conventions.' },
      { num: '2', name: 'Discuss',  body: 'Talk through the approach before any code exists. Drag the assumptions into the open.' },
      { num: '3', name: 'Plan',     body: 'An explicit plan — on paper or in plan mode. Approve first, then implement.' },
      { num: '4', name: 'Code',     body: 'Execute the plan. Small steps. The moment it drifts, go back to Discuss.' },
      { num: '5', name: 'Review',   body: 'Read every diff — no exceptions, not even for your own agent.' },
    ],
    loop: '<b>When it drifts</b> in Code, loop back to Discuss — re-check the assumptions, don\'t bend the plan.',
    nextUp: `Next: the <b>artifacts</b> these phases produce — and the human
          gates between them.`,
  },
  de: {
    h1: 'Explore → Discuss → Plan → Code → Review',
    lede: `Der Code ist der letzte Schritt — nicht der erste. Wer das umdreht,
          bekommt vom Modell genau das, was er hineingibt: Vermutungen.`,
    phaseLabel: 'Phase',
    phases: [
      { num: '1', name: 'Explore',  body: 'Den Agenten Code lesen lassen, bevor er schreibt. Existierende Muster, Tests, Konventionen finden.' },
      { num: '2', name: 'Discuss',  body: 'Den Ansatz durchsprechen, bevor Code entsteht. Annahmen sichtbar machen.' },
      { num: '3', name: 'Plan',     body: 'Expliziter Plan — auf Papier oder im Plan-Mode. Erst freigeben, dann implementieren.' },
      { num: '4', name: 'Code',     body: 'Den Plan ausführen. Kleine Schritte. Bei Abweichung zurück zur Diskussion.' },
      { num: '5', name: 'Review',   body: 'Jeden Diff lesen — ohne Ausnahme, auch beim eigenen Agenten.' },
    ],
    loop: '<b>Bei Abweichung</b> in Code zurück zu Discuss — Annahmen prüfen, nicht den Plan biegen.',
    nextUp: `Gleich: die <b>Artefakte</b>, die diese Phasen produzieren — und die
          menschlichen Gates dazwischen.`,
  },
};

class Section09 extends HTMLElement {
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
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} .lede {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--ae-text);
          max-width: 900px;
          margin: 0 0 var(--ae-space-6);
        }

        /* The flow drawn as a flow: a line traces through the five phases
           left to right, visible in the gaps — the same device slide 15
           builds on, so the audience recognises it when it returns with the
           artifacts. Phases land in order along it. */
        ${TAG} .flow {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--ae-space-3);
          position: relative;
        }
        ${TAG} .flow .thread {
          position: absolute;
          left: 0; right: 0; top: 50%;
          width: 100%;
          height: 2px;
        }
        ${TAG} .phase {
          position: relative;
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          border-radius: var(--ae-radius-md);
          box-shadow: var(--fg-d1);
          padding: var(--ae-space-4);
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-2);
        }

        ${TAG} .phase .num {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ae-red);
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .phase h3 {
          margin: 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--ae-text-strong);
        }
        ${TAG} .phase p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text);
        }

        ${TAG} .loop {
          margin-top: var(--ae-space-4);
          padding: var(--ae-space-3) var(--ae-space-5);
          background: var(--ae-cool-gray-100);
          border-radius: var(--ae-radius-md);
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text);
          display: flex;
          align-items: center;
          gap: var(--ae-space-3);
        }
        ${TAG} .loop .icon {
          font-size: 20px;
          color: var(--ae-cool-gray-400);
          line-height: 1;
        }
        ${TAG} .loop b { color: var(--ae-text-strong); }

        ${TAG} .next-up {
          margin-top: var(--ae-space-5);
          padding: var(--ae-space-4) var(--ae-space-5);
          background: var(--ae-cool-gray-100);
          border-radius: var(--ae-radius-md);
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
        }
        ${TAG} .next-up b { color: var(--ae-red); }

        @media (max-width: 1024px) {
          ${TAG} .flow { grid-template-columns: repeat(2, 1fr); }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="flow">
          <svg class="thread fg-wire" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 1 L 100 1" style="--fg-at: 3; --fg-dur-draw: 1100ms"/>
          </svg>
          ${t.phases.map((p, i) => `
            <div class="phase fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="num">${p.num} · ${t.phaseLabel}</div>
              <h3 class="fg-hover-title">${p.name}</h3>
              <p>${p.body}</p>
            </div>
          `).join('')}
        </div>

        <div class="loop fg-in" style="--fg-at: 10">
          <span class="icon" aria-hidden="true">↺</span>
          <span>${t.loop}</span>
        </div>

        <p class="next-up fg-in" style="--fg-at: 12">
          ${t.nextUp}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section09);
