/* Section 24 — What the second reader is for.
   Four classes, each one a thing the author of the code structurally
   cannot see. Named so they can be asked for by name, which is what
   turns "please review this" into a usable instruction. */

import { getLang } from '../core/i18n.js';

const TAG = 's23-review-diff';

const CONTENT = {
  en: {
    h1: 'Four things the author cannot see',
    lede: `A second model reading the diff is cheap and takes minutes. These are
           the classes it finds that the writing model does not, because
           checking them means doubting your own work.`,
    classes: [
      { t: 'A check that cannot fail',
        d: 'Both sides of a comparison from the same source. An absence asserted against a payload that never held the value. Anything called a regression test with no named defect it was seen to catch.' },
      { t: 'A claim the evidence does not support',
        d: 'A criterion marked done in terms its own evidence does not entail. Look hardest at criteria with an "and" in them.' },
      { t: 'A citation that resolves to nothing',
        d: 'A referenced file, test, commit or command that does not exist. Agents cite fluently and are not embarrassed by a dead path.' },
      { t: 'A defect in the measurement',
        d: 'The benchmark, the harness, the counting window. A harness is code too, and a wrong number is presented with exactly the same confidence as a right one.' },
    ],
    practiceLabel: 'And two rules around it',
    practice: [
      { t: 'Read the diff yourself', d: 'Every one, including your own agent\'s. Especially your own agent\'s — that is the one you are inclined to skim.' },
      { t: 'Findings are input, not orders', d: 'Adopt what stands up, decline the rest and say why. Cap it at two rounds, then decide.' },
    ],
  },
  de: {
    h1: 'Vier Dinge, die der Autor nicht sehen kann',
    lede: `Ein zweites Modell, das den Diff liest, kostet wenig und dauert
           Minuten. Das sind die Klassen, die es findet und das schreibende
           Modell nicht — weil ihre Prüfung bedeutet, an der eigenen Arbeit zu
           zweifeln.`,
    classes: [
      { t: 'Eine Prüfung, die nicht scheitern kann',
        d: 'Beide Seiten eines Vergleichs aus derselben Quelle. Eine Abwesenheit geprüft an einer Antwort, die den Wert nie enthielt. Alles, was Regressionstest heißt, ohne benannten Defekt, an dem es rot wurde.' },
      { t: 'Eine Aussage, die ihr Beleg nicht trägt',
        d: 'Ein Kriterium als erledigt markiert in Worten, die sein eigener Beleg nicht hergibt. Am genauesten dort hinsehen, wo ein „und" im Kriterium steht.' },
      { t: 'Ein Verweis, der ins Leere geht',
        d: 'Eine referenzierte Datei, ein Test, ein Commit, ein Kommando, das es nicht gibt. Agenten zitieren flüssig und stören sich nicht an einem toten Pfad.' },
      { t: 'Ein Defekt in der Messung',
        d: 'Der Benchmark, das Harness, das Zählfenster. Ein Harness ist auch Code, und eine falsche Zahl wird mit genau derselben Sicherheit präsentiert wie eine richtige.' },
    ],
    practiceLabel: 'Und zwei Regeln drumherum',
    practice: [
      { t: 'Den Diff selbst lesen', d: 'Jeden, auch den des eigenen Agenten. Gerade den des eigenen Agenten — das ist der, den man überfliegt.' },
      { t: 'Befunde sind Input, keine Befehle', d: 'Übernehmen, was standhält, den Rest begründet ablehnen. Nach zwei Runden entscheiden.' },
    ],
  },
};

class Section24 extends HTMLElement {
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

        ${TAG} .classes {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--ae-space-4);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .cl { display: flex; flex-direction: column; gap: var(--ae-space-2); }
        ${TAG} .cl h3 {
          margin: 0;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .cl p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        ${TAG} .practice .lbl { margin-bottom: var(--ae-space-3); }
        ${TAG} .practice .items {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-5);
        }
        ${TAG} .practice h3 {
          margin: 0 0 2px;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-green-d);
        }
        ${TAG} .practice p:not(.fg-label) {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        @media (max-width: 1100px) {
          ${TAG} .classes { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 700px) {
          ${TAG} .classes, ${TAG} .practice .items { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="classes">
          ${t.classes.map((c, i) => `
            <div class="cl fg-card fg-hover fg-in" style="--fg-at: ${3 + i}">
              <h3 class="fg-hover-title">${c.t}</h3>
              <p>${c.d}</p>
            </div>
          `).join('')}
        </div>

        <div class="practice fg-in" style="--fg-at: 8">
          <p class="fg-label lbl">${t.practiceLabel}</p>
          <div class="items">
            ${t.practice.map((p, i) => `
              <div class="fg-in" style="--fg-at: ${9 + i}">
                <h3>${p.t}</h3>
                <p>${p.d}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section24);
