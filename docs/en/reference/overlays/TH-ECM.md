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

Rationale:

Every extra system that touches card data expands the scope that must be protected and evidenced.

**Thai:** ทุกระบบเพิ่มเติมที่แตะข้อมูลบัตรจะขยายขอบเขตที่ต้องปกป้องและจัดทำหลักฐาน

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: The scope is documented and no card data sits outside it.
- Lite partial: The scope exists but some flows or stores are unclassified.
- Full L2: The scope is verified for every checkout and provider path.
- Full L3: Scope changes are reviewed automatically with deployment evidence.

Evidence:

- **document** (max 365 days): Payment card scope diagram and data-flow record
- **configuration** (max 180 days): Tokenisation or hosted payment configuration and storage rules
- **report** (max 365 days): Scope review after the last material checkout change

References:

- [Payment Systems Act B.E. 2560](https://law.go.th/DetailLawPage?table_of_law_id=9194) — `regulation`
- [PCI DSS 4.0.1](https://www.pcisecuritystandards.org/standards/) — `standard`

Crosswalks:

- none

### TH-ECM-002 — Checkout degradation is planned and communicated

Critical checkout journeys have a defined degraded mode for payment-provider or inventory failure. The mode is tested, does not silently lose orders, and shows the customer what happened and what happens next.

**Thai:** เส้นทาง checkout ที่สำคัญมีโหมดลดระดับที่กำหนดไว้สำหรับความล้มเหลวของผู้ให้บริการชำระเงินหรือระบบสต็อก โหมดนี้ต้องผ่านการทดสอบ ไม่ทำให้คำสั่งซื้อหายไปโดยไม่แจ้ง และแสดงให้ลูกค้าเห็นว่าเกิดอะไรขึ้นและจะเกิดอะไรต่อไป

Rationale:

A checkout that fails silently loses revenue and leaves the customer without a recoverable state.

**Thai:** checkout ที่ล้มเหลวโดยไม่แจ้งทำให้สูญเสียรายได้และลูกค้าไม่มีสถานะที่กู้คืนได้

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Degraded mode is documented, tested, and communicated.
- Lite partial: A mode exists but the test or message is incomplete.
- Full L2: Failure paths are exercised for each critical checkout step.
- Full L3: Degradation is measured with order-loss and recovery metrics.

Evidence:

- **document** (max 365 days): Degraded-mode design and customer messaging for checkout
- **test_result** (max 365 days): Failure injection or game-day result for checkout degradation

References:

- [Bank of Thailand payment IT risk notification No. สนช. 1/2564](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2564/ThaiPDF/25640024.pdf) — `regulation`

Crosswalks:

- none

### TH-ECM-003 — Checkout failures do not create duplicate charges

Payment attempts are idempotent and reconciled with the provider. A retry, timeout, or browser refresh cannot create a duplicate charge, and a duplicate is detected and reversed through a documented path.

**Thai:** การพยายามชำระเงินต้อง idempotent และกระทบยอดกับผู้ให้บริการ การลองใหม่ การหมดเวลา หรือการรีเฟรชเบราว์เซอร์ต้องไม่ทำให้เกิดการเรียกเก็บซ้ำ และหากเกิดการเรียกเก็บซ้ำต้องตรวจจับและคืนเงินผ่านเส้นทางที่กำหนด

Rationale:

Duplicate charges are a direct customer harm and a common failure mode under retry.

**Thai:** การเรียกเก็บซ้ำสร้างความเสียหายโดยตรงต่อลูกค้าและเป็นรูปแบบความล้มเหลวที่พบบ่อยเมื่อมีการลองใหม่

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Retries are idempotent and a reconciliation check exists.
- Lite partial: Idempotency exists but reconciliation or reversal is manual.
- Full L2: Duplicate prevention and reversal are tested for every payment path.
- Full L3: Duplicate and reversal rates are measured and reviewed.

Evidence:

- **test_result** (max 180 days): Retry, timeout, and refresh tests that check for duplicate charges
- **log** (max 90 days): Payment reconciliation exception report and reversal record
- **document** (max 365 days): Idempotency and duplicate-reversal procedure

References:

- [Payment Systems Act B.E. 2560](https://law.go.th/DetailLawPage?table_of_law_id=9194) — `regulation`
- [Bank of Thailand payment IT risk notification No. สนช. 1/2564](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2564/ThaiPDF/25640024.pdf) — `regulation`

Crosswalks:

- none

### TH-ECM-004 — Order, price, and promotion changes are auditable and reversible

Changes to orders, prices, discounts, and promotions record the actor, time, reason, and before-and-after values. A change can be reversed, and customer-visible changes are reflected consistently in the order record.

**Thai:** การเปลี่ยนแปลงคำสั่งซื้อ ราคา ส่วนลด และโปรโมชันต้องบันทึกผู้ดำเนินการ เวลา เหตุผล และค่าก่อนและหลัง การเปลี่ยนแปลงต้องย้อนกลับได้ และการเปลี่ยนแปลงที่ลูกค้าเห็นต้องสะท้อนในบันทึกคำสั่งซื้ออย่างสอดคล้อง

Rationale:

Price and promotion errors are hard to investigate without an attributable change record.

**Thai:** ข้อผิดพลาดด้านราคาและโปรโมชันตรวจสอบได้ยากหากไม่มีบันทึกการเปลี่ยนแปลงที่ระบุผู้รับผิดชอบ

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Order and price changes are logged and reversible.
- Lite partial: Logging exists but reversal or customer correction is manual.
- Full L2: Changes are attributable and reversible for every channel.
- Full L3: Price and promotion exceptions are measured and reviewed.

Evidence:

- **log** (max 90 days): Change log with actor, time, reason, and before-and-after values
- **document** (max 365 days): Reversal procedure and customer-correction policy

References:

- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`
- [Consumer Protection Act B.E. 2522](https://law.go.th/DetailLawPage?table_of_law_id=9263) — `regulation`

Crosswalks:

- none

### TH-ECM-005 — Refund and cancellation states agree across systems

Refund, return, and cancellation states are consistent between the platform, payment provider, and fulfilment systems. Orphan or stuck states are detected, reconciled, and communicated to the customer within the stated service target.

**Thai:** สถานะการคืนเงิน การคืนสินค้า และการยกเลิกต้องสอดคล้องกันระหว่างแพลตฟอร์ม ผู้ให้บริการชำระเงิน และระบบ fulfilment สถานะที่ค้างหรือไม่ตรงกันต้องถูกตรวจจับ กระทบยอด และแจ้งให้ลูกค้าทราบภายในเป้าหมายการให้บริการที่กำหนด

Rationale:

A refund that exists in one system and not another becomes a dispute and a trust loss.

**Thai:** การคืนเงินที่มีอยู่ในระบบหนึ่งแต่ไม่มีในอีกระบบจะกลายเป็นข้อโต้แย้งและสูญเสียความเชื่อมั่น

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Refund states are reconciled and stuck states are handled.
- Lite partial: Reconciliation is manual or the customer update is missing.
- Full L2: State transitions are tested across every payment and fulfilment path.
- Full L3: Refund timeliness and mismatch rates are measured.

Evidence:

- **test_result** (max 180 days): End-to-end refund and cancellation state-transition tests
- **log** (max 90 days): Reconciliation report for stuck or mismatched refund states
- **document** (max 365 days): Refund and cancellation state model and service target

References:

- [Consumer Protection Act B.E. 2522](https://law.go.th/DetailLawPage?table_of_law_id=9263) — `regulation`
- [Payment Systems Act B.E. 2560](https://law.go.th/DetailLawPage?table_of_law_id=9194) — `regulation`

Crosswalks:

- none

### TH-ECM-006 — Consumer disclosures and consent are shown before purchase

Price, fees, delivery terms, cancellation and refund terms, and marketing consent are shown before the customer confirms a purchase. The version shown is recorded with the order, and consent is separate from the purchase terms.

**Thai:** ราคา ค่าธรรมเนียม เงื่อนไขการจัดส่ง เงื่อนไขการยกเลิกและคืนเงิน และความยินยอมด้านการตลาดต้องแสดงก่อนที่ลูกค้าจะยืนยันการซื้อ เวอร์ชันที่แสดงต้องถูกบันทึกพร้อมคำสั่งซื้อ และความยินยอมต้องแยกจากเงื่อนไขการซื้อ

Rationale:

Disclosure that appears after payment cannot support an informed purchase decision.

**Thai:** การเปิดเผยข้อมูลที่ปรากฏหลังการชำระเงินไม่สามารถสนับสนุนการตัดสินใจซื้ออย่างมีข้อมูลได้

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Disclosures and consent appear before purchase and are recorded.
- Lite partial: Disclosures exist but consent is bundled with purchase terms.
- Full L2: Every material fee and term is disclosed and versioned per order.
- Full L3: Disclosure comprehension and complaint trends are measured.

Evidence:

- **screenshot** (max 180 days): Checkout screens showing price, fees, terms, and consent
- **document** (max 365 days): Disclosure and consent version register linked to orders
- **log** (max 90 days): Consent record sample with version and timestamp

References:

- [Consumer Protection Act B.E. 2522](https://law.go.th/DetailLawPage?table_of_law_id=9263) — `regulation`
- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`
- [Royal Decree on Digital Platform Services B.E. 2565](https://www.etda.or.th/th/regulator/Digitalplatform/law.aspx) — `regulation`

Crosswalks:

- none

### TH-ECM-007 — Customer accounts are protected against takeover

High-risk account actions require step-up authentication. Credential-stuffing controls, session management, breached-password checks, and a verified account-recovery path are in place and tested.

**Thai:** การดำเนินการในบัญชีที่มีความเสี่ยงสูงต้องมี step-up authentication มีมาตรการป้องกัน credential stuffing การจัดการ session การตรวจสอบรหัสผ่านที่รั่วไหล และเส้นทางการกู้คืนบัญชีที่ผ่านการยืนยัน และต้องผ่านการทดสอบ

Rationale:

Account takeover turns a customer account into a fraud and data-loss path.

**Thai:** การยึดบัญชีเปลี่ยนบัญชีลูกค้าเป็นช่องทางการฉ้อโกงและการสูญเสียข้อมูล

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: High-risk actions are step-up protected and recovery is verified.
- Lite partial: Controls exist but recovery or detection is incomplete.
- Full L2: Controls are tested for every account and recovery path.
- Full L3: Takeover attempts and outcomes are measured and reviewed.

Evidence:

- **configuration** (max 180 days): Step-up authentication, session, and recovery configuration
- **test_result** (max 180 days): Credential-stuffing and account-recovery tests
- **log** (max 90 days): Account takeover detection and response log sample

References:

- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`
- [Emergency Decree on Technology Crimes B.E. 2566](https://law.go.th/DetailLawPage?table_of_law_id=12199) — `regulation`

Crosswalks:

- none

### TH-ECM-008 — Marketing consent is recorded and can be withdrawn

Marketing consent is purpose-specific, opt-in, recorded with its version and timestamp, and can be withdrawn through a path that updates every sending system. Suppression is checked before each campaign.

**Thai:** ความยินยอมด้านการตลาดต้องเจาะจงวัตถุประสงค์ เป็นการเลือกเข้า บันทึกพร้อมเวอร์ชันและเวลา และถอนได้ผ่านเส้นทางที่อัปเดตทุกระบบที่ส่งข้อความ ต้องตรวจสอบ suppression ก่อนทุกแคมเปญ

Rationale:

Consent that cannot be withdrawn or is not honoured across systems is not consent in practice.

**Thai:** ความยินยอมที่ถอนไม่ได้หรือไม่ถูกปฏิบัติในทุกระบบไม่ใช่ความยินยอมในทางปฏิบัติ

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Consent is recorded, withdrawable, and honoured by senders.
- Lite partial: Consent is recorded but withdrawal propagation is manual.
- Full L2: Withdrawal updates every sender and is verified before campaigns.
- Full L3: Consent and complaint rates are measured by purpose.

Evidence:

- **log** (max 90 days): Consent and withdrawal record with version and timestamp
- **document** (max 365 days): Consent purpose register and suppression procedure

References:

- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`
- [Royal Decree on Digital Platform Services B.E. 2565](https://www.etda.or.th/th/regulator/Digitalplatform/law.aspx) — `regulation`

Crosswalks:

- none

### TH-ECM-009 — Partner API access is authenticated, limited, and revocable

Every partner integration has scoped credentials, authenticated requests, rate limits, monitoring, and a revocation path. Partner onboarding records due diligence, contract terms, and a test path before production access.

**Thai:** การเชื่อมต่อของพาร์ทเนอร์ทุกรายต้องมี credential ที่จำกัดขอบเขต คำขอที่ผ่านการยืนยันตัวตน rate limit การติดตาม และเส้นทางเพิกถอน การ onboard พาร์ทเนอร์ต้องบันทึก due diligence เงื่อนไขสัญญา และเส้นทางทดสอบก่อนเข้าสู่ production

Rationale:

A partner credential without scope or revocation is a standing door into order and payment data.

**Thai:** credential ของพาร์ทเนอร์ที่ไม่มีขอบเขตหรือเพิกถอนไม่ได้เป็นประตูถาวรสู่ข้อมูลคำสั่งซื้อและการชำระเงิน

- Criticality: `gate`
- Status: `active`

Assessment:

- Lite pass: Partner access is scoped, authenticated, limited, and revocable.
- Lite partial: Authentication exists but scope or revocation is incomplete.
- Full L2: Every partner integration is tested and reviewed before access.
- Full L3: Partner access is monitored with anomaly detection and periodic review.

Evidence:

- **configuration** (max 180 days): Partner credential scope, rate limit, and revocation configuration
- **log** (max 90 days): Partner API access and anomaly log sample
- **contract** (max 365 days): Partner agreement with security, data, and exit terms

References:

- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`
- [Royal Decree on Digital Platform Services B.E. 2565](https://www.etda.or.th/th/regulator/Digitalplatform/law.aspx) — `regulation`

Crosswalks:

- none

### TH-ECM-010 — Customer-facing flows meet the agreed accessibility target

Critical customer journeys meet the agreed accessibility target for the named WCAG version. Automated and manual checks cover search, product, cart, checkout, payment, and account recovery, and findings are remediated on a tracked plan.

**Thai:** เส้นทางลูกค้าที่สำคัญต้องเป็นไปตามเป้าหมาย accessibility ที่ตกลงสำหรับเวอร์ชัน WCAG ที่ระบุ การตรวจสอบอัตโนมัติและด้วยมนุษย์ครอบคลุมการค้นหา สินค้า ตะกร้า checkout การชำระเงิน และการกู้คืนบัญชี และข้อบกพร่องต้องได้รับการแก้ไขตามแผนที่ติดตามได้

Rationale:

Accessibility declared only on a policy page does not reach the journeys where customers fail.

**Thai:** accessibility ที่ประกาศเพียงหน้านโยบายไม่ครอบคลุมเส้นทางที่ลูกค้าใช้งานจริงไม่สำเร็จ

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Critical journeys meet the target and findings have a plan.
- Lite partial: Some critical journeys are untested or defects are open.
- Full L2: Every critical journey is tested against the named WCAG version.
- Full L3: Accessibility regressions are prevented in the release pipeline.

Evidence:

- **test_result** (max 180 days): Automated and manual accessibility results for critical journeys
- **report** (max 365 days): Accessibility remediation plan with owners and dates

References:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — `standard`
- [Consumer Protection Act B.E. 2522](https://law.go.th/DetailLawPage?table_of_law_id=9263) — `regulation`

Crosswalks:

- none

### TH-ECM-011 — Order and dispute records are retained and retrievable

Order, payment, refund, cancellation, and dispute records are retained for the period set by policy and applicable rules, protected against unauthorised change, and retrievable within the service target for a customer or authority request.

**Thai:** บันทึกคำสั่งซื้อ การชำระเงิน การคืนเงิน การยกเลิก และข้อพิพาทต้องเก็บรักษาตามระยะเวลาที่นโยบายและกฎเกณฑ์ที่ใช้บังคับกำหนด ปกป้องจากการเปลี่ยนแปลงโดยไม่ได้รับอนุญาต และเรียกดูได้ภายในเป้าหมายการให้บริการสำหรับคำขอของลูกค้าหรือหน่วยงาน

Rationale:

A dispute that cannot be reconstructed from records cannot be resolved fairly or consistently.

**Thai:** ข้อพิพาทที่ไม่สามารถสร้างใหม่จากบันทึกได้ไม่สามารถแก้ไขอย่างเป็นธรรมหรือสม่ำเสมอ

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: Records are retained, integrity-protected, and retrievable.
- Lite partial: Retention exists but retrieval or integrity has gaps.
- Full L2: Retention and retrieval are tested for every record type.
- Full L3: Retrieval timeliness is measured against the service target.

Evidence:

- **document** (max 365 days): Retention schedule and retrieval procedure for order and dispute records
- **configuration** (max 180 days): Retention, integrity, and access configuration for order records
- **log** (max 180 days): Retrieval test result within the service target

References:

- [Electronic Transactions Act B.E. 2544](https://law.go.th/DetailLawPage?table_of_law_id=8937) — `regulation`
- [Consumer Protection Act B.E. 2522](https://law.go.th/DetailLawPage?table_of_law_id=9263) — `regulation`

Crosswalks:

- none

### TH-ECM-012 — Account takeover and payment fraud have a tested response

Account takeover and payment fraud have detection signals, an escalation owner, customer notification, and a regulatory reporting path. A simulation or tabletop within the last 12 months exercises the full response.

**Thai:** การยึดบัญชีและการฉ้อโกงการชำระเงินต้องมีสัญญาณตรวจจับ เจ้าของการส่งต่อ การแจ้งลูกค้า และเส้นทางการรายงานต่อหน่วยงานกำกับดูแล และต้องมีการจำลองหรือ tabletop ภายใน 12 เดือนที่ผ่านมาซึ่งทดสอบการตอบสนองทั้งหมด

Rationale:

Fraud response that is assembled during an incident is slower and less consistent.

**Thai:** การตอบสนองต่อการฉ้อโกงที่ประกอบขึ้นระหว่างเหตุการณ์จะช้ากว่าและสม่ำเสมอน้อยกว่า

- Criticality: `high`
- Status: `active`

Assessment:

- Lite pass: The response is documented and exercised in the last 12 months.
- Lite partial: The plan exists but the exercise is overdue or incomplete.
- Full L2: The response is exercised with support, payments, and communications.
- Full L3: Detection and response outcomes are measured against real incidents.

Evidence:

- **document** (max 365 days): Fraud response plan, escalation matrix, and notification path
- **test_result** (max 365 days): Simulation or tabletop result for account takeover and payment fraud

References:

- [Emergency Decree on Technology Crimes B.E. 2566](https://law.go.th/DetailLawPage?table_of_law_id=12199) — `regulation`
- [Personal Data Protection Act B.E. 2562](https://law.go.th/DetailLawPage?table_of_law_id=8668) — `regulation`
- [Bank of Thailand payment IT risk notification No. สนช. 1/2564](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2564/ThaiPDF/25640024.pdf) — `regulation`

Crosswalks:

- none

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
