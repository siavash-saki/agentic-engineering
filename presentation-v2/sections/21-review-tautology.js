/* Section 22 — The test that cannot fail.
   The exhibit of the chapter. The code is an illustration of a class of
   defect, not a quotation: both sides of the comparison come from the
   same measurement, so the assertion is green for all inputs. */

import { getLang } from '../core/i18n.js';

const TAG = 's21-review-tautology';

const CONTENT = {
  en: {
    h1: 'The test that cannot fail',
    lede: `A regression test, written by an agent, for a bug that had reached
           production once already. It ran green in every pipeline for weeks.`,
    codeLabel: 'The test',
    code: [
      '// the overlay must be gone after the toggle',
      'await page.click(\'[data-testid="overlay-toggle"]\')',
      '',
      'const hidden = await countPixels(page)',
      '',
      'expect(hidden.red).toBeLessThan(hidden.red + 60)',
    ],
    revealLabel: 'What is wrong with it',
    reveal: `Both sides of the comparison come from the same measurement. The
             second one — the overlay while visible — was never taken. The
             assertion is true for every possible value, including the ones the
             bug produces.`,
    chainLabel: 'What it got past',
    chain: [
      'The model that wrote it',
      'A green pipeline, every run',
      'The model that reviewed it',
      'A human who saw a passing suite',
    ],
    note: `A green test proves that the test ran. <b>It does not prove that it
           could have failed.</b> The only way to know is to break the code on
           purpose and watch the test go red first.`,
  },
  de: {
    h1: 'Der Test, der nicht scheitern kann',
    lede: `Ein Regressionstest, geschrieben von einem Agenten, für einen Fehler,
           der es schon einmal in Produktion geschafft hatte. Er lief wochenlang
           in jeder Pipeline grün.`,
    codeLabel: 'Der Test',
    code: [
      '// das Overlay muss nach dem Umschalten weg sein',
      'await page.click(\'[data-testid="overlay-toggle"]\')',
      '',
      'const hidden = await countPixels(page)',
      '',
      'expect(hidden.red).toBeLessThan(hidden.red + 60)',
    ],
    revealLabel: 'Was daran falsch ist',
    reveal: `Beide Seiten des Vergleichs stammen aus derselben Messung. Die
             zweite — das Overlay im sichtbaren Zustand — wurde nie erhoben. Die
             Zusicherung ist für jeden möglichen Wert wahr, auch für die, die
             der Fehler erzeugt.`,
    chainLabel: 'Woran er vorbeikam',
    chain: [
      'Am Modell, das ihn geschrieben hat',
      'An einer grünen Pipeline, in jedem Lauf',
      'Am Modell, das ihn reviewt hat',
      'An einem Menschen, der eine bestandene Suite sah',
    ],
    note: `Ein grüner Test beweist, dass der Test gelaufen ist. <b>Er beweist
           nicht, dass er hätte scheitern können.</b> Sicherheit gibt es nur,
           indem man den Code absichtlich kaputt macht und den Test zuerst rot
           werden sieht.`,
  },
};

class Section22 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-5); }

        ${TAG} .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: var(--ae-space-5);
          align-items: start;
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .lbl { margin-bottom: var(--ae-space-3); }

        /* Near-black panel: the accent switches to its light variant, which
           is the only value that clears contrast on this surface. */
        ${TAG} .code {
          background: #16211C;
          border-radius: var(--ae-radius);
          padding: var(--ae-space-4) var(--ae-space-5);
        }
        ${TAG} .code pre {
          margin: 0;
          white-space: pre-wrap;
          font-size: calc(var(--ae-fs-small) * 0.92);
          line-height: 1.65;
          color: #E6EDE8;
        }
        ${TAG} .code .cm { color: var(--fg-green-light); }
        ${TAG} .code .hot {
          color: #fff;
          background: rgba(180, 85, 44, .55);
          border-radius: 3px;
          padding: 1px 3px;
        }

        ${TAG} .reveal p:not(.fg-label) {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        ${TAG} .chain { margin-top: var(--ae-space-5); }
        ${TAG} .chain ul { margin: 0; padding: 0; list-style: none; }
        ${TAG} .chain li {
          display: flex;
          gap: var(--ae-space-3);
          align-items: baseline;
          padding: var(--ae-space-2) 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-ink);
          border-bottom: 1px solid var(--fg-hair);
        }
        ${TAG} .chain li:last-child { border-bottom: 0; }
        ${TAG} .chain li::before {
          content: '✓';
          flex: none;
          color: var(--ae-error);
          font-weight: 700;
        }

        @media (max-width: 1000px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="grid">
          <div class="fg-in" style="--fg-at: 3">
            <p class="fg-label lbl">${t.codeLabel}</p>
            <div class="code">
              <pre><span class="cm">${t.code[0]}</span>
${t.code[1]}
${t.code[2]}
${t.code[3]}
${t.code[4]}
expect(<span class="hot">hidden.red</span>).toBeLessThan(<span class="hot">hidden.red</span> + 60)</pre>
            </div>
          </div>

          <div class="fg-in" style="--fg-at: 4">
            <div class="reveal">
              <p class="fg-label lbl">${t.revealLabel}</p>
              <p>${t.reveal}</p>
            </div>
            <div class="chain">
              <p class="fg-label lbl">${t.chainLabel}</p>
              <ul>
                ${t.chain.map((c, i) => `<li class="fg-in" style="--fg-at: ${5 + i}">${c}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 10"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section22);
