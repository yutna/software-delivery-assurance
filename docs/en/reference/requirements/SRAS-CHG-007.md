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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Rollback or roll-forward plan with decision criteria
- **test_result** (max 180 days): Exercise or dry-run result for the current release

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
