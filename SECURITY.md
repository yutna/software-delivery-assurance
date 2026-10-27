# Security policy

## Reporting a vulnerability

Please **do not open a public issue** for a security vulnerability.

Report it privately through GitHub: **Security** tab → **Report a
vulnerability**
(<https://github.com/yutna/software-delivery-assurance/security/advisories/new>).

## Supported versions

Only the latest release receives security fixes.

## Response

This is a solo-maintained project; responses are best-effort.

## Known development-only advisories

`npm audit --omit=dev --audit-level=high` is the blocking gate for shipped
dependencies. At v0.1.0 it reports no vulnerabilities in the shipped graph.

A high-severity advisory remains in the development-only `markdownlint-cli2`
tree through `micromark-extension-math` and `katex`. Dependabot reports
`security_update_not_possible` because the available path would downgrade
`markdownlint-cli2` from 0.24.0 to 0.16.0. Markdownlint is a development and
CI-only tool; it is not part of `dist/` or the CLI runtime and cannot affect a
release artifact. Do not run `npm audit fix --force`; re-check after each
Dependabot update and take the normal upgrade when a non-breaking
`markdownlint-cli2` release resolves the advisory.
