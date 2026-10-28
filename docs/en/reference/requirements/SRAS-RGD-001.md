# SRAS-RGD-001 — Regulated data is inventoried and classified

- Module: `SRAS-RGD`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/regulated-data/module.yaml`

## Description

Every dataset that contains personal, financial, or otherwise regulated data must be recorded in an inventory with its purpose, categories, source, owner, storage location, retention rule, and classification. A dataset that is absent from the inventory is not covered by the assessment.

**Thai:** ชุดข้อมูลทุกชุดที่มีข้อมูลส่วนบุคคล ข้อมูลทางการเงิน หรือข้อมูลที่มีข้อกำหนดกำกับอื่น ต้องถูกบันทึกในทะเบียนพร้อมวัตถุประสงค์ ประเภท แหล่งที่มา owner สถานที่จัดเก็บ กฎการเก็บรักษา และการจำแนก ชุดข้อมูลที่ไม่อยู่ในทะเบียนไม่ถือว่าอยู่ในขอบเขตการประเมิน

## Rationale

Data that is not inventoried cannot be classified, protected, or deleted.

**Thai:** ข้อมูลที่ไม่อยู่ในทะเบียนไม่สามารถถูกจำแนก ป้องกัน หรือลบได้

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Regulated data inventory with classification and owners
- **diagram** (max 365 days): Data flow diagram from source to storage and recipient

## Assessment

- Lite pass: Every regulated dataset is inventoried, classified, and owned.
- Lite partial: An inventory exists but classification or ownership is incomplete.
- Full L2: Inventory and data flows are current for the release.
- Full L3: Inventory is reconciled with storage and production usage.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
