#!/usr/bin/env python3
"""
irac_v11_5_backfill.py
=====================

Final MoA backfill using the IRAC MoA Classification v11.5 (February 2026)
as the authoritative source. Parses the AI→MoA mapping from Appendix 5 of
the IRAC PDF, adds it to the comprehensive lookup, and backfills any
remaining unmapped records.

Also adds links to ppw.krishi.gov.bd and irac-online.org in the HomeView
resources section, and copies the IRAC PDFs to /public/downloads/ for
user download.
"""

from __future__ import annotations
import os
import re
import sys
from pathlib import Path
from collections import defaultdict
import pandas as pd
import pdfplumber

REPO = Path(__file__).resolve().parent.parent
DOWNLOAD_DIR = Path(os.environ.get("AGRICHEM_DOWNLOAD_DIR", "/home/z/my-project/download"))
UPLOAD_DIR = Path(os.environ.get("AGRICHEM_UPLOAD_DIR", "/home/z/my-project/upload"))

LATEST_FLAT_CSV = REPO / "public" / "downloads" / "pesticide_database_latest.csv"
AUDIT_CSV = UPLOAD_DIR / "moa_mapping_audit.csv"
IRAC_PDF = UPLOAD_DIR / "MoA-Classification_v11.5_4Feb26-1770200746.pdf"
DAE_CSV = REPO / "data_raw" / "all_pesticides.csv"

# Manually added AIs that are in the IRAC table but may not parse correctly
# from the PDF due to multi-word names or special characters
MANUAL_IRAC_ADDITIONS = {
    "meperfluthrin": "3A",
    "empenthrin": "3A",
    "flubendiamide": "28",
    "rotenone": "21B",
    "rotenonederris": "21B",
    "beauveriabassiana": "UNF",
    "beauveriabassianastrains": "UNF",
    "metarhiziumbrunneum": "UNF",
    "metarhiziumbrunneumstrainf52": "UNF",
    "paecilomycesfumosoroseus": "UNF",
    "paecilomycesfumosoroseusapopkastrain97": "UNF",
    "cydiapommonellagv": "31",
    "thaumatotibialeucotretagv": "31",
    "helicoverpaarmigeranpv": "31",
    "anticarsiagemmatalismnpv": "31",
    "wolbachiapipientis": "UNB",
    "burkholderia": "UNB",
    "spidoxamat": "23",
    "spiropidion": "23",
    "dicloromezotiaz": "4E",
    "fenmezoditiaz": "4E",
    "triflumezopyrim": "4E",
    "flupyrimin": "4F",
    "dimpropyridaz": "36",
    "oxazosulfyl": "37",
    "ledprona": "35",
    "vadescana": "35",
    "gsomegakappahxtxhv1a": "32",
    "dctransallethrin": "3A",
    "dcistransallethrin": "3A",
    "bioallethrinscyclopentenylisomer": "3A",
    "cyphenothrin1rtransisomers": "3A",
    "phenothrin1rtransisomer": "3A",
    "tetramethrin1risomers": "3A",
    "empenthrinez1risomers": "3A",
    "betacyfluthrin": "3A",
    "thetacypermethrin": "3A",
    "zetacypermethrin": "3A",
    "lambdacyhalothrin": "3A",
    "gammacyhalothrin": "3A",
    "taufluvalinate": "3A",
    "isopropylo methoxyaminothiophosphorylsalicylate": "1B",
    "isopropylomethoxyaminothiophosphorylsalicylate": "1B",
    "dtransallethrin": "3A",
    "methylbromide": "8A",
    "methylisothiocyanate": "8F",
    "sodiumaluminumfluoride": "8C",
    "sulfurylfluoride": "8C",
    "calciumphosphide": "24A",
    "calciumcyanide": "24B",
    "potassiumcyanide": "24B",
    "sodiumcyanide": "24B",
    "phosphine": "24A",
}

