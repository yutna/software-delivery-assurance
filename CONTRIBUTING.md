# Contributing

Thanks for helping improve the Software Delivery Assurance Library. The
repository is public, so every file, issue, and pull request must be safe to
publish.

## Before you start

Read [README.md](README.md), [SCOPE.md](SCOPE.md), [GOVERNANCE.md](GOVERNANCE.md),
and [CLAUDE.md](CLAUDE.md). The FDS design rules in `CLAUDE.md` are binding for
TypeScript changes.

## Workflow

Every change follows the oss-kit GitHub flow:

1. **Issue** with context, deliverable, acceptance criteria, verification, out
   of scope, dependencies, and the FDS section when relevant.
2. **Milestone** — `Backlog` or a `vX.Y.Z` release milestone. Work items are
   never merged from `Backlog`.
3. **Branch** from `main` as `<type>/<issue-number>-<slug>`.
4. **Draft pull request** early with `Closes #<issue-number>`. CI runs on drafts.
5. **Verify** with the commands in the issue and record the results in the PR.
6. **Ready for review**, wait for `ci-ok` and `pr-check / check`, then squash
   merge.
7. **Close the issue**; the branch is deleted automatically.

The PR title follows Conventional Commits:
`<type>(<scope>)!: <summary>`. Use a lowercase scope. The types are `feat`,
`fix`, `docs`, `chore`, `refactor`, `test`, `ci`, `build`, `perf`, `style`, and
`revert`.

Do not push directly to `main`. Do not use a long-lived development branch. Do
not create custom labels; the core labels are managed by oss-kit.

## Verification

Record command output or a CI link in the PR. The standard local gate is:

```bash
npm ci
npm run typecheck
npm run lint
npm run lint:md
npm run format:check
npm test
npm run check:fds
npm run sras -- validate --all
npm run sras -- render --check
npm run sras -- guard
npm run docs:build
npm run check:docs
```

Only run the commands that exist in the current milestone. A release also runs
`node tools/check-version.ts <version>` and `oss-kit doctor`.

## Documentation site

The bilingual documentation site is built with VitePress from `docs/en/` and
`docs/th/`. VitePress is the only documentation framework; do not add MkDocs or
a second site generator.

```bash
npm ci
npm run docs:dev       # local preview with hot reload
npm run docs:build     # production build in docs/.vitepress/dist
npm run docs:preview   # serve the production build locally
```

`npm run docs:build` fails on a dead internal link. The generated reference
pages under `docs/en/reference/` are produced by `npm run sras -- render`;
never edit them by hand. Change the source YAML, run the renderer, and commit
the regenerated pages. The build output and cache are ignored by Git.

## Documentation QA

Every documentation pull request runs this checklist:

```bash
npm run docs:build
npm run check:docs
lychee --config .lychee.toml docs README.md
```

- [ ] The English navigation entry exists and resolves to a page.
- [ ] The Thai counterpart exists, or the page states that generated reference
      content is English-only.
- [ ] Every Thai page keeps `translation_status: partial` and
      `machine_translated: true` until a named human reviewer signs off.
- [ ] The translation banner appears on a partial page, and no banner appears
      on a complete page.
- [ ] The language switcher and the page-level language links resolve.
- [ ] The glossary has the same terms in English and Thai.
- [ ] The quick start commands still match the CLI.
- [ ] `docs/en/reference/` is unchanged unless `npm run sras -- render` was
      run.

`npm run check:docs` enforces the page parity, frontmatter, navigation,
glossary, and quick-start checks. The `link-check` CI job runs lychee with
`.lychee.toml`. An external link is excluded only in that file, with a written
reason; do not disable the docs build's dead-link check.

## Content rules

- A requirement must be testable and have a clear negative case.
- Every requirement has evidence expectations and a criticality.
- Do not give legal advice or state that a product is compliant, certified,
  approved, or guaranteed.
- Do not copy statute text beyond a short necessary quote.
- Cite official sources for register entries.
- Do not use vendor names as requirements unless the requirement is
  vendor-neutral.
- Do not include customer names, project names, real evidence, production
  hostnames, IP addresses, ports, or secrets.
- Do not add content for sectors outside the supported four; see
  [SCOPE.md](SCOPE.md).
- Do not add a `CHANGELOG.md`; GitHub Releases is the changelog.
- Do not add Python tooling, MkDocs, or a second documentation framework.

## Bilingual content

English is canonical for identifiers, schema keys, and file names. Thai is a
first-class content language. Every structured object carries
`translation_status` and, when relevant, `machine_translated`.

Machine translation is allowed for a first draft, but it stays
`translation_status: partial` with `machine_translated: true` until a human
reviewer confirms it. Do not mark a machine-only page `complete`.

