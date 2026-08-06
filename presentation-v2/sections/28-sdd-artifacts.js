/* Section 29 — The four artifacts, one slide.

   FOUR SLIDES COLLAPSE INTO ONE. This replaces the old 29-32, which were
   four near-identical pictures of the same exhibit device with a
   different file in it. The rail stops being a picture of a set and
   becomes the way through it: click a card, the sheet shows that
   document. That is allowed here because the deck is two artifacts at
   once — a talk, and a thing a reader clicks through alone — and the
   click costs the talk nothing: the presenter arrives with spec.md open
   and clicks three times where they used to press the arrow key three
   times.

   ── THE SHAPE: "THE STACK" ──────────────────────────────────────────

   Four separate blocks with air between them, each capped by a 3px rule
   in its step's colour. Nothing on the left edge at all — the colour is
   a HEADER on the card, the way a tab divider is coloured at its top
   rather than down its spine. Opening one washes the block in the same
   hue at tint strength and doubles the cap to 6px.

   THE CARDS TAKE THE HEIGHT THEY NEED AND NO MORE, and the space an
   earlier version left blank under its list is where the artifact's
   sentence now lives — so the left column reads top to bottom as title,
   contents, and the point of the thing you have open. The sentence is
   anchored to the FOOT of the column: floated directly under the list it
   left the column ending two-thirds down a full-height slide.

   THE SHEET'S CHROME DOES MORE. Path and frontmatter share one well in
   the open artifact's tint, closed off from the page by a 2px rule in
   the full hue — so the document is visibly headed by the same colour as
   the card that opened it. Section headings are followed by a rule that
   runs out to the measure, which is the oldest way of setting a heading
   inside a body of type and costs no vertical space at all.

   THE LOOP LOCATOR SITS IN THE SHEET'S BAR, not in the masthead. This
   is the layout whose left column already has four jobs — kicker, title,
   list and sentence — and a fifth band is one too many for a 250px
   column in German.

   ── NO LABEL MAY MOVE WHEN A CARD OPENS ─────────────────────────────

   This is the constraint the whole card is built around, and it is the
   defect that got the previous drawing rejected: a closed entry sat at
   the top of its band and the open one centred in it, while the file
   name grew from 14px to 17px at the same moment. A click did not open a
   card, it TELEPORTED the word you had just clicked.

   So: type size is IDENTICAL open and closed. Only weight and colour
   change. And where the card grows, IT GROWS OUTWARD — a negative
   margin with exactly that much padding added back, so the border box
   swells while the content box stays where it was, to the pixel. The
   doubled cap is an inset shadow rather than a thicker border for the
   same reason: a border change would shift the label by those 3px.

   What is left to say "open" is therefore FILL, EDGE, DEPTH and WEIGHT
   — four cues, three of which survive greyscale.

   Measured, not asserted: rendering the slide once per open artifact and
   comparing every label's position against the rail's own top-left
   corner gives 0px of movement in both languages. If you change the
   padding, the margin or a type size on .tab--on, re-run that.

   ── FOUR CORRECTIONS THAT ARE NOT CHOICES ───────────────────────────

   1. THE THIRD VERDICT EXISTS. The old device rendered "not verified"
      through the same class as a failure, in the error hue, with no
      glyph — so the deck's loudest claim, that a truthful PENDING beats
      a convincing PASS, was drawn as if PENDING were a failure and was
      carried by hue alone. A verdict is now a colour AND a glyph: pass
      = green + tick, not verified = ochre + hollow ring, wrong = clay +
      cross. Clay stays live in the legend even though this record never
      uses it, because the legend is teaching the palette.

      The glyph takes the BODY face even inside the mono document. In
      Plex Mono U+2713 sets as a square-shouldered radical and reads as
      a square root sign; in the legend, which is prose and therefore
      Inter, the same character is a tick. A legend that teaches one
      mark beside a table that draws another is teaching the wrong mark.

      U+25CB, not the typographic white bullet: at this size U+25E6 sets
      as a raised dot and reads as a degree sign rather than as "open".

   2. NOTHING IS SET BELOW THE FLOOR. The old device multiplied the
      small token by 0.88 and the caption token by 0.92. At a 1280x720
      stage both are already clamped to their minimum, so the multipliers
      produced 13.2px source and 12.9px frontmatter — under the deck's
      own 14px floor. They are gone. That makes the fit problem HARDER,
      not easier, and it is why the source sits ON the floor at 720.

   3. GREEN IS NOT "YOU ARE HERE". Each artifact carries the hue of the
      loop step it belongs to — spec and plan are Plan, tasks is Build
      (shown mid-flight, being worked), verification is Review — and the
      locator names that step, because a chapter hue must always travel
      with the chapter's name. EVERY card carries its step's hue at rest,
      not just the open one: a rail where only the open card has a colour
      cannot say that four artifacts belong to three different steps.

      THE KICKER IS GREY, not green, which is where this departs from the
      prototype. Green is the Build hue and it is already spent, three
      inches away, on the tasks.md cap. Slide 28 carries the same kicker
      string and made the same correction for the same reason; the two
      slides are one chapter and must not disagree about it.

   4. THE FRONTMATTER IS THE REAL CONTRACT. sdd/README.md requires eight
      fields and the old slide showed four. Eight now — the five required
      keys plus the three provenance keys, exactly as
      scripts/lint-artifacts.mjs enforces them — plus the real repo path
      on the sheet, so a viewer can check the claim against the repo.
      Frontmatter is deliberately NOT duplicated per language: it is file
      source with English keys and machine values, and a copy in each map
      is a copy that can drift.

   ── WHAT THE DECK'S LIFECYCLE DOES TO AN INTERACTIVE SLIDE ──────────

   This is the only interactive slide in the deck, and the deck re-mounts
   sections on language change and on every navigation. Three traps:

   a. LISTENERS GO ON THE SECTION ELEMENT, NOT ON THE CARDS. Choosing an
      artifact re-renders the body, which destroys every button; a
      listener bound to a button would die with it. Both handlers are
      delegated from the custom element itself, bound once in the
      constructor, so re-adding them is a no-op and removing them in
      disconnectedCallback is exact.

   b. WHICH CARD IS OPEN IS PER-INSTANCE STATE, never module state. The
      deck builds a NEW element for every mount, so an instance property
      resets to spec.md on navigation and on language change by
      construction — which is also what makes a language switch replay
      the entrance choreography, since a fresh instance has never been
      settled.

   c. THE DECK OWNS THE ARROW KEYS. Its document-level handler maps
      ArrowLeft/ArrowRight/Home/End/Space to slide navigation, and it has
      no idea this slide exists. Every key this rail handles is therefore
      stopped from propagating, or one arrow press would move the
      artifact AND the slide. Space is the odd one: it is stopped but NOT
      prevented, because the button's own activation is what fires the
      click — prevent it and Space stops working while the deck advances
      instead.

   IT ALSO DEGRADES TO A SLIDE. The first artifact renders at mount, so a
   projector, a PDF export or a screenshot script gets a complete, correct
   slide about spec.md rather than an empty shell waiting for an event.
   And a click renders SETTLED: re-running the rise on eleven elements
   every time someone navigates the rail is a strobe, not a page turn.

   ── SMALLER TRAPS ───────────────────────────────────────────────────

   - The trailing fill rows in the source grid are load-bearing. The
     bands stretch, which shares leftover height equally between them, so
     a SHORT document is pulled apart — tasks.md, three bands of one-line
     items, opened 65px between its title and its first task and read as
     if lines were missing. Four trailing rows take their share as bottom
     margin instead, which is where a short file in an editor puts it.
   - The hanging indent is the width of the marker it hangs, not one
     value for all: "- " is 1.2em and "- [x] " is 3.6em. A single 1.5em
     rule lands a wrapped checkbox item 2.4em short of the text it
     continues.
   - The takeaway's arrow is a text-indent, NOT a flex row. As a flex row
     the sentence becomes an anonymous flex item, which cannot be given
     min-width 0, and the German pushes out through the side of a narrow
     column.

   (No backticks anywhere in these comments: this block sits inside a JS
   template literal, and a backtick ends the string. It did once.) */

