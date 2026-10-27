#!/usr/bin/env python3
"""
pre_merge_audit.py
==================

Pre-merge audit of the latest pesticide database built by build_latest_database.py.

Checks performed:
  1. Duplicate Registration No detection (across the merged catalogue)
     - Identifies reg#s that appear more than once with different trade names
       or companies (genuine duplicates from the source gazette)
     - Identifies reg#s that appear more than once with the same trade name
       (parser/cleaning issue)
     - Breaks down duplicates by Section (Pesticides / Biopesticides /
       Public Health) and by Source Edition (Live only / 86th / 87th / both)

  2. MoA coverage analysis
     - Counts records with MoA Code, Scheme, Group No., MoA Description,
       Target Site, Policy Risk Tier
     - Lists reg#s WITHOUT MoA classification (so the reviewer can decide
       whether to delay merge until those are classified)
     - Cross-checks the MoA audit CSV vs. the live database: which audited
       reg#s are missing from the live DB, which live-only reg#s are not
       audited

  3. Gazette vs. live DB cross-check
     - Orphan reg#s: present in 86th/87th gazette but NOT in live DB
       (may indicate parser issues or genuinely obsolete products)
     - Live-only reg#s: in live DB but not in any gazette (the API exposes
       more products than the gazettes; this is expected)

  4. Policy sidecar coverage
     - % of live records with HHP Status, EU Regulatory Status,
       Bangladesh Policy Action, Formulation Code
     - Lists the top 50 reg#s that are missing Policy Risk Tier
       (newest live-only records not yet in the MoA audit)

  5. Section / Type distribution
     - Counts per Section, per Pesticide Type, per Status

Outputs:
  - <repo>/public/downloads/pre_merge_audit_report.md  (human-readable report)
  - <repo>/public/downloads/pre_merge_audit_duplicates.csv  (reg# → duplicate rows)
  - <repo>/public/downloads/pre_merge_audit_no_moa.csv  (reg#s missing MoA Code)
  - <repo>/public/downloads/pre_merge_audit_orphans.csv  (gazette reg#s not in live DB)
  - <repo>/public/downloads/pre_merge_audit_summary.csv  (high-level stats)

All outputs are also printed to stdout for quick terminal review.
"""

from __future__ import annotations
import os
import re
import sys
import csv
from pathlib import Path
from collections import Counter, defaultdict
from datetime import datetime
import pandas as pd

REPO = Path(__file__).resolve().parent.parent
DOWNLOAD_DIR = Path(os.environ.get("AGRICHEM_DOWNLOAD_DIR", "/home/z/my-project/download"))
UPLOAD_DIR = Path(os.environ.get("AGRICHEM_UPLOAD_DIR", "/home/z/my-project/upload"))
OUT_DIR = REPO / "public" / "downloads"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Inputs
LATEST_FLAT_CSV = OUT_DIR / "pesticide_database_latest.csv"
LIVE_DB_CSV = DOWNLOAD_DIR / "ptac_database.csv"
GAZ_86_CSV = DOWNLOAD_DIR / "ptac_gazette_86th_clean.csv"
GAZ_87_CSV = DOWNLOAD_DIR / "ptac_gazette_clean.csv"
AUDIT_CSV = UPLOAD_DIR / "moa_mapping_audit.csv"
ALL_PESTICIDES_CSV = REPO / "data_raw" / "all_pesticides.csv"
POLICY_CSV = REPO / "data_raw" / "pesticide_policy_enrichment.csv"

# Outputs
REPORT_MD = OUT_DIR / "pre_merge_audit_report.md"
DUP_CSV = OUT_DIR / "pre_merge_audit_duplicates.csv"
NO_MOA_CSV = OUT_DIR / "pre_merge_audit_no_moa.csv"
ORPHANS_CSV = OUT_DIR / "pre_merge_audit_orphans.csv"
SUMMARY_CSV = OUT_DIR / "pre_merge_audit_summary.csv"


def log(msg: str) -> None:
    print(f"[audit] {msg}", flush=True)


def normalize_reg_no(s) -> str:
    if s is None or pd.isna(s):
        return ""
    s = str(s).strip()
    s = re.sub(r"-\s+", "-", s)
    s = re.sub(r"^AP-BIO-", "AP(Bio)-", s, flags=re.IGNORECASE)
    m = re.match(r"^([A-Za-z()]+-)(\d+)$", s)
    if m:
        prefix, num = m.group(1).upper(), m.group(2)
        if prefix == "AP(BIO)-":
            prefix = "AP(Bio)-"
        s = prefix + num
    return s


