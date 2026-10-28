# SRAS-CLD-004 — Subprocessors are disclosed and governed

- Module: `SRAS-CLD`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

The product must maintain a current list of subprocessors that can access regulated data, notify customers of material changes as agreed, and hold each subprocessor to the same obligations as the primary provider. An undisclosed subprocessor is not covered.

**Thai:** ผลิตภัณฑ์ต้องมีรายการ subprocessor ที่เป็นปัจจุบันซึ่งสามารถเข้าถึงข้อมูลที่มีข้อกำหนดกำกับ แจ้งลูกค้าเมื่อมีการเปลี่ยนแปลงที่มีนัยสำคัญตามที่ตกลง และผูกพัน subprocessor แต่ละรายด้วยหน้าที่เดียวกันกับผู้ให้บริการหลัก subprocessor ที่ไม่ถูกเปิดเผยไม่อยู่ในขอบเขต

## Rationale

A subprocessor added without notice changes the customer's risk without their knowledge.

**Thai:** subprocessor ที่เพิ่มโดยไม่แจ้งเปลี่ยนความเสี่ยงของลูกค้าโดยที่ลูกค้าไม่รู้

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Current subprocessor list with purpose and location
- **ticket** (max 365 days): Change notification record for a material subprocessor change

## Assessment

- Lite pass: Subprocessors are listed and changes are notified.
- Lite partial: A list exists but notification or flow-down terms are incomplete.
- Full L2: The list is current and flow-down obligations are enforced.
- Full L3: Subprocessor changes are reviewed against customer commitments.

## References

- [ISO/IEC 27018:2019](https://www.iso.org/standard/76559.html) — `standard`
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
