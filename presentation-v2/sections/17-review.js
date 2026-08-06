/* Section 18 — Review, chapter opener.

   The third of the three chapter openers, and the last of the tier
   change. It used to carry 130 words in two cards, a lede and a mint
   note — a content slide wearing a title, exactly as Plan and Build were
   before their openers landed.

   THE HEAD IS SLIDE 8'S HEAD. Kicker, the chapter word at
   --ae-fs-display in the chapter's deep hue, the locator on the right
   with this step lit. That, plus the hue, is the whole of what the three
   openers share: slide 8 landed with a run, and the same run was
   rejected on 13 and again here, so the openers rhyme through the head
   and NOT through a shared drawing.

   THE LEDE IS GONE. Each half states its yardstick and its answerer, so
   the lede said "different evidence, different people answering" a
   second time and the slide read as a wall again.

   NOTHING HERE MAY NAME verification.md OR END IN A DOCUMENT OBJECT. An
   earlier version ended its run in "writes / verification.md" and was
   rejected: a chapter opener must not name a file the chapter has not
   explained yet. The same note was made on slide 13, so it is a
   principle and not a one-off.

   THE FIELD. Plum owns this slide as a GROUND rather than as a stroke: a
   labelled plum enclosure holds the pair of questions, and the warning
   sits OUTSIDE it. That placement is the argument — the two questions
   are what this step is, and running the tests is not inside the
   definition. Nothing else on the slide has to say so, and moving the
   warning inside the field would quietly reverse the claim.

   THE PLUM MUST STAY A VISIBLE BAND around and between the two halves
   (hence space-6 padding and a space-6 gutter). Tighten it and the
   enclosure reads as a 1px frame, which makes the chapter hue a stroke
   again — the thing this variation exists not to be.

   THE ANSWERER IS THE HEADER OF EACH HALF, at panel scale: the deck's
   filled-versus-hollow rule enlarged. Half one wears a SOLID INK bar
   with white type, half two a WHITE bar with a plum rule under it and a
   hollow ring. Two dark bars would be one grey in greyscale — ink and
   plum sit a point apart on the lightness band — so the second bar is
   unfilled rather than differently coloured. Both headers carry the same
   2px bottom edge; ink's is invisible against its own fill, and without
   it the outlined half's rule pushed its question 2px lower than its
   neighbour's, which on a pair whose whole point is symmetry read as a
   misalignment.

   THE QUESTION HAS A TWO-LINE FLOOR. One question wraps and the other
   does not; without the floor the yardstick and the prose sat 49px apart
   across the two halves. Symmetry is the claim, so it is built in rather
   than hoped for.

   THE TAKEAWAY IS A WARNING, SO IT IS CLAY, NOT MINT. It describes a
   failure — most people answer one question badly and the other not at
   all. .fg-note is mint and reserved for takeaways; this is slide 8's
   landed .wrong device: clay tint AND dashed AND a leading cross, three
   carriers, so it still reads as the wrong one with the hue stripped.

   (No backticks anywhere in these comments or in the style block: the
   whole thing sits inside a JS template literal, and one backtick ends
   the string and blanks the deck.) */

import { getLang } from '../core/i18n.js';

const TAG = 's17-review';

