---
translation_status: complete
machine_translated: false
---

# Owner map

This one-page map assigns accountability before a team copies the template. The
role names are generic; map them to your own organisation. A small team may
combine roles, but the person who approves a claim should not be the only person
who wrote it, and an AI agent cannot sign, accept risk, or approve a
translation.

## Roles

| Role                             | Accountable for                                                                  | Typical title                       | Must not                                       |
| -------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------- |
| Executive sponsor                | Scope, budget, residual risk, go/no-go, and final sign-off                       | Project sponsor, programme director | Delegate sign-off to the vendor                |
| Assurance lead                   | Running the assessment, keeping the instance and lockfile current, tracking gaps | Assurance manager, PMO lead         | Approve their own claim without review         |
| Delivery lead                    | Implementing requirements, supplying evidence, owning remediation dates          | Engineering lead, product lead      | Declare evidence current without the custodian |
| Security and privacy lead        | Security, privacy, incident, and impact-assessment requirements                  | CISO, DPO, security architect       | Give a legal opinion                           |
| Legal and regulatory focal point | Official sources, open legal questions, register review                          | Legal counsel, compliance lead      | Treat this library as legal advice             |
| Procurement and contract manager | Contracting authority, contract reference, vendor obligations, change record     | Procurement lead, contract manager  | Accept technical risk on the sponsor's behalf  |
| Operations and service owner     | Continuity, incident response, runbooks, and post-launch operation               | Service owner, operations lead      | Approve the pre-launch scope alone             |
| Evidence custodian               | Evidence index, access, retention, redaction, and freshness                      | Evidence librarian, records officer | Be the sole approver of a claim                |
| Independent reviewer             | Formal-standard review only: scope, findings, verdict                            | External reviewer                   | Review their own work or the maintainer's work |
| Thai content reviewer            | Thai wording and meaning; formal-standard translation completion                 | Thai reviewer, native-speaking SME  | Be an AI agent or an unnamed reviewer          |

The independent reviewer and the Thai content reviewer are optional for the
template track. They are required for the formal-standard track.

## Who owns which activity

| Activity                    | Accountable        | Does the work         | Must be consulted         | Record                     |
| --------------------------- | ------------------ | --------------------- | ------------------------- | -------------------------- |
| Choose scope and profile    | Sponsor            | Assurance lead        | Delivery, security        | `assurance.yaml`           |
| Select modules and overlays | Assurance lead     | Assurance lead        | Security, legal, delivery | `assurance.yaml`, lockfile |
| Assess requirements         | Assurance lead     | Delivery and security | Operations, legal         | `assessment.yaml`          |
| Confirm evidence is current | Evidence custodian | Delivery lead         | Assurance lead            | `evidence-index.yaml`      |
| Approve public wording      | Sponsor            | Assurance lead        | Legal, security           | `claims.yaml`              |
| Accept residual risk        | Sponsor            | Assurance lead        | Legal, security           | `risk-register.yaml`       |
| Sign off the assessment     | Sponsor            | Assurance lead        | All roles above           | `assessment.yaml` sign-off |
| Formal review (optional)    | Sponsor            | Independent reviewer  | Maintainer                | Formal review record       |

## Minimum separation of duties

- The person who writes a claim is not the only person who approves it.
- The person who supplies evidence is not the only person who confirms it is
  current, where the team is large enough to separate the roles.
- A vendor is not the only approver of its own delivery.
- An AI agent may prepare files and run checks, but cannot sign, accept risk, or
  mark a translation complete.
- A public-sector instance records the contracting authority and contract
  reference in `scope.public_sector`. Use the real authority only in the private
  instance; use a synthetic authority in a public example.

## First 30 minutes

1. The sponsor names the assurance lead and the evidence custodian.
2. The assurance lead runs `init` and confirms the selection with the sponsor.
3. The sponsor approves the scope, profile, modules, and overlays.
4. The delivery lead and security lead fill the assessment and evidence index.
5. The evidence custodian confirms freshness, access, and redaction.
6. The sponsor reviews claims and risks, signs the assessment, and records the
   decision in the instance, not only in chat.

## Related pages

- [Template readiness](../governance/template-readiness.md)
- [Project template](project.md)
- [Project instances](../concepts/project-instance.md)
- [Confidence labels](../governance/confidence-labels.md)
- [Public sector](../sectors/public-sector.md)