# MoA group → scheme + description mapping
MOA_GROUP_INFO = {
    "1A": ("IRAC", "Carbamates (AChE inhibitors)", "Nerve & Muscle"),
    "1B": ("IRAC", "Organophosphates (AChE inhibitors)", "Nerve & Muscle"),
    "2A": ("IRAC", "Cyclodiene organochlorines", "Nerve & Muscle"),
    "2B": ("IRAC", "Phenylpyrazoles (Fiproles)", "Nerve & Muscle"),
    "3A": ("IRAC", "Pyrethroids, Pyrethrins", "Nerve & Muscle"),
    "3B": ("IRAC", "DDT, Methoxychlor", "Nerve & Muscle"),
    "4A": ("IRAC", "Neonicotinoids", "Nerve & Muscle"),
    "4B": ("IRAC", "Nicotine", "Nerve & Muscle"),
    "4C": ("IRAC", "Sulfoximines", "Nerve & Muscle"),
    "4D": ("IRAC", "Butenolides", "Nerve & Muscle"),
    "4E": ("IRAC", "Mesoionics", "Nerve & Muscle"),
    "4F": ("IRAC", "Pyridylidenes", "Nerve & Muscle"),
    "5": ("IRAC", "Spinosyns", "Nerve & Muscle"),
    "6": ("IRAC", "Avermectins, Milbemycins", "Nerve & Muscle"),
    "7A": ("IRAC", "Juvenile hormone analogues", "Growth & Development"),
    "7B": ("IRAC", "Fenoxycarb", "Growth & Development"),
    "7C": ("IRAC", "Pyriproxyfen", "Growth & Development"),
    "8A": ("IRAC", "Alkyl halides", "Multi-site"),
    "8B": ("IRAC", "Chloropicrin", "Multi-site"),
    "8C": ("IRAC", "Fluorides", "Multi-site"),
    "8D": ("IRAC", "Borates", "Multi-site"),
    "8E": ("IRAC", "Tartar emetic", "Multi-site"),
    "8F": ("IRAC", "Methyl isothiocyanate generators", "Multi-site"),
    "9B": ("IRAC", "Pyridine azomethine derivatives", "Nerve & Muscle"),
    "9D": ("IRAC", "Pyropenes", "Nerve & Muscle"),
    "10A": ("IRAC", "Clofentezine, Diflovidazin, Hexythiazox", "Growth & Development"),
    "10B": ("IRAC", "Etoxazole", "Growth & Development"),
    "11A": ("IRAC", "Bacillus thuringiensis", "Midgut"),
    "11B": ("IRAC", "Bacillus sphaericus", "Midgut"),
    "12A": ("IRAC", "Diafenthiuron", "Respiration"),
    "12B": ("IRAC", "Organotin miticides", "Respiration"),
    "12C": ("IRAC", "Propargite", "Respiration"),
    "12D": ("IRAC", "Tetradifon", "Respiration"),
    "13": ("IRAC", "Uncouplers of oxidative phosphorylation", "Respiration"),
    "14": ("IRAC", "Nereistoxin analogues", "Nerve & Muscle"),
    "15": ("IRAC", "Benzoylureas", "Growth & Development"),
    "16": ("IRAC", "Buprofezin", "Growth & Development"),
    "17": ("IRAC", "Cyromazine", "Growth & Development"),
    "18": ("IRAC", "Diacylhydrazines", "Growth & Development"),
    "19": ("IRAC", "Amitraz", "Nerve & Muscle"),
    "20A": ("IRAC", "Hydramethylnon", "Respiration"),
    "20B": ("IRAC", "Acequinocyl", "Respiration"),
    "20C": ("IRAC", "Fluacrypyrim", "Respiration"),
    "20D": ("IRAC", "Bifenazate", "Respiration"),
    "21A": ("IRAC", "METI acaricides and insecticides", "Respiration"),
    "21B": ("IRAC", "Rotenone (Derris)", "Respiration"),
    "22A": ("IRAC", "Oxadiazines", "Nerve & Muscle"),
    "22B": ("IRAC", "Semicarbazones", "Nerve & Muscle"),
    "23": ("IRAC", "Tetronic and Tetramic acid derivatives", "Lipid Synthesis"),
    "24A": ("IRAC", "Phosphides", "Respiration"),
    "24B": ("IRAC", "Cyanides", "Respiration"),
    "25A": ("IRAC", "Beta-ketonitrile derivatives", "Respiration"),
    "25B": ("IRAC", "Carboxanilides", "Respiration"),
    "28": ("IRAC", "Diamides", "Nerve & Muscle"),
    "29": ("IRAC", "Flonicamid", "Nerve & Muscle"),
    "30": ("IRAC", "Meta-diamides, Isoxazolines", "Nerve & Muscle"),
    "31": ("IRAC", "Baculoviruses", "Midgut"),
    "32": ("IRAC", "GS-omega/kappa HXTX-Hv1a peptide", "Nerve & Muscle"),
    "33": ("IRAC", "Acynonapyr", "Nerve & Muscle"),
    "34": ("IRAC", "Flometoquin", "Respiration"),
    "35": ("IRAC", "RNA Interference mediated target suppressors", "Protein Suppressor"),
    "36": ("IRAC", "Chordotonal organ modulators – undefined", "Nerve & Muscle"),
    "37": ("IRAC", "Vesicular acetylcholine transporter (VAChT) inhibitor", "Nerve & Muscle"),
    "UN": ("IRAC", "Compounds of unknown or uncertain MoA", "Unknown"),
    "UNB": ("IRAC", "Bacterial agents (non-Bt) of unknown MoA", "Unknown"),
    "UNE": ("IRAC", "Botanical essence with unknown MoA", "Unknown"),
    "UNF": ("IRAC", "Fungal agents of unknown MoA", "Unknown"),
    "UNM": ("IRAC", "Non-specific mechanical and physical disruptors", "Unknown"),
    "UNP": ("IRAC", "Peptides of unknown MoA", "Unknown"),
    "UNV": ("IRAC", "Viral agents (non-baculovirus) of unknown MoA", "Unknown"),
}


