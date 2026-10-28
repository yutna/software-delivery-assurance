# SRAS-PRV-007 — Cross-border transfers are identified and controlled

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

Each cross-border transfer must be recorded with destination, recipient, purpose, safeguard, and review date, and must use an approved transfer mechanism. An undisclosed transfer or an expired safeguard fails the requirement.

**Thai:** การส่งข้อมูลข้ามพรมแดนแต่ละรายการต้องถูกบันทึกพร้อมปลายทาง ผู้รับ วัตถุประสงค์ มาตรการคุ้มครอง และวันทบทวน และต้องใช้กลไกการส่งข้อมูลที่ได้รับอนุมัติ การส่งข้อมูลที่ไม่เปิดเผยหรือมาตรการคุ้มครองที่หมดอายุถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Data loses the protection of its origin jurisdiction when it crosses a border.

**Thai:** ข้อมูลสูญเสียการคุ้มครองของเขตอำนาจต้นทางเมื่อถูกส่งข้ามพรมแดน

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Cross-border transfer register with destination, recipient, safeguard, and review date
- **contract** (max 365 days): Approved transfer mechanism or contractual safeguard

## Assessment

- Lite pass: Every transfer is recorded and uses an approved safeguard.
- Lite partial: Some transfers are undocumented or use an expired safeguard.
- Full L2: Register maintained and reconciled with the data inventory.
- Full L3: Reviewed before new transfers and after legal or vendor change.

## References

- [Thailand Personal Data Protection Act](https://www.pdpc.or.th) — `regulation`
- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.14, A.5.34` (partial) — Transfer and PII controls are covered; transfer mechanisms are jurisdiction-specific.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.DS-03, GV.OC-03` (partial) — Data transfer protection and legal requirements are covered; transfer mechanisms are jurisdiction-specific.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `12.8` (related) — Third-party service provider management is related; cross-border transfer mechanisms are jurisdiction-specific.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
