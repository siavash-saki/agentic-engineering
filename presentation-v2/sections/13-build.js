/* Section 13 — Build, chapter opener.

   The second of the three chapter openers, and a Tier A slide. It used
   to carry 150 words in three cards plus a context paragraph — a content
   slide wearing a title, exactly as the Plan opener was. Now the chapter
   word sits at display size, green owns the slide, and the argument is
   drawn.

   THE HEAD IS SLIDE 8'S HEAD. Kicker, the chapter word at
   --ae-fs-display in the chapter's deep hue, the locator on the right
   with this step lit. The three openers rhyme through those four things
   and NOT through a shared drawing: slide 8 landed with a run, and the
   same run was rejected here and on 18, so the run is slide 8's shape
   and not the set's.

   NOTHING HERE MAY NAME A FILE OR END IN A DOCUMENT OBJECT. An earlier
   version ended its run in a box reading "ticks off / tasks.md" and was
   rejected for it: a chapter opener must not name a file the chapter has
   not explained yet. The wider reason is that Plan's argument is that it
   produces a written artifact, which is why slide 8 can end in PLAN.md
   and have it earn its place; Build's argument is SIZE AND ATTENTION —
   a thousand lines against the first hundred — which is not an artifact
   claim at all.

   THE SCORE. The three rules are not three peers standing in a row. They
   are three readings of ONE run of steps: the run exists as a list, each
   of its items is a commit, and the plan is present at every item. So the
   run is drawn once, six positions wide, and each rule gets its own
   register over the same six columns.

   THE VERTICAL ALIGNMENT ACROSS REGISTERS IS THE ENTIRE DEVICE. The six
   positions align because all three registers are the same six-column
   grid at the same width. Break that — put a caption beside a track and
   shorten it, or give one register a different column count — and the
   slide stops being a score and becomes three unrelated diagrams
   stacked, which argues nothing. Captions therefore go UNDERNEATH, never
   beside.

   SIX, BECAUSE THE TEXT SAYS SIX. "Six six-file diffs" is the chapter's
   own number, so the drawing counts the way the sentence does.

   REGISTER 2 CARRIES THE ONE CLAY MARK ON THE SLIDE. The forty-file diff
   is HATCHED, not merely tinted: at a 1.5px dashed edge over a flat tint
   the lump read as LESS than the six green blocks under it, which is the
   opposite of the claim — it is the same work, undivided. The hatch
   gives it mass without spending a solid clay fill, and hatch plus dash
   are both what survives greyscale. Do not "simplify" it back to a tint.
   The two widths are equal for the same reason: the claim is "the same
   work, in reviewable units", not "less work".

   (No backticks anywhere in these comments or in the style block: the
   whole thing sits inside a JS template literal, and one backtick ends
   the string and blanks the deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's13-build';

/* Six positions, because the chapter's own sentence counts to six. */
const SIX = [1, 2, 3, 4, 5, 6];

const CONTENT = {
  en: {
    kicker: 'Step 2 of 3',
    h1: 'Build',
    loop: ['Plan', 'Build', 'Review'],
    lede: `The agent can produce a thousand lines before you finish reading the
           first hundred. Every rule in this step exists to keep the output
           smaller than your attention.`,
    rules: [
      { n: '1', t: 'A checklist first',
        d: 'The agent turns the plan into a flat list of steps and works them in order. Nobody approves this list — it exists so you can see where it is.' },
      { n: '2', t: 'One step, one commit',
        d: 'A commit per item, with a message that names the item. A forty-file diff is not reviewable; six six-file diffs are.' },
      { n: '3', t: 'The plan stays in the prompt',
        d: 'Not read once at the start. Referenced in the message that asks for each step, so the agent is building against it rather than from memory.' },
    ],
    /* Captions on a drawing, not new prose: each one names a quantity the
       rule beside it already states in words. */
    score: {
      steps: 'the steps, in order',
      big:   'one diff, forty files',
      small: 'six diffs, six files each',
      plan:  'the plan',
      every: 'read again at every step',
    },
    contextLabel: 'And underneath all three',
    context: `What the agent knows before it writes anything: the project's memory
              file, the procedures you have written down, and the systems it is
              allowed to reach. That is the next three slides.`,
  },
  de: {
    kicker: 'Schritt 2 von 3',
    h1: 'Build',
    loop: ['Plan', 'Build', 'Review'],
    lede: `Der Agent produziert tausend Zeilen, bevor die ersten hundert gelesen
           sind. Jede Regel in diesem Schritt hält den Output kleiner als die
           eigene Aufmerksamkeit.`,
    rules: [
      { n: '1', t: 'Zuerst eine Checkliste',
        d: 'Der Agent macht aus dem Plan eine flache Liste von Schritten und arbeitet sie der Reihe nach ab. Niemand gibt diese Liste frei — sie zeigt nur, wo er gerade steht.' },
      { n: '2', t: 'Ein Schritt, ein Commit',
        d: 'Ein Commit pro Punkt, mit einer Nachricht, die den Punkt benennt. Ein Diff über vierzig Dateien ist nicht prüfbar, sechs Diffs über je sechs schon.' },
      { n: '3', t: 'Der Plan bleibt im Prompt',
        d: 'Nicht einmal am Anfang gelesen. In jeder Nachricht referenziert, die einen Schritt anfordert — damit dagegen gebaut wird und nicht aus dem Gedächtnis.' },
    ],
    score: {
      steps: 'die Schritte, der Reihe nach',
      big:   'ein Diff, vierzig Dateien',
      small: 'sechs Diffs, je sechs Dateien',
      plan:  'der Plan',
      every: 'bei jedem Schritt erneut gelesen',
    },
    contextLabel: 'Und unter allen dreien',
    context: `Was der Agent weiß, bevor er etwas schreibt: die Memory-Datei des
              Projekts, die aufgeschriebenen Abläufe und die Systeme, die er
              erreichen darf. Darum geht es auf den nächsten drei Folien.`,
  },
};

