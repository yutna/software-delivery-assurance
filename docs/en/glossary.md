---
translation_status: complete
machine_translated: false
---

# Glossary

The same terms are used in English and Thai. Identifiers, schema keys, and file
names stay in English.

## Core terms

- **SRAS** — the reference requirements library in this repository. SRAS is a
  product name, not a certification mark or a published standard. Commands and
  pages may call this content "standard content"; that is shorthand for the
  reference content, not a published standard.
- **assurance** — การรับประกัน. The evidence-based work of showing that
  delivery claims are supported and limits are visible.
- **assessment** — การประเมิน. A point-in-time evaluation of applicable
  requirements, statuses, gaps, and evidence.
- **evidence** — หลักฐาน. A record that supports a requirement or a claim, with
  an owner and a freshness limit.
- **evidence freshness** — ความสดของหลักฐาน. Whether evidence is inside its
  maximum age at the assessment date.
- **gate** — เกต. A requirement that must meet the minimum level before
  delivery and cannot be waived.
- **module** — โมดูล. An optional technical extension selected by product
  characteristic.
- **overlay** — ส่วนเพิ่ม. A jurisdiction or industry delta that adds,
  overrides, or waives non-gate requirements.
- **register** — ทะเบียน. A factual index of a law, regulation, standard, or
  guidance with an official source.
- **claim** — ข้อกล่าวอ้าง. A public statement supported by evidence, with
  allowed and prohibited wording.
- **project instance** — อินสแตนซ์โปรเจกต์. A private or separate repository
  holding scope, assessment, evidence index, claims, and risk.
- **lockfile** — ไฟล์ lock. `assurance.lock.yaml`, which pins the resolved
  inputs, their versions, and their SHA-256 checksums.
- **resolution** — การ resolve. The computed requirement set for a project's
  profile, tier, modules, and overlays.
- **profile** — โปรไฟล์. The assessment mode: `lite` or `full`.
- **tier** — ระดับ tier. The product risk tier (1–3) that decides which Core
  requirements apply.
- **maturity** — ระดับ maturity. The L0–L4 depth recorded on a requirement in
  the full profile.
- **criticality** — ระดับความสำคัญ. The weight of a requirement: `gate`,
  `high`, `medium`, or `low`.
- **finding** — ข้อค้นพบ. A gap, defect, or observation recorded by an
  assessment or review.
- **remediation** — การแก้ไข. The action that closes a finding, with an owner
  and a due date.
- **risk acceptance** — การยอมรับความเสี่ยง. A documented, owned, time-bound
  decision to accept a risk instead of closing it.

## Terms that are not synonyms

- A **register** is not an **overlay**.
- A **module** is not a **sector overlay**.
- An **assessment** is not a **certification**.
- A **claim** is not **evidence**.
- A **gate** cannot be **waived**.
- A **project instance** is not this public repository.
- The **SRAS reference library** is not a **published standard**.

## Related pages

- [Concepts](concepts/index.md)
- [Requirements and criticality](concepts/requirements.md)
- [Claims and evidence](concepts/claims-and-evidence.md)
