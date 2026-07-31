/* Section 20 — Against the plan.
   A real table, with one row deliberately not passing. The pending row is
   the content: a record that says "not verified" truthfully is worth more
   than one that says "pass" convincingly. */

import { getLang } from '../core/i18n.js';

const TAG = 's19-review-against';

const CONTENT = {
  en: {
    h1: 'Walk the criteria, one row at a time',
    lede: `The acceptance criteria from the plan, each with what was actually
           done to check it. The evidence column is the slide — a verdict with
           nothing next to it is an opinion.`,
    cols: ['Acceptance criterion', 'Evidence', ''],
    rows: [
      { c: 'Requests over the limit return 429 with Retry-After',
        e: 'Integration test: 101st request in the window; asserts status and header value',
        v: 'pass' },
      { c: 'The limit is per API key, not per IP',
        e: 'Test: two keys from one IP, both served; one key from two IPs, second rejected',
        v: 'pass' },
      { c: 'Internal service calls are exempt',
        e: 'Test drives the internal path with the header present and absent',
        v: 'pass' },
      { c: 'Counters survive a process restart',
        e: 'Not tested. Restart behaviour depends on the shared cache; no test drives it',
        v: 'pending' },
    ],
    verdicts: { pass: 'Pass', pending: 'Not verified' },
    note: `Four rows, three passes, one honest gap. <b>The gap is the useful
           output.</b> Nobody would have found it by asking whether the feature
           works.`,
  },
  de: {
    h1: 'Die Kriterien durchgehen, Zeile für Zeile',
    lede: `Die Akzeptanzkriterien aus dem Plan, je mit dem, was tatsächlich zur
           Prüfung getan wurde. Die Belegspalte ist der Inhalt dieser Folie —
           ein Urteil ohne Beleg ist eine Meinung.`,
    cols: ['Akzeptanzkriterium', 'Beleg', ''],
    rows: [
      { c: 'Requests über dem Limit liefern 429 mit Retry-After',
        e: 'Integrationstest: 101. Request im Fenster; prüft Status und Header-Wert',
        v: 'pass' },
      { c: 'Das Limit gilt pro API-Key, nicht pro IP',
        e: 'Test: zwei Keys von einer IP, beide bedient; ein Key von zwei IPs, zweiter abgelehnt',
        v: 'pass' },
      { c: 'Interne Service-Aufrufe sind ausgenommen',
        e: 'Test fährt den internen Pfad mit und ohne den Header',
        v: 'pass' },
      { c: 'Zähler überstehen einen Prozess-Neustart',
        e: 'Nicht getestet. Das Neustartverhalten hängt am gemeinsamen Cache; kein Test fährt es',
        v: 'pending' },
    ],
    verdicts: { pass: 'Bestanden', pending: 'Nicht geprüft' },
    note: `Vier Zeilen, drei bestanden, eine ehrliche Lücke. <b>Die Lücke ist das
           nützliche Ergebnis.</b> Über die Frage, ob das Feature funktioniert,
           hätte sie niemand gefunden.`,
  },
};

class Section20 extends HTMLElement {
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

        ${TAG} .tbl { margin-bottom: var(--ae-space-5); overflow-x: auto; }
        ${TAG} table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
        }
        ${TAG} th {
          text-align: left;
          font-family: var(--ae-font);
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--fg-faint);
          padding: 0 var(--ae-space-4) var(--ae-space-2) 0;
          border-bottom: 1px solid var(--fg-hair);
        }
        ${TAG} td {
          padding: var(--ae-space-3) var(--ae-space-4) var(--ae-space-3) 0;
          border-bottom: 1px solid var(--fg-hair);
          vertical-align: top;
          color: var(--fg-body);
        }
        ${TAG} td.c { color: var(--fg-ink); font-weight: 500; width: 34%; }
        ${TAG} td.e { color: var(--fg-muted); }
        ${TAG} td.v { padding-right: 0; text-align: right; white-space: nowrap; }
        ${TAG} tr:last-child td { border-bottom: 0; }
        ${TAG} tr.is-pending td { background: var(--ae-cool-gray-100); }

        ${TAG} .vd {
          display: inline-block;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
        }
        ${TAG} .vd--pass    { background: var(--fg-mint); color: var(--fg-green-d); }
        ${TAG} .vd--pending { background: transparent; color: var(--ae-error); border: 1.5px solid var(--ae-error); }

        @media (max-width: 900px) {
          ${TAG} td.c { width: auto; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="tbl fg-card fg-in" style="--fg-at: 3">
          <table>
            <thead>
              <tr>${t.cols.map(c => `<th>${c}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${t.rows.map((r, i) => `
                <tr class="${r.v === 'pending' ? 'is-pending' : ''}">
                  <td class="c">${r.c}</td>
                  <td class="e">${r.e}</td>
                  <td class="v"><span class="vd vd--${r.v}">${t.verdicts[r.v]}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 8"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section20);
