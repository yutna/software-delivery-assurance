# SRAS-OPS-003 — Service-level objectives are defined and reviewed for critical journeys

- Domain: `operations`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/operations.yaml`

## Description

Each critical journey must have service-level indicators, objectives, and an error budget, with a recorded review of performance against them. An SLO with no measured indicator or review fails the requirement.

**Thai:** critical journey แต่ละรายการต้องมี service-level indicators objectives และ error budget พร้อมบันทึกการทบทวนผลการทำงานเทียบกับเป้าหมาย SLO ที่ไม่มีตัวชี้วัดที่วัดได้หรือไม่มีการทบทวนถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Reliability targets without measurement become opinions.

**Thai:** เป้าหมายความน่าเชื่อถือที่ไม่มีการวัดผลกลายเป็นเพียงความคิดเห็น

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): SLO definitions mapped to critical journeys
- **report** (max 90 days): Latest SLO performance and error-budget review

## Assessment

- Lite pass: Critical journeys have SLOs and a current performance review.
- Lite partial: SLOs exist but some indicators or reviews are missing.
- Full L2: Defined and reviewed for the current release.
- Full L3: Error-budget policy applied to release and investment decisions.

## References

- [ISO/IEC 20000-1:2018](https://www.iso.org/standard/70636.html) — `standard`
- [NIST CSF 2.0 PR.IR](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `9.1, A.8.6` (partial) — Monitoring and capacity are covered; service objectives are an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
