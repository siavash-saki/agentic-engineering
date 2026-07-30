# SDD artifacts

This folder holds the Spec-Driven Development artifacts. The method itself lives
in the root [`AGENTS.md`](../AGENTS.md); this file is just the convention.

## Layout

```
sdd/
  NNNN-<feature-slug>/
    spec.md          # current — What / Why  (behavior, acceptance criteria, out of scope)
    plan.md          # current — How         (approach, sequence, risks, areas touched)
    tasks.md         # current — Steps       (flat checkable list, one task ≈ one commit)
    verification.md  # current — Proof       (evidence against the spec's acceptance criteria)
    archive/         # superseded versions
      spec.v1.md
      plan.v1.md
```

Feature numbers are assigned in order and **never reused**. The slug matches the
branch name, so a diff carries the reasoning and the change together.

## Flow

```
SPEC → (agree) → PLAN → (agree) → TASKS → implement → VERIFICATION
```

Each `(agree)` is a human gate. Keep every artifact **minimal** — no function
names, no code, no pseudo-code. Behavior over mechanism.

## Frontmatter

Every artifact begins with:

```yaml
---
feature: NNNN-<feature-slug>
artifact: spec | plan | tasks | verification
version: 1
status: draft | approved | superseded      # spec / plan / tasks
                                           # verification: draft | final
updated: YYYY-MM-DD
authoring_tool: claude-code | codex | <other> | unknown
model: <human-readable model name and version> | unknown
reasoning_effort: <as the agent reports it> | unknown
---
```

`status` is **per artifact type**. `spec` / `plan` / `tasks` use
`draft | approved | superseded`. `verification` uses `draft | final` and never
the other two — it is a record, not a gate.

`reasoning_effort` is **free text**, filled by the agent in its own words —
whatever it actually ran at. It is not a closed list, because effort ladders are
vendor vocabulary: they differ between tools and they gain rungs. A convention
meant to be copied into other repos should not pin one vendor's ladder as of one
date, and a value rounded to fit a list is worse than the truth.

Free text is an instruction to be specific, not permission to be vague. The
field is still **required**: an absent effort is a `provenance` violation, and
`unknown` is the honest answer only when the setting genuinely cannot be
resolved.

The provenance fields identify the agent primarily responsible for the current
version. Resolve them actively — prefer session metadata, otherwise the tool's
configured model and effort settings. Use `unknown` only when both are
unavailable; a guessed provenance is worse than an absent one. Write
human-facing labels (`gpt-5.6 Sol`, not `gpt-5.6-sol`). A material rewrite
updates provenance; typo and formatting edits do not transfer authorship.

Adopting this convention mid-project? Artifacts written before it are **not
backfilled** — give them `unknown` on all three fields. `unknown` is a legal
value and a true statement; an invented author is neither.

## Verification

Every feature ends with a `verification.md`: the evidence that the shipped
behavior meets the spec's acceptance criteria — a per-criterion table, the
automated check results, and any screenshot references.

Its lifecycle differs from the other artifacts: `draft` while the feature is in
flight, `final` once the last task is checked. It never becomes `approved` or
`superseded`.

**Verification is never archived.** A re-verification overwrites the file and
bumps `version`; git carries the history. Archiving it produces records stamped
with a status the lifecycle forbids.

## Versioning

- `spec.md` / `plan.md` / `tasks.md` are always the current version.
- On a material change: copy the old file to `archive/<name>.v<N>.md`, mark the
  copy `superseded`, bump `version` in the live file. Small wording fixes do not
  archive.
- `verification.md` is the exception — overwrite and bump, never archive.
- A feature folder holds all four artifacts, **or** its spec states where the
  deferral was decided (the fast path). A folder with a spec and nothing else is
  indistinguishable from abandoned work.

## Checking

```bash
node scripts/lint-artifacts.mjs          # this repo's sdd/
node scripts/lint-artifacts.mjs <path>   # any folder, e.g. a fixture
```

It enforces what a machine can decide. Whether the evidence is *sufficient*
stays a human judgment.
