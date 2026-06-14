/* Section 13 — SDD: Rate-Limiting · Plan (2/3 of the triptych)
   Same template as slide 12 with the crumb's middle segment now active.
   Content lives in a { en, de } map and is selected at render time via getLang(). */

import { getLang } from '../core/i18n.js';

const TAG = 's13-sdd-plan';

const CONTENT = {
  en: {
    eyebrow: 'Example · Rate-Limiting',
    h1: 'Plan — the <b>How</b>',
    crumbSpec: 'Spec',
    crumbPlan: 'Plan',
    crumbTasks: 'Tasks',
    feat: '# Plan: Rate-Limiting',
    approachTitle: '## Approach',
    approach: `Token bucket per token, held in Redis. Runs as middleware in
          front of the router.<br>
          <span class="note">(Decided in Discuss: per token, sliding window.)</span>`,
    orderTitle: '## Sequence',
    order: [
      'Redis connection + config.',
      'Token-bucket middleware.',
      '429 response with Retry-After.',
      'Fail-open behavior on Redis timeout.',
      'Integration tests.',
    ],
    risksTitle: '## Risks',
    risks: [
      `Redis is a single point of failure → fail open on timeout
                (let traffic through rather than lock everyone out).`,
    ],
    filesTitle: '## Affected files',
    files: [
      'middleware/rateLimit.ts',
      'config/redis.ts',
      'tests/rateLimit.integration.test.ts',
    ],
    caption: `The open questions got settled in Discuss. This is where the
          <b>technical decision</b> lives.`,
  },
  de: {
    eyebrow: 'Beispiel · Rate-Limiting',
    h1: 'Plan — das <b>Wie</b>',
    crumbSpec: 'Spec',
    crumbPlan: 'Plan',
    crumbTasks: 'Tasks',
    feat: '# Plan: Rate-Limiting',
    approachTitle: '## Ansatz',
    approach: `Token-Bucket pro Token, gehalten in Redis. Als Middleware vor dem
          Router.<br>
          <span class="note">(Entscheidung aus Discuss: pro Token, Sliding Window.)</span>`,
    orderTitle: '## Reihenfolge',
    order: [
      'Redis-Verbindung + Config.',
      'Token-Bucket-Middleware.',
      '429-Antwort inkl. Retry-After.',
      'Fail-open-Verhalten bei Redis-Timeout.',
      'Integrationstests.',
    ],
    risksTitle: '## Risiken',
    risks: [
      `Redis als Single Point of Failure → bei Timeout fail-open
                (lieber durchlassen als alle aussperren).`,
    ],
    filesTitle: '## Betroffene Dateien',
    files: [
      'middleware/rateLimit.ts',
      'config/redis.ts',
      'tests/rateLimit.integration.test.ts',
    ],
    caption: `Die offenen Fragen sind in Discuss geklärt. Hier ist der Ort für die
          <b>technische Entscheidung</b>.`,
  },
};

class Section13SDD extends HTMLElement {
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
          animation: sdd13-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-4);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: sdd13-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }

        ${TAG} .crumb {
          display: flex;
          align-items: center;
          gap: var(--db-space-2);
          margin: 0 0 var(--db-space-4);
          opacity: 0;
          animation: sdd13-fade 500ms var(--db-ease) 340ms forwards;
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
        ${TAG} .crumb .seg.done {
          color: var(--db-text-strong);
          background: var(--db-bg);
          border-color: var(--db-cool-gray-300, #c8cdd2);
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
          animation: sdd13-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .doc::before {
          content: "plan.md";
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
        ${TAG} .doc p, ${TAG} .doc ul, ${TAG} .doc ol {
          margin: 0 0 var(--db-space-3);
        }
        ${TAG} .doc ul, ${TAG} .doc ol {
          padding-left: 18px;
          list-style: none;
          counter-reset: step;
        }
        ${TAG} .doc li {
          position: relative;
        }
        ${TAG} .doc ul li::before {
          content: "-";
          position: absolute;
          left: -14px;
          color: var(--db-red);
          font-weight: 700;
        }
        ${TAG} .doc ol li {
          counter-increment: step;
        }
        ${TAG} .doc ol li::before {
          content: counter(step) ".";
          position: absolute;
          left: -22px;
          color: var(--db-red);
          font-weight: 700;
        }
        ${TAG} .doc .note {
          color: var(--db-text-muted);
          font-style: italic;
        }

        ${TAG} .caption {
          margin: var(--db-space-4) 0 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          text-align: center;
          opacity: 0;
          animation: sdd13-fade 600ms var(--db-ease) 900ms forwards;
        }
        ${TAG} .caption b { color: var(--db-red); }

        @keyframes sdd13-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>

        <div class="crumb">
          <span class="seg done">${t.crumbSpec}</span>
          <span class="arrow">→</span>
          <span class="seg active">${t.crumbPlan}</span>
          <span class="arrow">→</span>
          <span class="seg">${t.crumbTasks}</span>
        </div>

        <div class="doc">
          <p class="feat">${t.feat}</p>

          <h2>${t.approachTitle}</h2>
          <p>${t.approach}</p>

          <h2>${t.orderTitle}</h2>
          <ol>
            ${t.order.map(o => `<li>${o}</li>`).join('')}
          </ol>

          <h2>${t.risksTitle}</h2>
          <ul>
            ${t.risks.map(r => `<li>${r}</li>`).join('')}
          </ul>

          <h2>${t.filesTitle}</h2>
          <ul>
            ${t.files.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <p class="caption">
          ${t.caption}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section13SDD);
