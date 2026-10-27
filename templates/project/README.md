# Project instance template

This directory is the copyable starting point for a private SRAS project
instance. It is synthetic: every value is a placeholder or an empty collection,
and it contains no customer data, real evidence, production identifier, or
secret.

## Files

| File                  | Purpose                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| `assurance.yaml`      | Project identity and the selected SRAS profile, tier, modules, overlays |
| `assessment.yaml`     | Point-in-time assessment of the selected requirements                   |
| `evidence-index.yaml` | Index of evidence held outside this project instance                    |
| `claims.yaml`         | Approved wording and prohibited wording for project claims              |
| `risk-register.yaml`  | Gaps and risks with owners, due dates, and disclosure decisions         |
| `assurance.lock.yaml` | Pinned standard inputs and checksum for reproducibility                 |

## Placeholders

`npm run sras -- init <dir> --profile lite|full` copies this directory and
replaces the placeholders. The placeholder values are valid so the template can
be validated before it is copied.

| Placeholder                    | Where it appears                    | Replaced with                           |
| ------------------------------ | ----------------------------------- | --------------------------------------- |
| `__PROJECT_NAME__`             | `assurance.yaml`, `assessment.yaml` | Project name                            |
| `__PROJECT_DESCRIPTION__`      | `assurance.yaml`, `assessment.yaml` | Project description                     |
| `__PROJECT_OWNER__`            | `assurance.yaml`, `assessment.yaml` | Project owner                           |
| `__ASSESSOR__`                 | `assessment.yaml`                   | Assessor name                           |
| `__SIGNOFF_NAME__`             | `assessment.yaml`                   | Sign-off name                           |
| `__SIGNOFF_ROLE__`             | `assessment.yaml`                   | Sign-off role                           |
| `0.0.0`                        | Manifest, assessment, and lockfile  | Current SRAS version                    |
| `1970-01-01`                   | All date fields                     | The date of the init or assessment      |
| `full`                         | Manifest and assessment profile     | The selected `lite` or `full` profile   |
| `2`                            | Manifest and assessment tier        | The selected tier                       |
| `modules: []`                  | Manifest and assessment             | The selected module IDs                 |
| `overlays: []`                 | Manifest and assessment             | The selected overlay IDs                |
| `sha256:000...`                | `assurance.lock.yaml` checksum      | The computed input checksum             |
| `sha256` input values `000...` | `assurance.lock.yaml` inputs        | The SHA-256 of each resolved input file |

The `confidentiality` value defaults to `internal`. Use `synthetic` only for
public examples; never put a real customer name in this repository.

## Profile rules

- `full` requires a maturity level on every assessed requirement and a
  readiness index in `summary.index`.
- `lite` uses `maturity: null` on every assessed requirement and
  `summary.index: null`.
- Both profiles use the same requirement IDs.

## Lockfile checksum

`assurance.lock.yaml` pins the resolved standard inputs. Its checksum is
SHA-256 over the canonical JSON array of `{ path, sha256 }` entries, sorted by
path. The canonical form has no whitespace, no timestamp, no generator, and no
environment data, so the same inputs produce the same checksum on every machine.
`init` computes the checksum from the selected files; the zero values in this
template are placeholders only.

## After init

1. Fill in the project identity and scope.
2. Select modules and overlays that match the product.
3. Assess the requirements that the selection resolves to.
4. Record evidence in the private evidence store and index it here.
5. Approve claims only when current evidence supports them.
6. Record gaps and risks with an owner and a due date.
7. Run `npm run sras -- validate --all`, `render --check`, and `guard` from the
   library repository before publishing any project output.
