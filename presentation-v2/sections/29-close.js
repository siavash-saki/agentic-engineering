/* Section 33 — the close.

   The last thing the audience sees. The old version measured 43% frame
   fill and was two things at once — a summary AND a resource list —
   pulling in opposite directions and resolving neither.

   THIS ONE RESOLVES IT BY RETURNING. The deck opened on the loop and it
   closes on it: three hued discs on a rail with the grey return arc
   under them, exactly as slide 5 built it, at full scale. What is new
   is that the tagline is no longer a sentence set beside the picture —
   its four clauses ARE the picture's labels. Three of them sit under
   the three steps; the fourth, "Agree it.", is an ink gate standing
   across the rail between Plan and Build. So the last frame on screen
   is the loop with the human's decision drawn into it, and the
   resources drop to a band along the bottom, where a takeaway belongs.

   THE GEOMETRY IS DERIVED, NOT EYEBALLED. Three equal columns put the
   disc centres at 16.66 / 50 / 83.33 percent, so the rail spans first
   centre to last centre and the gate sits at 33.33 percent — exactly
   halfway between disc 1 and disc 2 — by arithmetic rather than by a
   number that drifts the moment the German wraps differently. The arc
   is CSS borders and never SVG: a stretched viewBox turns a rounded
   corner into an ellipse and an arrowhead into a smear.

   --gh IS CAPPED so the gate's label always clears the step-name row.
   At 8.2vh the label's line box ran 5px into the names' row at
   1920x1080 — no glyphs touched, because the label sits in a column
   gap, but a quantity that only just misses is a quantity that will hit
   the first time a string changes. 7.2vh clears by 5-13px from 1024 to
   1920.

   ── THREE PALETTE CORRECTIONS ───────────────────────────────────────

   The old slide set the step names, the arrows, the list bullets, the
   URL and "Questions?" all in the accent green. Under the deck's
   palette green is BUILD, one job, and it may not be spent on a bullet
   or a link. So: the step names keep the chapter hue they were taught
   on slide 5 — a step name is the one piece of text allowed to carry
   one — and everything else that was green is now ink or grey. The
   rail and the arc are cool gray 300, the machine's plumbing; the
   repository markers are grey squares, because files in a directory are
   not a human decision; the URL and "Questions?" are ink.

   INK IS THE HUMAN, and this is the slide where that can be said
   loudest, because the deck's whole claim is that the human stays the
   final gate. Here it is said structurally rather than in a sentence:
   a solid ink bar across the rail, a different shape from the step, a
   different colour, a different relationship to the line — the widest
   contrast the palette has, and it survives greyscale on form alone.

   AN "AS OF" STAMP IS NEW, in both languages. The slide asserts a URL
   and a claim about what is inside a repository, both of which have a
   shelf life, and this project dates such claims.

   ── THREE THINGS THAT FAILED, so they are not retried ────────────────

   These were measured on the neighbouring variation, where the same
   takeaway was drawn as one card beside the statement. All three are
   ways of stretching thin content to fill a frame, and all three make
   it worse:

     1. justify-content: space-between on the card — it broke into
        three islands separated by holes.
     2. flex: 1 on the card's rows — it became a table of single lines
        in 180px cells. A card is an object and an object has a size.
     3. Centring a short statement and a short card in a tall body —
        42% ink extent, which is the exact defect this redesign exists
        to remove, only moved. What fills a frame is giving the columns
        the frame and distributing their own contents.

   A fourth, from the same measurement: a colophon placed at the end of
   a centred stack is centred WITH the stack and leaves a dead band
   under it. It belongs in the foot, which is where the band lives here.

   ── ONE STRING TRAP ──────────────────────────────────────────────────

   THE URL BREAKS AT THE SLASHES, NOT ANYWHERE. The type scale is
   viewport-HEIGHT derived and the frame's max-width is fixed, so at
   1920x1080 and at 1024x768 the URL outgrew its column and
   word-break: break-all split it as "agentic-eng / ineering" — on the
   one string an audience is in the room to photograph. A wbr after each
   slash gives the line breaker a sensible opportunity first;
   overflow-wrap: anywhere is only the floor under it.

   (No backticks anywhere in these comments: this block and the style
   block below sit inside a JS template literal, and one backtick ends
   the string and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's29-close';

/* The tagline is carried as its four clauses rather than as one
   sentence, because the drawing hangs them on itself: three under the
   steps, one on the gate. Same words, same order, no rewording. */
