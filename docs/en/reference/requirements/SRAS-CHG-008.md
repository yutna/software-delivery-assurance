# SRAS-CHG-008 — Every release has versioned evidence and known limitations

- Domain: `change-release`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/change-release.yaml`

## Description

Each release must record its version, artifact identity, approvals, test results, and known limitations, and the deployed artifact must match the recorded identity. A release without traceable artifact or approval evidence fails the requirement.

**Thai:** การปล่อยแต่ละครั้งต้องบันทึกเวอร์ชัน identity ของ artifact การอนุมัติ ผลการทดสอบ และข้อจำกัดที่ทราบ และ artifact ที่ deploy ต้องตรงกับ identity ที่บันทึกไว้ การปล่อยที่ไม่มี artifact หรือหลักฐานการอนุมัติที่ตรวจสอบย้อนกลับได้ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Without release evidence, nobody can prove what is running or who approved it.

**Thai:** หากไม่มีหลักฐานการปล่อย ไม่มีใครพิสูจน์ได้ว่าอะไรกำลังทำงานหรือใครอนุมัติ

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Release record with version, artifact digest, approvals, tests, and known limitations
- **report** (max 90 days): Deployment verification showing running artifact matches the release record

## Assessment

- Lite pass: Each release is traceable to an artifact and an approval record.
- Lite partial: Release records exist but artifact identity or approval is incomplete.
- Full L2: Maintained for every production release.
- Full L3: Measured with artifact-match rate and release-evidence completeness.

## References

- [NIST SP 800-218 SSDF PS.3](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`
- [ISO/IEC 27001:2022 8.32](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `7.5, A.8.32` (partial) — Documented information and change records support release evidence.
- [MAP-WCAG22 — SRAS Core to WCAG 2.2 Level AA](../crosswalks/MAP-WCAG22.md): `5.3 Conformance Claims` (related) — Release evidence should state the accessibility target and known limitations.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
