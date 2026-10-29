---
translation_status: complete
machine_translated: false
---

# Validate a private project instance in CI

A project instance lives in its own private repository. The SRAS CLI is
repository-local (`package.json` has `"private": true`), so CI checks out the
library at a pinned tag or commit, builds it, and runs the checks against the
instance. Do not check out `main` for a real assessment.

## Before you start

- Node.js 24 LTS and npm 11 on an Ubuntu runner.
- The library tag or commit that matches `sras_version` in `assurance.yaml`.
- The project instance in the repository, with its lockfile committed.
- No secret or real evidence in the assessment files; evidence stays in the
  private store.

## GitHub Actions example

Add this workflow to the private project repository.

```yaml
name: sras
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  validate:
    runs-on: ubuntu-latest
    env:
      SRAS_REF: v1.2.0
    steps:
      - name: Check out the project instance
        uses: actions/checkout@v7
        with:
          path: project
          persist-credentials: false
      - name: Check out the SRAS library at a pinned ref
        uses: actions/checkout@v7
        with:
          repository: yutna/software-delivery-assurance
          ref: ${{ env.SRAS_REF }}
          path: .sras
          persist-credentials: false
      - uses: actions/setup-node@v7
        with:
          node-version: 24.x
          cache: npm
          cache-dependency-path: .sras/package-lock.json
      - name: Build the library
        working-directory: .sras
        run: |
          npm ci
          npm run build
      - name: Validate the instance
        run: |
          mkdir -p sras-output
          node .sras/dist/cli.js project validate project | tee sras-output/validate.txt
      - name: Resolve coverage
        run: node .sras/dist/cli.js project resolve project | tee sras-output/resolve.txt
      - name: Upload the output
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: sras-output
          path: sras-output
          if-no-files-found: ignore
```

`project validate` exits 0 for a structurally valid draft and warns on stderr
while the sign-off is still `Not signed`. `project resolve` exits 1 when an
assessed gate is missing, so it becomes the coverage gate for a release.
During drafting, run `project validate` only if the coverage failure would block
unrelated work; do not silence `project resolve` on a release branch.

## Pin the library

`SRAS_REF` must be a release tag or a full commit SHA. Read the instance version
and use the matching tag:

```bash
rg '^sras_version:' assurance.yaml
```

At the time of writing, `v1.2.0` is the published tag. Replace it with the
release that matches the instance. `project refresh` writes the same version
into `assurance.lock.yaml`, so the lockfile names the inputs that produced it.

## What the job proves

- The instance parses and agrees with its lockfile.
- Every selected requirement is known to the library version.
- Evidence types match the requirement expectations.
- Claims and risks reference assessed requirements.

The job does not prove that evidence is true, current, or sufficient, and it
does not review the assessment for you. Those remain assessor decisions.

## Supported platforms

- Tested on macOS in the maintainer environment and on Ubuntu in GitHub Actions
  CI.
- Node.js 24 LTS and npm 11 are the supported toolchain.
- Windows is not tested. Use WSL2 with an Ubuntu environment; the commands and
  the `~` examples assume a POSIX shell.
- The CLI reads and writes UTF-8 YAML. No native Windows path support is
  claimed.

## Related pages

- [Project template guide](project.md)
- [Upgrade a 1.x instance](upgrade-1x.md)
- [Walk through the end-to-end example](e2e-walkthrough.md)
- [Quick start](../quick-start.md)
