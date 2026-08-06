/* Section 1 — Title.
   The route device from the v1 deck: the talk's shape drawn as a path
   with stops, rather than listed as cards. What sits on the stops here is
   not the chapter list but the loop itself — this deck has one spine, and
   the title slide makes that argument before a word is spoken.

   The seven chapters are still reachable from the footer chips, so
   nothing is lost by not enumerating them here. */

import { getLang } from '../core/i18n.js';

const TAG = 's01-title';

const CONTENT = {
  en: {
    h1a: 'Agentic',
    h1b: 'Engineering',
    sub: `How to build production software with coding agents.`,
    stops: [
      { n: '01', t: 'Plan',   d: 'Read, ask, converge, write it down.' },
      { n: '02', t: 'Build',  d: 'Small steps, and what the agent knows.' },
      { n: '03', t: 'Review', d: 'The quality gate: check, prove, accept.' },
    ],
    meta: 'Dr. Siavash Saki  ·  2026',
  },
  de: {
    h1a: 'Agentic',
    h1b: 'Engineering',
    sub: `Wie du mit Coding-Agenten produktionsreife Software baust.`,
    stops: [
      { n: '01', t: 'Plan',   d: 'Lesen, fragen, klären, aufschreiben.' },
      { n: '02', t: 'Build',  d: 'Kleine Schritte, und was der Agent weiß.' },
      { n: '03', t: 'Review', d: 'Das Qualitätsgate: prüfen, belegen, abnehmen.' },
    ],
    meta: 'Dr. Siavash Saki  ·  2026',
  },
};

/* The route curve passes exactly through the three column centres of a
   1200-wide frame (x = 200, 600, 1000); each stop's height on the curve is
   carried per column as --ny (in the path's 120-unit coordinate space). */
const NODE_Y = [68, 40, 58];

class Section01 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: block;
          padding: var(--ae-space-7) var(--ae-gutter);
          overflow: auto;
          background: var(--fg-paper);
        }
        ${TAG} .fg-wrap {
          max-width: 1200px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-5);
          font-size: calc(var(--ae-fs-display) * 1.12);
          line-height: var(--ae-lh-display);
          color: var(--fg-ink);
        }
        /* No local override of the title highlight: the kit's .fg-mark is
           already the deeper band, and one rule deck-wide is the point. */
        ${TAG} .sub {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--fg-body);
          max-width: 62ch;
          margin: 0 0 var(--ae-space-6);
        }

        /* ── The route: a drawn path with the three steps as stops ── */
        ${TAG} .route { --route-h: clamp(90px, 13vh, 150px); }
        ${TAG} .route .line {
          position: absolute;
          left: 0; right: 0; top: 0;
          width: 100%;
          height: var(--route-h);
        }
        ${TAG} .route {
          position: relative;
          margin-bottom: var(--ae-space-6);
        }
        ${TAG} .cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--ae-space-4);
        }
        ${TAG} .rcol {
          position: relative;
          padding-top: calc(var(--route-h) + var(--ae-space-3));
          text-align: center;
        }
        /* The stop: the step's ordinal, sitting on the curve itself. */
        ${TAG} .node {
          position: absolute;
          top: calc(var(--ny) / 120 * var(--route-h));
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(40px, 5.4vh, 52px);
          height: clamp(40px, 5.4vh, 52px);
          border-radius: 50%;
          background: var(--fg-paper);
          border: 2px solid var(--fg-green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ae-fs-small);
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: var(--fg-green);
          transition: background 220ms var(--ae-ease), color 220ms var(--ae-ease),
                      transform 220ms var(--ae-ease);
        }
        ${TAG} .rcol:hover .node {
          background: var(--fg-green);
          color: #fff;
          transform: translate(-50%, -50%) scale(1.08);
        }
        ${TAG} .rcol .t {
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h3);
          line-height: var(--ae-lh-h3);
          font-weight: 700;
          letter-spacing: -0.022em;
          color: var(--fg-ink);
          margin-bottom: var(--ae-space-2);
          transition: color 220ms var(--ae-ease);
        }
        ${TAG} .rcol:hover .t { color: var(--fg-green-d); }
        ${TAG} .rcol .d {
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-muted);
          max-width: 34ch;
          margin: 0 auto;
        }
        ${TAG} .meta {
          font-family: var(--ae-font-head);
          font-size: calc(var(--ae-fs-small) * 1.60);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--fg-body);
          margin: var(--ae-space-9) 0 0 var(--ae-space-5);
        }
        @media (max-width: 768px) {
          ${TAG} { padding: var(--ae-space-6) var(--ae-gutter); }
          ${TAG} .meta { margin-left: 0; }
          ${TAG} .route .line { display: none; }
          ${TAG} .cols { grid-template-columns: 1fr; gap: var(--ae-space-3); }
          ${TAG} .rcol { padding-top: 0; text-align: left; }
          ${TAG} .rcol .node { display: none; }
          ${TAG} .rcol .d { margin: 0; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1a} <span class="fg-mark fg-mark--sweep" style="--fg-at: 5">${t.h1b}</span></h1>
        <p class="sub fg-in" style="--fg-at: 2">${t.sub}</p>

        <div class="route">
          <svg class="line fg-wire" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" style="--fg-at: 3; --fg-dur-draw: 1200ms"
              d="M 20 86 C 90 80, 140 72, 200 68 C 340 58, 460 44, 600 40 C 740 36, 870 50, 1000 58 C 1070 62, 1120 55, 1180 48"/>
            <polygon points="1180,40 1196,48 1180,56" fill="var(--fg-green)" opacity="0.7"
              style="animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + 8 * var(--fg-beat))"/>
          </svg>
          <div class="cols">
            ${t.stops.map((c, i) => `
              <div class="rcol" style="--ny: ${NODE_Y[i]}">
                <span class="node" style="animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + ${4 + i} * var(--fg-beat))">${c.n}</span>
                <div class="t fg-in" style="--fg-at: ${5 + i}">${c.t}</div>
                <p class="d fg-in" style="--fg-at: ${5 + i}">${c.d}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <p class="meta fg-in" style="--fg-at: 9">${t.meta}</p>
      </div>
    `;
  }
}

customElements.define(TAG, Section01);
