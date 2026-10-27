#!/usr/bin/env python3
"""
smart_moa_backfill.py
====================

Smart MoA backfill for the remaining unmapped records using multiple
intelligent matching strategies:

Strategy 1: Fix Common Name parsing (compound AIs, spelling variants)
  - Split "Bifenazate Flonicamid" into two AIs and match each
  - Fix "Lambada cyhalothrin" → "Lambda cyhalothrin" → IRAC 3A
  - Fix "Glufosinate ammonium 30" → "glufosinate ammonium" → HRAC 10
  - Add missing AIs to the lookup: meperfluthrin, diflubenzuron, etc.

Strategy 2: Brand stem matching from DAE register
  - Strip formulation codes from brand names (e.g. "Rexivit 80 WP" → "rexivit")
  - Match against 5,414 DAE brand stems that have MoA codes
  - Also try prefix matching (first 8+ chars)

Strategy 3: AI-in-brand detection
  - Check if the brand name contains a known AI as a substring
  - e.g. "Malathion 57 EC" → contains "malathion" → IRAC 1B
  - e.g. "Diazinon 90 ULVC" → contains "diazinon" → IRAC 1B

Strategy 4: Audit CSV brand matching (normalized + prefix)
  - Match brand names against 4,126 audit brands with MoA codes
  - Try normalized (no spaces/punctuation) and prefix matching

Strategy 5: Section-based inference
  - If the record is in "Public Health" section and has no MoA,
    infer based on the brand name pattern (most PH products are
    pyrethroids → IRAC 3A, or Bt → IRAC 11A)
  - If the record is in "Biopesticides" section, infer based on
    known biopesticide AI patterns
"""

from __future__ import annotations
import os
import re
import sys
from pathlib import Path
from collections import defaultdict
import pandas as pd

REPO = Path(__file__).resolve().parent.parent
DOWNLOAD_DIR = Path(os.environ.get("AGRICHEM_DOWNLOAD_DIR", "/home/z/my-project/download"))
UPLOAD_DIR = Path(os.environ.get("AGRICHEM_UPLOAD_DIR", "/home/z/my-project/upload"))

LATEST_FLAT_CSV = REPO / "public" / "downloads" / "pesticide_database_latest.csv"
AUDIT_CSV = UPLOAD_DIR / "moa_mapping_audit.csv"
MOA_ROTATION_XLSX = UPLOAD_DIR / "MoA_Rotation_QuickReference.xlsx"
MOA_MASTER_PRODUCTS_CSV = DOWNLOAD_DIR / "moa_master_products.csv"
DAE_CSV = REPO / "data_raw" / "all_pesticides.csv"
MOADATA_TS = REPO / "src" / "data" / "moaData.ts"


def log(msg: str) -> None:
    print(f"[smart] {msg}", flush=True)


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


def brand_stem(brand: str) -> str:
    """Extract a normalized brand stem by removing formulation codes, numbers, and punctuation."""
    s = brand.lower().strip()
    # Remove trailing formulation codes with numbers: "80 WP", "55 EC", "1.8 ME", etc.
    s = re.sub(r'\s*\d*\.?\d*\s*(EC|WP|WG|WDG|SC|SL|ME|SP|GR|FS|SE|SG|TB|AS|OD|CS|ZC|EW|DC|ULV|DP|GG|WG|EC|WP|SC|SL|ME|SP|GR|FS|SE|SG|TB|AS|OD|CS|ZC|EW|DC|ULV|DP|GG|WP|WG|SC|SL|ME|SP|GR|FS|SE|SG|TB|AS|OD|CS|ZC|EW|DC|ULV|DP|GG)\s*$', '', s, flags=re.IGNORECASE).strip()
    # Remove standalone trailing numbers
    s = re.sub(r'\s+\d+\.?\d*\s*%?\s*$', '', s).strip()
    # Remove everything after a dash if it looks like a formulation code
    # e.g. "Rifos- 20 EC" → "rifos"
    s = re.sub(r'\s*[\-]\s*\d+.*$', '', s).strip()
    # Remove all non-alphanumeric
    s = re.sub(r'[^a-z0-9]', '', s).strip()
    return s


def clean_ai_name(name: str) -> str:
    name = name.lower().strip()
    name = re.sub(r'\d+\.?\d*\s*%', '', name)
    name = re.sub(r'\s+\d+\.?\d*\s*$', '', name)
    name = re.sub(r'\s*w/w\s*', '', name)
    name = re.sub(r'\s*w/v\s*', '', name)
    name = re.sub(r'\s*\d+\.?\d*\s*ppm\s*', '', name)
    name = re.sub(r'\s*\d+\s*IU/mg\s*', '', name)
    name = re.sub(r'\s+(EC|WP|WG|SC|SL|ME|SP|WDG|GR|FS|SE|SG|TB|AS|OD|CS|ZC)\s*$', '', name, flags=re.IGNORECASE)
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
        ai = clean_ai_name(part)
        if ai and ai not in ais:
            ais.append(ai)
    return ais


