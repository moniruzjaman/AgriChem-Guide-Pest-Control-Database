#!/usr/bin/env python3
"""
build_latest_database.py
=========================

Builds the unified "latest" pesticide database by merging:
  1. Live pesticide-search API (8,959 records — /home/z/my-project/download/ptac_database.csv)
  2. 86th PTAC gazette CSV (1,297 records — /home/z/my-project/download/ptac_gazette_86th_clean.csv)
  3. 87th PTAC gazette CSV (507 records — /home/z/my-project/download/ptac_gazette_clean.csv)
  4. MoA mapping audit CSV (5,437 records — /home/z/my-project/upload/moa_mapping_audit.csv)
  5. MoA Mapping enriched XLSX (9 sample records — /home/z/my-project/upload/MoA_Mapping_*.xlsx)
  6. MoA Rotation Quick Reference XLSX (72 records — /home/z/my-project/upload/MoA_Rotation_QuickReference.xlsx)
  7. Existing repo data_raw CSVs (for crops/pests/dosage recommendations):
     - data_raw/all_pesticides.csv (7,252 rows — DAE recommendations)
     - data_raw/pesticide_policy_enrichment.csv (5,485 rows — policy/HHP/EU/formulation enrichment)

Outputs:
  - <repo>/data_raw/all_pesticides.csv         — updated DAE register CSV (existing 7,252 + new live-only rows)
  - <repo>/data_raw/pesticide_policy_enrichment.csv — updated policy sidecar (merged with audit + new reg#s)
  - <repo>/data_raw/bangladesh_pesticide_database.csv — updated 31-col master (reg+policy combined)
  - <repo>/public/downloads/pesticide_database_latest.csv — flat user-facing CSV (all 8,959 records)
  - <repo>/public/downloads/pesticide_database_latest.xlsx — XLSX with multiple sheets
  - <repo>/public/downloads/pesticide_database_latest.pdf — printable alphabetical PDF reference
"""

from __future__ import annotations
import os
import re
import sys
import csv
import json
import shutil
from pathlib import Path
import pandas as pd
from datetime import datetime

REPO = Path(__file__).resolve().parent.parent
DOWNLOAD_DIR = Path(os.environ.get("AGRICHEM_DOWNLOAD_DIR", "/home/z/my-project/download"))
UPLOAD_DIR = Path(os.environ.get("AGRICHEM_UPLOAD_DIR", "/home/z/my-project/upload"))
OUT_DOWNLOADS = REPO / "public" / "downloads"
OUT_DOWNLOADS.mkdir(parents=True, exist_ok=True)

# Input files
LIVE_DB_CSV = DOWNLOAD_DIR / "ptac_database.csv"
GAZ_86_CSV = DOWNLOAD_DIR / "ptac_gazette_86th_clean.csv"
GAZ_87_CSV = DOWNLOAD_DIR / "ptac_gazette_clean.csv"
AUDIT_CSV = UPLOAD_DIR / "moa_mapping_audit.csv"
MOA_ENRICHED_XLSX = UPLOAD_DIR / "MoA_Mapping_PTAC_Bangladesh_PolicyEnhanced_CSV-Enriched_Updated (1).xlsx"
MOA_ROTATION_XLSX = UPLOAD_DIR / "MoA_Rotation_QuickReference.xlsx"

# Existing repo data
EXISTING_DAE_CSV = REPO / "data_raw" / "all_pesticides.csv"
EXISTING_POLICY_CSV = REPO / "data_raw" / "pesticide_policy_enrichment.csv"
EXISTING_MASTER_CSV = REPO / "data_raw" / "bangladesh_pesticide_database.csv"

