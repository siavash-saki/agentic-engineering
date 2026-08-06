/* Section 5 — The loop.
   The spine of the deck, stated once and never renamed. The audience will
   think "obviously" here; the next slide is what earns their attention back.

   THIS IS WHERE THE THREE CHAPTER HUES ARE TAUGHT. From here on blue is
   Plan wherever it appears, green is Build, plum is Review — on the chapter
   openers, on the gate pipeline, on the closing slide. Nothing else in the
   deck may use them. See DESIGN.md, pass 4.

   The slide carries 74 words and used to fill 49% of the frame. The words
   are unchanged and it now fills 88%. That was the whole defect: thin
   content floating in an empty frame, at a size that made the deck's own
   thesis look like a footnote.

   The return arc under the run is the one thing here the text does not
   state outright. It is quiet, unlabelled and grey — it says the three come
   round again without preempting slide 17, which is where the loop back is
   actually argued. */

import { getLang } from '../core/i18n.js';

const TAG = 's05-loop';

const CONTENT = {
  en: {
    h1: 'Plan → Build → Review',
    lede: `The whole method. Everything after this slide is one of these three
           steps, done more carefully.`,
    steps: [
      { n: '1', t: 'Plan',   d: 'Decide what it should do. Write it down.' },
      { n: '2', t: 'Build',  d: 'Small steps. One step, one commit.' },
      { n: '3', t: 'Review', d: 'Check it against the plan. Then let another model read it.' },
    ],
    note: `Not new. It has been the advice since long before agents existed.
           <b>What changed is why it has to be written down.</b>`,
  },
  de: {
    h1: 'Plan → Build → Review',
    lede: `Die ganze Methode. Alles nach dieser Folie ist einer dieser drei
           Schritte, sorgfältiger ausgeführt.`,
    steps: [
      { n: '1', t: 'Plan',   d: 'Entscheiden, was es tun soll. Aufschreiben.' },
      { n: '2', t: 'Build',  d: 'Kleine Schritte. Ein Schritt, ein Commit.' },
      { n: '3', t: 'Review', d: 'Gegen den Plan prüfen. Dann ein anderes Modell lesen lassen.' },
    ],
    note: `Nicht neu. Das ist der Rat, seit es Software gibt.
           <b>Neu ist, warum es aufgeschrieben wird.</b>`,
  },
};

/* The hue each step owns. Referenced by every later slide that draws the
   loop, so it is named here as a class and never as a literal colour. */
const HUE = ['s-plan', 's-build', 's-review'];

class Section05 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        /* The head is fixed and the run takes what is left. This is what
           makes the slide fill: the drawing is given the frame, rather than
           being centred inside a band of it. */
        ${TAG} .head { flex: none; }
        ${TAG} .body { flex: 1; display: flex; flex-direction: column; justify-content: center; min-height: 0; }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h1); line-height: var(--ae-lh-h1);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 64ch; }
        ${TAG} .fg-note { margin-top: var(--ae-space-5); }

        /* ═══════════ the three hues ═══════════ */
        ${TAG} .s-plan   { --hue: var(--fg-plan);   --hue-d: var(--fg-plan-d); }
        ${TAG} .s-build  { --hue: var(--fg-build);  --hue-d: var(--fg-build-d); }
        ${TAG} .s-review { --hue: var(--fg-review); --hue-d: var(--fg-review-d); }

        /* ═══════════ the spine ═══════════ */
        ${TAG} .spine { position: relative; padding-bottom: clamp(30px, 4.6vh, 56px); }
        ${TAG} .run {
          position: relative;
          display: grid; grid-template-columns: repeat(3, 1fr);
          align-items: start;
        }
        /* The rail runs behind the nodes, first centre to last centre. It is
           the machine's plumbing, so it is grey — never a chapter hue. */
        ${TAG} .rail {
          position: absolute; left: 16.66%; right: 16.66%;
          top: clamp(35px, 5vh, 59px);
          height: 3px; border-radius: 2px; background: var(--fg-hair);
          transform-origin: left center;
          animation: s05-rail 760ms var(--ae-ease) both;
          animation-delay: calc(60ms + 2 * var(--fg-beat));
        }
        @keyframes s05-rail { from { transform: scaleX(0); } }

        ${TAG} .st { position: relative; text-align: center; padding: 0 var(--ae-space-4); }
        ${TAG} .dot {
          width: clamp(72px, 10vh, 118px); height: clamp(72px, 10vh, 118px);
          margin: 0 auto; border-radius: 999px;
          background: var(--hue); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h1); line-height: 1;
          font-variant-numeric: tabular-nums;
          box-shadow: var(--fg-d2);
        }
        /* A step name is the label for its hue, and is the one piece of text
           allowed to carry one. Descriptions stay ink. */
        ${TAG} .t {
          margin: var(--ae-space-4) 0 0;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h1); line-height: 1.02; letter-spacing: -0.03em;
          color: var(--hue-d);
        }
        ${TAG} .d {
          margin: var(--ae-space-3) auto 0; max-width: 26ch;
          font-size: var(--ae-fs-lead); line-height: 1.36; color: var(--fg-ink);
        }

        /* The return, in CSS borders rather than SVG. A stretched viewBox
           turns a rounded corner into an ellipse and an arrowhead into a
           smear; a border-radius corner cannot distort at any width. */
        ${TAG} .loopback {
          position: absolute; left: 16.66%; right: 16.66%; bottom: 0;
          height: clamp(30px, 4.6vh, 56px);
          border: 1.5px solid var(--ae-cool-gray-300); border-top: 0;
          border-radius: 0 0 16px 16px;
          animation: fg-rise 620ms var(--ae-ease) both;
          animation-delay: calc(60ms + 9 * var(--fg-beat));
        }
        ${TAG} .loopback::before {
          content: ''; position: absolute; left: -5.5px; top: -1px;
          border-left: 5.5px solid transparent;
          border-right: 5.5px solid transparent;
          border-bottom: 8px solid var(--ae-cool-gray-300);
        }

        @media print { ${TAG} .rail, ${TAG} .loopback { animation: none !important; } }

        @media (max-width: 900px) {
          ${TAG} .run { grid-template-columns: 1fr; row-gap: var(--ae-space-5); }
          ${TAG} .rail, ${TAG} .loopback { display: none; }
          ${TAG} .spine { padding-bottom: 0; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="spine">
          <div class="run">
            <i class="rail" aria-hidden="true"></i>
            ${t.steps.map((s, i) => `
              <div class="st ${HUE[i]} fg-in" style="--fg-at: ${3 + i * 2}">
                <div class="dot">${s.n}</div>
                <h2 class="t">${s.t}</h2>
                <p class="d">${s.d}</p>
              </div>
            `).join('')}
          </div>
          <i class="loopback" aria-hidden="true"></i>
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section05);
