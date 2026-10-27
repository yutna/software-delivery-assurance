# Software Delivery Assurance Library — Execution Plan

**Repository:** `yutna/software-delivery-assurance`  
**Plan version:** 1.1  
**Plan date:** 2026-10-22  
**Owner:** Yutthana Siphuengchai (`@yutna`)  
**Status:** Planning only. Do not create the repository or start implementation until the owner starts the dedicated execution session.  
**Execution model:** A new session reads this plan end-to-end, then executes it phase by phase.  
**Mandatory workflow:** `yutna/oss-kit` + `yutna/oss-template`.  
**Mandatory design rules:** `yutna/functional-design-skills` (FDS), pinned at `4d3875c`, pack version `3.3.0`, for every TypeScript tool in this repository.  
**Stack:** TypeScript 5.9 on Node.js 24 LTS. No Python tooling.

> This plan is intentionally explicit. Where a choice is not legally or technically forced, a default is stated so the execution session does not need to ask. Do not substitute a different workflow, do not create a private staging repository with `oss-kit`, and do not start with content before the repository, schema, and CI are in place.

---

## Table of contents

1. Mission and success criteria
2. Scope
3. Inputs and audit
4. Repository identity
5. Architecture
6. Data model
7. Content plan
8. Sector overlays
9. Regulatory registers
10. Bilingual strategy
11. Versioning and compatibility
12. GitHub workflow
13. CI/CD design
14. Quality gates
15. Roadmap and milestones
16. Phase-by-phase execution
17. Testing strategy
18. Security and privacy
19. Governance
20. Risks and mitigations
21. Audit checklist
22. Handoff instructions
23. Defaults and non-negotiables
24. Definition of done
25. Functional design and TypeScript rules (FDS)
- Appendix A — Exact file templates
- Appendix B — Command reference
- Appendix C — Content guard denylist
- Appendix D — Release note template
- Appendix E — What “done” means for the owner

---

## 1. Mission and success criteria

### 1.1 Mission

Build a public, evidence-based, reusable library for software delivery assurance that helps teams answer four questions:

1. What must be true before software is delivered?
2. What evidence proves it?
3. What may we claim, and what may we not claim?
4. What is the gap and remediation plan?

The library is not a certification scheme, not legal advice, and not a customer-specific assessment. It is an open reference baseline plus reusable assessment machinery.

### 1.2 Success criteria

The project is successful when:

- A new user can understand the library in 10 minutes from `README.md`.
- A project team can create a project instance, select modules and overlays, and produce a gap/claim report without reading every source file.
- Every requirement has a stable ID, a testable statement, an evidence expectation, and a Thai/English title.
- Every regulatory statement has a source, version, effective date, last-verified date, and review status.
- Every public claim is traceable to evidence or explicitly marked as not claimable.
- The repository passes `oss-kit doctor` with no drift after every release.
- CI is green on every merged PR and every release.
- Every TypeScript tool follows FDS: strict TypeScript, `Result` for expected failures, branded domain primitives, readonly domain types, discriminated unions with `assertNever`, DTO parsing at boundaries, and a pure core with effects at the edges.
- The pinned FDS skill pack is present in `.claude/skills/`, verified by `npm run check:fds`, and the project `CLAUDE.md` tells agents to use it.
- No customer data, patient data, secrets, hostnames, IP addresses, or legal opinions enter the public repository.
- No Python runtime, Python package, or Python-based custom tool is introduced. The docs site is VitePress, not MkDocs.

### 1.3 Indicative timeline

These are planning targets, not contractual deadlines. The owner may change them.

| Phase | Target |
|---|---|
| v0.1.0 Foundation | 10 working days after execution starts |
| v0.2.0 Core SRAS | 4 weeks |
| v0.3.0 Modules | 6 weeks |
| v0.4.0 Thailand sector overlays + register | 9 weeks |
| v0.5.0 Project template + CLI | 12 weeks |
| v0.6.0 Bilingual documentation site | 14 weeks |
| v0.7.0 ASEAN registers | 18 weeks |
| v0.8.0 EU registers | 22 weeks |
| v0.9.0 Pilot and community review | 28 weeks |
| v1.0.0 Stable | 32 weeks |

The timeline assumes one maintainer working part-time. If the owner wants a faster path, cut scope by releasing fewer requirements per milestone, not by skipping schema, CI, or audit.

---

## 2. Scope

### 2.1 In scope

- SRAS Core: seven domains, approximately 60–70 requirements.
- Modules: AI/GenAI, integration/API, regulated data, cloud/SaaS, on-prem.
- Sector overlays for Thailand: finance, e-commerce, logistics, and public sector. The schema and resolver support jurisdiction overlays, but no separate jurisdiction overlay is populated in v0.x.
- Regulatory registers: Thailand, ASEAN, EU.
- Project instance template: assessment, evidence index, claims, risk register, lockfile.
- TypeScript CLI on Node.js 24 LTS: validate, render, guard, init, version.
- FDS-compliant TypeScript tools: pure domain core, effectful shell, branded IDs, `Result`, discriminated unions, and DTO parsers at the YAML/CLI boundary.
- Pinned FDS skill pack in `.claude/skills/`, with licence, notice, lockfile, and update procedure.
- JSON Schema (2020-12) for every structured content type, validated with Ajv.
- Bilingual documentation: Thai and English, built with VitePress from v0.6.0.
- Repository automation in TypeScript: `tools/check-version.ts`, `tools/check-fds.ts`, and `tools/sync-fds.ts`.
- Crosswalks to widely used standards: ISO/IEC 27001, ISO/IEC 27701, ISO 22301, ISO 31000, NIST CSF 2.0, OWASP ASVS, PCI DSS, WCAG 2.2, ISO/IEC 42001, NIST AI RMF, SOC 2.
- GitHub workflow: issues, milestones, labels, branches, draft PRs, CI, releases, security settings.
- Governance, disclaimer, contribution, security, and roadmap documents.

### 2.2 Out of scope

- **Healthcare sector work.** Do not create a healthcare overlay, healthcare example, clinical requirements, hospital case study, or healthcare-specific register entry in this repository. In SRAS-owned public files, write only “Healthcare is out of scope”. The pinned FDS upstream skill pack is third-party reference material, is not SRAS content, and is excluded from the content guard; its clinical examples must never be copied into `core/`, `modules/`, `overlays/`, `registers/`, `templates/`, `examples/`, `docs/`, or the README.
- Python runtime, Python packaging, MkDocs, and Python-based custom tooling. The repository stack is TypeScript on Node.js.
- Customer-specific assessments, evidence, contracts, legal opinions, and pricing.
- Certification, accreditation, audit attestation, or regulatory approval.
- Legal advice or definitive statements of legal compliance.
- A hosted SaaS product, dashboard, or multi-tenant platform.
- Real patient data, customer data, production credentials, or internal hostnames.
- Languages other than Thai and English.
- Full EU/ASEAN legal mapping without qualified review.
- Vendor scorecards or product endorsements.
- A replacement for a customer's own security, privacy, or quality programme.

### 2.3 Sector priority

All four sectors are in scope for the project, but content is authored and released in this order:

1. Finance
2. E-commerce
3. Logistics
4. Public sector

The order reflects dependency and reuse: finance establishes strong evidence and third-party risk patterns; e-commerce reuses payment and privacy controls; logistics reuses availability and chain-of-custody controls; public sector reuses procurement, records, accessibility, and sovereignty controls.

### 2.4 Market priority

1. Thailand
2. ASEAN
3. EU

Thailand gets full overlays and a maintained register. ASEAN and EU start as **register-only** references with `review_status: unverified`; they do not become compliance overlays until a qualified reviewer is named.

---

## 3. Inputs and audit

### 3.1 Source of truth for this plan

| Input | Location | Role |
|---|---|---|
| Workflow specification | <https://github.com/yutna/oss-kit> | Mandatory repository workflow, CLI, labels, rulesets, release process |
| Repository template | <https://github.com/yutna/oss-template> | Mandatory files, issue forms, PR template, CI gate, Dependabot, release caller |
| Current SRAS draft | Private source gist (URL redacted in this copy) | Content seed; must be restructured, not copied blindly |
| Owner decisions | This plan | Scope, sectors, exclusions, defaults |
| OpenCode session handoff | This plan | Execution instructions for the new session |

### 3.2 Audit of `oss-kit` at plan time

- Repository is public, MIT-licensed, default branch `main`.
- Audited commit: `11a95f3` — `fix: keep bot patch milestones in version order (#32)`.
- `oss-kit new` creates a **public** repository from `yutna/oss-template`, fills placeholders, appends stack extras, pushes an initial commit, then applies settings, security, labels, milestones `Backlog` + `v0.1.0`, and rulesets.
- `oss-kit apply` refuses private repositories and repositories not owned by `yutna`.
- `oss-kit doctor` is read-only and exits non-zero on drift.
- Stacks: `node`, `java-maven`, `java-gradle`, `ruby`, `swift`, `python`, `go`, `elixir`, `none`.
- The `node` stack adds Node `.gitignore` entries and an `npm` Dependabot block. It does **not** add TypeScript configuration, tests, or CI jobs; the first PR must add them.
- `node` is the correct stack for this repository. Do not use the `python` stack.
- `oss-kit new` creates the initial commit before rulesets exist. This is expected.
- `oss-kit` requires `gh`, `git`, `jq`, and `perl`; it runs on macOS `/bin/bash` 3.2.
- `oss-kit` never creates `yutna/.github`. Do not create it.
- The current `gh` token scopes do not include `delete_repo`. Do not plan to delete a repository. Fix forward or ask the owner to delete manually.
- `oss-kit` only manages public repositories. There is no private staging path through `oss-kit`.

### 3.3 Audit of `oss-template` at plan time

- Repository is public, marked as a template, MIT-licensed, default branch `main`.
- Audited commit: `5f8400a` — `fix: keep Windows scripts in CRLF (#4)`.
- Required files enforced by `oss-kit doctor`:
  - `LICENSE`
  - `README.md`
  - `CONTRIBUTING.md`
  - `CODE_OF_CONDUCT.md`
  - `SECURITY.md`
  - `SUPPORT.md`
  - `.editorconfig`
  - `.gitattributes`
  - `.github/pull_request_template.md`
  - `.github/dependabot.yml`
  - `.github/release.yml`
  - `.github/ISSUE_TEMPLATE/config.yml`
  - `.github/ISSUE_TEMPLATE/bug_report.yml`
  - `.github/ISSUE_TEMPLATE/feature_request.yml`
  - `.github/ISSUE_TEMPLATE/question.yml`
- Required workflow callers:
  - `pr-check.yml` calls `yutna/oss-kit/.github/workflows/pr-check.yml@main`
  - `issue-check.yml` calls `yutna/oss-kit/.github/workflows/issue-check.yml@main`
  - `release.yml` calls `yutna/oss-kit/.github/workflows/release.yml@main`
- `ci.yml` must end with a job named exactly `ci-ok` that `needs` every other job.
- Template default license is MIT. The workflow convention says every public repository gets MIT. Do not introduce a second license in v0.1.0; see §23.1.

### 3.4 Audit of the current SRAS gist

The gist contains 14 files and describes SRAS v0.1.0. Its strengths:

- Clear “what this is / what this is not” positioning.
- L0–L4 maturity model, G/H/M/L criticality, gates, readiness index, evidence coverage.
- Claim rules and customer assurance summary.
- AI, integration, regulated data, cloud/SaaS, and on-prem extensions.
- Strong “not a certification / not legal advice” disclaimer.

Its gaps, which this project must close:

- Prose-only Markdown; no structured YAML, JSON Schema, stable IDs, or CI.
- No project instance contract.
- No structured sector overlays or jurisdiction-aware schema; this plan adds four Thailand sector overlays and schema support for jurisdiction overlays, without populating a separate one in v0.x.
- No regulatory register with source/version/review metadata.
- No bilingual source-of-truth policy.
- No executable validator, renderer, or content guard.
- No release process or repository governance.
- No license file in the gist.
- Some terminology (“extensions”) conflicts with the new “overlays” concept; this plan resolves it in §5.3.

### 3.5 Preflight state at plan time

- `yutna/software-delivery-assurance` does **not** exist.
- The local directory `~/Projects/software-delivery-assurance` does **not** exist.
- `yutna/oss-kit` and `yutna/oss-template` exist and are healthy.
- `yutna/functional-design-skills` exists, is public and MIT-licensed, and its `origin/main` is `4d3875c` / pack `3.3.0`. The local clone is behind; use `origin/main`.
- The existing SRAS gist is a draft and must remain untouched until the new repository is ready for content migration.

### 3.6 Workflow constraints that shape the plan

1. Every change goes through an issue, a short branch, a draft PR, CI, and squash merge.
2. PR titles must match Conventional Commits.
3. Every PR must be in a `vX.Y.Z` milestone before merge.
4. Milestones contain 3–7 issues. `Backlog` is permanent and never released.
5. Closing a 100% `vX.Y.Z` milestone creates the tag and GitHub Release.
6. There is no `CHANGELOG.md`; GitHub Releases is the changelog.
7. Wiki, Projects, and Discussions are off. Documentation lives in `docs/`.
8. Only core labels are used by default. Repository-specific labels require an `oss-kit` PR to `bootstrap/label-migrations.json`.
9. `main` requires `ci-ok` and `pr-check / check`; squash merge only; no direct pushes.
10. Release tags `v*` cannot be deleted or moved without temporarily disabling the `release-tags` ruleset.
11. `oss-kit doctor` must report no drift before a release is declared complete.

### 3.7 Audit of `functional-design-skills` (FDS) at plan time

- Repository: <https://github.com/yutna/functional-design-skills>, public, MIT-licensed, default branch `main`.
- Audited commit: `4d3875c` — `The release is measured in one sweep (#73)`.
- Pack version: `3.3.0`. The local clone is behind `origin/main`; read `origin/main`, not the stale working tree.
- Contents: 43 skills under `plugin/skills/functional-*`: 33 core skills, the `functional-design` index, and nine language packs. This repository uses the core skills and `functional-typescript`; the other language packs are present but marked name-only in `.claude/settings.json` to protect the skill-listing budget.
- FDS's own setup instructions: copy `plugin/skills/<name>/` into a project's `.claude/skills/`, then paste the design-rules block from `plugin/skills/functional-design/references/project-setup.md` into the project `CLAUDE.md`, with the last line naming `functional-typescript`.
- FDS's TypeScript rules are mandatory for this repository: strict compiler options, no `any`, no non-null `!`, no unchecked `as`, `Result` instead of expected exceptions, branded primitives, readonly domain types, discriminated unions, `assertNever`, and DTO parsing at boundaries.
- FDS's own examples and evals use clinic/patient data. That content is upstream reference material, not SRAS content. It must not be copied into SRAS-owned paths and is excluded from the content guard. See §25.3.
- FDS is a dependency, not a second source of product requirements. The SRAS standard remains the product; FDS is the design method for the tools that implement it.

---

## 4. Repository identity

### 4.1 Identity

| Field | Value |
|---|---|
| Owner | `yutna` |
| Repository | `software-delivery-assurance` |
| Repository model | Public monorepo for standards, schemas, tools, examples, and docs |
| Display name | Software Delivery Assurance Library |
| Tagline | Open, evidence-based assurance for software delivery |
| Description | Open library for software delivery assurance: SRAS core, modules, sector overlays, regulatory registers, and project templates. |
| Visibility | Public from creation |
| Default branch | `main` |
| Initial version | `v0.1.0` |
| License | MIT |
| Primary language | English identifiers and schema; Thai and English content |
| Stack | TypeScript 5.9 on Node.js 24 LTS |
| Design method | FDS 3.3.0, pinned at `4d3875c`, vendored in `.claude/skills/` |
| Documentation | Markdown in `docs/`; VitePress site from v0.6.0 |
| Issue tracker | GitHub Issues |
| Releases | GitHub Releases, driven by milestones |

### 4.2 Topics

Use these GitHub topics:

```text
assurance
software-delivery
sras
risk-management
compliance
governance
security
privacy
thailand
asean
public-sector
finance
ecommerce
logistics
typescript
functional-programming
```

Do not add topics that imply certification, legal advice, or healthcare coverage.

### 4.3 Exact bootstrap command

Run from `~/Projects/oss-kit`:

```bash
bootstrap/oss-kit new software-delivery-assurance \
  --description "Open library for software delivery assurance: SRAS core, modules, sector overlays, regulatory registers, and project templates." \
  --stack node \
  --topics assurance,software-delivery,sras,risk-management,compliance,governance,security,privacy,thailand,asean,public-sector,finance,ecommerce,logistics,typescript,functional-programming
```

Expected result:

- Public repository created from `yutna/oss-template`.
- Initial commit `chore: initialize from oss-template`.
- Node `.gitignore` entries appended.
- `npm` Dependabot block appended.
- No TypeScript configuration, tests, or TypeScript CI jobs yet; the template CI gate exists, and issue 1 adds the TypeScript jobs.
- Settings, security, labels, `Backlog`, `v0.1.0`, and rulesets applied.
- Local clone at `~/Projects/software-delivery-assurance`.
- FDS is not installed by `oss-kit`; issue 1 vendors the pinned pack and adds `CLAUDE.md`.

### 4.4 README first screen

The first screen of `README.md` must answer, in this order:

1. What this repository is.
2. What it is not.
3. Current status (`v0.1.0 draft`).
4. Who it is for.
5. The four supported sectors.
6. Quick start (read, assess, validate).
7. Repository map.
8. Contributing.
9. License, notice, and disclaimer.
10. Citation.

Do not lead with a long history or a sales pitch.

### 4.5 Citation

Add `CITATION.cff` in v0.1.0:

```yaml
cff-version: 1.2.0
message: "If you use this library, cite the repository and the SRAS version."
title: "Software Delivery Assurance Library"
authors:
  - family-names: "Siphuengchai"
    given-names: "Yutthana"
version: 0.1.0
date-released: "2026-11-01"
url: "https://github.com/yutna/software-delivery-assurance"
license: MIT
```

The execution session must update the date to the actual release date.

### 4.6 Files that must not exist

- `CHANGELOG.md` — GitHub Releases is the changelog.
- `docs/wiki/` — wiki is disabled.
- `healthcare/`, `clinical/`, `hospital/` — out of scope.
- `pyproject.toml`, `requirements*.txt`, `setup.py`, `setup.cfg`, `Pipfile`, `poetry.lock`, or any Python package. The repository is Node/TypeScript only.
- `mkdocs.yml`, `requirements-docs.txt`, or any MkDocs configuration. Documentation uses VitePress.
- Any customer name, patient data, production hostname, IP address, port, or secret.
- Any `yutna/.github` repository.
- A second product licence. The repository is MIT. FDS is a third-party MIT dependency and is attributed, not relicensed.

---

## 5. Architecture

### 5.1 Layers

```text
Regulatory registers  ->  jurisdiction/industry overlays  ->  modules  ->  SRAS core
        (facts)                 (deltas)                    (technical)     (baseline)
                                                                              |
                                                                              v
                                                                    project instance
                                                                    assessment + evidence
                                                                    claims + risk register
```

The public repository owns the left side. Private project repositories own the right side.

### 5.2 Monorepo tree

```text
software-delivery-assurance/
├── README.md
├── SCOPE.md
├── DISCLAIMER.md
├── GOVERNANCE.md
├── ROADMAP.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── SUPPORT.md
├── CITATION.cff
├── LICENSE
├── NOTICE.md
├── THIRD_PARTY_NOTICES.md
├── CLAUDE.md
├── AGENTS.md
├── package.json
├── package-lock.json
├── .node-version
├── tsconfig.json
├── tsconfig.build.json
├── eslint.config.mjs
├── vitest.config.ts
├── .prettierignore
├── .markdownlint-cli2.jsonc
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .claude/
│   ├── settings.json
│   └── skills/                  # pinned FDS 3.3.0; 43 functional-* skills
│       ├── functional-design/
│       ├── functional-typescript/
│       └── ...
├── vendor/
│   └── functional-design-skills/
│       ├── LICENSE              # upstream MIT licence text
│       ├── UPSTREAM.md          # source, commit, version, sync policy
│       └── fds-lock.json        # commit, version, skill count, tree hash
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── pull_request_template.md
│   ├── dependabot.yml
│   ├── release.yml
│   └── workflows/
│       ├── ci.yml
│       ├── docs.yml
│       ├── issue-check.yml
│       ├── pr-check.yml
│       └── release.yml
├── core/
│   ├── sras.yaml
│   ├── profiles/
│   │   ├── lite.yaml
│   │   └── full.yaml
│   └── domains/
│       ├── governance.yaml
│       ├── security.yaml
│       ├── privacy.yaml
│       ├── change-release.yaml
│       ├── operations.yaml
│       ├── incident-continuity.yaml
│       └── supply-chain.yaml
├── modules/
│   ├── ai/
│   ├── integration/
│   ├── regulated-data/
│   ├── cloud-saas/
│   └── on-prem/
├── overlays/
│   └── industries/
│       ├── finance/
│       ├── ecommerce/
│       ├── logistics/
│       └── public-sector/
├── registers/
│   ├── th/
│   ├── asean/
│   └── eu/
├── mappings/
│   ├── iso-27001.yaml
│   ├── iso-27701.yaml
│   ├── iso-22301.yaml
│   ├── nist-csf.yaml
│   ├── pci-dss.yaml
│   ├── owasp-asvs.yaml
│   ├── wcag.yaml
│   ├── iso-42001.yaml
│   └── nist-ai-rmf.yaml
├── schemas/
│   ├── requirement.schema.json
│   ├── module.schema.json
│   ├── overlay.schema.json
│   ├── register-entry.schema.json
│   ├── assessment.schema.json
│   ├── evidence-index.schema.json
│   ├── claim.schema.json
│   ├── profile.schema.json
│   ├── crosswalk.schema.json
│   └── project-lock.schema.json
├── templates/
│   └── project/
│       ├── README.md
│       ├── assurance.yaml
│       ├── assessment.yaml
│       ├── evidence-index.yaml
│       ├── claims.yaml
│       ├── risk-register.yaml
│       └── assurance.lock.yaml
├── examples/
│   ├── finance-synthetic/
│   ├── ecommerce-synthetic/
│   ├── logistics-synthetic/
│   └── public-sector-synthetic/
├── guard/
│   └── denylist.yaml
├── src/
│   └── sras/
│       ├── cli.ts               # process shell: argv, stdout/stderr, exit code
│       ├── index.ts             # public library surface
│       ├── version.ts
│       ├── foundation/
│       │   ├── result.ts
│       │   ├── brand.ts
│       │   └── assert-never.ts
│       ├── standard/            # requirement/module/overlay/register knowledge
│       │   ├── ids.ts
│       │   ├── types.ts
│       │   ├── dto.ts
│       │   ├── parse.ts
│       │   ├── validate.ts
│       │   ├── resolve.ts
│       │   └── workflow.ts
│       ├── project/             # assessment, evidence, claims, lockfile, init
│       │   ├── ids.ts
│       │   ├── types.ts
│       │   ├── dto.ts
│       │   ├── parse.ts
│       │   ├── init.ts
│       │   └── workflow.ts
│       ├── guard/               # denylist and content-scanning knowledge
│       │   ├── types.ts
│       │   ├── matcher.ts
│       │   └── workflow.ts
│       ├── render/              # Markdown rendering knowledge
│       │   ├── types.ts
│       │   ├── markdown.ts
│       │   └── workflow.ts
│       ├── adapters/            # effects at the edge
│       │   ├── fs.ts
│       │   ├── yaml.ts
│       │   ├── json-schema.ts
│       │   └── output.ts
│       └── cli/
│           ├── args.ts
│           ├── command.ts
│           └── run.ts
├── tools/
│   ├── check-version.ts
│   ├── check-fds.ts
│   └── sync-fds.ts
├── tests/
│   ├── fixtures/
│   │   ├── valid/
│   │   └── invalid/
│   ├── foundation/
│   ├── standard/
│   ├── project/
│   ├── guard/
│   ├── render/
│   ├── cli/
│   └── fds/
└── docs/
    ├── .vitepress/
    │   ├── config.ts
    │   └── theme/
    ├── en/
    │   ├── index.md
    │   ├── overview.md
    │   ├── quick-start.md
    │   ├── concepts/
    │   ├── sectors/
    │   ├── registers/
    │   ├── templates/
    │   └── reference/
    └── th/
        ├── index.md
        ├── overview.md
        ├── quick-start.md
        ├── concepts/
        ├── sectors/
        ├── registers/
        ├── templates/
        └── reference/
```

