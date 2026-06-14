/* Section 12 — SDD: Rate-Limiting · Spec (1/3 of the triptych)
   Persistent crumb at top shows the trio. The next two slides reuse the
   same template with the active segment shifted right. Content lives in a
   { en, de } map and is selected at render time via getLang(). */

import { getLang } from '../core/i18n.js';

const TAG = 's12-sdd-spec';

const CONTENT = {
  en: {
    eyebrow: 'Example · Rate-Limiting',
    h1: 'Spec — the <b>What</b>',
    segSpec: 'Spec',
    segPlan: 'Plan',
    segTasks: 'Tasks',
    feat: '# Feature: Rate-limiting for the public search API',
    contextH: '## Context',
    contextP: `The <code>/search</code> endpoint is publicly reachable and a few
          clients are hammering it. We need abuse protection that never locks
          out legitimate users.`,
    acceptH: '## Acceptance criteria',
    accept: [
      `Given a client under the limit, when it sends a request,
                then the API responds normally (200).`,
      `Given a client over 100 requests/minute, when it sends one more
                request, then the API responds with 429 and a
                Retry-After header.`,
    ],
    successH: '## Success criteria',
    success: [
      'Added latency p99 &lt; 5 ms.',
      'Zero false positives for legitimate clients in the sample.',
    ],
    scopeH: '## Out of scope',
    scope: [
      'Per-endpoint differentiated limits.',
      'Billing.',
    ],
    openH: '## Open questions',
    open: [
      'Limit per token or per IP?',
      'Sliding window or fixed window?',
    ],
    caption: `Not a word about Redis, middleware or algorithm. Only <b>behavior</b>.`,
  },
  de: {
    eyebrow: 'Beispiel · Rate-Limiting',
    h1: 'Spec — das <b>Was</b>',
    segSpec: 'Spec',
    segPlan: 'Plan',
    segTasks: 'Tasks',
    feat: '# Feature: Rate-Limiting für die öffentliche Such-API',
    contextH: '## Kontext',
    contextP: `Der Endpoint <code>/search</code> ist öffentlich erreichbar und wird
          von einzelnen Clients überlastet. Wir brauchen Missbrauchsschutz, ohne
          legitime Nutzer auszusperren.`,
    acceptH: '## Akzeptanzkriterien',
    accept: [
      `Gegeben ein Client unter dem Limit, wenn er einen Request sendet,
                dann antwortet die API normal (200).`,
      `Gegeben ein Client über 100 Requests/Minute, wenn er einen weiteren
                Request sendet, dann antwortet die API mit 429 und einem
                Retry-After-Header.`,
    ],
    successH: '## Erfolgskriterien',
    success: [
      'Zusätzliche Latenz p99 &lt; 5 ms.',
      'Keine False Positives für legitime Clients in der Stichprobe.',
    ],
    scopeH: '## Out of Scope',
    scope: [
      'Pro-Endpoint differenzierte Limits.',
      'Abrechnung / Billing.',
    ],
    openH: '## Offene Fragen',
    open: [
      'Limit pro Token oder pro IP?',
      'Sliding Window oder Fixed Window?',
    ],
    caption: `Kein Wort über Redis, Middleware oder Algorithmus. Nur <b>Verhalten</b>.`,
  },
};

class Section12SDD extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--db-space-5) var(--db-gutter);
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
          margin-bottom: var(--db-space-2);
          opacity: 0;
          animation: sdd12-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-4);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: sdd12-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }

        ${TAG} .crumb {
          display: flex;
          align-items: center;
          gap: var(--db-space-2);
          margin: 0 0 var(--db-space-4);
          opacity: 0;
          animation: sdd12-fade 500ms var(--db-ease) 340ms forwards;
        }
        ${TAG} .crumb .seg {
          font-size: var(--db-fs-small);
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1.5px solid var(--db-cool-gray-200);
          color: var(--db-text-muted);
          background: var(--db-bg);
        }
        ${TAG} .crumb .seg.active {
          background: var(--db-red);
          border-color: var(--db-red);
          color: #fff;
        }
        ${TAG} .crumb .arrow {
          color: var(--db-cool-gray-400);
          font-weight: 700;
        }

        ${TAG} .doc {
          background: var(--db-cool-gray-100);
          border-left: 4px solid var(--db-red);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          padding: var(--db-space-4) var(--db-space-5);
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          line-height: 1.65;
          color: var(--db-text-strong);
          position: relative;
          opacity: 0;
          animation: sdd12-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .doc::before {
          content: "specs/rate-limiting.md";
          position: absolute;
          top: -10px;
          left: 16px;
          background: var(--db-red);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 3px;
        }
        ${TAG} .doc h2 {
          margin: var(--db-space-3) 0 4px;
          font-size: 13px;
          font-weight: 700;
          color: var(--db-red);
          font-family: inherit;
        }
        ${TAG} .doc h2:first-of-type { margin-top: 0; }
        ${TAG} .doc .feat {
          font-size: 14px;
          font-weight: 700;
          color: var(--db-text-strong);
          margin: 0 0 var(--db-space-3);
        }
        ${TAG} .doc p, ${TAG} .doc ul {
          margin: 0 0 var(--db-space-3);
        }
        ${TAG} .doc ul {
          padding-left: 18px;
          list-style: none;
        }
        ${TAG} .doc li {
          position: relative;
          padding-left: 0;
        }
        ${TAG} .doc li::before {
          content: "-";
          position: absolute;
          left: -14px;
          color: var(--db-red);
          font-weight: 700;
        }

        ${TAG} .caption {
          margin: var(--db-space-4) 0 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          text-align: center;
          opacity: 0;
          animation: sdd12-fade 600ms var(--db-ease) 900ms forwards;
        }
        ${TAG} .caption b { color: var(--db-red); }

        @keyframes sdd12-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>

        <div class="crumb">
          <span class="seg active">${t.segSpec}</span>
          <span class="arrow">→</span>
          <span class="seg">${t.segPlan}</span>
          <span class="arrow">→</span>
          <span class="seg">${t.segTasks}</span>
        </div>

        <div class="doc">
          <p class="feat">${t.feat}</p>

          <h2>${t.contextH}</h2>
          <p>${t.contextP}</p>

          <h2>${t.acceptH}</h2>
          <ul>
            ${t.accept.map(li => `<li>${li}</li>`).join('\n            ')}
          </ul>

          <h2>${t.successH}</h2>
          <ul>
            ${t.success.map(li => `<li>${li}</li>`).join('\n            ')}
          </ul>

          <h2>${t.scopeH}</h2>
          <ul>
            ${t.scope.map(li => `<li>${li}</li>`).join('\n            ')}
          </ul>

          <h2>${t.openH}</h2>
          <ul>
            ${t.open.map(li => `<li>${li}</li>`).join('\n            ')}
          </ul>
        </div>

        <p class="caption">
          ${t.caption}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section12SDD);
