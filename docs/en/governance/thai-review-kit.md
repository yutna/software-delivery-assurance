---
translation_status: complete
machine_translated: false
---

# Thai review kit

**Status: kit only. No Thai review has been performed. No requirement has been
marked complete, and no `machine_translated` value has been changed.**

**Prepared:** 2026-10-28. **Scope:** all 167 active requirements — 70 Core, 52
module, and 45 overlay requirements. Every one is currently
`translation_status: partial` with `machine_translated: true`.

This kit makes the human Thai review practical. It does not replace the
reviewer. A named human must read the English and Thai text, decide each
requirement, and record the decision. The AI execution agent must not mark a
requirement complete or set `machine_translated: false` on the reviewer's
behalf.

## Who may review

The reviewer must:

- be a named human who reads Thai and English;
- understand the delivery, risk, and legal vocabulary of the requirements, or
  work with a named Thai reviewer who does;
- have no conflict of interest that they have not disclosed;
- record a name, a date, a commit, a scope, and a decision for every ID they
  approve.

A machine translation, an AI agent, or an unnamed "reviewer" cannot satisfy this
step. If the review is split, each reviewer records their own name, scope, and
IDs.

## How to use this kit

1. Record the reviewer, date, commit, and scope in the tracking template below.
2. Pick a layer and a reference page. Do not review a page without its source
   YAML open.
3. Read the English and Thai fields side by side: `title`, `description`,
   `rationale`, `assessment`, and any `references`.
4. Apply the per-page checklist. Record a decision for every ID on the page.
5. If a page needs a change, record the finding and the proposed Thai wording.
   Do not change the status yet.
6. After the wording is corrected, re-read the page and record `approved`.
7. Only when every ID in the agreed scope is `approved`, update the YAML fields
   using the instructions below.
8. Run `npm run sras -- validate --all`, `npm run sras -- render --check`, and
   `npm test`. Record the results in the review log.

## Glossary

The full glossary is [the Thai glossary](../glossary.md). These are the terms
that most often drift in translation:

- **assurance** — การรับประกัน
- **assessment** — การประเมิน
- **evidence** — หลักฐาน
- **gate** — เกต
- **module** — โมดูล
- **overlay** — ส่วนเพิ่ม
- **register** — ทะเบียน
- **claim** — ข้อกล่าวอ้าง
- **project instance** — อินสแตนซ์โปรเจกต์
- **profile** — โปรไฟล์
- **maturity** — ระดับ maturity
- **criticality** — ระดับความสำคัญ
- **finding** — ข้อค้นพบ
- **remediation** — การแก้ไข
- **risk acceptance** — การยอมรับความเสี่ยง

Identifiers, schema keys, file names, command names, and product names stay in
English. Do not translate an ID or a key.

## Inventory

The tables list every active requirement, its source YAML, its reference page,
and a blank decision column. The reference page is the English page that renders
the requirement; the Thai text lives in the source YAML. Overlay requirements
share one overlay page.

Counts: 70 Core + 52 module + 45 overlay = 167.

### core (70)

