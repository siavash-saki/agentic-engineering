/* Section 7 — The gates.
   Two of them, both required: one before code exists, one before the work
   is called done. Drawn as a pipeline so the positions are unambiguous —
   a gate is a point on the line, not a card next to it.

   The Plan step carries a document hanging off the line, the same device
   the SDD chapter uses. It says the plan is a file that gets written and
   kept, and deliberately says nothing about what goes in it — that is the
   Plan chapter's job, and prescribing a structure here would be exactly
   the ceremony this deck argues against.

   ── What the redesign changed, and why ──────────────────────────────

   THE TWO CARDS ARE GONE. They restated the diagram in prose, so the
   picture was being treated as an illustration of the content rather than
   as the content. Their sentences are all still here — they now hang from
   the gate they describe.

   A GATE NO LONGER LOOKS LIKE A STEP. A step is a hollow hued ring sitting
   ON the rail. A gate is a solid ink bar sitting ACROSS it. Different
   shape, different colour, different relationship to the line, and the
   difference survives greyscale because ink against three mid-tone hues is
   the widest contrast the deck has. It also draws the lede literally: the
   rail runs into a barrier.

   THE HUES ARRIVE HERE FOR THE SECOND TIME. Slide 5 taught them; this is
   the first slide that spends them. Gates stay ink, because a gate is a
   person deciding and the human is the one thing not coloured.
   See DESIGN.md, pass 4.

   EVERY ALIGNMENT IS STRUCTURAL. The panels live in the same grid as the
   rail — panel 1 starts at gate 1's column, panel 2 ends at gate 2's — so
   each connector lands on its own panel by construction rather than by a
   percentage that drifts the moment the German wraps differently.

   TWO JOINS THAT HAD TO BE EXACT. A step ring is 22px and a gate bar is
   ~84px, so the ring floats in the middle of a row the BAR defines: the
   gap beneath it is that row's leftover height, and the doc connector has
   to close it. Both ends are derived from --gh rather than eyeballed. For
   the same reason the drop between rail and cards is the height of a
   spacer and never a margin on the card — a margin would end a connector
   short of the thing it connects to. */

import { getLang } from '../core/i18n.js';

const TAG = 's07-gate';

const CONTENT = {
  en: {
    h1: 'Two agreements',
    lede: `A gate is a point where the work stops and a person decides. There are
           two, and both of them are yours.`,
    steps: ['Plan', 'Build', 'Review'],
    docKind: 'writes',
    docName: 'PLAN.md',
    gates: [
      { n: '1', label: 'Before the code',
        desc: 'A person agrees the plan',
        body: 'Without it you did not plan, you wrote a longer prompt.',
        not: 'The agent may not cross it alone, however obvious the next step looks.' },
      { n: '2', label: 'Before it is done',
        desc: 'A person accepts the result',
        body: 'The evidence is checked and the work is accepted, or it is not.',
        not: 'An agent reporting its own success is not this gate.' },
    ],
    note: `The plan is a file, committed next to the code — that is what gate 1
           approves. <b>Everything else — how formal, how many files, who
           signs — is yours to choose.</b>`,
  },
  de: {
    h1: 'Zwei Freigaben',
    lede: `Ein Gate ist ein Punkt, an dem die Arbeit stoppt und ein Mensch
           entscheidet. Es gibt zwei, und beide gehören dir.`,
    steps: ['Plan', 'Build', 'Review'],
    docKind: 'schreibt',
    docName: 'PLAN.md',
    gates: [
      { n: '1', label: 'Vor dem Code',
        desc: 'Ein Mensch gibt den Plan frei',
        body: 'Ohne das hast du nicht geplant, sondern nur länger geprompted.',
        not: 'Der Agent darf es nicht allein überschreiten, so naheliegend der nächste Schritt auch aussieht.' },
      { n: '2', label: 'Vor dem Fertig',
        desc: 'Ein Mensch nimmt das Ergebnis ab',
        body: 'Die Belege werden geprüft und die Arbeit abgenommen — oder eben nicht.',
        not: 'Ein Agent, der seinen eigenen Erfolg meldet, ist nicht dieses Gate.' },
    ],
    note: `Der Plan ist eine Datei, neben dem Code eingecheckt — genau die gibt
           Gate 1 frei. <b>Alles Weitere — wie formell, wie viele Dateien, wer
           unterschreibt — wählst du selbst.</b>`,
  },
};

/* Steps in columns 1/3/5, gates in 2 and 6, panels spanning 2–4 and 5–7.
   Column 4 is a real gap rather than a zero-width spacer: the two panels
   butt against it, so it is what separates them. */
