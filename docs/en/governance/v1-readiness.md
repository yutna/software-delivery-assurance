---
translation_status: complete
machine_translated: false
---

# AI audit and limitations

**Status:** AI audit record. **Auditor:** the AI execution agent (DeepSeek V4.1
Flash via OpenCode). **Date:** 2026-10-28. **Content version:** SRAS 1.0.0.

This is not a human review, an external review, a legal review, or a
certification. No human sign-off is recorded, and the repository does not claim
that one exists. The AI researched, drafted, wrote, and audited the content.
This page records what it checked and what remains a limitation.

The repository is a concern template. It is not a standard. An adopting project
decides which concerns apply, how to implement them, and what formal documents
to produce.

## Scope

The audit covers:

- the SRAS Core, the technical modules, and the Thailand sector overlays;
- the registers, crosswalks, project template, CLI, and synthetic examples;
- the English and Thai documentation, the content guard, and the repository
  checks;
- the claims, limitations, and status fields.

It does not decide whether a source applies to a project, whether a project is
compliant, or whether a Thai translation is ready for a formal publication.

## What the AI checked

- **Schema and domain validation:** `npm run sras -- validate --all` passes on
  53 files.
- **Deterministic reference pages:** `npm run sras -- render --check` passes on
  154 pages.
- **Content guard:** `npm run sras -- guard` passes on the public content.
- **Docs QA and build:** `npm run check:docs` and `npm run docs:build` pass.
- **Tests and types:** `npm test`, `npm run typecheck`, `npm run lint`, and
  `npm run format:check` pass.
- **Version consistency:** the version files agree at 1.0.0.
- **FDS pack:** `npm run check:fds` passes on the pinned pack.
- **Counts:** the Core has 70 active requirements, the modules 52, the overlays
  45, the registers 27, and the crosswalks 8.
- **Claims:** no page claims a certification, a legal conclusion, an external
  review, or a human sign-off.
- **Defects:** the historical pilot findings that affected the template and the
  CLI were fixed by #140, #141, #126, #134, and #135; the four legal questions
  stay as desk research notes.

## What remains a limitation

- **Thai translation is partial.** All 167 active requirements are
  `translation_status: partial` with `machine_translated: true`. A human Thai
  review has not happened and is not claimed.
- **Registers are unverified.** The 27 entries cite official sources but are not
  legal advice and have no qualified legal review.
- **Legal concerns are desk research.** #128–#131 collect sources and questions.
  They do not decide whether a source applies to a project.
- **No external or human review.** No external reviewer, legal reviewer, or
  certification body has been engaged.
- **The examples are synthetic.** The pilots used one assessor and synthetic
  data. They do not measure the effort on a real project.
- **The template is generic.** It does not encode agency-specific procurement,
  records, or approval rules.

These are documented limitations of a concern template, not a claim that the
template is a standard. A project that needs a formal review, a human Thai
review, a legal opinion, or a certification runs that work in its own context.

## What an adopting project must do

1. Decide which concerns and overlays apply to its scope.
2. Decide whether it needs a human Thai review, a legal review, an external
   review, or a certification for its own publication or delivery.
3. Record its own scope, evidence, claims, risks, and approvals in its private
   project instance.
4. Keep the limitations visible in its own documents.
5. Not describe this repository as a standard, a certification, or an external
   review.

The [external review packet](external-review-packet.md) and the
[Thai review kit](thai-review-kit.md) are optional tools for step 2. They are not
requirements for using the template.

## Related pages

- [AI audit record](v1-audit.md)
- [Template readiness](template-readiness.md)
- [Review policy](review-policy.md)
- [Legal concerns](legal-concerns.md)
- [Pilot summary](../pilots/summary.md)
- [Execution status](https://github.com/yutna/software-delivery-assurance/issues/67)
