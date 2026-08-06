/* Section 6 — What the loop buys you.
   One claim, three short consequences, one line of cost.

   The lede is a BOUNDARY claim — what is written, and everything else —
   so the slide draws it as one page with a line across. Above the line,
   ink: you decided it. Below, dashed clay: the model will, plausibly and
   silently. The three consequences annotate the ink half rather than
   standing on their own as three peers, because they are not three facts;
   they are three things that follow from where the line sits.

   NO CHAPTER HUE APPEARS HERE, deliberately. Slide 5 has just taught blue,
   green and plum, and this slide is not about a step of the loop — it is
   about a single distinction. Two marks only: ink for what you wrote, clay
   for what you left. That restraint is what stops the palette becoming
   confetti two slides after it is introduced. See DESIGN.md, pass 4.

   Dashed, not merely clay: the hue and the broken line are one distinction,
   and in greyscale the dashes are the half that survives. */

import { getLang } from '../core/i18n.js';

const TAG = 's06-changed';

const CONTENT = {
  en: {
    h1: 'Why it is <span class="fg-mark fg-mark--sweep">written down</span>',
    lede: `The agent reads only what is written. Everything that is not written,
           it decides itself.`,
    yours:  { t: 'What you wrote',  s: 'You decided it' },
    theirs: { t: 'What you did not', s: 'It decides, plausibly and silently' },
    divider: 'the line you choose',
    points: [
      { n: '1', t: 'No guessing',      d: 'Every blank you leave, the model fills in — plausibly, and silently.' },
      { n: '2', t: 'No drifting',      d: 'It builds against a written plan, not against its memory of the chat.' },
      { n: '3', t: 'You can check it', d: 'You did not write the code, so you need a yardstick. The plan is the yardstick.' },
    ],
    priceword: 'The price',
    price: 'one conversation before the first line of code.',
  },
  de: {
    h1: 'Warum es <span class="fg-mark fg-mark--sweep">aufgeschrieben</span> wird',
    lede: `Der Agent liest nur, was dasteht. Alles, was nicht dasteht,
           entscheidet er selbst.`,
    yours:  { t: 'Was du geschrieben hast',      s: 'Du hast entschieden' },
    theirs: { t: 'Was du nicht geschrieben hast', s: 'Er entscheidet, plausibel und lautlos' },
    divider: 'die Linie, die du wählst',
    points: [
      { n: '1', t: 'Kein Raten',          d: 'Jede Lücke, die du lässt, füllt das Modell — plausibel und lautlos.' },
      { n: '2', t: 'Kein Abdriften',      d: 'Er baut gegen einen geschriebenen Plan, nicht gegen sein Gedächtnis vom Chat.' },
      { n: '3', t: 'Du kannst es prüfen', d: 'Der Code stammt nicht von dir, also brauchst du einen Maßstab. Der Plan ist der Maßstab.' },
    ],
    priceword: 'Der Preis',
    price: 'ein Gespräch vor der ersten Zeile Code.',
  },
};

class Section06 extends HTMLElement {
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
        ${TAG} .body { flex: none; display: flex; flex-direction: column; justify-content: center; min-height: 0; }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h1); line-height: var(--ae-lh-h1); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 66ch; }

        ${TAG} .board {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          column-gap: var(--ae-space-7);
          align-items: center;
        }

        /* ═══════════ the page ═══════════ */
        ${TAG} .page {
          border-radius: var(--ae-radius-md); overflow: hidden;
          border: 1px solid var(--fg-hair);
          background: var(--fg-card); box-shadow: var(--fg-d2);
        }
        ${TAG} .zone { padding: var(--ae-space-6); }
        ${TAG} .zone .lab {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: var(--ae-space-3); margin-bottom: var(--ae-space-4);
        }
        ${TAG} .zone .lab b {
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h3); line-height: 1.1;
        }
        ${TAG} .zone .lab span { font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption); }
        ${TAG} .zone i { display: block; height: 11px; border-radius: 5px; margin-bottom: 12px; }

        ${TAG} .zone--yours b { color: var(--fg-ink); }
        ${TAG} .zone--yours .lab span { color: var(--fg-muted); }
        ${TAG} .zone--yours i { background: var(--fg-ink); opacity: 0.85; }
        ${TAG} .zone--yours i:nth-of-type(2) { width: 92%; }
        ${TAG} .zone--yours i:nth-of-type(3) { width: 74%; }

        /* The divider IS the argument, so it is the heaviest mark on the
           slide and it is labelled. Ink, because where the line sits is a
           human decision and the human is the one thing not coloured. */
        ${TAG} .divider { position: relative; height: 0; border-top: 2.5px solid var(--fg-ink); }
        ${TAG} .divider span {
          position: absolute; left: 50%; top: 0; transform: translate(-50%, -50%);
          padding: 3px 12px; border-radius: 999px;
          background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 600; white-space: nowrap;
        }

        ${TAG} .zone--theirs { background: var(--fg-fail-tint); }
        ${TAG} .zone--theirs b { color: var(--fg-fail-d); }
        ${TAG} .zone--theirs .lab span { color: var(--fg-fail-d); }
        ${TAG} .zone--theirs i {
          height: 0; border-top: 2px dashed var(--fg-fail);
          border-radius: 0; margin-bottom: 14px; opacity: 0.85;
        }
        ${TAG} .zone--theirs i:nth-of-type(2) { width: 84%; }
        ${TAG} .zone--theirs i:nth-of-type(3) { width: 95%; }

        /* ═══════════ what it buys ═══════════ */
        ${TAG} .gains { display: grid; row-gap: var(--ae-space-6); }
        ${TAG} .g {
          display: grid; grid-template-columns: auto 1fr;
          column-gap: var(--ae-space-4); align-items: start;
        }
        ${TAG} .g .num {
          display: flex; align-items: center; justify-content: center; flex: none;
          width: 34px; height: 34px; border-radius: 999px;
          background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font); font-size: 13px; font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .g .t {
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h2); line-height: 1.12; color: var(--fg-ink);
        }
        ${TAG} .g .d {
          margin: 7px 0 0;
          font-size: var(--ae-fs-lead); line-height: 1.4; color: var(--fg-body);
        }

        /* ═══════════ the price ═══════════
           Not a footnote in grey: it is the slide's one concession and it
           reads at lede size, with the word "price" as its own label. */
        ${TAG} .cost {
          display: inline-flex; align-items: baseline; gap: var(--ae-space-3);
          font-size: var(--ae-fs-lead); line-height: 1.3; color: var(--fg-ink);
        }
        ${TAG} .cost .tagword {
          flex: none;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--fg-faint);
        }

        @media (max-width: 900px) {
          ${TAG} .board { grid-template-columns: 1fr; row-gap: var(--ae-space-6); }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="board">
          <div class="page fg-in" style="--fg-at: 3">
            <div class="zone zone--yours">
              <div class="lab"><b>${t.yours.t}</b><span>${t.yours.s}</span></div>
              <i></i><i></i><i></i>
            </div>
            <div class="divider"><span>${t.divider}</span></div>
            <div class="zone zone--theirs">
              <div class="lab"><b>${t.theirs.t}</b><span>${t.theirs.s}</span></div>
              <i></i><i></i><i></i>
            </div>
          </div>
          <div class="gains">
            ${t.points.map((p, i) => `
              <div class="g fg-in" style="--fg-at: ${4 + i}">
                <span class="num">${p.n}</span>
                <div>
                  <span class="t">${p.t}</span>
                  <p class="d">${p.d}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="cost fg-in" style="--fg-at: 8">
          <span class="tagword">${t.priceword}</span><span>${t.price}</span>
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section06);
