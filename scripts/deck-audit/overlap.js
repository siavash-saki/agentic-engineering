/* Criterion 10, the half a scroll test cannot see: text that collides with
   other text, or runs outside the slide. Overflow was passing on slide 25
   while seven commit labels sat on top of each other. */
(() => {
  const sec = document.querySelector('#stage > *');
  if (!sec) return JSON.stringify({ error: 'no slide' });
  const box = sec.getBoundingClientRect();

  const own = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length);
  const runs = [];
  for (const el of sec.querySelectorAll('*')) {
    if (['STYLE','SCRIPT'].includes(el.tagName)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    if (parseFloat(cs.opacity) < 0.05) continue;
    if (!own(el)) continue;
    /* An inline element that wraps has one box per line; its bounding rect is
       their union, which spans whitespace it does not occupy and collides with
       innocent neighbours. Measure the line boxes. */
    const t = el.textContent.trim().replace(/\s+/g,' ').slice(0,26);
    for (const r of el.getClientRects()) {
      if (r.width < 2 || r.height < 2) continue;
      runs.push({ el, r, t });
    }
  }

  const clipped = runs.filter(a =>
    a.r.right > box.right + 1 || a.r.left < box.left - 1 ||
    a.r.bottom > box.bottom + 1 || a.r.top < box.top - 1
  ).map(a => `clipped "${a.t}"`);

  /* two text runs collide when their boxes intersect and neither is an
     ancestor of the other (nesting overlaps by definition) */
  /* Adjacent inline spans on one line share vertical extent and touch
     horizontally; a 1px tolerance still calls that a collision. Require the
     intersection to be a real share of the smaller box before believing it. */
  const hit = (a, b) => {
    const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
    const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
    if (w <= 2 || h <= 2) return false;
    const area = w * h;
    const smaller = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
    /* getClientRects() boxes carry the full line-height, so consecutive lines
       of the same paragraph appear to touch. Only a substantial share counts. */
    return area / smaller > 0.5;
  };
  const collisions = [];
  for (let i = 0; i < runs.length; i++)
    for (let j = i + 1; j < runs.length; j++) {
      const a = runs[i], b = runs[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      if (hit(a, b)) collisions.push(`"${a.t}" ↔ "${b.t}"`);
    }

  return JSON.stringify({
    slide: sec.tagName.toLowerCase(),
    lang: document.documentElement.lang,
    clipped: [...new Set(clipped)],
    collisions: [...new Set(collisions)].slice(0, 6),
  }, null, 1);
})()
