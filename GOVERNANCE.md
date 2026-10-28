# Governance

## Maintainer

The repository has a solo maintainer, `@yutna`. The maintainer makes the final
decision on scope, releases, and breaking changes. Every change still goes
through an issue, a pull request, CI, and a squash merge.

## Policy version and applicability

This policy applies to the 0.10.0 concern-template minor and later. The library
is a concern template, not a standard. The content version remains SRAS 0.9.0
until a later 1.0.0 template release. No page may describe the repository as a
standard, certified, externally reviewed, or human-reviewed.

The policy cannot be satisfied by a document alone. A review status changes
only when the named reviewer, the date, and the scope exist and are recorded.
This repository's content is AI-authored and AI-audited; it stays `draft` or
`unverified`.

## One product, project-owned review

The repository collects concerns, questions, evidence expectations, and
synthetic examples. An adopting project decides which concerns apply, how to
implement them, and what formal documents to produce.

The repository does not claim to be a standard, a certification, or an external
review. It does not require a human Thai reviewer, an external reviewer, or a
legal reviewer for a template release. When a project needs those reviews, it
runs them in its own context and keeps the record there.

The maintainer owns the template, docs, examples, and tooling. A change needs an
issue, a pull request, CI, and a squash merge. The maintainer may describe the
library as "usable with limitations" but not as stable, certified, externally
reviewed, or legally reviewed.

## Decision process

- Small changes: issue with context and acceptance criteria, then a pull request.
- Template changes: the same issue and pull request path; no external reviewer.
- Schema or Core changes: issue with rationale, migration note, and at least one
  review cycle.
- Breaking changes: major version, deprecation notice, migration guide, and a
  review cycle.
- New sector or jurisdiction: issue with scope, sources, and the AI audit plan.
  A register stays `unverified`; an adopting project may add its own review.

## Review status

Every structured object carries `review_status` and `translation_status`. The
two fields answer different questions and must not be substituted for each
other.

### Content review status

| Status       | Meaning                                                                                           | Who may set it                                       | What it does not mean                                    |
| ------------ | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| `draft`      | Content is being written and is not ready to assess.                                              | The author.                                          | Nothing is approved or usable.                           |
| `unverified` | Content is published as a reference but has not been reviewed by a qualified reviewer.            | The maintainer, after the content and sources exist. | Not a review result, not legal advice, not compliance.   |
| `reviewed`   | A named reviewer, review date, scope, and findings are recorded in the object or a linked record. | The named human reviewer; the maintainer records it. | Not certification, accreditation, or a legal conclusion. |

A review record identifies the reviewer by name, the date, the scope, the
version reviewed, and any limitation. A review without those fields does not
change `review_status`. An AI review is recorded as an AI review and never as
`reviewed` on behalf of a human.

### Translation review status

| Status                     | Meaning                                                                                  | Who may set it                                       |
| -------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `partial`                  | The translation is incomplete or machine-assisted and has not been confirmed by a human. | The author or maintainer.                            |
| `complete`                 | A named human reviewer has confirmed the translation for the recorded scope.             | The named human reviewer; the maintainer records it. |
| `machine_translated: true` | A machine produced or assisted the text. It stays `partial` until a human confirms it.   | The author or maintainer.                            |

`translation_status: complete` and `machine_translated: false` require a named
human reviewer, a date, and a scope. An AI execution agent may draft, edit, and
review text, but it cannot mark a translation complete or claim to be the human
reviewer. A Thai page that has not had a human review stays `partial` with
`machine_translated: true`, even when the wording is polished.

This repository's content is AI-authored and AI-audited. No human reviewer has
confirmed the translation, no external reviewer has signed the content, and no
legal reviewer has approved it. The content therefore stays `draft` or
`unverified`; it is not `reviewed`, and the translation stays `partial`.

Legal content stays `unverified` without a qualified legal reviewer. Legal and
regulatory concerns are documented as desk research with official sources, the
limits of the research, and questions a project must answer. The library does
not decide whether a source applies to a project. A project records its own
decision in its private instance and obtains qualified advice when the risk or
the law requires it. A desk note may be published without a legal reviewer; it
is never a legal opinion.

The review status fields describe content review and translation review. They
are not certification and not a confidence label. The docs-only
[confidence labels](docs/en/governance/confidence-labels.md) are separate and
do not change a structured object.

## Review checklists

The detailed status model, review types, and checklists are in the
[review policy](docs/en/governance/review-policy.md). The short form below is a
template for a project that runs its own review. For this repository, the AI
audit uses the content and release checklists; it does not claim a human review
or an external review.

### Content review checklist

- [ ] The change has an issue with scope and acceptance criteria.
- [ ] The content is factual, testable where applicable, and has a negative case.
- [ ] Sources are official and current enough for the stated review scope.
- [ ] No certification, compliance, approval, or guarantee claim is added.
- [ ] No customer name, real evidence, secret, or private endpoint is added.
- [ ] The review record names the reviewer, date, scope, and version, or the
      status stays `draft` or `unverified`.

### Translation review checklist

- [ ] English remains canonical for identifiers, schema keys, and file names.
- [ ] The Thai page has a Thai reviewer for the reviewed scope.
- [ ] The reviewer checked meaning, terminology, and the glossary, not only
      grammar.
- [ ] `translation_status` and `machine_translated` match the evidence.
- [ ] No page is marked complete because a machine or an AI agent produced it.

### External review checklist

- [ ] The reviewer is named, independent of the maintainer, and engaged for a
      recorded scope.