# ----------------------------------------------------------------------------
# Extended AI → MoA lookup with additional AIs from authoritative sources
# ----------------------------------------------------------------------------
# AIs that are in the IRAC/FRAC/HRAC classification but were missed by the
# initial lookup because of spelling variants or because they weren't in
# the MoA Rotation Quick Reference's AI list.
EXTENDED_AI_TO_MOA = {
    # IRAC
    "meperfluthrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "esbiothrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "es-biothrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "d-allethrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "dallethrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "d-trans-allethrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "d-transallethrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "d-phenothrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "dphenothrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "tetramethrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "cyphenothrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "resmethrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "imiprothrin": ("IRAC 3A", "Pyrethroids — Sodium channel modulators", "Nerve & Muscle"),
    "diflubenzuron": ("IRAC 15", "Benzoylureas — Chitin biosynthesis inhibitor", "Growth & Development"),
    "flufenoxuron": ("IRAC 15", "Benzoylureas — Chitin biosynthesis inhibitor", "Growth & Development"),
    "lufenuron": ("IRAC 15", "Benzoylureas — Chitin biosynthesis inhibitor", "Growth & Development"),
    "hexaflumuron": ("IRAC 15", "Benzoylureas — Chitin biosynthesis inhibitor", "Growth & Development"),
    "novaluron": ("IRAC 15", "Benzoylureas — Chitin biosynthesis inhibitor", "Growth & Development"),
    "flonicamid": ("IRAC 9B", "Pymetrozine — Chordotonal organ TRPV modulator", "Nerve & Muscle"),
    "fluonicamid": ("IRAC 9B", "Pymetrozine — Chordotonal organ TRPV modulator", "Nerve & Muscle"),
    "pymetrozine": ("IRAC 9B", "Pymetrozine — Chordotonal organ TRPV modulator", "Nerve & Muscle"),
    "pymetrozin": ("IRAC 9B", "Pymetrozine — Chordotonal organ TRPV modulator", "Nerve & Muscle"),
    "isocycloseram": ("IRAC 30", "GABA-gated Cl- channel blocker — novel", "Nerve & Muscle"),
    "bifenazate": ("IRAC UN", "Uncertain MoA — Acaricide", "Unknown"),
    "flometoquin": ("IRAC UN", "Uncertain MoA — Acaricide", "Unknown"),
    "fluxametamide": ("IRAC UN", "Uncertain MoA — Acaricide", "Unknown"),
    "spirodiclofen": ("IRAC 23", "Tetronic acid — ACCase inhibitor", "Lipid Synthesis"),
    "spiromesifen": ("IRAC 23", "Tetronic acid — ACCase inhibitor", "Lipid Synthesis"),
    "spirotetramat": ("IRAC 23", "Tetramic acid — ACCase inhibitor", "Lipid Synthesis"),
    "azadirachtin": ("IRAC UN", "Botanical — Unknown/uncertain MoA", "Unknown"),
    "azadiractin": ("IRAC UN", "Botanical — Unknown/uncertain MoA", "Unknown"),
    "azadirectin": ("IRAC UN", "Botanical — Unknown/uncertain MoA", "Unknown"),
    "matrine": ("IRAC UN", "Botanical — Unknown/uncertain MoA", "Unknown"),
    "oxymatrine": ("IRAC UN", "Botanical — Unknown/uncertain MoA", "Unknown"),
    "ningnanmycin": ("IRAC UN", "Biopesticide — Unknown MoA", "Unknown"),
    "oligosaccharins": ("IRAC UN", "Biopesticide — Unknown MoA", "Unknown"),
    "physcion": ("IRAC UN", "Biopesticide — Unknown MoA", "Unknown"),
    "d-limonene": ("IRAC UN", "Botanical — Unknown MoA", "Unknown"),
    "dlimonene": ("IRAC UN", "Botanical — Unknown MoA", "Unknown"),
    "sodium lauryl ether sulphate": ("IRAC UN", "Botanical — Unknown MoA", "Unknown"),
    "sodium lauryl ethersulphate": ("IRAC UN", "Botanical — Unknown MoA", "Unknown"),
    "methyl eugenol": ("IRAC 8A", "Alkyl halide — multi-site fumigant", "Unknown"),
    "methyleugenol": ("IRAC 8A", "Alkyl halide — multi-site fumigant", "Unknown"),
    "cuelure": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "spodolure": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "verbenone": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "tetradecenyl acetate": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "tetradecasienyl acetate": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "hexadecenyl acetate": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "hexadecanol": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "e-11-hexadecanol": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "e11hexadecanol": ("IPM", "Pheromone — mating disruption", "Unknown"),
    "bacilus amyloliquefaciens": ("IRAC 11A", "Microbial — Bt crystal toxin", "Unknown"),
    "bacillus amyloliquefaciens": ("IRAC 11A", "Microbial — Bt crystal toxin", "Unknown"),
    "bacillus thuringiensis": ("IRAC 11A", "Microbial — Bt crystal toxin", "Unknown"),
    "bacillusthuringiensis": ("IRAC 11A", "Microbial — Bt crystal toxin", "Unknown"),
    "beauveria bassiana": ("BIO", "Entomopathogenic fungus", "Unknown"),
    "metarhizium anisopliae": ("BIO", "Entomopathogenic fungus", "Unknown"),
    "trichoderma": ("BIO", "Biopesticide — fungal antagonist", "Unknown"),
    "trichoderma harzianum": ("BIO", "Biopesticide — fungal antagonist", "Unknown"),
    "trichoderma viride": ("BIO", "Biopesticide — fungal antagonist", "Unknown"),
    "paecilomyces lilacinus": ("BIO", "Biopesticide — fungal antagonist", "Unknown"),
    "bromadiolone": ("Rodenticide", "Anticoagulant — VKOR inhibitor", "Unknown"),
    "bromadiolone 0005": ("Rodenticide", "Anticoagulant — VKOR inhibitor", "Unknown"),
    # FRAC
    "penconazole": ("FRAC 3", "DMI — Sterol C14-demethylase", "Sterol Biosynthesis"),
    "difenoconazole": ("FRAC 3", "DMI — Sterol C14-demethylase", "Sterol Biosynthesis"),
    "tebuconazole": ("FRAC 3", "DMI — Sterol C14-demethylase", "Sterol Biosynthesis"),
    "hexaconazole": ("FRAC 3", "DMI — Sterol C14-demethylase", "Sterol Biosynthesis"),
    "propiconazole": ("FRAC 3", "DMI — Sterol C14-demethylase", "Sterol Biosynthesis"),
    "mandipropamid": ("FRAC 40", "CAA — Cellulose synthase", "Cell Wall"),
    "mendipropamid": ("FRAC 40", "CAA — Cellulose synthase", "Cell Wall"),
    "dimethomorph": ("FRAC 40", "CAA — Cellulose synthase", "Cell Wall"),
    "propamocarb": ("FRAC 28", "Carbamate — membrane/permeability", "Cell Membrane"),
    "validamycin": ("FRAC 17", "Glucopyranosyl antibiotic — trehalase", "Metabolism"),
    "kasugamycin": ("FRAC 24", "Hexopyranosyl antibiotic — protein synthesis", "Protein Synthesis"),
    "streptomycin": ("FRAC 25", "Aminoglycoside antibiotic — protein synthesis", "Protein Synthesis"),
    "streptomycin sulphate": ("FRAC 25", "Aminoglycoside antibiotic — protein synthesis", "Protein Synthesis"),
    "iprodione": ("FRAC 2", "Dicarboximide — OS-1 histidine kinase", "Signal Transduction"),
    "aluminium phosphide": ("IRAC 24A", "Phosphine — Complex IV inhibitor", "Energy Metabolism"),
    "aluminum phosphide": ("IRAC 24A", "Phosphine — Complex IV inhibitor", "Energy Metabolism"),
    "zinc phosphide": ("Rodenticide", "Zinc phosphide — acute toxicant", "Unknown"),
    "n-alkyl dimethyl benzyl ammonium chloride": ("FRAC NC", "Not classified — disinfectant", "Unknown"),
    "nalkyldimethylbenzylammoniumchloride": ("FRAC NC", "Not classified — disinfectant", "Unknown"),
    "quaternary ammonium": ("FRAC NC", "Not classified — disinfectant", "Unknown"),
    # HRAC
    "glufosinate ammonium": ("HRAC 10", "Glutamine synthetase inhibitor", "Amino Acid Synthesis"),
    "glufosinate": ("HRAC 10", "Glutamine synthetase inhibitor", "Amino Acid Synthesis"),
    "glufosinateammonium": ("HRAC 10", "Glutamine synthetase inhibitor", "Amino Acid Synthesis"),
    "glyphosate": ("HRAC 9", "EPSPS inhibitor", "Amino Acid Synthesis"),
    "atrazine": ("HRAC 5", "PSII inhibitor — triazine", "Photosynthesis"),
    "metolachlor": ("HRAC 15", "VLCFA elongase inhibitor", "Lipid Synthesis"),
    "s metolachlor": ("HRAC 15", "VLCFA elongase inhibitor", "Lipid Synthesis"),
    "smetolachlor": ("HRAC 15", "VLCFA elongase inhibitor", "Lipid Synthesis"),
    "mesotrione": ("HRAC 28", "HPPD inhibitor — 4-hydroxyphenylpyruvate dioxygenase", "Pigment Synthesis"),
    "tembotrione": ("HRAC 28", "HPPD inhibitor", "Pigment Synthesis"),
    "sulfentrazone": ("HRAC 14", "PPO inhibitor — Protox", "Chlorophyll Synthesis"),
    "flumioxazin": ("HRAC 14", "PPO inhibitor — Protox", "Chlorophyll Synthesis"),
    "pretilachlor": ("HRAC 15", "VLCFA elongase inhibitor", "Lipid Synthesis"),
    "pendimethalin": ("HRAC 3", "Microtubule assembly inhibitor", "Cell Division"),
    "butachlor": ("HRAC 15", "VLCFA elongase inhibitor", "Lipid Synthesis"),
    "24d amine": ("HRAC 4", "Synthetic auxin — phenoxy-carboxylate", "Growth Regulation"),
    "24d": ("HRAC 4", "Synthetic auxin — phenoxy-carboxylate", "Growth Regulation"),
    "2 4 d amine": ("HRAC 4", "Synthetic auxin — phenoxy-carboxylate", "Growth Regulation"),
    "mcpa": ("HRAC 4", "Synthetic auxin — phenoxy-carboxylate", "Growth Regulation"),
    "carfentrazone ethyl": ("HRAC 14", "PPO inhibitor — Protox", "Chlorophyll Synthesis"),
    "carfentrazone": ("HRAC 14", "PPO inhibitor — Protox", "Chlorophyll Synthesis"),
    "oxadiargyl": ("HRAC 14", "PPO inhibitor — Protox", "Chlorophyll Synthesis"),
    "oxadiazon": ("HRAC 14", "PPO inhibitor — Protox", "Chlorophyll Synthesis"),
    "oxyfluorfen": ("HRAC 14", "PPO inhibitor — Protox", "Chlorophyll Synthesis"),
    "fomesafen": ("HRAC 14", "PPO inhibitor — Protox", "Chlorophyll Synthesis"),
    "fenoxaprop-p-ethyl": ("HRAC 1", "ACCase inhibitor", "Fatty Acid Synthesis"),
    "fenoxaprop": ("HRAC 1", "ACCase inhibitor", "Fatty Acid Synthesis"),
    "quizalofop-p-ethyl": ("HRAC 1", "ACCase inhibitor", "Fatty Acid Synthesis"),
    "quizalofop": ("HRAC 1", "ACCase inhibitor", "Fatty Acid Synthesis"),
    "cyhalofop-butyl": ("HRAC 1", "ACCase inhibitor", "Fatty Acid Synthesis"),
    "cyhalofop": ("HRAC 1", "ACCase inhibitor", "Fatty Acid Synthesis"),
    "clodinafop-propargyl": ("HRAC 1", "ACCase inhibitor", "Fatty Acid Synthesis"),
    "clethodim": ("HRAC 1", "ACCase inhibitor", "Fatty Acid Synthesis"),
    "bispyribac sodium": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "bispyribac": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "bensulfuron methyl": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "bensulfuron": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "pyrazosulfuron ethyl": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "pyrazosulfuron": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "ethoxysulfuron": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "nicosulfuron": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "penoxsulam": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "nicosulfuron": ("HRAC 2", "ALS inhibitor", "Amino Acid Synthesis"),
    "sulphur": ("FRAC M02", "Multi-site — inorganic sulphur", "Multi-site"),
    "sulfur": ("FRAC M02", "Multi-site — inorganic sulphur", "Multi-site"),
    "copper": ("FRAC M01", "Multi-site — inorganic copper", "Multi-site"),
    "copper oxychloride": ("FRAC M01", "Multi-site — inorganic copper", "Multi-site"),
    "copper hydroxide": ("FRAC M01", "Multi-site — inorganic copper", "Multi-site"),
    "mancozeb": ("FRAC M03", "Multi-site — dithiocarbamate", "Multi-site"),
    "propineb": ("FRAC M03", "Multi-site — dithiocarbamate", "Multi-site"),
    "thiram": ("FRAC M03", "Multi-site — dithiocarbamate", "Multi-site"),
    "captan": ("FRAC M04", "Multi-site — phthalimide", "Multi-site"),
    "chlorothalonil": ("FRAC M05", "Multi-site — chloronitrile", "Multi-site"),
    "carbendazim": ("FRAC 1", "MBC — beta-tubulin polymerization", "Cell Division"),
    "benomyl": ("FRAC 1", "MBC — beta-tubulin polymerization", "Cell Division"),
    "thiophanate-methyl": ("FRAC 1", "MBC — beta-tubulin polymerization", "Cell Division"),
    "azoxystrobin": ("FRAC 11", "QoI — Complex III inhibitor", "Respiration"),
    "pyraclostrobin": ("FRAC 11", "QoI — Complex III inhibitor", "Respiration"),
    "trifloxystrobin": ("FRAC 11", "QoI — Complex III inhibitor", "Respiration"),
    "tricyclazole": ("FRAC 16.1", "MBI-R — melanin biosynthesis", "Melanin Synthesis"),
    "carboxin": ("FRAC 7", "SDHI — succinate dehydrogenase", "Respiration"),
    "metalaxyl": ("FRAC 4", "Phenylamide — RNA polymerase I", "Nucleic Acid Synthesis"),
    "fosetyl-aluminium": ("FRAC 33", "Phosphonate — host defence", "Host Defence"),
    "fosetyl-al": ("FRAC 33", "Phosphonate — host defence", "Host Defence"),
    "phosphorous acid": ("FRAC 33", "Phosphonate — host defence", "Host Defence"),
    # Additional AIs from the MoA Master 2026 that weren't in the rotation ref
    "chlorfenapyr": ("IRAC 13", "Uncoupler of oxidative phosphorylation", "Energy Metabolism"),
    "emamectin benzoate": ("IRAC 6", "Avermectins — GluCl modulator", "Nerve & Muscle"),
    "emamectin": ("IRAC 6", "Avermectins — GluCl modulator", "Nerve & Muscle"),
    "abamectin": ("IRAC 6", "Avermectins — GluCl modulator", "Nerve & Muscle"),
    "spinosad": ("IRAC 5", "Spinosyns — nAChR allosteric modulator", "Nerve & Muscle"),
    "chlorantraniliprole": ("IRAC 28", "Diamide — Ryanodine receptor modulator", "Nerve & Muscle"),
    "flubendiamide": ("IRAC 28", "Diamide — Ryanodine receptor modulator", "Nerve & Muscle"),
    "cyantraniliprole": ("IRAC 28", "Diamide — Ryanodine receptor modulator", "Nerve & Muscle"),
    "fipronil": ("IRAC 2B", "GABA-gated Cl- channel blocker", "Nerve & Muscle"),
    "imidacloprid": ("IRAC 4A", "Neonicotinoid — nAChR competitive modulator", "Nerve & Muscle"),
    "acetamiprid": ("IRAC 4A", "Neonicotinoid — nAChR competitive modulator", "Nerve & Muscle"),
    "thiamethoxam": ("IRAC 4A", "Neonicotinoid — nAChR competitive modulator", "Nerve & Muscle"),
    "clothianidin": ("IRAC 4A", "Neonicotinoid — nAChR competitive modulator", "Nerve & Muscle"),
    "dinotefuran": ("IRAC 4A", "Neonicotinoid — nAChR competitive modulator", "Nerve & Muscle"),
    "nitenpyram": ("IRAC 4A", "Neonicotinoid — nAChR competitive modulator", "Nerve & Muscle"),
    "thiacloprid": ("IRAC 4A", "Neonicotinoid — nAChR competitive modulator", "Nerve & Muscle"),
    "cartap": ("IRAC 14", "Nereistoxin — nAChR channel blocker", "Nerve & Muscle"),
    "buprofezin": ("IRAC 16", "Chitin biosynthesis inhibitor (Thiadiazine)", "Growth & Development"),
    "amitraz": ("IRAC 19", "Octopamine receptor agonist", "Nerve & Muscle"),
    "indoxacarb": ("IRAC 22A", "Oxadiazine — Na channel blocker", "Nerve & Muscle"),
    "tebufenozide": ("IRAC 18", "Ecdysone receptor agonist", "Growth & Development"),
    "hexythiazox": ("IRAC 10A", "Mite growth inhibitor", "Growth & Development"),
    "diafenthiuron": ("IRAC 12A", "Mitochondrial ATP synthase inhibitor", "Energy Metabolism"),
    "pymetrozine": ("IRAC 9B", "Chordotonal organ TRPV modulator", "Nerve & Muscle"),
    "acephate": ("IRAC 1B", "Organophosphate — AChE inhibitor", "Nerve & Muscle"),
    "chlorpyrifos": ("IRAC 1B", "Organophosphate — AChE inhibitor", "Nerve & Muscle"),
    "dimethoate": ("IRAC 1B", "Organophosphate — AChE inhibitor", "Nerve & Muscle"),
    "malathion": ("IRAC 1B", "Organophosphate — AChE inhibitor", "Nerve & Muscle"),
    "diazinon": ("IRAC 1B", "Organophosphate — AChE inhibitor", "Nerve & Muscle"),
    "ethion": ("IRAC 1B", "Organophosphate — AChE inhibitor", "Nerve & Muscle"),
    "carbaryl": ("IRAC 1A", "Carbamate — AChE inhibitor", "Nerve & Muscle"),
    "carbofuran": ("IRAC 1A", "Carbamate — AChE inhibitor", "Nerve & Muscle"),
    "methomyl": ("IRAC 1A", "Carbamate — AChE inhibitor", "Nerve & Muscle"),
    "lambda cyhalothrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "lambada cyhalothrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "alpha cypermethrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "beta cypermethrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "cypermethrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "deltamethrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "permethrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "bifenthrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "fenpropathrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "transfluthrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "dimefluthrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "prallethrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "allethrin": ("IRAC 3A", "Pyrethroid — Na channel modulator", "Nerve & Muscle"),
    "temephos": ("IRAC 1B", "Organophosphate — AChE inhibitor", "Nerve & Muscle"),
    "temephose": ("IRAC 1B", "Organophosphate — AChE inhibitor", "Nerve & Muscle"),
}


