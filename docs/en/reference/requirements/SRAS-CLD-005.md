# SRAS-CLD-005 — Exit and data return are planned and tested

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

The product must define how a customer exits the service, including data export, deletion, key destruction, transition support, and the maximum period for each step. An exit plan that has never been tested is not complete.

**Thai:** ผลิตภัณฑ์ต้องกำหนดวิธีการที่ลูกค้าออกจากบริการ รวมถึงการส่งออกข้อมูล การลบ การทำลาย key การสนับสนุนการย้าย และระยะเวลาสูงสุดของแต่ละขั้นตอน แผนออกที่ยังไม่เคยทดสอบไม่ถือว่าเสร็จสมบูรณ์

## Rationale

Exit terms discovered during an exit are constraints, not options.

**Thai:** เงื่อนไขการออกที่เพิ่งทราบตอนออกจากบริการเป็นข้อจำกัด ไม่ใช่ทางเลือก

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Exit plan with export, deletion, and transition steps
- **test_result** (max 365 days): Exit or restoration test result

## Assessment

- Lite pass: Exit steps, owners, and periods are documented.
- Lite partial: An exit plan exists but has not been tested.
- Full L2: The exit plan is tested and its results are recorded.
- Full L3: The test covers data return, deletion, and key destruction.

## References

- [ISO/IEC 27018:2019](https://www.iso.org/standard/76559.html) — `standard`
- [ISO/IEC 27017:2015](https://www.iso.org/standard/43757.html) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
