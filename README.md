# Software Delivery Assurance Library

Open, evidence-based assurance for software delivery.

## What this repository is

A public library for answering four questions with evidence:

1. What must be true before software is delivered?
2. What evidence proves it?
3. What may we claim, and what may we not claim?
4. What is the gap and the remediation plan?

The library contains the SRAS Core, optional technical modules, sector
overlays, regulatory registers, project-instance templates, and TypeScript
tools that validate, render, and guard the content.

## What it is not

- Not a certification, accreditation, audit attestation, or regulatory approval.
- Not legal advice or a definitive statement of legal compliance.
- Not a customer-specific assessment, evidence pack, or contract.
- Not a hosted product, dashboard, or multi-tenant platform.

See [SCOPE.md](SCOPE.md) for the full boundary and exclusions.

## Current status

**v0.9.0 — Pilot and community review.** Two internal pilots ran against
synthetic projects for finance and public sector. They produced 18 findings:
nine are fixed, five are deferred with a follow-up issue, and four remain open
legal questions. The four sector examples are now complete project instances
with tests, and project validation rejects evidence that is declared current
after it expired. External review and the owner's v1.0.0 readiness sign-off are
pending; the [readiness review](docs/en/governance/v1-readiness.md) records the
blocking items.

The rest of the standard is unchanged: seven core domains with 70 active
requirements, both the `lite` and `full` profiles, five technical modules with
52 requirements for AI/GenAI, integration and API, regulated data, cloud/SaaS,
and on-premises, and four Thailand sector overlays with 45 requirements for
finance, e-commerce, logistics, and public sector. Twelve Thailand register
entries, the six ASEAN entries, and the nine EU entries index official sources,
seven informative crosswalks link SRAS to ISO/IEC 27001:2022, NIST CSF 2.0,
OWASP ASVS 5.0, PCI DSS 4.0.1, WCAG 2.2 AA, ISO/IEC 42001:2023, and NIST AI RMF
1.0, and a pure resolver applies Core, modules, overlays, and project additions
with stricter-wins conflict reporting.

The library publishes an English and Thai VitePress site at
[yutna.github.io/software-delivery-assurance](https://yutna.github.io/software-delivery-assurance/).
English pages are canonical for identifiers, schema keys, and file names. Thai
pages are machine-assisted drafts marked `translation_status: partial` until a
human reviewer confirms them. CI builds the site on every pull request and
checks links with lychee; a merge to `main` deploys `docs/.vitepress/dist` to
GitHub Pages.

The tools provide project JSON Schemas and domain types, a copyable project
template, `sras init`, deterministic Markdown rendering with `sras render
--check`, and content-guard reports with GitHub Actions annotations. The
synthetic end-to-end project under `examples/e2e-project/` exercises Core, the
AI module, and the finance overlay. The four sector examples under `examples/`
are complete project instances with manifests, risk registers, and lockfiles.

## Who it is for

Product owners, engineering leads, security and privacy teams, operations
teams, assessors, and bid teams that need a reusable, evidence-based way to
discuss software readiness without inventing a new checklist for every
customer.

## Supported sectors

Finance, e-commerce, logistics, and public sector. The sector overlays are
deltas on the Core, not full standards.

## Quick start

Requirements: Node.js 24 LTS and npm 11.

```bash
npm ci
npm run typecheck
npm test
npm run check:fds
npm run sras -- --version
npm run sras -- validate --all
npm run sras -- render --check
npm run sras -- guard
npm run docs:build
npm run check:docs
```

Create a project instance with:

```bash
npm run sras -- init ~/sras-demo --profile lite
```

Read [SCOPE.md](SCOPE.md), then the [quick start](docs/en/quick-start.md) and
the [project template guide](docs/en/templates/project.md). The published site
is [yutna.github.io/software-delivery-assurance](https://yutna.github.io/software-delivery-assurance/).
Follow [ROADMAP.md](ROADMAP.md) for the planned milestones.

## Repository map (current and planned)

| Path         | Purpose                                                     |
| ------------ | ----------------------------------------------------------- |
| `core/`      | SRAS Core requirements and profiles                         |
| `modules/`   | Optional technical modules                                  |
| `overlays/`  | Sector and jurisdiction deltas                              |
| `registers/` | Regulatory registers with official sources                  |
| `mappings/`  | Informative crosswalks to external standards                |
| `templates/` | Project-instance templates                                  |
| `examples/`  | Synthetic examples only                                     |
| `schemas/`   | JSON Schema 2020-12 contracts                               |
| `src/sras/`  | TypeScript domain core, adapters, and CLI                   |
| `tools/`     | Repository checks and the FDS sync/verify tools             |
| `tests/`     | Unit, integration, golden, and content tests                |
| `docs/`      | Bilingual docs site, guides, and generated reference pages  |
| `internal/`  | Temporary bootstrap seed; deleted in the final v1.0.0 issue |

## Contributing

Follow [CONTRIBUTING.md](CONTRIBUTING.md). Every change goes through an issue,
a short branch, a draft pull request, CI, and a squash merge. FDS design notes
and review checklists are required for TypeScript module, workflow, type,
signature, or boundary changes.

## License, notice, and disclaimer

- [LICENSE](LICENSE) — MIT.
- [NOTICE.md](NOTICE.md) — third-party material and trademarks.
- [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) — FDS attribution.
- [DISCLAIMER.md](DISCLAIMER.md) — not legal advice, not a certification.

## Citation

Use [CITATION.cff](CITATION.cff) to cite the repository and the SRAS version.