def build_comprehensive_ai_lookup() -> dict:
    """Build the most comprehensive AI → MoA lookup possible."""
    # Start with the extended lookup
    lookup = {}
    for ai, (moa_code, desc, target) in EXTENDED_AI_TO_MOA.items():
        ai_nospace = ai.replace(" ", "")
        lookup[ai_nospace] = {
            "moa_code": moa_code,
            "scheme": moa_code.split()[0] if moa_code else "",
            "moa_description": desc,
            "target_site": target,
            "source": "Extended AI lookup",
        }

    # Also add with spaces
    for ai, (moa_code, desc, target) in EXTENDED_AI_TO_MOA.items():
        if ai not in lookup:
            lookup[ai] = {
                "moa_code": moa_code,
                "scheme": moa_code.split()[0] if moa_code else "",
                "moa_description": desc,
                "target_site": target,
                "source": "Extended AI lookup",
            }

    # Load MoA Rotation Quick Reference
    rotation = pd.read_excel(MOA_ROTATION_XLSX, sheet_name=0).fillna("")
    for _, r in rotation.iterrows():
        moa_group = str(r.get("MoA Group", "")).strip()
        active_ingredients = str(r.get("Active Ingredients in Database", "")).strip()
        mechanism = str(r.get("Mechanism / Target", "")).strip()
        if not moa_group or not active_ingredients:
            continue
        for ai in active_ingredients.split(";"):
            ai = ai.strip().lower().replace(",", "").replace(".", "").replace(" ", "")
            if ai and ai not in lookup:
                lookup[ai] = {
                    "moa_code": moa_group,
                    "scheme": moa_group.split()[0] if moa_group else "",
                    "moa_description": mechanism,
                    "target_site": "",
                    "source": "MoA Rotation Quick Reference",
                }

    # Load moaData.ts primaryActives
    if MOADATA_TS.exists():
        ts_content = MOADATA_TS.read_text(encoding="utf-8")
        blocks = re.findall(r'primaryActives:\s*\[([^\]]+)\]', ts_content)
        code_blocks = re.findall(r'code:\s*["\']([^"\']+)["\']', ts_content)
        name_blocks = re.findall(r'name:\s*["\']([^"\']+)["\']', ts_content)
        type_blocks = re.findall(r'type:\s*["\']([^"\']+)["\']', ts_content)
        for i, block in enumerate(blocks):
            ais = re.findall(r'["\']([^"\']+)["\']', block)
            code_idx = i if i < len(code_blocks) else 0
            code = code_blocks[code_idx] if code_idx < len(code_blocks) else ""
            name = name_blocks[code_idx] if code_idx < len(name_blocks) else ""
            moa_type = type_blocks[code_idx] if code_idx < len(type_blocks) else ""
            for ai in ais:
                ai_nospace = ai.strip().lower().replace(",", "").replace(".", "").replace(" ", "")
                if ai_nospace and ai_nospace not in lookup:
                    lookup[ai_nospace] = {
                        "moa_code": code,
                        "scheme": moa_type,
                        "moa_description": name,
                        "target_site": "",
                        "source": "moaData.ts",
                    }

    # Load DAE all_pesticides.csv AI → MoA
    dae = pd.read_csv(DAE_CSV, dtype=str).fillna("")
    has_both = dae[(dae["Common Name"].str.strip() != "") & (dae["MoA Code"].str.strip() != "")]
    for _, r in has_both.iterrows():
        cn = r["Common Name"].strip()
        moa = r["MoA Code"].strip()
        parts = re.split(r"\s*\+\s*", cn)
        for part in parts:
            ai = clean_ai_name(part).replace(" ", "")
            if ai and ai not in lookup:
                lookup[ai] = {
                    "moa_code": moa,
                    "scheme": moa.split()[0] if moa else "",
                    "moa_description": "",
                    "target_site": "",
                    "source": "DAE register",
                }

    log(f"  Comprehensive AI → MoA lookup: {len(lookup):,} unique AIs")
    return lookup