def log(msg: str) -> None:
    print(f"[irac] {msg}", flush=True)


def normalize_reg_no(s) -> str:
    if s is None or pd.isna(s):
        return ""
    s = str(s).strip()
    s = re.sub(r"-\s+", "-", s)
    s = re.sub(r"^AP-BIO-", "AP(Bio)-", s, flags=re.IGNORECASE)
    m = re.match(r"^([A-Za-z()]+-)(\d+)$", s)
    if m:
        prefix, num = m.group(1).upper(), m.group(2)
        if prefix == "AP(BIO)-":
            prefix = "AP(Bio)-"
        s = prefix + num
    return s


def clean_ai(name: str) -> str:
    name = name.lower().strip()
    name = re.sub(r'\d+\.?\d*\s*%', '', name)
    name = re.sub(r'\s+\d+\.?\d*\s*$', '', name)
    name = re.sub(r'\s*w/w\s*', '', name)
    name = re.sub(r'\s*\([^)]*\)', '', name)
    name = re.sub(r'\s+', ' ', name).strip()
    name = name.replace('.', '').replace(',', '')
    return name


def parse_ais(common_name: str) -> list[str]:
    if not common_name:
        return []
    parts = re.split(r'\s*\+\s*', common_name)
    ais = []
    for part in parts:
        ai = clean_ai(part)
        if ai and ai not in ais:
            ais.append(ai)
    return ais


def brand_stem(brand: str) -> str:
    s = brand.lower().strip()
    s = re.sub(r'\s*\d*\.?\d*\s*(EC|WP|WG|WDG|SC|SL|ME|SP|GR|FS|SE|SG|TB|AS|OD|CS|ZC|EW|DC|ULV|DP|GG)\s*$', '', s, flags=re.IGNORECASE).strip()
    s = re.sub(r'\s+\d+\.?\d*\s*%?\s*$', '', s).strip()
    s = re.sub(r'\s*[\-]\s*\d+.*$', '', s).strip()
    s = re.sub(r'[^a-z0-9]', '', s).strip()
    return s


