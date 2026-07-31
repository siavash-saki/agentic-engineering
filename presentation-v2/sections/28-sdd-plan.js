/* Section 28 — plan.md, the second of four.
   The first document where mechanism is allowed: this is where Redis and
   the middleware finally get named, and where the spec's open questions
   are recorded as settled. */

import { getLang } from '../core/i18n.js';
import { artifactCss, artifactHtml } from '../core/artifact-slide.js';

const TAG = 's28-sdd-plan';

const CONTENT = {
  en: {
    h1: 'plan.md — <span class="fg-mark fg-mark--sweep">how</span>',
    segs: ['spec', 'plan', 'tasks', 'verification'],
    active: 1,
    fm: ['artifact: plan', 'status: approved', 'version: 1', 'model: Opus 5'],
    doc: [
      { h: '## Approach' },
      { p: 'A sliding window counter in the existing Redis instance, keyed by API key. Enforced in the shared request middleware, so no endpoint has to opt in.' },
      { p: 'Decided in the discussion: per key, sliding window, internal calls exempted by the existing service header.' },
      { h: '## Sequence' },
      { li: 'Counter and window logic, with unit tests, no wiring.' },
      { li: 'Middleware enforcement behind a config flag, default off.' },
      { li: 'Exemption for internal callers.' },
      { li: 'Turn the flag on, with the limit configurable per environment.' },
      { h: '## Risks' },
      { li: 'Redis unavailable — fail open, and log. Never reject on infrastructure failure.' },
      { li: 'Clock skew across instances makes the window slightly generous. Accepted.' },
      { h: '## Areas touched' },
      { li: 'The request middleware, the Redis client, the config schema.' },
    ],
    caption: `Approach, order, risks, and the areas it touches. <b>No function
              signatures, no line-level detail</b> — that is the next document's
              job, and the model's.`,
  },
  de: {
    h1: 'plan.md — <span class="fg-mark fg-mark--sweep">wie</span>',
    segs: ['spec', 'plan', 'tasks', 'verification'],
    active: 1,
    fm: ['artifact: plan', 'status: approved', 'version: 1', 'model: Opus 5'],
    doc: [
      { h: '## Ansatz' },
      { p: 'Ein gleitendes Zeitfenster im bestehenden Redis, geschlüsselt nach API-Key. Durchgesetzt in der gemeinsamen Request-Middleware, damit kein Endpoint sich anmelden muss.' },
      { p: 'In der Diskussion entschieden: pro Key, gleitendes Fenster, interne Aufrufe über den bestehenden Service-Header ausgenommen.' },
      { h: '## Reihenfolge' },
      { li: 'Zähler und Fensterlogik, mit Unit-Tests, ohne Verdrahtung.' },
      { li: 'Durchsetzung in der Middleware hinter einem Config-Flag, standardmäßig aus.' },
      { li: 'Ausnahme für interne Aufrufer.' },
      { li: 'Flag einschalten, Limit je Umgebung konfigurierbar.' },
      { h: '## Risiken' },
      { li: 'Redis nicht erreichbar — offen durchlassen und protokollieren. Niemals wegen Infrastruktur ablehnen.' },
      { li: 'Uhrenversatz zwischen Instanzen macht das Fenster leicht großzügig. Akzeptiert.' },
      { h: '## Berührte Bereiche' },
      { li: 'Die Request-Middleware, der Redis-Client, das Config-Schema.' },
    ],
    caption: `Ansatz, Reihenfolge, Risiken und die berührten Bereiche. <b>Keine
              Signaturen, keine Zeilendetails</b> — das ist Sache des nächsten
              Dokuments und des Modells.`,
  },
};

class Section28 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `<style>${artifactCss(TAG)}</style>${artifactHtml(t)}`;
  }
}

customElements.define(TAG, Section28);