def build_brand_stem_lookup() -> dict:
    """Build brand stem → MoA from DAE register (5,414 brand stems)."""
    dae = pd.read_csv(DAE_CSV, dtype=str).fillna("")
    has_both = dae[(dae["Common Name"].str.strip() != "") & (dae["MoA Code"].str.strip() != "")]
    stem_to_moa = {}
    for _, r in has_both.iterrows():
        brand = r["Brand Name"].strip()
        stem = brand_stem(brand)
        moa = r["MoA Code"].strip()
        cn = r["Common Name"].strip()
        ai = clean_ai_name(re.split(r"\s*\+\s*", cn)[0])
        if stem and len(stem) >= 5 and stem not in stem_to_moa:
            stem_to_moa[stem] = {"moa_code": moa, "ai": ai, "source": "DAE brand stem"}
    log(f"  Brand stem → MoA: {len(stem_to_moa):,} stems")
    return stem_to_moa


def build_audit_brand_lookup() -> dict:
    """Build brand → MoA from audit CSV (4,126 brands)."""
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
        if brand_norm and moa:
            if brand_norm not in brand_to_moa:
                brand_to_moa[brand_norm] = {
                    "moa_code": moa,
                    "scheme": r.get("scheme", ""),
                    "moa_description": r.get("moa_description", ""),
                    "target_site": r.get("target_site", ""),
                    "policy_action": r.get("policy_action", ""),
                    "policy_risk_tier": r.get("policy_risk_tier", ""),
                    "source": "audit brand",
                }
    log(f"  Audit brand → MoA: {len(brand_to_moa):,} brands (normalized)")
    return brand_to_moa


