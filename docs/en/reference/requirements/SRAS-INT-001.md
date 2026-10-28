# SRAS-INT-001 — APIs and integrations are inventoried with an owner

- Module: `SRAS-INT`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

Every externally exposed or partner-facing API must be recorded in an inventory with its purpose, consumers, data classification, owner, authentication method, and lifecycle stage. An API that is absent from the inventory is not covered by the assessment.

**Thai:** API ที่เปิดให้ภายนอกหรือให้ partner ทุกรายการต้องถูกบันทึกในทะเบียนพร้อมวัตถุประสงค์ ผู้ใช้บริการ การจำแนกข้อมูล owner วิธีการยืนยันตัวตน และขั้นตอน lifecycle API ที่ไม่อยู่ในทะเบียนไม่ถือว่าอยู่ในขอบเขตการประเมิน

## Rationale

An API that nobody owns cannot be secured, versioned, or retired.

**Thai:** API ที่ไม่มี owner ไม่สามารถถูกป้องกัน version หรือยกเลิกได้

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): API and integration inventory with owners and consumers

## Assessment

- Lite pass: Every external or partner API is inventoried with an owner.
- Lite partial: An inventory exists but ownership or consumers are incomplete.
- Full L2: Inventoried and reviewed for the current release.
- Full L3: Reconciled with gateway and production traffic.

## References

- [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x00-header/) — `guidance`
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-4.1` (related) — Generic web service security is related; an API inventory is not an ASVS requirement.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
