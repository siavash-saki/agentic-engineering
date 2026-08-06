/* Section 17 — Drift.

   The loop back, and the reason it exists: a stale plan silently disarms
   Review, which is the step that was supposed to catch this.

   THIS SLIDE IS THE DECK'S FORK. Nothing was reused to build it — three
   fork devices were drawn for slide 2 and none were kept — so what lands
   here is the fork the rest of the deck may borrow from.

   WHAT SEPARATES DRIFT FROM AN ORDINARY TWO-COLUMN COMPARISON IS TIME.
   Drift is not a choice between two options standing side by side; it is
   one path that slowly stops matching the thing it was supposed to
   follow, in increments small enough that nobody calls it. So the
   divergence is GEOMETRY — one post, two paths leaving it — and never
   two coloured labels next to each other.

   THE POST. The loop runs Plan · Build · Review, and a solid ink bar
   stands ACROSS the line just after Build, labelled with the sentence
   the lede opens with. The deck spends ink on the human and on nothing
   else, and this is the one human act the slide is about: someone stops
   Build. It is exactly as tall as the three step rings so that both
   paths can leave from its TOP and its FOOT and be seen to.

   OVER THE TOP. The correction is drawn as height: an ink arc springs
   off the post's top, clears the whole run, and comes down into Plan
   with an arrowhead. The drift drops out of the same post's foot and
   runs along the floor. Top to bottom the slide reads: what it costs to
   go back, the loop, what it costs not to.

   THE THREE BEADS SIT ON THE ARC, which is the claim that the correction
   is not three things you do somewhere else — it is the path itself, and
   each bead is a place on it. They cannot be confused with the loop's own
   steps: those are ~100px hollow rings with a word inside, these are 14px
   solid ink discs with a paper halo.

   THE NUMBERS RUN 3 · 2 · 1 FROM THE LEFT. The corrected path travels
   right to left — it is a RETURN — so the numerals, not the x-order,
   carry the reading order, and the arrowhead into Plan agrees with them.

   FOUR ANCHORS, VERIFIED TO 0.02px, THAT A LATER EDIT CAN SILENTLY BREAK:
     · the arrowhead's x is Plan's centre x — hence the -10.5px offset on
       .arc::after: half the head, plus the arc's own 2.5px left border;
     · the arc's right edge is the post's centre;
     · each bead is centred on its caption cell BY CONSTRUCTION, because
       the beads and the captions share one span and one set of thirds;
     · which is why .caps has COLUMN-GAP: 0. A gap moves the outer thirds
       inward by a third of it and every bead drifts off its caption. The
       breathing room is per-cell padding instead. Do not add a gap.

   PLAN.MD HANGS UNDER PLAN on an ink stem, in the band the drift line
   never reaches, so it costs no height. Its kind line reads "corrected",
   not "as written": this is the plan AFTER the correction rewrote it, and
   "as written" would be false on the very file the slide just changed.

   SOLID AGAINST DASHED is slide 6's landed pairing and the half of the
   distinction that survives greyscale; it is doing the work here, not the
   ink-versus-clay hue. Both paths end in a review that passes — one tick
   on a solid green disc, one inside a broken clay ring — because "it will
   pass, and it will mean nothing" is the sharpest line in the slide's own
   text and it should be drawn, not only stated.

   (No backticks anywhere in these comments or in the style block: the
   whole thing sits inside a JS template literal, and one backtick ends
   the string and blanks the deck.) */

import { getLang } from '../core/i18n.js';

const TAG = 's16-build-drift';

