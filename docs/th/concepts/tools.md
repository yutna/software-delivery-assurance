---
translation_status: partial
machine_translated: true
---

# เครื่องมือและการตรวจสอบ

CLI `sras` เป็น shell บาง ๆ เหนือ core TypeScript ที่บริสุทธิ์ ใช้ตรวจสอบ
เนื้อหามาตรฐาน render reference pages guard เนื้อหาสาธารณะ และสร้าง project
instance

## คำสั่ง

- `npm run sras -- --version` — แสดง version ของ SRAS
- `npm run sras -- --help` — แสดงรายการคำสั่ง
- `npm run sras -- validate --all` — ตรวจสอบไฟล์ YAML มาตรฐานทั้งหมด
- `npm run sras -- init <dir> --profile lite` — สร้าง project instance แบบ lite
- `npm run sras -- init <dir> --profile full` — สร้าง project instance แบบ full
- `npm run sras -- project validate <dir>` — ตรวจ project instance ที่มีอยู่
- `npm run sras -- project refresh <dir>` — คำนวณ lockfile ของโปรเจกต์ใหม่
- `npm run sras -- render` — เขียน reference pages ภาษาอังกฤษ
- `npm run sras -- render --check` — ตรวจ reference pages โดยไม่เขียน
- `npm run sras -- guard` — สแกนเนื้อหาสาธารณะ
- `npm run sras -- guard --format json` — พิมพ์ guard report version 1
- `npm run sras -- guard --annotations` — พิมพ์ GitHub Actions annotations

`npm run sras -- ...` จะ build `dist/` ก่อนรัน ใน CI workflow จะ build ครั้ง
เดียวและเรียก `node dist/cli.js` โดยตรง

## Validate

`validate --all` ตรวจ requirements, modules, overlays, registers และ
crosswalks เทียบกับ JSON Schema 2020-12 และกฎของโดเมน รายงานจำนวนไฟล์ที่
ตรวจสอบ ปัญหา schema หรือโดเมนจะออกด้วย exit code 1

## Project validate และ refresh

`project validate <dir>` อ่าน project instance ที่มีอยู่ parse ไฟล์โปรเจกต์
ทุกไฟล์ด้วย schema และ parser เดียวกับ `init` ใช้กฎของโปรเจกต์ resolve
selection เทียบกับ library และตรวจ checksum ของ lockfile คำสั่งนี้อ่านอย่างเดียว
และออกด้วย exit code 1 เมื่อพบปัญหา

`project refresh <dir>` สร้าง `assurance.lock.yaml` ใหม่จาก selection ใน
manifest ปัจจุบันและ standard input ที่ resolve แล้ว ตรวจ instance ที่จะเขียน
ก่อน เขียนเฉพาะ lockfile และไม่แก้ไฟล์อื่น module, overlay หรือ profile ที่
ไม่รู้จักจะถูกรายงานแทนการเขียน

## Render

`render` เขียน `docs/en/reference/` จาก YAML ต้นทาง ผลลัพธ์เป็น deterministic
ลำดับหน้า ลำดับรายการ และเนื้อหาไม่มี timestamp หรือข้อมูล environment

`render --check` คำนวณหน้าใหม่และรายงานไฟล์ที่หาย เปลี่ยน หรือเกิน โดยไม่เขียน
reference pages ถูก generate ให้แก้ที่ YAML แล้วรัน renderer ใหม่ ไม่ใช่แก้
Markdown

## Guard

`guard` สแกนเนื้อหาสาธารณะเพื่อหา

- คำศัพท์ของภาคธุรกิจนอกขอบเขต
- secrets และรูปแบบ credential
- private network identifier
- รูปแบบข้อมูลส่วนบุคคล
- ชื่อลูกค้าจาก private override
- ถ้อยคำที่ไม่ปลอดภัย

`--format json` พิมพ์ report version 1 ที่คงที่ไปยัง stdout `--annotations`
พิมพ์ GitHub Actions annotations พร้อมไฟล์และบรรทัด สอง flag ใช้ร่วมกันไม่ได้

public denylist คือ `guard/denylist.yaml` private override เพิ่มได้ผ่าน
`SRAS_DENYLIST_PATH` override ไม่ถูก commit และลดทอนกฎสาธารณะไม่ได้

## Init

`init` คัดลอก template โปรเจกต์ แทน placeholder ใช้ profile คำนวณ lockfile
และตรวจสอบผลก่อนเขียน ปฏิเสธ directory ที่ไม่ว่างและ path ที่มี `..` และไม่เรียก
network

## Exit codes

- `0` — คำสั่งสำเร็จและการตรวจสอบผ่าน
- `1` — พบปัญหาหรือ finding, validation ล้มเหลว, render drift หรือ `init`
  ปฏิเสธตามที่คาด
- `2` — ใช้งานผิด: ไม่รู้จักคำสั่งหรือ flag, argument หาย, ค่าไม่ถูกต้อง

## การตรวจใน CI

repository รันสิ่งเหล่านี้ในทุก pull request

- TypeScript typecheck, lint, formatting และ Markdown lint
- Vitest พร้อม coverage
- FDS pack และ forbidden-pattern check
- Schema validation, render check และ content guard
- Dependency audit
- CodeQL analysis
- Docs build และ link check ตั้งแต่ v0.6.0

`ci-ok` เป็น required check เดียว และขึ้นกับทุก job ใน CI

## หน้าที่เกี่ยวข้อง

- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
- [Claim และ evidence](claims-and-evidence.md)
- [Reference](../reference/index.md)
