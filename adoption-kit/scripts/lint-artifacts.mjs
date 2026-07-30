#!/usr/bin/env node
// Artifact lint — the mechanical half of the proof system.
//
// It enforces what a machine can decide about SDD records: that every feature
// has its artifacts, that frontmatter is present and internally consistent,
// that status values are legal for their artifact type, and that a verification
// row does not claim a pass while its own evidence hedges.
//
// It deliberately does NOT judge whether evidence is sufficient. That stays
// human, and no amount of green output from this file should be read as
// "verified". The one judgment it does make is narrow and was paid for: a
// criterion that is a conjunction, evidenced by one conjunct, reads as passed —
// which is how most false verification rows get written.
//
// No dependencies. Node 18+.
//
//   node scripts/lint-artifacts.mjs            # this repo's sdd/
//   node scripts/lint-artifacts.mjs <path>     # any folder, e.g. a fixture
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, basename } from "node:path";

// A path argument lets the rules be exercised against a fixture — a lint nobody
// has seen fail is not evidence either.
const SDD = process.argv[2] ?? "sdd";
const ARTIFACTS = ["spec", "plan", "tasks", "verification"];
const REQUIRED_KEYS = ["feature", "artifact", "version", "status", "updated"];
// Provenance: who wrote this version. "unknown" is a legal value — an artifact
// written before you adopted the convention says unknown rather than carrying a
// guess. A guessed provenance is worse than an absent one.
const PROVENANCE_KEYS = ["authoring_tool", "model", "reasoning_effort"];
// Status is per artifact type. Verification is a record, not a gate: it is
// draft while in flight and final once the last task is checked, and never
// approved or superseded.
const STATUSES = {
  spec: new Set(["draft", "approved", "superseded"]),
  plan: new Set(["draft", "approved", "superseded"]),
  tasks: new Set(["draft", "approved", "superseded"]),
  verification: new Set(["draft", "final"]),
};

// Phrases that concede the criterion was not exercised. A row carrying one of
// these while claiming a pass is the shape this rule exists to stop.
const HEDGES = [
  "no live",
  "no credentialed",
  "by construction",
  "code review",
  "not tested",
  "untested",
  "unable to",
  "could not be tested",
  "assumed",
];
const PASS = /\b(pass|passed|✓|✅|yes|green)\b/i;
const FAIL_WORDS = /\b(pending|fail|failed|partial|not verified|deferred|n\/a)\b/i;

const problems = [];
const checked = { features: 0, files: 0, rows: 0 };
const fail = (file, rule, detail) => problems.push({ file, rule, detail });

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const body = text.slice(end + 4);
  const fm = {};
  for (const line of text.slice(4, end).split("\n")) {
    const m = line.match(/^([a-z_]+):\s*(.*?)\s*(?:#.*)?$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return { fm, body };
}

const isoOk = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));
const today = new Date().toISOString().slice(0, 10);

/** Split a markdown table into rows of trimmed cells. */
function tables(body) {
  const out = [];
  let cur = null;
  for (const line of body.split("\n")) {
    if (line.trim().startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue; // separator
      if (!cur) { cur = { header: cells, rows: [] }; out.push(cur); }
      else cur.rows.push(cells);
    } else if (line.trim() === "") {
      cur = null;
    }
  }
  return out;
}

