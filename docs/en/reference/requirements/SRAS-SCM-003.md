# SRAS-SCM-003 — Dependencies come from trusted sources and are integrity verified

- Domain: `supply-chain`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/supply-chain.yaml`

## Description

Dependencies and build artifacts must be obtained from approved sources and verified with signatures or cryptographic digests before use. An unverified dependency or an artifact from an unapproved source fails the requirement.

**Thai:** dependency และ build artifact ต้องได้มาจากแหล่งที่ได้รับอนุมัติและตรวจสอบด้วยลายเซ็นหรือ cryptographic digest ก่อนใช้งาน dependency ที่ไม่ได้ตรวจสอบหรือ artifact จากแหล่งที่ไม่อนุมัติถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Approved source and dependency verification configuration
- **report** (max 90 days): Signature or digest verification result for the current release

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
