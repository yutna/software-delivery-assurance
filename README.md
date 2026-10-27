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

**v0.4.0 — Thailand sector overlays.** The seven core domains are complete with
70 active requirements, and both the `lite` and `full` profiles are available.
Five technical modules add 52 requirements for AI/GenAI, integration and API,
regulated data, cloud/SaaS, and on-premises. Four Thailand sector overlays —
finance, e-commerce, logistics, and public sector — add sector-specific
requirements. Twelve Thailand register entries index official sources, and a
pure resolver applies Core, modules, jurisdiction and industry overlays, and
project additions with stricter-wins conflict reporting. Seven informative
crosswalks link SRAS to ISO/IEC 27001:2022, NIST CSF 2.0, OWASP ASVS 5.0,
PCI DSS 4.0.1, WCAG 2.2 AA, ISO/IEC 42001:2023, and NIST AI RMF 1.0. The CLI
supports `sras --version`, `sras validate --all`, and `sras guard`; project init
and rendering arrive in later milestones.

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
```

Read [SCOPE.md](SCOPE.md), then follow [ROADMAP.md](ROADMAP.md) for the planned
milestones. The assessment workflow, project template, and full CLI are added
in v0.5.0.

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
| `docs/`      | Bilingual documentation site from v0.6.0                    |
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
