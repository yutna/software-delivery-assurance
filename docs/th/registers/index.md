---
translation_status: partial
machine_translated: true
---

# ทะเบียน

ทะเบียน (register) คือดัชนีข้อเท็จจริงของกฎหมาย กฎระเบียบ มาตรฐาน หรือแนวทาง
บันทึกแหล่งอ้างอิงทางการ วันที่ตรวจสอบ วันที่ครบกำหนดทบทวน และสถานะการตรวจทาน
ไม่ใช่ overlay ไม่ใช่คำแนะนำทางกฎหมาย และไม่ใช่ถ้อยแถลงว่าผลิตภัณฑ์ปฏิบัติตาม
เครื่องมือนั้น

## ทะเบียนประเทศไทย

- `TH-BOT-001` — Bank of Thailand Notification No. สกช. 5/2566 on IT Risk Management (2023), regulation
- `TH-BOT-002` — Bank of Thailand Notification No. สนช. 1/2564 on IT Risk Management under the Payment Systems Act, regulation
- `TH-CCA-001` — Computer Crime Act B.E. 2550 (2007), law
- `TH-CPA-001` — Consumer Protection Act B.E. 2522 (1979), law
- `TH-CYBER-001` — Cybersecurity Act B.E. 2562 (2019), law
- `TH-DGA-001` — Digital Government Administration and Services Act B.E. 2562 (2019), law
- `TH-DPS-001` — Royal Decree on Digital Platform Service Businesses B.E. 2565 (2022), regulation
- `TH-ETA-001` — Electronic Transactions Act B.E. 2544 (2001), law
- `TH-PAY-001` — Payment Systems Act B.E. 2560 (2017), law
- `TH-PDPA-001` — Personal Data Protection Act B.E. 2562 (2019), law
- `TH-PROC-001` — Public Procurement Act B.E. 2560 (2017), law
- `TH-TECH-001` — Emergency Decree on Measures to Prevent and Suppress Technology Crimes B.E. 2566 (2023), regulation

ทุกทะเบียนมีสถานะ `unverified` ในรุ่นนี้ หน้า reference ที่ generate ไว้มี
แหล่งอ้างอิงทางการ วันที่ `last_verified` วันที่ครบกำหนดทบทวน และขอบเขตที่
รายการครอบคลุม

- [TH-BOT-001](../../en/reference/registers/TH-BOT-001.md)
- [TH-BOT-002](../../en/reference/registers/TH-BOT-002.md)
- [TH-CCA-001](../../en/reference/registers/TH-CCA-001.md)
- [TH-CPA-001](../../en/reference/registers/TH-CPA-001.md)
- [TH-CYBER-001](../../en/reference/registers/TH-CYBER-001.md)
- [TH-DGA-001](../../en/reference/registers/TH-DGA-001.md)
- [TH-DPS-001](../../en/reference/registers/TH-DPS-001.md)
- [TH-ETA-001](../../en/reference/registers/TH-ETA-001.md)
- [TH-PAY-001](../../en/reference/registers/TH-PAY-001.md)
- [TH-PDPA-001](../../en/reference/registers/TH-PDPA-001.md)
- [TH-PROC-001](../../en/reference/registers/TH-PROC-001.md)
- [TH-TECH-001](../../en/reference/registers/TH-TECH-001.md)

## ทะเบียนอาเซียน

- `ID-PDP-001` — Law No. 27 of 2022 on Personal Data Protection, Indonesia, law, `unverified`
- `MY-PDPA-001` — Personal Data Protection Act 2010 (Act 709), Malaysia, law, `unverified`
- `PH-DPA-001` — Republic Act No. 10173 (Data Privacy Act of 2012), Philippines, law, `unverified`
- `SG-PDPA-001` — Personal Data Protection Act 2012, Singapore, law, `unverified`
- `VN-PDPD-001` — Decree No. 13/2023/ND-CP on Personal Data Protection, Viet Nam, regulation, `unverified`

รายการอาเซียนแต่ละรายการเชื่อมไปยังแหล่งอ้างอิงทางการและหน้า reference ที่
generate ไว้

- [ID-PDP-001](../../en/reference/registers/ID-PDP-001.md)
- [MY-PDPA-001](../../en/reference/registers/MY-PDPA-001.md)
- [PH-DPA-001](../../en/reference/registers/PH-DPA-001.md)
- [SG-PDPA-001](../../en/reference/registers/SG-PDPA-001.md)
- [VN-PDPD-001](../../en/reference/registers/VN-PDPD-001.md)

`VN-PDPD-001` บันทึกสถานะ `repealed` พระราชกฤษฎีกาสิ้นผลใช้บังคับเมื่อวันที่
1 มกราคม 2569 และถูกแทนที่ด้วยกฎหมายคุ้มครองข้อมูลส่วนบุคคลเลขที่
91/2025/QH15 และพระราชกฤษฎีกาเลขที่ 356/2025/ND-CP รายการนี้คงไว้เพื่ออ้างอิง
และไม่ได้นำเสนอว่าเป็นกฎหมายที่ใช้บังคับอยู่ในปัจจุบัน

รายการอาเซียนเป็นเพียงทะเบียน ไม่ใช่ overlay ของอาเซียน และไม่ได้สร้าง
ข้อกำหนดระดับภูมิภาค

## ข้อจำกัดในการตรวจทาน

ทะเบียนทุกรายการใน v0.7.0 เป็น `unverified` ยังไม่มีผู้ตรวจทานที่มีคุณสมบัติ
ลงนาม รายการเหล่านี้มีประโยชน์ในการค้นหาแหล่งอ้างอิงทางการและจัดโครงสร้างการ
ประเมิน แต่ไม่ใช่ข้อสรุปทางกฎหมาย

`review_status: reviewed` ต้องมีชื่อผู้ตรวจทาน วันที่ตรวจ และขอบเขต เนื้อหา
ทางกฎหมายยังคง unverified จนกว่าผู้ตรวจทานทางกฎหมายที่มีคุณสมบัติจะลงนาม
หากไม่มีผู้ตรวจทาน ข้อจำกัดยังคงมองเห็นได้ และรายการนั้นไม่ถูกใช้เป็นฐานของ
claim สาธารณะ

## ทะเบียนและ overlay

ทะเบียนบันทึกข้อเท็จจริง overlay เพิ่มข้อกำหนด สองสิ่งนี้แยกจากกัน

- รายการทะเบียนไม่ได้เพิ่มข้อกำหนดด้วยตัวเอง
- overlay ไม่ได้ทวนกฎหมาย แต่ نشان میدهدรายการทะเบียนใดเกี่ยวข้อง
- ผลิตภัณฑ์ไม่ได้ถูกประเมินว่าปฏิบัติตามกฎหมายเพราะมีรายการทะเบียน

## เขตอำนาจอื่น

ประเทศไทยและอาเซียนมีทะเบียนที่ดูแลต่อเนื่องใน v0.7.0 ทะเบียน EU มีแผนใน
v0.8.0 รายการนอกประเทศไทยยังคงเป็นเพียงรายการอ้างอิงจนกว่าจะมีผู้ตรวจทานที่มี
คุณสมบัติและบันทึกการตรวจทาน

## หน้าที่เกี่ยวข้อง

- [ภาคธุรกิจ](../sectors/index.md)
- [Module และ overlay](../concepts/modules-and-overlays.md)
- [Reference](../reference/index.md)
