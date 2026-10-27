# SRAS-CHG-006 — Production changes are risk-assessed and approved before deployment

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

Each production change must record its risk, impact, test evidence, and approver, and high-risk changes must receive approval from a named owner outside the implementing team. An emergency change without a retrospective record fails the requirement.

**Thai:** การเปลี่ยนแปลง production แต่ละรายการต้องบันทึกความเสี่ยง ผลกระทบ หลักฐานการทดสอบ และผู้อนุมัติ และการเปลี่ยนแปลงที่มีความเสี่ยงสูงต้องได้รับอนุมัติจาก owner ที่ระบุชื่อซึ่งอยู่นอกทีมที่ดำเนินการ การเปลี่ยนแปลงฉุกเฉินที่ไม่มีบันทึกย้อนหลังถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **ticket** (max 90 days): Change record with risk, impact, test evidence, and approver
- **report** (max 90 days): Emergency change retrospective for the current period

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