const STEP_COLS = [1, 3, 5];
const GATE_COLS = [2, 6];
const PANEL_CLASS = ['pn--left', 'pn--right'];
const HUE = ['s-plan', 's-build', 's-review'];

class Section07 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-4);
          /* space-5, not space-6: German runs the two gate cards to an extra
             line, and with the head/body/foot gaps added that puts the slide
             6px over a 610px stage. The frame gives it back without touching
             the pipeline's geometry, which is tuned to the pixel. */
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* "safe center", not plain "center": the deck's stage is ~90px
           shorter than a bare viewport once the header and nav bar are
           subtracted, and German runs longer. Plain centring overflows in
           BOTH directions, which put the step names on top of the lede.
           "safe" falls back to flex-start instead of overflowing upward.
           (No backticks in here: this comment sits inside a JS template
           literal, and a backtick would end the string. It did.) */
        ${TAG} .body { flex: none; display: flex; flex-direction: column; justify-content: safe center; min-height: 0; }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h1); line-height: var(--ae-lh-h1); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 66ch; }

        ${TAG} .s-plan   { --hue: var(--fg-plan);   --hue-d: var(--fg-plan-d); }
        ${TAG} .s-build  { --hue: var(--fg-build);  --hue-d: var(--fg-build-d); }
        ${TAG} .s-review { --hue: var(--fg-review); --hue-d: var(--fg-review-d); }

        /* ═══════════ the rail ═══════════ */
        ${TAG} .pipe {
          --gh: clamp(50px, 6.6vh, 76px);   /* gate bar height — the row's ruler */
          --nd: 22px;                       /* step ring diameter */
          display: grid;
          grid-template-columns:
            minmax(0,1fr) auto minmax(0,1fr) clamp(22px, 3.2vw, 52px) minmax(0,1fr) auto;
          align-items: start;
        }
        ${TAG} .rail {
          grid-row: 2; grid-column: 1 / -1; align-self: center;
          height: 3px; border-radius: 2px; background: var(--fg-hair);
          transform-origin: left center;
          animation: s07-rail 800ms var(--ae-ease) both;
          animation-delay: calc(60ms + 2 * var(--fg-beat));
        }
        @keyframes s07-rail { from { transform: scaleX(0); } }

        ${TAG} .st { grid-row: 1; text-align: center; padding-bottom: var(--ae-space-3); }
        /* Between h2 and h1 on purpose. At full h1 the three names alone
           cost ~60px of a 612px stage, and German went over the bottom. */
        ${TAG} .st h3 {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          font-size: clamp(26px, 4.4vh, 52px); line-height: 1.05;
          letter-spacing: -0.03em; color: var(--hue-d);
        }
        /* A step: hollow, hued, ON the line. */
        ${TAG} .nd {
          grid-row: 2; justify-self: center; align-self: center; z-index: 1;
          width: var(--nd); height: var(--nd); border-radius: 999px;
          background: var(--fg-card); border: 4px solid var(--hue);
        }
        /* A gate: solid ink, ACROSS the line. */
        ${TAG} .gate-cell { grid-row: 2; justify-self: center; align-self: center; z-index: 3; }
        ${TAG} .gatebar {
          display: flex; align-items: center; justify-content: center;
          width: clamp(30px, 3.4vh, 38px); height: var(--gh);
          border-radius: 10px; background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h3); line-height: 1;
          font-variant-numeric: tabular-nums; box-shadow: var(--fg-d2);
        }

        /* ═══════════ the connectors ═══════════
           One attachment device, used three times: once for the doc, once
           per gate. Dotted hairline — an attachment, not a flow. */
        ${TAG} .lead {
          justify-self: center; width: 0;
          border-left: 2px dotted var(--ae-cool-gray-400);
        }
        /* Segment A closes the gap the ring leaves inside the bar-height
           row: the ring's underside sits at (gh + nd) / 2, the row ends
           at gh, so the difference is exactly (gh - nd) / 2. */
        ${TAG} .lead--docA {
          grid-row: 2; grid-column: 1; align-self: end;
          height: calc((var(--gh) - var(--nd)) / 2);
        }
        ${TAG} .lead--docB { grid-row: 3; grid-column: 1; height: var(--ae-space-5); }
        ${TAG} .lead--gate { grid-row: 3 / 5; align-self: stretch; z-index: 4; }

        ${TAG} .docwrap { grid-row: 4; grid-column: 1; justify-self: center; }
        /* The drop between rail and cards lives HERE and never as a margin
           on the card — a margin would end the connector short of the card
           it connects to. */
        ${TAG} .spacer { grid-row: 4; grid-column: 3; height: var(--ae-space-6); }

        ${TAG} .doc {
          display: inline-flex; flex-direction: column; align-items: center; gap: 3px;
          padding: var(--ae-space-4) var(--ae-space-6);
          border-radius: var(--ae-radius);
          background: var(--fg-card);
          border: 1.5px solid var(--fg-ink);
          box-shadow: var(--fg-d1);
        }
        ${TAG} .doc .kind {
          font-size: var(--ae-fs-small); line-height: 1.2; color: var(--fg-muted);
        }
        ${TAG} .doc .file {
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-small) * 1.06);
          line-height: 1.2; font-weight: 600; color: var(--fg-ink);
        }

        /* ═══════════ the panels ═══════════
           Same ink edge as the doc box, so every attachment on the slide
           reads as one family: a dotted line from the rail into an
           ink-edged box. */
        ${TAG} .pn {
          grid-row: 5;
          border-radius: var(--ae-radius-lg);
          border: 1.5px solid var(--fg-ink);
          background: var(--fg-card);
          box-shadow: var(--fg-d2);
          padding: var(--ae-space-4) var(--ae-space-6);
        }
        ${TAG} .pn--left  { grid-column: 2 / 4; }
        ${TAG} .pn--right { grid-column: 5 / 7; }

        /* The title is two lines: when it happens, then what is agreed.
           The first sits back; the second carries the weight. */
        ${TAG} .pn__h { margin-bottom: var(--ae-space-3); }
        ${TAG} .pn__when {
          display: block;
          font-family: var(--ae-font-head); font-weight: 600;
          font-size: var(--ae-fs-h4); line-height: 1.2; color: var(--fg-muted);
        }
        ${TAG} .pn__l {
          display: block; margin-top: 2px;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h3); line-height: 1.12; color: var(--fg-ink);
        }
        ${TAG} .pn__d {
          margin: 0; font-size: var(--ae-fs-body); line-height: 1.42; color: var(--fg-body);
        }
        /* The sharpest line on the slide, and the one most often skimmed.
           Clay plus a ✕ — the colour is never the only carrier. */
        ${TAG} .pn__not {
          display: flex; gap: var(--ae-space-2); align-items: baseline;
          margin: var(--ae-space-3) 0 0; padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
          font-size: var(--ae-fs-small); line-height: 1.4; color: var(--fg-fail-d);
        }
        ${TAG} .pn__not::before { content: '✕'; flex: none; font-weight: 700; }

        @media print { ${TAG} .rail { animation: none !important; } }

        @media (max-width: 900px) {
          ${TAG} .pipe { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .rail, ${TAG} .lead, ${TAG} .spacer { display: none; }
          ${TAG} .pn, ${TAG} .pn--left, ${TAG} .pn--right { grid-column: 1; grid-row: auto; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="pipe">
          <i class="rail" aria-hidden="true"></i>
          ${t.steps.map((s, i) => `
            <div class="st ${HUE[i]} fg-in" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${3 + i}">
              <h3>${s}</h3>
            </div>
            <i class="nd ${HUE[i]}" aria-hidden="true" style="grid-column: ${STEP_COLS[i]}; animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + ${3 + i} * var(--fg-beat))"></i>
          `).join('')}
          <i class="lead lead--docA fg-in" aria-hidden="true" style="--fg-at: 6"></i>
          <i class="lead lead--docB fg-in" aria-hidden="true" style="--fg-at: 6"></i>
          <div class="docwrap fg-in" style="--fg-at: 6">
            <span class="doc">
              <span class="kind">${t.docKind}</span>
              <span class="file">${t.docName}</span>
            </span>
          </div>
          <i class="spacer" aria-hidden="true"></i>
          ${t.gates.map((g, i) => `
            <div class="gate-cell fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${7 + i}">
              <span class="gatebar">${g.n}</span>
            </div>
            <i class="lead lead--gate fg-in" aria-hidden="true" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${8 + i}"></i>
            <div class="pn ${PANEL_CLASS[i]} fg-in" style="--fg-at: ${8 + i}">
              <div class="pn__h">
                <span class="pn__when">${g.label}:</span>
                <span class="pn__l">${g.desc}</span>
              </div>
              <p class="pn__d">${g.body}</p>
              <p class="pn__not">${g.not}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section07);
