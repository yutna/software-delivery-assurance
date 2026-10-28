---
translation_status: complete
machine_translated: false
---

# Upgrade a 1.x project instance

This procedure covers a minor upgrade inside 1.x, with 1.0.0 → 1.1.0 as the
worked example. Read the release notes and the announcement before you change
an instance.

## Before you start

- A clean `project validate` on the current instance.
- A commit or backup of the instance directory, including
  `assurance.lock.yaml`.
- The release notes for the target version open in another window.
- The library checkout at the target tag, built with `npm ci && npm run build`.

## Procedure

1. **Read the release notes.** Check the breaking-change and migration
   sections. A minor release may add commands, checks, or page content without
   changing requirement IDs or schema shapes. Do not assume that from the
   version number; read the note.

2. **Update the version in both files.** Set `sras_version` in `assurance.yaml`
   and `assessment.yaml` to the target version, for example `1.1.0`. The
   manifest and the assessment must agree or validation fails.

3. **Refresh the lockfile.** Run the command from the library checkout:

   ```bash
   npm run sras -- project refresh ~/private-project
   ```

   Expected output:

   ```text
   refreshed /Users/you/private-project/assurance.lock.yaml; 11 resolved standard inputs; sha256:...
   ```

4. **Validate the instance.**

   ```bash
   npm run sras -- project validate ~/private-project
   ```

   Expected output:

   ```text
   project valid: /Users/you/private-project; 11 resolved standard inputs; lockfile current
   ```

   The input count depends on the selection. A warning that the sign-off is
   `Not signed` is non-fatal; a person still has to sign the assessment.

5. **Check coverage.**

   ```bash
   npm run sras -- project resolve ~/private-project
   ```

   Expected header:

   ```text
   resolved: 90 requirements (38 gates)
   coverage: 9 assessed, 81 not assessed (81 missing records), 0 not applicable
   ```

   The numbers depend on the selection. Exit 0 means every gate is assessed;
   exit 1 lists the unassessed gates.

6. **Record the change.** Add the upgrade to the private change record and note
   any new requirement, evidence expectation, or check in the risk register. In
   1.1.0 there is no requirement ID, schema, or gate change.

7. **Commit the instance.** Commit `assurance.yaml`, `assessment.yaml`, and the
   regenerated `assurance.lock.yaml` together so the next reader can reproduce
   the result.

## What changed in 1.1.0

- Generated requirement pages show rationale, assessment guidance, references,
  and crosswalk links.
- A NIST SP 800-218 (SSDF) crosswalk is available.
- New instances write `Not signed` for the sign-off and `project validate`
  warns until a person signs. Existing signed instances are unchanged.
- `check-version` verifies both `package-lock.json` version fields.
- No requirement ID, schema shape, or gate changed.

## If a step fails

- `assurance.lock.yaml: sras/version: expected ...` — the lockfile and the
  manifest disagree. Run `project refresh` again after fixing both version
  fields.
- `project validation error: ... sras_version` — `assurance.yaml` and
  `assessment.yaml` disagree. Set both to the same version.
- `lockfile` or `checksum` mismatch — the selection changed or the library
  changed. Refresh the lockfile; do not edit the checksum by hand.
- New unassessed gates — run `project resolve`, assess the gates, then refresh
  the assessment summary.

## Roll back

Return the library checkout to the previous tag, restore the committed
instance files and lockfile, and run `project validate` again. Do not mix a
1.0.0 lockfile with a 1.1.0 library and call the result current.

## Related pages

- [Validate a private project instance in CI](ci-validation.md)
- [Project template guide](project.md)
- [Walk through the end-to-end example](e2e-walkthrough.md)
- [v1.0.0 release notes](../releases/v1.0.0.md)