The `.claude/skills/` tree is the pinned, unmodified FDS pack. It is third-party reference material, not SRAS content. `vendor/functional-design-skills/` holds only licence and provenance metadata; it does not duplicate skill prose. `CLAUDE.md` is the canonical design-rules instruction; `AGENTS.md` is a short pointer to it for non-Claude agents and must not duplicate the rules.

### 5.3 Terminology

Use exactly these terms:

| Term | Meaning |
|---|---|
| **SRAS Core** | The baseline requirements every product is assessed against. |
| **Module** | A technical or deployment extension selected by product scope: AI, integration, regulated data, cloud/SaaS, on-prem. |
| **Overlay** | A delta for a jurisdiction or industry. It adds, overrides, or waives requirements with justification. |
| **Register** | A structured factual record of a law, regulation, standard, or guidance. It is not an overlay and not legal advice. |
| **Project instance** | A private or separate repository containing the selected scope, assessment, evidence index, claims, and risk register. |
| **Profile** | An assessment mode: `lite` or `full`. |
| **Gate** | A requirement that must meet the minimum level before delivery. |
| **Claim** | A public statement supported by evidence, with allowed and prohibited wording. |
| **FDS pack** | The pinned upstream `functional-design-skills` skill pack used to design and review this repository's TypeScript tools. It is a design method, not a source of SRAS requirements. |
| **Pure core** | Domain modules that take values and return values. They do no filesystem, network, clock, randomness, or process I/O. |
| **Shell** | The thin edge that parses argv, reads files, calls the pure core, writes output, and sets the exit code. |
| **Design note** | The short record required for a new or reshaped module, workflow, type, signature, or boundary: domain words, illegal states, pipeline, effects, module boundary, and the FDS skills consulted. It lives in the PR description unless a durable note is warranted. |

Do not use “extension” for new content. The old SRAS gist uses “extensions”; migrate them to `modules/` and record the rename in release notes.

### 5.4 Resolution order

When a project instance resolves requirements:

```text
Core
  -> selected modules
  -> jurisdiction overlay
  -> industry overlay
  -> project profile (customer-specific additions)
```

Rules:

- All applicable layers apply; they are not mutually exclusive.
- If two layers conflict, the stricter requirement wins.
- A `waive` is allowed only for non-gate requirements, with a written justification, risk owner, expiry date, and approval.
- A gate requirement cannot be waived by an overlay. It can only be marked `not_applicable` with a documented scope reason and owner approval.
- Project-specific requirements never flow back into the public repository automatically.

### 5.5 Public/private boundary

| Public repository | Private project repository |
|---|---|
| SRAS Core | Selected scope and profile |
| Modules | Filled assessment |
| Sector and jurisdiction overlays | Customer requirements |
| Regulatory registers | Evidence and evidence index |
| Templates and schemas | Claims and approvals |
| Synthetic examples | Legal opinions and contracts |
| Crosswalks | Risk acceptance and sign-off |

The public repository may contain an **evidence index template** and **synthetic examples**, but never real evidence.

### 5.6 FDS and TypeScript in one page

- The repository is a TypeScript 5.9 project on Node.js 24 LTS, ESM, npm.
- The FDS pack is vendored, unmodified, at `4d3875c` / `3.3.0` in `.claude/skills/`. The full 43-skill pack is present so the index and cross-references work.
- `.claude/settings.json` raises the skill-listing budget to `0.02` and marks the non-TypeScript language packs `name-only`. Core skills and `functional-typescript` keep their descriptions.
- `CLAUDE.md` contains the FDS design-rules block, with `functional-typescript` named as the language pack. `AGENTS.md` points to it and does not duplicate it.
- Every TypeScript module is either a pure domain module or a thin shell. Effects live in `adapters/`, `workflow.ts`, `cli/`, and the `cli.ts` entry point.
- Expected failures are `Result<T, E>` values, not exceptions. `assertNever` throws only for an impossible case that the type system should have excluded.
- Domain primitives are branded and parsed. DTOs are separate types parsed at the YAML/CLI boundary. Domain types are `readonly`.
- Every new module or workflow runs the FDS design loop and records a design note in the PR. Every type/signature/boundary change runs the `functional-reviewing-functional-design` checklist before the PR is marked ready.
- No alternative functional library, no `any`, no non-null `!`, no unchecked `as`, no `enum`, no domain classes, and no ad-hoc `Result` type. See §25 for the binding rules.

---

## 6. Data model

All structured content is YAML, parsed into `unknown` and validated by JSON Schema 2020-12 with Ajv. The validated DTO is then parsed into the domain type; the schema's inferred shape is never used as the domain model. Markdown is for narrative and generated reference pages. Do not duplicate requirement content in both YAML and Markdown.

### 6.1 Common metadata

Every structured object carries:

```yaml
id: SRAS-SEC-001
version: 0.1.0
status: active            # draft | active | deprecated
review_status: draft      # draft | unverified | reviewed
translation_status: complete  # complete | partial | missing
machine_translated: false     # optional; true only when a machine draft was used
created_at: "2026-10-22"
updated_at: "2026-10-22"
```

`review_status: reviewed` requires a named reviewer, review date, and scope. No legal content may be marked `reviewed` without a qualified legal reviewer.

### 6.2 Requirement schema

File: `schemas/requirement.schema.json`

Required fields:

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable, unique, uppercase, `SRAS-<DOMAIN>-<NNN>` or module prefix |
| `version` | string | SemVer of the requirement |
| `title.en` | string | Max 80 characters |
| `title.th` | string | Max 120 characters; may be empty only if `translation_status: missing` |
| `description.en` | string | Testable statement; Markdown-lite, no HTML |
| `description.th` | string | Thai translation; same meaning |
| `rationale.en` | string | Why the requirement exists |
| `rationale.th` | string | Thai translation |
| `domain` | enum | `governance`, `security`, `privacy`, `change-release`, `operations`, `incident-continuity`, `supply-chain` |
| `criticality` | enum | `gate`, `high`, `medium`, `low` |
| `applicability` | object | `tiers`, `modules`, `overlays`, `excludes` |
| `evidence` | array | At least one evidence type and freshness |
| `assessment` | object | `lite` and `full` guidance |
| `references` | array | Standards, registers, or sources |
| `tags` | array | Lowercase, hyphenated |
| `status` | enum | `draft`, `active`, `deprecated` |
| `introduced_in` | string | Version |
| `deprecated_in` | string or null | Version |
| `translation_status` | enum | `complete`, `partial`, `missing` |
| `review_status` | enum | `draft`, `unverified`, `reviewed` |

Example:

```yaml
id: SRAS-SEC-001
version: 0.1.0
title:
  en: "Authentication is required for every human and machine access path"
  th: "ต้องมี authentication สำหรับทุกช่องทางเข้าถึงของมนุษย์และเครื่อง"
description:
  en: "Every user, service, and administrative access path to production systems must require authentication. Shared accounts are prohibited for administrative access."
  th: "ผู้ใช้ บริการ และช่องทางผู้ดูแลทุกรายการที่เข้าถึงระบบ production ต้องมี authentication และห้ามใช้บัญชีร่วมสำหรับผู้ดูแล"
rationale:
  en: "Unauthenticated access cannot be attributed, revoked, or audited."
  th: "การเข้าถึงที่ไม่มีการยืนยันตัวตนไม่สามารถระบุตัวตน เพิกถอน หรือตรวจสอบย้อนหลังได้"
domain: security
criticality: gate
applicability:
  tiers: [1, 2, 3]
  modules: []
  overlays: []
  excludes: []
evidence:
  - type: config
    description: "Identity provider or access policy configuration"
    max_age_days: 180
  - type: test_result
    description: "Access-control test for user, service, and admin paths"
    max_age_days: 90
assessment:
  lite:
    pass: "All production access paths require authentication."
    partial: "Some paths require authentication; gaps are documented."
  full:
    l2: "Documented and implemented for all in-scope paths."
    l3: "Measured with access-review metrics."
references:
  - title: "NIST CSF 2.0 PR.AA"
    url: "https://www.nist.gov/cyberframework"
    type: standard
tags: [identity, access-control]
status: active
introduced_in: 0.1.0
deprecated_in: null
translation_status: complete
review_status: draft
```

### 6.3 Module schema

File: `schemas/module.schema.json`

Fields:

- `id`: `SRAS-AI`, `SRAS-INT`, `SRAS-RGD`, `SRAS-CLD`, `SRAS-ONP`
- `title.en`, `title.th`
- `description.en`, `description.th`
- `version`
- `applies_to`: product types or deployment models
- `requires`: other modules or core version range
- `requirements`: list of requirement objects or references
- `status`, `review_status`, `translation_status`

### 6.4 Overlay schema

File: `schemas/overlay.schema.json`

Fields:

- `id`: e.g. `TH-FIN`
- `type`: `jurisdiction` or `industry`
- `jurisdiction`: ISO 3166-1 alpha-2 or `ASEAN`/`EU` for register-only
- `industry`: `finance`, `ecommerce`, `logistics`, `public-sector`
- `title.en`, `title.th`
- `version`
- `extends`: SRAS version range, e.g. `">=0.1.0 <1.0.0"`
- `requires`: module IDs
- `adds`: requirement objects
- `overrides`: requirement ID and replacement
- `waives`: requirement ID, justification, risk owner, expiry
- `sources`: register entry IDs
- `status`, `review_status`, `translation_status`

Rules:

- Overlays add deltas, not full copies of Core.
- An `adds` entry uses the overlay requirement shape and a branded `OverlayRequirementId` (`TH-FIN-003`); it is not validated as a Core `RequirementId`.
- A `waive` is invalid for a gate requirement.
- Every `overrides` and `waives` entry requires a rationale.
- Every `sources` ID must exist in a register.

### 6.5 Register entry schema

File: `schemas/register-entry.schema.json`

Fields:

| Field | Required | Notes |
|---|---|---|
| `id` | yes | e.g. `TH-PDPA-001` |
| `jurisdiction` | yes | `TH`, `ASEAN`, `EU` |
| `instrument` | yes | Official name |
| `instrument_type` | yes | `law`, `regulation`, `standard`, `guidance`, `framework` |
| `regulator` | yes | Issuing body |
| `source_url` | yes | Official source only |
| `effective_date` | yes | ISO date or `null` if unknown |
| `revision` | yes | Date + revision, e.g. `2026-10-22.r1`; bump when the summary or status changes |
| `last_verified` | yes | ISO date |
| `review_due` | yes | ISO date; next review deadline |
| `status` | yes | `in_force`, `amended`, `repealed`, `draft`, `unknown` |
| `review_status` | yes | `unverified` until qualified review |
| `summary.en` | yes | Neutral factual summary, no legal conclusion |
| `summary.th` | yes | Thai translation; may be empty only when `translation_status` is `partial` or `missing` |
| `obligations` | yes | List of factual obligations, each with `en` and `th`; Thai may be empty when partial |
| `mapped_requirements` | yes | Requirement IDs |
| `applies_to` | yes | Sectors, roles, data types |
| `notes` | no | Caveats and open questions |
| `source_language` | yes | `th`, `en`, etc. |
| `translation_status` | yes | `complete`, `partial`, `missing` |
| `machine_translated` | no | `true` only when a machine draft was used |
| `last_reviewed_by` | no | Named reviewer only |
| `last_reviewed_at` | no | ISO date |

Rules:

- Do not copy the text of a law or standard. Summarize and link to the official source.
- Do not state “compliant”, “approved”, “certified”, or “legal”.
- `review_status` defaults to `unverified`.
- Every entry must have a `last_verified` date and a `review_due` date.
- If the source is not official, do not use it.

### 6.6 Assessment schema

File: `schemas/assessment.schema.json`

Fields:

- `project`: name, description, owner, confidentiality
- `sras_version`
- `profile`: `lite` or `full`
- `tier`: `1`, `2`, `3`
- `scope`: systems, data, users, jurisdictions
- `modules`: selected module IDs
- `overlays`: selected overlay IDs
- `assessed_at`
- `assessor`
- `requirements`: list of
  - `id`
  - `status`: `not_assessed`, `gap`, `partial`, `implemented`, `verified`, `not_applicable`
  - `maturity`: `L0`–`L4` for full profile
  - `evidence_refs`
  - `notes`
  - `gap_owner`
  - `due_date`
- `gates`: pass/fail summary
- `summary`: counts and index
- `signoff`: name, role, date
- `limitations`

### 6.7 Evidence index schema

File: `schemas/evidence-index.schema.json`

Fields:

- `id`
- `requirement_ids`
- `type`: `document`, `screenshot`, `log`, `config`, `test_result`, `attestation`, `interview`, `ticket`, `report`
- `description`
- `location`: private reference, not a public URL
- `owner`
- `collected_at`
- `expires_at`
- `freshness_status`: `current`, `expired`, `unknown`
- `redaction`: `none`, `partial`, `full`
- `hash`: optional SHA-256
- `access`: who can view
- `notes`

The public template contains the schema and an empty index; actual evidence stays private.

### 6.8 Claim schema

File: `schemas/claim.schema.json`

Fields:

- `id`
- `claim`
- `evidence_ids`
- `status`: `verified`, `partial`, `not_claimed`, `prohibited`
- `allowed_wording`
- `prohibited_wording`
- `owner`
- `approved_by`
- `approved_at`
- `expires_at`
- `notes`

Rules:

- A claim without current evidence is `not_claimed`, not “probably true”.
- A claim with partial evidence is `partial` and must include the limitation.
- Prohibited claims are listed explicitly so sales teams do not improvise.
- Claims expire; re-approval is required after expiry.

### 6.9 Project lockfile

File: `templates/project/assurance.lock.yaml`

```yaml
sras:
  version: 0.1.0
  checksum: "sha256:..."
modules:
  - id: SRAS-AI
    version: 0.1.0
overlays:
  - id: TH-FIN
    version: 0.1.0
generated_at: "2026-10-22T00:00:00Z"
generator: "sras 0.1.0"
```

Purpose: reproducibility. A project assessment must be reproducible from the lockfile even after the library changes.

### 6.10 Profile definitions

`core/profiles/lite.yaml`:

- Statuses: `not_assessed`, `gap`, `partial`, `implemented`, `verified`, `not_applicable`.
- Gates: pass/fail.
- No weighted index.
- Suitable for bids, pre-sales, and first-pass gap analysis.
- Maps to the common C/P/N vocabulary:
  - `verified` or `implemented` -> C
  - `partial` -> P
  - `gap` or `not_assessed` -> N

`core/profiles/full.yaml`:

- L0–L4 maturity.
- Criticality G/H/M/L.
- Gates.
- Readiness index.
- Evidence coverage.
- Suitable for internal assurance, customer due diligence, and annual review.

Both profiles use the same requirement IDs.

### 6.11 Standard manifest

File: `core/sras.yaml`

```yaml
standard: SRAS
standard_version: 0.1.0
status: draft
released_at: null
profiles:
  - lite
  - full
domains:
  - governance
  - security
  - privacy
  - change-release
  - operations
  - incident-continuity
  - supply-chain
license: MIT
```

`standard_version` must equal the repository version for every v0.x release. `tools/check-version.ts` enforces this. From v1.0.0 onward, the repository version and the SRAS standard version may diverge only with an explicit governance decision and a migration note.

---

## 7. Content plan

### 7.1 Core domains

| Domain | Code | Target requirements | Focus |
|---|---|---|---|
| Governance and risk | `GOV` | 10 | Policy, roles, risk register, assurance cadence, claim control, management review |
| Security | `SEC` | 12 | Identity, access, secure SDLC, vulnerability management, cryptography, logging, segmentation, penetration testing |
| Privacy and data | `PRV` | 10 | Classification, minimization, lawful basis, consent, retention, DSAR, cross-border, breach, processor management |
| Change and release | `CHG` | 10 | Version control, review, CI/CD, testing, environment separation, change approval, rollback, release evidence |
| Operations and reliability | `OPS` | 10 | Monitoring, capacity, backup, restore, incident detection, SLA/SLO, runbooks, on-call, problem management |
| Incident and continuity | `INC` | 8 | Incident response, escalation, communication, postmortem, BCP, DR, crisis management, regulatory notification |
| Supply chain and assets | `SCM` | 10 | Asset inventory, SBOM, third-party risk, license management, EOL, provenance, subcontractors, concentration risk |

Total target: 70 requirements. The first release may ship fewer; do not pad with vague statements.

### 7.2 Modules

| Module | ID prefix | Target requirements | Focus |
|---|---|---|---|
| AI/GenAI | `SRAS-AI` | 12 | Model governance, evaluation, human oversight, data use, prompt/model versioning, monitoring, drift, incident response, supplier/model license, claim control |
| Integration/API | `SRAS-INT` | 10 | Authentication, authorization, rate limits, idempotency, schema versioning, error handling, observability, partner onboarding, deprecation |
| Regulated data | `SRAS-RGD` | 10 | Data classification, lawful basis, DPA, retention, DSAR, cross-border, breach, processor audit, sensitive data |
| Cloud/SaaS | `SRAS-CLD` | 10 | Shared responsibility, tenant isolation, residency, subprocessors, exit, portability, configuration baseline, logging |
| On-prem | `SRAS-ONP` | 10 | Hardening, patching, physical/environmental, network segmentation, backup, disaster recovery, model/artifact supply chain |

### 7.3 Requirement authoring rules

- One requirement per YAML object; group by domain in a single file.
- The statement must be testable. Avoid “should be secure”, “best practice”, “robust”.
- Include the evidence expectation in the requirement, not in a separate document.
- Include the negative case: what would fail.
- Avoid vendor names unless the requirement is about vendor-neutral capability.
- Avoid legal conclusions. Reference a register entry instead.
- Keep `title.en` under 80 characters.
- Keep `description.en` to 1–3 sentences.
- Thai translation must be a translation, not a summary.
- Use ISO dates (`YYYY-MM-DD`) and UTC timestamps.
- Use lowercase hyphenated tags.
- No HTML.
- No emojis in structured content.

### 7.4 Stable IDs

| Object | Pattern | Example |
|---|---|---|
| Core requirement | `SRAS-<DOMAIN>-<NNN>` | `SRAS-SEC-001` |
| Module requirement | `SRAS-<MODULE>-<NNN>` | `SRAS-AI-004` |
| Jurisdiction overlay requirement | `<CC>-<INDUSTRY>-<NNN>` | `TH-FIN-003` |
| Industry overlay requirement | `<CC>-<INDUSTRY>-<NNN>` | `TH-ECM-002` |
| Register entry | `<CC>-<INSTRUMENT>-<NNN>` | `TH-PDPA-001` |
| Claim | `CLM-<PROJECT>-<NNN>` | `CLM-DEMO-001` |

Rules:

- IDs never change.
- IDs are never reused.
- Core and module requirements share the branded `RequirementId`. Overlay requirements use the branded `OverlayRequirementId`; overlays use `OverlayId`; register entries use `RegisterEntryId`.
- Deprecate with `status: deprecated`, `deprecated_in`, and a replacement ID.
- Do not encode version numbers in IDs.
- Do not encode customer names in IDs.
- In TypeScript, each ID family is a branded type with a parser exported from its owning module (`standard/ids.ts`, `project/ids.ts`). A raw `string` never crosses a module boundary where an ID is required. The cast lives only inside the parser. See §25.7.

### 7.5 Crosswalks

Crosswalks are informative, not certification. Each mapping file contains:

```yaml
id: MAP-ISO27001
title:
  en: "SRAS core to ISO/IEC 27001:2022"
  th: "SRAS core ไปยัง ISO/IEC 27001:2022"
version: 0.1.0
source_standard: "ISO/IEC 27001:2022"
source_url: "https://www.iso.org/standard/27001"
status: draft
review_status: unverified
translation_status: complete
mappings:
  - sras: SRAS-SEC-001
    external: "A.8.2"
    relationship: "supports"   # supports | partial | related
    notes: "..."
```

Initial crosswalks:

- ISO/IEC 27001:2022
- ISO/IEC 27701:2019
- ISO 22301:2019
- ISO 31000:2018
- NIST CSF 2.0
- OWASP ASVS (latest stable)
- PCI DSS 4.0.1
- WCAG 2.2 AA
- ISO/IEC 42001:2023
- NIST AI RMF 1.0
- SOC 2 Trust Services Criteria

