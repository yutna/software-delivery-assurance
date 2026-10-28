# SRAS-PRV-004 — Purpose limitation and lawful basis are recorded for each data use

- Domain: `privacy`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/privacy.yaml`

## Description

Each processing activity must record its purpose, lawful basis, data categories, and recipients, and must not use data for a new purpose without a recorded review. Processing without a recorded purpose or basis fails the requirement.

**Thai:** กิจกรรมการประมวลผลแต่ละรายการต้องบันทึกวัตถุประสงค์ ฐานทางกฎหมาย ประเภทข้อมูล และผู้รับข้อมูล และต้องไม่นำข้อมูลไปใช้ในวัตถุประสงค์ใหม่โดยไม่มีการทบทวนที่บันทึกไว้ การประมวลผลที่ไม่มีวัตถุประสงค์หรือฐานทางกฎหมายที่บันทึกไว้ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Data collected for one purpose cannot be repurposed without a new decision and, where required, a new notice.

**Thai:** ข้อมูลที่เก็บเพื่อวัตถุประสงค์หนึ่งไม่สามารถนำไปใช้ซ้ำได้โดยไม่มีการตัดสินใจใหม่และ การแจ้งใหม่เมื่อจำเป็น

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Record of processing activities with purpose, basis, data categories, and recipients
- **ticket** (max 365 days): Review record for new or changed processing purposes

## Assessment

- Lite pass: Every processing activity has a recorded purpose and lawful basis.
- Lite partial: Some activities lack a purpose, basis, or change review.
- Full L2: Maintained for all in-scope processing.
- Full L3: Reviewed after material change and reconciled with the data inventory.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.34, A.5.31` (partial) — PII and legal requirements are covered; lawful basis recording is an SRAS addition.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.OC-03` (partial) — Legal and regulatory requirements are covered; lawful-basis recording is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
