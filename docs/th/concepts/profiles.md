---
translation_status: partial
machine_translated: true
---

# Profile และ maturity

profile คือโหมดการประเมิน ทั้งสอง profile ใช้ requirement ID และกฎ
applicability เดียวกัน ต่างกันที่รายละเอียดที่ assessment บันทึก

## Lite และ full

- **Lite** เหมาะกับ bid, pre-sales และการวิเคราะห์ช่องว่างรอบแรก บันทึก
  สถานะและ gate report ไม่ใช้ maturity และไม่ใช้ weighted index
- **Full** เหมาะกับการรับประกันภายใน due diligence และการทบทวนประจำปี
  เพิ่ม maturity L0–L4, น้ำหนักตาม criticality, readiness index และ evidence
  coverage

`assurance.yaml` และ `assessment.yaml` ต้องตรงกันในเรื่อง profile, tier,
modules, overlays และข้อมูลโปรเจกต์ ความไม่ตรงกันคือ validation error

## สถานะ

- `not_assessed` — อยู่ในขอบเขตแต่ยังไม่มีผลการประเมิน
- `gap` — ยังไม่บรรลุข้อกำหนด ต้องมีช่องว่างและ owner
- `partial` — บรรลุบางส่วน และบันทึกส่วนที่ขาด
- `implemented` — บรรลุข้อกำหนดแล้ว หลักฐานอาจยังรออยู่
- `verified` — บรรลุและหลักฐานปัจจุบันได้รับการตรวจแล้ว
- `not_applicable` — ไม่ใช้กับผลิตภัณฑ์นี้ พร้อมเหตุผลที่บันทึกไว้

สำหรับคำศัพท์ C/P/N ที่ใช้ใน bid

- `verified` และ `implemented` → **C**
- `partial` → **P**
- `gap` และ `not_assessed` → **N**

การแมปนี้เป็นความสะดวกในการรายงาน ไม่ใช่ถ้อยแถลงด้าน compliance

## Gate และจำนวน

assessment บันทึก gate summary

```yaml
gates:
  pass: 0
  fail: 0
```

`summary.counts` ต้องตรงกับสถานะที่บันทึกในข้อกำหนด gate ที่มีสถานะต่ำกว่า
ขั้นต่ำคือ gate ที่ fail และเป็นตัวบล็อกการส่งมอบจนกว่าจะแก้ไขหรือเปลี่ยน
scope ด้วยการอนุมัติ

## ความลึกของ full

full profile เพิ่ม

- **Maturity L0–L4** ในทุกข้อกำหนดที่ประเมิน โปรเจกต์ตกลงความหมายของแต่ละ
  ระดับสำหรับผลิตภัณฑ์และบันทึกไว้ คลังไม่ได้กำหนดป้ายสากลเกินกว่าระดับนี้
- **น้ำหนักตาม criticality** ของ requirement โปรเจกต์บันทึก readiness index
  ที่ได้ใน `summary.index`
- **Readiness index** ระหว่าง 0 ถึง 1
- **Evidence coverage** ที่รายงานสำหรับ assessment

index และ coverage เป็นสรุปที่ผู้ประเมินบันทึก ไม่ใช่ค่าที่ CLI คำนวณ ต้องอ่าน
คู่กับ gate report และช่องว่างที่เปิดอยู่

## Sign-off และข้อจำกัด

assessment บันทึก assessor, ชื่อผู้ลงนาม, บทบาท และวันที่ รวมถึงข้อจำกัด
ข้อจำกัดไม่ใช่การยกเว้น แต่เป็นถ้อยแถลงที่มองเห็นได้ว่าการประเมินไม่ได้ครอบคลุม
อะไร

## สิ่งที่ parser บังคับ

project parser และ JSON Schema บังคับกฎเหล่านี้ก่อนเขียนหรือยอมรับ project
instance

- `lite` ต้องมี `maturity: null` ในทุกข้อกำหนดที่ประเมิน และ
  `summary.index: null`
- `full` ต้องมี maturity และ summary index ระหว่าง 0 ถึง 1
- จำนวนนับตรงกับสถานะ
- ช่องว่างมี owner และ due date ตามที่ schema กำหนด
- ความเสี่ยงที่ accepted มี acceptance ID

## หน้าที่เกี่ยวข้อง

- [Project instance](project-instance.md)
- [Resolution](resolution.md)
- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
