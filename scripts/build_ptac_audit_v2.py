from openpyxl import load_workbook, Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter
from collections import defaultdict, Counter
from datetime import datetime
import os, re

MASTER = "PTAC_Pesticide_MoA_Master_Database_2026_Rev4.xlsx"
MAPPING = "MoA_Mapping_PTAC_Bangladesh_PolicyEnhanced_CSV-Enriched.xlsx"
OUTPUT = "PTAC_MoA_Reconciliation_Audit_v2.xlsx"

def n(v):
    return re.sub(r"[^a-z0-9]", "", str(v).lower()) if v is not None else ""

def s(v):
    return "" if v is None else str(v).strip()

def read(file, sheet, header_row, first_row):
    wb = load_workbook(file, read_only=True, data_only=True)
    ws = wb[sheet]
    hr = next(ws.iter_rows(min_row=header_row, max_row=header_row, values_only=True))
    headers = {s(v): i for i, v in enumerate(hr) if s(v)}
    rows = []
    for rn, row in enumerate(ws.iter_rows(min_row=first_row, values_only=True), first_row):
        if not any(v is not None and s(v) for v in row):
            continue
        d = {h: row[i] if i < len(row) else None for h, i in headers.items()}
        d["_row"] = rn
        rows.append(d)
    wb.close()
    return rows

def val(r, *keys):
    for k in keys:
        if k in r:
            return r[k]
    return None

def reg(r, master=True):
    return n(val(r, "Registration_No") if master else val(r, "Registration No", "Registration_No"))

def brand(r, master=True):
    return n(val(r, "Brand_Name") if master else val(r, "Brand Name", "Brand_Name"))

def moa(r, master=True):
    return s(val(r, "MoA_Code") if master else val(r, "MoA Code", "MoA_Code"))

def pending(v):
    return n(v) in ("", "unknown", "pending", "na", "none", "mdash", "notassigned") or s(v) in ("—", "-")

for f in (MASTER, MAPPING):
    if not os.path.exists(f):
        raise SystemExit("Missing source workbook: " + f)

master = read(MASTER, "Product_Register", 5, 6)
mapping = read(MAPPING, "Product MoA Mapping", 6, 7)

# Index by registration and by registration + brand.
mr, pr, mp, pp = defaultdict(list), defaultdict(list), defaultdict(list), defaultdict(list)
for r in master:
    if reg(r): mr[reg(r)].append(r)
    if reg(r) and brand(r): mp[(reg(r), brand(r))].append(r)
for r in mapping:
    if reg(r, False): pr[reg(r, False)].append(r)
    if reg(r, False) and brand(r, False): pp[(reg(r, False), brand(r, False))].append(r)

# Reconcile master rows, prioritizing the composite identity.
recon, issues, duplicate_rows, mapping_only = [], [], [], []
stats = Counter()
matched_mapping_rows = set()

for m in master:
    rg, br = reg(m), brand(m)
    flags = []
    candidate = None
    match_type = "UNMATCHED"

    if not rg:
        flags.append("MASTER REGISTRATION NUMBER MISSING")

    exact = pp.get((rg, br), []) if rg and br else []
    if len(exact) == 1:
        candidate = exact[0]
        match_type = "REGISTRATION + BRAND MATCH"
    elif len(exact) > 1:
        flags.append("DUPLICATE REGISTRATION + BRAND IN MAPPING")
        match_type = "AMBIGUOUS COMPOSITE MATCH"
    elif rg and len(mr.get(rg, [])) == 1 and len(pr.get(rg, [])) == 1:
        candidate = pr[rg][0]
        match_type = "UNIQUE REGISTRATION ONLY"
    elif rg and len(pr.get(rg, [])) > 0:
        flags.append("REGISTRATION COLLISION; BRAND MATCH NOT FOUND")
        match_type = "MANUAL IDENTITY REVIEW"

    if rg and len(mr.get(rg, [])) > 1:
        flags.append("REGISTRATION NUMBER DUPLICATED IN MASTER")
    if rg and len(pr.get(rg, [])) > 1:
        flags.append("REGISTRATION NUMBER DUPLICATED IN MAPPING")

    mb, mc, mm = s(val(m, "Brand_Name")), s(val(m, "Common_Name")), moa(m)
    pb = s(val(candidate, "Brand Name", "Brand_Name")) if candidate else ""
    pc = s(val(candidate, "Common Name", "Common_Name")) if candidate else ""
    pm = moa(candidate, False) if candidate else ""

    if candidate:
        matched_mapping_rows.add(candidate["_row"])
        if n(mb) != n(pb):
            flags.append("BRAND NAME MISMATCH")
        if n(mc) != n(pc):
            flags.append("COMMON NAME MISMATCH")
        if n(mm) != n(pm):
            flags.append("MOA CODE MISMATCH")
        if pending(mm):
            flags.append("MASTER MOA MISSING OR PENDING")
        if pending(pm):
            flags.append("MAPPING MOA MISSING OR PENDING")
    else:
        if pending(mm):
            flags.append("MASTER MOA MISSING OR PENDING")

    # A same-name-only candidate is a clue, not a confirmed match.
    if not candidate and br:
        same_brand = [x for x in mapping if brand(x, False) == br]
        if same_brand:
            flags.append("SAME BRAND EXISTS UNDER DIFFERENT OR MISSING REGISTRATION")

    for flag in flags:
        stats[flag] += 1
        issues.append([
            s(val(m, "Registration_No")), mb, mc, mm, pb, pm,
            match_type, flag, m["_row"],
            candidate["_row"] if candidate else ""
        ])

    if flags:
        stats["master_rows_with_flags"] += 1

    recon.append([
        s(val(m, "Registration_No")), mb, mc, mm, pb, pc, pm,
        match_type, "; ".join(flags), m["_row"],
        candidate["_row"] if candidate else ""
    ])

