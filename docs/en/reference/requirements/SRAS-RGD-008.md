# SRAS-RGD-008 — Processors are assessed and audited

- Module: `SRAS-RGD`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/regulated-data/module.yaml`

## Description

A processor that handles regulated data must be assessed before onboarding and reviewed on a defined cadence, using security evidence, audit rights, and subprocessor disclosure. An assessment without current evidence is not complete.

**Thai:** processor ที่จัดการข้อมูลที่มีข้อกำหนดกำกับต้องถูกประเมินก่อน onboard และทบทวนตามรอบที่กำหนด โดยใช้หลักฐานด้านความปลอดภัย สิทธิในการตรวจสอบ และการเปิดเผย subprocessor การประเมินที่ไม่มีหลักฐานปัจจุบันไม่ถือว่าเสร็จสมบูรณ์

## Rationale

A contract without evidence of practice is an assumption, not assurance.

**Thai:** สัญญาที่ไม่มีหลักฐานการปฏิบัติเป็นเพียงสมมติฐาน ไม่ใช่ assurance

## Applicability

- Tiers: 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 365 days): Processor assessment with security evidence and gaps
- **attestation** (max 365 days): Current independent attestation or audit report

## Assessment

- Lite pass: Each processor has a current assessment.
- Lite partial: An assessment exists but evidence is stale or incomplete.
- Full L2: Assessments and independent evidence are current.
- Full L3: Findings are tracked to closure and re-assessed on change.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
