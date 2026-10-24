# PR: Latest PTAC 86th/87th update — live DB merge, MoA audit, in-app PPW live search, downloadable XLSX/PDF/CSV

## Summary

This PR refreshes the AgriChem-Guide-Pest-Control-Database with the **latest** registered-pesticide snapshot, **embeds the official ppw.krishi.gov.bd search** directly into the app via a backend proxy, and ships **downloadable XLSX/PDF/CSV artifacts** in `/public/downloads/` so users can grab the latest database offline.

## What's new

### 🗄️ Database refresh (data_raw + src/data)
- **Live pesticide-search API snapshot** (8,935 records) merged into the existing 5,452-row DAE register → **9,353-row** `data_raw/all_pesticides.csv`
- **86th & 87th PTAC gazettes** (1,297 + 507 records) used to enrich Common Name + Section for every record where available
- **MoA mapping audit CSV** (5,437 rows) merged into the policy sidecar → **9,459-row** `data_raw/pesticide_policy_enrichment.csv` (with Scheme, Group No., MoA Description, Target Site, Bangladesh Policy Action, Policy Risk Tier, Formulation Code, etc.)
- **MoA Mapping Enriched XLSX** (9 detailed records) + **MoA Rotation Quick Reference XLSX** (72 MoA group rotation partners) included in the XLSX deliverable
- TypeScript modules regenerated: `src/data/all_pesticides.ts` (4.3 MB) and `src/data/policyEnrichmentData.ts` (4.8 MB) — both load-tested via `bun`

### 🛰️ Official PPW Live Search (in-app, no iframe)
The official site at `https://ppw.krishi.gov.bd/pesticide-list` sends `X-Frame-Options: SAMEORIGIN`, so it **cannot** be embedded directly in an iframe. Instead we proxy the underlying JSON API at `/pesticide-search?page=N&ajax_keyword=...` through a new backend route:

- **Backend**: `server.ts` — new `GET /api/ppw/search` route forwards keyword / reg# / type / company / brand / group / crop / pest / dose / filter params to the upstream, with browser-like headers
- **Frontend**: `src/components/DatabaseView.tsx` — new `PpwLiveSearchPanel` component renders the live results natively in the database tab, with pagination, filter chips, error fallback, and an "Open in new tab" link
- The panel is collapsed by default and expands on click; auto-searches page 1 on open; supports Enter-to-search

### 📥 Latest Database Downloads (4 artifacts in /public/downloads/)
- `pesticide_database_latest.xlsx` — 5-sheet XLSX (Latest Database, MoA Audit, MoA Rotation Reference, MoA Mapping Enriched, Summary statistics)
- `pesticide_database_latest.pdf` — printable alphabetical PDF reference (landscape A4, sectioned by Pesticides / Biopesticides / Public Health, 8,935 records)
- `pesticide_database_latest.csv` — flat CSV (8,935 rows × 20 cols)
- `moa_rotation_quick_reference.csv` — 72 MoA group rotation reference

All four files are served from the same origin (no CORS issues) and **precached by the service worker** for offline use.

### 🏠 HomeView — new "Latest Database Downloads" section
A new section near the bottom of the home tab with 4 large download buttons (XLSX, PDF, CSV, MoA reference) styled with the Bangladesh official palette (green gradient header, color-coded buttons).

### 🔧 Build pipeline
- New `scripts/build_latest_database.py` — builds the unified latest DB + XLSX/PDF/CSV deliverables from the live API + 86th/87th gazettes + MoA audit (idempotent, safe to re-run on every PTAC update)
- New `scripts/regenerate_data_modules.py` — regenerates the TypeScript data modules from the updated CSVs (uses repo-relative paths)
- Both scripts use `Path(__file__).resolve().parent.parent` for the repo root and `AGRICHEM_DOWNLOAD_DIR` / `AGRICHEM_UPLOAD_DIR` env vars (defaulting to `/home/z/my-project/{download,upload}`) so they work in any environment

### ⚙️ PWA / service worker
- Bumped `cacheId` from `pn-v3` to `pn-v4` so returning users get the fresh precache on next boot (with `cleanupOutdatedCaches` purging the old `pn-v3-precache-v2`)
- Added `csv`, `pdf`, `xlsx` to the `globPatterns` so the download artifacts are precached
- Raised `maximumFileSizeToCacheInBytes` from 8 MiB to 16 MiB (the data chunk grew from ~3.4 MB to ~7.2 MB after the 86th/87th PTAC merge)
- Updated `src/utils/cleanupCaches.ts` to use `pn-v4` prefix

