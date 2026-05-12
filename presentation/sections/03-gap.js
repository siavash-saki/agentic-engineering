/* Section 3 — Die Fähigkeitslücke
   Zugriff zu einem Modell ist nicht dasselbe wie Wert daraus zu ziehen.
   Drei Failure-Modes nebeneinander. */

const TAG = 's03-gap';

const FAILURES = [
  {
    quote: '„Funktioniert auf meiner Maschine."',
    title: 'Das Modell rät',
    body:  'Es kennt euren Build, eure Stage-Umgebung, eure Logs nicht — und antwortet trotzdem mit voller Überzeugung.',
  },
  {
    quote: '„Sieht plausibel aus."',
    title: 'Der Code halluziniert',
    body:  'Importiert ein Paket, das es nicht gibt. Ruft eine Funktion auf, die seit zwei Versionen entfernt wurde.',
  },
  {
    quote: '„Klingt überzeugend."',
    title: 'Die Standards sind erfunden',
    body:  'Erfundene Coding-Standards. Erfundener Genehmigungsprozess. Plausibel formuliert — ohne Bezug zu eurer Realität.',
  },
];

class Section03 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--db-space-7) var(--db-gutter);
          background: var(--db-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-4);
          opacity: 0;
          animation: s03-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-5);
          font-size: var(--db-fs-h1);
          line-height: var(--db-lh-h1);
          opacity: 0;
          animation: s03-fade 600ms var(--db-ease) 220ms forwards;
        }
        ${TAG} h1 .neq {
          color: var(--db-red);
          font-weight: 900;
          padding: 0 8px;
        }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-7);
          opacity: 0;
          animation: s03-fade 600ms var(--db-ease) 380ms forwards;
        }
        ${TAG} .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-5);
          margin-bottom: var(--db-space-6);
        }
        ${TAG} .card {
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-5);
          border-top: 4px solid var(--db-red);
          opacity: 0;
          transform: translateY(12px);
          animation: s03-rise 600ms var(--db-ease) forwards;
        }
        ${TAG} .card:nth-child(1) { animation-delay: 600ms; }
        ${TAG} .card:nth-child(2) { animation-delay: 740ms; }
        ${TAG} .card:nth-child(3) { animation-delay: 880ms; }
        ${TAG} .card .quote {
          font-size: var(--db-fs-lead);
          line-height: 1.35;
          font-weight: 700;
          color: var(--db-text-strong);
          font-style: italic;
          margin: 0 0 var(--db-space-4);
        }
        ${TAG} .card .verdict {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-red);
          margin-bottom: var(--db-space-2);
        }
        ${TAG} .card p {
          margin: 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
        }
        ${TAG} .punch {
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          font-weight: 700;
          color: var(--db-text-strong);
          max-width: 820px;
          opacity: 0;
          animation: s03-fade 600ms var(--db-ease) 1100ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes s03-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s03-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          ${TAG} .cards { grid-template-columns: 1fr; }
          ${TAG} h1 { font-size: var(--db-fs-h2); line-height: var(--db-lh-h2); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Die Fähigkeitslücke</span>
        <h1>Zugriff<span class="neq">≠</span>Mehrwert</h1>
        <p class="lede">
          Die meisten von uns haben heute einen Coding-Agenten installiert. Wenige
          bekommen damit verlässlich Arbeit erledigt. Die Lücke liegt nicht im
          Modell — sondern darin, wie wir es verwenden.
        </p>
        <div class="cards">
          ${FAILURES.map(f => `
            <div class="card">
              <p class="quote">${f.quote}</p>
              <div class="verdict">${f.title}</div>
              <p>${f.body}</p>
            </div>
          `).join('')}
        </div>
        <p class="punch">
          Das Modell ist nicht das Problem.
          <b>Die Art, wie wir es einsetzen, ist es.</b>
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section03);