function lintVerificationRows(file, body) {
  // Only the per-criterion tables matter. Identify them by a header naming a
  // criterion; anything else (suite counts, scope guards) is prose.
  for (const t of tables(body)) {
    const head = t.header.map((h) => h.toLowerCase());
    const isCriteria = head.some((h) => /criteri|check|ac|#/.test(h));
    if (!isCriteria) continue;
    const resultCol = head.findIndex((h) => /result|status|verdict/.test(h));
    // The hedge lives in the evidence, never in the criterion — a criterion may
    // legitimately quote the words the rule forbids ("no live verification row
    // may…"). Scan everything except the criterion cell.
    const criterionCol = head.findIndex((h) => /criteri/.test(h));

    for (const row of t.rows) {
      checked.rows++;
      const text = row.filter((_, i) => i !== criterionCol).join(" ");
      const lower = text.toLowerCase();
      // A negated hedge is the opposite of a hedge — "tested, not assumed"
      // asserts evidence rather than conceding its absence.
      const hedge = HEDGES.find((h) => {
        let i = lower.indexOf(h);
        while (i !== -1) {
          if (!/\b(not|never|rather than)\s+$/.test(lower.slice(Math.max(0, i - 12), i))) return true;
          i = lower.indexOf(h, i + 1);
        }
        return false;
      });
      if (!hedge) continue;

      // A row claims a pass either explicitly, or implicitly when the table
      // offers no result column at all — a table of criteria with only evidence
      // reads as "all satisfied".
      const claimed =
        resultCol >= 0
          ? PASS.test(row[resultCol] ?? "") && !FAIL_WORDS.test(row[resultCol] ?? "")
          : !FAIL_WORDS.test(text);
      if (claimed) {
        fail(
          file,
          "hedged-pass",
          `row "${(row[0] || text).slice(0, 48)}" claims a pass but its evidence hedges ("${hedge}")`,
        );
      }
    }
  }
}

if (!existsSync(SDD)) {
  console.error(`No such folder: ${SDD}`);
  process.exit(2);
}

const featureDirs = readdirSync(SDD)
  .filter((d) => /^\d{4}-/.test(d) && statSync(join(SDD, d)).isDirectory())
  .sort();

const specDates = new Map();

for (const dir of featureDirs) {
  checked.features++;
  const path = join(SDD, dir);
  const specPath = join(path, "spec.md");

  // Rule: a feature holds all four artifacts, unless its spec declares why not.
  // Two legitimate reasons, both stated in frontmatter so the reason is a
  // deliberate act rather than a keyword that happens to appear in prose:
  //   fast_path: true   — the granted spec+verification path; no plan/tasks
  //   incomplete: <why> — deferred, or in flight; the value says which
  const specFm = existsSync(specPath)
    ? parseFrontmatter(readFileSync(specPath, "utf8"))?.fm ?? {}
    : {};
  const fastPath = specFm.fast_path === "true";
  const required = fastPath ? ["spec", "verification"] : ARTIFACTS;
  const missing = required.filter((a) => !existsSync(join(path, `${a}.md`)));
  if (missing.length && !specFm.incomplete) {
    fail(
      join(path, ""),
      "incomplete-feature",
      `missing ${missing.join(", ")}; declare "fast_path: true" or "incomplete: <why>" in the spec`,
    );
  }

  const files = [];
  for (const a of ARTIFACTS) {
    const p = join(path, `${a}.md`);
    if (existsSync(p)) files.push({ p, artifact: a, archived: false });
  }
  const archiveDir = join(path, "archive");
  if (existsSync(archiveDir)) {
    for (const f of readdirSync(archiveDir).filter((f) => f.endsWith(".md"))) {
      files.push({ p: join(archiveDir, f), artifact: f.split(".")[0], archived: true });
    }
  }

  for (const { p, artifact, archived } of files) {
    checked.files++;
    const parsed = parseFrontmatter(readFileSync(p, "utf8"));
    if (!parsed) { fail(p, "frontmatter", "no frontmatter block"); continue; }
    const { fm, body } = parsed;

    for (const k of REQUIRED_KEYS) {
      if (!fm[k]) fail(p, "frontmatter", `missing required key "${k}"`);
    }
    for (const k of PROVENANCE_KEYS) {
      if (!fm[k]) fail(p, "provenance", `missing "${k}" (use "unknown" rather than a guess)`);
    }
    // Archives are frozen. They were written under the rules of their own time
    // and are never rewritten — their status is metadata about a past lifecycle,
    // not a claim about today. Structural checks (required keys, path agreement,
    // dates) still apply: those catch corruption, not obsolescence.
    //
    // reasoning_effort is deliberately unvalidated beyond being present. Effort
    // ladders are vendor vocabulary — they differ between tools and gain rungs —
    // so the field records whatever the agent reports rather than whatever a
    // list written on one date happens to allow.
    if (!archived) {
      const allowed = STATUSES[artifact];
      if (allowed && fm.status && !allowed.has(fm.status)) {
        fail(p, "status-enum", `"${fm.status}" is not valid for a ${artifact} (${[...allowed].join(" | ")})`);
      }
    }
    if (fm.feature && fm.feature !== dir) {
      fail(p, "path-mismatch", `frontmatter feature "${fm.feature}" ≠ directory "${dir}"`);
    }
    if (fm.artifact && fm.artifact !== artifact) {
      fail(p, "path-mismatch", `frontmatter artifact "${fm.artifact}" ≠ filename "${artifact}"`);
    }
    if (archived) {
      const m = basename(p).match(/\.v(\d+)\.md$/);
      if (m && fm.version && String(fm.version) !== m[1]) {
        fail(p, "path-mismatch", `archived as v${m[1]} but frontmatter version is ${fm.version}`);
      }
    }
    if (fm.updated) {
      if (!isoOk(fm.updated)) fail(p, "date", `"${fm.updated}" is not a valid ISO date`);
      else if (fm.updated > today) fail(p, "date", `"${fm.updated}" is in the future`);
      else if (artifact === "spec" && !archived) specDates.set(dir, fm.updated);
    }

    if (artifact === "verification" && !archived) {
      const tasksPath = join(path, "tasks.md");
      if (existsSync(tasksPath)) {
        const open = (readFileSync(tasksPath, "utf8").match(/^\s*[-*] \[ \]/gm) || []).length;
        if (fm.status === "final" && open > 0) {
          fail(p, "lifecycle", `status final but tasks.md has ${open} unchecked box(es)`);
        }
        // A draft record with every task checked is honest only if it says what
        // is still open — that is the difference between "awaiting the field
        // round" and a record nobody finished.
        if (fm.status === "draft" && open === 0 && !/\b(open|pending|awaiting|not yet)\b/i.test(body)) {
          fail(p, "lifecycle", "status draft but every task is checked and nothing is named as open");
        }
      }
      // False-pass rules apply to LIVE records only. Archives preserve history
      // and must not be rewritten.
      lintVerificationRows(p, body);
    }
  }
}

// Dates: a verification cannot predate its own spec.
for (const dir of featureDirs) {
  const vp = join(SDD, dir, "verification.md");
  if (!existsSync(vp)) continue;
  const parsed = parseFrontmatter(readFileSync(vp, "utf8"));
  const specDate = specDates.get(dir);
  if (parsed?.fm.updated && specDate && isoOk(parsed.fm.updated) && parsed.fm.updated < specDate) {
    fail(vp, "date", `verification (${parsed.fm.updated}) predates its spec (${specDate})`);
  }
}

const RULES = [
  "incomplete-feature  four artifacts, or the spec declares fast_path / incomplete",
  "frontmatter         required keys present and parseable",
  "provenance          authoring_tool / model / reasoning_effort present (free text; unknown is legal)",
  "status-enum         status legal for the artifact type (verification is draft|final)",
  "path-mismatch       feature / artifact / archived version agree with the path",
  "date                updated is a valid, non-future date, not before its spec",
  "lifecycle           verification final ⟺ no unchecked tasks",
  "hedged-pass         a live verification row may not claim a pass while its evidence hedges",
];

console.log(`Artifact lint — ${SDD}\n`);
console.log("Rules enforced:");
for (const r of RULES) console.log(`  ${r}`);
console.log(
  `\nChecked ${checked.features} features, ${checked.files} artifacts, ${checked.rows} criterion rows.`,
);
console.log("Archives are frozen: exempt from the hedged-pass and status rules by design.");
console.log("Whether the evidence is sufficient is not checkable here, and stays human.\n");

if (problems.length === 0) {
  console.log("PASS — no violations.");
  process.exit(0);
}
const byFile = new Map();
for (const p of problems) {
  if (!byFile.has(p.file)) byFile.set(p.file, []);
  byFile.get(p.file).push(p);
}
for (const [file, list] of [...byFile].sort()) {
  console.log(file);
  for (const p of list) console.log(`  [${p.rule}] ${p.detail}`);
}
console.log(`\nFAIL — ${problems.length} violation(s) across ${byFile.size} file(s).`);
process.exit(1);
