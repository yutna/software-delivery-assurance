---
translation_status: complete
machine_translated: false
---

# Pilot A — Finance (synthetic)

**Status:** internal pilot, completed 2026-10-28.
**Library:** SRAS 0.8.0 at commit `2264312`.
**Sector:** finance, overlay `TH-FIN`.
**Data:** synthetic only. No customer name, real evidence, or production detail
was used.

## Purpose

Test whether a finance team can adopt the library without help: create a
project instance, select Core plus the finance modules and overlay, work out
which requirements apply, assess them, and run the checks. The pilot also
compared the result with `examples/finance-synthetic/`.

## Scope

- SRAS Core, `full` profile, tier 2.
- Modules `SRAS-AI`, `SRAS-INT`, `SRAS-RGD`, `SRAS-CLD`.
- Overlay `TH-FIN`.
- A fresh instance created with `sras init`, plus the finance synthetic example.

Out of scope: real evidence, a real product, legal review, external reviewers,
and usability testing with more than one assessor.

## Method

The pilot ran on a clean clone with Node.js 24.22.1 and npm 11.12.1.

1. Created a full-profile instance.

   ```text
   $ node dist/cli.js init <workdir>/finance-demo --profile full
   created project instance at <workdir>/finance-demo
   files: README.md, assurance.yaml, assessment.yaml, evidence-index.yaml, claims.yaml, risk-register.yaml, assurance.lock.yaml
   ```

2. Set the selection to the four modules and `TH-FIN` in `assurance.yaml` and
   `assessment.yaml`.
3. Tried to validate the edited instance.
4. Tried to refresh the lockfile.
5. Recomputed the resolved requirement set from the YAML sources and compared
   it with the assessed set in the example.
6. Ran the library checks.

The resolved set was computed with the same rules the library documents: tier
applicability, selected modules, and selected overlay. The pilot did not use a
private script in the repository; the counts below come from the published
YAML.

## Results

### What worked

- `init` refused a non-empty target and a path containing `..`, with exit code
  1 in both cases.
- The generated lockfile pins the SRAS version and the SHA-256 of every
  standard input.
- `validate --all` passed with `validated 53 files`.
- `render --check` passed with `render check passed: 154 pages; 154 files`.
- `guard` passed with `guard scanned 326 files; excluded 0`.
- Every `TH-FIN` requirement cites an official source and resolves to a
  register entry, except the external AI risk framework.
- The example contains no customer data, real evidence, or production
  identifier.

### Findings

| ID    | Severity | Finding                                                                                                                                                                                             | Disposition              |
| ----- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| PF-01 | High     | The finance example is not a valid project instance: it has no `assurance.yaml` or `risk-register.yaml`, and its lockfile uses a legacy shape that the project-lock parser rejects.                 | Fixed in #59             |
| PF-02 | High     | There is no command to validate an edited instance or refresh its lockfile, although `init` and the docs tell the user to do both.                                                                  | Deferred to #127         |
| PF-03 | Medium   | Requirement resolution is not exposed in the CLI, so a user must read the YAML to learn what applies.                                                                                               | Deferred to #126         |
| PF-04 | High     | The example reports 8 assessed requirements and 6 gates without a denominator; the declared selection resolves to 122 requirements and 46 gates, so 40 gates are unassessed and nothing reports it. | Fixed in #59             |
| PF-05 | Medium   | Evidence freshness is self-declared. An entry can be `current` after its expiry date, and a claim can be `verified` on that entry.                                                                  | Fixed in #59             |
| PF-06 | Medium   | Two concept pages say the lockfile pins the generator and the generation time; the schema stores neither and the template guide says so correctly.                                                  | Fixed in #59             |
| PF-07 | Low      | The resolution worked example says the end-to-end lockfile pins SRAS 0.5.0; it pins 0.8.0.                                                                                                          | Fixed in #59             |
| PF-08 | Low      | `init` records dates in UTC. A Bangkok user before 07:00 local time gets the previous day in four fields.                                                                                           | Fixed in #59             |
| PF-09 | Low      | The finance sector page says the overlay references two register entries; it references six, plus an external framework.                                                                            | Fixed in #59             |
| PF-10 | Medium   | `TH-FIN-004` requires a retention period but does not state one.                                                                                                                                    | Open legal question #129 |
| PF-11 | Medium   | The overlay does not say whether material cloud outsourcing needs prior Bank of Thailand approval.                                                                                                  | Open legal question #128 |

## Detail on the high findings

### PF-01 — the example is not a valid instance

The example directory contains `assessment.yaml`, `evidence-index.yaml`,
`claims.yaml`, `assurance.lock.yaml`, and `evidence/`. It does not contain
`assurance.yaml` or `risk-register.yaml`, which the template and the project
parsers require. Its lockfile also does not match the current schema:

```text
$ parse finance-synthetic/assurance.lock.yaml
/lockfile_version: expected lockfile_version 1
/sras/checksum: expected a string
/inputs: expected an array
```

The example test never parses the file as a project lock, so CI does not catch
this. A team that copies the example therefore starts from a set of files that
the library itself would not accept from `init`.

### PF-02 — no validation or lock refresh after `init`

After the selection changed, `validate --all` still passed:

```text
$ node dist/cli.js validate --all
validated 53 files
```

The lockfile still said `modules: []` and `overlays: []`, so it no longer
matched `assurance.yaml`. `validate --all` validates the library content, not a
project directory, and there is no other command:

```text
$ node dist/cli.js validate <workdir>/finance-demo
unknown argument: <workdir>/finance-demo
```

The `init` output and three documentation pages tell the user to refresh the
lockfile. No command performs that refresh in 0.8.0. The quick start does state
that a standalone project validator is not part of 0.8.0, but the other pages
do not carry that limitation.

### PF-04 — the assessed slice is not labelled

For the declared selection at tier 2 the library resolves 122 requirements,
46 of them gates. The example assesses 8 requirements, 6 of them gates, and
covers 4 of the 10 `TH-FIN` requirements. Its README says "8 assessed
requirements, including 6 gates" and does not say how many gates apply.

The example is deliberately a slice, and the test bounds it to 5–10 assessed
requirements. The defect is that the reader cannot see the denominator, so a
gate summary of 5 passed and 1 failed can be read as the gate position of the
whole selection. 40 gate requirements are not assessed and the example does not
name them.

## Limitations

- One assessor, one synthetic project, one library version.
- The pilot did not use real evidence or a real product, so it says nothing
  about assessment effort on a production system.
- The pilot did not test the lite profile, the other modules, or the other
  overlays.
- No external reviewer or qualified legal reviewer took part.
- The resolved count depends on the tier and selection; a different selection
  produces a different denominator.

## Open questions

These are legal questions. The repository records them and does not answer
them.

- Which instrument sets the transaction-record retention period for
  `TH-FIN-004`? See #129.
- Does a material cloud or outsourcing arrangement need prior Bank of Thailand
  notification or approval? See #128.

## Follow-ups

- Fixed findings: #59.
- Deferred findings: #126 (resolution and coverage in the CLI) and #127
  (validate and refresh a project instance).
- Open legal questions: #128 and #129.

## Related pages

- [Pilot overview](index.md)
- [Finance sector](../sectors/finance.md)
- [Project template guide](../templates/project.md)
