---
translation_status: partial
machine_translated: true
---

# สรุปการนำร่องและการ triage

หน้านี้รวบรวมการนำร่องภายในสองครั้ง disposition ของทุก finding สถานะการทบทวน
ภายนอก และคำถามทางกฎหมายที่ยังเปิดอยู่ ครอบคลุม SRAS 0.8.0 และโปรเจกต์ synthetic
เท่านั้น

## สถานะ ณ 2026-10-28

- การนำร่องเสร็จ: 2 ครั้ง (การเงินและภาครัฐ)
- Findings: 18 — high 6, medium 8, low 4
- แก้ใน #59: 9
- เลื่อนพร้อม issue ติดตาม: 5
- คำถามกฎหมายที่เปิดอยู่: 4
- การทบทวนภายนอก: ยังไม่เริ่ม ยังไม่มีผู้ตรวจทานภายนอก

owner ยืนยันว่ายังไม่มีผู้ตรวจทานภายนอก หน้านี้บันทึกข้อเท็จจริงนั้นแทนการสร้างชื่อ
วันที่ หรือการ sign-off ที่ไม่มีจริง

## วิธีการ triage

ความรุนแรงสะท้อนผลต่อผู้อ่านหรือต่อ workflow ที่จัดทำเอกสารไว้ ไม่ใช่ปริมาณงานใน
การแก้

- **High:** อาจทำให้ผู้อ่านเข้าใจ coverage ผิดหรือทำให้ workflow ที่จัดทำเอกสารไว้
  ทำไม่ได้ ต้องแก้ก่อน stable release
- **Medium:** การตรวจสอบไม่ครบหรือข้อกำหนดคลุมเครือ ต้องแก้หรือติดตามพร้อม owner ที่
  ระบุชื่อก่อน stable release
- **Low:** เอกสารคลาดเคลื่อนหรือปัญหาเล็กที่มีทางแก้ชัดเจน

ทุก finding มี owner หนึ่งคน เนื่องจากมี maintainer คนเดียว owner คือ `@yutna` ทั้ง
18 finding finding จะไม่ถูกปิดด้วยความเงียบ: ต้องเป็น `fixed`, `deferred` พร้อม
issue หรือ `open legal question` พร้อม issue

## Findings

