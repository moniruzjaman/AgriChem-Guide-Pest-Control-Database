#!/usr/bin/env python3
"""
generate_runtime_json.py
========================

Generates a pre-computed JSON file that contains the fully-transformed
ChemicalProduct[] array — the same data that allPesticidesData.ts produces
at module load time, but as a JSON file that can be fetched at runtime
instead of bundled inline in the JS.

This replaces the 7.1 MB allPesticidesData JS chunk with a ~5 MB JSON
fetch (~1.5 MB gzipped), dramatically reducing the initial bundle size.

Output:
  public/downloads/pesticide_database.json — the runtime database
"""

import csv
import json
import re
import os
from pathlib import Path
import pandas as pd

REPO = Path(__file__).resolve().parent.parent
DAE_CSV = REPO / "data_raw" / "all_pesticides.csv"
POLICY_CSV = REPO / "data_raw" / "pesticide_policy_enrichment.csv"
OUT_JSON = REPO / "public" / "downloads" / "pesticide_database.json"


def log(msg: str) -> None:
    print(f"[json-gen] {msg}", flush=True)


def normalize_reg_no(s) -> str:
    if s is None or pd.isna(s):
        return ""
    s = str(s).strip().upper()
    s = re.sub(r"-\s+", "-", s)
    s = re.sub(r"^AP-BIO-", "AP(Bio)-", s, flags=re.IGNORECASE)
    m = re.match(r"^([A-Za-z()]+-)(\d+)$", s)
    if m:
        prefix, num = m.group(1).upper(), m.group(2)
        if prefix == "AP(BIO)-":
            prefix = "AP(Bio)-"
        s = prefix + num
    return s


# ChemicalType mapping (same as allPesticidesData.ts)
PESTICIDE_TYPE_MAP = {
    "Insecticide": "Insecticide",
    "Fungicide": "Fungicide",
    "Herbicide": "Herbicide",
    "Miticide": "Miticide",
    "Public Health": "Public Health",
    "Store Grain Insecticide": "Store Grain Insecticide",
    "Bio Pesticide": "Bio Pesticide",
    "Rodenticide": "Rodenticide",
}

WHO_COLOR = {
    "Ia - Extremely Hazardous": "#dc2626",
    "Ib - Highly Hazardous": "#dc2626",
    "II - Moderately Hazardous": "#eab308",
    "III - Slightly Hazardous": "#3b82f6",
    "U - Unlikely to Present Hazard": "#10b981",
}


