"""
PTAC Pesticide MoA Master Database & Policy Mapping Generator (2026 Rev 4.1)
===========================================================================
This script programmatically generates two fully formatted Excel workbooks:
1. PTAC_Pesticide_MoA_Master_Database_2026_Rev4-1.xlsx
2. MoA_Mapping_PTAC_Bangladesh_PolicyEnhanced_CSV-Enriched_Updated.xlsx

"""

import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# ==========================================
# 1. EXPANDED ACTIVE INGREDIENTS MASTER DATA
# ==========================================

ai_data = [
    # --- Insecticides & Acaricides ---
    {"AI_ID": "AI-001", "Common_Name": "Chlorantraniliprole", "CAS_Number": "500008-45-7", "Category": "Insecticide", "Chemical_Family": "Diamide", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "IRAC 28", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-002", "Common_Name": "Chlorpyrifos", "CAS_Number": "2921-88-2", "Category": "Insecticide", "Chemical_Family": "Organophosphate", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 1B", "DAE_Status": "Restricted", "Risk_Tier": "Tier 3 - Restricted"},
    {"AI_ID": "AI-003", "Common_Name": "Imidacloprid", "CAS_Number": "138261-41-3", "Category": "Insecticide", "Chemical_Family": "Neonicotinoid", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 4A", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-004", "Common_Name": "Carbofuran", "CAS_Number": "1563-66-2", "Category": "Insecticide", "Chemical_Family": "Carbamate", "WHO_Class": "Class Ib", "IRAC_HRAC_FRAC": "IRAC 1A", "DAE_Status": "Banned / Phased Out", "Risk_Tier": "Tier 4 - Banned"},
    {"AI_ID": "AI-005", "Common_Name": "Thiamethoxam", "CAS_Number": "153719-23-4", "Category": "Insecticide", "Chemical_Family": "Neonicotinoid", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 4A", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-006", "Common_Name": "Acetamiprid", "CAS_Number": "135410-20-7", "Category": "Insecticide", "Chemical_Family": "Neonicotinoid", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 4A", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-007", "Common_Name": "Cypermethrin", "CAS_Number": "52315-07-8", "Category": "Insecticide", "Chemical_Family": "Pyrethroid", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 3A", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-008", "Common_Name": "Deltamethrin", "CAS_Number": "52918-63-5", "Category": "Insecticide", "Chemical_Family": "Pyrethroid", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 3A", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-009", "Common_Name": "Lambda-Cyhalothrin", "CAS_Number": "91465-08-6", "Category": "Insecticide", "Chemical_Family": "Pyrethroid", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 3A", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-010", "Common_Name": "Abamectin", "CAS_Number": "71751-41-2", "Category": "Insecticide/Acaricide", "Chemical_Family": "Avermectin", "WHO_Class": "Class Ib", "IRAC_HRAC_FRAC": "IRAC 6", "DAE_Status": "Restricted", "Risk_Tier": "Tier 3 - Restricted"},
    {"AI_ID": "AI-011", "Common_Name": "Emamectin Benzoate", "CAS_Number": "155569-91-8", "Category": "Insecticide", "Chemical_Family": "Avermectin", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 6", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-012", "Common_Name": "Broflanilide", "CAS_Number": "1207727-04-5", "Category": "Insecticide", "Chemical_Family": "Meta-diamide", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "IRAC 30", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-013", "Common_Name": "Monocrotophos", "CAS_Number": "6923-22-4", "Category": "Insecticide", "Chemical_Family": "Organophosphate", "WHO_Class": "Class Ib", "IRAC_HRAC_FRAC": "IRAC 1B", "DAE_Status": "Banned", "Risk_Tier": "Tier 4 - Banned"},
    {"AI_ID": "AI-014", "Common_Name": "Dichlorvos (DDVP)", "CAS_Number": "62-73-7", "Category": "Insecticide", "Chemical_Family": "Organophosphate", "WHO_Class": "Class Ib", "IRAC_HRAC_FRAC": "IRAC 1B", "DAE_Status": "Banned", "Risk_Tier": "Tier 4 - Banned"},
    {"AI_ID": "AI-015", "Common_Name": "Ethion", "CAS_Number": "563-12-2", "Category": "Insecticide/Acaricide", "Chemical_Family": "Organophosphate", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 1B", "DAE_Status": "Restricted", "Risk_Tier": "Tier 3 - Restricted"},
    {"AI_ID": "AI-016", "Common_Name": "Fenpropathrin", "CAS_Number": "39515-41-8", "Category": "Insecticide/Acaricide", "Chemical_Family": "Pyrethroid", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "IRAC 3A", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-017", "Common_Name": "Hexythiazox", "CAS_Number": "78587-05-0", "Category": "Acaricide", "Chemical_Family": "Thiazolidinone", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "IRAC 10A", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-018", "Common_Name": "Bromopropylate", "CAS_Number": "18181-80-1", "Category": "Acaricide", "Chemical_Family": "Benzilate", "WHO_Class": "Class III", "IRAC_HRAC_FRAC": "IRAC UN", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},

    # --- Herbicides ---
    {"AI_ID": "AI-019", "Common_Name": "Pretilachlor", "CAS_Number": "51218-49-6", "Category": "Herbicide", "Chemical_Family": "Chloroacetamide", "WHO_Class": "Class III", "IRAC_HRAC_FRAC": "HRAC 15", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-020", "Common_Name": "Pyrazosulfuron-ethyl", "CAS_Number": "93697-74-6", "Category": "Herbicide", "Chemical_Family": "Sulfonylurea", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "HRAC 2", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-021", "Common_Name": "2,4-D Amine", "CAS_Number": "2008-39-1", "Category": "Herbicide", "Chemical_Family": "Phenoxycarboxylic acid", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "HRAC 4", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-022", "Common_Name": "Glyphosate", "CAS_Number": "1071-83-6", "Category": "Herbicide", "Chemical_Family": "Glycine", "WHO_Class": "Class III", "IRAC_HRAC_FRAC": "HRAC 9", "DAE_Status": "Restricted (Tea/Rubber)", "Risk_Tier": "Tier 3 - Restricted"},
    {"AI_ID": "AI-023", "Common_Name": "Paraquat", "CAS_Number": "4685-14-7", "Category": "Herbicide", "Chemical_Family": "Bipyridylium", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "HRAC 22", "DAE_Status": "Banned / Phased Out", "Risk_Tier": "Tier 4 - Banned"},
    {"AI_ID": "AI-024", "Common_Name": "Bispyribac-sodium", "CAS_Number": "125401-92-5", "Category": "Herbicide", "Chemical_Family": "Pyrimidine ether", "WHO_Class": "Class III", "IRAC_HRAC_FRAC": "HRAC 2", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-025", "Common_Name": "Oxyfluorfen", "CAS_Number": "42874-03-3", "Category": "Herbicide", "Chemical_Family": "Diphenyl ether", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "HRAC 14", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},

    # --- Fungicides ---
    {"AI_ID": "AI-026", "Common_Name": "Azoxystrobin", "CAS_Number": "131860-33-8", "Category": "Fungicide", "Chemical_Family": "Strobilurin (QoI)", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "FRAC 11", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-027", "Common_Name": "Difenoconazole", "CAS_Number": "119446-68-3", "Category": "Fungicide", "Chemical_Family": "Triazole (DMI)", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "FRAC 3", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-028", "Common_Name": "Mancozeb", "CAS_Number": "8018-01-7", "Category": "Fungicide", "Chemical_Family": "Dithiocarbamate", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "FRAC M03", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-029", "Common_Name": "Carbendazim", "CAS_Number": "10605-21-7", "Category": "Fungicide", "Chemical_Family": "Benzimidazole", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "FRAC 1", "DAE_Status": "Restricted", "Risk_Tier": "Tier 3 - Restricted"},
    {"AI_ID": "AI-030", "Common_Name": "Cyproconazole", "CAS_Number": "94361-06-5", "Category": "Fungicide", "Chemical_Family": "Triazole (DMI)", "WHO_Class": "Class II", "IRAC_HRAC_FRAC": "FRAC 3", "DAE_Status": "Registered", "Risk_Tier": "Tier 2 - Rotation Managed"},
    {"AI_ID": "AI-031", "Common_Name": "Sulphur (Elemental)", "CAS_Number": "7704-34-9", "Category": "Fungicide/Acaricide", "Chemical_Family": "Inorganic", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "FRAC M02", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-032", "Common_Name": "Benalaxyl", "CAS_Number": "71626-11-4", "Category": "Fungicide", "Chemical_Family": "Phenylamide", "WHO_Class": "Class III", "IRAC_HRAC_FRAC": "FRAC 4", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-033", "Common_Name": "Fluxapyroxad", "CAS_Number": "907204-31-3", "Category": "Fungicide", "Chemical_Family": "Pyrazole-carboxamide", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "FRAC 7", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},

    # --- Bio-Pesticides ---
    {"AI_ID": "AI-034", "Common_Name": "Trichoderma harzianum", "CAS_Number": "N/A", "Category": "Bio-Fungicide", "Chemical_Family": "Microbial Antagonist", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "FRAC BM02", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"},
    {"AI_ID": "AI-035", "Common_Name": "Bacillus thuringiensis", "CAS_Number": "68038-71-1", "Category": "Bio-Insecticide", "Chemical_Family": "Microbial Crystal Protein", "WHO_Class": "Class U", "IRAC_HRAC_FRAC": "IRAC 11A", "DAE_Status": "Registered", "Risk_Tier": "Tier 1 - Compliant"}
]

# ==========================================
# 2. EXPANDED COMMERCIAL PRODUCTS REGISTER
# ==========================================

product_data = [
    {"APBD_ID": "APBD-2026-001", "Trade_Name": "Virtako 40WG", "Active_Ingredients": "Chlorantraniliprole 20% + Thiamethoxam 20%", "Category": "Insecticide", "Formulation": "WG", "Registrant": "Syngenta Bangladesh Ltd.", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"},
    {"APBD_ID": "APBD-2026-002", "Trade_Name": "Furadan 5G", "Active_Ingredients": "Carbofuran 5%", "Category": "Insecticide", "Formulation": "GR", "Registrant": "FMC Chemical Bangladesh", "Registration_Status": "Cancelled / Banned", "Policy_Compliance": "Tier 4 - Banned"},
    {"APBD_ID": "APBD-2026-003", "Trade_Name": "Dursban 20EC", "Active_Ingredients": "Chlorpyrifos 20%", "Category": "Insecticide", "Formulation": "EC", "Registrant": "Corteva Agriscience", "Registration_Status": "Restricted Use", "Policy_Compliance": "Tier 3 - Restricted"},
    {"APBD_ID": "APBD-2026-004", "Trade_Name": "Amistar Top 325SC", "Active_Ingredients": "Azoxystrobin 20% + Difenoconazole 12.5%", "Category": "Fungicide", "Formulation": "SC", "Registrant": "Syngenta Bangladesh Ltd.", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"},
    {"APBD_ID": "APBD-2026-005", "Trade_Name": "Rifit 500EC", "Active_Ingredients": "Pretilachlor 500g/L", "Category": "Herbicide", "Formulation": "EC", "Registrant": "Syngenta Bangladesh Ltd.", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"},
    {"APBD_ID": "APBD-2026-006", "Trade_Name": "Admire 200SL", "Active_Ingredients": "Imidacloprid 200g/L", "Category": "Insecticide", "Formulation": "SL", "Registrant": "Bayer CropScience BD", "Registration_Status": "Approved", "Policy_Compliance": "Tier 2 - Rotation Managed"},
    {"APBD_ID": "APBD-2026-007", "Trade_Name": "Indofil M-45", "Active_Ingredients": "Mancozeb 75% WP", "Category": "Fungicide", "Formulation": "WP", "Registrant": "Indofil Industries", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"},
    {"APBD_ID": "APBD-2026-008", "Trade_Name": "Microthiol Special 80WP", "Active_Ingredients": "Sulphur 80%", "Category": "Fungicide/Acaricide", "Formulation": "WP", "Registrant": "Shetu Pesticides Limited", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"},
    {"APBD_ID": "APBD-2026-009", "Trade_Name": "Karishma 28SC", "Active_Ingredients": "Azoxystrobin 20% + Cyproconazole 8%", "Category": "Fungicide", "Formulation": "SC", "Registrant": "Eon Trading House", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"},
    {"APBD_ID": "APBD-2026-010", "Trade_Name": "Galben M", "Active_Ingredients": "Benalaxyl 8% + Mancozeb 64%", "Category": "Fungicide", "Formulation": "WP", "Registrant": "ACI Formulations Limited", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"},
    {"APBD_ID": "APBD-2026-011", "Trade_Name": "Bavistin DF", "Active_Ingredients": "Carbendazim 50%", "Category": "Fungicide", "Formulation": "DF", "Registrant": "BASF Bangladesh Limited", "Registration_Status": "Restricted Use", "Policy_Compliance": "Tier 3 - Restricted"},
    {"APBD_ID": "APBD-2026-012", "Trade_Name": "Nerot 500 EC", "Active_Ingredients": "Bromopropylate 500g/L", "Category": "Acaricide", "Formulation": "EC", "Registrant": "Hossain Enterprise", "Registration_Status": "Approved", "Policy_Compliance": "Tier 2 - Rotation Managed"},
    {"APBD_ID": "APBD-2026-013", "Trade_Name": "Danitol 10 EC", "Active_Ingredients": "Fenpropathrin 10%", "Category": "Insecticide", "Formulation": "EC", "Registrant": "Shetu Corporation Limited", "Registration_Status": "Approved", "Policy_Compliance": "Tier 2 - Rotation Managed"},
    {"APBD_ID": "APBD-2026-014", "Trade_Name": "Hexarite 5 EC", "Active_Ingredients": "Hexythiazox 5%", "Category": "Acaricide", "Formulation": "EC", "Registrant": "Naafco (Private) Limited", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"},
    {"APBD_ID": "APBD-2026-015", "Trade_Name": "Bio-Clean WG", "Active_Ingredients": "Trichoderma harzianum 2x10^8 cfu/g", "Category": "Bio-Fungicide", "Formulation": "WG", "Registrant": "Ispahani Agro Ltd.", "Registration_Status": "Approved", "Policy_Compliance": "Tier 1 - Compliant"}
]

# ==========================================
# 3. MOA MAPPING ENRICHED DATA
# ==========================================

moa_mapping_data = [
    {"Product_ID": "P-101", "Trade_Name": "Virtako 40WG", "Primary_AI": "Chlorantraniliprole", "Primary_MoA": "IRAC 28", "Secondary_AI": "Thiamethoxam", "Secondary_MoA": "IRAC 4A", "Mechanism": "Ryanodine Receptor Modulation + nAChR Allosteric", "Resistance_Risk": "Medium (Requires MoA Rotation)", "Policy_Tag": "Approved Green Category"},
    {"Product_ID": "P-102", "Trade_Name": "Furadan 5G", "Primary_AI": "Carbofuran", "Primary_MoA": "IRAC 1A", "Secondary_AI": "N/A", "Secondary_MoA": "N/A", "Mechanism": "Acetylcholinesterase Inhibition", "Resistance_Risk": "High (HHP - High Toxicity)", "Policy_Tag": "Banned - Gazette Directive 2024"},
    {"Product_ID": "P-103", "Trade_Name": "Dursban 20EC", "Primary_AI": "Chlorpyrifos", "Primary_MoA": "IRAC 1B", "Secondary_AI": "N/A", "Secondary_MoA": "N/A", "Mechanism": "Acetylcholinesterase Inhibition", "Resistance_Risk": "High", "Policy_Tag": "Restricted - Specific Crops Only"},
    {"Product_ID": "P-104", "Trade_Name": "Amistar Top", "Primary_AI": "Azoxystrobin", "Primary_MoA": "FRAC 11", "Secondary_AI": "Difenoconazole", "Secondary_MoA": "FRAC 3", "Mechanism": "Respiration Complex III Inhibitor + Sterol Demethylation", "Resistance_Risk": "Medium-High", "Policy_Tag": "Approved Green Category"},
    {"Product_ID": "P-105", "Trade_Name": "Rifit 500EC", "Primary_AI": "Pretilachlor", "Primary_MoA": "HRAC 15", "Secondary_AI": "N/A", "Secondary_MoA": "N/A", "Mechanism": "Inhibition of Very Long-Chain Fatty Acids (VLCFA)", "Resistance_Risk": "Low", "Policy_Tag": "Approved Green Category"},
    {"Product_ID": "P-106", "Trade_Name": "Microthiol Special", "Primary_AI": "Sulphur", "Primary_MoA": "FRAC M02", "Secondary_AI": "N/A", "Secondary_MoA": "N/A", "Mechanism": "Multi-site contact activity", "Resistance_Risk": "Very Low", "Policy_Tag": "Approved Green Category"},
    {"Product_ID": "P-107", "Trade_Name": "Karishma 28SC", "Primary_AI": "Azoxystrobin", "Primary_MoA": "FRAC 11", "Secondary_AI": "Cyproconazole", "Secondary_MoA": "FRAC 3", "Mechanism": "Complex III Inhibitor + Sterol C14-demethylation", "Resistance_Risk": "Medium", "Policy_Tag": "Approved Green Category"},
    {"Product_ID": "P-108", "Trade_Name": "Galben M", "Primary_AI": "Benalaxyl", "Primary_MoA": "FRAC 4", "Secondary_AI": "Mancozeb", "Secondary_MoA": "FRAC M03", "Mechanism": "RNA Polymerase I Inhibitor + Multi-site Contact", "Resistance_Risk": "Low-Medium", "Policy_Tag": "Approved Green Category"},
    {"Product_ID": "P-109", "Trade_Name": "Hexarite 5 EC", "Primary_AI": "Hexythiazox", "Primary_MoA": "IRAC 10A", "Secondary_AI": "N/A", "Secondary_MoA": "N/A", "Mechanism": "Mite Growth Inhibitor (Chitin Synthase)", "Resistance_Risk": "Medium", "Policy_Tag": "Approved Green Category"}
]

# ==========================================
# 4. EXCEL GENERATION & STYLING FUNCTIONS
# ==========================================

def style_header_row(ws, row_idx=1, bg_color="1F4E78", font_color="FFFFFF"):
    """Styles a header row with bold font and background fill."""
    fill = PatternFill(start_color=bg_color, end_color=bg_color, fill_type="solid")
    font = Font(name="Calibri", size=11, bold=True, color=font_color)
    align = Alignment(horizontal="center", vertical="center", wrap_text=True)
    thin_border = Border(
        left=Side(style='thin', color='CCCCCC'),
        right=Side(style='thin', color='CCCCCC'),
        top=Side(style='thin', color='CCCCCC'),
        bottom=Side(style='medium', color='1F4E78')
    )
    
    for cell in ws[row_idx]:
        cell.fill = fill
        cell.font = font
        cell.alignment = align
        cell.border = thin_border

def auto_fit_columns(ws):
    """Adjusts column widths based on cell content length."""
    for col in ws.columns:
        max_len = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            val_str = str(cell.value or '')
            if len(val_str) > max_len:
                max_len = len(val_str)
        ws.column_dimensions[col_letter].width = max(max_len + 4, 14)

def create_master_database_workbook():
    """Generate the PTAC master workbook from the script's current data lists."""
    wb = openpyxl.Workbook()

    ws_dash = wb.active
    ws_dash.title = "01_Dashboard"
    ws_dash.merge_cells("A1:G2")
    cell = ws_dash["A1"]
    cell.value = "PTAC Bangladesh - Pesticide MoA Master Database (2026 Rev 4.1)"
    cell.font = Font(name="Calibri", size=16, bold=True, color="FFFFFF")
    cell.fill = PatternFill(
        start_color="1F4E78", end_color="1F4E78", fill_type="solid"
    )
    cell.alignment = Alignment(horizontal="center", vertical="center")

    banned_count = sum(
        1 for item in ai_data if "Banned" in item["Risk_Tier"]
    )
    restricted_count = sum(
        1 for item in ai_data if "Restricted" in item["Risk_Tier"]
    )
    kpis = [
        ("Total Active Ingredients", len(ai_data), "B4", "C4"),
        ("Commercial Products in This Dataset", len(product_data), "E4", "F4"),
        ("Banned / Phased Out AIs (label-based)", banned_count, "B6", "C6"),
        ("Restricted AIs (label-based)", restricted_count, "E6", "F6"),
    ]

    for title, value, label_cell, value_cell in kpis:
        ws_dash[label_cell] = title
        ws_dash[label_cell].font = Font(bold=True, size=10, color="595959")
        ws_dash[label_cell].alignment = Alignment(horizontal="center")
        ws_dash[value_cell] = value
        ws_dash[value_cell].font = Font(bold=True, size=18, color="1F4E78")
        ws_dash[value_cell].alignment = Alignment(horizontal="center")
        ws_dash[value_cell].fill = PatternFill(
            start_color="F2F2F2", end_color="F2F2F2", fill_type="solid"
        )

    ws_prod = wb.create_sheet(title="02_Product_Register")
    headers = list(product_data[0].keys())
    ws_prod.append(headers)
    for item in product_data:
        ws_prod.append([item.get(header) for header in headers])
    style_header_row(ws_prod)
    auto_fit_columns(ws_prod)

    ws_ai = wb.create_sheet(title="03_Active_Ingredients")
    headers = list(ai_data[0].keys())
    ws_ai.append(headers)
    for item in ai_data:
        ws_ai.append([item.get(header) for header in headers])
    style_header_row(ws_ai)
    auto_fit_columns(ws_ai)

    filename = "PTAC_Pesticide_MoA_Master_Database_2026_Rev4-1.xlsx"
    wb.save(filename)
    print(f"[SUCCESS] Created workbook: {filename}")


def create_moa_mapping_workbook():
    """Generate the MoA mapping workbook from the script's current data list."""
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "MoA_Mapping_Enriched"

    headers = list(moa_mapping_data[0].keys())
    ws.append(headers)
    for item in moa_mapping_data:
        ws.append([item.get(header) for header in headers])

    style_header_row(ws, bg_color="2E75B6")
    auto_fit_columns(ws)

    filename = "MoA_Mapping_PTAC_Bangladesh_PolicyEnhanced_CSV-Enriched_Updated.xlsx"
    wb.save(filename)
    print(f"[SUCCESS] Created workbook: {filename}")


if __name__ == "__main__":
    create_master_database_workbook()
    create_moa_mapping_workbook()

O

X


