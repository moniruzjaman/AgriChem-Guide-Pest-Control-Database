#!/usr/bin/env python3
"""
validate_registry.py — Task 9: registry data-quality validation pipeline.

Validates data_raw/all_pesticides.csv (the DAE register source) AND the
runtime database JSON it feeds, then writes a reproducible validation
report + import metadata manifest:

  public/downloads/registry_validation_report.json   (machine + UI readable)
  public/downloads/registry_import_meta.json         (provenance manifest)

Checks (directive Task 9):
  - duplicate records
  - missing registration numbers
  - invalid registration numbers (format noise)
  - missing active ingredient / common name
  - missing crop registrations
  - missing target registrations
  - invalid/missing dosage
  - missing MoA code
  - import errors (row parse failures)

The manifest records source path, row counts, sha256 checksum, generation
date and validation statistics, so the app can display data provenance
without parsing the raw CSV at runtime.

Usage:
  python3 scripts/validate_registry.py            # validate + write outputs
  python3 scripts/validate_registry.py --check    # exit 1 if error rate worse than thresholds
"""

import csv
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "data_raw" / "all_pesticides.csv"
RUNTIME_JSON = ROOT / "public" / "downloads" / "pesticide_database.json"
REPORT_PATH = ROOT / "public" / "downloads" / "registry_validation_report.json"
META_PATH = ROOT / "public" / "downloads" / "registry_import_meta.json"

# Registration number pattern: prefix letters (AP, AP (BIO), etc.), dash, digits.
REG_NO_RE = re.compile(r"^[A-Z]{1,4}\s*\(?[A-Z]{0,4}\)?\s*-\s*\d+$", re.IGNORECASE)