- **PF-01 — Finance, High.** ตัวอย่างด้านการเงินไม่ใช่ project instance ที่ถูกต้อง: ไม่มี manifest ไม่มี risk register และ lockfile เป็นรูปแบบเก่า. Owner @yutna. Disposition: แก้ใน #59
- **PF-02 — Finance, High.** ไม่มีคำสั่ง validate instance ที่แก้ไขแล้วหรือ refresh lockfile แม้เอกสารจะบอกให้ทำทั้งสองอย่าง. Owner @yutna. Disposition: เลื่อนไป #127
- **PF-03 — Finance, Medium.** ไม่มี CLI สำหรับ requirement resolution. Owner @yutna. Disposition: เลื่อนไป #126
- **PF-04 — Finance, High.** ตัวอย่างรายงานว่าประเมิน 8 ข้อกำหนดและ 6 gates แต่ selection resolve ได้ 122 ข้อกำหนดและ 46 gates. Owner @yutna. Disposition: แก้ใน #59
- **PF-05 — Finance, Medium.** freshness ของ evidence เป็นการประกาศเองและขัดกับ `expires_at` ได้. Owner @yutna. Disposition: แก้ใน #59
- **PF-06 — Finance, Medium.** หน้า concept ระบุว่า lockfile pin generator และ generation time แต่ไม่ได้เก็บทั้งสอง. Owner @yutna. Disposition: แก้ใน #59
- **PF-07 — Finance, Low.** ตัวอย่างในหน้า resolution ระบุว่า e2e lockfile pin 0.5.0 แต่จริง ๆ pin 0.8.0. Owner @yutna. Disposition: แก้ใน #59
- **PF-08 — Finance, Low.** `init` บันทึกวันที่เป็น UTC ผู้ใช้ในกรุงเทพฯ ก่อน 07:00 น. จึงได้วันก่อนหน้า. Owner @yutna. Disposition: แก้ใน #59
- **PF-09 — Finance, Low.** หน้ากาศการเงินระบุทะเบียนน้อยกว่าที่ overlay อ้างอิงจริง. Owner @yutna. Disposition: แก้ใน #59
- **PF-10 — Finance, Medium.** `TH-FIN-004` กำหนดให้มีระยะเวลาเก็บรักษาแต่ไม่ได้ระบุ. Owner @yutna. Disposition: คำถามกฎหมาย #129
- **PF-11 — Finance, Medium.** overlay ไม่ได้ระบุว่าการใช้ cloud แบบ material ต้องได้รับอนุมัติล่วงหน้าจาก ธปท. หรือไม่. Owner @yutna. Disposition: คำถามกฎหมาย #128
- **PS-01 — Public, High.** ตัวอย่างภาครัฐไม่ใช่ project instance ที่ถูกต้อง: ไม่มี manifest ไม่มี risk register และ lockfile เป็นรูปแบบเก่า. Owner @yutna. Disposition: แก้ใน #59
- **PS-02 — Public, High.** ตัวอย่างรายงานว่าประเมิน 7 ข้อกำหนดและ 6 gates แต่ selection resolve ได้ 112 ข้อกำหนดและ 47 gates. Owner @yutna. Disposition: แก้ใน #59
- **PS-03 — Public, Medium.** `TH-PUB-003` ไม่มีเป้าหมาย accessibility ขั้นต่ำ และไม่มีฟิลด์บันทึกเป้าหมายที่ตกลง. Owner @yutna. Disposition: คำถามกฎหมาย #131
- **PS-04 — Public, High.** schema ไม่มีฟิลด์สำหรับหน่วยงานผู้ว่าจ้างหรือเลขที่สัญญา. Owner @yutna. Disposition: เลื่อนไป #132
- **PS-05 — Public, Medium.** `TH-PUB-005` ไม่ได้ระบุชุด licence ที่ยอมรับสำหรับ open data. Owner @yutna. Disposition: คำถามกฎหมาย #130
- **PS-06 — Public, Low.** WCAG 2.2 ถูกอ้างโดย gate แต่ไม่มีรายการในทะเบียน. Owner @yutna. Disposition: เลื่อนไป #134
- **PS-07 — Public, Medium.** ไม่มีการตรวจความครบของประเภท evidence; gate เป็น `verified` ด้วย document เดียวได้. Owner @yutna. Disposition: เลื่อนไป #135

## รายละเอียด disposition

### แก้ใน #59

เก้า finding เป็นข้อบกพร่องด้านเนื้อหา ข้อมูล หรือ validation ที่เข้ากับ pipeline
เดิม:

- PF-01 และ PS-01: ทำให้ตัวอย่างภาคธุรกิจทั้งสี่เป็น project instance ที่สมบูรณ์
  และ parse ใน tests
- PF-04 และ PS-02: ระบุตัวหารของข้อกำหนดและ gate ที่ resolve ได้ในแต่ละตัวอย่าง
  และ test ว่าข้อความตรงกับชุดที่คำนวณได้
- PF-05: ปฏิเสธ `freshness_status: current` เมื่อ evidence หมดอายุก่อนวันประเมิน
- PF-06 และ PF-07: แก้คำอธิบาย lockfile และเวอร์ชันตัวอย่างที่ค้างในทั้งสองภาษา
- PF-08: ใช้วันตามปฏิทินท้องถิ่นเมื่อสร้าง instance
- PF-09: แก้รายการแหล่งอ้างอิงในหน้ากาศการเงิน

### เลื่อน

- **PF-02 → #127:** คำสั่ง validate และ lock refresh เป็น CLI surface ใหม่ ต้องมี
  design note, tests และ docs
- **PF-03 → #126:** resolution output และ coverage ต้องมี output contract และ
  ข้อสรุปเรื่อง gate failure
- **PS-04 → #132:** ฟิลด์หน่วยงานผู้ว่าจ้างเป็น schema change ที่ต้องมี migration
  note และรอบทบทวนของตัวเอง
- **PS-06 → #134:** รายการทะเบียนสำหรับมาตรฐานภายนอกที่สมัครใจต้องมีการตัดสิน
  นโยบายและแหล่งที่ตรวจสอบได้
- **PS-07 → #135:** evidence type coverage ต้องใช้ evidence map ของข้อกำหนดตอน
  validation และกฎเรื่องประเภททดแทน

