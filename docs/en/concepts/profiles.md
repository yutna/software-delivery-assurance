---
translation_status: complete
machine_translated: false
---

# Profiles and maturity

A profile is the assessment mode. Both profiles use the same requirement IDs
and the same applicability rules; they differ in how much detail the assessment
records.

## Lite and full

| Property               | Lite                                     | Full                                             |
| ---------------------- | ---------------------------------------- | ------------------------------------------------ |
| Best for               | Bids, pre-sales, first-pass gap analysis | Internal assurance, due diligence, annual review |
| Status per requirement | Required                                 | Required                                         |
| Gate report            | Yes                                      | Yes                                              |
| Maturity level         | Not used; must be `null`                 | L0–L4 on every assessed requirement              |
| Criticality weights    | Not used                                 | Used by the readiness index                      |
| Readiness index        | `null`                                   | A value between 0 and 1                          |
| Evidence coverage      | Not reported                             | Reported                                         |

`assurance.yaml` and `assessment.yaml` must agree on the profile, tier,
modules, overlays, and project identity. A mismatch is a validation error.

## Statuses

| Status           | Meaning                                                         |
| ---------------- | --------------------------------------------------------------- |
| `not_assessed`   | In scope, but no assessment has been recorded yet.              |
| `gap`            | The requirement is not met; a gap and owner are required.       |
| `partial`        | Some of the requirement is met; the missing part is recorded.   |
| `implemented`    | The requirement is met; evidence may still be pending.          |
| `verified`       | The requirement is met and the evidence is current and checked. |
| `not_applicable` | The requirement does not apply, with a documented reason.       |

For the common C/P/N vocabulary used in bids:

- `verified` and `implemented` map to **C**.
- `partial` maps to **P**.
- `gap` and `not_assessed` map to **N**.

The mapping is a reporting convenience, not a compliance statement.

## Gates and counts

The assessment records a gate summary:

```yaml
gates:
  pass: 0
  fail: 0
```

`summary.counts` must match the statuses recorded on the requirements. A gate
with a status below the minimum is a failed gate. A failed gate is a delivery
blocker until it is resolved or the scope is changed with approval.

## Full-profile depth

The full profile adds:

- **Maturity L0–L4** on every assessed requirement. The project agrees what
  each level means for its product and records the level; the library does not
  assign a universal label beyond the scale.
- **Criticality weights** from the requirement criticality. The project records
  the resulting readiness index in `summary.index`.
- **Readiness index** between 0 and 1.
- **Evidence coverage** reported for the assessment.

The index and coverage are summaries recorded by the assessor, not values the
CLI computes. They must be read with the gate report and the open gaps.

## Sign-off and limitations

An assessment records an assessor, a sign-off name, a role, and a date. It also
records limitations. A limitation is not a waiver; it is a visible statement of
what the assessment did not cover.

## What the parser enforces

The project parser and JSON Schemas enforce these rules before a project
instance is written or accepted:

- `lite` requires `maturity: null` on every assessed requirement and
  `summary.index: null`.
- `full` requires a maturity level and a summary index between 0 and 1.
- Counts match statuses.
- A gap has an owner and a due date where the schema requires them.
- An accepted risk has an acceptance ID.

## Related pages

- [Project instances](project-instance.md)
- [Resolution](resolution.md)
- [Quick start](../quick-start.md)
