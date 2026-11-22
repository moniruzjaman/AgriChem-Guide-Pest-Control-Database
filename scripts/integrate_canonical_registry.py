#!/usr/bin/env python3
"""
integrate_canonical_registry.py
================================
Merges the canonical MoA layer into the DAE register so the shipped catalogue
carries one consistent classification instead of four incompatible ones.

Why this exists
---------------
The register has carried the same MoA value in four different notations:

  * compound codes packed into one cell      ("IRAC 1A / IRAC 6")      22 rows
  * HRAC in the modern numeric namespace     ("HRAC 15", "HRAC 2")   233 rows
  * FRAC multi-site groups zero-padded       ("FRAC M02", "FRAC M03") 220 rows
  * codes that contradict the classification ("IRAC 3A" for fipronil)  81 rows

Each one makes the catalogue look larger or smaller than it is, and breaks
the rotation engine, which groups by exact code string.

What it does
------------
1. Reads the DAE register (data_raw/all_pesticides.csv) as the base.
2. Reads the canonical overlay (data_raw/moa_overlay.csv), which carries the
   code, every code for mixtures, the confidence tier and the provenance.
3. Rewrites the register's MoA Code column in the canonical namespace.
4. Appends registrations the register does not have yet.
5. Rewrites the policy sidecar so its MoA descriptions match.
6. Writes data_raw/moa_overlay_audit.csv — every row that changed, and why.

Usage:
    python3 scripts/integrate_canonical_registry.py            # apply
    python3 scripts/integrate_canonical_registry.py --check    # dry run
"""
import argparse
import csv
import re
import shutil
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
REGISTER_CSV = REPO / "data_raw" / "all_pesticides.csv"
OVERLAY_CSV = REPO / "data_raw" / "moa_overlay.csv"
OVERLAY_PRODUCTS_CSV = REPO / "data_raw" / "moa_overlay_products.csv"
POLICY_CSV = REPO / "data_raw" / "pesticide_policy_enrichment.csv"
AUDIT_CSV = REPO / "data_raw" / "moa_overlay_audit.csv"

HRAC_NUM = {"1": "A", "2": "B", "3": "K1", "4": "O", "5": "C1", "6": "C3", "7": "C2",
            "9": "G", "10": "H", "12": "F1", "13": "F4", "14": "E", "15": "K3",
            "18": "I", "19": "P", "20": "L", "22": "D", "23": "K2", "24": "M",
            "27": "F2", "29": "L", "30": "Q", "32": "S", "33": "T"}


def log(msg):
    print(f"[integrate] {msg}", flush=True)


def norm_reg(s):
    """Registration key: uppercase alphanumerics only."""
    if s is None:
        return ""
    return re.sub(r"[^A-Z0-9]", "", str(s).upper())


def canon_codes(code):
    """Split a compound code and fold it into the canonical namespace."""
    if not isinstance(code, str) or not code.strip():
        return []
    out = []
    for part in re.split(r"\s*[+/]\s*", code.strip()):
        part = part.strip()
        if not part:
            continue
        m = re.match(r"^(IRAC|FRAC|HRAC)\s+(.+)$", part, re.I)
        if not m:
            if part not in out:
                out.append(part)
            continue
        auth, body = m.group(1).upper(), m.group(2).strip()
        if auth == "HRAC" and body in HRAC_NUM:
            body = HRAC_NUM[body]
        if auth == "FRAC":
            mm = re.match(r"^(M\s?)?0*(\d+)$", body, re.I)
            if mm:
                body = (mm.group(1).replace(" ", "") if mm.group(1) else "") + mm.group(2)
        c = f"{auth} {body}"
        if c not in out:
            out.append(c)
    return out


