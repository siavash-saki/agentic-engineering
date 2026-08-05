/* Section 30 — verification.md, the last of four.
   One criterion per row, one piece of evidence per row, and one row that
   honestly does not pass. The unmet row is the point of the slide. */

import { getLang } from '../core/i18n.js';
import { artifactCss, artifactHtml } from '../core/artifact-slide.js';

const TAG = 's32-sdd-verification';

const CONTENT = {
  en: {
    h1: 'verification.md — <span class="fg-mark fg-mark--sweep">the proof</span>',
    segs: ['spec', 'plan', 'tasks', 'verification'],
    active: 3,
    fm: ['artifact: verification', 'status: final', 'version: 1', 'model: Sonnet 5'],
    doc: [
      { h: '# Verification — rate limiting' },
      { row: ['Criterion', 'Evidence', 'Result'], head: true },
      { row: ['Under the limit is served', 'test: 99 requests in the window, all 200', 'pass'] },
      { row: ['Over the limit gets 429 + Retry-After', 'test: 101st request; asserts status and header seconds', 'pass'] },
      { row: ['Per API key, not per IP', 'test: two keys one IP both served; one key two IPs, second rejected', 'pass'] },
      { row: ['Internal calls exempt', 'test drives the internal path with and without the header', 'pass'] },
      { row: ['Counters survive a restart', 'not tested — no test drives Redis restart', 'not verified'] },
      { gap: true },
      { h: '## Automated checks' },
      { li: 'lint, types, unit, integration: green on 4f3a2b1' },
    ],
    caption: `Four passes and one honest gap. <b>A row that says "not verified"
              truthfully is worth more than one that says "pass" convincingly</b> —
              the first tells you where to look.`,
  },
  de: {
    h1: 'verification.md — <span class="fg-mark fg-mark--sweep">der Nachweis</span>',
    segs: ['spec', 'plan', 'tasks', 'verification'],
    active: 3,
    fm: ['artifact: verification', 'status: final', 'version: 1', 'model: Sonnet 5'],
    doc: [
      { h: '# Verifikation — Rate-Limiting' },
      { row: ['Kriterium', 'Beleg', 'Ergebnis'], head: true },
      { row: ['Unter dem Limit wird bedient', 'Test: 99 Requests im Fenster, alle 200', 'bestanden'] },
      { row: ['Über dem Limit 429 + Retry-After', 'Test: 101. Request; prüft Status und Header-Sekunden', 'bestanden'] },
      { row: ['Pro API-Key, nicht pro IP', 'Test: zwei Keys eine IP, beide bedient; ein Key zwei IPs, zweiter abgelehnt', 'bestanden'] },
      { row: ['Interne Aufrufe ausgenommen', 'Test fährt den internen Pfad mit und ohne Header', 'bestanden'] },
      { row: ['Zähler überstehen Neustart', 'nicht getestet — kein Test fährt einen Redis-Neustart', 'nicht geprüft'] },
      { gap: true },
      { h: '## Automatische Prüfungen' },
      { li: 'Lint, Typen, Unit, Integration: grün auf 4f3a2b1' },
    ],
    caption: `Vier bestanden, eine ehrliche Lücke. <b>Eine Zeile, die
              wahrheitsgemäß „nicht geprüft" sagt, ist mehr wert als eine, die
              überzeugend „bestanden" sagt</b> — die erste sagt, wo man nachsehen muss.`,
  },
};

class Section30 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `<style>${artifactCss(TAG)}</style>${artifactHtml(t)}`;
  }
}

customElements.define(TAG, Section30);
