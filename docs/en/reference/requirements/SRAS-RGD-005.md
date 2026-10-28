# SRAS-RGD-005 — Data subject requests are handled within a defined timeline

- Module: `SRAS-RGD`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/regulated-data/module.yaml`

## Description

The product must provide a documented path to receive, verify, fulfil, and record access, correction, deletion, and objection requests within a defined timeline. A request that is not tracked cannot be shown to be fulfilled.

**Thai:** ผลิตภัณฑ์ต้องมีเส้นทางที่จัดทำเอกสารสำหรับรับ ตรวจสอบ ดำเนินการ และบันทึกคำขอเข้าถึง แก้ไข ลบ และคัดค้าน ภายในระยะเวลาที่กำหนด คำขอที่ไม่ถูกติดตามไม่สามารถแสดงได้ว่าดำเนินการแล้ว

## Rationale

An untracked request has no evidence that the person received an answer.

**Thai:** คำขอที่ไม่ถูกติดตามไม่มีหลักฐานว่าบุคคลนั้นได้รับการตอบกลับ

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Request handling procedure with roles and timeline
- **ticket** (max 90 days): Request log with outcome and response date

## Assessment

- Lite pass: A request path, owner, and timeline are defined and used.
- Lite partial: A path exists but the timeline or record is incomplete.
- Full L2: Requests are tracked, verified, and answered within the timeline.
- Full L3: Request trends and failures are reviewed.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [OECD Privacy Guidelines](https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0188) — `guidance`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
