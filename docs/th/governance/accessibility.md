---
translation_status: partial
machine_translated: true
---

# แถลงการณ์ด้าน accessibility ของเว็บไซต์เอกสารชุดนี้

**จัดทำ:** 2026-10-29 **จัดทำโดย:** AI execution agent
**สถานะ:** ระบุเป้าหมายแล้ว ยังไม่ได้ประเมิน ไม่มีข้อกล่าวอ้างเรื่อง conformance

แถลงการณ์นี้ครอบคลุมเว็บไซต์เอกสารที่
<https://yutna.github.io/software-delivery-assurance/> ไม่ครอบคลุมข้อกำหนด
SRAS, template โปรเจกต์, เอาต์พุตที่ CLI สร้าง, เว็บภายนอกที่เอกสารนี้ลิงก์ไป
หรือผลิตภัณฑ์ใด ๆ ที่สร้างจาก template นี้

> หน้านี้เป็นฉบับภาษาไทยที่แปลโดยเครื่องและปรับถ้อยคำ ยังไม่ผ่านการตรวจทาน
> โดยมนุษย์ จึงยังคง `translation_status: partial` และ `machine_translated: true`

## เป้าหมาย

WCAG 2.2 Level AA เป็นเป้าหมายการออกแบบของเว็บไซต์นี้ เป้าหมายไม่ใช่ผลลัพธ์
เว็บไซต์นี้ยังไม่ได้ประเมินเทียบกับ WCAG 2.2 และหน้านี้ไม่กล่าวอ้าง conformance
ในระดับใด

## สิ่งที่ตรวจอัตโนมัติ

`npm run check:a11y` build เว็บไซต์แล้วรัน axe-core กับทุกหน้าใน
`docs/.vitepress/dist` เฉพาะ rule ที่ map กับ success criteria ระดับ A และ AA
ของ WCAG 2.0, 2.1 และ 2.2 check นี้รันใน CI ทุก pull request และ violation
ทำให้ build fail

rule ที่รันครอบคลุมภาษาของหน้า ข้อความทดแทนภาพ label ของฟอร์ม ชื่อที่เข้าถึงได้
ของปุ่มและลิงก์ ความถูกต้องของ ARIA attribute โครงสร้าง list และ table frame
title และ viewport meta tag ส่วน rule เชิง best practice ที่ไม่ map กับ success
criterion ไม่อยู่ใน gate

## สิ่งที่ไม่ได้ตรวจ

check นี้รันใน document object model ที่ไม่มี layout engine และไม่มี assistive
technology จึงไม่ประเมิน:

- colour contrast
- การที่ visible label อยู่ใน accessible name หรือไม่
- การใช้งานด้วยคีย์บอร์ดและลำดับ focus
- keyboard trap
- zoom, reflow และ text spacing
- เอาต์พุตของ screen reader ทั้ง NVDA, JAWS, VoiceOver, TalkBack และ assistive
  technology อื่น
- motion, timing และ animation
- ความอ่านง่ายของคำแปลไทย

check จะรายงาน rule ที่ประเมินไม่ได้ในเอาต์พุต การรันที่ผ่านจึงไม่ได้แปลว่าทุก
rule ถูกใช้แล้ว ยังไม่มีการทดสอบคีย์บอร์ดด้วยมือ การทดสอบ screen reader หรือการ
ตรวจสอบจากบุคคลที่สาม ข้อบกพร่องด้าน accessibility อาจมีอยู่ในทุกหน้า

## ข้อจำกัดที่ทราบ

- หน้าไทยแปลด้วยเครื่องและยังไม่ผ่านการตรวจทานโดยมนุษย์ screen reader จะออกเสียง
  ข้อความนั้นเป็นภาษาไทย และคำแปลอาจมีข้อผิดพลาดที่เปลี่ยนความหมาย
- ตารางยาวและบล็อกโค้ดถูกทำซ้ำตามต้นฉบับ อาจยาวหรือตามได้ยากด้วย screen reader
  และไม่มีฉบับภาษาง่าย
- แหล่งอ้างอิงภายนอกอยู่นอกการควบคุมของเว็บไซต์นี้ แหล่งที่ลิงก์ไปหลายแห่งเป็นไฟล์
  PDF ภาษาไทยหรืออังกฤษ และไม่ได้ประเมิน accessibility ของแหล่งเหล่านั้นในที่นี้
- เว็บไซต์สร้างด้วย VitePress default theme พฤติกรรมของ theme เปลี่ยนได้เมื่อ
  อัปเกรด และแถลงการณ์นี้ตรวจทุกรอบ release ไม่ใช่หลัง dependency update ทุกครั้ง

## ช่องทางแจ้งปัญหา

เปิด issue ที่ <https://github.com/yutna/software-delivery-assurance/issues/new>
และใส่ label `accessibility` อธิบายหน้า สิ่งที่เกิดขึ้น และเบราว์เซอร์หรือ
assistive technology ที่ใช้ ถ้าเกี่ยวข้อง ห้ามใส่ข้อมูลส่วนบุคคล ข้อมูลลูกค้า
หรือข้อมูลที่เป็นความลับใน issue สาธารณะ

โปรเจกต์นี้ดูแลโดยคนเดียว การตอบกลับเป็นแบบ best-effort และไม่รับประกันเวลา
ตอบกลับ

## การดูแลแถลงการณ์นี้

แถลงการณ์นี้จัดทำโดย AI execution agent ไม่ผ่านการตรวจทานโดยมนุษย์ และไม่ใช่การ
ตรวจสอบ (audit) ทบทวนอีกครั้งเมื่อเว็บไซต์ check หรือ theme เปลี่ยน และทุกรอบ
release check กับหน้านี้ต้องเปลี่ยนไปด้วยกัน การเปลี่ยนแปลงที่ทำให้ check แคบลง
ต้องอัปเดตหน้านี้

## หน้าที่เกี่ยวข้อง

- [ความพร้อมของ template](template-readiness.md)
- [ข้อกังวลทางกฎหมายและกฎระเบียบ](legal-concerns.md)
- [นโยบายการทบทวน](review-policy.md)
- [Confidence labels](confidence-labels.md)
- [Crosswalk WCAG 2.2](../../en/reference/crosswalks/MAP-WCAG22.md)
