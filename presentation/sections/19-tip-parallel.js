/* Tip 2 — Parallele Sessions
   Visualization: three session windows side by side, each with its own
   independent "thinking" pulse and a single distinct task. Below, the
   anti-pattern: one chaotic window with everything mixed. */

import { getLang } from '../core/i18n.js';

const TAG = 's19-tip-parallel';

const CONTENT = {
  en: {
    eyebrow: 'Tip 2',
    h1: 'One session per <b>mental context</b>',
    lede: `Independent tasks belong in separate sessions or Subagents.
          Mix them and the conversations blur — and so do the answers.`,
    sessions: [
      { tag: 'Session A', title: 'Auth bug', ctx: 'JWT expires after 30 s' },
      { tag: 'Session B', title: 'Search refactor', ctx: 'Elasticsearch → Meilisearch' },
      { tag: 'Session C', title: 'CI pipeline', ctx: 'Builds take 18 min' },
    ],
    antiLabel: 'Anti-pattern',
    antiStrike: 'One session for everything',
    antiText: `— contexts bleed together and the agent answers
            with the wrong code.`,
    punch: 'Working in parallel means <b>thinking in parallel</b>.',
  },
  de: {
    eyebrow: 'Tip 2',
    h1: 'Eine Session pro <b>Mental-Kontext</b>',
    lede: `Unabhängige Aufgaben gehören in separate Sessions oder Subagenten.
          Sonst verschwimmen die Konversationen — und mit ihnen die Antworten.`,
    sessions: [
      { tag: 'Session A', title: 'Auth-Bug', ctx: 'JWT läuft nach 30 s ab' },
      { tag: 'Session B', title: 'Search-Refactor', ctx: 'Elasticsearch → Meilisearch' },
      { tag: 'Session C', title: 'CI-Pipeline', ctx: 'Builds dauern 18 min' },
    ],
    antiLabel: 'Anti-Pattern',
    antiStrike: 'Eine Session für alles',
    antiText: `— Kontexte vermischen sich, der Agent
            beantwortet Fragen mit dem falschen Code.`,
    punch: 'Parallel arbeiten heißt: <b>parallel denken</b>.',
  },
};

class SectionTip02 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
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
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red); font-size: var(--db-fs-h4); letter-spacing: 0.04em; font-weight: 900;
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: tip02-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip02-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: tip02-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .sessions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-4);
          margin-bottom: var(--db-space-5);
        }
        ${TAG} .session {
          background: var(--db-cool-gray-100);
          border-top: 4px solid var(--db-red);
          border-radius: 0 0 var(--db-radius) var(--db-radius);
          padding: var(--db-space-4);
          min-height: 200px;
          display: flex;
          flex-direction: column;
          gap: var(--db-space-3);
          opacity: 0;
          transform: translateY(12px);
          animation: tip02-rise 500ms var(--db-ease) forwards;
        }
        ${TAG} .session:nth-child(1) { animation-delay: 500ms; }
        ${TAG} .session:nth-child(2) { animation-delay: 700ms; }
        ${TAG} .session:nth-child(3) { animation-delay: 900ms; }
        ${TAG} .session .tag {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-red);
        }
        ${TAG} .session h3 {
          margin: 0;
          font-size: var(--db-fs-h5);
          line-height: var(--db-lh-h5);
          color: var(--db-text-strong);
        }
        ${TAG} .session .ctx {
          font-size: var(--db-fs-small);
          line-height: 1.4;
          color: var(--db-text-muted);
          font-style: italic;
        }
        ${TAG} .session .dots {
          margin-top: auto;
          display: flex;
          gap: 6px;
          align-items: center;
        }
        ${TAG} .session .dots span {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--db-red);
          opacity: 0.3;
        }
        ${TAG} .session:nth-child(1) .dots span { animation: tip02-think 1400ms ease-in-out infinite; }
        ${TAG} .session:nth-child(1) .dots span:nth-child(2) { animation-delay: 200ms; }
        ${TAG} .session:nth-child(1) .dots span:nth-child(3) { animation-delay: 400ms; }
        ${TAG} .session:nth-child(2) .dots span { animation: tip02-think 1100ms ease-in-out infinite; }
        ${TAG} .session:nth-child(2) .dots span:nth-child(2) { animation-delay: 160ms; }
        ${TAG} .session:nth-child(2) .dots span:nth-child(3) { animation-delay: 320ms; }
        ${TAG} .session:nth-child(3) .dots span { animation: tip02-think 1700ms ease-in-out infinite; }
        ${TAG} .session:nth-child(3) .dots span:nth-child(2) { animation-delay: 260ms; }
        ${TAG} .session:nth-child(3) .dots span:nth-child(3) { animation-delay: 520ms; }

        ${TAG} .anti {
          margin-top: var(--db-space-2);
          padding: var(--db-space-3) var(--db-space-4);
          border: 1px dashed var(--db-cool-gray-400);
          border-radius: var(--db-radius);
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text-muted);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--db-space-3);
          align-items: center;
          opacity: 0;
          animation: tip02-fade 500ms var(--db-ease) 1300ms forwards;
        }
        ${TAG} .anti .label {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-muted);
        }
        ${TAG} .anti .mess {
          color: var(--db-text);
        }
        ${TAG} .anti .mess s { color: var(--db-cool-gray-400); }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip02-fade 600ms var(--db-ease) 1600ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip02-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip02-rise {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip02-think {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50%      { opacity: 1;    transform: translateY(-3px); }
        }

        @media (max-width: 900px) {
          ${TAG} .sessions { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>
        <p class="lede">
          ${t.lede}
        </p>

        <div class="sessions">
          <div class="session">
            <div class="tag">${t.sessions[0].tag}</div>
            <h3>${t.sessions[0].title}</h3>
            <div class="ctx">${t.sessions[0].ctx}</div>
            <div class="dots"><span></span><span></span><span></span></div>
          </div>
          <div class="session">
            <div class="tag">${t.sessions[1].tag}</div>
            <h3>${t.sessions[1].title}</h3>
            <div class="ctx">${t.sessions[1].ctx}</div>
            <div class="dots"><span></span><span></span><span></span></div>
          </div>
          <div class="session">
            <div class="tag">${t.sessions[2].tag}</div>
            <h3>${t.sessions[2].title}</h3>
            <div class="ctx">${t.sessions[2].ctx}</div>
            <div class="dots"><span></span><span></span><span></span></div>
          </div>
        </div>

        <div class="anti">
          <span class="label">${t.antiLabel}</span>
          <span class="mess">
            <s>${t.antiStrike}</s> ${t.antiText}
          </span>
        </div>

        <p class="punch">
          ${t.punch}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip02);