# Output files
OUT_DAE_CSV = REPO / "data_raw" / "all_pesticides.csv"           # updated
OUT_POLICY_CSV = REPO / "data_raw" / "pesticide_policy_enrichment.csv"  # updated
OUT_MASTER_CSV = REPO / "data_raw" / "bangladesh_pesticide_database.csv"  # updated
OUT_LATEST_CSV = OUT_DOWNLOADS / "pesticide_database_latest.csv"
OUT_LATEST_XLSX = OUT_DOWNLOADS / "pesticide_database_latest.xlsx"
OUT_LATEST_PDF = OUT_DOWNLOADS / "pesticide_database_latest.pdf"
OUT_MOA_ROTATION_CSV = OUT_DOWNLOADS / "moa_rotation_quick_reference.csv"


def log(msg: str) -> None:
    print(f"[build] {msg}", flush=True)


def normalize_reg_no(s) -> str:
    """Normalize a registration number to uppercase, trimmed, and unify AP-BIO → AP(Bio)."""
    if s is None or pd.isna(s):
        return ""
    s = str(s).strip()
    # Remove space after dash
    s = re.sub(r"-\s+", "-", s)
    # Unify AP-BIO-XX → AP(Bio)-XX
    s = re.sub(r"^AP-BIO-", "AP(Bio)-", s, flags=re.IGNORECASE)
    # Uppercase
    m = re.match(r"^([A-Za-z()]+-)(\d+)$", s)
    if m:
        prefix, num = m.group(1).upper(), m.group(2)
        if prefix == "AP(BIO)-":
            prefix = "AP(Bio)-"
        s = prefix + num
    return s


def section_to_pesticide_type(section: str) -> str:
    """Map API Section to DAE Pesticide Type."""
    if not section:
        return "Bio Pesticide"  # default for unclassified
    s = section.lower()
    if "biopesticide" in s or "bio" in s:
        return "Bio Pesticide"
    if "public health" in s:
        return "Public Health"
    if "pesticide (legacy)" in s or "legacy" in s:
        return "Bio Pesticide"  # legacy records often biopesticides
    # default to Insecticide if just "Pesticides"
    return "Insecticide"


def load_live_db() -> pd.DataFrame:
    """Load the live API database."""
    log("Loading live database...")
    df = pd.read_csv(LIVE_DB_CSV, dtype=str).fillna("")
    df["Registration No"] = df["Registration No"].apply(normalize_reg_no)
    log(f"  Live DB: {len(df):,} rows")
    return df


def load_gazettes() -> tuple[pd.DataFrame, pd.DataFrame]:
    """Load 86th and 87th gazette CSVs (for Common Name + Section enrichment)."""
    log("Loading 86th & 87th gazettes...")
    g86 = pd.read_csv(GAZ_86_CSV, dtype=str).fillna("")
    g87 = pd.read_csv(GAZ_87_CSV, dtype=str).fillna("")
    g86["Registration No"] = g86["Registration No"].apply(normalize_reg_no)
    g87["Registration No"] = g87["Registration No"].apply(normalize_reg_no)
    log(f"  86th: {len(g86):,} rows, 87th: {len(g87):,} rows")
    return g86, g87


def load_audit() -> pd.DataFrame:
    """Load the MoA mapping audit CSV."""
    log("Loading MoA audit CSV...")
    df = pd.read_csv(AUDIT_CSV, dtype=str).fillna("")
    df["registration_no"] = df["registration_no"].apply(normalize_reg_no)
    log(f"  Audit: {len(df):,} rows")
    return df


def load_existing_dae() -> pd.DataFrame:
    """Load existing DAE all_pesticides.csv (crop/pest/dosage recommendations)."""
    log("Loading existing DAE all_pesticides.csv...")
    df = pd.read_csv(EXISTING_DAE_CSV, dtype=str).fillna("")
    df["Registration No"] = df["Registration No"].apply(normalize_reg_no)
    log(f"  DAE: {len(df):,} rows × {len(df.columns)} cols")
    return df


