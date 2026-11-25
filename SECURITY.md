# Security Policy

PesticideNext advises real pesticide use in the field, so correctness of the
data it ships is a safety matter, not only a software concern. Please treat
the categories below accordingly.

## Supported versions

The latest commit on `main` is the supported version; deployed releases
follow continuously (Vercel / GitHub Pages).

## Reporting a vulnerability

**Do not open a public issue for anything below.** Contact the maintainer
privately through the GitHub profile (security disclosure / private
vulnerability reporting on this repository). Please include:

1. A description of the issue and its impact
2. Steps or a proof-of-concept to reproduce it
3. Affected file(s) or route(s)
4. Any suggested remediation

You should receive a response within a reasonable window. Please do not
disclose the issue publicly before a fix lands.

## What counts as a security issue here

| Category | Examples |
|---|---|
| Safety-critical data errors | Wrong dose unit on a shipped product, missing `restricted`/`banned` status, wrong WHO toxicity class, incorrect antidote in first-aid protocols |
| Web security | XSS in any rendered field (product names come from CSVs), path traversal in `server.ts` routes, SSRF through the `/api/ppw/search` proxy, cache-poisoning via the OG rewrite |
| Privacy | The visitor counter (`/api/visitors/*`) leaking identifying data; PWA storage holding field logs that should stay on-device |
| Supply chain | A dependency or generated artifact that executes untrusted content |

## Scope exclusions

- The app has **no authentication, no secrets and no privileged runtime
  state**; reports about "no auth" are not findings.
- `.env` variables are optional and none are required (see
  `.env.example`).
- Vulnerabilities in unmaintained dependencies that do not reach a runtime
  path will be scheduled as normal maintenance.

## Data-correctness reports

Wrong doses, missing restrictions or bad MoA codes that are *not* the result
of a security bug follow the normal contribution flow in
[CONTRIBUTING.md](CONTRIBUTING.md) — but flag them clearly as
`safety-critical` so they are triaged first.
