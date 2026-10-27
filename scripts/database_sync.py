import pandas as pd
import numpy as np

# Ensure these filenames match your uploaded files exactly
f_agri = 'AgriChem_Clean_Database_merged.xlsx'
f_moa = 'MoA_Mapping_PTAC_Bangladesh_PolicyEnhanced_CSV-Enriched.xlsx'

# 1. Load Data
df_agri = pd.read_excel(f_agri, sheet_name='Full Database')
df_moa = pd.read_excel(f_moa, sheet_name='Product MoA Mapping', header=5)
df_moa = df_moa.dropna(how='all', axis=1).dropna(subset=['Registration No'])

# 2. Normalize Join Keys
df_agri['reg_clean'] = df_agri['Registration No'].astype(str).str.strip().str.upper()
df_moa['reg_clean'] = df_moa['Registration No'].astype(str).str.strip().str.upper()

# 3. Columns to enrich from MoA
moa_cols = [
    'Sl No', 'Pesticide Type', 'Brand Name', 'Recommended Crops', 'Recommended Pests', 
    'No. of Recommendations', 'Scheme', 'Group No.', 'MoA Description', 'Target Site', 
    'HHP Status (WHO/FAO)', 'Hazardous Active(s) Matched', 'HHP Criteria Met', 
    'EU / Global Regulatory Status', 'Bangladesh Policy Action', 'Policy Risk Tier', 
    'Formulation Code', 'Formulation Type (Physicality)', 'Physical Form', 
    'Co-formulant / Inert Concern', 'WHO Toxicity Class (CSV)', 'PHI — days (CSV)', 'REI — hours (CSV)'
]
existing_moa_cols = [c for c in moa_cols if c in df_moa.columns]

# 4. Merge & Deduplicate
df_moa_dedup = df_moa.drop_duplicates(subset=['reg_clean'], keep='first')
df_merged = pd.merge(df_agri, df_moa_dedup[['reg_clean'] + existing_moa_cols], on='reg_clean', how='left')
df_merged = df_merged.drop(columns=['reg_clean'])

# 5. Coalesce overlapping columns (prefer AgriChem, fallback to MoA)
coalesce_map = {
    'Common Name': ('Common Name_x', 'Common Name_y'),
    'Registration Holder': ('Registration Holder_x', 'Registration Holder_y'),
    'Crops': ('Crops', 'Recommended Crops'),
    'Pests': ('Pests', 'Recommended Pests'),
    'Dosage Rate': ('Dosage Rate_x', 'Dosage Rate_y'),
    'MoA Code': ('MoA Code_x', 'MoA Code_y'),
    'Toxicity Class': ('Toxicity Class', 'WHO Toxicity Class (CSV)'),
    'PHI Days': ('PHI Days', 'PHI — days (CSV)'),
    'REI Hours': ('REI Hours', 'REI — hours (CSV)')
}

for new_col, (col1, col2) in coalesce_map.items():
    c1 = col1 if col1 in df_merged.columns else None
    c2 = col2 if col2 in df_merged.columns else None
    if c1 and c2:
        df_merged[new_col] = df_merged[c1].fillna(df_merged[c2])
        df_merged = df_merged.drop(columns=[c1, c2])
    elif c1:
        df_merged = df_merged.rename(columns={c1: new_col})
    elif c2:
        df_merged = df_merged.rename(columns={c2: new_col})

# Handle Trade Name vs Brand Name
if 'Trade Name' in df_merged.columns and 'Brand Name' in df_merged.columns:
    df_merged['Trade Name'] = df_merged['Trade Name'].fillna(df_merged['Brand Name'])
    df_merged = df_merged.drop(columns=['Brand Name'])

# 6. Save to CSV
output_filename = 'cleaned_database_final_synchronized.csv'
df_merged.to_csv(output_filename, index=False, encoding='utf-8')
print(f"✅ Successfully generated '{output_filename}' ({len(df_merged)} rows)")