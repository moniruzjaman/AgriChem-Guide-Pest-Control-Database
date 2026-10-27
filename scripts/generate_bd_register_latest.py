#!/usr/bin/env python3
"""Generate src/data/bdRegisterLatest.ts from the 5,485-row AgriChem master."""

from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
BD_PATH = REPO_ROOT / "data_raw" / "bangladesh_pesticide_database.csv"
ALL_PATH = REPO_ROOT / "data_raw" / "all_pesticides.csv"
OUT_PATH = REPO_ROOT / "src" / "data" / "bdRegisterLatest.ts"

TYPE_MAP = {
    "Insecticide": "Insecticide",
    "Fungicide": "Fungicide",
    "Herbicide": "Herbicide",
    "Miticide": "Miticide",
    "Bio Pesticide": "Bio Pesticide",
    "Stored Grain": "Store Grain Insecticide",
    "Store Grain Insecticide": "Store Grain Insecticide",
    "Rodenticide": "Rodenticide",
    "Public Health": "Public Health",
}
TOX_OK = {
    "Ia - Extremely Hazardous",
    "Ib - Highly Hazardous",
    "II - Moderately Hazardous",
    "III - Slightly Hazardous",
    "U - Unlikely to Present Hazard",
}
RISK_OK = {"Low", "Medium", "High", "Low to Medium", "Medium to High", "Unknown"}
WHO_COLOR = {
    "Ia - Extremely Hazardous": "#dc2626",
    "Ib - Highly Hazardous": "#dc2626",
    "II - Moderately Hazardous": "#eab308",
    "III - Slightly Hazardous": "#3b82f6",
    "U - Unlikely to Present Hazard": "#10b981",
}


