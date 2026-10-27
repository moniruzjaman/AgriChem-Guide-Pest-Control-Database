#!/usr/bin/env python3
"""
Generate the sidecar policy enrichment CSV and TypeScript module for the
PesticideNext repo. Reads our enriched 5,485-row CSV (built by
build_enhanced_database.py) and emits:

  1. data_raw/pesticide_policy_enrichment.csv
     - 14 policy/MoA/HHP columns keyed by Registration No + Trade Name
     - Used as the data source for the new policy fields on each product

  2. src/data/policyEnrichmentData.ts
     - Auto-generated TS module that exports POLICY_ENRICHMENT_BY_REG_NO:
       Record<string, PolicyEnrichment>
     - Keys are normalized Registration No strings (uppercase, trimmed)
     - Multiple products sharing a reg no: first-write-wins (deterministic)
"""

import csv
import sys
from pathlib import Path

REPO_ROOT = Path("/home/z/my-project/AgriChem-Guide-Pest-Control-Database")
SOURCE_CSV = Path("/home/z/my-project/download/cleaned_database_enriched.csv")
OUT_CSV = REPO_ROOT / "data_raw" / "pesticide_policy_enrichment.csv"
OUT_TS = REPO_ROOT / "src" / "data" / "policyEnrichmentData.ts"

POLICY_COLUMNS = [
    "Scheme",
    "Group No.",
    "MoA Description",
    "Target Site",
    "HHP Status (WHO/FAO)",
    "Hazardous Active(s) Matched",
    "HHP Criteria Met",
    "EU / Global Regulatory Status",
    "Bangladesh Policy Action",
    "Policy Risk Tier",
    "Formulation Code",
    "Formulation Type (Physicality)",
    "Physical Form",
    "Co-formulant / Inert Concern",
]


def to_ts_string_literal(s):
    if s is None:
        return "null"
    # Treat pandas NaN, "nan", "NaN", and empty strings as null
    if isinstance(s, float) and s != s:  # NaN check
        return "null"
    s = str(s)
    if s.strip().lower() in ("nan", "na", "none", "null", ""):
        return "null"
    s = s.replace("\\", "\\\\")
    s = s.replace('"', '\\"')
    s = s.replace("\n", "\\n")
    s = s.replace("\r", "")
    return f'"{s}"'


def normalize_reg_no(s):
    if s is None or str(s).strip() == "":
        return ""
    return str(s).strip().upper()


