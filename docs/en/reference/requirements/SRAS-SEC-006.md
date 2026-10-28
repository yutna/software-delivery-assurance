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

## Rationale

Unreviewed access accumulates and outlives the reason it was granted.

**Thai:** สิทธิ์ที่ไม่ได้ทบทวนจะสะสมและคงอยู่เกินกว่าเหตุผลที่ให้สิทธิ์นั้น

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Access request and approval procedure
- **ticket** (max 180 days): Most recent access review with decisions and approver
- **report** (max 90 days): Leaver and role-change reconciliation for the current period

## Assessment

- Lite pass: Access requests, reviews, and revocations are recorded and current.
- Lite partial: The process exists but reviews or revocations are incomplete.
- Full L2: Applied to all in-scope systems for the current period.
- Full L3: Measured with review completion, orphan-account counts, and time-to-revoke.

## References

- [ISO/IEC 27001:2022 8.2 and 8.3](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 PR.AA](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-8.2` (supports) — General authorization design.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.18, A.8.2` (supports) — Access provisioning, review, and privileged access.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.AA-04` (supports) — Access permissions are managed, reviewed, and revoked.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `7.2, 8.2` (supports) — Access provisioning and review.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
