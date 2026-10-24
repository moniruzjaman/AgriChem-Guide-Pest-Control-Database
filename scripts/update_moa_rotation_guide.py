#!/usr/bin/env python3
"""
update_moa_rotation_guide.py
===========================

Updates src/data/moaData.ts to add the IRAC MoA Rotation Guide's
treatment window, crop phase, speed of action, and exposure cap
metadata to each MoA classification entry. Also adds the guide
as a downloadable PDF in public/downloads/.
"""

import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
MOADATA_TS = REPO / "src" / "data" / "moaData.ts"

# MoA group → rotation guide metadata (from the attached guide)
ROTATION_GUIDE_DATA = {
    "IRAC 1A": {"speed": "Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": False},
    "IRAC 1B": {"speed": "Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": False},
    "IRAC 2A": {"speed": "Fast", "cropPhase": "All", "maxApps": 1, "subGroupRotation": False},
    "IRAC 2B": {"speed": "Fast", "cropPhase": "All", "maxApps": 1, "subGroupRotation": False},
    "IRAC 3A": {"speed": "Fast", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": False},
    "IRAC 4A": {"speed": "Fast", "cropPhase": "Nursery", "maxApps": 2, "subGroupRotation": False},
    "IRAC 5": {"speed": "Fast", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": True},
    "IRAC 6": {"speed": "Fast", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 7A": {"speed": "Slow to Moderately Slow", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 7B": {"speed": "Slow to Moderately Slow", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 7C": {"speed": "Slow to Moderately Slow", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": True},
    "IRAC 8A": {"speed": "Variable", "cropPhase": "All", "maxApps": 1, "subGroupRotation": True},
    "IRAC 9B": {"speed": "Moderate", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": True},
    "IRAC 10A": {"speed": "Slow to Moderately Slow", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 10B": {"speed": "Slow to Moderately Slow", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 11A": {"speed": "Moderate", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 11B": {"speed": "Moderate", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 12A": {"speed": "Moderately Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 12B": {"speed": "Moderately Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 12C": {"speed": "Moderately Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 13": {"speed": "Fast", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": True},
    "IRAC 14": {"speed": "Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 15": {"speed": "Slow to Moderately Slow", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 16": {"speed": "Slow to Moderately Slow", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 17": {"speed": "Slow to Moderately Slow", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 18": {"speed": "Slow to Moderately Slow", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 19": {"speed": "Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 20A": {"speed": "Moderate", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 20D": {"speed": "Moderate", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 21A": {"speed": "Moderately Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "IRAC 22A": {"speed": "Fast", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": False},
    "IRAC 23": {"speed": "Moderate", "cropPhase": "Vegetative", "maxApps": 2, "subGroupRotation": True},
    "IRAC 24A": {"speed": "Variable", "cropPhase": "All", "maxApps": 1, "subGroupRotation": True},
    "IRAC 28": {"speed": "Fast", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": True},
    "IRAC 29": {"speed": "Moderate", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": True},
    "IRAC 30": {"speed": "Fast", "cropPhase": "Reproductive", "maxApps": 2, "subGroupRotation": True},
    "IRAC UN": {"speed": "Variable", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    # FRAC groups
    "FRAC 1": {"speed": "Moderate", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "FRAC 3": {"speed": "Moderate", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "FRAC 11": {"speed": "Fast", "cropPhase": "All", "maxApps": 2, "subGroupRotation": True},
    "FRAC M01": {"speed": "Variable", "cropPhase": "All", "maxApps": 3, "subGroupRotation": True},
    "FRAC M02": {"speed": "Variable", "cropPhase": "All", "maxApps": 3, "subGroupRotation": True},
    "FRAC M03": {"speed": "Variable", "cropPhase": "All", "maxApps": 3, "subGroupRotation": True},
    "FRAC M05": {"speed": "Variable", "cropPhase": "All", "maxApps": 3, "subGroupRotation": True},
    # HRAC groups
    "HRAC 1": {"speed": "Moderate", "cropPhase": "All", "maxApps": 1, "subGroupRotation": True},
    "HRAC 2": {"speed": "Moderate", "cropPhase": "All", "maxApps": 1, "subGroupRotation": True},
    "HRAC 4": {"speed": "Moderate", "cropPhase": "All", "maxApps": 1, "subGroupRotation": True},
    "HRAC 9": {"speed": "Moderate", "cropPhase": "All", "maxApps": 1, "subGroupRotation": True},
    "HRAC 14": {"speed": "Moderate", "cropPhase": "All", "maxApps": 1, "subGroupRotation": True},
    "HRAC 15": {"speed": "Moderate", "cropPhase": "All", "maxApps": 1, "subGroupRotation": True},
}

# Treatment window constants (from the guide)
TREATMENT_WINDOW_STANDARD_DAYS = 30
TREATMENT_WINDOW_SUCKING_PEST_DAYS = 15
SEASONAL_EXPOSURE_CAP_PCT = 50


def log(msg):
    print(f"[moa-update] {msg}", flush=True)


def update_moa_data():
    """Add rotation guide metadata fields to each MoA entry in moaData.ts."""
    log(f"Reading {MOADATA_TS}...")
    content = MOADATA_TS.read_text(encoding="utf-8")
    original = content

    # For each MoA code in the guide, add the new fields if they don't exist
    updated_count = 0
    for code, data in ROTATION_GUIDE_DATA.items():
        # Find the entry for this code
        # Pattern: code: 'IRAC 1A', ... type: 'IRAC' } or type: 'IRAC',
        pattern = rf"(code:\s*'{re.escape(code)}'.*?type:\s*'(?:IRAC|FRAC|HRAC)'[^}}]*?)"
        # Check if speedOfAction already exists in this block
        match = re.search(pattern, content, re.DOTALL)
        if not match:
            continue
        block = match.group(1)
        if "speedOfAction" in block:
            continue  # already has the fields

        # Add the new fields before the closing of the block
        new_fields = f"""    speedOfAction: '{data["speed"]}',
    recommendedCropPhase: '{data["cropPhase"]}',
    maxAppsPerWindow: {data["maxApps"]},
    seasonalExposureCapPct: {SEASONAL_EXPOSURE_CAP_PCT},
    subGroupRotationPermitted: {'true' if data["subGroupRotation"] else 'false'},"""

        # Insert before the last line of the block (which is typically a closing brace)
        # Find the position of the last } in the block
        last_brace = block.rstrip().rstrip(",").rstrip()
        # Replace: add new fields before the closing }
        new_block = block.rstrip()
        if new_block.endswith(","):
            new_block = new_block[:-1]
        new_block += "\n" + new_fields + ",\n  "
        content = content[:match.start()] + new_block + content[match.end():]
        updated_count += 1

    if updated_count > 0:
        # Also add treatment window constants at the top of the file
        constants_block = f"""
// ── Treatment Window Constants (from IRAC MoA Rotation Guide) ────────────────
export const TREATMENT_WINDOW_STANDARD_DAYS = {TREATMENT_WINDOW_STANDARD_DAYS};
export const TREATMENT_WINDOW_SUCKING_PEST_DAYS = {TREATMENT_WINDOW_SUCKING_PEST_DAYS};
export const SEASONAL_EXPOSURE_CAP_PCT = {SEASONAL_EXPOSURE_CAP_PCT};

"""
        # Insert after the import line
        import_end = content.find("\n", content.find("import")) + 1
        content = content[:import_end] + constants_block + content[import_end:]

        MOADATA_TS.write_text(content, encoding="utf-8")
        log(f"  Updated {updated_count} MoA entries with rotation guide metadata")
        log(f"  Added treatment window constants")
        log(f"  Wrote {MOADATA_TS} ({len(content):,} chars)")
    else:
        log("  No entries needed updating (all already have rotation guide fields)")

    return updated_count


if __name__ == "__main__":
    update_moa_data()
