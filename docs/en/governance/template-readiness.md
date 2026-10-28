---
translation_status: complete
machine_translated: false
---

# Template readiness

**Track:** template / starter kit. **Status:** usable with limitations.
**Content version:** SRAS 1.0.0. **Release:** v1.0.0 template release,
2026-10-28. **Recorded:** 2026-10-28.

This page states what a team can rely on today and what it must not claim. It is
the entry point for the template. The [AI audit record](v1-audit.md) holds the
checks and the limitations.

## What "usable with limitations" means

The starter kit is suitable for internal planning, project assessment, evidence
tracking, gap management, and preparing a private assurance record. It is not
suitable as the sole basis for a procurement award, a certification, a legal
compliance statement, a public-launch approval, or an external assurance
opinion.

"Usable with limitations" is a positioning statement, not a certification. It
does not mean the content is stable, the Thai translation is complete, or an
external reviewer has approved the content.

## Ready now

| Capability                        | Status  | What supports it                                                   |
| --------------------------------- | ------- | ------------------------------------------------------------------ |
| Clone, build, and run the checks  | Ready   | CI and the local verification commands in the README               |
| Create a lite or full instance    | Ready   | `sras init`, schema validation, and tests                          |
| Validate an edited instance       | Ready   | `sras project validate <dir>`; read-only and fails on a stale lock |
| Check evidence type coverage      | Ready   | A `verified` requirement must cover every expected evidence type   |
| Refresh a project lockfile        | Ready   | `sras project refresh <dir>`; writes only the lockfile             |
| Inspect resolution and coverage   | Ready   | `sras project resolve <dir>`; lists every unassessed gate          |
| Record a public-sector authority  | Ready   | `scope.public_sector` with contracting authority and contract      |
| Core, modules, and overlays       | Present | 70 Core, 52 module, and 45 overlay requirements at SRAS 1.0.0      |
| Thailand registers and crosswalks | Present | 12 Thailand register entries and 7 informative crosswalks          |
| Deterministic reference pages     | Ready   | `sras render --check`                                              |
| Public-content guard              | Ready   | `sras guard` and CI annotations                                    |

## Limitations you must plan for

| Limitation                     | Effect on a project                                                                     | Owner action                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Thai translation is partial    | All 167 active requirements remain machine-assisted and not human-reviewed.             | Use English as canonical; the project decides whether it needs a human Thai review |
| Registers are unverified       | The entries index official sources but are not legal advice or a compliance finding.    | Consult a qualified legal or regulatory focal point                                |
| No external review             | No independent reviewer has validated the content.                                      | The project may commission its own review; do not claim one here                   |
| Four legal concerns have notes | The notes collect official sources and open questions; they do not decide your project. | Read [legal concerns](legal-concerns.md) and record your own decision              |
| Template is generic            | It does not encode agency-specific procurement, records, or approval rules.             | Add local rules in the private instance, not in this repository                    |

The legal concern notes are `#128`, `#129`, `#130`, and `#131`. They collect
official sources and questions; they are not legal opinions and do not decide a
project. All five deferred findings from the v0.9.0 pilots are now fixed:
`#140`, `#141`, `#135`, `#134`, and `#126`.

WCAG 2.2 and the NIST AI Risk Management Framework 1.0 are external standards,
not register entries. The rule and official sources are in
[registers](../registers/index.md#external-standards-cited-by-requirements).

## Minimum conditions before a real use

1. A named executive sponsor accepts the scope and residual risk.
2. The [owner map](../templates/owner-map.md) is filled with real role names.
3. The project instance is private and the evidence stays outside this
   repository.
4. A legal or regulatory focal point reviews the registers and the
   [legal concerns](legal-concerns.md) that affect the project.
5. The project decides whether it needs a human Thai reviewer for any Thai
   content it publishes or uses in an official decision.
6. The team records claims, gaps, owners, and due dates in the instance, not
   only in meeting notes.

## Adoption path

```text
Read this page
    -> assign owners (owner map)
    -> create the instance (quick start)
    -> set scope and selection
    -> assess and attach evidence references
    -> validate and refresh the lockfile
    -> review claims and risks
    -> sign off in the private instance
```

The template track ends at the private sign-off. It does not produce a public
certificate or a standard-level approval.

## When your project needs its own formal process

The library does not provide a standard, a certification, or a formal review. If
your project needs one of these, run it in your own context:

- a human Thai review of the content you will publish;
- an external or independent review record;
- a legal opinion on the registers or the legal concerns;
- a formal statement that your project, not this repository, has been reviewed.

The [external review packet](external-review-packet.md) and the
[Thai review kit](thai-review-kit.md) are optional tools for that project work.
They are not requirements for using the template.

## Safe wording

Use:

- "We used the SRAS starter kit to structure our assurance assessment. The
  assessment and its evidence are our own records. The kit is usable with
  limitations, and those limitations are recorded in our risk register."

Do not use:

- "Our service is SRAS certified, accredited, or compliant."
- "The SRAS standard has been externally reviewed."
- "The Thai translation is complete."
- "The template guarantees a successful procurement or public launch."

## Confidence labels on this page

- The command and count statements are **checked** by the repository
  verification commands. Rerun them at your commit; exact counts may change.
- The content descriptions are **documented** from the repository.
- The suitability judgement is **provisional** until a real project uses it.
- The v1.0.0 template release is **published**, and the adoption judgement
  remains **provisional**.

Read [confidence labels](confidence-labels.md) for the convention.

## Related pages

- [Owner map](../templates/owner-map.md)
- [Legal concerns](legal-concerns.md)
- [Quick start](../quick-start.md)
- [Project template](../templates/project.md)
- [Public sector](../sectors/public-sector.md)
- [AI audit and limitations](v1-readiness.md)
- [Confidence labels](confidence-labels.md)
