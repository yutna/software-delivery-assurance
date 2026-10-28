# SRAS-SEC-005 — Multi-factor authentication protects privileged and remote access

- Domain: `security`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/security.yaml`

## Description

Privileged accounts and all remote or administrative access must require multi-factor authentication. Single-factor authentication for these paths fails the requirement, even when the password is strong.

**Thai:** บัญชี privileged และการเข้าถึงระยะไกลหรือการเข้าถึงของผู้ดูแลทั้งหมดต้องใช้ multi-factor authentication การยืนยันตัวตนด้วยปัจจัยเดียวสำหรับช่องทางเหล่านี้ถือว่าไม่ผ่านข้อกำหนด แม้รหัสผ่านจะแข็งแรง

## Rationale

A stolen password is not enough to reach privileged functions when a second factor is enforced.

**Thai:** รหัสผ่านที่ถูกขโมยไม่เพียงพอต่อการเข้าถึงฟังก์ชัน privileged เมื่อมีการบังคับใช้ปัจจัยที่สอง

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Multi-factor authentication policy and enforcement configuration
- **test_result** (max 90 days): Authentication test for privileged and remote access paths

## Assessment

- Lite pass: Privileged and remote access paths require multi-factor authentication.
- Lite partial: Multi-factor authentication is enforced for some privileged or remote paths.
- Full L2: Enforced for every privileged and remote path in scope.
- Full L3: Measured with coverage and authentication-exception metrics.

## References

- [NIST CSF 2.0 PR.AA](https://www.nist.gov/cyberframework) — `standard`
- [OWASP ASVS V2 Authentication](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-6.3` (supports) — Multi-factor authentication requirements.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.5, A.8.2` (partial) — Secure authentication is required; MFA specificity is an SRAS addition.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `8.4` (supports) — Multi-factor authentication.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
