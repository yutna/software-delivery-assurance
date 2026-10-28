# TH-ECM — Thailand e-commerce overlay

- Type: `industry`
- Jurisdiction: `TH`
- Industry: `ecommerce`
- Version: `0.4.0`
- Extends: `>=0.3.0 <2.0.0`
- Requires: SRAS-INT, SRAS-RGD, SRAS-CLD
- Review status: `draft`
- Translation status: `partial`
- Source: `overlays/industries/ecommerce/overlay.yaml`

## Description

Assurance deltas for online marketplaces, direct-to-consumer platforms, payment flows, and order fulfilment software operating in Thailand.

**Thai:** ส่วนเพิ่ม assurance สำหรับตลาดออนไลน์ แพลตฟอร์มขายตรงถึงผู้บริโภค กระบวนการชำระเงิน และซอฟต์แวร์จัดการคำสั่งซื้อที่ดำเนินงานในประเทศไทย

## Adds

### TH-ECM-001 — Card data stays within the defined payment card scope

Card data is never stored, processed, or transmitted outside the defined payment card scope. The scope is documented, uses tokenisation or a hosted payment surface where possible, and is reviewed when the checkout or provider changes.

**Thai:** ข้อมูลบัตรไม่ถูกจัดเก็บ ประมวลผล หรือส่งต่อนอกขอบเขต payment card ที่กำหนด ขอบเขตต้องจัดทำเป็นเอกสาร ใช้ tokenisation หรือหน้าชำระเงินที่โฮสต์โดยผู้ให้บริการเมื่อทำได้ และทบทวนเมื่อ checkout หรือผู้ให้บริการเปลี่ยนแปลง

- Criticality: `gate`
- Status: `active`

Evidence:

- **document** (max 365 days): Payment card scope diagram and data-flow record
- **configuration** (max 180 days): Tokenisation or hosted payment configuration and storage rules
- **report** (max 365 days): Scope review after the last material checkout change

### TH-ECM-002 — Checkout degradation is planned and communicated

Critical checkout journeys have a defined degraded mode for payment-provider or inventory failure. The mode is tested, does not silently lose orders, and shows the customer what happened and what happens next.

**Thai:** เส้นทาง checkout ที่สำคัญมีโหมดลดระดับที่กำหนดไว้สำหรับความล้มเหลวของผู้ให้บริการชำระเงินหรือระบบสต็อก โหมดนี้ต้องผ่านการทดสอบ ไม่ทำให้คำสั่งซื้อหายไปโดยไม่แจ้ง และแสดงให้ลูกค้าเห็นว่าเกิดอะไรขึ้นและจะเกิดอะไรต่อไป

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Degraded-mode design and customer messaging for checkout
- **test_result** (max 365 days): Failure injection or game-day result for checkout degradation

### TH-ECM-003 — Checkout failures do not create duplicate charges

Payment attempts are idempotent and reconciled with the provider. A retry, timeout, or browser refresh cannot create a duplicate charge, and a duplicate is detected and reversed through a documented path.

**Thai:** การพยายามชำระเงินต้อง idempotent และกระทบยอดกับผู้ให้บริการ การลองใหม่ การหมดเวลา หรือการรีเฟรชเบราว์เซอร์ต้องไม่ทำให้เกิดการเรียกเก็บซ้ำ และหากเกิดการเรียกเก็บซ้ำต้องตรวจจับและคืนเงินผ่านเส้นทางที่กำหนด

- Criticality: `gate`
- Status: `active`

Evidence:

- **test_result** (max 180 days): Retry, timeout, and refresh tests that check for duplicate charges
- **log** (max 90 days): Payment reconciliation exception report and reversal record
- **document** (max 365 days): Idempotency and duplicate-reversal procedure

### TH-ECM-004 — Order, price, and promotion changes are auditable and reversible

Changes to orders, prices, discounts, and promotions record the actor, time, reason, and before-and-after values. A change can be reversed, and customer-visible changes are reflected consistently in the order record.

**Thai:** การเปลี่ยนแปลงคำสั่งซื้อ ราคา ส่วนลด และโปรโมชันต้องบันทึกผู้ดำเนินการ เวลา เหตุผล และค่าก่อนและหลัง การเปลี่ยนแปลงต้องย้อนกลับได้ และการเปลี่ยนแปลงที่ลูกค้าเห็นต้องสะท้อนในบันทึกคำสั่งซื้ออย่างสอดคล้อง

