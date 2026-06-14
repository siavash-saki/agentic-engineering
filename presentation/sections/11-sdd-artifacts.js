/* Section 11 — SDD: the three-artifact comparison table
   The formal version of slide 10's metaphor. Same content the docs use
   under "Drei Artefakte: Spec, Plan, Tasks". */

const TAG = 's11-sdd-artifacts';

const ROWS = [
  {
    file:    'specs/&lt;feature&gt;.md',
    level:   'Was / Warum',
    answers: 'Was soll das System tun?',
    content: 'Kontext, Akzeptanzkriterien, Erfolgskriterien, Out of Scope. <b>Keine Implementierung.</b>',
  },
  {
    file:    'plan.md',
    level:   'Wie',
    answers: 'Wie bauen wir das?',
    content: 'Ansatz, Architektur, Reihenfolge, Risiken, betroffene Dateien.',
  },
  {
    file:    'tasks.md',
    level:   'Schritte',
    answers: 'In welcher Reihenfolge, konkret?',
    content: 'Flache, einzeln abhakbare Aufgabenliste.',
  },
];

class Section11SDD extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--db-space-6) var(--db-gutter);
          background: var(--db-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: sdd11-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: sdd11-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 940px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: sdd11-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} table {
          width: 100%;
          border-collapse: collapse;
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius-md);
          overflow: hidden;
          opacity: 0;
          animation: sdd11-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} thead th {
          text-align: left;
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-subtle);
          padding: var(--db-space-3) var(--db-space-4);
          border-bottom: 2px solid var(--db-red);
          background: var(--db-bg);
        }
        ${TAG} tbody td {
          padding: var(--db-space-4);
          vertical-align: top;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          border-bottom: 1px solid var(--db-cool-gray-200);
        }
        ${TAG} tbody tr:last-child td { border-bottom: none; }
        ${TAG} tbody tr {
          opacity: 0;
          transform: translateX(-12px);
        }
        ${TAG} tbody tr:nth-child(1) { animation: sdd11-slide 500ms var(--db-ease) 700ms forwards; }
        ${TAG} tbody tr:nth-child(2) { animation: sdd11-slide 500ms var(--db-ease) 850ms forwards; }
        ${TAG} tbody tr:nth-child(3) { animation: sdd11-slide 500ms var(--db-ease) 1000ms forwards; }

        ${TAG} td.file {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          color: var(--db-text-strong);
          font-weight: 700;
          white-space: nowrap;
        }
        ${TAG} td.level {
          font-weight: 700;
          color: var(--db-red);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-size: var(--db-fs-small);
          white-space: nowrap;
        }
        ${TAG} td.answers {
          font-style: italic;
          color: var(--db-text-strong);
        }
        ${TAG} td.content b { color: var(--db-text-strong); font-weight: 700; }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: sdd11-fade 600ms var(--db-ease) 1300ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes sdd11-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sdd11-slide {
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 900px) {
          ${TAG} thead { display: none; }
          ${TAG} tbody td { display: block; padding: 8px var(--db-space-4); }
          ${TAG} tbody tr td:first-child { padding-top: var(--db-space-4); }
          ${TAG} tbody tr td:last-child  { padding-bottom: var(--db-space-4); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Drei Artefakte</span>
        <h1>Was steht <b>wo</b> drin?</h1>
        <p class="lede">
          Spec ≠ Plan. Die reifen SDD-Toolchains (GitHub Spec Kit, Claude Code,
          Amazon Kiro) sind alle auf dieselbe Trennung in drei Ebenen zugelaufen
          — Was, Wie, Schritt.
        </p>

        <table>
          <thead>
            <tr>
              <th>Datei</th>
              <th>Ebene</th>
              <th>Beantwortet</th>
              <th>Inhalt</th>
            </tr>
          </thead>
          <tbody>
            ${ROWS.map(r => `
              <tr>
                <td class="file">${r.file}</td>
                <td class="level">${r.level}</td>
                <td class="answers">${r.answers}</td>
                <td class="content">${r.content}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <p class="punch">
          Spec bleibt implementierungsfrei — <b>damit</b> der Plan Raum für das „Wie" hat.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section11SDD);
