---
translation_status: complete
machine_translated: false
---

# Pilot summary and triage

This page consolidates the two internal pilots, the disposition of every
finding, the external review status, and the open legal questions. It covers
SRAS 0.8.0 and the synthetic projects only.

## Status at 2026-10-28

- Pilots complete: 2 (finance and public sector).
- Findings: 18 — 6 high, 8 medium, 4 low.
- Fixed in #59: 9.
- Deferred with a follow-up issue: 5.
- Open legal questions: 4.
- External review: not started. No external reviewer has been engaged.

The owner confirmed that no external reviewer is available yet. This page
records that fact instead of inventing a name, a date, or a sign-off.

## Triage method

Severity reflects the effect on a reader or on the documented workflow, not the
effort to fix.

| Severity | Meaning                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| High     | Can mislead a reader about coverage or block the documented workflow. Fix before a stable release.            |
| Medium   | A check is incomplete or a requirement is ambiguous. Fix or track with a named owner before a stable release. |
| Low      | Documentation drift or a papercut with a clear workaround.                                                    |

Every finding has one owner. With a solo maintainer, the owner is `@yutna` for
all 18 findings. A finding is not closed by silence: it is `fixed`, `deferred`
with an issue, or an `open legal question` with an issue.

## Findings

| ID    | Pilot   | Severity | Finding                                                                                                           | Owner  | Disposition         |
| ----- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------- | ------ | ------------------- |
| PF-01 | Finance | High     | The finance example is not a valid project instance: no manifest, no risk register, legacy lockfile.              | @yutna | Fixed in #59        |
| PF-02 | Finance | High     | No command validates an edited instance or refreshes its lockfile, although the docs instruct both.               | @yutna | Deferred to #127    |
| PF-03 | Finance | Medium   | Requirement resolution is not exposed in the CLI.                                                                 | @yutna | Deferred to #126    |
| PF-04 | Finance | High     | The example reports 8 assessed requirements and 6 gates; the selection resolves to 122 requirements and 46 gates. | @yutna | Fixed in #59        |
| PF-05 | Finance | Medium   | Evidence freshness is self-declared and can contradict `expires_at`.                                              | @yutna | Fixed in #59        |
| PF-06 | Finance | Medium   | Concept pages say the lockfile pins a generator and generation time; it stores neither.                           | @yutna | Fixed in #59        |
| PF-07 | Finance | Low      | The resolution worked example says the e2e lockfile pins 0.5.0; it pins 0.8.0.                                    | @yutna | Fixed in #59        |
| PF-08 | Finance | Low      | `init` records UTC dates, so a Bangkok user before 07:00 gets the previous day.                                   | @yutna | Fixed in #59        |
| PF-09 | Finance | Low      | The finance page understates the overlay's register references.                                                   | @yutna | Fixed in #59        |
| PF-10 | Finance | Medium   | `TH-FIN-004` requires a retention period but does not state one.                                                  | @yutna | Legal question #129 |
| PF-11 | Finance | Medium   | The overlay does not say whether material cloud outsourcing needs prior BOT approval.                             | @yutna | Legal question #128 |
| PS-01 | Public  | High     | The public sector example is not a valid project instance: no manifest, no risk register, legacy lockfile.        | @yutna | Fixed in #59        |
| PS-02 | Public  | High     | The example reports 7 assessed requirements and 6 gates; the selection resolves to 112 requirements and 47 gates. | @yutna | Fixed in #59        |
| PS-03 | Public  | Medium   | `TH-PUB-003` has no minimum accessibility target, and no field records the agreed target.                         | @yutna | Legal question #131 |
| PS-04 | Public  | High     | The schema has no field for the contracting authority or contract reference.                                      | @yutna | Deferred to #132    |
| PS-05 | Public  | Medium   | `TH-PUB-005` does not name an acceptable open-data licence set.                                                   | @yutna | Legal question #130 |
| PS-06 | Public  | Low      | WCAG 2.2 is cited by a gate but has no register entry.                                                            | @yutna | Deferred to #134    |
| PS-07 | Public  | Medium   | Evidence type coverage is not checked; a gate can be `verified` with one document.                                | @yutna | Deferred to #135    |

