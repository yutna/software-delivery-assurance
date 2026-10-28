---
translation_status: partial
machine_translated: true
---

# การทบทวนความพร้อม v1.0.0

**สถานะ:** ฉบับร่าง การทบทวนภายนอกอยู่ระหว่างรอ การ sign-off ของ owner อยู่ระหว่างรอ
**เวอร์ชันที่ทบทวน:** SRAS 0.9.0
**วันที่:** 2026-10-28
**Owner:** `@yutna` ผู้ดูแล

การทบทวนนี้อธิบายว่าไลบรารีพร้อมสำหรับ v1.0.0 หรือไม่ ไม่ได้อ้างการทบทวนภายนอก
การทบทวนทางกฎหมาย หรือการรับรอง เมื่อยังไม่มีผู้ตรวจทาน รายการนั้นจะถูกบันทึกว่า
รอดำเนินการแทนการทำเครื่องหมายว่าเสร็จ

## Inputs

- [Pilot A — การเงิน](../pilots/finance.md) และ
  [Pilot B — ภาครัฐ](../pilots/public-sector.md)
- [สรุปและ triage การนำร่อง](../pilots/summary.md): 18 findings พร้อม owner และ
  disposition
- CI gates ของ v0.9.0, docs build และ `oss-kit doctor`
- สถานะการทบทวนของ Core, modules, overlays และทะเบียน

## ความพร้อมรายด้าน

- **Core requirements:** 70 ข้อ active ทั้งหมด `translation_status: partial` หลักฐาน: `validate --all`, `render --check` — ยังไม่พร้อม
- **Technical modules:** 52 ข้อ active ทั้งหมด `translation_status: partial` หลักฐาน: `validate --all`, `render --check` — ยังไม่พร้อม
- **Sector overlays:** 45 ข้อ active ทั้งหมด `translation_status: partial` หลักฐาน: `validate --all`, `render --check` — ยังไม่พร้อม
- **ทะเบียน:** 27 รายการ ทั้งหมด `review_status: unverified` หลักฐาน: แหล่งทางการและวันทบทวน — ยังไม่พร้อม
- **Crosswalks:** 7 mapping แบบ informative หลักฐาน: `validate --all` — พร้อม
- **Project template และ CLI:** ครบตามขอบเขตที่จัดทำเอกสาร หลักฐาน: tests, `init`, `render --check`, `guard` — พร้อมบางส่วน
- **เว็บไซต์สองภาษา:** 181 หน้า EN และ 28 หน้า TH หลักฐาน: `docs:build`, `check:docs`, link check — พร้อมบางส่วน
- **FDS และ TypeScript:** 43 skills pin 3.3.0 commit `4d3875c` หลักฐาน: `check:fds`, `typecheck`, `lint` — พร้อม
- **CI และ repository:** gates เขียวทั้งหมด doctor ไม่มี drift หลักฐาน: CI run, `oss-kit doctor` — พร้อม
- **การนำร่อง:** เสร็จ 2 ครั้ง 18 findings มี disposition หลักฐาน: รายงานและสรุป — พร้อม
- **การทบทวนภายนอก:** ยังไม่เริ่ม หลักฐาน: หน้านี้ — ยังไม่พร้อม

## สิ่งที่พร้อมแล้ว

- Core, modules, overlays, ทะเบียน, crosswalks, schemas, template และ CLI
  validate และ render ได้อย่าง deterministic
- การนำร่องสองครั้งเสร็จด้วยข้อมูล synthetic และทุก finding มี owner และ
  disposition
- เก้า finding แก้แล้วและตรวจด้วย tests ห้า finding เลื่อนพร้อม issue ติดตาม และ
  สี่ finding เป็นคำถามกฎหมายที่เปิดอยู่พร้อม issue
- เว็บไซต์สองภาษาสร้างได้ ลิงก์ภายใน resolve และ content guard ผ่าน
- FDS pack ถูก pin และตรวจสอบ ไม่มี Python tooling หรือ docs framework ที่สอง
- `oss-kit doctor` ไม่มี drift

## รายการที่บล็อก v1.0.0

1. **การแปลไทยยังไม่ผ่านการทบทวนโดยมนุษย์** ข้อกำหนด Core 70, module 52 และ
   overlay 45 ทั้งหมดเป็น `translation_status: partial` พร้อม
   `machine_translated: true` v1.0.0 กำหนดให้เนื้อหาไทยและอังกฤษของ Core และ
   module ที่ active สมบูรณ์ ต้องมีผู้ตรวจทานไทยที่ระบุชื่อทบทวนและทำเครื่องหมาย
   complete
