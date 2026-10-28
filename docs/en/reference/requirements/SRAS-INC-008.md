# SRAS-INC-008 — Regulatory notification readiness is defined and reviewed

- Domain: `incident-continuity`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/incident-continuity.yaml`

## Description

The product must identify incident types that may require external notification, with decision owners, timelines, evidence requirements, and a qualified review of the obligation. An incident with no notification assessment or no named decision owner fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องระบุประเภทเหตุการณ์ที่อาจต้องแจ้งภายนอก พร้อม owner ผู้ตัดสินใจ กำหนดเวลา ข้อกำหนดด้านหลักฐาน และการทบทวนข้อผูกพันโดยผู้มีคุณสมบัติ เหตุการณ์ที่ไม่มีประเมินการแจ้งหรือไม่มี owner ผู้ตัดสินใจที่ระบุชื่อถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Notification deadlines are short, and an unowned decision becomes a missed deadline.

**Thai:** กำหนดเวลาการแจ้งนั้นสั้น และการตัดสินใจที่ไม่มีผู้รับผิดชอบจะกลายเป็นกำหนดเวลาที่พลาด

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Notification matrix with incident types, owners, timelines, and evidence requirements
- **ticket** (max 365 days): Qualified review record for the notification obligations

## Assessment

- Lite pass: Notification triggers, owners, and timelines are documented and reviewed.
- Lite partial: A matrix exists but some triggers, owners, or reviews are missing.
- Full L2: Reviewed by a qualified person for the current scope.
- Full L3: Exercised in incident scenarios and measured with decision time.

## References

- [ISO/IEC 27001:2022 5.24 and 5.26](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 RS.CO](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.5, A.5.31` (partial) — Authority contact and legal requirements are covered; notification readiness is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
