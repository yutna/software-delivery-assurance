---
translation_status: complete
machine_translated: false
---

# External review packet

**Status: template only. No reviewer has been named, engaged, or recorded.
No external review has taken place.**

**Optional formal-standard tool.** This packet belongs to the optional
formal-standard track. The template / starter-kit track does not require it and
can be used with the limitations in
[template readiness](template-readiness.md). Use this packet only when an
organisation intends to make a formal-standard claim, commission an external
review, or prepare the v1.0.0 candidate.

**Prepared:** 2026-10-28. **Target:** the SRAS 1.0.0 candidate, based on
SRAS 0.9.0. **Reviewer:** _to be named_. **Review date:** _to be recorded_.

This page is a working packet for a future external reviewer. It states what to
review, the questions to answer, the evidence to inspect, and how to record a
result. The repository owner must name the reviewer and the reviewer must write
the result. Until that happens, every external-review claim in this repository
remains unticked, and this page is not evidence that a review occurred.

## What this packet is not

- It is not a review result, an approval, a certification, or a legal opinion.
- It is not a substitute for a qualified legal reviewer.
- It is not a prerequisite for using the starter kit or copying the template.
- It does not authorise a reviewer to change a requirement without evidence.
- It does not claim that the maintainer is independent of the work.

## Review scope

### In scope

| Area                     | What to review                                                                  | Starting point                                                    |
| ------------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Core requirements        | 70 active requirements: statement, criticality, applicability, evidence, gates  | `core/domains/`, `docs/en/reference/requirements/`                |
| Technical modules        | 52 active requirements across five modules                                      | `modules/`, `docs/en/reference/requirements/`                     |
| Sector overlays          | 45 active requirements across four Thailand overlays                            | `overlays/`, `docs/en/reference/overlays/`                        |
| Registers                | 27 source entries: official source, version, status, dates, mapped requirements | `registers/`, `docs/en/reference/registers/`                      |
| Crosswalks               | 7 informative mappings to external standards                                    | `mappings/`                                                       |
| Project template and CLI | Template shape, validation rules, lockfile, `init`, `project validate/refresh`  | `templates/project/`, `docs/en/templates/project.md`              |
| Governance and claims    | Readiness statements, review status, limitations, no compliance claim           | `GOVERNANCE.md`, `docs/en/governance/v1-readiness.md`, `SCOPE.md` |
| Bilingual documentation  | English and Thai pages, glossary, frontmatter status                            | `docs/en/`, `docs/th/`                                            |

### Out of scope

- Legal interpretation of a statute or whether a project complies with it.
- Auditing a real customer, service, contract, or evidence set.
- Certifying a product, team, or management system.
- Procurement thresholds and agency-specific practice.
- Performance, security testing, or penetration testing of a deployed system.
- Editing the review subject while reviewing it.

## Reviewer profile and independence

The review needs at least one reviewer who:

- is not the maintainer and has no financial or employment conflict with the
  repository;
- can read Thai and English, or works with a named Thai reviewer for the
  translation and Thailand-specific content;
- can inspect YAML, JSON Schema, TypeScript, and command output, or works with a
  named technical reviewer for the CLI and schema areas;
- records a scope, a date, a commit, findings, and limitations.

Two reviewers may split the scope. If they do, each one records their own name,
scope, and result. A split review is not a single sign-off by one person.

## Questions for the reviewer

Answer each question with a verdict, the evidence inspected, and any finding.

1. Is every active requirement statement testable, with a clear negative case?
2. Is criticality correct for gates and high requirements, and is applicability
   justified for each tier, module, and overlay?
3. Does every gate have evidence expectations that a delivery team can satisfy
   without guessing the evidence type or maximum age?
4. Are the 27 register entries tied to an official source, with a version, a
   verification date, a review due date, and the requirements they map to?
5. Do the overlays stay within their scope, and do they avoid asserting a legal
   conclusion that the sources do not support?
