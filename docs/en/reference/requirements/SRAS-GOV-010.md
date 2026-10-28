# SRAS-GOV-010 — Assurance exceptions are approved, time-bound, and owned

- Domain: `governance`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/governance.yaml`

## Description

An exception to an assurance requirement must record the requirement, justification, risk owner, compensating control, approval, and expiry date. An exception without an owner or expiry is a gap, not an approved exception.

**Thai:** ข้อยกเว้นต่อข้อกำหนด assurance ต้องบันทึกข้อกำหนด เหตุผล risk owner การควบคุมชดเชย การอนุมัติ และวันหมดอายุ ข้อยกเว้นที่ไม่มี owner หรือวันหมดอายุถือเป็นช่องว่าง ไม่ใช่ข้อยกเว้นที่ได้รับอนุมัติ

## Rationale

Permanent exceptions hide risk and defeat the gate they bypass.

**Thai:** ข้อยกเว้นแบบถาวรปกปิดความเสี่ยงและทำให้ gate ที่ถูกข้ามไร้ผล

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 90 days): Exception register with justification, compensating control, approver, and expiry
- **ticket** (max 90 days): Exception approval and closure record

## Assessment

- Lite pass: Every open exception has an owner, approver, compensating control, and expiry.
- Lite partial: Some exceptions lack an owner, approval, or expiry.
- Full L2: Register maintained and reconciled with assessment status.
- Full L3: Reviewed each cycle, expiring exceptions re-assessed, and repeat exceptions analysed for root cause.

## References

- [ISO/IEC 27001:2022 7.5.3](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 GV.RM](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `10.1, A.5.36` (partial) — Corrective action and compliance review support exceptions; time bounds are SRAS additions.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
