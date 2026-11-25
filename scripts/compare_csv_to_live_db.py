#!/usr/bin/env python3
"""Compare attached CSV authentic source against live pesticide_database.json.

Usage:
  python scripts/compare_csv_to_live_db.py \
      --csv /tmp/attachments/.../997e88b6-ba83-49b5-be3e-8c147c4141ee.csv \
      --json public/downloads/pesticide_database.json \
      --out /artifacts/diff_report.json
"""
import argparse, csv, json, re, os

def norm_reg(raw):
    return (raw or "").strip().upper().replace(" ", "").replace("--", "-")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True)
    ap.add_argument("--json", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    with open(args.json, encoding="utf-8") as f:
        db = json.load(f)
    db_by_reg = {}
    for p in db:
        key = norm_reg(p.get("registrationNo"))
        if key and key not in db_by_reg:
            db_by_reg[key] = p

    missing_ap = []
    field_gaps = []
    matched = 0
    with open(args.csv, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            ap_raw = row.get("App/Php/Ap Bio") or ""
            key = norm_reg(ap_raw)
            if not key:
                continue
            if key not in db_by_reg:
                missing_ap.append({
                    "ap": ap_raw.strip(),
                    "company": row.get("Company Name"),
                    "brand": row.get("Brand name"),
                    "active": row.get("Active Ingredient Concentration (%)"),
                    "phi": row.get("PHI"),
                    "expiry": row.get("Expire Date"),
                    "crop": row.get("Crop"),
                    "pest": row.get("Pest"),
                    "rate": row.get("Rate of Application"),
                })
                continue
            matched += 1
            p = db_by_reg[key]
            gaps = {}
            # active ingredients
            db_actives = [a.lower() for a in (p.get("activeIngredients") or [])]
            csv_active = (row.get("Active Ingredient Concentration (%)") or "").strip()
            if csv_active and not db_actives:
                gaps["activeIngredients"] = csv_active
            # trade name
            if (row.get("Brand name") or "").strip() and not (p.get("tradeName") or "").strip():
                gaps["tradeName"] = row.get("Brand name").strip()
            # holder/company
            if (row.get("Company Name") or "").strip() and not (p.get("registrationHolder") or "").strip():
                gaps["registrationHolder"] = row.get("Company Name").strip()
            # crops
            csv_crops = [c.strip() for c in (row.get("Crop") or "").split(",") if c.strip()]
            if csv_crops and not (p.get("crops") or []):
                gaps["crops"] = csv_crops
            # pests
            csv_pests = [x.strip() for x in (row.get("Pest") or "").split(",") if x.strip()]
            if csv_pests and not (p.get("pests") or []):
                gaps["pests"] = csv_pests
            # dosage rate
            if (row.get("Rate of Application") or "").strip() and not (p.get("dosageRate") or "").strip():
                gaps["dosageRate"] = row.get("Rate of Application").strip()
            if gaps:
                field_gaps.append({"ap": ap_raw.strip(), "gaps": gaps})

    report = {
        "db_count": len(db),
        "db_unique_reg": len(db_by_reg),
        "csv_rows": sum(1 for _ in open(args.csv, encoding="utf-8")) - 1,
        "matched": matched,
        "missing_ap_count": len(missing_ap),
        "field_gap_count": len(field_gaps),
        "missing_ap": missing_ap,
        "field_gaps": field_gaps,
    }
    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"matched={matched} missing={len(missing_ap)} gaps={len(field_gaps)}")

if __name__ == "__main__":
    main()
