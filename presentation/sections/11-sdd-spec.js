/* Section 11 — SDD: Rate-Limiting · Spec (1/4 of the quadriptych)
   Persistent crumb at top shows the four artifacts. The next three slides
   reuse the same template with the active segment shifted right. The doc
   mock carries real YAML frontmatter (versioning + provenance) so it reads
   as an actual artifact, not a slide prop. */

import { getLang } from '../core/i18n.js';

const TAG = 's11-sdd-spec';

const CONTENT = {
  en: {
    h1: 'Spec — the <b>What</b>',
    segs: ['Spec', 'Plan', 'Tasks', 'Verification'],
    fm: [
      'artifact: spec',
      'version: 2',
      'status: approved',
      'authoring_tool: claude-code',
      'model: Fable 5',
      'reasoning_effort: High',
    ],
    feat: '# Feature: Rate limiting for the public search API',
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
    caption: `Not a word about Redis, middleware or algorithm. Only <b>behavior</b> —
          plus a version and the provenance of who wrote it.`,
  },
  de: {
    h1: 'Spec — das <b>Was</b>',
    segs: ['Spec', 'Plan', 'Tasks', 'Verification'],
    fm: [
      'artifact: spec',
      'version: 2',
      'status: approved',
      'authoring_tool: claude-code',
      'model: Fable 5',
      'reasoning_effort: High',
    ],
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
    caption: `Kein Wort über Redis, Middleware oder Algorithmus. Nur <b>Verhalten</b> —
          plus Version und Provenienz des Autors.`,
  },
};

class Section11SDD extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }

        ${TAG} .crumb {
          display: flex;
          align-items: center;
          gap: var(--ae-space-2);
          margin: 0 0 var(--ae-space-3);
        }
        ${TAG} .crumb .seg {
          font-size: var(--ae-fs-small);
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1.5px solid var(--ae-cool-gray-200);
          color: var(--ae-text-muted);
          background: var(--ae-bg);
        }
        ${TAG} .crumb .seg.active {
          background: var(--ae-red);
          border-color: var(--ae-red);
          color: #fff;
        }
        ${TAG} .crumb .arrow {
          color: var(--ae-cool-gray-400);
          font-weight: 700;
        }

        /* The artifact as the paper document it is: white card, hairline
           edge, one card depth — and it writes itself in, section by
           section, top to bottom. */
        ${TAG} .doc {
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          box-shadow: var(--fg-d1);
          border-radius: var(--ae-radius-md);
          padding: var(--ae-space-3) var(--ae-space-5);
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-caption) * 0.96);
          line-height: 1.5;
          color: var(--ae-text-strong);
          position: relative;
        }
        ${TAG} .doc::before {
          content: "sdd/0007-rate-limiting/spec.md";
          position: absolute;
          top: -10px;
          left: 16px;
          background: var(--ae-red);
          color: #fff;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 3px;
        }

        ${TAG} .doc .fm {
          border-bottom: 1px solid var(--ae-cool-gray-200);
          padding-bottom: var(--ae-space-2);
          margin-bottom: var(--ae-space-3);
          color: var(--ae-text-muted);
          font-size: var(--ae-fs-caption);
          line-height: 1.5;
        }
        ${TAG} .doc .fm .fence { color: var(--ae-cool-gray-400); }
        ${TAG} .doc .fm .keys {
          columns: 2;
          column-gap: var(--ae-space-6);
        }
        ${TAG} .doc .fm .keys div { break-inside: avoid; }

        ${TAG} .doc h2 {
          margin: var(--ae-space-3) 0 4px;
          font-size: calc(var(--ae-fs-caption) * 0.96);
          font-weight: 700;
          color: var(--ae-red);
          font-family: inherit;
        }
        ${TAG} .doc .feat {
          font-size: var(--ae-fs-small);
          font-weight: 700;
          color: var(--ae-text-strong);
          margin: 0 0 var(--ae-space-2);
        }
        ${TAG} .doc p, ${TAG} .doc ul {
          margin: 0 0 var(--ae-space-2);
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
          color: var(--ae-red);
          font-weight: 700;
        }

        ${TAG} .caption {
          margin: var(--ae-space-3) 0 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
          text-align: center;
        }
        ${TAG} .caption b { color: var(--ae-red); }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>

        <div class="crumb fg-in" style="--fg-at: 2">
          ${t.segs.map((s, i) => `
            <span class="seg ${i === 0 ? 'active' : ''}">${s}</span>
            ${i < t.segs.length - 1 ? '<span class="arrow">→</span>' : ''}
          `).join('')}
        </div>

        <div class="doc fg-source fg-in" style="--fg-at: 3">
          <div class="fm fg-in" style="--fg-at: 4">
            <div class="fence">---</div>
            <div class="keys">
              ${t.fm.map(l => `<div>${l}</div>`).join('')}
            </div>
            <div class="fence">---</div>
          </div>

          <p class="feat fg-in" style="--fg-at: 5">${t.feat}</p>

          <div class="fg-in" style="--fg-at: 6">
            <h2>${t.contextH}</h2>
            <p>${t.contextP}</p>
          </div>

          <div class="fg-in" style="--fg-at: 7">
            <h2>${t.acceptH}</h2>
            <ul>
              ${t.accept.map(li => `<li>${li}</li>`).join('\n            ')}
            </ul>
          </div>

          <div class="fg-in" style="--fg-at: 8">
            <h2>${t.successH}</h2>
            <ul>
              ${t.success.map(li => `<li>${li}</li>`).join('\n            ')}
            </ul>
          </div>

          <div class="fg-in" style="--fg-at: 9">
            <h2>${t.scopeH}</h2>
            <ul>
              ${t.scope.map(li => `<li>${li}</li>`).join('\n            ')}
            </ul>
          </div>

          <div class="fg-in" style="--fg-at: 10">
            <h2>${t.openH}</h2>
            <ul>
              ${t.open.map(li => `<li>${li}</li>`).join('\n            ')}
            </ul>
          </div>
        </div>

        <p class="caption fg-in" style="--fg-at: 11">
          ${t.caption}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section11SDD);
