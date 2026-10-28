# SRAS-CHG-002 — Every change is peer reviewed before it reaches production

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

Each production change must have at least one qualified reviewer who is not the author, with review evidence and resolved findings. A change merged without review or with unresolved blocking findings fails the requirement.

**Thai:** การเปลี่ยนแปลง production แต่ละรายการต้องมีผู้ review ที่มีคุณสมบัติอย่างน้อยหนึ่งคนซึ่งไม่ใช่ผู้เขียน พร้อมหลักฐานการ review และ findings ที่ได้รับการแก้ไข การเปลี่ยนแปลงที่ merge โดยไม่มีการ review หรือยังมี blocking findings ที่ไม่ได้รับการแก้ไขถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Review catches defects and unsafe assumptions before they reach users.

**Thai:** การ review ตรวจจับข้อบกพร่องและสมมติฐานที่ไม่ปลอดภัยก่อนถึงผู้ใช้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **ticket** (max 90 days): Review approval records for production changes in the current release
- **configuration** (max 180 days): Branch protection and required-review configuration

## Assessment

- Lite pass: Every production change has an independent reviewer and resolved findings.
- Lite partial: Review exists but some changes bypass it or leave blocking findings open.
- Full L2: Required for all production changes.
- Full L3: Measured with review coverage, review time, and escaped-defect trends.

## References

- [NIST SP 800-218 SSDF PW.7](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`
- [ISO/IEC 27001:2022 8.32](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.32` (partial) — Change management is required; peer review is an SRAS addition.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.PS-06` (partial) — Secure software development practices support review; peer review is an SRAS addition.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `6.3.2` (supports) — Review of custom code before release.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
