# Security policy

## Reporting a vulnerability

Please **do not open a public issue** for a security vulnerability.

Report it privately through GitHub: **Security** tab → **Report a
vulnerability**
(<https://github.com/yutna/software-delivery-assurance/security/advisories/new>).

A useful report includes the affected version or commit, the command or file
involved, the steps to reproduce, and the impact you expect. Do not put secrets,
customer data, or personal data in a public issue; those details belong in the
private advisory.

## Supported versions

Only the latest release receives security fixes. There is no long-term support
branch, and fixes are not backported to an earlier release line.

| Release           | Supported |
| ----------------- | --------- |
| 1.1.x (latest)    | yes       |
| 1.0.x and earlier | no        |

## Scope

This policy covers the code and content in this repository: the TypeScript CLI
and tools under `src/`, the schemas, the crosswalks, and the generated reference
pages.

It does not cover:

- a project instance created by an adopter, including its evidence and sign-off;
- an adopter's CI configuration, deployment, or infrastructure;
- the hosting provider for the documentation site;
- third-party tools or services that the project only documents or calls.

## Response

This is a solo-maintained project; responses are best-effort. There is no
service-level agreement, no bug bounty, and no guaranteed disclosure timeline.
Reports are acknowledged on a best-effort basis, and an advisory is published
when a fix is available.

## Known development-only advisories

`npm audit --omit=dev --audit-level=high` is the blocking gate for shipped
dependencies, and it runs in CI. At 2026-10-29 it reports no vulnerabilities in
the shipped graph.

The full development graph reports eight advisories (2 low, 2 moderate, 4 high).
All of them are in development and CI tooling. None is part of `dist/` or the
CLI runtime, whose only runtime dependencies are `ajv`, `ajv-formats`, and
`yaml`.

| Package                    | Severity | Advisory                                                                                                                                                                    | Why it is development-only         |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `vite`                     | high     | Path traversal in optimized dependency `.map` handling ([GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9)) and several development-server advisories | Serves and builds the docs site    |
| `vitepress`                | moderate | Inherits the `vite` advisories                                                                                                                                              | Builds the documentation site      |
| `esbuild`                  | moderate | Development server can be used to read responses ([GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99))                                                 | Bundled by Vite for the docs build |
| `markdownlint-cli2`        | high     | Inherits the `markdownlint` advisories                                                                                                                                      | Lints Markdown in CI               |
| `markdownlint`             | high     | Inherits `micromark-extension-math` and `re2js`                                                                                                                             | Lints Markdown in CI               |
| `micromark-extension-math` | low      | Inherits the `katex` advisory                                                                                                                                               | Markdown lint rule                 |
| `katex`                    | low      | Prototype pollution can bypass trust restrictions ([GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7))                                                | Markdown lint rule                 |
| `re2js`                    | high     | Quadratic-time denial of service in lookbehind matching ([GHSA-gg6h-894w-4m9c](https://github.com/advisories/GHSA-gg6h-894w-4m9c))                                          | Markdown lint rule                 |

Dependabot reports `security_update_not_possible` for the `markdownlint` tree
because the only available path is a downgrade of `markdownlint-cli2` from
0.24.0 to 0.16.0.

Do not run `npm audit fix --force`. Re-check the audit at each release and after
each Dependabot update, and take the normal upgrade when a non-breaking release
resolves an advisory.
