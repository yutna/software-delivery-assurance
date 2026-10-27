import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { SourceFile } from "../../src/sras/standard/dto.js";

export const fixture = (path: string): string =>
  readFileSync(join(process.cwd(), "tests", "fixtures", path), "utf8");

export const profileFull = fixture("valid/profile-lite.yaml").replace(
  "id: lite",
  "id: full",
);

export const overlay = `id: TH-FIN
type: industry
jurisdiction: TH
industry: finance
title:
  en: Thailand finance overlay
  th: overlay ภาคการเงินประเทศไทย
description:
  en: Assurance deltas for financial services in Thailand.
  th: ส่วนเพิ่ม assurance สำหรับบริการการเงินในประเทศไทย
version: 0.1.0
extends: ">=0.1.0 <1.0.0"
requires:
  - SRAS-AI
adds:
  - id: TH-FIN-001
    version: 0.1.0
    overlay: TH-FIN
    title:
      en: Critical financial services have a documented maximum tolerable downtime
      th: บริการการเงินที่สำคัญมี maximum tolerable downtime ที่จัดทำเอกสารไว้
    description:
      en: Every critical financial service must have an approved maximum tolerable downtime and a tested recovery objective.
      th: บริการการเงินที่สำคัญทุกรายการต้องมี maximum tolerable downtime ที่อนุมัติแล้วและ recovery objective ที่ผ่านการทดสอบ
    rationale:
      en: Availability commitments cannot be assessed without a stated tolerance.
      th: ไม่สามารถประเมิน commitment ด้าน availability ได้หากไม่มี tolerance ที่ระบุไว้
    criticality: gate
    applicability:
      tiers: [2, 3]
      modules: [SRAS-AI]
      overlays: [TH-FIN]
      excludes: []
    evidence:
      - type: document
        description: Approved maximum tolerable downtime and recovery objective
        max_age_days: 365
    assessment:
      lite:
        pass: The downtime tolerance and recovery objective are documented.
        partial: The objective is documented but the test is incomplete.
      full:
        l2: Documented and approved for the current release.
        l3: Measured against production incidents and recovery results.
    references:
      - title: Bank of Thailand IT risk guidance
        url: https://www.bot.or.th
        type: guidance
    tags: [availability, recovery]
    status: active
    introduced_in: 0.1.0
    deprecated_in: null
    replaced_by: null
    translation_status: partial
    machine_translated: true
    review_status: draft
    created_at: "2026-10-27"
    updated_at: "2026-10-27"
overrides: []
waives: []
sources: []
not_covered:
  en: Prudential capital requirements and licensing advice.
  th: ข้อกำหนดเงินทุน prudential และคำแนะนำด้านใบอนุญาต
review_checklist: review-checklist.md
status: active
deprecated_in: null
translation_status: partial
machine_translated: true
review_status: draft
created_at: "2026-10-27"
updated_at: "2026-10-27"
`;

export const validFiles: readonly SourceFile[] = [
  { path: "core/sras.yaml", text: fixture("valid/standard.yaml") },
  {
    path: "core/domains/security.yaml",
    text: fixture("valid/requirements-file.yaml"),
  },
  { path: "core/profiles/lite.yaml", text: fixture("valid/profile-lite.yaml") },
  { path: "core/profiles/full.yaml", text: profileFull },
  { path: "modules/ai/module.yaml", text: fixture("valid/module-ai.yaml") },
  {
    path: "mappings/iso-27001.yaml",
    text: fixture("valid/crosswalk.yaml"),
  },
  { path: "overlays/industries/finance/overlay.yaml", text: overlay },
];
