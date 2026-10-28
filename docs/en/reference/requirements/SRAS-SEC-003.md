# SRAS-SEC-003 — Secrets are stored in an approved secret store

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

Passwords, tokens, private keys, and connection strings must be stored in an approved secret store and must not appear in source code, images, logs, tickets, or build artifacts. A secret found in a repository fails this requirement.

**Thai:** รหัสผ่าน token private key และ connection string ต้องถูกเก็บใน secret store ที่ได้รับอนุมัติ และต้องไม่ปรากฏใน source code images logs tickets หรือ build artifacts การพบ secret ใน repository ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A secret in a repository or log is a credential leak, even if the repository is private.

**Thai:** secret ใน repository หรือ log คือการรั่วของ credential แม้ repository จะเป็น private

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Secret-store configuration and access policy
- **report** (max 90 days): Secret-scan result for the current release
- **ticket** (max 180 days): Secret rotation record with owner and date

## Assessment

- Lite pass: Secrets are in the approved store and no secret is found in the repository.
- Lite partial: The store is used but a rotation or scan gap remains.
- Full L2: Implemented for all in-scope secrets and verified by scanning.
- Full L3: Measured with rotation compliance and scan trend metrics.

## References

- [OWASP ASVS V6 Stored Cryptography](https://owasp.org/www-project-application-security-verification-standard/) — `standard`
- [NIST CSF 2.0 PR.AA](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-13.3` (supports) — Secret management.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.17` (supports) — Authentication information.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.AA-05, PR.PS-01` (partial) — Access permissions and configuration management support secret handling; a dedicated secret store is an SRAS addition.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `3.5, 8.3` (partial) — Key and credential protection is covered; a dedicated secret store is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
