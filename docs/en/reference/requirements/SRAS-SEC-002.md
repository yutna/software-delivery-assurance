# SRAS-SEC-002 — Authorization enforces least privilege for every role

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

Every role must have documented permissions limited to its duties, and access must be denied by default. A role with unused administrative permissions fails this requirement.

**Thai:** ทุก role ต้องมีสิทธิ์ที่จัดทำเอกสารและจำกัดตามหน้าที่ และต้องปฏิเสธการเข้าถึงโดยค่าเริ่มต้น role ที่มีสิทธิ์ผู้ดูแลเกินความจำเป็นถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Role and permission matrix mapped to duties
- **configuration** (max 180 days): Authorization policy configuration
- **ticket** (max 180 days): Access review record with approver and date

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