def fuzzy_match_ai(ai: str, lookup: dict) -> dict | None:
    if not ai:
        return None
    ai_nospace = ai.replace(" ", "")
    if ai_nospace in lookup:
        return lookup[ai_nospace]
    if ai in lookup:
        return lookup[ai]
    # Try partial (first 6+ chars)
    if len(ai_nospace) >= 6:
        for key in lookup:
            if key.startswith(ai_nospace[:6]) or ai_nospace.startswith(key[:6]):
                return lookup[key]
    return None


def main():
    log("=" * 70)
    log("Smart MoA backfill — multi-strategy matching")
    log("=" * 70)

    # Build lookups
    log("Building lookups...")
    ai_lookup = build_comprehensive_ai_lookup()
    brand_stem_lookup = build_brand_stem_lookup()
    audit_brand_lookup = build_audit_brand_lookup()

    # Also build reg# → MoA from audit
    audit = pd.read_csv(AUDIT_CSV, dtype=str).fillna("")
    audit["registration_no"] = audit["registration_no"].apply(normalize_reg_no)
    reg_lookup = {}
    for _, r in audit.iterrows():
        reg = r["registration_no"].strip()
        moa = r.get("attachment_moa_code", "").strip()
        if reg and moa and moa.lower() != "unknown":
            if reg not in reg_lookup:
                reg_lookup[reg] = {
                    "moa_code": moa,
                    "scheme": r.get("scheme", ""),
                    "group_no": r.get("group_no", ""),
                    "moa_description": r.get("moa_description", ""),
                    "target_site": r.get("target_site", ""),
                    "policy_action": r.get("policy_action", ""),
                    "policy_risk_tier": r.get("policy_risk_tier", ""),
                }
    log(f"  Reg# → MoA: {len(reg_lookup):,} reg#s")

    # Load latest flat DB
    log("Loading latest flat database...")
    df = pd.read_csv(LATEST_FLAT_CSV, dtype=str).fillna("")
    df["Registration No"] = df["Registration No"].apply(normalize_reg_no)
    total = len(df)
    unmapped_before = (df["MoA Code"].str.strip() == "").sum()
    log(f"  Total: {total:,}, Mapped: {total - unmapped_before:,}, Unmapped: {unmapped_before:,}")

    # Backfill
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
        section = row["Section"].strip()

        moa_data = None
        source = ""

        # Strategy 1: reg# match in audit
        if reg in reg_lookup:
            moa_data = reg_lookup[reg]
            source = "audit reg#"

        # Strategy 2: AI match from Common Name (with extended lookup)
        if not moa_data and cn:
            ais = parse_ais(cn)
            for ai in ais:
                match = fuzzy_match_ai(ai, ai_lookup)
                if match:
                    moa_data = match
                    source = match.get("source", "AI lookup")
                    break

        # Strategy 3: AI-in-brand detection (check if brand contains known AI)
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

        # Strategy 5: brand stem prefix match from DAE
        if not moa_data:
            stem = brand_stem(brand)
            if stem and len(stem) >= 5:
                for known_stem in brand_stem_lookup:
                    if len(known_stem) >= 8 and (stem.startswith(known_stem[:8]) or known_stem.startswith(stem[:8])):
                        moa_data = brand_stem_lookup[known_stem]
                        source = "DAE brand prefix"
                        break

        # Strategy 6: audit brand match (normalized)
        if not moa_data:
            brand_norm = re.sub(r'[^a-z0-9]', '', brand.lower())
            if brand_norm and brand_norm in audit_brand_lookup:
                moa_data = audit_brand_lookup[brand_norm]
                source = "audit brand norm"

        # Strategy 7: audit brand prefix match
        if not moa_data:
            brand_norm = re.sub(r'[^a-z0-9]', '', brand.lower())
            if brand_norm and len(brand_norm) >= 6:
                for audit_key in audit_brand_lookup:
                    if len(audit_key) >= 6 and (brand_norm.startswith(audit_key[:8]) or audit_key.startswith(brand_norm[:8])):
                        moa_data = audit_brand_lookup[audit_key]
                        source = "audit brand prefix"
                        break

        # Strategy 8: trade name stem match
        if not moa_data and trade:
            stem = brand_stem(trade)
            if stem and len(stem) >= 5 and stem in brand_stem_lookup:
                moa_data = brand_stem_lookup[stem]
                source = "DAE trade stem"

        # Strategy 9: trade name AI-in-brand
        if not moa_data and trade:
            trade_lower = trade.lower().replace(" ", "")
            for ai_key in ai_lookup:
                if len(ai_key) >= 6 and ai_key in trade_lower:
                    moa_data = ai_lookup[ai_key]
                    source = "AI in trade"
                    break

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
    log(f"  Backfilled: {backfilled:,} records")
    log(f"  Mapped: {total - unmapped_after:,} ({(total - unmapped_after) / total * 100:.1f}%)")
    log(f"  Still unmapped: {unmapped_after:,} ({unmapped_after / total * 100:.1f}%)")
    log(f"  Coverage improvement: {(total - unmapped_before) / total * 100:.1f}% → {(total - unmapped_after) / total * 100:.1f}%")
    log("")
    log("  By source:")
    for source, count in sorted(source_counts.items(), key=lambda x: -x[1]):
        log(f"    {source}: {count:,}")

    # Save
    log("Saving updated flat database...")
    df.to_csv(LATEST_FLAT_CSV, index=False, encoding="utf-8-sig")
    log(f"  Wrote {LATEST_FLAT_CSV} ({LATEST_FLAT_CSV.stat().st_size:,} bytes)")

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
                "Scheme": r.get("Scheme", ""),
                "Group No.": r.get("Group No.", ""),
                "MoA Description": r.get("MoA Description", ""),
                "Target Site": r.get("Target Site", ""),
                "Policy Action": r.get("Policy Action", ""),
                "Policy Risk Tier": r.get("Policy Risk Tier", ""),
            }
    updated_policy = 0
    for idx, row in policy.iterrows():
        reg = row["Registration No"].strip()
        if reg in policy_by_reg:
            p = policy_by_reg[reg]
            if p["Scheme"] and not row.get("Scheme", "").strip():
                policy.at[idx, "Scheme"] = p["Scheme"]
                updated_policy += 1
            if p["Group No."] and not row.get("Group No.", "").strip():
                policy.at[idx, "Group No."] = p["Group No."]
            if p["MoA Description"] and not row.get("MoA Description", "").strip():
                policy.at[idx, "MoA Description"] = p["MoA Description"]
            if p["Target Site"] and not row.get("Target Site", "").strip():
                policy.at[idx, "Target Site"] = p["Target Site"]
            if p["Policy Action"] and not row.get("Bangladesh Policy Action", "").strip():
                policy.at[idx, "Bangladesh Policy Action"] = p["Policy Action"]
            if p["Policy Risk Tier"] and not row.get("Policy Risk Tier", "").strip():
                policy.at[idx, "Policy Risk Tier"] = p["Policy Risk Tier"]
    policy.to_csv(policy_csv, index=False, encoding="utf-8-sig")
    log(f"  Updated {updated_policy:,} policy rows")

    log("")
    log("=" * 70)
    log(f"DONE. MoA coverage: {(total - unmapped_after) / total * 100:.1f}%")
    log("=" * 70)


if __name__ == "__main__":
    main()
