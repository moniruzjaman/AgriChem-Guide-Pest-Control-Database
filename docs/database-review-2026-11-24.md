# PesticideNext Database Review — Enhancement & Size Reduction (2026-11-24)

> Full illustrated report: `PesticideNext_Database_Review.docx` / `.pdf` (delivered separately).
> Every number below was measured with code against this repository as of commit `2bad2e7`.

## Verdict

The database **can be enhanced**, and **~13.6 MB (~31 % of the working tree) can be recovered**
with no functional loss. This commit adds the enhanced master database; the integration steps
below make the build scripts carry it through to every published artifact.

## What this commit adds

`data_raw/all_pesticides_enriched.csv` — **9,642 rows x 47 columns**, built from the published
flat CSV (`public/downloads/pesticide_database_latest.csv`, the only artifact holding the
live-API-only fields) joined on normalized registration number with the verified xlsx-derived
enrichment (7,426-row Updated Database master, strict conflict handling):

- The original 22 published columns are **byte-identical** (verified row by row) — drop-in superset.
- **+20 enrichment columns**: `MoA Code (xlsx)`, `Mechanism (Site of Action)`, `MoA Authority`,
  `MoA Codes (all)`, `MoA Confidence`, `Resistance Risk`, `Rotation Partners`, `Toxicity Class`,
  `PHI Days`, `REI Hours`, `Formulation`, `Formulation Type (Physicality)`, `HHP Status (WHO/FAO)`,
  `HHP Criteria Met`, `Hazardous Active(s) Matched`, `EU / Global Regulatory Status`,
  `Registration Status`, `Registry Match Status`.
- **+5 restored DAE columns** the flat CSV had dropped: `Recommended Crops`, `Recommended Pests`,
  `Dosage Rate`, `Recommendations (Crop | Pest | Dosage)`, `No. of Recommendations`.
- **+2 audit columns**: `Registry QA Flag` (row-level data-quality documentation) and
  `Registration Holder (CSV)` (DAE register provenance).
- The dropped product row (`Golder Aerosol`, Public Health, empty RegNo) is **restored** with a flag.

Join coverage: all 9,587 distinct registration numbers overlap between the spine and the
enrichment source; no row was left unmatched. Fill rates: MoA Code 64 %, Mechanism /
Resistance Risk / Rotation Partners 50 %, Toxicity Class 33 %, PHI / REI 28 %, Formulation 53 %,
HHP Status 48 %, EU status 12 %, Registration Status 62 %, Registry Match Status 78 %.

## Data-quality findings reproduced against this repository

| Finding | Evidence |
| --- | --- |
| One product row silently dropped by the build | spine 9,642 rows vs published CSV 9,641; missing row = `Golder Aerosol` |
| 4 numeric-only registration numbers shipped as-is | `3852`, `5816`, `6183`, `6474`; xlsx holds the AP-prefixed twins; 2 brand typos (`Digtal` vs `Digital`) |
| 15 duplicate registrations with a wrong RegNo | `Mipcin 75 WP` under AP-77 (canonical AP-539), `ABADA 1.8ME` under AP(Bio)-58 (canonical AP-6834), `Zonatrac` under two RegNos |
| 84 brand names carry >= 2 RegNos | 35 are duplicate registrations on the spine; the rest are legitimate reformulations |
| 226 registry conflicts | enrichment from the xlsx was withheld for these RegNos (registry lists a different product) |
| 214 MoA codes disagree with the master xlsx | mostly formatting (`11` vs `FRAC 11`) or multi-group listings (`FRAC 11/3` vs `FRAC 11`) |
| Runtime JSON lacks status and contact fields | `generate_runtime_json.py` does not read the flat CSV; 2,184 products are `Expired` |

## Integration steps (no structural change required)

1. Commit `data_raw/all_pesticides_enriched.csv` (this commit) — keep the 13-col spine as provenance.
2. Extend `build_latest_database.py` to pass the 25 new columns through to the published CSV/XLSX
   (column passthrough, not a merge).
3. Extend `generate_runtime_json.py` to read the same file so status, contacts, QA flags and the
   clinical fields reach the app (`ChemicalProduct` needs 5 optional fields; `toxicityClass`,
   `phiDays`, `reiHours` already exist for curated rows).
4. Extend `validate_registry.py` with a row-count assertion (published artifacts == spine rows) —
   this would have caught the `Golder Aerosol` drop.

## Size-reduction plan (measured)

| Item | Size | Action |
| --- | --- | --- |
| Dead TS modules: `src/data/all_pesticides.ts`, `policyEnrichmentData.ts`, `allPesticidesData.ts` | 9,225 KB | delete — nothing imports them since PR #46 (only comments/test mentions); `loadDatabase.ts` fetches the JSON |
| Scrape residue: `data_raw/moa_master_2026/resources/sheet.css` + 13 loose HTML files | 4,363 KB | delete; keep the 534 KB source zip (same HTML inside) |
| Runtime JSON bloat | 8,132 KB | compact serialization, strip empty fields; optionally split `recommendations` into a lazy sidecar (est. 1.5–2.5 MB, verify) |
| Regenerated PDF/XLSX committed unchanged | 2.7 MB per data-free run | commit download artifacts only when inputs changed |
| Stale README numbers | docs | update: 9,642-row register / 9,633-row sidecar / 7-sheet xlsx / 13 download files incl. the JSON |

## Pipeline regression hazards ("similar code that can lead to an older database")

1. `build_latest_database.py` reads and writes the same spine (`EXISTING_DAE_CSV` == `OUT_DAE_CSV`)
   and the committed flat CSV is both input and output — a partial run corrupts the source of truth.
2. `regenerate_all_pesticides.py` and `regenerate_data_modules.py` both write
   `src/data/all_pesticides.ts`; the former generates it **without** policy enrichment — running it
   alone regresses the module. Recommend deleting `regenerate_all_pesticides.py`.
3. Four one-shot backfills mutate committed data in place (`irac_v11_5_backfill.py`,
   `smart_moa_backfill.py`, `fill_from_bd_master.py`, `integrate_canonical_registry.py`) — re-running
   reapplies era-specific MoA mappings over newer data. Recommend `scripts/archive/`.
4. `database_sync.py` is dead code (hardcoded filenames absent from the repo). Recommend deleting.

Recommended consolidation: make `data_raw/` immutable inputs, build into a staging directory,
chain build -> runtime JSON -> TS modules -> `validate_registry.py` into one command.

## Verification

- Merged file: 9,642 rows x 47 cols; the 22 original columns byte-identical to the published CSV.
- QA flag distribution: 7,231 clean+enriched / 1,582 Public Health / 377 absent from xlsx /
  226 registry conflict / 106 combination / 69 active-only / 23 duplicate registrations /
  12 shared RegNo / 4 malformed RegNo fixed / 1 HHP withheld / 1 restored row.