Do not claim equivalence or certification.

### 7.6 Legal content rules

- Registers contain facts, not opinions.
- Overlays contain requirements, not legal advice.
- Every legal statement has a source and a date.
- No copied statute text beyond a short quoted obligation, and only when necessary; prefer a neutral summary.
- External standards and trademarks are referenced, not copied; see `NOTICE.md`.
- No “compliant”, “certified”, “approved by”, or “legal” claims.
- `review_status: reviewed` is reserved for a named qualified reviewer.
- If a reviewer is not available, the content stays `unverified` and the limitation is visible in the UI and README.

### 7.7 Claim rules

- A claim must map to at least one evidence ID.
- A claim must have an owner and an expiry date.
- A claim with no evidence is `not_claimed`.
- A claim that overstates coverage is `prohibited`.
- Sales and proposal teams may only use `allowed_wording`.
- The repository stores templates and examples, not customer claims.

---

## 8. Sector overlays

Each sector overlay is a delta, not a full standard. Target 8–12 added requirements per sector. Each overlay must state what it does not cover.

The overlay schema and resolver support `jurisdiction` overlays, but v0.x populates only the four Thailand sector overlays. Thailand-specific cross-sector obligations live in the register and the sector overlays until a separate jurisdiction overlay has a source set and review plan.

### 8.1 Finance overlay (`TH-FIN`)

**Purpose:** Assurance for banks, insurers, payment providers, fintech, and financial software vendors operating in Thailand.

**Adds requirements in these areas:**

- IT risk governance and board/management oversight.
- Outsourcing and third-party risk, including cloud and critical service providers.
- Transaction integrity and audit trails.
- Fraud detection and fraud incident handling.
- Availability and recovery for critical financial services.
- Customer data protection and confidentiality.
- Access control for high-privilege financial operations.
- Change management for core financial systems.
- Incident notification and regulatory reporting readiness.
- Model risk management for AI/analytics used in credit, fraud, or pricing.
- Business continuity and exit planning for critical vendors.
- Segregation of duties.

**Example requirement titles:**

- “Critical financial services have a documented maximum tolerable downtime.”
- “Privileged access to payment and ledger systems is separately approved and reviewed.”
- “Transaction records are immutable for the defined retention period.”
- “Fraud incidents have a defined escalation path and customer communication plan.”
- “Critical outsourcing arrangements have an exit plan and tested transition procedure.”
- “AI/analytics models used in financial decisions have documented validation and monitoring.”

**Registers:** Bank of Thailand IT risk/cyber/outsourcing/cloud guidance, Payment Systems Act, PDPA, PCI DSS, and relevant SEC guidance. Register entries are `unverified` until reviewed.

**Out of scope:** prudential capital requirements, licensing advice, individual product approval.

### 8.2 E-commerce overlay (`TH-ECM`)

**Purpose:** Assurance for online marketplaces, direct-to-consumer platforms, payment flows, and order fulfillment software.

**Adds requirements in these areas:**

- Payment card data handling and PCI DSS scope reduction.
- Checkout availability and graceful degradation.
- Order, price, and promotion integrity.
- Refund, return, and cancellation handling.
- Consumer disclosure and consent.
- Account security and fraud.
- Privacy and marketing consent.
- Platform/API partner integration.
- Accessibility of customer-facing flows.
- Record retention for transactions and disputes.
- Incident handling for account takeover and payment fraud.

**Example requirement titles:**

- “Card data is never stored, processed, or transmitted outside the defined PCI DSS scope.”
- “Checkout failures are detected, logged, and communicated without duplicate charges.”
- “Order and price changes are auditable and reversible.”
- “Refund and cancellation states are consistent across the platform and payment provider.”
- “Customer-facing flows meet the agreed accessibility target.”
- “Partner API access is authenticated, rate-limited, and revocable.”

**Registers:** PDPA, Consumer Protection Act, Electronic Transactions Act, Payment Systems Act, PCI DSS, ETDA guidance.

**Out of scope:** consumer law advice, tax advice, marketplace liability advice.

### 8.3 Logistics overlay (`TH-LOG`)

**Purpose:** Assurance for transport management, warehouse management, tracking, customs integration, and delivery platforms.

**Adds requirements in these areas:**

- Shipment and tracking data integrity.
- Chain of custody and event timestamps.
- EDI/API reliability and reconciliation.
- Warehouse and depot access control.
- Subcontractor and carrier management.
- Availability during peak periods.
- Business continuity for routing and delivery.
- Data sharing with partners.
- Customs and trade data handling.
- Incident response for lost, delayed, or misrouted shipments.
- Proof-of-delivery integrity.

**Example requirement titles:**

- “Shipment status events are timestamped, ordered, and reconciled across systems.”
- “Chain-of-custody handoffs are recorded with actor, location, and time.”
- “Carrier and subcontractor access is scoped, monitored, and revocable.”
- “EDI/API failures are detected and reconciled within the defined window.”
- “Proof-of-delivery records are tamper-evident and retained per policy.”
- “Peak-season capacity is tested against the agreed demand forecast.”

**Registers:** PDPA, Electronic Transactions Act, customs and trade regulations, cybersecurity guidance, relevant transport regulations.

**Out of scope:** customs advice, transport licensing, trade compliance advice.

### 8.4 Public sector overlay (`TH-PUB`)

**Purpose:** Assurance for government agencies, state enterprises, and vendors delivering digital public services.

**Adds requirements in these areas:**

- Procurement and contract evidence.
- Records retention and archival.
- Accessibility (WCAG 2.2 AA target).
- Thai-language service quality.
- Open data and transparency.
- Data sovereignty and hosting location.
- Security clearance and personnel screening where required.
- Service continuity for essential public services.
- Auditability and public accountability.
- Change control across agencies and vendors.
- Incident communication to citizens.
- Privacy impact assessment.

**Example requirement titles:**

- “The service has a records-retention schedule approved by the owning agency.”
- “Public-facing content meets the agreed accessibility target.”
- “Thai-language content is reviewed by a native speaker.”
- “Hosting location and data residency are documented and approved.”
- “Essential service continuity is tested at least annually.”
- “Citizen-facing incident communication has an approved template and owner.”
- “Privacy impact assessment is completed before launch.”

**Registers:** Public Procurement Act, PDPA, Cybersecurity Act, Electronic Transactions Act, government cloud/hosting guidance, accessibility guidance, archival/records guidance.

**Out of scope:** procurement law advice, bid protest advice, classification advice.

### 8.5 Overlay completion criteria

For each sector overlay:

- 8–12 added requirements with IDs.
- At least 5 register mappings.
- One synthetic example project.
- One “what this overlay does not cover” section.
- One review checklist for a subject-matter reviewer.
- No customer names, no real evidence, no legal conclusions.
- `review_status: draft` or `unverified`, never `reviewed` without a named reviewer.

---

## 9. Regulatory registers

### 9.1 Register policy

- A register is a factual index, not an overlay and not legal advice.
- Every entry has an official source URL and a `last_verified` date.
- Every entry defaults to `review_status: unverified`.
- Every entry has a review cadence: at least every 6 months for Thailand, every 12 months for ASEAN/EU.
- Every entry is linked to requirements, not copied into them.
- Every entry has a neutral summary and a “what this does not decide” note.
- No entry may say “compliant” or “approved”.

### 9.2 Thailand register (target 10–12 entries)

Initial candidates:

1. Personal Data Protection Act B.E. 2562 (PDPA).
2. Cybersecurity Act B.E. 2562.
3. Electronic Transactions Act B.E. 2544 (and amendments).
4. Computer Crime Act B.E. 2550 (and amendments).
5. Public Procurement Act B.E. 2560.
6. Payment Systems Act B.E. 2560.
7. Consumer Protection Act B.E. 2522.
8. Bank of Thailand IT risk management guidance.
9. Bank of Thailand cybersecurity guidance.
10. Bank of Thailand outsourcing/cloud guidance.
11. ETDA digital service/trust guidance.
12. Government data/hosting/cloud guidance.

Do not add an entry without an official source. If a source is only a secondary summary, mark it `status: unknown` and do not use it for a requirement.

### 9.3 ASEAN register (target 6–8 entries)

Initial candidates:

1. Singapore PDPA.
2. Malaysia PDPA.
3. Indonesia Personal Data Protection Law.
4. Vietnam Personal Data Protection Decree.
5. Philippines Data Privacy Act.
6. Thailand PDPA (cross-reference).
7. ASEAN Model Contractual Clauses.
8. ASEAN cybersecurity/data governance guidance.

ASEAN entries are register-only in v0.x. Do not create an ASEAN overlay until a qualified reviewer is named.

### 9.4 EU register (target 8–10 entries)

Initial candidates:

1. GDPR.
2. NIS2 Directive.
3. DORA (financial sector).
4. EU AI Act.
5. eIDAS.
6. PSD2/PSD3 (payments).
7. Consumer Rights Directive.
8. Data Act.
9. Cyber Resilience Act.
10. Accessibility Act.

EU entries are register-only in v0.x. Do not claim EU compliance.

### 9.5 Register entry quality checklist

- [ ] Official source URL works.
- [ ] Instrument name is exact.
- [ ] Jurisdiction is correct.
- [ ] Effective date is correct or explicitly unknown.
- [ ] `last_verified` is today.
- [ ] `review_status` is `unverified`.
- [ ] Summary is neutral and does not give legal advice.
- [ ] Obligations are factual and short.
- [ ] Mapped requirements exist.
- [ ] Review due date is set.
- [ ] No copied statute text beyond a short necessary quote.
- [ ] No customer-specific interpretation.

---

## 10. Bilingual strategy

### 10.1 Source of truth

- **English** is canonical for schema keys, IDs, file names, and YAML structure.
- **Thai** is a first-class content language, not an afterthought.
- For Thailand-specific overlays and registers, Thai is the primary human-readable language and English is the translation.
- For Core and modules, English is primary and Thai is the translation.

### 10.2 Translation metadata

Every structured object has:

```yaml
translation_status: complete   # complete | partial | missing
machine_translated: false      # optional; true only when a machine draft was used
```

Rules:

- `complete`: both languages are present and reviewed.
- `partial`: one language is present or the translation is machine-assisted and unreviewed.
- `missing`: the Thai or English field is empty.
- CI fails if `translation_status: complete` but a required field is empty.
- CI warns, but does not fail, for `partial` during v0.x.
- v1.0.0 requires `complete` for all active Core and module requirements; overlays and registers may remain `partial` with a visible notice.

### 10.3 Documentation structure

- `docs/en/` and `docs/th/` mirror each other.
- Every page has a language switcher.
- Every page has a `translation_status` banner if not complete.
- The Thai home page is a real translation, not a link to English.
- Code blocks, IDs, and YAML keys stay in English.
- Implementation: VitePress with `docs/en` and `docs/th` locales and a shared `docs/.vitepress/config.ts`. The config is TypeScript and is covered by `tsc --noEmit`. Use VitePress's built-in locale switcher; do not add a second docs framework.
- VitePress fails the build on dead internal links. Keep `ignoreDeadLinks` empty; if an external link is transient, exclude it in `.lychee.toml` with a reason, not in the docs build.

### 10.4 Glossary

Create `docs/en/glossary.md` and `docs/th/glossary.md` with the same terms:

- assurance
- assessment
- evidence
- gate
- module
- overlay
- register
- claim
- project instance
- profile
- maturity
- criticality
- finding
- remediation
- risk acceptance

### 10.5 Machine translation policy

- Machine translation is allowed for a first draft.
- Mark it `translation_status: partial` and `machine_translated: true`.
- A human reviewer must review before `complete`.
- Do not machine-translate legal register entries without a reviewer; keep them `unverified`.

---

## 11. Versioning and compatibility

### 11.1 Version axes

| Object | Version scheme | Example |
|---|---|---|
| Repository release | SemVer | `v0.1.0` |
| SRAS standard | SemVer, aligned to repo for v0.x | `0.1.0` |
| Module | SemVer | `SRAS-AI@0.1.0` |
| Overlay | SemVer | `TH-FIN@0.1.0` |
| Register entry | Date + revision | `2026-10-22.r1` |
| Project lockfile | Pins all of the above | `assurance.lock.yaml` |

### 11.2 SemVer rules

- **Major:** breaking change to requirement IDs, removal of a gate, incompatible schema change.
- **Minor:** new requirements, new modules, new overlays, backward-compatible schema additions.
- **Patch:** wording fixes, link fixes, translation fixes, non-semantic corrections.

### 11.3 Deprecation

- Mark `status: deprecated`.
- Set `deprecated_in`.
- Provide `replaced_by`.
- Keep the requirement visible for at least one minor release.
- Remove only in a major release.

### 11.4 Release cadence

- One milestone per release.
- 3–7 issues per milestone.
- No release without a green `ci-ok`, a passing preflight, and a completed audit checklist.
- No release with open gate failures in the Core content.

### 11.5 Compatibility

- Overlays declare `extends: ">=0.1.0 <1.0.0"`.
- A project lockfile must pin exact versions.
- `npm run sras -- validate --all` checks compatibility and fails on an unsatisfied range.
- A new major Core version requires a migration note and a migration command or checklist.

### 11.6 Maintenance after v1.0.0

- Review Thailand register entries every 6 months and ASEAN/EU entries every 12 months.
- Review the Core annually; publish v1.x additive releases for new requirements, modules, or overlays.
- Reserve v2.0 for breaking ID, schema, or gate changes with a migration guide.
- Keep the four sector overlays current; do not add healthcare to this repository.
- Re-run the full audit checklist for every minor release and every register-review cycle.

---

## 12. GitHub workflow

### 12.1 Bootstrap sequence

**Step 0 — Preflight**

```bash
cd ~/Projects/oss-kit
gh auth status
gh api user --jq .login                 # must be yutna
gh repo view yutna/oss-template --json isTemplate
gh repo view yutna/software-delivery-assurance  # must be 404
test ! -e ~/Projects/software-delivery-assurance
bootstrap/oss-kit --help
```

**Step 1 — Dry run**

```bash
bootstrap/oss-kit new software-delivery-assurance \
  --description "Open library for software delivery assurance: SRAS core, modules, sector overlays, regulatory registers, and project templates." \
  --stack node \
  --topics assurance,software-delivery,sras,risk-management,compliance,governance,security,privacy,thailand,asean,public-sector,finance,ecommerce,logistics,typescript,functional-programming \
  --dry-run
```

Review the output. Do not proceed if it would create a private repo or a repo with a different name.

**Step 2 — Create**

Run the same command without `--dry-run`.

**Step 3 — Verify**

```bash
gh repo view yutna/software-delivery-assurance \
  --json name,visibility,isTemplate,defaultBranchRef,description,repositoryTopics
bootstrap/oss-kit doctor yutna/software-delivery-assurance
```

`doctor` must report `no drift`. If it reports drift, fix it before opening the first issue.

**Step 4 — First issue**

```bash
gh issue create -R yutna/software-delivery-assurance \
  --title "ci: add TypeScript CI and FDS toolchain" \
  --body "Add the TypeScript package, strict configuration, the pinned FDS skill pack and CLAUDE.md design rules, typecheck/lint/test/fds-check jobs, the ci-ok gate required by oss-kit, and the FDS calibration/design note for the foundation module." \
  --milestone v0.1.0
```

The issue is assigned to `@yutna` by `issue-check`. Add labels manually if needed (`enhancement`, `priority: high`). Do not create a custom label. The command body is the minimum: before branching, edit the issue to include the full context, deliverable, acceptance criteria, out of scope, dependencies, and FDS calibration/design-note headings from §12.2 and §25.10.

**Step 5 — First branch and draft PR**

```bash
gh issue develop 1 -R yutna/software-delivery-assurance \
  --name ci/1-typescript-ci --checkout
git commit --allow-empty -m "ci: add TypeScript CI and FDS toolchain"
git push -u origin HEAD
gh pr create -R yutna/software-delivery-assurance \
  --draft --assignee @me \
  --title "ci: add TypeScript CI and FDS toolchain" \
  --body "Closes #1"
```

The PR inherits the issue milestone. `pr-check` adds the `chore` or `enhancement` label based on the title. Use `ci` type; it maps to `chore`. The one-line body is only a placeholder: replace it with the repository PR template, including the FDS design note and the review checklist, before marking the PR ready.

**Step 6 — Work, CI, ready, merge**

- Push commits.
- Wait for `ci-ok` and `pr-check / check`.
- Mark ready for review.
- Squash merge.
- Confirm the branch is deleted and the issue is closed.

**Step 7 — Repeat**

Repeat for each issue in the milestone. When the milestone is 100% complete, close it to trigger the release.

### 12.2 Issue rules

- Every issue has an assignee.
- Every issue has a milestone: `Backlog` or `vX.Y.Z`.
- Every issue has a type label from the core set.
- Priority is `priority: high`, `priority: low`, or absent (normal).
- `blocked` only when waiting on something external.
- No status labels.
- No custom labels in v0.1.0.
- If area labels are genuinely needed later, add them as extensions in `oss-kit/bootstrap/label-migrations.json` through an `oss-kit` PR, then run `oss-kit apply`.
- Issue body includes: context, deliverable, acceptance criteria, out of scope, dependencies, and — for any issue that adds or reshapes a TypeScript module, workflow, type, or signature — the FDS calibration row and the design note headings from §25.10.

### 12.3 Branch rules

- Branch from `main`.
- Name: `<type>/<issue>-<slug>`.
- Examples: `ci/1-typescript-ci`, `feat/3-requirement-schema`, `feat/4-validation-workflow`, `docs/6-governance`.
- Short-lived; delete after merge.
- No long-lived `develop` branch.

### 12.4 PR rules

- Draft first.
- Title: Conventional Commits, lowercase scope, imperative summary.
- Body includes `Closes #N`.
- Body includes the FDS design note when the issue changes a module, workflow, type, signature, or boundary (§25.10).
- Body includes the completed `functional-reviewing-functional-design` checklist before the PR is marked ready.
- Assignee: `@yutna`.
- Milestone inherited from the issue.
- CI green before ready.
- Squash merge only.
- No direct push to `main`.
- No force push after review.
- No merge with a failing `ci-ok` or `pr-check / check`.

### 12.5 Labels

Use only:

- `bug`
- `enhancement`
- `documentation`
- `chore`
- `security`
- `priority: high`
- `priority: low`
- `blocked`
- `breaking`
- `good first issue`
- `help wanted`
- `question`
- `dependencies`

Do not create `status:`, `area:`, `sector:`, or `type:` labels in v0.1.0. Encode area and sector in the issue title or body. Do not create `duplicate`, `invalid`, or `wontfix`; use GitHub close reasons instead.

### 12.6 Milestones

- `Backlog`: permanent parking lot; never closed; never released.
- `v0.1.0` … `v1.0.0`: release milestones; 3–7 issues each.
- No pre-release names.
- No milestone without a version.
- Closing a 100% milestone releases; closing with open issues reopens and fails.
- Move unfinished issues to the next milestone before closing.

### 12.7 Release process

1. Confirm all milestone issues are closed and all PRs merged.
2. Confirm `ci-ok` is green on `main`.
3. Confirm `oss-kit doctor` reports no drift.
4. Confirm `npm run typecheck`, `npm test`, `npm run check:fds`, and `node tools/check-version.ts "$VERSION"` pass.
5. Update `CITATION.cff` `date-released` to the actual release date; `check-version.ts` checks the version, not the date.
6. Confirm the audit checklist in §21 is complete.
7. Close the milestone.
8. The release workflow creates the tag and GitHub Release.
9. If preflight fails, the milestone is reopened; fix the version files, close the milestone again, and do not create the tag manually.
10. Verify the release page, tag, and notes.
11. If `publish` exists and fails, use **Re-run failed jobs**, not **Re-run all jobs**.
12. Do not create or edit `CHANGELOG.md`.

### 12.8 Rulesets and security

- `main`: deletion, non-fast-forward, linear history, PR required (0 approvals), squash only, required checks `ci-ok` and `pr-check / check`.
- `release-tags`: no deletion, no update.
- Admin bypass only through a PR merge; never direct push.
- Dependabot alerts and security updates on.
- Secret scanning and push protection on.
- Private vulnerability reporting on.
- CodeQL default setup for JavaScript/TypeScript; re-run `oss-kit apply` after TypeScript code exists if CodeQL was not configured.
- Default `GITHUB_TOKEN` read-only.

### 12.9 Rollback

- `oss-kit new` interrupted: use `--resume` with the same arguments.
- Repo exists but is wrong: do not delete unless the owner has `delete_repo` and explicitly approves. Fix forward.
- Ruleset locks `main`: use the admin PR-merge bypass; if impossible, delete the ruleset via API and re-apply after fixing.
- Bad release tag: tags cannot be moved/deleted while `release-tags` is active. Temporarily disable the ruleset, fix, re-enable, and document the incident.
- Bad release: create a new patch release; do not rewrite history.
- CI failure on `main`: fix forward with a PR; do not force push.

---

## 13. CI/CD design

### 13.1 `ci.yml` jobs

The template starts with `actionlint` and `ci-ok`. Add these jobs:

| Job | Purpose | Command |
|---|---|---|
| `actionlint` | Validate workflows | `actionlint` |
| `typecheck` | Strict TypeScript check | `npm run typecheck` |
| `ts-lint` | Style and static checks | `npm run lint`, `npm run format:check`, and `npm run lint:md` |
| `ts-test` | Unit, integration, and golden tests | `npm test` on Node.js 24.x |
| `fds-check` | FDS pack, lockfile, `CLAUDE.md`, config, and forbidden-pattern check | `npm run check:fds` |
| `schema-validate` | Validate all YAML | `npm run build && node dist/cli.js validate --all` |
| `render-check` | Ensure generated docs are current | `npm run build && node dist/cli.js render --check` |
| `content-guard` | Denylist, secrets, customer data | `npm run build && node dist/cli.js guard` |
| `docs-build` | Strict docs build | `npm run docs:build` |
| `link-check` | External and internal links | `lychee --config .lychee.toml` |
| `dependency-audit` | Known vulnerabilities in shipped dependencies | `npm audit --omit=dev --audit-level=high` |
| `ci-ok` | Required gate | `needs` every job; fail if any failed or cancelled |

`ci-ok` must be exactly named `ci-ok` and use `if: always()`. Every time a job is added, add it to `ci-ok.needs` in the same pull request.

