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

Rationale:

A tracking view that trusts the last write hides lost or duplicated scan events.

**Thai:** หน้าติดตามที่เชื่อข้อมูลที่เขียนล่าสุดจะซ่อนเหตุการณ์สแกนที่หายไปหรือซ้ำกัน

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Events have the required fields and conflicts are reconciled.
- Lite partial: Events are recorded but ordering or reconciliation is manual.
- Full L2: Reconciliation covers every carrier and scan source.
- Full L3: Event quality is measured with conflict and latency metrics.

Evidence:

- **document** (max 365 days): Shipment event model, ordering rules, and reconciliation logic
- **log** (max 90 days): Conflict and out-of-order event report for the last period

References:

- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`

Crosswalks:

- none

### TH-LOG-002 — Chain-of-custody handoffs record actor, location, and time

Every custody handoff records the receiving party, the handing party, the location, the time, and the condition of the shipment. Handoff records are protected against later change and are retrievable for dispute handling.

**Thai:** การส่งมอบการครอบครองทุกรายการต้องบันทึกผู้รับ ผู้ส่ง สถานที่ เวลา และสภาพสินค้า บันทึกการส่งมอบต้องได้รับการปกป้องจากการแก้ไขภายหลังและเรียกดูได้เพื่อจัดการข้อพิพาท

Rationale:

Without an attributable handoff record, a missing or damaged shipment has no recoverable chain.

**Thai:** หากไม่มีบันทึกการส่งมอบที่ระบุผู้รับผิดชอบ สินค้าที่หายหรือเสียหายจะไม่มีห่วงโซ่ที่กู้คืนได้

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Every handoff is recorded and protected from later change.
- Lite partial: Some handoffs are recorded without condition or location.
- Full L2: Handoffs are complete for every carrier, depot, and return path.
- Full L3: Custody gaps are measured and investigated as incidents.

Evidence:

- **document** (max 365 days): Chain-of-custody model and handoff procedure
- **log** (max 90 days): Handoff record sample with actor, location, time, and condition

References:

- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`

Crosswalks:

- none

### TH-LOG-003 — EDI and API failures are detected and reconciled within the window

EDI and partner API messages are acknowledged, retried idempotently, and routed to a dead-letter path when they fail. Reconciliation runs within the stated window, and unresolved messages have an owner and an escalation path.

**Thai:** ข้อความ EDI และ API ของพาร์ทเนอร์ต้องได้รับการตอบรับ ลองใหม่แบบ idempotent และส่งไปยังเส้นทาง dead-letter เมื่อล้มเหลว การกระทบยอดต้องทำงานภายในกรอบเวลาที่กำหนด และข้อความที่ยังไม่แก้ไขต้องมีเจ้าของและเส้นทางส่งต่อ

Rationale:

An unacknowledged shipment message becomes a missing shipment in the physical world.

**Thai:** ข้อความการจัดส่งที่ไม่ได้รับการตอบรับจะกลายเป็นสินค้าที่หายไปในโลกจริง

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Failures are detected and reconciled within the window.
- Lite partial: Retries exist but reconciliation or ownership is incomplete.
- Full L2: Every partner path has acknowledgement and reconciliation evidence.
- Full L3: Message latency and unresolved rates are measured.

Evidence:

- **configuration** (max 180 days): Acknowledgement, retry, idempotency, and dead-letter configuration
- **log** (max 90 days): Reconciliation report with unresolved messages and owners
- **test_result** (max 180 days): Failure injection for EDI and partner API paths

References:

- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`

Crosswalks:

- none

### TH-LOG-004 — Warehouse and depot access is scoped and monitored

Warehouse and depot access is granted by role, logged on entry and exit, reviewed on a cadence, and revoked when a person leaves or changes role. Visitor access is recorded and accompanied.

**Thai:** การเข้าถึงคลังสินค้าและ depot ต้องให้ตามบทบาท บันทึกเข้าและออก ทบทวนตามรอบ และเพิกถอนเมื่อบุคคลออกหรือเปลี่ยนบทบาท การเข้าถึงของผู้มาเยือนต้องบันทึกและมีผู้ดูแล

Rationale:

Physical access is the first control for theft, tampering, and unauthorised removal.

**Thai:** การเข้าถึงทางกายภาพเป็น کنترلแรกสำหรับการโจรกรรม การแก้ไขสินค้า และการนำออกโดยไม่ได้รับอนุญาต

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Access is role-based, logged, and reviewed.
- Lite partial: Logging exists but reviews or visitor records are incomplete.
- Full L2: Access is reviewed and revoked through the HR and contractor process.
- Full L3: Access anomalies and review outcomes are measured.

Evidence:

- **document** (max 365 days): Access role model, visitor procedure, and review schedule
- **log** (max 90 days): Entry and exit log sample with role and review record

References:

- [Cybersecurity Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=1594) — `regulation`

Crosswalks:

- none

### TH-LOG-005 — Carrier and subcontractor access is scoped and revocable

Every carrier and subcontractor is onboarded with due diligence, given scoped access, monitored against agreed service and security terms, and revoked within the defined window when the relationship ends.

**Thai:** ผู้ขนส่งและผู้รับเหมาช่วงทุกรายต้องผ่านการตรวจสอบก่อนรับงาน ได้รับสิทธิ์ตามขอบเขต ติดตามตามเงื่อนไขบริการและความมั่นคงปลอดภัยที่ตกลง และเพิกถอนสิทธิ์ภายในกรอบเวลาที่กำหนดเมื่อสิ้นสุดความสัมพันธ์

Rationale:

A subcontractor chain that is invisible cannot be assessed, limited, or exited.

**Thai:** ห่วงโซ่ผู้รับเหมาช่วงที่มองไม่เห็นไม่สามารถประเมิน จำกัด หรือออกได้

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Partners are registered, scoped, monitored, and revocable.
- Lite partial: Registration exists but revocation or monitoring is incomplete.
- Full L2: Every partner follows onboarding, monitoring, and exit evidence.
- Full L3: Partner performance and security outcomes are measured.

Evidence:

- **document** (max 365 days): Carrier and subcontractor register with due diligence and terms
- **ticket** (max 180 days): Revocation record for a completed or terminated relationship
- **log** (max 90 days): Partner access monitoring sample

References:

- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`

