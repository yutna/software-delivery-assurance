---
translation_status: complete
machine_translated: false
---

# Requirements and criticality

A requirement is a testable statement about what must be true before software
is delivered. It is not a recommendation, a maturity badge, or a claim.

## Anatomy of a requirement

Every requirement in `core/` and `modules/` has the same fields.

| Field                    | Purpose                                                                        |
| ------------------------ | ------------------------------------------------------------------------------ |
| `id`                     | Stable identifier such as `SRAS-GOV-001`. IDs never change and are not reused. |
| `title.en` / `title.th`  | Short statement of the requirement.                                            |
| `description.en` / `.th` | What must be true, stated so an assessor can test it.                          |
| `rationale.en` / `.th`   | Why the requirement exists.                                                    |
| `criticality`            | `gate`, `high`, `medium`, or `low`.                                            |
| `applicability`          | Tiers, modules, overlays, and exclusions that decide whether it applies.       |
| `evidence`               | Evidence types and the maximum age accepted for each.                          |
| `assessment.lite`        | What pass and partial look like for a lite assessment.                         |
| `assessment.full`        | What L2 and L3 look like for a full assessment.                                |
| `references`             | Official sources and informative references.                                   |
| `status`                 | `active`, `draft`, or `deprecated`.                                            |
| `translation_status`     | `complete`, `partial`, or `missing`.                                           |

The full list is in the generated [reference](../reference/index.md).

## Criticality

| Value    | Meaning                                                                |
| -------- | ---------------------------------------------------------------------- |
| `gate`   | Must meet the minimum level before delivery. A gate cannot be waived.  |
| `high`   | Material to the delivery decision and expected before most releases.   |
| `medium` | Important for a complete assessment but not a delivery blocker.        |
| `low`    | Useful evidence of good practice; may be deferred with a recorded gap. |

A gate requirement can be marked `not_applicable` only with a documented scope
reason and owner approval. It cannot be waived by an overlay, a module, or a
project addition. This rule is the same in every profile.

## Applicability

`applicability` narrows a requirement without changing its ID:

- `tiers` — the product tiers the requirement applies to.
- `modules` — technical modules that make the requirement relevant.
- `overlays` — sector or jurisdiction overlays that make it relevant.
- `excludes` — the conditions that remove it from scope.

The assessment records a status for every applicable requirement. A
requirement that does not apply is not silently dropped; it is recorded as
`not_applicable` with the reason.

## Evidence

Each requirement names one or more evidence types and a maximum age. The
accepted types are `document`, `diagram`, `configuration`, `screenshot`,
`test_result`, `metric`, `ticket`, `log`, `contract`, `attestation`,
`benchmark`, `interview`, and `report`.

Evidence rules:

- Evidence lives in a private store outside this repository.
- The public repository contains synthetic examples only.
- The evidence index records a location, owner, collection date, expiry date,
  and freshness status.
- Evidence older than the maximum age is expired, even if it was correct when
  collected.
- A claim without current evidence is not a verified claim.

## Assessment guidance

`assessment.lite` describes pass and partial for a first-pass review.
`assessment.full` describes L2 and L3 for a deeper review. The guidance is not
a second requirement: it shows how an assessor should recognise the same
statement at a different depth.

## IDs and stability

Core and module requirements use `SRAS-<DOMAIN>-<NNN>`. Overlay requirements
use `<CC>-<INDUSTRY>-<NNN>`, for example `TH-FIN-001`. Register entries use
`<CC>-<INSTRUMENT>-<NNN>`.

Rules:

- An ID is never reused.
- A deprecated requirement keeps its ID and names its replacement.
- A version number is never encoded in an ID.
- A customer or project name is never encoded in an ID.

## Translation

English is canonical for identifiers and schema keys. Thai titles and
descriptions must be translations of the English text, not summaries.
Machine-assisted Thai is marked `machine_translated: true` and stays
`translation_status: partial` until a human reviewer confirms it.

## Related pages

- [Profiles and maturity](profiles.md)
- [Claims and evidence](claims-and-evidence.md)
- [Reference](../reference/index.md)
