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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Multi-factor authentication policy and enforcement configuration
- **test_result** (max 90 days): Authentication test for privileged and remote access paths

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
