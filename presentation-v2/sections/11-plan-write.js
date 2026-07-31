/* Section 12 — What the plan holds.
   Two columns, and one worked line showing the same requirement written
   as behaviour and as mechanism. The second version is the one that
   makes review impossible, which is why it is on the slide. */

import { getLang } from '../core/i18n.js';

const TAG = 's11-plan-write';

const CONTENT = {
  en: {
    h1: 'What goes in the file',
    lede: `A plan describes behaviour. The moment it describes mechanism, it has
           made the decisions the model would have made better — and review has
           lost the yardstick it was supposed to hold.`,
    holdsLabel: 'It holds',
    holds: [
      'The context: what exists today, and what is changing',
      'What the system should do, in the user\'s terms',
      'Acceptance criteria — checkable, one line each',
      'What is explicitly out of scope',
      'Open questions, if any are still open',
    ],
    neverLabel: 'It never holds',
    never: [
      'Function names or signatures',
      'Code, or pseudo-code',
      'Which file a change goes in, line by line',
      'The data structure the model should pick',
    ],
    exLabel: 'The same requirement, twice',
    good: 'Requests over the limit are rejected with 429 and a Retry-After header giving the seconds until the window resets.',
    goodTag: 'Behaviour — checkable, and the how stays open',
    bad: 'Add a checkLimit() call at the top of handleRequest() that reads the counter from Redis and throws RateLimitError.',
    badTag: 'Mechanism — three decisions made, none of them checkable',
    note: `If the file is getting long, it has started describing the
           implementation. <b>Length is the symptom, not the problem.</b>`,
  },
  de: {
    h1: 'Was in die Datei gehört',
    lede: `Ein Plan beschreibt Verhalten. Sobald er Mechanik beschreibt, hat er
           Entscheidungen getroffen, die das Modell besser getroffen hätte — und
           dem Review fehlt der Maßstab, den es halten sollte.`,
    holdsLabel: 'Er enthält',
    holds: [
      'Den Kontext: was heute existiert und was sich ändert',
      'Was das System tun soll, in der Sprache der Nutzung',
      'Akzeptanzkriterien — prüfbar, je eine Zeile',
      'Was ausdrücklich nicht dazugehört',
      'Offene Fragen, falls noch welche offen sind',
    ],
    neverLabel: 'Er enthält nie',
    never: [
      'Funktionsnamen oder Signaturen',
      'Code oder Pseudo-Code',
      'In welche Datei eine Änderung gehört, Zeile für Zeile',
      'Die Datenstruktur, die das Modell wählen soll',
    ],
    exLabel: 'Dieselbe Anforderung, zweimal',
    good: 'Requests über dem Limit werden mit 429 abgelehnt, mit einem Retry-After-Header, der die Sekunden bis zum Fensterwechsel angibt.',
    goodTag: 'Verhalten — prüfbar, und das Wie bleibt offen',
    bad: 'Füge oben in handleRequest() einen checkLimit()-Aufruf ein, der den Zähler aus Redis liest und RateLimitError wirft.',
    badTag: 'Mechanik — drei Entscheidungen getroffen, keine davon prüfbar',
    note: `Wird die Datei lang, beschreibt sie inzwischen die Implementierung.
           <b>Die Länge ist das Symptom, nicht das Problem.</b>`,
  },
};

class Section12 extends HTMLElement {
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

        ${TAG} .cols {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-5);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .cols ul { margin: var(--ae-space-3) 0 0; padding: 0; list-style: none; }
        ${TAG} .cols li {
          display: flex;
          gap: var(--ae-space-3);
          align-items: baseline;
          padding: 3px 0;
          font-size: var(--ae-fs-small);
          line-height: 1.4;
          color: var(--fg-body);
        }
        ${TAG} .cols li::before {
          content: '';
          flex: none;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--fg-green);
          transform: translateY(-2px);
        }
        ${TAG} .never li::before { background: var(--ae-cool-gray-300); }

        ${TAG} .ex { margin-bottom: var(--ae-space-5); }
        ${TAG} .ex .lbl { margin-bottom: var(--ae-space-3); }
        ${TAG} .ex .pair {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-4);
        }
        ${TAG} .ex .box { padding: var(--ae-space-4); border-radius: var(--ae-radius); }
        ${TAG} .ex .box--good { background: var(--fg-mint); }
        ${TAG} .ex .box--bad  { background: var(--ae-cool-gray-100); }
        ${TAG} .ex .txt {
          margin: 0 0 var(--ae-space-2);
          font-size: calc(var(--ae-fs-small) * 0.96);
          line-height: 1.5;
          color: var(--fg-ink);
        }
        ${TAG} .ex .box--bad .txt { color: var(--fg-muted); }
        ${TAG} .ex .tag {
          margin: 0;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          color: var(--fg-green-d);
        }
        ${TAG} .ex .box--bad .tag { color: var(--fg-faint); }

        @media (max-width: 960px) {
          ${TAG} .cols, ${TAG} .ex .pair { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="cols">
          <div class="fg-card fg-hover fg-in" style="--fg-at: 3">
            <h3 class="fg-card__title fg-hover-title">${t.holdsLabel}</h3>
            <ul>${t.holds.map(h => `<li>${h}</li>`).join('')}</ul>
          </div>
          <div class="fg-card fg-hover never fg-in" style="--fg-at: 4">
            <h3 class="fg-card__title fg-hover-title">${t.neverLabel}</h3>
            <ul>${t.never.map(n => `<li>${n}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="ex fg-in" style="--fg-at: 6">
          <p class="fg-label lbl">${t.exLabel}</p>
          <div class="pair">
            <div class="box box--good fg-in" style="--fg-at: 7">
              <p class="txt fg-source">${t.good}</p>
              <p class="tag">${t.goodTag}</p>
            </div>
            <div class="box box--bad fg-in" style="--fg-at: 8">
              <p class="txt fg-source">${t.bad}</p>
              <p class="tag">${t.badTag}</p>
            </div>
          </div>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 10"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section12);