def main():
    log("Loading DAE register...")
    dae = pd.read_csv(DAE_CSV, dtype=str).fillna("")
    dae["Registration No"] = dae["Registration No"].apply(normalize_reg_no)
    log(f"  DAE: {len(dae):,} rows")

    log("Loading policy enrichment...")
    policy = pd.read_csv(POLICY_CSV, dtype=str).fillna("")
    policy["Registration No"] = policy["Registration No"].apply(normalize_reg_no)
    log(f"  Policy: {len(policy):,} rows")

    # Build policy lookup by reg#
    policy_by_reg = {}
    for _, r in policy.iterrows():
        reg = r["Registration No"].strip()
        if reg and reg not in policy_by_reg:
            policy_by_reg[reg] = {
                "scheme": r.get("Scheme", ""),
                "groupNo": r.get("Group No.", ""),
                "moaDescription": r.get("MoA Description", ""),
                "targetSite": r.get("Target Site", ""),
                "hhpStatus": r.get("HHP Status (WHO/FAO)", ""),
                "hazardousActivesMatched": r.get("Hazardous Active(s) Matched", ""),
                "hhpCriteriaMet": r.get("HHP Criteria Met", ""),
                "euGlobalRegulatoryStatus": r.get("EU / Global Regulatory Status", ""),
                "bangladeshPolicyAction": r.get("Bangladesh Policy Action", ""),
                "policyRiskTier": r.get("Policy Risk Tier", ""),
                "formulationCode": r.get("Formulation Code", ""),
                "formulationTypePhysicality": r.get("Formulation Type (Physicality)", ""),
                "physicalForm": r.get("Physical Form", ""),
                "coFormulantInertConcern": r.get("Co-formulant / Inert Concern", ""),
            }
    log(f"  Policy lookup: {len(policy_by_reg):,} unique reg#s")

    # Transform DAE rows into ChemicalProduct-like objects
    log("Transforming products...")
    products = []
    seen_keys = set()  # dedup by reg# + tradeName

    for _, row in dae.iterrows():
        reg = row["Registration No"].strip()
        if not reg:
            continue

        pest_type = row.get("Pesticide Type", "").strip()
        chemical_type = PESTICIDE_TYPE_MAP.get(pest_type, "Insecticide")
        common_name = row.get("Common Name", "").strip()
        brand_name = row.get("Brand Name", "").strip()
        trade_name = brand_name  # In the DAE register, Brand Name = Trade Name
        reg_holder = row.get("Registration Holder", "").strip()

        # Parse crops/pests
        crops_raw = row.get("Recommended Crops", "").strip()
        pests_raw = row.get("Recommended Pests", "").strip()
        crops = [c.strip() for c in crops_raw.split(",") if c.strip()] if crops_raw else []
        pests = [p.strip() for p in pests_raw.split(",") if p.strip()] if pests_raw else []

        # Parse recommendations (multi-line field)
        recommendations_raw = row.get("Recommendations (Crop | Pest | Dosage)", "").strip()
        recommendation_lines = [l.strip() for l in recommendations_raw.split("\n") if l.strip()] if recommendations_raw else []

        # Dosage
        dosage_rate = row.get("Dosage Rate", "").strip()

        # MoA
        moa_code = row.get("MoA Code", "").strip() or None

        # No. of recommendations
        try:
            no_of_recs = int(row.get("No. of Recommendations", "0") or "0")
        except ValueError:
            no_of_recs = 0

        # SL numbers
        try:
            sl_common = int(row.get("SL No (Common Name)", "0") or "0")
        except ValueError:
            sl_common = 0
        try:
            sl_product = int(row.get("SL No (Products)", "0") or "0")
        except ValueError:
            sl_product = 0

        # Active ingredients (parsed from common name)
        active_ingredients = []
        if common_name:
            parts = re.split(r"\s*\+\s*", common_name)
            for part in parts:
                ai = re.sub(r"\s*\([^)]*\)", "", part).strip()
                ai = re.sub(r"\s*\d+\.?\d*\s*%?", "", ai).strip()
                if ai and ai not in active_ingredients:
                    active_ingredients.append(ai)

        # Dedup key
        dedup_key = f"{reg.lower()}|{trade_name.lower()}"
        if dedup_key in seen_keys:
            # Merge recommendations
            for existing in products:
                if f"{existing['registrationNo'].lower()}|{existing['tradeName'].lower()}" == dedup_key:
                    if recommendation_lines:
                        existing.setdefault("recommendations", []).extend(recommendation_lines)
                    break
            continue
        seen_keys.add(dedup_key)

        # Policy enrichment
        pol = policy_by_reg.get(reg, {})

        # Build the product object (matching ChemicalProduct interface)
        product = {
            "id": f"{chemical_type.lower()[:4]}-{reg.replace('-', '')}-{len(products)+1:04d}",
            "type": chemical_type,
            "commonName": common_name,
            "activeIngredients": active_ingredients,
            "tradeName": trade_name,
            "registrationNo": reg,
            "registrationHolder": reg_holder,
            "crops": crops,
            "pests": pests,
            "dosageRate": dosage_rate,
            "moaCode": moa_code,
            "recommendations": recommendation_lines if recommendation_lines else None,
            "source": "dae-register",
            # Policy enrichment
            "scheme": pol.get("scheme") or None,
            "groupNo": pol.get("groupNo") or None,
            "moaDescription": pol.get("moaDescription") or None,
            "targetSite": pol.get("targetSite") or None,
            "hhpStatus": pol.get("hhpStatus") or None,
            "hazardousActivesMatched": pol.get("hazardousActivesMatched") or None,
            "euGlobalRegulatoryStatus": pol.get("euGlobalRegulatoryStatus") or None,
            "bangladeshPolicyAction": pol.get("bangladeshPolicyAction") or None,
            "policyRiskTier": pol.get("policyRiskTier") or None,
            "formulationCode": pol.get("formulationCode") or None,
            "formulationTypePhysicality": pol.get("formulationTypePhysicality") or None,
            "physicalForm": pol.get("physicalForm") or None,
            "coFormulantInertConcern": pol.get("coFormulantInertConcern") or None,
        }

        products.append(product)

    log(f"  Transformed: {len(products):,} unique products (deduped by reg# + tradeName)")

    # Write JSON
    log(f"Writing JSON to {OUT_JSON}...")
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, separators=(",", ":"))
    log(f"  Wrote {OUT_JSON} ({OUT_JSON.stat().st_size:,} bytes)")
    log(f"  Gzipped estimate: ~{OUT_JSON.stat().st_size // 1024 // 3:,} KB")

    log("DONE.")


if __name__ == "__main__":
    main()
