#!/usr/bin/env python3
"""Fill missing trade names and combination-product fields from the 5,485-row AgriChem/MoA PTAC master into the 9,000+ live catalogue."""

from __future__ import annotations

import csv
import json
import re
from html.parser import HTMLParser
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
BD_PATH = REPO / "data_raw" / "bangladesh_pesticide_database.csv"
DAE_PATH = REPO / "data_raw" / "all_pesticides.csv"
POLICY_PATH = REPO / "data_raw" / "pesticide_policy_enrichment.csv"
JSON_PATH = REPO / "public" / "downloads" / "pesticide_database.json"
COMBO_HTML = REPO / "data_raw" / "moa_master_2026" / "Combination_Register.html"
PRODUCT_HTML = REPO / "data_raw" / "moa_master_2026" / "Product_Register.html"

PLACEHOLDER_RE = re.compile(
    r"^(?:\(trade name not recorded\)|n/?a|unknown|-|—|\s*)$",
    re.IGNORECASE,
)
REG_RE = re.compile(r"^([A-Za-z()]+-)(\d+)$")


def log(msg: str) -> None:
    print(f"[fill] {msg}", flush=True)


def normalize_reg(raw: str) -> str:
    s = (raw or "").strip().upper()
    s = re.sub(r"-\s+", "-", s)
    s = re.sub(r"^AP-BIO-", "AP(BIO)-", s, flags=re.IGNORECASE)
    m = REG_RE.match(s)
    if m:
        prefix, num = m.group(1).upper(), m.group(2)
        if prefix == "AP(BIO)-":
            prefix = "AP(Bio)-"
        s = prefix + num
    return s


def is_placeholder(value: str) -> bool:
    return bool(PLACEHOLDER_RE.match((value or "").strip()))


def prefer(existing: str, incoming: str) -> str:
    if incoming and not is_placeholder(incoming):
        if is_placeholder(existing):
            return incoming.strip()
        if "+" in incoming and "+" not in (existing or ""):
            return incoming.strip()
    return existing


def parse_actives(common: str) -> list[str]:
    actives: list[str] = []
    seen: set[str] = set()
    for part in re.split(r"\s*\+\s*", common or ""):
        name = re.sub(r"\s*\([^)]*\)", "", part)
        name = re.sub(r"\s*\d+\.?\d*\s*%?", "", name).strip(" -/")
        key = name.lower()
        if name and key not in seen:
            seen.add(key)
            actives.append(name)
    return actives


class TableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_cell = False
        self.cell = ""
        self.row: list[str] = []
        self.rows: list[list[str]] = []

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self.row = []
        if tag in ("td", "th"):
            self.in_cell = True
            self.cell = ""

    def handle_endtag(self, tag):
        if tag in ("td", "th") and self.in_cell:
            self.row.append(self.cell.strip())
            self.in_cell = False
        if tag == "tr" and self.row:
            self.rows.append(self.row)
            self.row = []

    def handle_data(self, data):
        if self.in_cell:
            self.cell += data


def html_records(path: Path, header_token: str) -> list[dict[str, str]]:
    if not path.exists():
        return []
    parser = TableParser()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    header: list[str] | None = None
    records: list[dict[str, str]] = []
    for row in parser.rows:
        cells = row[1:] if row and (row[0].isdigit() or row[0] == "") else row
        joined = " | ".join(cells)
        if header is None and header_token in joined:
            header = [c.strip() for c in cells]
            continue
        if header and len(cells) >= 3:
            rec = {header[i]: cells[i] if i < len(cells) else "" for i in range(len(header))}
            records.append(rec)
    return records


def load_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        fieldnames = list(reader.fieldnames or [])
        rows = [{k: (v or "") for k, v in row.items()} for row in reader]
    return fieldnames, rows