## Disposition detail

### Fixed in #59

Nine findings are content, data, or validation defects that fit the existing
pipeline:

- PF-01 and PS-01: make the four sector examples complete, valid project
  instances and parse them in tests.
- PF-04 and PS-02: state the resolved requirement and gate denominator in each
  example, and test that the statement matches the computed set.
- PF-05: reject `freshness_status: current` when the evidence expired before
  the assessment date.
- PF-06 and PF-07: correct the lockfile description and the stale example
  version in both languages.
- PF-08: use the local calendar date when creating an instance.
- PF-09: correct the finance page source list.

### Deferred

| Finding | Issue | Why it is deferred                                                                                         |
| ------- | ----- | ---------------------------------------------------------------------------------------------------------- |
| PF-02   | #127  | A project validate and lock refresh command is a new CLI surface. It needs a design note, tests, and docs. |
| PF-03   | #126  | Resolution output and coverage reporting need an output contract and a decision on gate failure semantics. |
| PS-04   | #132  | A contracting-authority field is a schema change with a migration note, so it needs its own review cycle.  |
| PS-06   | #134  | Register entries for voluntary external standards need a policy decision and verified sources.             |
| PS-07   | #135  | Evidence type coverage needs the requirement evidence map at validation time and a substitute-type rule.   |

Each deferred finding stays visible in the pilot reports. None of them blocks
the v0.9.0 release, and none is a gate waiver.

## External review notes

**Status: pending. No external reviewer has been engaged as of 2026-10-28.**

The owner confirmed that no reviewer is available yet. The repository does not
record a name, an affiliation, a date, or a sign-off that does not exist.

When a reviewer is engaged, the note must record:

- the reviewer's name and relevant qualification, with their consent,
- the scope reviewed (Core, finance overlay, public sector overlay, registers,
  pilot method, or limitations),
- the review date and the version reviewed,
- each comment with a severity and a disposition,
- any conflict of interest.

Until then:

- the readiness review in the governance section records the review as
  pending,
- no page claims external review, peer review, or independent validation,
- the register entries remain `unverified`,
- the v0.9.0 release notes do not claim external review.

## Open legal questions

These questions came from the pilots. The repository records them and does not
answer them. A qualified reviewer must supply the source and the scope.

| Issue | Question                                                                                                      | Requirement  |
| ----- | ------------------------------------------------------------------------------------------------------------- | ------------ |
| #129  | Which instrument sets the minimum transaction-record retention period, and does it differ by service type?    | `TH-FIN-004` |
| #128  | Does a material cloud or outsourcing arrangement need prior Bank of Thailand notification or approval?        | `TH-FIN-003` |
| #131  | Which WCAG version and conformance level apply to Thai public services, and does the answer differ by agency? | `TH-PUB-003` |
| #130  | Which licence terms are acceptable for open government data?                                                  | `TH-PUB-005` |

All four requirements stay `review_status: draft`. No period, approval step,
conformance level, or licence is asserted in the library.

## Limitations of the pilot evidence

- Two pilots, one assessor, synthetic data, one library version (0.8.0).
- No real project, real evidence, or production process was assessed.
- The pilots did not test the lite profile, all modules, all overlays, or the
  EU and ASEAN registers.
- No external reviewer and no qualified legal reviewer took part.
- Resolved counts depend on tier and selection, so they are evidence for the
  examples only, not a general coverage claim.

## Related pages

- [Pilot overview](index.md)
- [Finance pilot](finance.md)
- [Public sector pilot](public-sector.md)
- [Execution status](https://github.com/yutna/software-delivery-assurance/issues/67)
