# SRAS-INT-007 — API errors are safe, stable, and actionable

- Module: `SRAS-INT`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

An API error must return a stable code, a safe message, and a correlation identifier, and must not expose stack traces, internal hostnames, credentials, or another consumer's data. Documented error codes must match the published contract.

**Thai:** Error ของ API ต้องคืน code ที่คงที่ ข้อความที่ปลอดภัย และ correlation identifier และต้องไม่เปิดเผย stack trace hostname ภายใน ข้อมูลรับรอง หรือข้อมูลของผู้ใช้บริการรายอื่น code ของ error ที่จัดทำเอกสารต้องตรงกับ contract ที่เผยแพร่

## Rationale

Verbose errors leak system detail and leave consumers unable to handle failures deterministically.

**Thai:** error ที่ละเอียดเกินไปรั่วไหลรายละเอียดระบบ และทำให้ผู้ใช้บริการจัดการความล้มเหลวได้ไม่แน่นอน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Error code catalogue and safe error format
- **test_result** (max 180 days): Negative tests for error content and correlation identifiers

## Assessment

- Lite pass: Errors use stable codes and do not expose internal detail.
- Lite partial: Errors are safe but codes or documentation are inconsistent.
- Full L2: Error behaviour is documented, tested, and matches the contract.
- Full L3: Error rates and codes are reviewed for consumer impact.

## References

- [IETF RFC 9457 Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html) — `standard`
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-16.5` (supports) — Error handling.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
