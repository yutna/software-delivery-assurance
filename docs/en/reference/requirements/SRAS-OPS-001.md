# SRAS-OPS-001 — Production telemetry covers logs, metrics, and traces

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

Production systems must emit logs, metrics, and traces with correlation identifiers, defined retention, and coverage of critical journeys and dependencies. A critical component with no telemetry fails the requirement.

**Thai:** ระบบ production ต้องส่ง logs metrics และ traces พร้อม correlation identifier ระยะเวลาจัดเก็บที่กำหนด และครอบคลุม critical journeys และ dependencies องค์ประกอบสำคัญที่ไม่มี telemetry ถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Telemetry collection and retention configuration
- **report** (max 90 days): Coverage report for critical journeys and dependencies

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
