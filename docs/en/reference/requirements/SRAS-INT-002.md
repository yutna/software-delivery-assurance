# SRAS-INT-002 — Every API request is authenticated with a managed credential

- Module: `SRAS-INT`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

Every API must require authentication, including internal service-to-service calls. Credentials must be unique per consumer, rotatable, scoped, and stored outside source code. An endpoint without authentication must be explicitly classified as public and approved.

**Thai:** API ทุกตัวต้องบังคับใช้การยืนยันตัวตน รวมถึงการเรียกระหว่าง service ภายใน ข้อมูลรับรองต้องไม่ซ้ำกันต่อผู้ใช้บริการ หมุนเวียนได้ มีขอบเขต และไม่ได้เก็บใน source code endpoint ที่ไม่ต้องยืนยันตัวตนต้องถูกจำแนกเป็น public และอนุมัติอย่างชัดเจน

## Rationale

A shared or embedded credential turns one leak into access for every consumer.

**Thai:** ข้อมูลรับรองที่ใช้ร่วมกันหรือฝังในโค้ดทำให้การรั่วไหลครั้งเดียวกลายเป็นการเข้าถึงของผู้ใช้บริการทุกราย

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Authentication policy and credential scope per consumer
- **log** (max 90 days): Authentication failure and credential rotation records

## Assessment

- Lite pass: Every non-public endpoint requires authentication.
- Lite partial: Authentication exists but credentials are shared or not rotatable.
- Full L2: Credentials are unique, scoped, rotatable, and stored securely.
- Full L3: Rotation and failure patterns are monitored and reviewed.

## References

- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — `standard`
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-6.3` (supports) — General authentication security.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
