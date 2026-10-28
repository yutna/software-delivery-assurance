# SRAS-OPS-008 — On-call and escalation arrangements are defined and current

- Domain: `operations`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/operations.yaml`

## Description

Critical services must have a current on-call schedule, escalation path, contact method, and acknowledgement target. An unstaffed on-call rotation or a stale escalation list fails the requirement.

**Thai:** บริการที่สำคัญต้องมีตาราง on-call ที่เป็นปัจจุบัน เส้นทางการส่งต่อ วิธีติดต่อ และเป้าหมายการตอบรับ การหมุนเวียน on-call ที่ไม่มีผู้รับผิดชอบหรือรายชื่อส่งต่อที่ล้าสมัยถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Detection without a reachable responder does not restore service.

**Thai:** การตรวจจับที่ไม่มีการติดต่อผู้ตอบสนองได้ไม่สามารถกู้คืนบริการได้

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 30 days): On-call schedule and escalation matrix with acknowledgement targets
- **ticket** (max 90 days): Latest escalation or paging test record

## Assessment

- Lite pass: Critical services have current on-call and escalation contacts.
- Lite partial: Arrangements exist but schedules or contacts are stale.
- Full L2: Current for all critical services.
- Full L3: Measured with acknowledgement time and escalation-path success.

## References

- [ISO/IEC 20000-1:2018](https://www.iso.org/standard/70636.html) — `standard`
- [NIST CSF 2.0 PR.IR](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.24, A.5.29` (partial) — Incident and continuity controls support escalation; on-call rosters are SRAS additions.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
