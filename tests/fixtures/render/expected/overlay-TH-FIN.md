# TH-FIN — Thailand finance overlay

- Type: `industry`
- Jurisdiction: `TH`
- Industry: `finance`
- Version: `0.4.0`
- Extends: `>=0.3.0 <2.0.0`
- Requires: SRAS-AI, SRAS-INT, SRAS-RGD, SRAS-CLD
- Review status: `draft`
- Translation status: `partial`
- Source: `overlays/industries/finance/overlay.yaml`

## Description

Assurance deltas for banks, insurers, payment providers, fintech, and financial software vendors operating in Thailand.

**Thai:** ส่วนเพิ่ม assurance สำหรับธนาคาร ประกันภัย ผู้ให้บริการชำระเงิน fintech และผู้ขายซอฟต์แวร์การเงินที่ดำเนินงานในประเทศไทย

## Adds

### TH-FIN-001 — Critical financial services have a documented maximum tolerable downtime

Every critical financial service has an approved maximum tolerable downtime, a recovery time objective, and a recovery point objective. A recovery exercise within the last 12 months demonstrates the objective.

**Thai:** บริการการเงินที่สำคัญทุกรายการต้องมี maximum tolerable downtime, recovery time objective และ recovery point objective ที่อนุมัติแล้ว และต้องมีการฝึกซ้อมกู้คืนภายใน 12 เดือนที่ผ่านมาซึ่งแสดงให้เห็นว่าบรรลุวัตถุประสงค์

Rationale:

Availability commitments cannot be assessed without a stated tolerance and a tested recovery path.

**Thai:** ไม่สามารถประเมิน commitment ด้าน availability ได้หากไม่มี tolerance ที่ระบุไว้และเส้นทางการกู้คืนที่ผ่านการทดสอบ

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: The tolerance and recovery objectives are documented and exercised.
- Lite partial: The objectives are documented but the exercise is incomplete.
- Full L2: Documented, approved, and exercised for the current release.
- Full L3: Measured against production incidents and recovery results.

Evidence:

- **document** (max 365 days): Approved maximum tolerable downtime, RTO, and RPO for each critical service
- **test_result** (max 365 days): Recovery exercise result against the stated objectives

References:

- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`

Crosswalks:

- none

### TH-FIN-002 — IT risk is owned by the board and reviewed at least annually

The board approves the IT risk appetite and receives an IT risk report at least annually. A named executive owns IT risk, and the risk register records IT risks with owners, ratings, and review dates.

**Thai:** คณะกรรมการอนุมัติ risk appetite ด้านไอทีและรับรายงานความเสี่ยงด้านไอทีอย่างน้อยปีละครั้ง ผู้บริหารที่มีชื่อรับผิดชอบความเสี่ยงด้านไอที และ risk register บันทึกความเสี่ยงด้านไอทีพร้อมเจ้าของ ระดับความเสี่ยง และวันทบทวน

Rationale:

IT risk is a board-level risk for a financial institution, not only an engineering concern.

**Thai:** ความเสี่ยงด้านไอทีเป็นความเสี่ยงระดับคณะกรรมการของสถาบันการเงิน ไม่ใช่เพียงเรื่องของทีมวิศวกรรม

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: IT risk appetite, owner, and annual review are recorded.
- Lite partial: An owner exists but the board review is overdue.
- Full L2: The board reviews IT risk at least annually with tracked actions.
- Full L3: IT risk reporting is linked to the enterprise risk register and metrics.

Evidence:

- **document** (max 365 days): Board-approved IT risk appetite and reporting pack
- **ticket** (max 365 days): Board or risk committee review record with actions

References:

- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`

Crosswalks:

- none

### TH-FIN-003 — Critical outsourcing arrangements have an exit plan and tested transition

Every critical outsourcing or cloud arrangement has a documented exit plan covering data return, service transition, roles, and timing. A tabletop or live test within the last 12 months demonstrates the plan.

