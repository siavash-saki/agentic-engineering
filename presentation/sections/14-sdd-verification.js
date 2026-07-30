/* Section 14 — SDD: Rate-Limiting · Verification (4/4 of the quadriptych)
   The Proof: evidence per acceptance criterion, written in Review. One row
   is honestly PENDING — that's the point of the closing line. */

import { getLang } from '../core/i18n.js';

const TAG = 's14-sdd-verification';

const CONTENT = {
  en: {
    h1: 'Verification — the <b>Proof</b>',
    segs: ['Spec', 'Plan', 'Tasks', 'Verification'],
    fm: [
      'artifact: verification',
      'version: 1',
      'status: final',
      'authoring_tool: claude-code',
      'model: Fable 5',
      'reasoning_effort: Medium',
    ],
    feat: '# Verification: Rate limiting',
    thCrit: 'Criterion',
    thEvidence: 'Evidence',
    thResult: 'Result',
    rows: [
      {
        crit: 'Under the limit → 200',
        evidence: 'Integration test: sustained 60 req/min — every response 200',
        result: 'PASS', pass: true,
      },
      {
        crit: 'Over the limit → 429 + Retry-After',
        evidence: 'Integration test: 101st request in the window → 429, Retry-After: 12 s',
        result: 'PASS', pass: true,
      },
      {
        crit: 'Added latency p99 < 5 ms',
        evidence: 'Load test, 1 h sample: p99 +3.1 ms',
        result: 'PASS', pass: true,
      },
      {
        crit: 'Zero false positives in the sample',
        evidence: 'Production-sample replay not yet run',
        result: 'PENDING', pass: false,
      },
    ],
    checksLabel: '## Automated checks',
    checks: 'Types ✓ · Lint ✓ · Unit 214 ✓ · Integration 12 ✓',
    punch: `A record that says <b>PENDING</b> truthfully is worth more than one
          that says <b>PASS</b> convincingly.`,
  },
  de: {
    h1: 'Verification — der <b>Beweis</b>',
    segs: ['Spec', 'Plan', 'Tasks', 'Verification'],
    fm: [
      'artifact: verification',
      'version: 1',
      'status: final',
      'authoring_tool: claude-code',
      'model: Fable 5',
      'reasoning_effort: Medium',
    ],
    feat: '# Verification: Rate-Limiting',
    thCrit: 'Kriterium',
    thEvidence: 'Evidenz',
    thResult: 'Ergebnis',
    rows: [
      {
        crit: 'Unter dem Limit → 200',
        evidence: 'Integrationstest: konstant 60 Req/min — jede Antwort 200',
        result: 'PASS', pass: true,
      },
      {
        crit: 'Über dem Limit → 429 + Retry-After',
        evidence: 'Integrationstest: 101. Request im Fenster → 429, Retry-After: 12 s',
        result: 'PASS', pass: true,
      },
      {
        crit: 'Zusätzliche Latenz p99 < 5 ms',
        evidence: 'Lasttest, 1-h-Stichprobe: p99 +3,1 ms',
        result: 'PASS', pass: true,
      },
      {
        crit: 'Keine False Positives in der Stichprobe',
        evidence: 'Replay der Produktions-Stichprobe steht noch aus',
        result: 'PENDING', pass: false,
      },
    ],
    checksLabel: '## Automatisierte Checks',
    checks: 'Types ✓ · Lint ✓ · Unit 214 ✓ · Integration 12 ✓',
    punch: `Ein ehrliches <b>PENDING</b> ist mehr wert als ein überzeugendes
          <b>PASS</b>.`,
  },
};

