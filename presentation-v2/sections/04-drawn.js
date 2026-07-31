/* Section 4 — The same argument as one picture.
   Image only. The punchline is delivered verbally; nothing on the slide
   competes with it. */

import { getLang } from '../core/i18n.js';

const TAG = 's04-drawn';

const CONTENT = {
  en: {
    h1: 'How [not] to build <span class="fg-mark fg-mark--sweep">production software</span>',
    heroAlt: 'Two rows. Vibe coding: a tangle of arrows looping through improvised, '
      + 'half-built cars, ending in a battered one at the finish line. Agentic '
      + 'engineering: an idea, a blueprint, a plan with a checklist, a car being '
      + 'assembled, and a finished car — running in one direction.',
  },
  de: {
    h1: 'Wie man <span class="fg-mark fg-mark--sweep">Produktionscode</span> [nicht] baut',
    heroAlt: 'Zwei Reihen. Vibe Coding: ein Gewirr von Pfeilen durch improvisierte, '
      + 'halb fertige Autos, am Ende ein ramponiertes im Ziel. Agentic Engineering: '
      + 'eine Idee, ein Bauplan, ein Plan mit Checkliste, ein Auto in der Montage '
      + 'und ein fertiges Auto — in eine Richtung.',
  },
};

class Section04 extends HTMLElement {
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
          color: var(--fg-ink);
        }
        ${TAG} .hero { margin: 0; }
        /* The picture is the slide, so it takes whatever height is left after
           the heading — never more. Capping the height rather than the width
           is what keeps a wide image inside a 16:9 stage at 720p. */
        ${TAG} .hero img {
          width: auto;
          max-width: 100%;
          max-height: calc(100vh - 215px);
          height: auto;
          display: block;
          margin: 0 auto;
          border-radius: var(--ae-radius);
        }
        @media (max-width: 900px) {
          ${TAG} h1 { font-size: var(--ae-fs-h3); }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <figure class="hero fg-in" style="--fg-at: 2">
          <img src="assets/vibe-vs-eng.png" alt="${t.heroAlt}">
        </figure>
      </div>
    `;
  }
}

customElements.define(TAG, Section04);