# Mapping rows not matched by the composite identity.
for p in mapping:
    if p["_row"] not in matched_mapping_rows:
        mapping_only.append([
            s(val(p, "Registration No", "Registration_No")),
            s(val(p, "Brand Name", "Brand_Name")),
            s(val(p, "Common Name", "Common_Name")),
            moa(p, False), p["_row"],
            "Not paired to a unique master product by registration + brand"
        ])

# Duplicate registration groups are reported separately from duplicate products.
for side, index, is_master in [
    ("MASTER", mr, True), ("MAPPING", pr, False)
]:
    for key, group in index.items():
        if len(group) > 1:
            for r in group:
                duplicate_rows.append([
                    side,
                    s(val(r, "Registration_No") if is_master else val(r, "Registration No", "Registration_No")),
                    s(val(r, "Brand_Name") if is_master else val(r, "Brand Name", "Brand_Name")),
                    s(val(r, "Common_Name") if is_master else val(r, "Common Name", "Common_Name")),
                    moa(r, is_master), r["_row"],
                    "Registration reused across multiple rows; verify against authoritative register"
                ])

# Workbook creation
out = Workbook()
ws = out.active
ws.title = "Audit Summary"
summary_rows = [
    ["PTAC MoA Reconciliation Audit — Version 2"],
    ["Generated", datetime.now().strftime("%Y-%m-%d %H:%M:%S")],
    ["Matching method", "Registration + normalized brand first; unique registration fallback only"],
    ["Important", "Internal consistency review only; not official registration or MoA validation"],
    ["Master records", len(master)],
    ["Mapping records", len(mapping)],
    ["Master rows with review flags", stats["master_rows_with_flags"]],
    ["Unpaired mapping rows", len(mapping_only)],
    ["Duplicate registration rows", len(duplicate_rows)],
    [],
    ["Review flag", "Count"],
]
for row in summary_rows:
    ws.append(row)
for k, count in stats.most_common():
    if k != "master_rows_with_flags":
        ws.append([k, count])

def add(name, headers, rows):
    sh = out.create_sheet(name)
    sh.append(headers)
    for row in rows:
        sh.append(row)
    return sh

add("Product Reconciliation",
    ["Registration No", "Master Brand", "Master Common Name", "Master MoA",
     "Mapping Brand", "Mapping Common Name", "Mapping MoA", "Match Type",
     "Review Flags", "Master Row", "Mapping Row"], recon)

add("Review Flags",
    ["Registration No", "Master Brand", "Master Common Name", "Master MoA",
     "Mapping Brand", "Mapping MoA", "Match Type", "Review Flag",
     "Master Row", "Mapping Row"], issues)

add("Unpaired Mapping Rows",
    ["Registration No", "Brand", "Common Name", "MoA", "Source Row", "Reason"],
    mapping_only)

add("Duplicate Registrations",
    ["Workbook", "Registration No", "Brand", "Common Name", "MoA",
     "Source Row", "Review Note"], duplicate_rows)

for sh in out.worksheets:
    sh.freeze_panes = "A2"
    sh.auto_filter.ref = sh.dimensions
    sh.sheet_view.showGridLines = False
    for c in sh[1]:
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor="006A4E")
        c.alignment = Alignment(wrap_text=True, vertical="top")
    for row in sh.iter_rows(min_row=2):
        for c in row:
            c.alignment = Alignment(wrap_text=True, vertical="top")
    for col in range(1, sh.max_column + 1):
        letter = get_column_letter(col)
        width = 12
        for row in sh.iter_rows(min_col=col, max_col=col):
            v = row[0].value
            if v is not None:
                width = max(width, min(len(str(v)), 40))
        sh.column_dimensions[letter].width = min(width + 2, 44)

out.save(OUTPUT)
print("\nCREATED:", OUTPUT)
print("Master records:", len(master))
print("Mapping records:", len(mapping))
print("Master rows with review flags:", stats["master_rows_with_flags"])
print("Unpaired mapping rows:", len(mapping_only))
print("Duplicate registration rows (reported separately):", len(duplicate_rows))
print("\nMost frequent review flags:")
for k, count in stats.most_common(12):
    print(count, "|", k)
print("\nOriginal workbooks and previous audit remain unchanged.")
