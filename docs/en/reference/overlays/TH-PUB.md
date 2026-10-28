# TH-PUB — Thailand public sector overlay

- Type: `industry`
- Jurisdiction: `TH`
- Industry: `public-sector`
- Version: `0.4.0`
- Extends: `>=0.3.0 <2.0.0`
- Requires: SRAS-INT, SRAS-RGD, SRAS-CLD
- Review status: `draft`
- Translation status: `partial`
- Source: `overlays/industries/public-sector/overlay.yaml`

## Description

Assurance deltas for government agencies, state enterprises, and vendors delivering digital public services in Thailand.

**Thai:** ส่วนเพิ่ม assurance สำหรับหน่วยงานของรัฐ รัฐวิสาหกิจ และผู้ขายที่ให้บริการภาครัฐดิจิทัลในประเทศไทย

## Adds

### TH-PUB-001 — Procurement and contract evidence is retained for each service

Each public service links to its procurement record, contract, acceptance evidence, change orders, and vendor performance record. The set is retained for the period set by policy and is available to an authorised auditor.

**Thai:** บริการภาครัฐแต่ละรายการต้องเชื่อมโยงกับบันทึกการจัดซื้อจัดจ้าง สัญญา หลักฐานการส่งมอบ ใบสั่งเปลี่ยนแปลง และบันทึกผลการดำเนินงานของผู้ขาย ชุดหลักฐานต้องเก็บรักษาตามระยะเวลาที่นโยบายกำหนดและพร้อมให้ผู้ตรวจสอบที่มีอำนาจเข้าถึง

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Procurement, contract, acceptance, and change-order evidence set
- **contract** (max 365 days): Current contract with security, data, and exit terms
- **report** (max 365 days): Vendor performance review record

### TH-PUB-002 — Records retention follows an approved schedule

A records inventory covers service records, case records, audit records, and public communications. A retention schedule is approved by the owning agency, disposal is evidenced, and archival formats remain readable.

**Thai:** ทะเบียนบันทึกต้องครอบคลุมบันทึกบริการ บันทึกกรณี บันทึกการตรวจสอบ และการสื่อสารสาธารณะ ตารางการเก็บรักษาต้องได้รับอนุมัติจากหน่วยงานเจ้าของ การทำลายต้องมีหลักฐาน และรูปแบบการเก็บถาวรต้องยังอ่านได้

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Records inventory and agency-approved retention schedule
- **log** (max 180 days): Disposal evidence for records at the end of retention

### TH-PUB-003 — Public-facing services meet the agreed accessibility target

Critical public journeys meet the agreed accessibility target for the named WCAG version. Automated and manual checks cover information, forms, payments, authentication, and complaint paths, and findings are remediated on a tracked plan.

**Thai:** เส้นทางบริการสาธารณะที่สำคัญต้องเป็นไปตามเป้าหมาย accessibility ที่ตกลงสำหรับเวอร์ชัน WCAG ที่ระบุ การตรวจสอบอัตโนมัติและด้วยมนุษย์ครอบคลุมข้อมูล แบบฟอร์ม การชำระเงิน การยืนยันตัวตน และช่องทางร้องเรียน และข้อบกพร่องต้องได้รับการแก้ไขตามแผนที่ติดตามได้

- Criticality: `gate`
- Status: `active`

Evidence:

- **test_result** (max 180 days): Automated and manual accessibility results for critical public journeys
- **report** (max 365 days): Accessibility remediation plan with owners and dates

### TH-PUB-004 — Thai-language service content is reviewed by a native speaker

Thai content for critical public journeys is reviewed by a native Thai speaker before publication. A glossary keeps terms consistent, the review is recorded with name and date, and English content carries the same meaning.

**Thai:** เนื้อหาภาษาไทยสำหรับเส้นทางบริการสาธารณะที่สำคัญต้องได้รับการตรวจทานโดยเจ้าของภาษาก่อนเผยแพร่ มีอภิธานศัพท์เพื่อความสม่ำเสมอของคำ บันทึกการตรวจทานพร้อมชื่อและวันที่ และเนื้อหาภาษาอังกฤษต้องมีความหมายเดียวกัน

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Thai review record with reviewer name, date, and scope
- **document** (max 365 days): Glossary and content style guide

### TH-PUB-005 — Open data is published with quality, licence, and privacy controls

Open datasets have a named owner, a documented purpose, quality checks, a licence, and a personal-data review before publication. Updates follow a stated cadence, and a withdrawal path exists for errors or sensitive fields.

**Thai:** ชุดข้อมูลเปิดต้องมีเจ้าของที่ระบุชื่อ วัตถุประสงค์ที่จัดทำเป็นเอกสาร การตรวจสอบคุณภาพ สิทธิ์การใช้ และการทบทวนข้อมูลส่วนบุคคลก่อนเผยแพร่ การอัปเดตเป็นไปตามรอบที่กำหนด และมีเส้นทางถอนข้อมูลเมื่อพบข้อผิดพลาดหรือฟิลด์ที่ละเอียดอ่อน

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Dataset inventory with owner, purpose, licence, and privacy review
- **test_result** (max 180 days): Data quality and personal-data scan result for a published dataset

### TH-PUB-006 — Hosting location and data residency are documented and approved

The hosting location for each data category is documented, approved by the owning agency, and monitored for change. Cross-border access or transfer is identified with its mechanism and approval before it is used.

**Thai:** สถานที่โฮสต์ของข้อมูลแต่ละประเภทต้องจัดทำเอกสาร ได้รับอนุมัติจากหน่วยงานเจ้าของ และติดตามการเปลี่ยนแปลง การเข้าถึงหรือการโอนข้ามพรมแดนต้องระบุกลไกและการอนุมัติก่อนใช้งาน

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Data residency inventory with hosting location and approval
- **configuration** (max 180 days): Hosting region and access-control configuration evidence

