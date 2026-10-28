# SRAS-SCM-007 — Subcontractor and subprocessor chains are visible and controlled

- Domain: `supply-chain`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/supply-chain.yaml`

## Description

Each critical supplier must disclose the subcontractors and subprocessors that support the product, and those parties must meet the same security and privacy requirements. An undisclosed critical subcontractor fails the requirement.

**Thai:** ผู้ให้บริการที่สำคัญแต่ละรายต้องเปิดเผยผู้รับจ้างช่วงและผู้ประมวลผลช่วงที่สนับสนุนผลิตภัณฑ์ และคู่สัญญาเหล่านั้นต้องเป็นไปตามข้อกำหนดด้านความปลอดภัยและความเป็นส่วนตัวเดียวกัน ผู้รับจ้างช่วงที่สำคัญซึ่งไม่ถูกเปิดเผยถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Risk does not stop at the first supplier.

**Thai:** ความเสี่ยงไม่ได้หยุดอยู่ที่ผู้ให้บริการรายแรก

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Subcontractor and subprocessor register with roles and flow-down terms
- **contract** (max 365 days): Flow-down security and privacy terms

## Assessment

- Lite pass: Critical supply chains are disclosed and flow-down terms are in place.
- Lite partial: Some subcontractors are undisclosed or lack flow-down terms.
- Full L2: Covered for all critical suppliers.
- Full L3: Reviewed after supplier change and measured with disclosure completeness.

## References

- [ISO/IEC 27001:2022 5.21](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.21, A.5.22` (supports) — ICT supply chain and supplier monitoring.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.SC-06` (supports) — Supplier and subprocessor chain visibility.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
