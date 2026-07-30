/* Audit the currently mounted slide against the spec's mechanical criteria.
 * Returns JSON: overflow, smallest text, mono misuse, all-caps mono, edge bars. */
(() => {
  const sec = document.querySelector('#stage > *');
  if (!sec) return JSON.stringify({ error: 'no slide mounted' });

  const tag = sec.tagName.toLowerCase();
  const pos = sec.dataset.pos || '?';

  /* ── criterion 10: does the slide fit? ── */
  const overflowY = sec.scrollHeight - sec.clientHeight;
  const overflowX = sec.scrollWidth - sec.clientWidth;

  /* Walk every element that renders its own text. */
  const hasOwnText = el =>
    [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length);

  const els = [...sec.querySelectorAll('*')].filter(el => {
    if (['STYLE', 'SCRIPT'].includes(el.tagName)) return false;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && hasOwnText(el);
  });

  const isMono = ff => /mono|courier|menlo|consolas|sf mono/i.test(ff);
  /* Criterion 4: mono is for a path, a filename, a command, a hex
     value, or the literal source of a file — YAML frontmatter, markdown, a
     config snippet. Prose about those things is not code, and neither is a
     label or table header that merely sits inside a source panel. */
  const CODEISH = [
    /^[.~/]?[\w@.\-/<>*]+\.(md|json|toml|js|mjs|yml|yaml|css|html|sh|py|ts)\b/,  // filename
    /^[.~]?\//, /\/$/,                        // a path, or a trailing-slash dir
    /^#[0-9A-Fa-f]{3,8}$/,                    // hex colour
    /^-{3,}$/,                                // YAML document marker
    /^[a-z_][\w-]*:\s/i,                      // YAML key: value
    /^#{1,6}\s/,                              // markdown heading
    /^[-*]\s\[[ x]\]/,                        // markdown task item
    /^\|.*\|/,                                // markdown table row
    /^(npm|npx|node|git|ln|python3?|bash|sh|cd|curl)\b/,  // command
    /^[A-Z_]{2,}=/,                            // env assignment
  ];

  /* ── criterion 7: nothing under 14px, body at least 16px ── */
  const small = [];
  /* ── criteria 4 & 5: mono only on code, never all caps ── */
  const monoNonCode = [];
  const monoCaps = [];

  for (const el of els) {
    const cs = getComputedStyle(el);
    const px = parseFloat(cs.fontSize);
    const text = el.textContent.trim().replace(/\s+/g, ' ').slice(0, 60);

    if (px < 14) small.push(`${px}px  <${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}>  "${text}"`);

    /* Inside a .fg-source panel the content IS a file's literal source, so
       the code face is correct — see the slide kit.
       Headers and labels in such a panel are still checked: they are given the
       body face, so isMono() is false for them and they never reach here. */
    /* <code>, <kbd> and <samp> are HTML's own markers for code, keyboard
       input and program output. Honouring them is reading the markup, not
       excusing it. */
    const inSource = !!el.closest('.fg-source, code, kbd, samp');

    if (isMono(cs.fontFamily) && !inSource) {
      if (cs.textTransform === 'uppercase') monoCaps.push(`"${text}"`);
      /* A path, filename, command or hex is code. Prose is not. */
      const looksCode = CODEISH.some(re => re.test(text));
      if (!looksCode) monoNonCode.push(`"${text}"`);
    }
  }

  /* ── criterion 2: no coloured edge bars ── */
  const bars = [];
  for (const el of [...sec.querySelectorAll('*')]) {
    const cs = getComputedStyle(el);
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      const w = parseFloat(cs[`border${side}Width`]);
      const col = cs[`border${side}Color`];
      if (w >= 2 && col !== 'rgba(0, 0, 0, 0)' && cs[`border${side}Style`] !== 'none') {
        /* a bar is a thick edge on ONE side only — a full box border is fine */
        const others = ['Top', 'Right', 'Bottom', 'Left']
          .filter(s => s !== side)
          .map(s => parseFloat(cs[`border${s}Width`]));
        if (others.every(o => o < w)) {
          bars.push(`${side.toLowerCase()} ${w}px ${col}  <${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}>`);
        }
      }
    }
  }

  /* ── criterion 6: no chapter label, no position, no rule above
        the heading. The first thing on the slide is its own heading. ── */
  /* Three named-class checks lived here and tested for nothing: the rail was
     removed deck-wide and none of those classes exists in any slide. What
     actually enforces this criterion is the position text below plus
     firstElementIsHeading — a label or rule above the heading displaces it. */
  const furniture = [];
  /* Anything rendering "NN / 30" on the slide itself. */
  if (/\b\d{1,2}\s*\/\s*30\b/.test(sec.textContent)) furniture.push('position text');
  const firstText = els[0];
  /* the ordinal span lives inside the heading, so accept a descendant too */
  const firstIsHeading = !!firstText &&
    (/^H[1-3]$/.test(firstText.tagName) || !!firstText.closest('h1,h2,h3'));

  return JSON.stringify({
    slide: `${pos} ${tag}`,
    viewport: `${innerWidth}x${innerHeight}`,
    lang: document.documentElement.lang,
    fits: overflowY <= 1 && overflowX <= 1,
    overflow: overflowY > 1 || overflowX > 1 ? `y+${overflowY} x+${overflowX}` : 'none',
    navFurniture: furniture,
    firstElementIsHeading: firstIsHeading,
    firstElement: els[0] ? els[0].tagName.toLowerCase() : null,
    under14px: small,
    monoOnNonCode: [...new Set(monoNonCode)],
    monoAllCaps: [...new Set(monoCaps)],
    edgeBars: [...new Set(bars)],
  }, null, 1);
})()
