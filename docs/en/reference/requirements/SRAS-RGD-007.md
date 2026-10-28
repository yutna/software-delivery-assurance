# SRAS-RGD-007 — Breach detection and notification are ready

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

The product must define how a regulated-data breach is detected, assessed, contained, and notified to the responsible internal and external parties within a defined timeline. A contact and decision record must exist before an incident.

**Thai:** ผลิตภัณฑ์ต้องกำหนดวิธีตรวจจับ ประเมิน ควบคุม และแจ้งเหตุละเมิดข้อมูลที่มีข้อกำหนดกำกับต่อฝ่ายภายในและภายนอกที่รับผิดชอบ ภายในระยะเวลาที่กำหนด ต้องมีช่องทางติดต่อและบันทึกการตัดสินใจก่อนเกิดเหตุการณ์

## Rationale

Notification decisions made for the first time during an incident are late and inconsistent.

**Thai:** การตัดสินใจแจ้งเหตุที่เพิ่งทำครั้งแรกระหว่างเกิดเหตุจะล่าช้าและไม่สม่ำเสมอ

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Breach response procedure with notification timeline
- **ticket** (max 365 days): Breach drill or tabletop exercise record

## Assessment

- Lite pass: Detection, assessment, and notification paths are defined.
- Lite partial: A procedure exists but contacts or timelines are incomplete.
- Full L2: The procedure is exercised and decisions are recorded.
- Full L3: Exercises are reviewed and corrective actions are tracked.

## References

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`
- [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
