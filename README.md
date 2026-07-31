# Agentic Engineering

**How to build production software with coding agents.**

A conference talk and the kit that goes with it. The deck is 31 slides,
bilingual (EN/DE), dependency-free, in [`presentation-v2/`](presentation-v2/).
This README is the method it teaches.

## The argument

> **A** — *"Here's the inventory data. Build me a dashboard."*
> **B** — *"Here's the inventory data. I want a dashboard. Before you write any
> code: read it, then let's talk. What KPIs matter? What should the charts show?
> What do we leave out? Ask me until you know."*

**A** gives you a dashboard you throw away — the agent guessed the charts, the
metrics and the colours, and all of it looks finished. **B** costs one
conversation: it asks, you answer, the answers go in a markdown file, it builds
from the file, you check it against the file.

Not more formal. Just **decided by a person** instead of by a model filling in a
blank.

## The loop: Plan → Build → Review

| | |
|---|---|
| **1 · Plan** | Decide what it should do. Write it down. |
| **2 · Build** | Small steps. One step, one commit. |
| **3 · Review** | Check it against the plan. Then let another model read it. |

Not new. **What changed is why it has to be written down**: the agent reads only
what is written, and decides everything else itself. Written down, there is no
guessing, no drifting, and a yardstick to check code you did not write.

**Two gates**, both yours: a person agrees the plan *before the code*, and
accepts the result *before it is done*. An agent reporting its own success is
not a gate.

## 1 · Plan

Two questions, in this order: what should it do, and how should it be built.
Four moves — **read** the code first, **ask** until nothing is guessed,
**converge** on the trade-offs with a person, **write** it in a file.

- **Read before writing.** Name the files, ask for a summary, forbid changes. A
  summary you disagree with is the cheapest correction available.
- **Make it ask.** *"Ask me every question you need answered to write the plan
  without guessing."* Per key or per IP? Fixed window or sliding? The questions
  are where the requirements are.
- **Behaviour, not mechanism.** ✅ *"Requests over the limit get 429 with a
  `Retry-After` header."* ❌ *"Add `checkLimit()` at the top of
  `handleRequest()`, reading from Redis."* The second makes decisions the model
  would have made better, and leaves nothing to check.
- **It holds**: context, what it should do, checkable acceptance criteria, out of
  scope, open questions. **Never**: function names, code, line-level detail.

Four ways a plan fails, all of which still look like a plan: **written
afterwards** (that is documentation), **written as pseudo-code**, **no
acceptance criteria**, **orphaned** — written once, then never referenced while
building. The last is the common one and leaves no trace.

## 2 · Build

The agent writes a thousand lines before you finish the first hundred. Every
rule here keeps the output smaller than your attention.

1. **A checklist first** — the plan as a flat list of steps, worked in order.
2. **One step, one commit** — a forty-file diff is not reviewable; six six-file diffs are.
3. **The plan stays in the prompt** — referenced each step, not read once.

Underneath it, what the agent knows before it writes anything:

- **Memory** — one file every tool reads: `ln -s AGENTS.md CLAUDE.md`. Stack,
  conventions, what is out of scope *and why*, how you work.
- **Skills** — a procedure you have now explained twice, in a file the model
  loads on demand.
- **MCP** — the systems it may reach. *The test: you are copying from another
  window into the prompt.*

**Tool output is data, not instructions.** Your prompt and a hostile issue title
arrive as text in one context, to one model. Vet servers like dependencies, keep
write scope small, and read the diff.

**When reality contradicts the plan, the plan changes.** Stop, correct it,
re-agree, continue. A stale plan does not fail loudly — it quietly turns Review
into a formality.

## 3 · Review

Two questions with different answers, different evidence and different people
answering:

| | Measured against | Answered by |
|---|---|---|
| **Did we build what we agreed?** | The plan | You |
| **Is the code any good?** | The craft | A model that was not there |

*"It runs"* answers neither.

**Walk the criteria one row at a time**, each with the evidence that checked it —
a verdict with nothing next to it is an opinion. Three rules for what a pass may
claim: a criterion with two halves needs evidence for **both**; a hedged row
("covered by code review", "correct by construction") is **not** a pass; an
untested branch is **not** verified. A record that says *not verified* truthfully
beats one that says *pass* convincingly.

