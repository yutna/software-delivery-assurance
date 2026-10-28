# SRAS-PRV-010 — High-risk processing has a privacy impact assessment

- Domain: `privacy`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/privacy.yaml`

## Description

Processing that is high risk by nature, scale, sensitivity, or new technology must have a privacy impact assessment before launch and after material change, with mitigations recorded. A high-risk launch without an assessment fails the requirement.

**Thai:** การประมวลผลที่มีความเสี่ยงสูงเนื่องจากลักษณะ ขนาด ความอ่อนไหว หรือเทคโนโลยีใหม่ ต้องมีการประเมินผลกระทบด้านความเป็นส่วนตัวก่อนเปิดใช้งานและหลังการเปลี่ยนแปลงที่มีนัยสำคัญ โดยบันทึกมาตรการบรรเทา การเปิดใช้งานที่มีความเสี่ยงสูงโดยไม่มีการประเมินถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

High-risk processing needs a documented decision before it affects real people.

**Thai:** การประมวลผลที่มีความเสี่ยงสูงต้องการการตัดสินใจที่บันทึกไว้ก่อนส่งผลกระทบต่อบุคคลจริง

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Privacy impact assessment with scope, risks, and mitigations
- **ticket** (max 365 days): Approval record for launch and material change

## Assessment

- Lite pass: High-risk processing has a current assessment and recorded decision.
- Lite partial: An assessment exists but is incomplete or not linked to launch approval.
- Full L2: Completed before launch for all high-risk processing.
- Full L3: Reviewed after material change and tracked to mitigation closure.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.34, A.8.25` (partial) — Privacy and secure development are covered; a separate assessment is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
