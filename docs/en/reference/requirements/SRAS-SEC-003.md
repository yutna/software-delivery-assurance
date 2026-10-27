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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Secret-store configuration and access policy
- **report** (max 90 days): Secret-scan result for the current release
- **ticket** (max 180 days): Secret rotation record with owner and date

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