def write_csv(path: Path, fieldnames: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    bd_fields, bd_rows = load_csv(BD_PATH)
    dae_fields, dae_rows = load_csv(DAE_PATH)
    pol_fields, pol_rows = load_csv(POLICY_PATH)
    products = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    combo_rows = html_records(COMBO_HTML, "Combo_ID")
    product_rows = html_records(PRODUCT_HTML, "Product_ID")

    bd_by_reg: dict[str, dict[str, str]] = {}
    for row in bd_rows:
        key = normalize_reg(row.get("Registration No", ""))
        if key and key not in bd_by_reg:
            bd_by_reg[key] = row

    dae_by_reg: dict[str, dict[str, str]] = {}
    for row in dae_rows:
        key = normalize_reg(row.get("Registration No", ""))
        if key and key not in dae_by_reg:
            dae_by_reg[key] = row

    combo_by_reg: dict[str, dict[str, str]] = {}
    for row in combo_rows:
        key = normalize_reg(row.get("Registration_No", ""))
        if key:
            combo_by_reg[key] = row

    product_by_reg: dict[str, dict[str, str]] = {}
    for row in product_rows:
        key = normalize_reg(row.get("Registration_No", ""))
        if key:
            product_by_reg[key] = row

    dae_common_filled = 0
    dae_combo_filled = 0
    for row in dae_rows:
        key = normalize_reg(row.get("Registration No", ""))
        common = row.get("Common Name", "")
        bd = bd_by_reg.get(key)
        combo = combo_by_reg.get(key)
        prod = product_by_reg.get(key)
        incoming = ""
        if combo:
            incoming = combo.get("Active_Ingredients", "")
        if bd and not incoming:
            incoming = bd.get("Common Name", "")
        if prod and not incoming:
            incoming = prod.get("Common_Name_AI", "")
        if incoming:
            next_common = prefer(common, incoming)
            if next_common != common:
                if "+" in next_common and "+" not in common:
                    dae_combo_filled += 1
                else:
                    dae_common_filled += 1
                row["Common Name"] = next_common
        if combo and combo.get("Full_MoA_String") and not (row.get("MoA Code") or "").strip():
            row["MoA Code"] = combo["Full_MoA_String"]
        if prod and prod.get("MoA_Code") and not (row.get("MoA Code") or "").strip():
            committee = prod.get("Committee", "").strip()
            code = prod.get("MoA_Code", "").strip()
            row["MoA Code"] = f"{committee} {code}".strip() if committee and not code.startswith(committee) else code

    bd_trade_filled = 0
    for row in bd_rows:
        key = normalize_reg(row.get("Registration No", ""))
        trade = row.get("Trade Name", "")
        dae = dae_by_reg.get(key)
        combo = combo_by_reg.get(key)
        prod = product_by_reg.get(key)
        incoming = ""
        if dae:
            incoming = dae.get("Brand Name", "")
        if is_placeholder(incoming) and combo:
            incoming = combo.get("Trade_Name", "")
        if is_placeholder(incoming) and prod:
            incoming = prod.get("Trade_Name", "")
        if incoming and is_placeholder(trade):
            row["Trade Name"] = incoming.strip()
            bd_trade_filled += 1
        combo_common = ""
        if combo:
            combo_common = combo.get("Active_Ingredients", "")
        if combo_common:
            row["Common Name"] = prefer(row.get("Common Name", ""), combo_common)

    pol_trade_filled = 0
    for row in pol_rows:
        key = normalize_reg(row.get("Registration No", ""))
        trade = row.get("Trade Name", "")
        dae = dae_by_reg.get(key)
        combo = combo_by_reg.get(key)
        prod = product_by_reg.get(key)
        incoming = ""
        if dae:
            incoming = dae.get("Brand Name", "")
        if is_placeholder(incoming) and combo:
            incoming = combo.get("Trade_Name", "")
        if is_placeholder(incoming) and prod:
            incoming = prod.get("Trade_Name", "")
        if incoming and is_placeholder(trade):
            row["Trade Name"] = incoming.strip()
            pol_trade_filled += 1

    json_common_filled = 0
    json_combo_filled = 0
    json_moa_filled = 0
    json_trade_filled = 0
    seen_json: set[str] = set()
    for product in products:
        key = normalize_reg(product.get("registrationNo", ""))
        if key:
            seen_json.add(key)
        common = product.get("commonName") or ""
        trade = product.get("tradeName") or ""
        bd = bd_by_reg.get(key)
        combo = combo_by_reg.get(key)
        prod = product_by_reg.get(key)
        incoming_common = ""
        if combo:
            incoming_common = combo.get("Active_Ingredients", "")
        if bd and not incoming_common:
            incoming_common = bd.get("Common Name", "")
        if prod and not incoming_common:
            incoming_common = prod.get("Common_Name_AI", "")
        if incoming_common:
            next_common = prefer(common, incoming_common)
            if next_common != common:
                if "+" in next_common and "+" not in common:
                    json_combo_filled += 1
                else:
                    json_common_filled += 1
                product["commonName"] = next_common
                product["activeIngredients"] = parse_actives(next_common)
        if is_placeholder(trade):
            incoming_trade = ""
            if bd and not is_placeholder(bd.get("Trade Name", "")):
                incoming_trade = bd.get("Trade Name", "")
            if not incoming_trade and combo:
                incoming_trade = combo.get("Trade_Name", "")
            if not incoming_trade and prod:
                incoming_trade = prod.get("Trade_Name", "")
            if incoming_trade:
                product["tradeName"] = incoming_trade.strip()
                json_trade_filled += 1
        if not product.get("moaCode"):
            if combo and combo.get("Full_MoA_String"):
                product["moaCode"] = combo["Full_MoA_String"]
                json_moa_filled += 1
            elif prod and prod.get("MoA_Code"):
                committee = prod.get("Committee", "").strip()
                code = prod.get("MoA_Code", "").strip()
                product["moaCode"] = f"{committee} {code}".strip() if committee and not code.startswith(committee) else code
                json_moa_filled += 1
            elif bd and (bd.get("MoA Code") or "").strip():
                product["moaCode"] = bd["MoA Code"].strip()
                json_moa_filled += 1

    type_map = {
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
    extras_added = 0
    for index, row in enumerate(bd_rows):
        key = normalize_reg(row.get("Registration No", ""))
        if not key or key in seen_json:
            continue
        common = row.get("Common Name", "")
        trade = row.get("Trade Name", "")
        combo = combo_by_reg.get(key)
        if combo:
            if combo.get("Trade_Name") and is_placeholder(trade):
                trade = combo["Trade_Name"]
            if combo.get("Active_Ingredients"):
                common = prefer(common, combo["Active_Ingredients"])
        cat = type_map.get((row.get("Category") or "").strip(), "Insecticide")
        crops = [c.strip() for c in (row.get("Crops") or "").split(";") if c.strip()]
        pests = [p.strip() for p in (row.get("Pests") or "").split(";") if p.strip()]
        dosage = (row.get("Dosage Rate") or "").strip()
        recs = [f"{', '.join(crops)} | {', '.join(pests)} | {dosage}"] if crops and pests and dosage else None
        products.append({
            "id": f"{cat.lower()[:4]}-{re.sub(r'[^a-zA-Z0-9]', '', key)}-bd{index+1:04d}",
            "type": cat,
            "commonName": common,
            "activeIngredients": parse_actives(common),
            "tradeName": trade,
            "registrationNo": row.get("Registration No", "").strip() or key,
            "registrationHolder": (row.get("Registration Holder") or "").strip(),
            "crops": crops,
            "pests": pests,
            "dosageRate": dosage,
            "moaCode": (combo.get("Full_MoA_String") if combo else None) or (row.get("MoA Code") or "").strip() or None,
            "recommendations": recs,
            "source": "dae-register",
            "scheme": (row.get("Scheme") or "").strip() or None,
            "groupNo": (row.get("Group No.") or "").strip() or None,
            "moaDescription": (row.get("MoA Description") or "").strip() or None,
            "targetSite": (row.get("Target Site") or "").strip() or None,
            "hhpStatus": (row.get("HHP Status (WHO/FAO)") or "").strip() or None,
            "hazardousActivesMatched": (row.get("Hazardous Active(s) Matched") or "").strip() or None,
            "euGlobalRegulatoryStatus": (row.get("EU / Global Regulatory Status") or "").strip() or None,
            "bangladeshPolicyAction": (row.get("Bangladesh Policy Action") or "").strip() or None,
            "policyRiskTier": (row.get("Policy Risk Tier") or "").strip() or None,
            "formulationCode": (row.get("Formulation") or "").strip() or None,
            "formulationTypePhysicality": None,
            "physicalForm": None,
            "coFormulantInertConcern": None,
        })
        seen_json.add(key)
        extras_added += 1

    write_csv(DAE_PATH, dae_fields, dae_rows)
    write_csv(BD_PATH, bd_fields, bd_rows)
    write_csv(POLICY_PATH, pol_fields, pol_rows)
    JSON_PATH.write_text(json.dumps(products, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    empty_common = sum(1 for p in products if not (p.get("commonName") or "").strip())
    combo_count = sum(1 for p in products if "+" in (p.get("commonName") or ""))
    placeholder_trade = sum(1 for p in products if is_placeholder(p.get("tradeName") or ""))
    log(f"DAE common filled={dae_common_filled} combo filled={dae_combo_filled}")
    log(f"BD trade filled={bd_trade_filled}")
    log(f"policy trade filled={pol_trade_filled}")
    log(f"JSON common filled={json_common_filled} combo filled={json_combo_filled} trade filled={json_trade_filled} moa filled={json_moa_filled} extras={extras_added}")
    log(f"JSON products={len(products)} empty common={empty_common} combo={combo_count} placeholder trade={placeholder_trade}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