The blocking audit covers the shipped dependency graph. Dev-only advisories still appear in Dependabot; a high or critical dev-only finding needs a documented exception in `SECURITY.md` naming the package, advisory, and why it cannot affect CI or release artifacts.

Add jobs only when the command exists:

- v0.1.0 issue 1: `actionlint`, `typecheck`, `ts-lint`, `ts-test`, `fds-check`, `dependency-audit`, `ci-ok`.
- v0.1.0 issue 4: add `schema-validate`.
- v0.1.0 issue 7: add `content-guard`.
- v0.5.0: add `render-check`.
- v0.6.0: add `docs-build` and `link-check`.

Do not add a CI job that always fails because the underlying command has not been implemented yet.

Every job installs from the lockfile before running:

```bash
npm ci
```

Then run the job command. For CLI jobs, build once and call the emitted entry point:

```bash
npm run build
node dist/cli.js validate --all
```

`npm run sras` is the developer convenience wrapper and builds each time; CI calls `node dist/cli.js` after one build so the published entry point is exercised without rebuilding. Install `actionlint` and `lychee` from a pinned action or an official pinned binary; never run an unpinned `latest` installer.

### 13.2 `ci.yml` constraints

- `permissions: contents: read` at the workflow level.
- `concurrency` with cancel-in-progress for PRs.
- No `pull_request_target` checkout of PR code.
- Pin third-party actions to a major version; do not use `@master`.
- Cache npm downloads, not `node_modules`.
- Keep total runtime under 5 minutes for the common path.
- Run Node.js 24.x on every job. Do not add a Python matrix.
- Use `npm ci`, never `npm install`, in CI.
- `fds-check` must verify the vendored pack against `vendor/functional-design-skills/fds-lock.json`; it must not fetch the upstream repository at CI time.

### 13.3 `release.yml` preflight

Use the template caller and add:

```yaml
with:
  preflight: npx --yes node@24 tools/check-version.ts "$VERSION"
```

`tools/check-version.ts` checks:

- `package.json` `version`
- `src/sras/version.ts` `VERSION`
- `CITATION.cff` `version`
- `core/sras.yaml` `standard_version` when present (for v0.x, must equal the repo version)
- `docs/.vitepress/config.ts` `version` when present

The script accepts either `0.1.0` or `v0.1.0` and normalizes the leading `v`. The release workflow passes `VERSION` without the `v`; manual runs may pass either. The script is TypeScript with `erasableSyntaxOnly` and **no third-party imports**; it reads JSON and text fields with `JSON.parse` and conservative regular expressions, so the release preflight does not need `npm ci`. The caller uses `npx --yes node@24` because the reusable workflow does not run `actions/setup-node`; the Node npm package resolves the latest 24.x LTS patch, so security patches are picked up. If the owner needs bit-for-bit release reproducibility, pin the current 24.x patch and refresh that pin monthly; do not fall back to an unmaintained patch.

No `publish` job in v0.1.0. Add npm registry publishing only if the owner explicitly decides to publish the CLI.

### 13.4 `docs.yml`

- Build on PRs that touch `docs/`, `docs/.vitepress/config.ts`, `core/`, `modules/`, `overlays/`, `registers/`, `templates/`, `examples/`, or the root Markdown files.
- Deploy on push to `main` when Pages is enabled.
- Use GitHub Actions as the Pages source.
- Do not enable Pages before v0.6.0.
- Do not put deployment in `ci.yml`; keep CI read-only.
- Use `npm ci` and `npm run docs:build`; the output directory is `docs/.vitepress/dist`.

### 13.5 CodeQL and Dependabot

- CodeQL default setup for JavaScript/TypeScript.
- If CodeQL fails because the repo has no TypeScript code yet, run `oss-kit apply` again after the first TypeScript PR.
- Dependabot: `npm` and `github-actions`.
- Dependabot PRs get the `dependencies` label and the lowest open version milestone; do not manually retitle them.
- If Dependabot cannot find a manifest, add `package.json` and `package-lock.json` in the first PR.
- Dependabot must not update the vendored FDS pack. FDS updates go through `npm run sync:fds` and a reviewed PR.

---

## 14. Quality gates

Every PR and release must pass these gates.

| Gate | Check | Failure action |
|---|---|---|
| G1 | YAML parses and matches JSON Schema | Block merge |
| G2 | IDs are unique and stable | Block merge |
| G3 | Required bilingual fields exist | Block merge |
| G4 | `translation_status` is truthful | Block merge |
| G5 | Cross-references resolve | Block merge |
| G6 | Overlay `extends` range is satisfied | Block merge |
| G7 | No gate waiver | Block merge |
| G8 | Register entry has source, date, review status | Block merge |
| G9 | No customer data, secrets, or denylisted terms | Block merge |
| G10 | No unsupported legal/compliance claim | Block merge |
| G11 | Links resolve or are explicitly excluded | Block merge |
| G12 | Docs build strictly | Block merge |
| G13 | Tests pass with coverage threshold | Block merge |
| G14 | `ci-ok` and `pr-check / check` green | Block merge |
| G15 | `oss-kit doctor` no drift | Block release |
| G16 | Release preflight passes | Block release |
| G17 | Strict TypeScript config is present and unchanged | Block merge |
| G18 | No forbidden TypeScript escape hatch in `src/` | Block merge |
| G19 | FDS design note and review checklist completed for a module/workflow/type/signature/boundary change | Block merge |
| G20 | Vendored FDS pack matches `fds-lock.json` and `CLAUDE.md` contains the design-rules block | Block merge |

### 14.1 PR checklist

- [ ] Linked issue is in a `vX.Y.Z` milestone.
- [ ] Title follows Conventional Commits.
- [ ] Assignee is set.
- [ ] Scope is limited to the issue.
- [ ] Schema updated if the data model changed.
- [ ] TypeScript changes follow FDS: `Result`, brands, readonly types, discriminated unions, `assertNever`, DTO parsing.
- [ ] FDS design note completed for a new module/workflow/type/signature/boundary.
- [ ] `functional-reviewing-functional-design` checklist completed.
- [ ] Tests added or updated; pure core tests do not mock infrastructure.
- [ ] `npm run typecheck`, `npm run lint`, `npm run lint:md`, `npm run format:check`, `npm test`, and `npm run check:fds` pass.
- [ ] Docs updated.
- [ ] Thai/English fields updated.
- [ ] No customer data, secrets, or denylisted terms, except the exact `Healthcare is out of scope` sentence in `SCOPE.md`.
- [ ] No unsupported claim.
- [ ] `ci-ok` and `pr-check / check` green.

### 14.2 Content review checklist

- [ ] Requirement is testable.
- [ ] Negative case is clear.
- [ ] Evidence type and freshness are defined.
- [ ] Criticality is justified.
- [ ] Applicability is correct.
- [ ] References are official and current.
- [ ] Thai translation matches the English meaning.
- [ ] No vendor endorsement.
- [ ] No legal conclusion.

### 14.3 Legal review checklist

- [ ] Register entry has an official source.
- [ ] Effective date and status are correct or explicitly unknown.
- [ ] Summary is neutral.
- [ ] No copied statute text beyond a short necessary quote.
- [ ] `review_status` is `unverified` unless a named reviewer signed off.
- [ ] No “compliant”, “certified”, “approved”, or “legal advice”.
- [ ] Review due date is set.
- [ ] Limitation is visible to users.

### 14.4 Translation review checklist

- [ ] Thai and English have the same meaning.
- [ ] Technical terms follow the glossary.
- [ ] IDs and YAML keys are unchanged.
- [ ] No machine translation without `machine_translated: true`.
- [ ] `translation_status` matches reality.

### 14.5 FDS review checklist

Run this for any change that adds or reshapes a type, signature, module, workflow, or boundary. It is the `functional-reviewing-functional-design` pass, not a style review.

- [ ] The FDS calibration row is stated: answer, one function, feature in a flow, new module/workflow, or new bounded context.
- [ ] The domain words are the business's words; no `Service`, `Manager`, `Helper`, or `Util` names.
- [ ] No type can hold a state the business forbids.
- [ ] Domain primitives are branded; the parser is the only cast.
- [ ] Domain types are `readonly`, including arrays.
- [ ] Every expected failure is in the return type as `Result`; no thrown expected failure.
- [ ] Every domain union has a single literal discriminator (`tag`) and an `assertNever` default; the foundation `Result` union is the documented exception.
- [ ] The core is pure: no filesystem, network, clock, randomness, or `process` access.
- [ ] Effects are at the edge and visible in the shell's signature.
- [ ] DTOs are separate from domain types and parsed once at the boundary.
- [ ] Each module's interface is much smaller than what it hides; no pass-through exports.
- [ ] No duplicated rule, literal, format, or threshold across modules.
- [ ] Tests cover the pure core with plain values, not mocks.
- [ ] The smallest change that fixes each finding is recorded; findings are ranked by cost.

---

## 15. Roadmap and milestones

### 15.1 Release map

| Milestone | Theme | Issues | Exit criteria |
|---|---|---|---|
| `v0.1.0` | Foundation | 7 | Repo, TypeScript CI, pinned FDS pack + `CLAUDE.md`, schema, CLI validate, 10 seed requirements, governance, content guard |
| `v0.2.0` | Core SRAS | 7 | Seven domains, 60–70 requirements, lite/full profiles |
| `v0.3.0` | Modules | 6 | AI, integration, regulated data, cloud/SaaS, on-prem, crosswalk framework |
| `v0.4.0` | Thailand sector overlays | 7 | Finance, e-commerce, logistics, public sector, Thailand register, resolver, four examples |
| `v0.5.0` | Project template and CLI | 6 | Project template, init, render, guard, CLI docs, end-to-end example |
| `v0.6.0` | Bilingual docs site | 6 | VitePress, EN/TH docs, language switcher, Pages, link check, docs QA |
| `v0.7.0` | ASEAN registers | 5 | 6–8 register entries, comparison page, validation |
| `v0.8.0` | EU registers | 5 | 8–10 register entries, comparison page, validation |
| `v0.9.0` | Pilot and community review | 5 | Two pilots, external review, findings fixed, v1.0 readiness |
| `v1.0.0` | Stable | 5 | Freeze SRAS 1.0, final audit, release, announcement |

### 15.2 Milestone sizing rule

- 3–7 issues per milestone.
- If a theme needs more than 7 issues, split it into two milestones.
- Do not put more than one major theme in a milestone.
- Do not release a milestone with open gate failures.

### 15.3 Backlog

Use `Backlog` for ideas that are not yet scheduled. Never close `Backlog`. Never assign a PR to `Backlog`.

---

## 16. Phase-by-phase execution

Each issue below is a separate branch, draft PR, and squash merge. The acceptance criteria are the minimum; add tests and docs where relevant.

### 16.1 `v0.1.0` — Foundation

**Goal:** A valid public repository with a working TypeScript toolchain, the pinned FDS pack, schema, seed content, governance, and CI.

**Issue 1 — `ci: add TypeScript CI and FDS toolchain`**

- Branch: `ci/1-typescript-ci`
- Labels: `enhancement`, `priority: high`
- FDS calibration: new module/foundation; run the design loop and record it in the PR.
- Deliverables:
  - `package.json`, `package-lock.json`, `.node-version`, `tsconfig.json`, `tsconfig.build.json`, `eslint.config.mjs`, `vitest.config.ts`, `.prettierignore`, and `.markdownlint-cli2.jsonc`.
  - `src/sras/foundation/result.ts`, `brand.ts`, and `assert-never.ts`, with tests.
  - `src/sras/version.ts`, `src/sras/index.ts` exporting the foundation surface, `src/sras/cli.ts` with a `#!/usr/bin/env node` shebang, and a minimal `src/sras/cli/` shell that parses `--version` and returns `Result`.
  - `tests/foundation/` and `tests/cli/version.test.ts`.
  - `.claude/skills/` containing the full FDS 3.3.0 pack, copied unmodified from upstream commit `4d3875c`.
  - `.claude/settings.json` with `skillListingBudgetFraction: 0.02` and `name-only` overrides for the non-TypeScript language packs.
  - `CLAUDE.md` with the exact FDS design-rules block from §25.14; `AGENTS.md` with a short pointer to `CLAUDE.md`, not a duplicate.
  - `vendor/functional-design-skills/LICENSE`, `UPSTREAM.md`, and `fds-lock.json`.
  - `THIRD_PARTY_NOTICES.md` with the FDS MIT notice and pinned commit.
  - `tools/check-fds.ts` and `tools/sync-fds.ts`.
  - `.github/pull_request_template.md` updated with the FDS design note and the §14.5 review checklist.
  - `.github/workflows/ci.yml` with `actionlint`, `typecheck`, `ts-lint`, `ts-test`, `fds-check`, `dependency-audit`, and `ci-ok`.
  - `.lychee.toml` placeholder.
- Acceptance:
  - `npm ci` succeeds from the lockfile.
  - `npm run typecheck`, `npm run lint`, `npm run lint:md`, `npm run format:check`, and `npm test` pass.
  - `npm run sync:fds` has written the real tree hash to `vendor/functional-design-skills/fds-lock.json`; the `<computed by npm run sync:fds>` placeholder is not committed.
  - `npm run check:fds` passes; it verifies 43 skills, pack name/version, `fds-lock.json` tree hash, required tsconfig options, the `CLAUDE.md` block, and the absence of forbidden patterns.
  - `npm run sras -- --version` works and prints the version from `src/sras/version.ts`.
  - `npm run build` emits `dist/cli.js` and `dist/index.js`; the `bin` and `exports` paths in `package.json` resolve.
  - No `any`, non-null `!`, unchecked `as`, `@ts-ignore`, `@ts-expect-error`, or `enum` in `src/`; `as const` and the brand parser's checked cast are the only allowed assertions.
  - `ci-ok` is the final job and `needs` every other job.
  - `pr-check / check` passes.
  - `oss-kit doctor` still reports no drift.

**Issue 2 — `docs: add scope, positioning, disclaimer, and FDS attribution`**

- Branch: `docs/2-scope-positioning`
- Labels: `documentation`
- Deliverables:
  - `SCOPE.md`: in/out of scope, sectors, markets, exclusions, and only the exact boundary sentence from §25.3. FDS attribution belongs in `NOTICE.md`, `THIRD_PARTY_NOTICES.md`, and the README, not in `SCOPE.md`.
  - `DISCLAIMER.md`: not certification, not legal advice, no customer data.
  - `NOTICE.md`: external standards, FDS, and trademarks belong to their owners; references are for identification, not affiliation or endorsement.
  - `README.md`: rewrite the template README with the first-screen structure in §4.4, including the FDS pack and TypeScript toolchain.
  - `CITATION.cff`.
  - `tools/check-version.ts`: no third-party imports; checks `package.json`, `src/sras/version.ts`, and `CITATION.cff`; checks `core/sras.yaml` and `docs/.vitepress/config.ts` when present.
- Acceptance:
  - README answers what/how/who in 10 minutes.
  - No healthcare content in SRAS-owned paths except the exact `Healthcare is out of scope` sentence in `SCOPE.md`; FDS pack files are explicitly identified as third-party and excluded.
  - No customer names or project names.
  - Disclaimer is linked from README.
  - `node tools/check-version.ts 0.1.0` passes without `npm ci`; the script imports no third-party package.
  - VitePress is not required yet.

**Issue 3 — `feat(schema): add requirement, module, and overlay schemas`**

- Branch: `feat/3-requirement-schema`
- Labels: `enhancement`
- Deliverables:
  - `schemas/requirement.schema.json`
  - `schemas/module.schema.json`
  - `schemas/overlay.schema.json`
  - `schemas/profile.schema.json`
  - All schemas use JSON Schema 2020-12, `additionalProperties: false`, and explicit `$id` values.
  - Fixtures in `tests/fixtures/valid/` and `tests/fixtures/invalid/`.
  - A test harness that compiles the schemas with Ajv in strict mode and asserts actionable error paths.
- Acceptance:
  - Valid fixtures pass; invalid fixtures fail with `instancePath`, keyword, and message.
  - IDs are unique and stable.
  - `translation_status` rules are enforced.
  - `waive` on a gate fails.
  - No schema uses a remote `$ref`; no network access during validation.
  - `npm test` passes.

**Issue 4 — `feat(standard): add validation workflow`**

- Branch: `feat/4-validation-workflow`
- Labels: `enhancement`
- FDS calibration: new module and workflow; run the full design loop and record it in the PR.
- Deliverables:
  - `src/sras/standard/ids.ts`: branded `RequirementId`, `ModuleId`, `OverlayId`, `OverlayRequirementId`, `RegisterEntryId`, and their parsers.
  - `src/sras/standard/types.ts`: readonly domain types and discriminated unions for requirement, module, overlay, profile, and register entry.
  - `src/sras/standard/dto.ts` and `parse.ts`: DTO types separate from domain types; one parse at the YAML boundary.
  - `src/sras/standard/validate.ts`: pure validation of IDs, references, translation status, gate waivers, and overlay compatibility.
  - `src/sras/standard/workflow.ts`: orchestration that takes already-read documents and returns `Result<ValidatedStandard, readonly ValidationIssue[]>`.
  - `src/sras/adapters/fs.ts`, `yaml.ts`, and `json-schema.ts`: file reading, safe YAML parsing, and Ajv validation.
  - The `validate` command in the CLI shell.
  - Tests for schema, IDs, references, overlay compatibility, and exit codes; a design note in the PR.
- Acceptance:
  - `npm run sras -- validate --all` validates `core/`, `modules/`, `overlays/`, and `registers/`.
  - Exit code 0 on valid, 1 on invalid, 2 on usage error.
  - Errors include file, path, and reason; expected failures never throw.
  - The pure validator is tested without filesystem or mocks.
  - YAML is parsed with `maxAliasCount` and a file-size limit; no custom tags; Ajv has no remote schema loading.
  - CI runs the command; `npm run check:fds` passes.

**Issue 5 — `feat(core): add 10 seed requirements`**

- Branch: `feat/5-seed-requirements`
- Labels: `enhancement`
- Deliverables:
  - `core/sras.yaml`
  - `core/profiles/lite.yaml`
  - `core/profiles/full.yaml`
  - `core/domains/governance.yaml` (3 requirements)
  - `core/domains/security.yaml` (4 requirements)
  - `core/domains/privacy.yaml` (3 requirements)
  - Bilingual titles/descriptions.
- Acceptance:
  - 10 requirements, unique IDs, at least 3 gate requirements.
  - Each has evidence type and freshness.
  - Each has a Thai title and Thai description.
  - `lite` and `full` profiles validate and use the same requirement IDs.
  - `npm run sras -- validate --all` passes.
  - No legal conclusions.
  - No TypeScript change is required for this issue; if one is, run the FDS loop and update the design note.

**Issue 6 — `docs: add governance and contribution policy`**

- Branch: `docs/6-governance`
- Labels: `documentation`
- Deliverables:
  - `GOVERNANCE.md`: maintainer, decision process, review status, release cadence, how to add a sector/jurisdiction.
  - `ROADMAP.md`: milestones v0.1.0–v1.0.0.
  - Update `CONTRIBUTING.md` with the oss-kit workflow, content rules, and the FDS design/review requirements.
  - Update `.github/pull_request_template.md` with the content checklist from §14.1 and the FDS checklist from §14.5 while keeping the required template fields.
  - Document the FDS update procedure (§25.12) and the rule that no alternative functional library is allowed.
  - Update `SECURITY.md` and `SUPPORT.md` only if needed; keep template links.
- Acceptance:
  - Governance explains `review_status: unverified`.
  - Contribution flow matches `oss-kit` and requires an FDS design note for module/workflow/type/boundary changes.
  - No `CHANGELOG.md`.
  - No custom labels.

**Issue 7 — `test: add content guard and fixtures`**

- Branch: `test/7-content-guard`
- Labels: `enhancement`
- FDS calibration: new module; pure matcher, effectful file-reading shell.
- Deliverables:
  - `src/sras/guard/types.ts`, `matcher.ts`, and `workflow.ts`.
  - `guard/denylist.yaml` with generic categories, patterns, exclusions, and the exact-phrase allowlist for `SCOPE.md`.
  - Private override support via `SRAS_DENYLIST_PATH`; the override file is never committed.
  - The guard excludes `.claude/skills/**`, `vendor/functional-design-skills/**`, `tests/**`, and `guard/denylist.yaml` from SRAS content scanning, with the reasons recorded in the denylist file and docs.
  - Tests for denylist hits, false positives, redaction, exit codes, and the exact `Healthcare is out of scope` allowance.
  - CI job `content-guard`.
- Acceptance:
  - Guard fails on a known denylisted term in an SRAS-owned path.
  - Guard passes on the clean fixtures, on `SCOPE.md` with the exact boundary sentence, and on the vendored FDS pack.
  - Guard still fails if the allowed sentence is expanded or if another healthcare term appears on the same line.
  - Guard does not print the matched secret value; it prints file, line, rule ID, and a redacted preview.
  - Guard loads the private override when the environment variable is set.
  - Guard scans only the public content paths and excludes `tests/`, `guard/denylist.yaml`, and the pinned FDS pack.
  - The matcher is pure and tested with plain values; the shell does the file reading.
  - CI runs the public guard only.

**v0.1.0 exit criteria:**

- All 7 issues closed.
- `ci-ok` and `pr-check / check` green on `main`.
- `oss-kit doctor` no drift.
- `npm run typecheck`, `npm run lint`, `npm test`, `npm run check:fds`, and `npm run sras -- validate --all` pass.
- The full 43-skill FDS pack is present in `.claude/skills/`, matches `fds-lock.json`, and `CLAUDE.md` contains the design-rules block.
- `README.md`, `SCOPE.md`, `DISCLAIMER.md`, `NOTICE.md`, `THIRD_PARTY_NOTICES.md`, `GOVERNANCE.md`, `ROADMAP.md`, `CLAUDE.md`, and `AGENTS.md` exist.
- 10 seed requirements validated.
- No Python file, package, or MkDocs configuration exists.
- v0.1.0 milestone closed and release created.
- Audit checklist §21 complete.

### 16.2 `v0.2.0` — Core SRAS

**Goal:** Complete the seven core domains with 60–70 requirements and both profiles.

The counts below are final domain totals, not increments over the v0.1.0 seed. Keep the seed IDs stable and add new IDs; do not create duplicate statements.

