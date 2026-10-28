# SRAS-RGD-003 — Processor agreements define data handling obligations

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

A processor that handles regulated data must have a written agreement covering scope, instructions, confidentiality, security, subprocessors, breach notification, return or deletion, and audit rights. Processing must not start before the agreement is in force.

**Thai:** processor ที่จัดการข้อมูลที่มีข้อกำหนดกำกับต้องมีข้อตกลงเป็นลายลักษณ์อักษรครอบคลุมขอบเขต คำสั่ง การรักษาความลับ ความปลอดภัย subprocessor การแจ้งเหตุละเมิด การคืนหรือลบข้อมูล และสิทธิในการตรวจสอบ ต้องไม่เริ่มประมวลผลก่อนข้อตกลงมีผล

## Rationale

A processor without agreed obligations leaves the product accountable for work it does not control.

**Thai:** processor ที่ไม่มีข้อตกลงหน้าที่ทำให้ผลิตภัณฑ์ต้องรับผิดชอบงานที่ตนเองไม่ได้ควบคุม

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **contract** (max 365 days): Processor agreement with security and breach terms
- **document** (max 365 days): Processor register with scope and subprocessors

## Assessment

- Lite pass: Every processor has a current written agreement.
- Lite partial: An agreement exists but required terms are incomplete.
- Full L2: Agreements cover scope, security, breach, and audit.
- Full L3: Agreements are reviewed when the service or subprocessors change.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