import { getLang } from '../core/i18n.js';

const TAG = 's28-sdd-artifacts';

const ORDER = ['spec', 'plan', 'tasks', 'verification'];

/* spec and plan are written in Plan; tasks is shown mid-flight, being
   worked, which is Build; verification is Review. */
const STEP = { spec: 0, plan: 0, tasks: 1, verification: 2 };
const HUECLS = ['a-plan', 'a-build', 'a-review'];

const FEATURE = '0002-rate-limiting';
const DIR = 'sdd/' + FEATURE + '/';

/* The eight fields REQUIRED_KEYS + PROVENANCE_KEYS in
   scripts/lint-artifacts.mjs actually enforce. Not per language: file
   source with English keys and machine values. */
const FM = {
  spec: ['feature: ' + FEATURE, 'artifact: spec', 'version: 2', 'status: approved',
         'updated: 2026-08-05', 'authoring_tool: claude-code', 'model: Opus 5', 'reasoning_effort: high'],
  plan: ['feature: ' + FEATURE, 'artifact: plan', 'version: 1', 'status: approved',
         'updated: 2026-08-05', 'authoring_tool: claude-code', 'model: Opus 5', 'reasoning_effort: high'],
  tasks: ['feature: ' + FEATURE, 'artifact: tasks', 'version: 1', 'status: approved',
          'updated: 2026-08-05', 'authoring_tool: claude-code', 'model: Opus 5', 'reasoning_effort: high'],
  verification: ['feature: ' + FEATURE, 'artifact: verification', 'version: 1', 'status: final',
                 'updated: 2026-08-06', 'authoring_tool: claude-code', 'model: Sonnet 5', 'reasoning_effort: high'],
};

