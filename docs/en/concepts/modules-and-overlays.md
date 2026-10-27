---
translation_status: complete
machine_translated: false
---

# Modules and overlays

Modules and overlays extend the SRAS Core. They are deltas, not full copies of
the standard. Both are selected in `assurance.yaml` and pinned in the lockfile.

## Technical modules

A module is selected when the product has the relevant characteristic.

| Module              | ID         | Requirements | Selected when the product has…                                  |
| ------------------- | ---------- | -----------: | --------------------------------------------------------------- |
| AI and GenAI        | `SRAS-AI`  |           12 | AI or generative AI features, assisted decisions, or automation |
| Integration and API | `SRAS-INT` |           10 | APIs, partner integrations, or machine-to-machine exchange      |
| Regulated data      | `SRAS-RGD` |           10 | Personal, financial, or otherwise regulated data                |
| Cloud/SaaS          | `SRAS-CLD` |           10 | A cloud or SaaS dependency, tenancy, or data residency question |
| On-premises         | `SRAS-ONP` |           10 | Hosted infrastructure the product team operates                 |

Modules are add-only. A module never weakens a Core requirement.

## Sector overlays

An overlay is a jurisdiction or industry delta. It can add, override, or waive
a non-gate requirement with a justification; it cannot waive a gate.

| Overlay                | ID       | Requirements | Scope                                                               |
| ---------------------- | -------- | -----------: | ------------------------------------------------------------------- |
| Thailand finance       | `TH-FIN` |           10 | Banks, insurers, payment providers, fintech, financial software     |
| Thailand e-commerce    | `TH-ECM` |           12 | Online marketplaces, direct-to-consumer platforms, checkout, orders |
| Thailand logistics     | `TH-LOG` |           11 | Transport, warehouse, tracking, customs integration, delivery       |
| Thailand public sector | `TH-PUB` |           12 | Government agencies, state enterprises, public-service vendors      |

Every overlay states what it does not cover. An overlay is not a legal
opinion, and adding an overlay does not make a product compliant with a law.

## Selection rules

- Select every module whose characteristic is present. Do not leave a module
  out because the assessment is early.
- Select every overlay for the jurisdictions and industries in scope.
- Record the selection in both `assurance.yaml` and the assessment. The two
  files must agree.
- A requirement that does not apply is recorded as `not_applicable` with a
  reason; it is not removed.
- A gate is never waived. The only route is a documented scope change with
  owner approval that records why the requirement does not apply.
- A non-gate waiver needs a written justification, a risk owner, an expiry
  date, and approval.

## Where the files live

| Path                            | Content                                      |
| ------------------------------- | -------------------------------------------- |
| `modules/<module>/module.yaml`  | Module identity and requirements             |
| `overlays/industries/<sector>/` | Overlay identity, requirements, review notes |
| `core/domains/*.yaml`           | Core requirements                            |
| `schemas/`                      | JSON Schema contracts for every object       |

The generated [reference](../reference/index.md) lists every requirement,
including module and overlay requirements.

## What an overlay is not

- Not a law or a regulation.
- Not legal advice or a compliance conclusion.
- Not a full standard; it is a delta on the Core.
- Not a vendor endorsement.

The factual record of a law or regulation lives in a
[register](../registers/index.md), not in an overlay.

## Related pages

- [Resolution](resolution.md)
- [Sectors](../sectors/index.md)
- [Reference](../reference/index.md)
