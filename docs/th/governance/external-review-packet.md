---
translation_status: partial
machine_translated: true
---

# External review packet

**สถานะ: template เท่านั้น ยังไม่มีผู้ตรวจที่ระบุชื่อ ได้รับการติดต่อ หรือบันทึกผล
ยังไม่มีการตรวจสอบจากภายนอกเกิดขึ้น**

**จัดทำ:** 2026-10-28 **เป้าหมาย:** SRAS 1.0.0 candidate ซึ่งอิงจาก SRAS 0.9.0
**ผู้ตรวจ:** _รอระบุชื่อ_ **วันที่ตรวจ:** _รอบันทึก_

หน้านี้เป็น packet สำหรับผู้ตรวจภายนอกในอนาคต ระบุขอบเขต คำถาม หลักฐาน และวิธี
บันทึกผล เจ้าของ repository ต้องเป็นผู้ระบุชื่อผู้ตรวจ และผู้ตรวจต้องเป็นผู้เขียน
ผลเอง จนกว่าจะถึงตอนนั้น ข้อความเรื่อง external review ใน repository นี้ยังไม่
ถูกทำเครื่องหมาย และหน้านี้ไม่ใช่หลักฐานว่ามีการตรวจแล้ว

## หน้านี้ไม่ใช่อะไร

- ไม่ใช่ผลการตรวจ การอนุมัติ การรับรอง หรือความเห็นทางกฎหมาย
- ไม่ใช่สิ่งทดแทนผู้ตรวจกฎหมายที่มีคุณสมบัติ
- ไม่ได้อนุญาตให้ผู้ตรวจแก้ requirement โดยไม่มีหลักฐาน
- ไม่ได้อ้างว่าผู้ดูแลมีความเป็นอิสระจากงานนี้

## ขอบเขตการตรวจ

### อยู่ในขอบเขต

| พื้นที่ | สิ่งที่ตรวจ | จุดเริ่มต้น |
| ------------------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Core requirements | 70 requirement ที่ active: ถ้อยคำ criticality applicability evidence และ gate | `core/domains/`, `docs/en/reference/requirements/` |
| Technical modules | 52 requirement ที่ active ในห้า module | `modules/`, `docs/en/reference/requirements/` |
| Sector overlays | 45 requirement ที่ active ในสี่ overlay ของประเทศไทย | `overlays/`, `docs/en/reference/overlays/` |
| Registers | 27 source entry: แหล่งทางการ version สถานะ วันที่ และ requirement ที่อ้างอิง | `registers/`, `docs/en/reference/registers/` |
| Crosswalks | 7 mapping เชิงข้อมูลไปยังมาตรฐานภายนอก | `mappings/` |
| Project template และ CLI | รูปแบบ template กฎ validation lockfile, `init`, `project validate/refresh` | `templates/project/`, `docs/en/templates/project.md` |
| Governance และ claims | ข้อความ readiness สถานะ review ข้อจำกัด และการไม่กล่าวอ้าง compliance | `GOVERNANCE.md`, `docs/en/governance/v1-readiness.md`, `SCOPE.md` |
| เอกสารสองภาษา | หน้า English และ Thai glossary และ frontmatter status | `docs/en/`, `docs/th/` |

### อยู่นอกขอบเขต

- การตีความกฎหมายหรือการตัดสินว่าโปรเจกต์สอดคล้องกฎหมายหรือไม่
- การตรวจลูกค้า บริการ สัญญา หรือชุดหลักฐานจริง
- การรับรองผลิตภัณฑ์ ทีม หรือระบบบริหาร
- เกณฑ์การจัดซื้อจัดจ้างและแนวปฏิบัติเฉพาะหน่วยงาน
- การทดสอบประสิทธิภาพ ความปลอดภัย หรือ penetration testing ของระบบที่ deploy แล้ว
- การแก้ไขสิ่งที่กำลังตรวจระหว่างการตรวจ

## คุณสมบัติและความเป็นอิสระของผู้ตรวจ

ต้องมีผู้ตรวจอย่างน้อยหนึ่งคนที่

- ไม่ใช่ผู้ดูแล และไม่มีผลประโยชน์ทับซ้อนทางการเงินหรือการจ้างงานกับ repository
- อ่านภาษาไทยและอังกฤษได้ หรือทำงานร่วมกับผู้ตรวจภาษาไทยที่ระบุชื่อสำหรับเนื้อหา
  การแปลและเนื้อหาที่เกี่ยวกับประเทศไทย
- ตรวจ YAML, JSON Schema, TypeScript และผลของคำสั่งได้ หรือทำงานร่วมกับผู้ตรวจ
  เทคนิคที่ระบุชื่อสำหรับ CLI และ schema
- บันทึกขอบเขต วันที่ commit finding และข้อจำกัด

