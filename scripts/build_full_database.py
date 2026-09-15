import csv
import json
import os
import re

# Import the IRAC mapping dictionary
from irac_mapping import IRAC_MAP

print(f"Loaded IRAC_MAP with {len(IRAC_MAP)} active ingredient definitions.")

# Load existing curated insecticides from src/data/insecticidesData.ts
with open('src/data/insecticidesData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON array from file
m = re.search(r'export const INSECTICIDES_DATABASE:\s*ChemicalProduct\[\]\s*=\s*(\[[\s\S]*?\]);', content)
existing_insecticides = []
if m:
    try:
        existing_insecticides = json.loads(m.group(1))
        print(f"Loaded {len(existing_insecticides)} existing curated insecticides.")
    except Exception as e:
        print("Error parsing existing insecticides:", e)

# Track existing registration numbers and trade names
existing_regs = set(p['registrationNo'].strip().upper() for p in existing_insecticides if p.get('registrationNo'))
existing_names = set(p['tradeName'].strip().upper() for p in existing_insecticides if p.get('tradeName'))

# Process data_raw/insecticides_ptac81_part1.csv (121 Abamectin products from 81st PTAC)
abamectin_intel = IRAC_MAP['Abamectin']
abamectin_products = []

with open('data_raw/insecticides_ptac81_part1.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    for r in reader:
        if len(r) < 10:
            continue
        # Header: ['', 'SL No (Common Name)', 'Common Name', 'SL No (Products)', 'Brand Name', 'Registration No', 'Registration Holder', 'Recommended Crops', 'Recommended Pests', 'Dosage Rate', 'Recommendations...', 'No. of Recommendations']
        common_name = r[2].strip() or 'Abamectin'
        trade_name = r[4].strip()
        reg_no = r[5].strip()
        holder = r[6].strip()
        crops_str = r[7].strip()
        pests_str = r[8].strip()
        dosage_rate = r[9].strip()

        if not trade_name:
            continue

        crops = [c.strip() for c in re.split(r'[,|/]', crops_str) if c.strip()]
        pests = [p.strip() for p in re.split(r'[,|/]', pests_str) if p.strip()]

        # Determine formulation
        formulation = 'EC'
        if '1.8EC' in trade_name or '1.8 EC' in trade_name or 'EC' in trade_name.upper():
            formulation = 'EC'
        elif 'SC' in trade_name.upper():
            formulation = 'SC'
        elif 'WDG' in trade_name.upper() or 'WG' in trade_name.upper():
            formulation = 'WDG'

        key_reg = reg_no.upper()
        if key_reg in existing_regs:
            continue

        existing_regs.add(key_reg)
        existing_names.add(trade_name.upper())

        prod_id = f"ins-abm-{len(abamectin_products) + 1:03d}"
        abamectin_products.append({
            "id": prod_id,
            "type": "Insecticide",
            "commonName": common_name,
            "tradeName": trade_name,
            "registrationNo": reg_no,
            "registrationHolder": holder,
            "crops": crops if crops else ["Tea", "Brinjal", "Jujube"],
            "pests": pests if pests else ["Red spider mite", "Mite", "BPH"],
            "dosageRate": dosage_rate if dosage_rate else "1.25 L/ha (1.25 ml/L of water)",
            "moaCode": abamectin_intel['code'],
            "moaGroup": abamectin_intel['group'],
            "resistanceRisk": abamectin_intel['risk'],
            "toxicityClass": abamectin_intel['tox'],
            "whoColor": abamectin_intel['whoColor'],
            "formulation": formulation,
            "phiDays": abamectin_intel['phi'],
            "reiHours": abamectin_intel['rei'],
            "waterVolumeLPerHa": abamectin_intel['water'],
            "safetyNotes": [
                "Derived from natural soil bacterium Streptomyces avermitilis",
                "Translaminar insecticide/miticide; penetrates leaf tissue to target hidden pests",
                "Toxic to bees when wet; apply strictly in late afternoon or early evening",
                "Toxic to aquatic organisms; maintain 15-meter buffer from aquaculture ponds"
            ],
            "rotationNotes": "Maximum 2 applications per crop cycle. Rotate with IRAC 10A (Hexythiazox), 12C (Propargite), or 21A (Fenazaquin) to manage mite resistance."
        })

print(f"Processed {len(abamectin_products)} new registered Abamectin products with IRAC 6 MoA mapping.")

# Now let's combine and ensure all existing insecticides have verified IRAC MoA codes
enriched_existing = []
for p in existing_insecticides:
    cname = p.get('commonName', '').strip()
    if cname in IRAC_MAP:
        intel = IRAC_MAP[cname]
        p['moaCode'] = intel['code']
        p['moaGroup'] = intel['group']
        p['resistanceRisk'] = intel['risk']
        p['toxicityClass'] = intel['tox']
        p['whoColor'] = intel['whoColor']
    elif not p.get('moaCode') or p['moaCode'] == 'Unknown':
        # Default fallback check
        for key, val in IRAC_MAP.items():
            if key.lower() in cname.lower():
                p['moaCode'] = val['code']
                p['moaGroup'] = val['group']
                p['resistanceRisk'] = val['risk']
                p['toxicityClass'] = val['tox']
                p['whoColor'] = val['whoColor']
                break
    enriched_existing.append(p)

all_insecticides = enriched_existing + abamectin_products

# Sort by common name then trade name
all_insecticides.sort(key=lambda x: (x.get('commonName', ''), x.get('tradeName', '')))

print(f"Total insecticides now: {len(all_insecticides)}")

# Write to src/data/insecticidesData.ts
ts_content = f"""import {{ ChemicalProduct }} from '../types';

export const INSECTICIDES_DATABASE: ChemicalProduct[] = {json.dumps(all_insecticides, indent=2, ensure_ascii=False)};
"""

with open('src/data/insecticidesData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Successfully written updated src/data/insecticidesData.ts!")
