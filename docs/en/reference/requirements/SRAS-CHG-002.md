# SRAS-CHG-002 — Every change is peer reviewed before it reaches production

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

Each production change must have at least one qualified reviewer who is not the author, with review evidence and resolved findings. A change merged without review or with unresolved blocking findings fails the requirement.

**Thai:** การเปลี่ยนแปลง production แต่ละรายการต้องมีผู้ review ที่มีคุณสมบัติอย่างน้อยหนึ่งคนซึ่งไม่ใช่ผู้เขียน พร้อมหลักฐานการ review และ findings ที่ได้รับการแก้ไข การเปลี่ยนแปลงที่ merge โดยไม่มีการ review หรือยังมี blocking findings ที่ไม่ได้รับการแก้ไขถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **ticket** (max 90 days): Review approval records for production changes in the current release
- **configuration** (max 180 days): Branch protection and required-review configuration

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
