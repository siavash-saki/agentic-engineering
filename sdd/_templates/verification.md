---
feature: NNNN-<feature-slug>
artifact: verification
version: 1
status: draft
updated: YYYY-MM-DD
authoring_tool: <tool>
model: <model>
reasoning_effort: <as the agent reports it, or unknown>
---

# Verification — <Feature name>

Evidence against [spec.md](spec.md) (v<N>), acceptance criteria 1–<N>.

| AC | Evidence | Result |
|---|---|---|
| 1 | <what was actually run or observed, specifically enough to re-run> | Pass |
| 2 | <…> | Pass |
| 3 | <what has not been exercised yet> | Pending |

Result is `Pass` or `Pending`. A criterion whose evidence hedges — "covered by
code review", "by construction", "no live test was performed" — is `Pending`,
not `Pass`. That is a precise statement about the evidence, not a failure of the
feature.

A conjunctive criterion ("an X *and* a Y each …") needs evidence for every
conjunct before any row may claim a pass.

## Automated checks

- Typecheck: <result>
- Lint: <result>
- Unit: <n files, n tests>
- Integration / end-to-end: <result>
- Artifact lint: <result>

## Notes

Anything a future reader needs: what was deliberately not tested and why, which
environment the evidence came from, which criteria were re-verified after a
later feature changed the ground under them.
