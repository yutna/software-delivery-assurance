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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 30 days): Vulnerability register with severity, owner, target date, and status
- **ticket** (max 30 days): Remediation or acceptance evidence for open critical and high findings

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