**Thai:** ข้อตกลง outsourcing หรือ cloud ที่สำคัญทุกรายการต้องมีแผนออกที่จัดทำเป็นเอกสาร ครอบคลุมการส่งคืนข้อมูล การโอนย้ายบริการ บทบาท และกรอบเวลา และต้องมีการทดสอบแบบ tabletop หรือทดสอบจริงภายใน 12 เดือนที่ผ่านมา

Rationale:

An exit that has never been exercised is a plan, not a capability.

**Thai:** แผนออกที่ยังไม่เคยทดสอบเป็นเพียงเอกสาร ไม่ใช่ขีดความสามารถ

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: The exit plan exists and was exercised in the last 12 months.
- Lite partial: The plan exists but the test is overdue.
- Full L2: The plan is tested and updated after each material change.
- Full L3: Exit readiness is measured with recovery and transition metrics.

Evidence:

- **document** (max 365 days): Exit plan with data return, transition, roles, and timing
- **test_result** (max 365 days): Tabletop or live transition test result

References:

- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`

Crosswalks:

- none

### TH-FIN-004 — Transaction records are integrity-protected and retained for the defined period

Transaction and ledger records are protected against unauthorised change, retained for the period set by policy and applicable rules, and accessible only through logged, approved access.

**Thai:** บันทึกธุรกรรมและบัญชีแยกประเภทได้รับการปกป้องจากการเปลี่ยนแปลงโดยไม่ได้รับอนุญาต เก็บรักษาตามระยะเวลาที่นโยบายและกฎเกณฑ์ที่ใช้บังคับกำหนด และเข้าถึงได้เฉพาะผ่านสิทธิ์ที่ได้รับอนุมัติและมีการบันทึก log

Rationale:

Transaction integrity and retention are the basis for dispute handling, audit, and reconciliation.

**Thai:** ความถูกต้องของธุรกรรมและการเก็บรักษาเป็นพื้นฐานของการจัดการข้อโต้แย้ง การตรวจสอบ และการกระทบยอด

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Records are protected, retained, and access is logged.
- Lite partial: Retention is defined but protection or logging has gaps.
- Full L2: Controls are implemented and tested for the current release.
- Full L3: Integrity and reconciliation are measured with continuous checks.

Evidence:

- **configuration** (max 180 days): Immutability, retention, and access controls for transaction records
- **log** (max 90 days): Access log showing approved access to transaction records
- **document** (max 365 days): Retention schedule and reconciliation procedure

References:

- [Payment Systems Act B.E. 2560](https://law.go.th/DetailLawPage?table_of_law_id=9194) — `regulation`
- [Bank of Thailand payment IT risk notification No. สนช. 1/2564](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2564/ThaiPDF/25640024.pdf) — `regulation`

Crosswalks:

- none

### TH-FIN-005 — Fraud incidents have an escalation path and a customer communication plan

Fraud detection signals have a named owner and escalation path. A customer communication plan covers notification, support, and remediation, and is exercised within the last 12 months.

**Thai:** สัญญาณการตรวจจับการฉ้อโกงมีเจ้าของและเส้นทางส่งต่อที่ระบุชื่อ แผนสื่อสารกับลูกค้าครอบคลุมการแจ้ง การสนับสนุน และการเยียวยา และต้องมีการฝึกซ้อมภายใน 12 เดือนที่ผ่านมา

Rationale:

A fraud event that is detected but not escalated or communicated becomes a customer and regulatory problem.

**Thai:** เหตุการณ์ฉ้อโกงที่ตรวจพบแต่ไม่ถูกส่งต่อหรือสื่อสารจะกลายเป็นปัญหาต่อลูกค้าและหน่วยงานกำกับดูแล

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: The escalation path and communication plan are documented and exercised.
- Lite partial: The plan exists but the exercise or owner is missing.
- Full L2: The plan is current and exercised with support and communications teams.
- Full L3: Outcomes are measured against real fraud incidents and customer feedback.

Evidence:

- **document** (max 365 days): Fraud escalation matrix and customer communication plan
- **test_result** (max 365 days): Fraud simulation or tabletop exercise result

References:

- [Emergency Decree on Technology Crimes B.E. 2566](https://law.go.th/DetailLawPage?table_of_law_id=12199) — `regulation`
- [Bank of Thailand payment IT risk notification No. สนช. 1/2564](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2564/ThaiPDF/25640024.pdf) — `regulation`

Crosswalks:

- none

### TH-FIN-006 — High-privilege access to payment and ledger systems is separately approved

Privileged roles on payment and ledger systems require separate approval, multi-factor authentication, session logging, and a quarterly access review. Standing access is time-bound.

**Thai:** บทบาทสิทธิ์ระดับสูงบนระบบชำระเงินและบัญชีแยกประเภทต้องได้รับการอนุมัติแยกต่างหาก ใช้ multi-factor authentication บันทึก session log และทบทวนสิทธิ์ทุกไตรมาส สิทธิ์แบบถาวรต้องมีกรอบเวลา

Rationale:

A single unchecked privileged path can move money or alter records without attribution.

**Thai:** เส้นทางสิทธิ์ระดับสูงเพียงเส้นเดียวที่ไม่ถูกตรวจสอบสามารถเคลื่อนย้ายเงินหรือแก้ไขบันทึกโดยระบุตัวตนไม่ได้

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Privileged access is separately approved, MFA-protected, and logged.
- Lite partial: Approval and MFA exist but review or logging has gaps.
- Full L2: Controls are implemented and reviewed every quarter.
- Full L3: Privileged activity is monitored with anomaly detection and metrics.

Evidence:

- **configuration** (max 180 days): Privileged role definition, MFA, and session logging configuration
- **log** (max 90 days): Privileged session log sample for payment and ledger systems
- **ticket** (max 120 days): Quarterly privileged access review record

References:

- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`
- [Payment Systems Act B.E. 2560](https://law.go.th/DetailLawPage?table_of_law_id=9194) — `regulation`

Crosswalks:

- none

### TH-FIN-007 — Customer financial data is classified, minimised, and access-controlled

Customer financial data is classified, limited to fields with a documented need, encrypted in transit and at rest, and accessible only to approved roles. Retention and deletion follow policy.

**Thai:** ข้อมูลการเงินของลูกค้าต้องได้รับการจำแนก จำกัดเฉพาะฟิลด์ที่มีความจำเป็นตามเอกสาร เข้ารหัสระหว่างส่งและขณะจัดเก็บ และเข้าถึงได้เฉพาะบทบาทที่ได้รับอนุมัติ การเก็บรักษาและการลบเป็นไปตามนโยบาย

Rationale:

Financial data is a high-value target; minimisation and access control reduce the impact of a breach.

**Thai:** ข้อมูลการเงินเป็นเป้าหมายที่มีมูลค่าสูง การลดปริมาณและการควบคุมการเข้าถึงช่วยลดผลกระทบจากการรั่วไหล

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Data is classified, minimised, encrypted, and role-restricted.
- Lite partial: Classification exists but some fields or stores are out of scope.
- Full L2: Controls cover every store and are verified in the current release.
- Full L3: Access and retention are measured and reviewed on a cadence.

Evidence:

- **document** (max 365 days): Data classification and minimisation record for customer financial data
- **configuration** (max 180 days): Encryption and role-based access configuration

References:

- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`
- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`

Crosswalks:

- none

### TH-FIN-008 — Core financial system changes have a tested rollback and independent review

Changes to core financial systems have a risk assessment, independent review, a tested rollback or roll-forward plan, and a change freeze rule for critical financial periods.

**Thai:** การเปลี่ยนแปลงระบบการเงินหลักต้องมีการประเมินความเสี่ยง การรีวิวอย่างอิสระ แผน rollback หรือ roll-forward ที่ผ่านการทดสอบ และกฎ change freeze สำหรับช่วงเวลาการเงินที่สำคัญ

Rationale:

A failed core change can stop payments or corrupt records faster than a recovery team can react.

**Thai:** การเปลี่ยนแปลงระบบหลักที่ล้มเหลวสามารถหยุดการชำระเงินหรือทำให้บันทึกเสียหายได้เร็วกว่าที่ทีมกู้คืนจะตอบสนอง

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Changes have independent review and a tested rollback path.
- Lite partial: Review exists but rollback testing is missing for some changes.
- Full L2: Every core change follows the process with evidence retained.
- Full L3: Change failure and rollback rates are measured and reviewed.

Evidence:

- **ticket** (max 180 days): Change record with risk assessment and independent approval
- **test_result** (max 180 days): Rollback or roll-forward test result for the change

References:

- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`

Crosswalks:

- none

### TH-FIN-009 — Regulatory notification readiness is tested for financial incidents

A notification matrix names the regulator, trigger, owner, and deadline for financial incidents. Templates and contact details are current, and a tabletop within the last 12 months exercises the path.

**Thai:** ตารางการแจ้งระบุหน่วยงานกำกับดูแล เงื่อนไขการแจ้ง เจ้าของ และกำหนดเวลา สำหรับเหตุการณ์ทางการเงิน แม่แบบและข้อมูลติดต่อเป็นปัจจุบัน และต้องมีการฝึกซ้อมแบบ tabletop ภายใน 12 เดือนที่ผ่านมา

Rationale:

A late or misdirected notification turns an incident into a regulatory breach.

**Thai:** การแจ้งที่ล่าช้าหรือผิดช่องทางทำให้เหตุการณ์กลายเป็นการฝ่าฝืนข้อกำหนดของหน่วยงานกำกับดูแล

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: The matrix, templates, and exercise are current.
- Lite partial: The matrix exists but contacts or exercise are out of date.
- Full L2: The path is exercised and actions are tracked to closure.
- Full L3: Notification timeliness is measured against real incidents.

Evidence:

- **document** (max 365 days): Notification matrix, templates, and current contact list
- **test_result** (max 365 days): Tabletop exercise result for a financial incident notification

References:

- [Cybersecurity Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=1594) — `regulation`
- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`

Crosswalks:

- none

### TH-FIN-010 — Models used in credit, fraud, or pricing are validated and monitored

Models used in credit, fraud, or pricing are inventoried, validated independently of their developers, monitored against defined thresholds, and reviewed when performance drifts. Consequential decisions retain human oversight.

**Thai:** โมเดลที่ใช้ในสินเชื่อ การฉ้อโกง หรือการตั้งราคาต้องมีทะเบียน ผ่านการตรวจสอบอย่างอิสระจากผู้พัฒนา ติดตามเทียบกับเกณฑ์ที่กำหนด และทบทวนเมื่อประสิทธิภาพคลาดเคลื่อน การตัดสินใจที่มีนัยสำคัญยังคงมีการกำกับโดยมนุษย์

Rationale:

A model that is not validated or monitored can make consistent, invisible financial decisions.

**Thai:** โมเดลที่ไม่ผ่านการตรวจสอบหรือติดตามสามารถตัดสินใจทางการเงินอย่างสม่ำเสมอโดยไม่มองเห็น

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Models are inventoried, validated, and monitored.
- Lite partial: Inventory exists but validation or monitoring has gaps.
- Full L2: Validation and monitoring cover every model in production.
- Full L3: Model risk is measured and reviewed with business outcomes.

Evidence:

- **document** (max 365 days): Model inventory, validation report, and approval record
- **metric** (max 90 days): Model performance and drift metrics against thresholds
- **report** (max 365 days): Periodic model risk review with actions

References:

- [Bank of Thailand IT risk notification No. สกช. 5/2566](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf) — `regulation`
- [NIST AI Risk Management Framework 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`

Crosswalks:

- none

## Overrides

- none

## Waivers

- none

## Sources

- `TH-PDPA-001`
- `TH-PAY-001`
- `TH-CYBER-001`
- `TH-TECH-001`
- `TH-BOT-001`
- `TH-BOT-002`

## Not covered

Prudential capital and liquidity requirements, licensing decisions, individual product approval, conduct-of-business rules for specific products, and legal interpretation.

**Thai:** ข้อกำหนดด้านเงินทุนและสภาพคล่อง การตัดสินใจออกใบอนุญาต การอนุมัติผลิตภัณฑ์รายรายการ กฎเกณฑ์การประกอบธุรกิจสำหรับผลิตภัณฑ์เฉพาะ และการตีความกฎหมาย

## Review checklist

review-checklist.md

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
