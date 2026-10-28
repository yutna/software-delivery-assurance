# SRAS-INT-004 — Rate limits and abuse controls protect shared capacity

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

Public and partner APIs must enforce documented rate limits, burst controls, and payload limits, and return a clear retry signal when a limit is exceeded. Repeated authentication failures and enumeration attempts must be throttled and recorded.

**Thai:** API สำหรับสาธารณะและ partner ต้องบังคับใช้ rate limit การควบคุม burst และขีดจำกัดขนาด payload ตามเอกสาร และส่งสัญญาณให้ลองใหม่ที่ชัดเจนเมื่อเกินขีดจำกัด การยืนยันตัวตนที่ล้มเหลวซ้ำและการพยายาม enumerate ต้องถูกจำกัดความเร็วและบันทึกไว้

## Rationale

One unthrottled consumer can exhaust capacity for every other consumer.

**Thai:** ผู้ใช้บริการรายเดียวที่ไม่ถูกจำกัดความเร็วสามารถใช้ capacity จนหมดสำหรับผู้ใช้บริการรายอื่นได้

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Rate limit, burst, and payload limit configuration
- **metric** (max 30 days): Throttling and rejection metrics for the review period

## Assessment

- Lite pass: Limits are documented and enforced with a retry signal.
- Lite partial: Limits exist but throttling or retry behaviour is undocumented.
- Full L2: Limits, throttling, and alerts are enforced per consumer class.
- Full L3: Limits are reviewed against traffic and abuse findings.

## References

- [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x00-header/) — `guidance`
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-4.1` (partial) — Generic web service security includes anti-automation controls; rate limits are an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