const CONTENT = {
  en: {
    h1: 'When reality contradicts the plan, the plan changes',
    lede: `Halfway through Build, something turns out to be untrue. The existing
           cache cannot do sliding windows. The endpoint has a second caller
           nobody remembered. This is normal. What happens next decides whether
           the rest of the loop still works.`,
    pathsLabel: 'Two responses',
    moment: 'Something turns out to be untrue',
    planKind: 'corrected',
    planFile: 'PLAN.md',
    loop: ['Plan', 'Build', 'Review'],
    wrong: {
      tag: 'What usually happens',
      steps: ['The agent works around it.', 'The code diverges from the plan.', 'Nobody updates the file.'],
      cost: 'Review now measures the code against a document that describes a different feature. It will pass, and it will mean nothing.',
    },
    right: {
      tag: 'What should happen',
      steps: ['Build stops.', 'The plan is corrected, and re-agreed.', 'Build continues from the corrected plan.'],
      cost: 'Cost: one short conversation. The plan is still the yardstick, so Review still works.',
    },
    note: `A plan that is allowed to go stale does not fail loudly.
           <b>It quietly turns Review into a formality.</b>`,
  },
  de: {
    h1: 'Widerspricht die Realität dem Plan, ändert sich der Plan',
    lede: `Mitten im Build stellt sich etwas als unzutreffend heraus. Der
           bestehende Cache kann keine gleitenden Fenster. Der Endpunkt hat
           einen zweiten Aufrufer, an den niemand gedacht hat. Das ist normal.
           Was danach passiert, entscheidet, ob der Rest des Loops noch trägt.`,
    pathsLabel: 'Zwei Reaktionen',
    moment: 'Etwas stellt sich als unzutreffend heraus',
    planKind: 'korrigiert',
    planFile: 'PLAN.md',
    loop: ['Plan', 'Build', 'Review'],
    wrong: {
      tag: 'Was meistens passiert',
      steps: ['Der Agent baut drumherum.', 'Der Code weicht vom Plan ab.', 'Niemand aktualisiert die Datei.'],
      cost: 'Das Review misst den Code jetzt an einem Dokument, das ein anderes Feature beschreibt. Es wird bestehen, und es wird nichts bedeuten.',
    },
    right: {
      tag: 'Was passieren sollte',
      steps: ['Build hält an.', 'Der Plan wird korrigiert und erneut freigegeben.', 'Build läuft mit dem korrigierten Plan weiter.'],
      cost: 'Kosten: ein kurzes Gespräch. Der Plan bleibt der Maßstab, also funktioniert das Review weiter.',
    },
    note: `Ein Plan, den man veralten lässt, scheitert nicht laut.
           <b>Er macht das Review still zur Formsache.</b>`,
  },
};

/* Left to right the corrected steps run 3 · 2 · 1, because the path they
   sit on runs right to left. The numerals carry the order. */
const RTL = [2, 1, 0];
const THIRDS = ['16.667%', '50%', '83.333%'];
/* Keeps a hyphenated compound whole. Without it English breaks
   "re-agreed." across two lines directly under a bead, which reads as a
   word that ran out of room rather than as a step. Presentational only. */
const nb = (str) => str.replace(/(\w+-\w+)/g, '<span class="nb">$1</span>');