Crosswalks:

- none

### TH-LOG-006 — Peak-season capacity is tested against the agreed forecast

The peak-season demand forecast is agreed with the business, load-tested against the order and tracking paths, and paired with a scaling, degradation, and communication plan. The test is repeated before each peak.

**Thai:** ประมาณการความต้องการช่วงพีคต้องตกลงกับธุรกิจ ทดสอบโหลดกับเส้นทางคำสั่งซื้อและการติดตาม และมีแผนขยายขีดความสามารถ ลดระดับบริการ และสื่อสาร ต้องทดสอบซ้ำก่อนทุกช่วงพีค

Rationale:

Peak failure is predictable, and a forecast without a test does not reserve capacity.

**Thai:** ความล้มเหลวช่วงพีคคาดการณ์ได้ และประมาณการที่ไม่ผ่านการทดสอบไม่ได้จองขีดความสามารถไว้

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: The forecast and load test are current before peak.
- Lite partial: A forecast exists but the test is stale or partial.
- Full L2: Every critical path is load-tested before the peak.
- Full L3: Peak performance is measured against the forecast and reviewed.

Evidence:

- **document** (max 365 days): Peak forecast, scaling plan, and degradation plan
- **test_result** (max 180 days): Load test result against the agreed forecast

References:

- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`

Crosswalks:

- none

### TH-LOG-007 — Routing and delivery continuity is planned and exercised

Routing and delivery have an alternate-carrier and alternate-depot plan, a manual fallback for tracking or dispatch failure, and an exercise within the last 12 months. The plan names the decision owner and the customer communication path.

**Thai:** การจัดเส้นทางและการส่งมอบต้องมีแผนผู้ขนส่งสำรองและ depot สำรอง มีแนวทาง manual เมื่อระบบติดตามหรือ dispatch ล้มเหลว และมีการฝึกซ้อมภายใน 12 เดือนที่ผ่านมา แผนต้องระบุเจ้าของการตัดสินใจและเส้นทางสื่อสารกับลูกค้า

Rationale:

A single routing or depot dependency turns a local disruption into a regional stop.

**Thai:** การพึ่งพาเส้นทางหรือ depot เดียวทำให้เหตุขัดข้องเฉพาะที่กลายเป็นการหยุดให้บริการระดับภูมิภาค

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: The plan and exercise cover the critical routing and delivery paths.
- Lite partial: A plan exists but the exercise or fallback is incomplete.
- Full L2: The plan is exercised with carriers and depots and actions are tracked.
- Full L3: Continuity performance is measured against real disruptions.

Evidence:

- **document** (max 365 days): Continuity plan with alternate carrier, depot, and manual fallback
- **test_result** (max 365 days): Continuity exercise result within the last 12 months

References:

- [Cybersecurity Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=1594) — `regulation`

Crosswalks:

- none

### TH-LOG-008 — Partner data sharing is minimised and governed by agreement

A data-sharing inventory records what is shared with each carrier, depot, or platform partner, why, and for how long. Sharing is limited to the agreed fields, protected in transit, and covered by a contract with security, privacy, and exit terms.

**Thai:** ทะเบียนการแบ่งปันข้อมูลต้องบันทึกว่าแบ่งปันอะไรกับผู้ขนส่ง depot หรือแพลตฟอร์มพาร์ทเนอร์แต่ละราย เพราะเหตุใด และนานเท่าใด การแบ่งปันจำกัดเฉพาะฟิลด์ที่ตกลง ปกป้องระหว่างส่ง และมีสัญญาที่ครอบคลุมความมั่นคงปลอดภัย ความเป็นส่วนตัว และการออก

Rationale:

Shipment data contains personal and commercial information that grows with every partner hop.

**Thai:** ข้อมูลการจัดส่งมีข้อมูลส่วนบุคคลและข้อมูลเชิงพาณิชย์ที่เพิ่มขึ้นในทุกจุดที่ส่งต่อให้พาร์ทเนอร์

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Sharing is inventoried, minimised, contracted, and logged.
- Lite partial: An inventory exists but contracts or field limits are incomplete.
- Full L2: Every partner share is covered by the inventory and agreement.
- Full L3: Sharing volume and access anomalies are measured.

Evidence:

- **document** (max 365 days): Data-sharing inventory and partner agreement register
- **contract** (max 365 days): Partner agreement with security, privacy, and exit terms
- **log** (max 90 days): Shared-field access log sample

References:

- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`
- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`

Crosswalks:

- none

### TH-LOG-009 — Customs and trade data is accurate and traceable

Customs and trade data has a defined source of truth, validation rules, a correction path with approval, and an audit trail from the order to the declaration. Data shared with a customs broker or authority is logged.

**Thai:** ข้อมูลศุลกากรและการค้าต้องมีแหล่งข้อมูลหลักที่กำหนด กฎการตรวจสอบ เส้นทางการแก้ไขที่ต้องอนุมัติ และ audit trail ตั้งแต่คำสั่งซื้อถึงใบขน ข้อมูลที่แบ่งปันกับตัวแทนศุลกากรหรือหน่วยงานต้องบันทึก

Rationale:

A declaration built from unverified order data creates delays and disputes that are hard to unwind.

**Thai:** ใบขนที่สร้างจากข้อมูลคำสั่งซื้อที่ไม่ได้ตรวจสอบทำให้เกิดความล่าช้าและข้อโต้แย้งที่แก้ไขได้ยาก

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Customs data has validation, correction, and an audit trail.
- Lite partial: Data is captured but validation or correction approval is missing.
- Full L2: The audit trail covers every declaration and broker exchange.
- Full L3: Declaration error and correction rates are measured.

Evidence:

- **document** (max 365 days): Customs data model, validation rules, and correction procedure
- **log** (max 90 days): Declaration audit trail and broker sharing log sample

References:

- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`

