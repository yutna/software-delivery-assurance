# Software Delivery Assurance Starter Kit

Open, evidence-based assurance for software delivery — starting with Thai
public-sector projects.

## What this repository is

A starter kit for teams that need to answer four questions with evidence:

1. What must be true before software is delivered?
2. What evidence proves it?
3. What may we claim, and what may we not claim?
4. What is the gap and the remediation plan?

The kit gives you a copyable project template, a command-line tool, the SRAS
reference requirements, Thailand sector overlays, regulatory registers,
crosswalks, and bilingual guidance. Copy the template into a private project
repository, select the profile and overlays that match the work, and record the
scope, assessment, evidence index, claims, and risk register there.

The public repository holds templates and synthetic examples only. Real
evidence and customer data stay in the private project instance.

## Two ways to use it

| Track                         | Use it when                                                                 | Status                                  |
| ----------------------------- | --------------------------------------------------------------------------- | --------------------------------------- |
| **Template / starter kit**    | You are starting a project and need a structured assurance record now.      | Usable with limitations                 |
| **Formal-standard reference** | You need a reviewed standard, external review, or a v1.0.0 stability claim. | Not ready; v1.0.0 track remains blocked |

The template track is the default. It does not require an external reviewer,
and it does not produce a certification. The formal-standard track is optional
and separate. Read [template readiness](docs/en/governance/template-readiness.md)
before relying on the kit for a real delivery decision.

## What it is not

- Not a certification, accreditation, audit attestation, or regulatory approval.
- Not legal advice or a definitive statement of legal compliance.
- Not a published standard with external sign-off.
- Not a customer-specific assessment, evidence pack, or contract.
- Not a hosted product, dashboard, or multi-tenant platform.

See [SCOPE.md](SCOPE.md) for the full boundary and exclusions.

## Current status

**Content version: SRAS 0.9.0. Template positioning: v0.10.0 milestone in
progress, no release cut and no version bump.**

The template track is usable with limitations. The project template, `init`,
`project validate`, `project refresh`, deterministic rendering, and the content
guard work. The four Thailand sector overlays include public sector, and a
public-sector instance records the contracting authority and contract reference.

The limitations are part of the product, not a footnote:

- All 167 active requirements are `translation_status: partial` with
  `machine_translated: true`. A human Thai review has not happened.
- The 27 register entries are `review_status: unverified`.
- No external reviewer has been engaged. No page claims external review,
  certification, or legal approval.
- Four legal questions (#128–#131) remain open.
- Evidence type coverage (#135) and resolution output (#126) are not complete.
- The template is a starting point for your own scope and local rules. It does
  not replace procurement advice, legal advice, or your organisation's quality
  and security programme.

The v0.9.0 pilots produced 18 findings: 11 are now fixed, 3 remain deferred with
an issue, and 4 are open legal questions. The [pilot summary](docs/en/pilots/summary.md)
records each disposition. The [v1.0.0 readiness review](docs/en/governance/v1-readiness.md)
records why the formal-standard track is not ready.

The repository also publishes an English and Thai VitePress site at
[yutna.github.io/software-delivery-assurance](https://yutna.github.io/software-delivery-assurance/).
English pages are canonical for identifiers, schema keys, and file names. Thai
pages are machine-assisted drafts marked `translation_status: partial` until a
human reviewer confirms them. CI builds the site on every pull request and
checks links with lychee; a merge to `main` deploys `docs/.vitepress/dist` to
GitHub Pages.

## Who it is for

Thai government digital teams, state enterprises, vendors delivering public
services, product owners, engineering leads, security and privacy teams,
operations teams, assessors, and bid teams. It is also usable by finance,
e-commerce, and logistics teams that need the same evidence discipline.

## Start here

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

Then read, in this order:

1. [Template readiness](docs/en/governance/template-readiness.md) — what is
   usable now and what is not.
2. [Quick start](docs/en/quick-start.md) — create, edit, and validate an
   instance.
3. [Owner map](docs/en/templates/owner-map.md) — who owns each activity.
4. [Project template guide](docs/en/templates/project.md) — file-by-file
   reference.
5. [Public sector](docs/en/sectors/public-sector.md) — the Thailand overlay for
   government delivery.
6. [Confidence labels](docs/en/governance/confidence-labels.md) — how this
   repository labels what it knows.

The published site is
[yutna.github.io/software-delivery-assurance](https://yutna.github.io/software-delivery-assurance/).
Follow [ROADMAP.md](ROADMAP.md) for the planned milestones. The template track
is planned as v0.10.0; the formal-standard track remains v1.0.0.

## Repository map

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
signature, or boundary changes. Template-track documentation changes do not
require an external reviewer.

## License, notice, and disclaimer

- [LICENSE](LICENSE) — MIT.
- [NOTICE.md](NOTICE.md) — third-party material and trademarks.
- [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) — FDS attribution.
- [DISCLAIMER.md](DISCLAIMER.md) — not legal advice, not a certification.

## Citation

Use [CITATION.cff](CITATION.cff) to cite the repository and the SRAS version.
