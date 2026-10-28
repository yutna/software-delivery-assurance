# SRAS-SEC-008 — Code review and automated security scans gate every change

- Domain: `security`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/security.yaml`

## Description

Every production change must pass peer review and automated secret, dependency, and static analysis scans before merge. A merge that bypasses a required scan or review fails the requirement.

**Thai:** การเปลี่ยนแปลงสู่ production ทุกรายการต้องผ่านการ review โดยเพื่อนร่วมงานและการสแกน secret dependency และ static analysis อัตโนมัติก่อน merge การ merge ที่ข้ามการสแกนหรือการ review ที่กำหนดถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A consistent automated gate catches defects that manual review alone misses.

**Thai:** gate อัตโนมัติที่สม่ำเสมอตรวจจับข้อบกพร่องที่การ review ด้วยมือเพียงอย่างเดียวอาจมองข้าม

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): CI pipeline configuration showing required review and scan jobs
- **report** (max 90 days): Scan results and merge-blocking policy for the current release
- **ticket** (max 90 days): Exception record for any bypass with approval and expiry

## Assessment

- Lite pass: Required reviews and scans run on every production change.
- Lite partial: Scans or reviews exist but are not consistently enforced.
- Full L2: Enforced for all production changes in the current release.
- Full L3: Measured with bypass rate, finding age, and remediation trends.

## References

- [NIST SP 800-218 SSDF PW.7 and PW.8](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`
- [ISO/IEC 27001:2022 8.28](https://www.iso.org/standard/27001) — `standard`
- [OWASP ASVS V1 and V10](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-15.3` (supports) — Defensive coding.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.28, A.8.29` (partial) — Secure coding and testing are required; change gating is an SRAS addition.
- [MAP-NISTSSDF — SRAS Core to NIST SP 800-218 (SSDF) 1.1](../crosswalks/MAP-NISTSSDF.md): `PW.7, PW.8` (supports) — Code review and automated security scans implement the review and test practices for every change.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