## Build verification

- ✅ `npx tsc --noEmit` — passes with no errors
- ✅ `npx vite build` — builds in ~10.5s, 17.8 MiB precache manifest
- ✅ PPW proxy verified: `curl http://localhost:3000/api/ppw/search?keyword=Fyfanon` returns `{"total":1, "data":[{"app_php_no":"AP-10", "brand_name":"Fyfanon 57 EC", "company":{"company_name":"Shetu Agro Industries Limited"}}]}`
- ✅ TypeScript modules load-test: `all_pesticides.ts` → 9,353 products, `policyEnrichmentData.ts` → 9,453 unique reg#s

## Sources merged

| Source | Records | Role |
|---|---|---|
| Live ppw.krishi.gov.bd API | 8,935 | Authoritative current DB (6,762 active + 2,173 expired-only) |
| 86th PTAC gazette PDF (parsed) | 1,297 | Common Name + Section enrichment (87th priority > 86th) |
| 87th PTAC gazette PDF (parsed) | 507 | Common Name + Section enrichment (latest) |
| MoA mapping audit CSV | 5,437 | Scheme, Group No., MoA Description, Policy Risk Tier (STANDARD/AMBER/RED) |
| MoA Mapping Enriched XLSX | 9 | Detailed primary/secondary AI + MoA + mechanism + resistance risk + policy tag |
| MoA Rotation Quick Reference XLSX | 72 | MoA group → mechanism, target, rotation partners, active ingredients |
| Existing DAE register (preserved) | 5,452 | Per-crop / per-pest / dosage recommendations (DAE gold standard) |
| Existing policy enrichment (preserved) | 5,485 | HHP status, EU regulatory, formulation, co-formulant concerns |

## How to re-run

```bash
# Rebuild data_raw + public/downloads artifacts
python3 scripts/build_latest_database.py

# Regenerate TypeScript modules from updated CSVs
python3 scripts/regenerate_data_modules.py

# Verify TypeScript + production build
npx tsc --noEmit && npx vite build
```

## Files changed

- `data_raw/all_pesticides.csv` (5,452 → 9,353 rows; +3,901 new live-only products)
- `data_raw/pesticide_policy_enrichment.csv` (5,485 → 9,459 rows; +3,974 new reg#s with audit data)
- `src/data/all_pesticides.ts` (regenerated, 4.3 MB)
- `src/data/policyEnrichmentData.ts` (regenerated, 4.8 MB)
- `server.ts` (+101 lines: new `/api/ppw/search` proxy route)
- `src/components/DatabaseView.tsx` (+369 lines: PpwLiveSearchPanel + iframe-replacement section)
- `src/components/HomeView.tsx` (+97 lines: "Latest Database Downloads" section)
- `src/utils/cleanupCaches.ts` (pn-v3 → pn-v4)
- `vite.config.ts` (cacheId bump, globPatterns +csv/pdf/xlsx, maximumFileSizeToCacheInBytes 8 → 16 MiB)
- `README.md` (new features + scripts + project structure updates)
- `scripts/build_latest_database.py` (new)
- `scripts/regenerate_data_modules.py` (new)
- `public/downloads/pesticide_database_latest.xlsx` (new, 1.6 MB)
- `public/downloads/pesticide_database_latest.pdf` (new, 903 KB)
- `public/downloads/pesticide_database_latest.csv` (new, 2.8 MB)
- `public/downloads/moa_rotation_quick_reference.csv` (new, 8.6 KB)

## Notes for reviewers

- The 86th PTAC gazette has a U+F02B private-use character that substitutes for "+" in multi-component common names (e.g. "Chlorpyrifos 50%\uf02bCypermethrin"); the `build_latest_database.py` script normalises this to " + " for the deliverable CSVs but the raw gazette PDF is left unchanged.
- The 86th PTAC has two parallel sub-lists in the Pesticides section (likely "Newly Registered" + "Renewed"), so duplicate SLs within Pesticides are GENUINE source-gazette duplicates, not parser errors.
- The MoA audit CSV covers reg#s from older registrations (up to ~AP-6154); newer ones (post-86th PTAC) are not yet audited, so their MoA Code / Policy Risk Tier fields are empty in the policy sidecar.
- 81st PTAC gazette is not available on the website anymore (older than Dec 2022); the live API serves as the most current authoritative source instead.
