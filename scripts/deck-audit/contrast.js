/* Criterion 8: every text run on the slide clears WCAG AA against its own
   background — 4.5:1 below 24px, 3:1 at or above it.

   The effective background is found by walking up the ancestor chain to the
   first non-transparent background-color, which is what the eye does. Alpha
   backgrounds are composited over what is behind them, so a translucent panel
   is measured as it actually renders, not as its declared colour. */
(() => {
  const sec = document.querySelector('#stage > *');
  if (!sec) return JSON.stringify({ error: 'no slide' });

  const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  const parse = s => {
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map(Number);
    return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 };
  };
  const over = (fg, bg) => fg.rgb.map((c, i) => c * fg.a + bg[i] * (1 - fg.a));

  /* the effective background behind an element */
  const inside = (a, b) => a.left >= b.left - 1 && a.right <= b.right + 1 &&
                           a.top >= b.top - 1 && a.bottom <= b.bottom + 1;
  const bgOf = el => {
    const r = el.getBoundingClientRect();
    let stack = [];
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      /* an absolutely-positioned child can sit outside its parent's box; that
         parent's paint is then not behind it */
      if (n !== el && !inside(r, n.getBoundingClientRect())) continue;
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) { stack.push(c); if (c.a === 1) break; }
    }
    let base = [255, 255, 255];
    for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
    return base;
  };

  const hasOwnText = el =>
    [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length);

  const fails = [];
  for (const el of sec.querySelectorAll('*')) {
    if (['STYLE', 'SCRIPT'].includes(el.tagName)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    if (parseFloat(cs.opacity) === 0) continue;          /* pre-animation state */
    /* Element opacity dilutes the text toward its backdrop just as an alpha
       colour does. Accumulate it up the tree and fold it into the foreground,
       or a 0.88 label measures as if it were opaque. */
    let stackOpacity = 1;
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      stackOpacity *= parseFloat(getComputedStyle(n).opacity);
    }
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    if (!hasOwnText(el)) continue;

    const fg = parse(cs.color);
    if (!fg) continue;
    const bg = bgOf(el);
    const alpha = fg.a * stackOpacity;
    const eff = alpha < 1 ? over({ rgb: fg.rgb, a: alpha }, bg) : fg.rgb;

    const px = parseFloat(cs.fontSize);
    const bold = (parseInt(cs.fontWeight, 10) || 400) >= 700;
    /* WCAG "large" = 24px, or 18.66px bold */
    const large = px >= 24 || (bold && px >= 18.66);
    const need = large ? 3.0 : 4.5;
    const got = ratio(eff, bg);

    if (got < need) {
      fails.push({
        el: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
        text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 40),
        px: Math.round(px * 10) / 10,
        got: Math.round(got * 100) / 100,
        need,
      });
    }
  }
  return JSON.stringify({
    slide: sec.tagName.toLowerCase(),
    lang: document.documentElement.lang,
    fails,
  }, null, 1);
})()
