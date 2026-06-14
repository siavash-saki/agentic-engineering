/* Section 5 — Was ist was
   Three sections: Modell · (API & Subscription) · Produkt.
   API and Subscription are PARALLEL alternatives in the middle — a product
   reaches a model either through one or the other, never chained. */

import { getLang } from '../core/i18n.js';

const TAG = 's05-landscape';

/* All audience-visible strings live in CONTENT, selected at render time.
   Brand / product / model names (GPT, Claude, OpenAI, …) are language-neutral
   and therefore IDENTICAL across en and de. Non-text fields (ids, colors,
   top positions) are byte-identical across both copies. */
const CONTENT = {
  en: {
    heading: 'Model · API &amp; Subscription · Product',
    toggle: {
      all: { label: 'All paths',         kbd: '1', title: 'Key 1' },
      api: { label: 'API only',          kbd: '2', title: 'Key 2' },
      sub: { label: 'Subscription only', kbd: '3', title: 'Key 3' },
    },
    colLabels: { model: 'Model', mid: 'API &amp; Subscription', product: 'Product' },
    colSublabels: { api: 'api', sub: 'subscription' },
    subSuffix: 'Subscription',

    MODELS: [
      { id: 'm-gpt',    name: 'GPT',    maker: 'OpenAI',    color: 'c-openai',    top: '22%' },
      { id: 'm-claude', name: 'Claude', maker: 'Anthropic', color: 'c-anthropic', top: '50%' },
      { id: 'm-gemini', name: 'Gemini', maker: 'Google',    color: 'c-google',    top: '78%' },
    ],
    APIS: [
      { id: 'a-openai',    name: 'OpenAI API',    color: 'c-openai',    top: '20%' },
      { id: 'a-anthropic', name: 'Anthropic API', color: 'c-anthropic', top: '50%' },
      { id: 'a-google',    name: 'Google API',    color: 'c-google',    top: '80%' },
    ],
    SUBS: [
      { id: 's-openai',    vendor: 'OpenAI',    color: 'c-openai',    top: '14%' },
      { id: 's-anthropic', vendor: 'Anthropic', color: 'c-anthropic', top: '32%' },
      { id: 's-github',    vendor: 'GitHub',    color: 'c-github',    top: '68%' },
      { id: 's-amazon',    vendor: 'Amazon',    color: 'c-aws',       top: '86%' },
    ],
    PRODUCTS: [
      { id: 'p-codex',      name: 'Codex',          maker: 'OpenAI',    color: 'c-openai',    top: '14%' },
      { id: 'p-claude-app', name: 'Claude App',     maker: 'Anthropic', color: 'c-anthropic', top: '32%' },
      { id: 'p-gemini-app', name: 'Gemini App',     maker: 'Google',    color: 'c-google',    top: '50%' },
      { id: 'p-copilot',    name: 'GitHub Copilot', maker: 'GitHub',    color: 'c-github',    top: '68%' },
      { id: 'p-kiro',       name: 'Kiro',           maker: 'Amazon',    color: 'c-aws',       top: '86%' },
    ],
    CAPTIONS: {
      all: 'A product reaches a model <b>either</b> straight through the <b>API</b> (pay-per-use) <b>or</b> through a <b>Subscription</b> (monthly, often Enterprise) — two parallel, commercial paths.',
      api: '<b>Pay-per-use:</b> the product calls the model API directly — usually with its own API key. Every request is billed separately. Fast to start, but not every agent offers this path.',
      sub: '<b>Monthly Subscription:</b> a flat contract, often Enterprise. One subscription can cover several models. For coding agents like Copilot or Kiro it is the only path — direct API access simply isn\'t on offer.',
    },
  },
  de: {
    heading: 'Modell · API &amp; Subscription · Produkt',
    toggle: {
      all: { label: 'Alle Pfade',        kbd: '1', title: 'Taste 1' },
      api: { label: 'Nur API',           kbd: '2', title: 'Taste 2' },
      sub: { label: 'Nur Subscription',  kbd: '3', title: 'Taste 3' },
    },
    colLabels: { model: 'Modell', mid: 'API &amp; Subscription', product: 'Produkt' },
    colSublabels: { api: 'api', sub: 'subscription' },
    subSuffix: 'Subscription',

    MODELS: [
      { id: 'm-gpt',    name: 'GPT',    maker: 'OpenAI',    color: 'c-openai',    top: '22%' },
      { id: 'm-claude', name: 'Claude', maker: 'Anthropic', color: 'c-anthropic', top: '50%' },
      { id: 'm-gemini', name: 'Gemini', maker: 'Google',    color: 'c-google',    top: '78%' },
    ],
    APIS: [
      { id: 'a-openai',    name: 'OpenAI API',    color: 'c-openai',    top: '20%' },
      { id: 'a-anthropic', name: 'Anthropic API', color: 'c-anthropic', top: '50%' },
      { id: 'a-google',    name: 'Google API',    color: 'c-google',    top: '80%' },
    ],
    SUBS: [
      { id: 's-openai',    vendor: 'OpenAI',    color: 'c-openai',    top: '14%' },
      { id: 's-anthropic', vendor: 'Anthropic', color: 'c-anthropic', top: '32%' },
      { id: 's-github',    vendor: 'GitHub',    color: 'c-github',    top: '68%' },
      { id: 's-amazon',    vendor: 'Amazon',    color: 'c-aws',       top: '86%' },
    ],
    PRODUCTS: [
      { id: 'p-codex',      name: 'Codex',          maker: 'OpenAI',    color: 'c-openai',    top: '14%' },
      { id: 'p-claude-app', name: 'Claude App',     maker: 'Anthropic', color: 'c-anthropic', top: '32%' },
      { id: 'p-gemini-app', name: 'Gemini App',     maker: 'Google',    color: 'c-google',    top: '50%' },
      { id: 'p-copilot',    name: 'GitHub Copilot', maker: 'GitHub',    color: 'c-github',    top: '68%' },
      { id: 'p-kiro',       name: 'Kiro',           maker: 'Amazon',    color: 'c-aws',       top: '86%' },
    ],
    CAPTIONS: {
      all: 'Ein Produkt erreicht ein Modell <b>entweder</b> direkt über die <b>API</b> (pay-per-use) <b>oder</b> über eine <b>Subscription</b> (monatlich, oft Enterprise) — beides sind parallele, kommerzielle Pfade.',
      api: '<b>Pay-per-use:</b> das Produkt ruft die Modell-API direkt auf — meist mit einem eigenen API-Key. Jede Anfrage wird einzeln abgerechnet. Schnell zu starten, aber nicht jeder Agent bietet diesen Pfad.',
      sub: '<b>Monatliche Subscription:</b> Pauschalvertrag, oft Enterprise. Eine Subscription kann mehrere Modelle abdecken. Bei Coding-Agenten wie Copilot oder Kiro der einzige Pfad — direkter API-Zugang ist hier nicht vorgesehen.',
    },
  },
};

