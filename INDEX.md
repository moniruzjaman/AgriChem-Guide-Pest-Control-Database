# Repository Index — PesticideNext / AgriChem Guide

A complete map of this repository: what each file and folder is for, and
where to look when you need to change something.

> The app in one line: a bilingual (Bangla/English) offline PWA that lets
> Bangladeshi farmers, dealers and field officers search the DAE-registered
> pesticide catalogue, compute tank doses, plan IRAC/FRAC/HRAC mode-of-action
> rotations, and follow safety checklists — see
> [README.md](README.md) for the full feature tour.

## Top-level files

| Path | What it is |
|---|---|
| `README.md` | Project overview, features, stack, deployment, data pipeline |
| `INDEX.md` | This file — a map of the whole repository |
| `LICENSE` | MIT license + third-party data attribution notice |
| `CHANGELOG.md` | Release history (Keep a Changelog format) |
| `CONTRIBUTING.md` | How to report issues and submit changes |
| `CODE_OF_CONDUCT.md` | Community standards for contributors |
| `SECURITY.md` | How to report security or data-correctness concerns |
| `PULL_REQUEST_DESCRIPTION.md` | Frozen record of the 86th/87th PTAC data-refresh PR |
| `metadata.json` | AI Studio app metadata (name + Bangla description) |
| `app.config.ts` | Managed-project brand asset (live PWA icon URL) |
| `index.html` | App shell — SEO/OG/Twitter meta, canonical = pesticide.krishiai.live |
| `server.ts` | Express server: `/api/visitors/*` counter, `/api/ppw/search` proxy, Vite dev middleware, prod static + OG URL rewriting |
| `package.json` / `package-lock.json` / `bun.lock` | npm + bun dependency manifests (`pesticidenext`) |
| `requirements.txt` | Pinned Python dependencies for the data pipeline (pandas, openpyxl, reportlab, pdfplumber, beautifulsoup4) |
| `vite.config.ts` | Vite + `vite-plugin-pwa` config (cacheId `pn-v5`, precache includes XLSX/PDF/CSV downloads) |
| `vitest.config.ts` | Unit-test config (tests in `src/utils/__tests__/`) |
| `tsconfig.json` | TypeScript project config |
| `vercel.json` | Vercel headers (SW + manifest + runtime JSON cache policy) |
| `.env.example` | Documents that **no env vars are required** — fully offline PWA |
| `.gitignore` | Excludes `node_modules/`, `dist/`, `.env`, runtime `visitor_counts.json` |

## `src/` — the React 19 + TypeScript frontend

| Path | What it is |
|---|---|
| `src/main.tsx` | Boot: storage migration + PWA cache cleanup, then React mount |
| `src/App.tsx` | Root component, hash routing, visitor pings, footer |
| `src/index.css` | Global styles (Tailwind 4 entry) |
| `src/components/` | All views & UI (see the table below) |
| `src/components/pn-tokens.css` | Shared design tokens — Bangladesh palette, card/chip/button families |
| `src/context/LanguageContext.tsx` | Bangla/English language switch (bn/en) |
| `src/data/` | Generated + curated datasets the app reads |
| `src/hooks/` | `useOnlineStatus`, `usePWAInstall` |
| `src/intelligence/` | Pesticide intelligence: eligibility, protection decision, product ranking |
| `src/lib/kwi/` | Krishi Weather Intelligence engines (crop/pest/disease/risk, Open-Meteo provider) |
| `src/types/` | Shared TypeScript types |
| `src/utils/` | Calculators, i18n tables, PDF export, MoA logic, notifications |
| `src/utils/__tests__/` | Vitest suites (126 tests — MoA rotation, MoA utils, eligibility, protection, scan utils) |

### Main components (`src/components/`)

`HomeView`, `DatabaseView` (+ in-app **PPW live-search** panel), `RotationPlanner`,
`NextSprayGuide`, `SafetyView`, `Guidebook`, `NotificationCenter`,
`SpecialistSearchView`, `SprayLogView`, `MyFieldView`, `ProtectionView`,
`PesticideIntelligenceView`, `DosageCalculatorModal`, `ProductCard`,
`ProductDetailModal`, `LabelScannerModal`, `ShareModal`, `SearchSheet`,
`BottomNav` / `Navbar` / `NavigationDrawer`, `PWAInstallButton`,
`OfflineIndicator`, plus per-view `.css` files.

### Data modules (`src/data/`)

| File | Contents |
|---|---|
| `all_pesticides.ts` | Generated: full DAE register (9,641 products) |
| `policyEnrichmentData.ts` | Generated: policy/HHP/MoA sidecar (5,485 rows) |
| `bdRegisterLatest.ts`, `loadDatabase.ts`, `loadDatabaseFromJSON.ts` | Register spine + merge layer every view reads through |
| `moaData.ts` | IRAC/FRAC/HRAC group data |
| `curatedData.ts`, `insecticidesData.ts`, `fungicidesData.ts`, `herbicidesData.ts`, `miticidesData.ts`, `bioAndOtherData.ts` | Curated per-category cards |
| `regulatoryAlertsData.ts` | Ban/restriction/outbreak alerts |
| `registryMeta.ts` | Provenance stamp for the shipped register |

## `scripts/` — the Python/TS data pipeline

