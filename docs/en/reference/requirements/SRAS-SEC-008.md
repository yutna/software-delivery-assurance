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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): CI pipeline configuration showing required review and scan jobs
- **report** (max 90 days): Scan results and merge-blocking policy for the current release
- **ticket** (max 90 days): Exception record for any bypass with approval and expiry

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
