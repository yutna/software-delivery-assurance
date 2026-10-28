# SRAS-INT-005 — State-changing operations are idempotent under retry

- Module: `SRAS-INT`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

A state-changing API operation that a consumer may retry must accept an idempotency key or an equivalent deduplication mechanism and return the original result for a repeated request. A retry must not create a duplicate transaction, message, or record.

**Thai:** การดำเนินการผ่าน API ที่เปลี่ยนสถานะและผู้ใช้บริการอาจ retry ต้องรองรับ idempotency key หรือกลไกป้องกันข้อมูลซ้ำที่เทียบเท่า และคืนผลลัพธ์เดิมสำหรับ request ที่ซ้ำ การ retry ต้องไม่สร้าง transaction message หรือ record ซ้ำ

## Rationale

Network retries are normal, so a non-idempotent operation turns an uncertain response into duplicate business events.

**Thai:** การ retry ผ่านเครือข่ายเป็นเรื่องปกติ การดำเนินการที่ไม่ idempotent จึงทำให้ response ที่ไม่แน่นอนกลายเป็นเหตุการณ์ทางธุรกิจซ้ำ

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **test_result** (max 180 days): Duplicate-request and retry tests for state-changing operations
- **document** (max 365 days): Idempotency and deduplication design for each operation

## Assessment

- Lite pass: Retryable operations are idempotent and tested.
- Lite partial: Idempotency is implemented for some but not all retryable operations.
- Full L2: Every retryable state change has a tested deduplication mechanism.
- Full L3: Duplicate attempts are monitored and reconciled.

## References

- [IETF RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) — `standard`
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-2.2` (related) — Business logic security is related; idempotency is an API design concern.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