### TH-PUB-007 — Personnel screening matches the role's access and sensitivity

Roles with access to citizen data, production systems, or high-value decisions have defined screening requirements. Screening is completed before access, re-run on a cadence, recorded, and applied to contractors and vendor staff.

**Thai:** บทบาทที่เข้าถึงข้อมูลประชาชน ระบบ production หรือการตัดสินใจที่มีมูลค่าสูงต้องมีข้อกำหนดการตรวจสอบที่ชัดเจน ต้องตรวจสอบก่อนให้สิทธิ์ ตรวจซ้ำตามรอบ บันทึกไว้ และใช้กับผู้รับเหมาและพนักงานของผู้ขาย

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Role screening matrix and screening record
- **ticket** (max 180 days): Screening completion before access grant for a sample of roles

### TH-PUB-008 — Essential public service continuity is tested at least annually

Essential public services are listed with their maximum tolerable downtime and recovery objectives. Alternate arrangements are documented, an exercise is completed at least annually, and citizen communication is included in the exercise.

**Thai:** บริการสาธารณะที่จำเป็นต้องระบุรายการพร้อม maximum tolerable downtime และวัตถุประสงค์การกู้คืน จัดทำแนวทางสำรอง ทดสอบอย่างน้อยปีละครั้ง และรวมการสื่อสารกับประชาชนไว้ในการทดสอบ

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Essential service list, tolerances, recovery objectives, and alternate arrangements
- **test_result** (max 365 days): Annual continuity exercise result including citizen communication

### TH-PUB-009 — Administrative actions are auditable and attributable

Administrative and privileged actions on public services record the actor, time, object, and outcome. Logs are protected from change, retained, and reviewed for anomalies, and a citizen-requested action can be reconstructed.

**Thai:** การดำเนินการทางปกครองและสิทธิ์ระดับสูงบนบริการสาธารณะต้องบันทึกผู้ดำเนินการ เวลา วัตถุ และผลลัพธ์ บันทึกต้องได้รับการปกป้องจากการเปลี่ยนแปลง เก็บรักษา ตรวจหาความผิดปกติ และสามารถสร้างการดำเนินการที่ประชาชนร้องขอขึ้นใหม่ได้

- Criticality: `high`
- Status: `active`

Evidence:

- **log** (max 90 days): Administrative action log with actor, time, object, and outcome
- **configuration** (max 180 days): Log integrity and retention configuration

### TH-PUB-010 — Cross-agency and vendor changes use a shared change record

Changes that affect another agency or a vendor use one shared change record with impact, approvals from each party, a rollback plan, and a communication path. A change freeze applies to critical public periods.

**Thai:** การเปลี่ยนแปลงที่กระทบหน่วยงานอื่นหรือผู้ขายต้องใช้บันทึกการเปลี่ยนแปลงร่วมฉบับเดียว ซึ่งระบุผลกระทบ การอนุมัติจากแต่ละฝ่าย แผน rollback และเส้นทางสื่อสาร และมี change freeze สำหรับช่วงเวลาสาธารณะที่สำคัญ

- Criticality: `high`
- Status: `active`

Evidence:

- **ticket** (max 180 days): Shared change record with multi-party approval and rollback
- **test_result** (max 180 days): Cross-agency integration test result for the change

### TH-PUB-011 — Citizen-facing incident communication has an approved template and owner

Citizen-facing incident communication has an approved template, a named owner, Thai and English versions, and accessible channels. The path is exercised within the last 12 months and covers service status, impact, workaround, and next update.

**Thai:** การสื่อสารเหตุการณ์ต่อประชาชนต้องมีแม่แบบที่อนุมัติแล้ว เจ้าของที่ระบุชื่อ ฉบับภาษาไทยและอังกฤษ และช่องทางที่เข้าถึงได้ ต้องมีการฝึกซ้อมภายใน 12 เดือนที่ผ่านมา และครอบคลุมสถานะบริการ ผลกระทบ แนวทางชั่วคราว และการอัปเดตครั้งถัดไป

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Approved citizen communication template and owner record
- **test_result** (max 365 days): Communication exercise result within the last 12 months

### TH-PUB-012 — A privacy impact assessment is approved before public launch

A privacy impact assessment for a public service that processes personal data is completed before launch, approved by the owning agency, and reviewed when the processing or data sharing changes. A public summary records the outcome and any conditions.

**Thai:** การประเมินผลกระทบด้านความเป็นส่วนตัวสำหรับบริการสาธารณะที่ประมวลผลข้อมูลส่วนบุคคลต้องเสร็จก่อนเปิดบริการ ได้รับอนุมัติจากหน่วยงานเจ้าของ และทบทวนเมื่อการประมวลผลหรือการแบ่งปันข้อมูลเปลี่ยนแปลง สรุปสาธารณะต้องบันทึกผลและเงื่อนไข

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Approved privacy impact assessment with scope and conditions
- **document** (max 365 days): Public summary of the assessment outcome

## Overrides

- none

## Waivers

- none

## Sources

- `TH-PROC-001`
- `TH-DGA-001`
- `TH-PDPA-001`
- `TH-CYBER-001`
- `TH-ETA-001`

## Not covered

Procurement law advice, bid protest advice, information classification advice, government-cloud procurement, and legal interpretation.

**Thai:** คำแนะนำด้านกฎหมายจัดซื้อจัดจ้าง คำแนะนำด้านการโต้แย้งผลการประกวดราคา คำแนะนำด้านการจำแนกชั้นข้อมูล การจัดซื้อคลาวด์ภาครัฐ และการตีความกฎหมาย

## Review checklist

review-checklist.md

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
