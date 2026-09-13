import fs from 'fs';
import path from 'path';

// MoA mapping based on common names
const MOA_MAPPING = {
  // MITICIDES
  'Bromopropylate': { moaCode: 'IRAC UN', moaGroup: 'Unknown / Multi-target', resistanceRisk: 'Low', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Ethion': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Fenpropathrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Hexythiazox': { moaCode: 'IRAC 10A', moaGroup: 'Hexythiazox (Growth inhibitor - chitin synthesis)', resistanceRisk: 'Low to Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Propargite': { moaCode: 'IRAC 12C', moaGroup: 'Organosulfurs (Inhibitor of oxidative phosphorylation)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Sulphur': { moaCode: 'IRAC UN / FRAC M02', moaGroup: 'Inorganic sulfur (Multi-site contact)', resistanceRisk: 'Low', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },

  // FUNGICIDES
  'Azoxystrobin': { moaCode: 'FRAC 11', moaGroup: 'QoI (Quinone outside Inhibitor - strobilurin)', resistanceRisk: 'High', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Azoxystrobin (20% ) + Cyproconazole (8%)': { moaCode: 'FRAC 11 + 3', moaGroup: 'QoI + DMI (Demethylation inhibitor)', resistanceRisk: 'Medium to High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Azoxystrobin (20% ) + Difenoconazole (12.5%)': { moaCode: 'FRAC 11 + 3', moaGroup: 'QoI + DMI (Demethylation inhibitor)', resistanceRisk: 'Medium to High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Benalaxyl (8%) + Mancozeb (64%)': { moaCode: 'FRAC 4 + M03', moaGroup: 'PA (Phenylamide) + Multi-site contact', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Carbendazim': { moaCode: 'FRAC 1', moaGroup: 'MBC (Methyl Benzimidazole Carbamates)', resistanceRisk: 'High', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Chlorothalonil': { moaCode: 'FRAC M05', moaGroup: 'Multi-site contact (Chloronitriles)', resistanceRisk: 'Low', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Copper hydroxide': { moaCode: 'FRAC M01', moaGroup: 'Inorganic copper (Multi-site)', resistanceRisk: 'Low', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Copper oxychloride': { moaCode: 'FRAC M01', moaGroup: 'Inorganic copper (Multi-site)', resistanceRisk: 'Low', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Dichloran': { moaCode: 'FRAC 14', moaGroup: 'Aromatic hydrocarbons', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Difenoconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Demethylation inhibitor - Triazoles)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Dimethomorph (9%) + Mancozeb (60%)': { moaCode: 'FRAC 40 + M03', moaGroup: 'CAAs (Carboxylic acid amides) + Multi-site', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Diniconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Edifenphos': { moaCode: 'FRAC 20', moaGroup: 'Organophosphates', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Epoxiconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Epoxiconazol (12.5%) + Carbendazim (12.5%)': { moaCode: 'FRAC 3 + 1', moaGroup: 'DMI + MBC', resistanceRisk: 'Medium to High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Flusilazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Flusilazole (12.5%) + Carbendazim (25%)': { moaCode: 'FRAC 3 + 1', moaGroup: 'DMI + MBC', resistanceRisk: 'Medium to High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Hexaconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Iprodione': { moaCode: 'FRAC 2', moaGroup: 'Dicarboximides', resistanceRisk: 'Medium to High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Iprodione (35%) + Carbendazim (17.5%)': { moaCode: 'FRAC 2 + 1', moaGroup: 'Dicarboximides + MBC', resistanceRisk: 'High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Isoprothiolane': { moaCode: 'FRAC 32', moaGroup: 'Isoprothiolane (Thiophene carboxylate)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Kasugamycin': { moaCode: 'FRAC 24', moaGroup: 'Kasugamycin (Aminoglycoside antibiotic)', resistanceRisk: 'Low to Medium', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Mancozeb': { moaCode: 'FRAC M03', moaGroup: 'Dithiocarbamates (Multi-site contact)', resistanceRisk: 'Low', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Mancozeb (63%) + Carbendazim (12%)': { moaCode: 'FRAC M03 + 1', moaGroup: 'Multi-site + MBC', resistanceRisk: 'Medium', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Mancozeb (12%) + Copper (30%)': { moaCode: 'FRAC M03 + M01', moaGroup: 'Dithiocarbamate + Inorganic copper', resistanceRisk: 'Low', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Mancozeb (64%) + Cymoxanil (8%)': { moaCode: 'FRAC M03 + 27', moaGroup: 'Dithiocarbamate + Cyanoacetamide-oximes', resistanceRisk: 'Medium', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Mancozeb (64%) + Metalaxyl (8%)': { moaCode: 'FRAC M03 + 4', moaGroup: 'Dithiocarbamate + PA (Phenylamide)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Mancozeb (64%) + Metalaxyl (4%)': { moaCode: 'FRAC M03 + 4', moaGroup: 'Dithiocarbamate + PA (Phenylamide)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Mancozeb (45%) + Fosetyl AI (25%)': { moaCode: 'FRAC M03 + 33', moaGroup: 'Dithiocarbamate + Fosetyl-Al', resistanceRisk: 'Medium', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Mancozeb (50%) + Phenamidone (10%)': { moaCode: 'FRAC M03 + 22', moaGroup: 'Dithiocarbamate + Phenamidone', resistanceRisk: 'Low to Medium', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Metalaxyl': { moaCode: 'FRAC 4', moaGroup: 'PA (Phenylamide - RNA polymerase I)', resistanceRisk: 'High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Metiram complex': { moaCode: 'FRAC M03', moaGroup: 'Dithiocarbamates (Multi-site contact)', resistanceRisk: 'Low', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Mismarthiozol': { moaCode: 'FRAC 38', moaGroup: 'Thiazole carboxamide', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Propamocarb': { moaCode: 'FRAC 28', moaGroup: 'Carbamates (Cell membrane permeability)', resistanceRisk: 'Low to Medium', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Propiconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Propiconazole (12.5%) + Tricyclazole (40%)': { moaCode: 'FRAC 3 + 30', moaGroup: 'DMI + Melanin biosynthesis inhibitor', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Propineb': { moaCode: 'FRAC M03', moaGroup: 'Dithiocarbamates (Multi-site contact)', resistanceRisk: 'Low', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Propineb (70%) + Cymoxanil (6%)': { moaCode: 'FRAC M03 + 27', moaGroup: 'Dithiocarbamate + Cyanoacetamide-oximes', resistanceRisk: 'Medium', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Propineb (70%) + Iprovalicarb': { moaCode: 'FRAC M03 + 40', moaGroup: 'Dithiocarbamate + CAA', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Pyraclostrobin (5%) + Metiram (55%)': { moaCode: 'FRAC 11 + M03', moaGroup: 'QoI + Dithiocarbamate', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Quardartary Ammonium': { moaCode: 'FRAC UN', moaGroup: 'Quaternary ammonium', resistanceRisk: 'Unknown', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Stretomycin Sulphate (9%)+Tetracycline Hydrochloride (1%)': { moaCode: 'FRAC 25 + 25', moaGroup: 'Antibiotics (Aminoglycoside + Tetracycline)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Tebuconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Tebuconazole (50%) + Trifloxystrobin (25%)': { moaCode: 'FRAC 3 + 11', moaGroup: 'DMI + QoI', resistanceRisk: 'Medium to High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Tetraconazole (125%) + Carbendazim (150%)': { moaCode: 'FRAC 3 + 1', moaGroup: 'DMI + MBC', resistanceRisk: 'High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Thiophanate-methyl': { moaCode: 'FRAC 1', moaGroup: 'MBC (Thiophanates)', resistanceRisk: 'High', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Tri Basic Copper Sulpha': { moaCode: 'FRAC M01', moaGroup: 'Inorganic copper (Multi-site)', resistanceRisk: 'Low', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Tricyclazole': { moaCode: 'FRAC 30', moaGroup: 'Melanin biosynthesis inhibitors (MBI)', resistanceRisk: 'Low to Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Tridemorph': { moaCode: 'FRAC 5', moaGroup: 'Morpholines (Sterol biosynthesis inhibitor)', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Zineb': { moaCode: 'FRAC M03', moaGroup: 'Dithiocarbamates (Multi-site contact)', resistanceRisk: 'Low', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Carboxin (17.5%) + Thiram (17.5%)': { moaCode: 'FRAC 7 + M03', moaGroup: 'SDHI + Dithiocarbamate', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Carbendazim (17.5%)+Iprodione (35%)': { moaCode: 'FRAC 1 + 2', moaGroup: 'MBC + Dicarboximides', resistanceRisk: 'High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },

  // INSECTICIDES
  'Abamectin': { moaCode: 'IRAC 6', moaGroup: 'Avermectins (GluCl allosteric modulators)', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Abamectin (1%) +Acetamiprid (3%)': { moaCode: 'IRAC 6 + 4A', moaGroup: 'Avermectin + Neonicotinoid', resistanceRisk: 'Medium to High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Abamectin (1%) +Beta Cypermethrin (2%)': { moaCode: 'IRAC 6 + 3A', moaGroup: 'Avermectin + Pyrethroid', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Abamectin (2%) + Matrine (1%)': { moaCode: 'IRAC 6 + UN', moaGroup: 'Avermectin + Botanical', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Acephate': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Fipronil': { moaCode: 'IRAC 2B', moaGroup: 'Phenylpyrazoles (GABA-gated chloride channel blockers)', resistanceRisk: 'Medium to High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Chlorantraniliprole': { moaCode: 'IRAC 28', moaGroup: 'Diamides (Ryanodine receptor modulators)', resistanceRisk: 'Low to Medium', toxicityClass: 'U - Unlikely to Present Hazard', whoColor: '#10b981' },
  'Imidacloprid': { moaCode: 'IRAC 4A', moaGroup: 'Neonicotinoids (nAChR competitive modulators)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Acetamiprid': { moaCode: 'IRAC 4A', moaGroup: 'Neonicotinoids (nAChR competitive modulators)', resistanceRisk: 'High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Thiamethoxam': { moaCode: 'IRAC 4A', moaGroup: 'Neonicotinoids (nAChR competitive modulators)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Thiacloprid': { moaCode: 'IRAC 4A', moaGroup: 'Neonicotinoids (nAChR competitive modulators)', resistanceRisk: 'High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Clothianidin': { moaCode: 'IRAC 4A', moaGroup: 'Neonicotinoids (nAChR competitive modulators)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Pymetrozine': { moaCode: 'IRAC 9B', moaGroup: 'Pyridine azomethines (Selective feeding blockers)', resistanceRisk: 'Low to Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Buprofezin': { moaCode: 'IRAC 16', moaGroup: 'Buprofezin (Chitin synthesis inhibitor)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Spirotetramat': { moaCode: 'IRAC 23', moaGroup: 'Tetramic acid derivatives (Lipid biosynthesis inhibitor)', resistanceRisk: 'Low to Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Cartap Hydrochloride': { moaCode: 'IRAC 14', moaGroup: 'Nereistoxin analogues (nAChR blocker)', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Cypermethrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Alpha Cypermethrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Beta Cypermethrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Zeta Cypermethrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Deltamethrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Lambda Cyhalothrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Bifenthrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Fenvalerate': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Esfenvalerate': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Chlorpyrifos': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Diazinon': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Dimethoate': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Fenitrothion': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Fenthion': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Malathion': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Phenthoate': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Quinalphos': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Profenofos': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Triazophos': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Endosulfan': { moaCode: 'IRAC 2A', moaGroup: 'Cyclodiene organochlorines (GABA-gated chloride channel blockers)', resistanceRisk: 'High', toxicityClass: 'Ib - Highly Hazardous', whoColor: '#ef4444' },
  'Chlordane': { moaCode: 'IRAC 2A', moaGroup: 'Cyclodiene organochlorines', resistanceRisk: 'High', toxicityClass: 'Ib - Highly Hazardous', whoColor: '#ef4444' },
  'Ethiprole': { moaCode: 'IRAC 2B', moaGroup: 'Phenylpyrazoles', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Spinosad': { moaCode: 'IRAC 5', moaGroup: 'Spinosyns (nAChR allosteric modulators)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Spinetoram': { moaCode: 'IRAC 5', moaGroup: 'Spinosyns (nAChR allosteric modulators)', resistanceRisk: 'Medium', toxicityClass: 'III - Slightly Hazardous', whoColor: '#3b82f6' },
  'Milbemycins': { moaCode: 'IRAC 6', moaGroup: 'Milbemycins (GluCl allosteric modulators)', resistanceRisk: 'Medium', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Carbaryl': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Carbofuran': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'Ib - Highly Hazardous', whoColor: '#ef4444' },
  'Carbosulfan': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'Ib - Highly Hazardous', whoColor: '#ef4444' },
  'Isoprocarb (MIPC)': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Methomyl': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'Ib - Highly Hazardous', whoColor: '#ef4444' },
  'Thiodicarb': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'II - Moderately Hazardous', whoColor: '#eab308' },
  'Aldicarb': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High', toxicityClass: 'Ia - Extremely Hazardous', whoColor: '#ef4444' },
};

// Parse CSV function
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const header = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Simple CSV parsing - handle quoted fields
    const fields = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"' && (j === 0 || line[j-1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current.trim());
    
    if (fields.length >= 8) {
      data.push({
        type: fields[0],
        commonName: fields[1],
        tradeName: fields[2],
        registrationNo: fields[3],
        registrationHolder: fields[4],
        crops: fields[5].split(',').map(c => c.trim()),
        pests: fields[6].split(',').map(p => p.trim()),
        dosageRate: fields[7]
      });
    }
  }
  
  return data;
}

// Convert to ChemicalProduct format
function convertToChemicalProduct(row, index) {
  const moaInfo = MOA_MAPPING[row.commonName] || { 
    moaCode: 'Unknown', 
    moaGroup: 'Unknown', 
    resistanceRisk: 'Unknown', 
    toxicityClass: 'III - Slightly Hazardous', 
    whoColor: '#3b82f6' 
  };
  
  // Determine formulation from trade name
  let formulation = 'Unknown';
  const tradeNameUpper = row.tradeName.toUpperCase();
  if (tradeNameUpper.includes('EC')) formulation = 'EC';
  else if (tradeNameUpper.includes('SC')) formulation = 'SC';
  else if (tradeNameUpper.includes('WP')) formulation = 'WP';
  else if (tradeNameUpper.includes('WDG') || tradeNameUpper.includes('WG')) formulation = 'WDG';
  else if (tradeNameUpper.includes('DF')) formulation = 'DF';
  else if (tradeNameUpper.includes('GR')) formulation = 'GR';
  else if (tradeNameUpper.includes('SL')) formulation = 'SL';
  else if (tradeNameUpper.includes('SP')) formulation = 'SP';
  else if (tradeNameUpper.includes('ULV')) formulation = 'ULV';
  else if (tradeNameUpper.includes('EW')) formulation = 'EW';
  else if (tradeNameUpper.includes('FS')) formulation = 'FS';
  else if (tradeNameUpper.includes('OD')) formulation = 'OD';
  else if (tradeNameUpper.includes('SE')) formulation = 'SE';
  else if (tradeNameUpper.includes('CS')) formulation = 'CS';
  else if (tradeNameUpper.includes('DC')) formulation = 'DC';
  else if (tradeNameUpper.includes('MC')) formulation = 'MC';
  else if (tradeNameUpper.includes('ZC')) formulation = 'ZC';
  
  // Generate unique ID
  const typePrefix = row.type.toLowerCase().substring(0, 3);
  const id = `${typePrefix}-${String(index + 1).padStart(3, '0')}`;
  
  // Estimate PHI and REI based on toxicity class
  let phiDays = 14;
  let reiHours = 24;
  
  if (moaInfo.toxicityClass.includes('Ia')) { phiDays = 30; reiHours = 72; }
  else if (moaInfo.toxicityClass.includes('Ib')) { phiDays = 21; reiHours = 48; }
  else if (moaInfo.toxicityClass.includes('II')) { phiDays = 14; reiHours = 24; }
  else if (moaInfo.toxicityClass.includes('III')) { phiDays = 7; reiHours = 12; }
  else if (moaInfo.toxicityClass.includes('U')) { phiDays = 3; reiHours = 4; }
  
  // Water volume based on crop type
  const hasRice = row.crops.some(c => c.toLowerCase().includes('rice'));
  const hasTea = row.crops.some(c => c.toLowerCase().includes('tea'));
  const hasJute = row.crops.some(c => c.toLowerCase().includes('jute'));
  let waterVolumeLPerHa = 500;
  if (hasTea) waterVolumeLPerHa = 1000;
  else if (hasRice) waterVolumeLPerHa = 500;
  else if (hasJute) waterVolumeLPerHa = 500;
  else waterVolumeLPerHa = 500;
  
  return {
    id,
    type: row.type,
    commonName: row.commonName,
    tradeName: row.tradeName,
    registrationNo: row.registrationNo,
    registrationHolder: row.registrationHolder,
    crops: row.crops,
    pests: row.pests,
    dosageRate: row.dosageRate,
    moaCode: moaInfo.moaCode,
    moaGroup: moaInfo.moaGroup,
    resistanceRisk: moaInfo.resistanceRisk,
    toxicityClass: moaInfo.toxicityClass,
    whoColor: moaInfo.whoColor,
    formulation,
    phiDays,
    reiHours,
    waterVolumeLPerHa,
    safetyNotes: [],
    rotationNotes: ''
  };
}

// Read and process CSV
const csvPath = '/tmp/attachments/agent_ea7e9559-60bd-4d21-a748-b165930aee56/4d4d6a95-d659-49d3-a74a-2cc6d4bbbe57/3578efd0-b01c-4ac0-bef5-5a4f3b4dcc58/930e3fe5-9366-44b5-b810-03686421a256.csv';
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const parsedData = parseCSV(csvContent);
console.log(`Parsed ${parsedData.length} rows from CSV`);

// Convert to ChemicalProduct
const products = parsedData.map((row, index) => convertToChemicalProduct(row, index));

// Group by registration number to handle duplicates (same product registered for multiple crops/pests)
const productMap = new Map();
products.forEach(p => {
  const key = `${p.registrationNo}-${p.tradeName}-${p.commonName}`;
  if (!productMap.has(key)) {
    productMap.set(key, { ...p });
  } else {
    // Merge crops and pests
    const existing = productMap.get(key);
    existing.crops = [...new Set([...existing.crops, ...p.crops])];
    existing.pests = [...new Set([...existing.pests, ...p.pests])];
    // Use the more specific dosage rate if available
    if (p.dosageRate && !existing.dosageRate.includes(p.dosageRate)) {
      existing.dosageRate += `; ${p.dosageRate}`;
    }
  }
});

const uniqueProducts = Array.from(productMap.values());
console.log(`Unique products after merging: ${uniqueProducts.length}`);

// Count by type
const typeCounts = {};
uniqueProducts.forEach(p => {
  typeCounts[p.type] = (typeCounts[p.type] || 0) + 1;
});
console.log('Products by type:', typeCounts);

// Generate the new pesticidesData.ts content
const output = `import { ChemicalProduct } from '../types';

export const PESTICIDES_DATABASE: ChemicalProduct[] = [
${uniqueProducts.map(p => `  {
    id: '${p.id}',
    type: '${p.type}',
    commonName: '${p.commonName.replace(/'/g, "\\'")}',
    tradeName: '${p.tradeName.replace(/'/g, "\\'")}',
    registrationNo: '${p.registrationNo}',
    registrationHolder: '${p.registrationHolder.replace(/'/g, "\\'")}',
    crops: [${p.crops.map(c => `'${c.replace(/'/g, "\\'")}'`).join(', ')}],
    pests: [${p.pests.map(c => `'${c.replace(/'/g, "\\'")}'`).join(', ')}],
    dosageRate: '${p.dosageRate.replace(/'/g, "\\'")}',
    moaCode: '${p.moaCode}',
    moaGroup: '${p.moaGroup.replace(/'/g, "\\'")}',
    resistanceRisk: '${p.resistanceRisk}',
    toxicityClass: '${p.toxicityClass}',
    whoColor: '${p.whoColor}',
    formulation: '${p.formulation}',
    phiDays: ${p.phiDays},
    reiHours: ${p.reiHours},
    waterVolumeLPerHa: ${p.waterVolumeLPerHa},
    safetyNotes: ${JSON.stringify(p.safetyNotes)},
    rotationNotes: '${p.rotationNotes.replace(/'/g, "\\'")}'
  }`).join(',\n')}
];
`;

fs.writeFileSync(
  '/workspace/4d4d6a95-d659-49d3-a74a-2cc6d4bbbe57/sessions/agent_ea7e9559-60bd-4d21-a748-b165930aee56/src/data/pesticidesData.ts',
  output
);

console.log('Updated pesticidesData.ts written successfully!');
console.log(`Total products: ${uniqueProducts.length}`);