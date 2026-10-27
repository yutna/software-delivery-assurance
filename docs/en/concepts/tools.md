---
translation_status: complete
machine_translated: false
---

# Tools and checks

The `sras` CLI is a thin shell over a pure TypeScript core. It validates the
standard content, renders the reference pages, guards public content, and
creates project instances.

## Commands

| Command                                     | What it does                               |
| ------------------------------------------- | ------------------------------------------ |
| `npm run sras -- --version`                 | Print the SRAS version.                    |
| `npm run sras -- --help`                    | Print the command list.                    |
| `npm run sras -- validate --all`            | Validate every standard YAML file.         |
| `npm run sras -- init <dir> --profile lite` | Create a lite project instance.            |
| `npm run sras -- init <dir> --profile full` | Create a full project instance.            |
| `npm run sras -- render`                    | Write the English reference pages.         |
| `npm run sras -- render --check`            | Check the reference pages without writing. |
| `npm run sras -- guard`                     | Scan public content.                       |
| `npm run sras -- guard --format json`       | Print the version-1 guard report.          |
| `npm run sras -- guard --annotations`       | Print GitHub Actions annotations.          |

`npm run sras -- ...` builds `dist/` before it runs. In CI the workflow builds
once and calls `node dist/cli.js` directly.

## Validate

`validate --all` checks requirements, modules, overlays, registers, and
crosswalks against the JSON Schema 2020-12 contracts and the domain rules. It
reports the number of files validated. A schema or domain issue exits with
code 1.

## Render

`render` writes `docs/en/reference/` from the YAML source. The output is
deterministic: page order, list order, and content contain no timestamp or
environment data.

`render --check` recomputes the pages and reports missing, changed, or extra
files without writing. The reference pages are generated; edit the YAML and
re-run the renderer, never the Markdown.

## Guard

`guard` scans public content for:

- out-of-scope sector terms,
- secrets and credential patterns,
- private network identifiers,
- personal data patterns,
- customer names from a private override,
- unsafe claims.

`--format json` writes a stable version-1 report to stdout. `--annotations`
writes GitHub Actions annotations with file and line. The two flags cannot be
combined.

The public denylist is `guard/denylist.yaml`. A private override can be added
through `SRAS_DENYLIST_PATH`; the override is never committed and cannot
weaken the public rules.

## Init

`init` copies the project template, replaces placeholders, applies the profile,
computes the lockfile, and validates the result before writing. It refuses a
non-empty directory and a path containing `..`, and it never calls the network.

## Exit codes

| Code | Meaning                                                                  |
| ---- | ------------------------------------------------------------------------ |
| `0`  | The command completed and the check passed.                              |
| `1`  | A finding, validation failure, render drift, or expected `init` refusal. |
| `2`  | Usage error: unknown command or flag, missing argument, invalid value.   |

## CI checks

The repository runs these on every pull request:

- TypeScript typecheck, lint, formatting, and Markdown lint.
- Vitest with coverage.
- FDS pack and forbidden-pattern check.
- Schema validation, render check, and content guard.
- Dependency audit.
- CodeQL analysis.
- The docs build and link check from v0.6.0.

`ci-ok` is the single required check; it depends on every CI job.

## Related pages

- [Quick start](../quick-start.md)
- [Claims and evidence](claims-and-evidence.md)
- [Reference](../reference/index.md)
