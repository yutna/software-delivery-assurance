# SRAS-GOV-006 — Risk appetite and tolerance are defined for material risk categories

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

The product must define risk appetite and measurable tolerance for each material risk category, and must show how the thresholds are applied to the risk register. A register without approved thresholds cannot be assessed consistently.

**Thai:** ผลิตภัณฑ์ต้องกำหนด risk appetite และ tolerance ที่วัดได้สำหรับหมวดความเสี่ยงที่มีนัยสำคัญแต่ละหมวด และต้องแสดงว่ามีการนำเกณฑ์ไปใช้กับ risk register อย่างไร risk register ที่ไม่มีเกณฑ์ที่ได้รับอนุมัติไม่สามารถประเมินได้อย่างสม่ำเสมอ

## Rationale

Without agreed thresholds, teams cannot tell an accepted risk from an unmanaged one.

**Thai:** หากไม่มีเกณฑ์ที่ตกลงร่วมกัน ทีมจะแยกความเสี่ยงที่ยอมรับแล้วออกจากความเสี่ยงที่ยังไม่ได้รับการจัดการไม่ได้

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Approved risk appetite and tolerance statement by risk category
- **ticket** (max 365 days): Approval record with owner and date

## Assessment

- Lite pass: Approved thresholds exist for each material risk category and are referenced by the register.
- Lite partial: Thresholds exist for some categories or are not applied.
- Full L2: Approved and applied to the current register.
- Full L3: Reviewed annually and after strategy change; breaches are escalated with decisions recorded.

## References

- [ISO 31000:2018](https://www.iso.org/standard/65694.html) — `standard`
- [NIST CSF 2.0 GV.RM](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `6.1.1, 6.1.2` (partial) — Risk criteria are required; appetite and tolerance are SRAS additions.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