const CONTENT = {
  en: {
    thanks: 'Thank you',
    loop: ['Plan', 'Build', 'Review'],
    clauses: ['Write the plan down.', 'Build in small steps.', 'Have something else read the diff.'],
    gate: 'Agree it.',
    who: 'Dr. Siavash Saki',
    linksLabel: 'Everything from this talk',
    linkTitle: 'The deck and the adoption kit',
    url: 'github.com/siavash-saki/agentic-engineering',
    href: 'https://github.com/siavash-saki/agentic-engineering',
    takeLabel: 'In the repository',
    take: [
      'These slides, in English and German',
      'AGENTS.md with the method, ready to copy into a repo',
      'Templates for the four artifacts, plus a linter that checks them',
    ],
    questions: 'Questions?',
    stamp: 'Link and contents · as of August 2026',
  },
  de: {
    thanks: 'Danke',
    loop: ['Plan', 'Build', 'Review'],
    clauses: ['Plan aufschreiben.', 'In kleinen Schritten bauen.', 'Den Diff von etwas anderem lesen lassen.'],
    gate: 'Freigeben.',
    who: 'Dr. Siavash Saki',
    linksLabel: 'Alles aus diesem Vortrag',
    linkTitle: 'Die Folien und das Adoption-Kit',
    url: 'github.com/siavash-saki/agentic-engineering',
    href: 'https://github.com/siavash-saki/agentic-engineering',
    takeLabel: 'Im Repository',
    take: [
      'Diese Folien, auf Englisch und Deutsch',
      'AGENTS.md mit der Methode, fertig zum Kopieren',
      'Vorlagen für die vier Artefakte, plus ein Linter, der sie prüft',
    ],
    questions: 'Fragen?',
    stamp: 'Link und Inhalte · Stand August 2026',
  },
};

const HUE = ['s-plan', 's-build', 's-review'];

/* The slashes get a wbr so the URL wraps at a path boundary instead of
   mid-word when the column is narrower than the line. */
const urlText = (u) => u.split('/').join('/<wbr>');

