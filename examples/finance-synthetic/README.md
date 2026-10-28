# Finance synthetic example

This is a synthetic example for the Thailand finance overlay (`TH-FIN`). It is not an assessment of a real product, customer, or supplier, and it contains no real evidence.

## Selection

- SRAS Core, full profile, tier 2
- Modules: AI/GenAI, integration and API, regulated data, cloud/SaaS
- Overlay: `TH-FIN`

## What it demonstrates

- A complete project instance with a manifest, assessment, evidence index, claims, risk register, and lockfile
- 8 assessed requirements, including 6 gates
- 6 evidence index entries pointing to synthetic evidence files
- 2 claims, one verified and one partial with an explicit limitation
- A lockfile that pins the SRAS version, the selected module and overlay versions, and the SHA-256 of each standard input

## Coverage

The declared selection resolves to 122 requirements at tier 2, including 46 gates. This example assesses 8 requirements, 6 of them gates, so 40 gates are not assessed. It is a demonstration slice, not a full assessment.

## Files

| File                  | Purpose                                                 |
| --------------------- | ------------------------------------------------------- |
| `assurance.yaml`      | Project identity, profile, tier, modules, and overlays  |
| `assessment.yaml`     | Project, selection, assessed requirements, gate summary |
| `evidence-index.yaml` | Synthetic evidence entries with freshness and redaction |
| `claims.yaml`         | Allowed and prohibited wording for the synthetic claims |
| `risk-register.yaml`  | Gaps and risks with owners, due dates, and disclosure   |
| `assurance.lock.yaml` | Pinned standard, module, and overlay versions           |
| `evidence/`           | Synthetic evidence placeholders                         |

The example is intentionally incomplete: one continuity gate is partial and one model-risk requirement is a gap. The point is to show an honest assessment, not a clean score.
