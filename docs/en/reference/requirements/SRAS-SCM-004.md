# SRAS-SCM-004 — Third parties are risk-assessed before use and reviewed on a cadence

- Domain: `supply-chain`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/supply-chain.yaml`

## Description

Each supplier that handles data, provides a critical service, or affects the product must have a documented risk assessment before use and a review at a defined cadence. A critical supplier with no current assessment fails the requirement.

**Thai:** ผู้ให้บริการแต่ละรายที่จัดการข้อมูล ให้บริการที่สำคัญ หรือส่งผลต่อผลิตภัณฑ์ ต้องมีการประเมินความเสี่ยงที่จัดทำเอกสารก่อนใช้งานและการทบทวนตามรอบที่กำหนด ผู้ให้บริการที่สำคัญซึ่งไม่มีการประเมินที่เป็นปัจจุบันถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Supplier risk becomes product risk when the supplier fails or changes.

**Thai:** ความเสี่ยงของผู้ให้บริการกลายเป็นความเสี่ยงของผลิตภัณฑ์เมื่อผู้ให้บริการล้มเหลวหรือเปลี่ยนแปลง

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Supplier register with risk rating, owner, and review date
- **report** (max 365 days): Current assessment for each critical supplier

## Assessment

- Lite pass: Critical suppliers have a current assessment and owner.
- Lite partial: Assessments exist but some critical suppliers or reviews are missing.
- Full L2: Applied to all critical suppliers for the current release.
- Full L3: Measured with assessment coverage and risk trend.

## References

- [ISO/IEC 27001:2022 5.19 and 5.22](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.19, A.5.22` (supports) — Supplier relationships and monitoring.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.SC-01, GV.SC-02` (supports) — Supply chain risk management program and requirements.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
