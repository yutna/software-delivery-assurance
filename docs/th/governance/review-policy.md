---
translation_status: partial
machine_translated: true
---

# นโยบายการทบทวน

**สถานะ:** นโยบาย governance สำหรับ milestone v1.0.0, สายงานดูแล v1.x และการ
เตรียม v2.0 **บันทึกเมื่อ:** 2026-10-28 **ใช้กับ:** เนื้อหา SRAS 0.9.0 เป็นต้นไป

หน้านี้เป็นนโยบายการทบทวนฉบับละเอียด
[GOVERNANCE.md](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
เป็นฉบับสรุปที่มีผลบังคับ นโยบายนี้อธิบายวิธีบันทึกการทบทวน
ไม่ได้สร้างการทบทวน ผู้ทบทวน วันที่ หรือ sign-off ที่ไม่มีอยู่จริง

นโยบายพร้อมก่อน release เนื้อหายังเป็น SRAS 0.9.0 milestone v1.0.0 ยังเปิดอยู่
และ formal-standard track ยังไม่พร้อม
[การทบทวนความพร้อม v1.0.0](v1-readiness.md) บันทึก blocker ไว้

## สามคำถามที่แตกต่างกัน

ผู้อ่านต้องแยกสามเรื่องนี้:

- **`review_status`** ตอบว่าเนื้อหาถูกทบทวนโดยผู้ทบทวนที่มีคุณสมบัติหรือยัง
  และผู้ทบทวนคือใคร
- **`translation_status` และ `machine_translated`** ตอบว่าข้อความไทยเป็นร่างที่
  เครื่องช่วยหรือคำแปลที่มนุษย์ยืนยันแล้ว
- **[Confidence labels](confidence-labels.md)** ตอบว่าข้อความใน prose เป็น
  checked, documented, provisional หรือ planned

ทั้งสามอย่างใช้แทนกันไม่ได้ ป้าย `checked` ไม่ได้ทำให้เนื้อหาเป็น `reviewed`
คำแปลที่ complete ไม่ได้ทำให้เนื้อหาถูกทบทวนทางกฎหมาย
และสถานะการทบทวนไม่ใช่การรับรอง

## สถานะการทบทวนเนื้อหา

- **`draft`** — กำลังเขียนและยังไม่พร้อมประเมิน ผู้เขียนเป็นผู้ตั้งได้
  และยังไม่มีบันทึกการทบทวน
- **`unverified`** — เผยแพร่เป็นข้อมูลอ้างอิงแต่ยังไม่ผ่านผู้ทบทวนที่มี
  คุณสมบัติ maintainer ตั้งได้หลังจากเนื้อหาและแหล่งอ้างอิงมีแล้ว
  และข้อจำกัดต้องมองเห็นได้
- **`reviewed`** — ผู้ทบทวนมนุษย์ที่มีชื่อตรวจขอบเขตที่บันทึกไว้แล้ว
  ต้องมีชื่อผู้ทบทวน วันที่ ขอบเขต เวอร์ชัน findings และข้อจำกัด
  maintainer เป็นผู้บันทึก

บันทึกการทบทวนไม่ใช่ชื่อไฟล์หรือ commit ต้องระบุบุคคล วันที่ ขอบเขต เวอร์ชันที่
ทบทวน สิ่งที่ตรวจ สิ่งที่ไม่ได้ตรวจ และข้อจำกัด หากฟิลด์ใดหายไป สถานะต้องคงเป็น
`draft` หรือ `unverified`

AI execution agent อาจร่าง แก้ไข ทดสอบ และ self-review เนื้อหาได้
งานนั้นบันทึกเป็น AI review ไม่ใช่ human review ไม่ใช่ external review
และไม่ใช่ legal review และไม่เปลี่ยน `review_status` เป็น `reviewed`

## สถานะการทบทวนคำแปล

- **`partial`** — คำแปลยังไม่ครบหรือเครื่องช่วยและยังไม่ได้รับการยืนยันจากมนุษย์
  ผู้เขียนหรือ maintainer ตั้งได้
- **`complete`** — ผู้ทบทวนมนุษย์ที่มีชื่อยืนยันคำแปลตามขอบเขตที่บันทึก
  ต้องมีชื่อ วันที่ และขอบเขต และ maintainer เป็นผู้บันทึก
- **`machine_translated: true`** — เครื่องสร้างหรือช่วยสร้างข้อความ
  ต้องคง `partial` จนกว่ามนุษย์จะยืนยัน ผู้เขียนหรือ maintainer ตั้งได้

`translation_status: complete` และ `machine_translated: false` ต้องมีชื่อ
ผู้ทบทวนมนุษย์ วันที่ และขอบเขต AI execution agent ตั้งคำแปลเป็น complete
แทนมนุษย์ไม่ได้ คำแปลที่ขัดเกลาด้วยเครื่องยังเป็นคำแปลโดยเครื่อง
จนกว่ามนุษย์จะยืนยันความหมาย คำศัพท์ และ glossary

ภาษาอังกฤษเป็นฉบับหลักสำหรับ identifier, schema key และชื่อไฟล์
หน้าไทยเผยแพร่เป็น `partial` พร้อมแบนเนอร์คำแปลได้
แต่ห้ามนำเสนอว่าเป็นคำแปลที่มนุษย์ทบทวนแล้ว

## ประเภทการทบทวน

- **AI drafting และ self-review** — AI execution agent ร่างข้อความ tests และ
  AI review ที่บันทึกได้ แต่อ้าง human review, external review หรือ legal review
  ไม่ได้ สถานะปัจจุบันคือบันทึกสำหรับขั้นตอนทบทวน v0.9.0
- **Maintainer content review** — `@yutna` ในฐานะ maintainer ตั้ง
  `review_status` ตามขอบเขตที่ทบทวน แต่อ้างความเป็นอิสระ external review หรือ
  legal review ไม่ได้ ใช้กับการตัดสินใจของ repository
- **Human Thai translation review** — ผู้ทบทวนภาษาไทยที่มีชื่อตั้ง
  `translation_status: complete` ตามขอบเขต แต่อ้าง legal review หรือ
  external review ไม่ได้ สถานะปัจจุบันคือยังไม่ได้ทำ
- **Qualified legal review** — ผู้ทบทวนกฎหมายที่มีคุณสมบัติและมีชื่อบันทึก
  legal review ตามขอบเขต แต่อ้างความเห็นทางกฎหมายเฉพาะโปรเจกต์ของผู้อ่านทุกคน
  ไม่ได้ สถานะปัจจุบันคือยังไม่ได้ทำ
- **External independent review** — ผู้ทบทวนที่มีชื่อและเป็นอิสระจาก
  maintainer บันทึก external review ตามขอบเขตที่ตกลง แต่อ้างการรับรอง การ
  accredite หรือการอนุมัติจากหน่วยงานกำกับไม่ได้ สถานะปัจจุบันคือยังไม่ได้ทำ
- **Release audit** — maintainer ร่วมกับ execution agent บันทึกหลักฐาน audit
  และ gap report แต่อ้าง release ไม่ได้หากยังมี blocker สถานะปัจจุบันคือกำลังทำ
  gap report

การทบทวนที่ไม่มีอยู่บันทึกว่าไม่มี repository ไม่สร้างชื่อผู้ทบทวน วันที่ หรือ
sign-off เพื่อทำให้ตารางครบ

## วิธีบันทึกการทบทวน

บันทึกการทบทวนมี:

- ชื่อและบทบาทของผู้ทบทวน และระบุว่าเป็นอิสระหรือไม่
- วันที่และเวอร์ชันเนื้อหา
- ไฟล์ ข้อกำหนด module overlay register หรือหน้าที่ทบทวน
- วิธีและแหล่งอ้างอิงที่ใช้
- findings และการจัดการ
- สิ่งที่การทบทวนไม่ได้ครอบคลุม
- ค่า `review_status`, `translation_status` และ `machine_translated` ที่ได้

บันทึกอาจอยู่ใน object ที่ทบทวน ฟิลด์ YAML ที่ link ไว้ หรือหน้าที่ลงวันที่
placeholder ต้องติดป้ายว่าเป็น placeholder และไม่ใช่การทบทวน:

```text
Reviewer: <named human reviewer>
Date: <date>
Scope: <files and version>
Result: <findings and disposition>
Limitations: <what was not reviewed>
```

ห้ามเติม placeholder ด้วยชื่อ AI ชื่อตำแหน่ง หรือวันที่ที่ไม่มีการทบทวนจริง

## Checklists

### Content review checklist

- [ ] การเปลี่ยนแปลงมี issue พร้อมขอบเขตและ acceptance criteria
- [ ] เนื้อหาเป็นข้อเท็จจริง ทดสอบได้เมื่อเกี่ยวข้อง และมี negative case
- [ ] แหล่งอ้างอิงเป็นทางการและใหม่พอสำหรับขอบเขตที่ทบทวน
- [ ] ไม่มีการเพิ่มข้อความรับรอง compliance การอนุมัติ หรือการรับประกัน
- [ ] ไม่มีชื่อลูกค้า หลักฐานจริง secret หรือ endpoint ส่วนตัว
- [ ] บันทึกการทบทวนระบุชื่อผู้ทบทวน วันที่ ขอบเขต และเวอร์ชัน
      หรือสถานะคงเป็น `draft` หรือ `unverified`

### Translation review checklist

- [ ] ภาษาอังกฤษยังเป็นฉบับหลักสำหรับ identifier, schema key และชื่อไฟล์
- [ ] หน้าไทยมีผู้ทบทวนภาษาไทยสำหรับขอบเขตที่ทบทวน
- [ ] ผู้ทบทวนตรวจความหมาย คำศัพท์ และ glossary ไม่ใช่แค่ไวยากรณ์
- [ ] `translation_status` และ `machine_translated` ตรงกับหลักฐาน
- [ ] ไม่มีหน้าใดถูกทำเป็น complete เพราะเครื่องหรือ AI สร้าง

### External review checklist

- [ ] ผู้ทบทวนมีชื่อ เป็นอิสระจาก maintainer และได้รับมอบหมายขอบเขตที่บันทึก
- [ ] บันทึกระบุสิ่งที่ทบทวนและสิ่งที่ไม่ได้ทบทวน
- [ ] เผยแพร่ผลการทบทวนโดยได้รับอนุญาตจากผู้ทบทวน
- [ ] การทบทวนที่ไม่มีอยู่บันทึกว่าไม่มี ห้ามสร้างชื่อ วันที่ หรือ sign-off

### Release review checklist

- [ ] issue ของ milestone ปิดครบและขอบเขต milestone เสร็จ
- [ ] เวอร์ชันสอดคล้องกันใน `package.json`, `package-lock.json`,
      `src/sras/version.ts`, `CITATION.cff`, `core/sras.yaml` และ docs config
- [ ] `ci-ok` และ `pr-check / check` เขียวบน `main`
- [ ] `oss-kit doctor` รายงานว่าไม่มีความคลาดเคลื่อน
- [ ] หลักฐาน audit ถูกโพสต์ใน dashboard issue
- [ ] สถานะคำแปลและการทบทวนตรงกับขอบเขต release หรือ release ยังถูกบล็อก
- [ ] release notes และ announcement link ไปยัง audit และไม่มีข้อความรับรอง
      legal compliance หรือ sector ที่อยู่นอกขอบเขต

## การดูแลและการเลิกใช้

สายงาน v1.x เป็นการเพิ่มแบบย้อนหลังได้ (additive) และรักษาความเข้ากันได้
minor release เพิ่มข้อกำหนด module overlay register crosswalk command ฟิลด์
ทางเลือก และเอกสารได้ แต่ต้องไม่ลบข้อกำหนด เปลี่ยน ID ยกเว้น gate หรือทำให้
project instance ที่ถูกต้องใช้ไม่ได้ โดยไม่มี migration note

ข้อกำหนดที่เลิกใช้ต้องมี `status: deprecated`, `deprecated_in` และ replacement
และมองเห็นได้อย่างน้อยหนึ่ง minor release v2.0 ลบได้เมื่อมี migration guide และ
deprecation notice มาก่อน Security และ correctness fix ออกนอกจังหวะได้
แต่ยังต้องผ่าน issue pull request CI และ squash merge

maintainer ดูแลสาย v1.x ล่าสุดแบบ best effort ไม่มี service-level agreement
และไม่รับประกันว่าแหล่งอ้างอิงภายนอกจะยังเป็นปัจจุบันระหว่างรอบทบทวน
กฎฉบับละเอียดอยู่ใน
[GOVERNANCE.md](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
หัวข้อ "Maintenance and deprecation"

## รอบการทบทวน

ทะเบียนประเทศไทยทบทวนอย่างน้อยทุก 6 เดือน ทะเบียนอาเซียนและสหภาพยุโรปทบทวน
อย่างน้อยทุก 12 เดือน Core ทบทวนปีละครั้ง เหตุการณ์สำคัญ การเปลี่ยนสถาปัตยกรรม
เขตอำนาจใหม่ และ major release กระตุ้นให้ทบทวนเร็วขึ้น

## ไม่มีการรับรองหรือข้ออ้าง compliance

ไม่มีประเภทการทบทวนใดในนโยบายนี้ที่สร้างการรับรอง การ accredite audit
attestation การอนุมัติจากหน่วยงานกำกับ หรือข้อสรุปทางกฎหมาย
บันทึกการทบทวนระบุว่าผู้ทบทวนที่มีชื่อตรวจอะไร
ไม่ได้ระบุว่าผลิตภัณฑ์ โปรเจกต์ หรือ library compliant กับกฎหมายหรือมาตรฐานใด

## หน้าที่เกี่ยวข้อง

- [การทบทวนความพร้อม v1.0.0](v1-readiness.md)
- [ความพร้อมของ template](template-readiness.md)
- [Confidence labels](confidence-labels.md)
- [ข้อกังวลทางกฎหมาย](legal-concerns.md)
- [External review packet](external-review-packet.md)
- [Thai review kit](thai-review-kit.md)
- [GOVERNANCE.md](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
- [CONTRIBUTING.md](https://github.com/yutna/software-delivery-assurance/blob/main/CONTRIBUTING.md)
