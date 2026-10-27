<!-- PR title must follow Conventional Commits, e.g. "feat: add login" -->

Closes #

## What

## Why

## How to test

## Verification

- [ ] Commands run and results recorded
- [ ] CI `ci-ok` and `pr-check / check` green
- [ ] `oss-kit doctor` no drift
- [ ] No customer data, secrets, or denylisted terms

## FDS design note

Complete this for any change that adds or reshapes a module, workflow, type,
signature, or boundary.

- Calibration row:
- Domain words:
- Illegal states ruled out:
- Pipeline / signatures:
- Effects and where they live:
- Module boundary and hidden details:
- Two candidate shapes and why this one:
- FDS skills consulted:
- Review findings and disposition:

## FDS review checklist

Run `functional-reviewing-functional-design` before marking the PR ready.

- [ ] The calibration row is stated
- [ ] Domain names use the business words; no Service, Manager, Helper, or Util
- [ ] No type can hold a state the business forbids
- [ ] Domain primitives are branded; the parser is the only cast
- [ ] Domain types are readonly, including arrays
- [ ] Expected failures return `Result`; no thrown expected failure
- [ ] Every domain union has one discriminator and `assertNever`
- [ ] The pure core has no filesystem, network, clock, randomness, or process access
- [ ] Effects are at the edge and visible in the shell signature
- [ ] DTOs are separate and parsed once at the boundary
- [ ] Module interfaces hide more than they expose
- [ ] No duplicated rule, literal, format, or threshold
- [ ] Pure core tests use plain values, not infrastructure mocks
- [ ] Review findings are ranked by cost and the cheap real ones are fixed

## Content review

Use this for requirements, modules, overlays, registers, templates, and examples.

- [ ] The requirement is testable and the negative case is clear
- [ ] Evidence type and freshness are defined
- [ ] Criticality and applicability are justified
- [ ] References are official and current
- [ ] No vendor endorsement and no legal conclusion
- [ ] No customer names, real evidence, secrets, or production identifiers
- [ ] The exact boundary sentence is present only in `SCOPE.md`

## Translation review

- [ ] Thai and English have the same meaning
- [ ] Technical terms follow the glossary
- [ ] IDs and YAML keys are unchanged
- [ ] Machine translation is marked `machine_translated: true`
- [ ] `translation_status` matches reality and `complete` has a reviewer

## Checklist

- [ ] Linked issue is in the correct version milestone
- [ ] Tests and docs updated where relevant
- [ ] Thai and English fields updated where relevant
- [ ] No unsupported legal or compliance claim
- [ ] All commits are pushed; no uncommitted work remains
- [ ] A handoff comment is posted if the issue is unfinished