class Section29 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-7);
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
          /* Every quantity in the drawing is vh-derived, so the
             proportions hold from a laptop to a hall. */
          --dd: clamp(74px, 10.6vh, 126px);   /* disc diameter */
          --gh: clamp(50px, 7.2vh, 88px);     /* gate bar height */
          --arc: clamp(30px, 5vh, 60px);      /* the return */
        }
        ${TAG} .head { flex: none; }
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        /* The three chapter hues, named as classes and never as literal
           colours — the same three slide 5 taught. */
        ${TAG} .s-plan   { --hue: var(--fg-plan);   --hue-d: var(--fg-plan-d); }
        ${TAG} .s-build  { --hue: var(--fg-build);  --hue-d: var(--fg-build-d); }
        ${TAG} .s-review { --hue: var(--fg-review); --hue-d: var(--fg-review-d); }

        ${TAG} .top {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: var(--ae-space-6); flex-wrap: wrap;
        }
        ${TAG} .thanks {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-display); line-height: 1; letter-spacing: -0.035em;
          color: var(--fg-ink);
        }
        ${TAG} .who {
          margin: 0; font-family: var(--ae-font-head); font-weight: 600;
          font-size: var(--ae-fs-h3); line-height: 1.2; color: var(--fg-ink);
        }

        /* ═══════════ the loop, one last time ═══════════ */
        ${TAG} .spine { position: relative; padding-bottom: var(--arc); }
        ${TAG} .run {
          position: relative; display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: start;
        }
        /* The rail is the machine's plumbing, so it is grey and never a
           chapter hue. cool-gray-300, not the hairline value: a hairline
           is this deck's SEPARATOR strength and this is a line the eye
           travels along. It is also the same grey as the return arc,
           because it is the same line. */
        ${TAG} .rail {
          position: absolute; left: 16.666%; right: 16.666%;
          top: calc(var(--dd) / 2 - 1.5px);
          height: 3px; border-radius: 2px; background: var(--ae-cool-gray-300);
          transform-origin: left center;
          animation: s29-rail 760ms var(--ae-ease) both;
          animation-delay: calc(60ms + 3 * var(--fg-beat));
        }
        @keyframes s29-rail { from { transform: scaleX(0); } }

        ${TAG} .st { text-align: center; padding: 0 var(--ae-space-3); }
        ${TAG} .disc {
          width: var(--dd); height: var(--dd); margin: 0 auto; border-radius: 999px;
          background: var(--hue); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h1); line-height: 1;
          font-variant-numeric: tabular-nums;
          box-shadow: var(--fg-d2);
          position: relative; z-index: 1;
        }
        /* A step name is the one piece of text allowed to carry a hue. */
        ${TAG} .st h2 {
          margin: var(--ae-space-6) 0 0;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: calc(var(--ae-fs-h1) * 1.1); line-height: 1.02; letter-spacing: -0.03em;
          color: var(--hue-d);
        }
        /* The tagline's clauses, as the drawing's labels. */
        ${TAG} .st p {
          margin: var(--ae-space-4) auto 0; max-width: 20ch;
          font-size: calc(var(--ae-fs-lead) * 1.05); line-height: 1.3; color: var(--fg-ink);
        }

        /* A gate is solid ink ACROSS the line — a different shape from
           the step, a different colour, a different relationship to the
           rail, and the widest contrast the palette has. It is the
           deck's most important act, and the fourth clause of the
           tagline is its caption. */
        ${TAG} .gate {
          position: absolute; left: 33.333%; top: 0; z-index: 2;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center;
        }
        ${TAG} .gate .bar {
          margin-top: calc(var(--dd) / 2 - var(--gh) / 2);
          width: clamp(32px, 4.4vh, 52px); height: var(--gh);
          border-radius: 11px; background: var(--fg-ink);
          box-shadow: var(--fg-d2);
        }
        ${TAG} .gate .lab {
          margin-top: var(--ae-space-2); white-space: nowrap;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h4); line-height: 1.2; color: var(--fg-ink);
        }

        /* The return, in CSS borders. Unlabelled and grey, as on slide 5:
           it says the three come round again without restating it. */
        ${TAG} .arc {
          position: absolute; left: 16.666%; right: 16.666%; bottom: 0;
          height: var(--arc);
          border: 1.5px solid var(--ae-cool-gray-300); border-top: 0;
          border-radius: 0 0 16px 16px;
          animation: fg-rise 620ms var(--ae-ease) both;
          animation-delay: calc(60ms + 8 * var(--fg-beat));
        }
        ${TAG} .arc::before {
          content: ''; position: absolute; left: -5.5px; top: -1px;
          border-left: 5.5px solid transparent;
          border-right: 5.5px solid transparent;
          border-bottom: 8px solid var(--ae-cool-gray-300);
        }

        /* ═══════════ the band along the bottom ═══════════ */
        ${TAG} .band {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.25fr) auto;
          column-gap: var(--ae-space-7);
          align-items: start;
          padding-top: var(--ae-space-4);
          border-top: 1px solid var(--fg-hair);
        }
        ${TAG} .lbl { margin: 0 0 var(--ae-space-2); }
        ${TAG} .cap {
          margin: var(--ae-space-2) 0 0;
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }
        /* The one clickable thing in the deck, so it has to look
           clickable from the back of the room. Ink, not the accent: a
           link is not the Build step. */
        ${TAG} .url {
          display: inline-block;
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-small) * 1.02); line-height: 1.3;
          font-weight: 600;
          color: var(--fg-ink);
          overflow-wrap: anywhere;
          text-decoration: underline;
          text-decoration-color: var(--ae-cool-gray-300);
          text-underline-offset: 4px;
          transition: text-decoration-color var(--ae-dur-fast) var(--ae-ease);
        }
        ${TAG} .url:hover, ${TAG} .url:focus-visible { text-decoration-color: var(--fg-ink); }

        /* What is in the repository. Grey square markers: this is the
           machine's plumbing — files in a directory — not a human
           decision, so not ink. */
        ${TAG} .take { margin: 0; padding: 0; list-style: none; }
        ${TAG} .take li {
          display: flex; gap: var(--ae-space-3); align-items: baseline;
          padding: 3px 0;
          font-size: var(--ae-fs-small); line-height: 1.4; color: var(--fg-body);
        }
        ${TAG} .take li::before {
          content: ''; flex: none;
          width: 7px; height: 7px;
          background: var(--ae-cool-gray-300);
          transform: translateY(-1px);
        }

        ${TAG} .q {
          margin: 0; align-self: center; white-space: nowrap;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h2); line-height: 1.1; color: var(--fg-ink);
        }
        ${TAG} .stamp {
          margin: var(--ae-space-3) 0 0;
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          color: var(--fg-faint);
        }

        @media print { ${TAG} .rail, ${TAG} .arc { animation: none !important; } }

        @media (max-width: 900px) {
          ${TAG} .run { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .rail, ${TAG} .arc, ${TAG} .gate { display: none; }
          ${TAG} .spine { padding-bottom: 0; }
          ${TAG} .band { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
        }
      </style>
      <div class="fg-wrap head">
        <div class="top">
          <h1 class="thanks fg-in" style="--fg-at: 1">${t.thanks}</h1>
          <p class="who fg-in" style="--fg-at: 2">${t.who}</p>
        </div>
      </div>
      <div class="fg-wrap body">
        <div class="spine">
          <div class="run">
            <i class="rail" aria-hidden="true"></i>
            ${t.loop.map((s, i) => `
              <div class="st ${HUE[i]} fg-in" style="--fg-at: ${4 + i}">
                <div class="disc">${i + 1}</div>
                <h2>${s}</h2>
                <p>${t.clauses[i]}</p>
              </div>
            `).join('')}
            <div class="gate fg-in" style="--fg-at: 7">
              <i class="bar" aria-hidden="true"></i>
              <span class="lab">${t.gate}</span>
            </div>
          </div>
          <i class="arc" aria-hidden="true"></i>
        </div>
      </div>
      <div class="fg-wrap foot">
        <div class="band">
          <div class="fg-in" style="--fg-at: 9">
            <p class="fg-label lbl">${t.linksLabel}</p>
            <a class="url" href="${t.href}" target="_blank" rel="noreferrer noopener">${urlText(t.url)}</a>
            <p class="cap">${t.linkTitle}</p>
          </div>
          <div class="fg-in" style="--fg-at: 9">
            <p class="fg-label lbl">${t.takeLabel}</p>
            <ul class="take">${t.take.map(x => `<li><span>${x}</span></li>`).join('')}</ul>
          </div>
          <p class="q fg-in" style="--fg-at: 10">${t.questions}</p>
        </div>
        <p class="stamp fg-in" style="--fg-at: 10">${t.stamp}</p>
      </div>
    `;
  }
}

customElements.define(TAG, Section29);
