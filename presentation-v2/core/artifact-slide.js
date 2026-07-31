/* The document template shared by the four artifact slides.
 *
 * Sections are otherwise self-contained by convention, but these four are
 * one slide shown four times with the crumb shifted right — duplicating
 * the mock-up four times would guarantee they drift apart. The content of
 * each artifact still lives in its own section file; only the frame and
 * its CSS live here.
 *
 * The document body is literal file source, so it is set in the code face
 * throughout — prose inside a markdown file is still that file's source.
 */

export const artifactCss = TAG => `
  ${TAG} {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    padding: var(--ae-space-4) var(--ae-gutter);
    background: var(--fg-paper);
    overflow: auto;
  }
  ${TAG} h1 {
    margin: 0 0 var(--ae-space-3);
    font-size: var(--ae-fs-h2);
    line-height: var(--ae-lh-h2);
    color: var(--fg-ink);
  }

  /* The crumb: which of the four you are looking at. */
  ${TAG} .crumb {
    display: flex;
    align-items: center;
    gap: var(--ae-space-2);
    flex-wrap: wrap;
    margin-bottom: var(--ae-space-4);
  }
  ${TAG} .seg {
    font-family: var(--ae-font-mono);
    font-size: var(--ae-fs-caption);
    line-height: 1;
    color: var(--fg-faint);
    padding: 5px 11px;
    border-radius: 100px;
    border: 1px solid var(--fg-hair);
  }
  ${TAG} .seg--on {
    color: #fff;
    background: var(--fg-green);
    border-color: var(--fg-green);
    font-weight: 700;
  }
  ${TAG} .sep { color: var(--ae-cool-gray-300); font-weight: 700; }

  ${TAG} .doc {
    padding: 0;
    overflow: hidden;
    margin-bottom: var(--ae-space-4);
  }
  ${TAG} .fm {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ae-space-2) var(--ae-space-5);
    padding: var(--ae-space-3) var(--ae-space-5);
    background: var(--ae-cool-gray-100);
    border-bottom: 1px solid var(--fg-hair);
    font-family: var(--ae-font-mono);
    font-size: calc(var(--ae-fs-caption) * 0.92);
    line-height: 1.3;
    color: var(--fg-muted);
  }
  ${TAG} .body {
    padding: var(--ae-space-4) var(--ae-space-5);
    font-family: var(--ae-font-mono);
    font-size: calc(var(--ae-fs-small) * 0.88);
    line-height: 1.5;
  }
  ${TAG} .body .h {
    color: var(--fg-green-d);
    font-weight: 700;
    margin-top: var(--ae-space-3);
  }
  ${TAG} .body .h:first-child { margin-top: 0; }
  ${TAG} .body .p    { color: var(--fg-body); }
  ${TAG} .body .li   { color: var(--fg-ink); padding-left: var(--ae-space-3); }
  ${TAG} .body .done { color: var(--fg-green); padding-left: var(--ae-space-3); }
  ${TAG} .body .row  {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr) auto;
    gap: var(--ae-space-3);
    padding: 3px 0;
    border-bottom: 1px solid var(--fg-hair);
    color: var(--fg-ink);
  }
  ${TAG} .body .row--head { color: var(--fg-faint); border-bottom-color: var(--ae-cool-gray-300); }
  ${TAG} .body .row span:last-child { text-align: right; white-space: nowrap; }
  ${TAG} .body .ok   { color: var(--fg-green); font-weight: 700; }
  ${TAG} .body .fail { color: var(--ae-error); font-weight: 700; }

  @media (max-width: 900px) {
    ${TAG} .body .row { grid-template-columns: 1fr; gap: 0; }
    ${TAG} .body .row span:last-child { text-align: left; }
  }
`;

/* Rows are tagged by kind so a slide states what a line IS, not how it
   should look: h = heading, p = paragraph, li = bullet, done = ticked
   item, row = a three-column table line, head = its header. */
const line = (row, at) => {
  if (row.h)    return `<div class="h fg-in" style="--fg-at: ${at}">${row.h}</div>`;
  if (row.li)   return `<div class="li fg-in" style="--fg-at: ${at}">- ${row.li}</div>`;
  if (row.done) return `<div class="done fg-in" style="--fg-at: ${at}">- [x] ${row.done}</div>`;
  if (row.todo) return `<div class="li fg-in" style="--fg-at: ${at}">- [ ] ${row.todo}</div>`;
  if (row.row)  return `<div class="row ${row.head ? 'row--head' : ''} fg-in" style="--fg-at: ${at}">`
    + row.row.map((c, i) => `<span class="${i === 2 && !row.head ? (c.startsWith('FAIL') || c.startsWith('offen') || c.startsWith('not ') || c.startsWith('nicht') ? 'fail' : 'ok') : ''}">${c}</span>`).join('')
    + `</div>`;
  if (row.gap)  return `<div style="height: var(--ae-space-2)"></div>`;
  return `<div class="p fg-in" style="--fg-at: ${at}">${row.p}</div>`;
};

export const artifactHtml = t => `
  <div class="fg-wrap">
    <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>

    <div class="crumb fg-in" style="--fg-at: 2">
      ${t.segs.map((s, i) => `
        <span class="seg ${i === t.active ? 'seg--on' : ''}">${s}</span>
        ${i < t.segs.length - 1 ? '<span class="sep" aria-hidden="true">→</span>' : ''}
      `).join('')}
    </div>

    <div class="doc fg-card fg-in" style="--fg-at: 3">
      <div class="fm">${t.fm.map(f => `<div>${f}</div>`).join('')}</div>
      <div class="body">
        ${t.doc.map((row, i) => line(row, 4 + Math.min(i, 6))).join('')}
      </div>
    </div>

    <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.caption}</span></p>
  </div>`;