# Quality thresholds for --check mode (fractions of total rows).
MAX_MISSING_REGNO = 0.001   # <0.1% rows may lack a registration number
MAX_INVALID_REGNO = 0.002
MAX_MISSING_AI = 0.20       # DAE register commonly lacks AI on combination rows


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def parse_rows():
    """Parse the CSV with the stdlib csv module (handles quoted multi-line)."""
    rows = []
    errors = []
    with open(CSV_PATH, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames or []
        for i, row in enumerate(reader, start=2):  # header is line 1
            if not any((v or "").strip() for v in row.values()):
                continue  # skip blank lines
            # CSV column names (13): see audit §4.
            if "Registration No" not in row or "Brand Name" not in row:
                errors.append({"line": i, "error": "missing expected columns"})
                continue
            rows.append((i, row))
    return headers, rows, errors


def validate(rows, parse_errors):
    stats = {
        "totalRecords": len(rows),
        "duplicates": [],          # [{regNo, count, lines}]
        "missingRegistrationNo": [],
        "invalidRegistrationNo": [],
        "missingActiveIngredient": [],
        "missingCrops": [],
        "missingTargetPests": [],
        "missingDosage": [],
        "invalidDosage": [],
        "missingMoa": [],
        "importErrors": parse_errors,
    }
    seen = {}
    for line, row in rows:
        reg_no = (row.get("Registration No") or "").strip()
        brand = (row.get("Brand Name") or "").strip()
        common = (row.get("Common Name") or "").strip()
        crops = (row.get("Recommended Crops") or "").strip()
        pests = (row.get("Recommended Pests") or "").strip()
        dosage = (row.get("Dosage Rate") or "").strip()
        moa = (row.get("MoA Code") or "").strip()

        key = reg_no.upper().replace(" ", "") if reg_no else None
        if key:
            if key in seen:
                seen[key]["count"] += 1
                seen[key]["lines"].append(line)
            else:
                seen[key] = {"regNo": reg_no, "count": 1, "lines": [line]}
        else:
            stats["missingRegistrationNo"].append({"line": line, "brand": brand})

        if reg_no and not REG_NO_RE.match(reg_no):
            stats["invalidRegistrationNo"].append({"line": line, "regNo": reg_no})

        if not common:
            stats["missingActiveIngredient"].append({"line": line, "brand": brand})
        if not crops:
            stats["missingCrops"].append({"line": line, "brand": brand})
        if not pests:
            stats["missingTargetPests"].append({"line": line, "brand": brand})
        if not dosage:
            stats["missingDosage"].append({"line": line, "brand": brand})
        elif not re.search(r"\d", dosage):
            stats["invalidDosage"].append({"line": line, "brand": brand, "dosage": dosage})
        if not moa:
            stats["missingMoa"].append({"line": line, "brand": brand})

    stats["duplicates"] = [v for v in seen.values() if v["count"] > 1]
    return stats


def counts_of(stats):
    return {
        "totalRecords": stats["totalRecords"],
        "duplicateRegNoGroups": len(stats["duplicates"]),
        "duplicateRegNoRows": sum(d["count"] - 1 for d in stats["duplicates"]),
        "missingRegistrationNo": len(stats["missingRegistrationNo"]),
        "invalidRegistrationNo": len(stats["invalidRegistrationNo"]),
        "missingActiveIngredient": len(stats["missingActiveIngredient"]),
        "missingCrops": len(stats["missingCrops"]),
        "missingTargetPests": len(stats["missingTargetPests"]),
        "missingDosage": len(stats["missingDosage"]),
        "invalidDosage": len(stats["invalidDosage"]),
        "missingMoa": len(stats["missingMoa"]),
        "importErrors": len(stats["importErrors"]),
    }


def main():
    check_mode = "--check" in sys.argv

    if not CSV_PATH.exists():
        print(f"ERROR: {CSV_PATH} not found", file=sys.stderr)
        sys.exit(2)

    headers, rows, parse_errors = parse_rows()
    stats = validate(rows, parse_errors)
    counts = counts_of(stats)

    now = datetime.now(timezone.utc).isoformat()

    report = {
        "schemaVersion": 1,
        "generatedAt": now,
        "source": {
            "file": "data_raw/all_pesticides.csv",
            "sha256": sha256_of(CSV_PATH),
            "sizeBytes": CSV_PATH.stat().st_size,
            "headers": headers,
            "encoding": "utf-8-sig (BOM tolerated)",
        },
        "counts": counts,
        # Full detail lists capped so the report stays small enough to fetch.
        "details": {
            "duplicates": stats["duplicates"][:50],
            "missingRegistrationNo": stats["missingRegistrationNo"][:20],
            "invalidRegistrationNo": stats["invalidRegistrationNo"][:50],
            "importErrors": stats["importErrors"][:20],
        },
        "notes": [
            "PHI/REI are NOT present in the DAE CSV — they come from the curated overlay only.",
            "Missing crops/pests (~50%) means those products cannot pass crop/target eligibility verification.",
            "Missing MoA (~32%) limits resistance stewardship for those products.",
            "This report is generated at data-build time; the app reads it, never parses the CSV at runtime.",
        ],
    }

    # Runtime JSON stats (if present) for the manifest.
    runtime = None
    if RUNTIME_JSON.exists():
        try:
            with open(RUNTIME_JSON, encoding="utf-8") as f:
                db = json.load(f)
            products = db if isinstance(db, list) else db.get("products", [])
            runtime = {
                "file": "public/downloads/pesticide_database.json",
                "sha256": sha256_of(RUNTIME_JSON),
                "sizeBytes": RUNTIME_JSON.stat().st_size,
                "productCount": len(products),
                "missingMoa": sum(1 for p in products if not (p.get("moaCode") or "").strip()),
                "emptyCrops": sum(1 for p in products if not p.get("crops")),
                "emptyPests": sum(1 for p in products if not p.get("pests")),
            }
        except (json.JSONDecodeError, OSError) as e:
            runtime = {"file": str(RUNTIME_JSON), "error": str(e)}

    meta = {
        "schemaVersion": 1,
        "generatedAt": now,
        "source": report["source"],
        "runtimeDatabase": runtime,
        "validationCounts": counts,
        "generator": "scripts/validate_registry.py",
        "docs": "docs/protection-integration-audit.md",
    }

    if not check_mode:
        REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
        REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        META_PATH.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"CSV records:        {counts['totalRecords']}")
    print(f"Duplicate regNo:    {counts['duplicateRegNoGroups']} groups ({counts['duplicateRegNoRows']} extra rows)")
    print(f"Missing regNo:      {counts['missingRegistrationNo']}")
    print(f"Invalid regNo:      {counts['invalidRegistrationNo']}")
    print(f"Missing AI:         {counts['missingActiveIngredient']}")
    print(f"Missing crops:      {counts['missingCrops']}")
    print(f"Missing pests:      {counts['missingTargetPests']}")
    print(f"Missing dosage:     {counts['missingDosage']}")
    print(f"Invalid dosage:     {counts['invalidDosage']}")
    print(f"Missing MoA:        {counts['missingMoa']}")
    print(f"Import errors:      {counts['importErrors']}")
    if runtime:
        print(f"Runtime JSON:       {runtime.get('productCount', '?')} products"
              f" (missing MoA: {runtime.get('missingMoa', '?')},"
              f" empty crops: {runtime.get('emptyCrops', '?')})")
    if not check_mode:
        print(f"\nWrote {REPORT_PATH.relative_to(ROOT)}")
        print(f"Wrote {META_PATH.relative_to(ROOT)}")

    if check_mode:
        total = max(1, counts["totalRecords"])
        problems = []
        if counts["missingRegistrationNo"] / total > MAX_MISSING_REGNO:
            problems.append("missing registration numbers above threshold")
        if counts["invalidRegistrationNo"] / total > MAX_INVALID_REGNO:
            problems.append("invalid registration numbers above threshold")
        if counts["missingActiveIngredient"] / total > MAX_MISSING_AI:
            problems.append("missing active ingredient above threshold")
        if counts["importErrors"] > 0:
            problems.append("import errors present")
        if problems:
            print("\nCHECK FAILED: " + "; ".join(problems), file=sys.stderr)
            sys.exit(1)
        print("\nCheck passed.")


if __name__ == "__main__":
    main()
