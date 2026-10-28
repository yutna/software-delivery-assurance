---
layout: home
translation_status: partial
machine_translated: true

hero:
  name: Software Delivery Assurance
  text: starter kit สำหรับการส่งมอบซอฟต์แวร์ที่อิงหลักฐาน
  tagline: คัดลอก template โปรเจกต์ ประเมินโปรเจกต์จริง และเก็บหลักฐานไว้ในที่ส่วนตัว ออกแบบสำหรับงานในอนาคต โดยเฉพาะภาครัฐของไทย พร้อมมาตรฐานอ้างอิง SRAS และเครื่องมือ
  actions:
    - theme: brand
      text: เริ่มต้นอย่างรวดเร็ว
      link: /th/quick-start
    - theme: alt
      text: อ่านภาพรวม
      link: /th/overview

features:
  - title: SRAS Core
    details: 70 ข้อกำหนดที่ใช้งานอยู่ ในเจ็ดโดเมน ได้แก่ governance, security, privacy, change และ release, operations, incident และ continuity และ supply chain
  - title: โมดูลทางเทคนิคห้าโมดูล
    details: ข้อกำหนดเพิ่มเติม 52 ข้อ สำหรับ AI/GenAI, integration และ API, regulated data, cloud/SaaS และ on-premises
  - title: overlay ภาคธุรกิจสี่ชุด
    details: ส่วนเพิ่มสำหรับประเทศไทย 45 ข้อ ในภาคการเงิน อีคอมเมิร์ซ โลจิสติกส์ และภาครัฐ โดยไม่ยกเว้น gate
  - title: ทะเบียนและ crosswalk
    details: ทะเบียนประเทศไทย 12 รายการ ทะเบียนอาเซียน 6 รายการ และทะเบียนสหภาพยุโรป 9 รายการพร้อมแหล่งอ้างอิงทางการ และ crosswalk เชิงข้อมูลไปยังมาตรฐานภายนอกที่ใช้กันทั่วไป
  - title: project instance
    details: template ที่คัดลอกได้ lockfile ที่ทำซ้ำได้ และคำสั่ง init สำหรับการประเมินส่วนตัวที่ไม่มีวันเข้ามาใน repository นี้
  - title: เครื่องมือที่รักษาความถูกต้องของเนื้อหา
    details: การตรวจสอบ การ render reference ที่ deterministic และ content guard ที่บล็อกข้อความสาธารณะที่ไม่ปลอดภัยก่อนเผยแพร่
---

## เริ่มต้นที่นี่

repository นี้เป็น concern template และใช้ได้โดยมีข้อจำกัด ไม่ได้อ้างว่าเป็น
มาตรฐาน โปรเจกต์ที่ต้องการ formal review, human Thai review หรือ certification
ต้องทำสิ่งนั้นในบริบทของตนเอง

- [ความพร้อมของ template](governance/template-readiness.md) — วันนี้ใช้อะไรได้
  และยังมีข้อจำกัดอะไร
- [เริ่มต้นอย่างรวดเร็ว](quick-start.md) — จาก clone ที่สะอาดไปจนถึง project
  instance ที่สร้างแล้วและ library gate ที่ผ่าน
- [Owner map](templates/owner-map.md) — ใครรับผิดชอบกิจกรรมใด
- [ภาพรวม](overview.md) — kit มีอะไรและไม่มีอะไร
- [แนวคิด](concepts/index.md) — ข้อกำหนด profile module overlay การ resolve
  project instance claim และเครื่องมือ
- [ภาคธุรกิจ](sectors/index.md) — overlay สี่ชุดของประเทศไทย
- [ทะเบียน](registers/index.md) — ดัชนีข้อเท็จจริงของกฎหมายและกฎระเบียบไทย อาเซียน และสหภาพยุโรป พร้อมหน้าการเปรียบเทียบอาเซียนและสหภาพยุโรป
- [Reference](reference/index.md) — หน้าที่ generate จากข้อกำหนด overlay และทะเบียน
- [Confidence labels](governance/confidence-labels.md) — วิธีติดป้ายข้อความ
- [ข้อกังวลทางกฎหมาย](governance/legal-concerns.md) — แหล่งอ้างอิงและคำถาม
  สำหรับการตัดสินใจของแต่ละโปรเจกต์
- [อภิธานศัพท์](glossary.md) — คำศัพท์ที่ใช้ร่วมกันทั้งไซต์

หน้าภาษาอังกฤษเป็นฉบับหลักสำหรับ identifier, schema key และชื่อไฟล์
ส่วนคำแปลภาษาไทยดูได้จาก language switcher