def load_existing_policy() -> pd.DataFrame:
    """Load existing policy_enrichment.csv."""
    log("Loading existing policy_enrichment.csv...")
    df = pd.read_csv(EXISTING_POLICY_CSV, dtype=str).fillna("")
    df["Registration No"] = df["Registration No"].apply(normalize_reg_no)
    log(f"  Policy: {len(df):,} rows × {len(df.columns)} cols")
    return df


def load_existing_master() -> pd.DataFrame:
    """Load existing 31-col bangladesh_pesticide_database.csv."""
    log("Loading existing bangladesh_pesticide_database.csv...")
    df = pd.read_csv(EXISTING_MASTER_CSV, dtype=str).fillna("")
    df["Registration No"] = df["Registration No"].apply(normalize_reg_no)
    log(f"  Master: {len(df):,} rows × {len(df.columns)} cols")
    return df


# ----------------------------------------------------------------------------
# Step 1: Build lookup tables from gazettes (reg# → Common Name + Section)
# ----------------------------------------------------------------------------
def build_gazette_lookup(g86: pd.DataFrame, g87: pd.DataFrame) -> dict:
    """Build reg# → {common_name, section, trade_name, company} lookup. 87th takes priority, then 86th."""
    lookup = {}
    # 86th first (lower priority)
    for _, r in g86.iterrows():
        reg = r["Registration No"].strip()
        if not reg:
            continue
        if reg not in lookup:
            lookup[reg] = {
                "common_name": r.get("Common Name", ""),
                "section": r.get("Section", ""),
                "trade_name": r.get("Trade Name", ""),
                "company": r.get("Company", ""),
            }
        else:
            for k, col in [("common_name", "Common Name"), ("section", "Section"),
                           ("trade_name", "Trade Name"), ("company", "Company")]:
                if not lookup[reg][k] and r.get(col, ""):
                    lookup[reg][k] = r.get(col, "")
    # 87th overrides (higher priority — most recent)
    for _, r in g87.iterrows():
        reg = r["Registration No"].strip()
        if not reg:
            continue
        if reg not in lookup:
            lookup[reg] = {
                "common_name": r.get("Common Name", ""),
                "section": r.get("Section", ""),
                "trade_name": r.get("Trade Name", ""),
                "company": r.get("Company", ""),
            }
        else:
            for k, col in [("common_name", "Common Name"), ("section", "Section"),
                           ("trade_name", "Trade Name"), ("company", "Company")]:
                if r.get(col, ""):
                    lookup[reg][k] = r.get(col, "")
    log(f"  Gazette lookup: {len(lookup):,} unique reg#s (Common Name + Section)")
    return lookup


# ----------------------------------------------------------------------------
# Step 2: Build MoA lookup from audit CSV (reg# → MoA + policy info)
# ----------------------------------------------------------------------------
def build_audit_lookup(audit: pd.DataFrame) -> dict:
    """Build reg# → {scheme, group_no, moa_description, target_site, policy_action, policy_risk_tier, status}."""
    lookup = {}
    for _, r in audit.iterrows():
        reg = r["registration_no"].strip()
        if not reg:
            continue
        # First-write-wins per reg#, but prefer "same"/"filled_missing" over "unmapped"
        entry = {
            "scheme": r.get("scheme", ""),
            "group_no": r.get("group_no", ""),
            "moa_description": r.get("moa_description", ""),
            "target_site": r.get("target_site", ""),
            "policy_action": r.get("policy_action", ""),
            "policy_risk_tier": r.get("policy_risk_tier", ""),
            "status": r.get("status", ""),
            "moa_code": r.get("attachment_moa_code", "") or r.get("existing_moa_code", ""),
        }
        if reg not in lookup:
            lookup[reg] = entry
        else:
            # Prefer non-unapped entries
            if entry["status"] != "unmapped" and lookup[reg]["status"] == "unmapped":
                lookup[reg] = entry
            elif entry["status"] == "same" and lookup[reg]["status"] != "same":
                lookup[reg] = entry
    log(f"  Audit lookup: {len(lookup):,} unique reg#s")
    return lookup


