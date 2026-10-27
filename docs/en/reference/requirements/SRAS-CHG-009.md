# SRAS-CHG-009 — Configuration is versioned, reviewed, and free of manual drift

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

Application and infrastructure configuration must be versioned, reviewed, and applied through the same change process as code, with drift detected and corrected. An unreviewed manual production configuration change fails the requirement.

**Thai:** configuration ของ application และโครงสร้างพื้นฐานต้องถูกควบคุมเวอร์ชัน review และนำไปใช้ผ่านกระบวนการเปลี่ยนแปลงเดียวกับ code โดยตรวจจับและแก้ไขความคลาดเคลื่อน การแก้ไข configuration production ด้วยมือโดยไม่มีการ review ถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Versioned configuration and drift-detection configuration
- **report** (max 90 days): Latest drift report with remediation status

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