6. Do the four legal concerns (#128, #129, #130, #131) remain explicitly
   project-specific, with sources and limitations recorded rather than a legal
   conclusion in a requirement?
7. Is the project template complete and internally consistent, and do the
   documented commands work from a clean checkout?
8. Does `project validate` catch a stale lockfile, a missing file, and a
   selection the standard does not define, and does `project refresh` change
   only the lockfile?
9. Does any page claim compliance, certification, independent validation, or an
   external review that did not happen?
10. Are the limitations and residual risks stated clearly enough for a reader
    to know what the library does not cover?

## Review checklist

### Requirements and gates

- [ ] Every active requirement has one ID, one layer, and one source file.
- [ ] Gate requirements have evidence expectations with a type and freshness.
- [ ] No gate can be waived by an overlay or a project.
- [ ] Applicability resolves deterministically for the documented selections.
- [ ] The synthetic examples state the correct denominator and do not imply
      full coverage.

### Registers and legal status

- [ ] Each entry names an official source and a version.
- [ ] The verification date and review due date are present and plausible.
- [ ] The entry does not claim a legal conclusion or a compliance status.
- [ ] Legal concerns are recorded as `unverified` and are not answered in a
      requirement.
- [ ] No vendor endorsement appears in a source, example, or claim.

### Thai content

- [ ] The Thai statement has the same meaning as the English statement.
- [ ] Technical terms follow `docs/th/glossary.md`.
- [ ] IDs, YAML keys, dates, numbers, and citations are unchanged.
- [ ] `translation_status` and `machine_translated` match reality.
- [ ] No page says `complete` without a named human reviewer.

### Project template and CLI

- [ ] `init` creates a valid instance for both profiles.
- [ ] `project validate` is read-only and exits non-zero on a stale lock.
- [ ] `project refresh` writes only `assurance.lock.yaml`.
- [ ] A missing file produces a readable issue that names the file.
- [ ] The lockfile is deterministic and contains no timestamp or generator.
- [ ] All five examples validate.

### Governance and claims

- [ ] Readiness statements separate what is met from what is missing.
- [ ] No page claims external review, certification, or legal review.
- [ ] The owner sign-off is distinguishable from an external review.
- [ ] The limitations cover synthetic data, one assessor, and unverified
      registers.

## Evidence links

Run these from a clean checkout at the commit under review and record the
outputs. The numbers below are the baseline recorded when this packet was
prepared on 2026-10-28, after #140 and #141. Recompute them at the commit under
review.

| Evidence                 | Command or location                                                                | Baseline at preparation                   |
| ------------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------- |
| Standard content         | `npm run sras -- validate --all`                                                   | 53 files                                  |
| Tests                    | `npm test`                                                                         | 327 passed                                |
| Type and style           | `npm run typecheck`, `npm run lint`, `npm run format:check`                        | pass                                      |
| Reference pages          | `npm run sras -- render --check`                                                   | 154 pages                                 |
| Bilingual docs           | `npm run check:docs`, `npm run docs:build`                                         | 182 English, 29 Thai                      |
| Content guard            | `npm run sras -- guard`                                                            | 346 files scanned                         |
| FDS pack                 | `npm run check:fds`                                                                | 43 skills at `4d3875c`                    |
| Project examples         | `npm run sras -- project validate examples/<name>`                                 | 5 of 5 valid                              |
| Pilot reports            | `docs/en/pilots/`                                                                  | two synthetic pilots                      |
| Finding triage           | `docs/en/pilots/summary.md`                                                        | 18 findings dispositioned                 |
| Readiness review         | `docs/en/governance/v1-readiness.md`                                               | not ready for v1.0.0                      |
| Legal concerns           | issues #128, #129, #130, #131; `docs/en/governance/legal-concerns.md`              | research notes; project decision required |
| Remaining release issues | issues #61, #62, #63, #64, #65, #66                                                | open                                      |
| Release under review     | [v0.9.0](https://github.com/yutna/software-delivery-assurance/releases/tag/v0.9.0) | published                                 |

Repository: <https://github.com/yutna/software-delivery-assurance>

## How to record the result

1. The owner names the reviewer and the reviewer confirms the scope in writing.
2. The reviewer works at a specific commit and records the commit SHA.
3. The reviewer writes a record with the fields in the template below. A record
   may live in a new governance page, a signed document, or an issue comment;
   it must be public or linked from the repository.
4. Each finding gets a severity, an owner, and a disposition. A finding is not
   closed by silence.
5. The reviewer states a verdict: `accepted`, `accepted with findings`, or
   `not accepted`. A verdict is about the review scope, not about legal
   compliance.
6. The maintainer triages findings into issues. The reviewer does not edit the
   standard, the translation status, or the sign-off on the maintainer's behalf.
7. The maintainer updates the readiness page only after the record exists, and
   links the record. The page must still distinguish external review from the
   owner sign-off and the AI self-review.

A named human reviewer is the only person who may write the reviewer fields. An
AI agent may prepare this packet and transcribe a record only when the record
names the human, the date, and the evidence, and the human confirms the
transcription. An AI agent must not invent a reviewer, a date, a verdict, or a
signature.

## Review record template

Copy this block into the record. Leave a field blank rather than guessing.

```text
Reviewer name:
Reviewer role and affiliation:
Independence statement:
Review date:
Commit reviewed:
SRAS version reviewed:
Scope reviewed:
Out of scope:
Questions answered (number each answer):
Findings (ID, severity, evidence, recommendation):
Verdict (accepted / accepted with findings / not accepted):
Limitations:
Signature or verifiable approval:
```

## Related pages

- [Template readiness](template-readiness.md)
- [Legal concerns](legal-concerns.md)
- [v1.0.0 readiness review](v1-readiness.md)
- [Pilot summary and triage](../pilots/summary.md)
- [Governance policy](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
- [Execution status](https://github.com/yutna/software-delivery-assurance/issues/67)
