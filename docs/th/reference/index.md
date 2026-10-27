---
translation_status: partial
machine_translated: true
---

# Reference

หน้า reference ถูก generate จาก YAML ต้นทางด้วย `npm run sras -- render` และ
เขียนเป็นภาษาอังกฤษ ปัจจุบัน `render` สร้างเฉพาะ `docs/en/reference/`
จึงไม่มีการแปลหน้าอ้างอิงเป็นภาษาไทยในรุ่นนี้

- [ดัชนี reference ภาษาอังกฤษ](/en/reference/) — ทุกข้อกำหนด overlay และทะเบียน
- [ข้อกำหนด Core และ module](/en/reference/#requirements) — 70 ข้อกำหนด Core
  และ 52 ข้อกำหนดใน module
- [Overlay ภาคธุรกิจ](/en/reference/#overlays) — `TH-FIN`, `TH-ECM`, `TH-LOG`,
  `TH-PUB`
- [ทะเบียนประเทศไทย](/en/reference/#registers) — 12 รายการ

หน้า reference เป็นเอาต์พุตที่ generate ห้ามแก้ด้วยมือ หากต้องการเปลี่ยนเนื้อหา
ให้แก้ YAML ต้นทางแล้วรัน `npm run sras -- render` และ commit ทั้งต้นทางและ
เอาต์พุต

หมายเหตุ: ลิงก์ในหนานี้ชี้ไปยังดัชนีภาษาอังกฤษ เพราะหน้าอ้างอิงแต่ละรายการ
ยังไม่มีฉบับแปลไทย

## หน้าที่เกี่ยวข้อง

- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
- [Module และ overlay](../concepts/modules-and-overlays.md)
- [ทะเบียน](../registers/index.md)
