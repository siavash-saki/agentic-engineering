# Framework-agnostic concepts across modern AI coding CLIs

This report compares the four leading AI coding CLIs available in May 2026 — **GitHub Copilot CLI**, **OpenAI Codex CLI**, **Anthropic Claude Code**, and **Amazon Kiro CLI** — and identifies the concepts that appear in all (or most) of them under different names. The goal is to give technical stakeholders at Deutsche Bahn a tool-independent vocabulary: once you understand "the AGENTS.md pattern" or "PreToolUse hooks," you understand the same primitive in every CLI, regardless of which one your team picks. The headline finding is that the surface area has converged sharply: seven concepts (persistent instructions, skills/commands, MCP, hooks, subagents, permission/approval modes, project-vs-user scope) are now table-stakes across every serious tool, and only a handful of features — Kiro's specs, Claude's auto-memory, Codex's profiles, Copilot's plugin marketplace — remain genuinely tool-specific.

Tools studied:

- **GitHub Copilot CLI** — `docs.github.com/en/copilot/how-tos/copilot-cli/...`
- **OpenAI Codex CLI** — `developers.openai.com/codex/...`
- **Anthropic Claude Code** — `code.claude.com/docs/en/...`
- **AWS Kiro CLI** — `kiro.dev/docs/cli/...`

---

## Table of contents

