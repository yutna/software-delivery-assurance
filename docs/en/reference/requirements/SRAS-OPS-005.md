# SRAS-OPS-005 — Backups are configured, encrypted, and monitored

- Domain: `operations`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/operations.yaml`

## Description

In-scope data and configuration must have scheduled backups with defined frequency, retention, encryption, and monitoring, and backup failures must alert an owner. A data store without a current successful backup fails the requirement.

**Thai:** ข้อมูลและ configuration ที่อยู่ในขอบเขตต้องมี backup ตามกำหนดการพร้อมความถี่ ระยะเวลาจัดเก็บ การเข้ารหัส และการเฝ้าระวังที่กำหนด และความล้มเหลวของ backup ต้องแจ้ง owner data store ที่ไม่มี backup ที่สำเร็จล่าสุดถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Backup schedule, retention, encryption, and monitoring configuration
- **report** (max 30 days): Latest backup success and coverage report

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
