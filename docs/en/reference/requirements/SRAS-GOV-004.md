# SRAS-GOV-004 — An approved assurance policy defines objectives and review rules

- Domain: `governance`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/governance.yaml`

## Description

The product must operate under an approved assurance policy that states its objectives, the obligations it follows, the roles that enforce it, and the review cycle. A policy that is unapproved, undated, or disconnected from the current scope does not satisfy this requirement.

**Thai:** ผลิตภัณฑ์ต้องดำเนินงานภายใต้นโยบาย assurance ที่ได้รับอนุมัติ ซึ่งระบุวัตถุประสงค์ ข้อผูกพันที่ต้องปฏิบัติ บทบาทผู้บังคับใช้ และรอบการทบทวน นโยบายที่ยังไม่อนุมัติ ไม่มีวันที่ หรือไม่สอดคล้องกับ scope ปัจจุบันไม่ถือว่าผ่านข้อกำหนดนี้

## Rationale

Without an approved policy, assurance decisions depend on individual judgment and cannot be audited consistently.

**Thai:** หากไม่มีนโยบายที่ได้รับอนุมัติ การตัดสินใจด้าน assurance จะขึ้นอยู่กับดุลยพินิจของแต่ละบุคคลและไม่สามารถตรวจสอบได้อย่างสม่ำเสมอ

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Approved assurance policy with version, owner, and approval date
- **ticket** (max 365 days): Policy approval and communication record

## Assessment

- Lite pass: The policy is approved, current, and accessible to the team.
- Lite partial: A policy exists but is unapproved, stale, or not communicated.
- Full L2: Approved, scoped to the product, and reviewed within the last year.
- Full L3: Reviewed on a defined cycle with communication and exception evidence.

## References

- [ISO/IEC 27001:2022 5.2](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 GV.PO](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `5.2` (supports) — Information security policy.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.PO-01` (supports) — Policy for managing cybersecurity risks.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
