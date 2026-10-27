# SRAS-INT-002 — Every API request is authenticated with a managed credential

- Module: `SRAS-INT`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

Every API must require authentication, including internal service-to-service calls. Credentials must be unique per consumer, rotatable, scoped, and stored outside source code. An endpoint without authentication must be explicitly classified as public and approved.

**Thai:** API ทุกตัวต้องบังคับใช้การยืนยันตัวตน รวมถึงการเรียกระหว่าง service ภายใน ข้อมูลรับรองต้องไม่ซ้ำกันต่อผู้ใช้บริการ หมุนเวียนได้ มีขอบเขต และไม่ได้เก็บใน source code endpoint ที่ไม่ต้องยืนยันตัวตนต้องถูกจำแนกเป็น public และอนุมัติอย่างชัดเจน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Authentication policy and credential scope per consumer
- **log** (max 90 days): Authentication failure and credential rotation records

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
