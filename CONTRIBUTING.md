# Contributing to PesticideNext (AgriChem Guide)

Thank you for your interest in improving a tool that Bangladeshi farmers,
dealers and field officers use to spray safely and rotate modes of action
correctly. Because this app informs real pesticide use, **data correctness
comes before everything else** — a wrong MoA code or dose in this repo can
cause a wrong recommendation in the field.

## Ground rules

1. **Never hand-edit generated files.** `src/data/all_pesticides.ts`,
   `src/data/policyEnrichmentData.ts` and everything in
   `public/downloads/` is machine-generated from `data_raw/`. Change the
   source CSVs or `data_raw/moa_overlay.csv` and re-run the pipeline — the
   `regenerate-data` workflow will commit the rebuilt artifacts for you.
2. **MoA codes flow through the overlay.** A product's canonical mode of
   action is *only* changed by editing `data_raw/moa_overlay.csv` and
   recording the provenance (`recorded` / `inferred` / `corrected`).
   Never patch a code string inside the app code.
3. **Both languages, always.** Every user-facing string you add must exist in
   Bangla and English (`src/utils/i18n.ts`, `bnAgri.ts`, component copy).
4. **Keep it offline-first.** No runtime dependency on any API or key. If a
   feature needs fresh data, it goes into the data pipeline and the PWA
   precache — not into a network call at open time.

## Development setup

```bash
git clone https://github.com/moniruzjaman/AgriChem-Guide-Pest-Control-Database.git
cd AgriChem-Guide-Pest-Control-Database
npm install          # or bun install
npm run dev          # http://localhost:3000 (Express + Vite middleware)
```

No environment variables are required — the app is fully offline.
Python 3 with `pip install -r requirements.txt` is only needed for the
data pipeline.

## Before you open a PR

Run all of these locally and make sure they pass:

```bash
npm run lint          # tsc --noEmit
npm test              # vitest run (126 tests)
npm run build         # vite build + esbuild server bundle
python3 scripts/validate_registry.py --check   # if you touched data
```

## Data corrections (the most valuable contributions)

- **Wrong dose / crop / pest on a product** → open an issue with the
  registration number and the label photo, or fix the source CSV.
- **Wrong or missing MoA code** → edit `data_raw/moa_overlay.csv`, set the
  provenance to `corrected` (or `recorded` if the register names the AI),
  then run:

  ```bash
  python3 scripts/integrate_canonical_registry.py
  python3 scripts/regenerate_data_modules.py
  python3 scripts/generate_runtime_json.py
  python3 scripts/validate_registry.py
  ```

- **New PTAC gazette** → add the register CSV to `data_raw/` and mention it
  in your PR; the workflow rebuilds everything downstream.

## Commit style

The repo uses conventional commits (`feat:`, `fix:`, `chore(data):`,
`docs:`). Keep the subject line under 72 characters.

## Pull requests

Fill in `.github/PULL_REQUEST_TEMPLATE.md` — especially the
"verification" section (which of the four commands above you ran).
PRs that change `data_raw/` will be validated by
`workflows/regenerate-data.yml` in `--check` mode before merge.

## Reporting safety-critical errors

A wrong dose, missing restriction or outdated ban is not a normal bug —
follow [SECURITY.md](SECURITY.md) so it is triaged first.
