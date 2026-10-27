# SRAS-INC-004 — Incidents produce blameless postmortems with tracked actions

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

Material incidents must have a postmortem that records timeline, impact, root causes, contributing factors, and corrective actions with owners and due dates, and the actions must be tracked to closure. A postmortem without tracked actions fails the requirement.

**Thai:** เหตุการณ์ที่มีนัยสำคัญต้องมี postmortem ที่บันทึกลำดับเหตุการณ์ ผลกระทบ สาเหตุราก ปัจจัยที่เกี่ยวข้อง และ corrective actions พร้อม owner และกำหนดส่งมอบ และต้องติดตามการดำเนินการจนปิด postmortem ที่ไม่มีการติดตามการแก้ไขถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Postmortem with timeline, impact, causes, and actions
- **ticket** (max 180 days): Corrective-action tracker with owners and closure evidence

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