class Section13 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    const s = t.score;

    /* The rule itself: number, title, prose. The left half of a register. */
    const lab = (m) => `
      <div class="lab">
        <span class="n">${m.n}</span>
        <div><span class="t">${m.t}</span><p class="d">${m.d}</p></div>
      </div>`;
    const cap = (kind, glyph, text) =>
      `<p class="cap ${kind}"><b>${glyph}</b>${text}</p>`;

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
           is what centres the score — but it must never SHRINK below its
           content. With a zero basis an over-tall score paints straight
           through the closing band instead of scrolling: a silent spill,
           which is worse than a scrollbar because nothing reports it. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; margin-top: var(--ae-space-5); }
        /* The kit gives every p a bottom margin, and .fg-note is one.
           The body may not shrink here, so that margin would be blank
           paid for out of the drawing's budget. */
        ${TAG} .foot .fg-note { margin-bottom: 0; }

        /* ── the head: slide 8's head, in green ── */
        ${TAG} .title {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: var(--ae-space-6); flex-wrap: wrap;
        }
        ${TAG} .kicker {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--fg-build); margin: 0 0 var(--ae-space-2);
        }
        ${TAG} h1 {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-display); line-height: 1; letter-spacing: -0.035em;
          color: var(--fg-build-d);
        }
        ${TAG} .fg-lede { margin: var(--ae-space-3) 0 0; max-width: 62ch; }

        /* ── the locator: the loop, with this step lit ──
           Same geometry as slide 8; only the hue and the lit index change. */
        ${TAG} .loc { display: flex; align-items: center; gap: var(--ae-space-2); }
        ${TAG} .loc .dot {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 600; color: var(--ae-text-disabled);
        }
        ${TAG} .loc .dot::before {
          content: ''; width: 10px; height: 10px; border-radius: 999px;
          background: var(--ae-cool-gray-200);
        }
        ${TAG} .loc .dot.on { color: var(--fg-build-d); font-weight: 700; }
        ${TAG} .loc .dot.on::before {
          background: var(--fg-build); box-shadow: 0 0 0 4px var(--fg-build-tint);
        }
        ${TAG} .loc .sep { width: 18px; height: 2px; background: var(--fg-hair); }

        /* ── the score: one run, three registers over the same six columns ── */
        ${TAG} .reg {
          display: grid; grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr);
          column-gap: var(--ae-space-6); align-items: center;
          padding: var(--ae-space-3) 0; border-top: 1px solid var(--fg-hair);
        }
        ${TAG} .reg:first-child { border-top: 0; padding-top: 0; }
        ${TAG} .reg:last-child { padding-bottom: 0; }
        ${TAG} .lab {
          display: grid; grid-template-columns: auto minmax(0, 1fr);
          column-gap: var(--ae-space-4); align-items: start;
        }
        ${TAG} .lab .n {
          width: 2.2em; height: 2.2em; border-radius: 999px;
          background: var(--fg-build); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption); font-weight: 700;
          font-variant-numeric: tabular-nums; line-height: 1;
        }
        ${TAG} .lab .t {
          display: block; font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h4); line-height: 1.15; color: var(--fg-build-d);
        }
        ${TAG} .lab .d {
          margin: var(--ae-space-2) 0 0;
          font-size: var(--ae-fs-small); line-height: 1.42; color: var(--fg-body);
        }

        /* THE six columns. Every track on the slide is this one rule, so
           the registers cannot drift out of alignment with each other. */
        ${TAG} .track {
          display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px;
        }
        /* Captions go UNDER a track, never beside it: beside, a caption
           shortens the track and the six columns stop lining up. */
        ${TAG} .cap {
          margin: 6px 0 0; display: flex; align-items: baseline; gap: 7px;
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }
        ${TAG} .cap b { flex: none; font-weight: 700; }
        ${TAG} .cap--ok b  { color: var(--fg-build-d); }
        ${TAG} .cap--bad   { color: var(--fg-fail-d); }
        ${TAG} .cap--bad b { color: var(--fg-fail-d); }

        /* Register 1 — the list, laid flat. Hollow boxes: the items exist
           and are ordered, and nothing has been done to them yet. */
        ${TAG} .step {
          height: clamp(26px, 3.2vh, 38px);
          border: 2px solid var(--fg-build); border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption); font-weight: 700;
          font-variant-numeric: tabular-nums; color: var(--fg-build-d);
        }

        /* Register 2 — one mass against the same mass cut into six.
           HATCHED, not merely outlined: see the header note. The hatch is
           also the half of the distinction that survives greyscale. */
        ${TAG} .lump {
          display: block;
          height: clamp(20px, 2.4vh, 28px); border-radius: 5px;
          border: 1.5px dashed var(--fg-fail);
          background:
            repeating-linear-gradient(45deg,
              rgba(180, 85, 44, .30) 0 5px, rgba(180, 85, 44, 0) 5px 11px),
            var(--fg-fail-tint);
        }
        ${TAG} .piece {
          height: clamp(20px, 2.4vh, 28px); border-radius: 5px;
          background: var(--fg-build);
        }
        /* Two sub-blocks in one register need air between them; the gap
           lives on the stack rather than as a margin on the caption above
           it, so each caption stays welded to the track it describes. */
        ${TAG} .stack { display: grid; row-gap: var(--ae-space-2); }

        /* Register 3 — the plan, above the run, entering at every position. */
        ${TAG} .band {
          padding: 4px var(--ae-space-4); border-radius: 5px;
          background: var(--fg-build-tint); border: 1px solid var(--fg-build);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          font-weight: 600; color: var(--fg-build-d); text-align: center;
        }
        /* The arrowhead hangs 8px below its line, so the clearance under
           the drops is margin on the drops and not row-gap on a stack —
           row-gap would let the heads land on the marks they point at. */
        ${TAG} .drops {
          display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px;
          margin: 6px 0 10px;
        }
        ${TAG} .drops i {
          justify-self: center; position: relative;
          width: 2px; height: clamp(14px, 1.9vh, 22px);
          background: var(--ae-cool-gray-300);
        }
        /* Arrowhead in CSS borders, not SVG — a stretched marker smears. */
        ${TAG} .drops i::after {
          content: ''; position: absolute; left: 50%; bottom: -7px;
          transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 8px solid var(--ae-cool-gray-300);
        }
        /* What the drops land on: the same six positions, one register down. */
        ${TAG} .mark {
          height: clamp(10px, 1.4vh, 15px); border-radius: 3px;
          background: var(--fg-build);
        }

        @media (max-width: 900px) {
          ${TAG} .reg { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
        }
      </style>
      <div class="fg-wrap head">
        <div class="title">
          <div>
            <p class="kicker fg-in" style="--fg-at: 1">${t.kicker}</p>
            <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
          </div>
          <div class="loc fg-in" style="--fg-at: 2">
            ${t.loop.map((n, i) => `
              ${i ? '<i class="sep"></i>' : ''}
              <span class="dot${i === 1 ? ' on' : ''}">${n}</span>
            `).join('')}
          </div>
        </div>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="score">

          <div class="reg fg-in" style="--fg-at: 4">
            ${lab(t.rules[0])}
            <div>
              <div class="track">
                ${SIX.map(n => `<span class="step">${n}</span>`).join('')}
              </div>
              <p class="cap">${s.steps}</p>
            </div>
          </div>

          <div class="reg fg-in" style="--fg-at: 5">
            ${lab(t.rules[1])}
            <div class="stack">
              <div>
                <i class="lump"></i>
                ${cap('cap--bad', '&#10005;', s.big)}
              </div>
              <div>
                <div class="track">
                  ${SIX.map(() => '<i class="piece"></i>').join('')}
                </div>
                ${cap('cap--ok', '&#10003;', s.small)}
              </div>
            </div>
          </div>

          <div class="reg fg-in" style="--fg-at: 6">
            ${lab(t.rules[2])}
            <div>
              <div class="band">${s.plan}</div>
              <div class="drops" aria-hidden="true">
                ${SIX.map(() => '<i></i>').join('')}
              </div>
              <div class="track">
                ${SIX.map(() => '<i class="mark"></i>').join('')}
              </div>
              ${cap('cap--ok', '&#10003;', s.every)}
            </div>
          </div>

        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 10">
          <span><b>${t.contextLabel}.</b> ${t.context}</span>
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section13);
