#!/usr/bin/env python3
"""
parse_moa_master_html.py
=======================

Parse the Pesticide_MoA_Database_PTAC_2026.xlsx.zip (unzipped HTML exports)
into clean CSV files that build_latest_database.py can consume.

The original XLSX was published by the maintainer as a zip of HTML exports
(one HTML per sheet). This script extracts the data from those HTML tables
into CSVs that the build pipeline can use.

Output:
  /home/z/my-project/download/moa_master_products.csv     — 77 products with full MoA mapping
  /home/z/my-project/download/moa_master_combinations.csv  — 19 combination products
  /home/z/my-project/download/moa_master_ai_dictionary.csv — (if present in zip)
"""

import csv
import os
from pathlib import Path
from bs4 import BeautifulSoup

UNZIP_DIR = Path("/home/z/my-project/upload/pest_moa_unzipped")
DOWNLOAD_DIR = Path("/home/z/my-project/download")
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

OUT_PRODUCTS = DOWNLOAD_DIR / "moa_master_products.csv"
OUT_COMBINATIONS = DOWNLOAD_DIR / "moa_master_combinations.csv"


def parse_html_table(html_path: Path):
    """Parse a single HTML table file into a list of dict rows."""
    with open(html_path, "r", encoding="utf-8") as fp:
        html = fp.read()
    soup = BeautifulSoup(html, "html.parser")
    tbl = soup.find("table")
    if not tbl:
        return [], []
    rows = tbl.find_all("tr")
    if len(rows) < 5:
        return [], []

    # The HTML exports have row 4 = header (index 4), data starts at row 5.
    # But to be safe, find the row that contains the column names.
    headers = None
    header_idx = None
    for ri, row in enumerate(rows):
        cells = [c.get_text(strip=True) for c in row.find_all(["td", "th"])]
        # Skip the first cell (row number) — it's an artifact of the export
        if len(cells) >= 2 and cells[1].startswith("Product_ID"):
            headers = cells[1:]
            header_idx = ri
            break
        if len(cells) >= 2 and cells[1].startswith("Combo_ID"):
            headers = cells[1:]
            header_idx = ri
            break

    if not headers:
        # Try a more permissive scan
        for ri, row in enumerate(rows):
            cells = [c.get_text(strip=True) for c in row.find_all(["td", "th"])]
            joined = " | ".join(cells).lower()
            if "registration_no" in joined and "trade_name" in joined:
                headers = cells[1:]
                header_idx = ri
                break
            if "combo_id" in joined:
                headers = cells[1:]
                header_idx = ri
                break

    if not headers or header_idx is None:
        return [], []

    # Sanitize headers — strip whitespace, drop empty
    headers = [h.strip() if h else f"col_{i}" for i, h in enumerate(headers)]

    data_rows = []
    for row in rows[header_idx + 1:]:
        cells = [c.get_text(strip=True) for c in row.find_all(["td", "th"])]
        # Skip the row-number cell at index 0
        if not cells or not any(cells[1:]):
            continue
        cells = cells[1:]  # drop row number
        # Pad/truncate to match header length
        while len(cells) < len(headers):
            cells.append("")
        cells = cells[:len(headers)]
        record = dict(zip(headers, cells))
        record["_source_row"] = header_idx + 1 + len(data_rows) + 1
        data_rows.append(record)

    return headers, data_rows


def main():
    print("[parse] Parsing Product_Register.html...")
    h1, rows1 = parse_html_table(UNZIP_DIR / "Product_Register.html")
    print(f"  Headers: {h1}")
    print(f"  Rows: {len(rows1)}")
    if rows1:
        print(f"  First row: {rows1[0]}")
        print(f"  Last row: {rows1[-1]}")
        with open(OUT_PRODUCTS, "w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=h1 + ["_source_row"])
            writer.writeheader()
            writer.writerows(rows1)
        print(f"  Wrote {OUT_PRODUCTS}")

    print()
    print("[parse] Parsing Combination_Register.html...")
    h2, rows2 = parse_html_table(UNZIP_DIR / "Combination_Register.html")
    print(f"  Headers: {h2}")
    print(f"  Rows: {len(rows2)}")
    if rows2:
        print(f"  First row: {rows2[0]}")
        print(f"  Last row: {rows2[-1]}")
        with open(OUT_COMBINATIONS, "w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=h2 + ["_source_row"])
            writer.writeheader()
            writer.writerows(rows2)
        print(f"  Wrote {OUT_COMBINATIONS}")

    print()
    print("[parse] Done.")


if __name__ == "__main__":
    main()
