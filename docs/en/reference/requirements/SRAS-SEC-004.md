# SRAS-SEC-004 — Sensitive data is encrypted in transit and at rest

- Domain: `security`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/security.yaml`

## Description

Sensitive data must be encrypted in transit and at rest using approved algorithms, and keys must have an owner and a rotation procedure. A production data store with unencrypted sensitive data fails this requirement.

**Thai:** ข้อมูลที่ละเอียดอ่อนต้องถูกเข้ารหัสระหว่างส่งและขณะจัดเก็บด้วยอัลกอริทึมที่ได้รับอนุมัติ และ key ต้องมี owner และขั้นตอนการ rotate data store ใน production ที่มีข้อมูลละเอียดอ่อนไม่เข้ารหัสถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Encryption limits the impact of intercepted traffic and lost storage.

**Thai:** การเข้ารหัสจำกัดผลกระทบจากการดักจับข้อมูลและ storage ที่สูญหาย

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): TLS and encryption-at-rest configuration
- **document** (max 365 days): Key ownership and rotation procedure
- **test_result** (max 180 days): Encryption verification for production data stores

## Assessment

- Lite pass: Sensitive data is encrypted in transit and at rest.
- Lite partial: One path or store is not yet covered.
- Full L2: Implemented for all in-scope data and verified.
- Full L3: Measured with coverage, key age, and rotation compliance metrics.

## References

- [NIST CSF 2.0 PR.DS](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 8.24](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-11.3, v5.0.0-12.2` (supports) — Encryption algorithms and HTTPS communication.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.24` (supports) — Use of cryptography.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.DS-01, PR.DS-02` (supports) — Data-at-rest and data-in-transit protection.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `3.5, 4.2` (supports) — Cryptography for stored and transmitted account data.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
