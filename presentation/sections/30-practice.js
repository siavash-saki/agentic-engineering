/* Section 30 — Agenten in der Praxis
   Montag-morgen-Aktionsplan. Tool-unabhängig formuliert. */

import { getLang } from '../core/i18n.js';

const TAG = 's30-practice';

const CONTENT = {
  en: {
    h1: 'Monday morning — <b>where do you start?</b>',
    lede: `Three concrete moves. Each one fits in a sane block of time —
          and each one pays off from day one.`,
    steps: [
      {
        when:  'Today',
        time:  '15 minutes',
        title: 'Set up Memory',
        body:  'Drop <code>AGENTS.md</code> in your repo root — and symlink <code>CLAUDE.md</code> to it. One file, single source of truth, every tool reads the same bytes. Three sections are plenty:',
        bullets: [
          'Build command &amp; test command',
          'The coding standards you actually enforce',
          '"Always do X" / "Never do Y"',
        ],
      },
      {
        when:  'This week',
        time:  '1 hour',
        title: 'Write your first Skill',
        body:  'Take a recurring task — code-review checklist, release steps, onboarding — and capture it as a Skill:',
        bullets: [
          '<code>.&lt;tool&gt;/skills/&lt;name&gt;/SKILL.md</code>',
          'Call it on demand with <code>/&lt;name&gt;</code>',
          'Auto-loaded by the model when the description fits',
        ],
      },
      {
        when:  'This month',
        time:  'Half a day',
        title: 'Wire up an MCP server',
        body:  'Let the agent talk to the systems you live in — Git platform, docs, semantic code search:',
        bullets: [
          'MCP config in the repo — <code>.mcp.json</code> or <code>.vscode/mcp.json</code>',
          'e.&nbsp;g. <code>git</code>, <code>docs</code>, <code>semantic-code</code>',
          'Vet servers like dependencies — mind the trust boundary',
        ],
      },
    ],
    punch: 'The tools will change. <b>The practice stays.</b>',
  },
  de: {
    h1: 'Montag morgen — <b>was tun?</b>',
    lede: `Drei konkrete Schritte. Jeder davon ist in einer überschaubaren Zeit
          machbar — und jeder davon zahlt sich ab dem ersten Tag aus.`,
    steps: [
      {
        when:  'Heute',
        time:  '15 Minuten',
        title: 'Memory anlegen',
        body:  '<code>AGENTS.md</code> ins Repo-Root legen — und <code>CLAUDE.md</code> als Symlink darauf. Eine Datei, eine Quelle der Wahrheit, jedes Tool liest dieselben Bytes. Drei Abschnitte reichen:',
        bullets: [
          'Build-Befehl &amp; Test-Befehl',
          'Coding-Standards, die ihr wirklich anwendet',
          '„Immer X tun" / „Niemals Y tun"',
        ],
      },
      {
        when:  'Diese Woche',
        time:  '1 Stunde',
        title: 'Ersten Skill schreiben',
        body:  'Eine wiederkehrende Aufgabe — Code-Review-Checkliste, Release-Schritte, Onboarding — als Skill speichern:',
        bullets: [
          '<code>.&lt;tool&gt;/skills/&lt;name&gt;/SKILL.md</code>',
          'Auf Abruf per <code>/&lt;name&gt;</code>',
          'Vom Modell auto-geladen, wenn die Beschreibung passt',
        ],
      },
      {
        when:  'Diesen Monat',
        time:  'Ein halber Tag',
        title: 'MCP-Server konfigurieren',
        body:  'Den Agenten mit euren wichtigsten Systemen reden lassen — Git-Plattform, Doku, semantische Code-Suche:',
        bullets: [
          'MCP-Konfig im Repo — <code>.mcp.json</code> oder <code>.vscode/mcp.json</code>',
          'z.&nbsp;B. <code>git</code>, <code>docs</code>, <code>semantic-code</code>',
          'Server wie Dependencies prüfen — Vertrauensgrenze beachten',
        ],
      },
    ],
    punch: 'Die Werkzeuge ändern sich. <b>Die Praxis bleibt.</b>',
  },
};