const CONTENT = {
  en: {
    kicker: 'Step 3 of 3',
    h1: 'Review',
    loop: ['Plan', 'Build', 'Review'],
    setLabel: 'Two questions',
    qs: [
      {
        n: '1', who: 'you',
        q: 'Did we build what we agreed?',
        meas: 'Measured against the plan',
        by: 'Answered by you',
        d: 'Walk the acceptance criteria one at a time. Each row needs evidence, not an opinion. This is the question the plan exists to make answerable.',
      },
      {
        n: '2', who: 'bot',
        q: 'Is the code any good?',
        meas: 'Measured against the craft',
        by: 'Answered by a model that was not there',
        d: 'Structure, edge cases, error handling, the test that cannot fail. This one cannot be answered by the model that wrote the code, and often not by you either.',
      },
    ],
    note: `Most people answer the second question badly and the first one not at
           all — then run the tests and call it review.
           <b>"It runs" answers neither.</b>`,
  },
  de: {
    kicker: 'Schritt 3 von 3',
    h1: 'Review',
    loop: ['Plan', 'Build', 'Review'],
    setLabel: 'Zwei Fragen',
    qs: [
      {
        n: '1', who: 'you',
        q: 'Wurde geliefert, was vereinbart war?',
        meas: 'Gemessen am Plan',
        by: 'Beantwortet von dir',
        d: 'Die Akzeptanzkriterien einzeln durchgehen. Jede Zeile braucht einen Beleg, keine Einschätzung. Für diese Frage existiert der Plan.',
      },
      {
        n: '2', who: 'bot',
        q: 'Taugt der Code etwas?',
        meas: 'Gemessen am Handwerk',
        by: 'Beantwortet von einem Modell, das nicht dabei war',
        d: 'Struktur, Randfälle, Fehlerbehandlung, der Test, der nicht scheitern kann. Diese Frage kann das Modell, das den Code geschrieben hat, nicht beantworten — und oft du auch nicht.',
      },
    ],
    note: `Die meisten beantworten die zweite Frage schlecht und die erste gar
           nicht — dann laufen die Tests, und das heißt dann Review.
           <b>„Es läuft" beantwortet keine von beiden.</b>`,
  },
};