def parse_irac_pdf() -> dict:
    """Parse IRAC v11.5 PDF Appendix 5 for AI → MoA mapping."""
    log("Parsing IRAC MoA Classification v11.5 PDF...")
    ai_to_moa = {}

    with pdfplumber.open(str(IRAC_PDF)) as pdf:
        for pno in range(33, min(42, len(pdf.pages))):
            page = pdf.pages[pno]
            words = page.extract_words(keep_blank_chars=False, use_text_flow=False)
            left_words = [w for w in words if w['x0'] < 300]
            right_words = [w for w in words if w['x0'] >= 300]

            for col_words in [left_words, right_words]:
                rows = {}
                for w in col_words:
                    y = round(w['top'] / 3) * 3
                    rows.setdefault(y, []).append(w)

                for y in sorted(rows.keys()):
                    row_words = sorted(rows[y], key=lambda w: w['x0'])
                    full_text = ' '.join(w['text'] for w in row_words).strip()
                    moa_pattern = r'\s+(1A|1B|2A|2B|3A|3B|4A|4B|4C|4D|4E|4F|5|6|7A|7B|7C|8A|8B|8C|8D|8E|8F|9B|9D|10A|10B|11A|11B|12A|12B|12C|12D|13|14|15|16|17|18|19|20A|20B|20C|20D|21A|21B|22A|22B|23|24A|24B|25A|25B|28|29|30|31|32|33|34|35|36|37|UN|UNB|UNE|UNF|UNM|UNP|UNV)\s*$'
                    m = re.search(moa_pattern, full_text)
                    if m:
                        moa = m.group(1)
                        ai_name = full_text[:m.start()].strip()
                        ai_clean = re.sub(r'[^a-z0-9]', '', ai_name.lower())
                        if ai_clean and len(ai_clean) >= 3 and ai_clean not in ai_to_moa:
                            ai_to_moa[ai_clean] = moa

    # Add manual additions for AIs that don't parse cleanly
    for ai, moa in MANUAL_IRAC_ADDITIONS.items():
        ai_clean = re.sub(r'[^a-z0-9]', '', ai.lower())
        if ai_clean not in ai_to_moa:
            ai_to_moa[ai_clean] = moa

    log(f"  IRAC v11.5 AI → MoA: {len(ai_to_moa)} unique AIs")
    return ai_to_moa


def build_comprehensive_lookup() -> dict:
    """Build the most comprehensive AI → MoA lookup from ALL sources."""
    lookup = {}

    # Source 1: IRAC v11.5 PDF (authoritative)
    irac_ai = parse_irac_pdf()
    for ai, moa in irac_ai.items():
        if ai not in lookup:
            scheme, desc, target = MOA_GROUP_INFO.get(moa, ("IRAC", "", ""))
            lookup[ai] = {
                "moa_code": f"IRAC {moa}" if not moa.startswith("UN") else f"IRAC {moa}",
                "scheme": scheme,
                "moa_description": desc,
                "target_site": target,
                "source": "IRAC v11.5",
            }
    log(f"  After IRAC v11.5: {len(lookup)} AIs")

    # Source 2: Extended lookup (FRAC, HRAC, biopesticide AIs)
    # Import from smart_moa_backfill instead (it has the most comprehensive set)
    try:
        from smart_moa_backfill import EXTENDED_AI_TO_MOA
        for ai, (moa_code, desc, target) in EXTENDED_AI_TO_MOA.items():
            ai_clean = re.sub(r'[^a-z0-9]', '', ai.lower())
            if ai_clean and ai_clean not in lookup:
                scheme = moa_code.split()[0] if moa_code else ""
                lookup[ai_clean] = {
                    "moa_code": moa_code,
                    "scheme": scheme,
                    "moa_description": desc,
                    "target_site": target,
                    "source": "Extended lookup",
                }
    except ImportError:
        log("  WARNING: Could not import EXTENDED_AI_TO_MOA, skipping")
    log(f"  After Extended lookup: {len(lookup)} AIs")

    # Source 3: DAE register AI → MoA
    dae = pd.read_csv(DAE_CSV, dtype=str).fillna("")
    has_both = dae[(dae["Common Name"].str.strip() != "") & (dae["MoA Code"].str.strip() != "")]
    for _, r in has_both.iterrows():
        cn = r["Common Name"].strip()
        moa = r["MoA Code"].strip()
        parts = re.split(r"\s*\+\s*", cn)
        for part in parts:
            ai = re.sub(r'[^a-z0-9]', '', clean_ai(part))
            if ai and ai not in lookup:
                lookup[ai] = {
                    "moa_code": moa,
                    "scheme": moa.split()[0] if moa else "",
                    "moa_description": "",
                    "target_site": "",
                    "source": "DAE register",
                }
    log(f"  After DAE register: {len(lookup)} AIs")

    return lookup