def main():
    if not SOURCE_CSV.exists():
        print(f"ERROR: Source CSV not found: {SOURCE_CSV}", file=sys.stderr)
        return 1

    import pandas as pd
    df = pd.read_csv(SOURCE_CSV)
    print(f"Loaded source: {df.shape[0]:,} rows × {df.shape[1]} cols")

    # Build the sidecar CSV
    out_csv_cols = ["Registration No", "Trade Name"] + POLICY_COLUMNS
    out_csv_rows = []
    for _, row in df.iterrows():
        out_csv_rows.append({
            "Registration No": row.get("Registration No", ""),
            "Trade Name": row.get("Trade Name", ""),
            **{c: row.get(c, "") for c in POLICY_COLUMNS},
        })

    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=out_csv_cols)
        writer.writeheader()
        writer.writerows(out_csv_rows)
    print(f"✓ Wrote {OUT_CSV}  ({len(out_csv_rows):,} rows × {len(out_csv_cols)} cols)")

    # Build the TS module
    # Build a map: normalized reg no -> first-seen enrichment record
    # (For multi-product reg nos, the policy data is the same — it's per-AI, not per-brand.)
    by_reg_no = {}
    for row in out_csv_rows:
        key = normalize_reg_no(row["Registration No"])
        if not key or key in by_reg_no:
            continue
        by_reg_no[key] = row

    print(f"Unique reg nos for TS index: {len(by_reg_no):,}")

    ts_lines = []
    ts_lines.append("/**")
    ts_lines.append(" * policyEnrichmentData.ts — Auto-generated sidecar policy/HHP/MoA enrichment")
    ts_lines.append(" * ====================================================================")
    ts_lines.append(" * Source: data_raw/pesticide_policy_enrichment.csv")
    ts_lines.append(" * Generated from the AgriChem/MoA PTAC master database (5,485 rows × 31 cols).")
    ts_lines.append(" *")
    ts_lines.append(" * Each record is keyed by normalized Registration No (uppercase, trimmed)")
    ts_lines.append(" * and carries the 14 policy / HHP / MoA / formulation safety attributes")
    ts_lines.append(" * that were missing from the original 13-column DAE CSV.")
    ts_lines.append(" *")
    ts_lines.append(" * DO NOT EDIT BY HAND. Re-run scripts/generate_policy_enrichment.py to")
    ts_lines.append(" * regenerate from data_raw/pesticide_policy_enrichment.csv.")
    ts_lines.append(" */")
    ts_lines.append("")
    ts_lines.append("export interface PolicyEnrichment {")
    ts_lines.append("  /** IRAC / FRAC / HRAC scheme tag. */")
    ts_lines.append('  scheme: string | null;')
    ts_lines.append("  /** MoA group number within the scheme (e.g. \"1B\", \"11\"). */")
    ts_lines.append('  groupNo: string | null;')
    ts_lines.append("  /** Human-readable MoA description. */")
    ts_lines.append('  moaDescription: string | null;')
    ts_lines.append("  /** Target site of action. */")
    ts_lines.append('  targetSite: string | null;')
    ts_lines.append("  /** WHO/FAO Highly Hazardous Pesticide (HHP) status. */")
    ts_lines.append('  hhpStatus: string | null;')
    ts_lines.append("  /** Active ingredient(s) that triggered HHP classification, if any. */")
    ts_lines.append('  hazardousActivesMatched: string | null;')
    ts_lines.append("  /** Whether the product meets HHP criteria (\"YES — HHP\" / \"No — ...\"). */")
    ts_lines.append('  hhpCriteriaMet: string | null;')
    ts_lines.append("  /** EU / global regulatory status (banned, restricted, approved, etc.). */")
    ts_lines.append('  euGlobalRegulatoryStatus: string | null;')
    ts_lines.append("  /** Bangladesh-specific policy action (phase-out, restrict, monitor, etc.). */")
    ts_lines.append('  bangladeshPolicyAction: string | null;')
    ts_lines.append("  /** Policy risk tier: GREEN (safe) | AMBER (caution) | RED (ban/restrict). */")
    ts_lines.append('  policyRiskTier: string | null;')
    ts_lines.append("  /** Short formulation code (EC, WP, SC, etc.). */")
    ts_lines.append('  formulationCode: string | null;')
    ts_lines.append("  /** Physicality of the formulation (liquid, solid, etc.). */")
    ts_lines.append('  formulationTypePhysicality: string | null;')
    ts_lines.append("  /** Free-text physical form description. */")
    ts_lines.append('  physicalForm: string | null;')
    ts_lines.append("  /** Co-formulant / inert concern flags. */")
    ts_lines.append('  coFormulantInertConcern: string | null;')
    ts_lines.append("}")
    ts_lines.append("")
    ts_lines.append("export const POLICY_ENRICHMENT_BY_REG_NO: Record<string, PolicyEnrichment> = {")
    for key, row in by_reg_no.items():
        ts_lines.append(f"  {to_ts_string_literal(key)}: {{")
        ts_lines.append(f"    scheme: {to_ts_string_literal(row.get('Scheme'))},")
        ts_lines.append(f"    groupNo: {to_ts_string_literal(row.get('Group No.'))},")
        ts_lines.append(f"    moaDescription: {to_ts_string_literal(row.get('MoA Description'))},")
        ts_lines.append(f"    targetSite: {to_ts_string_literal(row.get('Target Site'))},")
        ts_lines.append(f"    hhpStatus: {to_ts_string_literal(row.get('HHP Status (WHO/FAO)'))},")
        ts_lines.append(f"    hazardousActivesMatched: {to_ts_string_literal(row.get('Hazardous Active(s) Matched'))},")
        ts_lines.append(f"    hhpCriteriaMet: {to_ts_string_literal(row.get('HHP Criteria Met'))},")
        ts_lines.append(f"    euGlobalRegulatoryStatus: {to_ts_string_literal(row.get('EU / Global Regulatory Status'))},")
        ts_lines.append(f"    bangladeshPolicyAction: {to_ts_string_literal(row.get('Bangladesh Policy Action'))},")
        ts_lines.append(f"    policyRiskTier: {to_ts_string_literal(row.get('Policy Risk Tier'))},")
        ts_lines.append(f"    formulationCode: {to_ts_string_literal(row.get('Formulation Code'))},")
        ts_lines.append(f"    formulationTypePhysicality: {to_ts_string_literal(row.get('Formulation Type (Physicality)'))},")
        ts_lines.append(f"    physicalForm: {to_ts_string_literal(row.get('Physical Form'))},")
        ts_lines.append(f"    coFormulantInertConcern: {to_ts_string_literal(row.get('Co-formulant / Inert Concern'))},")
        ts_lines.append("  },")
    ts_lines.append("};")
    ts_lines.append("")
    ts_lines.append("/** Convenience lookup helper. */")
    ts_lines.append("export function getPolicyEnrichment(registrationNo: string | null | undefined): PolicyEnrichment | null {")
    ts_lines.append("  if (!registrationNo) return null;")
    ts_lines.append("  const key = registrationNo.trim().toUpperCase();")
    ts_lines.append("  return POLICY_ENRICHMENT_BY_REG_NO[key] ?? null;")
    ts_lines.append("}")
    ts_lines.append("")

    OUT_TS.write_text("\n".join(ts_lines), encoding="utf-8")
    print(f"✓ Wrote {OUT_TS}  ({len(ts_lines):,} lines, {OUT_TS.stat().st_size:,} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
