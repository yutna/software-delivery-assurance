# SRAS-PRV-002 — Retention and deletion rules are implemented and evidenced

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

Personal data must have a defined retention period and an implemented deletion or anonymization process; deletion must be evidenced. A retention schedule without execution evidence is not sufficient.

**Thai:** ข้อมูลส่วนบุคคลต้องมีระยะเวลาจัดเก็บที่กำหนดและกระบวนการลบหรือทำให้ไม่สามารถระบุตัวตนได้ที่นำไปใช้จริง โดยต้องมีหลักฐานการลบ ตารางการจัดเก็บที่ไม่มีการดำเนินการไม่ถือว่าเพียงพอ

## Rationale

Retaining data beyond its purpose increases privacy and legal risk.

**Thai:** การเก็บข้อมูลเกินวัตถุประสงค์เพิ่มความเสี่ยงด้าน privacy และกฎหมาย

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Approved retention schedule mapped to data types
- **log** (max 180 days): Deletion or anonymization job evidence for the current period
- **report** (max 180 days): Exception report for data past its retention period

## Assessment

- Lite pass: Retention periods are defined and deletion is evidenced.
- Lite partial: The schedule exists but deletion evidence is incomplete.
- Full L2: Implemented for all in-scope data types.
- Full L3: Measured with deletion completion and overdue-retention metrics.

## References

- [Thailand Personal Data Protection Act](https://www.pdpc.or.th) — `regulation`
- [ISO/IEC 27701:2019 7.4](https://www.iso.org/standard/71670.html) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.33, A.8.10` (supports) — Records protection and information deletion.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `3.2` (partial) — Retention limits are covered; a full deletion rule is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