/* Where each document divides into bands. Index ranges into doc[], so
   they are language-independent — a band cannot slide off its section
   when the German wraps differently. */
const SECS = {
  spec:         [[0, 0], [1, 2], [3, 7], [8, 9]],
  plan:         [[0, 2], [3, 7], [8, 10], [11, 12]],
  tasks:        [[0, 0], [1, 4], [5, 8]],
  verification: [[0, 5], [6, 6], [7, 9]],
};

const CONTENT = {
  en: {
    kicker: 'Spec-Driven Development',
    title: 'The four artifacts',
    railLabel: 'The four artifacts',
    loop: ['Plan', 'Build', 'Review'],
    keyLabel: 'Verdicts:',
    key: [['pass', 'pass'], ['wait', 'not verified'], ['fail', 'wrong']],
    docs: {
      spec: {
        file: 'spec.md', title: 'what and why',
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
        caption: 'Not a word about Redis, middleware, or which function changes. <b>Behaviour only</b> — which is exactly what makes the fourth document possible.',
      },
      plan: {
        file: 'plan.md', title: 'how',
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
        caption: "Approach, order, risks, and the areas it touches. <b>No function signatures, no line-level detail</b> — that is the next document's job, and the model's.",
      },
      tasks: {
        file: 'tasks.md', title: 'in what order',
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
        caption: 'Flat, checkable, one line each. <b>One task, one commit</b> — so the branch reads as eight small diffs instead of one large one. Nobody signs this off; it is here so you can see where the work is.',
      },
      verification: {
        file: 'verification.md', title: 'the proof',
        doc: [
          { h: '# Verification — rate limiting' },
          { row: ['Criterion', 'Evidence', 'Result'], head: true },
          { row: ['Under the limit is served', 'test: 99 requests in the window, all 200', 'pass'], v: 'pass' },
          { row: ['Over the limit gets 429 + Retry-After', 'test: 101st request; asserts status and header seconds', 'pass'], v: 'pass' },
          { row: ['Per API key, not per IP', 'test: two keys one IP both served; one key two IPs, second rejected', 'pass'], v: 'pass' },
          { row: ['Internal calls exempt', 'test drives the internal path with and without the header', 'pass'], v: 'pass' },
          { row: ['Counters survive a restart', 'not tested — no test drives Redis restart', 'not verified'], v: 'wait' },
          { gap: true },
          { h: '## Automated checks' },
          { li: 'lint, types, unit, integration: green on 4f3a2b1' },
        ],
        caption: 'Four passes and one honest gap. <b>A row that says "not verified" truthfully is worth more than one that says "pass" convincingly</b> — the first tells you where to look.',
      },
    },
  },

  de: {
    kicker: 'Spec-Driven Development',
    title: 'Die vier Artefakte',
    railLabel: 'Die vier Artefakte',
    loop: ['Plan', 'Build', 'Review'],
    keyLabel: 'Ergebnisse:',
    key: [['pass', 'bestanden'], ['wait', 'nicht geprüft'], ['fail', 'falsch']],
    docs: {
      spec: {
        file: 'spec.md', title: 'was und warum',
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
        caption: 'Kein Wort über Redis, Middleware oder welche Funktion sich ändert. <b>Nur Verhalten</b> — und genau das macht das vierte Dokument überhaupt möglich.',
      },
      plan: {
        file: 'plan.md', title: 'wie',
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
        caption: 'Ansatz, Reihenfolge, Risiken und die berührten Bereiche. <b>Keine Signaturen, keine Zeilendetails</b> — das ist Sache des nächsten Dokuments und des Modells.',
      },
      tasks: {
        file: 'tasks.md', title: 'in welcher Reihenfolge',
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
        caption: 'Flach, abhakbar, je eine Zeile. <b>Ein Task, ein Commit</b> — so liest sich der Branch als acht kleine Diffs statt als ein großer. Niemand gibt das frei; es zeigt nur, wo die Arbeit steht.',
      },
      verification: {
        file: 'verification.md', title: 'der Nachweis',
        doc: [
          { h: '# Verifikation — Rate-Limiting' },
          { row: ['Kriterium', 'Beleg', 'Ergebnis'], head: true },
          { row: ['Unter dem Limit wird bedient', 'Test: 99 Requests im Fenster, alle 200', 'bestanden'], v: 'pass' },
          { row: ['Über dem Limit 429 + Retry-After', 'Test: 101. Request; prüft Status und Header-Sekunden', 'bestanden'], v: 'pass' },
          { row: ['Pro API-Key, nicht pro IP', 'Test: zwei Keys eine IP, beide bedient; ein Key zwei IPs, zweiter abgelehnt', 'bestanden'], v: 'pass' },
          { row: ['Interne Aufrufe ausgenommen', 'Test fährt den internen Pfad mit und ohne Header', 'bestanden'], v: 'pass' },
          { row: ['Zähler überstehen Neustart', 'nicht getestet — kein Test fährt einen Redis-Neustart', 'nicht geprüft'], v: 'wait' },
          { gap: true },
          { h: '## Automatische Prüfungen' },
          { li: 'Lint, Typen, Unit, Integration: grün auf 4f3a2b1' },
        ],
        caption: 'Vier bestanden, eine ehrliche Lücke. <b>Eine Zeile, die wahrheitsgemäß „nicht geprüft" sagt, ist mehr wert als eine, die überzeugend „bestanden" sagt</b> — die erste sagt, wo man nachsehen muss.',
      },
    },
  },
};

