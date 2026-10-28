---
translation_status: partial
machine_translated: true
---

<!-- markdownlint-disable MD060: Prettier wraps Thai tables by code point; MD060 expects display width. -->

# Owner map

หน้านี้เป็นแผนที่หน้าเดียวสำหรับกำหนดผู้รับผิดชอบก่อนทีมจะคัดลอก template
ชื่อบทบาทเป็นชื่อกลาง ๆ ให้แมปกับโครงสร้างขององค์กรเอง ทีมเล็กอาจรวมบทบาทได้
แต่คนที่อนุมัติ claim ไม่ควรเป็นคนเดียวกับคนที่เขียน claim และ AI agent ไม่สามารถ
ลงนาม ยอมรับความเสี่ยง หรืออนุมัติการแปลได้

> หน้านี้เป็นฉบับภาษาไทยที่แปลโดยเครื่องและปรับถ้อยคำ ยังไม่ผ่านการตรวจทาน
> โดยมนุษย์ จึงยังคง `translation_status: partial` และ `machine_translated: true`

## บทบาท

| บทบาท                            | รับผิดชอบ                                                                     | ชื่อตำแหน่งที่พบบ่อย                   | สิ่งที่ต้องไม่ทำ                                       |
| -------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------ |
| Executive sponsor                | ขอบเขต งบประมาณ ความเสี่ยงคงเหลือ การตัดสินใจ go/no-go และการลงนามขั้นสุดท้าย | Project sponsor, programme director    | มอบการลงนามให้ผู้ขาย                                   |
| Assurance lead                   | ดำเนินการประเมิน ทำให้ instance และ lockfile เป็นปัจจุบัน ติดตามช่องว่าง      | Assurance manager, PMO lead            | อนุมัติ claim ของตนเองโดยไม่มีคนตรวจ                   |
| Delivery lead                    | ทำตามข้อกำหนด จัดหาหลักฐาน และรับผิดชอบกำหนดแก้ไข                             | Engineering lead, product lead         | ประกาศว่าหลักฐานยังใช้ได้โดยไม่ผ่าน evidence custodian |
| Security และ privacy lead        | ข้อกำหนดด้าน security, privacy, incident และ impact assessment                | CISO, DPO, security architect          | ให้ความเห็นทางกฎหมาย                                   |
| Legal และ regulatory focal point | แหล่งอ้างอิงทางการ คำถามกฎหมายที่เปิดอยู่ และการทบทวนทะเบียน                  | Legal counsel, compliance lead         | ถือว่า repository นี้เป็นคำแนะนำทางกฎหมาย              |
| Procurement และ contract manager | หน่วยงานผู้ว่าจ้าง เลขที่สัญญา หน้าที่ของผู้ขาย และบันทึกการเปลี่ยนแปลง       | Procurement lead, contract manager     | ยอมรับความเสี่ยงทางเทคนิคแทน sponsor                   |
| Operations และ service owner     | ความต่อเนื่อง การตอบสนองเหตุการณ์ runbook และการดำเนินงานหลังเปิดบริการ       | Service owner, operations lead         | อนุมัติขอบเขตก่อนเปิดตัวเพียงลำพัง                     |
| Evidence custodian               | evidence index การเข้าถึง การเก็บรักษา redaction และ freshness                | Evidence librarian, records officer    | เป็นผู้อนุมัติ claim เพียงคนเดียว                      |
| Independent reviewer             | บทบาททางเลือกของโปรเจกต์: external review สำหรับขอบเขตของโปรเจกต์             | External reviewer                      | ทบทวนงานของตนเองหรืองานของ maintainer                  |
| Thai content reviewer            | บทบาททางเลือกของโปรเจกต์: human Thai review สำหรับการเผยแพร่ของโปรเจกต์       | ผู้ตรวจทานภาษาไทย, native-speaking SME | เป็น AI agent หรือผู้ตรวจทานที่ไม่มีชื่อ               |

ทั้งสองบทบาทเป็นทางเลือก library ไม่ได้ใช้บทบาทเหล่านี้ โปรเจกต์ที่นำไปใช้อาจ
เพิ่มสำหรับ formal process ของตนเอง

## กิจกรรมและเจ้าของ

| กิจกรรม                    | Accountable        | ผู้ลงมือ              | ต้องปรึกษา                | บันทึก                        |
| -------------------------- | ------------------ | --------------------- | ------------------------- | ----------------------------- |
| เลือก scope และ profile    | Sponsor            | Assurance lead        | Delivery, security        | `assurance.yaml`              |
| เลือก module และ overlay   | Assurance lead     | Assurance lead        | Security, legal, delivery | `assurance.yaml`, lockfile    |
| ประเมินข้อกำหนด            | Assurance lead     | Delivery และ security | Operations, legal         | `assessment.yaml`             |
| ยืนยันว่าหลักฐานยังใช้ได้  | Evidence custodian | Delivery lead         | Assurance lead            | `evidence-index.yaml`         |
| อนุมัติถ้อยคำสาธารณะ       | Sponsor            | Assurance lead        | Legal, security           | `claims.yaml`                 |
| ยอมรับความเสี่ยงคงเหลือ    | Sponsor            | Assurance lead        | Legal, security           | `risk-register.yaml`          |
| ลงนาม assessment           | Sponsor            | Assurance lead        | ทุกบทบาทข้างต้น           | sign-off ใน `assessment.yaml` |
| การทบทวน formal (ทางเลือก) | Sponsor            | Independent reviewer  | Maintainer                | บันทึกผลการทบทวน              |

## การแยกหน้าที่ขั้นต่ำ

- คนที่เขียน claim ไม่ควรเป็นคนเดียวที่อนุมัติ claim
- คนที่จัดหาหลักฐานไม่ควรเป็นคนเดียวที่ยืนยันว่าหลักฐานยังใช้ได้ หากทีมใหญ่พอ
  ที่จะแยกบทบาท
- ผู้ขายไม่ควรเป็นผู้อนุมัติการส่งมอบของตนเองเพียงคนเดียว
- AI agent เตรียมไฟล์และรันการตรวจได้ แต่ลงนาม ยอมรับความเสี่ยง หรือทำเครื่องหมาย
  ว่าการแปล complete ไม่ได้
- public-sector instance บันทึกหน่วยงานผู้ว่าจ้างและเลขที่สัญญาใน
  `scope.public_sector` ใช้หน่วยงานจริงเฉพาะใน instance ส่วนตัว และใช้หน่วยงาน
  synthetic ในตัวอย่างสาธารณะ

## 30 นาทีแรก

1. Sponsor ระบุชื่อ assurance lead และ evidence custodian
2. Assurance lead รัน `init` และยืนยัน selection กับ sponsor
3. Sponsor อนุมัติ scope, profile, module และ overlay
4. Delivery lead และ security lead กรอก assessment และ evidence index
5. Evidence custodian ยืนยัน freshness, การเข้าถึง และ redaction
6. Sponsor ตรวจ claims และ risks ลงนาม assessment และบันทึกการตัดสินใจไว้ใน
   instance ไม่ใช่เพียงในแชต

## หน้าที่เกี่ยวข้อง

- [ความพร้อมของ template](../governance/template-readiness.md)
- [Template โปรเจกต์](project.md)
- [Project instance](../concepts/project-instance.md)
- [Confidence labels](../governance/confidence-labels.md)
- [ภาครัฐ](../sectors/public-sector.md)
