---
translation_status: complete
machine_translated: false
---

# Confidence labels

**Status:** docs-only convention. Introduced with the v0.10.0 template
positioning and carried into the v1.1.0 template release. **Not a schema field.
Not a certification. Not a review status.**

Confidence labels help a reader tell the difference between a result that a
command reproduced, a statement taken from repository content, a provisional
judgement, and a plan. They apply to prose. They do not change the YAML
contracts, `review_status`, `translation_status`, or any structured object.

## Labels

| Label         | Meaning                                                                                                     | Use for                                                            | Do not use for                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------ |
| `checked`     | A reproducible command, test, or inspection produced the stated result at a named commit.                   | Counts, validation results, build results, link checks             | Legal meaning, compliance, external approval, future results |
| `documented`  | The statement is taken from repository content and can be inspected, but has not been independently tested. | Descriptions of files, schemas, commands, and documented behaviour | Claims that need a test or an external source                |
| `provisional` | A draft judgement that may change after real use or review.                                                 | Suitability for a project, early adoption guidance, open questions | Facts that a command can settle                              |
| `planned`     | Work that is described in the roadmap or an issue but not implemented.                                      | Milestones, future pages, future schema changes                    | Anything a reader can use today                              |

If a sentence has no label, read it as `documented`.

## How to apply a label

Use an inline label after the claim, or a `Confidence` column in a table:

```text
Standard content validates: 54 files (`checked`, 2026-10-28).
The template is suitable for a Thai public-sector pilot (`provisional`).
The v1.1.0 template release includes the owner map (`checked`).
```

Keep the scope small. "54 files validate" is `checked`; "the standard is
correct" is not. "This page describes the template" is `documented`; "the
template is certified" is never allowed.

## Rules

- `checked` needs a command, a test, or a reproducible inspection, plus a date
  or commit. If the check is not reproducible, use `documented`.
- `checked` does not mean externally reviewed, legally correct, or suitable for
  a decision. It only means the stated check passed in the recorded scope.
- `provisional` is the right label for adoption advice that no real project has
  tested.
- `planned` is not a commitment to deliver. A roadmap item may change.
- Do not use a confidence label to replace `review_status` or
  `translation_status`. A page can be `translation_status: partial` and still
  contain `checked` statements about commands.
- Do not add a confidence field to YAML, JSON Schema, or the project template in
  this round. A schema change needs its own issue and design note.
- Do not use `checked` for the legal meaning or current status of an external
  source. The registers remain `unverified` until a qualified reviewer signs
  off.
- Do not use a label to imply certification, accreditation, audit attestation,
  or regulatory approval.

## Worked examples

| Statement                                                        | Label         | Why                                                         |
| ---------------------------------------------------------------- | ------------- | ----------------------------------------------------------- |
| `sras validate --all` validated 54 files at the recorded commit. | `checked`     | A command produced the result; the scope is the 54 files.   |
| All 167 active requirements are `translation_status: partial`.   | `checked`     | The inventory and YAML fields can be inspected and counted. |
| The registers are `review_status: unverified`.                   | `checked`     | The status field is machine-readable and inspectable.       |
| The kit is suitable for a first Thai public-sector pilot.        | `provisional` | No real project has used it in this repository's evidence.  |
| v1.1.0 ships the owner map and confidence labels.                | `checked`     | The release includes both; the files can be inspected.      |
| The public sector overlay covers procurement law advice.         | not allowed   | It does not cover legal advice; the statement is false.     |

## Relation to the AI audit

Confidence labels keep the template's claims honest. The repository does not use
a formal review or a sign-off. An adopting project may add its own review; that
review does not turn a confidence label into a certification.

The [template readiness](template-readiness.md) page uses all four labels. The
[AI audit record](v1-audit.md) is an audit record, not a confidence label.

## Scope of this convention

This is a documentation convention only. It introduces no TypeScript type, no
schema property, no CLI flag, and no test. A future schema change would need a
separate issue, a design note, and a migration note. Until then, do not add a
`confidence` key to any YAML file.

## Related pages

- [Template readiness](template-readiness.md)
- [Owner map](../templates/owner-map.md)
- [Governance policy](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
- [Scope](https://github.com/yutna/software-delivery-assurance/blob/main/SCOPE.md)
