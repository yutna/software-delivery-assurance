# Governance

## Maintainer

The repository has a solo maintainer, `@yutna`. The maintainer makes the final
decision on scope, releases, and breaking changes. Every change still goes
through an issue, a pull request, CI, and a squash merge.

## Decision process

- Small changes: issue with context and acceptance criteria, then a pull request.
- Schema or Core changes: issue with rationale, migration note, and at least one
  review cycle.
- Breaking changes: major version, deprecation notice, migration guide, and a
  review cycle.
- New sector or jurisdiction: issue with scope, sources, named reviewer, and
  exit criteria. A register stays `unverified` until a qualified reviewer signs
  off.

## Review status

Every structured object carries `review_status` and `translation_status`.

- `draft`: content is being written and is not ready to assess.
- `unverified`: content is published as a reference but has not been reviewed by
  a qualified reviewer.
- `reviewed`: a named reviewer, review date, and scope are recorded.

Legal content stays `unverified` without a qualified legal reviewer. Thai
content requires a Thai reviewer before `translation_status: complete`.
Machine translation is marked `machine_translated: true` and remains `partial`
until a human reviewer confirms it.

## Release cadence

One milestone is one release. A version milestone contains 3 to 7 issues. A
release requires all milestone issues closed, `ci-ok` and `pr-check / check`
green on `main`, `oss-kit doctor` with no drift, a passing release preflight,
and the completed audit checklist. GitHub Releases is the changelog; there is
no `CHANGELOG.md`.

## Adding a module

Open an issue with the module purpose, the product characteristics it applies
to, the proposed requirement IDs, the evidence expectations, and the review
plan. Modules are deltas on the Core and do not duplicate Core requirements
without an explicit relationship.

## Adding an overlay

Open an issue with the jurisdiction or industry, the sources from the register,
the proposed additions, overrides, and waivers, and a named subject-matter
reviewer. An overlay is a delta, not a full standard. A gate requirement cannot
be waived. Every overlay has a `not_covered` section and a review checklist.

## Adding a register entry

Open an issue with the official source URL, instrument name, jurisdiction,
effective date, review due date, neutral summary, obligations, and mapped
requirements. The entry defaults to `unverified`. Do not copy statute text
beyond a short necessary quote. Do not give legal advice.

## Breaking changes and deprecation

Mark a deprecated requirement with `status: deprecated`, `deprecated_in`, and a
replacement. Keep it visible for at least one minor release. Remove it only in
a major release with a migration guide.

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

## Review cadence

Thailand register entries are reviewed at least every 6 months. ASEAN and EU
entries are reviewed at least every 12 months. The Core is reviewed annually.
Incidents, material architecture changes, new jurisdictions, and major releases
trigger an earlier review.
