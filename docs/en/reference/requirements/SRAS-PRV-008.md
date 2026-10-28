# SRAS-PRV-008 — Privacy breaches can be detected, assessed, and notified on time

- Domain: `privacy`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/privacy.yaml`

## Description

The product must have a documented privacy breach process with detection sources, an assessment step, notification owners, and a timeline, and must exercise it. A breach process that has never been tested or has no notification owner fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องมีกระบวนการจัดการการละเมิดข้อมูลส่วนบุคคลที่จัดทำเอกสาร พร้อมแหล่งตรวจจับ ขั้นตอนประเมิน owner ผู้แจ้ง และกำหนดเวลา และต้องมีการซ้อมกระบวนการ กระบวนการที่ไม่เคยถูกทดสอบหรือไม่มี owner สำหรับการแจ้งถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A late or unowned breach response turns a containable event into a reportable failure.

**Thai:** การตอบสนองต่อการละเมิดที่ล่าช้าหรือไม่มีผู้รับผิดชอบทำให้เหตุการณ์ที่ควบคุมได้กลายเป็นความล้มเหลวที่ต้องรายงาน

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Privacy breach response procedure with roles and notification timeline
- **report** (max 365 days): Tabletop or breach exercise record with findings
- **ticket** (max 180 days): Breach log with assessment and notification decisions

## Assessment

- Lite pass: The process is documented, owned, and exercised.
- Lite partial: The process exists but is untested or lacks a notification owner.
- Full L2: Documented and exercised within the last year.
- Full L3: Measured with detection time, assessment time, and notification readiness.

## References

- [Thailand Personal Data Protection Act](https://www.pdpc.or.th) — `regulation`
- [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.24, A.5.25, A.5.26` (supports) — Incident preparation, assessment, and response.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