# ----------------------------------------------------------------------------
# Step 3: Build the latest flat database (8,959 rows)
# ----------------------------------------------------------------------------
def build_latest_flat(live_df: pd.DataFrame, gaz_lookup: dict, audit_lookup: dict) -> pd.DataFrame:
    """Build a flat user-facing CSV with all 8,959 records enriched with gazette + audit data."""
    log("Building latest flat database...")
    rows = []
    for _, r in live_df.iterrows():
        reg = r["Registration No"].strip()
        gaz = gaz_lookup.get(reg, {})
        aud = audit_lookup.get(reg, {})
        # Determine final Common Name: prefer gazette, fallback to existing
        common_name = gaz.get("common_name", "") or ""
        # Determine final Section: prefer gazette, fallback to live
        section = gaz.get("section", "") or r.get("Section", "")
        # Determine final Trade Name: prefer gazette (which is cleaned), fallback to Brand Name
        trade_name = gaz.get("trade_name", "") or r.get("Trade Name", "") or r.get("Brand Name", "")
        # Determine final Company: prefer live (which has full contact info), fallback to gazette
        company = r.get("Company", "") or gaz.get("company", "")
        # Determine MoA Code from audit
        moa_code = aud.get("moa_code", "")
        if moa_code:
            moa_code = moa_code.split("/")[0].strip()  # take first if "IRAC 1B / IRAC 3A"
        # Map Section to Pesticide Type
        pesticide_type = section_to_pesticide_type(section)
        rows.append({
            "Record ID": r.get("Record ID", ""),
            "Registration No": reg,
            "Pesticide Type": pesticide_type,
            "Section": section,
            "Status": r.get("Status", ""),
            "Common Name": common_name,
            "Trade Name": trade_name,
            "Brand Name": r.get("Brand Name", ""),
            "Company": company,
            "Company Email": r.get("Company Email", ""),
            "Company Phone": r.get("Company Phone", ""),
            "Company Address": r.get("Company Address", ""),
            "MoA Code": moa_code,
            "Scheme": aud.get("scheme", ""),
            "Group No.": aud.get("group_no", ""),
            "MoA Description": aud.get("moa_description", ""),
            "Target Site": aud.get("target_site", ""),
            "Policy Action": aud.get("policy_action", ""),
            "Policy Risk Tier": aud.get("policy_risk_tier", ""),
            "Source Edition": r.get("Source Edition", ""),
        })
    out = pd.DataFrame(rows)
    log(f"  Latest flat: {len(out):,} rows × {len(out.columns)} cols")
    return out