ทุก finding ที่เลื่อนยังปรากฏในรายงานการนำร่อง ไม่มีข้อใดบล็อก release v0.9.0 และ
ไม่มีข้อใดเป็นการยกเว้น gate

## บันทึกการทบทวนภายนอก

สถานะ: รอดำเนินการ ยังไม่มีผู้ตรวจทานภายนอก ณ 2026-10-28

owner ยืนยันว่ายังไม่มีผู้ตรวจทาน repository ไม่บันทึกชื่อ หน่วยงาน วันที่ หรือ
sign-off ที่ไม่มีจริง

เมื่อมีผู้ตรวจทาน ต้องบันทึก:

- ชื่อและคุณสมบัติที่เกี่ยวข้อง โดยได้รับความยินยอม
- ขอบเขตที่ตรวจ (Core, overlay การเงิน, overlay ภาครัฐ, ทะเบียน, วิธีการนำร่อง
  หรือข้อจำกัด)
- วันที่ตรวจและเวอร์ชันที่ตรวจ
- ความเห็นแต่ละข้อพร้อมความรุนแรงและ disposition
- ผลประโยชน์ทับซ้อน ถ้ามี

จนกว่าจะมี:

- readiness review ในส่วน governance บันทึกว่าอยู่ระหว่างรอ
- ไม่มีหน้าใดอ้างว่ามีการทบทวนภายนอก peer review หรือการตรวจสอบอิสระ
- รายการทะเบียนยังเป็น `unverified`
- release notes ของ v0.9.0 ไม่กล่าวอ้างการทบทวนภายนอก

## คำถามทางกฎหมายที่เปิดอยู่

คำถามเหล่านี้มาจากการนำร่อง repository บันทึกไว้และไม่ตอบเอง ผู้ตรวจทานที่มี
คุณสมบัติต้องให้แหล่งอ้างอิงและขอบเขต

- **#129:** กฎหมายใดกำหนดระยะเวลาเก็บรักษาบันทึกธุรกรรมขั้นต่ำ และแตกต่างตามประเภท
  บริการหรือไม่ (`TH-FIN-004`)
- **#128:** การใช้ cloud หรือ outsourcing แบบ material ต้องแจ้งหรือขออนุมัติ
  ล่วงหน้าจากธนาคารแห่งประเทศไทยหรือไม่ (`TH-FIN-003`)
- **#131:** WCAG เวอร์ชันและระดับ conformance ใดใช้กับบริการภาครัฐไทย และแตกต่าง
  ตามประเภทหน่วยงานหรือไม่ (`TH-PUB-003`)
- **#130:** ข้อกำหนด licence ใดที่ยอมรับได้สำหรับข้อมูลเปิดภาครัฐ (`TH-PUB-005`)

ข้อกำหนดทั้งสี่คง `review_status: draft` ไม่มีการระบุระยะเวลา ขั้นตอนอนุมัติ ระดับ
conformance หรือ licence ในไลบรารี

## ข้อจำกัดของหลักฐานการนำร่อง

- การนำร่องสองครั้ง ผู้ประเมินหนึ่งคน ข้อมูล synthetic ไลบรารีหนึ่งเวอร์ชัน (0.8.0)
- ไม่ได้ประเมินโปรเจกต์จริง หลักฐานจริง หรือกระบวนการผลิตจริง
- ไม่ได้ทดสอบ lite profile, module ทั้งหมด, overlay ทั้งหมด หรือทะเบียน EU และ
  ASEAN
- ไม่มีผู้ตรวจทานภายนอกและไม่มีผู้ตรวจทานกฎหมายที่มีคุณสมบัติเข้าร่วม
- จำนวนที่ resolve ได้ขึ้นกับ tier และ selection จึงเป็นหลักฐานของตัวอย่างเท่านั้น
  ไม่ใช่ข้ออ้าง coverage โดยทั่วไป

## หน้าที่เกี่ยวข้อง

- [ภาพรวมการนำร่อง](index.md)
- [การนำร่องด้านการเงิน](finance.md)
- [การนำร่องภาครัฐ](public-sector.md)
- [สถานะการดำเนินงาน](https://github.com/yutna/software-delivery-assurance/issues/67)