/* Each route: [Product, Intermediary (API or Sub), Model].
   API and Subscription are PARALLEL alternatives — they are NOT chained.
   A product can reach a model either via a direct API or via a subscription.
   Used for connection rendering AND for hover highlight.
   Routes reference node ids only — language-neutral, so they stay module-level. */
const ROUTES = [
  /* Codex: usable via OpenAI API or via OpenAI Subscription */
  ['p-codex',      'a-openai',    'm-gpt'],
  ['p-codex',      's-openai',    'm-gpt'],
  /* Claude App: usable via Anthropic API or via Anthropic Subscription */
  ['p-claude-app', 'a-anthropic', 'm-claude'],
  ['p-claude-app', 's-anthropic', 'm-claude'],
  /* Gemini App: via Google API (no Google subscription shown) */
  ['p-gemini-app', 'a-google',    'm-gemini'],
  /* GitHub Copilot: only via GitHub Subscription — no API path */
  ['p-copilot',    's-github',    'm-gpt'],
  ['p-copilot',    's-github',    'm-claude'],
  ['p-copilot',    's-github',    'm-gemini'],
  /* Kiro: only via Amazon Subscription — no API path */
  ['p-kiro',       's-amazon',    'm-claude'],
];

const EDGE_COLOR = {
  /* Product → Intermediary */
  'p-codex|a-openai':         'c-openai',
  'p-codex|s-openai':         'c-openai',
  'p-claude-app|a-anthropic': 'c-anthropic',
  'p-claude-app|s-anthropic': 'c-anthropic',
  'p-gemini-app|a-google':    'c-google',
  'p-copilot|s-github':       'c-github',
  'p-kiro|s-amazon':          'c-aws',
  /* Intermediary → Model */
  'a-openai|m-gpt':           'c-openai',
  's-openai|m-gpt':           'c-openai',
  'a-anthropic|m-claude':     'c-anthropic',
  's-anthropic|m-claude':     'c-anthropic',
  'a-google|m-gemini':        'c-google',
  's-github|m-gpt':           'c-github',
  's-github|m-claude':        'c-github',
  's-github|m-gemini':        'c-github',
  's-amazon|m-claude':        'c-aws',
};

