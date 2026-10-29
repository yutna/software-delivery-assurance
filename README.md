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

## How it is used

| Part                | What it does                                                                                                                                         | What it does not do                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **This repository** | Collects concerns, questions, evidence expectations, and synthetic examples for a project team to consider.                                          | It does not decide that a concern applies, prescribe an implementation, or produce a formal assurance record. |
| **Your project**    | Selects the concerns that fit its context, decides how to implement them, writes its own evidence and formal documents, and obtains its own reviews. | It does not inherit a certification, a standard status, or an approval from this repository.                  |

The library is a concern template. A project that needs a formal review, a legal
opinion, a human Thai review, or a certification runs that work in its own
context and keeps the record there. Read
[template readiness](docs/en/governance/template-readiness.md) before relying on
the kit for a real delivery decision.

## What it is not

- Not a certification, accreditation, audit attestation, or regulatory approval.
- Not legal advice or a definitive statement of legal compliance.
- Not a published standard with external sign-off.
- Not a customer-specific assessment, evidence pack, or contract.
- Not a hosted product, dashboard, or multi-tenant platform.

See [SCOPE.md](SCOPE.md) for the full boundary and exclusions.

## Current status

**Content version: SRAS 1.1.0. Template release: v1.1.0, published
2026-10-28. This is a template release, not a standard.**

The template is usable with limitations. The project template, `init`,
`project validate`, `project refresh`, deterministic rendering, and the content
guard work. The four Thailand sector overlays include public sector, and a
public-sector instance records the contracting authority and contract reference.
The 1.1.0 release adds requirement-page guidance and crosswalk pages, a NIST
SP 800-218 (SSDF) crosswalk, adopter operations guides, and an explicit
`Not signed` sign-off for new instances.

The limitations are part of the product, not a footnote:

- All 167 active requirements are `translation_status: partial` with
  `machine_translated: true`. The content is AI-authored and AI-audited; no
  human Thai review is claimed.
- The 27 register entries are `review_status: unverified`.
- No external reviewer, legal reviewer, or certification body has been engaged.
  No page claims external review, certification, or legal approval.
- Four legal and regulatory concerns have desk research notes. The library does
  not determine whether they apply to your project; see
  [legal concerns](docs/en/governance/legal-concerns.md).
- The template is a starting point for your own scope and local rules. It does
  not replace procurement advice, legal advice, or your organisation's quality
  and security programme.

The v0.9.0 pilots produced 18 findings: 14 are now fixed, none remain deferred,
and 4 are legal or regulatory concerns with desk research notes. The
[pilot summary](docs/en/pilots/summary.md) records each disposition. The
[AI audit record](docs/en/governance/v1-audit.md) records what the AI checked,
what it found, and what remains a limitation.

The repository also publishes an English and Thai VitePress site at
[yutna.github.io/software-delivery-assurance](https://yutna.github.io/software-delivery-assurance/).
English pages are canonical for identifiers, schema keys, and file names. Thai
pages are machine-assisted drafts marked `translation_status: partial`. A
project that needs a human-confirmed translation runs that review in its own
context. CI builds the site on every pull request and
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
npm run check:a11y
```

Create a project instance with:

```bash
npm run sras -- init ~/sras-demo --profile lite
```

Inspect the resolved requirements and gate coverage with:

```bash
npm run sras -- project resolve ~/sras-demo
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
Follow [ROADMAP.md](ROADMAP.md) for the released milestones. The 1.1.0
template release publishes the concern template. It is not a standard release.

## Repository map

| Path         | Purpose                                                    |
| ------------ | ---------------------------------------------------------- |
| `core/`      | SRAS Core requirements and profiles                        |
| `modules/`   | Optional technical modules                                 |
| `overlays/`  | Sector and jurisdiction deltas                             |
| `registers/` | Regulatory registers with official sources                 |
| `mappings/`  | Informative crosswalks to external standards               |
| `templates/` | Project-instance templates and the AI assessment prompt    |
| `examples/`  | Synthetic examples only                                    |
| `schemas/`   | JSON Schema 2020-12 contracts                              |
| `src/sras/`  | TypeScript domain core, adapters, and CLI                  |
| `tools/`     | Repository checks and the FDS sync/verify tools            |
| `tests/`     | Unit, integration, golden, and content tests               |
| `docs/`      | Bilingual docs site, guides, and generated reference pages |

## Contributing

Follow [CONTRIBUTING.md](CONTRIBUTING.md). Every change goes through an issue,
a short branch, a draft pull request, CI, and a squash merge. FDS design notes
and review checklists are required for TypeScript module, workflow, type,
signature, or boundary changes. Documentation changes do not require an
external reviewer.

## License, notice, and disclaimer

- [LICENSE](LICENSE) — MIT.
- [NOTICE.md](NOTICE.md) — third-party material and trademarks.
- [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) — FDS attribution.
- [DISCLAIMER.md](DISCLAIMER.md) — not legal advice, not a certification.

## Citation

Use [CITATION.cff](CITATION.cff) to cite the repository and the SRAS version.
