# Agentic Engineering — Presentation Outline

**Audience:** Deutsche Bahn stakeholders, technical
**Format:** Full version, 8 sections, ~45 min
**Goal:** Move the audience from ad-hoc AI use to a deliberate engineering practice, using tools they're already allowed to use.

---

## 1. Context & Goal

**Purpose:** Set scope. Tell them what this talk is and isn't.

- What this talk is about, in one sentence
- What they'll walk away with: shared vocabulary, mental model, applicable workflow
- Why now — most people use AI coding tools daily but not deliberately
- Bridge into the language problem: *"Before anything else, we need shared terms — people still confuse 'using Claude' with 'using Claude Code.'"*

---

## 2. What is What — The Landscape

**Purpose:** Establish shared vocabulary. Make clear that "the model" and "the product" are not the same thing.

- The three concepts: **Model** (brain), **Product** (body), **API** (connection)
- Diagram walkthrough: models → APIs → products
- The "many-to-many" insight: one model powers many products, one product can use many models
- The DB filter view — what we're actually allowed to use, and why that's a contract question, not a technical one
- Land the point: *everything that follows works inside what DB already permits*

---

## 3. The Capability Gap

**Purpose:** Show that having access to a model isn't the same as getting value from it. Earn the right to teach the rest.

- The carwash screenshots — Claude, GPT, Copilot failing the same simple-looking question
- What this actually demonstrates: the model alone hits a wall
- The gap isn't model quality — it's the *system around the model*
- Transition: this is what separates two modes of working with AI

---

## 4. Vibe Coding vs Agentic Engineering

**Purpose:** Name the two modes side by side so the audience sees which one they're currently in.

- Side-by-side comparison table:
  - Inputs, context, review discipline, repeatability, who's driving
- Vibe coding: prompt → accept → ship. Fast, shallow, fragile.
- Agentic engineering: context → plan → execute → review. Deliberate, durable, auditable.
- Neither is wrong — but only one scales beyond toy problems
- Set up: *the rest of the talk is the practice that makes the second mode possible*

---

## 5. Primitives, Part 1 — Memory, Skills, MCP

**Purpose:** Introduce the first three framework-agnostic building blocks. Map each to the Copilot equivalent so it lands concretely.

- These concepts are not Claude-specific — they appear in Claude Code, Codex, Copilot, Kiro, OpenCode, and others under different names
- **Memory / AGENT.md** — persistent context the agent reads every session
  - Copilot equivalent: `.github/copilot-instructions.md`
- **Skills** — reusable, named procedures the agent can invoke
  - Copilot equivalent: prompt files (`.prompt.md`)
- **MCP (Model Context Protocol)** — standardized way to give the agent tools and data sources
  - Same name and protocol across tools; Copilot supports it directly

---

## 6. Primitives, Part 2 — Hooks, Subagents, Scope

**Purpose:** Finish the building-block tour and address scope (project vs user).

- **Hooks** — automated behavior on events (before/after tool use, on stop, etc.)
- **Subagents / custom agents** — specialized roles the main agent can delegate to
  - Copilot equivalent: agent mode, custom chat modes
- **Project level vs user level** — same primitive, different scope
  - Project: travels with the repo, shared with the team
  - User: personal preferences across all projects
- One slide that shows the five primitives together as a matrix (concept × where it lives × Copilot name)

---

## 7. Workflow & Best Practices

**Purpose:** Show how the primitives compose into a way of working.

- The core loop: **Explore → Discuss → Plan → Code → Review**
- Practices that compound:
  - Let the agent interview *you* before it codes
  - Run multiple sessions in parallel for independent work
  - Start simple, iterate, review every diff
  - Make the agent write down what it learned (memory)
- Anti-patterns to call out briefly: skipping the plan, blind-accept, single-shot mega-prompts

---

## 8. Copilot in Practice

**Purpose:** Convert everything into something they can do Monday morning.

- A short tour of useful slash commands in Copilot
- One or two prompt-file examples
- Agent mode in action
- Recap slide: the three takeaways
  - Model ≠ product ≠ API
  - Vibe coding vs agentic engineering is a discipline gap, not a tool gap
  - Five primitives, one workflow — works inside DB's allowed setup
- Closing — where to go next, suggested first experiments

---

## Open Questions / TODO

- Pick which primitive gets the *deep* demo in section 5 or 6
- Decide whether the carwash example uses Copilot screenshots (preferred) or Claude/GPT
- Confirm DB GenAI Hub diagram is up to date with current allowed models
- Source / build the side-by-side comparison table for section 4