| ID           | Source file                             | Reference page                                   | Decision |
| ------------ | --------------------------------------- | ------------------------------------------------ | -------- |
| SRAS-CHG-001 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-001.md` |          |
| SRAS-CHG-002 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-002.md` |          |
| SRAS-CHG-003 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-003.md` |          |
| SRAS-CHG-004 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-004.md` |          |
| SRAS-CHG-005 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-005.md` |          |
| SRAS-CHG-006 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-006.md` |          |
| SRAS-CHG-007 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-007.md` |          |
| SRAS-CHG-008 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-008.md` |          |
| SRAS-CHG-009 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-009.md` |          |
| SRAS-CHG-010 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-010.md` |          |
| SRAS-GOV-001 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-001.md` |          |
| SRAS-GOV-002 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-002.md` |          |
| SRAS-GOV-003 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-003.md` |          |
| SRAS-GOV-004 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-004.md` |          |
| SRAS-GOV-005 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-005.md` |          |
| SRAS-GOV-006 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-006.md` |          |
| SRAS-GOV-007 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-007.md` |          |
| SRAS-GOV-008 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-008.md` |          |
| SRAS-GOV-009 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-009.md` |          |
| SRAS-GOV-010 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-010.md` |          |
| SRAS-INC-001 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-001.md` |          |
| SRAS-INC-002 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-002.md` |          |
| SRAS-INC-003 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-003.md` |          |
| SRAS-INC-004 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-004.md` |          |
| SRAS-INC-005 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-005.md` |          |
| SRAS-INC-006 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-006.md` |          |
| SRAS-INC-007 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-007.md` |          |
| SRAS-INC-008 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-008.md` |          |
| SRAS-OPS-001 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-001.md` |          |
| SRAS-OPS-002 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-002.md` |          |
| SRAS-OPS-003 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-003.md` |          |
| SRAS-OPS-004 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-004.md` |          |
| SRAS-OPS-005 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-005.md` |          |
| SRAS-OPS-006 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-006.md` |          |
| SRAS-OPS-007 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-007.md` |          |
| SRAS-OPS-008 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-008.md` |          |
| SRAS-OPS-009 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-009.md` |          |
| SRAS-OPS-010 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-010.md` |          |
| SRAS-PRV-001 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-001.md` |          |
| SRAS-PRV-002 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-002.md` |          |
| SRAS-PRV-003 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-003.md` |          |
| SRAS-PRV-004 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-004.md` |          |
| SRAS-PRV-005 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-005.md` |          |
| SRAS-PRV-006 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-006.md` |          |
| SRAS-PRV-007 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-007.md` |          |
| SRAS-PRV-008 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-008.md` |          |
| SRAS-PRV-009 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-009.md` |          |
| SRAS-PRV-010 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-010.md` |          |
| SRAS-SEC-001 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-001.md` |          |
| SRAS-SEC-002 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-002.md` |          |
| SRAS-SEC-003 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-003.md` |          |
| SRAS-SEC-004 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-004.md` |          |
| SRAS-SEC-005 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-005.md` |          |
| SRAS-SEC-006 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-006.md` |          |
| SRAS-SEC-007 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-007.md` |          |
| SRAS-SEC-008 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-008.md` |          |
| SRAS-SEC-009 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-009.md` |          |
| SRAS-SEC-010 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-010.md` |          |
| SRAS-SEC-011 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-011.md` |          |
| SRAS-SEC-012 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-012.md` |          |
| SRAS-SCM-001 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-001.md` |          |
| SRAS-SCM-002 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-002.md` |          |
| SRAS-SCM-003 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-003.md` |          |
| SRAS-SCM-004 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-004.md` |          |
| SRAS-SCM-005 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-005.md` |          |
| SRAS-SCM-006 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-006.md` |          |
| SRAS-SCM-007 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-007.md` |          |
| SRAS-SCM-008 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-008.md` |          |
| SRAS-SCM-009 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-009.md` |          |
| SRAS-SCM-010 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-010.md` |          |

### module (52)

| ID           | Source file                          | Reference page                                   | Decision |
| ------------ | ------------------------------------ | ------------------------------------------------ | -------- |
| SRAS-AI-001  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-001.md`  |          |
| SRAS-AI-002  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-002.md`  |          |
| SRAS-AI-003  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-003.md`  |          |
| SRAS-AI-004  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-004.md`  |          |
| SRAS-AI-005  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-005.md`  |          |
| SRAS-AI-006  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-006.md`  |          |
| SRAS-AI-007  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-007.md`  |          |
| SRAS-AI-008  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-008.md`  |          |
| SRAS-AI-009  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-009.md`  |          |
| SRAS-AI-010  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-010.md`  |          |
| SRAS-AI-011  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-011.md`  |          |
| SRAS-AI-012  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-012.md`  |          |
| SRAS-CLD-001 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-001.md` |          |
| SRAS-CLD-002 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-002.md` |          |
| SRAS-CLD-003 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-003.md` |          |
| SRAS-CLD-004 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-004.md` |          |
| SRAS-CLD-005 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-005.md` |          |
| SRAS-CLD-006 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-006.md` |          |
| SRAS-CLD-007 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-007.md` |          |
| SRAS-CLD-008 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-008.md` |          |
| SRAS-CLD-009 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-009.md` |          |
| SRAS-CLD-010 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-010.md` |          |
| SRAS-INT-001 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-001.md` |          |
| SRAS-INT-002 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-002.md` |          |
| SRAS-INT-003 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-003.md` |          |
| SRAS-INT-004 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-004.md` |          |
| SRAS-INT-005 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-005.md` |          |
| SRAS-INT-006 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-006.md` |          |
| SRAS-INT-007 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-007.md` |          |
| SRAS-INT-008 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-008.md` |          |
| SRAS-INT-009 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-009.md` |          |
| SRAS-INT-010 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-010.md` |          |
| SRAS-ONP-001 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-001.md` |          |
| SRAS-ONP-002 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-002.md` |          |
| SRAS-ONP-003 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-003.md` |          |
| SRAS-ONP-004 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-004.md` |          |
| SRAS-ONP-005 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-005.md` |          |
| SRAS-ONP-006 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-006.md` |          |
| SRAS-ONP-007 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-007.md` |          |
| SRAS-ONP-008 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-008.md` |          |
| SRAS-ONP-009 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-009.md` |          |
| SRAS-ONP-010 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-010.md` |          |
| SRAS-RGD-001 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-001.md` |          |
| SRAS-RGD-002 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-002.md` |          |
| SRAS-RGD-003 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-003.md` |          |
| SRAS-RGD-004 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-004.md` |          |
| SRAS-RGD-005 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-005.md` |          |
| SRAS-RGD-006 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-006.md` |          |
| SRAS-RGD-007 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-007.md` |          |
| SRAS-RGD-008 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-008.md` |          |
| SRAS-RGD-009 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-009.md` |          |
| SRAS-RGD-010 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-010.md` |          |

