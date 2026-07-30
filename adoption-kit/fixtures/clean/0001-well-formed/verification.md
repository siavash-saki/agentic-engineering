---
feature: 0001-well-formed
artifact: verification
version: 1
status: final
updated: 2026-07-28
authoring_tool: claude-code
model: Opus 5 (1M context)
reasoning_effort: High
---

# Verification — Well-formed fixture

| AC | Evidence | Result |
|---|---|---|
| 1 | `node scripts/lint-artifacts.mjs fixtures/clean` exits 0 | Pass |

## Automated checks

- Artifact lint: pass.
