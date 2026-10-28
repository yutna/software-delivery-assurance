---
translation_status: complete
machine_translated: false
---

# Project instances

A project instance is the private side of an assessment. It contains the
selected scope, the assessment, the evidence index, claims, and the risk
register. It lives in a private or separate repository, never in this public
library.

## What `init` creates

```bash
npm run sras -- init ~/sras-demo --profile lite
```

`init`:

- refuses an existing non-empty directory,
- refuses a path containing `..`,
- copies `templates/project/`,
- replaces the placeholders,
- applies the selected profile,
- computes the lockfile,
- validates the planned files before writing anything,
- never calls the network.

Use `--profile full` for L0–L4 maturity, criticality weights, a readiness
index, and evidence coverage.

## Files

| File                  | Purpose                                                         |
| --------------------- | --------------------------------------------------------------- |
| `README.md`           | Generated project readme                                        |
| `assurance.yaml`      | Project identity, profile, tier, modules, overlays              |
| `assessment.yaml`     | Scope, assessor, assessed requirements, gates, sign-off         |
| `evidence-index.yaml` | Index of evidence held outside the instance                     |
| `claims.yaml`         | Allowed and prohibited public wording                           |
| `risk-register.yaml`  | Gaps and risks with owners, due dates, and disclosure decisions |
| `assurance.lock.yaml` | Pinned standard inputs, module and overlay versions, checksum   |

The full file-by-file reference is the [project template guide](../templates/project.md).

## Identity and confidentiality

`assurance.yaml` records the project name, description, owner, and
confidentiality. The template uses `internal`; a synthetic example uses
`synthetic`.

The project name is a local label. Do not put a customer name, real system
name, hostname, or other production identifier in the public repository.

## Scope

The assessment records the systems, data, users, and jurisdictions in scope.
The scope is the first thing an assessor reads: an assessment without an
approved scope is not valid.

Scope changes are recorded as changes, not quietly edited. A material scope
change triggers a new review of the affected requirements.

## Evidence

The evidence index points to evidence stored outside the instance. A location
is a private reference such as `evidence/synthetic-policy.md`, never a public
URL. Each entry records the requirement, evidence type, description, owner,
collection date, expiry date, freshness, and redaction.

The public repository ships synthetic evidence only.

## Claims

`claims.yaml` records the public wording the project may and may not use. A
claim links to evidence and has an owner, an approval, and an expiry date. A
claim with no current evidence is `not_claimed`; an overstatement is
`prohibited`.

## Risk register

`risk-register.yaml` records gaps and risks with a severity, likelihood,
impact, remediation, owner, due date, status, acceptance ID, and customer
disclosure decision. An accepted risk needs an acceptance ID. A closed risk
keeps its history.

## Lockfile

`assurance.lock.yaml` makes the assessment reproducible. It pins the SRAS
version and checksum, the selected module and overlay versions, and the SHA-256
of every resolved standard input. It records no timestamp, generator, or
environment data, so the same inputs produce the same file.

Validate the instance after editing it, and refresh the lockfile after changing
the selection or the standard:

```bash
npm run sras -- project validate ~/sras-demo
npm run sras -- project refresh ~/sras-demo
```

`project validate` is read-only. It parses every project file, applies the
project rules, resolves the current selection, and fails when the lockfile is
stale. `project refresh` recomputes `assurance.lock.yaml` from the current
selection, writes only that file, and refuses to write when another project
rule fails. Neither command calls the network.

## What stays private

| Public repository      | Private project instance     |
| ---------------------- | ---------------------------- |
| SRAS Core and modules  | Filled scope and assessment  |
| Overlays and registers | Customer requirements        |
| Templates and schemas  | Evidence and evidence index  |
| Synthetic examples     | Claims and approvals         |
| Crosswalks             | Contracts and legal opinions |
|                        | Risk acceptance and sign-off |

## Related pages

- [Profiles and maturity](profiles.md)
- [Claims and evidence](claims-and-evidence.md)
- [Quick start](../quick-start.md)
