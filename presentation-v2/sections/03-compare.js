/* Section 3 — Vibe Coding vs. Agentic Engineering
   The thesis slide: two ways to work, read across one shared spine.

   Ported from the v1 deck unchanged except for the workflow row, which
   now carries this deck's chain — Plan, Build, Review — rather than the
   five-step one. */

import { getLang } from '../core/i18n.js';

const TAG = 's03-compare';

const CONTENT = {
  en: {
    vibeTitle: 'Vibe Coding',
    vibeTag: '"Real quick, let me just …"',
    agenticTitle: 'Agentic Engineering',
    agenticTag: '"Before I touch a key …"',
    rows: [
      { dim: 'Core action',
        vibe: 'Casual prompting: describe the outcome, accept what comes back',
        agentic: 'Systematic planning: write an explicit plan, then direct autonomous agents' },
      { dim: 'Who works this way',
        vibe: 'Non-engineers and hobbyists',
        agentic: 'Software engineers acting as system architects' },
      { dim: 'Workflow',
        vibe: 'Idea → Build',
        agentic: 'Idea → Plan → Build → Review',
        vibeSteps: ['Idea', 'Build'],
        agenticSteps: ['Idea', 'Plan', 'Build', 'Review'] },
      { dim: 'Context and tools',
        vibe: 'Whatever the system happens to reach on its own',
        agentic: 'Memory, Skills, MCP, subagents, hooks' },
      { dim: 'Quality and testing',
        vibe: 'Review and tests skipped',
        agentic: 'Human review for security, scalability, long-term system health' },
      { dim: 'Best used for',
        vibe: 'Quick personal experiments, throwaway mockups, low-stakes prototypes',
        agentic: 'Production-grade applications, enterprise codebases, scalable software' },
    ],
  },
  de: {
    vibeTitle: 'Vibe Coding',
    vibeTag: '„Mal eben schnell …"',
    agenticTitle: 'Agentic Engineering',
    agenticTag: '„Bevor ich loslege …"',
    rows: [
      { dim: 'Kernvorgehen',
        vibe: 'Locker prompten: Ergebnis beschreiben, Output übernehmen',
        agentic: 'Systematisch planen: expliziter Plan, Agenten gezielt steuern' },
      { dim: 'Wer so arbeitet',
        vibe: 'Nicht-Entwickler und Hobbyisten',
        agentic: 'Software-Engineers in der Rolle von System-Architekten' },
      { dim: 'Ablauf',
        vibe: 'Idee → Build',
        agentic: 'Idee → Plan → Build → Review',
        vibeSteps: ['Idee', 'Build'],
        agenticSteps: ['Idee', 'Plan', 'Build', 'Review'] },
      { dim: 'Kontext und Tools',
        vibe: 'Worauf das System zufällig Zugriff hat',
        agentic: 'Memory, Skills, MCP, Subagenten, Hooks' },
      { dim: 'Qualität und Tests',
        vibe: 'Review und Tests entfallen',
        agentic: 'Menschliches Review für Sicherheit, Skalierbarkeit und langfristige Systemgesundheit' },
      { dim: 'Am besten für',
        vibe: 'Schnelle Experimente, Wegwerf-Mockups, unkritische Prototypen',
        agentic: 'Produktionsreife Anwendungen, Enterprise-Codebases, skalierbare Software' },
    ],
  },
};

/* A value is prose, except the workflow — which is a sequence, and reads as
   one. Two beads against four is the argument this slide is making; as a
   sentence it is merely a sentence. */
const cell = (row, side) => {
  const steps = side === 'vibe' ? row.vibeSteps : row.agenticSteps;
  if (!steps) return row[side];
  const mod = side === 'agentic' ? ' steps--a' : '';
  /* Each arrow travels with the step it points at, so a run that has to wrap
     breaks BEFORE an arrow rather than stranding one at the end of a line. */
  return `<span class="steps${mod}">${steps
    .map((s, i) => i === 0
      ? `<span class="st">${s}</span>`
      : `<span class="lk"><span class="ar">→</span><span class="st">${s}</span></span>`)
    .join('')}</span>`;
};

