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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Release record with version, artifact digest, approvals, tests, and known limitations
- **report** (max 90 days): Deployment verification showing running artifact matches the release record

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
