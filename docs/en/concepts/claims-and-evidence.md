---
translation_status: complete
machine_translated: false
---

# Claims and evidence

A claim is a public statement about a product's assurance. It is only as good
as the evidence behind it. The library separates the two so a sales sentence
cannot outrun the assessment.

## Claim states

| State         | Meaning                                                                |
| ------------- | ---------------------------------------------------------------------- |
| `verified`    | Current evidence supports the wording; an approver and expiry are set. |
| `partial`     | Some evidence supports a narrower wording; the limit is stated.        |
| `not_claimed` | The project does not make this claim.                                  |
| `prohibited`  | The wording overstates the evidence and must not be used.              |

A `verified` or `partial` claim needs current evidence, an approver, and an
expiry date. A claim with no evidence is `not_claimed`.

## Allowed and prohibited wording

`claims.yaml` records both sides:

```yaml
claims:
  - id: CLM-DEMO-001
    requirement_ids: [SRAS-SEC-001]
    status: verified
    allowed_wording: Synthetic access control is implemented and tested.
    prohibited_wording: The product meets every access rule without exception.
    owner: Example team
    approved_by: Example approver
    approved_at: "2026-10-27"
    expires_at: "2027-10-27"
```

Sales, proposal, and bid teams use `allowed_wording` only. `prohibited_wording`
records the sentences that must not be used, even if the assessment is strong.

## Evidence types

The evidence index accepts `document`, `diagram`, `configuration`,
`screenshot`, `test_result`, `metric`, `ticket`, `log`, `contract`,
`attestation`, `benchmark`, `interview`, and `report`.

Each requirement states the accepted types and a maximum age. Evidence older
than the maximum is expired.

## Evidence index rules

- The location is a private reference, not a public URL.
- Every entry names the requirement it supports.
- Every entry has an owner, a collection date, and an expiry date.
- Freshness is `current`, `expired`, or `unknown`.
- Redaction is `none`, `partial`, or `full`.
- A hash, when present, is a SHA-256 value.

## What may not be claimed

- Certification, accreditation, audit attestation, or regulatory approval.
- A definitive statement of legal compliance.
- Compliance with a law because a register entry exists.
- Vendor endorsement.
- A result that the evidence does not support.
- A claim that has expired.

The content guard rejects the most dangerous phrases in public content and
links a claim to evidence in the project template. It does not replace review.

## Claims in the public repository

This repository stores templates and synthetic examples. It does not store
customer claims. A real claim stays in the private project instance with its
approval and expiry.

## Related pages

- [Project instances](project-instance.md)
- [Requirements and criticality](requirements.md)
- [Tools and checks](tools.md)
