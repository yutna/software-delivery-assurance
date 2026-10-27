# E-commerce synthetic example

This is a synthetic example for the Thailand e-commerce overlay (`TH-ECM`). It is not an assessment of a real product, customer, or supplier, and it contains no real evidence.

## Selection

- SRAS Core, full profile, tier 2
- Modules: integration and API, regulated data, cloud/SaaS
- Overlay: `TH-ECM`

## What it demonstrates

- 7 assessed requirements, including 5 gates
- 5 evidence index entries pointing to synthetic evidence files
- 2 claims, one verified and one partial with an explicit limitation
- A lockfile that pins the SRAS, module, and overlay versions

## Files

| File                  | Purpose                                                 |
| --------------------- | ------------------------------------------------------- |
| `assessment.yaml`     | Project, selection, assessed requirements, gate summary |
| `evidence-index.yaml` | Synthetic evidence entries with freshness and redaction |
| `claims.yaml`         | Allowed and prohibited wording for the synthetic claims |
| `assurance.lock.yaml` | Pinned SRAS, module, and overlay versions               |
| `evidence/`           | Synthetic evidence placeholders                         |

The example is intentionally incomplete: the account-takeover gate is partial and the accessibility requirement has open remediation actions.