**A green test proves the test ran, not that it could have failed.** An agent
once wrote `expect(hidden.red).toBeLessThan(hidden.red + 60)` — both sides from
the same measurement, true for every input. It passed the model that wrote it, a
green pipeline, the model that reviewed it, and a human who saw a passing suite.

**The session that wrote the code cannot review it** — it re-reads its own
reasoning and finds it correct. Same session catches typos; a fresh session
drops the conversational bias but keeps the model family's blind spots; **a
different model family** has independent failure modes and is the rung that
catches the test above; **a person** is the final say. Ask the second reader for
named classes: a check that cannot fail, a claim the evidence does not support, a
citation that resolves to nothing, a defect in the measurement. Findings are
input, not orders.

## The dial

The loop does not change; how much of it you write down does. Two factors decide
it — **what being wrong costs**, and **how long until you notice**.

| Setting | For | What you write |
|---|---|---|
| **A paragraph** | Prototypes, throwaway scripts | A few sentences in the prompt. No file. Read the diff. |
| **A file** | Anything another person maintains | One markdown file, agreed before Build. A second model reads the diff. |
| **Several files** | Contracts, money, access control, compliance | The plan split up. Criteria checked one at a time, with evidence. |

Applying the last to the first is how this method gets a reputation for being
slow. **The default position is the middle one.**

### The smallest version that works

No folder structure, no naming convention, no new tool. On your next task: don't
ask for code yet — have it read and summarise; make it ask its questions; answer
and decide; **put it in a markdown file** (what it does, what is out of scope,
how you'll know it worked); then build in steps, one commit each, file in the
prompt; then walk your criteria and have a different model read the diff.

Step 4 is the one people skip, and the one that makes 5 and 6 possible.

## At the top of the dial: spec-driven development

Still Plan, Build, Review — every step just leaves an artifact, and the gates are
written down instead of remembered.

```
Spec ──(gate 1)── Plan ──(gate 2)── Build ── Review ──(gate 3)──
 ↓                 ↓                  ↓         ↓
spec.md      plan.md · tasks.md    ✓tasks   verification.md
```

`spec.md` = the contract (*what/why*, no implementation) · `plan.md` = the
approach, sequence, risks · `tasks.md` = a flat checklist, one task ≈ one commit,
the only artifact nobody signs off · `verification.md` = evidence per criterion.
One spec, one branch, one PR, reviewed by a different model family.

It ships here in usable form: [`sdd/`](sdd/) has the layout, frontmatter contract
and templates; [`AGENTS.md`](AGENTS.md) runs the method on this repo;
[`adoption-kit/`](adoption-kit/) packages it for any repo.

```bash
./adoption-kit/install.sh /path/to/your-repo --dry-run
node scripts/lint-artifacts.mjs                                # check the artifacts
node scripts/lint-artifacts.mjs adoption-kit/fixtures/broken   # every rule, failing
```

## Run the deck

Sections are ES modules, so it must be served over HTTP — `file://` will not
work.

```bash
python3 -m http.server 8000 --directory presentation-v2   # or: npx serve presentation-v2
```

Arrows / Space / PageUp·Down move, Home/End jump to the ends, **L P B R X S E**
jump to chapters, **F** is fullscreen, `#12` deep-links a slide. `EN / DE` in the
header switches language (remembered, also `?lang=de`); content lives in a
`{ en, de }` map per slide and lands in both languages or not at all. No build
step, no `node_modules`, no CDN. The earlier 30-slide deck is kept in
[`presentation/`](presentation/).

> Tool paths and model facts on the slides were verified **July 2026** and carry
> a date stamp. Re-verify before presenting much later.

## Licence

Apache-2.0 — see [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE). Use, adapt and
present it, including commercially, keeping the attribution in `NOTICE`. Three
exceptions: the **typefaces** in
[`presentation-v2/assets/fonts/`](presentation-v2/assets/fonts/) are SIL OFL 1.1,
each shipping its own licence text (IBM Plex Mono unmodified, because it carries
a Reserved Font Name; regenerate with `node scripts/fetch-fonts.mjs`); **my name
and the talk's title** are not licensed — Apache-2.0 §6 grants no trademark
rights; **tool and company names** are their owners' trademarks, used only to
identify what is compared.

Deployed as a static site by Vercel on every push to `main`;
[`vercel.json`](vercel.json) serves `presentation-v2/` from the root URL.

---

Dr. Siavash Saki · 2026 · [github.com/siavash-saki/agentic-engineering](https://github.com/siavash-saki/agentic-engineering)