- Criticality: `high`
- Status: `active`

Evidence:

- **log** (max 90 days): Change log with actor, time, reason, and before-and-after values
- **document** (max 365 days): Reversal procedure and customer-correction policy

### TH-ECM-005 — Refund and cancellation states agree across systems

Refund, return, and cancellation states are consistent between the platform, payment provider, and fulfilment systems. Orphan or stuck states are detected, reconciled, and communicated to the customer within the stated service target.

**Thai:** สถานะการคืนเงิน การคืนสินค้า และการยกเลิกต้องสอดคล้องกันระหว่างแพลตฟอร์ม ผู้ให้บริการชำระเงิน และระบบ fulfilment สถานะที่ค้างหรือไม่ตรงกันต้องถูกตรวจจับ กระทบยอด และแจ้งให้ลูกค้าทราบภายในเป้าหมายการให้บริการที่กำหนด

- Criticality: `high`
- Status: `active`

Evidence:

- **test_result** (max 180 days): End-to-end refund and cancellation state-transition tests
- **log** (max 90 days): Reconciliation report for stuck or mismatched refund states
- **document** (max 365 days): Refund and cancellation state model and service target

### TH-ECM-006 — Consumer disclosures and consent are shown before purchase

Price, fees, delivery terms, cancellation and refund terms, and marketing consent are shown before the customer confirms a purchase. The version shown is recorded with the order, and consent is separate from the purchase terms.

**Thai:** ราคา ค่าธรรมเนียม เงื่อนไขการจัดส่ง เงื่อนไขการยกเลิกและคืนเงิน และความยินยอมด้านการตลาดต้องแสดงก่อนที่ลูกค้าจะยืนยันการซื้อ เวอร์ชันที่แสดงต้องถูกบันทึกพร้อมคำสั่งซื้อ และความยินยอมต้องแยกจากเงื่อนไขการซื้อ

- Criticality: `high`
- Status: `active`

Evidence:

- **screenshot** (max 180 days): Checkout screens showing price, fees, terms, and consent
- **document** (max 365 days): Disclosure and consent version register linked to orders
- **log** (max 90 days): Consent record sample with version and timestamp

### TH-ECM-007 — Customer accounts are protected against takeover

High-risk account actions require step-up authentication. Credential-stuffing controls, session management, breached-password checks, and a verified account-recovery path are in place and tested.

**Thai:** การดำเนินการในบัญชีที่มีความเสี่ยงสูงต้องมี step-up authentication มีมาตรการป้องกัน credential stuffing การจัดการ session การตรวจสอบรหัสผ่านที่รั่วไหล และเส้นทางการกู้คืนบัญชีที่ผ่านการยืนยัน และต้องผ่านการทดสอบ

- Criticality: `gate`
- Status: `active`

Evidence:

- **configuration** (max 180 days): Step-up authentication, session, and recovery configuration
- **test_result** (max 180 days): Credential-stuffing and account-recovery tests
- **log** (max 90 days): Account takeover detection and response log sample

### TH-ECM-008 — Marketing consent is recorded and can be withdrawn

Marketing consent is purpose-specific, opt-in, recorded with its version and timestamp, and can be withdrawn through a path that updates every sending system. Suppression is checked before each campaign.

**Thai:** ความยินยอมด้านการตลาดต้องเจาะจงวัตถุประสงค์ เป็นการเลือกเข้า บันทึกพร้อมเวอร์ชันและเวลา และถอนได้ผ่านเส้นทางที่อัปเดตทุกระบบที่ส่งข้อความ ต้องตรวจสอบ suppression ก่อนทุกแคมเปญ

- Criticality: `high`
- Status: `active`

Evidence:

- **log** (max 90 days): Consent and withdrawal record with version and timestamp
- **document** (max 365 days): Consent purpose register and suppression procedure

### TH-ECM-009 — Partner API access is authenticated, limited, and revocable

Every partner integration has scoped credentials, authenticated requests, rate limits, monitoring, and a revocation path. Partner onboarding records due diligence, contract terms, and a test path before production access.

