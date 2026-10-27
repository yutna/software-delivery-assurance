# SRAS-SEC-006 — Access is granted, reviewed, and revoked through a controlled process

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

Access must be granted through an approved request, reviewed at a defined cadence, and revoked when a person changes role or leaves. An account that remains active after departure or role change fails the requirement.

**Thai:** การเข้าถึงต้องได้รับอนุมัติผ่านคำขอที่ได้รับอนุมัติ มีการทบทวนตามรอบที่กำหนด และเพิกถอนเมื่อผู้ใช้เปลี่ยนบทบาทหรือออกจากองค์กร บัญชีที่ยังใช้งานได้หลังออกจากองค์กรหรือเปลี่ยนบทบาทถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Access request and approval procedure
- **ticket** (max 180 days): Most recent access review with decisions and approver
- **report** (max 90 days): Leaver and role-change reconciliation for the current period

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