ผู้ตรวจสองคนแบ่งขอบเขตกันได้ ถ้าแบ่ง แต่ละคนต้องบันทึกชื่อ ขอบเขต และผลของตนเอง
การแบ่งตรวจไม่ใช่ sign-off เดียวจากคนเดียว

## คำถามสำหรับผู้ตรวจ

ตอบทุกข้อพร้อม verdict หลักฐานที่ตรวจ และ finding ที่พบ

1. requirement ที่ active ทุกข้อมีถ้อยคำที่ทดสอบได้และมี negative case ชัดเจนหรือไม่
2. criticality ถูกต้องสำหรับ gate และ high requirement หรือไม่ และ applicability
   สมเหตุสมผลสำหรับแต่ละ tier, module และ overlay หรือไม่
3. gate ทุกข้อมี evidence expectation ที่ทีมส่งมอบทำได้โดยไม่ต้องเดาประเภท
   หลักฐานหรืออายุสูงสุดหรือไม่
4. register ทั้ง 27 entry อ้างแหล่งทางการ มี version วันที่ตรวจ วันที่ถึงกำหนด
   ทบทวน และ requirement ที่ mapping หรือไม่
5. overlay อยู่ในขอบเขต และหลีกเลี่ยงการสรุปทางกฎหมายที่แหล่งอ้างอิงไม่รองรับหรือไม่
6. คำถามทางกฎหมายที่เปิดอยู่ทั้งสี่ข้อ (#128, #129, #130, #131) ยังเปิดอยู่ชัดเจน
   และไม่มีคำตอบที่แต่งขึ้นใน library หรือไม่
7. project template ครบและสอดคล้องกัน และคำสั่งที่ เขียนไว้ทำงานจาก clean
   checkout หรือไม่
8. `project validate` จับ lockfile ที่ล้า ไฟล์ที่หาย และ selection ที่มาตรฐานไม่
   รู้จักได้หรือไม่ และ `project refresh` เปลี่ยนเฉพาะ lockfile หรือไม่
9. มีหน้าใดกล่าวอ้าง compliance การรับรอง การตรวจสอบอิสระ หรือ external review
   ที่ไม่ได้เกิดขึ้นหรือไม่
10. ข้อจำกัดและความเสี่ยงคงเหลือชัดเจนพอให้ผู้อ่านรู้ว่าสิ่งใดที่ library ไม่ครอบคลุม
    หรือไม่

## Checklist การตรวจ

### Requirements และ gates

- [ ] requirement ที่ active ทุกข้อมีหนึ่ง ID หนึ่ง layer และหนึ่ง source file
- [ ] gate requirement มี evidence expectation พร้อมประเภทและ freshness
- [ ] overlay หรือโปรเจกต์ไม่สามารถ waive gate ได้
- [ ] applicability resolve ได้ deterministic สำหรับ selection ที่ เขียนไว้
- [ ] ตัวอย่าง synthetic ระบุ denominator ถูกต้องและไม่ทำให้เข้าใจว่าครอบคลุมทั้งหมด

### Registers และสถานะทางกฎหมาย

- [ ] entry ทุกอันระบุแหล่งทางการและ version
- [ ] มีวันที่ตรวจและวันที่ถึงกำหนดทบทวน และสมเหตุสมผล
- [ ] entry ไม่สรุปผลทางกฎหมายหรือสถานะ compliance
- [ ] คำถามทางกฎหมายที่เปิดอยู่ยังเปิด และไม่ถูกตอบใน requirement
- [ ] ไม่มี vendor endorsement ในแหล่ง ตัวอย่าง หรือ claim

### เนื้อหาไทย

- [ ] ถ้อยคำไทยมีความหมายเดียวกับอังกฤษ
- [ ] คำเทคนิคตรงกับ `docs/th/glossary.md`
- [ ] ID, YAML key, วันที่ ตัวเลข และการอ้างอิงไม่เปลี่ยน
- [ ] `translation_status` และ `machine_translated` ตรงกับความจริง
- [ ] ไม่มีหน้าใดระบุ `complete` โดยไม่มีผู้ตรวจมนุษย์ที่ระบุชื่อ

### Project template และ CLI

- [ ] `init` สร้าง instance ที่ถูกต้องสำหรับทั้งสอง profile
- [ ] `project validate` อ่านอย่างเดียวและ exit non-zero เมื่อ lock ล้า
- [ ] `project refresh` เขียนเฉพาะ `assurance.lock.yaml`
- [ ] ไฟล์ที่หายสร้าง issue ที่อ่านได้และระบุชื่อไฟล์
- [ ] lockfile deterministic และไม่มี timestamp หรือ generator
- [ ] ตัวอย่างทั้งห้า validate ผ่าน

### Governance และ claims

- [ ] ข้อความ readiness แยกสิ่งที่ทำได้กับสิ่งที่ยังขาด
- [ ] ไม่มีหน้ากล่าวอ้าง external review การรับรอง หรือ legal review
- [ ] owner sign-off แยกจาก external review ได้
- [ ] ข้อจำกัดครอบคลุมข้อมูล synthetic ผู้ประเมินหนึ่งคน และ register ที่ยัง
      unverified

## ลิงก์หลักฐาน

รันคำสั่งเหล่านี้จาก clean checkout ที่ commit ที่ตรวจ และบันทึกผล ตัวเลขด้านล่าง
เป็น baseline ที่บันทึกตอนจัดทำ packet เมื่อ 2026-10-28 หลัง #140 และ #141 ให้คำนวณใหม่ที่ commit ที่ตรวจ

| หลักฐาน | คำสั่งหรือตำแหน่ง | baseline ตอนจัดทำ |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------------- |
| เนื้อหามาตรฐาน | `npm run sras -- validate --all` | 53 ไฟล์ |
| Tests | `npm test` | ผ่าน 327 |
| Type และ style | `npm run typecheck`, `npm run lint`, `npm run format:check` | ผ่าน |
| Reference pages | `npm run sras -- render --check` | 154 หน้า |
| เอกสารสองภาษา | `npm run check:docs`, `npm run docs:build` | 182 English, 29 Thai |
| Content guard | `npm run sras -- guard` | สแกน 346 ไฟล์ |
| FDS pack | `npm run check:fds` | 43 skills ที่ `4d3875c` |
| ตัวอย่างโปรเจกต์ | `npm run sras -- project validate examples/<name>` | ผ่าน 5 จาก 5 |
| Pilot reports | `docs/en/pilots/` | pilot synthetic สองชุด |
| Finding triage | `docs/en/pilots/summary.md` | 18 finding มี disposition |
| Readiness review | `docs/en/governance/v1-readiness.md` | ยังไม่พร้อม v1.0.0 |
| คำถามทางกฎหมายที่เปิด | issues #128, #129, #130, #131 | เปิด |
| Release issues คงเหลือ | issues #61, #62, #63, #64, #65, #66 | เปิด |
| Release ที่ตรวจ | [v0.9.0](https://github.com/yutna/software-delivery-assurance/releases/tag/v0.9.0) | เผยแพร่ |

Repository: <https://github.com/yutna/software-delivery-assurance>

## วิธีบันทึกผล

1. เจ้าของระบุชื่อผู้ตรวจ และผู้ตรวจยืนยันขอบเขตเป็นลายลักษณ์อักษร
2. ผู้ตรวจทำงานที่ commit ที่ระบุและบันทึก SHA
3. ผู้ตรวจเขียน record ด้วยฟิลด์ใน template ด้านล่าง record อาจอยู่ในหน้า
   governance ใหม่ เอกสารที่ลงนาม หรือ comment ของ issue แต่ต้องเป็นสาธารณะหรือ
   มีลิงก์จาก repository
4. finding ทุกอันมี severity owner และ disposition finding ไม่ถูกปิดด้วยความเงียบ
5. ผู้ตรวจระบุ verdict: `accepted`, `accepted with findings` หรือ `not accepted`
   verdict เป็นเรื่องของขอบเขตการตรวจ ไม่ใช่ compliance ทางกฎหมาย
6. ผู้ดูแล triage finding เป็น issue ผู้ตรวจไม่แก้มาตรฐาน translation status หรือ
   sign-off แทนผู้ดูแล
7. ผู้ดูแลอัปเดตหน้า readiness หลังมี record เท่านั้น และลิงก์ record หน้านั้นยัง
   ต้องแยก external review ออกจาก owner sign-off และ AI self-review

ผู้ตรวจมนุษย์ที่ระบุชื่อเท่านั้นที่เขียนฟิลด์ของผู้ตรวจได้ AI agent อาจจัดทำ
packet นี้และถอดความ record ได้เมื่อ record ระบุชื่อมนุษย์ วันที่ และหลักฐาน และ
มนุษย์ยืนยันการถอดความนั้น AI agent ต้องไม่สร้างชื่อผู้ตรวจ วันที่ verdict หรือ
ลายเซ็นขึ้นเอง

## Template record การตรวจ

คัดลอก block นี้ไปยัง record เว้นช่องว่างแทนการเดา

```text
Reviewer name:
Reviewer role and affiliation:
Independence statement:
Review date:
Commit reviewed:
SRAS version reviewed:
Scope reviewed:
Out of scope:
Questions answered (number each answer):
Findings (ID, severity, evidence, recommendation):
Verdict (accepted / accepted with findings / not accepted):
Limitations:
Signature or verifiable approval:
```

## หน้าที่เกี่ยวข้อง

- [v1.0.0 readiness review](v1-readiness.md)
- [Pilot summary and triage](../pilots/summary.md)
- [Governance policy](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
- [Execution status](https://github.com/yutna/software-delivery-assurance/issues/67)
