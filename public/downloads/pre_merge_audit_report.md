# Pre-Merge Audit Report — Latest Pesticide Database

**Generated:** 2026-10-24 06:02 UTC  
**Total records:** 8,931 unique Registration No / 8,935 total rows  

---

## 1. Duplicate Registration No Detection

- **Total unique Registration No:** 8,931
- **Duplicate reg#s (count > 1):** 4
- **Total rows in duplicate groups:** 8
- **Same Trade Name duplicates** (likely parser/data-entry variants): 1
- **Different Trade Name duplicates** (genuine source-gazette reuse of reg#): 3

### Verdict
⚠️ **4 duplicate reg#s found.** 1 have the same trade name (parser/data-entry variant) and 3 have different trade names (genuine source reuse).

Full duplicate list: [`pre_merge_audit_duplicates.csv`](./pre_merge_audit_duplicates.csv)

---

## 2. MoA Classification Coverage

- **Total records:** 8,935
- **Records with MoA Code:** 4,061 (45.5%)
- **Records with Scheme:** 5,031 (56.3%)
- **Records with Group No.:** 5,031 (56.3%)
- **Records with MoA Description:** 5,031 (56.3%)
- **Records with Target Site:** 5,031 (56.3%)
- **Records with Policy Action:** 5,031 (56.3%)
- **Records with Policy Risk Tier:** 5,031 (56.3%)

### Policy Risk Tier distribution

| Tier | Count |
|---|---|
| STANDARD | 3,944 |
| (empty) | 3,904 |
| AMBER | 657 |
| RED | 408 |
| GREEN | 21 |
| RED (multiple HHPs) | 1 |

- **Records WITHOUT MoA Code:** 4,874 (54.5%)

### Audit cross-check

- Audited reg#s (in moa_mapping_audit.csv): 5,437
- Live DB unique reg#s: 8,931
- Audited but NOT in live DB (likely obsolete): 407
- In live DB but NOT audited (newest records, expected to lack MoA): 3,901

### Verdict
⚠️ **Only 45.5% MoA coverage.** Consider delaying merge until more records are classified, OR accept that newer records will show "Unknown" MoA.

Full list of records missing MoA: [`pre_merge_audit_no_moa.csv`](./pre_merge_audit_no_moa.csv)

---

## 3. Gazette vs. Live DB Cross-Check

- Live DB unique reg#s: 8,931
- 86th PTAC unique reg#s: 1,296
- 87th PTAC unique reg#s: 507
- Gazette union: 1,803
- 86th ∩ 87th overlap: 0
- 86th only (not in 87th): 1,296
- 87th only (not in 86th): 507

- **Orphans** (in gazettes but NOT in live DB): 109
- **Live-only** (in live DB but NOT in any gazette): 7,237

### Verdict
⚠️ **109 orphan reg#s found** — these appear in the 86th/87th gazettes but are missing from the live DB. This could indicate (a) the live API has filtered them out, (b) they were truly obsolete and removed, or (c) a parsing issue. Review the orphans CSV to decide.

Full orphan list: [`pre_merge_audit_orphans.csv`](./pre_merge_audit_orphans.csv)

---

## 4. Policy Sidecar Coverage vs. all_pesticides.csv

- all_pesticides.csv unique reg#s: 9,339
- policy_enrichment.csv unique reg#s: 9,453
- In all_pesticides but NOT in policy sidecar: 66
- In policy sidecar but NOT in all_pesticides: 180

### Policy field coverage

| Field | Coverage |
|---|---|
| HHP Status (WHO/FAO) | 51.1% |
| EU / Global Regulatory Status | 51.1% |
| Bangladesh Policy Action | 57.3% |
| Formulation Code | 51.1% |

---

## 5. Section / Type / Status / Source Edition Distribution

### By Section

| Section | Count |
|---|---|
| Pesticides | 7,352 |
| Public Health | 1,462 |
| Biopesticides | 117 |
| Pesticides (Legacy) | 4 |

### By Status

| Status | Count |
|---|---|
| Active | 6,759 |
| Expired | 2,173 |
| Active (Duplicate) | 3 |

### By Pesticide Type

| Type | Count |
|---|---|
| Insecticide | 7,352 |
| Public Health | 1,462 |
| Bio Pesticide | 121 |

### By Source Edition

| Source | Count |
|---|---|
| Live only | 7,240 |
| 86th | 1,269 |
| 87th | 426 |

---

## Summary verdict

| Check | Status | Notes |
|---|---|---|
| 1. Duplicates | ⚠️ Review | 4 dup reg#s, 1 with same trade name (parser) |
| 2. MoA coverage | ⚠️ Review | Only 45.5% coverage |
| 3. Gazette vs. live | ⚠️ Review | 109 orphans (in gazettes but not in live) |
| 4. Policy sidecar | ℹ️ Info | HHP 51%, EU 51%, BD action 57%, Formulation 51% |
| 5. Distribution | ✅ Pass | 8,935 total across 4 sections |

**Recommendation:** Merge the database once you've reviewed any ⚠️ items above. The ✅ items are safe to ship as-is.