**Issue 8 — `feat(core): add governance and risk domain`**

- Branch: `feat/8-governance-domain`
- Labels: `enhancement`
- Deliverables: `core/domains/governance.yaml`, 10 requirements, tests.
- Acceptance: 2 gate requirements, evidence types, Thai titles, no legal claims.

**Issue 9 — `feat(core): add security domain`**

- Branch: `feat/9-security-domain`
- Labels: `enhancement`, `security`
- Deliverables: `core/domains/security.yaml`, 12 requirements.
- Acceptance: identity, access, secure SDLC, vulnerability management, crypto, logging, segmentation, testing.

**Issue 10 — `feat(core): add privacy and data domain`**

- Branch: `feat/10-privacy-domain`
- Labels: `enhancement`
- Deliverables: `core/domains/privacy.yaml`, 10 requirements.
- Acceptance: classification, minimization, retention, DSAR, cross-border, breach, processor management.

**Issue 11 — `feat(core): add change and release domain`**

- Branch: `feat/11-change-release-domain`
- Labels: `enhancement`
- Deliverables: `core/domains/change-release.yaml`, 10 requirements.
- Acceptance: version control, review, CI/CD, testing, environment separation, rollback, release evidence.

**Issue 12 — `feat(core): add operations and reliability domain`**

- Branch: `feat/12-operations-domain`
- Labels: `enhancement`
- Deliverables: `core/domains/operations.yaml`, 10 requirements.
- Acceptance: monitoring, capacity, backup, restore, SLO, runbooks, on-call, problem management.

**Issue 13 — `feat(core): add incident and continuity domain`**

- Branch: `feat/13-incident-domain`
- Labels: `enhancement`
- Deliverables: `core/domains/incident-continuity.yaml`, 8 requirements.
- Acceptance: IR plan, escalation, communication, postmortem, BCP, DR, regulatory notification readiness.

**Issue 14 — `feat(core): add supply chain and assets domain`**

- Branch: `feat/14-supply-chain-domain`
- Labels: `enhancement`, `security`
- Deliverables: `core/domains/supply-chain.yaml`, 10 requirements.
- Acceptance: asset inventory, SBOM, third-party risk, license, EOL, provenance, subcontractors.

**v0.2.0 exit criteria:**

- 60–70 active Core requirements.
- All seven domains validated.
- `lite` and `full` profiles documented and tested.
- Cross-domain duplicate check passes.
- No gate requirement without evidence expectations.
- `oss-kit doctor` no drift.
- Release created.

### 16.3 `v0.3.0` — Modules

**Goal:** Add the five technical modules and the crosswalk framework.

**Issue 15 — `feat(module): add AI/GenAI module`**

- Branch: `feat/15-ai-module`
- Labels: `enhancement`
- Deliverables: `modules/ai/`, 12 requirements, tests.
- Acceptance: model governance, evaluation, human oversight, data use, versioning, monitoring, drift, incident response, license, claim control.
- Constraint: no customer/project names, no healthcare, no real metrics.

**Issue 16 — `feat(module): add integration and API module`**

- Branch: `feat/16-integration-module`
- Labels: `enhancement`
- Deliverables: `modules/integration/`, 10 requirements.
- Acceptance: auth, rate limits, idempotency, schema versioning, errors, observability, partner onboarding, deprecation.

**Issue 17 — `feat(module): add regulated data module`**

- Branch: `feat/17-regulated-data-module`
- Labels: `enhancement`
- Deliverables: `modules/regulated-data/`, 10 requirements.
- Acceptance: classification, lawful basis, DPA, retention, DSAR, cross-border, breach, processor audit.

**Issue 18 — `feat(module): add cloud/SaaS module`**

- Branch: `feat/18-cloud-module`
- Labels: `enhancement`
- Deliverables: `modules/cloud-saas/`, 10 requirements.
- Acceptance: shared responsibility, tenant isolation, residency, subprocessors, exit, portability, logging.

**Issue 19 — `feat(module): add on-prem module`**

- Branch: `feat/19-onprem-module`
- Labels: `enhancement`
- Deliverables: `modules/on-prem/`, 10 requirements.
- Acceptance: hardening, patching, physical/environmental, segmentation, backup, DR, artifact supply chain.

**Issue 20 — `feat(mapping): add crosswalk framework and first mappings`**

- Branch: `feat/20-crosswalks`
- Labels: `enhancement`
- FDS calibration: feature in an existing flow; extend the standard domain types, no new bounded context.
- Deliverables: `schemas/crosswalk.schema.json`, crosswalk DTO/domain types and parser in `src/sras/standard/`, and `mappings/` with ISO 27001, NIST CSF, OWASP ASVS, PCI DSS, WCAG, ISO 42001, NIST AI RMF.
- Acceptance: mapping schema validates; mappings parse into a readonly domain type; no equivalence claims; `review_status: unverified`; `npm run sras -- validate --all` passes.

**v0.3.0 exit criteria:**

- Five modules validated.
- Crosswalk framework validated.
- No module duplicates Core requirements without an explicit relationship.
- `oss-kit doctor` no drift.
- Release created.

### 16.4 `v0.4.0` — Thailand sector overlays

**Goal:** Add four sector overlays, the Thailand register, the resolver, and four synthetic examples.

**Issue 21 — `feat(overlay): add finance overlay`**

- Branch: `feat/21-finance-overlay`
- Labels: `enhancement`
- Deliverables: `overlays/industries/finance/`, 8–12 requirements.
- Acceptance: sources mapped, no legal advice, `review_status: draft`.

**Issue 22 — `feat(overlay): add e-commerce overlay`**

- Branch: `feat/22-ecommerce-overlay`
- Labels: `enhancement`
- Deliverables: `overlays/industries/ecommerce/`, 8–12 requirements.
- Acceptance: payment, order integrity, refunds, consumer disclosure, accessibility, fraud.

**Issue 23 — `feat(overlay): add logistics overlay`**

- Branch: `feat/23-logistics-overlay`
- Labels: `enhancement`
- Deliverables: `overlays/industries/logistics/`, 8–12 requirements.
- Acceptance: tracking integrity, chain of custody, EDI/API, subcontractors, BCP.

**Issue 24 — `feat(overlay): add public sector overlay`**

- Branch: `feat/24-public-sector-overlay`
- Labels: `enhancement`
- Deliverables: `overlays/industries/public-sector/`, 8–12 requirements.
- Acceptance: procurement evidence, records, accessibility, Thai language, sovereignty, auditability.

**Issue 25 — `docs(register): add Thailand regulatory register`**

- Branch: `docs/25-thailand-register`
- Labels: `documentation`
- Deliverables: `schemas/register-entry.schema.json`, register DTO/domain parser in `src/sras/standard/`, `registers/th/`, 10–12 entries.
- Acceptance: official sources, `review_status: unverified`, review due dates, no legal conclusions; entries parse into the readonly domain type.

**Issue 26 — `feat(standard): add overlay resolution and conflict rules`**

- Branch: `feat/26-overlay-resolution`
- Labels: `enhancement`
- FDS calibration: new workflow in the existing standard module; run the design loop.
- Deliverables: `src/sras/standard/resolve.ts` and tests.
- Acceptance: core < modules < jurisdiction < industry < project; stricter wins; gate waiver fails; conflict report is actionable; the resolver is pure and takes resolved values, not files; `npm run check:fds` passes.

**Issue 27 — `test(examples): add four synthetic sector examples`**

- Branch: `test/27-sector-examples`
- Labels: `documentation`
- Deliverables: `examples/finance-synthetic/`, `ecommerce-synthetic/`, `logistics-synthetic/`, `public-sector-synthetic/`.
- Acceptance: synthetic data only, 5–10 assessed requirements each, no customer names, `npm run sras -- validate --all` passes.

**v0.4.0 exit criteria:**

- Four overlays validated.
- Thailand register validated.
- Resolver tests pass and the resolver is pure.
- Four examples validated.
- No healthcare content in SRAS-owned paths.
- `npm run check:fds` passes.
- `oss-kit doctor` no drift.
- Release created.

### 16.5 `v0.5.0` — Project template and CLI

**Goal:** Make the library usable end-to-end by a project team.

**Issue 28 — `feat(template): add project instance template`**

- Branch: `feat/28-project-template`
- Labels: `enhancement`
- FDS calibration: new module `project`; run the design loop and record it in the PR.
- Deliverables: `schemas/assessment.schema.json`, `schemas/evidence-index.schema.json`, `schemas/claim.schema.json`, `schemas/project-lock.schema.json`, project DTO/domain types and parsers in `src/sras/project/`, and `templates/project/` with all files in §5.2.
- Acceptance: the template is complete and issue 29's `npm run sras -- init` workflow can copy it; placeholders are documented; no real data; project types are readonly and parsed at the boundary.

**Issue 29 — `feat(project): add init workflow and CLI command`**

- Branch: `feat/29-init-command`
- Labels: `enhancement`
- FDS calibration: new workflow in the `project` module; pure template generation, effectful copy shell.
- Deliverables: `src/sras/project/init.ts` (pure template plan) and the `init` command shell; `npm run sras -- init <dir> --profile lite|full`.
- Acceptance: creates a valid project instance, refuses non-empty directories, rejects path traversal, writes a lockfile with current versions and checksums, prints next steps; expected failures return `Result`, not throw; tests use a temporary directory.

**Issue 30 — `feat(render): add render workflow and CLI command`**

- Branch: `feat/30-render-command`
- Labels: `enhancement`
- FDS calibration: new module `render`; pure Markdown generation, effectful write/compare shell.
- Deliverables: `src/sras/render/types.ts`, `markdown.ts`, `workflow.ts`, and the `render`/`render --check` command shell.
- Acceptance: generates Markdown reference pages, idempotent, `render --check` reports a diff without writing; golden tests cover a requirement, overlay, and register page; `npm run check:fds` passes.

**Issue 31 — `feat(guard): add reports and CI annotations`**

- Branch: `feat/31-guard-reports`
- Labels: `enhancement`, `security`
- FDS calibration: feature in the existing guard flow; extend the output union and shell, no new bounded context.
- Deliverables: `npm run sras -- guard --format json`, `--annotations`, summary output, and tests. The base guard already exists from v0.1.0.
- Acceptance: detects customer/project names through the private override, secrets, healthcare terms in SRAS-owned paths (except the exact `SCOPE.md` boundary sentence), and unsafe claims; emits stable machine-readable output; CI annotations point to the file and line; the FDS pack is excluded and never reported.

**Issue 32 — `docs: add CLI and project workflow guide`**

- Branch: `docs/32-cli-guide`
- Labels: `documentation`
- Deliverables: `docs/en/quick-start.md`, `docs/en/templates/project.md`, Thai equivalents.
- Acceptance: a new user can init, assess, validate, render, and guard in under 15 minutes using `npm run sras -- ...`; commands and exit codes are documented.

**Issue 33 — `test: add end-to-end project fixture`**

- Branch: `test/33-e2e-project`
- Labels: `enhancement`
- Deliverables: a synthetic project that selects Core + AI + finance overlay, fills assessment, evidence, claims, and runs all CLI commands.
- Acceptance: `npm run sras -- validate --all`, `npm run sras -- render --check`, and `npm run sras -- guard` pass; lockfile is reproducible; `npm run check:fds` passes.

**v0.5.0 exit criteria:**

- Project template works end-to-end.
- CLI commands documented and tested.
- End-to-end fixture passes.
- All new TypeScript workflows have FDS design notes and review checklists.
- No npm registry publish unless explicitly approved.
- `oss-kit doctor` no drift.
- Release created.

### 16.6 `v0.6.0` — Bilingual documentation site

**Goal:** Publish a usable Thai/English documentation site.

**Issue 34 — `docs: add VitePress configuration and theme`**

- Branch: `docs/34-vitepress`
- Labels: `documentation`
- FDS calibration: config, not domain logic; `tsc --noEmit` still covers it.
- Deliverables: `docs/.vitepress/config.ts` with the docs version used by `tools/check-version.ts`, `docs/.vitepress/theme/`, VitePress dependencies in `package.json`, and local build instructions.
- Acceptance: `npm run docs:build` passes with no dead internal links.

**Issue 35 — `docs(en): complete English documentation`**

- Branch: `docs/35-english-docs`
- Labels: `documentation`
- Deliverables: overview, concepts, quick start, sectors, registers, templates, reference.
- Acceptance: all nav entries exist, no broken links.

**Issue 36 — `docs(th): complete Thai documentation`**

- Branch: `docs/36-thai-docs`
- Labels: `documentation`
- Deliverables: Thai equivalents with `translation_status`.
- Acceptance: Thai nav complete, glossary consistent, no machine-only pages marked complete.

**Issue 37 — `feat(docs): add language switcher and translation status`**

- Branch: `feat/37-language-switcher`
- Labels: `enhancement`
- Deliverables: configured built-in VitePress locale switcher, status banner component, and locale config.
- Acceptance: EN/TH pages link to each other; missing translations are visible; no second docs framework; `npm run docs:build` passes.

**Issue 38 — `ci: add docs build and GitHub Pages deployment`**

- Branch: `ci/38-pages`
- Labels: `enhancement`
- Deliverables: `docs.yml`, Pages settings, deployment permissions, and `npm run docs:build`.
- Acceptance: PR builds docs; `main` deploys `docs/.vitepress/dist`; Pages source is GitHub Actions; no write permissions in CI; `npm ci` is used.

**Issue 39 — `test: add link check and docs QA`**

- Branch: `test/39-link-check`
- Labels: `documentation`
- Deliverables: `.lychee.toml`, link-check job, QA checklist.
- Acceptance: internal links pass; external link exclusions are documented; no false positives.

**v0.6.0 exit criteria:**

- Site builds and deploys.
- EN/TH navigation complete.
- Link check passes.
- Pages enabled.
- `npm run typecheck`, `npm test`, and `npm run check:fds` pass.
- `oss-kit doctor` no drift.
- Release created.

### 16.7 `v0.7.0` — ASEAN registers

**Goal:** Add ASEAN register-only coverage without claiming compliance.

**Issue 40 — `docs(register): add Singapore PDPA`**
**Issue 41 — `docs(register): add Malaysia PDPA`**
**Issue 42 — `docs(register): add Indonesia PDP Law`**
**Issue 43 — `docs(register): add Vietnam and Philippines data protection entries`**
**Issue 44 — `docs(register): add ASEAN comparison, cross-border page, and ASEAN MCC entry`**

Each issue:

- Branch: `docs/<N>-<slug>`
- Labels: `documentation`
- Deliverables: register YAML, source URL, effective date, `review_status: unverified`, mapped requirements.
- Acceptance: official source, no legal conclusion, review due date, comparison page builds.
- Issue 44 also adds the ASEAN Model Contractual Clauses entry, bringing the ASEAN register to at least six entries.

**v0.7.0 exit criteria:**

- 6–8 ASEAN entries.
- Comparison page.
- No ASEAN overlay.
- No compliance claim.
- `oss-kit doctor` no drift.
- Release created.

### 16.8 `v0.8.0` — EU registers

**Goal:** Add EU register-only coverage.

**Issue 45 — `docs(register): add GDPR and eIDAS`**
**Issue 46 — `docs(register): add NIS2 and the Cyber Resilience Act`**
**Issue 47 — `docs(register): add DORA and PSD2/PSD3`**
**Issue 48 — `docs(register): add the EU AI Act, Data Act, and Accessibility Act`**
**Issue 49 — `docs(register): add EU comparison and applicability page`**

Each issue follows the same pattern as v0.7.0. Grouping keeps the milestone at five issues while covering the 8–10 entries in §9.4.

**v0.8.0 exit criteria:**

- 8–10 EU entries.
- Comparison page.
- No EU overlay.
- No compliance claim.
- `oss-kit doctor` no drift.
- Release created.

### 16.9 `v0.9.0` — Pilot and community review

**Goal:** Validate the library with real users without leaking customer data.

**Issue 50 — `test: run internal pilot A (finance)`**
**Issue 51 — `test: run internal pilot B (public sector)`**
**Issue 52 — `docs: publish pilot findings, limitations, and external review notes`**
**Issue 53 — `fix: resolve pilot findings`**
**Issue 54 — `docs: complete v1.0.0 readiness review with external reviewers`**

Rules:

- Pilots use synthetic or anonymized data.
- No customer names in the public repo.
- Findings are summarized, not copied.
- Any legal question is logged as an open issue, not answered in the repo.

**v0.9.0 exit criteria:**

- Two pilots completed.
- External review notes collected and triaged.
- Findings fixed or deferred with rationale.
- v1.0.0 readiness review signed off by the owner.
- `oss-kit doctor` no drift.
- Release created.

### 16.10 `v1.0.0` — Stable

**Goal:** Freeze SRAS 1.0 and publish the stable library.

**Issue 55 — `feat(core): freeze SRAS 1.0`**
**Issue 56 — `docs: finalize governance and review policy`**
**Issue 57 — `test: run final audit and doctor`**
**Issue 58 — `docs: write v1.0.0 release notes`**
**Issue 59 — `chore: announce v1.0.0`**

**v1.0.0 exit criteria:**

- All active Core and module requirements have `translation_status: complete`.
- All gates pass.
- All schemas are stable.
- `oss-kit doctor` no drift.
- Final audit checklist complete.
- Release created.
- Announcement does not claim certification, legal compliance, or healthcare coverage.

---

## 17. Testing strategy

### 17.1 Unit tests

Tests use Vitest. Pure core tests take plain values and do not mock infrastructure.

- `Result` helpers: `map`, `bind`, `mapError`, and short-circuit behaviour.
- Brand parsers: valid and invalid inputs, no exported cast.
- Schema validation for each object type.
- ID uniqueness, format, and brand separation.
- Cross-reference resolution.
- Overlay resolution and conflict handling.
- Gate waiver rejection.
- Translation status rules.
- Claim evidence requirements.
- Version compatibility.
- Guard denylist matching and redaction.
- Renderer idempotence.
- Exhaustiveness: a compile-time test proves that a new union case fails `assertNever`.

### 17.2 Integration tests

- `npm run sras -- validate --all` on the full repository.
- `npm run sras -- render --check` on generated docs.
- `npm run sras -- init` into a temporary directory.
- End-to-end project fixture: init, assess, validate, render, guard.
- Release preflight version check.
- `npm run check:fds` against the vendored pack.

### 17.3 Golden tests

- Rendered Markdown for a known requirement.
- Rendered overlay page.
- Rendered register table.
- Rendered project README.
- Error messages for invalid fixtures.

### 17.4 Content tests

- No duplicate IDs.
- No orphan requirements.
- No overlay reference to a missing requirement.
- No register reference to a missing requirement.
- No gate waiver.
- No `review_status: reviewed` without reviewer and date.
- No `translation_status: complete` with empty fields.
- No denylisted terms in SRAS-owned paths, except the exact `Healthcare is out of scope` sentence in `SCOPE.md`.
- The vendored FDS pack is excluded from the content guard and is never copied into SRAS content.
- No URLs without a scheme.
- No `http://` links unless explicitly allowed.

### 17.5 FDS-specific tests

- Type-level tests use `expectTypeOf` or `tsc` fixtures to prove brands do not accept raw strings.
- Tests prove an expected failure returns `Result`, not a thrown exception.
- Tests prove the pure core has no filesystem, network, clock, or process dependency.
- Shell tests inject a fake clock, fake filesystem root, or explicit file list where relevant.
- A type-level fixture proves that adding an unhandled union case fails compilation at the `assertNever` default; a runtime test proves `assertNever` throws when given an impossible value through a test-only cast.

### 17.6 Manual tests

- Read README as a new user.
- Follow quick start on a clean machine.
- Follow the project template flow.
- Review a sector overlay with a subject-matter reviewer.
- Review a register entry with a legal reviewer, if available.
- Review Thai pages with a native speaker.
- Run the `functional-reviewing-functional-design` pass on one module and confirm the findings are actionable.

### 17.7 Coverage

- Tools: minimum 80% line coverage.
- Content: 100% schema validation.
- CLI: all commands and exit codes covered.
- Do not chase coverage with meaningless tests. A high coverage number does not excuse a missing illegal-state test.

---

## 18. Security and privacy

### 18.1 Repository security

- Dependabot alerts and security updates.
- Secret scanning and push protection.
- CodeQL for JavaScript/TypeScript.
- Private vulnerability reporting.
- Read-only `GITHUB_TOKEN`.
- No secrets in issues, PRs, discussions, or examples.
- No customer data in issues or PRs.
- Security issues go through `SECURITY.md`, never a public issue.

### 18.2 Content security

- Denylist customer/project names and healthcare terms in SRAS-owned paths.
- The pinned FDS pack is third-party reference material and is excluded from the content guard. It is never copied into SRAS content.
- Denylist secret patterns: API keys, tokens, private keys, passwords.
- Denylist network identifiers: private IP ranges, internal hostnames, ports.
- Denylist personal data patterns: Thai national ID, phone numbers, email addresses in examples.
- Manual review for screenshots and logs.
- Synthetic examples only.
- No real evidence in the public repo.

### 18.3 CLI security

- Parse YAML with the `yaml` package; no code execution, no custom tags, `maxAliasCount`, and a file-size limit.
- Validate with Ajv in strict mode; no remote `$ref` and no network access during validation.
- Limit file size and recursion depth.
- Reject path traversal in `npm run sras -- init`; resolve and verify the target.
- Do not execute content from YAML.
- Do not fetch remote URLs during validation.
- Do not print secrets in error messages; redact matches.
- Pin dependencies with `package-lock.json` and review Dependabot PRs.

### 18.4 Supply chain

- Pin GitHub Actions to major versions.
- Review Dependabot PRs.
- Run `npm audit --omit=dev --audit-level=high` as the blocking gate; track dev-only advisories through Dependabot and document any exception in `SECURITY.md`.
- At plan time a full `npm audit` reports high-severity transitive advisories under the dev-only `markdownlint-cli2` tree (`braces`, `katex`) with no non-breaking fix. They cannot ship in the CLI; do not run `npm audit fix --force` to downgrade `markdownlint-cli2`. Re-check after each Dependabot update.
- Use `npm ci` in CI and release.
- Do not add a dependency without a clear need. The runtime dependency set should stay small: `yaml`, `ajv`, and `ajv-formats` only, unless a later issue justifies another.
- Do not vendor law text or standards without a license review.
- Use official source links for registers.
- Treat the FDS pack as a pinned third-party dependency: verify `fds-lock.json`, keep the MIT notice, and review updates.