An AI execution agent may draft and edit either language, but it cannot set
`translation_status: complete`, cannot set `machine_translated: false` on a
page it produced, and cannot record itself as the human reviewer. The same rule
applies to `review_status: reviewed`: a review record needs a named human
reviewer, a date, a scope, and the version reviewed.

## Review checklist

The full status model and checklist are in the
[review policy](docs/en/governance/review-policy.md). The short form below is
required for the relevant pull request.

### Content review

- [ ] The issue, scope, and acceptance criteria are recorded.
- [ ] The content is factual and testable, with a negative case where relevant.
- [ ] Sources are official and the review scope is stated.
- [ ] No certification, compliance, approval, or guarantee claim is added.
- [ ] No customer name, real evidence, secret, or private endpoint is added.
- [ ] A `reviewed` status has a named reviewer, date, scope, and version; if
      not, the status stays `draft` or `unverified`.

### Translation review

- [ ] English remains canonical for identifiers, schema keys, and file names.
- [ ] A named human Thai reviewer checked meaning, terminology, and the
      glossary for the reviewed scope.
- [ ] `translation_status` and `machine_translated` match that evidence.
- [ ] No page is marked `complete` because a machine or an AI agent produced it.

### External review

- [ ] The reviewer is named, independent, and engaged for a recorded scope.
- [ ] The record states what was reviewed and what was not.
- [ ] A missing reviewer is recorded as missing; no name, date, or sign-off is
      invented.

### Release review

- [ ] Every milestone issue is closed and the milestone scope is complete.
- [ ] The version is consistent across `package.json`, `package-lock.json`,
      `src/sras/version.ts`, `CITATION.cff`, `core/sras.yaml`, and the docs
      config.
- [ ] `ci-ok` and `pr-check / check` are green on `main`.
- [ ] `oss-kit doctor` reports no drift.
- [ ] The audit evidence is posted to the dashboard issue.
- [ ] Translation and review statuses match the release scope, or the release
      stays blocked.
- [ ] The release notes and announcement link to the audit and make no
      certification, legal-compliance, or out-of-scope claim.

## FDS design and review

Before designing a new module, workflow, type, signature, or boundary, load
`functional-design` and follow its design loop. Use `functional-typescript` for
syntax. Add the design note to the PR for any module, workflow, type,
signature, or boundary change, then run the
`functional-reviewing-functional-design` checklist.

The FDS pack is pinned at `.claude/skills/` and recorded in
`vendor/functional-design-skills/fds-lock.json`. Do not hand-edit it. Update it
only with `npm run sync:fds` after reviewing the upstream diff, then run
`npm run check:fds` and include the change in a reviewed PR.

## AI-agent SSH and signing

Agent sessions should use the dedicated AI-agent SSH key and signing key, not
the interactive 1Password agent. The key and socket are machine-local; never
commit a private key. A typical local setup is:

```bash
git config core.sshCommand \
  "ssh -o IdentitiesOnly=yes -o IdentityAgent=$HOME/.ssh/ai-agent.sock -i $HOME/.ssh/ai_agent_ed25519.pub"
git config gpg.format ssh
git config gpg.ssh.program "$HOME/.ssh/ai-agent-sign.sh"
git config user.signingkey "$HOME/.ssh/ai_agent_ed25519.pub"
git config commit.gpgsign true
git config tag.gpgsign true
```

Adjust the key and socket paths to the machine's AI-agent setup. The public key
and socket path are not secrets; the private key must stay out of the
repository.

## Cross-machine handoff

The GitHub issue, pull request, and pinned execution dashboard are the source of
truth. A local clone is disposable.

At the start of a session:

```bash
git fetch --all --prune
git status -sb
gh pr list --state open
gh issue list --state open --milestone <current>
npm ci
```

At the end of a session, commit and push every change. Keep the PR draft if the
issue is unfinished and post a handoff comment with:

- branch and PR
- HEAD commit
- what is done
- verification commands and results
- what remains
- blockers
- the next command

Do not leave uncommitted work or a required local-only file. The private
denylist is optional and is never committed.

## Temporary internal seed

The `internal/` directory contains the two private source documents imported at
bootstrap. It is public because the repository is public, excluded from the
content guard and docs, and deleted together with the source gists in the final
v1.0.0 issue. Do not add customer data, secrets, or confidential material
there, and do not copy its content into SRAS-owned paths.

## Security

Follow [SECURITY.md](SECURITY.md). Report vulnerabilities privately, never in a
public issue. Do not include secrets, customer data, or confidential
information in an issue, pull request, discussion, or example.

## Code of conduct

Follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contribution is licensed under the
repository's MIT licence. Third-party material keeps its own licence and
attribution.
