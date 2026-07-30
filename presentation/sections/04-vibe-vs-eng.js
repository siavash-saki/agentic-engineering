/* Section 4 — The thesis, drawn
   Slide 3 argues vibe coding against agentic engineering in a table; this slide
   lands the same argument as one picture, and slide 9 then teaches the flow the
   picture has already labelled. Image-only by design —
   the punchline is delivered verbally. */

import { getLang } from '../core/i18n.js';

const TAG = 's04-vibe-drawn';

const CONTENT = {
  en: {
    h1: 'How [not] to build <b>production-grade software</b>',
    heroAlt: 'Two rows. Vibe coding: a tangle of arrows looping through improvised, '
      + 'half-built cars, ending in a battered one at the finish line. Agentic '
      + 'engineering: five labelled steps — Idea, Spec, Plan, Build, Review — running '
      + 'in one direction, ending in a finished car.',
  },
  de: {
    h1: 'Wie man <b>produktionsreifen Code</b> [nicht] baut',
    heroAlt: 'Zwei Reihen. Vibe Coding: ein Gewirr von Pfeilen durch improvisierte, '
      + 'halb fertige Autos, am Ende ein ramponiertes im Ziel. Agentic Engineering: '
      + 'fünf beschriftete Schritte — Idea, Spec, Plan, Build, Review — in eine '
      + 'Richtung, am Ende ein fertiges Auto.',
  },
};

class Section04VibeDrawn extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-4);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 { color: var(--fg-ink); }
        ${TAG} h1 b { color: var(--fg-green); font-weight: inherit; }

        /* Shape deliberately retained: the picture IS
           this slide — no diagram of it would beat it. It joins the drawn
           choreography and nothing more. One card depth, on the paper. */
        ${TAG} .hero { margin: 0; }
        ${TAG} .hero img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: var(--ae-radius);
        }

        @media (max-width: 900px) {
          ${TAG} h1 { font-size: var(--ae-fs-h3); line-height: var(--ae-lh-h3); }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>

        <div class="hero fg-card fg-in" style="--fg-at: 3">
          <img src="assets/vibe-vs-eng.png" alt="${t.heroAlt}">
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section04VibeDrawn);
