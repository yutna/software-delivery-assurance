# MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1

- Version: `0.1.0`
- Source standard: PCI DSS 4.0.1
- Source URL: [https://www.pcisecuritystandards.org/document_library/](https://www.pcisecuritystandards.org/document_library/)
- Status: `draft`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `mappings/pci-dss.yaml`

## Description

Informative crosswalk from SRAS Core requirements to PCI DSS 4.0.1 requirements for environments that handle payment account data. It is not an equivalence, certification, or compliance claim.

**Thai:** crosswalk เชิงข้อมูลจากข้อกำหนด SRAS Core ไปยังข้อกำหนด PCI DSS 4.0.1 สำหรับสภาพแวดล้อมที่จัดการข้อมูลบัญชีชำระเงิน ไม่ใช่การอ้างความเท่าเทียม การรับรอง หรือการปฏิบัติตาม

This crosswalk is informative. It is not an equivalence, a certification, or a compliance claim.

## Mappings

- `SRAS-CHG-001` — `6.5.1` (supports) — Change control for secure systems and software.
- `SRAS-CHG-002` — `6.3.2` (supports) — Review of custom code before release.
- `SRAS-CHG-005` — `6.5.3` (supports) — Separation of pre-production and production environments.
- `SRAS-CHG-006` — `6.5.1` (supports) — Change approval and documentation.
- `SRAS-OPS-001` — `10.2` (supports) — Audit logs capture access and activity.
- `SRAS-OPS-005` — `9.5.1` (partial) — Backup media protection is covered; backup encryption and monitoring are SRAS additions.
- `SRAS-PRV-001` — `3.2` (supports) — Storage of account data is kept to a minimum and inventoried.
- `SRAS-PRV-002` — `3.2` (partial) — Retention limits are covered; a full deletion rule is an SRAS addition.
- `SRAS-PRV-007` — `12.8` (related) — Third-party service provider management is related; cross-border transfer mechanisms are jurisdiction-specific.
- `SRAS-PRV-009` — `12.8` (supports) — Third-party service provider management.
- `SRAS-SCM-003` — `6.3.2` (partial) — Secure software development is covered; trusted sources and integrity verification are SRAS additions.
- `SRAS-SEC-001` — `8.3` (supports) — Strong authentication for users and administrators.
- `SRAS-SEC-002` — `7.2, 7.3` (supports) — Access restriction by business need-to-know.
- `SRAS-SEC-003` — `3.5, 8.3` (partial) — Key and credential protection is covered; a dedicated secret store is an SRAS addition.
- `SRAS-SEC-004` — `3.5, 4.2` (supports) — Cryptography for stored and transmitted account data.
- `SRAS-SEC-005` — `8.4` (supports) — Multi-factor authentication.
- `SRAS-SEC-006` — `7.2, 8.2` (supports) — Access provisioning and review.
- `SRAS-SEC-009` — `6.3, 11.3` (supports) — Vulnerability management and remediation.
- `SRAS-SEC-010` — `10.2, 10.4` (supports) — Audit logging and review.
- `SRAS-SEC-011` — `1.2, 1.3` (supports) — Network security controls and segmentation.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
