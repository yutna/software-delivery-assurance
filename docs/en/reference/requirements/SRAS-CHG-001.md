# SRAS-CHG-001 — All source and configuration changes are version controlled

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

Production source code, infrastructure definitions, and configuration must be stored in version control with attributable commits and protected main branches. A production change applied outside version control fails the requirement.

**Thai:** source code, นิยามโครงสร้างพื้นฐาน และ configuration ของ production ต้องถูกเก็บใน version control พร้อม commit ที่ระบุผู้ทำและ branch หลักที่ได้รับการป้องกัน การเปลี่ยนแปลง production ที่ทำนอก version control ถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Repository and branch protection configuration
- **log** (max 90 days): Commit history and change trace for the current release

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
