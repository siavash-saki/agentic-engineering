/* Tip 8 — Projekt-Regeln schreiben & pflegen
   Visualization: a rules file at the top broadcasts its rules to three
   sessions below. A new rule fades in late to show that the file grows
   with the project — harvested from corrections, not invented up front. */

import { getLang } from '../core/i18n.js';

const TAG = 's27-tip-rules';

const CONTENT = {
  en: {
    h1: 'Project rules, <b>kept alive</b>',
    lede: `The best rules aren't invented up front — they're harvested from
          corrections. Every time you steer the agent, ask: which sentence in
          the rules file would have made that unnecessary?`,
    newBadge: 'NEW',
    rules: [
      { text: 'Tests before implementation',         neu: false },
      { text: 'No mocks in integration tests',       neu: false },
      { text: 'Database: migration with rollback',   neu: false },
      { text: 'Logging: structured, no print()',     neu: false },
      { text: 'Feature flag for every migration',    neu: true  },
    ],
    sessions: [
      { who: 'Session A',  what: 'Auth refactor',       applied: 'Tests first' },
      { who: 'Session B',  what: 'Search API',          applied: 'Structured log' },
      { who: 'Session C',  what: 'Reports migration',   applied: 'With rollback' },
    ],
  },
  de: {
    h1: 'Projekt-Regeln, <b>lebendig gehalten</b>',
    lede: `Die besten Regeln entstehen nicht am Reißbrett — sie werden aus
          Korrekturen geerntet. Bei jeder Korrektur die Frage: Welcher Satz in
          der Regel-Datei hätte sie überflüssig gemacht?`,
    newBadge: 'NEU',
    rules: [
      { text: 'Tests vor Implementierung',           neu: false },
      { text: 'Keine Mocks im Integrationstest',     neu: false },
      { text: 'Datenbank: Migration mit Rollback',   neu: false },
      { text: 'Logging: strukturiert, kein print()', neu: false },
      { text: 'Feature-Flag für jede Migration',     neu: true  },
    ],
    sessions: [
      { who: 'Session A',  what: 'Auth-Refactoring',    applied: 'Tests zuerst' },
      { who: 'Session B',  what: 'Search-API',          applied: 'Strukturiertes Log' },
      { who: 'Session C',  what: 'Reports-Migration',   applied: 'Mit Rollback' },
    ],
  },
};

class SectionTip08 extends HTMLElement {
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
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--ae-text);
          max-width: 860px;
          margin: 0 0 var(--ae-space-5);
        }

        /* The rules file as the paper it is, broadcasting to the sessions
           below over drawn beams. */
        ${TAG} .rules-file {
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          box-shadow: var(--fg-d1);
          border-radius: var(--ae-radius-md);
          padding: var(--ae-space-4) var(--ae-space-5);
          position: relative;
          margin: 0 auto var(--ae-space-5);
          max-width: 640px;
        }
        ${TAG} .rules-file::before {
          content: "AGENTS.md · CLAUDE.md · .cursor/rules";
          position: absolute;
          top: -10px; left: 16px;
          background: var(--ae-red);
          color: #fff;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 3px;
        }
        ${TAG} .rules-file ul {
          margin: 8px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 6px;
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-small);
          line-height: 1.5;
        }
        ${TAG} .rules-file li {
          position: relative;
          padding-left: 18px;
          color: var(--ae-text-strong);
          animation: fg-appear 300ms var(--ae-ease) both;
        }
        ${TAG} .rules-file li::before {
          content: "-";
          position: absolute;
          left: 4px;
          color: var(--ae-red);
          font-weight: 700;
        }
        ${TAG} .rules-file li:nth-child(1) { animation-delay: 440ms; }
        ${TAG} .rules-file li:nth-child(2) { animation-delay: 530ms; }
        ${TAG} .rules-file li:nth-child(3) { animation-delay: 620ms; }
        ${TAG} .rules-file li:nth-child(4) { animation-delay: 710ms; }
        ${TAG} .rules-file li.neu          { animation-delay: 1400ms; }
        ${TAG} .rules-file li .neu-badge {
          display: inline-block;
          margin-left: 8px;
          padding: 1px 6px;
          /* a badge is prose — it does not inherit the file's code face */
          font-family: var(--ae-font);
          background: var(--ae-red);
          color: #fff;
          font-size: var(--ae-fs-caption);
          letter-spacing: 0.04em;
          font-weight: 700;
          border-radius: 3px;
          vertical-align: 1px;
          animation: fg-appear 300ms var(--ae-ease) 1550ms both;
        }

        ${TAG} .flow-lines {
          position: relative;
          height: 30px;
        }
        ${TAG} .flow-lines svg {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
        }

        ${TAG} .sessions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--ae-space-3);
        }
        ${TAG} .session {
          padding: var(--ae-space-3) var(--ae-space-4);
          display: grid;
          gap: 6px;
        }
        ${TAG} .session .who {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-text-muted);
        }
        ${TAG} .session .what {
          font-size: var(--ae-fs-body);
          font-weight: 700;
          color: var(--ae-text-strong);
        }
        ${TAG} .session .applied {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: var(--ae-fs-small);
          color: var(--ae-red);
          font-weight: 700;
          animation: fg-appear 350ms var(--ae-ease) both;
        }
        ${TAG} .session .applied::before {
          content: "✓";
          font-weight: 900;
        }
        ${TAG} .session:nth-child(1) .applied { animation-delay: 1150ms; }
        ${TAG} .session:nth-child(2) .applied { animation-delay: 1230ms; }
        ${TAG} .session:nth-child(3) .applied { animation-delay: 1310ms; }

        @media (max-width: 860px) {
          ${TAG} .sessions { grid-template-columns: 1fr; }
          ${TAG} .flow-lines { display: none; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">8</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="rules-file fg-source fg-in" style="--fg-at: 3">
          <ul>
            ${t.rules.map(r => `<li class="${r.neu ? 'neu' : ''}">${r.text}${r.neu ? `<span class="neu-badge">${t.newBadge}</span>` : ''}</li>`).join('')}
          </ul>
        </div>

        <div class="flow-lines" aria-hidden="true">
          <svg class="fg-wire" viewBox="0 0 600 30" preserveAspectRatio="none">
            <path pathLength="100" d="M 300 0 C 300 10, 100 10, 100 30" style="--fg-at: 7"></path>
            <path pathLength="100" d="M 300 0 L 300 30" style="--fg-at: 7"></path>
            <path pathLength="100" d="M 300 0 C 300 10, 500 10, 500 30" style="--fg-at: 7"></path>
          </svg>
        </div>

        <div class="sessions">
          ${t.sessions.map((s, i) => `
            <div class="session fg-card fg-hover fg-in" style="--fg-at: ${8 + i}">
              <div class="who">${s.who}</div>
              <div class="what">${s.what}</div>
              <div class="applied">${s.applied}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip08);
