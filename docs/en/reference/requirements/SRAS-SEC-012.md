# SRAS-SEC-012 — Independent security testing is performed and findings are closed

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

In-scope systems must undergo independent penetration testing or a comparable security assessment at a defined cadence, with scope, results, and remediation recorded. A test with unaddressed critical findings and no approved exception fails the requirement.

**Thai:** ระบบที่อยู่ในขอบเขตต้องได้รับการทดสอบเจาะระบบโดยอิสระหรือการประเมินความปลอดภัยที่เทียบเท่าตามรอบที่กำหนด โดยบันทึกขอบเขต ผลลัพธ์ และการแก้ไข การทดสอบที่มี critical findings ที่ยังไม่ได้รับการแก้ไขและไม่มีข้อยกเว้นที่ได้รับอนุมัติถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Independent testing challenges assumptions that the delivery team cannot see.

**Thai:** การทดสอบโดยอิสระท้าทายสมมติฐานที่ทีมส่งมอบมองไม่เห็น

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 365 days): Independent test report with scope, date, and methodology
- **ticket** (max 180 days): Remediation tracker for test findings with owners and status

## Assessment

- Lite pass: An independent test was completed for the current scope and critical findings are closed.
- Lite partial: A test was completed but critical remediation or scope coverage is incomplete.
- Full L2: Completed at the defined cadence for the current release.
- Full L3: Risk-based scope, retest evidence, and trend analysis across cycles.

## References

- [NIST CSF 2.0 ID.RA and PR.PS](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 8.29](https://www.iso.org/standard/27001) — `standard`
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-15.3` (partial) — Defensive coding supports testing; independent security testing is an SRAS addition.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.29, A.8.34` (partial) — Security testing and audit protection are covered; independence is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
