# TH-LOG — Thailand logistics overlay

- Type: `industry`
- Jurisdiction: `TH`
- Industry: `logistics`
- Version: `0.4.0`
- Extends: `>=0.3.0 <2.0.0`
- Requires: SRAS-INT, SRAS-RGD, SRAS-CLD
- Review status: `draft`
- Translation status: `partial`
- Source: `overlays/industries/logistics/overlay.yaml`

## Description

Assurance deltas for transport management, warehouse management, tracking, customs integration, and delivery platforms operating in Thailand.

**Thai:** ส่วนเพิ่ม assurance สำหรับระบบบริหารการขนส่ง คลังสินค้า การติดตาม การเชื่อมต่อศุลกากร และแพลตฟอร์มจัดส่งที่ดำเนินงานในประเทศไทย

## Adds

### TH-LOG-001 — Shipment status events are timestamped, ordered, and reconciled

Shipment status events carry a source, actor, location, and timestamp. Events are ordered, conflicts across systems are detected, and the tracking view shows the reconciled state rather than the last write.

**Thai:** เหตุการณ์สถานะการจัดส่งต้องระบุแหล่งที่มา ผู้ดำเนินการ สถานที่ และเวลา เหตุการณ์ต้องเรียงลำดับ ความขัดแย้งระหว่างระบบต้องถูกตรวจจับ และหน้าติดตามต้องแสดงสถานะที่กระทบยอดแล้ว ไม่ใช่ข้อมูลที่เขียนล่าสุด

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Shipment event model, ordering rules, and reconciliation logic
- **log** (max 90 days): Conflict and out-of-order event report for the last period

### TH-LOG-002 — Chain-of-custody handoffs record actor, location, and time

Every custody handoff records the receiving party, the handing party, the location, the time, and the condition of the shipment. Handoff records are protected against later change and are retrievable for dispute handling.

**Thai:** การส่งมอบการครอบครองทุกรายการต้องบันทึกผู้รับ ผู้ส่ง สถานที่ เวลา และสภาพสินค้า บันทึกการส่งมอบต้องได้รับการปกป้องจากการแก้ไขภายหลังและเรียกดูได้เพื่อจัดการข้อพิพาท

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Chain-of-custody model and handoff procedure
- **log** (max 90 days): Handoff record sample with actor, location, time, and condition

### TH-LOG-003 — EDI and API failures are detected and reconciled within the window

EDI and partner API messages are acknowledged, retried idempotently, and routed to a dead-letter path when they fail. Reconciliation runs within the stated window, and unresolved messages have an owner and an escalation path.

**Thai:** ข้อความ EDI และ API ของพาร์ทเนอร์ต้องได้รับการตอบรับ ลองใหม่แบบ idempotent และส่งไปยังเส้นทาง dead-letter เมื่อล้มเหลว การกระทบยอดต้องทำงานภายในกรอบเวลาที่กำหนด และข้อความที่ยังไม่แก้ไขต้องมีเจ้าของและเส้นทางส่งต่อ

- Criticality: `high`
- Status: `active`

Evidence:

- **configuration** (max 180 days): Acknowledgement, retry, idempotency, and dead-letter configuration
- **log** (max 90 days): Reconciliation report with unresolved messages and owners
- **test_result** (max 180 days): Failure injection for EDI and partner API paths

### TH-LOG-004 — Warehouse and depot access is scoped and monitored

Warehouse and depot access is granted by role, logged on entry and exit, reviewed on a cadence, and revoked when a person leaves or changes role. Visitor access is recorded and accompanied.

**Thai:** การเข้าถึงคลังสินค้าและ depot ต้องให้ตามบทบาท บันทึกเข้าและออก ทบทวนตามรอบ และเพิกถอนเมื่อบุคคลออกหรือเปลี่ยนบทบาท การเข้าถึงของผู้มาเยือนต้องบันทึกและมีผู้ดูแล

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Access role model, visitor procedure, and review schedule
- **log** (max 90 days): Entry and exit log sample with role and review record

### TH-LOG-005 — Carrier and subcontractor access is scoped and revocable

Every carrier and subcontractor is onboarded with due diligence, given scoped access, monitored against agreed service and security terms, and revoked within the defined window when the relationship ends.

**Thai:** ผู้ขนส่งและผู้รับเหมาช่วงทุกรายต้องผ่านการตรวจสอบก่อนรับงาน ได้รับสิทธิ์ตามขอบเขต ติดตามตามเงื่อนไขบริการและความมั่นคงปลอดภัยที่ตกลง และเพิกถอนสิทธิ์ภายในกรอบเวลาที่กำหนดเมื่อสิ้นสุดความสัมพันธ์

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Carrier and subcontractor register with due diligence and terms
- **ticket** (max 180 days): Revocation record for a completed or terminated relationship
- **log** (max 90 days): Partner access monitoring sample

### TH-LOG-006 — Peak-season capacity is tested against the agreed forecast

The peak-season demand forecast is agreed with the business, load-tested against the order and tracking paths, and paired with a scaling, degradation, and communication plan. The test is repeated before each peak.