class Section14SDD extends HTMLElement {
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
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }

        ${TAG} .crumb {
          display: flex;
          align-items: center;
          gap: var(--ae-space-2);
          margin: 0 0 var(--ae-space-4);
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
        ${TAG} .crumb .seg.done {
          color: var(--ae-text-strong);
          background: var(--ae-bg);
          border-color: var(--ae-cool-gray-300, #c8cdd2);
        }
        ${TAG} .crumb .arrow {
          color: var(--ae-cool-gray-400);
          font-weight: 700;
        }

        /* The artifact as the paper document it is — white card, hairline
           edge, one depth; the evidence rows land one at a time. */
        ${TAG} .doc {
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          box-shadow: var(--fg-d1);
          border-radius: var(--ae-radius-md);
          padding: var(--ae-space-4) var(--ae-space-5);
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-caption) * 0.96);
          line-height: 1.6;
          color: var(--ae-text-strong);
          position: relative;
        }
        ${TAG} .doc::before {
          content: "sdd/0007-rate-limiting/verification.md";
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

        ${TAG} .doc .feat {
          font-size: var(--ae-fs-small);
          font-weight: 700;
          color: var(--ae-text-strong);
          margin: 0 0 var(--ae-space-3);
        }

        ${TAG} table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 0 var(--ae-space-3);
        }
        ${TAG} thead th {
          text-align: left;
          /* A column header is prose. It inherited the panel's code face and
             was uppercased on top of that — the one thing mono must never be. */
          font-family: var(--ae-font);
          font-size: var(--ae-fs-caption);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--fg-muted);
          padding: 4px 10px 6px 0;
          border-bottom: 1.5px solid var(--ae-cool-gray-200);
        }
        ${TAG} tbody td {
          padding: 7px 10px 7px 0;
          vertical-align: top;
          border-bottom: 1px solid var(--ae-cool-gray-200);
        }
        ${TAG} tbody tr:last-child td { border-bottom: none; }
        /* Rows use the shared entrance; the choreography slot is inline. */

        ${TAG} td.crit { font-weight: 700; width: 30%; }
        ${TAG} td.evidence { color: var(--ae-text); width: 55%; }
        ${TAG} td.result { width: 15%; white-space: nowrap; }
        ${TAG} .badge {
          display: inline-block;
          padding: 1px 8px;
          border-radius: 3px;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.06em;
        }
        ${TAG} .badge.pass {
          background: #DDF1E3;
          color: #1A5C2F;
          border: 1px solid #6FBE89;
        }
        ${TAG} .badge.pending {
          background: #FEF3C7;
          color: #92400E;
          border: 1px solid #D97706;
        }

        ${TAG} .checks-label {
          font-size: calc(var(--ae-fs-caption) * 0.96);
          font-weight: 700;
          color: var(--ae-red);
          margin: 0 0 2px;
        }
        ${TAG} .checks {
          margin: 0;
          color: var(--ae-text);
        }

        ${TAG} .punch {
          margin: var(--ae-space-5) 0 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--ae-text-strong);
          text-align: center;
        }
        ${TAG} .punch b { color: var(--ae-red); }

        @media (max-width: 800px) {
          ${TAG} thead { display: none; }
          ${TAG} tbody td { display: block; width: auto !important; padding: 4px 0; }
          ${TAG} tbody tr td:last-child { padding-bottom: 10px; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>

        <div class="crumb fg-in" style="--fg-at: 2">
          <span class="seg done">${t.segs[0]}</span>
          <span class="arrow">→</span>
          <span class="seg done">${t.segs[1]}</span>
          <span class="arrow">→</span>
          <span class="seg done">${t.segs[2]}</span>
          <span class="arrow">→</span>
          <span class="seg active">${t.segs[3]}</span>
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

          <table>
            <thead>
              <tr class="fg-in" style="--fg-at: 5">
                <th>${t.thCrit}</th>
                <th>${t.thEvidence}</th>
                <th>${t.thResult}</th>
              </tr>
            </thead>
            <tbody>
              ${t.rows.map((r, i) => `
                <tr class="fg-in" style="--fg-at: ${6 + i}">
                  <td class="crit">${r.crit}</td>
                  <td class="evidence">${r.evidence}</td>
                  <td class="result"><span class="badge ${r.pass ? 'pass' : 'pending'}">${r.result}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="fg-in" style="--fg-at: 10">
            <p class="checks-label">${t.checksLabel}</p>
            <p class="checks">${t.checks}</p>
          </div>
        </div>

        <p class="punch fg-in" style="--fg-at: 12">
          ${t.punch}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section14SDD);
