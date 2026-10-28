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

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Approved maximum tolerable downtime, RTO, and RPO for each critical service
- **test_result** (max 365 days): Recovery exercise result against the stated objectives

### TH-FIN-002 — IT risk is owned by the board and reviewed at least annually

The board approves the IT risk appetite and receives an IT risk report at least annually. A named executive owns IT risk, and the risk register records IT risks with owners, ratings, and review dates.

**Thai:** คณะกรรมการอนุมัติ risk appetite ด้านไอทีและรับรายงานความเสี่ยงด้านไอทีอย่างน้อยปีละครั้ง ผู้บริหารที่มีชื่อรับผิดชอบความเสี่ยงด้านไอที และ risk register บันทึกความเสี่ยงด้านไอทีพร้อมเจ้าของ ระดับความเสี่ยง และวันทบทวน

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Board-approved IT risk appetite and reporting pack
- **ticket** (max 365 days): Board or risk committee review record with actions

### TH-FIN-003 — Critical outsourcing arrangements have an exit plan and tested transition

Every critical outsourcing or cloud arrangement has a documented exit plan covering data return, service transition, roles, and timing. A tabletop or live test within the last 12 months demonstrates the plan.

**Thai:** ข้อตกลง outsourcing หรือ cloud ที่สำคัญทุกรายการต้องมีแผนออกที่จัดทำเป็นเอกสาร ครอบคลุมการส่งคืนข้อมูล การโอนย้ายบริการ บทบาท และกรอบเวลา และต้องมีการทดสอบแบบ tabletop หรือทดสอบจริงภายใน 12 เดือนที่ผ่านมา

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Exit plan with data return, transition, roles, and timing
- **test_result** (max 365 days): Tabletop or live transition test result

### TH-FIN-004 — Transaction records are integrity-protected and retained for the defined period

Transaction and ledger records are protected against unauthorised change, retained for the period set by policy and applicable rules, and accessible only through logged, approved access.

**Thai:** บันทึกธุรกรรมและบัญชีแยกประเภทได้รับการปกป้องจากการเปลี่ยนแปลงโดยไม่ได้รับอนุญาต เก็บรักษาตามระยะเวลาที่นโยบายและกฎเกณฑ์ที่ใช้บังคับกำหนด และเข้าถึงได้เฉพาะผ่านสิทธิ์ที่ได้รับอนุมัติและมีการบันทึก log

- Criticality: `gate`
- Status: `active`

Evidence:

- **configuration** (max 180 days): Immutability, retention, and access controls for transaction records
- **log** (max 90 days): Access log showing approved access to transaction records
- **document** (max 365 days): Retention schedule and reconciliation procedure

### TH-FIN-005 — Fraud incidents have an escalation path and a customer communication plan

Fraud detection signals have a named owner and escalation path. A customer communication plan covers notification, support, and remediation, and is exercised within the last 12 months.

**Thai:** สัญญาณการตรวจจับการฉ้อโกงมีเจ้าของและเส้นทางส่งต่อที่ระบุชื่อ แผนสื่อสารกับลูกค้าครอบคลุมการแจ้ง การสนับสนุน และการเยียวยา และต้องมีการฝึกซ้อมภายใน 12 เดือนที่ผ่านมา

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Fraud escalation matrix and customer communication plan
- **test_result** (max 365 days): Fraud simulation or tabletop exercise result

### TH-FIN-006 — High-privilege access to payment and ledger systems is separately approved

Privileged roles on payment and ledger systems require separate approval, multi-factor authentication, session logging, and a quarterly access review. Standing access is time-bound.

**Thai:** บทบาทสิทธิ์ระดับสูงบนระบบชำระเงินและบัญชีแยกประเภทต้องได้รับการอนุมัติแยกต่างหาก ใช้ multi-factor authentication บันทึก session log และทบทวนสิทธิ์ทุกไตรมาส สิทธิ์แบบถาวรต้องมีกรอบเวลา

- Criticality: `gate`
- Status: `active`

Evidence:

- **configuration** (max 180 days): Privileged role definition, MFA, and session logging configuration
- **log** (max 90 days): Privileged session log sample for payment and ledger systems
- **ticket** (max 120 days): Quarterly privileged access review record

### TH-FIN-007 — Customer financial data is classified, minimised, and access-controlled

Customer financial data is classified, limited to fields with a documented need, encrypted in transit and at rest, and accessible only to approved roles. Retention and deletion follow policy.

**Thai:** ข้อมูลการเงินของลูกค้าต้องได้รับการจำแนก จำกัดเฉพาะฟิลด์ที่มีความจำเป็นตามเอกสาร เข้ารหัสระหว่างส่งและขณะจัดเก็บ และเข้าถึงได้เฉพาะบทบาทที่ได้รับอนุมัติ การเก็บรักษาและการลบเป็นไปตามนโยบาย

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Data classification and minimisation record for customer financial data
- **configuration** (max 180 days): Encryption and role-based access configuration

### TH-FIN-008 — Core financial system changes have a tested rollback and independent review

Changes to core financial systems have a risk assessment, independent review, a tested rollback or roll-forward plan, and a change freeze rule for critical financial periods.

**Thai:** การเปลี่ยนแปลงระบบการเงินหลักต้องมีการประเมินความเสี่ยง การรีวิวอย่างอิสระ แผน rollback หรือ roll-forward ที่ผ่านการทดสอบ และกฎ change freeze สำหรับช่วงเวลาการเงินที่สำคัญ

- Criticality: `high`
- Status: `active`

Evidence:

- **ticket** (max 180 days): Change record with risk assessment and independent approval
- **test_result** (max 180 days): Rollback or roll-forward test result for the change

### TH-FIN-009 — Regulatory notification readiness is tested for financial incidents

A notification matrix names the regulator, trigger, owner, and deadline for financial incidents. Templates and contact details are current, and a tabletop within the last 12 months exercises the path.

**Thai:** ตารางการแจ้งระบุหน่วยงานกำกับดูแล เงื่อนไขการแจ้ง เจ้าของ และกำหนดเวลา สำหรับเหตุการณ์ทางการเงิน แม่แบบและข้อมูลติดต่อเป็นปัจจุบัน และต้องมีการฝึกซ้อมแบบ tabletop ภายใน 12 เดือนที่ผ่านมา

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Notification matrix, templates, and current contact list
- **test_result** (max 365 days): Tabletop exercise result for a financial incident notification

### TH-FIN-010 — Models used in credit, fraud, or pricing are validated and monitored

Models used in credit, fraud, or pricing are inventoried, validated independently of their developers, monitored against defined thresholds, and reviewed when performance drifts. Consequential decisions retain human oversight.

**Thai:** โมเดลที่ใช้ในสินเชื่อ การฉ้อโกง หรือการตั้งราคาต้องมีทะเบียน ผ่านการตรวจสอบอย่างอิสระจากผู้พัฒนา ติดตามเทียบกับเกณฑ์ที่กำหนด และทบทวนเมื่อประสิทธิภาพคลาดเคลื่อน การตัดสินใจที่มีนัยสำคัญยังคงมีการกำกับโดยมนุษย์

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Model inventory, validation report, and approval record
- **metric** (max 90 days): Model performance and drift metrics against thresholds
- **report** (max 365 days): Periodic model risk review with actions

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
