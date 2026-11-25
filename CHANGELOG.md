# Changelog

Notable changes to PesticideNext (AgriChem Guide — Pest Control Database).
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Dates are the dates changes landed on `main`.

## [Unreleased]

### Added
- MIT `LICENSE` with a third-party data attribution notice (DAE/PTAC
  registers, IRAC/FRAC/HRAC classifications).
- `INDEX.md` — a full map of the repository for new contributors.
- Community files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`,
  PR template, and bug-report / data-correction issue templates.
- CI workflow (`ci.yml`): type-check (`tsc --noEmit`) + unit tests
  (`vitest run`) on every push and PR.
- `package.json` identity: name `react-example` → `pesticidenext`,
  version `1.0.0`, description, `license: MIT`.

### Fixed
- Data-pipeline scripts no longer default to maintainer-machine absolute
  paths: `irac_v11_5_backfill.py`, `smart_moa_backfill.py`,
  `parse_moa_master_html.py` and the docstrings of
  `build_latest_database.py` / `regenerate_all_pesticides.py` now use
  repo-relative `data_raw/external/{download,upload}` defaults
  (still overridable via `AGRICHEM_DOWNLOAD_DIR` / `AGRICHEM_UPLOAD_DIR`),
  matching `build_latest_database.py`'s convention.

## 2026-11-24/25 — Enhanced database & review (#70)

### Added
- Enhanced master database: 9,642 rows × 47 columns
  (`data_raw/all_pesticides_enriched.csv`), a drop-in superset of the
  published flat CSV with +20 enrichment columns (MoA authority, resistance
  risk, rotation partners, PHI days, REI hours, HHP status, EU/global
  regulatory status, formulation physicality, registry match status).
- Database master-class display board: crop/pest/target-site facets,
  By-Formulation view, field facts on every product card, coverage panel,
  honest MoA states (`src/components/DatabaseView.tsx`).
- Footer OG-image preview strip linking this app and three companion
  projects.

### Fixed
- MoA codes completed for scheme-less products with per-ingredient
  corrections; MoA groups counted atomically; displayed catalogue stats
  synced with the enriched database.

## 2026-11-24 — Canonical MoA registry integration (#65–#68)

### Added
- `data_raw/moa_overlay.csv` — the single source of truth for canonical MoA
  codes with confidence tier and provenance
  (`recorded` / `inferred` / `corrected`).
- `scripts/integrate_canonical_registry.py` folding the overlay into the
  register and writing `moa_overlay_audit.csv` (every changed row and why);
  unified the register's four incompatible notations (packed compound codes,
  modern HRAC numbers → legacy letters, zero-padded FRAC multi-site codes,
  contradicting codes).
- `regenerate-data.yml` workflow: rebuilds and commits the generated
  artifacts when `data_raw/` or pipeline scripts change.
- Database review with measured numbers
  (`docs/database-review-2026-11-24.md`).

## 2026-11-19 — Protection Intelligence (#64)

### Added
- Protection Intelligence pipeline: KWI weather risk → scouting →
  protection decision → product eligibility → application → outcome
  (`src/intelligence/`, `src/lib/kwi/`), audited in
  `docs/protection-integration-audit.md`.

## 2026-10-25 – 2026-11-01 — Smart search, weather, catalogue growth

### Added
- Smart MoA mapping passes 2–3 (1,660 newly mapped products), latest DAE
  register merge, Vercel domain.
- Label scanning with Bangla OCR (`tesseract.js`), 9,000+ catalogue lock.
- Layman-first smart search, bottom navigation, user persona system.
- Krishi Weather Intelligence engine + 45 crop configs, built into the
  My Field tab.
- Home-view dialogue refreshes.

## 2026-10-27 — Live PPW search & database downloads

### Added
- In-app **PPW live search** proxy (`server.ts → /api/ppw/search`) so the
  official Plant Protection Wing JSON API renders natively inside the app
  (the official site blocks iframes).
- Downloadable artifacts in `public/downloads/`: 5-sheet XLSX, printable
  landscape PDF reference, flat CSV, MoA rotation quick-reference CSV — all
  precached by the service worker for offline use.

## 2026-09-09 — Initial release

### Added
- Bilingual (Bangla/English) PWA: pesticide database, knapsack sprayer tank
  calculator, IRAC/FRAC/HRAC MoA rotation planner, safety & PPE checklists,
  field guidebook, regulatory alerts, PDF export, PWA offline support.
