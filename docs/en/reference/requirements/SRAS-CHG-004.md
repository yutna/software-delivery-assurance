# SRAS-CHG-004 — Critical user journeys have repeatable automated test coverage

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

Critical user journeys must have automated or repeatable regression tests tied to acceptance criteria, and the release must record the latest result. A critical journey with no repeatable test or an unreviewed failure fails the requirement.

**Thai:** critical user journeys ต้องมีชุดทดสอบ regression แบบอัตโนมัติหรือทำซ้ำได้ซึ่งเชื่อมโยงกับเกณฑ์การยอมรับ และการปล่อยต้องบันทึกผลล่าสุด critical journey ที่ไม่มีชุดทดสอบที่ทำซ้ำได้หรือมีผลล้มเหลวที่ไม่ได้รับการทบทวนถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Manual checks at release time cannot prove that a journey still works after change.

**Thai:** การตรวจสอบด้วยมือตอนปล่อยไม่สามารถพิสูจน์ว่า journey ยังทำงานได้หลังการเปลี่ยนแปลง

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Test strategy and journey-to-test traceability matrix
- **test_result** (max 30 days): Latest regression result for critical journeys

## Assessment

- Lite pass: Critical journeys have repeatable tests and the latest result is recorded.
- Lite partial: Some critical journeys have no repeatable test or no current result.
- Full L2: Automated where practical and executed for every release.
- Full L3: Measured with journey coverage, flake rate, and escaped-defect trends.

## References

- [ISO/IEC 27001:2022 8.29](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-218 SSDF PW.8](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.29` (partial) — Security testing is required; journey coverage is an SRAS addition.
- [MAP-WCAG22 — SRAS Core to WCAG 2.2 Level AA](../crosswalks/MAP-WCAG22.md): `5.2 Conformance Requirements` (related) — Automated tests cannot confirm accessibility conformance; manual and assistive-technology testing are required.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
