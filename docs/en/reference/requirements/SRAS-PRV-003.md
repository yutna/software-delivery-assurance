# SRAS-PRV-003 — A data-subject request process is defined and measured

- Domain: `privacy`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/privacy.yaml`

## Description

The product must provide a documented process to receive, verify, and respond to data-subject access, correction, deletion, and portability requests within the applicable timeline. A request log without an owner or response date is not sufficient.

**Thai:** ผลิตภัณฑ์ต้องมีกระบวนการที่จัดทำเอกสารสำหรับรับ ตรวจสอบ และตอบสนองคำขอเข้าถึง แก้ไข ลบ และพกพาข้อมูลของเจ้าของข้อมูลภายในระยะเวลาที่กำหนด log คำขอที่ไม่มี owner หรือวันที่ตอบสนองไม่ถือว่าเพียงพอ

## Rationale

A data-subject request that is not tracked cannot be answered or improved.

**Thai:** คำขอของเจ้าของข้อมูลที่ไม่ถูกติดตามไม่สามารถตอบสนองหรือปรับปรุงได้

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Data-subject request procedure with roles and timeline
- **log** (max 180 days): Request log with owner, received date, and response date
- **report** (max 180 days): Sample response and SLA performance report

## Assessment

- Lite pass: The process and a current request log exist.
- Lite partial: The process exists but requests are not consistently tracked.
- Full L2: Implemented for all in-scope request types.
- Full L3: Measured with response-time and completion metrics.

## References

- [Thailand Personal Data Protection Act](https://www.pdpc.or.th) — `regulation`
- [ISO/IEC 27701:2019 7.3](https://www.iso.org/standard/71670.html) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.34` (partial) — PII protection is required; request timelines are an SRAS addition.
- [MAP-WCAG22 — SRAS Core to WCAG 2.2 Level AA](../crosswalks/MAP-WCAG22.md): `3.3.1 Error Identification, 3.3.3 Error Suggestion` (related) — Request forms should identify and explain errors accessibly.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
