---
feature: 0004-hedged-pass
artifact: verification
version: 1
status: final
updated: 2026-07-28
authoring_tool: claude-code
model: Opus 5 (1M context)
reasoning_effort: High
---

# Verification — Hedged pass

Expected: two `[hedged-pass]` violations — rows 2 and 3. Row 1 is a genuine
pass and row 4 is honestly pending; neither may be flagged.

| AC | Evidence | Result |
|---|---|---|
| 1 | Integration test: 101st request in the window → 429, Retry-After: 12 s | Pass |
| 2 | Covered by code review of the middleware | Pass |
| 3 | Correct by construction — the branch cannot be reached otherwise | Pass |
| 4 | Production-sample replay not yet run | Pending |
