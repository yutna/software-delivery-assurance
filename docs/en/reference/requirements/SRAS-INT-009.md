# SRAS-INT-009 — Partners are onboarded with due diligence and a test path

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

A partner integration must record due diligence, agreed data use, credentials issued to the partner, a sandbox or test path, support contacts, and the responsibilities of each side before production access is granted.

**Thai:** integration กับ partner ต้องบันทึก due diligence การใช้ข้อมูลที่ตกลง ข้อมูลรับรองที่ออกให้ partner sandbox หรือเส้นทางทดสอบ ช่องทางติดต่อสนับสนุน และความรับผิดชอบของแต่ละฝ่าย ก่อนอนุญาตให้เข้าถึง production

## Rationale

Production access granted before responsibilities are agreed leaves failures unowned.

**Thai:** การให้สิทธิ์ production ก่อนตกลงความรับผิดชอบทำให้ความล้มเหลวไม่มีผู้รับผิดชอบ

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Partner onboarding record with responsibilities and contacts
- **ticket** (max 365 days): Production access approval for the partner

## Assessment

- Lite pass: Onboarding, data use, and contacts are recorded before access.
- Lite partial: Access was granted but responsibilities or test evidence is incomplete.
- Full L2: Due diligence, responsibilities, and a test path are recorded.
- Full L3: Partner access and data use are reviewed periodically.

## References

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-4.1` (related) — Generic web service security is related; partner onboarding is not an ASVS requirement.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
