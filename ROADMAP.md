# Roadmap

The roadmap is a set of planning targets, not contractual deadlines. Every
version milestone contains 3 to 7 issues and is released only when its exit
criteria and audit checklist pass.

The roadmap has one product: a concern template / starter kit. It is usable now
with limitations. The repository does not produce a standard, a certification,
or a formal review. An adopting project decides which concerns apply, how to
implement them, and what formal documents to produce.

The repository collects the concerns and the tooling. The project owns the
review and the formal record.

## v0.1.0 — Foundation

Repository identity, TypeScript toolchain, pinned FDS pack, schemas, validation
workflow, 10 seed requirements, governance, and the content guard.

## v0.2.0 — Core SRAS

Seven Core domains, 70 requirements, and the `lite` and `full` profiles.

## v0.3.0 — Modules

AI/GenAI, integration/API, regulated data, cloud/SaaS, on-premises, and the
initial crosswalk framework.

## v0.4.0 — Thailand sector overlays

Thailand regulatory register, finance, e-commerce, logistics, public sector,
the overlay resolver, and four synthetic examples.

## v0.5.0 — Project template and CLI

Project schemas and domain types, the project template, `init`, `render`,
guard reports, CLI documentation, and an end-to-end fixture.

## v0.6.0 — Bilingual documentation site

VitePress configuration, English and Thai documentation, the language switcher,
GitHub Pages deployment, and link checking.

## v0.7.0 — ASEAN registers

Register-only coverage for Singapore, Malaysia, Indonesia, Vietnam, the
Philippines, the ASEAN Model Contractual Clauses, and a comparison page.

## v0.8.0 — EU registers

Register-only coverage for GDPR, eIDAS, NIS2, the Cyber Resilience Act, DORA,
PSD2/PSD3, the EU AI Act, the Data Act, the Accessibility Act, and a comparison
page.

## v0.9.0 — Pilot and community review

Two internal pilots, published findings and limitations, an AI self-review, and
the readiness review.

## v0.10.0 — Template positioning

Reposition the repository in place as a starter kit for future projects,
especially Thai software delivery assurance. The milestone adds a one-page owner
map, a template-readiness statement, docs-only confidence labels, optional
review labels for the review tools, and a Thai readability pass on the
highest-value pages.

This milestone does not bump the library version, freeze SRAS 1.0, close the
v1.0.0 milestone, or cut a release. The content remains SRAS 0.9.0, and the
template track remains usable with limitations.

## v1.0.0 — Template release

Published the concern template as a 1.0.0 template release on 2026-10-28. The
release notes state what the library is, what it is not, and the limitations
(partial Thai translation, unverified registers, no human or external review).
It does not freeze a standard, does not require a human Thai review or an
external review, and does not claim certification or compliance.

An adopting project that needs a formal review runs it in its own context. The
library only points at the concerns and keeps the synthetic examples.

## v1.1.0 — Adopter operations and crosswalk depth

Published as a 1.1.0 template release on 2026-10-28. The release adds rationale,
assessment guidance, references, and crosswalk links to generated requirement
pages; generates crosswalk pages; adds a targeted NIST SP 800-218 (SSDF)
crosswalk; documents private CI validation and 1.x upgrades for adopters; makes
an unsigned sign-off explicit; and checks both `package-lock.json` version
fields. It also completes the issue-form and citation metadata follow-ups.

No requirement ID, schema shape, or gate changed. The Thai translation remains
partial, the registers remain unverified, and no human, external, or legal
review is claimed.

## v1.2.0 — Adopter tooling and documentation assurance

Published as a 1.2.0 template release on 2026-10-29. The release adds an
accessibility statement and an automated axe-core check for the documentation
site, a refreshed security policy, and a copyable AI assessment prompt that
injects each requirement's assessment guidance. It keeps the documentation site
out of search indexes and records the check in the local gate.

No requirement ID, schema shape, CLI command, or gate changed. The Thai
translation remains partial, the registers remain unverified, and no human,
external, or legal review is claimed.