# ----------------------------------------------------------------------------
# Step 4: Update data_raw/pesticide_policy_enrichment.csv
# ----------------------------------------------------------------------------
def update_policy_csv(latest_flat: pd.DataFrame, existing_policy: pd.DataFrame, audit_lookup: dict) -> pd.DataFrame:
    """Update the policy enrichment CSV by merging existing policy rows with audit data + new reg#s from latest flat."""
    log("Updating pesticide_policy_enrichment.csv...")
    # Start with existing policy rows (these have HHP/EU/formulation details)
    cols = ["Registration No", "Trade Name", "Scheme", "Group No.", "MoA Description",
            "Target Site", "HHP Status (WHO/FAO)", "Hazardous Active(s) Matched",
            "HHP Criteria Met", "EU / Global Regulatory Status", "Bangladesh Policy Action",
            "Policy Risk Tier", "Formulation Code", "Formulation Type (Physicality)",
            "Physical Form", "Co-formulant / Inert Concern"]
    # Make a copy of existing policy
    out = existing_policy.copy()
    # Update existing rows with audit data (audit is more recent MoA classification)
    audit_by_reg = audit_lookup
    for idx, row in out.iterrows():
        reg = row["Registration No"]
        aud = audit_by_reg.get(reg, {})
        if aud:
            # Update MoA fields from audit (more recent)
            if aud.get("scheme"):
                out.at[idx, "Scheme"] = aud["scheme"]
            if aud.get("group_no"):
                out.at[idx, "Group No."] = aud["group_no"]
            if aud.get("moa_description"):
                out.at[idx, "MoA Description"] = aud["moa_description"]
            if aud.get("target_site"):
                out.at[idx, "Target Site"] = aud["target_site"]
            if aud.get("policy_action"):
                out.at[idx, "Bangladesh Policy Action"] = aud["policy_action"]
            if aud.get("policy_risk_tier"):
                out.at[idx, "Policy Risk Tier"] = aud["policy_risk_tier"]
    # Add new rows for reg#s in latest_flat not yet in policy CSV
    existing_regs = set(out["Registration No"].unique())
    new_rows = []
    for _, r in latest_flat.iterrows():
        reg = r["Registration No"]
        if reg and reg not in existing_regs:
            existing_regs.add(reg)
            new_rows.append({
                "Registration No": reg,
                "Trade Name": r.get("Trade Name", "") or r.get("Brand Name", ""),
                "Scheme": r.get("Scheme", ""),
                "Group No.": r.get("Group No.", ""),
                "MoA Description": r.get("MoA Description", ""),
                "Target Site": r.get("Target Site", ""),
                "HHP Status (WHO/FAO)": "",
                "Hazardous Active(s) Matched": "",
                "HHP Criteria Met": "",
                "EU / Global Regulatory Status": "",
                "Bangladesh Policy Action": r.get("Policy Action", ""),
                "Policy Risk Tier": r.get("Policy Risk Tier", ""),
                "Formulation Code": "",
                "Formulation Type (Physicality)": "",
                "Physical Form": "",
                "Co-formulant / Inert Concern": "",
            })
    if new_rows:
        out = pd.concat([out, pd.DataFrame(new_rows)], ignore_index=True)
    log(f"  Updated policy CSV: {len(out):,} rows (was {len(existing_policy):,}, +{len(new_rows)} new)")
    # Write
    out.to_csv(OUT_POLICY_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {OUT_POLICY_CSV}")
    return out


# ----------------------------------------------------------------------------
# Step 5: Update data_raw/all_pesticides.csv (DAE register with crops/pests)
# ----------------------------------------------------------------------------
def update_dae_csv(latest_flat: pd.DataFrame, existing_dae: pd.DataFrame, audit_lookup: dict) -> pd.DataFrame:
    """Add new products from latest_flat that aren't yet in the DAE register CSV."""
    log("Updating all_pesticides.csv (DAE register)...")
    existing_regs = set(existing_dae["Registration No"].unique())
    # Update MoA Code column from audit (more recent classification)
    out = existing_dae.copy()
    for idx, row in out.iterrows():
        reg = row["Registration No"]
        aud = audit_lookup.get(reg, {})
        moa = aud.get("moa_code", "")
        if moa and not row.get("MoA Code", ""):
            out.at[idx, "MoA Code"] = moa.split("/")[0].strip()
    # Find new reg#s in latest_flat not in existing
    new_rows = []
    for _, r in latest_flat.iterrows():
        reg = r["Registration No"]
        if reg and reg not in existing_regs:
            existing_regs.add(reg)
            new_rows.append({
                "Pesticide Type": r.get("Pesticide Type", ""),
                "SL No (Common Name)": 0,  # unknown for new entries
                "Common Name": r.get("Common Name", ""),
                "SL No (Products)": 0,
                "Brand Name": r.get("Brand Name", "") or r.get("Trade Name", ""),
                "Registration No": reg,
                "Registration Holder": r.get("Company", ""),
                "Recommended Crops": "",
                "Recommended Pests": "",
                "Dosage Rate": "",
                "Recommendations (Crop | Pest | Dosage)": "",
                "No. of Recommendations": 0,
                "MoA Code": r.get("MoA Code", ""),
            })
    if new_rows:
        out = pd.concat([out, pd.DataFrame(new_rows)], ignore_index=True)
    log(f"  Updated DAE CSV: {len(out):,} rows (was {len(existing_dae):,}, +{len(new_rows)} new)")
    out.to_csv(OUT_DAE_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {OUT_DAE_CSV}")
    return out


# ----------------------------------------------------------------------------
# Step 6: Build XLSX with multiple sheets
# ----------------------------------------------------------------------------
def build_xlsx(latest_flat: pd.DataFrame, audit: pd.DataFrame, moa_rotation: pd.DataFrame, moa_enriched: pd.DataFrame):
    """Build a multi-sheet XLSX deliverable."""
    log("Building XLSX deliverable...")
    # Sheet 1: Latest Database (8,959 rows)
    # Sheet 2: MoA Audit (5,437 rows)
    # Sheet 3: MoA Rotation Quick Reference (72 rows)
    # Sheet 4: MoA Mapping Enriched (9 sample rows)
    # Sheet 5: Summary statistics
    summary = pd.DataFrame({
        "Metric": [
            "Total records",
            "Active records",
            "Expired records",
            "Pesticides section",
            "Biopesticides section",
            "Public Health section",
            "Records with Common Name",
            "Records with MoA Code",
            "Records with Policy Risk Tier",
            "GREEN tier",
            "AMBER tier",
            "RED tier",
            "STANDARD tier",
            "Build timestamp (UTC)",
        ],
        "Value": [
            len(latest_flat),
            len(latest_flat[latest_flat["Status"] == "Active"]),
            len(latest_flat[latest_flat["Status"] == "Expired"]),
            len(latest_flat[latest_flat["Section"] == "Pesticides"]),
            len(latest_flat[latest_flat["Section"] == "Biopesticides"]),
            len(latest_flat[latest_flat["Section"] == "Public Health"]),
            len(latest_flat[latest_flat["Common Name"].str.strip() != ""]),
            len(latest_flat[latest_flat["MoA Code"].str.strip() != ""]),
            len(latest_flat[latest_flat["Policy Risk Tier"].str.strip() != ""]),
            len(latest_flat[latest_flat["Policy Risk Tier"] == "GREEN"]),
            len(latest_flat[latest_flat["Policy Risk Tier"] == "AMBER"]),
            len(latest_flat[latest_flat["Policy Risk Tier"] == "RED"]),
            len(latest_flat[latest_flat["Policy Risk Tier"] == "STANDARD"]),
            datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        ],
    })
    with pd.ExcelWriter(OUT_LATEST_XLSX, engine="openpyxl") as xl:
        latest_flat.to_excel(xl, sheet_name="Latest Database", index=False)
        audit.to_excel(xl, sheet_name="MoA Audit", index=False)
        moa_rotation.to_excel(xl, sheet_name="MoA Rotation Reference", index=False)
        moa_enriched.to_excel(xl, sheet_name="MoA Mapping Enriched", index=False)
        summary.to_excel(xl, sheet_name="Summary", index=False)
        # Auto-fit columns on the Summary sheet
        for ws_name in ["Summary"]:
            ws = xl.sheets[ws_name]
            for col in ws.columns:
                max_len = max(len(str(c.value or "")) for c in col)
                ws.column_dimensions[col[0].column_letter].width = min(max_len + 2, 50)
    log(f"  Wrote {OUT_LATEST_XLSX} ({OUT_LATEST_XLSX.stat().st_size:,} bytes)")


# ----------------------------------------------------------------------------
# Step 7: Build PDF reference (alphabetical, multi-page)
# ----------------------------------------------------------------------------
def build_pdf(latest_flat: pd.DataFrame):
    """Build a printable alphabetical PDF reference of the latest database."""
    log("Building PDF reference...")
    # Use ReportLab directly
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import mm
    from reportlab.platypus import (
        SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
    )
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont

    # Register fonts that support Bengali
    bengali_font = None
    for path in [
        "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/chinese/NotoSansSC-Regular.ttf",
    ]:
        if Path(path).exists():
            try:
                pdfmetrics.registerFont(TTFont("BodyFont", path))
                bengali_font = "BodyFont"
                break
            except Exception:
                continue
    body_font = bengali_font or "Helvetica"

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "Title", parent=styles["Title"], fontName=body_font,
        fontSize=18, alignment=1, spaceAfter=10,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle", parent=styles["Normal"], fontName=body_font,
        fontSize=10, alignment=1, textColor=colors.HexColor("#666666"), spaceAfter=14,
    )
    section_style = ParagraphStyle(
        "Section", parent=styles["Heading2"], fontName=body_font,
        fontSize=12, textColor=colors.HexColor("#006a4e"), spaceBefore=12, spaceAfter=6,
    )
    body_style = ParagraphStyle(
        "Body", parent=styles["Normal"], fontName=body_font,
        fontSize=8, leading=10,
    )
    cell_style = ParagraphStyle(
        "Cell", parent=styles["Normal"], fontName=body_font,
        fontSize=7, leading=9,
    )
    header_cell_style = ParagraphStyle(
        "HeaderCell", parent=styles["Normal"], fontName=body_font,
        fontSize=7, leading=9, textColor=colors.white,
    )

    # Sort by Registration No (numeric portion)
    def reg_sort_key(s):
        m = re.search(r"(\d+)", s or "")
        return int(m.group(1)) if m else 0
    df = latest_flat.copy()
    df["_sort"] = df["Registration No"].apply(reg_sort_key)
    df = df.sort_values(["Section", "_sort"]).reset_index(drop=True)

    doc = SimpleDocTemplate(
        str(OUT_LATEST_PDF),
        pagesize=landscape(A4),
        leftMargin=12 * mm, rightMargin=12 * mm,
        topMargin=12 * mm, bottomMargin=12 * mm,
        title="Bangladesh Pesticide Database — Latest",
        author="PesticideNext / AgriChem-Guide",
    )

    story = []
    story.append(Paragraph("Bangladesh Registered Pesticide Database", title_style))
    story.append(Paragraph(
        f"Latest snapshot — {len(df):,} records ({df['Status'].eq('Active').sum():,} active, "
        f"{df['Status'].eq('Expired').sum():,} expired) — "
        f"Built {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}",
        subtitle_style,
    ))
    story.append(Paragraph(
        "Sources: Live pesticide-search API (ppw.krishi.gov.bd) + 86th & 87th PTAC gazettes + MoA mapping audit. "
        "Columns: Registration No, Section, Status, Common Name, Trade Name, Company, MoA Code, Policy Risk Tier.",
        subtitle_style,
    ))

    # Table per section
    sections = ["Pesticides", "Biopesticides", "Public Health", "Pesticides (Legacy)"]
    section_titles = {
        "Pesticides": "Synthetic Pesticides (AP-XXXX)",
        "Biopesticides": "Biopesticides (AP(Bio)-XXXX)",
        "Public Health": "Public Health Products (PHP-XXXX)",
        "Pesticides (Legacy)": "Legacy Records",
    }
    for sec in sections:
        sub = df[df["Section"] == sec]
        if sub.empty:
            continue
        story.append(PageBreak())
        story.append(Paragraph(f"{section_titles.get(sec, sec)} — {len(sub):,} records", section_style))
        # Build table data
        header = ["Reg No", "Status", "Common Name", "Trade Name", "Company", "MoA", "Risk"]
        data = [[Paragraph(h, header_cell_style) for h in header]]
        for _, r in sub.iterrows():
            data.append([
                Paragraph(str(r.get("Registration No", "")), cell_style),
                Paragraph(str(r.get("Status", "")), cell_style),
                Paragraph(str(r.get("Common Name", "") or "—")[:60], cell_style),
                Paragraph(str(r.get("Trade Name", "") or r.get("Brand Name", ""))[:50], cell_style),
                Paragraph(str(r.get("Company", ""))[:40], cell_style),
                Paragraph(str(r.get("MoA Code", "") or "—")[:20], cell_style),
                Paragraph(str(r.get("Policy Risk Tier", "") or "—"), cell_style),
            ])
        # Wrap in Table with column widths
        col_widths = [22 * mm, 18 * mm, 70 * mm, 60 * mm, 55 * mm, 20 * mm, 18 * mm]
        # Paginate: ReportLab will auto-split the table across pages
        table = Table(data, colWidths=col_widths, repeatRows=1)
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#006a4e")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f5f8f5")]),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 3),
            ("RIGHTPADDING", (0, 0), (-1, -1), 3),
            ("TOPPADDING", (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ]))
        story.append(table)

    doc.build(story)
    log(f"  Wrote {OUT_LATEST_PDF} ({OUT_LATEST_PDF.stat().st_size:,} bytes)")


