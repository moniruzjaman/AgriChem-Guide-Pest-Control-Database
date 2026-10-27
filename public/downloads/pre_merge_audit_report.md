# Pre-Merge Audit Report — Latest Pesticide Database

**Generated:** 2026-10-24 06:44 UTC  
**Total records:** 9,040 unique Registration No / 9,040 total rows  

---

## 1. Duplicate Registration No Detection

- **Total unique Registration No:** 9,040
- **Duplicate reg#s (count > 1):** 0
- **Total rows in duplicate groups:** 0
- **Same Trade Name duplicates** (likely parser/data-entry variants): 0
- **Different Trade Name duplicates** (genuine source-gazette reuse of reg#): 0

### Verdict
✅ **No duplicates found.** The database is clean.

Full duplicate list: [`pre_merge_audit_duplicates.csv`](./pre_merge_audit_duplicates.csv)

---

## 2. MoA Classification Coverage

- **Total records:** 9,040
- **Records with MoA Code:** 6,100 (67.5%)
- **Records with Scheme:** 6,867 (76.0%)
- **Records with Group No.:** 4,967 (54.9%)
- **Records with MoA Description:** 6,863 (75.9%)
- **Records with Target Site:** 5,277 (58.4%)
- **Records with Policy Action:** 4,988 (55.2%)
- **Records with Policy Risk Tier:** 5,038 (55.7%)

### Policy Risk Tier distribution

| Tier | Count |
|---|---|
| (empty) | 4,002 |
| STANDARD | 3,908 |
| AMBER | 671 |
| RED | 418 |
| GREEN | 40 |
| RED (multiple HHPs) | 1 |

- **Records WITHOUT MoA Code:** 2,940 (32.5%)

### Audit cross-check

- Audited reg#s (in moa_mapping_audit.csv): 5,437
- Live DB unique reg#s: 9,040
- Audited but NOT in live DB (likely obsolete): 407
- In live DB but NOT audited (newest records, expected to lack MoA): 4,010

### Verdict
✅ **67.5% MoA coverage** is acceptable for a merge. The remaining records are newer (post-86th PTAC) and not yet audited — they will display "Unknown" MoA in the app, which is the existing behavior for unclassified products.

Full list of records missing MoA: [`pre_merge_audit_no_moa.csv`](./pre_merge_audit_no_moa.csv)

---

## 3. Gazette vs. Live DB Cross-Check

- Live DB unique reg#s: 9,040
- 86th PTAC unique reg#s: 1,296
- 87th PTAC unique reg#s: 507
- Gazette union: 1,803
- 86th ∩ 87th overlap: 0
- 86th only (not in 87th): 1,296
- 87th only (not in 86th): 507

- **Orphans** (in gazettes but NOT in live DB): 0
- **Live-only** (in live DB but NOT in any gazette): 7,237

### Verdict
✅ **No orphans.** Every reg# in the 86th/87th gazettes is also present in the live DB, confirming the live DB is a strict superset.

---

## 4. Policy Sidecar Coverage vs. all_pesticides.csv

- all_pesticides.csv unique reg#s: 9,448
- policy_enrichment.csv unique reg#s: 9,562
- In all_pesticides but NOT in policy sidecar: 66
- In policy sidecar but NOT in all_pesticides: 180

### Policy field coverage

| Field | Coverage |
|---|---|
| HHP Status (WHO/FAO) | 50.5% |
| EU / Global Regulatory Status | 50.5% |
| Bangladesh Policy Action | 56.9% |
| Formulation Code | 50.5% |

---

## 5. Section / Type / Status / Source Edition Distribution

### By Section

| Section | Count |
|---|---|
| Pesticides | 7,379 |
| Public Health | 1,535 |
| Biopesticides | 122 |
| Pesticides (Legacy) | 4 |

### By Status

| Status | Count |
|---|---|
| Active | 6,759 |
| Expired | 2,172 |
| Active (Gazette only) | 109 |

### By Pesticide Type

| Type | Count |
|---|---|
| Insecticide | 7,344 |
| Public Health | 1,535 |
| Bio Pesticide | 126 |
| Fungicide | 23 |
| Herbicide | 12 |

### By Source Edition

| Source | Count |
|---|---|
| Live only | 7,237 |
| 86th | 1,268 |
| 87th | 426 |
| 87th orphan | 81 |
| 86th orphan | 28 |

---

## Summary verdict

| Check | Status | Notes |
|---|---|---|
| 1. Duplicates | ✅ Pass | No duplicate reg#s |
| 2. MoA coverage | ✅ Pass | 67.5% coverage — remaining are newest live-only records |
| 3. Gazette vs. live | ✅ Pass | Live DB is a strict superset of gazettes |
| 4. Policy sidecar | ℹ️ Info | HHP 50%, EU 50%, BD action 57%, Formulation 50% |
| 5. Distribution | ✅ Pass | 9,040 total across 4 sections |

**Recommendation:** Merge the database once you've reviewed any ⚠️ items above. The ✅ items are safe to ship as-is.