### overlay (45)

| ID         | Source file                                      | Reference page                         | Decision |
| ---------- | ------------------------------------------------ | -------------------------------------- | -------- |
| TH-ECM-001 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-002 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-003 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-004 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-005 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-006 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-007 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-008 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-009 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-010 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-011 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-012 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-FIN-001 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-002 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-003 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-004 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-005 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-006 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-007 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-008 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-009 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-010 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-LOG-001 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-002 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-003 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-004 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-005 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-006 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-007 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-008 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-009 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-010 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-011 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-PUB-001 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-002 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-003 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-004 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-005 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-006 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-007 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-008 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-009 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-010 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-011 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-012 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |

## Per-page checklist

Use this once per reference page. A core or module page has one ID; an overlay
page has several, so record each ID separately.

- [ ] The page is generated from the source YAML in the inventory, not edited by
      hand.
- [ ] The English `title`, `description`, and `rationale` match the Thai fields
      in meaning, scope, and strength.
- [ ] The Thai text reads naturally, with no machine-translation artifacts,
      duplicated words, or unexplained English.
- [ ] Technical terms follow the glossary; IDs, keys, commands, and product
      names stay in English.
- [ ] Numbers, dates, thresholds, evidence types, freshness, and citations are
      unchanged.
- [ ] No legal conclusion, compliance claim, agency name, vendor endorsement, or
      real evidence was added.
- [ ] Gate and criticality wording is as strong in Thai as in English; a gate is
      not softened into a suggestion.
- [ ] `translation_status` is still `partial` and `machine_translated` is still
      `true` until the reviewer records approval.
- [ ] Every ID on an overlay page has its own decision.

A page is `approved` only when every ID on it is approved. A `revise` or
`reject` decision keeps the whole page out of the completed set.

## How to mark a requirement complete

Only after a named human reviewer approves the ID, edit its entry in the source
YAML. The schema requires the two review fields when
`translation_status: complete`:

```yaml
translation_status: complete
machine_translated: false
translation_reviewed_by: Reviewer Name or @handle
translation_reviewed_at: "YYYY-MM-DD"
```

Rules:

- `translation_reviewed_by` is the named human, not an AI agent, a tool, or a
  team label.
- `translation_reviewed_at` is the date the human completed the review.
- Do not set `translation_status: complete` while any Thai field on the page is
  still under revision; the schema and `validate --all` will reject a missing
  review field, but they cannot judge the translation.
- Do not change `review_status`, `reviewed_by`, `reviewed_at`, or
  `review_scope` unless a separate content review happened. Translation review
  is not content review.
- Do not change the English source, an ID, a version, or a threshold in a
  translation-only change.
- If the reviewer cannot approve an ID, leave it `partial` and record the
  finding in the review log.

## Tracking template

Copy this block to the review log. Add one row per ID from the inventory.

```text
Reviewer name:
Reviewer role and affiliation:
Independence statement:
Review date:
Commit reviewed:
Scope (all / Core / modules / overlays / page list):
Decision key: approved / revise / reject

ID | Source file | Decision | Note or proposed Thai wording
... | ... | ... | ...

Validation run:
- npm run sras -- validate --all:
- npm run sras -- render --check:
- npm test:
```

## Definition of done for the Thai review

- Every ID in the agreed scope has a named decision.
- Every approved ID has `translation_status: complete`,
  `machine_translated: false`, `translation_reviewed_by`, and
  `translation_reviewed_at`.
- Every `revise` or `reject` ID remains `partial`, with a finding and an owner.
- The review log is committed or linked from the repository.
- `validate --all`, `render --check`, and the tests pass.
- The readiness page is updated by the owner, not by the reviewer or an AI
  agent, and it links the review log.

This kit does not close the milestone, cut a release, or claim that the review
is finished.

## Related pages

- [External review packet](external-review-packet.md)
- [v1.0.0 readiness review](v1-readiness.md)
- [Thai glossary](../glossary.md)
- [Execution status](https://github.com/yutna/software-delivery-assurance/issues/67)