### 18.5 Incident response

- If a secret is committed: revoke it, remove it from history if necessary, rotate, and document.
- If customer data is committed: stop, remove, notify the owner, and assess disclosure.
- If a release tag is wrong: do not rewrite history; create a patch release.
- If a ruleset locks `main`: use the admin PR-merge bypass; do not disable security settings permanently.

---

## 19. Governance

### 19.1 Maintainer

- Solo maintainer: `@yutna`.
- Final decision on scope, releases, and breaking changes.
- No approvals required, but every change goes through a PR.

### 19.2 Decision process

- Small changes: issue + PR.
- Schema or Core changes: issue with rationale + migration note + at least one review cycle.
- Breaking changes: major version + deprecation notice + migration guide.
- New sector or jurisdiction: issue with scope, sources, reviewer, and exit criteria.

### 19.3 Review policy

- Content review is required for every new domain, module, overlay, and register.
- Legal review is required before `review_status: reviewed` on a legal entry.
- If no legal reviewer is available, the entry stays `unverified`.
- Thai review is required before `translation_status: complete` for Thai content.
- Security review is required for CLI and CI changes.
- FDS design review is required for every new module, workflow, type, signature, or boundary. The PR must include the design note and the `functional-reviewing-functional-design` checklist.
- FDS updates are reviewed like dependency updates: pin the commit, regenerate the lock, verify the pack, and record the change in the PR.

### 19.4 Contributions

- Contributions are welcome under the repository license.
- Contributors must follow `CONTRIBUTING.md`.
- Contributors must not submit customer data, confidential information, or legal advice.
- Contributors must disclose AI-generated content and ensure it is reviewed.
- No CLA in v0.1.0; keep the contribution process lightweight.
- Consider DCO in a later version if contribution volume grows.

### 19.5 Code of conduct

- Use the template `CODE_OF_CONDUCT.md`.
- Enforce via GitHub reporting.
- No harassment, discrimination, or disclosure of private information.

### 19.6 Security policy

- Use the template `SECURITY.md`.
- Private vulnerability reporting only.
- No SLA; best-effort response.

---

## 20. Risks and mitigations

| Risk | Impact | Likelihood | Mitigation | Trigger |
|---|---|---|---|---|
| Scope creep across four sectors | High | High | Milestone gates, 3–7 issues per milestone, release only when exit criteria pass | Milestone grows beyond 7 issues |
| Legal exposure from registers | High | Medium | `review_status: unverified`, neutral summaries, official sources, no compliance claims | Any entry says “compliant” |
| Translation drift | Medium | High | English canonical IDs, Thai content review, `translation_status`, glossary | Thai and English diverge |
| Low adoption | High | Medium | Quick start, examples, one sector at a time, pilot feedback | No pilot by v0.9.0 |
| Solo maintainer burnout | High | Medium | Small milestones, automation, no over-engineering | Missed milestones two cycles in a row |
| Workflow friction | Medium | Medium | Follow oss-kit exactly; no custom labels; use templates | PR blocked by milestone/title |
| Schema churn | Medium | Medium | Freeze schemas at v0.5.0; additive changes only after | Breaking schema change after v0.5.0 |
| Regulatory change | Medium | High | `last_verified`, review cadence, status field | Source changes |
| Customer data leak | Critical | Low | Denylist, guard, manual review, no real evidence | Guard hit or report |
| License/attribution issue | High | Low | Link to official sources, no copied text, NOTICE review | Copied standard text |
| Overlay conflicts | Medium | Medium | Resolver, stricter-wins, gate waiver ban | Conflicting requirements |
| AI-generated content errors | Medium | Medium | Human review, tests, citations, no unsupported claims | Unverified statement |
| Public criticism | Medium | Low | Disclaimer, transparent review status, responsive issues | Misinterpretation as certification |
| FDS skill listing consumes context | Medium | Medium | 0.02 budget, name-only overrides, keep core + `functional-typescript` descriptions | `/doctor` or `/context` shows descriptions being dropped |
| FDS pack drift or hand edit | Medium | Low | `fds-lock.json`, `npm run check:fds`, sync-only updates | Hash mismatch or unexplained skill diff |

---

## 21. Audit checklist

Do not declare a phase or release complete until every applicable item is checked. Record the command output or evidence link in the release issue.

### 21.1 Repository existence and identity

- [ ] `gh repo view yutna/software-delivery-assurance` returns the repo.
- [ ] Visibility is public.
- [ ] Default branch is `main`.
- [ ] Description matches §4.1.
- [ ] Topics match §4.2.
- [ ] Repo was created from `yutna/oss-template`.
- [ ] No `yutna/.github` repository exists.
- [ ] Local clone is at `~/Projects/software-delivery-assurance`.

### 21.2 Workflow files

- [ ] `LICENSE` exists and is MIT.
- [ ] `README.md` exists and follows §4.4.
- [ ] `CONTRIBUTING.md` exists.
- [ ] `CODE_OF_CONDUCT.md` exists.
- [ ] `SECURITY.md` exists.
- [ ] `SUPPORT.md` exists.
- [ ] `NOTICE.md` exists.
- [ ] `THIRD_PARTY_NOTICES.md` exists and names FDS, its MIT licence, and commit `4d3875c`.
- [ ] `CLAUDE.md` exists and contains the FDS design-rules block.
- [ ] `AGENTS.md` exists and points to `CLAUDE.md` without duplicating it.
- [ ] `package.json`, `package-lock.json`, `.node-version`, `tsconfig.json`, `tsconfig.build.json`, `eslint.config.mjs`, `vitest.config.ts`, `.prettierignore`, and `.markdownlint-cli2.jsonc` exist.
- [ ] `.claude/settings.json` exists with the skill-listing budget and name-only overrides.
- [ ] `.claude/skills/` contains 43 FDS skills.
- [ ] `vendor/functional-design-skills/LICENSE`, `UPSTREAM.md`, and `fds-lock.json` exist.
- [ ] `.editorconfig` exists.
- [ ] `.gitattributes` exists.
- [ ] `.github/pull_request_template.md` exists and includes the FDS checklist.
- [ ] `.github/dependabot.yml` exists with `npm` and `github-actions`.
- [ ] `.github/release.yml` exists.
- [ ] All four issue template files exist.
- [ ] `pr-check.yml`, `issue-check.yml`, `release.yml` call `oss-kit@main`.
- [ ] `ci.yml` has `actionlint`, `typecheck`, `ts-lint`, `ts-test`, `fds-check`, `dependency-audit`, and `ci-ok`; the later jobs from §13.1 are present when their commands exist.
- [ ] `ci-ok` is the final job and `needs` every other job.
- [ ] No `CHANGELOG.md`.
- [ ] No `pyproject.toml`, `requirements*.txt`, `mkdocs.yml`, or Python package.
- [ ] No wiki, projects, or discussions.

### 21.3 Settings

- [ ] Issues on.
- [ ] Wiki off.
- [ ] Projects off.
- [ ] Discussions off.
- [ ] Squash merge on.
- [ ] Merge commit off.
- [ ] Rebase merge off.
- [ ] Delete branch on merge on.
- [ ] Auto-merge on.
- [ ] Update branch on.
- [ ] Squash title = PR title.
- [ ] Squash message = blank.
- [ ] Default `GITHUB_TOKEN` read-only.
- [ ] Pages off before v0.6.0, and enabled at v0.6.0.

### 21.4 Security

- [ ] Dependabot alerts on.
- [ ] Dependabot security updates on.
- [ ] Secret scanning on.
- [ ] Push protection on.
- [ ] Private vulnerability reporting on.
- [ ] No classic branch protection remains.
- [ ] No secrets in the repository.
- [ ] No customer data in the repository.
- [ ] No healthcare content in SRAS-owned paths except the exact `Healthcare is out of scope` sentence in `SCOPE.md`; the FDS pack is identified as third-party and excluded.
- [ ] CodeQL default setup is configured for JavaScript/TypeScript.
- [ ] `npm audit --omit=dev --audit-level=high` has no unresolved high or critical finding in shipped dependencies; any dev-only exception is documented in `SECURITY.md`.

### 21.5 Labels

- [ ] Only core labels exist.
- [ ] No `status:` labels.
- [ ] No `area:` labels.
- [ ] No `sector:` labels.
- [ ] No duplicate labels.
- [ ] Dependabot label `dependencies` exists.
- [ ] `security` label exists.

### 21.6 Milestones

- [ ] `Backlog` exists and is open.
- [ ] `v0.1.0` exists and is open at the start.
- [ ] No malformed milestone names.
- [ ] No milestone without a version except `Backlog`.
- [ ] Current milestone has 3–7 issues.
- [ ] Every issue has an assignee.
- [ ] Every PR has a version milestone.

### 21.7 Rulesets

- [ ] `main` ruleset exists.
- [ ] Deletion blocked.
- [ ] Non-fast-forward blocked.
- [ ] Linear history required.
- [ ] PR required.
- [ ] Squash-only merge.
- [ ] Required checks: `ci-ok` and `pr-check / check`.
- [ ] Admin bypass only via PR merge.
- [ ] `release-tags` ruleset exists.
- [ ] Tag deletion blocked.
- [ ] Tag update blocked.

### 21.8 CI

- [ ] `actionlint` passes.
- [ ] `typecheck` passes.
- [ ] `ts-lint` passes.
- [ ] `ts-test` passes on Node.js 24.x.
- [ ] `fds-check` passes.
- [ ] `schema-validate` passes.
- [ ] `render-check` passes from v0.5.0.
- [ ] `content-guard` passes.
- [ ] `docs-build` passes from v0.6.0.
- [ ] `link-check` passes from v0.6.0.
- [ ] `dependency-audit` passes or has documented exceptions.
- [ ] `ci-ok` is green on `main`.
- [ ] `pr-check / check` is green on the latest PR.
- [ ] `npm ci` is used, not `npm install`.
- [ ] No `pull_request_target` checkout of PR code.
- [ ] Workflow permissions are read-only except release/docs.

### 21.9 Content

- [ ] Every requirement has a unique ID.
- [ ] Every active requirement has EN and TH titles, or an explicit `translation_status` of `partial`/`missing` until v1.0.0; v1.0.0 requires `complete`.
- [ ] Every active requirement has evidence guidance.
- [ ] Every requirement has a criticality.
- [ ] Every overlay has a source and `review_status`.
- [ ] Every register entry has an official source.
- [ ] Every register entry has `last_verified`.
- [ ] Every register entry has a review due date.
- [ ] No gate waiver.
- [ ] No `review_status: reviewed` without a named reviewer.
- [ ] No `translation_status: complete` with empty fields.
- [ ] No duplicate requirement statements.
- [ ] No vendor endorsement.
- [ ] No legal advice.
- [ ] No “compliant”, “certified”, “approved”, or “guaranteed” claim.
- [ ] No customer names, project names, or patient data in SRAS-owned paths.
- [ ] No healthcare content in SRAS-owned paths except the exact `Healthcare is out of scope` sentence in `SCOPE.md`.
- [ ] No clinical examples copied from the FDS pack into SRAS content.
- [ ] No IP addresses, ports, hostnames, or secrets.
- [ ] Four sector overlays exist: finance, e-commerce, logistics, public sector.
- [ ] Four synthetic examples exist.
- [ ] No healthcare overlay or example.

### 21.10 Project template and CLI

- [ ] `templates/project/` contains all required files.
- [ ] `npm run sras -- init` creates a valid instance.
- [ ] `npm run sras -- validate --all` passes.
- [ ] `npm run sras -- render --check` passes.
- [ ] `npm run sras -- guard` passes.
- [ ] `assurance.lock.yaml` pins versions.
- [ ] End-to-end fixture passes.
- [ ] CLI help is accurate.
- [ ] Exit codes are documented.
- [ ] The pure core is tested without infrastructure mocks.
- [ ] Every new or reshaped module, workflow, type, signature, or boundary has a design note and a completed FDS review checklist.

### 21.11 Documentation

- [ ] `npm run docs:build` passes.
- [ ] EN nav complete.
- [ ] TH nav complete.
- [ ] VitePress language switcher works.
- [ ] `translation_status` banners are visible.
- [ ] Glossary exists in both languages.
- [ ] Quick start works on a clean machine.
- [ ] Links pass.
- [ ] Pages deployment works from v0.6.0.

### 21.12 Release

- [ ] All milestone issues closed.
- [ ] All PRs merged.
- [ ] `ci-ok` green on `main`.
- [ ] `oss-kit doctor` no drift.
- [ ] `npm run typecheck`, `npm test`, and `npm run check:fds` pass.
- [ ] `node tools/check-version.ts "$VERSION"` passes.
- [ ] Tag `vX.Y.Z` exists.
- [ ] GitHub Release exists.
- [ ] Release notes are categorized correctly.
- [ ] No `CHANGELOG.md`.
- [ ] No open gate failure.
- [ ] Audit checklist archived in the release issue.

### 21.13 FDS and TypeScript

- [ ] `.claude/skills/` contains all 43 FDS skills at pack version `3.3.0`.
- [ ] `vendor/functional-design-skills/UPSTREAM.md` names commit `4d3875c` and the sync command.
- [ ] `vendor/functional-design-skills/fds-lock.json` matches the installed tree.
- [ ] `THIRD_PARTY_NOTICES.md` contains the FDS MIT notice.
- [ ] `CLAUDE.md` contains the exact design-rules block and names `functional-typescript`.
- [ ] `.claude/settings.json` raises the listing budget and marks irrelevant language packs name-only.
- [ ] `tsconfig.json` contains `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch`, and `erasableSyntaxOnly`.
- [ ] No `any`, non-null `!`, unchecked `as`, `@ts-ignore`, or `@ts-expect-error` in `src/`.
- [ ] No domain `enum`, domain `interface`, or domain class.
- [ ] Every expected failure returns `Result`; no expected throw in the core.
- [ ] Every domain union is exhausted with `assertNever`; the foundation `Result` union is the documented exception.
- [ ] Domain types and arrays are `readonly`.
- [ ] DTOs and domain types are separate; parsing happens once at the boundary.
- [ ] The pure core has no filesystem, network, clock, randomness, or process access.
- [ ] New modules/workflows have a design note and a completed review checklist.
- [ ] No Python tooling, `pyproject.toml`, `mkdocs.yml`, or `requirements*.txt`.

### 21.14 Final completion statement

Only after all applicable boxes are checked, report:

```text
Repository: https://github.com/yutna/software-delivery-assurance
Release: vX.Y.Z
Doctor: no drift
CI: ci-ok green; pr-check / check green
Validation: npm run sras -- validate --all passed
Tests: Vitest passed; typecheck passed
FDS: 43 skills pinned at 4d3875c; check:fds passed
Content: no customer data in SRAS paths; FDS excluded as third-party; no legal advice
Audit: <link to release issue with checklist>
```

Do not say “done” without the command outputs or links.

---

## 22. Handoff instructions

### 22.1 First actions in the new session

1. Read this plan completely.
2. Check the current state:
   ```bash
   gh repo view yutna/software-delivery-assurance --json name,visibility,defaultBranchRef
   test -d ~/Projects/software-delivery-assurance && git -C ~/Projects/software-delivery-assurance status -sb
   cd ~/Projects/oss-kit && bootstrap/oss-kit doctor yutna/software-delivery-assurance
   ```
3. If the repo does not exist, start at §12.1.
4. If the repo exists but `doctor` reports drift, fix the drift before adding content.
5. If the repo exists and `doctor` is clean, run `npm ci`, `npm run typecheck`, `npm test`, and `npm run check:fds` before changing anything. Read `CLAUDE.md` and load the `functional-design` skill before designing a module.
6. Inspect the latest release and the open milestone, then continue from the next issue.
7. Do not re-run `oss-kit new` on an existing repo.
8. If `oss-kit new` was interrupted, use `--resume` with the same arguments.
9. If the FDS pack is missing or the lock does not match, do not proceed; run `npm run sync:fds` and review the diff as a dependency update.

### 22.2 What not to do

- Do not create a private repo with `oss-kit`.
- Do not create `yutna/.github`.
- Do not create custom labels without an `oss-kit` PR.
- Do not create a `CHANGELOG.md`.
- Do not enable wiki, projects, or discussions.
- Do not copy this execution plan into the public repository; it is an internal runbook, not public content.
- Do not push directly to `main`.
- Do not merge without a version milestone.
- Do not use a non-Conventional Commit PR title.
- Do not copy customer data, project-specific data, healthcare content (except the exact `Healthcare is out of scope` sentence in `SCOPE.md`), IPs, ports, or secrets into SRAS-owned paths.
- Do not copy clinical examples from the FDS pack into SRAS content.
- Do not claim legal compliance or certification.
- Do not introduce Python, pip, pytest, MkDocs, or another docs framework.
- Do not use `any`, non-null `!`, unchecked `as`, `@ts-ignore`, `@ts-expect-error` in `src/`, `enum`, domain classes, or a second `Result` implementation. A test may use `@ts-expect-error` only with a description that states the type error being proven.
- Do not bypass the FDS design note/review for a module, workflow, type, signature, or boundary change.
- Do not update FDS by editing `.claude/skills/` by hand; use `npm run sync:fds` and review the diff.
- Do not delete or move a release tag without disabling `release-tags`.
- Do not declare a release complete without the audit checklist.

### 22.3 If blocked

- Workflow blocked: read `oss-kit/docs/conventions.md` and `oss-kit/docs/adopting.md`.
- Ruleset blocked: use the admin PR-merge bypass; do not disable security.
- Release blocked: check the milestone state, `ci-ok`, preflight, and tags.
- Content blocked: keep `review_status: unverified`, write the limitation, and open a follow-up issue.
- Legal blocked: do not guess; mark `unverified` and escalate to the owner.

### 22.4 Reporting format

At the end of each phase, report:

```text
Phase: vX.Y.Z
Issues closed: N/N
PRs merged: N/N
CI: pass/fail
Doctor: no drift / drift details
Typecheck: pass/fail
FDS: check:fds pass/fail; pack version and commit
Validation: pass/fail
Tests: pass/fail
Open risks:
Next milestone:
```

---

## 23. Defaults and non-negotiables

### 23.1 Defaults

| Decision | Default |
|---|---|
| Repository visibility | Public |
| License | MIT; FDS is attributed under its own MIT licence |
| Default branch | `main` |
| Stack | TypeScript 5.9 on Node.js 24 LTS |
| Module system | ESM (`"type": "module"`) |
| Node.js versions | 24.x LTS |
| Package manager | npm 11, lockfile committed |
| Package layout | `src/sras/` with `foundation/`, `standard/`, `project/`, `guard/`, `render/`, `adapters/`, and `cli/` |
| CLI argument parser | `node:util` `parseArgs`, wrapped in a DTO parser |
| YAML parser | `yaml` 2.x; no code execution, `maxAliasCount`, file-size limit |
| Schema validator | JSON Schema 2020-12 + Ajv 8 + `ajv-formats` |
| Test runner | Vitest 5 |
| Type checker | TypeScript 5.9, `tsc --noEmit` |
| Linter/formatter | ESLint 10 + typescript-eslint 8 + Prettier 3 |
| FDS pack | Full 43-skill pack, version 3.3.0, commit `4d3875c`, vendored in `.claude/skills/` |
| FDS enforcement | `CLAUDE.md`, `npm run check:fds`, PR design note, review checklist |
| FDS listing budget | `skillListingBudgetFraction: 0.02`; non-TS language packs `name-only` |
| Docs | VitePress from v0.6.0 |
| Link checker | `lychee` |
| Content guard | Custom `sras guard`; FDS pack excluded |
| Assessment profiles | `lite` and `full` |
| Source of truth | YAML |
| Canonical language | English IDs/schema; Thai content for Thailand overlays |
| Sector order | Finance, e-commerce, logistics, public sector |
| Market order | Thailand, ASEAN, EU |
| ASEAN/EU content | Register-only in v0.x |
| Legal review | None yet; `review_status: unverified` |
| Healthcare | Excluded from SRAS content; FDS pack examples are third-party and not reused |
| Custom labels | None in v0.1.0 |
| Changelog | GitHub Releases only |
| Wiki/Projects/Discussions | Off |
| Pages | Off until v0.6.0 |
| npm registry publish | Not in v0.1.0 |
| Python | Not used |

### 23.2 Non-negotiables

1. Use `oss-kit` and `oss-template`.
2. Every change through an issue and a draft PR.
3. Conventional Commits titles.
4. Version milestone on every PR.
5. Squash merge only.
6. `ci-ok` and `pr-check / check` required.
7. `oss-kit doctor` no drift.
8. MIT license; keep the FDS MIT notice and attribution.
9. No customer data, patient data, secrets, IPs, ports, or hostnames.
10. No healthcare content in SRAS-owned paths except the exact `Healthcare is out of scope` sentence in `SCOPE.md`; do not copy FDS clinical examples into SRAS content.
11. No legal advice or compliance claims.
12. No custom labels without an `oss-kit` PR.
13. No `CHANGELOG.md`.
14. No wiki, projects, or discussions.
15. No direct push to `main`.
16. No release without the audit checklist.
17. No claim without evidence.
18. No gate waiver.
19. No deletion of release tags.
20. No “done” without command output.
21. TypeScript tools follow FDS only: strict config, no `any`/`!`/unchecked `as`, `Result` for expected failures, branded primitives, readonly domain types, discriminated unions, `assertNever`, DTO parsing at boundaries, pure core, effects at the edge.
22. The FDS pack is pinned and verified; no hand edits to `.claude/skills/` and no alternative functional library.
23. No Python, pip, pytest, MkDocs, or other docs framework.

### 23.3 Explicit exclusions

- Healthcare, hospitals, clinical workflows, medical coding, patient data.
- Customer, reference-site, and project names.
- Any project-specific evidence pack, bid pack, or customer assessment.
- Any actual customer assessment or evidence.
- Any legal opinion.
- Python tooling, MkDocs, and any second docs framework.
- Any functional programming library other than the hand-rolled FDS primitives (`Result`, `brand`, `assertNever`).

---

## 24. Definition of done

### 24.1 Per-issue done