/* ── pieces ───────────────────────────────────────────────────────── */

function loc(t, art) {
  return '<div class="loc">' + t.loop.map(function (s, i) {
    return (i ? '<i class="sep"></i>' : '')
      + '<span class="dot' + (i === STEP[art] ? ' on' : '') + '">' + s + '</span>';
  }).join('') + '</div>';
}

/* Four real buttons in a tablist. A slide that can only be operated with
   a mouse is a slide half the room cannot operate. EVERY card carries
   its own step's hue class, not just the open one. */
function rail(t, art) {
  const kids = ORDER.map(function (a, i) {
    const d = t.docs[a];
    const on = a === art;
    return '<button type="button" role="tab" id="' + TAG + '-tab-' + a + '"'
      + ' class="tab ' + HUECLS[STEP[a]] + (on ? ' tab--on' : '') + ' fg-in"'
      + ' style="--fg-at: ' + (1 + i) + '"'
      + ' data-art="' + a + '" aria-selected="' + on + '"'
      + ' aria-controls="' + TAG + '-sheet"'
      + ' tabindex="' + (on ? '0' : '-1') + '">'
      + '<span class="n" aria-hidden="true">' + (i + 1) + '</span>'
      + '<span class="txt">'
        /* The chevron has to survive a screenshot: a reader who has not
           moved the mouse yet gets one on every closed card and none on
           the open one. */
        + '<span class="f"><span>' + d.file + '</span>'
          + (on ? '' : '<i class="go" aria-hidden="true">›</i>') + '</span>'
        + '<span class="q">' + d.title + '</span>'
      + '</span>'
    + '</button>';
  }).join('');
  return '<div class="rail ' + HUECLS[STEP[art]] + '" role="tablist"'
    + ' aria-orientation="vertical" aria-label="' + t.railLabel + '">'
    + kids + '</div>';
}

function bar(t, art) {
  return '<div class="sheet__bar fg-in" style="--fg-at: 3">'
    + '<span class="path"><span class="dir">' + DIR + '</span><b>' + art + '.md</b></span>'
    + loc(t, art)
  + '</div>';
}

function fm(art) {
  return '<div class="fm fg-in" style="--fg-at: 3">' + FM[art].map(function (f) {
    const i = f.indexOf(': ');
    return '<span><span class="k">' + f.slice(0, i + 1) + '</span> ' + f.slice(i + 2) + '</span>';
  }).join('') + '</div>';
}

