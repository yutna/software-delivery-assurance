# SRAS-SEC-001 — Authentication is required for every human and machine access path

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

Every user, service, and administrative access path to production systems must require authentication. Shared accounts are prohibited for administrative access.

**Thai:** ผู้ใช้ บริการ และช่องทางผู้ดูแลทุกรายการที่เข้าถึงระบบ production ต้องมี authentication และห้ามใช้บัญชีร่วมสำหรับผู้ดูแล

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Identity provider or access policy configuration
- **test_result** (max 90 days): Access-control test for user, service, and admin paths

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
