---
translation_status: complete
machine_translated: false
---

# Pilot B — Public sector (synthetic)

**Status:** internal pilot, completed 2026-10-28.
**Library:** SRAS 0.8.0 at commit `2264312`.
**Sector:** public sector, overlay `TH-PUB`.
**Data:** synthetic only. No agency name, real evidence, or production detail
was used.

## Purpose

Test whether a public sector delivery team can select Core plus the public
sector overlay, work out which requirements and gates apply, assess a service,
and run the checks. The pilot also compared the result with
`examples/public-sector-synthetic/`.

## Scope

- SRAS Core, `full` profile, tier 2.
- Modules `SRAS-INT`, `SRAS-RGD`, `SRAS-CLD`.
- Overlay `TH-PUB`.
- A fresh `sras init` instance and the public sector synthetic example.

Out of scope: a real agency, a real service, personal data, legal review,
external reviewers, and procurement behaviour in a live contracting process.

## Method

The pilot used the same steps as pilot A so the two reports are comparable.

1. Created a full-profile instance and set the selection to the three modules
   and `TH-PUB`.
2. Read every `TH-PUB` requirement and its evidence expectations.
3. Recomputed the resolved requirement set for tier 2 and compared it with the
   assessed set in the example.
4. Checked each assessed gate against the evidence types the requirement
   expects.
5. Ran the library checks.

## Results

### What worked

- The overlay is a real delta: 12 requirements, 7 of them gates, with evidence
  expectations, assessment guidance, and a source for each requirement.
- The public sector page lists the same register entries the overlay cites
  (`TH-CCA-001`, `TH-CYBER-001`, `TH-DGA-001`, `TH-PDPA-001`, `TH-PROC-001`)
  plus WCAG 2.2. Pilot A found the finance page did not match its overlay; this
  page does.
- Hosting and data residency (`TH-PUB-006`) covers cross-border access and
  transfer, not only storage location.
- The example uses neutral wording and no agency, vendor, or citizen data.
- The library checks pass on the example repository.

### Findings

| ID    | Severity | Finding                                                                                                                                                                           | Disposition              |
| ----- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| PS-01 | High     | The public sector example is not a valid project instance: no `assurance.yaml` or `risk-register.yaml`, and a legacy lockfile shape that the project-lock parser rejects.         | Fixed in #59             |
| PS-02 | High     | The example reports 7 assessed requirements and 6 gates without a denominator; the declared selection resolves to 112 requirements and 47 gates, so 41 gates are unassessed.      | Fixed in #59             |
| PS-03 | Medium   | `TH-PUB-003` is a gate with no minimum accessibility target, and the project schema has no field that records the target the project agreed.                                      | Open legal question #131 |
| PS-04 | High     | The project schema has no field for the contracting authority or contract reference, so `TH-PUB-001` cannot be tied to the body that awarded the contract.                        | Deferred to #132         |
| PS-05 | Medium   | `TH-PUB-005` requires a licence for open data but does not name an acceptable licence set, so any string passes.                                                                  | Open legal question #130 |
| PS-06 | Low      | `TH-PUB-003` cites WCAG 2.2, a standard that has no register entry, so its version and review date are not tracked with the other sources.                                        | Deferred to #135         |
| PS-07 | Medium   | Evidence type coverage is not checked. `TH-PUB-001` expects a document, a contract, and a vendor performance report, but the example marks the gate `verified` with one document. | Deferred to #134         |

## Detail on the high findings

### PS-01 — the example is not a valid instance

The directory has `assessment.yaml`, `evidence-index.yaml`, `claims.yaml`,
`assurance.lock.yaml`, and `evidence/`, but no `assurance.yaml` and no
`risk-register.yaml`. Its lockfile does not match the current project-lock
schema: `lockfile_version` and `inputs` are missing, `sras.checksum` is `null`,
and the file carries `generated_at` and `notes` fields that the schema does not
allow.

This is the same root cause as pilot A finding PF-01. Four of the five
examples share it; only `examples/e2e-project/` is a complete instance. CI
checks the example content but never parses the four sector examples as project
instances.

### PS-02 — the assessed slice is not labelled

At tier 2 the declared selection resolves to 112 requirements, 47 of them
gates. The example assesses 7 requirements, 4 of them gates, and covers 4 of
the 12 `TH-PUB` requirements. Its README says "7 assessed requirements,
including 6 gates" without saying how many gates apply.

The overlay itself has 7 gate requirements. A reader who sees "6 gates" and
does not know the denominator can mistake the example for a full gate
assessment. 41 gate requirements are neither assessed nor listed.

### PS-04 — the contracting authority is not recorded

`TH-PUB-001` requires procurement, contract, acceptance, change-order, and
vendor performance evidence for each service. The project instance records the
project name and an owner, but not the agency that awarded the contract, the
contract reference, or the procurement method. A reader cannot tell whose rules
apply, and an assessor cannot tie the evidence to a contracting authority.

The example passes the gate with one generic document, so the gap is invisible
in the current test suite.

## Limitations

- One assessor, one synthetic service, one library version.
- No real procurement record, contract, or agency process was tested.
- The pilot did not test the lite profile or a cross-agency service.
- No external reviewer or qualified legal reviewer took part.
- The resolved count depends on tier and selection; another selection produces
  a different denominator.

## Open questions

These are legal questions. The repository records them and does not answer
them.

- Which WCAG version and conformance level apply to Thai public services, and
  does the answer differ by agency type? See #131.
- Which licence terms are acceptable for open government data? See #130.

## Follow-ups

- Fixed findings: #59.
- Deferred findings: #132 (contracting authority), #135 (external standards in
  the register), and #134 (evidence type coverage).
- Open legal questions: #130 and #131.

## Related pages

- [Pilot overview](index.md)
- [Public sector](../sectors/public-sector.md)
- [Project template guide](../templates/project.md)