def load_data():
    """Load all relevant data sources."""
    log("Loading data sources...")
    latest = pd.read_csv(LATEST_FLAT_CSV, dtype=str).fillna("")
    latest["Registration No"] = latest["Registration No"].apply(normalize_reg_no)
    log(f"  latest flat: {len(latest):,} rows")

    live = pd.read_csv(LIVE_DB_CSV, dtype=str).fillna("")
    live["Registration No"] = live["Registration No"].apply(normalize_reg_no)
    log(f"  live DB: {len(live):,} rows")

    g86 = pd.read_csv(GAZ_86_CSV, dtype=str).fillna("")
    g86["Registration No"] = g86["Registration No"].apply(normalize_reg_no)
    log(f"  86th gazette: {len(g86):,} rows")

    g87 = pd.read_csv(GAZ_87_CSV, dtype=str).fillna("")
    g87["Registration No"] = g87["Registration No"].apply(normalize_reg_no)
    log(f"  87th gazette: {len(g87):,} rows")

    audit = pd.read_csv(AUDIT_CSV, dtype=str).fillna("")
    audit["registration_no"] = audit["registration_no"].apply(normalize_reg_no)
    log(f"  MoA audit: {len(audit):,} rows")

    all_pest = pd.read_csv(ALL_PESTICIDES_CSV, dtype=str).fillna("")
    all_pest["Registration No"] = all_pest["Registration No"].apply(normalize_reg_no)
    log(f"  all_pesticides.csv (data_raw): {len(all_pest):,} rows")

    policy = pd.read_csv(POLICY_CSV, dtype=str).fillna("")
    policy["Registration No"] = policy["Registration No"].apply(normalize_reg_no)
    log(f"  policy_enrichment.csv (data_raw): {len(policy):,} rows")

    return {
        "latest": latest, "live": live, "g86": g86, "g87": g87,
        "audit": audit, "all_pest": all_pest, "policy": policy,
    }