def read_csv(path):
    if not path.exists():
        return [], []
    with path.open(encoding="utf-8-sig", newline="") as fh:
        r = csv.reader(fh)
        rows = list(r)
    if not rows:
        return [], []
    return rows[0], rows[1:]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="report only, write nothing")
    args = ap.parse_args()

    if not REGISTER_CSV.exists():
        sys.exit(f"[integrate] missing {REGISTER_CSV}")
    if not OVERLAY_CSV.exists():
        sys.exit(f"[integrate] missing {OVERLAY_CSV}\n"
                 f"          run scripts/regenerate_canonical_overlay.py first")

    reg_header, reg_rows = read_csv(REGISTER_CSV)
    ov_header, ov_rows = read_csv(OVERLAY_CSV)
    prod_header, prod_rows = read_csv(OVERLAY_PRODUCTS_CSV)
    log(f"register rows: {len(reg_rows)} | overlay rows: {len(ov_rows)} "
        f"| supplementary products: {len(prod_rows)}")

    reg_i = {h: i for i, h in enumerate(reg_header)}
    ov_i = {h: i for i, h in enumerate(ov_header)}
    for need in ("Registration No", "MoA Code"):
        if need not in reg_i:
            sys.exit(f"[integrate] register is missing the {need!r} column")
    for need in ("Registration No", "MoA Code", "MoA Codes", "MoA Confidence", "Provenance"):
        if need not in ov_i:
            sys.exit(f"[integrate] overlay is missing the {need!r} column")

    overlay = {}
    for row in ov_rows:
        k = norm_reg(row[ov_i["Registration No"]])
        if k:
            overlay[k] = row

    prod_i = {h: i for i, h in enumerate(prod_header)} if prod_header else {}
    supplement = {}
    for row in prod_rows:
        k = norm_reg(row[prod_i["Registration No"]])
        if k:
            supplement[k] = {h: row[i] for i, h in enumerate(prod_header) if i < len(row)}

    # ---- rewrite the register's MoA column -------------------------------
    audit = []
    changed_ns = changed_compound = changed_overlay = 0
    seen = set()
    new_rows = []
    for row in reg_rows:
        row = list(row)
        reg = row[reg_i["Registration No"]]
        k = norm_reg(reg)
        seen.add(k)
        original = row[reg_i["MoA Code"]]
        original = "" if original is None else str(original).strip()

        # what the register's own code becomes in canonical form
        canon = canon_codes(original)
        primary = canon[0] if canon else ""
        if original and canon and original != primary:
            if len(canon) > 1:
                changed_compound += 1
                reason = "compound code split"
            else:
                changed_ns += 1
                reason = "namespace normalised"
            audit.append([reg, original, primary, reason, "namespace"])
        elif original and not canon:
            audit.append([reg, original, "", "unparseable code", "namespace"])

        # the canonical overlay wins where it has a decision
        ov = overlay.get(k)
        if ov:
            ov_code = (ov[ov_i["MoA Code"]] or "").strip()
            ov_codes = (ov[ov_i["MoA Codes"]] or "").strip()
            prov = (ov[ov_i["Provenance"]] or "").strip()
            if ov_code and ov_code != primary:
                changed_overlay += 1
                if prov == "corrected":
                    reason = f"corrected from {original}"
                elif prov == "inferred":
                    reason = "combined product recovered from brand formulation"
                else:
                    reason = "canonical overlay"
                audit.append([reg, original or "(none)", ov_code, reason, prov])
                primary = ov_code
            elif prov == "corrected" and original:
                audit.append([reg, original, primary, "already canonical", prov])
        row[reg_i["MoA Code"]] = primary
        new_rows.append(row)

    # ---- append registrations the register does not have ------------------
    added = 0
    for k, ov in overlay.items():
        if k in seen:
            continue
        reg = (ov[ov_i["Registration No"]] or "").strip()
        if not reg or reg.lower() == "nan":
            continue
        if "MoA Code" not in ov_i:
            continue
        row = [""] * len(reg_header)
        sup = supplement.get(k, {})
        row[reg_i["Registration No"]] = reg
        row[reg_i["Brand Name"]] = sup.get("Trade Name", "")
        row[reg_i["Common Name"]] = sup.get("Common Name", "")
        row[reg_i["Pesticide Type"]] = sup.get("Category", "")
        row[reg_i["MoA Code"]] = (ov[ov_i["MoA Code"]] or "").strip()
        new_rows.append(row)
        audit.append([reg, "(absent)", row[reg_i["MoA Code"]],
                      "registration added from the canonical overlay", "added"])
        added += 1

    log(f"namespace normalised : {changed_ns}")
    log(f"compound codes split : {changed_compound}")
    log(f"overlay applied      : {changed_overlay}")
    log(f"rows added           : {added}")
    log(f"rows now             : {len(new_rows)}")

    if args.check:
        log("--check: nothing written")
        return

    # ---- write the register back ----------------------------------------
    backup = REGISTER_CSV.with_suffix(".csv.bak")
    shutil.copy2(REGISTER_CSV, backup)
    with REGISTER_CSV.open("w", encoding="utf-8", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(reg_header)
        w.writerows(new_rows)
    log(f"wrote {REGISTER_CSV.name} (backup: {backup.name})")

    # ---- audit ------------------------------------------------------------
    with AUDIT_CSV.open("w", encoding="utf-8", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["Registration No", "Old MoA Code", "New MoA Code", "Reason", "Provenance"])
        w.writerows(audit)
    log(f"wrote {AUDIT_CSV.name} ({len(audit)} rows)")

    # ---- keep the policy sidecar in step ---------------------------------
    pol_header, pol_rows = read_csv(POLICY_CSV)
    if pol_header:
        pi = {h: i for i, h in enumerate(pol_header)}
        if "Registration No" in pi and "MoA Code" in pi:
            changed = 0
            for row in pol_rows:
                k = norm_reg(row[pi["Registration No"]])
                ov = overlay.get(k)
                if not ov:
                    continue
                ov_codes = (ov[ov_i["MoA Codes"]] or "").strip()
                ov_code = (ov[ov_i["MoA Code"]] or "").strip()
                cur = (row[pi["MoA Code"]] or "").strip()
                if ov_code and cur != ov_code:
                    row[pi["MoA Code"]] = ov_code
                    changed += 1
            with POLICY_CSV.open("w", encoding="utf-8", newline="") as fh:
                w = csv.writer(fh)
                w.writerow(pol_header)
                w.writerows(pol_rows)
            log(f"policy sidecar MoA codes aligned: {changed}")


if __name__ == "__main__":
    main()