- Issue is in a version milestone.
- Branch follows the naming convention.
- PR is a draft until ready.
- PR title is Conventional Commits.
- `Closes #N` is present.
- FDS design note is complete when the issue changes a module, workflow, type, signature, or boundary.
- FDS review checklist is complete before the PR is marked ready.
- `npm run typecheck`, `npm run lint`, `npm test`, and `npm run check:fds` pass.
- Tests and docs are updated.
- No denylisted content in SRAS-owned paths, except the exact `Healthcare is out of scope` sentence in `SCOPE.md`.
- No hand edit to `.claude/skills/`; the pack matches `fds-lock.json`.
- Squash merged.
- Issue closed.
- Branch deleted.

### 24.2 Per-milestone done

- 3–7 issues closed.
- All PRs merged.
- `ci-ok` green on `main`.
- `pr-check / check` green.
- `oss-kit doctor` no drift.
- `npm run typecheck` passes.
- `npm test` passes.
- `npm run check:fds` passes.
- `npm run sras -- validate --all` passes.
- `npm run sras -- render --check` passes from v0.5.0.
- `npm run sras -- guard` passes from v0.1.0 issue 7.
- Release preflight passes.
- Audit checklist complete.
- GitHub Release created.
- No open gate failure.

### 24.3 v1.0.0 done

- SRAS 1.0 is frozen.
- Core and module requirements have complete Thai/English content.
- All four sector overlays are stable.
- Thailand register is maintained.
- ASEAN and EU registers are complete as register-only references.
- Project template and CLI are stable.
- Bilingual VitePress site is live.
- All quality gates pass.
- The FDS pack is still pinned and verified; `fds-lock.json` matches `.claude/skills/`.
- No Python tooling has entered the repository.
- `oss-kit doctor` no drift.
- Final audit is archived.
- Release notes do not claim certification, legal compliance, or healthcare coverage.

---

## 25. Functional design and TypeScript rules (FDS)

### 25.1 Decision

The repository is a TypeScript 5.9 project on Node.js 24 LTS, ESM, npm, and it follows FDS 3.3.0 as the only functional-design method.

The full FDS pack is **vendored unmodified** in `.claude/skills/` at upstream commit `4d3875c`. A submodule plus installer was rejected because a clone must have the skills available immediately, without a network fetch or an extra setup step. The vendored copy is tracked, pinned, hash-locked, and attributed.

FDS is a design method, not a second source of SRAS requirements. The SRAS standard remains the product; FDS governs how the TypeScript tools are shaped, reviewed, and tested.

### 25.2 Pin, layout, licence, and listing budget

| Item | Value |
|---|---|
| Upstream | `https://github.com/yutna/functional-design-skills` |
| Commit | `4d3875c` |
| Pack version | `3.3.0` |
| Skills | 43 `functional-*` directories |
| Installed path | `.claude/skills/` |
| Metadata path | `vendor/functional-design-skills/` |
| Licence | MIT, copyright (c) 2026 Yutthana Siphuengchai |
| Modifications | None |
| Integrity | `vendor/functional-design-skills/fds-lock.json` tree hash |
| Update command | `npm run sync:fds` |
| Verification command | `npm run check:fds` |

`vendor/functional-design-skills/` contains only `LICENSE`, `UPSTREAM.md`, and `fds-lock.json`. It does not duplicate the skill prose. The tracked skill files live in the location Claude Code reads.

`.claude/settings.json` does two things:

1. Raises `skillListingBudgetFraction` to `0.02`, because the full pack is roughly the default 1% budget on its own.
2. Marks the language packs this repository does not use as `name-only`: Elixir, Elixir/Phoenix, JavaScript, Effect, React, React/Next.js, ts-pattern, and XState. Core skills and `functional-typescript` keep their descriptions.

FDS is not updated by Dependabot. Updates are reviewed dependency changes under §25.12.

### 25.3 Healthcare boundary and the content guard

The SRAS library excludes healthcare sector work. That rule applies to SRAS-owned content: `core/`, `modules/`, `overlays/`, `registers/`, `mappings/`, `templates/`, `examples/`, `docs/`, `README.md`, and every other authored file.

The FDS upstream pack contains clinic/patient examples in its own skill prose. It is third-party reference material, not SRAS content. It is vendored unmodified and excluded from the content guard. It must never be copied into SRAS-owned paths, used as an SRAS example, or treated as a healthcare overlay.

`guard/denylist.yaml` records the exclusions explicitly:

```yaml
exclude:
  - path: .claude/skills/**
    reason: pinned third-party FDS text; not SRAS content
  - path: vendor/functional-design-skills/**
    reason: upstream licence and provenance metadata
  - path: tests/**
    reason: negative fixtures and generated test data
  - path: guard/denylist.yaml
    reason: the denylist itself contains the patterns
allow:
  - path: SCOPE.md
    text: "Healthcare is out of scope"
    reason: the required boundary statement; only this exact phrase is allowed
```

The content guard still scans every SRAS-owned path. It does not silently skip a directory: the exclusion list is reviewed, and the tests prove that a known term outside the exclusion list fails.

The one permitted healthcare string in SRAS-owned content is the exact sentence `Healthcare is out of scope` in `SCOPE.md`. The guard allowlist matches that exact phrase only; it does not exempt the whole line or file. Every other healthcare term is a finding.

If the owner later requires zero healthcare strings anywhere in the repository, including third-party skill text, the fallback is a pinned submodule plus an installer for `.claude/skills/`. That is a deliberate change to §25.1, not a casual edit.

### 25.4 TypeScript configuration

The exact files are in §25.14. The binding compiler options are:

| Option | Value | Why |
|---|---|---|
| `strict` | `true` | The minimum; no implicit `any`, no nullable holes. |
| `noUncheckedIndexedAccess` | `true` | `array[0]` is `T \| undefined`, not `T`. |
| `exactOptionalPropertyTypes` | `true` | `{ x?: string }` does not accept an explicit `undefined` by accident. |
| `noImplicitOverride` | `true` | Overrides are explicit. |
| `noFallthroughCasesInSwitch` | `true` | A missing `break` is a compile error. |
| `erasableSyntaxOnly` | `true` | No `enum`, `namespace`, or other syntax Node's type stripping cannot erase. |
| `noEmit` (base) | `true` | `npm run typecheck` only checks. |
| `module` / `moduleResolution` | `NodeNext` | ESM on Node.js 24 with correct package resolution. |
| `target` / `lib` | `ES2024` | Node.js 24 baseline. |
| `verbatimModuleSyntax` | `true` | Type-only imports are explicit and erase cleanly. |
| `isolatedModules` | `true` | Every file can be transpiled independently. |
| `moduleDetection` | `force` | Every file is a module. |
| `noImplicitReturns` | `true` | Every code path returns. |
| `noUnusedLocals` / `noUnusedParameters` | `true` | Dead parameters are not documentation. |
| `allowUnreachableCode` / `allowUnusedLabels` | `false` | No unreachable code. |
| `forceConsistentCasingInFileNames` | `true` | Case-sensitive CI and macOS agree. |
| `skipLibCheck` | `true` | Third-party declaration noise only; project files are still fully checked. This is the single deliberate relaxation and must not be copied into project code. |

TypeScript is pinned to `5.9.3`. Node.js is 24.x LTS. `package.json` declares `"type": "module"`, `engines.node >=24`, and a committed `package-lock.json`.

The base config type-checks `src/`, `tools/`, `tests/`, and the VitePress config when it exists. `tsconfig.build.json` emits only `src/sras/` to `dist/`, so `src/sras/cli.ts` becomes `dist/cli.js` and `src/sras/index.ts` becomes `dist/index.js`.

Source files use explicit `.js` import specifiers under `NodeNext` (for example `import { ok } from "./result.js"`); TypeScript resolves them to `.ts` during type-checking and rewrites nothing. Do not use extensionless imports. `tools/*.ts` are standalone shell scripts, run directly by Node.js 24's type stripping; they do not import from `src/`, so `npm run check:fds` and `node tools/check-version.ts` do not need a build. Tests import source through Vitest.

### 25.5 Coding rules

These are binding. A review finding against any of them is a defect, not a preference.

1. **Readonly domain types.** Every field is `readonly`, including arrays: `readonly Requirement[]`, not `Requirement[]`. A `readonly` field holding a mutable array is still mutable.
2. **Brand every domain primitive.** IDs, versions, dates, paths that carry a domain rule, and closed codes are branded. Export the parser, not the cast. A primitive that lives and dies inside one function stays plain.
3. **One discriminator name.** Every domain union uses `readonly tag: "..."`. The foundation `Result` union is the sole exception; its discriminant is `ok`. Do not mix `kind`, `type`, `status`, and `tag` for the same purpose. `status` remains a data field (for example `active | deprecated`); `tag` is the TypeScript discriminator.
4. **Exhaust with `never`.** Every union switch ends with `default: return assertNever(value)`. A permissive `default` that returns a value is forbidden.
5. **No `any`, no non-null `!`, no unchecked `as`.** `as const` is allowed. The only type assertion allowed in domain code is the checked cast inside a brand parser or smart constructor, immediately after the check that makes it true. `@ts-ignore` and `@ts-expect-error` are forbidden in `src/`; tests may use `@ts-expect-error` only with a description that states the type error being proven.
6. **`Result` for expected failures.** A workflow that can fail returns `Result<T, E>` or `Promise<Result<T, E>>`. Do not throw for a validation failure, a missing file, malformed YAML, an unsatisfied overlay range, or a guard hit. `assertNever` is the only intentional throw in the pure core.
7. **DTOs are separate.** The JSON Schema or CLI shape is a DTO. The domain type is built by a parser. Never use `z.infer`-style inferred wire types as the domain model. The schema can check that an array is non-empty; the parser still builds `readonly [T, ...T[]]`.
8. **Pure core, effectful shell.** `foundation/`, `standard/` (except `workflow.ts`), `project/` (except `workflow.ts`), `guard/matcher.ts`, and `render/markdown.ts` do no filesystem, network, clock, randomness, environment, or process I/O. Those effects live in `adapters/`, `workflow.ts`, `cli/`, and the `cli.ts` entry point.
9. **One error union per module.** Errors are discriminated unions with a `tag` and the data needed to render a message. Do not use `Error` objects as the expected-failure channel. Render human messages at the shell boundary.
10. **No domain `enum`, `interface`, or class.** Use string-literal unions and type aliases. `interface` is open to declaration merging; a class carries identity and mutable state that the domain does not need. External library classes (Ajv) are allowed at the boundary but never leak into domain types.
11. **No `Service`, `Manager`, `Helper`, or `Util` modules.** Name modules after the knowledge they own. A module named for a lifecycle stage is a warning sign of temporal decomposition.
12. **No duplicate rule.** A format, threshold, status set, ID pattern, or denylist category lives in one module and is imported. Two copies are a defect even if they currently agree.
13. **Comments explain why.** Do not comment what the type already says. Use comments for a non-obvious rule, a source, or a deliberate trade-off.
14. **Tests are values-first.** Pure functions are tested with plain inputs and expected outputs. Mock the filesystem only at the shell boundary. Do not mock the domain.
15. **FDS standard library only.** No Effect, fp-ts, ts-pattern, React, XState, or a second `Result` implementation. The hand-rolled primitives in `foundation/` are the only functional toolkit.
16. **Calibrate effort.** Not every function needs a brand or a `Result`. Use the FDS calibration table. A local intermediate stays plain; an exported signature gets the full treatment.

### 25.6 Module architecture

The modules are grouped by knowledge, not by technical layer:

| Module | Owns | Purity |
|---|---|---|
| `src/sras/foundation/` | `Result`, brand helper, `assertNever`, shared primitive parsers | Pure |
| `src/sras/standard/` | Requirement, module, overlay, register, profile, and crosswalk knowledge; ID parsers; validation; resolution | Pure, except `workflow.ts` |
| `src/sras/project/` | Assessment, evidence index, claim, risk register, lockfile, project init template plan | Pure, except `workflow.ts` |
| `src/sras/guard/` | Denylist rules and matching/redaction | Matcher pure; `workflow.ts` reads files |
| `src/sras/render/` | Markdown rendering of standard and project values | Pure, except `workflow.ts` |
| `src/sras/adapters/` | Filesystem, YAML, Ajv, stdout/stderr, process boundary | Effectful |
| `src/sras/cli/` | Argument DTO parsing, command dispatch, help, exit codes | Shell |
| `src/sras/cli.ts` | Process entry point: argv in, exit code out | Shell |

Dependency direction:

```text
cli.ts -> cli/ -> workflows -> domain modules -> foundation/
                         \-> adapters/ -> Node APIs
```

A domain module never imports `cli/`, `adapters/`, `node:fs`, `node:process`, `node:child_process`, or `fetch`. A workflow may import adapters and domain modules. The CLI may import workflows and adapters. `index.ts` exports only the public library surface; it does not re-export internals for convenience.

The interface of each module is much smaller than its implementation. For example, `standard` exposes the domain types and a few functions:

```ts
export declare const validateStandard: (
  standard: Standard,
) => Result<ValidatedStandard, readonly ValidationIssue[]>;

export declare const resolveStandard: (
  standard: ValidatedStandard,
  selection: Selection,
) => Result<ResolvedStandard, readonly ResolutionIssue[]>;
```

It hides DTO shapes, Ajv details, file layout, and the order of validation steps. A caller can replace the file source with an in-memory fixture without changing the call.

### 25.7 Domain primitives, `Result`, and errors

The `Result` shape is fixed:

```ts
export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
```

`map`, `bind`, and `mapError` live in `foundation/result.ts` with the FDS signatures. A workflow's error is one union, not a string. `bind` widens the error union honestly; do not cast it back to a narrower type.

A brand follows the FDS pattern:

```ts
declare const brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [brand]: B };

export type RequirementId = Brand<string, "RequirementId">;

export const requirementId = (value: string): Result<RequirementId, IdError> =>
  /^SRAS-[A-Z]+-\d{3}$/.test(value)
    ? ok(value as RequirementId)
    : err({ tag: "InvalidRequirementId", value });
```

The cast is the only one in the module and stands directly after the check. The brand is not exported as a constructor. A raw `string` cannot be passed where `RequirementId` is required.

ID families:

| ID | Owner | Shape |
|---|---|---|
| `RequirementId` | `standard/ids.ts` | `SRAS-<DOMAIN>-<NNN>`; covers Core and module requirements |
| `ModuleId` | `standard/ids.ts` | `SRAS-<MODULE>` (for example `SRAS-AI`) |
| `OverlayId` | `standard/ids.ts` | `<CC>-<INDUSTRY>` (for example `TH-FIN`) |
| `OverlayRequirementId` | `standard/ids.ts` | `<CC>-<INDUSTRY>-<NNN>` (for example `TH-FIN-003`) |
| `RegisterEntryId` | `standard/ids.ts` | `<CC>-<INSTRUMENT>-<NNN>` (for example `TH-PDPA-001`) |
| `ClaimId` | `project/ids.ts` | `CLM-<PROJECT>-<NNN>` |
| `EvidenceId` | `project/ids.ts` | `EVD-<NNN>` |
| `RiskId` | `project/ids.ts` | `RSK-<NNN>` |

`assertNever` is exactly:

```ts
export const assertNever = (value: never): never => {
  throw new Error(`unhandled case: ${JSON.stringify(value)}`);
};
```

That throw is allowed because the type system should have made the branch unreachable. It is not a model for expected failure.

Validation issues are data:

```ts
export type ValidationIssue =
  | { readonly tag: "Schema"; readonly file: string; readonly path: string; readonly message: string }
  | { readonly tag: "DuplicateId"; readonly id: string; readonly files: readonly string[] }
  | { readonly tag: "MissingReference"; readonly from: string; readonly to: string }
  | { readonly tag: "Translation"; readonly id: string; readonly field: string }
  | { readonly tag: "OverlayRange"; readonly overlay: string; readonly range: string }
  | { readonly tag: "GateWaiver"; readonly id: string };
```

The shell renders these. The domain never builds a user-facing sentence.

### 25.8 Boundary parsing and effects

The YAML boundary is:

```text
file bytes -> yaml.parse -> unknown -> Ajv schema -> DTO -> domain parser -> Result<Domain, ParseError>
```

Rules:

- `yaml.parse` returns `unknown`; it is never cast to a DTO.
- Parse with `maxAliasCount` and a file-size limit. No custom tags. No `eval`. No remote includes.
- Ajv uses JSON Schema 2020-12 via `ajv/dist/2020.js`, with `strict: true`, `allErrors: true`, and local `$ref` only. It never fetches a schema at runtime. Register `ajv-formats` once at the adapter boundary.
- Schema validation proves shape, not domain invariants. The domain parser proves brands, non-empty lists, date order, and cross-field rules.
- The DTO type is its own type. It is not exported from the domain module.
- File reads, path resolution, stdout, stderr, environment variables, the clock, and randomness live in `adapters/` or the workflow shell.
- A pure workflow takes the clock, file contents, or rule table as a value. The shell reads them once and passes them in.
- A workflow returns `Result` for every expected failure. It may throw only for an invariant violation that the type system should have prevented.

The adapter functions are small and explicit:

```ts
export type SourceFile = { readonly path: string; readonly text: string };

export declare const readSourceFiles: (
  root: string,
  paths: readonly string[],
) => Promise<Result<readonly SourceFile[], ReadError>>;

export declare const parseYaml: (
  file: SourceFile,
) => Result<unknown, YamlError>;

export declare const validateDto: <T>(
  schema: Schema,
  value: unknown,
) => Result<T, readonly SchemaIssue[]>;
```

The exact `SourceFile` type is a DTO. It carries no domain guarantee; the parser turns it into a domain value.

### 25.9 CLI shell

The CLI is a shell, not a domain module.

- Parse argv with `node:util` `parseArgs`, one command at a time, into a `Command` union.
- Unknown command, missing value, or conflicting flag returns a `UsageError` and exit code 2.
- A validation or guard failure returns exit code 1.
- Success returns 0.
- The shell sets `process.exitCode`; it does not call `process.exit` from a domain module.
- Human errors go to stderr; machine-readable output goes to stdout.
- `--json` output is a stable, versioned shape. It never includes a secret, a raw denylist match, or a file outside the reported finding.
- `--help` is data, not a domain rule.
- The CLI entry point catches only unexpected exceptions at the process boundary and turns them into a generic failure with no secret content. `src/sras/cli.ts` begins with `#!/usr/bin/env node`, and TypeScript preserves the shebang; `dist/cli.js` is the package binary. Keep `cli.ts` to a minimal entry point that calls `run` from `src/sras/cli/`; tests import `run`, not the process entry point.

Local invocation is always:

```bash
npm run sras -- <command> [options]
```

`npm run sras` builds first and runs `dist/cli.js`, so the command exercises the same entry point as the published bin. The `bin` entry is `sras` -> `dist/cli.js`.

### 25.10 The design loop for every change

Before writing code, classify the change with the FDS calibration table:

| Size | Examples in this repository | Required work |
|---|---|---|
| An answer, not kept | A one-off data probe | Write it, say it is throwaway, delete it. |
| One function in an existing module | Add a formatter, a parser branch, a small predicate | Honest signature, total function, precise name. No new module. |
| A feature in an existing flow | Add a crosswalk parser, a new guard output format, a new overlay rule | Follow the flow's pipeline and error union; add a case; do not invent a second mechanism. |
| A new module or workflow | `standard`, `project`, `guard`, `render`, `init`, `resolve` | Full loop, design twice, interface comment, design note. |
| A new bounded context | None planned in v0.x; the standard/project split is already the boundary | Full loop plus boundary and language work. |

For a new module or workflow, run the seven steps:

1. **Say it in the domain's words.** Write the command/query and the value it returns using the business's nouns and verbs. Reject `Manager`, `Service`, `Helper`, and `Util`.
2. **Model the data.** Name the vague primitives. Write down the states the business forbids and make them unbuildable. A correlated optional is a warning.
3. **Design the workflow as a pipeline.** Write each step's signature before any body. Combine steps that always run together and share nothing else.
4. **Decide where effects live.** The clock, filesystem, network, environment, and randomness are values passed in or effects in the shell. The core is pure.
5. **Shape the modules.** Hide the storage shape, the schema library, and the order of validation. Write two candidate interfaces, compare what each hides and what each forces on a caller, choose one, and record why. Ask whether the source could change without touching a caller.
6. **Name and document.** Use precise names. Comment only what the code cannot say: a non-obvious rule, its source, or a deliberate trade-off.
7. **Review.** Run the `functional-reviewing-functional-design` checklist. Rank findings by cost. Fix the cheap, real ones before the PR is ready.

A new or reshaped module, workflow, type, signature, or boundary also gets a design note in the PR:

```markdown
## FDS design note

- Calibration row: <answer | one function | feature in flow | new module/workflow | new bounded context>
- Domain words:
- Illegal states ruled out:
- Pipeline / signatures:
- Effects and where they live:
- Module boundary and hidden details:
- Two candidate shapes and why this one:
- FDS skills consulted:
- Review findings and disposition:
```

A content-only issue does not need a design note. A content issue that changes a TypeScript type, signature, parser, or module boundary does.

### 25.11 Review and enforcement

The local gate is:

```bash
npm run typecheck
npm run lint
npm run lint:md
npm run format:check
npm test
npm run check:fds
```

`npm run check:fds` is not a style check. It verifies:

1. `.claude/skills/` contains exactly 43 `functional-*` skills, each with `metadata.pack: functional-design-skills` and `metadata.version: 3.3.0`.
2. The installed tree hash matches `vendor/functional-design-skills/fds-lock.json`.
3. `vendor/functional-design-skills/LICENSE` contains the upstream MIT notice.
4. `THIRD_PARTY_NOTICES.md` names FDS, commit `4d3875c`, and the MIT licence.
5. `CLAUDE.md` contains the marked FDS design-rules block, with `functional-typescript` named.
6. `.claude/settings.json` contains `skillListingBudgetFraction: 0.02` and the expected `name-only` overrides.
7. `tsconfig.json` contains the binding compiler options from §25.4.
8. `src/` contains no `any`, non-null `!`, `@ts-ignore`, `@ts-expect-error`, `enum`, or domain `interface`; every `as` is either `as const` or a checked cast immediately after validation inside a brand parser or smart constructor; `check:fds` reports every other assertion.
9. Pure modules contain no import of `node:fs`, `node:child_process`, `node:http`, `node:net`, `fetch`, `Date.now`, `Math.random`, or `process.env`. `workflow.ts`, `adapters/`, `cli/`, and the `cli.ts` entry point are the only effectful locations.
10. No `pyproject.toml`, `requirements*.txt`, `mkdocs.yml`, `setup.py`, `Pipfile`, or `poetry.lock` exists.
11. No `CHANGELOG.md` exists.
12. The `package.json` scripts and the `tsconfig`/ESLint/Vitest files exist and are not weakened.