1. [Persistent agent instructions ("memory" files)](#1-persistent-agent-instructions-memory-files)
2. [Skills, commands, and prompts](#2-skills-commands-and-prompts)
3. [Slash commands](#3-slash-commands)
4. [Model Context Protocol (MCP)](#4-model-context-protocol-mcp)
5. [Hooks (event-triggered automation)](#5-hooks-event-triggered-automation)
6. [Subagents / custom agents](#6-subagents--custom-agents)
7. [Permission and approval modes](#7-permission-and-approval-modes)
8. [Tool and MCP allow/deny lists](#8-tool-and-mcp-allowdeny-lists)
9. [Project-level vs user-level scope](#9-project-level-vs-user-level-scope)
10. [Headless / non-interactive mode](#10-headless--non-interactive-mode)
11. [Session persistence and resumption](#11-session-persistence-and-resumption)
12. [Context management (compaction, plan mode)](#12-context-management-compaction-plan-mode)
13. [Sandboxing](#13-sandboxing)
14. [Concepts not yet standardized](#14-concepts-not-yet-standardized)
15. [Synthesis: what's durable, what's tool-specific](#15-synthesis-whats-durable-whats-tool-specific)
16. [Sources](#16-sources)

---

## 1. Persistent agent instructions ("memory" files)

**Concept.** A plain-text Markdown file in the repository (and/or the user's home directory) that the CLI loads into the prompt at the start of every session. It is the durable place to write down build commands, coding conventions, architectural decisions, and "always do X" rules so the agent doesn't have to be re-taught them.

| Tool             | Filename(s)                                                                                                      | User-scope path                 | Project-scope path                                       | Notes                                                                                                                                              |
| :--------------- | :--------------------------------------------------------------------------------------------------------------- | :------------------------------ | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copilot CLI      | `AGENTS.md` (primary) and/or `.github/copilot-instructions.md`; nested `.github/instructions/**/*.instructions.md` | n/a (repo-only)                 | repo root, working directory, or dirs listed in `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` | If both `AGENTS.md` and `.github/copilot-instructions.md` exist at the root, both are loaded.                                                       |
| Codex CLI        | `AGENTS.md`, plus per-directory `AGENTS.override.md`; fallback filenames configurable via `project_doc_fallback_filenames` | `~/.codex/AGENTS.md` (or `AGENTS.override.md`) | walks from project root (usually git root) down to cwd  | Codex builds an "instruction chain" by walking the directory tree.                                                                                |
| Claude Code      | `CLAUDE.md` (and `CLAUDE.local.md` for gitignored personal notes); imports `AGENTS.md` if desired                | `~/.claude/CLAUDE.md`           | `./CLAUDE.md` or `./.claude/CLAUDE.md`                   | Also supports a managed-policy location (`/Library/Application Support/ClaudeCode/CLAUDE.md` on macOS, `/etc/claude-code/CLAUDE.md` on Linux). Has `@path/to/file` imports up to 5 hops deep. |
| Kiro CLI         | `AGENTS.md` plus topical files like `product.md`, `tech.md`, `structure.md`                                       | `~/.kiro/steering/`             | `.kiro/steering/`                                        | `AGENTS.md` is automatically included even when custom agents otherwise opt out of steering.                                                       |

**Why it matters.** This is the single biggest leverage point in any agentic-coding setup. Without it, the agent starts every session ignorant of how your repository builds, tests, and deploys. With it, the agent inherits institutional memory without anyone re-typing it. The cost is paid once and amortizes across every future task.

**Notable differences.**

- **AGENTS.md is the emerging cross-tool standard.** Codex, Copilot, and Kiro all read it natively. Claude Code reads `CLAUDE.md` instead but officially recommends an `@AGENTS.md` import (or a symlink) so one source of truth serves all four tools.
- **Load order varies.** Claude Code walks up the directory tree and concatenates every `CLAUDE.md` it finds, then appends `CLAUDE.local.md` per directory ([Claude Code memory](https://code.claude.com/docs/en/memory)). Codex walks the tree similarly but uses a precedence chain where `AGENTS.override.md` wins over `AGENTS.md` at the same level ([Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)). Copilot looks for `AGENTS.md` in the repo root, cwd, and any directories listed in `COPILOT_CUSTOM_INSTRUCTIONS_DIRS`.
- **Claude Code adds auto-memory** — see [Section 14](#14-concepts-not-yet-standardized). The other three do not.
- **Path-scoped rules.** Claude Code supports `.claude/rules/*.md` files with YAML `paths:` frontmatter that only load when matching files are touched. Copilot has a parallel mechanism via `.github/instructions/**/*.instructions.md`. Codex and Kiro do not document an equivalent.

---

## 2. Skills, commands, and prompts

**Concept.** A reusable, named procedure (typically a Markdown file with optional supporting scripts) that the agent can invoke either on user demand or, more interestingly, autonomously when its description matches the task. A skill is the answer to "I keep pasting the same instructions every time I do X."

| Tool             | Name                       | Location                                                                                          | Invocation                                                                                          |
| :--------------- | :------------------------- | :------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------- |
| Copilot CLI      | **Agent skills**           | Project: `.github/skills/`, `.claude/skills/`, or `.agents/skills/`. User: `~/.copilot/skills/` or `~/.agents/skills/`. Each skill is a folder with `SKILL.md`. | Copilot decides when to load a skill based on its description and your prompt. |
| Codex CLI        | (no first-class skills concept) | Custom **agents** at `~/.codex/agents/` or `.codex/agents/` cover the analogous need ([Codex subagents](https://developers.openai.com/codex/subagents)). | Spawn explicitly by name in a prompt.                                                                |
| Claude Code      | **Skills** (which absorbed legacy "commands") | Personal: `~/.claude/skills/<name>/SKILL.md`. Project: `.claude/skills/<name>/SKILL.md`. Legacy `.claude/commands/*.md` files still work. | `/skill-name` to invoke directly; Claude auto-loads when description matches. Supports `disable-model-invocation: true` and `user-invocable: false` to control who can invoke. |
| Kiro CLI         | **Prompts**                | `~/.kiro/prompts/` (global) and `.kiro/prompts/` (project)                                         | Slash-invocable. Agent-scoped configuration also supported.                                          |

**Why it matters.** Skills are the place to capture "tribal knowledge as code." A 3-page playbook for releasing a service, a checklist for security review, a deterministic refactor recipe — these don't belong in `CLAUDE.md` (where they would burn context every session) and they don't belong in a wiki (where the agent never reads them). A skill loads only when invoked, so a 500-line release playbook costs nothing until you ask for a release.

**Notable differences.**

- **The [Agent Skills](https://agentskills.io) open standard** (a `SKILL.md` file with YAML frontmatter inside a per-skill directory) is followed by Claude Code and Copilot CLI explicitly; both recognize `.claude/skills/` and `.agents/skills/` interchangeably. This is the closest thing to an industry standard for this concept.
- **Claude Code's skill frontmatter is the richest:** `description`, `when_to_use`, `allowed-tools`, `disable-model-invocation`, `paths` (glob-scoped activation), `context: fork` (run in a subagent), `argument-hint`, etc.
- **Codex has no skills layer** — it routes the same need through custom subagent definitions in `~/.codex/agents/*.toml`. The capability is similar but less granular: an agent is heavier than a skill.
- **Kiro's "prompts"** are the lightest implementation — just slash-invocable named prompts, no auto-invocation discovery beyond what custom agents reference explicitly.

---

## 3. Slash commands

**Concept.** A `/name [args]` invocation surface inside the interactive TUI for both built-in operations (model switching, compaction, permissions) and user-defined skills/prompts.

| Tool         | Example built-ins                                                                                                  | Custom commands?                                                                                       |
| :----------- | :----------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| Copilot CLI  | `/delegate`, `/pr`, `/fleet`, `/chronicle`, `/mcp`, `/agent`                                                       | Custom agents (`*.agent.md`) and skills are invoked through the slash surface.                         |
| Codex CLI    | `/model`, `/plan`, `/permissions`, `/mcp`, `/agent`, `/review`, `/init`, `/compact`, `/resume`, `/fork`, `/side`, `/new`, `/personality`, `/diff`, `/mention`, `/copy`, `/status`, `/keymap`, `/experimental`, `/feedback`, `/logout` | Not documented as a public extension surface — only built-ins.                                          |
| Claude Code  | `/init`, `/plan`, `/model`, `/effort`, `/context`, `/compact`, `/btw`, `/agents`, `/tasks`, `/background`, `/batch`, `/mcp`, `/permissions`, `/memory`, `/skill-name`, bundled skills like `/simplify`, `/debug`, `/loop`, `/claude-api` | Every skill (and every legacy `.claude/commands/*.md`) becomes a slash command automatically.           |
| Kiro CLI     | `/quit`, `/clear`, `/context`, `/model`, `/summarize`, `/paste`, `/chat new`, `/chat resume`                       | Prompts in `.kiro/prompts/` are slash-invocable.                                                       |

**Why it matters.** Slash commands collapse the friction between "I want to do X" and "the agent does X with the right context loaded." Combined with skills, they turn the CLI into a personal command-palette extensible by every team member.

**Notable differences.** Codex appears to be the only one of the four without a documented mechanism for users to add their own slash commands directly — extension flows through custom agents and MCP tools. The other three treat user-defined slash commands as a first-class extensibility point.

---

## 4. Model Context Protocol (MCP)

**Concept.** An open standard (originally from Anthropic, now broadly adopted) for letting an AI agent talk to external tools and data sources — Jira, Postgres, Slack, GitHub, an internal CMDB — through a uniform interface, regardless of which agent you're using. MCP servers come in two transport flavors: **stdio** (a local process) and **streamable HTTP** (a remote endpoint).

| Tool          | Config file                                                                                | Transports                                | Management commands                                                                  |
| :------------ | :----------------------------------------------------------------------------------------- | :---------------------------------------- | :----------------------------------------------------------------------------------- |
| Copilot CLI   | `~/.copilot/mcp-config.json` (or `$COPILOT_HOME/mcp-config.json`)                          | stdio, streamable HTTP, SSE (deprecated)  | `/mcp show`, `/mcp edit`, `/mcp delete`, `/mcp enable`, `/mcp disable`               |
| Codex CLI     | `~/.codex/config.toml` (user), `.codex/config.toml` (project, only when trusted)           | stdio, streamable HTTP                    | `codex mcp` subcommands; `/mcp` in TUI                                               |
| Claude Code   | `~/.claude.json` and `.mcp.json`; managed via `/mcp` and the `claude mcp add` family       | stdio, HTTP, SSE                          | `claude mcp add`, `claude mcp remove`, `/mcp` to view connections                    |
| Kiro CLI      | `~/.kiro/settings/mcp.json` (global), `.kiro/settings/mcp.json` (project)                  | stdio, HTTP (SSE not documented)          | `kiro-cli mcp add` and related commands; agent-level `mcpServers` field              |

**Why it matters.** MCP is the only practical answer to "how does the agent talk to our internal systems without bespoke per-tool plumbing?" Write one MCP server, plug it into all four CLIs. This is what makes the tooling choice partially reversible: if you switch from Codex to Claude Code next year, your MCP servers come with you.

**Notable differences.**

- **Transport support is converging on stdio + streamable HTTP**, with SSE still supported by Copilot and Claude Code for backward compatibility but deprecated in the MCP spec itself.
- **Trust models differ.** Codex only loads project-scoped MCP config from `.codex/config.toml` when the project is marked trusted. Claude Code prompts at the workspace-trust dialog. Copilot stores everything user-globally by default.
- **Pre-bundled servers.** Copilot CLI ships with the GitHub MCP server pre-installed. Kiro CLI is similar with AWS-flavored defaults. Codex and Claude Code ship blank.

---

## 5. Hooks (event-triggered automation)

**Concept.** User-defined shell commands (or HTTP endpoints, or sub-prompts) that fire at lifecycle points in the agent's loop: before/after tool calls, when a session starts, when the user submits a prompt, when the agent stops. Hooks are how you enforce deterministic policy that the model itself can't subvert.

| Tool          | Events supported                                                                                                                                                                                                                                                                                            | Config file                                                                                              |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| Copilot CLI   | Various pre/post events documented in the [hooks reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-hooks-reference); JSON config with a `version: 1` envelope.                                                                                                              | Project: `.github/hooks/*.json`. User: `~/.copilot/hooks/notification-hooks.json`.                       |
| Codex CLI     | `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `Stop`. **Caveat:** as of mid-2026 the only tool the `PreToolUse`/`PostToolUse` matchers see is `Bash` — file-edit tools do not fire hook events yet (see [openai/codex#17794](https://github.com/openai/codex/issues/17794)). Marked experimental, enabled via `[features] codex_hooks = true`. | `hooks.json` or inline `[hooks]` tables in `config.toml`.                                                |
| Claude Code   | The richest set in any tool: `SessionStart`, `Setup`, `SessionEnd`, `InstructionsLoaded`, `UserPromptSubmit`, `UserPromptExpansion`, `Stop`, `StopFailure`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `PermissionRequest`, `PermissionDenied`, `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `TeammateIdle`, `FileChanged`, `ConfigChange`, `CwdChanged`, `WorktreeCreate`, `WorktreeRemove`, `PreCompact`, `PostCompact`, `Elicitation`, `ElicitationResult`, `Notification`. Five handler types: `command`, `http`, `mcp_tool`, `prompt`, `agent`. | `~/.claude/settings.json`, `.claude/settings.json`, `.claude/settings.local.json`, managed policy, plugin `hooks/hooks.json`, or skill/agent frontmatter. |
| Kiro CLI      | `AgentSpawn`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `Stop`. Matchers support canonical tool names (`fs_read`, `fs_write`), MCP patterns (`@git/status`), and `"*"`.                                                                                                                              | Defined in the agent configuration file (no standalone hooks file documented).                            |

**Why it matters.** Hooks are how you make agent behavior auditable and policy-compliant. A `PreToolUse` hook can block any `rm -rf` outside `/tmp`; a `PostToolUse` hook can auto-format every file Claude writes; a `Stop` hook can fire your CI lint. None of this depends on the model "remembering" — it executes deterministically.

**Notable differences.**

- **Event-name convergence is striking.** `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Stop` are now shared across Codex, Claude Code, and Kiro. Copilot uses slightly different naming but covers the same lifecycle. A team that learns the Claude Code hook vocabulary can map it 1:1 onto Kiro and Codex.
- **Coverage maturity varies.** Codex hooks are still labeled experimental and only see Bash tool calls. Claude Code has by far the deepest event set (file changes, compaction, worktrees, subagent lifecycles). Kiro is somewhere in between.
- **Handler types.** Claude Code uniquely supports four non-shell handler types: HTTP webhook, MCP tool call, sub-prompt to the model, or full subagent invocation. The others are shell-only.

---

## 6. Subagents / custom agents

**Concept.** A specialized agent — typically with a narrower system prompt, restricted tool set, and possibly a different model — that the primary agent can delegate sub-tasks to. Subagents preserve context (their work happens in an isolated window), enforce specialization (the "security reviewer" only reviews; doesn't write code), and parallelize ("spawn four explorers, one per microservice").

| Tool          | Mechanism                                                                                                          | Location                                                                                              |
| :------------ | :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| Copilot CLI   | Custom agents as `*.agent.md` files; invoked via `/agent` or auto-selected when prompt matches description.        | Project: `.github/agents/` (and similar). User: `~/.copilot/agents/` (also reads `~/.agents/`).      |
| Codex CLI     | TOML-defined agents with `name`, `description`, `developer_instructions`; optional `model`, `sandbox_mode`, `mcp_servers`. Globals under `[agents]` in `config.toml` control `max_threads`, `max_depth`, `job_max_runtime_seconds`. | User: `~/.codex/agents/`. Project: `.codex/agents/`.                                                  |
| Claude Code   | Built-in subagent types (`Explore`, `Plan`, `general-purpose`) plus custom agents in `.claude/agents/` or `~/.claude/agents/`. Skills can opt into running in a forked subagent via `context: fork`. | Project: `.claude/agents/`. User: `~/.claude/agents/`.                                                |
| Kiro CLI      | "Subagents" are a runtime concept (isolated context delegations) backed by "custom agents" (JSON config files). Up to 4 subagents in parallel. | Project: `.kiro/agents/*.json`. User: `~/.kiro/agents/*.json`.                                       |

**Why it matters.** The main agent's context window is the most expensive resource in any session. Subagents are how you keep it lean: a research subagent reads 40 files and returns three paragraphs; a security-review subagent inspects a diff and returns a verdict. Without them, large tasks either blow through the context budget or run sequentially when they could parallelize.

**Notable differences.**

- **Auto-delegation vs explicit spawn.** Claude Code and Copilot will auto-delegate to a custom agent when its description matches. Codex explicitly requires the user to ask for an agent ("Spawn one agent per point"). Kiro can do either.
- **Parallelism caps.** Codex defaults to 6 concurrent threads; Kiro caps at 4; Claude Code has no documented hard cap but its scheduler enforces per-session quotas.
- **Built-in agent library.** Claude Code ships with named built-ins (`Explore`, `Plan`, `general-purpose`) that you can use without authoring any config. Codex, Copilot, and Kiro ship only an unnamed default agent.

---

## 7. Permission and approval modes

**Concept.** A session-wide setting that controls how the agent gets clearance to take destructive actions (file edits, shell commands, network calls). The same decision exists in every tool but the mode names differ.

| Tool           | Modes                                                                                                                                                                                                                       |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copilot CLI    | "Allow/deny" rules per tool; "autopilot" via `/delegate` for autonomous mode. No formal named modes documented.                                                                                                              |
| Codex CLI      | `approval_policy` values: `untrusted` (only known-safe read-only auto-runs), `on-request` (model decides when to ask — default), `never` (no prompts — risky), plus a `granular = {...}` form for per-category overrides. Combined with `sandbox_mode` for layered control. |
| Claude Code    | `defaultMode` values: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`.                                                                                                                            |
| Kiro CLI       | Interactive default with per-tool prompts; headless flags `--trust-all-tools` and `--trust-tools=<categories>` (read, grep, write).                                                                                          |

**Why it matters.** This is the single most important safety dial. Setting `bypassPermissions` (Claude) / `approval_policy = "never"` (Codex) / `--trust-all-tools` (Kiro) is the difference between an interactive assistant and a fully autonomous agent. Get this wrong and the agent rewrites your `.git/` directory while you're at lunch.

**Notable differences.**

- **Plan mode is increasingly standard.** Claude Code's `plan` mode and Codex's `/plan` slash command both implement the same idea: the agent can read and explore but cannot write. This is the strongly-recommended starting mode for new tasks in a new codebase.
- **"Accept edits" as a middle ground.** Claude Code's `acceptEdits` and Codex's default `workspace-write` sandbox both implement "auto-approve writes inside the workspace, prompt for anything outside." This is the practical sweet spot most experienced users settle on.
- **Auto mode with safety classifier.** Claude Code's `auto` mode is uniquely positioned: it auto-approves tool calls but runs background safety checks to verify each action matches the user's request. Currently labeled a research preview.

---

## 8. Tool and MCP allow/deny lists

**Concept.** Fine-grained, per-tool rules that override the global permission mode. For example: "auto-approve `npm run *` but deny `git push *`." Implemented in every CLI but with very different syntactic surfaces.

| Tool         | Syntax / location                                                                                                                                  |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copilot CLI  | `--allow-tool` / `--deny-tool` CLI flags; persistent rules in the config directory; trusted-directory list.                                       |
| Codex CLI    | Granular approval policy in `~/.codex/config.toml`; sandbox boundaries layered on top.                                                            |
| Claude Code  | `permissions.allow` / `permissions.ask` / `permissions.deny` in `settings.json`. Rules: `Bash(npm run *)`, `Edit(/src/**/*.ts)`, `WebFetch(domain:example.com)`, `mcp__puppeteer__*`, `Agent(Explore)`, etc. Evaluation order: deny → ask → allow. |
| Kiro CLI     | `--trust-tools=read,grep,write` headless flag; per-agent `toolsSettings` and `allowedTools` in the agent JSON.                                    |

**Why it matters.** Mode-level permissions are coarse. Real-world projects want "Claude can edit anywhere in `src/` but never in `.env`; can fetch from `*.internal.example.com` but never from the public internet; can run our test runners but not `kubectl delete`." Allow/deny rules are how you encode that.

**Notable details.** Claude Code's rule language is by far the most expressive: gitignore-style glob anchors (`/path` = project root, `//path` = filesystem root, `~/path` = home, bare `path` = cwd), process-wrapper stripping (`timeout 30 npm test` matches `Bash(npm test *)`), and compound-command awareness (`a && b` checks both `a` and `b` independently). Codex and Kiro have simpler glob-only matching. Copilot's rules are documented as flag-based but the underlying matcher is similarly less fancy.

---

## 9. Project-level vs user-level scope

**Concept.** Every configurable thing — instructions, skills, MCP servers, hooks, agents, permissions — has two natural homes: a per-project location (committed to the repo, shared with the team) and a per-user location (in the home directory, personal to you). All four CLIs implement this duality.

| Concept       | Copilot CLI                                          | Codex CLI                       | Claude Code                                                | Kiro CLI                          |
| :------------ | :--------------------------------------------------- | :------------------------------ | :--------------------------------------------------------- | :-------------------------------- |
| Instructions  | `.github/copilot-instructions.md`, `AGENTS.md`       | `.codex/AGENTS.md`              | `./CLAUDE.md`, `./.claude/CLAUDE.md`                       | `.kiro/steering/`                 |
| User instr.   | (none documented)                                    | `~/.codex/AGENTS.md`            | `~/.claude/CLAUDE.md`                                      | `~/.kiro/steering/`               |
| Skills        | `.github/skills/`, `.claude/skills/`, `.agents/skills/` | (n/a; uses agents)             | `.claude/skills/<name>/SKILL.md`                           | `.kiro/prompts/`                  |
| User skills   | `~/.copilot/skills/`, `~/.agents/skills/`            | (n/a)                           | `~/.claude/skills/<name>/SKILL.md`                         | `~/.kiro/prompts/`                |
| MCP servers   | (user-only by default at `~/.copilot/mcp-config.json`) | `.codex/config.toml`           | `.mcp.json`                                                | `.kiro/settings/mcp.json`         |
| User MCP      | `~/.copilot/mcp-config.json`                         | `~/.codex/config.toml`          | `~/.claude.json`                                           | `~/.kiro/settings/mcp.json`       |
| Hooks         | `.github/hooks/*.json`                                | `.codex/config.toml` `[hooks]` (when trusted) | `.claude/settings.json`                       | inside agent config files         |
| User hooks    | `~/.copilot/hooks/notification-hooks.json`           | `~/.codex/config.toml`          | `~/.claude/settings.json`                                  | inside agent config files         |
| Agents        | `.agent.md` files in project dirs                    | `.codex/agents/*.toml`          | `.claude/agents/`                                          | `.kiro/agents/*.json`             |
| User agents   | `~/.copilot/agents/` (also `~/.agents/`)             | `~/.codex/agents/`              | `~/.claude/agents/`                                        | `~/.kiro/agents/*.json`           |

**Why it matters.** Team-shared config (project scope, committed) keeps the team consistent: every developer on the project gets the same agent behavior. Personal config (user scope, in `~/`) keeps individual preferences from polluting the repo. Mixing them is the most common configuration mistake.

**Notable details.** Three of the four tools also have a third scope: an **enterprise/managed-policy** location that IT can deploy via MDM and that user/project settings cannot override. Claude Code is the most explicit about this with `managed-settings.json` at `/Library/Application Support/ClaudeCode/`, `/etc/claude-code/`, or `C:\Program Files\ClaudeCode\`. Copilot has organization-level controls through the GitHub admin surface. Codex uses `CODEX_HOME` and trust gating. Kiro has `KIRO_HOME` but no documented managed-policy story.

---

## 10. Headless / non-interactive mode

**Concept.** Run the CLI from a script, CI job, or another agent — no terminal UI, prompts come from stdin or a flag, output goes to stdout (optionally as JSON).

| Tool         | Invocation                                                            | Auto-approval                                                                              | JSON output                                          |
| :----------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| Copilot CLI  | Programmatic execution via flag-based invocation; GitHub Actions integration documented. | Trusted-tool rules                                                                          | Yes                                                  |
| Codex CLI    | `codex exec "<prompt>"` (with `--json` for structured output)         | `approval_policy = "never"` + `sandbox_mode`                                                | `codex exec --json`                                  |
| Claude Code  | `claude -p "<prompt>"` (the `-p` / `--print` flag), pipes via stdin   | `defaultMode: bypassPermissions` or `--allowedTools` / `--disallowedTools`                  | `claude -p --output-format json`                     |
| Kiro CLI     | `kiro-cli chat --no-interactive "<prompt>"`                           | `--trust-all-tools` or `--trust-tools=read,grep,write`                                      | Yes (also `--require-mcp-startup` for fail-closed)   |

**Why it matters.** Headless mode is what turns these CLIs from interactive assistants into automation primitives. PR triage, nightly dependency-audit jobs, log-anomaly Slack notifiers, scheduled doc syncs — all of these are headless invocations. Kiro requires `KIRO_API_KEY`; Codex and Claude Code accept the same auth as their interactive sessions.

---

## 11. Session persistence and resumption

**Concept.** Stop a conversation, walk away, come back later and pick it up exactly where you left it — with full transcript, plan history, and prior approvals intact.

| Tool         | Resume mechanism                                                                                          |
| :----------- | :-------------------------------------------------------------------------------------------------------- |
| Copilot CLI  | Session rollback (rewind to a previous prompt to undo changes) and session resume both documented.        |
| Codex CLI    | `codex resume`; `/resume`, `/fork` (branch the conversation), `/side` (ephemeral side conversation), `/new`. |
| Claude Code  | `claude --teleport` for moving sessions between surfaces; multi-surface session continuity is built in.   |
| Kiro CLI     | `/chat resume`; `/chat new`.                                                                              |

**Why it matters.** Long agent tasks (4 hours of refactoring, an overnight dependency audit) need to survive a closed laptop or a dropped SSH connection. Resumption with full state is the difference between "the agent picks up where it left off" and "you start from scratch with a re-explained context."

**Distinctive feature: rollback.** Copilot CLI explicitly documents the ability to rewind a session to a previous prompt, undoing changes the agent made after that point. This is a unique capability among the four — the others can resume but not rewind in a structured way.

---

## 12. Context management (compaction, plan mode)

**Concept.** When the conversation grows long enough that the model's context window fills up, the CLI needs a strategy: summarize the old turns into a brief that survives compaction, drop the least useful content, or surface a context-usage view so the user can intervene.

| Tool          | Compaction       | Context view       | Plan mode                       |
| :------------ | :--------------- | :----------------- | :------------------------------ |
| Copilot CLI   | (not explicit)   | (not explicit)     | (not explicit)                  |
| Codex CLI     | `/compact`       | `/status`          | `/plan`                         |
| Claude Code   | `/compact`, `/context`, `/btw` (aside that doesn't bloat history), `PreCompact`/`PostCompact` hooks | `/context` window visualization | `/plan`, `plan` permission mode |
| Kiro CLI      | `/summarize`     | `/context`         | (no dedicated plan mode documented) |

**Why it matters.** Without compaction, a long session degrades into the model losing track of what was decided five hundred turns ago. Plan mode is the inverse: it deliberately limits the agent so a clean plan can be produced before any code is touched, which is the highest-leverage step in any non-trivial task.

**Notable details.** Claude Code's compaction model is explicitly engineered: `CLAUDE.md` is re-read from disk after `/compact` so project rules survive; skills are re-attached with a 5,000-token-per-skill budget capped at 25,000 tokens total; `PreCompact` and `PostCompact` hooks let you instrument the moment. Codex implements compaction but does not document the post-compaction guarantees in the same detail.

---

## 13. Sandboxing

**Concept.** OS-level enforcement (separate from the agent's own permission model) that limits where the agent's spawned processes can read, write, and connect. The agent can't escape it by being clever, because the kernel does the blocking.

| Tool          | Implementation                                                                                                                                                                                |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copilot CLI   | No formal sandbox documented — relies on permission rules and trusted-directory lists.                                                                                                        |
| Codex CLI     | First-class `sandbox_mode` with three values: `read-only`, `workspace-write` (default), `danger-full-access`. Implemented via macOS Seatbelt, Linux `bubblewrap`/`bwrap`, or Windows native sandbox. |
| Claude Code   | Optional sandbox with `sandbox.enabled` and `sandbox.filesystem.allowRead`/`denyRead`/`allowedDomains`/`deniedDomains`. Merges with Read/Edit deny rules and WebFetch rules. `autoAllowBashIfSandboxed: true` by default. |
| Kiro CLI      | No formal kernel-level sandbox documented; permission rules and headless `--trust-tools` are the analogous control.                                                                            |

**Why it matters.** Permission rules are enforced by the agent itself — they can in principle be bypassed by a prompt-injection attack or a malicious MCP server returning crafted output. A kernel-level sandbox cannot. For high-trust environments (banking, healthcare, government), the sandbox is non-negotiable; permission rules alone are not enough.

---

## 14. Concepts not yet standardized

These features appear in only one or two tools. Some look like emerging cross-tool patterns, others are clearly idiosyncratic.

**Auto-memory (Claude Code only).** Claude writes its own learnings — build commands, debugging insights, preferences it discovers — into `~/.claude/projects/<project>/memory/MEMORY.md`. Loaded into every session (first 200 lines / 25 KB). Configurable via `autoMemoryEnabled` and `autoMemoryDirectory`. The first 5,000 tokens per invoked skill are re-attached after compaction. **Status: emerging.** Other vendors will likely copy this within a year because the unit economics are good.

**Output styles / personas (Claude Code only).** Markdown files with frontmatter at `~/.claude/output-styles/` or `.claude/output-styles/` that swap out the system prompt — e.g., `Explanatory`, `Learning`, `Proactive`, or a custom `WritingEditor`. Codex's `/personality` slash command is a much lighter touch (tone only, not full system prompt replacement). **Status: emerging — Codex is moving in the same direction.**

**Specs / spec-driven development (Kiro only).** Kiro encodes a four-step workflow: `spec → design → tasks → implementation`, materialized as `requirements.md` (EARS notation), `design.md`, and `tasks.md` files. Tasks can be run in parallel by analyzing a dependency graph. **Status: idiosyncratic.** This is Kiro's headline differentiator and reflects its origin in AWS's enterprise-development culture. No other CLI ships this out of the box, though similar workflows can be reconstructed in any of them using skills.

**Plugins and a plugin marketplace (Copilot, Claude Code).** Copilot CLI has an explicit plugin system with a marketplace ("make CLI plugins that you've created easy to install"). Claude Code has plugins that bundle skills, hooks, agents, MCP servers, and output styles. **Status: emerging.** Codex and Kiro do not yet have an equivalent.

**Profiles (Codex only).** Named bundles of config in `config.toml` switchable via `codex --profile deep-review`. Each profile can set its own model, reasoning effort, approval policy. Marked experimental. **Status: idiosyncratic but useful.** Claude Code achieves a similar effect with per-skill `model:` and `effort:` overrides.

**Remote control / multi-surface continuity (Claude Code, Copilot CLI).** Claude Code: `claude --teleport` moves a session between terminal, web, desktop, iOS app. Copilot CLI: "remote steering" enables remote control of a session. **Status: emerging convergence.**

**Worktrees as a first-class concept (Claude Code).** `WorktreeCreate` / `WorktreeRemove` hook events, `/batch` command that fans out work into per-worktree subagents. **Status: idiosyncratic.** Reflects Anthropic's emphasis on running many agents in parallel without conflicting edits.

**Routines / scheduled tasks (Claude Code).** `/schedule` and the [Routines](https://code.claude.com/docs/en/routines) feature run agents on cron-style schedules on Anthropic-managed infrastructure. **Status: idiosyncratic.** Other tools can achieve the same with cron + headless mode.

**Dynamic context injection in skills (Claude Code only).** The `` !`shell-command` `` syntax inside a `SKILL.md` runs the command before the skill content reaches the model, splicing live output (e.g., `git diff HEAD`) into the prompt. **Status: emerging.** Codex agent files can reach similar effect via initialization but less elegantly.

---

## 15. Synthesis: what's durable, what's tool-specific

If a Deutsche Bahn engineer learns these seven concepts deeply, they can move between any of these CLIs with one week of ramp-up time:

1. **AGENTS.md / CLAUDE.md** — the project-wide instructions file.
2. **Skills / prompts** — reusable, slash-invocable, sometimes auto-discovered procedures.
3. **MCP** — the integration layer to talk to external systems.
4. **Hooks** — `PreToolUse`/`PostToolUse`/`UserPromptSubmit`/`Stop` (names are now consistent across three of four).
5. **Subagents** — context-isolated delegation for parallelism and specialization.
6. **Permission modes** — `plan` / `acceptEdits` / `auto` / `bypass` (or each tool's equivalent).
7. **Project-vs-user scope** — everything in `./.<tool>/` is team-shared; everything in `~/.<tool>/` is personal.

The tool-specific quirks are real but smaller than the marketing implies:

- **Codex CLI** distinguishes itself with sandbox-mode primacy and profiles, but trades that for a thinner skills/extension surface.
- **Claude Code** is the deepest and most opinionated: auto-memory, output styles, worktrees-as-concept, the richest hook event set, and a polished permission rule language. It pays for this depth with more concepts to learn.
- **Copilot CLI** integrates tightest with GitHub itself (pre-bundled GitHub MCP, Actions integration, plugin marketplace) but is shallower on Claude-Code-style customization.
- **Kiro CLI** is the only one with first-class spec-driven development. Outside that workflow it tracks the same primitives as the others, just with thinner documentation in places.

The practical implication for a presentation at Deutsche Bahn: **teach the concepts, not the tools.** A developer who understands "hooks fire on lifecycle events" can read any of the four hook references in 15 minutes. A developer who only knows "how to use Copilot CLI hooks" has to start over when the team switches tools — and the industry is too young for tool churn to be over.

---

## 16. Sources

**GitHub Copilot CLI**
- [Copilot CLI overview](https://docs.github.com/copilot/how-tos/copilot-cli)
- [Adding custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [Adding agent skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)
- [Adding MCP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
- [Using hooks](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-hooks)
- [Hooks reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-hooks-reference)
- [Configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference)

**OpenAI Codex CLI**
- [Codex CLI overview](https://developers.openai.com/codex/cli)
- [Codex CLI features](https://developers.openai.com/codex/cli/features)
- [Slash commands](https://developers.openai.com/codex/cli/slash-commands)
- [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Configuration reference](https://developers.openai.com/codex/config-reference)
- [Advanced configuration](https://developers.openai.com/codex/config-advanced)
- [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- [Subagents](https://developers.openai.com/codex/subagents)
- [Model Context Protocol](https://developers.openai.com/codex/mcp)
- [Hooks](https://developers.openai.com/codex/hooks)
- [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

**Anthropic Claude Code**
- [Claude Code overview](https://code.claude.com/docs/en/overview)
- [Memory and CLAUDE.md](https://code.claude.com/docs/en/memory)
- [Skills](https://code.claude.com/docs/en/skills)
- [Commands reference](https://code.claude.com/docs/en/commands)
- [Subagents](https://code.claude.com/docs/en/sub-agents)
- [MCP](https://code.claude.com/docs/en/mcp)
- [Permissions](https://code.claude.com/docs/en/permissions)
- [Hooks](https://code.claude.com/docs/en/hooks)
- [Output styles](https://code.claude.com/docs/en/output-styles)
- [Permission modes](https://code.claude.com/docs/en/permission-modes)
- [Settings](https://code.claude.com/docs/en/settings)

**AWS Kiro CLI**
- [Kiro CLI overview](https://kiro.dev/docs/cli/)
- [Chat configuration](https://kiro.dev/docs/cli/chat/configuration/)
- [Steering files](https://kiro.dev/docs/cli/steering/)
- [Custom agents](https://kiro.dev/docs/cli/custom-agents/)
- [Creating custom agents](https://kiro.dev/docs/cli/custom-agents/creating/)
- [Agent configuration reference](https://kiro.dev/docs/cli/custom-agents/configuration-reference/)
- [Subagents](https://kiro.dev/docs/cli/chat/subagents/)
- [MCP](https://kiro.dev/docs/cli/mcp/)
- [Hooks](https://kiro.dev/docs/cli/hooks/)
- [Slash commands](https://kiro.dev/docs/cli/reference/slash-commands/)
- [Headless mode](https://kiro.dev/docs/cli/headless/)
- [Specs (IDE doc, applicable to CLI workflows)](https://kiro.dev/docs/specs/)
