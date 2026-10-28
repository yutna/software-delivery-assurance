---
translation_status: complete
machine_translated: false
---

# Review policy

**Status:** governance policy for the v1.0.0 milestone, the v1.x maintenance
line, and v2.0 preparation. **Recorded:** 2026-10-28. **Applies to:** SRAS 0.9.0
and later content.

This page is the detailed review policy. [GOVERNANCE.md](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
is the binding summary. The policy describes how a review is recorded. It does
not create a review, a reviewer, a date, or a sign-off that does not exist.

The policy is ready before the release is. The content version is still SRAS
0.9.0, the v1.0.0 milestone is open, and the formal-standard track is not ready.
The [v1.0.0 readiness review](v1-readiness.md) records the blockers.

## Three different questions

A reader needs to know three separate things:

| Question                                 | Field or label                             | Answers                                                                             |
| ---------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------- |
| Was the content reviewed, and by whom?   | `review_status`                            | Whether a qualified reviewer checked the content.                                   |
| Was the translation reviewed by a human? | `translation_status`, `machine_translated` | Whether the Thai text is a machine-assisted draft or a human-confirmed translation. |
| How confident is a prose statement?      | [Confidence labels](confidence-labels.md)  | Whether a statement is checked, documented, provisional, or planned.                |

The three are not interchangeable. A `checked` confidence label does not make
content `reviewed`. A complete translation does not make the content legally
reviewed. A review status is not a certification.

## Content review status

| Status       | Meaning                                                                                | Who may set it                                       | Required record                                                 |
| ------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `draft`      | Content is being written and is not ready to assess.                                   | The author.                                          | None.                                                           |
| `unverified` | Content is published as a reference but has not been reviewed by a qualified reviewer. | The maintainer, after the content and sources exist. | The limitation stays visible.                                   |
| `reviewed`   | A named reviewer checked the recorded scope.                                           | The named human reviewer; the maintainer records it. | Reviewer name, date, scope, version, findings, and limitations. |

A review record is not a file name or a commit. It identifies the person, the
date, the scope, the version reviewed, what was checked, what was not checked,
and any limitation. If a field is missing, the status stays `draft` or
`unverified`.

An AI execution agent may draft, edit, test, and self-review content. Its work
is recorded as an AI review. It is not a human review, not an external review,
and not a legal review, and it does not change `review_status` to `reviewed`.

## Translation review status

| Status                     | Meaning                                                                                  | Who may set it                                       |
| -------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `partial`                  | The translation is incomplete or machine-assisted and has not been confirmed by a human. | The author or maintainer.                            |
| `complete`                 | A named human reviewer confirmed the translation for the recorded scope.                 | The named human reviewer; the maintainer records it. |
| `machine_translated: true` | A machine produced or assisted the text. It stays `partial` until a human confirms it.   | The author or maintainer.                            |

`translation_status: complete` and `machine_translated: false` require a named
human reviewer, a date, and a scope. An AI execution agent cannot mark a
translation complete on a human's behalf. A polished machine translation is
still a machine translation until a human reviewer confirms meaning,
terminology, and the glossary.

English is canonical for identifiers, schema keys, and file names. A Thai page
may be published as `partial` with the translation banner; it may not be
presented as a human-reviewed translation.

## Review types

| Review type                   | Who performs it                                | What it can change                                    | What it cannot claim                              | Current state                       |
| ----------------------------- | ---------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------- | ----------------------------------- |
| AI drafting and self-review   | The AI execution agent                         | Draft text, tests, and a recorded AI review           | Human review, external review, legal review       | Recorded for the v0.9.0 review step |
| Maintainer content review     | `@yutna` as maintainer                         | `review_status` for the reviewed scope                | Independence, external review, legal review       | Applies to repository decisions     |
| Human Thai translation review | A named Thai reviewer                          | `translation_status: complete` for the reviewed scope | Legal review, external review                     | Not performed                       |
| Qualified legal review        | A named qualified legal reviewer               | A legal review record for the reviewed scope          | A project-specific legal opinion for every reader | Not performed                       |
| External independent review   | A named reviewer independent of the maintainer | An external review record for the agreed scope        | Certification, accreditation, regulatory approval | Not performed                       |
| Release audit                 | The maintainer with the execution agent        | Audit evidence and a gap report                       | A release if a blocker remains                    | Gap report in progress              |

A missing review is recorded as missing. The repository does not invent a
reviewer, a date, or a sign-off to complete a table.

## How to record a review

A review record contains:

- the reviewer's name and role, and whether the reviewer is independent;
- the date and the content version;
- the files, requirements, modules, overlays, registers, or pages reviewed;
- the method and the sources used;
- the findings and their disposition;
- what the review did not cover;
- the resulting `review_status`, `translation_status`, and
  `machine_translated` values.

The record may live in the reviewed object, a linked YAML field, or a dated
page. A placeholder is labelled as a placeholder and is not a review:

```text
Reviewer: <named human reviewer>
Date: <date>
Scope: <files and version>
Result: <findings and disposition>
Limitations: <what was not reviewed>
```

Do not fill the placeholder with an AI name, a role title, or a date that has
no corresponding review event.

## Checklists

### Content review checklist

- [ ] The change has an issue with scope and acceptance criteria.
- [ ] The content is factual, testable where applicable, and has a negative case.
- [ ] Sources are official and current enough for the stated review scope.
- [ ] No certification, compliance, approval, or guarantee claim is added.
- [ ] No customer name, real evidence, secret, or private endpoint is added.
- [ ] The review record names the reviewer, date, scope, and version, or the
      status stays `draft` or `unverified`.

### Translation review checklist

- [ ] English remains canonical for identifiers, schema keys, and file names.
- [ ] The Thai page has a Thai reviewer for the reviewed scope.
- [ ] The reviewer checked meaning, terminology, and the glossary, not only
      grammar.
- [ ] `translation_status` and `machine_translated` match the evidence.
- [ ] No page is marked complete because a machine or an AI agent produced it.

### External review checklist

- [ ] The reviewer is named, independent of the maintainer, and engaged for a
      recorded scope.
- [ ] The review record states what was reviewed and what was not.
- [ ] The review result is published with the reviewer's permission.
- [ ] A missing reviewer is recorded as missing. No name, date, or sign-off is
      invented.

### Release review checklist

- [ ] Every milestone issue is closed and the milestone scope is complete.
- [ ] The version is consistent in `package.json`, `package-lock.json`,
      `src/sras/version.ts`, `CITATION.cff`, `core/sras.yaml`, and the docs
      config.
- [ ] `ci-ok` and `pr-check / check` are green on `main`.
- [ ] `oss-kit doctor` reports no drift.
- [ ] The audit evidence is posted to the dashboard issue.
- [ ] Translation and review statuses match the release scope, or the release
      stays blocked.
- [ ] The release notes and announcement link to the audit and make no
      certification, legal-compliance, or out-of-scope claim.

## Maintenance and deprecation

The v1.x line is additive and backward-compatible. A minor release may add
requirements, modules, overlays, registers, crosswalks, commands, optional
fields, and documentation. It must not remove a requirement, change an ID,
waive a gate, or invalidate an existing project instance without a migration
note.

A deprecated requirement keeps `status: deprecated`, `deprecated_in`, and a
replacement, and stays visible for at least one minor release. v2.0 may remove
it with a migration guide and a prior deprecation notice. Security and
correctness fixes may ship out of band and still follow the issue, pull
request, CI, and squash-merge path.

The maintainer supports the latest v1.x line on a best-effort basis. There is no
service-level agreement and no guarantee that an external source remains current
between review dates. The detailed rules are in
[GOVERNANCE.md](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md#maintenance-and-deprecation).

## Review cadence

Thailand register entries are reviewed at least every 6 months. ASEAN and EU
entries are reviewed at least every 12 months. The Core is reviewed annually.
Incidents, material architecture changes, new jurisdictions, and major releases
trigger an earlier review.

## No certification or compliance claim

No review type in this policy produces a certification, accreditation, audit
attestation, regulatory approval, or a legal conclusion. A review record states
what a named reviewer checked. It does not state that a product, a project, or
the library is compliant with any law or standard.

## Related pages

- [v1.0.0 readiness review](v1-readiness.md)
- [Template readiness](template-readiness.md)
- [Confidence labels](confidence-labels.md)
- [Legal concerns](legal-concerns.md)
- [External review packet](external-review-packet.md)
- [Thai review kit](thai-review-kit.md)
- [GOVERNANCE.md](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
- [CONTRIBUTING.md](https://github.com/yutna/software-delivery-assurance/blob/main/CONTRIBUTING.md)
