---
translation_status: complete
machine_translated: false
---

# Quick start

This guide takes a new user from a clean checkout to a created project instance
and a passing library gate in about 15 minutes. Run every command from the
repository root.

## Before you start

- Node.js 24 LTS and npm 11.
- A clone of `yutna/software-delivery-assurance`.
- No customer data, secret, or real evidence in this repository.

```bash
git clone https://github.com/yutna/software-delivery-assurance.git
cd software-delivery-assurance
npm ci
npm run typecheck
```

The first `npm run sras -- ...` builds `dist/` before it runs the command.

## Step 1 — Create a project instance

```bash
npm run sras -- init ~/sras-demo --profile lite
```

Expected output:

```text
created project instance at /Users/you/sras-demo
files: README.md, assurance.yaml, assessment.yaml, evidence-index.yaml, claims.yaml, risk-register.yaml, assurance.lock.yaml
next steps:
1. Edit assurance.yaml and assessment.yaml to set the project scope, assessor, and sign-off.
2. Select the modules and overlays that match the product, then refresh the lockfile.
3. Assess the resolved requirements and record evidence in the private evidence store.
4. Run npm run sras -- validate --all, render --check, and guard from the library repository.
```

`init` refuses an existing non-empty directory and any path containing `..`.
It validates the planned files before writing them, and it never calls the
network.

Use `--profile full` when the assessment needs L0–L4 maturity levels, a
readiness index, and evidence coverage. Both profiles use the same requirement
IDs.

## Step 2 — Assess the project

Edit these files in the new project instance:

| File                  | What to change                                                 |
| --------------------- | -------------------------------------------------------------- |
| `assurance.yaml`      | Project name, description, owner, confidentiality, selection   |
| `assessment.yaml`     | Scope, assessor, assessed requirements, gate summary, sign-off |
| `evidence-index.yaml` | Private evidence entries and freshness                         |
| `claims.yaml`         | Allowed and prohibited wording                                 |
| `risk-register.yaml`  | Gaps and risks with an owner and a due date                    |

An assessed requirement has this shape:

```yaml
requirements:
  - id: SRAS-GOV-001
    status: implemented
    maturity: L3
    evidence_refs: [EV-DEMO-001]
    notes: Scope and ownership record approved.
    gap_owner: null
    due_date: null
```

Rules that the project parsers enforce:

- `full` requires a maturity level on every assessed requirement and a
  `summary.index` between 0 and 1.
- `lite` requires `maturity: null` on every assessed requirement and
  `summary.index: null`.
- `summary.counts` must match the requirement statuses.
- `assurance.yaml` and `assessment.yaml` must agree on the project identity,
  SRAS version, profile, tier, modules, and overlays.
- A `verified` or `partial` claim needs current evidence, an approver, and an
  expiry date.
- An `accepted` risk needs an acceptance ID.
- Evidence locations are private references such as
  `evidence/synthetic-policy.md`, never a public URL.

The full file-by-file guide is in [templates/project.md](templates/project.md).

## Step 3 — Validate the library

```bash
npm run sras -- validate --all
```

Expected output:

```text
validated 38 files
```

This command validates the SRAS standard content in the library: requirements,
modules, overlays, registers, and crosswalks. It runs the JSON Schema 2020-12
contracts under `schemas/` and the domain rules in `src/sras/standard/`.

> **Project instance validation:** v0.6.0 validates a project instance when
> `init` creates it. The planned files are checked with the same schemas and
> project parsers before anything is written. A standalone project validator is
> not part of v0.6.0.

## Step 4 — Render and check the reference pages

```bash
npm run sras -- render
npm run sras -- render --check
```

`render` writes the English reference pages under `docs/en/reference/`.
`render --check` recomputes them and reports missing, changed, or extra pages
without writing. Expected output:

```text
render check passed: 144 pages; 144 files
```

The command is deterministic: page order, list order, and content contain no
timestamp or environment data.

## Step 5 — Guard the public content

```bash
npm run sras -- guard
```

Expected output:

```text
guard passed: scanned 292 files; excluded 0
```

The guard scans the public content paths for out-of-scope health and sector
terms, secrets, private network identifiers, personal data, customer names from
the private override, and unsafe claims. The FDS pack, `vendor/`, `tests/`, and
the temporary `internal/` seed are excluded.

Machine-readable output and CI annotations:

```bash
npm run sras -- guard --format json
npm run sras -- guard --annotations
```

`--format json` writes a stable version-1 report to stdout. `--annotations`
writes GitHub Actions annotations with the file and line. The two flags cannot
be combined.

## Exit codes

| Code | Meaning                                                                  |
| ---- | ------------------------------------------------------------------------ |
| `0`  | The command completed and the check passed.                              |
| `1`  | A finding, validation failure, render drift, or expected `init` refusal. |
| `2`  | Usage error: unknown command or flag, missing argument, invalid value.   |

Examples that return `1`:

- `guard` finds a forbidden term or unsafe claim.
- `render --check` finds a missing, changed, or extra page.
- `validate --all` finds a schema or domain issue.
- `init` targets a non-empty directory or a path with `..`.

## Command reference

| Command                                     | Purpose                                    |
| ------------------------------------------- | ------------------------------------------ |
| `npm run sras -- --version`                 | Print the SRAS version.                    |
| `npm run sras -- --help`                    | Print the command list.                    |
| `npm run sras -- validate --all`            | Validate the library standard content.     |
| `npm run sras -- init <dir> --profile lite` | Create a lite project instance.            |
| `npm run sras -- init <dir> --profile full` | Create a full project instance.            |
| `npm run sras -- render`                    | Write the reference pages.                 |
| `npm run sras -- render --check`            | Check the reference pages without writing. |
| `npm run sras -- guard`                     | Scan public content.                       |
| `npm run sras -- guard --format json`       | Print the version-1 guard report.          |
| `npm run sras -- guard --annotations`       | Print GitHub Actions annotations.          |

## Troubleshooting

- **`init` says the target is not empty.** Choose a new directory or remove the
  files you no longer need. `init` never overwrites.
- **`init` rejects the project name.** Use a directory name that starts with a
  letter or digit and contains only letters, digits, spaces, dots, hyphens, and
  underscores.
- **`render --check` reports drift.** Run `npm run sras -- render`, review the
  changed pages, then commit both the source and the rendered output.
- **`guard` fails on a private name.** Put the name in a private override file
  and point `SRAS_DENYLIST_PATH` at it. Never commit the override.

## Next steps

- Read the [project template guide](templates/project.md).
- Browse the generated [reference index](reference/index.md).
- Read `SCOPE.md`, `GOVERNANCE.md`, and `CONTRIBUTING.md` before a real
  assessment.