2. **การทบทวนภายนอกยังไม่เริ่ม** ยังไม่มีผู้ตรวจทานภายนอก exit criteria ของ
   v0.9.0 กำหนดให้มีบันทึกการทบทวนภายนอก และการทบทวน v1.0.0 ต้อง triage บันทึก
   เหล่านั้น
3. **Finding ระดับ high สองรายการยังเลื่อนอยู่** #127 (validate และ refresh
   project instance) และ #132 (บันทึกหน่วยงานผู้ว่าจ้าง) กระทบข้ออ้างว่า template
   และ CLI stable ทั้งสองต้องมี design cycle หรือข้อจำกัดที่ยอมรับอย่างชัดเจนก่อน
   v1.0.0
4. **การ sign-off ความพร้อมอยู่ระหว่างรอ** maintainer ต้องลงนามในรายงานนี้หลัง
   รายการข้างต้นได้รับการแก้ไขหรือยอมรับอย่างชัดเจน
5. **Issue ที่เหลือของ v1.0.0 ยังเปิดอยู่** SRAS 1.0 ยังไม่ freeze governance ยัง
   ไม่ final audit และ doctor รอบสุดท้ายยังไม่ถูกเก็บถาวร และ release notes กับ
   announcement ยังไม่มี

## ข้อจำกัด

- ทะเบียนยังเป็น `unverified` หากไม่มีผู้ตรวจทานกฎหมายที่มีคุณสมบัติ ไลบรารี
  อธิบายแหล่งและข้อผูกพันได้ แต่ไม่อ้างความสอดคล้อง
- Overlay และข้อกำหนดยังเป็น `review_status: draft`
- ผู้ประเมินหนึ่งคนรันการนำร่องทั้งสองครั้ง และทั้งสองใช้ข้อมูล synthetic
- จำนวน coverage ของการนำร่องอธิบายตัวอย่าง ไม่ใช่การประเมินในระบบจริง

## ความพร้อมของ release v0.9.0

- **การนำร่องสองครั้งเสร็จ:** ผ่าน
- **บันทึกการทบทวนภายนอกเก็บและ triage แล้ว:** **ไม่ผ่าน — ยังไม่มีผู้ตรวจทาน**
- **Findings แก้หรือเลื่อนพร้อมเหตุผล:** ผ่าน
- **Owner sign-off ความพร้อม v1.0.0:** **รอดำเนินการ — owner sign-off**
- **`oss-kit doctor` ไม่มี drift:** ผ่าน
- **สร้าง release แล้ว:** ยังไม่เริ่ม

milestone v0.9.0 จะเปิดอยู่จนกว่าจะมีผู้ตรวจทานภายนอกและ owner ลงนามในรายงาน
ความพร้อม การ bump version และ release notes พร้อมใน pull request แล้ว แต่
milestone ยังไม่ถูกปิด

## บันทึกการทบทวนภายนอก

ยังไม่มีผู้ตรวจทานภายนอก ณ 2026-10-28 ไม่มีชื่อ หน่วยงาน วันที่ หรือ sign-off
ถูกบันทึกเพราะไม่มีจริง

เมื่อมีผู้ตรวจทาน จะบันทึก:

- ชื่อและคุณสมบัติที่เกี่ยวข้อง โดยได้รับความยินยอม
- ขอบเขตที่ตรวจ
- วันที่ตรวจและเวอร์ชัน
- ความเห็นแต่ละข้อพร้อมความรุนแรงและ disposition
- ผลประโยชน์ทับซ้อน

## Owner sign-off

**รอดำเนินการ** maintainer ยังไม่ได้ลงนามในรายงานนี้ Signature block จะบันทึกชื่อ
บทบาท วันที่ และเวอร์ชันที่ทบทวน หลังรายการที่บล็อกได้รับการแก้ไขหรือยอมรับอย่าง
ชัดเจน

## หน้าที่เกี่ยวข้อง

- [สรุปการนำร่อง](../pilots/summary.md)
- [สถานะการดำเนินงาน](https://github.com/yutna/software-delivery-assurance/issues/67)
- [นโยบาย governance](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
