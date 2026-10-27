# SRAS-CHG-010 — Database changes are reversible or have a tested recovery plan

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

Schema and data migrations must be reviewed, tested against representative data, and have a reversible step or a tested recovery plan before production deployment. A migration without a tested recovery path fails the requirement.

**Thai:** การเปลี่ยนแปลง schema และข้อมูลต้องได้รับการ review ทดสอบกับข้อมูลตัวแทน และมีขั้นตอนย้อนกลับหรือแผนกู้คืนที่ผ่านการทดสอบก่อน deploy สู่ production การ migration ที่ไม่มีแนวทางกู้คืนที่ทดสอบแล้วถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Migration plan with reversibility or recovery steps
- **test_result** (max 180 days): Dry-run or recovery test result against representative data

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
