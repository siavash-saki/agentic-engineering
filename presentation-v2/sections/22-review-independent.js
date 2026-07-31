/* Section 23 — Who reviews.
   A ladder, not a list: each rung catches what the one below it cannot,
   and the top two are the only ones that catch anything structural. */

import { getLang } from '../core/i18n.js';

const TAG = 's22-review-independent';

const CONTENT = {
  en: {
    h1: 'The session that wrote the code cannot review it',
    lede: `It re-reads its own reasoning and finds it correct, because it is the
           same reasoning. Independence is not a mood; it is a property of who
           is asked.`,
    rungs: [
      { n: '1', t: 'The same session',
        d: 'Typos, and nothing else. It inherits every assumption of the code it just wrote, including the wrong ones.',
        w: 'weak' },
      { n: '2', t: 'A fresh session, same model',
        d: 'The conversational bias is gone. The model family\'s blind spots are not — it will make the same class of mistake reading as it made writing.',
        w: 'weak' },
      { n: '3', t: 'A different model family',
        d: 'Independent failure modes. One model builds, another reads. This is the rung that catches the test that cannot fail.',
        w: 'strong' },
      { n: '4', t: 'A person',
        d: 'The final say on what counts as done — which is a question about intent, and no model has access to yours.',
        w: 'strong' },
    ],
    note: `A second pass from the same model is a <b>separate session</b>, not an
           independent review. Both are worth doing. Only one of them is
           independence.`,
  },
  de: {
    h1: 'Die Session, die den Code geschrieben hat, kann ihn nicht reviewen',
    lede: `Sie liest ihre eigene Argumentation nach und findet sie richtig, weil
           es dieselbe Argumentation ist. Unabhängigkeit ist keine Haltung,
           sondern eine Eigenschaft dessen, wer gefragt wird.`,
    rungs: [
      { n: '1', t: 'Dieselbe Session',
        d: 'Tippfehler, sonst nichts. Sie erbt jede Annahme des Codes, den sie gerade geschrieben hat — auch die falschen.',
        w: 'weak' },
      { n: '2', t: 'Neue Session, gleiches Modell',
        d: 'Die Gesprächsverzerrung ist weg. Die blinden Flecken der Modellfamilie nicht — sie macht beim Lesen denselben Fehlertyp wie beim Schreiben.',
        w: 'weak' },
      { n: '3', t: 'Eine andere Modellfamilie',
        d: 'Unabhängige Fehlermodi. Ein Modell baut, ein anderes liest. Diese Stufe findet den Test, der nicht scheitern kann.',
        w: 'strong' },
      { n: '4', t: 'Ein Mensch',
        d: 'Das letzte Wort darüber, was als fertig gilt — eine Frage nach der Absicht, und auf deine hat kein Modell Zugriff.',
        w: 'strong' },
    ],
    note: `Ein zweiter Durchgang desselben Modells ist eine <b>separate Session</b>,
           kein unabhängiges Review. Beides lohnt sich. Unabhängigkeit ist nur
           eines davon.`,
  },
};

class Section23 extends HTMLElement {
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
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-6); }

        ${TAG} .ladder {
          display: flex;
          flex-direction: column;
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .rung {
          display: grid;
          grid-template-columns: auto minmax(0, 0.9fr) minmax(0, 2fr);
          gap: var(--ae-space-4);
          align-items: baseline;
          padding: var(--ae-space-4) 0;
          border-top: 1px solid var(--fg-hair);
        }
        ${TAG} .rung:last-child { border-bottom: 1px solid var(--fg-hair); }
        ${TAG} .rung h3 {
          margin: 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--fg-muted);
        }
        ${TAG} .rung--strong h3 { color: var(--fg-ink); }
        ${TAG} .rung p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-faint);
        }
        ${TAG} .rung--strong p { color: var(--fg-body); }
        ${TAG} .rung .fg-badge { background: var(--ae-cool-gray-100); color: var(--fg-faint); }
        ${TAG} .rung--strong .fg-badge { background: var(--fg-mint); color: var(--fg-green-d); }

        @media (max-width: 900px) {
          ${TAG} .rung { grid-template-columns: auto minmax(0, 1fr); }
          ${TAG} .rung p { grid-column: 2; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="ladder">
          ${t.rungs.map((r, i) => `
            <div class="rung rung--${r.w} fg-in" style="--fg-at: ${3 + i}">
              <span class="fg-badge">${r.n}</span>
              <h3>${r.t}</h3>
              <p>${r.d}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 8"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section23);