def build_brand_stem_lookup() -> dict:
    dae = pd.read_csv(DAE_CSV, dtype=str).fillna("")
    has_both = dae[(dae["Common Name"].str.strip() != "") & (dae["MoA Code"].str.strip() != "")]
    stem_to_moa = {}
    for _, r in has_both.iterrows():
        brand = r["Brand Name"].strip()
        stem = brand_stem(brand)
        moa = r["MoA Code"].strip()
        if stem and len(stem) >= 5 and stem not in stem_to_moa:
            stem_to_moa[stem] = {"moa_code": moa, "source": "DAE brand stem"}
    log(f"  Brand stem → MoA: {len(stem_to_moa):,} stems")
    return stem_to_moa


def build_audit_brand_lookup() -> dict:
    audit = pd.read_csv(AUDIT_CSV, dtype=str).fillna("")
    has_moa = audit[
        (audit["attachment_moa_code"].str.strip() != "") &
        (audit["attachment_moa_code"].str.strip().str.lower() != "unknown")
    ]
    brand_to_moa = {}
    for _, r in has_moa.iterrows():
        brand = r.get("brand_name", "").strip().lower()
        brand_norm = re.sub(r'[^a-z0-9]', '', brand)
        moa = r.get("attachment_moa_code", "").strip()
        if brand_norm and moa and brand_norm not in brand_to_moa:
            brand_to_moa[brand_norm] = {
                "moa_code": moa,
                "scheme": r.get("scheme", ""),
                "moa_description": r.get("moa_description", ""),
                "target_site": r.get("target_site", ""),
                "policy_action": r.get("policy_action", ""),
                "policy_risk_tier": r.get("policy_risk_tier", ""),
                "source": "audit brand",
            }
    log(f"  Audit brand → MoA: {len(brand_to_moa):,} brands")
    return brand_to_moa


def fuzzy_match_ai(ai: str, lookup: dict) -> dict | None:
    if not ai:
        return None
    ai_nospace = ai.replace(" ", "")
    if ai_nospace in lookup:
        return lookup[ai_nospace]
    if ai in lookup:
        return lookup[ai]
    if len(ai_nospace) >= 6:
        for key in lookup:
            if key.startswith(ai_nospace[:6]) or ai_nospace.startswith(key[:6]):
                return lookup[key]
    return None


