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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Test strategy and journey-to-test traceability matrix
- **test_result** (max 30 days): Latest regression result for critical journeys

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
