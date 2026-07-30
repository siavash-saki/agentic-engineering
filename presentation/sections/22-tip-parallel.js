/* Tip 3 — Parallele Sessions
   Visualization: three session windows side by side, each with its own
   independent "thinking" pulse and a single distinct task. Below, the
   anti-pattern: one chaotic window with everything mixed. */

import { getLang } from '../core/i18n.js';

const TAG = 's22-tip-parallel';

const CONTENT = {
  en: {
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
  },
  de: {
    h1: 'Eine Session pro <b>Kontext</b>',
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
  },
};

class SectionTip03 extends HTMLElement {
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
          max-width: 820px;
          margin: 0 0 var(--ae-space-6);
        }

        ${TAG} .sessions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--ae-space-4);
          margin-bottom: var(--ae-space-5);
        }
        /* Each session is a real window: title bar, hairline, its own
           independent pulse. The three pulses beating out of phase ARE the
           slide's visualization of parallel work — reviewed as one motif. */
        ${TAG} .session {
          padding: 0;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        ${TAG} .session .bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px var(--ae-space-4);
          border-bottom: 1px solid var(--fg-hair);
          background: var(--ae-cool-gray-100);
        }
        ${TAG} .session .bar i {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--fg-hair);
        }
        ${TAG} .session .bar .tag { margin-left: 8px; }
        ${TAG} .session .inner {
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-3);
          padding: var(--ae-space-4);
          flex: 1;
        }
        ${TAG} .session .tag {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-red);
        }
        ${TAG} .session h3 {
          margin: 0;
          font-size: var(--ae-fs-h5);
          line-height: var(--ae-lh-h5);
          color: var(--ae-text-strong);
        }
        ${TAG} .session .ctx {
          font-size: var(--ae-fs-small);
          line-height: 1.4;
          color: var(--ae-text-muted);
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
          background: var(--ae-red);
          opacity: 0.3;
        }
        ${TAG} .session:nth-child(1) .dots span { animation: tip03-think 1400ms ease-in-out infinite; }
        ${TAG} .session:nth-child(1) .dots span:nth-child(2) { animation-delay: 200ms; }
        ${TAG} .session:nth-child(1) .dots span:nth-child(3) { animation-delay: 400ms; }
        ${TAG} .session:nth-child(2) .dots span { animation: tip03-think 1100ms ease-in-out infinite; }
        ${TAG} .session:nth-child(2) .dots span:nth-child(2) { animation-delay: 160ms; }
        ${TAG} .session:nth-child(2) .dots span:nth-child(3) { animation-delay: 320ms; }
        ${TAG} .session:nth-child(3) .dots span { animation: tip03-think 1700ms ease-in-out infinite; }
        ${TAG} .session:nth-child(3) .dots span:nth-child(2) { animation-delay: 260ms; }
        ${TAG} .session:nth-child(3) .dots span:nth-child(3) { animation-delay: 520ms; }

        ${TAG} .anti {
          margin-top: var(--ae-space-2);
          padding: var(--ae-space-3) var(--ae-space-4);
          border: 1px dashed var(--ae-cool-gray-400);
          border-radius: var(--ae-radius);
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text-muted);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--ae-space-3);
          align-items: center;
        }
        ${TAG} .anti .label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-text-muted);
        }
        ${TAG} .anti .mess {
          color: var(--ae-text);
        }
        ${TAG} .anti .mess s { color: var(--ae-cool-gray-400); }

        @keyframes tip03-think {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50%      { opacity: 1;    transform: translateY(-3px); }
        }

        @media (max-width: 900px) {
          ${TAG} .sessions { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">3</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="sessions">
          ${t.sessions.map((s, i) => `
            <div class="session fg-card fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="bar"><i></i><i></i><i></i><span class="tag">${s.tag}</span></div>
              <div class="inner">
                <h3 class="fg-hover-title">${s.title}</h3>
                <div class="ctx">${s.ctx}</div>
                <div class="dots"><span></span><span></span><span></span></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="anti fg-in" style="--fg-at: 8">
          <span class="label">${t.antiLabel}</span>
          <span class="mess">
            <s>${t.antiStrike}</s> ${t.antiText}
          </span>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip03);
