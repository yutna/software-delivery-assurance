# SRAS-SCM-009 — Supplier agreements include security, privacy, and exit terms

- Domain: `supply-chain`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/supply-chain.yaml`

## Description

Each critical supplier agreement must include security requirements, breach notification, data return or deletion, audit or assurance rights, and termination support. An agreement missing a required term fails the requirement.

**Thai:** สัญญาผู้ให้บริการที่สำคัญแต่ละฉบับต้องรวมข้อกำหนดด้านความปลอดภัย การแจ้งเหตุละเมิด การคืนหรือลบข้อมูล สิทธิในการตรวจสอบหรือรับการรับรอง และการสนับสนุนเมื่อสิ้นสุดสัญญา สัญญาที่ขาดข้อกำหนดที่จำเป็นถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A control that is not in the agreement is difficult to enforce after an incident.

**Thai:** การควบคุมที่ไม่อยู่ในสัญญาเป็นเรื่องยากที่จะบังคับใช้หลังเกิดเหตุการณ์

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **contract** (max 365 days): Current supplier agreement with security, privacy, and exit terms
- **document** (max 365 days): Contract review checklist and exceptions

## Assessment

- Lite pass: Critical supplier agreements include the required security and exit terms.
- Lite partial: Some agreements are missing a required term or review.
- Full L2: Covered for all critical suppliers.
- Full L3: Measured with clause coverage and renewal review timeliness.

## References

- [ISO/IEC 27001:2022 5.20](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.20, A.5.31` (supports) — Supplier agreements and legal requirements.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
