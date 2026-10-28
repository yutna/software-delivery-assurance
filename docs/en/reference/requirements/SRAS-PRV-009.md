# SRAS-PRV-009 — Processors are assessed, contracted, and reviewed

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

Each processor and subprocessor that handles personal data must be listed with its role, data categories, contract status, assessment result, and review date. A processor without a current agreement or assessment fails the requirement.

**Thai:** ผู้ประมวลผลและผู้ประมวลผลช่วงที่จัดการข้อมูลส่วนบุคคลแต่ละรายต้องถูกระบุพร้อมบทบาท ประเภทข้อมูล สถานะสัญญา ผลการประเมิน และวันทบทวน ผู้ประมวลผลที่ไม่มีข้อตกลงหรือการประเมินที่เป็นปัจจุบันถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A processor extends the product's data boundary and its obligations.

**Thai:** ผู้ประมวลผลขยายขอบเขตข้อมูลและข้อผูกพันของผลิตภัณฑ์

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Processor and subprocessor register with contracts and assessment status
- **contract** (max 365 days): Current data processing agreement or equivalent terms
- **report** (max 365 days): Processor assessment record for the current period

## Assessment

- Lite pass: Every processor has a current agreement and an assessment.
- Lite partial: Some processors lack an agreement, assessment, or review date.
- Full L2: Register maintained and reconciled with the data inventory.
- Full L3: Assessed on a defined cadence with remediation and termination evidence.

## References

- [Thailand Personal Data Protection Act](https://www.pdpc.or.th) — `regulation`
- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.19, A.5.20, A.5.22` (supports) — Supplier relationships, agreements, and monitoring.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.SC-05, GV.SC-07` (supports) — Supplier requirements and supplier risk monitoring.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `12.8` (supports) — Third-party service provider management.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