function srcLine(r) {
  if (r.h) {
    const i = r.h.indexOf(' ');
    return '<div class="ln h"><span class="mk">' + r.h.slice(0, i) + '</span><b>' + r.h.slice(i + 1) + '</b></div>';
  }
  if (r.li)   return '<div class="ln li"><span class="mk">-</span> ' + r.li + '</div>';
  if (r.done) return '<div class="ln done"><span class="mk">- [x]</span> ' + r.done + '</div>';
  if (r.todo) return '<div class="ln todo"><span class="mk">- [ ]</span> ' + r.todo + '</div>';
  if (r.gap)  return '<div class="ln gap"></div>';
  if (r.row) {
    const cells = r.row.map(function (c, i) {
      if (r.head || i < 2) return '<span>' + c + '</span>';
      return '<span><span class="v v--' + r.v + '">' + c + '</span></span>';
    }).join('');
    return '<div class="ln row' + (r.head ? ' row--head' : '')
      + (r.v === 'wait' ? ' row--wait' : '') + '">' + cells + '</div>';
  }
  return '<div class="ln p">' + r.p + '</div>';
}

/* The document, cut into its bands, plus four trailing fill rows. The
   rows stretch, which shares the leftover height equally between them —
   the fills take four of those shares as bottom margin so a short file
   is not pulled apart. */
function srcGrid(d, art) {
  let tail = '';
  for (let i = 0; i < 4; i++) tail += '<i class="fill" aria-hidden="true"></i>';
  return '<div class="src">' + SECS[art].map(function (rg, i) {
    const s = d.doc.slice(rg[0], rg[1] + 1).map(srcLine).join('');
    return '<div class="sec fg-in" style="--fg-at: ' + (4 + Math.min(i, 6)) + '">' + s + '</div>';
  }).join('') + tail + '</div>';
}

/* Prose about the file, so it takes the body face. It appears only on a
   document that carries verdicts. */
function legend(t, d) {
  if (!d.doc.some(function (r) { return r.v; })) return '';
  return '<div class="key fg-in" style="--fg-at: 10">'
    + '<span class="kl">' + t.keyLabel + '</span>'
    + t.key.map(function (k) {
        return '<span class="v v--' + k[0] + '">' + k[1] + '</span>';
      }).join('')
  + '</div>';
}

function sheet(t, art, d) {
  return '<div class="sheet" id="' + TAG + '-sheet" role="tabpanel" tabindex="0"'
    + ' aria-labelledby="' + TAG + '-tab-' + art + '">'
    + bar(t, art) + fm(art) + srcGrid(d, art) + legend(t, d)
  + '</div>';
}

class Section28 extends HTMLElement {
  constructor() {
    super();
    /* Bound once, so re-adding is a no-op and removal is exact. */
    this.onClick = this.onClick.bind(this);
    this.onKey = this.onKey.bind(this);
  }

  connectedCallback() {
    /* Per-instance, never module-level: the deck builds a new element on
       every navigation and every language change, so this resets to
       spec.md by construction. */
    this.open = ORDER[0];
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
          /* On the floor at a 720 viewport, not under it. */
          --src-fs: clamp(14px, 1.78vh, 19px);
        }
        /* Two columns: the contents, and the document it opens. The rail
           column is sized by its longest German line, not by proportion. */
        ${TAG} .body {
          flex: 1; min-height: 0;
          display: grid; align-items: stretch;
          grid-template-columns: minmax(252px, 0.315fr) minmax(0, 1fr);
          gap: var(--ae-space-5);
        }

        /* ── the artifact's loop hue ── */
        ${TAG} .a-plan   { --hue: var(--fg-plan);   --hue-d: var(--fg-plan-d);   --hue-tint: var(--fg-plan-tint); }
        ${TAG} .a-build  { --hue: var(--fg-build);  --hue-d: var(--fg-build-d);  --hue-tint: var(--fg-build-tint); }
        ${TAG} .a-review { --hue: var(--fg-review); --hue-d: var(--fg-review-d); --hue-tint: var(--fg-review-tint); }

