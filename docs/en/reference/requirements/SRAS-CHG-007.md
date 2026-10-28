# SRAS-CHG-007 — Critical changes have a tested rollback or roll-forward plan

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

Every critical production change must define rollback or roll-forward criteria and steps, and the plan must be exercised before or during release. A critical change without a tested recovery path fails the requirement.

**Thai:** การเปลี่ยนแปลง production ที่สำคัญทุกรายการต้องกำหนดเกณฑ์และขั้นตอน rollback หรือ roll-forward และต้องมีการทดสอบแผนก่อนหรือระหว่างการปล่อย การเปลี่ยนแปลงที่สำคัญโดยไม่มีแนวทางกู้คืนที่ทดสอบแล้วถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A release without a recovery path turns a failed change into an extended outage.

**Thai:** การปล่อยที่ไม่มีแนวทางกู้คืนทำให้การเปลี่ยนแปลงที่ล้มเหลวกลายเป็น outage ที่ยาวนาน

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Rollback or roll-forward plan with decision criteria
- **test_result** (max 180 days): Exercise or dry-run result for the current release

## Assessment

- Lite pass: Critical changes have a tested recovery plan.
- Lite partial: Plans exist but some critical changes are untested or lack criteria.
- Full L2: Tested for all critical changes in the current release.
- Full L3: Measured with rollback success and time-to-restore trends.

## References

- [ISO/IEC 27001:2022 8.32](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 PR.PS](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.32` (partial) — Change management is required; tested rollback is an SRAS addition.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.PS-01` (partial) — Configuration management supports rollback; a tested rollback plan is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