# ----------------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------------
def main():
    log("=" * 70)
    log("Building latest pesticide database for AgriChem-Guide-Pest-Control-Database")
    log("=" * 70)

    # Load all sources
    live_df = load_live_db()
    g86, g87 = load_gazettes()
    audit_df = load_audit()
    existing_dae = load_existing_dae()
    existing_policy = load_existing_policy()
    # existing_master = load_existing_master()  # not needed for now

    # Load MoA reference XLSXs (for the XLSX deliverable)
    moa_enriched = pd.read_excel(MOA_ENRICHED_XLSX, sheet_name=0).fillna("")
    moa_rotation = pd.read_excel(MOA_ROTATION_XLSX, sheet_name=0).fillna("")

    # Build lookups
    gaz_lookup = build_gazette_lookup(g86, g87)
    audit_lookup = build_audit_lookup(audit_df)

    # Build latest flat database (8,959 rows)
    latest_flat = build_latest_flat(live_df, gaz_lookup, audit_lookup)

    # Save flat CSV deliverable
    log("Writing flat CSV deliverable...")
    latest_flat.to_csv(OUT_LATEST_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {OUT_LATEST_CSV} ({OUT_LATEST_CSV.stat().st_size:,} bytes)")

    # Also save MoA rotation reference as CSV
    moa_rotation.to_csv(OUT_MOA_ROTATION_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {OUT_MOA_ROTATION_CSV}")

    # Update repo data_raw CSVs (for the TS regen)
    update_policy_csv(latest_flat, existing_policy, audit_lookup)
    update_dae_csv(latest_flat, existing_dae, audit_lookup)

    # Build XLSX
    build_xlsx(latest_flat, audit_df, moa_rotation, moa_enriched)

    # Build PDF
    build_pdf(latest_flat)

    log("")
    log("=" * 70)
    log("DONE. Deliverables in /public/downloads/:")
    log(f"  - {OUT_LATEST_CSV.name}  ({OUT_LATEST_CSV.stat().st_size:,} bytes)")
    log(f"  - {OUT_LATEST_XLSX.name}  ({OUT_LATEST_XLSX.stat().st_size:,} bytes)")
    log(f"  - {OUT_LATEST_PDF.name}  ({OUT_LATEST_PDF.stat().st_size:,} bytes)")
    log(f"  - {OUT_MOA_ROTATION_CSV.name}  ({OUT_MOA_ROTATION_CSV.stat().st_size:,} bytes)")
    log("")
    log("Repo data_raw updates:")
    log(f"  - {OUT_DAE_CSV.name}  ({OUT_DAE_CSV.stat().st_size:,} bytes)")
    log(f"  - {OUT_POLICY_CSV.name}  ({OUT_POLICY_CSV.stat().st_size:,} bytes)")
    log("=" * 70)


if __name__ == "__main__":
    main()