The PR template includes the FDS design note and the §14.5 checklist. A reviewer may not approve a module/workflow/type/boundary change without them. The automated check catches the mechanical holes; the review catches the design holes. Neither replaces the other.

### 25.12 Updating FDS

FDS is a reviewed dependency, not a floating one.

1. Read the upstream release notes and diff from the pinned commit to the candidate commit.
2. Confirm the pack version, the skill count, and the MIT licence are unchanged, or record the change.
3. Update the source/commit/version constants in `tools/sync-fds.ts`.
4. Run `npm run sync:fds`. This fetches the exact commit into a temporary directory, replaces `.claude/skills/`, copies the licence, and writes `fds-lock.json`.
5. Review the diff. Any change to a core skill's rules is a design-policy change and needs its own review, not a silent dependency bump.
6. Run `npm run typecheck`, `npm test`, and `npm run check:fds`.
7. Open one PR titled `chore(fds): update functional-design-skills to <version>`.
8. Record the new commit and version in `vendor/functional-design-skills/UPSTREAM.md`, `fds-lock.json`, and `THIRD_PARTY_NOTICES.md`.

Do not hand-edit `.claude/skills/`. Do not add FDS to Dependabot. Do not change the vendored skill text to remove examples; if the examples are unacceptable, change the packaging model in §25.1 instead.

### 25.13 What “FDS only” forbids

Forbidden in this repository:

- Effect, fp-ts, ts-pattern, React, XState, or another functional/state library.
- A second `Result`, `Option`, brand, or `assertNever` implementation.
- `any`, `as any`, non-null `!`, unchecked `as`, `@ts-ignore`, or `@ts-expect-error` in `src/`.
- `enum`, domain `interface`, or a domain class.
- A mutable field in a domain type, including a mutable array behind a `readonly` field.
- A DTO type reused as a domain type.
- Throwing for an expected validation or I/O failure.
- A `default` branch that returns a value instead of `assertNever`.
- I/O, a clock, randomness, or environment access in a pure module.
- A `Service`, `Manager`, `Helper`, or `Util` module, or a domain module named for a workflow stage; the designated `workflow.ts` shell is the only exception.
- A duplicate rule, format, threshold, or status set.
- A permissive `Partial<T>` used as a draft domain type when the draft has its own rules.
- A silent fallback that hides an invalid state.

Allowed:

- `as const`.
- The checked cast inside a brand parser or smart constructor.
- `assertNever`'s impossible-case throw.
- External libraries for YAML parsing, schema validation, testing, linting, and documentation.
- A class from an external library at the boundary, as long as it does not appear in a domain type.

### 25.14 Exact files

These are semantic templates: the values, paths, and rule settings are exact. After creating them, run `npm run format` once; Prettier normalizes trailing commas, quoting, and line wrapping. Do not change a value while formatting. The `format:check` gate runs on the formatted result.

#### `.node-version`

```text
24
```

Use the latest Node.js 24.x LTS patch in CI (`24.x`); do not pin a patch that receives no security updates. `package.json` declares `engines.node >=24`.

#### `package.json` (v0.1.0)

```json
{
  "name": "software-delivery-assurance",
  "version": "0.1.0",
  "description": "Software Delivery Assurance Library: SRAS standards, schemas, and TypeScript tools",
  "private": true,
  "type": "module",
  "license": "MIT",
  "engines": {
    "node": ">=24",
    "npm": ">=11"
  },
  "packageManager": "npm@11.12.1",
  "bin": {
    "sras": "./dist/cli.js"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "sideEffects": false,
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "lint": "eslint .",
    "lint:md": "markdownlint-cli2",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run --coverage",
    "test:unit": "vitest run",
    "test:watch": "vitest",
    "sras": "npm run build --silent && node dist/cli.js",
    "check:fds": "node tools/check-fds.ts",
    "sync:fds": "node tools/sync-fds.ts"
  },
  "dependencies": {
    "ajv": "^8.20.0",
    "ajv-formats": "^3.0.1",
    "yaml": "^2.9.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.19.2",
    "@vitest/coverage-v8": "^5.0.5",
    "eslint": "^10.13.0",
    "globals": "^17.13.0",
    "markdownlint-cli2": "^0.24.0",
    "prettier": "^3.9.10",
    "typescript": "5.9.3",
    "typescript-eslint": "^8.72.0",
    "vitest": "^5.0.5"
  }
}
```

Issue 34 (v0.6.0) adds `vitepress` `^1.6.4` to `devDependencies` and these scripts:

```json
{
  "docs:dev": "vitepress dev docs",
  "docs:build": "vitepress build docs",
  "docs:preview": "vitepress preview docs"
}
```

Do not add a `publish` script or a registry credential in v0.x.

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "lib": ["ES2024"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "types": ["node"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "erasableSyntaxOnly": true,
    "noEmit": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "noPropertyAccessFromIndexSignature": true,
    "resolveJsonModule": true
  },
  "include": [
    "src/**/*.ts",
    "tools/**/*.ts",
    "tests/**/*.ts",
    "docs/.vitepress/**/*.ts",
    "*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "coverage",
    "docs/.vitepress/dist",
    "docs/.vitepress/cache"
  ]
}
```

`skipLibCheck: true` is the only relaxation and applies to declaration files only. Do not add `strictNullChecks: false`, `noImplicitAny: false`, `suppressImplicitAnyIndexErrors`, or any option that weakens project checking.

#### `tsconfig.build.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "outDir": "dist",
    "rootDir": "src/sras",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/sras/**/*.ts"],
  "exclude": ["tests", "tools", "docs", "dist", "node_modules"]
}
```

#### `eslint.config.mjs`

```js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.ts"];
const jsFiles = ["**/*.js", "**/*.mjs", "**/*.cjs"];
const withFiles = (configs, files) =>
  configs.map((config) => ({ ...config, files }));

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      ".claude/skills/**",
      "vendor/**",
      "docs/.vitepress/dist/**",
      "docs/.vitepress/cache/**"
    ]
  },
  {
    files: jsFiles,
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.node }
    }
  },
  {
    files: tsFiles,
    ...js.configs.recommended,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: { ...globals.node }
    }
  },
  ...withFiles(tseslint.configs.strictTypeChecked, tsFiles),
  ...withFiles(tseslint.configs.stylisticTypeChecked, tsFiles),
  {
    files: tsFiles,
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true,
          "ts-expect-error": "allow-with-description"
        }
      ],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          "assertionStyle": "as",
          "objectLiteralTypeAssertions": "never"
        }
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { "allowExpressions": true }
      ]
    }
  },
  {
    files: tsFiles,
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          "selector": "TSEnumDeclaration",
          "message": "Use a string-literal union; FDS forbids domain enums."
        },
        {
          "selector": "TSInterfaceDeclaration",
          "message": "Use a readonly type alias; interfaces are open to declaration merging."
        }
      ]
    }
  },
  {
    files: [
      "src/sras/cli.ts",
      "src/sras/cli/**/*.ts",
      "src/sras/adapters/output.ts"
    ],
    rules: {
      "no-console": "off"
    }
  }
);
```

#### `vitest.config.ts`

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/sras/**/*.ts"],
      exclude: ["src/sras/**/types.ts", "src/sras/version.ts"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    }
  }
});
```

#### `.claude/settings.json`

```json
{
  "skillListingBudgetFraction": 0.02,
  "skillOverrides": {
    "functional-elixir": "name-only",
    "functional-elixir-phoenix": "name-only",
    "functional-javascript": "name-only",
    "functional-typescript-effect": "name-only",
    "functional-typescript-react": "name-only",
    "functional-typescript-react-nextjs": "name-only",
    "functional-typescript-ts-pattern": "name-only",
    "functional-typescript-xstate": "name-only"
  }
}
```

#### `CLAUDE.md` design block

The block is copied verbatim from FDS `plugin/skills/functional-design/references/project-setup.md`, wrapped in markers so `check:fds` can verify it without guessing:

```markdown
<!-- FDS-DESIGN-RULES:START -->
## Design rules

This codebase follows functional design. The `functional-design` skill
is the index; the rest of the pack carries one rule each.

- This project's own conventions win. The pack decides what they leave
  open, and a pack red flag is a place to look, not a finding.
- Before designing a new module, workflow, endpoint, or bounded
  context, read `functional-design` and follow its design loop.
- For anything smaller, use its calibration table to decide how much
  design the task warrants. For one function in a module that already
  exists, that is an honest signature and a precise name, nothing more.
- Before finishing a change that added or reshaped a type, a signature,
  or a module boundary, run the checklist in
  `functional-reviewing-functional-design`.
- Use `functional-typescript` for concrete syntax.
<!-- FDS-DESIGN-RULES:END -->
```

Below the block, add only project-specific rules that do not restate FDS:

```markdown
## Project rules

- The product is SRAS; FDS is the design method for the TypeScript tools.
- TypeScript 5.9 on Node.js 24 LTS, ESM, npm. No Python tooling.
- Expected failures return `Result`; see `src/sras/foundation/result.ts`.
- `src/sras/standard/`, `project/`, `guard/`, `render/`, and `foundation/`
  are pure unless the file is named `workflow.ts`.
- Every new or reshaped module, workflow, type, signature, or boundary needs the design note from §25.10.
- The FDS pack is pinned. Do not edit `.claude/skills/` by hand.
```

#### `AGENTS.md`

```markdown
# Agent instructions

Read `CLAUDE.md` first. Its FDS design rules are binding for this repository.

Before designing a new module, workflow, type, signature, or boundary, load
`functional-design` and follow its design loop. Use `functional-typescript`
for concrete syntax. Before marking a PR ready, run the checklist in
`functional-reviewing-functional-design`.

Do not duplicate the design rules here; `CLAUDE.md` is the canonical copy.
```

#### `vendor/functional-design-skills/UPSTREAM.md`

```markdown
# Functional Design Skills (upstream)

- Source: https://github.com/yutna/functional-design-skills
- Pinned commit: 4d3875c
- Pack version: 3.3.0
- Installed at: .claude/skills/
- Licence: MIT; see LICENSE
- Modifications: none

The skill text is vendored unmodified. It is third-party reference material,
not SRAS content. It is excluded from the content guard and must not be copied
into SRAS-owned paths.

Update with `npm run sync:fds`; verify with `npm run check:fds`. Do not edit
the installed skills by hand and do not let Dependabot update this pack.
```

#### `vendor/functional-design-skills/fds-lock.json`

```json
{
  "source": "https://github.com/yutna/functional-design-skills",
  "commit": "4d3875c",
  "version": "3.3.0",
  "skillCount": 43,
  "algorithm": "sha256",
  "treeHash": "<computed by npm run sync:fds>"
}
```

The tree hash is SHA-256 over the sorted list of relative paths and file bytes in `.claude/skills/`. `check:fds` recomputes it and fails on any difference, including a well-meaning local edit.

#### `THIRD_PARTY_NOTICES.md` FDS section

```markdown
## functional-design-skills

This repository vendors the Functional Design Skills pack.

- Source: https://github.com/yutna/functional-design-skills
- Commit: 4d3875c
- Version: 3.3.0
- Licence: MIT
- Copyright: Copyright (c) 2026 Yutthana Siphuengchai
- Modifications: none

The MIT licence text is reproduced in
`vendor/functional-design-skills/LICENSE`. The pack is third-party reference
material and is not SRAS content.
```

#### `.gitattributes`

```text
* text=auto eol=lf
.claude/skills/** -text
vendor/functional-design-skills/** -text
```

The `-text` rule keeps the vendored skill bytes exactly as upstream wrote them, so the lock hash is stable across platforms. Do not let an editor or formatter rewrite `.claude/skills/`.

#### `.prettierignore`

```text
node_modules
dist
coverage
package-lock.json
CLAUDE.md
.claude/skills
vendor
docs/.vitepress/dist
docs/.vitepress/cache
tests/fixtures/invalid
```

#### `.markdownlint-cli2.jsonc`

```jsonc
{
  "config": {
    "MD013": false,
    "MD024": { "siblings_only": true },
    "MD033": false,
    "MD034": false,
    "MD041": false
  },
  "ignores": [
    ".claude/skills/**",
    "vendor/**",
    "node_modules/**",
    "docs/.vitepress/dist/**",
    "docs/.vitepress/cache/**",
    "tests/fixtures/invalid/**"
  ]
}
```

#### `.gitignore` additions

The `oss-kit` Node stack supplies the base. Add:

```text
dist/
coverage/
*.tsbuildinfo
.claude/settings.local.json
docs/.vitepress/dist/
docs/.vitepress/cache/
```

Do not ignore `.claude/skills/`, `.claude/settings.json`, or `vendor/`.

---

## Appendix A — Exact file templates

### A.1 `SCOPE.md` outline

```markdown
# Scope

## What this library is
## What it is not
## Supported sectors
## Supported markets
## Modules
## Overlays
## Registers
## Project instances
## Out of scope
- Healthcare is out of scope.
## Review status and limitations
```

### A.2 `DISCLAIMER.md` outline

```markdown
# Disclaimer

This library is a technical reference, not legal advice.
It is not a certification, accreditation, or audit attestation.
Regulatory entries are unverified unless a named reviewer signs off.
You are responsible for verifying applicability with qualified counsel.
No customer data or confidential information is accepted.
```

### A.3 `GOVERNANCE.md` outline

```markdown
# Governance

## Maintainer
## Decision process
## Review status
## Release cadence
## Adding a module
## Adding an overlay
## Adding a register entry
## Breaking changes
## Deprecation
## Security reports
## Code of conduct
```

### A.4 `ROADMAP.md` outline

```markdown
# Roadmap

## v0.1.0 Foundation
## v0.2.0 Core SRAS
## v0.3.0 Modules
## v0.4.0 Thailand sector overlays
## v0.5.0 Project template and CLI
## v0.6.0 Bilingual docs site
## v0.7.0 ASEAN registers
## v0.8.0 EU registers
## v0.9.0 Pilot and community review
## v1.0.0 Stable
```

### A.5 `templates/project/README.md` outline

```markdown
# Project Assurance Instance

## Scope
## Profile
## Selected modules
## Selected overlays
## Assessment status
## Evidence location
## Claims
## Risks
## Sign-off
## Limitations
```

### A.6 `package.json` and TypeScript configuration

The exact `package.json`, `tsconfig.json`, `tsconfig.build.json`, `eslint.config.mjs`, `vitest.config.ts`, `.claude/settings.json`, `CLAUDE.md` block, and FDS metadata files are in §25.14.

There is no `pyproject.toml`, `requirements*.txt`, `setup.py`, Hatch build target, Python package, or MkDocs configuration. The only package manifest is `package.json`; the only lockfile is `package-lock.json`.

### A.7 `.lychee.toml` outline

```toml
max_retries = 2
timeout = 20
exclude = [
  "https://example.com",
]
exclude_path = [
  ".claude/skills",
  "vendor",
  "node_modules",
  "dist",
  "coverage",
  "tests/fixtures/invalid",
  "docs/.vitepress/dist",
  "docs/.vitepress/cache",
]
```

Do not exclude a link just because it is temporarily down; document the reason.

---

## Appendix B — Command reference

### B.1 Repository checks

```bash
gh repo view yutna/software-delivery-assurance \
  --json name,visibility,defaultBranchRef,description,repositoryTopics

gh api repos/yutna/software-delivery-assurance \
  --jq '{has_issues,has_wiki,has_projects,has_discussions,allow_squash_merge,allow_merge_commit,allow_rebase_merge,delete_branch_on_merge,allow_auto_merge,allow_update_branch}'

gh label list -R yutna/software-delivery-assurance --limit 500

gh api "repos/yutna/software-delivery-assurance/milestones?state=all&per_page=100" \
  --jq '.[] | {title,state,open_issues,closed_issues}'

gh api repos/yutna/software-delivery-assurance/rulesets

gh api repos/yutna/software-delivery-assurance/actions/permissions/workflow

gh api repos/yutna/software-delivery-assurance/vulnerability-alerts

gh api repos/yutna/software-delivery-assurance/automated-security-fixes

gh api repos/yutna/software-delivery-assurance/private-vulnerability-reporting

gh api repos/yutna/software-delivery-assurance/code-scanning/default-setup
```

### B.2 Workflow checks

```bash
cd ~/Projects/oss-kit
bootstrap/oss-kit doctor yutna/software-delivery-assurance
bootstrap/oss-kit apply yutna/software-delivery-assurance --dry-run
```

### B.3 Local checks

```bash
cd ~/Projects/software-delivery-assurance
npm ci
npm run typecheck
npm run lint
npm run format:check
npm run lint:md
npm test
npm run check:fds
npm run sras -- validate --all
npm run sras -- render --check
npm run sras -- guard
npm run docs:build
```

### B.4 Release checks

```bash
TAG=v0.1.0
VERSION="${TAG#v}"
npm run typecheck
npm test
npm run check:fds
node tools/check-version.ts "$VERSION"
gh api "repos/yutna/software-delivery-assurance/milestones?state=all&per_page=100" \
  --jq '.[] | select(.title=="v0.1.0") | {title,state,open_issues,closed_issues}'
gh release view "$TAG" -R yutna/software-delivery-assurance
git tag --list "$TAG"
```

### B.5 Audit of a merged PR

```bash
gh pr view <N> -R yutna/software-delivery-assurance \
  --json title,state,isDraft,assignees,milestone,labels,mergeCommit,closedAt,body
gh pr checks <N> -R yutna/software-delivery-assurance
```

Confirm the PR body contains the FDS design note and the completed review checklist when the change touched a module, workflow, type, signature, or boundary.

---

## Appendix C — Content guard denylist

The public guard denylist contains **generic categories and patterns only**. Match whole words and common plurals to avoid false positives. Customer, reference-site, and project names must be supplied through a private local override and must never be committed to the public repository.

The only healthcare phrase allowed in SRAS-owned content is the exact sentence `Healthcare is out of scope` in `SCOPE.md`. The allowlist does not exempt the file or the line; any other healthcare term on that line is still a finding.

The guard scans public content paths: `README.md`, `SCOPE.md`, `DISCLAIMER.md`, `GOVERNANCE.md`, `ROADMAP.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CITATION.cff`, `core/`, `modules/`, `overlays/`, `registers/`, `mappings/`, `templates/`, `examples/`, and `docs/`. It excludes `tests/` (which must contain deliberate denylist hits), `guard/denylist.yaml` (which defines the rules), `.claude/skills/` (pinned third-party FDS text), and `vendor/functional-design-skills/` (licence and provenance metadata). The FDS exclusion is recorded in the denylist and in §25.3; it is not a silent skip.

Recommended override mechanism:

```bash
export SRAS_DENYLIST_PATH="$HOME/.config/sras/denylist.txt"
```

The public `guard/denylist.yaml` contains:

```yaml
exclude:
  - path: .claude/skills/**
    reason: pinned third-party FDS text; not SRAS content
  - path: vendor/functional-design-skills/**
    reason: upstream licence and provenance metadata
  - path: tests/**
    reason: negative fixtures and generated test data
  - path: guard/denylist.yaml
    reason: the denylist itself contains the patterns
allow:
  - path: SCOPE.md
    text: "Healthcare is out of scope"
    reason: the required boundary statement; only this exact phrase is allowed
categories:
  healthcare:
    - healthcare
    - hospital
    - clinic
    - clinical
    - patient
    - medical record
    - diagnosis
    - medical treatment
  customer_data:
    - customer-name-placeholder
    - project-name-placeholder
  secrets:
    - "ghp_"
    - "github_pat_"
    - "-----BEGIN PRIVATE KEY-----"
  secrets_regex:
    - "\\bAKIA[0-9A-Z]{16}\\b"
    - "\\bsk-[A-Za-z0-9_-]{16,}\\b"
  network:
    - "localhost"
  network_regex:
    - "\\b10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b"
    - "\\b192\\.168\\.\\d{1,3}\\.\\d{1,3}\\b"
    - "\\b172\\.(1[6-9]|2[0-9]|3[01])\\.\\d{1,3}\\.\\d{1,3}\\b"
    - "\\blocalhost:\\d{2,5}\\b"

```

Also block:

- Thai national ID pattern: 13 digits with a valid checksum (use a library or a conservative regex).
- Email addresses in examples, unless the domain is `example.com`.
- Phone numbers in examples, unless the number is obviously synthetic.
- Private keys, cloud access keys, and GitHub tokens.
- Internal hostnames and non-public URLs.

The private override file may contain actual customer/project names, internal hostnames, and project-specific ports. It is read at runtime and is never committed. CI runs the public guard only; local pre-commit and release audits run the private override.

Do not print the matched secret. Print the file, line, rule ID, and a redacted preview.

---

## Appendix D — Release note template

```markdown
# vX.Y.Z

## Standard version
SRAS X.Y.Z

## Highlights
- ...

## New requirements
- ...

## New modules
- ...

## New overlays
- ...

## New registers
- ...

## Breaking changes
- ...

## Migration
- ...

## Limitations
- ...

## Audit
- `oss-kit doctor`: no drift
- `npm run typecheck`: pass
- `npm test`: pass
- `npm run check:fds`: pass
- `npm run sras -- validate --all`: pass
- CI: `ci-ok` and `pr-check / check` green
- Checklist: <link>
```

---

## Appendix E — What “done” means for the owner

The owner should be able to open the repository and see:

1. A clear README that says what the library is and is not.
2. A working quick start.
3. Four sector overlays: finance, e-commerce, logistics, public sector.
4. A Thailand register and register-only ASEAN/EU references.
5. A project template that a team can copy.
6. A CLI that validates, renders, and guards the content.
7. A documentation site in Thai and English.
8. A release history with no unsupported claims.
9. A repository that passes `oss-kit doctor`, `npm run typecheck`, `npm test`, and `npm run check:fds`.
10. A pinned FDS pack in `.claude/skills/` with licence, lock, and `CLAUDE.md` design rules.
11. No healthcare content in SRAS-owned paths except the exact `Healthcare is out of scope` sentence in `SCOPE.md`, no customer data, no legal advice.
12. No Python tooling, no MkDocs, and no second docs framework.

If any of these is missing, the project is not done.
