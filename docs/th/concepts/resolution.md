---
translation_status: partial
machine_translated: true
---

# Resolution

Resolution คือวิธีที่ project instance เปลี่ยน scope ให้เป็นชุดข้อกำหนดที่ใช้
ลำดับถูกกำหนดตายตัว เพื่อให้ผู้ประเมินสองคนที่มี input เดียวกันได้ชุดเดียวกัน

## ลำดับการ resolve

```text
SRAS Core
  -> module ที่เลือก
  -> overlay ตามเขตอำนาจ
  -> overlay ตามอุตสาหกรรม
  -> project addition
```

กฎ

- ทุกชั้นที่ใช้มีผล ชั้นต่าง ๆ ไม่ได้แยกจากกัน
- เมื่อสองชั้นขัดแย้งกัน ข้อกำหนดที่เข้มงวดกว่าชนะ
- project addition เพิ่มข้อกำหนดหรือทำให้ข้อกำหนดเดิมเข้มขึ้นได้ แต่ไม่ลดทอน
  มาตรฐานสาธารณะ
- project addition อยู่ใน project instance ส่วนตัว และไม่ไหลกลับเข้า
  repository สาธารณะ

## เข้มงวดกว่าชนะ

ความขัดแย้งไม่ถูกแก้ด้วยลำดับเอกสารหรือไฟล์ที่อ่านทีหลัง ให้เปรียบเทียบ
ข้อกำหนดและเก็บผลลัพธ์ที่เข้มงวดกว่า หากเปรียบเทียบไม่ชัดเจน ให้บันทึกเหตุผลใน
assessment notes และ risk register

ตัวอย่างความขัดแย้ง

- Core กำหนดทบทวนปีละครั้ง overlay กำหนดปีละสองครั้ง ปีละสองครั้งชนะ
- module กำหนด test result ภายใน 180 วัน overlay กำหนด 365 วัน ข้อกำหนด
  180 วันชนะ
- overlay ยกเว้นข้อกำหนดที่ไม่ใช่ gate ซึ่ง module ระบุไว้ด้วย การยกเว้นมีผล
  เฉพาะเมื่อเป็นลายลักษณ์อักษร ได้รับอนุมัติ มีวันหมดอายุ และมี owner

## Gate และ not-applicable

gate ยกเว้นไม่ได้ ทางเดียวคือ `not_applicable` พร้อมเหตุผลด้าน scope ที่บันทึก
ไว้และการอนุมัติจาก owner การอนุมัติเป็นส่วนหนึ่งของ assessment ไม่ใช่ข้อความ
ส่วนตัว

ข้อกำหนดที่ไม่ใช่ gate ถูกยกเว้นได้เฉพาะเมื่อมี

- เหตุผลเป็นลายลักษณ์อักษร
- risk owner ที่ระบุชื่อ
- วันหมดอายุ
- บันทึกการอนุมัติ

## Profile เปลี่ยนความลึก ไม่เปลี่ยนชุดข้อกำหนด

ทั้งสอง profile resolve ชุดข้อกำหนดเดียวกัน profile กำหนดว่าการประเมินบันทึก
อย่างไร

- `lite` บันทึกสถานะและ gate
- `full` เพิ่ม maturity น้ำหนักตาม criticality readiness index และ evidence
  coverage

การเปลี่ยน profile ไม่เพิ่มหรือลดข้อกำหนด

## Reproducibility

`assurance.lock.yaml` pin

- version ของ SRAS และ checksum ของมาตรฐาน
- module ที่เลือกและ version
- overlay ที่เลือกและ version
- SHA-256 ของ standard input ทุกไฟล์ที่ resolve แล้ว

การประเมินโปรเจกต์ต้องทำซ้ำได้จาก lockfile แม้คลังจะเปลี่ยน ให้ทบทวนข้อกำหนด
ที่ resolve ก่อนประเมินใหม่ แล้ว refresh lockfile

```bash
npm run sras -- project refresh ~/sras-demo
```

`project validate ~/sras-demo` เป็นการตรวจแบบอ่านอย่างเดียว รายงาน lockfile
ที่ล้าและออกด้วย exit code ที่ไม่ใช่ศูนย์เมื่อ lock ที่ commit ไว้ไม่ตรงกับ input
ที่ resolve แล้ว

## ดูชุดที่ resolve ได้

```bash
npm run sras -- project resolve ~/sras-demo
```

คำสั่งนี้แสดง requirement ที่ resolve ทั้งหมดพร้อม layer และ criticality
จากนั้นสรุป coverage และทุก gate ที่ยังไม่ถูกประเมิน เป็นคำสั่งอ่านอย่างเดียว
และออกด้วย exit code 1 ตราบใดที่ gate ยังไม่มีบันทึกการประเมินหรือเป็น
`not_assessed` ส่วน gate ที่บันทึกเป็น `not_applicable` จะไม่ถูกนับว่ายังไม่ถูก
ประเมิน

ใช้ผลลัพธ์นี้ก่อน sign-off เพื่อดูตัวหารที่ assessment ต้องครอบคลุม ไม่ใช่เพียง
requirement ที่ทีมบันทึกไว้

## ตัวอย่างที่ทำไว้

`examples/e2e-project/` เป็นโปรเจกต์ synthetic แบบ full profile ที่ใช้ module
AI และ overlay การเงินประเทศไทย lockfile pin version SRAS ปัจจุบัน, `SRAS-AI`
และ `TH-FIN` ตัวอย่างนี้ใช้ข้อกำหนด Core, module และ overlay โดยไม่มีข้อมูลลูกค้าจริง

## หน้าที่เกี่ยวข้อง

- [Module และ overlay](modules-and-overlays.md)
- [Project instance](project-instance.md)
- [Claim และ evidence](claims-and-evidence.md)
