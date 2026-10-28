# SRAS-CHG-006 — Production changes are risk-assessed and approved before deployment

- Domain: `change-release`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/change-release.yaml`

## Description

Each production change must record its risk, impact, test evidence, and approver, and high-risk changes must receive approval from a named owner outside the implementing team. An emergency change without a retrospective record fails the requirement.

**Thai:** การเปลี่ยนแปลง production แต่ละรายการต้องบันทึกความเสี่ยง ผลกระทบ หลักฐานการทดสอบ และผู้อนุมัติ และการเปลี่ยนแปลงที่มีความเสี่ยงสูงต้องได้รับอนุมัติจาก owner ที่ระบุชื่อซึ่งอยู่นอกทีมที่ดำเนินการ การเปลี่ยนแปลงฉุกเฉินที่ไม่มีบันทึกย้อนหลังถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Approval is only meaningful when the approver can see risk and evidence.

**Thai:** การอนุมัติมีความหมายก็ต่อเมื่อผู้อนุมัติมองเห็นความเสี่ยงและหลักฐาน

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **ticket** (max 90 days): Change record with risk, impact, test evidence, and approver
- **report** (max 90 days): Emergency change retrospective for the current period

## Assessment

- Lite pass: Production changes are recorded and approved in proportion to risk.
- Lite partial: Approvals exist but risk or evidence is missing for some changes.
- Full L2: Applied to all production changes.
- Full L3: Measured with approval coverage, emergency-change rate, and change-failure trends.

## References

- [ISO/IEC 27001:2022 8.32](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 PR.PS](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.32` (supports) — Change management.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `6.5.1` (supports) — Change approval and documentation.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