class Section30Practice extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h1);
          line-height: var(--ae-lh-h1);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--ae-text);
          max-width: 900px;
          margin: 0 0 var(--ae-space-6);
        }

        /* The deck closes by doing what it preaches: the three steps land
           in their stated time order along a drawn line, and each gets
           checked off after it arrives. The 4px
           accent bar that survived 0002's sweep dies with the old layout. */
        ${TAG} .stepswrap { position: relative; margin-bottom: var(--ae-space-6); }
        ${TAG} .stepswrap .fg-wire {
          position: absolute;
          left: 3%; right: 3%;
          top: calc(-1 * var(--ae-space-4));
          width: 94%;
          height: var(--ae-space-4);
        }
        ${TAG} .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--ae-space-4);
        }
        ${TAG} .step {
          padding: var(--ae-space-5);
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-3);
          position: relative;
        }
        ${TAG} .step .tick {
          position: absolute;
          top: var(--ae-space-4);
          right: var(--ae-space-4);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--fg-mint);
          color: var(--fg-green-d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: var(--ae-fs-caption);
          animation: fg-appear 350ms var(--ae-ease) both;
        }

        ${TAG} .step .when {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--ae-space-3);
          margin-top: 2px;
          /* the check badge owns the card's top-right corner */
          padding-right: 40px;
        }
        ${TAG} .step .when .label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ae-red);
        }
        ${TAG} .step .when .time {
          font-size: var(--ae-fs-caption);
          color: var(--ae-text-muted);
          font-variant-numeric: tabular-nums;
        }
        ${TAG} .step h3 {
          margin: 0;
          font-size: var(--ae-fs-h3);
          line-height: var(--ae-lh-h3);
          color: var(--ae-text-strong);
        }
        ${TAG} .step p {
          margin: 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
        }
        ${TAG} .step ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
        }
        ${TAG} .step li {
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text);
          padding-left: 16px;
          position: relative;
        }
        ${TAG} .step li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--ae-red);
          font-weight: 700;
        }
        ${TAG} code {
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-caption);
          padding: 1px 4px;
          background: var(--ae-bg);
          border-radius: 2px;
          color: var(--ae-text-strong);
        }

        ${TAG} .punch {
          margin: 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--ae-text-strong);
          text-align: center;
        }
        ${TAG} .punch b { color: var(--ae-red); }

        @media (max-width: 1024px) {
          ${TAG} .steps { grid-template-columns: 1fr; }
          ${TAG} h1 { font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="stepswrap">
          <svg class="fg-wire" viewBox="0 0 1200 30" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 8 28 L 8 12 L 596 12 L 604 12 L 1192 12 L 1192 28" style="--fg-at: 3"/>
            <circle cx="8" cy="28" r="3.5" style="--fg-at: 4"/>
            <circle cx="600" cy="12" r="3.5" style="--fg-at: 6"/>
            <circle cx="1192" cy="28" r="3.5" style="--fg-at: 8"/>
          </svg>
          <div class="steps">
            ${t.steps.map((s, i) => `
              <div class="step fg-card fg-hover fg-in" style="--fg-at: ${4 + i * 2}">
                <span class="tick" style="animation-delay: calc(60ms + ${6 + i * 2} * var(--fg-beat))" aria-hidden="true">✓</span>
                <div class="when">
                  <span class="label">${s.when}</span>
                  <span class="time">${s.time}</span>
                </div>
                <h3 class="fg-hover-title">${s.title}</h3>
                <p>${s.body}</p>
                <ul>
                  ${s.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>

        <p class="punch fg-in" style="--fg-at: 12">${t.punch}</p>
      </div>
    `;
  }
}

customElements.define(TAG, Section30Practice);
