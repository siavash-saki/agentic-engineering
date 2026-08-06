/* Section 26 — How much of this.

   THE DEFECT THIS REPLACES: a dial drawn as three peers. The slide's
   own closing line says it is a dial and that the default is the middle
   position, and the project's rule is a continuum — the costlier the
   mistake, the more spec. Three equal cards in a row assert exactly the
   tiering the slide exists to deny.

   SO NOTHING HERE IS BOXED, NUMBERED, OR SEPARATED. No card, no border,
   no equal-width column, and no line is ever drawn BETWEEN the three
   named points. What carries the continuum is continuous: a ramp of
   material. The three names are reading points ON it, marked the way a
   scale is marked, and their prose hangs off the mark.

   THE DRAWING IS THE ARTIFACT ITSELF, GROWING. Not a control and not a
   plot. The band is the whole of a decision — everything about the work
   that somebody has to decide. Solid ink is the part you wrote down;
   dashed clay is the part left for the model to decide, plausibly and
   silently. That is slide 6's device, twenty slides later, and turning
   the dial up IS the ink rising into the clay. IT NEVER REACHES THE
   TOP: the ramp runs to 9 rows of 10, because you never write
   everything. Do not "finish" it — the gap is the claim.

   THE BAND IS COMPUTED, NOT DRAWN BY HAND. Fourteen columns, the ink
   count interpolated across them. That is what keeps the ramp
   continuous by construction, so it cannot quietly become three steps
   again the next time someone edits it.

   TWO CONTENT DECISIONS, both deliberate:

   THE SECTION LABEL "Three settings" / "Drei Stufen" IS DELETED. The
   drawing counts the three names on a scale, so a label announcing that
   there are three of them restates the picture — and it was the one
   string on the slide that asserted the tiering: Stufen means tiers,
   and the last line of the slide says the opposite.

   EACH FACTOR'S DESCRIPTION IS SPLIT INTO ITS TWO POLES, at the
   sentence boundary it was already written at. No word was added,
   removed or reordered. The two halves are what let the factors be
   drawn as scales at the foot at all.

   NO CHAPTER HUE APPEARS HERE: this slide sits in no chapter. Two marks
   only — ink for the human and everything a person writes or decides,
   clay for the failure mode, which is literally the far end of both
   factors. Everything else is grey plumbing. Form carries every
   distinction on its own: filled ink capsule against hollow grey ring,
   solid bar against dashed line. Desaturate and nothing is lost.

   (No backticks anywhere in these comments or in the CSS: this block
   sits inside a JS template literal, and one backtick ends the string
   and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's25-dial';

const CONTENT = {
  en: {
    h1: 'Spend where being wrong is <span class="fg-mark fg-mark--sweep">expensive and hard to see</span>',
    lede: `The loop does not change. How much of it you write down does. Two
           factors decide it, and neither of them is how important the project
           feels.`,
    factors: [
      { t: 'What does being wrong cost?',
        lo: 'A wrong colour is a shrug.',
        hi: 'A wrong tax calculation is a letter from a regulator.' },
      { t: 'How long until you notice?',
        lo: 'A crash announces itself.',
        hi: 'A silently wrong number does not, and it is still wrong a year later.' },
    ],
    defaultTag: 'Default',
    wroteWord: 'Written down',
    leftWord: 'Left for the model to decide',
    settings: [
      { t: 'A paragraph', d: 'Prototypes, throwaway scripts, personal tools, anything you would delete without regret.', w: 'A few sentences in the prompt. No file. Read the diff.' },
      { t: 'A file', d: 'Features in a shared codebase. Anything another person will have to maintain or extend.', w: 'One markdown file, agreed before Build. A second model reads the diff.' },
      { t: 'Several files', d: 'Published contracts, data correctness, money, access control, anything with a compliance shape.', w: 'What the plan holds, split up. Criteria checked one at a time, with evidence recorded.' },
    ],
    note: `Applying the last setting to the first kind of work is how this method
           gets a reputation for being slow. <b>It is a dial, and the default
           position is the middle one.</b>`,
  },
  de: {
    h1: 'Aufwand dort, wo Irrtum <span class="fg-mark fg-mark--sweep">teuer und schlecht sichtbar</span> ist',
    lede: `Der Loop bleibt gleich. Wie viel davon aufgeschrieben wird, nicht.
           Zwei Faktoren entscheiden das, und keiner davon ist, wie wichtig sich
           das Projekt anfühlt.`,
    factors: [
      { t: 'Was kostet ein Irrtum?',
        lo: 'Eine falsche Farbe ist ein Achselzucken.',
        hi: 'Eine falsche Steuerberechnung ist ein Brief von der Aufsicht.' },
      { t: 'Wie lange bis es auffällt?',
        lo: 'Ein Absturz meldet sich.',
        hi: 'Eine still falsche Zahl nicht, und sie ist ein Jahr später immer noch falsch.' },
    ],
    defaultTag: 'Standard',
    wroteWord: 'Aufgeschrieben',
    leftWord: 'Dem Modell zur Entscheidung überlassen',
    settings: [
      { t: 'Ein Absatz', d: 'Prototypen, Wegwerf-Skripte, eigene Werkzeuge, alles, was man ohne Bedauern löscht.', w: 'Ein paar Sätze im Prompt. Keine Datei. Den Diff lesen.' },
      { t: 'Eine Datei', d: 'Features in einer gemeinsamen Codebasis. Alles, was ein anderer Mensch pflegen oder erweitern muss.', w: 'Eine Markdown-Datei, freigegeben vor Build. Ein zweites Modell liest den Diff.' },
      { t: 'Mehrere Dateien', d: 'Veröffentlichte Schnittstellen, Datenkorrektheit, Geld, Zugriffsrechte, alles mit Compliance-Charakter.', w: 'Der Inhalt des Plans, aufgeteilt. Kriterien einzeln geprüft, Belege festgehalten.' },
    ],
    note: `Die letzte Stufe auf die erste Art Arbeit anzuwenden ist der Grund,
           warum diese Methode als langsam gilt. <b>Es ist ein Regler, und die
           Standardstellung ist die mittlere.</b>`,
  },
};

/* Column spans 30 / 36 / 34 put the reading points at 15%, 48% and 83%
   of the axis, so every mark on the scale is derived from the same three
   numbers as the columns under it rather than eyeballed twice. */