Ordered as you would run them after a PTAC update:

| Script | Purpose |
|---|---|
| `integrate_canonical_registry.py` | Folds `data_raw/moa_overlay.csv` (canonical MoA layer) into the register; writes `moa_overlay_audit.csv` |
| `build_latest_database.py` | Rebuilds `data_raw/` + `public/downloads/` artifacts (XLSX/PDF/CSV) from committed data; external inputs optional |
| `regenerate_data_modules.py` | Regenerates `src/data/all_pesticides.ts` + `policyEnrichmentData.ts` |
| `generate_runtime_json.py` | Regenerates `public/downloads/pesticide_database.json` |
| `validate_registry.py` | Registry QA gate used by CI (`--check` dry-run mode) |
| `regenerate_all_pesticides.py` | Older single-module regenerator (all_pesticides.ts) |
| `generate_policy_enrichment.py` | Older policy sidecar regenerator |
| `audit_data.ts` | TS audit of merged catalogue counts (run with bun) |
| `fill_from_bd_master.py`, `smart_moa_backfill.py`, `irac_v11_5_backfill.py`, `update_moa_rotation_guide.py`, `update_ptac_database.py`, `generate_bd_register_latest.py`, `parse_moa_master_html.py` | One-off enrichment/backfill utilities used during the 2026 refresh |
| `database_sync.py`, `install_and_sync.sh` | Environment sync helpers |
| `render-og-image.py` | Renders the social preview image |

External inputs (live API dumps, gazette CSVs) are **optional** and read from
`data_raw/external/{download,upload}` by default — or from the directories
named by `AGRICHEM_DOWNLOAD_DIR` / `AGRICHEM_UPLOAD_DIR`. A fresh clone runs
without them.

## `data_raw/` — source registers

| File | Contents |
|---|---|
| `all_pesticides.csv` | The DAE register spine (9,353+ rows) |
| `all_pesticides_enriched.csv` | Enhanced master — 9,642 rows × 47 columns |
| `bangladesh_pesticide_database.csv` | Merged master register |
| `pesticide_policy_enrichment.csv` | Policy/HHP/MoA sidecar (9,459 rows) |
| `moa_overlay.csv` | **Single source of truth** for canonical MoA codes: code, all mixture codes, confidence tier, provenance (`recorded` / `inferred` / `corrected`) |
| `moa_overlay_products.csv`, `moa_overlay_audit.csv` | Product-level overlay + change audit trail |
| `Bangladesh_Registered_Pesticides_Database_moa.xlsx` | Register with MoA, as XLSX |
| `moa_master_2026/` | PTAC 2026 MoA master: HTML exports per sheet + zip |

## `public/` — static assets served as-is

| Path | What it is |
|---|---|
| `downloads/` | The four latest-database artifacts (XLSX 5-sheet, PDF reference, flat CSV, MoA rotation CSV) + `pesticide_database.json` runtime DB + official IRAC/PTAC PDFs + validation report |
| `icons/` | PWA icons (192/512, apple-touch set) |
| `fonts/` | Self-hosted Hind Siliguri + IBM Plex Mono woff2 + `fonts.css` |
| `CNAME`, `favicon*`, `og-image.png`, `hero-field.jpg`, `partner-*.png` | GitHub Pages domain, favicons, social preview image, field photo, partner logos |
| `manus-routes.json` | Hash-routed product surfaces for crawlers |

## `.github/` — automation

| Path | What it is |
|---|---|
| `workflows/deploy.yml` | Builds & publishes the app to GitHub Pages on push to `main` |
| `workflows/regenerate-data.yml` | Rebuilds + commits the generated data artifacts when `data_raw/` or pipeline scripts change |
| `workflows/ci.yml` | Type-check (`tsc --noEmit`) + unit tests (`vitest run`) on every PR/push |
| `ISSUE_TEMPLATE/` | Bug report + data-correction issue forms |
| `PULL_REQUEST_TEMPLATE.md` | Checklist for change submissions |
| `FUNDING.yml` | Sponsor links placeholder (remove if not wanted) |

## `docs/` — design documents

| File | Contents |
|---|---|
| `PESTICIDE-INTELLIGENCE.md` | Design of the pesticide intelligence engine (routes, decision model) |
| `protection-integration-audit.md` | Source-first audit of the Protection Intelligence integration (file:line evidence) |
| `database-review-2026-11-24.md` | Database enhancement + size-reduction review with measured numbers |

## Where to make common changes

| I want to … | Touch |
|---|---|
| Fix a product's MoA code | `data_raw/moa_overlay.csv` → run `integrate_canonical_registry.py` + `regenerate_data_modules.py` (CI does the rest) |
| Change the catalogue the app ships | `data_raw/` → the `regenerate-data` workflow rebuilds `src/data/` + `public/downloads/` |
| Add a UI tab / change copy | `src/components/*` + `src/utils/i18n.ts` (both languages!) |
| Change the tank-mix math | `src/utils/calculator.ts` (unit tests in `src/utils/__tests__/`) |
| Change rotation conflict rules | `src/utils/moaRotationEngine.ts` + tests |
| Bump the PWA cache | `vite.config.ts` `cacheId` (e.g. `pn-v5` → `pn-v6`) + `src/utils/cleanupCaches.ts` |
