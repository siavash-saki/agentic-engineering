# SDD adoption kit

Everything needed to run spec-driven development in a repo, and nothing else.
Copy it in, fill three sections of one file, write your first spec. Thirty
minutes.

The method it installs is the one taught in [`../presentation/`](../presentation/):
five phases, four artifacts, two human gates.

```
EXPLORE → DISCUSS → (gate) → PLAN → (gate) → CODE → REVIEW
             ↓                 ↓        ↓        ↓
          spec.md      plan.md·tasks.md  ✓tasks  verification.md
```

## Install

```bash
./install.sh /path/to/your-repo --dry-run   # see what it would do
./install.sh /path/to/your-repo
```

It never overwrites and never deletes — every file is written only if absent,
anything already there is reported and left alone, and a second run is inert.

Or do it by hand; the kit's layout *is* the layout it produces:

```bash
cp AGENTS.md your-repo/ && (cd your-repo && ln -s AGENTS.md CLAUDE.md)
cp -r sdd .claude scripts your-repo/
```

## What lands in your repo

| Path | What it is |
|---|---|
| `AGENTS.md` | The memory file. Your project at the top, the method below it. |
| `CLAUDE.md` | A symlink to `AGENTS.md` — one file, one source of truth. |
| `sdd/README.md` | The convention: layout, frontmatter, status lifecycles, versioning. |
| `sdd/_templates/` | One template per artifact. |
| `.claude/commands/` | `/sdd-spec`, `/sdd-plan`, `/sdd-code`, `/sdd-verify`. |
| `scripts/lint-artifacts.mjs` | The check. No dependencies, Node 18+. |

Not installed, and staying here: `fixtures/`, used to prove the check works.

## The first thirty minutes

1. **Fill the top of `AGENTS.md`** — what the project is, the build and test
   commands, and the three-to-seven conventions you actually enforce. Leave
   everything below *How we work*.
2. **Run the check**: `node scripts/lint-artifacts.mjs`. Zero features is the
   correct answer until you write one.
3. **Write your first spec**: `/sdd-spec <the thing you want to build>`. Pick
   something real and mid-sized. A toy feature teaches you nothing about where
   the method costs you.
4. **Stop at the gate.** The command will stop; the point is that you read the
   spec before approving it. That five minutes is where the method pays.
5. `/sdd-plan`, then `/sdd-code`, then — **in a fresh session, ideally in a
   different model family** — `/sdd-verify`.

## The commands

| Command | Phase | Stops at |
|---|---|---|
| `/sdd-spec <description>` | Explore + Discuss | The spec gate. Writes no plan. |
| `/sdd-plan <feature>` | Plan | The plan gate. Refuses an unapproved spec. |
| `/sdd-code <feature>` | Code | Refuses an unapproved plan. One commit per task. |
| `/sdd-verify <feature>` | Review | Writes the proof. Declares itself if it is the author. |

They are Markdown prompts. On another tool, put the same four files wherever it
keeps reusable procedures — the path table in `AGENTS.md` has the mapping. The
method does not depend on them; they only keep the discipline from being the
thing you remember to do.

## The check

```bash
node scripts/lint-artifacts.mjs                    # your sdd/
node scripts/lint-artifacts.mjs fixtures/broken    # watch every rule fail
node scripts/lint-artifacts.mjs fixtures/clean     # and pass
```

It enforces nine rules, all mechanically decidable: artifacts present,
frontmatter complete and consistent, statuses legal for their artifact type,
provenance recorded, dates sane, lifecycle coherent — and the one that matters
most, **a verification row may not claim a pass while its own evidence hedges**
("covered by code review", "by construction", "no live test was performed").

It does **not** judge whether evidence is sufficient. That stays human, and no
amount of green output here means "verified".

Run the fixtures once before you trust it. A check nobody has seen fail is not
evidence either.

## Adopting mid-project

- Do not backfill. Artifacts written before you adopted this get `unknown` for
  the provenance fields — a legal value and a true statement.
- Do not retrofit specs onto shipped code. That is documentation, and it is the
  first anti-pattern in the list.
- Start with the next feature, and use the **fast path** (spec + verification
  only) for the small ones until the four-artifact flow earns its keep.

## What this kit deliberately leaves out

CI workflows, branch and PR mechanics, the evidence-class vocabulary
(*confirmed* / *confirmed mechanism, unmeasured impact* / *plausible* /
*comparative judgment*), and phase-boundary audits. They are real practices and
they are the next things to add — after the four artifacts are habit, not
before. A method that arrives all at once gets adopted all at once and abandoned
the same way.