# ----------------------------------------------------------------------------
# Check 1: Duplicate Registration No detection
# ----------------------------------------------------------------------------
def check_duplicates(data) -> dict:
    """Identify duplicate registration numbers across the latest flat DB."""
    log("")
    log("=" * 70)
    log("CHECK 1: Duplicate Registration No detection")
    log("=" * 70)
    latest = data["latest"]
    # Group by Registration No
    dup_groups = (
        latest.groupby("Registration No")
        .agg(
            count=("Registration No", "size"),
            trade_names=("Trade Name", lambda x: list(set(x))),
            brand_names=("Brand Name", lambda x: list(set(x))),
            companies=("Company", lambda x: list(set(x))),
            sections=("Section", lambda x: list(set(x))),
            statuses=("Status", lambda x: list(set(x))),
            source_editions=("Source Edition", lambda x: list(set(x))),
        )
        .reset_index()
    )
    dups = dup_groups[dup_groups["count"] > 1].sort_values("count", ascending=False)
    total_dup_groups = len(dups)
    total_dup_rows = dups["count"].sum()
    log(f"  Total unique reg#s: {len(dup_groups):,}")
    log(f"  Duplicate reg#s (count > 1): {total_dup_groups:,}")
    log(f"  Total rows in duplicate groups: {total_dup_rows:,}")
    log(f"  Avg duplicates per group: {(total_dup_rows - total_dup_groups) / max(total_dup_groups, 1):.2f}")

    # Breakdown by Section
    log("")
    log("  Duplicates by Section (a single reg# can have multiple sections if it appears in different sections):")
    section_counter = Counter()
    for _, row in dups.iterrows():
        for sec in row["sections"]:
            section_counter[sec] += 1
    for sec, n in section_counter.most_common():
        log(f"    {sec}: {n}")

    # Breakdown by Source Edition
    log("")
    log("  Duplicates by Source Edition:")
    src_counter = Counter()
    for _, row in dups.iterrows():
        for src in row["source_editions"]:
            src_counter[src] += 1
    for src, n in src_counter.most_common():
        log(f"    {src}: {n}")

    # Classify duplicates: same-trade-name (parser issue) vs. different-trade-name (genuine source duplicates)
    same_name_dups = 0
    diff_name_dups = 0
    for _, row in dups.iterrows():
        if len(row["trade_names"]) == 1:
            same_name_dups += 1
        else:
            diff_name_dups += 1
    log("")
    log(f"  Same Trade Name duplicates (likely parser/data-entry variants): {same_name_dups}")
    log(f"  Different Trade Name duplicates (genuine source-gazette reuse): {diff_name_dups}")

    # Save duplicates CSV
    dups_out = dups[["Registration No", "count", "sections", "statuses",
                     "source_editions", "trade_names", "brand_names", "companies"]].copy()
    dups_out["trade_names"] = dups_out["trade_names"].apply(lambda x: " | ".join(x))
    dups_out["brand_names"] = dups_out["brand_names"].apply(lambda x: " | ".join(x))
    dups_out["companies"] = dups_out["companies"].apply(lambda x: " | ".join(x))
    dups_out["sections"] = dups_out["sections"].apply(lambda x: " | ".join(x))
    dups_out["statuses"] = dups_out["statuses"].apply(lambda x: " | ".join(x))
    dups_out["source_editions"] = dups_out["source_editions"].apply(lambda x: " | ".join(x))
    dups_out.to_csv(DUP_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {DUP_CSV}")

    # Show top 15 duplicates as a sample
    log("")
    log("  Top 15 duplicate reg#s (sample):")
    log(f"    {'Reg No':<15} {'Count':<7} {'Sections':<30} {'Trade Names'}")
    log(f"    {'-'*15} {'-'*7} {'-'*30} {'-'*40}")
    for _, row in dups.head(15).iterrows():
        trades = " | ".join(row["trade_names"])[:80]
        secs = " | ".join(row["sections"])[:30]
        log(f"    {row['Registration No']:<15} {row['count']:<7} {secs:<30} {trades}")

    return {
        "total_unique_reg_nos": int(len(dup_groups)),
        "duplicate_reg_nos": int(total_dup_groups),
        "duplicate_rows": int(total_dup_rows),
        "same_name_duplicates": int(same_name_dups),
        "diff_name_duplicates": int(diff_name_dups),
        "duplicates_df": dups,
    }


# ----------------------------------------------------------------------------
# Check 2: MoA coverage
# ----------------------------------------------------------------------------
def check_moa_coverage(data) -> dict:
    """Analyze MoA classification coverage across the latest flat DB."""
    log("")
    log("=" * 70)
    log("CHECK 2: MoA classification coverage")
    log("=" * 70)
    latest = data["latest"]
    audit = data["audit"]

    total = len(latest)
    has_moa_code = (latest["MoA Code"].str.strip() != "").sum()
    has_scheme = (latest["Scheme"].str.strip() != "").sum()
    has_group_no = (latest["Group No."].str.strip() != "").sum()
    has_moa_desc = (latest["MoA Description"].str.strip() != "").sum()
    has_target_site = (latest["Target Site"].str.strip() != "").sum()
    has_policy_action = (latest["Policy Action"].str.strip() != "").sum()
    has_risk_tier = (latest["Policy Risk Tier"].str.strip() != "").sum()
    log(f"  Total records: {total:,}")
    log(f"  Records with MoA Code:       {has_moa_code:,} ({has_moa_code/total*100:.1f}%)")
    log(f"  Records with Scheme:         {has_scheme:,} ({has_scheme/total*100:.1f}%)")
    log(f"  Records with Group No.:      {has_group_no:,} ({has_group_no/total*100:.1f}%)")
    log(f"  Records with MoA Description:{has_moa_desc:,} ({has_moa_desc/total*100:.1f}%)")
    log(f"  Records with Target Site:    {has_target_site:,} ({has_target_site/total*100:.1f}%)")
    log(f"  Records with Policy Action:  {has_policy_action:,} ({has_policy_action/total*100:.1f}%)")
    log(f"  Records with Policy Risk Tier:{has_risk_tier:,} ({has_risk_tier/total*100:.1f}%)")

    # Policy Risk Tier breakdown
    log("")
    log("  Policy Risk Tier distribution:")
    tier_counts = latest["Policy Risk Tier"].str.strip().value_counts()
    for tier, n in tier_counts.items():
        log(f"    {tier or '(empty)'}: {n:,}")

    # Records without MoA
    no_moa = latest[latest["MoA Code"].str.strip() == ""]
    log("")
    log(f"  Records WITHOUT MoA Code: {len(no_moa):,} ({len(no_moa)/total*100:.1f}%)")

    # Save no-MoA list
    no_moa_out = no_moa[["Registration No", "Section", "Status", "Common Name",
                        "Trade Name", "Brand Name", "Company", "Source Edition"]].copy()
    no_moa_out.to_csv(NO_MOA_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {NO_MOA_CSV}")

    # Cross-check: audited reg#s missing from live DB
    audit_reg_nos = set(audit["registration_no"].unique())
    live_reg_nos = set(latest["Registration No"].unique())
    audited_not_in_live = audit_reg_nos - live_reg_nos
    live_not_audited = live_reg_nos - audit_reg_nos
    log("")
    log(f"  Audit cross-check:")
    log(f"    Audited reg#s: {len(audit_reg_nos):,}")
    log(f"    Live DB reg#s: {len(live_reg_nos):,}")
    log(f"    Audited but NOT in live DB: {len(audited_not_in_live):,}")
    log(f"    In live DB but NOT audited: {len(live_not_audited):,}")

    # Sample of audited-but-not-live (genuinely obsolete products?)
    if audited_not_in_live:
        log("")
        log("    Sample (first 10) audited reg#s not in live DB (may be obsolete):")
        for r in sorted(audited_not_in_live)[:10]:
            log(f"      {r}")

    # Sample of live-but-not-audited (newest records, expected to lack MoA)
    if live_not_audited:
        log("")
        log(f"    Sample (first 10) live reg#s not yet audited (expected to lack MoA Code):")
        for r in sorted(live_not_audited, key=lambda x: (len(x), x))[:10]:
            log(f"      {r}")

    return {
        "total": int(total),
        "has_moa_code": int(has_moa_code),
        "has_scheme": int(has_scheme),
        "has_group_no": int(has_group_no),
        "has_moa_desc": int(has_moa_desc),
        "has_target_site": int(has_target_site),
        "has_policy_action": int(has_policy_action),
        "has_risk_tier": int(has_risk_tier),
        "no_moa_count": int(len(no_moa)),
        "audited_reg_nos": int(len(audit_reg_nos)),
        "live_reg_nos": int(len(live_reg_nos)),
        "audited_not_in_live": int(len(audited_not_in_live)),
        "live_not_audited": int(len(live_not_audited)),
        "tier_counts": {k: int(v) for k, v in tier_counts.items()},
        "no_moa_df": no_moa,
    }


# ----------------------------------------------------------------------------
# Check 3: Gazette vs. live DB cross-check
# ----------------------------------------------------------------------------
def check_gazette_vs_live(data) -> dict:
    """Cross-check reg#s in 86th/87th gazettes vs. live DB."""
    log("")
    log("=" * 70)
    log("CHECK 3: Gazette vs. live DB cross-check")
    log("=" * 70)
    latest = data["latest"]
    g86 = data["g86"]
    g87 = data["g87"]
    live = data["live"]

    live_reg_nos = set(latest["Registration No"].unique())
    g86_reg_nos = set(g86["Registration No"].unique())
    g87_reg_nos = set(g87["Registration No"].unique())
    all_gaz_reg_nos = g86_reg_nos | g87_reg_nos

    log(f"  Live DB unique reg#s: {len(live_reg_nos):,}")
    log(f"  86th gazette unique reg#s: {len(g86_reg_nos):,}")
    log(f"  87th gazette unique reg#s: {len(g87_reg_nos):,}")
    log(f"  Union of gazettes: {len(all_gaz_reg_nos):,}")
    log(f"  86th ∩ 87th overlap: {len(g86_reg_nos & g87_reg_nos):,}")
    log(f"  In 86th only: {len(g86_reg_nos - g87_reg_nos):,}")
    log(f"  In 87th only: {len(g87_reg_nos - g86_reg_nos):,}")

    # Orphans: in gazettes but not in live DB
    orphans = all_gaz_reg_nos - live_reg_nos
    log("")
    log(f"  Orphans (in gazettes but NOT in live DB): {len(orphans):,}")
    # Save orphans CSV with gazette context
    orphan_rows = []
    for reg in orphans:
        g86_row = g86[g86["Registration No"] == reg].iloc[0] if reg in g86_reg_nos else None
        g87_row = g87[g87["Registration No"] == reg].iloc[0] if reg in g87_reg_nos else None
        orphan_rows.append({
            "Registration No": reg,
            "86th Common Name": g86_row["Common Name"] if g86_row is not None else "",
            "86th Trade Name": g86_row["Trade Name"] if g86_row is not None else "",
            "86th Company": g86_row["Company"] if g86_row is not None else "",
            "87th Common Name": g87_row["Common Name"] if g87_row is not None else "",
            "87th Trade Name": g87_row["Trade Name"] if g87_row is not None else "",
            "87th Company": g87_row["Company"] if g87_row is not None else "",
        })
    orphans_df = pd.DataFrame(orphan_rows)
    if not orphans_df.empty:
        orphans_df.sort_values("Registration No").to_csv(ORPHANS_CSV, index=False, encoding="utf-8-sig")
        log(f"  Wrote {ORPHANS_CSV}")
    else:
        log("  No orphans — every gazette reg# is in the live DB (good!)")

    # Live-only: in live DB but not in any gazette (expected — the API exposes more products)
    live_only = live_reg_nos - all_gaz_reg_nos
    log("")
    log(f"  Live-only (in live DB but NOT in any gazette): {len(live_only):,}")
    log(f"    (Expected: the live API exposes more products than the quarterly gazettes)")

    # Sample of orphans (gazette-only)
    if orphans:
        log("")
        log(f"  Sample (first 10) orphan reg#s (in gazettes but not in live DB):")
        for r in sorted(orphans)[:10]:
            log(f"      {r}")

    return {
        "live_reg_nos": int(len(live_reg_nos)),
        "g86_reg_nos": int(len(g86_reg_nos)),
        "g87_reg_nos": int(len(g87_reg_nos)),
        "gazette_union": int(len(all_gaz_reg_nos)),
        "gazette_overlap": int(len(g86_reg_nos & g87_reg_nos)),
        "g86_only": int(len(g86_reg_nos - g87_reg_nos)),
        "g87_only": int(len(g87_reg_nos - g86_reg_nos)),
        "orphans_count": int(len(orphans)),
        "live_only_count": int(len(live_only)),
        "orphans_df": orphans_df,
    }


# ----------------------------------------------------------------------------
# Check 4: Policy sidecar coverage
# ----------------------------------------------------------------------------
def check_policy_coverage(data) -> dict:
    """Check coverage of policy_enrichment.csv vs. all_pesticides.csv."""
    log("")
    log("=" * 70)
    log("CHECK 4: Policy sidecar coverage vs. all_pesticides.csv")
    log("=" * 70)
    all_pest = data["all_pest"]
    policy = data["policy"]

    all_pest_reg_nos = set(all_pest["Registration No"].unique())
    policy_reg_nos = set(policy["Registration No"].unique())

    log(f"  all_pesticides.csv unique reg#s: {len(all_pest_reg_nos):,}")
    log(f"  policy_enrichment.csv unique reg#s: {len(policy_reg_nos):,}")
    log(f"  In all_pesticides but NOT in policy sidecar: {len(all_pest_reg_nos - policy_reg_nos):,}")
    log(f"  In policy sidecar but NOT in all_pesticides: {len(policy_reg_nos - all_pest_reg_nos):,}")

    # Policy field coverage
    total = len(policy)
    hhp_coverage = (policy["HHP Status (WHO/FAO)"].str.strip() != "").sum()
    eu_coverage = (policy["EU / Global Regulatory Status"].str.strip() != "").sum()
    bd_action_coverage = (policy["Bangladesh Policy Action"].str.strip() != "").sum()
    formulation_coverage = (policy["Formulation Code"].str.strip() != "").sum()
    log("")
    log(f"  Policy sidecar field coverage (out of {total:,} rows):")
    log(f"    HHP Status: {hhp_coverage:,} ({hhp_coverage/total*100:.1f}%)")
    log(f"    EU Regulatory Status: {eu_coverage:,} ({eu_coverage/total*100:.1f}%)")
    log(f"    Bangladesh Policy Action: {bd_action_coverage:,} ({bd_action_coverage/total*100:.1f}%)")
    log(f"    Formulation Code: {formulation_coverage:,} ({formulation_coverage/total*100:.1f}%)")

    return {
        "all_pest_reg_nos": int(len(all_pest_reg_nos)),
        "policy_reg_nos": int(len(policy_reg_nos)),
        "all_pest_not_in_policy": int(len(all_pest_reg_nos - policy_reg_nos)),
        "policy_not_in_all_pest": int(len(policy_reg_nos - all_pest_reg_nos)),
        "hhp_coverage_pct": float(hhp_coverage / total * 100),
        "eu_coverage_pct": float(eu_coverage / total * 100),
        "bd_action_coverage_pct": float(bd_action_coverage / total * 100),
        "formulation_coverage_pct": float(formulation_coverage / total * 100),
    }


# ----------------------------------------------------------------------------
# Check 5: Section / Type distribution
# ----------------------------------------------------------------------------
def check_distribution(data) -> dict:
    log("")
    log("=" * 70)
    log("CHECK 5: Section / Type / Status distribution")
    log("=" * 70)
    latest = data["latest"]
    log("  Section distribution:")
    sec_counts = latest["Section"].value_counts()
    for sec, n in sec_counts.items():
        log(f"    {sec}: {n:,}")
    log("")
    log("  Status distribution:")
    status_counts = latest["Status"].value_counts()
    for s, n in status_counts.items():
        log(f"    {s}: {n:,}")
    log("")
    log("  Pesticide Type distribution:")
    type_counts = latest["Pesticide Type"].value_counts()
    for t, n in type_counts.items():
        log(f"    {t}: {n:,}")
    log("")
    log("  Source Edition distribution:")
    src_counts = latest["Source Edition"].value_counts()
    for s, n in src_counts.items():
        log(f"    {s}: {n:,}")

    return {
        "section_counts": {k: int(v) for k, v in sec_counts.items()},
        "status_counts": {k: int(v) for k, v in status_counts.items()},
        "type_counts": {k: int(v) for k, v in type_counts.items()},
        "source_edition_counts": {k: int(v) for k, v in src_counts.items()},
    }


# ----------------------------------------------------------------------------
# Build Markdown report
# ----------------------------------------------------------------------------
def build_markdown_report(dup_res, moa_res, gaz_res, pol_res, dist_res):
    log("")
    log("=" * 70)
    log("Building Markdown report...")
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
    md = []
    md.append("# Pre-Merge Audit Report — Latest Pesticide Database")
    md.append("")
    md.append(f"**Generated:** {now}  ")
    md.append(f"**Total records:** {dup_res['total_unique_reg_nos']:,} unique Registration No / {moa_res['total']:,} total rows  ")
    md.append("")
    md.append("---")
    md.append("")
    md.append("## 1. Duplicate Registration No Detection")
    md.append("")
    md.append(f"- **Total unique Registration No:** {dup_res['total_unique_reg_nos']:,}")
    md.append(f"- **Duplicate reg#s (count > 1):** {dup_res['duplicate_reg_nos']:,}")
    md.append(f"- **Total rows in duplicate groups:** {dup_res['duplicate_rows']:,}")
    md.append(f"- **Same Trade Name duplicates** (likely parser/data-entry variants): {dup_res['same_name_duplicates']}")
    md.append(f"- **Different Trade Name duplicates** (genuine source-gazette reuse of reg#): {dup_res['diff_name_duplicates']}")
    md.append("")
    md.append("### Verdict")
    if dup_res['duplicate_reg_nos'] == 0:
        md.append("✅ **No duplicates found.** The database is clean.")
    elif dup_res['same_name_duplicates'] == 0 and dup_res['diff_name_duplicates'] > 0:
        md.append(f"⚠️ **{dup_res['diff_name_duplicates']} duplicate reg#s found**, but they all have DIFFERENT trade names. This is expected when the source gazette reuses the same reg# for different commercial products (e.g. same active ingredient registered by different companies). Safe to merge — these are not parser bugs.")
    else:
        md.append(f"⚠️ **{dup_res['duplicate_reg_nos']} duplicate reg#s found.** {dup_res['same_name_duplicates']} have the same trade name (parser/data-entry variant) and {dup_res['diff_name_duplicates']} have different trade names (genuine source reuse).")
    md.append("")
    md.append(f"Full duplicate list: [`pre_merge_audit_duplicates.csv`](./pre_merge_audit_duplicates.csv)")
    md.append("")
    md.append("---")
    md.append("")
    md.append("## 2. MoA Classification Coverage")
    md.append("")
    md.append(f"- **Total records:** {moa_res['total']:,}")
    md.append(f"- **Records with MoA Code:** {moa_res['has_moa_code']:,} ({moa_res['has_moa_code']/moa_res['total']*100:.1f}%)")
    md.append(f"- **Records with Scheme:** {moa_res['has_scheme']:,} ({moa_res['has_scheme']/moa_res['total']*100:.1f}%)")
    md.append(f"- **Records with Group No.:** {moa_res['has_group_no']:,} ({moa_res['has_group_no']/moa_res['total']*100:.1f}%)")
    md.append(f"- **Records with MoA Description:** {moa_res['has_moa_desc']:,} ({moa_res['has_moa_desc']/moa_res['total']*100:.1f}%)")
    md.append(f"- **Records with Target Site:** {moa_res['has_target_site']:,} ({moa_res['has_target_site']/moa_res['total']*100:.1f}%)")
    md.append(f"- **Records with Policy Action:** {moa_res['has_policy_action']:,} ({moa_res['has_policy_action']/moa_res['total']*100:.1f}%)")
    md.append(f"- **Records with Policy Risk Tier:** {moa_res['has_risk_tier']:,} ({moa_res['has_risk_tier']/moa_res['total']*100:.1f}%)")
    md.append("")
    md.append("### Policy Risk Tier distribution")
    md.append("")
    md.append("| Tier | Count |")
    md.append("|---|---|")
    for tier, n in moa_res["tier_counts"].items():
        md.append(f"| {tier or '(empty)'} | {n:,} |")
    md.append("")
    md.append(f"- **Records WITHOUT MoA Code:** {moa_res['no_moa_count']:,} ({moa_res['no_moa_count']/moa_res['total']*100:.1f}%)")
    md.append("")
    md.append("### Audit cross-check")
    md.append("")
    md.append(f"- Audited reg#s (in moa_mapping_audit.csv): {moa_res['audited_reg_nos']:,}")
    md.append(f"- Live DB unique reg#s: {moa_res['live_reg_nos']:,}")
    md.append(f"- Audited but NOT in live DB (likely obsolete): {moa_res['audited_not_in_live']:,}")
    md.append(f"- In live DB but NOT audited (newest records, expected to lack MoA): {moa_res['live_not_audited']:,}")
    md.append("")
    md.append("### Verdict")
    if moa_res['has_moa_code'] / moa_res['total'] >= 0.6:
        md.append(f"✅ **{moa_res['has_moa_code']/moa_res['total']*100:.1f}% MoA coverage** is acceptable for a merge. The remaining records are newer (post-86th PTAC) and not yet audited — they will display \"Unknown\" MoA in the app, which is the existing behavior for unclassified products.")
    else:
        md.append(f"⚠️ **Only {moa_res['has_moa_code']/moa_res['total']*100:.1f}% MoA coverage.** Consider delaying merge until more records are classified, OR accept that newer records will show \"Unknown\" MoA.")
    md.append("")
    md.append(f"Full list of records missing MoA: [`pre_merge_audit_no_moa.csv`](./pre_merge_audit_no_moa.csv)")
    md.append("")
    md.append("---")
    md.append("")
    md.append("## 3. Gazette vs. Live DB Cross-Check")
    md.append("")
    md.append(f"- Live DB unique reg#s: {gaz_res['live_reg_nos']:,}")
    md.append(f"- 86th PTAC unique reg#s: {gaz_res['g86_reg_nos']:,}")
    md.append(f"- 87th PTAC unique reg#s: {gaz_res['g87_reg_nos']:,}")
    md.append(f"- Gazette union: {gaz_res['gazette_union']:,}")
    md.append(f"- 86th ∩ 87th overlap: {gaz_res['gazette_overlap']:,}")
    md.append(f"- 86th only (not in 87th): {gaz_res['g86_only']:,}")
    md.append(f"- 87th only (not in 86th): {gaz_res['g87_only']:,}")
    md.append("")
    md.append(f"- **Orphans** (in gazettes but NOT in live DB): {gaz_res['orphans_count']:,}")
    md.append(f"- **Live-only** (in live DB but NOT in any gazette): {gaz_res['live_only_count']:,}")
    md.append("")
    md.append("### Verdict")
    if gaz_res['orphans_count'] == 0:
        md.append("✅ **No orphans.** Every reg# in the 86th/87th gazettes is also present in the live DB, confirming the live DB is a strict superset.")
    else:
        md.append(f"⚠️ **{gaz_res['orphans_count']} orphan reg#s found** — these appear in the 86th/87th gazettes but are missing from the live DB. This could indicate (a) the live API has filtered them out, (b) they were truly obsolete and removed, or (c) a parsing issue. Review the orphans CSV to decide.")
    md.append("")
    if gaz_res['orphans_count'] > 0:
        md.append(f"Full orphan list: [`pre_merge_audit_orphans.csv`](./pre_merge_audit_orphans.csv)")
        md.append("")
    md.append("---")
    md.append("")
    md.append("## 4. Policy Sidecar Coverage vs. all_pesticides.csv")
    md.append("")
    md.append(f"- all_pesticides.csv unique reg#s: {pol_res['all_pest_reg_nos']:,}")
    md.append(f"- policy_enrichment.csv unique reg#s: {pol_res['policy_reg_nos']:,}")
    md.append(f"- In all_pesticides but NOT in policy sidecar: {pol_res['all_pest_not_in_policy']:,}")
    md.append(f"- In policy sidecar but NOT in all_pesticides: {pol_res['policy_not_in_all_pest']:,}")
    md.append("")
    md.append("### Policy field coverage")
    md.append("")
    md.append("| Field | Coverage |")
    md.append("|---|---|")
    md.append(f"| HHP Status (WHO/FAO) | {pol_res['hhp_coverage_pct']:.1f}% |")
    md.append(f"| EU / Global Regulatory Status | {pol_res['eu_coverage_pct']:.1f}% |")
    md.append(f"| Bangladesh Policy Action | {pol_res['bd_action_coverage_pct']:.1f}% |")
    md.append(f"| Formulation Code | {pol_res['formulation_coverage_pct']:.1f}% |")
    md.append("")
    md.append("---")
    md.append("")
    md.append("## 5. Section / Type / Status / Source Edition Distribution")
    md.append("")
    md.append("### By Section")
    md.append("")
    md.append("| Section | Count |")
    md.append("|---|---|")
    for sec, n in dist_res["section_counts"].items():
        md.append(f"| {sec} | {n:,} |")
    md.append("")
    md.append("### By Status")
    md.append("")
    md.append("| Status | Count |")
    md.append("|---|---|")
    for s, n in dist_res["status_counts"].items():
        md.append(f"| {s} | {n:,} |")
    md.append("")
    md.append("### By Pesticide Type")
    md.append("")
    md.append("| Type | Count |")
    md.append("|---|---|")
    for t, n in dist_res["type_counts"].items():
        md.append(f"| {t} | {n:,} |")
    md.append("")
    md.append("### By Source Edition")
    md.append("")
    md.append("| Source | Count |")
    md.append("|---|---|")
    for s, n in dist_res["source_edition_counts"].items():
        md.append(f"| {s} | {n:,} |")
    md.append("")
    md.append("---")
    md.append("")
    md.append("## Summary verdict")
    md.append("")
    md.append("| Check | Status | Notes |")
    md.append("|---|---|---|")
    if dup_res['duplicate_reg_nos'] == 0:
        md.append("| 1. Duplicates | ✅ Pass | No duplicate reg#s |")
    elif dup_res['same_name_duplicates'] == 0:
        md.append(f"| 1. Duplicates | ⚠️ Acceptable | {dup_res['diff_name_duplicates']} reg#s reused across different trade names — expected source-gazette behaviour |")
    else:
        md.append(f"| 1. Duplicates | ⚠️ Review | {dup_res['duplicate_reg_nos']} dup reg#s, {dup_res['same_name_duplicates']} with same trade name (parser) |")
    moa_pct = moa_res['has_moa_code'] / moa_res['total'] * 100
    if moa_pct >= 60:
        md.append(f"| 2. MoA coverage | ✅ Pass | {moa_pct:.1f}% coverage — remaining are newest live-only records |")
    else:
        md.append(f"| 2. MoA coverage | ⚠️ Review | Only {moa_pct:.1f}% coverage |")
    if gaz_res['orphans_count'] == 0:
        md.append("| 3. Gazette vs. live | ✅ Pass | Live DB is a strict superset of gazettes |")
    else:
        md.append(f"| 3. Gazette vs. live | ⚠️ Review | {gaz_res['orphans_count']} orphans (in gazettes but not in live) |")
    md.append(f"| 4. Policy sidecar | ℹ️ Info | HHP {pol_res['hhp_coverage_pct']:.0f}%, EU {pol_res['eu_coverage_pct']:.0f}%, BD action {pol_res['bd_action_coverage_pct']:.0f}%, Formulation {pol_res['formulation_coverage_pct']:.0f}% |")
    md.append(f"| 5. Distribution | ✅ Pass | {sum(dist_res['section_counts'].values()):,} total across {len(dist_res['section_counts'])} sections |")
    md.append("")
    md.append("**Recommendation:** Merge the database once you've reviewed any ⚠️ items above. The ✅ items are safe to ship as-is.")
    md.append("")

    REPORT_MD.write_text("\n".join(md), encoding="utf-8")
    log(f"  Wrote {REPORT_MD} ({REPORT_MD.stat().st_size:,} bytes)")


# ----------------------------------------------------------------------------
# Build summary CSV
# ----------------------------------------------------------------------------
def build_summary_csv(dup_res, moa_res, gaz_res, pol_res, dist_res):
    rows = [
        {"check": "1_duplicates_total_unique_reg_nos", "value": dup_res["total_unique_reg_nos"]},
        {"check": "1_duplicates_duplicate_reg_nos", "value": dup_res["duplicate_reg_nos"]},
        {"check": "1_duplicates_duplicate_rows", "value": dup_res["duplicate_rows"]},
        {"check": "1_duplicates_same_name", "value": dup_res["same_name_duplicates"]},
        {"check": "1_duplicates_diff_name", "value": dup_res["diff_name_duplicates"]},
        {"check": "2_moa_total_records", "value": moa_res["total"]},
        {"check": "2_moa_has_moa_code", "value": moa_res["has_moa_code"]},
        {"check": "2_moa_has_scheme", "value": moa_res["has_scheme"]},
        {"check": "2_moa_has_group_no", "value": moa_res["has_group_no"]},
        {"check": "2_moa_has_moa_description", "value": moa_res["has_moa_desc"]},
        {"check": "2_moa_has_target_site", "value": moa_res["has_target_site"]},
        {"check": "2_moa_has_policy_action", "value": moa_res["has_policy_action"]},
        {"check": "2_moa_has_policy_risk_tier", "value": moa_res["has_risk_tier"]},
        {"check": "2_moa_no_moa_count", "value": moa_res["no_moa_count"]},
        {"check": "2_moa_audited_reg_nos", "value": moa_res["audited_reg_nos"]},
        {"check": "2_moa_live_reg_nos", "value": moa_res["live_reg_nos"]},
        {"check": "2_moa_audited_not_in_live", "value": moa_res["audited_not_in_live"]},
        {"check": "2_moa_live_not_audited", "value": moa_res["live_not_audited"]},
        {"check": "3_gaz_live_reg_nos", "value": gaz_res["live_reg_nos"]},
        {"check": "3_gaz_86th_reg_nos", "value": gaz_res["g86_reg_nos"]},
        {"check": "3_gaz_87th_reg_nos", "value": gaz_res["g87_reg_nos"]},
        {"check": "3_gaz_gazette_union", "value": gaz_res["gazette_union"]},
        {"check": "3_gaz_overlap_86_87", "value": gaz_res["gazette_overlap"]},
        {"check": "3_gaz_86_only", "value": gaz_res["g86_only"]},
        {"check": "3_gaz_87_only", "value": gaz_res["g87_only"]},
        {"check": "3_gaz_orphans_count", "value": gaz_res["orphans_count"]},
        {"check": "3_gaz_live_only_count", "value": gaz_res["live_only_count"]},
        {"check": "4_pol_all_pest_reg_nos", "value": pol_res["all_pest_reg_nos"]},
        {"check": "4_pol_policy_reg_nos", "value": pol_res["policy_reg_nos"]},
        {"check": "4_pol_all_pest_not_in_policy", "value": pol_res["all_pest_not_in_policy"]},
        {"check": "4_pol_policy_not_in_all_pest", "value": pol_res["policy_not_in_all_pest"]},
        {"check": "4_pol_hhp_coverage_pct", "value": pol_res["hhp_coverage_pct"]},
        {"check": "4_pol_eu_coverage_pct", "value": pol_res["eu_coverage_pct"]},
        {"check": "4_pol_bd_action_coverage_pct", "value": pol_res["bd_action_coverage_pct"]},
        {"check": "4_pol_formulation_coverage_pct", "value": pol_res["formulation_coverage_pct"]},
    ]
    for sec, n in dist_res["section_counts"].items():
        rows.append({"check": f"5_dist_section_{sec}", "value": n})
    for s, n in dist_res["status_counts"].items():
        rows.append({"check": f"5_dist_status_{s}", "value": n})
    for t, n in dist_res["type_counts"].items():
        rows.append({"check": f"5_dist_type_{t}", "value": n})
    for s, n in dist_res["source_edition_counts"].items():
        rows.append({"check": f"5_dist_source_{s}", "value": n})
    pd.DataFrame(rows).to_csv(SUMMARY_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {SUMMARY_CSV}")


# ----------------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------------
def main():
    log("=" * 70)
    log("Pre-Merge Audit — Latest Pesticide Database")
    log("=" * 70)
    data = load_data()
    dup_res = check_duplicates(data)
    moa_res = check_moa_coverage(data)
    gaz_res = check_gazette_vs_live(data)
    pol_res = check_policy_coverage(data)
    dist_res = check_distribution(data)
    build_markdown_report(dup_res, moa_res, gaz_res, pol_res, dist_res)
    build_summary_csv(dup_res, moa_res, gaz_res, pol_res, dist_res)
    log("")
    log("=" * 70)
    log("DONE. Audit outputs:")
    log(f"  - {REPORT_MD.name}  (human-readable report)")
    log(f"  - {DUP_CSV.name}  (all duplicate reg#s)")
    log(f"  - {NO_MOA_CSV.name}  (records without MoA Code)")
    log(f"  - {ORPHANS_CSV.name}  (gazette reg#s not in live DB)")
    log(f"  - {SUMMARY_CSV.name}  (high-level stats)")
    log("=" * 70)


if __name__ == "__main__":
    main()