/* Build unique segment list from ROUTES. */
const SEGMENTS = (() => {
  const seen = new Set();
  const out = [];
  ROUTES.forEach(route => {
    for (let i = 0; i < route.length - 1; i++) {
      const key = `${route[i]}|${route[i + 1]}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push([route[i], route[i + 1], EDGE_COLOR[key]]);
    }
  });
  return out;
})();

/* Map each node-id to its kind. Used to dim the "other" kind in api/sub view. */
function nodeKind(id) {
  if (id.startsWith('m-')) return 'model';
  if (id.startsWith('a-')) return 'api';
  if (id.startsWith('s-')) return 'sub';
  if (id.startsWith('p-')) return 'product';
  return null;
}
function edgeKind(from, to) {
  if (from.startsWith('a-') || to.startsWith('a-')) return 'api';
  if (from.startsWith('s-') || to.startsWith('s-')) return 'sub';
  return null;
}

/* Which products participate in API routes vs Sub routes. */
const API_PRODUCTS = new Set();
const SUB_PRODUCTS = new Set();
ROUTES.forEach(route => {
  const kind = edgeKind(route[0], route[1]);
  if (kind === 'api') API_PRODUCTS.add(route[0]);
  if (kind === 'sub') SUB_PRODUCTS.add(route[0]);
});

class Section05 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          --c-openai:    #10A37F;
          --c-anthropic: #D97757;
          --c-google:    #4285F4;
          --c-aws:       #FF9900;
          --c-github:    #24292F;

          display: flex !important;
          flex-direction: column;
          padding: var(--db-space-5) var(--db-gutter) var(--db-space-4);
          background: var(--db-bg);
          overflow: hidden;
        }
        ${TAG} .top {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--db-space-4);
          max-width: 1200px;
          width: 100%;
          margin: 0 auto var(--db-space-4);
          opacity: 0;
          animation: s05-fade 500ms var(--db-ease) 50ms forwards;
        }
        ${TAG} .top h2 {
          margin: 0;
          font-size: var(--db-fs-h3);
          line-height: var(--db-lh-h3);
          color: var(--db-text-strong);
        }
        ${TAG} .toggle {
          display: inline-flex;
          border: 1px solid var(--db-border);
          border-radius: var(--db-radius);
          overflow: hidden;
          background: var(--db-bg);
        }
        ${TAG} .toggle button {
          font: inherit;
          font-size: var(--db-fs-small);
          font-weight: 700;
          padding: 8px 16px;
          border: 0;
          background: transparent;
          color: var(--db-text-muted);
          cursor: pointer;
          transition: background 160ms var(--db-ease), color 160ms var(--db-ease);
        }
        ${TAG} .toggle button + button { border-left: 1px solid var(--db-border); }
        ${TAG} .toggle button:hover { color: var(--db-text); background: var(--db-cool-gray-100); }
        ${TAG} .toggle button.active {
          background: var(--db-red);
          color: #fff;
        }
        ${TAG} .toggle .kbd {
          margin-left: 6px;
          padding: 0 5px;
          border: 1px solid currentColor;
          border-radius: 3px;
          opacity: 0.55;
          font-size: 0.78em;
          font-weight: 700;
        }

        ${TAG} .stage {
          flex: 1;
          position: relative;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          min-height: 0;
          opacity: 0;
          animation: s05-fade 600ms var(--db-ease) 200ms forwards;
        }

        /* The middle band visually groups APIs + Subs into a single section. */
        ${TAG} .mid-band {
          position: absolute;
          top: 22px;
          bottom: 0;
          left: 25%;
          right: 25%;
          background: var(--db-bg-subtle);
          border-radius: var(--db-radius-md);
          z-index: 0;
          opacity: 0.55;
        }

        ${TAG} .conn {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        ${TAG} .cline {
          fill: none;
          stroke-width: 2;
          opacity: 0.32;
          transition: opacity 280ms var(--db-ease), stroke-width 220ms var(--db-ease);
        }
        ${TAG} .cline.hl  { opacity: 1; stroke-width: 2.5; }
        ${TAG} .cline.dim { opacity: 0.06; }
        ${TAG} .cline.faded { opacity: 0.02; }

        ${TAG} .col-lbl {
          position: absolute;
          top: -4px;
          transform: translateX(-50%);
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--db-text-subtle);
          z-index: 3;
          white-space: nowrap;
        }
        ${TAG} .col-sublbl {
          position: absolute;
          top: 18px;
          transform: translateX(-50%);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--db-text-subtle);
          opacity: 0.7;
          z-index: 3;
        }

        ${TAG} .node {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 2;
          background: var(--db-bg);
          padding: 10px 14px;
          min-width: 124px;
          font-size: var(--db-fs-small);
          line-height: 1.2;
          transition:
            opacity 240ms var(--db-ease),
            box-shadow 220ms var(--db-ease),
            filter 220ms var(--db-ease);
        }
        ${TAG} .node .nn { font-weight: 700; color: var(--db-text-strong); }
        ${TAG} .node .nm { font-size: 11px; color: var(--db-text-muted); margin-top: 2px; }

        ${TAG} .node.model {
          border-left: 4px solid var(--node-color, var(--db-cool-gray-300));
          border-top: 1px solid var(--db-border);
          border-right: 1px solid var(--db-border);
          border-bottom: 1px solid var(--db-border);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
        }
        ${TAG} .node.api {
          border: 2px solid var(--node-color, var(--db-cool-gray-300));
          border-radius: var(--db-radius);
          text-align: center;
        }
        ${TAG} .node.sub {
          border: 2px dashed var(--node-color, var(--db-cool-gray-300));
          border-radius: 999px;
          text-align: center;
          padding: 8px 16px;
        }
        ${TAG} .node.sub .nn { color: var(--node-color); }
        ${TAG} .node.product {
          border: 1px solid var(--db-border);
          border-right: 4px solid var(--maker-color, var(--db-cool-gray-300));
          border-radius: var(--db-radius) 0 0 var(--db-radius);
          text-align: right;
        }

        ${TAG} .node.dim {
          opacity: 0.25;
          filter: grayscale(0.6);
        }
        ${TAG} .node.faded {
          opacity: 0.08;
          filter: grayscale(0.85);
          pointer-events: none;
        }
        ${TAG} .node.hl {
          box-shadow: 0 0 0 2px var(--node-color, var(--maker-color, var(--db-red))),
                      0 4px 14px rgba(0,0,0,0.08);
        }
        ${TAG} .caption {
          flex-shrink: 0;
          max-width: 920px;
          margin: var(--db-space-3) auto 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          text-align: center;
          opacity: 0;
          animation: s05-fade 500ms var(--db-ease) 450ms forwards;
        }
        ${TAG} .caption b { color: var(--db-red); font-weight: 700; }

        @keyframes s05-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="top">
        <h2>${t.heading}</h2>
        <div class="toggle" role="tablist">
          <button type="button" data-view="all" class="active" title="${t.toggle.all.title}">${t.toggle.all.label}<span class="kbd">${t.toggle.all.kbd}</span></button>
          <button type="button" data-view="api" title="${t.toggle.api.title}">${t.toggle.api.label}<span class="kbd">${t.toggle.api.kbd}</span></button>
          <button type="button" data-view="sub" title="${t.toggle.sub.title}">${t.toggle.sub.label}<span class="kbd">${t.toggle.sub.kbd}</span></button>
        </div>
      </div>

      <div class="stage">
        <div class="mid-band"></div>
        <svg class="conn" xmlns="http://www.w3.org/2000/svg"></svg>

        <div class="col-lbl" style="left:8%">${t.colLabels.model}</div>
        <div class="col-lbl" style="left:50%">${t.colLabels.mid}</div>
        <div class="col-lbl" style="left:92%">${t.colLabels.product}</div>

        <div class="col-sublbl" style="left:35%">${t.colSublabels.api}</div>
        <div class="col-sublbl" style="left:64%">${t.colSublabels.sub}</div>

        ${t.MODELS.map(m => `
          <div class="node model" data-id="${m.id}"
               style="left:8%;top:${m.top};--node-color:var(--${m.color})">
            <div class="nn">${m.name}</div>
            <div class="nm">${m.maker}</div>
          </div>`).join('')}

        ${t.APIS.map(a => `
          <div class="node api" data-id="${a.id}"
               style="left:35%;top:${a.top};--node-color:var(--${a.color})">
            <div class="nn">${a.name}</div>
          </div>`).join('')}

        ${t.SUBS.map(s => `
          <div class="node sub" data-id="${s.id}"
               style="left:64%;top:${s.top};--node-color:var(--${s.color})">
            <div class="nn">${s.vendor}</div>
            <div class="nm">${t.subSuffix}</div>
          </div>`).join('')}

        ${t.PRODUCTS.map(p => `
          <div class="node product" data-id="${p.id}"
               style="left:92%;top:${p.top};--maker-color:var(--${p.color})">
            <div class="nn">${p.name}</div>
            <div class="nm">${p.maker}</div>
          </div>`).join('')}
      </div>

      <p class="caption"></p>
    `;

    this.captions = t.CAPTIONS;

    this.stage   = this.querySelector('.stage');
    this.svg     = this.querySelector('.conn');
    this.caption = this.querySelector('.caption');
    this.nodes   = new Map(
      Array.from(this.querySelectorAll('.node')).map(n => [n.dataset.id, n])
    );
    this.paths   = new Map();

    this.view = 'all';
    this.hovered = null;

    this.querySelectorAll('.toggle button').forEach(btn => {
      btn.addEventListener('click', () => this.setView(btn.dataset.view));
    });
    this.nodes.forEach(n => {
      n.addEventListener('mouseenter', () => this.setHover(n.dataset.id));
      n.addEventListener('mouseleave', () => this.setHover(null));
    });

    this.ro = new ResizeObserver(() => this.drawConnections());
    this.ro.observe(this.stage);

    /* Keyboard shortcuts: 1/2/3/4 cycle through the view toggle so the
       presenter can switch views from a clicker without reaching the mouse. */
    const KEY_MAP = { '1': 'all', '2': 'api', '3': 'sub' };
    this.onKeydown = (e) => {
      if (e.target.closest('input,textarea,select')) return;
      const v = KEY_MAP[e.key];
      if (v) { e.preventDefault(); this.setView(v); }
    };
    document.addEventListener('keydown', this.onKeydown);

    this.render();

    setTimeout(() => this.drawConnections(), 60);
    setTimeout(() => this.drawConnections(), 450);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => this.drawConnections());
    }
  }

  disconnectedCallback() {
    this.ro?.disconnect();
    if (this.onKeydown) document.removeEventListener('keydown', this.onKeydown);
  }

  setView(v) {
    if (v === this.view) return;
    this.view = v;
    this.querySelectorAll('.toggle button').forEach(b => {
      b.classList.toggle('active', b.dataset.view === v);
    });
    this.render();
  }

  setHover(id) {
    this.hovered = id;
    this.render();
  }

  /* The set of nodes on a route containing `id`.
     In api/sub view, only routes matching the current filter count. */
  hoverSet(id) {
    const set = new Set();
    const filter = (this.view === 'api') ? 'api'
                : (this.view === 'sub') ? 'sub'
                : null;
    ROUTES.forEach(route => {
      if (!route.includes(id)) return;
      if (filter) {
        const routeKind = edgeKind(route[0], route[1]); // product → intermediary
        if (routeKind !== filter) return;
      }
      route.forEach(n => set.add(n));
    });
    return set;
  }

  render() {
    const view = this.view;
    const hovered = this.hovered;
    const hoverSet = hovered ? this.hoverSet(hovered) : null;

    this.nodes.forEach((n, id) => {
      n.classList.remove('hl', 'dim', 'faded');
      const kind = nodeKind(id);

      /* Mode-level fading: in api/sub view the irrelevant side is invisible. */
      let fadedByMode = false;
      if (view === 'api') {
        if (kind === 'sub') fadedByMode = true;
        else if (kind === 'product' && !API_PRODUCTS.has(id)) fadedByMode = true;
      } else if (view === 'sub') {
        if (kind === 'api') fadedByMode = true;
        else if (kind === 'product' && !SUB_PRODUCTS.has(id)) fadedByMode = true;
      }
      if (fadedByMode) { n.classList.add('faded'); return; }

      /* Hover state (works in all/api/sub modes on the still-visible nodes). */
      if (hoverSet) {
        if (hoverSet.has(id)) n.classList.add('hl');
        else n.classList.add('dim');
      }
    });

    this.caption.innerHTML = this.captions[view];
    this.drawConnections();
  }

  drawConnections() {
    if (!this.stage.isConnected) return;
    const stageRect = this.stage.getBoundingClientRect();
    if (stageRect.width === 0) return;

    const used = new Set();
    const hoverSet = this.hovered ? this.hoverSet(this.hovered) : null;

    const drawSegment = ([from, to, colorVar]) => {
      const key = `${from}|${to}`;
      used.add(key);
      let p = this.paths.get(key);
      if (!p) {
        p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.classList.add('cline');
        this.svg.appendChild(p);
        this.paths.set(key, p);
      }
      const fEl = this.nodes.get(from);
      const tEl = this.nodes.get(to);
      if (!fEl || !tEl) return;
      p.setAttribute('d', this.calcPath(fEl, tEl, stageRect));
      p.style.stroke = `var(--${colorVar})`;
      p.classList.remove('hl', 'dim', 'faded');

      const ek = edgeKind(from, to);

      /* Mode-level fading for the irrelevant edge kind. */
      let fadedByMode = false;
      if (this.view === 'api' && ek === 'sub') fadedByMode = true;
      else if (this.view === 'sub' && ek === 'api') fadedByMode = true;

      if (fadedByMode) {
        p.classList.add('faded');
      } else if (hoverSet) {
        const match = hoverSet.has(from) && hoverSet.has(to);
        p.classList.add(match ? 'hl' : 'dim');
      }
      /* else: default cline opacity 0.32 — nothing applied. */
    };

    SEGMENTS.forEach(seg => drawSegment(seg));

    this.paths.forEach((p, key) => {
      if (!used.has(key)) { p.remove(); this.paths.delete(key); }
    });
  }

  calcPath(fromEl, toEl, stageRect) {
    const fr = fromEl.getBoundingClientRect();
    const tr = toEl.getBoundingClientRect();
    const fcx = fr.left + fr.width / 2;
    const tcx = tr.left + tr.width / 2;
    let x1, y1, x2, y2;
    if (fcx < tcx) {
      x1 = fr.right - stageRect.left; y1 = fr.top + fr.height / 2 - stageRect.top;
      x2 = tr.left  - stageRect.left; y2 = tr.top + tr.height / 2 - stageRect.top;
    } else {
      x1 = fr.left  - stageRect.left; y1 = fr.top + fr.height / 2 - stageRect.top;
      x2 = tr.right - stageRect.left; y2 = tr.top + tr.height / 2 - stageRect.top;
    }
    const dx = Math.abs(x2 - x1) * 0.38;
    const sx = x1 < x2 ? 1 : -1;
    return `M${x1},${y1} C${x1 + dx * sx},${y1} ${x2 - dx * sx},${y2} ${x2},${y2}`;
  }
}

customElements.define(TAG, Section05);