**Thai:** การเชื่อมต่อของพาร์ทเนอร์ทุกรายต้องมี credential ที่จำกัดขอบเขต คำขอที่ผ่านการยืนยันตัวตน rate limit การติดตาม และเส้นทางเพิกถอน การ onboard พาร์ทเนอร์ต้องบันทึก due diligence เงื่อนไขสัญญา และเส้นทางทดสอบก่อนเข้าสู่ production

- Criticality: `gate`
- Status: `active`

Evidence:

- **configuration** (max 180 days): Partner credential scope, rate limit, and revocation configuration
- **log** (max 90 days): Partner API access and anomaly log sample
- **contract** (max 365 days): Partner agreement with security, data, and exit terms

### TH-ECM-010 — Customer-facing flows meet the agreed accessibility target

Critical customer journeys meet the agreed accessibility target for the named WCAG version. Automated and manual checks cover search, product, cart, checkout, payment, and account recovery, and findings are remediated on a tracked plan.

**Thai:** เส้นทางลูกค้าที่สำคัญต้องเป็นไปตามเป้าหมาย accessibility ที่ตกลงสำหรับเวอร์ชัน WCAG ที่ระบุ การตรวจสอบอัตโนมัติและด้วยมนุษย์ครอบคลุมการค้นหา สินค้า ตะกร้า checkout การชำระเงิน และการกู้คืนบัญชี และข้อบกพร่องต้องได้รับการแก้ไขตามแผนที่ติดตามได้

- Criticality: `high`
- Status: `active`

Evidence:

- **test_result** (max 180 days): Automated and manual accessibility results for critical journeys
- **report** (max 365 days): Accessibility remediation plan with owners and dates

### TH-ECM-011 — Order and dispute records are retained and retrievable

Order, payment, refund, cancellation, and dispute records are retained for the period set by policy and applicable rules, protected against unauthorised change, and retrievable within the service target for a customer or authority request.

**Thai:** บันทึกคำสั่งซื้อ การชำระเงิน การคืนเงิน การยกเลิก และข้อพิพาทต้องเก็บรักษาตามระยะเวลาที่นโยบายและกฎเกณฑ์ที่ใช้บังคับกำหนด ปกป้องจากการเปลี่ยนแปลงโดยไม่ได้รับอนุญาต และเรียกดูได้ภายในเป้าหมายการให้บริการสำหรับคำขอของลูกค้าหรือหน่วยงาน

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Retention schedule and retrieval procedure for order and dispute records
- **configuration** (max 180 days): Retention, integrity, and access configuration for order records
- **log** (max 180 days): Retrieval test result within the service target

### TH-ECM-012 — Account takeover and payment fraud have a tested response

Account takeover and payment fraud have detection signals, an escalation owner, customer notification, and a regulatory reporting path. A simulation or tabletop within the last 12 months exercises the full response.

**Thai:** การยึดบัญชีและการฉ้อโกงการชำระเงินต้องมีสัญญาณตรวจจับ เจ้าของการส่งต่อ การแจ้งลูกค้า และเส้นทางการรายงานต่อหน่วยงานกำกับดูแล และต้องมีการจำลองหรือ tabletop ภายใน 12 เดือนที่ผ่านมาซึ่งทดสอบการตอบสนองทั้งหมด

- Criticality: `high`
- Status: `active`

Evidence:

- **document** (max 365 days): Fraud response plan, escalation matrix, and notification path
- **test_result** (max 365 days): Simulation or tabletop result for account takeover and payment fraud

## Overrides

- none

## Waivers

- none

## Sources

- `TH-PDPA-001`
- `TH-CPA-001`
- `TH-ETA-001`
- `TH-PAY-001`
- `TH-DPS-001`
- `TH-TECH-001`
- `TH-CYBER-001`

## Not covered

Consumer law advice, tax advice, marketplace liability, content moderation policy, card-brand certification, and legal interpretation.

**Thai:** คำแนะนำด้านกฎหมายผู้บริโภค ภาษี ความรับผิดของตลาดออนไลน์ นโยบายการกลั่นกรองเนื้อหา การรับรองจากเครือข่ายบัตร และการตีความกฎหมาย

## Review checklist

review-checklist.md

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