class Section03 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }

        /* NO SLIDE TITLE, AND NO LEDE.
           The two column names ARE the title — set at slide-title size, they
           say the same thing the heading used to say and then keep saying it
           while the audience reads down. The deck's own chrome still carries
           "Vibe Coding vs. Agentic Engineering" from the section registry in
           core/presentation.js, so nothing is lost by not repeating it here. */

        /* ═══════════ THE LADDER ═══════════
           One spine of dimensions down the middle: the question is asked ONCE
           and the two answers hang off it, rather than six questions being
           asked twice in two parallel lists — which is what made the eye
           ping-pong across the gutter to pair up answers that were never
           adjacent.

           Header and rows are separate grids sharing one column template, so
           they align without a shared parent. That is what lets each row be a
           <div> inside the <dl>: reading order stays dimension → vibe →
           agentic, while grid placement puts the dimension in the middle. */
        ${TAG} .head,
        ${TAG} .row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) var(--spine) minmax(0, 1fr);
          column-gap: var(--ae-space-5);
          align-items: center;
          --spine: clamp(150px, 15.5vw, 226px);
        }

        /* ───── the two column names ───── */
        ${TAG} .head { padding-bottom: var(--ae-space-3); }
        ${TAG} .hd.v { text-align: right; }
        ${TAG} .hd h2 {
          margin: 0;
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          font-weight: 700;
          letter-spacing: -0.022em;
          color: var(--fg-ink);
        }
        ${TAG} .hd .tag {
          margin: var(--ae-space-2) 0 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          font-style: italic;
          color: var(--fg-muted);
        }
        /* A heavy ink rule, drawn outward from the spine. No cards anywhere on
           this slide, so this and the row hairlines carry all the structure. */
        ${TAG} .hd .bar {
          display: block;
          height: 3px;
          margin-top: var(--ae-space-4);
          background: var(--fg-ink);
          transform-origin: right center;
          animation: s03-draw var(--fg-dur-draw) var(--ae-ease) both;
          animation-delay: calc(60ms + var(--fg-at, 0) * var(--fg-beat));
        }
        ${TAG} .hd.a .bar { transform-origin: left center; }
        @keyframes s03-draw { from { transform: scaleX(0); } }

        /* ───── the rows ───── */
        ${TAG} .rows { margin: 0; }
        ${TAG} .row {
          position: relative;
          padding: var(--ae-space-5) 0;
        }
        /* The separator is a pseudo-element, not a border, so it can draw
           itself the way every other rule in the deck does. */
        ${TAG} .row + .row::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--fg-hair);
          animation: s03-draw var(--fg-dur-draw) var(--ae-ease) both;
          animation-delay: calc(60ms + var(--fg-at, 0) * var(--fg-beat));
        }

        /* The dimension, asked once. A filled mint pill: on bare paper an
           unfilled label reads as text that wandered into the gutter. */
        ${TAG} .row dt {
          grid-column: 2; grid-row: 1;
          justify-self: center;
          padding: 7px 15px;
          border-radius: 999px;
          background: var(--fg-mint);
          font-family: var(--ae-font);
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--fg-ink);
          text-align: center;
          white-space: nowrap;
        }

        /* Both answers are ink. The losing side of a comparison is still being
           read from the back of the room, and an accent colour on the winning
           side would say "this word matters more", which is not what is meant.
           The only asymmetry in the text is weight. */
        ${TAG} .row dd {
          grid-row: 1;
          margin: 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--fg-ink);
        }
        ${TAG} .row dd.v { grid-column: 1; text-align: right; font-weight: 400; }
        ${TAG} .row dd.a { grid-column: 3; font-weight: 500; }

        /* ───── the workflow, drawn ───── */
        ${TAG} .steps {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }
        ${TAG} dd.v .steps { justify-content: flex-end; }
        ${TAG} .steps .lk {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        ${TAG} .steps .st {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          /* The deck's legibility floor. A step is one word; at body size the
             run does not fit the column in German. */
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 500;
          color: var(--fg-ink);
          white-space: nowrap;
        }
        ${TAG} .steps--a .st {
          background: var(--fg-mint);
          border-color: transparent;
          font-weight: 600;
        }
        /* The arrow belongs to the chip run, not to the body text around it —
           left to inherit, it sets at body size and pushes the German run onto
           a second line. */
        ${TAG} .steps .ar {
          color: var(--ae-cool-gray-300);
          font-size: var(--ae-fs-caption);
          line-height: 1;
        }

        /* ───── entrances ─────
           Each side arrives from its own side of the spine. Same contract as
           the slide kit: a from-keyframe with no to, so the base style is the
           resting state and an interrupted entrance still ends complete. */
        ${TAG} .in-l,
        ${TAG} .in-r {
          animation-duration: var(--fg-dur-rise);
          animation-timing-function: var(--ae-ease);
          animation-fill-mode: both;
          animation-delay: calc(60ms + var(--fg-at, 0) * var(--fg-beat));
        }
        ${TAG} .in-l { animation-name: s03-in-left; }
        ${TAG} .in-r { animation-name: s03-in-right; }
        @keyframes s03-in-left  { from { opacity: 0; transform: translateX(-18px); } }
        @keyframes s03-in-right { from { opacity: 0; transform: translateX( 18px); } }

        /* Print shows resting states, same as the kit's devices. */
        @media print {
          ${TAG} .in-l, ${TAG} .in-r,
          ${TAG} .hd .bar, ${TAG} .row + .row::before { animation: none !important; }
        }

        @media (max-width: 900px) {
          ${TAG} .head, ${TAG} .row { grid-template-columns: 1fr; }
          ${TAG} .head { display: none; }
          ${TAG} .row dt, ${TAG} .row dd.v, ${TAG} .row dd.a {
            grid-column: 1;
            grid-row: auto;
            text-align: left;
          }
          ${TAG} .row dt { justify-self: start; margin-bottom: var(--ae-space-3); }
          ${TAG} .row dd.v { margin-bottom: var(--ae-space-2); }
          ${TAG} dd.v .steps { justify-content: flex-start; }
        }
      </style>
      <div class="fg-wrap">
        <div class="head">
          <div class="hd v in-l" style="--fg-at: 1">
            <h2>${t.vibeTitle}</h2>
            <p class="tag">${t.vibeTag}</p>
            <i class="bar" style="--fg-at: 2"></i>
          </div>
          <div></div>
          <div class="hd a in-r" style="--fg-at: 1">
            <h2>${t.agenticTitle}</h2>
            <p class="tag">${t.agenticTag}</p>
            <i class="bar" style="--fg-at: 2"></i>
          </div>
        </div>
        <dl class="rows">
          ${t.rows.map((r, i) => `
            <div class="row" style="--fg-at: ${2 + i}">
              <dt class="fg-in" style="--fg-at: ${2 + i}">${r.dim}</dt>
              <dd class="v in-l" style="--fg-at: ${2 + i}">${cell(r, 'vibe')}</dd>
              <dd class="a in-r" style="--fg-at: ${2 + i}">${cell(r, 'agentic')}</dd>
            </div>
          `).join('')}
        </dl>
      </div>
    `;
  }
}

customElements.define(TAG, Section03);
