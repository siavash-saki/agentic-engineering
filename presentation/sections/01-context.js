/* Section 1 — Title & Context
   Redesigned under 0003 v2: the three chapters are stops on a drawn route —
   the talk's itinerary as a map, not a card row. Words unchanged; the chapter
   ordinals moved into the route nodes. Content lives in a { en, de } map and
   is selected at render time via getLang().

   The chapter row mirrors the deck's own chapter structure (see CHAPTERS in
   core/presentation.js) — keep the two in sync when chapters change. */

import { getLang } from '../core/i18n.js';

const TAG = 's01-context';

const CONTENT = {
  en: {
    h1a: 'Agentic',
    h1b: 'Engineering',
    sub: `Working with AI coding agents as an engineering discipline —
          structured, verifiable, and independent of any single tool.`,
    chapters: [
      { n: '01', t: 'Foundations',
        d: 'What an agent is, the primitives every tool shares, and where to draw trust boundaries.' },
      { n: '02', t: 'Spec-Driven Development',
        d: 'A workflow built on four artifacts and human gates — from spec to verified result.' },
      { n: '03', t: 'Best Practices',
        d: 'Ten disciplines from daily practice, applicable from Monday morning.' },
    ],
    meta: 'Siavash Saki · 2026',
  },
  de: {
    h1a: 'Agentic',
    h1b: 'Engineering',
    sub: `Die Arbeit mit KI-Coding-Agenten als Engineering-Disziplin —
          strukturiert, überprüfbar und unabhängig vom einzelnen Tool.`,
    chapters: [
      { n: '01', t: 'Grundlagen',
        d: 'Was ein Agent ist, die Primitives hinter jedem Tool und wo Vertrauensgrenzen verlaufen.' },
      { n: '02', t: 'Spec-Driven Development',
        d: 'Ein Workflow aus vier Artefakten und menschlichen Gates — von der Spec zum verifizierten Ergebnis.' },
      { n: '03', t: 'Best Practices',
        d: 'Zehn Disziplinen aus der täglichen Praxis, anwendbar ab Montagmorgen.' },
    ],
    meta: 'Siavash Saki · 2026',
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
        ${TAG} .sub {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--fg-body);
          max-width: 62ch;
          margin: 0 0 var(--ae-space-6);
        }

        /* ── The route: a drawn path with the chapters as stops ── */
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
          gap: var(--ae-space-5);
        }
        ${TAG} .rcol {
          position: relative;
          padding-top: calc(var(--route-h) + var(--ae-space-3));
          text-align: center;
        }
        /* The stop: the chapter's ordinal, sitting on the curve itself. */
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
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          font-weight: 600;
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
          font-size: var(--ae-fs-small);
          color: var(--fg-faint);
          margin: 0;
        }
        @media (max-width: 768px) {
          ${TAG} { padding: var(--ae-space-6) var(--ae-gutter); }
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
            ${t.chapters.map((c, i) => `
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
