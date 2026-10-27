# SRAS-INC-002 — Incident severity and escalation paths are defined and current

- Domain: `incident-continuity`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/incident-continuity.yaml`

## Description

The product must define incident severity levels, decision criteria, escalation triggers, and named contacts, and the on-call path must reach a decision-maker. An incident with no severity rule or unreachable escalation contact fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องกำหนดระดับความรุนแรงของเหตุการณ์ เกณฑ์การตัดสินใจ เงื่อนไขการส่งต่อ และผู้ติดต่อที่ระบุชื่อ และเส้นทาง on-call ต้องเข้าถึงผู้มีอำนาจตัดสินใจ เหตุการณ์ที่ไม่มีกฎระดับความรุนแรงหรือผู้ติดต่อส่งต่อที่ติดต่อไม่ได้ถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 90 days): Severity matrix and escalation path with named contacts and targets
- **ticket** (max 90 days): Latest escalation or paging test record

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
