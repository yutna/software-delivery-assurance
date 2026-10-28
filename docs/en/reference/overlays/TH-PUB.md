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

Rationale:

A service without a traceable procurement and contract record cannot be audited or defended.

**Thai:** บริการที่ไม่มีบันทึกการจัดซื้อจัดจ้างและสัญญาที่ตรวจสอบได้ไม่สามารถตรวจสอบหรือชี้แจงได้

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: The evidence set exists and is linked to the service.
- Lite partial: Some records exist but the set is incomplete.
- Full L2: Every service has a complete evidence set for the current contract.
- Full L3: Evidence is indexed and retrievable within the audit service target.

Evidence:

- **document** (max 365 days): Procurement, contract, acceptance, and change-order evidence set
- **contract** (max 365 days): Current contract with security, data, and exit terms
- **report** (max 365 days): Vendor performance review record

References:

- [Public Procurement Act B.E. 2560](https://law.go.th/DetailLawPage?table_of_law_id=8828) — `regulation`

Crosswalks:

- none

### TH-PUB-002 — Records retention follows an approved schedule

A records inventory covers service records, case records, audit records, and public communications. A retention schedule is approved by the owning agency, disposal is evidenced, and archival formats remain readable.

**Thai:** ทะเบียนบันทึกต้องครอบคลุมบันทึกบริการ บันทึกกรณี บันทึกการตรวจสอบ และการสื่อสารสาธารณะ ตารางการเก็บรักษาต้องได้รับอนุมัติจากหน่วยงานเจ้าของ การทำลายต้องมีหลักฐาน และรูปแบบการเก็บถาวรต้องยังอ่านได้

Rationale:

Retention that is assumed but not scheduled produces both premature deletion and indefinite hoarding.

**Thai:** การเก็บรักษาที่ตั้งสมมติฐานแต่ไม่มีตารางจะทำให้เกิดทั้งการลบก่อนกำหนดและการเก็บไว้อย่างไม่มีที่สิ้นสุด

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: The inventory and schedule are approved and disposal is evidenced.
- Lite partial: A schedule exists but some record types are unclassified.
- Full L2: Every record type has a retention rule and a disposal path.
- Full L3: Retention and archival readability are measured on a cadence.

Evidence:

- **document** (max 365 days): Records inventory and agency-approved retention schedule
- **log** (max 180 days): Disposal evidence for records at the end of retention

References:

- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`

Crosswalks:

- none

### TH-PUB-003 — Public-facing services meet the agreed accessibility target

Critical public journeys meet the agreed accessibility target for the named WCAG version. Automated and manual checks cover information, forms, payments, authentication, and complaint paths, and findings are remediated on a tracked plan.

**Thai:** เส้นทางบริการสาธารณะที่สำคัญต้องเป็นไปตามเป้าหมาย accessibility ที่ตกลงสำหรับเวอร์ชัน WCAG ที่ระบุ การตรวจสอบอัตโนมัติและด้วยมนุษย์ครอบคลุมข้อมูล แบบฟอร์ม การชำระเงิน การยืนยันตัวตน และช่องทางร้องเรียน และข้อบกพร่องต้องได้รับการแก้ไขตามแผนที่ติดตามได้

Rationale:

A public service that excludes people with disabilities fails its public purpose.

**Thai:** บริการสาธารณะที่กีดกันผู้พิการไม่บรรลุวัตถุประสงค์สาธารณะ

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Critical public journeys meet the target and findings have a plan.
- Lite partial: Some journeys are untested or defects remain open.
- Full L2: Every critical public journey is tested against the named WCAG version.
- Full L3: Accessibility regressions are prevented in the release pipeline.

Evidence:

- **test_result** (max 180 days): Automated and manual accessibility results for critical public journeys
- **report** (max 365 days): Accessibility remediation plan with owners and dates

References:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — `standard`
- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`

Crosswalks:

- none

### TH-PUB-004 — Thai-language service content is reviewed by a native speaker

Thai content for critical public journeys is reviewed by a native Thai speaker before publication. A glossary keeps terms consistent, the review is recorded with name and date, and English content carries the same meaning.

**Thai:** เนื้อหาภาษาไทยสำหรับเส้นทางบริการสาธารณะที่สำคัญต้องได้รับการตรวจทานโดยเจ้าของภาษาก่อนเผยแพร่ มีอภิธานศัพท์เพื่อความสม่ำเสมอของคำ บันทึกการตรวจทานพร้อมชื่อและวันที่ และเนื้อหาภาษาอังกฤษต้องมีความหมายเดียวกัน

Rationale:

Machine translation can make a legal or procedural step unclear in the language most citizens use.

**Thai:** การแปลด้วยเครื่องอาจทำให้ขั้นตอนทางกฎหมายหรือขั้นตอนปฏิบัติไม่ชัดเจนในภาษาที่ประชาชนส่วนใหญ่ใช้

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Critical Thai content is reviewed and recorded.
- Lite partial: Review exists for some pages but not critical journeys.
- Full L2: Every critical journey has a recorded native-speaker review.
- Full L3: Content quality is measured with citizen feedback and corrections.

Evidence:

- **document** (max 365 days): Thai review record with reviewer name, date, and scope
- **document** (max 365 days): Glossary and content style guide

References:

- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`

Crosswalks:

- none

### TH-PUB-005 — Open data is published with quality, licence, and privacy controls

Open datasets have a named owner, a documented purpose, quality checks, a licence, and a personal-data review before publication. Updates follow a stated cadence, and a withdrawal path exists for errors or sensitive fields.

**Thai:** ชุดข้อมูลเปิดต้องมีเจ้าของที่ระบุชื่อ วัตถุประสงค์ที่จัดทำเป็นเอกสาร การตรวจสอบคุณภาพ สิทธิ์การใช้ และการทบทวนข้อมูลส่วนบุคคลก่อนเผยแพร่ การอัปเดตเป็นไปตามรอบที่กำหนด และมีเส้นทางถอนข้อมูลเมื่อพบข้อผิดพลาดหรือฟิลด์ที่ละเอียดอ่อน

Rationale:

Open data without quality and privacy checks publishes errors and personal data at scale.

**Thai:** ข้อมูลเปิดที่ไม่มีการตรวจคุณภาพและความเป็นส่วนตัวจะเผยแพร่ข้อผิดพลาดและข้อมูลส่วนบุคคลในวงกว้าง

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Datasets have an owner, licence, quality check, and privacy review.
- Lite partial: Some datasets are published without a review or licence.
- Full L2: Every dataset follows the publication and withdrawal path.
- Full L3: Dataset quality and reuse are measured with feedback.

Evidence:

- **document** (max 365 days): Dataset inventory with owner, purpose, licence, and privacy review
- **test_result** (max 180 days): Data quality and personal-data scan result for a published dataset

References:

- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`
- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`

Crosswalks:

- none

### TH-PUB-006 — Hosting location and data residency are documented and approved

The hosting location for each data category is documented, approved by the owning agency, and monitored for change. Cross-border access or transfer is identified with its mechanism and approval before it is used.

**Thai:** สถานที่โฮสต์ของข้อมูลแต่ละประเภทต้องจัดทำเอกสาร ได้รับอนุมัติจากหน่วยงานเจ้าของ และติดตามการเปลี่ยนแปลง การเข้าถึงหรือการโอนข้ามพรมแดนต้องระบุกลไกและการอนุมัติก่อนใช้งาน

Rationale:

A residency commitment that is not monitored becomes false after the next deployment or provider change.

**Thai:** ข้อผูกพันเรื่องถิ่นที่อยู่ของข้อมูลที่ไม่ถูกติดตามจะกลายเป็นเท็จหลังการปรับใช้หรือเปลี่ยนผู้ให้บริการครั้งถัดไป

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Residency is documented, approved, and monitored.
- Lite partial: The location is known but approval or monitoring is missing.
- Full L2: Every data category has a current residency record.
- Full L3: Residency drift is detected and reviewed after each change.

Evidence:

- **document** (max 365 days): Data residency inventory with hosting location and approval
- **configuration** (max 180 days): Hosting region and access-control configuration evidence

References:

- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`
- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`

Crosswalks:

- none

### TH-PUB-007 — Personnel screening matches the role's access and sensitivity

Roles with access to citizen data, production systems, or high-value decisions have defined screening requirements. Screening is completed before access, re-run on a cadence, recorded, and applied to contractors and vendor staff.

**Thai:** บทบาทที่เข้าถึงข้อมูลประชาชน ระบบ production หรือการตัดสินใจที่มีมูลค่าสูงต้องมีข้อกำหนดการตรวจสอบที่ชัดเจน ต้องตรวจสอบก่อนให้สิทธิ์ ตรวจซ้ำตามรอบ บันทึกไว้ และใช้กับผู้รับเหมาและพนักงานของผู้ขาย

Rationale:

Access without screening shifts trust from a verified person to an unverified account.

**Thai:** การเข้าถึงโดยไม่มีการตรวจสอบบุคคลจะเปลี่ยนความเชื่อมั่นจากบุคคลที่ตรวจสอบแล้วเป็นบัญชีที่ยังไม่ตรวจสอบ

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Screening is defined, completed before access, and recorded.
- Lite partial: Screening exists for staff but not contractors or re-screening.
- Full L2: Every in-scope role is screened and re-screened on schedule.
- Full L3: Screening coverage is measured and exceptions are reviewed.

Evidence:

- **document** (max 365 days): Role screening matrix and screening record
- **ticket** (max 180 days): Screening completion before access grant for a sample of roles

References:

- [Cybersecurity Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=1594) — `regulation`

Crosswalks:

- none

### TH-PUB-008 — Essential public service continuity is tested at least annually

Essential public services are listed with their maximum tolerable downtime and recovery objectives. Alternate arrangements are documented, an exercise is completed at least annually, and citizen communication is included in the exercise.

**Thai:** บริการสาธารณะที่จำเป็นต้องระบุรายการพร้อม maximum tolerable downtime และวัตถุประสงค์การกู้คืน จัดทำแนวทางสำรอง ทดสอบอย่างน้อยปีละครั้ง และรวมการสื่อสารกับประชาชนไว้ในการทดสอบ

Rationale:

An essential service without a tested continuity path becomes a public emergency on the first outage.

**Thai:** บริการสาธารณะที่จำเป็นซึ่งไม่มีแนวทางความต่อเนื่องที่ทดสอบแล้วจะกลายเป็นเหตุฉุกเฉินสาธารณะเมื่อเกิดเหตุขัดข้องครั้งแรก

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Essential services are listed and exercised at least annually.
- Lite partial: The plan exists but the exercise or communication is incomplete.
- Full L2: Every essential service is exercised with its dependency owners.
- Full L3: Recovery performance is measured against the stated objectives.

Evidence:

- **document** (max 365 days): Essential service list, tolerances, recovery objectives, and alternate arrangements
- **test_result** (max 365 days): Annual continuity exercise result including citizen communication

References:

- [Cybersecurity Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=1594) — `regulation`
- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`

Crosswalks:

- none

### TH-PUB-009 — Administrative actions are auditable and attributable

Administrative and privileged actions on public services record the actor, time, object, and outcome. Logs are protected from change, retained, and reviewed for anomalies, and a citizen-requested action can be reconstructed.

**Thai:** การดำเนินการทางปกครองและสิทธิ์ระดับสูงบนบริการสาธารณะต้องบันทึกผู้ดำเนินการ เวลา วัตถุ และผลลัพธ์ บันทึกต้องได้รับการปกป้องจากการเปลี่ยนแปลง เก็บรักษา ตรวจหาความผิดปกติ และสามารถสร้างการดำเนินการที่ประชาชนร้องขอขึ้นใหม่ได้

Rationale:

Public accountability depends on being able to show who did what, when, and with what effect.

**Thai:** ความรับผิดชอบต่อสาธารณะขึ้นอยู่กับความสามารถในการแสดงว่าใครทำอะไร เมื่อใด และเกิดผลอย่างไร

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Actions are logged, protected, and reconstructable.
- Lite partial: Logging exists but integrity or review is incomplete.
- Full L2: Every administrative action is attributable and reviewed.
- Full L3: Anomaly detection and reconstruction tests are measured.

Evidence:

- **log** (max 90 days): Administrative action log with actor, time, object, and outcome
- **configuration** (max 180 days): Log integrity and retention configuration

References:

- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`
- [Computer Crime Act B.E. 2550](https://law.go.th/DetailLawPage?table_of_law_id=9000) — `regulation`

Crosswalks:

- none

### TH-PUB-010 — Cross-agency and vendor changes use a shared change record

Changes that affect another agency or a vendor use one shared change record with impact, approvals from each party, a rollback plan, and a communication path. A change freeze applies to critical public periods.

**Thai:** การเปลี่ยนแปลงที่กระทบหน่วยงานอื่นหรือผู้ขายต้องใช้บันทึกการเปลี่ยนแปลงร่วมฉบับเดียว ซึ่งระบุผลกระทบ การอนุมัติจากแต่ละฝ่าย แผน rollback และเส้นทางสื่อสาร และมี change freeze สำหรับช่วงเวลาสาธารณะที่สำคัญ

Rationale:

A change approved on one side of an agency boundary can break the other side without warning.

**Thai:** การเปลี่ยนแปลงที่อนุมัติฝ่ายเดียวของขอบเขตหน่วยงานสามารถทำให้อีกฝ่ายเสียหายโดยไม่มีการแจ้งเตือน

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Cross-party changes use a shared record and rollback plan.
- Lite partial: A record exists but one party or the rollback is missing.
- Full L2: Every cross-party change has joint approval and test evidence.
- Full L3: Change failure and coordination time are measured.

Evidence:

- **ticket** (max 180 days): Shared change record with multi-party approval and rollback
- **test_result** (max 180 days): Cross-agency integration test result for the change

References:

- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`

Crosswalks:

- none

### TH-PUB-011 — Citizen-facing incident communication has an approved template and owner

Citizen-facing incident communication has an approved template, a named owner, Thai and English versions, and accessible channels. The path is exercised within the last 12 months and covers service status, impact, workaround, and next update.

**Thai:** การสื่อสารเหตุการณ์ต่อประชาชนต้องมีแม่แบบที่อนุมัติแล้ว เจ้าของที่ระบุชื่อ ฉบับภาษาไทยและอังกฤษ และช่องทางที่เข้าถึงได้ ต้องมีการฝึกซ้อมภายใน 12 เดือนที่ผ่านมา และครอบคลุมสถานะบริการ ผลกระทบ แนวทางชั่วคราว และการอัปเดตครั้งถัดไป

Rationale:

A service outage without citizen communication becomes a trust and accessibility failure.

**Thai:** เหตุขัดข้องของบริการที่ไม่มีการสื่อสารต่อประชาชนจะกลายเป็นความล้มเหลวด้านความเชื่อมั่นและการเข้าถึง

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: The template, owner, channels, and exercise are current.
- Lite partial: A template exists but the owner or exercise is missing.
- Full L2: The path is exercised with service, communications, and accessibility teams.
- Full L3: Communication timeliness and citizen feedback are measured.

Evidence:

- **document** (max 365 days): Approved citizen communication template and owner record
- **test_result** (max 365 days): Communication exercise result within the last 12 months

References:

- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`
- [Cybersecurity Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=1594) — `regulation`

Crosswalks:

- none

### TH-PUB-012 — A privacy impact assessment is approved before public launch

A privacy impact assessment for a public service that processes personal data is completed before launch, approved by the owning agency, and reviewed when the processing or data sharing changes. A public summary records the outcome and any conditions.

**Thai:** การประเมินผลกระทบด้านความเป็นส่วนตัวสำหรับบริการสาธารณะที่ประมวลผลข้อมูลส่วนบุคคลต้องเสร็จก่อนเปิดบริการ ได้รับอนุมัติจากหน่วยงานเจ้าของ และทบทวนเมื่อการประมวลผลหรือการแบ่งปันข้อมูลเปลี่ยนแปลง สรุปสาธารณะต้องบันทึกผลและเงื่อนไข

Rationale:

A public service that starts processing before the privacy assessment cannot show that the design was considered.

**Thai:** บริการสาธารณะที่เริ่มประมวลผลก่อนการประเมินความเป็นส่วนตัวไม่สามารถแสดงได้ว่าการออกแบบได้รับการพิจารณา

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: The assessment is approved before launch and its conditions are tracked.
- Lite partial: The assessment exists but approval or the public summary is missing.
- Full L2: The assessment covers every personal-data flow and sharing partner.
- Full L3: Conditions are tested and the assessment is reviewed on change.

Evidence:

- **document** (max 365 days): Approved privacy impact assessment with scope and conditions
- **document** (max 365 days): Public summary of the assessment outcome

References:

- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`
- [Digital Government Administration and Services Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=9216) — `regulation`

Crosswalks:

- none

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