Crosswalks:

- none

### TH-LOG-010 — Lost, delayed, or misrouted shipments have a tested response

Lost, delayed, and misrouted shipments have detection signals, an escalation owner, carrier coordination, customer communication, and a root-cause review. A simulation or tabletop within the last 12 months exercises the response.

**Thai:** สินค้าที่หาย ล่าช้า และส่งผิดเส้นทางต้องมีสัญญาณตรวจจับ เจ้าของการส่งต่อ การประสานกับผู้ขนส่ง การสื่อสารกับลูกค้า และการทบทวนสาเหตุราก และต้องมีการจำลองหรือ tabletop ภายใน 12 เดือนที่ผ่านมา

Rationale:

A shipment exception that is handled ad hoc produces inconsistent customer outcomes.

**Thai:** ข้อยกเว้นการจัดส่งที่จัดการแบบเฉพาะหน้าให้ผลลัพธ์ต่อลูกค้าที่ไม่สม่ำเสมอ

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: The response is documented and exercised in the last 12 months.
- Lite partial: A plan exists but the exercise or root-cause review is missing.
- Full L2: The response is exercised with carriers and customer support.
- Full L3: Exception rates and resolution times are measured.

Evidence:

- **document** (max 365 days): Exception response plan with owner and communication template
- **test_result** (max 365 days): Simulation or tabletop result for shipment exceptions
- **ticket** (max 180 days): Root-cause review record for a recent exception

References:

- [Consumer Protection Act B.E. 2522](https://law.go.th/DetailLawPage?table_of_law_id=9263) — `regulation`

Crosswalks:

- none

### TH-LOG-011 — Proof-of-delivery records are tamper-evident and retained

Proof-of-delivery records include the recipient confirmation, time, location, and delivery actor. The record is tamper-evident, retained for the defined period, and retrievable for dispute handling within the service target.

**Thai:** บันทึกหลักฐานการส่งมอบต้องมีการยืนยันจากผู้รับ เวลา สถานที่ และผู้ส่งมอบ บันทึกต้องปลอมแปลงได้ยาก เก็บรักษาตามระยะเวลาที่กำหนด และเรียกดูได้เพื่อจัดการข้อพิพาทภายในเป้าหมายการให้บริการ

Rationale:

Proof of delivery is the evidence that ends most delivery disputes.

**Thai:** หลักฐานการส่งมอบเป็นพยานหลักฐานที่ยุติข้อพิพาทการจัดส่งส่วนใหญ่

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Records are complete, tamper-evident, retained, and retrievable.
- Lite partial: Records exist but integrity or retrieval has gaps.
- Full L2: Every delivery path captures and retains a valid record.
- Full L3: Retrieval timeliness and dispute outcomes are measured.

Evidence:

- **configuration** (max 180 days): Proof-of-delivery capture, integrity, and retention configuration
- **log** (max 180 days): Retrieval test result for a proof-of-delivery record

References:

- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`
- [Consumer Protection Act B.E. 2522](https://law.go.th/DetailLawPage?table_of_law_id=9263) — `regulation`

Crosswalks:

- none

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
