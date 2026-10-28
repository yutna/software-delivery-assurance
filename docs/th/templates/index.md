---
translation_status: partial
machine_translated: true
---

# Templates

repository มี template โปรเจกต์ที่คัดลอกได้และตัวอย่าง synthetic ทั้งสองอย่าง
ไม่มีข้อมูลลูกค้า หลักฐานจริง หรือ production identifier

## Template โปรเจกต์

`templates/project/` เป็นจุดเริ่มต้นสำหรับ project instance ส่วนตัว
`npm run sras -- init <dir> --profile lite|full` จะคัดลอก template แทน
placeholder ใช้ profile คำนวณ lockfile ตรวจสอบผลลัพธ์ และเขียนไฟล์

อ่าน[คู่มือ template โปรเจกต์](project.md) สำหรับรายละเอียดไฟล์ placeholder
และกฎการตรวจสอบ หลังแก้ instance ให้รัน `npm run sras -- project validate <dir>`
และหลังเปลี่ยน selection ให้รัน `npm run sras -- project refresh <dir>`

## ตัวอย่าง synthetic

- `examples/e2e-project/` — Core + module AI + overlay การเงินประเทศไทย
- `examples/finance-synthetic/` — overlay การเงิน
- `examples/ecommerce-synthetic/` — overlay อีคอมเมิร์ซ
- `examples/logistics-synthetic/` — overlay โลจิสติกส์
- `examples/public-sector-synthetic/` — overlay ภาครัฐ

แต่ละตัวอย่างมี assessment, lockfile, claims, risk register, evidence index
และหลักฐาน synthetic ใน `evidence/` ไฟล์หลักฐานเป็น placeholder ที่แสดงรูปร่าง
ที่คาด ไม่ใช่บันทึก assurance จริง

## สิ่งที่ควรคัดลอกและสิ่งที่ต้องแทน

- คัดลอกโครงสร้าง ไม่ใช่เนื้อหา
- แทนทุกค่าที่เป็น `Example` และ `Synthetic` ด้วยค่าของโปรเจกต์
- เก็บหลักฐานในที่เก็บส่วนตัว evidence index เพียงชี้ไปยังหลักฐาน
- เก็บ lockfile ไว้กับ assessment เพื่อให้ผลทำซ้ำได้
- อย่าใส่ชื่อลูกค้า hostname จริง หรือหลักฐานจริงใน repository สาธารณะนี้

## หน้าที่เกี่ยวข้อง

- [Project instance](../concepts/project-instance.md)
- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
- [Claim และ evidence](../concepts/claims-and-evidence.md)