const AT = ['15%', '48%', '83%'];

/* The ramp: 14 columns, ink rising from 1 to 9 rows of 10. */
const COLS = 14;
const ROWS = 10;

function band() {
  let out = '<div class="band fg-in" style="--fg-at: 4">';
  for (let c = 0; c < COLS; c++) {
    const ink = Math.round(1 + (c / (COLS - 1)) * 8);
    out += '<div class="col">';
    for (let r = 0; r < ROWS; r++) out += `<i class="${r < ink ? 'on' : 'off'}"></i>`;
    out += '</div>';
  }
  return out + '</div>';
}

class Section25 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-7);
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* "safe center", not plain "center": the real stage is the
           viewport minus 110px — a 55px header and a 55px nav bar — and
           this slide carries 155 words plus a drawing. Plain centring
           overflows in BOTH directions. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        /* Between h2 and h1, the same compromise slide 7 makes on its
           step names. At full h1 the title alone cost 40px of the stage
           and the German went over the ceiling. */
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: clamp(26px, 3.7vh, 46px); line-height: 1.1; color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 68ch; line-height: 1.4; }

        /* ── the legend: what the two materials mean ── */
        ${TAG} .legend {
          display: flex; align-items: center; gap: var(--ae-space-6);
          margin-bottom: var(--ae-space-3);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
        }
        ${TAG} .legend span { display: flex; align-items: center; gap: var(--ae-space-2); }
        ${TAG} .legend .sw { flex: none; width: 22px; }
        ${TAG} .legend .sw--ink { height: 5px; border-radius: 3px; background: var(--fg-ink); }
        ${TAG} .legend .sw--clay { height: 0; border-top: 2px dashed var(--fg-fail); }
        ${TAG} .legend .l--ink { color: var(--fg-ink); font-weight: 600; }
        ${TAG} .legend .l--clay { color: var(--fg-fail-d); font-weight: 500; }

        /* ── the ramp ──
           column-reverse so row 0 is the bottom of the band: the ink
           grows upward out of the floor. */
        ${TAG} .band {
          display: flex; align-items: stretch; gap: clamp(5px, 0.9vw, 12px);
          height: clamp(80px, 13vh, 118px);
        }
        ${TAG} .col { flex: 1; display: flex; flex-direction: column-reverse; }
        ${TAG} .col i { flex: 1; display: block; position: relative; }
        ${TAG} .col i::before { content: ''; position: absolute; left: 0; right: 0; bottom: 22%; }
        ${TAG} .col i.on::before { height: 5px; border-radius: 3px; background: var(--fg-ink); }
        ${TAG} .col i.off::before { height: 0; border-top: 2px dashed var(--fg-fail); opacity: 0.9; }

        /* ── the axis under it ── */
        ${TAG} .axis {
          position: relative; height: 3px; border-radius: 2px;
          background: var(--ae-cool-gray-300); margin-top: 5px;
        }
        /* Named "arw", not "head": the section's own head/body/foot
           wrapper carries .head, and an arrowhead called .head would
           quietly pick up that rule from anywhere inside the slide. */
        ${TAG} .axis .arw {
          position: absolute; right: -11px; top: 50%; transform: translateY(-50%);
          width: 0; height: 0;
          border-left: 12px solid var(--ae-cool-gray-300);
          border-top: 7px solid transparent; border-bottom: 7px solid transparent;
        }
        /* A sample: hollow grey ring. The set position: filled ink. The
           two never differ by colour alone — one is a hole in the scale,
           the other is a stop across it. */
        ${TAG} .axis .mk {
          position: absolute; top: 50%; transform: translate(-50%, -50%);
          width: 11px; height: 11px; border-radius: 999px;
          background: var(--fg-card); border: 2.5px solid var(--ae-cool-gray-400);
        }
        ${TAG} .axis .knob {
          position: absolute; top: 50%; transform: translate(-50%, -50%);
          width: 14px; height: 30px; border-radius: 7px;
          background: var(--fg-ink); box-shadow: 0 0 0 3px var(--fg-paper), var(--fg-d2);
        }

        /* ── the three reading points ──
           Column WIDTHS are their share of the scale, so they are
           readings of a range rather than three items in a row. */
        ${TAG} .pts { display: grid; grid-template-columns: 30% 36% 34%; }
        ${TAG} .pt { position: relative; padding: var(--ae-space-4) var(--ae-space-6) 0 0; }
        ${TAG} .pt .lead {
          position: absolute; left: 50%; top: 0; width: 0;
          height: var(--ae-space-4);
          border-left: 1px dashed var(--ae-cool-gray-400);
        }
        ${TAG} .pt h3 {
          margin: 0;
          display: flex; align-items: baseline; gap: var(--ae-space-2); flex-wrap: wrap;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h4); line-height: 1.15; color: var(--fg-ink);
        }
        ${TAG} .pt .d { margin: 5px 0 0; font-size: var(--ae-fs-small); line-height: 1.32; color: var(--fg-body); }
        ${TAG} .pt .w {
          margin: 6px 0 0; padding-top: 6px;
          border-top: 1px solid var(--fg-hair);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          color: var(--fg-ink); font-weight: 500;
        }
        /* The ink pill that names the set position. Same device as slide
           6's labelled divider: a human decision, stated on the mark. */
        ${TAG} .tag {
          display: inline-block; padding: 2px 10px; border-radius: 999px;
          background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1.35; font-weight: 600; white-space: nowrap;
        }

        /* ── the axis's legend: what moves you along it ──
           ONE grid, not two: with a grid per row the middle column sized
           to its own title and the two ends came out ragged between the
           rows. display: contents puts all six cells in three columns.
           1.4fr on the right, not 1fr: the costly pole is the longer
           sentence in both languages and the German wrapped to a second
           line, which cost the slide a whole row. */
        ${TAG} .facs {
          margin-top: var(--ae-space-3); padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.4fr);
          column-gap: var(--ae-space-4); row-gap: 5px;
          align-items: center;
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
        }
        ${TAG} .fac { display: contents; }
        ${TAG} .facs .lo { text-align: right; color: var(--fg-muted); }
        ${TAG} .facs .mid {
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h5); line-height: 1.2; color: var(--fg-ink);
          text-align: center;
        }
        ${TAG} .facs .hi { color: var(--fg-fail-d); font-weight: 500; }

        @media (max-width: 1000px) {
          ${TAG} .pts { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .pt .lead { display: none; }
          ${TAG} .facs { grid-template-columns: 1fr; row-gap: 4px; }
          ${TAG} .facs .lo, ${TAG} .facs .mid { text-align: left; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="legend fg-in" style="--fg-at: 3">
          <span><i class="sw sw--ink"></i><b class="l--ink">${t.wroteWord}</b></span>
          <span><i class="sw sw--clay"></i><b class="l--clay">${t.leftWord}</b></span>
        </div>
        ${band()}
        <div class="axis fg-in" style="--fg-at: 5">
          <i class="arw" aria-hidden="true"></i>
          <i class="mk" style="left: ${AT[0]}"></i>
          <i class="mk" style="left: ${AT[2]}"></i>
          <i class="knob" style="left: ${AT[1]}"></i>
        </div>
        <div class="pts">
          ${t.settings.map((s, i) => `
            <div class="pt fg-in" style="--fg-at: ${6 + i}">
              <i class="lead" aria-hidden="true"></i>
              <h3><span>${s.t}</span>${i === 1 ? `<span class="tag">${t.defaultTag}</span>` : ''}</h3>
              <p class="d">${s.d}</p>
              <p class="w">${s.w}</p>
            </div>
          `).join('')}
        </div>
        <div class="facs fg-in" style="--fg-at: 9">
          ${t.factors.map((f) => `
            <div class="fac">
              <span class="lo">${f.lo}</span>
              <span class="mid">${f.t}</span>
              <span class="hi">${f.hi}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 10"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section25);
