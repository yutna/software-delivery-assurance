# SRAS-RGD-004 — Retention and deletion rules are defined and enforced

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

Each regulated dataset must have a retention period, a deletion or anonymisation method, and a scheduled review. Data must not be kept beyond its retention rule without a recorded justification.

**Thai:** ชุดข้อมูลที่มีข้อกำหนดกำกับแต่ละชุดต้องมีระยะเวลาจัดเก็บ วิธีการลบหรือทำให้ไม่สามารถระบุตัวตนได้ และการทบทวนตามกำหนด ต้องไม่เก็บข้อมูลเกินกว่ากฎการเก็บรักษาโดยไม่มีเหตุผลที่บันทึกไว้

## Rationale

Data kept without a rule becomes a liability with no owner.

**Thai:** ข้อมูลที่ถูกเก็บโดยไม่มีกฎกลายเป็นความเสี่ยงที่ไม่มี owner

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Retention schedule with deletion and anonymisation methods
- **test_result** (max 180 days): Deletion or anonymisation verification for a sample

## Assessment

- Lite pass: Each dataset has a retention rule and a deletion path.
- Lite partial: Retention rules exist but deletion is manual or unverified.
- Full L2: Retention and deletion are enforced and verified.
- Full L3: Exceptions are approved, recorded, and reviewed.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
