# SRAS-PRV-006 — Privacy notice and consent records match actual processing

- Domain: `privacy`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/privacy.yaml`

## Description

The privacy notice must describe the current processing activities, and where consent is the basis, consent must be recorded with scope, time, and withdrawal state. A notice that omits an active processing purpose or a consent record that cannot be withdrawn fails the requirement.

**Thai:** ประกาศความเป็นส่วนตัวต้องอธิบายกิจกรรมการประมวลผลในปัจจุบัน และในกรณีที่ใช้ความยินยอมเป็นฐาน ความยินยอมต้องถูกบันทึกพร้อมขอบเขต เวลา และสถานะการถอน การประกาศที่ละเว้นวัตถุประสงค์ที่ยังใช้งานอยู่หรือบันทึกความยินยอมที่ไม่สามารถถอนได้ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A notice or consent record that diverges from the system is misleading.

**Thai:** ประกาศหรือบันทึกความยินยอมที่แตกต่างจากระบบจริงทำให้เข้าใจผิด

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Current privacy notice mapped to processing activities
- **report** (max 180 days): Consent record sample with scope, timestamp, and withdrawal state

## Assessment

- Lite pass: The notice matches current processing and consent can be withdrawn.
- Lite partial: The notice or consent records are incomplete for some activities.
- Full L2: Reconciled with the processing record for the current release.
- Full L3: Reviewed after material change and measured with notice-accuracy and withdrawal metrics.

## References

- [Thailand Personal Data Protection Act](https://www.pdpc.or.th) — `regulation`
- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.34` (partial) — PII protection is required; notice and consent matching are SRAS additions.
- [MAP-WCAG22 — SRAS Core to WCAG 2.2 Level AA](../crosswalks/MAP-WCAG22.md): `3.1.1 Language of Page, 3.1.5 Reading Level` (related) — A privacy notice should declare its language and be readable.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
