<!-- Thank you for improving PesticideNext — a field tool for real pesticide use. -->

## What & why

<!-- What does this PR change, and what problem does it solve? If an issue exists, link it ("Closes #123"). -->

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Data / catalogue change (`data_raw/` → generated modules)
- [ ] UI / copy (both Bangla and English updated)
- [ ] Docs / tooling

## The ground rules

- [ ] I did **not** hand-edit generated files (`src/data/all_pesticides.ts`, `src/data/policyEnrichmentData.ts`, `public/downloads/*`) — I changed `data_raw/` or `data_raw/moa_overlay.csv` and the pipeline output instead.
- [ ] MoA code changes went through `data_raw/moa_overlay.csv` with provenance recorded.
- [ ] Every user-facing string I added exists in **both** Bangla and English.
- [ ] The change keeps the app fully offline (no new runtime API/key dependency).

## Verification

<!-- Run these locally and check the boxes. PRs touching data will also be validated by the regenerate-data workflow in --check mode. -->

- [ ] `npm run lint` — `tsc --noEmit` passes
- [ ] `npm test` — `vitest run` passes
- [ ] `npm run build` — production build succeeds
- [ ] `python3 scripts/validate_registry.py --check` (only if you touched data)

## Screenshots

<!-- UI changes: before/after in both languages, phone-sized viewport if relevant. -->

## Does this affect safe field use?

<!-- If this changes a dose, restriction, toxicity class or first-aid protocol, say so explicitly — it will be reviewed as safety-critical. -->
