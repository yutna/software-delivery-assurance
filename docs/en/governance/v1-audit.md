---
translation_status: complete
machine_translated: false
---

# 0.10.0 AI audit record

**Status:** AI audit complete; template limitations documented. **Audited
commit:** `6d88c1019b90e2a2e5cdbec4dab50713294af6ea` (`main` after #62).
**Date:** 2026-10-28. **Content version:** SRAS 0.9.0. **Auditor:** the AI
execution agent under owner direction.

This page records the command evidence for the 0.10.0 AI audit and the
limitations that remain. It is not a release sign-off, a human review, or an
external review. It does not freeze a standard, bump the version, close the
milestone, or cut a release. The audit page is added by the audit pull request
after the audited commit; the audited content is the commit above.

The repository is a concern template. The limitations below are documented for
an adopting project; they do not block a template release.

## Environment

- Node.js `v24.22.1`, npm `11.19.1`, macOS (local audit).
- CI on Ubuntu with Node.js 24.x.
- `main` at `6d88c10`; `ci` and `docs` workflows green.

## Checklist

| Check                       | Command                                            | Result                                                |
| --------------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| Typecheck                   | `npm run typecheck`                                | Pass                                                  |
| Lint                        | `npm run lint`                                     | Pass                                                  |
| Format                      | `npm run format:check`                             | Pass                                                  |
| Markdown lint               | `npm run lint:md`                                  | Pass, 274 files                                       |
| Tests                       | `npm test`                                         | Pass, 40 files and 339 tests                          |
| FDS check                   | `npm run check:fds`                                | Pass, 43 skills, pack 3.3.0, commit `4d3875c`         |
| Docs QA                     | `npm run check:docs`                               | Pass, 188 English pages, 35 Thai pages, 102 nav links |
| Schema validation           | `npm run sras -- validate --all`                   | Pass, 53 files                                        |
| Deterministic render        | `npm run sras -- render --check`                   | Pass, 154 pages                                       |
| Content guard               | `npm run sras -- guard`                            | Pass, 360 files, 0 excluded                           |
| Docs build                  | `npm run docs:build`                               | Pass                                                  |
| Version consistency         | `node tools/check-version.ts 0.9.0`                | Pass                                                  |
| Production dependency audit | `npm audit --omit=dev --audit-level=high`          | Pass, 0 vulnerabilities                               |
| Repository doctor           | `oss-kit doctor yutna/software-delivery-assurance` | No drift                                              |
| Link check                  | `lychee --config .lychee.toml docs README.md`      | Pass in CI (`ci` link-check job)                      |
| CI on main                  | `ci` and `docs` workflows at `6d88c10`             | Green                                                 |

Evidence:

- CI on `main` at `6d88c10`:
  https://github.com/yutna/software-delivery-assurance/actions/runs/40648267035
- Docs deployment on `main` at `6d88c10`:
  https://github.com/yutna/software-delivery-assurance/actions/runs/40648267022
- Audit pull request: #153.
- Dashboard: https://github.com/yutna/software-delivery-assurance/issues/67

`lychee` is not installed in the local audit environment. The link check runs in
the `ci` workflow, and that workflow is green on the audited commit. This is a
tooling exception, not a skipped gate.

The VitePress build prints a known warning that its bundled esbuild does not
recognize the ES2024 target. The configuration already builds with an ES2022
esbuild target, and `npm run docs:build` completes. The warning is not a gate
failure.

## Limitations and open items

| Gap                                                           | Evidence                                                                                       | Owner                     |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------- |
| Version is 0.9.0; the 1.0.0 template release is planned later | `node tools/check-version.ts 0.9.0` passes; a 1.0.0 check would fail until the release work    | #61                       |
| All 167 active requirements are `translation_status: partial` | `validate --all`; the requirement YAML still has `machine_translated: true`                    | #61                       |
| No named human Thai reviewer has confirmed the translation    | [Thai review kit](thai-review-kit.md) is prepared but unused                                   | Documented limitation     |
| No external review is claimed                                 | [AI audit and limitations](v1-readiness.md); an adopting project may commission its own review | Adopter                   |
| Registers remain `unverified`                                 | 27 register entries                                                                            | Documented limitation     |
| Four legal concerns are desk research, not legal review       | [Legal concerns](legal-concerns.md), #128–#131                                                 | Project-specific decision |
| Release notes are a draft                                     | Being reframed as a template release                                                           | #174                      |
| Announcement is a draft                                       | Being reframed as a template release                                                           | #174                      |
| Temporary bootstrap material removed                          | Removed in #66; no exclusion remains                                                           | Closed                    |
| The 0.10.0 work is in progress and the 1.0.0 release is later | 0.10.0 milestone                                                                               | #171, #66                 |
| Release-date metadata is not updated                          | `CITATION.cff` and `core/sras.yaml` still use the v0.9.0 date                                  | #66                       |

The release notes and announcement are being reframed in #174. At the time of
this audit they are drafts and do not claim a release.

## What passed

- The TypeScript toolchain, lint, format, markdown lint, and tests pass.
- The FDS pack is pinned and verified.
- The schemas validate all 53 content files.
- The reference renderer is deterministic, and all 154 generated pages match.
- The content guard scans 360 files and reports no unsafe public content.
- The documentation site builds, and the link check passes in CI.
- The version is consistent at 0.9.0 across the five version files.
- The production dependency audit and `oss-kit doctor` pass.
- The repository has no open gate failure.

## Exceptions and rationale

- **The audit is not a human review.** It checks consistency, coverage, links,
  and safety. It does not check legal meaning, current source status, or
  project-specific applicability.
- **The translation is not reviewed.** The 167 active requirements are
  machine-assisted and marked `partial`. This audit cannot mark them complete.
- **No external review exists.** The audit records the absence instead of
  creating a reviewer.
- **Legal content is unverified.** The four legal concern notes collect sources
  and questions; they are not legal advice.
- **Local `lychee` is unavailable.** CI is the link-check evidence.
- **Dev-dependency advisories are outside the release gate.** The production
  dependency audit is clean. The repository still receives Dependabot notices
  for the development tree.

## Conclusion

The technical gates pass on `6d88c10`. The concern template is usable with the
documented limitations. No standard, certification, human review, or external
review is claimed. Issues #61 and #66 own the later 1.0.0 template release; the
release notes and announcement are reframed in #174.

## 0.10.0 final check

**Date:** 2026-10-28. **Commit:** `9922f84`.

The 0.10.0 re-scope removed the formal-standard track and the human/external
review gates (PRs #175, #176, #177). On this commit:

- `npm run typecheck`, `npm run lint`, and `npm run format:check` pass.
- `npm run lint:md` passes on 280 files.
- `npm test` passes on 40 files and 339 tests.
- `npm run check:docs` passes on 191 English and 38 Thai pages.
- `npm run check:fds` passes on the pinned pack.
- `npm run sras -- validate --all` passes on 53 files.
- `npm run sras -- render --check` passes on 154 pages.
- `npm run sras -- guard` passes on 365 files.
- `npm run docs:build` passes.
- `oss-kit doctor` reports no drift.

Every Thai page still has `translation_status: partial` and
`machine_translated: true`. No `review_status: reviewed` is introduced. The
version stays 0.9.0 in this minor. The remaining work is #61 (version 1.0.0 and
release metadata) and #66 (cleanup and the 1.0.0 template release).

## 1.0.0 final AI audit

**Status:** final AI audit for the 1.0.0 template release. **Date:** 2026-10-28.
**Audited commit:** the `main` commit that closes #66; the exact SHA and command
output are in the dashboard comment. **Auditor:** the AI execution agent under
owner direction.

This is a template release, not a standard release. This audit is not a human
review, an external review, a legal review, or a certification.

| Check                       | Command or evidence                                | Result                              |
| --------------------------- | -------------------------------------------------- | ----------------------------------- |
| Version consistency         | `node tools/check-version.ts 1.0.0`                | Pass                                |
| Typecheck                   | `npm run typecheck`                                | Pass                                |
| Lint and format             | `npm run lint`; `npm run format:check`             | Pass                                |
| Markdown lint               | `npm run lint:md`                                  | Pass, 280 files                     |
| Tests                       | `npm test`                                         | Pass, 40 files and 339 tests        |
| Docs QA                     | `npm run check:docs`                               | Pass, 191 English and 38 Thai pages |
| FDS check                   | `npm run check:fds`                                | Pass, 43 skills, pack 3.3.0         |
| Schema validation           | `npm run sras -- validate --all`                   | Pass, 53 files                      |
| Deterministic render        | `npm run sras -- render --check`                   | Pass, 154 pages                     |
| Content guard               | `npm run sras -- guard`                            | Pass, 365 files, 0 excluded         |
| Docs build                  | `npm run docs:build`                               | Pass                                |
| Release metadata            | `CITATION.cff`; `core/sras.yaml`                   | `2026-10-28`                        |
| Bootstrap cleanup           | `test ! -e internal`; exclusion grep               | Pass, no exclusion remains          |
| Source gists                | `gh gist list`; access check                       | Deleted; not accessible             |
| Production dependency audit | `npm audit --omit=dev --audit-level=high`          | Pass, 0 vulnerabilities             |
| Repository doctor           | `oss-kit doctor yutna/software-delivery-assurance` | No drift                            |
| CI                          | `ci-ok`, `pr-check / check`, `main` CI             | Green                               |

The release keeps every Thai page at `translation_status: partial` with
`machine_translated: true`. No `review_status: reviewed` is introduced. The 27
register entries remain `review_status: unverified`. The four legal concerns
remain desk research notes, not legal opinions.

The limitations are part of the release: the Thai translation is partial, the
registers are unverified, no external or human review is claimed, and the
template is generic. An adopting project decides which concerns apply and
records its own reviews and approvals.

The technical gates pass and the release is ready. The repository does not
claim a standard, a certification, legal compliance, external review, or human
review. The dashboard comment records the exact commit and command output:
<https://github.com/yutna/software-delivery-assurance/issues/67>.

## Related pages

- [AI audit and limitations](v1-readiness.md)
- [Review policy](review-policy.md)
- [Template readiness](template-readiness.md)
- [Legal concerns](legal-concerns.md)
- [Release notes issue #64](https://github.com/yutna/software-delivery-assurance/issues/64)
- [Announcement issue #65](https://github.com/yutna/software-delivery-assurance/issues/65)
- [Execution status](https://github.com/yutna/software-delivery-assurance/issues/67)