**Thai:** ประมาณการความต้องการช่วงพีคต้องตกลงกับธุรกิจ ทดสอบโหลดกับเส้นทางคำสั่งซื้อและการติดตาม และมีแผนขยายขีดความสามารถ ลดระดับบริการ และสื่อสาร ต้องทดสอบซ้ำก่อนทุกช่วงพีค

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Peak forecast, scaling plan, and degradation plan
- **test_result** (max 180 days): Load test result against the agreed forecast

### TH-LOG-007 — Routing and delivery continuity is planned and exercised

Routing and delivery have an alternate-carrier and alternate-depot plan, a manual fallback for tracking or dispatch failure, and an exercise within the last 12 months. The plan names the decision owner and the customer communication path.

**Thai:** การจัดเส้นทางและการส่งมอบต้องมีแผนผู้ขนส่งสำรองและ depot สำรอง มีแนวทาง manual เมื่อระบบติดตามหรือ dispatch ล้มเหลว และมีการฝึกซ้อมภายใน 12 เดือนที่ผ่านมา แผนต้องระบุเจ้าของการตัดสินใจและเส้นทางสื่อสารกับลูกค้า

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Continuity plan with alternate carrier, depot, and manual fallback
- **test_result** (max 365 days): Continuity exercise result within the last 12 months

### TH-LOG-008 — Partner data sharing is minimised and governed by agreement

A data-sharing inventory records what is shared with each carrier, depot, or platform partner, why, and for how long. Sharing is limited to the agreed fields, protected in transit, and covered by a contract with security, privacy, and exit terms.

**Thai:** ทะเบียนการแบ่งปันข้อมูลต้องบันทึกว่าแบ่งปันอะไรกับผู้ขนส่ง depot หรือแพลตฟอร์มพาร์ทเนอร์แต่ละราย เพราะเหตุใด และนานเท่าใด การแบ่งปันจำกัดเฉพาะฟิลด์ที่ตกลง ปกป้องระหว่างส่ง และมีสัญญาที่ครอบคลุมความมั่นคงปลอดภัย ความเป็นส่วนตัว และการออก

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Data-sharing inventory and partner agreement register
- **contract** (max 365 days): Partner agreement with security, privacy, and exit terms
- **log** (max 90 days): Shared-field access log sample

### TH-LOG-009 — Customs and trade data is accurate and traceable

Customs and trade data has a defined source of truth, validation rules, a correction path with approval, and an audit trail from the order to the declaration. Data shared with a customs broker or authority is logged.

**Thai:** ข้อมูลศุลกากรและการค้าต้องมีแหล่งข้อมูลหลักที่กำหนด กฎการตรวจสอบ เส้นทางการแก้ไขที่ต้องอนุมัติ และ audit trail ตั้งแต่คำสั่งซื้อถึงใบขน ข้อมูลที่แบ่งปันกับตัวแทนศุลกากรหรือหน่วยงานต้องบันทึก

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Customs data model, validation rules, and correction procedure
- **log** (max 90 days): Declaration audit trail and broker sharing log sample

### TH-LOG-010 — Lost, delayed, or misrouted shipments have a tested response

Lost, delayed, and misrouted shipments have detection signals, an escalation owner, carrier coordination, customer communication, and a root-cause review. A simulation or tabletop within the last 12 months exercises the response.

**Thai:** สินค้าที่หาย ล่าช้า และส่งผิดเส้นทางต้องมีสัญญาณตรวจจับ เจ้าของการส่งต่อ การประสานกับผู้ขนส่ง การสื่อสารกับลูกค้า และการทบทวนสาเหตุราก และต้องมีการจำลองหรือ tabletop ภายใน 12 เดือนที่ผ่านมา

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Exception response plan with owner and communication template
- **test_result** (max 365 days): Simulation or tabletop result for shipment exceptions
- **ticket** (max 180 days): Root-cause review record for a recent exception

### TH-LOG-011 — Proof-of-delivery records are tamper-evident and retained

Proof-of-delivery records include the recipient confirmation, time, location, and delivery actor. The record is tamper-evident, retained for the defined period, and retrievable for dispute handling within the service target.

**Thai:** บันทึกหลักฐานการส่งมอบต้องมีการยืนยันจากผู้รับ เวลา สถานที่ และผู้ส่งมอบ บันทึกต้องปลอมแปลงได้ยาก เก็บรักษาตามระยะเวลาที่กำหนด และเรียกดูได้เพื่อจัดการข้อพิพาทภายในเป้าหมายการให้บริการ

- Criticality: `gate`
- Status: `active`

Evidence:

- **configuration** (max 180 days): Proof-of-delivery capture, integrity, and retention configuration
- **log** (max 180 days): Retrieval test result for a proof-of-delivery record

## Overrides

- none

## Waivers

- none

## Sources

- `TH-PDPA-001`
- `TH-ETA-001`
- `TH-CCA-001`
- `TH-CYBER-001`
- `TH-TECH-001`
- `TH-DPS-001`

## Not covered

Customs and trade law advice, transport licensing, carrier liability, trade compliance advice, and legal interpretation.

**Thai:** คำแนะนำด้านกฎหมายศุลกากรและการค้า การออกใบอนุญาตขนส่ง ความรับผิดของผู้ขนส่ง คำแนะนำด้านการปฏิบัติตามกฎการค้า และการตีความกฎหมาย

## Review checklist

review-checklist.md

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
