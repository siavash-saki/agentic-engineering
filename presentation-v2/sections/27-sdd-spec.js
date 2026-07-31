/* Section 27 — spec.md, the first of four.
   Frame and CSS come from core/artifact-slide.js so the four documents
   cannot drift apart; only the content lives here. */

import { getLang } from '../core/i18n.js';
import { artifactCss, artifactHtml } from '../core/artifact-slide.js';

const TAG = 's27-sdd-spec';

const CONTENT = {
  en: {
    h1: 'spec.md — <span class="fg-mark fg-mark--sweep">what and why</span>',
    segs: ['spec', 'plan', 'tasks', 'verification'],
    active: 0,
    fm: ['artifact: spec', 'status: approved', 'version: 2', 'model: Opus 5'],
    doc: [
      { h: '# Rate limiting for the public API' },
      { h: '## Context' },
      { p: 'The /search endpoint is public and a few clients are hammering it. We need abuse protection that never locks out legitimate users.' },
      { h: '## Acceptance criteria' },
      { li: 'A client under the limit is served normally.' },
      { li: 'A client over 100 requests per minute gets 429, with a Retry-After header giving the seconds until the window resets.' },
      { li: 'The limit counts per API key, not per IP address.' },
      { li: 'Internal service calls are exempt.' },
      { h: '## Out of scope' },
      { li: 'Per-endpoint limits. Billing. Quota reporting.' },
    ],
    caption: `Not a word about Redis, middleware, or which function changes.
              <b>Behaviour only</b> — which is exactly what makes the fourth
              document possible.`,
  },
  de: {
    h1: 'spec.md — <span class="fg-mark fg-mark--sweep">was und warum</span>',
    segs: ['spec', 'plan', 'tasks', 'verification'],
    active: 0,
    fm: ['artifact: spec', 'status: approved', 'version: 2', 'model: Opus 5'],
    doc: [
      { h: '# Rate-Limiting für die öffentliche API' },
      { h: '## Kontext' },
      { p: 'Der Endpoint /search ist öffentlich, und einzelne Clients überlasten ihn. Wir brauchen Missbrauchsschutz, ohne legitime Nutzer auszusperren.' },
      { h: '## Akzeptanzkriterien' },
      { li: 'Ein Client unter dem Limit wird normal bedient.' },
      { li: 'Ein Client über 100 Requests pro Minute bekommt 429, mit Retry-After-Header, der die Sekunden bis zum Fensterwechsel angibt.' },
      { li: 'Das Limit zählt pro API-Key, nicht pro IP-Adresse.' },
      { li: 'Interne Service-Aufrufe sind ausgenommen.' },
      { h: '## Nicht im Umfang' },
      { li: 'Limits je Endpoint. Abrechnung. Kontingent-Auswertung.' },
    ],
    caption: `Kein Wort über Redis, Middleware oder welche Funktion sich ändert.
              <b>Nur Verhalten</b> — und genau das macht das vierte Dokument
              überhaupt möglich.`,
  },
};

class Section27 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `<style>${artifactCss(TAG)}</style>${artifactHtml(t)}`;
  }
}

customElements.define(TAG, Section27);