class Section17 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-4);
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* "1 0 auto", not "1": the body must grow into spare space — that
           is what centres the field — but it must never SHRINK below its
           content. With a zero basis a body one line too tall does not
           overflow: the flex item shrinks and the grid inside it spills
           past its own box, so scrollHeight still equals clientHeight and
           the overflow check passes on a slide that is visibly broken. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        /* ── the head: slide 8's head, in plum ── */
        ${TAG} .title {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: var(--ae-space-6); flex-wrap: wrap;
        }
        ${TAG} .kicker {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--fg-review); margin: 0 0 var(--ae-space-2);
        }
        ${TAG} h1 {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-display); line-height: 1; letter-spacing: -0.035em;
          color: var(--fg-review-d);
        }

        /* ── the locator: the loop, with this step lit ──
           Same geometry as slides 8 and 13; hue and lit index change. */
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
        ${TAG} .loc .dot.on { color: var(--fg-review-d); font-weight: 700; }
        ${TAG} .loc .dot.on::before {
          background: var(--fg-review); box-shadow: 0 0 0 4px var(--fg-review-tint);
        }
        ${TAG} .loc .sep { width: 18px; height: 2px; background: var(--fg-hair); }

        /* ── the field: plum as a ground, with a named edge ── */
        ${TAG} .field {
          position: relative;
          background: var(--fg-review-tint);
          border: 1.5px solid var(--fg-review);
          border-radius: var(--ae-radius-lg);
          padding: var(--ae-space-7) var(--ae-space-6) var(--ae-space-6);
        }
        /* A solid plum chip straddling the border, which is what makes the
           enclosure read as a definition rather than a decorative tint. */
        ${TAG} .fieldlbl {
          position: absolute; top: 0; left: var(--ae-space-6);
          transform: translateY(-50%); margin: 0;
          padding: 5px var(--ae-space-4); border-radius: 999px;
          background: var(--fg-review); color: #fff;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        /* space-6, not space-5: the plum has to be a visible band around
           and between the two halves, or the enclosure reads as a 1px
           frame and the chapter hue is a stroke again. */
        ${TAG} .pair {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-6);
        }
        ${TAG} .half {
          background: var(--fg-card); border-radius: var(--ae-radius);
          box-shadow: var(--fg-d1); overflow: hidden;
          display: flex; flex-direction: column;
        }
        ${TAG} .hd {
          display: flex; align-items: center; gap: var(--ae-space-3);
          padding: var(--ae-space-3) var(--ae-space-4);
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 700;
        }
        /* Both headers carry the same 2px bottom edge — ink's is invisible
           against its own fill. See the header note. */
        ${TAG} .half--you .hd {
          background: var(--fg-ink); color: #fff; border-bottom: 2px solid var(--fg-ink);
        }
        ${TAG} .half--bot .hd {
          background: var(--fg-card); color: var(--fg-review-d);
          border-bottom: 2px solid var(--fg-review);
        }
        ${TAG} .hd .dot {
          flex: none; width: 26px; height: 26px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ae-font-head); font-size: var(--ae-fs-caption); font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .half--you .hd .dot { background: #fff; color: var(--fg-ink); }
        ${TAG} .half--bot .hd .dot { border: 2.5px solid var(--fg-review); color: var(--fg-review-d); }
        ${TAG} .bd { padding: var(--ae-space-5) var(--ae-space-5) var(--ae-space-6); }
        /* h1, one step under the chapter word: the questions are the thing
           that has to be readable from the back of the room. The two-line
           floor is what keeps the two halves symmetrical when one wraps
           and the other does not. */
        ${TAG} .bd .q {
          margin: 0 0 var(--ae-space-4); min-height: 2.06em;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h1); line-height: 1.03; letter-spacing: -0.028em;
          color: var(--fg-ink);
        }
        /* The yardstick. A left rule in the answerer's own colour, so
           "measured against X" is attached to a side of the split rather
           than floating. */
        ${TAG} .meas {
          margin: 0; padding-left: var(--ae-space-3);
          border-left: 2px solid var(--ae-cool-gray-300);
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 600; color: var(--fg-muted);
        }
        ${TAG} .half--you .meas { border-left-color: var(--fg-ink); }
        ${TAG} .half--bot .meas { border-left-color: var(--fg-review); }
        ${TAG} .bd .d {
          margin: var(--ae-space-3) 0 0;
          font-size: var(--ae-fs-small); line-height: 1.45; color: var(--fg-body);
        }

        /* The warning strip, OUTSIDE the field. Identical device to slide
           8's landed ".wrong": clay AND dashed AND a leading cross. */
        ${TAG} .warn {
          display: flex; align-items: baseline; gap: var(--ae-space-3);
          margin: 0;
          padding: var(--ae-space-4) var(--ae-space-5);
          border-radius: var(--ae-radius-md);
          background: var(--fg-fail-tint); border: 1px dashed var(--fg-fail);
          font-size: var(--ae-fs-small); line-height: 1.42; color: var(--fg-fail-d);
        }
        ${TAG} .warn::before { content: '\\2715'; flex: none; font-weight: 700; }
        ${TAG} .warn b { font-weight: 700; }

        @media (max-width: 900px) {
          /* Stacked, the two halves are one above the other and each
             question gets the full width, so h1 buys nothing and costs
             240px. Down a step, and the two-line floor goes with it. */
          ${TAG} .pair { grid-template-columns: 1fr; gap: var(--ae-space-4); }
          ${TAG} .bd .q { font-size: var(--ae-fs-h2); line-height: 1.1; min-height: 0; }
          ${TAG} .field { padding: var(--ae-space-6) var(--ae-space-4) var(--ae-space-4); }
          ${TAG} .bd { padding: var(--ae-space-4); }
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
              <span class="dot${i === 2 ? ' on' : ''}">${n}</span>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="fg-wrap body">
        <div class="field fg-in" style="--fg-at: 3">
          <p class="fieldlbl">${t.setLabel}</p>
          <div class="pair">
            ${t.qs.map((q, i) => `
              <div class="half half--${q.who} fg-in" style="--fg-at: ${4 + i * 2}">
                <div class="hd">
                  <span class="dot">${q.n}</span><span>${q.by}</span>
                </div>
                <div class="bd">
                  <p class="q">${q.q}</p>
                  <p class="meas">${q.meas}</p>
                  <p class="d">${q.d}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="warn fg-in" style="--fg-at: 9"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section17);
