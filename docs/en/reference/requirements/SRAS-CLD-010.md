# SRAS-CLD-010 — Cloud availability and service limits are designed and tested

- Module: `SRAS-CLD`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

The product must record its dependence on cloud regions, zones, and service quotas, and must test that a zone or quota failure does not exceed the approved service objective. A dependency with no tested fallback is a single point of failure.

**Thai:** ผลิตภัณฑ์ต้องบันทึกการพึ่งพา region zone และ quota ของบริการ cloud และต้องทดสอบว่าความล้มเหลวของ zone หรือ quota ไม่เกิน service objective ที่อนุมัติ dependency ที่ไม่มี fallback ที่ทดสอบแล้วถือเป็น single point of failure

## Applicability

- Tiers: 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **diagram** (max 365 days): Region, zone, and quota dependency map
- **test_result** (max 365 days): Failover or quota exhaustion test result

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
