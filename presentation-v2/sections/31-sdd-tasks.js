/* Section 29 — tasks.md, the third of four.
   The only artifact nobody approves: it is the agent's working checklist,
   and its whole job is that you can see where the work is. Shown
   mid-flight, half ticked, because that is the state it is usually in. */

import { getLang } from '../core/i18n.js';
import { artifactCss, artifactHtml } from '../core/artifact-slide.js';

const TAG = 's31-sdd-tasks';

const CONTENT = {
  en: {
    h1: 'tasks.md — <span class="fg-mark fg-mark--sweep">in what order</span>',
    segs: ['spec', 'plan', 'tasks', 'verification'],
    active: 2,
    fm: ['artifact: tasks', 'status: approved', 'version: 1', 'model: Opus 5'],
    doc: [
      { h: '# Tasks — rate limiting' },
      { done: 'Sliding-window counter with unit tests' },
      { done: 'Redis client: read, increment, expire' },
      { done: 'Middleware enforcement behind a config flag' },
      { done: 'Exempt internal callers via the service header' },
      { todo: '429 response with the Retry-After header' },
      { todo: 'Fail open when Redis is unreachable, plus a log line' },
      { todo: 'Limit configurable per environment' },
      { todo: 'Turn the flag on in staging' },
    ],
    caption: `Flat, checkable, one line each. <b>One task, one commit</b> — so
              the branch reads as eight small diffs instead of one large one.
              Nobody signs this off; it is here so you can see where the work is.`,
  },
  de: {
    h1: 'tasks.md — <span class="fg-mark fg-mark--sweep">in welcher Reihenfolge</span>',
    segs: ['spec', 'plan', 'tasks', 'verification'],
    active: 2,
    fm: ['artifact: tasks', 'status: approved', 'version: 1', 'model: Opus 5'],
    doc: [
      { h: '# Tasks — Rate-Limiting' },
      { done: 'Zähler mit gleitendem Fenster, mit Unit-Tests' },
      { done: 'Redis-Client: lesen, hochzählen, ablaufen lassen' },
      { done: 'Durchsetzung in der Middleware hinter einem Config-Flag' },
      { done: 'Interne Aufrufer über den Service-Header ausnehmen' },
      { todo: '429-Antwort mit Retry-After-Header' },
      { todo: 'Offen durchlassen, wenn Redis nicht erreichbar ist, plus Logzeile' },
      { todo: 'Limit je Umgebung konfigurierbar' },
      { todo: 'Flag in Staging einschalten' },
    ],
    caption: `Flach, abhakbar, je eine Zeile. <b>Ein Task, ein Commit</b> — so
              liest sich der Branch als acht kleine Diffs statt als ein großer.
              Niemand gibt das frei; es zeigt nur, wo die Arbeit steht.`,
  },
};

class Section29 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `<style>${artifactCss(TAG)}</style>${artifactHtml(t)}`;
  }
}

customElements.define(TAG, Section29);