- [ ] The review record states what was reviewed and what was not.
- [ ] The review result is published with the reviewer's permission.
- [ ] A missing reviewer is recorded as missing. No name, date, or sign-off is
      invented.

### Release review checklist

- [ ] Every milestone issue is closed and the milestone scope is complete.
- [ ] The version is consistent in `package.json`, `package-lock.json`,
      `src/sras/version.ts`, `CITATION.cff`, `core/sras.yaml`, and the docs
      config.
- [ ] `ci-ok` and `pr-check / check` are green on `main`.
- [ ] `oss-kit doctor` reports no drift.
- [ ] The audit evidence is posted to the dashboard issue.
- [ ] Translation and review statuses match the release scope, or the release
      stays blocked.
- [ ] The release notes and announcement link to the audit and make no
      certification, legal-compliance, or out-of-scope claim.

## Release cadence

One milestone is one template release. A version milestone contains 3 to 7
issues. A template release requires:

- every milestone issue closed;
- `ci-ok` and `pr-check / check` green on `main`;
- `oss-kit doctor` with no drift;
- a passing release preflight;
- the AI audit record completed;
- release notes and an announcement that state the limitations;
- the version consistent across the version files.

The release is a template release. It does not require a human Thai review, an
external reviewer, or a legal reviewer, and it does not claim to be a standard.

A positioning or template milestone may close without a release or a version
bump when its own scope says so. It must not be presented as a standard release.

## Adding a module

Open an issue with the module purpose, the product characteristics it applies
to, the proposed requirement IDs, the evidence expectations, and the review
plan. Modules are deltas on the Core and do not duplicate Core requirements
without an explicit relationship.

## Adding an overlay

Open an issue with the jurisdiction or industry, the sources from the register,
the proposed additions, overrides, waivers, and the sources that support them. An
overlay is a delta, not a full standard. A gate requirement cannot
be waived. Every overlay has a `not_covered` section and a review checklist.

## Adding a register entry

Open an issue with the official source URL, instrument name, jurisdiction,
effective date, review due date, neutral summary, obligations, and mapped
requirements. The entry defaults to `unverified`. Do not copy statute text
beyond a short necessary quote. Do not give legal advice.

A register entry is reserved for a law, regulation, or other instrument with a
jurisdiction, an official source, and a review due date. A voluntary external
standard cited for assessment guidance is not a register entry. It stays in the
requirement's `references` with a title, URL, and type. If a law gives the
standard binding force in a jurisdiction, add a register entry for the
instrument that gives it force and map the requirement to that entry.

For example, WCAG 2.2 and the NIST AI Risk Management Framework 1.0 are cited by
gate requirements as external standards. They are not register entries because
no Thailand instrument in this library gives them that status. A project may
still use them as assessment guidance and record the version it selected.

## Maintenance and deprecation

The standard content, the schemas, the CLI, and the documentation version
together. A version number is never used for content that has not met the
release conditions.

### v1.x maintenance

- A minor release may add requirements, modules, overlays, registers,
  crosswalks, commands, optional fields, and documentation.
- A minor release must not remove a requirement, change a requirement ID, waive
  a gate, or make an existing valid instance invalid without a migration note.
  A schema addition is optional until a project enables it; a required field
  needs a major release or an explicit migration path.
- Deprecate a requirement with `status: deprecated`, `deprecated_in`, and a
  replacement. Keep it visible for at least one minor release.
- Security and correctness fixes may ship out of band. They still go through an
  issue, a pull request, CI, and a squash merge.
- The maintainer supports the latest v1.x line on a best-effort basis. There is
  no service-level agreement, no certification maintenance, and no guarantee
  that an external source remains current between review dates.

### v2.0 preparation

- A major release may remove deprecated content, change an ID or schema shape,
  or change a gate. It needs a migration guide, a deprecation notice in at least
  one prior minor release, and a review cycle.
- A gate requirement is not removed silently. Record the replacement or the
  explicit rationale, and keep the old requirement visible until the major
  release.
- The migration guide states the old version, the new version, the affected
  IDs and fields, the required project-instance changes, and the validation
  command a project runs after migrating.
- v2.0 does not imply certification, external review, or legal approval. It is
  a version boundary, not a compliance claim.

### Review cadence

Thailand register entries are reviewed at least every 6 months. ASEAN and EU
entries are reviewed at least every 12 months. The Core is reviewed annually.
Incidents, material architecture changes, new jurisdictions, and major releases
trigger an earlier review.

## Security reports

Follow [SECURITY.md](SECURITY.md). Report vulnerabilities privately through
GitHub's private vulnerability reporting. Do not open a public issue for a
security report.

## Code of conduct

Follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Enforcement uses the GitHub
reporting path.

## FDS design method

The TypeScript tools follow Functional Design Skills (FDS) 3.3.0 at pinned
commit `4d3875c`. New or reshaped modules, workflows, types, signatures, and
boundaries require the FDS design note and the
`functional-reviewing-functional-design` checklist.

The pack is updated only by `npm run sync:fds` after reviewing the upstream
diff. Do not hand-edit `.claude/skills/`. `npm run check:fds` verifies the pack,
lockfile, notice, settings, compiler options, pure modules, and forbidden
patterns.

## Temporary internal seed

`internal/` holds the two private source documents imported at bootstrap. It is
public because the repository is public, excluded from the guard and docs, and
deleted together with the source gists in the final v1.0.0 issue. Do not add
customer data, secrets, or confidential material there.