class Section16 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    const HUE = ['s-plan', 's-build', 's-review'];
    const AT  = ['p', 'b', 'rv'];

    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* "1 0 auto", not "1": the body must grow into spare space — that
           is what centres the board — but it must never SHRINK below its
           content, or an over-tall canvas paints straight through the
           takeaway instead of scrolling. A silent spill reports nothing. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; margin-top: var(--ae-space-3); }
        ${TAG} .foot .fg-note { margin: 0; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 72ch; }
        ${TAG} .lbl { margin: 0 0 var(--ae-space-2); }

        /* ── CAST: the plan, as a file. Slide 7's document device. ── */
        ${TAG} .doc {
          display: inline-flex; flex-direction: column; align-items: center; gap: 2px;
          padding: var(--ae-space-3) var(--ae-space-5);
          border-radius: var(--ae-radius);
          background: var(--fg-card); border: 1.5px solid var(--fg-ink);
          box-shadow: var(--fg-d1); white-space: nowrap;
        }
        ${TAG} .doc .kind {
          font-size: var(--ae-fs-caption); line-height: 1.2; color: var(--fg-muted);
        }
        ${TAG} .doc .file {
          font-family: var(--ae-font-mono); font-size: var(--ae-fs-small);
          line-height: 1.2; font-weight: 600; color: var(--fg-ink);
        }

        /* ── CAST: the verdict. Same glyph, two rings. ── */
        ${TAG} .vd {
          display: inline-flex; align-items: center; justify-content: center;
          flex: none; width: clamp(30px, 4.0vh, 38px); height: clamp(30px, 4.0vh, 38px);
          border-radius: 999px; font-size: 16px; font-weight: 700; line-height: 1;
        }
        ${TAG} .vd--real { background: var(--fg-build); color: #fff; box-shadow: var(--fg-d1); }
        ${TAG} .vd--hollow {
          background: var(--fg-card); color: var(--fg-fail-d);
          border: 2px dashed var(--fg-fail);
        }

        /* ── CAST: nodes on a path. Dashed ring = a step on the path that
              left. ── */
        ${TAG} .nd {
          display: block; flex: none; box-sizing: border-box;
          width: 18px; height: 18px; border-radius: 999px;
          background: var(--fg-card); border: 3px solid var(--fg-build);
        }
        ${TAG} .nd--drift { border: 2px dashed var(--fg-fail); }

        /* ── captions on the drawing ── */
        ${TAG} .cap {
          margin: 0; font-size: var(--ae-fs-small); line-height: 1.34; color: var(--fg-ink);
        }
        ${TAG} .cap--drift { color: var(--fg-fail-d); }
        ${TAG} .cap i {
          font-style: normal; font-weight: 700; font-variant-numeric: tabular-nums;
          margin-right: 0.4em; color: var(--fg-faint);
        }
        ${TAG} .cap--drift i { color: var(--fg-fail); }
        /* One value for the drop between the drifting line and the captions
           hanging under it, and for the ring that has to sit back ON that
           line. It scales, because the verdict disc it has to clear scales:
           at a fixed 15px the disc's lower half reached into the caption
           row on a 900px-tall screen. */
        ${TAG} .dcaps { --capdrop: clamp(16px, 2.4vh, 27px); }

        /* ── the two costs. Each carries a sample of its own line, so the
              row is bound to its path by form and not only by hue. ── */
        ${TAG} .costs { display: grid; row-gap: var(--ae-space-2); margin-top: var(--ae-space-3); }
        ${TAG} .cost {
          margin: 0;
          display: grid; grid-template-columns: auto minmax(0, 1fr);
          column-gap: var(--ae-space-4); align-items: start;
          font-size: var(--ae-fs-small); line-height: 1.4;
        }
        ${TAG} .cost .swatch { display: block; width: 30px; margin-top: 0.62em; height: 0; }
        ${TAG} .cost--right { color: var(--fg-build-d); font-weight: 500; }
        ${TAG} .cost--right .swatch { border-top: 2.5px solid var(--fg-build); }
        ${TAG} .cost--wrong { color: var(--fg-fail-d); }
        ${TAG} .cost--wrong .swatch { border-top: 2.5px dashed var(--fg-fail); }

        /* ── motion: lines draw, boxes fade. A connector must never RISE
              into place — it would land short of the thing it connects
              to. Namespaced, or these collide with another slide's. ── */
        ${TAG} .dx { transform-origin: left center; animation: s16-dx 620ms var(--ae-ease) both; }
        @keyframes s16-dx { from { transform: scaleX(0); } }
        ${TAG} .dy { transform-origin: center top; animation: s16-dy 380ms var(--ae-ease) both; }
        @keyframes s16-dy { from { transform: scaleY(0); } }
        ${TAG} .ap { animation: fg-appear 420ms var(--ae-ease) both; }
        ${TAG} .dx, ${TAG} .dy, ${TAG} .ap {
          animation-delay: calc(60ms + var(--fg-at, 0) * var(--fg-beat));
        }
        @media print {
          ${TAG} .dx, ${TAG} .dy, ${TAG} .ap { animation: none !important; }
        }

        /* ── THE BOARD ── */
        ${TAG} .canvas {
          --nd:  clamp(72px, 10.1vh, 104px);   /* loop node diameter */
          --gw:  clamp(13px, 1.7vh, 17px);     /* the stop post's width */
          --arc:  clamp(50px, 7vh, 78px);      /* how high the return rises */
          --dipb: clamp(50px, 6.9vh, 76px);    /* how far under the run the drift goes */
          display: grid;
          /* The post sits CLOSE to Build — "after Build", not halfway to
             Review — and that is a measurement, not a taste: everything to
             its right is the drift's caption band, and at an even balance
             three German captions in it wrapped to four lines. */
          grid-template-columns:
            [p] auto [a] minmax(0, 0.55fr) [b] auto [g1] minmax(0, 0.3fr)
            [f] 0px [g2] minmax(0, 0.95fr) [rv] auto
            [j] clamp(24px, 3.2vw, 56px) [out] auto;
          grid-template-rows:
            [r-cap] auto [r-arc] var(--arc) [r-node] var(--nd)
            [r-dip] var(--dipb) [r-dcap] auto;
        }
        ${TAG} .s-plan   { --hue: var(--fg-plan);   --hue-d: var(--fg-plan-d); }
        ${TAG} .s-build  { --hue: var(--fg-build);  --hue-d: var(--fg-build-d); }
        ${TAG} .s-review { --hue: var(--fg-review); --hue-d: var(--fg-review-d); }
        ${TAG} .step {
          grid-row: r-node; justify-self: center; align-self: center;
          width: var(--nd); height: var(--nd); border-radius: 999px;
          background: var(--fg-card); border: 4px solid var(--hue);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-caption); line-height: 1.05;
          color: var(--hue-d); text-align: center; z-index: 2;
          padding: 0 3px; box-sizing: border-box;
        }
        ${TAG} .seg { grid-row: r-node; align-self: center; height: 0; }
        ${TAG} .seg--in   { grid-column: p / b;  border-top: 3px solid var(--ae-cool-gray-300); }
        ${TAG} .seg--out  { grid-column: b / f;  border-top: 3px solid var(--fg-build); }
        /* The run past the post. It is only ever travelled once the plan
           has been re-agreed, which is why the tick at its end is real. */
        ${TAG} .seg--cont { grid-column: f / rv; border-top: 3px solid var(--fg-build); }
        ${TAG} .seg--vd   { grid-column: j;      border-top: 3px solid var(--fg-build); }

        ${TAG} .stop {
          grid-row: r-node; grid-column: f; justify-self: center; align-self: center;
          width: var(--gw); height: var(--nd); border-radius: 4px;
          background: var(--fg-ink); box-shadow: var(--fg-d1); z-index: 4;
        }
        /* Bottom-aligned to a fixed distance ABOVE the line rather than to
           the top of the node row, so a one-line English label and a
           two-line German one both sit the same 9px clear of the run. */
        ${TAG} .forklab {
          grid-row: r-node; grid-column: f / rv; align-self: stretch;
          display: flex; align-items: flex-end;
          margin: 0; padding: 0 var(--ae-space-3) calc(var(--nd) / 2 + 9px) 16px;
          font-size: var(--ae-fs-small); line-height: 1.28;
          font-weight: 600; color: var(--fg-ink);
        }
        /* The drift leaves the post's FOOT. Stretch plus a top margin of
           one node puts its top edge exactly there, with no arithmetic to
           get wrong. */
        ${TAG} .skip {
          grid-row: r-node / r-dcap;
          grid-column: f / -1; align-self: stretch; margin-top: var(--nd);
          border-left: 2px dashed var(--fg-fail);
          border-bottom: 2px dashed var(--fg-fail);
          border-radius: 0 0 0 18px;
        }
        ${TAG} .dcaps {
          grid-row: r-dcap; grid-column: f / -1;
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: var(--ae-space-2); padding-top: var(--capdrop);
        }
        ${TAG} .nb { white-space: nowrap; }
        ${TAG} .dcell { position: relative; padding-left: 15px; }
        ${TAG} .dcell .nd {
          position: absolute; top: calc(-1 * var(--capdrop)); left: 0;
          transform: translate(-50%, -50%);
        }
        ${TAG} .vd--real {
          grid-row: r-node; grid-column: out; justify-self: end; align-self: center;
        }
        ${TAG} .vd--hollow {
          grid-row: r-dip; grid-column: out; justify-self: end;
          align-self: end; transform: translateY(50%);
        }

        /* A step on the corrected path. Small, solid, ink, with a paper
           halo so it reads as a bead ON the line and not as a thickening
           of it. */
        ${TAG} .snd {
          width: 14px; height: 14px; border-radius: 999px; flex: none;
          background: var(--fg-ink); box-shadow: 0 0 0 3px var(--fg-paper);
        }
        ${TAG} .stem { width: 0; border-left: 2.5px solid var(--fg-ink); }

        /* Captions and beads share ONE span and ONE set of thirds, so a
           caption is centred on its bead by construction rather than by a
           number that has to be re-tuned when the node size changes.
           COLUMN-GAP WOULD BREAK THAT — with a gap the outer thirds move
           inward by a third of it — so the breathing room is per-cell
           padding instead. */
        ${TAG} .caps {
          grid-row: r-cap; grid-column: p / f; margin-left: calc(var(--nd) / 2);
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: 0; padding-bottom: var(--ae-space-3);
        }
        ${TAG} .caps .cap { padding: 0 var(--ae-space-3); text-align: center; }
        ${TAG} .caps .cap i { color: var(--fg-ink); }
        /* A wrapper whose box IS the span, so a bead at 50% and a caption
           at 50% are the same x. The arc is painted inside it, which is
           what puts its right edge on the post's centre. */
        ${TAG} .arcwrap {
          grid-row: r-arc; grid-column: p / f;
          margin-left: calc(var(--nd) / 2); position: relative;
        }
        ${TAG} .arc {
          position: absolute; inset: 0;
          border: 2.5px solid var(--fg-ink); border-bottom: 0;
          border-radius: 14px 14px 0 0;
        }
        /* -10.5px = half the head, plus the 2.5px left border, so the
           head's own centre lands on Plan's centre and not 2.5px right. */
        ${TAG} .arc::after {
          content: ''; position: absolute; left: -10.5px; bottom: -1px;
          border-left: 8px solid transparent; border-right: 8px solid transparent;
          border-top: 11px solid var(--fg-ink);
        }
        ${TAG} .arcwrap .snd { position: absolute; top: 1.25px; transform: translate(-50%, -50%); }

        /* Left-flush with the canvas, not centred under Plan: a 150px chip
           centred on a node whose centre is 45px from the edge hangs off
           the slide. The stem carries the alignment instead. */
        ${TAG} .planwrap {
          grid-row: r-node / -1; grid-column: p / b; align-self: start;
          margin-top: var(--nd);
          display: flex; flex-direction: column; align-items: flex-start;
        }
        ${TAG} .planwrap .stem {
          height: clamp(13px, 1.9vh, 21px);
          margin-left: calc(var(--nd) / 2 - 1.25px);
        }

        /* NARROW: shrink the board, never collapse it. The prototype's
           fallback set the canvas to a single column, and every named
           column then resolved to the same track: all three loop nodes
           stacked on top of each other and on the post, so Plan and Build
           painted underneath Review and the drawing said nothing. The
           columns are auto plus fr, so the board compresses on its own —
           it only needs a smaller node to keep doing it. */
        @media (max-width: 980px) {
          /* 64px is the floor, not a round number: below it the word
             "Review" is wider than the ring's inner box and paints
             outside the node. */
          ${TAG} .canvas { --nd: clamp(64px, 8.4vh, 84px); }
          ${TAG} .forklab { padding-left: 12px; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <p class="fg-label lbl fg-in" style="--fg-at: 3">${t.pathsLabel}</p>
        <div class="canvas">

          <div class="caps">
            ${RTL.map(i => `
              <p class="cap ap" style="--fg-at: ${6 + i}">
                <i>${i + 1}</i>${nb(t.right.steps[i])}
              </p>
            `).join('')}
          </div>

          <div class="arcwrap">
            <i class="arc ap" style="--fg-at: 6"></i>
            ${RTL.map((i, k) => `
              <b class="snd ap" style="left: ${THIRDS[k]}; --fg-at: ${6 + i}"></b>
            `).join('')}
          </div>

          <i class="seg seg--in dx" style="--fg-at: 3"></i>
          <i class="seg seg--out dx" style="--fg-at: 3"></i>
          <i class="seg seg--cont dx" style="--fg-at: 4"></i>
          <i class="seg seg--vd dx" style="--fg-at: 4"></i>
          ${t.loop.map((n, i) => `
            <span class="step ${HUE[i]} ap" style="grid-column: ${AT[i]}; --fg-at: ${3 + i}">${n}</span>
          `).join('')}
          <i class="stop ap" style="--fg-at: 5"></i>
          <p class="forklab ap" style="--fg-at: 5">${t.moment}</p>
          <span class="vd vd--real ap" style="--fg-at: 9">&#10003;</span>
          <i class="skip ap" style="--fg-at: 6"></i>
          <span class="vd vd--hollow ap" style="--fg-at: 9">&#10003;</span>

          <div class="dcaps">
            ${t.wrong.steps.map((step, i) => `
              <div class="dcell ap" style="--fg-at: ${6 + i}">
                <i class="nd nd--drift"></i>
                <p class="cap cap--drift"><i>${i + 1}</i>${step}</p>
              </div>
            `).join('')}
          </div>

          <div class="planwrap ap" style="--fg-at: 8">
            <i class="stem"></i>
            <span class="doc">
              <span class="kind">${t.planKind}</span>
              <span class="file">${t.planFile}</span>
            </span>
          </div>

        </div>
        <div class="costs">
          <p class="cost cost--wrong ap" style="--fg-at: 10">
            <i class="swatch"></i><span>${t.wrong.cost}</span>
          </p>
          <p class="cost cost--right ap" style="--fg-at: 10">
            <i class="swatch"></i><span>${t.right.cost}</span>
          </p>
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section16);
