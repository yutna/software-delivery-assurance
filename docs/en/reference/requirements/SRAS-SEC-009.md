# SRAS-SEC-009 — Vulnerabilities are prioritized and remediated within defined targets

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

Security findings from scans, tests, and reports must be tracked with severity, owner, and remediation target, and must be remediated or formally accepted within the target. An overdue critical finding without an approved exception fails the requirement.

**Thai:** findings ด้านความปลอดภัยจากการสแกน การทดสอบ และรายงาน ต้องถูกติดตามพร้อม severity owner และเป้าหมายการแก้ไข และต้องได้รับการแก้ไขหรือยอมรับอย่างเป็นทางการภายในเป้าหมาย finding ระดับ critical ที่เกินกำหนดโดยไม่มีข้อยกเว้นที่ได้รับอนุมัติถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A finding without an owner and deadline is a permanent, invisible risk.

**Thai:** finding ที่ไม่มี owner และกำหนดเวลาเป็นความเสี่ยงถาวรที่มองไม่เห็น

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 30 days): Vulnerability register with severity, owner, target date, and status
- **ticket** (max 30 days): Remediation or acceptance evidence for open critical and high findings

## Assessment

- Lite pass: All critical and high findings have an owner and a target date, and overdue items are escalated.
- Lite partial: Findings are tracked but some lack an owner, target, or decision.
- Full L2: Managed within defined targets for the current release.
- Full L3: Measured with time-to-remediate, recurrence, and exception trends.

## References

- [NIST CSF 2.0 ID.RA and PR.PS](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 8.8](https://www.iso.org/standard/27001) — `standard`
- [FIRST CVSS](https://www.first.org/cvss/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-15.2` (supports) — Security architecture and dependency management.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.8` (supports) — Technical vulnerability management.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `ID.RA-01, PR.PS-02` (supports) — Vulnerability identification and remediation.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `6.3, 11.3` (supports) — Vulnerability management and remediation.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