        /* ── the masthead column ── */
        ${TAG} .mast { display: flex; flex-direction: column; min-height: 0; }
        /* Grey, not green: green is the Build hue and it is already spent
           on the tasks.md cap two inches below. Slide 28 sets the same
           kicker string the same way. */
        ${TAG} .kicker {
          margin: 0 0 var(--ae-space-1);
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--fg-muted);
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }

        /* ── the stack: four blocks, air between them ──
           flex: none and min-content rows, so the cards take the height
           they need and no more; the leftover goes to the sentence. */
        ${TAG} .rail {
          display: grid; min-height: 0;
          flex: none; align-content: start;
          grid-auto-rows: min-content; row-gap: var(--ae-space-4);
          margin-top: var(--ae-space-4);
          margin-bottom: var(--ae-space-5);
        }
        /* A grid rather than a flex row: the numeral has to sit against
           the label AND the pair has to sit at a fixed place in the band,
           and a flex row cannot do both. */
        ${TAG} .tab {
          appearance: none; margin: 0; color: inherit; font: inherit;
          text-align: left; cursor: pointer; min-width: 0;
          display: grid; grid-template-columns: auto minmax(0, 1fr);
          align-content: center; align-items: center;
          column-gap: var(--ae-space-3);
          padding: var(--ae-space-3);
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          /* The hue is a HEADER on the card, not a spine down its left
             edge — the way a tab divider is coloured at its top. */
          border-top: 3px solid var(--hue);
          border-radius: 2px 2px var(--ae-radius) var(--ae-radius);
        }
        ${TAG} .tab:hover { border-color: var(--fg-muted); border-top-color: var(--hue); }
        /* Ink, not the chapter hue: ink is the human and every human
           decision, and a focus ring is where the human is standing. */
        ${TAG} .tab:focus-visible {
          outline: 2px solid var(--fg-ink); outline-offset: 2px; z-index: 3;
        }
        ${TAG} .tab .n {
          font-family: var(--ae-font-mono); font-weight: 700;
          font-variant-numeric: tabular-nums;
          font-size: var(--ae-fs-caption); line-height: 1.2; color: var(--fg-faint);
        }
        ${TAG} .tab .txt { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
        /* Both lines are set at the floor and STAY there when the card
           opens. This is the constraint the whole card is built around:
           only weight and colour may change. */
        ${TAG} .tab .f {
          font-family: var(--ae-font-mono); font-size: var(--ae-fs-caption);
          line-height: 1.25; font-weight: 600; color: var(--fg-muted);
          overflow-wrap: anywhere;
        }
        ${TAG} .tab .q {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1.3; color: var(--fg-faint);
        }
        ${TAG} .tab .go { color: var(--fg-faint); font-weight: 700; }
        /* -10px of margin, +10px of padding: the border box grows, the
           content box does not move. The doubled cap is an inset shadow
           rather than a thicker border for the same reason. */
        ${TAG} .tab--on {
          margin: 0 -10px;
          padding: var(--ae-space-3) calc(var(--ae-space-3) + 10px);
          background: var(--hue-tint);
          box-shadow: inset 0 3px 0 var(--hue), var(--fg-d2);
          z-index: 1;
        }
        ${TAG} .tab--on .n { color: var(--hue-d); }
        ${TAG} .tab--on .f { color: var(--fg-ink); font-weight: 700; }
        ${TAG} .tab--on .q { color: var(--fg-ink); }

        /* ── the takeaway ──
           Typographic and INK. No fill, no chapter hue: it is addressed
           to the person in the room, and ink is what this deck says a
           person is — which also makes it greyscale-proof by
           construction rather than by test.
           The hanging arrow is a text-indent, NOT a flex row. As a flex
           row the sentence is an anonymous flex item, which cannot be
           given min-width 0, and the German pushes out through the side
           of the column. */
        ${TAG} .tk {
          display: block;
          padding-left: 1.15em; text-indent: -1.15em;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1.4; color: var(--fg-body);
          overflow-wrap: break-word;
        }
        ${TAG} .tk::before { content: '\\2192\\00a0'; color: var(--fg-ink); font-weight: 700; }
        ${TAG} .tk b { font-weight: 700; color: var(--fg-ink); }
        /* Anchored to the FOOT of the column, not floated under the list:
           the column is pinned top and bottom and the air falls between
           the contents and its footnote, where air belongs. */
        ${TAG} .tk--mar {
          flex: none; margin-top: auto;
          padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
        }

        /* ── the sheet ── */
        ${TAG} .sheet {
          display: flex; flex-direction: column; min-height: 0;
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          border-radius: var(--ae-radius-lg);
          box-shadow: var(--fg-d1);
          overflow: hidden;
        }
        /* Path and frontmatter share ONE well in the open artifact's
           tint, closed off by a 2px rule at full strength — so the
           document is headed by the colour of the card that opened it. */
        ${TAG} .sheet__bar {
          flex: none;
          display: flex; align-items: center; justify-content: space-between;
          gap: var(--ae-space-4); flex-wrap: wrap;
          padding: 5px var(--ae-space-4);
          background: var(--hue-tint);
        }
        ${TAG} .path {
          font-family: var(--ae-font-mono); font-size: var(--ae-fs-caption);
          line-height: 1.3; color: var(--fg-muted);
        }
        ${TAG} .path .dir { color: var(--fg-faint); }
        ${TAG} .path b { color: var(--fg-ink); font-weight: 600; }
        /* Frontmatter is file source, so it is mono — but it is metadata
           about the document rather than the document, so it sits in the
           header well and the keys recede. */
        ${TAG} .fm {
          flex: none;
          display: flex; flex-wrap: wrap;
          gap: 3px var(--ae-space-5);
          padding: 6px var(--ae-space-4);
          background: var(--hue-tint);
          border-bottom: 2px solid var(--hue);
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-caption); line-height: 1.3;
          color: var(--fg-ink);
        }
        ${TAG} .fm .k { color: var(--fg-faint); }

        /* ── the document body ── */
        ${TAG} .src {
          flex: 1; min-height: 0;
          display: grid; align-content: stretch; align-items: start;
          row-gap: var(--ae-space-3);
          padding: var(--ae-space-3) var(--ae-space-4);
          font-family: var(--ae-font-mono); font-size: var(--src-fs);
          line-height: 1.45;
        }
        ${TAG} .src .fill { display: block; }
        ${TAG} .ln { color: var(--fg-ink); }
        /* The markdown markers are source, not decoration, and they are
           what carries heading-versus-item and done-versus-open when the
           hue is gone. --fg-faint rather than a hairline grey: this is
           text and it is read. */
        ${TAG} .mk { color: var(--fg-faint); }
        /* A heading followed by a rule out to the measure: the oldest way
           of setting a heading inside a body of type, and it costs no
           vertical space at all. */
        ${TAG} .h {
          font-weight: 700; margin-top: 0.5em;
          display: flex; align-items: center; gap: 0.55em;
        }
        ${TAG} .h::after { content: ''; flex: 1 1 auto; height: 1px; background: var(--fg-hair); }
        ${TAG} .h b { font-weight: 700; }
        ${TAG} .sec > .h:first-child { margin-top: 0; }
        ${TAG} .p { color: var(--fg-body); }
        /* A hanging indent that actually hangs: the indent is the width
           of the marker it is hanging. "- " is 1.2em, "- [x] " is 3.6em. */
        ${TAG} .li { padding-left: 1.2em; text-indent: -1.2em; }
        ${TAG} .done, ${TAG} .todo { padding-left: 3.6em; text-indent: -3.6em; }
        ${TAG} .done { color: var(--fg-build-d); }
        ${TAG} .done .mk { color: var(--fg-build); font-weight: 700; }
        ${TAG} .todo { color: var(--fg-ink); }
        ${TAG} .gap { height: 0.5em; }

        /* ── the verification table ── */
        ${TAG} .row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr) auto;
          gap: var(--ae-space-3);
          padding: 2px 0;
          border-bottom: 1px solid var(--fg-hair);
          color: var(--fg-ink);
        }
        ${TAG} .row--head { color: var(--fg-faint); border-bottom-color: var(--ae-cool-gray-300); }
        ${TAG} .row span:last-child { text-align: right; }
        /* The unverified row is the point of the fourth document. Ochre
           wash, bled to the sheet's inner edge so it reads as a band
           rather than a highlighted word, and it carries its own glyph. */
        ${TAG} .row--wait {
          background: var(--fg-wait-tint);
          border-bottom-color: var(--fg-wait-light);
          margin: 0 calc(-1 * var(--ae-space-4));
          padding: 2px var(--ae-space-4);
        }

        /* ── the three verdicts ──
           The glyph takes the BODY face even inside the mono document:
           in the code face U+2713 sets as a square-shouldered radical and
           reads as a square root sign. */
        ${TAG} .v {
          display: inline-flex; align-items: baseline; gap: 0.34em;
          font-weight: 700; white-space: nowrap;
        }
        ${TAG} .v::before { flex: none; font-weight: 700; font-family: var(--ae-font); }
        ${TAG} .v--pass { color: var(--fg-build-d); }
        ${TAG} .v--pass::before { content: '\\2713'; }
        /* A hollow ring, not the typographic white bullet: at this size
           U+25E6 sets as a raised dot and reads as a degree sign. */
        ${TAG} .v--wait { color: var(--fg-wait-d); }
        ${TAG} .v--wait::before { content: '\\25CB'; font-size: 0.85em; }
        ${TAG} .v--fail { color: var(--fg-fail-d); }
        ${TAG} .v--fail::before { content: '\\2715'; }
        ${TAG} .row span:last-child .v { justify-content: flex-end; }

        ${TAG} .key {
          flex: none;
          display: flex; flex-wrap: wrap; align-items: baseline;
          gap: 2px var(--ae-space-5);
          padding: 5px var(--ae-space-4);
          background: var(--ae-cool-gray-100);
          border-top: 1px solid var(--fg-hair);
          font-family: var(--ae-font);
          font-size: var(--ae-fs-caption); line-height: 1.3;
        }
        ${TAG} .key .kl { color: var(--fg-faint); font-weight: 600; }
        ${TAG} .key .v { font-weight: 600; }

        /* ── the locator: which step of the loop this document belongs to ──
           In the sheet's bar, not the masthead: the left column already
           has four jobs. */
        ${TAG} .loc { display: flex; align-items: center; gap: var(--ae-space-2); }
        ${TAG} .loc .dot {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1.2; font-weight: 600; color: var(--ae-text-disabled);
        }
        ${TAG} .loc .dot::before {
          content: ''; width: 9px; height: 9px; border-radius: 999px;
          background: var(--ae-cool-gray-200);
        }
        ${TAG} .loc .dot.on { color: var(--hue-d); font-weight: 700; }
        ${TAG} .loc .dot.on::before { background: var(--hue); box-shadow: 0 0 0 4px var(--hue-tint); }
        ${TAG} .loc .sep { width: 14px; height: 2px; background: var(--fg-hair); }

        /* Choosing an artifact is navigation, and navigation that
           re-runs a rise on eleven elements reads as a strobe rather
           than a page turn. A language change mounts a new element,
           which has never been settled, so the entrance plays there. */
        ${TAG}.settled .fg-in,
        ${TAG}.settled .fg-mark--sweep { animation-name: none; }

        @media (max-width: 900px) {
          ${TAG} .body { grid-template-columns: 1fr; }
          ${TAG} .rail { grid-auto-rows: min-content; }
          ${TAG} .row { grid-template-columns: 1fr; gap: 0; }
          ${TAG} .row span:last-child { text-align: left; }
        }
      </style>
      <div class="fg-wrap body"></div>
    `;
    this.bodyEl = this.querySelector('.body');
    this.paint(false);
    this.addEventListener('click', this.onClick);
    this.addEventListener('keydown', this.onKey);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('keydown', this.onKey);
  }

  paint(settled) {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    const art = this.open;
    const d = t.docs[art];
    this.classList.toggle('settled', !!settled);
    /* The hue class sits on the body, so the sheet's well and rule take
       the open artifact's colour by inheritance. */
    this.bodyEl.className = 'fg-wrap body ' + HUECLS[STEP[art]];
    this.bodyEl.innerHTML = ''
      + '<div class="mast">'
        + '<p class="kicker fg-in" style="--fg-at: 1">' + t.kicker + '</p>'
        + '<h1 class="fg-in" style="--fg-at: 1">' + t.title + '</h1>'
        + rail(t, art)
        + '<span class="tk tk--mar fg-in" style="--fg-at: 11">' + d.caption + '</span>'
      + '</div>'
      + sheet(t, art, d);
  }

  /* Re-rendering throws away the element that was focused, so focus is
     put back on the card that now reads as open — but only if focus was
     inside this slide to begin with, or a mouse click would steal it. */
  select(a) {
    if (a === this.open) return;
    const keep = this.contains(document.activeElement);
    this.open = a;
    this.paint(true);
    if (keep) {
      const el = this.querySelector('[data-art="' + a + '"]');
      if (el) el.focus();
    }
  }

  onClick(e) {
    const b = e.target.closest?.('[data-art]');
    if (b) this.select(b.dataset.art);
  }

  /* Arrow keys walk the set on BOTH axes and Home/End jump to its ends.
     Everything handled here is stopped from propagating: the deck's own
     document-level handler maps the same keys to slide navigation. */
  onKey(e) {
    const b = e.target.closest?.('[data-art]');
    if (!b) return;
    /* Space and Enter fire the button natively, which produces the click
       this slide listens for. Stop the deck advancing a slide as well —
       but do NOT preventDefault, or the activation never happens. */
    if (e.key === ' ' || e.key === 'Enter') { e.stopPropagation(); return; }
    const i = ORDER.indexOf(b.dataset.art);
    const n = ORDER.length;
    let j = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % n;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i + n - 1) % n;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = n - 1;
    if (j < 0) return;
    e.preventDefault();
    e.stopPropagation();
    this.select(ORDER[j]);
  }
}

customElements.define(TAG, Section28);