def esc(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def clean_list(raw: str) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for part in (raw or "").split(";"):
        value = part.strip().strip('"').strip("'").strip()
        key = value.lower()
        if value and key not in seen:
            seen.add(key)
            out.append(value)
    return out


def parse_num(s: str):
    s = (s or "").strip()
    if not s:
        return None
    try:
        value = float(s)
        return int(value) if value.is_integer() else value
    except ValueError:
        return None


def formulation(raw: str, trade: str) -> str:
    value = (raw or "").strip()
    if value and value.lower() not in ("(not recorded)", "unknown", "n/a", "-", "—"):
        return value
    upper = trade.upper()
    for code in ["WDG", "WG", "EC", "SC", "WP", "DF", "GR", "SL", "SP", "ULV", "EW", "FS", "OD", "SE", "CS", "DC", "MC", "ZC", "SG", "AS"]:
        if code in upper:
            return "WDG" if code == "WG" else code
    return "Unknown"


def type_prefix(t: str) -> str:
    return re.sub(r"[^a-z]", "", t.lower())[:4] or "chem"


def recs(crops: list[str], pests: list[str], dosage: str) -> list[str]:
    if crops and pests and dosage:
        return [f"{', '.join(crops)} | {', '.join(pests)} | {dosage}"]
    return []


def ts_arr(values: list[str]) -> str:
    return "[" + ", ".join(esc(v) for v in values) + "]"


def main() -> int:
    if not BD_PATH.exists() or not ALL_PATH.exists():
        print("ERROR: source CSVs missing", file=sys.stderr)
        return 1

    with ALL_PATH.open(newline="", encoding="utf-8") as handle:
        all_rows = list(csv.DictReader(handle))
    all_regs = {
        (row.get("Registration No") or "").strip().upper()
        for row in all_rows
        if (row.get("Pesticide Type") or "") != "Public Health"
    }

    with BD_PATH.open(newline="", encoding="utf-8") as handle:
        bd_rows = list(csv.DictReader(handle))

    extras = []
    seen_extra: set[str] = set()
    overlays: dict[str, dict] = {}

    for index, row in enumerate(bd_rows):
        reg = (row.get("Registration No") or "").strip()
        key = reg.upper()
        if not key:
            continue
        cat = TYPE_MAP.get((row.get("Category") or "").strip(), "Insecticide")
        trade = (row.get("Trade Name") or "").strip()
        common = (row.get("Common Name") or "").strip()
        holder = (row.get("Registration Holder") or "").strip()
        crops = clean_list(row.get("Crops") or "")
        pests = clean_list(row.get("Pests") or "")
        dosage = (row.get("Dosage Rate") or "").strip()
        moa = (row.get("MoA Code") or "").strip()
        tox = (row.get("Toxicity Class") or "").strip()
        if tox not in TOX_OK:
            tox = ""
        risk = (row.get("Resistance Risk") or "").strip()
        if risk not in RISK_OK:
            risk = ""
        form = formulation(row.get("Formulation") or "", trade)
        phi = parse_num(row.get("PHI Days") or "")
        rei = parse_num(row.get("REI Hours") or "")
        mechanism = (row.get("Mechanism (Site of Action)") or "").strip()
        rotation = (row.get("Rotation Partners") or "").strip()

        overlay = {}
        if tox:
            overlay["toxicityClass"] = tox
        if form and form != "Unknown":
            overlay["formulation"] = form
        if phi is not None:
            overlay["phiDays"] = phi
        if rei is not None:
            overlay["reiHours"] = rei
        if risk:
            overlay["resistanceRisk"] = risk
        if moa:
            overlay["moaCode"] = moa
        if overlay and key not in overlays:
            overlays[key] = overlay

        extra_key = f"{key}|{trade.lower()}"
        if key not in all_regs and extra_key not in seen_extra:
            seen_extra.add(extra_key)
            actives = []
            seen_a: set[str] = set()
            for part in re.split(r"\s*\+\s*", common):
                name = re.sub(r"\s*\([^)]*\)", "", part).strip()
                name_key = name.lower()
                if name and name_key not in seen_a:
                    seen_a.add(name_key)
                    actives.append(name)
            extras.append({
                "id": f"{type_prefix(cat)}-{re.sub(r'[^a-zA-Z0-9]', '', reg)}-{str(index + 1).zfill(4)}",
                "type": cat,
                "commonName": common,
                "activeIngredients": actives,
                "tradeName": trade,
                "registrationNo": reg,
                "registrationHolder": holder,
                "crops": crops,
                "pests": pests,
                "dosageRate": dosage,
                "moaCode": moa or None,
                "moaTargetSite": mechanism or None,
                "resistanceRisk": risk or None,
                "toxicityClass": tox or None,
                "whoColor": WHO_COLOR.get(tox) if tox else None,
                "formulation": form,
                "phiDays": phi,
                "reiHours": rei,
                "waterVolumeLPerHa": 1000 if any(c.lower() == "tea" for c in crops) else 500,
                "rotationNotes": rotation or None,
                "recommendations": recs(crops, pests, dosage),
            })

    lines = [
        "/**",
        " * Auto-generated from data_raw/bangladesh_pesticide_database.csv",
        " * Overlay + extra products from the 5,485-row AgriChem/MoA PTAC master.",
        " * Do not edit by hand.",
        " */",
        "import { ChemicalProduct } from '../types';",
        "",
        "export interface BdOverlay {",
        '  toxicityClass?: ChemicalProduct["toxicityClass"];',
        "  formulation?: string;",
        "  phiDays?: number;",
        "  reiHours?: number;",
        '  resistanceRisk?: ChemicalProduct["resistanceRisk"];',
        "  moaCode?: string;",
        "}",
        "",
        "export const BD_OVERLAY_BY_REG: Record<string, BdOverlay> = {",
    ]
    for key, overlay in overlays.items():
        parts = []
        if "toxicityClass" in overlay:
            parts.append(f'toxicityClass: {esc(overlay["toxicityClass"])} as ChemicalProduct["toxicityClass"]')
        if "formulation" in overlay:
            parts.append(f'formulation: {esc(overlay["formulation"])}')
        if "phiDays" in overlay:
            parts.append(f'phiDays: {overlay["phiDays"]}')
        if "reiHours" in overlay:
            parts.append(f'reiHours: {overlay["reiHours"]}')
        if "resistanceRisk" in overlay:
            parts.append(f'resistanceRisk: {esc(overlay["resistanceRisk"])} as ChemicalProduct["resistanceRisk"]')
        if "moaCode" in overlay:
            parts.append(f'moaCode: {esc(overlay["moaCode"])}')
        lines.append(f"  {esc(key)}: {{ {', '.join(parts)} }},")
    lines.append("};")
    lines.append("")
    lines.append("export const BD_REGISTER_EXTRAS: ChemicalProduct[] = [")
    for product in extras:
        fields = [
            f'id: {esc(product["id"])}',
            f'type: {esc(product["type"])} as ChemicalProduct["type"]',
            f'commonName: {esc(product["commonName"])}',
            f'activeIngredients: {ts_arr(product["activeIngredients"])}',
            f'tradeName: {esc(product["tradeName"])}',
            f'registrationNo: {esc(product["registrationNo"])}',
            f'registrationHolder: {esc(product["registrationHolder"])}',
            f'crops: {ts_arr(product["crops"])}',
            f'pests: {ts_arr(product["pests"])}',
            f'dosageRate: {esc(product["dosageRate"])}',
        ]
        if product["moaCode"]:
            fields.append(f'moaCode: {esc(product["moaCode"])}')
        if product["moaTargetSite"]:
            fields.append(f'moaTargetSite: {esc(product["moaTargetSite"])}')
        if product["resistanceRisk"]:
            fields.append(f'resistanceRisk: {esc(product["resistanceRisk"])} as ChemicalProduct["resistanceRisk"]')
        if product["toxicityClass"]:
            fields.append(f'toxicityClass: {esc(product["toxicityClass"])} as ChemicalProduct["toxicityClass"]')
        if product["whoColor"]:
            fields.append(f'whoColor: {esc(product["whoColor"])}')
        fields.append(f'formulation: {esc(product["formulation"])}')
        if product["phiDays"] is not None:
            fields.append(f'phiDays: {product["phiDays"]}')
        if product["reiHours"] is not None:
            fields.append(f'reiHours: {product["reiHours"]}')
        fields.append(f'waterVolumeLPerHa: {product["waterVolumeLPerHa"]}')
        if product["rotationNotes"]:
            fields.append(f'rotationNotes: {esc(product["rotationNotes"])}')
        fields.append(f'recommendations: {ts_arr(product["recommendations"])}')
        fields.append("source: 'dae-register'")
        lines.append("  { " + ", ".join(fields) + " },")
    lines.append("];")
    lines.append("")
    OUT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT_PATH}")
    print(f"overlays={len(overlays)} extras={len(extras)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
