/* Regenerate the deck's self-hosted webfonts and their licences.
 *
 *   node scripts/fetch-fonts.mjs
 *
 * Writes presentation/assets/fonts/*.woff2, the licence text for every family,
 * and presentation/assets/fonts.css.
 *
 * The deck must render with no network — a conference room's wifi is not a
 * dependency worth having — and CLAUDE.md forbids CDN links. So the fonts are
 * fetched once, here, and committed. This script exists so that "fetched once"
 * is reproducible rather than a story about something someone did by hand.
 *
 * ── Why two sources ──────────────────────────────────────────────────────────
 *
 * Self-hosting a font is redistribution: every visitor downloads a copy. All
 * three families are SIL OFL 1.1, which permits that "provided that each copy
 * contains the above copyright notice and this license" — so the licences are an
 * output of this script, not something to remember separately.
 *
 * IBM Plex Mono additionally carries a Reserved Font Name ("Plex"). Under the
 * OFL a Modified Version may not use a reserved name, and SIL's own FAQ (2.6)
 * states that removing glyphs to deliver a webfont *is* modification; a subset
 * keeps the name only if it stays functionally equivalent (2.7–2.8), the first
 * condition of which is "supports the same full character inventory". A Latin
 * subset does not. So Plex Mono is taken COMPLETE from IBM's own release, byte
 * for byte, and is the one family here that is not subset.
 *
 * Bricolage Grotesque and Inter reserve no name, so their Latin subsets are
 * permitted Modified Versions and come from the Google Fonts CSS API. Only the
 * latin and latin-ext subsets are kept: the deck is EN/DE. Adding a language
 * with other glyphs means widening KEEP.
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

/* The families the deck uses. Changing this is a design decision, not a
 * maintenance one. */
const QUERY = [
  'family=Bricolage+Grotesque:opsz,wght@12..96,400..800',
  'family=Inter:wght@400..700',
  'display=swap',
].join('&');

/* Complete, unmodified faces. Subsetting these would forfeit the reserved name. */
const COMPLETE = [
  { family: 'IBM Plex Mono', weight: '400', file: 'ibm-plex-mono-400.woff2',
    url: 'https://raw.githubusercontent.com/IBM/plex/master/packages/plex-mono/fonts/complete/woff2/IBMPlexMono-Regular.woff2' },
  { family: 'IBM Plex Mono', weight: '500', file: 'ibm-plex-mono-500.woff2',
    url: 'https://raw.githubusercontent.com/IBM/plex/master/packages/plex-mono/fonts/complete/woff2/IBMPlexMono-Medium.woff2' },
];

/* One licence per family, verbatim from the publisher — a reviewer can fetch
 * these same URLs and diff. Merging them into one file would produce a file that
 * has to be trusted instead of checked. */
const LICENCES = [
  { file: 'OFL-Bricolage-Grotesque.txt', url: 'https://raw.githubusercontent.com/ateliertriay/bricolage/main/OFL.txt' },
  { file: 'OFL-IBM-Plex-Mono.txt',       url: 'https://raw.githubusercontent.com/IBM/plex/master/LICENSE.txt' },
  { file: 'OFL-Inter.txt',               url: 'https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt' },
];

const API   = `https://fonts.googleapis.com/css2?${QUERY}`;
const OUTD  = 'presentation/assets/fonts';
const OUTCSS= 'presentation/assets/fonts.css';
const KEEP  = new Set(['latin', 'latin-ext']);

/* css2 serves woff2 only to clients that admit to supporting it. */
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
         + '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const get = (url, out) =>
  execFileSync('curl', ['-sS', '-f', '-L', '-m', '60', url, '-o', out]);

const css = execFileSync('curl', ['-sS', '-f', '-m', '30', '-A', UA, API], { encoding: 'utf8' });

const field = (body, name) => {
  const m = body.match(new RegExp(`${name}:\\s*([^;]+);`));
  return m ? m[1].trim() : null;
};
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const blocks = [...css.matchAll(/\/\* (\S+) \*\/\s*@font-face \{([^}]+)\}/g)];
if (!blocks.length) {
  console.error('No @font-face blocks in the API response — did the format change?');
  process.exit(1);
}

mkdirSync(OUTD, { recursive: true });

const faces = [];
const seen = new Set();

/* ── Subset faces, from the CSS API ── */
for (const [, subset, body] of blocks) {
  if (!KEEP.has(subset)) continue;

  const family  = field(body, 'font-family').replace(/['"]/g, '');
  const weight  = field(body, 'font-weight');
  const stretch = field(body, 'font-stretch');
  const range   = field(body, 'unicode-range');
  const url     = field(body, 'src').match(/url\(([^)]+)\)/)[1];

  /* Variable faces carry a weight range ("400 800"); statics a single number. */
  const file = `${slug(family)}-${weight.includes(' ') ? 'var' : weight}-${subset}.woff2`;
  if (seen.has(file)) {
    console.error(`Two faces would collide on ${file} — the naming scheme needs another axis.`);
    process.exit(1);
  }
  seen.add(file);

  get(url, `${OUTD}/${file}`);

  faces.push(
    '@font-face {\n' +
    `  font-family: '${family}';\n` +
    '  font-style: normal;\n' +
    `  font-weight: ${weight};\n` +
    (stretch ? `  font-stretch: ${stretch};\n` : '') +
    '  font-display: swap;\n' +
    `  src: url('fonts/${file}') format('woff2');\n` +
    `  unicode-range: ${range};\n` +
    '}'
  );
  console.log(`  ${file}`);
}

/* ── Complete faces, from the publisher. No unicode-range: the whole family is
 *    present, which is exactly the point — see the header. ── */
for (const { family, weight, file, url } of COMPLETE) {
  get(url, `${OUTD}/${file}`);
  faces.push(
    '@font-face {\n' +
    `  font-family: '${family}';\n` +
    '  font-style: normal;\n' +
    `  font-weight: ${weight};\n` +
    '  font-display: swap;\n' +
    `  src: url('fonts/${file}') format('woff2');\n` +
    '}'
  );
  console.log(`  ${file}  (complete, unmodified)`);
}

/* ── Licences ── */
for (const { file, url } of LICENCES) {
  get(url, `${OUTD}/${file}`);
  const first = readFileSync(`${OUTD}/${file}`, 'utf8').split('\n')[0].trim();
  console.log(`  ${file}  — ${first}`);
}

const header =
`/* Self-hosted webfonts — GENERATED, do not hand-edit.
 *
 *   node scripts/fetch-fonts.mjs
 *
 * The deck renders with no network: no CDN link, no font fetched at load time.
 * Licences for all three families sit next to the binaries in fonts/.
 *
 *   Bricolage Grotesque   display, headings, slide titles   variable 400–800
 *   Inter                 body, labels, eyebrows, captions  variable 400–700
 *   IBM Plex Mono         code, file paths, hex values only  400, 500
 *
 * Bricolage and Inter are latin + latin-ext subsets, because the deck is EN/DE.
 * IBM Plex Mono is the complete, unmodified family: it reserves its name, and a
 * subset would be a Modified Version not entitled to carry it.
 */

`;

writeFileSync(OUTCSS, header + faces.join('\n\n') + '\n');
console.log(`\n${faces.length} faces + ${LICENCES.length} licences → ${OUTCSS}`);
