---
translation_status: complete
machine_translated: false
---

# v1.0.0 audit and gap report

**Status:** technical audit complete; release readiness not met. **Audited
commit:** `6d88c1019b90e2a2e5cdbec4dab50713294af6ea` (`main` after #62).
**Date:** 2026-10-28. **Content version:** SRAS 0.9.0. **Auditor:** the AI
execution agent under owner direction.

This page records the command evidence for the v1.0.0 audit and the gaps that
remain. It is not a release sign-off. It does not freeze SRAS 1.0, bump the
version, close the milestone, or cut a release. The audit page is added by the
audit pull request after the audited commit; the audited content is the commit
above.

The repository remains on the template / starter-kit track. The optional
formal-standard track is still blocked by the items in
[v1.0.0 readiness](v1-readiness.md) and the gap list below.

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

## Release-readiness gaps

| Gap                                                           | Evidence                                                                                               | Owner                      |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------- |
| Content version is 0.9.0, not 1.0.0                           | `node tools/check-version.ts 0.9.0` passes; a 1.0.0 check would fail                                   | #61                        |
| All 167 active requirements are `translation_status: partial` | `validate --all`; the requirement YAML still has `machine_translated: true`                            | #61                        |
| No named human Thai reviewer has confirmed the translation    | [Thai review kit](thai-review-kit.md) is prepared but unused                                           | #61                        |
| No external human review has happened                         | [v1.0.0 readiness](v1-readiness.md); [external review packet](external-review-packet.md) is a template | #61                        |
| Registers remain `unverified`                                 | 27 register entries                                                                                    | Formal-standard limitation |
| Four legal concerns are desk research, not legal review       | [Legal concerns](legal-concerns.md), #128–#131                                                         | Project-specific decision  |
| Release notes are a draft                                     | Prepared under #64; not published                                                                      | #64                        |
| Announcement is a draft                                       | Prepared under #65; not published                                                                      | #65                        |
| Temporary internal seed is still present                      | `internal/` in the repository                                                                          | #66                        |
| The milestone is open and the final release audit is not run  | v1.0.0 milestone                                                                                       | #66                        |
| Release-date metadata is not updated                          | `CITATION.cff` and `core/sras.yaml` still use the v0.9.0 date                                          | #66                        |

The release notes and announcement are prepared by #64 and #65. At the time of
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

- **The audit is not a release audit.** The content version is 0.9.0 and the
  milestone is open. A final audit after #64, #65, and #66 is still required.
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

The technical gates pass on `6d88c10`. The v1.0.0 release is not ready. The
release remains blocked by #61 (freeze, human Thai review, and external human
review), the draft release notes and announcement in #64 and #65, and the final
cleanup and release issue #66.

## Related pages

- [v1.0.0 readiness review](v1-readiness.md)
- [Review policy](review-policy.md)
- [Template readiness](template-readiness.md)
- [Legal concerns](legal-concerns.md)
- [Release notes issue #64](https://github.com/yutna/software-delivery-assurance/issues/64)
- [Announcement issue #65](https://github.com/yutna/software-delivery-assurance/issues/65)
- [Execution status](https://github.com/yutna/software-delivery-assurance/issues/67)