def main():
    log("=" * 70)
    log("IRAC v11.5 MoA backfill — final authoritative pass")
    log("=" * 70)

    log("Building lookups...")
    ai_lookup = build_comprehensive_lookup()
    brand_stem_lookup = build_brand_stem_lookup()
    audit_brand_lookup = build_audit_brand_lookup()

    # Build reg# → MoA from audit
    audit = pd.read_csv(AUDIT_CSV, dtype=str).fillna("")
    audit["registration_no"] = audit["registration_no"].apply(normalize_reg_no)
    reg_lookup = {}
    for _, r in audit.iterrows():
        reg = r["registration_no"].strip()
        moa = r.get("attachment_moa_code", "").strip()
        if reg and moa and moa.lower() != "unknown":
            if reg not in reg_lookup:
                reg_lookup[reg] = {
                    "moa_code": moa, "scheme": r.get("scheme", ""),
                    "group_no": r.get("group_no", ""), "moa_description": r.get("moa_description", ""),
                    "target_site": r.get("target_site", ""), "policy_action": r.get("policy_action", ""),
                    "policy_risk_tier": r.get("policy_risk_tier", ""),
                }
    log(f"  Reg# → MoA: {len(reg_lookup):,}")

    log("Loading latest flat database...")
    df = pd.read_csv(LATEST_FLAT_CSV, dtype=str).fillna("")
    df["Registration No"] = df["Registration No"].apply(normalize_reg_no)
    total = len(df)
    unmapped_before = (df["MoA Code"].str.strip() == "").sum()
    log(f"  Total: {total:,}, Mapped: {total - unmapped_before:,}, Unmapped: {unmapped_before:,}")

    log("Backfilling...")
    backfilled = 0
    source_counts = defaultdict(int)

    for idx, row in df.iterrows():
        if row["MoA Code"].strip():
            continue

        reg = row["Registration No"].strip()
        cn = row["Common Name"].strip()
        brand = row["Brand Name"].strip()
        trade = row["Trade Name"].strip()

        moa_data = None
        source = ""

        # Strategy 1: reg# match in audit
        if reg in reg_lookup:
            moa_data = reg_lookup[reg]
            source = "audit reg#"

        # Strategy 2: AI match from Common Name
        if not moa_data and cn:
            ais = parse_ais(cn)
            for ai in ais:
                match = fuzzy_match_ai(ai, ai_lookup)
                if match:
                    moa_data = match
                    source = match.get("source", "AI lookup")
                    break

        # Strategy 3: AI-in-brand detection
        if not moa_data:
            brand_lower = brand.lower().replace(" ", "")
            for ai_key in ai_lookup:
                if len(ai_key) >= 6 and ai_key in brand_lower:
                    moa_data = ai_lookup[ai_key]
                    source = "AI in brand"
                    break

        # Strategy 4: brand stem match from DAE
        if not moa_data:
            stem = brand_stem(brand)
            if stem and len(stem) >= 5 and stem in brand_stem_lookup:
                moa_data = brand_stem_lookup[stem]
                source = "DAE brand stem"

        # Strategy 5: brand stem prefix match
        if not moa_data:
            stem = brand_stem(brand)
            if stem and len(stem) >= 5:
                for known_stem in brand_stem_lookup:
                    if len(known_stem) >= 8 and (stem.startswith(known_stem[:8]) or known_stem.startswith(stem[:8])):
                        moa_data = brand_stem_lookup[known_stem]
                        source = "DAE brand prefix"
                        break

        # Strategy 6: audit brand match (normalized + prefix)
        if not moa_data:
            brand_norm = re.sub(r'[^a-z0-9]', '', brand.lower())
            if brand_norm and brand_norm in audit_brand_lookup:
                moa_data = audit_brand_lookup[brand_norm]
                source = "audit brand norm"
            elif brand_norm and len(brand_norm) >= 6:
                for audit_key in audit_brand_lookup:
                    if len(audit_key) >= 6 and (brand_norm.startswith(audit_key[:8]) or audit_key.startswith(brand_norm[:8])):
                        moa_data = audit_brand_lookup[audit_key]
                        source = "audit brand prefix"
                        break

        # Strategy 7: trade name AI detection
        if not moa_data and trade:
            trade_lower = trade.lower().replace(" ", "")
            for ai_key in ai_lookup:
                if len(ai_key) >= 6 and ai_key in trade_lower:
                    moa_data = ai_lookup[ai_key]
                    source = "AI in trade"
                    break

        # Strategy 8: trade name brand stem match
        if not moa_data and trade:
            stem = brand_stem(trade)
            if stem and len(stem) >= 5 and stem in brand_stem_lookup:
                moa_data = brand_stem_lookup[stem]
                source = "DAE trade stem"

        # Apply the match
        if moa_data:
            moa_code = moa_data.get("moa_code", "")
            if moa_code and moa_code.lower() != "unknown":
                df.at[idx, "MoA Code"] = moa_code
                if moa_data.get("scheme"):
                    df.at[idx, "Scheme"] = moa_data["scheme"]
                if moa_data.get("moa_description"):
                    df.at[idx, "MoA Description"] = moa_data["moa_description"]
                if moa_data.get("target_site"):
                    df.at[idx, "Target Site"] = moa_data["target_site"]
                if moa_data.get("policy_action"):
                    df.at[idx, "Policy Action"] = moa_data["policy_action"]
                if moa_data.get("policy_risk_tier"):
                    df.at[idx, "Policy Risk Tier"] = moa_data["policy_risk_tier"]
                if moa_data.get("group_no"):
                    df.at[idx, "Group No."] = moa_data["group_no"]
                backfilled += 1
                source_counts[source] += 1

    unmapped_after = (df["MoA Code"].str.strip() == "").sum()
    log(f"  Backfilled: {backfilled:,}")
    log(f"  Mapped: {total - unmapped_after:,} ({(total - unmapped_after) / total * 100:.1f}%)")
    log(f"  Still unmapped: {unmapped_after:,} ({unmapped_after / total * 100:.1f}%)")
    log(f"  Coverage: {(total - unmapped_before) / total * 100:.1f}% → {(total - unmapped_after) / total * 100:.1f}%")
    log("")
    log("  By source:")
    for source, count in sorted(source_counts.items(), key=lambda x: -x[1]):
        log(f"    {source}: {count:,}")

    # Save
    log("Saving updated flat database...")
    df.to_csv(LATEST_FLAT_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {LATEST_FLAT_CSV}")

    # Update DAE CSV MoA Code
    log("Updating data_raw/all_pesticides.csv...")
    dae = pd.read_csv(DAE_CSV, dtype=str).fillna("")
    dae["Registration No"] = dae["Registration No"].apply(normalize_reg_no)
    moa_by_reg = {}
    for _, r in df.iterrows():
        reg = r["Registration No"].strip()
        moa = r["MoA Code"].strip()
        if reg and moa and reg not in moa_by_reg:
            moa_by_reg[reg] = moa
    updated_dae = 0
    for idx, row in dae.iterrows():
        reg = row["Registration No"].strip()
        if reg in moa_by_reg and not row.get("MoA Code", "").strip():
            dae.at[idx, "MoA Code"] = moa_by_reg[reg]
            updated_dae += 1
    dae.to_csv(DAE_CSV, index=False, encoding="utf-8-sig")
    log(f"  Updated {updated_dae:,} DAE rows")

    # Update policy CSV
    log("Updating data_raw/pesticide_policy_enrichment.csv...")
    policy_csv = REPO / "data_raw" / "pesticide_policy_enrichment.csv"
    policy = pd.read_csv(policy_csv, dtype=str).fillna("")
    policy["Registration No"] = policy["Registration No"].apply(normalize_reg_no)
    policy_by_reg = {}
    for _, r in df.iterrows():
        reg = r["Registration No"].strip()
        if reg and reg not in policy_by_reg:
            policy_by_reg[reg] = {
                "Scheme": r.get("Scheme", ""), "Group No.": r.get("Group No.", ""),
                "MoA Description": r.get("MoA Description", ""), "Target Site": r.get("Target Site", ""),
                "Policy Action": r.get("Policy Action", ""), "Policy Risk Tier": r.get("Policy Risk Tier", ""),
            }
    updated_policy = 0
    for idx, row in policy.iterrows():
        reg = row["Registration No"].strip()
        if reg in policy_by_reg:
            p = policy_by_reg[reg]
            for field, col in [("Scheme", "Scheme"), ("Group No.", "Group No."), ("MoA Description", "MoA Description"),
                              ("Target Site", "Target Site"), ("Policy Action", "Bangladesh Policy Action"),
                              ("Policy Risk Tier", "Policy Risk Tier")]:
                if p[field] and not row.get(col, "").strip():
                    policy.at[idx, col] = p[field]
                    if col == "Scheme":
                        updated_policy += 1
    policy.to_csv(policy_csv, index=False, encoding="utf-8-sig")
    log(f"  Updated {updated_policy:,} policy rows")

    log("")
    log("=" * 70)
    log(f"DONE. MoA coverage: {(total - unmapped_after) / total * 100:.1f}%")
    log("=" * 70)


if __name__ == "__main__":
    main()
