import { ChemicalProduct } from '../types';

export const FUNGICIDES_DATABASE: ChemicalProduct[] = [
  {
    "id": "fung-0181",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "A-One 300 EC",
    "registrationNo": "AP-3247",
    "registrationHolder": "Aranya Crop Care Limited",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0408",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "A-Zeb 80 WP",
    "registrationNo": "AP-2485",
    "registrationHolder": "Aranya Crop Care Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0258",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Abazole 5 EC",
    "registrationNo": "AP-3215",
    "registrationHolder": "Aranya Crop Care Limited",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0576",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Acatilt 250 EC",
    "registrationNo": "AP-1719",
    "registrationHolder": "ACE Farming Solutions",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0499",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Acilaxyl 72 WP",
    "registrationNo": "AP-1598",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0147",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Acmecop 50 WP",
    "registrationNo": "AP-875",
    "registrationHolder": "Chemolimpex Agro Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust"
    ],
    "dosageRate": "2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0185",
    "type": "Fungicide",
    "commonName": "Dimethomorph (9%) + Mancozeb (60%)",
    "tradeName": "Acrobat MZ",
    "registrationNo": "AP-353",
    "registrationHolder": "BASF Bangladesh Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Chili",
      "Banana",
      "Ground nut",
      "Potato & Tomato"
    ],
    "pests": [
      "Early & Late blight",
      "Anthracnose",
      "Leaf spot",
      "Tikka rust"
    ],
    "dosageRate": "2.00 Kg/ha (2 gm/Litre of water)",
    "moaCode": "FRAC 40 + M03",
    "moaGroup": "CAA (Cell wall biosynthesis) + Multi-site",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Anti-sporulant and curative action on cell walls of Oomycetes",
      "Rainfast in 2 hours"
    ],
    "rotationNotes": "Top recommendation when Metalaxyl-resistant late blight is suspected"
  },
  {
    "id": "fung-0460",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Adcarzeb 75 WP",
    "registrationNo": "AP-3137",
    "registrationHolder": "Advance Agricultural Solution Ltd",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0241",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Adhezole 5 EC",
    "registrationNo": "AP-2501",
    "registrationHolder": "Advanced Agricultural Solution Ltd",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0374",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Afizeb 80 WP",
    "registrationNo": "AP-2154",
    "registrationHolder": "Sundarban Agro Products",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0012",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Agben 50F",
    "registrationNo": "AP-439",
    "registrationHolder": "A-Intraco (Bangladesh) Limited",
    "crops": [
      "Sugarcane",
      "Rice"
    ],
    "pests": [
      "Sett treatment",
      "Sheath blight"
    ],
    "dosageRate": "1 gm/Litre of water; 1.00 Litre",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0092",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Agrani 50 WP",
    "registrationNo": "AP-2455",
    "registrationHolder": "M S Agro Chemicals Company Ltd",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0075",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Agriben 50 WP",
    "registrationNo": "AP-2124",
    "registrationHolder": "Jareer Enterprise",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Seedling rot"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0517",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Agrimil 72 WP",
    "registrationNo": "AP-2171",
    "registrationHolder": "Agrinet Crop Care Bangladesh",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0331",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Agrithane 80 WP",
    "registrationNo": "AP-1386",
    "registrationHolder": "Agribusiness International",
    "crops": [
      "Onion"
    ],
    "pests": [
      "Purple blotch"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0306",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Agrizeb 80 WP",
    "registrationNo": "AP-603",
    "registrationHolder": "Square Pharmaceuticals Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0086",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Agrizim 50 WP",
    "registrationNo": "AP-2448",
    "registrationHolder": "Eminence Chemical Industries Ltd",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0518",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Agrocur 72 WP",
    "registrationNo": "AP-2172",
    "registrationHolder": "Aama Green Care",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0277",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Agrodione 50 WP",
    "registrationNo": "AP-1883",
    "registrationHolder": "Partex Agro Limited",
    "crops": [
      "Onion",
      "Mustard",
      "Tomato"
    ],
    "pests": [
      "Purple blotch",
      "Alternaria blight",
      "Early blight"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0410",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Agrofil M 45",
    "registrationNo": "AP-2487",
    "registrationHolder": "Agro Business Support Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "GR",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0490",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Agromil MZ 72 WP",
    "registrationNo": "AP-719",
    "registrationHolder": "Agro Chem Agribusiness",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0596",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Agrosulf 80 WP",
    "registrationNo": "AP-609",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Betel vine",
      "Tea",
      "Jute"
    ],
    "pests": [
      "Powdery mildew",
      "Red spider mite",
      "Yellow mite"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant for powdery mildew and red spider mites",
      "Avoid high heat applications (>32°C) to prevent leaf scorching",
      "Do not mix with petroleum or emulsified oils"
    ],
    "rotationNotes": "Ideal low-risk rotational partner across all crop stages."
  },
  {
    "id": "fung-0547",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Aimcon 25 EC",
    "registrationNo": "AP-1350",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Rice",
      "Vegetables",
      "Potato",
      "Cotton",
      "Sugarcane",
      "Banana",
      "Wheat"
    ],
    "pests": [
      "Brown planthopper",
      "Cotton jassid",
      "Aphids",
      "Termites",
      "Whitefly",
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "70 - 100 g/ha (0.15 g/L water)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High concentrated water-dispersible granules",
      "Provides long-lasting systemic protection against sucking vectors"
    ],
    "rotationNotes": "Alternate with Pymetrozine (9B) or Pyridinecarboxamide (29)"
  },
  {
    "id": "fung-0011",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Aimcozim 50 WP",
    "registrationNo": "AP-375",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Rice",
      "Tea",
      "Sugarcane",
      "Tomato"
    ],
    "pests": [
      "Sheath blight",
      "Red rust",
      "Sett rot",
      "Pineapple disease",
      "Red rot & Wilt",
      "Seedling rot",
      "Set rot",
      "Pinapple"
    ],
    "dosageRate": "500 gm - 1.00 Kg/ha",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Wear rubber boots and mask",
      "Store locked away from food"
    ],
    "rotationNotes": "Do not use consecutively"
  },
  {
    "id": "fung-0508",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Alconil 72 WP",
    "registrationNo": "AP-1891",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Late & Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fun-0026",
    "type": "Fungicide",
    "commonName": "Fosetyl-Aluminium",
    "tradeName": "Aliette 80 WP",
    "registrationNo": "AP-740",
    "registrationHolder": "Bayer CropScience Ltd",
    "crops": [
      "Citrus",
      "Pineapple",
      "Potato",
      "Vegetables"
    ],
    "pests": [
      "Phytophthora root rot / Gummosis",
      "Heart rot",
      "Downy mildew"
    ],
    "dosageRate": "2.0 kg/ha (2.5 g/L water) or trunk painting",
    "moaCode": "FRAC 33",
    "moaGroup": "Phosphonates (Host plant defense inducer + direct oomycete inhibition)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Fully ambimobile: translocates downwards to roots and upwards to leaf buds",
      "Stimulates natural phytoalexin production inside host crop"
    ],
    "rotationNotes": "Ideal for alternating with Metalaxyl (4)"
  },
  {
    "id": "fung-0042",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Allwin 50 WDF",
    "registrationNo": "AP-1244",
    "registrationHolder": "All Well Agrotech",
    "crops": [
      "Sugarcane"
    ],
    "pests": [
      "Set rot"
    ],
    "dosageRate": "1 gm/liter of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "DF",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0364",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Alpha Cozeb 80 WP",
    "registrationNo": "AP-2144",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Late &Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0279",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Alphadione 50 WP",
    "registrationNo": "AP-1888",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Onion",
      "Mustard"
    ],
    "pests": [
      "Purple blotch",
      "Alternaria blight"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0220",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Amacon 5 EC",
    "registrationNo": "AP-1855",
    "registrationHolder": "Aamagreen Agro limited",
    "crops": [
      "Tea",
      "Mango"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot",
      "Powdery mildew"
    ],
    "dosageRate": "750 ml in 1000 lt of water; 2 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0048",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Amazim 50 WP",
    "registrationNo": "AP-1394",
    "registrationHolder": "Aama Green Care",
    "crops": [
      "Tea",
      "Mango"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back",
      "Anthracnose"
    ],
    "dosageRate": "750 gm in 1000 lt of water; 2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0608",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Amiblast 75 WP",
    "registrationNo": "AP-1768",
    "registrationHolder": "Amco Agricultural Industries",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0006",
    "type": "Fungicide",
    "commonName": "Azoxystrobin (20% ) + Difenoconazole (12.5%)",
    "tradeName": "Amicore 32.5 EC",
    "registrationNo": "AP-3252",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Sweet gourd"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "0.5 ml/Litre of water",
    "moaCode": "FRAC 11 + 3",
    "moaGroup": "QoI + DMI (Strobilurin + Triazole)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Synergistic systemic mixture for sheath blight, dirty panicle, and blast in rice and vegetable anthracnose",
      "Rapid translaminar uptake within 2 hours; rainfast once dry",
      "Wear rubber gloves and mask during spray preparation"
    ],
    "rotationNotes": "Rotate with SDHI (FRAC 7) or contact dithiocarbamates (FRAC M03)."
  },
  {
    "id": "fung-0003",
    "type": "Fungicide",
    "commonName": "Azoxystrobin (20% ) + Difenoconazole (12.5%)",
    "tradeName": "Amistar Top",
    "registrationNo": "AP-2312",
    "registrationHolder": "Syngenta Bangladesh Limited",
    "crops": [
      "Rice",
      "Potato",
      "Tea"
    ],
    "pests": [
      "Sheath blight",
      "Blast",
      "Late blight",
      "Stem Canker",
      "Branch canker"
    ],
    "dosageRate": "1 ml/Litre of water (750 ml - 1 L/ha)",
    "moaCode": "FRAC 11 + 3",
    "moaGroup": "QoI + DMI (Strobilurin + Triazole)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Dual MoA resistance management formula",
      "Systemic and translaminar action",
      "Wear gloves and face shield"
    ],
    "rotationNotes": "Follow with multi-site contact fungicide (Mancozeb or Copper oxychloride)"
  },
  {
    "id": "fung-0369",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Ancozen 80 WP",
    "registrationNo": "AP-2149",
    "registrationHolder": "A N Corporation",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0586",
    "type": "Fungicide",
    "commonName": "Propineb",
    "tradeName": "Antracol 70 WP",
    "registrationNo": "AP-142",
    "registrationHolder": "Bayer CropScience Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Rice",
      "Tea",
      "Apple",
      "Grapes",
      "Betel vine"
    ],
    "pests": [
      "Early blight",
      "Late blight",
      "Brown spot",
      "Die back",
      "Anthracnose",
      "Early & Late blight",
      "Foot rot"
    ],
    "dosageRate": "1.5 - 2.0 kg/ha (2.0 - 2.5 g/L water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site zinc-bearing contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contains 15.8% bio-available Zinc providing immediate canopy greening",
      "Excellent rainfastness with fine suspension stability"
    ],
    "rotationNotes": "No resistance issues"
  },
  {
    "id": "fun-0037",
    "type": "Fungicide",
    "commonName": "Propineb",
    "tradeName": "Antracol 70 WP",
    "registrationNo": "AP-487",
    "registrationHolder": "Bayer CropScience Limited",
    "crops": [
      "Potato",
      "Onion",
      "Tea"
    ],
    "pests": [
      "Late blight",
      "Purple blotch",
      "Die back",
      "Black rot",
      "Red rust"
    ],
    "dosageRate": "2.47 Kg/ha (2 gm/Litre of water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact activity)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#22c55e",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Provides zinc nutrition (approx 15% Zn) boosting leaf greening and disease resistance",
      "Low toxicity"
    ],
    "rotationNotes": "Zero resistance risk. Premier rotation anchor"
  },
  {
    "id": "fun-0038",
    "type": "Fungicide",
    "commonName": "Propineb",
    "tradeName": "Antracol 70 WP",
    "registrationNo": "AP-120",
    "registrationHolder": "Bayer CropScience Ltd",
    "crops": [
      "Potato",
      "Tomato",
      "Rice",
      "Tea",
      "Apple",
      "Grapes"
    ],
    "pests": [
      "Early blight",
      "Late blight",
      "Brown spot",
      "Die back",
      "Anthracnose"
    ],
    "dosageRate": "1.5 - 2.0 kg/ha (2.0 - 2.5 g/L water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site zinc donor)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contains 15.8% bio-available Zinc providing immediate canopy greening",
      "Excellent rainfastness with fine suspension stability"
    ],
    "rotationNotes": "No resistance issues"
  },
  {
    "id": "fung-0478",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Apuri 72 WP",
    "registrationNo": "AP-3245",
    "registrationHolder": "Symbiosis Technology",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Cumcumber"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0405",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Aqizeb 80 WP",
    "registrationNo": "AP-2482",
    "registrationHolder": "Agri Business & Advisory Service",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0038",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Arba 50 WP",
    "registrationNo": "AP-1078",
    "registrationHolder": "Intefa",
    "crops": [
      "Garden pea",
      "Mango",
      "Onion"
    ],
    "pests": [
      "Powdery mildew",
      "Anthracnose",
      "Purple blotch"
    ],
    "dosageRate": "2 gm/litre of water; 1 gm/liter of water; 2 gm/liter of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0551",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Arilt 25 EC",
    "registrationNo": "AP-1375",
    "registrationHolder": "Aranya Crop Care Limited",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0276",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Aristodione 50 WP",
    "registrationNo": "AP-1881",
    "registrationHolder": "Aristocrat Agro Services",
    "crops": [
      "Onion",
      "Mustard"
    ],
    "pests": [
      "Purple blotch",
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/litre of water; 1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0383",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Aristozeb 80 WP",
    "registrationNo": "AP-2163",
    "registrationHolder": "Aristocrat Agro Services",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0504",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Armil 72 WP",
    "registrationNo": "AP-1686",
    "registrationHolder": "A M Traders",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0163",
    "type": "Fungicide",
    "commonName": "Dichloran",
    "tradeName": "Arniline 8 WP",
    "registrationNo": "AP-1161",
    "registrationHolder": "A-Intraco (Bangladesh) Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Onion"
    ],
    "pests": [
      "Foot",
      "Shoot & Leaf rot",
      "Root",
      "Stand & Leaf rot"
    ],
    "dosageRate": "2.0 gm/Litre of water",
    "moaCode": "FRAC 14",
    "moaGroup": "Aromatic hydrocarbons (Lipid peroxidation)",
    "resistanceRisk": "Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Targeted fungicide for Sclerotinia, Botrytis, and Rhizopus soft rots",
      "Wear full protective suit and organic vapor mask during mixing",
      "Observe strict harvest intervals for root crops and fruits"
    ],
    "rotationNotes": "Alternate with dicarboximides (FRAC 2) or triazoles (FRAC 3)."
  },
  {
    "id": "fung-0339",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Ascozeb 80 WP",
    "registrationNo": "AP-1687",
    "registrationHolder": "Assign Crop Care Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0572",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Asetilt 250 EC",
    "registrationNo": "AP-1715",
    "registrationHolder": "Assent International",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0333",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Ashazeb 80 WP",
    "registrationNo": "AP-1594",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0435",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Astothane M-45",
    "registrationNo": "AP-3109",
    "registrationHolder": "Astron Agri Care Bangladesh",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0255",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Astozol 5 EC",
    "registrationNo": "AP-3089",
    "registrationHolder": "Asrton Agri Care Bangladesh",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0097",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Atop 50 WP",
    "registrationNo": "AP-2460",
    "registrationHolder": "Agrivision International",
    "crops": [
      "Cucurbit"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fun-0053",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Autostin 50 WDG / Knowin 50 WP",
    "registrationNo": "AP-680",
    "registrationHolder": "Auto Crop Care Ltd / Shetu Pesticides",
    "crops": [
      "Rice",
      "Wheat",
      "Pulses",
      "Mango",
      "Vegetables"
    ],
    "pests": [
      "Anthracnose",
      "Seed-borne diseases",
      "Sheath blight",
      "Fusarium wilt"
    ],
    "dosageRate": "1.0 kg/ha (2.0 g/L water) or 2.5 g/kg seed",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl benzimidazole carbamates - beta-tubulin assembly)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad spectrum protectant and eradicant",
      "Recommended for dry seed dressing before sowing"
    ],
    "rotationNotes": "DO NOT use repeatedly in field sprays due to high baseline resistance"
  },
  {
    "id": "fung-0390",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Avzeb 80 WP",
    "registrationNo": "AP-2467",
    "registrationHolder": "Agrivision International",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0419",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "B-Zeb 80 WP",
    "registrationNo": "AP-2790",
    "registrationHolder": "Bangladesh Agro Science",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0206",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Baiconazole 5 EC",
    "registrationNo": "AP-1353",
    "registrationHolder": "Bangladesh Agricultural Industries",
    "crops": [
      "Cucurbits"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0154",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Baicoper 50 WP",
    "registrationNo": "AP-1842",
    "registrationHolder": "Bangladesh Agricultural Industries",
    "crops": [
      "Tomato",
      "Tea"
    ],
    "pests": [
      "Late blight",
      "Die back",
      "Black rot & Red rust"
    ],
    "dosageRate": "2 gm/litre of water; 2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0318",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Baizeb 80 WP",
    "registrationNo": "AP-859",
    "registrationHolder": "Bangladesh Agricultural Industries",
    "crops": [
      "Banana",
      "Potato"
    ],
    "pests": [
      "Sigatoka",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0034",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Baizim 50 WP",
    "registrationNo": "AP-1043",
    "registrationHolder": "Bangladesh Agricultural Industries",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust disease"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0035",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Baizim 50 WP",
    "registrationNo": "AP-1044",
    "registrationHolder": "Bangladesh Agricultural Industries",
    "crops": [
      "Onion"
    ],
    "pests": [
      "Purple blotch"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0180",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Banner 300 EC",
    "registrationNo": "AP-3246",
    "registrationHolder": "Amco Agricultural Industries",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0114",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Barbiton 50 DF",
    "registrationNo": "AP-3132",
    "registrationHolder": "S M Agriculture Division",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "DF",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0008",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Bavistin DF",
    "registrationNo": "AP-176",
    "registrationHolder": "BASF Bangladesh Limited",
    "crops": [
      "Sugarcane",
      "Rice",
      "Wheat",
      "Cabbage",
      "Cauliflower",
      "Tomato",
      "Cauliflowe"
    ],
    "pests": [
      "Sett rot",
      "Red rot",
      "Pineapple disease",
      "Wilt",
      "Sheath blight",
      "Loose smut",
      "Seedling rot",
      "Pine apple"
    ],
    "dosageRate": "500 gm/ha (1 gm/L of water)",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "DF",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Known teratogen risk in lab models; strictly avoid dermal contact",
      "Wear impermeable gloves and respirator",
      "Do not exceed 2 sprays per year"
    ],
    "rotationNotes": "High resistance risk! Always rotate with FRAC 3 (Hexaconazole) or FRAC M03 (Mancozeb)"
  },
  {
    "id": "fung-0599",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Beam 75 WP",
    "registrationNo": "AP-461",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0091",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Bencarb 50 WP",
    "registrationNo": "AP-2454",
    "registrationHolder": "Agrivision Bangladesh",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0063",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Benda 50 WP",
    "registrationNo": "AP-1850",
    "registrationHolder": "Salica Trade International",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0027",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Bendazim 50 WP",
    "registrationNo": "AP-758",
    "registrationHolder": "National AgriCare Import & Export Ltd",
    "crops": [
      "Cucurbit",
      "Onion"
    ],
    "pests": [
      "Powdery mildew",
      "Purple blotch"
    ],
    "dosageRate": "1 gm/litre of water; 2 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0473",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Bentacyl 72 WP",
    "registrationNo": "AP-2519",
    "registrationHolder": "Bengal Agro Chemicals Industries",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0260",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Benzole 5 EC",
    "registrationNo": "AP-3228",
    "registrationHolder": "Bengal Agro Chemicals Industries",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0338",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "BGM Special",
    "registrationNo": "AP-1685",
    "registrationHolder": "Larsen Chemical Industries (Pvt) Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0502",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Bico Gold 72 WP",
    "registrationNo": "AP-1682",
    "registrationHolder": "Bismillah Corporation Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0040",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Bico Homai 50 WP",
    "registrationNo": "AP-1115",
    "registrationHolder": "Bismillah Corporation Limited",
    "crops": [
      "Vegetables",
      "Cotton",
      "Maize",
      "Soybean",
      "Garden pea"
    ],
    "pests": [
      "Armyworm (Spodoptera litura)",
      "Cotton leaf caterpillar",
      "Diamondback moth",
      "Powdery mildew"
    ],
    "dosageRate": "500 ml/ha (1.0 ml/L water)",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Insect Growth Regulator (IGR); prevents moulting in juvenile larvae",
      "Sterilizes eggs laid by treated adult moths; breaks life cycle generations"
    ],
    "rotationNotes": "Alternate with neurotoxins like Emamectin (6) or Chlorantraniliprole (28)"
  },
  {
    "id": "fung-0468",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Bicojan 72 WP",
    "registrationNo": "AP-1882",
    "registrationHolder": "Bismillah Corporation Limited",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0224",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Bicotaf 5 EC",
    "registrationNo": "AP-1868",
    "registrationHolder": "Bismillah Corporation Limited",
    "crops": [
      "Tea",
      "Cucurbits"
    ],
    "pests": [
      "Die-back",
      "Black rot",
      "Powdery mildew"
    ],
    "dosageRate": "750 ml in 1000 lt of water; 1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0536",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Bicotilt 25 EC",
    "registrationNo": "AP-1087",
    "registrationHolder": "Bismillah Corporation Limited",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0328",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Bicozeb M-45 80 WP",
    "registrationNo": "AP-1076",
    "registrationHolder": "Bismillah Corporation Limited",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Early & Late blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0605",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Bicozole 75 WP",
    "registrationNo": "AP-1371",
    "registrationHolder": "Bismillah Corporation Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0459",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Bimole 75 WP",
    "registrationNo": "AP-3136",
    "registrationHolder": "Mamun Agro Products Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0069",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Biozim 50 WP",
    "registrationNo": "AP-2118",
    "registrationHolder": "Crop Life Agro Chemicals Ltd",
    "crops": [
      "Tea",
      "Cucurbit"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back",
      "Powdery mildew"
    ],
    "dosageRate": "750 gm in 1000 lt of water; 2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0607",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Blaster 75 WP",
    "registrationNo": "AP-1613",
    "registrationHolder": "Sweet Agrovet Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0602",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Blastnil 75 WP",
    "registrationNo": "AP-1089",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0379",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Blezeb 80 WP",
    "registrationNo": "AP-2159",
    "registrationHolder": "Blessing Agrovet Industries Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0208",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Blezole 5 EC",
    "registrationNo": "AP-1361",
    "registrationHolder": "Blessing Agrovet Industries Limited",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 ml/litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0209",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Blezole 5 EC",
    "registrationNo": "AP-1362",
    "registrationHolder": "Blessing Agrovet Industries Limited",
    "crops": [
      "Banana",
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Sigatoka",
      "Late blight",
      "Early & Late blight"
    ],
    "dosageRate": "1 ml/litre of water; 2 gm/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0210",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Blezole 5 EC",
    "registrationNo": "AP-1363",
    "registrationHolder": "Blessing Agrovet Industries Limited",
    "crops": [
      "Rice",
      "Potato"
    ],
    "pests": [
      "Sheath blight",
      "Late blight"
    ],
    "dosageRate": "500 ml; 2 gm/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0144",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Blitox 50 WP",
    "registrationNo": "AP-704",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust"
    ],
    "dosageRate": "2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0149",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Blue-cop 50 WP",
    "registrationNo": "AP-994",
    "registrationHolder": "Agrimax Bangladesh Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust"
    ],
    "dosageRate": "2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0168",
    "type": "Fungicide",
    "commonName": "Difenoconazole",
    "tradeName": "Bond 250 EC",
    "registrationNo": "AP-2390",
    "registrationHolder": "Agritech",
    "crops": [
      "Mango",
      "Banana"
    ],
    "pests": [
      "Anthracnose",
      "Sigatoka"
    ],
    "dosageRate": "0.5 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Demethylation inhibitor - Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High-potency systemic triazole providing preventive and curative control of blast, sheath blight, and leaf spots",
      "Inhibits fungal ergosterol biosynthesis at the C14-demethylase enzyme",
      "Toxic to aquatic organisms; maintain strict aquatic buffer distances"
    ],
    "rotationNotes": "Maximum 3 applications per season. Alternate with FRAC 11 (QoI) or FRAC M03."
  },
  {
    "id": "fung-0531",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Bumper 25 EC",
    "registrationNo": "AP-894",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Rice",
      "Banana",
      "Wheat",
      "Tea"
    ],
    "pests": [
      "Sheath blight",
      "Sigatoka",
      "Leaf blight",
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0448",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Bunker 75 WP",
    "registrationNo": "AP-2522",
    "registrationHolder": "Marshal Agrovet Chemical Industries Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0243",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Butazole 50 SC",
    "registrationNo": "AP-2503",
    "registrationHolder": "Crop Life Agro Chemicals Ltd",
    "crops": [
      "Cucurbits"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0430",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Byvin 80 WP",
    "registrationNo": "AP-3104",
    "registrationHolder": "Krishan Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0559",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "C-Tilt 25 EC",
    "registrationNo": "AP-1600",
    "registrationHolder": "Clean Agro",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0125",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Cadim 50 WP",
    "registrationNo": "AP-3244",
    "registrationHolder": "The Chemicals",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0111",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Calibar 50 WP",
    "registrationNo": "AP-3129",
    "registrationHolder": "Green Bangla Formulation",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0446",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Camamix 750 WP",
    "registrationNo": "AP-2167",
    "registrationHolder": "ACI Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0157",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Capvit 50 WP",
    "registrationNo": "AP-2507",
    "registrationHolder": "Rico Agrovet",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot & Red rust"
    ],
    "dosageRate": "2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0083",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Carb 50 WP",
    "registrationNo": "AP-2242",
    "registrationHolder": "Agrinet Crop Care Bangladesh",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0443",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Carbazeb 75 WP",
    "registrationNo": "AP-1931",
    "registrationHolder": "Raven Aqua Agriculture Limited",
    "crops": [
      "Mango",
      "Potato"
    ],
    "pests": [
      "Anthracnose",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0121",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Carbeluck 50 WP",
    "registrationNo": "AP-3240",
    "registrationHolder": "Unicrop Protection Limited",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0026",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Carbozim 50 WP",
    "registrationNo": "AP-757",
    "registrationHolder": "Reximco Insecticides Limited",
    "crops": [
      "Cucurbit"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0442",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Carcozeb 75 WP",
    "registrationNo": "AP-1929",
    "registrationHolder": "Sea Trade Fertilizer Limited",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Early blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0067",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Cardazim 50 WP",
    "registrationNo": "AP-1854",
    "registrationHolder": "Assign Crop Care Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0530",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Care 250 EC",
    "registrationNo": "AP-808",
    "registrationHolder": "National AgriCare Import & Export Ltd",
    "crops": [
      "Banana",
      "Wheat",
      "Rice",
      "Tea"
    ],
    "pests": [
      "Sigatoka",
      "Leaf blight",
      "Sheath blight",
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0133",
    "type": "Fungicide",
    "commonName": "Copper hydroxide",
    "tradeName": "Champion 77 WP",
    "registrationNo": "AP-354",
    "registrationHolder": "Petrochem (Bangladesh) Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Mango",
      "Chili",
      "Citrus",
      "Banana",
      "Ground nut",
      "Tea",
      "Potato & Tomato"
    ],
    "pests": [
      "Late blight",
      "Anthracnose",
      "Scab",
      "Leaf spot",
      "Tikka rust",
      "Red rust disease"
    ],
    "dosageRate": "2 gm/Litre of water (2.24 Kg/ha)",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 3,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Broad spectrum bactericide & fungicide",
      "Corrosive to brass nozzles; rinse sprayer thoroughly",
      "Do not mix with strongly acidic compounds"
    ],
    "rotationNotes": "Zero known resistance. Essential anti-resistance baseline"
  },
  {
    "id": "fung-0049",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Chemozim 50 WP",
    "registrationNo": "AP-1395",
    "registrationHolder": "Byco Agro Chemicals",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0402",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Chemzeb 80 WP",
    "registrationNo": "AP-2479",
    "registrationHolder": "Chemolimpex Agro Limited",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0207",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Chokka 5 EC",
    "registrationNo": "AP-1349",
    "registrationHolder": "Eon Agro Industries Limited",
    "crops": [
      "Cucurbits",
      "Rice"
    ],
    "pests": [
      "Powdery mildew",
      "Sheath blight"
    ],
    "dosageRate": "1 ml/Litre of water; 500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0396",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Chotranash 80 WP",
    "registrationNo": "AP-2473",
    "registrationHolder": "Sadik Agrochemicals Co.",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0015",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Cindazim 50 WP",
    "registrationNo": "AP-627",
    "registrationHolder": "Shetu Corporation Limited",
    "crops": [
      "Tomato",
      "Rice",
      "Sugarcane"
    ],
    "pests": [
      "Wilt",
      "Sheath blight",
      "Sett rot",
      "Red rot"
    ],
    "dosageRate": "2 gm/Litre of water; 1.00 Kg; 500 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0441",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Claster 75 WP",
    "registrationNo": "AP-1725",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Groundnut"
    ],
    "pests": [
      "Leaf spot rust"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0363",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Cleanzeb 80 WP",
    "registrationNo": "AP-2143",
    "registrationHolder": "Clean Agro",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Late &Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0110",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Cleanzim 50 WP",
    "registrationNo": "AP-3128",
    "registrationHolder": "Clean Agro",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0397",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Clorofil M 45",
    "registrationNo": "AP-2474",
    "registrationHolder": "S M Agriculture Division",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0104",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Cloud 50 WP",
    "registrationNo": "AP-3122",
    "registrationHolder": "Keen Care Crop Science",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0455",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "CM 75 WP",
    "registrationNo": "AP-2529",
    "registrationHolder": "McDonald Crop Care Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0171",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Combi-2 30 EC",
    "registrationNo": "AP-1775",
    "registrationHolder": "National AgriCare Import & Export Ltd",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "120 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0449",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Combine 75 WP",
    "registrationNo": "AP-2523",
    "registrationHolder": "Cobra Land Care",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0506",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Comil 72 WP",
    "registrationNo": "AP-1695",
    "registrationHolder": "Cosmic Agro Care",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0438",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Companion",
    "registrationNo": "AP-664",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Mango",
      "Potato",
      "Tomato",
      "Cucurbit",
      "Chili",
      "Ground nut"
    ],
    "pests": [
      "Anthracnose",
      "Late blight",
      "Early blight",
      "Powdery mildew",
      "Tikka disease"
    ],
    "dosageRate": "1 - 2 gm/Litre of water (1.5 - 2 Kg/ha)",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Combines contact barrier of Mancozeb with systemic action of Carbendazim",
      "Protects against both seed and foliar pathogens"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)"
  },
  {
    "id": "fung-0561",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Conazole 25 EC",
    "registrationNo": "AP-1614",
    "registrationHolder": "Larsen Chemical Industries (Pvt) Ltd",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight",
      "Annual grasses & Sedges",
      "Broad leaf weed"
    ],
    "dosageRate": "500 ml; 1.00 Litre",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0582",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Conik 250 EC",
    "registrationNo": "AP-1727",
    "registrationHolder": "Kishan Agro Products",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0193",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Contaf 5 EC",
    "registrationNo": "AP-460",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Maize",
      "Sugarcane",
      "Rice",
      "Banana",
      "Cucurbits",
      "Tea",
      "Mango",
      "Ground nut",
      "Bettle Vine"
    ],
    "pests": [
      "Trianthema portulacastrum",
      "Digera arvensis",
      "Eleusine indica",
      "Amaranthus",
      "Sheath blight",
      "Sigatoka",
      "Powdery mildew",
      "Red rust disease",
      "Powdery mildew and Anthracnose",
      "Tikka disease",
      "Leaf rot",
      "Vine rot & blight"
    ],
    "dosageRate": "2.0 kg/ha (Pre-emergence within 2 days of planting)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 60,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Selective pre-emergence maize herbicide with residual action",
      "Ensure even soil spraying with flat-fan nozzle"
    ],
    "rotationNotes": "Follow with 2,4-D for post-emergence broadleaf escapes"
  },
  {
    "id": "fung-0560",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Contilt 250 EC",
    "registrationNo": "AP-1601",
    "registrationHolder": "Agro Continent Bangladesh",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0474",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Contracyl 72 WP",
    "registrationNo": "AP-2520",
    "registrationHolder": "Great Agro Care",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0196",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Control 5 EC",
    "registrationNo": "AP-782",
    "registrationHolder": "SARK Bangladesh",
    "crops": [
      "Cucurbits",
      "Banana",
      "Rice"
    ],
    "pests": [
      "Powdery mildew",
      "Sigatoka",
      "Sheath blight"
    ],
    "dosageRate": "1 ml/Litre of water; 0.5 ml/Litre of water; 500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0203",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Conza 5 EC",
    "registrationNo": "AP-1047",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Garden pea",
      "Mango",
      "Banana"
    ],
    "pests": [
      "Powdery mildew",
      "Anthracnose",
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water; 2 m/litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0143",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Copper 50 WP",
    "registrationNo": "AP-703",
    "registrationHolder": "Reximco Insecticides Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust"
    ],
    "dosageRate": "2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0158",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Copraz 50 WP",
    "registrationNo": "AP-2508",
    "registrationHolder": "Siraj Agro International",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2.5 gm/litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0483",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Coromil MZ 72 WP",
    "registrationNo": "AP-446",
    "registrationHolder": "Corbel International Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0311",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Corozeb 80 WP",
    "registrationNo": "AP-711",
    "registrationHolder": "Corbel Chemical International Ltd.",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0020",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Corozim 50 WP",
    "registrationNo": "AP-751",
    "registrationHolder": "Corbel International Limited",
    "crops": [
      "Sugarcane"
    ],
    "pests": [
      "Set rot"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0456",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Cosaf 75 WP",
    "registrationNo": "AP-2530",
    "registrationHolder": "Assign Crop Care Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0161",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Coxy 50 WP",
    "registrationNo": "AP-3143",
    "registrationHolder": "Aama Green Care",
    "crops": [
      "Mango",
      "Tea"
    ],
    "pests": [
      "Anthracnose",
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2 gm/Litre of water; 2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0299",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Cozeb 80 WP",
    "registrationNo": "AP-448",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0041",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "CP-Zim 50 WP",
    "registrationNo": "AP-1225",
    "registrationHolder": "Crop Protection & Care Centre",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Black root disease"
    ],
    "dosageRate": "750 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0173",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Cropcep 300 EC",
    "registrationNo": "AP-2545",
    "registrationHolder": "Mimpex Agrochemicals Limited",
    "crops": [
      "Chili",
      "Banana"
    ],
    "pests": [
      "Anthracnose",
      "Sigatoka"
    ],
    "dosageRate": "0.5 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fun-0138",
    "type": "Fungicide",
    "commonName": "Copper Oxychloride",
    "tradeName": "Cupravit 50 WP / Blue Copper 50 WP",
    "registrationNo": "AP-15",
    "registrationHolder": "Bayer CropScience Ltd / Shetu Pesticides",
    "crops": [
      "Potato",
      "Citrus",
      "Tea",
      "Mango",
      "Vegetables"
    ],
    "pests": [
      "Late blight",
      "Citrus canker",
      "Blister blight",
      "Anthracnose",
      "Die-back"
    ],
    "dosageRate": "2.5 kg/ha (4.0 - 5.0 g/L water)",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic Copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 3,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Forms persistent insoluble protective barrier on leaf surfaces",
      "Wash knapsack sprayer thoroughly after use to prevent nozzle corrosion"
    ],
    "rotationNotes": "No resistance management restrictions"
  },
  {
    "id": "fung-0463",
    "type": "Fungicide",
    "commonName": "Mancozeb  (12%) + Copper (30%)",
    "tradeName": "Cuprofix 30 Dispers",
    "registrationNo": "AP-1887",
    "registrationHolder": "Chens Crop-Science Bangladesh Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + M01",
    "moaGroup": "Dithiocarbamate + Inorganic copper",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Dual-contact protectant against fungal leaf spots, downy mildew, and bacterial blight",
      "Provides multi-site enzyme inactivation without single-point target vulnerability",
      "Do not tank mix with acidifying adjuvants"
    ],
    "rotationNotes": "Cornerstone resistance stewardship fungicide. Low resistance risk."
  },
  {
    "id": "fung-0046",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Cuptun 50 WP",
    "registrationNo": "AP-1383",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Wheat"
    ],
    "pests": [
      "Late rust"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0267",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Curate 50 WP",
    "registrationNo": "AP-1352",
    "registrationHolder": "Crop Protection & Care Center",
    "crops": [
      "Mustard",
      "Onion",
      "Tomato"
    ],
    "pests": [
      "Alternaria bright",
      "Purple blotch",
      "Early blight"
    ],
    "dosageRate": "1 gm/litre of water; 2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0240",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Curezole 50 SC",
    "registrationNo": "AP-2500",
    "registrationHolder": "Mary Gold Agro Science",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0465",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Curzate M8",
    "registrationNo": "AP-1372",
    "registrationHolder": "Petrochem Agro Industries Ltd.",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Early blight"
    ],
    "dosageRate": "2 gm/Liter of water (2.00 Kg/ha)",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Has curative kick-back action within 48-72 hours of late blight infection",
      "Rainfast quickly"
    ],
    "rotationNotes": "Alternate with Metalaxyl + Mancozeb or Mandipropamid"
  },
  {
    "id": "fung-0098",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Cutzim 50 WP",
    "registrationNo": "AP-2461",
    "registrationHolder": "Mary Gold Agro Science",
    "crops": [
      "Cucurbit"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0466",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Cymongold 72 WP",
    "registrationNo": "AP-1688",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "1.5 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0610",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "D-Blast 75 WP",
    "registrationNo": "AP-1770",
    "registrationHolder": "Dreamland Agro Products",
    "crops": [
      "Rice",
      "Potato",
      "Banana",
      "Mango",
      "Cucumber"
    ],
    "pests": [
      "Sheath blight",
      "Late blight",
      "Sigatoka",
      "Anthracnose",
      "Powdery mildew",
      "Blast disease"
    ],
    "dosageRate": "1.5 - 3.0 gm/Litre of water (1.5 Kg/ha)",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Known for plant health effect (AgCelence effect) with greener leaves",
      "Built-in resistance protection via Metiram multi-site partner"
    ],
    "rotationNotes": "Do not spray more than twice consecutively. Rotate with FRAC 3"
  },
  {
    "id": "fung-0556",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "D-Tilt 25 EC",
    "registrationNo": "AP-1595",
    "registrationHolder": "D M International",
    "crops": [
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fun-0148",
    "type": "Fungicide",
    "commonName": "Chlorothalonil",
    "tradeName": "Daconil 75 WP / Kavach 75 WP",
    "registrationNo": "AP-495",
    "registrationHolder": "Syngenta Bangladesh Ltd",
    "crops": [
      "Potato",
      "Tomato",
      "Cucurbits",
      "Groundnut",
      "Chilli"
    ],
    "pests": [
      "Late blight",
      "Early blight",
      "Downy mildew",
      "Anthracnose",
      "Tikka leaf spot"
    ],
    "dosageRate": "1.5 - 2.0 kg/ha (2.0 - 2.5 g/L water)",
    "moaCode": "FRAC M05",
    "moaGroup": "Chloronitriles (Multi-site thiol reactant)",
    "resistanceRisk": "Low",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Finely milled particles provide outstanding tenacity against heavy rainfall wash-off",
      "Zero fungal resistance risk worldwide; cornerstone of anti-resistance programs"
    ],
    "rotationNotes": "Universal rotational protectant partner"
  },
  {
    "id": "fung-0520",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Daimil 72 WP",
    "registrationNo": "AP-2174",
    "registrationHolder": "Mary Gold Agro Science",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0131",
    "type": "Fungicide",
    "commonName": "Chlorothalonil",
    "tradeName": "Deconil 500 EC",
    "registrationNo": "AP-2114",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Potato",
      "Tea"
    ],
    "pests": [
      "Late Blight",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 ml - 2.00 L/ha (2 ml/L)",
    "moaCode": "FRAC M05",
    "moaGroup": "Multi-site contact (Chloronitriles)",
    "resistanceRisk": "Low",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Severe eye irritant; goggles mandatory",
      "Apply preventatively before disease establishment",
      "Sticks well to foliage in rain"
    ],
    "rotationNotes": "No cross-resistance. Ideal rotational protector with systemic fungicides"
  },
  {
    "id": "fung-0166",
    "type": "Fungicide",
    "commonName": "Difenoconazole",
    "tradeName": "Defender 25 EC",
    "registrationNo": "AP-1757",
    "registrationHolder": "National AgriCare Import & Export Ltd",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "0.5 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Demethylation inhibitor - Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High-potency systemic triazole providing preventive and curative control of blast, sheath blight, and leaf spots",
      "Inhibits fungal ergosterol biosynthesis at the C14-demethylase enzyme",
      "Toxic to aquatic organisms; maintain strict aquatic buffer distances"
    ],
    "rotationNotes": "Maximum 3 applications per season. Alternate with FRAC 11 (QoI) or FRAC M03."
  },
  {
    "id": "fung-0126",
    "type": "Fungicide",
    "commonName": "Carbendazim ( 32.5%) + Hexaconazole (2.5%)",
    "tradeName": "Defense 35 SC",
    "registrationNo": "AP-2792",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Wheat"
    ],
    "pests": [
      "Scarb"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 1 + 3",
    "moaGroup": "MBC + DMI (Benzimidazole + Triazole)",
    "resistanceRisk": "High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Dual-systemic fungicide targeting fungal mitosis and sterol biosynthesis simultaneously",
      "Curative and preventive for sheath blight, stem rot, and tikka leaf spot",
      "Wear standard PPE and avoid spraying during high wind"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or contact protectants (FRAC M05, M03)."
  },
  {
    "id": "fung-0124",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Delcozim 50 WP",
    "registrationNo": "AP-3243",
    "registrationHolder": "Delco Agro Industries",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0152",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Delight 50 WP",
    "registrationNo": "AP-1675",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Potato",
      "Tea"
    ],
    "pests": [
      "Late blight",
      "Die back",
      "Black rot & Red rust"
    ],
    "dosageRate": "2 gm/litre of water; 2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0313",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Dencozeb 80 WP",
    "registrationNo": "AP-718",
    "registrationHolder": "Reximco Insecticides Limited",
    "crops": [
      "Banana",
      "Potato"
    ],
    "pests": [
      "Sigatoka",
      "Late blight"
    ],
    "dosageRate": "1 ml/Litre of water; 2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0477",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Desconil 72 WP",
    "registrationNo": "AP-3139",
    "registrationHolder": "Desh Agro Service",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0432",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Deshzeb 80 WP",
    "registrationNo": "AP-3106",
    "registrationHolder": "Desh Agro Service",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0212",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Detail 5 SC",
    "registrationNo": "AP-1498",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Mango",
      "Chili"
    ],
    "pests": [
      "Anthracnose",
      "Tikka rust spot"
    ],
    "dosageRate": "1 ml/litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0368",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Dewthane 80 WP",
    "registrationNo": "AP-2148",
    "registrationHolder": "D M International",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0032",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Dhangora 50 WP",
    "registrationNo": "AP-993",
    "registrationHolder": "Home Pest Control",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0179",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Dial 300 EC",
    "registrationNo": "AP-3082",
    "registrationHolder": "Valent Tech Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "0.5 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0178",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Differ 300 EC",
    "registrationNo": "AP-3081",
    "registrationHolder": "ACI Agrochemicals Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0055",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Dimbazim 50 WP",
    "registrationNo": "AP-1721",
    "registrationHolder": "Dreamland Agro Products",
    "crops": [
      "Rice",
      "Tea"
    ],
    "pests": [
      "Sheath blight",
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "1.00 Kg; 750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0553",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Diptilt 250 EC",
    "registrationNo": "AP-1380",
    "registrationHolder": "Dreamland Agro Products",
    "crops": [
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Echinochloa spp.",
      "Cyperus difformis",
      "Eclipta prostrata",
      "Marsilea quadrifolia",
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "100 g/ha (Applied 3-5 days after transplanting)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 45,
    "reiHours": 24,
    "waterVolumeLPerHa": 400,
    "safetyNotes": [
      "Forms a chemical film on the water and mud surface",
      "Weed shoots touch the layer during germination and undergo rapid desiccation"
    ],
    "rotationNotes": "Alternate with Chloroacetamides (HRAC 15)"
  },
  {
    "id": "fung-0425",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Direl M 45",
    "registrationNo": "AP-3099",
    "registrationHolder": "General Agro Chemicals Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0304",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Dithane M 45",
    "registrationNo": "AP-546",
    "registrationHolder": "Bayer CropScience Limited",
    "crops": [
      "Potato",
      "Jute",
      "Peanut",
      "Tomato"
    ],
    "pests": [
      "Early & Late blight",
      "Stem rot",
      "Tikka disease"
    ],
    "dosageRate": "2.20 Kg/ha (2 gm/Litre of water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "World benchmark protectant; acts on 6 different biochemical sites",
      "Must be applied before pathogen infection",
      "Do not inhale dust"
    ],
    "rotationNotes": "Zero known resistance. Essential tank-mix or alternation partner for all systemic fungicides"
  },
  {
    "id": "fung-0305",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Dithane M 46",
    "registrationNo": "AP-547",
    "registrationHolder": "Bayer CropScience Limited",
    "crops": [
      "Jute",
      "Peanut"
    ],
    "pests": [
      "Stem rot",
      "Tikka disease"
    ],
    "dosageRate": "2.20 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fun-0168",
    "type": "Fungicide",
    "commonName": "Mancozeb 75% WP",
    "tradeName": "Dithane M-45 / Indofil M-45",
    "registrationNo": "AP-30",
    "registrationHolder": "Corteva Agriscience / Haychem Bangladesh Ltd",
    "crops": [
      "Potato",
      "Tomato",
      "Rice",
      "Wheat",
      "Mango",
      "Chilli"
    ],
    "pests": [
      "Late blight",
      "Early blight",
      "Brown spot",
      "Blast",
      "Anthracnose",
      "Damping off"
    ],
    "dosageRate": "2.0 - 2.5 kg/ha (2.5 g/L water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site cell membrane and enzyme inhibitor)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contains 16% Manganese and 2% Zinc, serving as secondary plant micronutrient feed",
      "World standard broad-spectrum contact protective fungicide"
    ],
    "rotationNotes": "Use freely across all crop cycles to prevent resistance build-up"
  },
  {
    "id": "fung-0134",
    "type": "Fungicide",
    "commonName": "Copper hydroxide",
    "tradeName": "Dolphin 77 WP",
    "registrationNo": "AP-716",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "6.50 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Bactericide and contact fungicide with multi-site protein denaturation by cupric ions",
      "Effective against bacterial leaf blight, citrus canker, and downy mildews",
      "Do not tank-mix with strongly acidic compounds or Fosetyl-Al"
    ],
    "rotationNotes": "Low resistance risk. Alternate with biologicals (FRAC BM02) or dithiocarbamates (M03)."
  },
  {
    "id": "fung-0451",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "E-Carman 75 WP",
    "registrationNo": "AP-2525",
    "registrationHolder": "Energy Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0332",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "E-Zeb 80 WP",
    "registrationNo": "AP-1500",
    "registrationHolder": "Eon Agro Industries Limited",
    "crops": [
      "Groundnut",
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Tikka",
      "Late blight",
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0334",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Eco-M-45",
    "registrationNo": "AP-1596",
    "registrationHolder": "Amco Agricultural Industries",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0552",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Ecotilt 250 EC",
    "registrationNo": "AP-1379",
    "registrationHolder": "Amco Agricultural Industries",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0579",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Ecotilt 250 EC",
    "registrationNo": "AP-1723",
    "registrationHolder": "East West Chemicals Limited",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0028",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Ecozim 50 WP",
    "registrationNo": "AP-856",
    "registrationHolder": "East West Chemicals Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "2 gm /litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0296",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Edcozeb 80 WP",
    "registrationNo": "AP-273",
    "registrationHolder": "Sea Trade Fertilizer Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Mango"
    ],
    "pests": [
      "Late blight",
      "Early blight",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0189",
    "type": "Fungicide",
    "commonName": "Edifenphos",
    "tradeName": "Edifen 50 EC",
    "registrationNo": "AP-268",
    "registrationHolder": "Shetu Pesticides Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast",
      "Blister blight & Brown blight"
    ],
    "dosageRate": "850 ml",
    "moaCode": "FRAC 20",
    "moaGroup": "Phosphorothiolates (Phospholipid biosynthesis)",
    "resistanceRisk": "Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Organophosphorus fungicide highly effective for rice blast (Pyricularia oryzae)",
      "Cholinesterase inhibitor; antidote is Atropine sulfate",
      "Toxic to fish; strictly avoid draining water from treated paddies into fish culture"
    ],
    "rotationNotes": "Rotate with Tricyclazole (FRAC 16.1) or Kasugamycin (FRAC 24)."
  },
  {
    "id": "fung-0021",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Edvistin 50 WP",
    "registrationNo": "AP-752",
    "registrationHolder": "Bony Enterprise",
    "crops": [
      "Sugarcane"
    ],
    "pests": [
      "Set rot"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0563",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Eltilt 250 EC",
    "registrationNo": "AP-1628",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0050",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Emidazim 50 WP",
    "registrationNo": "AP-1429",
    "registrationHolder": "Integrated Crop Solution Bangladesh",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0491",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Emilaxyl 72 WP",
    "registrationNo": "AP-784",
    "registrationHolder": "Eminence Chemical Industries Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0151",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Emivit 50 WP",
    "registrationNo": "AP-1310",
    "registrationHolder": "Eminence Chemical Industries Ltd",
    "crops": [
      "Tea",
      "Chili"
    ],
    "pests": [
      "Red rust",
      "Die back"
    ],
    "dosageRate": "2.80 Kg; 70 gm/10 lt of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0362",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Encozeb 80 WP",
    "registrationNo": "AP-2142",
    "registrationHolder": "Pioneer Agro International",
    "crops": [
      "Onion",
      "Tomato"
    ],
    "pests": [
      "Purple Bloch",
      "Late &Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0183",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Endavour 300 EC",
    "registrationNo": "AP-3249",
    "registrationHolder": "Atherton Imbros Company Limited",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0078",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Erguven 50 WP",
    "registrationNo": "AP-2127",
    "registrationHolder": "Active Crop Care Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0467",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Euromil 72 WP",
    "registrationNo": "AP-1867",
    "registrationHolder": "New Life Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0401",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Eurozeb 80 WP",
    "registrationNo": "AP-2478",
    "registrationHolder": "Euro Bangla Agricultural Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0174",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Evaeilt Super 300 EC",
    "registrationNo": "AP-1591",
    "registrationHolder": "E H & Agrovet Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "120 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0269",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Evaral 50 WP",
    "registrationNo": "AP-1356",
    "registrationHolder": "E H & Agrovet Limited",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria bright"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0529",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Evatilt 25 EC",
    "registrationNo": "AP-783",
    "registrationHolder": "E H & Agrovet Limited",
    "crops": [
      "Banana",
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Sigatoka",
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0018",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Evazim 50 WP",
    "registrationNo": "AP-729",
    "registrationHolder": "E H & Agrovet Limited",
    "crops": [
      "Rice",
      "Sugarcane"
    ],
    "pests": [
      "Sheath blight",
      "Set rot"
    ],
    "dosageRate": "1.00 Kg; 1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0428",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Everthane 80 WP",
    "registrationNo": "AP-3102",
    "registrationHolder": "Evergreen Crop Care Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0389",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Exzeb 80 WP",
    "registrationNo": "AP-2466",
    "registrationHolder": "Mary Gold Agro Science",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0259",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Exzole 5 SC",
    "registrationNo": "AP-3218",
    "registrationHolder": "Cobra Agro Chemical Industries",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0583",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "F-Tilt 250 EC",
    "registrationNo": "AP-1728",
    "registrationHolder": "FCI Agro Limited",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0423",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "F-Zeb 80 WP",
    "registrationNo": "AP-3097",
    "registrationHolder": "FCI Agro Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0250",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Fasal Hexa 5 EC",
    "registrationNo": "AP-3084",
    "registrationHolder": "Green Bangla Formulation",
    "crops": [
      "Tea",
      "Mango"
    ],
    "pests": [
      "Die back",
      "Black rot",
      "Anthracnose"
    ],
    "dosageRate": "750 ml; 1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0376",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Faulizeb 80 WP",
    "registrationNo": "AP-2156",
    "registrationHolder": "Rajib Agro Chemicals Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0382",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Fetter 80 WP",
    "registrationNo": "AP-2162",
    "registrationHolder": "Joary Agro",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0578",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Filt 250 EC",
    "registrationNo": "AP-1722",
    "registrationHolder": "Farm Chem International Ltd",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0302",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Filthane M 45",
    "registrationNo": "AP-504",
    "registrationHolder": "Agritech",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0058",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Filzim 50 WP",
    "registrationNo": "AP-1844",
    "registrationHolder": "A M Traders",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0407",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Finezeb 80 WP",
    "registrationNo": "AP-2484",
    "registrationHolder": "Sun Corporation",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0581",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Fitilt 250 EC",
    "registrationNo": "AP-1726",
    "registrationHolder": "M S Agro Chemicals Company Ltd",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0251",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Fizole 5 EC",
    "registrationNo": "AP-3085",
    "registrationHolder": "West Agro Chemicals Industries",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0223",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Flash 5 EC",
    "registrationNo": "AP-1858",
    "registrationHolder": "A M Traders",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0312",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Flowin HT",
    "registrationNo": "AP-712",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Banana",
      "Potato",
      "Mango"
    ],
    "pests": [
      "Sigatoka",
      "Late blight",
      "Anthracnose"
    ],
    "dosageRate": "1 ml/Litre of water; 3.50 ml/litre of water; 2 ml/litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fun-0208",
    "type": "Fungicide",
    "commonName": "Tebuconazole",
    "tradeName": "Folicur 250 WG / Tebuzol 25 EC",
    "registrationNo": "AP-1490",
    "registrationHolder": "Bayer CropScience Ltd / Auto Crop Care",
    "crops": [
      "Wheat",
      "Rice",
      "Tea",
      "Mustard",
      "Onion"
    ],
    "pests": [
      "Wheat blast (Magnaporthe oryzae)",
      "Loose smut",
      "Sheath blight",
      "Powdery mildew",
      "Purple blotch"
    ],
    "dosageRate": "500 ml/ha (1.0 ml/L water)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Demethylation inhibitors - Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic curative triazole with acropetal xylem translocation",
      "Crucial frontline fungicide for emergency Wheat Blast control during heading stage"
    ],
    "rotationNotes": "Rotate with Strobilurins (FRAC 11) or SDHI fungicides (FRAC 7)"
  },
  {
    "id": "fung-0013",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Forastin 50 WP",
    "registrationNo": "AP-511",
    "registrationHolder": "Shetu Pesticides Limited",
    "crops": [
      "Rice",
      "Sugarcane"
    ],
    "pests": [
      "Sheath blight",
      "Sett rot"
    ],
    "dosageRate": "1.00 Kg; 1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0195",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Force 5 EC",
    "registrationNo": "AP-717",
    "registrationHolder": "The Limit Agroproducts Limited",
    "crops": [
      "Banana",
      "Tea",
      "Rice"
    ],
    "pests": [
      "Sigatoka",
      "Red rust",
      "Sheath blight"
    ],
    "dosageRate": "1 ml/Litre of water; 750 ml; 500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0429",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Forezeb 80 WP",
    "registrationNo": "AP-3103",
    "registrationHolder": "Grow More Agro Science",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0186",
    "type": "Fungicide",
    "commonName": "Dimethomorph (9%) + Mancozeb (60%)",
    "tradeName": "Forum MZ",
    "registrationNo": "AP-2535",
    "registrationHolder": "BASF Bangladesh Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 40 + M03",
    "moaGroup": "CAA (Cell wall biosynthesis) + Multi-site",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Curative and antisporulant action against potato late blight and cucurbit downy mildew",
      "Dimethomorph disrupts phospholipid synthesis and cell wall formation in oomycetes",
      "Apply early morning or late afternoon for thorough leaf coverage"
    ],
    "rotationNotes": "Rotate with Phenylamides (FRAC 4) or Cyazofamid (FRAC 21) to prevent CAA resistance."
  },
  {
    "id": "fung-0204",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Forward 5 SC",
    "registrationNo": "AP-1139",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Garden pea"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0102",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Freshcozim 50 WP",
    "registrationNo": "AP-2785",
    "registrationHolder": "Agro Systems Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Seed Treatment"
    ],
    "dosageRate": "2.5 gm/kg seeds",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0342",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Freshzeb 80 WP",
    "registrationNo": "AP-1691",
    "registrationHolder": "Agro System Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fun-0216",
    "type": "Fungicide",
    "commonName": "Isoprothiolane",
    "tradeName": "Fuji-one 40 EC / Isopro 40 EC",
    "registrationNo": "AP-580",
    "registrationHolder": "Nihon Nohyaku / Padma Agro Ltd",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Rice blast (Leaf blast & Panicle blast)",
      "Sheath blight"
    ],
    "dosageRate": "1.0 L/ha (2.0 ml/L water)",
    "moaCode": "FRAC 6",
    "moaGroup": "Dithiolanes (Inhibitor of phospholipid biosynthesis)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 21,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Dual benefit: Controls blast fungus and reduces planthopper egg laying",
      "Strong systemic movement from roots and leaf base into panicles"
    ],
    "rotationNotes": "Rotate with Tricyclazole (16.1) or Kasugamycin (24)"
  },
  {
    "id": "fung-0291",
    "type": "Fungicide",
    "commonName": "Isoprothiolane",
    "tradeName": "Fujione 40 EC",
    "registrationNo": "AP-665",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Rice",
      "Mango"
    ],
    "pests": [
      "Sheath blight",
      "Blast",
      "Anthracnose"
    ],
    "dosageRate": "750 ml/ha (1 ml/Litre of water)",
    "moaCode": "FRAC 32",
    "moaGroup": "Isoprothiolane (Thiophene carboxylate)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 21,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Specific translaminar systemic fungicide for rice blast",
      "Avoid application near fish ponds"
    ],
    "rotationNotes": "Rotate with Tricyclazole or Kasugamycin"
  },
  {
    "id": "fung-0580",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Fultilt 250 EC",
    "registrationNo": "AP-1724",
    "registrationHolder": "Rajib Agro Chemicals Limited",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0418",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Fungizeb 80 WP",
    "registrationNo": "AP-2789",
    "registrationHolder": "Sabir Fertilizer & Chemical Complex Ltd",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0236",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Furazol 5 EC",
    "registrationNo": "AP-2496",
    "registrationHolder": "Sun Corporation",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0604",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "G-Blast 75 WP",
    "registrationNo": "AP-1233",
    "registrationHolder": "Global Agrovet Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0257",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "G-Conazole 10 EC",
    "registrationNo": "AP-3091",
    "registrationHolder": "GME Agro Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0108",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "G-Sign 50 WP",
    "registrationNo": "AP-3126",
    "registrationHolder": "One Agro Concern",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Wilt"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0007",
    "type": "Fungicide",
    "commonName": "Benalaxyl (8%) + Mancozeb (64%)",
    "tradeName": "Galben M",
    "registrationNo": "AP-374",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Cucumber"
    ],
    "pests": [
      "Late blight",
      "Downy mildew"
    ],
    "dosageRate": "0.2% formulated (2 gm/Litre)",
    "moaCode": "FRAC 4 + M03",
    "moaGroup": "PA (Phenylamide) + Multi-site contact",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Mancozeb multi-site protects the systemic Benalaxyl against resistance",
      "Apply at first signs of cold foggy weather"
    ],
    "rotationNotes": "Alternate with Dimethomorph + Mancozeb or Cymoxanil"
  },
  {
    "id": "fung-0595",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Gavit 80 WDG",
    "registrationNo": "AP-545",
    "registrationHolder": "Global Agrochemicals Limited",
    "crops": [
      "Betel vine",
      "Tea"
    ],
    "pests": [
      "Powdery mildew",
      "Red spider mite"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant for powdery mildew and red spider mites",
      "Avoid high heat applications (>32°C) to prevent leaf scorching",
      "Do not mix with petroleum or emulsified oils"
    ],
    "rotationNotes": "Ideal low-risk rotational partner across all crop stages."
  },
  {
    "id": "fung-0420",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Genezeb 80 WP",
    "registrationNo": "AP-2903",
    "registrationHolder": "Genetic",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Liter of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0014",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Genuine 50 WP",
    "registrationNo": "AP-531",
    "registrationHolder": "SAM Agro Chemical",
    "crops": [
      "Sugarcane",
      "Tomato",
      "Rice",
      "Garden pea",
      "Mango",
      "Chili"
    ],
    "pests": [
      "Sett rot disease",
      "Wilt",
      "Sheath blight",
      "Powdery mildew",
      "Hopper",
      "Anthracnose"
    ],
    "dosageRate": "1 gm/Litre of water; 2 gm/Litre; 1.00 Kg; 2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0232",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Getzole 5 EC",
    "registrationNo": "AP-2302",
    "registrationHolder": "One Agro Concern",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0030",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Gilzim 50 WP",
    "registrationNo": "AP-981",
    "registrationHolder": "Petrochem (Bangladesh) Limited",
    "crops": [
      "Tomato",
      "Sugarcane"
    ],
    "pests": [
      "Wilt",
      "Set rot"
    ],
    "dosageRate": "1 gm /litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0025",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Goldazim 500 SC",
    "registrationNo": "AP-756",
    "registrationHolder": "Square Pharmaceuticals Limited",
    "crops": [
      "Cucurbit"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0300",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Golden M 45",
    "registrationNo": "AP-464",
    "registrationHolder": "Atherton Imbros Company Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0444",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Goldhope 75 WP",
    "registrationNo": "AP-2165",
    "registrationHolder": "Mimpex Agrochemicals Limited",
    "crops": [
      "Mango",
      "Potato"
    ],
    "pests": [
      "Anthracnose",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0378",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Goldizem 80 WP",
    "registrationNo": "AP-2158",
    "registrationHolder": "Golden Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0350",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Goldman 80 WP",
    "registrationNo": "AP-1894",
    "registrationHolder": "Mary Gold Agro Science",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Late & Early blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0509",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Goldmil 72 WP",
    "registrationNo": "AP-1893",
    "registrationHolder": "Golden Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0162",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Goldton 50 WP",
    "registrationNo": "AP-3144",
    "registrationHolder": "Shetu Pesticides Limited",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Downey mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0323",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Goldzeb 80 WP",
    "registrationNo": "AP-975",
    "registrationHolder": "Agrimax Bangladesh Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Early & Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0273",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Googlee 50 WP",
    "registrationNo": "AP-1703",
    "registrationHolder": "East West Crop Science",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria bright"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0117",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Greatzim 50 WP",
    "registrationNo": "AP-3217",
    "registrationHolder": "Great Agro Care",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0265",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Greatzole 5 EC",
    "registrationNo": "AP=3233",
    "registrationHolder": "Great Agro Care",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0613",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Greenblast 75 WP",
    "registrationNo": "AP-1879",
    "registrationHolder": "Green Bangla Agrovet Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0066",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Greendazim 50 WP",
    "registrationNo": "AP-1853",
    "registrationHolder": "Green Harvest Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0567",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Greentilt 250 EC",
    "registrationNo": "AP-1709",
    "registrationHolder": "Green Bangla Agrovet Limited",
    "crops": [
      "Brinjal",
      "Onion",
      "Jute",
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Echinochloa colonum",
      "Echinochloa crus-galli",
      "Eleusine indica",
      "Digitaria sanguinalis",
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "650 - 750 ml/ha",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 30,
    "reiHours": 24,
    "waterVolumeLPerHa": 400,
    "safetyNotes": [
      "Target active vegetative grass weeds at 2-4 leaf stage",
      "Completely safe to broadleaf crops and jute",
      "Do not tank mix with 2,4-D (antagonistic)"
    ],
    "rotationNotes": "Do not use repeatedly. Rotate with pre-emergence Pendimethalin (HRAC 3)"
  },
  {
    "id": "fung-0348",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Greenzeb 80 WP",
    "registrationNo": "AP-1704",
    "registrationHolder": "Green Harvest Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0036",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Greenzim 50 WP",
    "registrationNo": "AP-1070",
    "registrationHolder": "Green View Bangladesh",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust disease"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0239",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Greenzole 5 EC",
    "registrationNo": "AP-2499",
    "registrationHolder": "Green Bangla Agrovet Limited",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0080",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Growzim 50 WP",
    "registrationNo": "AP-2129",
    "registrationHolder": "Grow More Agro Science",
    "crops": [
      "Cucurbit"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0385",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Guardthoate M 45",
    "registrationNo": "AP-2462",
    "registrationHolder": "S M Agro International",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0398",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Gulf MZ 80 WP",
    "registrationNo": "AP-2475",
    "registrationHolder": "Gulf Fertilizer & Chemicals Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0155",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Gunner 50 WP",
    "registrationNo": "AP-1877",
    "registrationHolder": "Global Agrovet Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "0.8-1.0 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0458",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Hamelion 75 WP",
    "registrationNo": "AP-3135",
    "registrationHolder": "Mother Crop Care",
    "crops": [
      "Tomato",
      "Mango"
    ],
    "pests": [
      "Early blight",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0411",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Happy 80 WP",
    "registrationNo": "AP-2488",
    "registrationHolder": "Aama Green Care",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0187",
    "type": "Fungicide",
    "commonName": "Dimethomorph (9%) + Mancozeb (60%)",
    "tradeName": "Hasin 69 WP",
    "registrationNo": "AP-3235",
    "registrationHolder": "Intefa",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 40 + M03",
    "moaGroup": "CAA (Cell wall biosynthesis) + Multi-site",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Curative and antisporulant action against potato late blight and cucurbit downy mildew",
      "Dimethomorph disrupts phospholipid synthesis and cell wall formation in oomycetes",
      "Apply early morning or late afternoon for thorough leaf coverage"
    ],
    "rotationNotes": "Rotate with Phenylamides (FRAC 4) or Cyazofamid (FRAC 21) to prevent CAA resistance."
  },
  {
    "id": "fung-0194",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hayconazol 5 EC",
    "registrationNo": "AP-713",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Banana",
      "Cucurbits",
      "Rice"
    ],
    "pests": [
      "Sigatoka",
      "Powdery mildew",
      "Sheath blight/Blast"
    ],
    "dosageRate": "1 ml/Litre of water; 1 gm/litre of water; 500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0022",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Haydazim 50 WP",
    "registrationNo": "AP-753",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Sugarcane",
      "Cucurbit",
      "Tea"
    ],
    "pests": [
      "Set rot",
      "Powdery mildew",
      "Red rust"
    ],
    "dosageRate": "1 gm/litre of water; 750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0308",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Haymancozeb 80 WP",
    "registrationNo": "AP-610",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Onion"
    ],
    "pests": [
      "Late blight",
      "Wilt",
      "Purple blotch"
    ],
    "dosageRate": "2 gm litre of water; 2 mg litre of water; 2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0145",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Haymoxy 50 WP",
    "registrationNo": "AP-715",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Banana",
      "Tea"
    ],
    "pests": [
      "Sigatoka",
      "Red rust"
    ],
    "dosageRate": "6.50 gm/Litre of water; 2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0272",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Hayprodione 50 WP",
    "registrationNo": "AP-1702",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria bright"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0235",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hazel 5 EC",
    "registrationNo": "AP-2495",
    "registrationHolder": "Dreamland Agro Products",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0219",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Herazole 5 EC",
    "registrationNo": "AP-1774",
    "registrationHolder": "Corbel International Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0216",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexa 5 EC",
    "registrationNo": "AP-1676",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Mango",
      "Rice",
      "Tea"
    ],
    "pests": [
      "Anthracnose",
      "Powdery mildew",
      "Sheath blight",
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "2 ml/Litre of water; 500 ml; 750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0228",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexagold 5 EC",
    "registrationNo": "AP-1873",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose",
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0222",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexakil 5 EC",
    "registrationNo": "AP-1857",
    "registrationHolder": "Padma Agro Sprayers Co.",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0230",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexan 5 EC",
    "registrationNo": "AP-1875",
    "registrationHolder": "Assent International",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0226",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexanol 5 EC",
    "registrationNo": "AP-1970",
    "registrationHolder": "Agro Business Support Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0245",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexapure 5 EC",
    "registrationNo": "AP-2779",
    "registrationHolder": "Sahid Enterprise",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0215",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexaron 5 EC",
    "registrationNo": "AP-1633",
    "registrationHolder": "Sweet Agrovet Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0211",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexazole 5 EC",
    "registrationNo": "AP-1393",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Tea",
      "Banana",
      "Rice"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot",
      "Sigatoka",
      "Sheath blight"
    ],
    "dosageRate": "750 ml in 1000 lt of water; 500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0263",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Hexicon 5 EC",
    "registrationNo": "AP-3231",
    "registrationHolder": "Siam Agro",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0065",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Hitastin 50 WP",
    "registrationNo": "AP-1852",
    "registrationHolder": "Hazi Abdul Hakim Sawdagor",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0391",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Hizeb 80 WP",
    "registrationNo": "AP-2468",
    "registrationHolder": "Hazi Abdul Hakim Sawdagor",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0453",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Hunchart 75 WP",
    "registrationNo": "AP-2527",
    "registrationHolder": "Symbiosis Technology",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0462",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Husky 75 WP",
    "registrationNo": "AP-3260",
    "registrationHolder": "Anika Agro Chemicals",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0135",
    "type": "Fungicide",
    "commonName": "Copper hydroxide",
    "tradeName": "Hydrocob 77 WP",
    "registrationNo": "AP-792",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "3.50 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Bactericide and contact fungicide with multi-site protein denaturation by cupric ions",
      "Effective against bacterial leaf blight, citrus canker, and downy mildews",
      "Do not tank-mix with strongly acidic compounds or Fosetyl-Al"
    ],
    "rotationNotes": "Low resistance risk. Alternate with biologicals (FRAC BM02) or dithiocarbamates (M03)."
  },
  {
    "id": "fung-0351",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "I-Then M-45 80 WP",
    "registrationNo": "AP-1896",
    "registrationHolder": "Bengal Agro Chemical Industries",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Late &Early blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0343",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "I-Zeb 80 WP",
    "registrationNo": "AP-1693",
    "registrationHolder": "Integrated Crop Solution Bangladesh",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0252",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Ibex 5 EC",
    "registrationNo": "AP-3086",
    "registrationHolder": "Agro Link (BD)",
    "crops": [
      "Tea",
      "Sweet guard"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot",
      "Powder mildew"
    ],
    "dosageRate": "750 ml; 1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0214",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Iconazole 5 EC",
    "registrationNo": "AP-1615",
    "registrationHolder": "Integrated Crop Solution Bangladesh",
    "crops": [
      "Banana",
      "Warehouse"
    ],
    "pests": [
      "Sigatoka",
      "Stored grain pests"
    ],
    "dosageRate": "1 ml/Litre of water; 1-2 tablets/ton",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0281",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Imperial 50 WP",
    "registrationNo": "AP-2540",
    "registrationHolder": "Bangladesh Agricultural Industries",
    "crops": [
      "Onion",
      "Mustard"
    ],
    "pests": [
      "Purple blotch",
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/Litre of water; 2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0221",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Index 5 EC",
    "registrationNo": "AP-1856",
    "registrationHolder": "Byco Agro Chemicals",
    "crops": [
      "Tea",
      "Mango"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot",
      "Powdery mildew"
    ],
    "dosageRate": "750 ml in 1000 lt of water; 1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0295",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Indofil M 45",
    "registrationNo": "AP-272",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Potato",
      "Onion",
      "Mango"
    ],
    "pests": [
      "Late blight",
      "Purple blotch",
      "Powdery mildew and Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water (2.20 Kg/ha)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contains manganese and zinc trace elements beneficial to crop vigor",
      "Wear respirator while mixing"
    ],
    "rotationNotes": "Universal rotation shield"
  },
  {
    "id": "fung-0617",
    "type": "Fungicide",
    "commonName": "Zineb",
    "tradeName": "Indofil-Z-78",
    "registrationNo": "AP-1777",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing organic zinc for disease prevention and foliar greening",
      "Broad-spectrum suppression of early blight, anthracnose, and leaf rusts",
      "Wear protective gloves and dust mask when measuring and mixing powder"
    ],
    "rotationNotes": "Zero resistance risk. Ideal for tank mixtures and resistance prevention."
  },
  {
    "id": "fung-0515",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Indomil 72 WP",
    "registrationNo": "AP-1926",
    "registrationHolder": "Bongshe Moharaj & Agro Tech",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0283",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Ipro 50 WP",
    "registrationNo": "AP-2542",
    "registrationHolder": "Sweet Agrovet Limited",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria blight"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0275",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Ipron 50 WP",
    "registrationNo": "AP-1880",
    "registrationHolder": "Lorota International",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0268",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Iprosun 50 WP",
    "registrationNo": "AP-1354",
    "registrationHolder": "Oroni International Limited",
    "crops": [
      "Mustard",
      "Onion",
      "Chili"
    ],
    "pests": [
      "Alternaria bright",
      "Purple blotch",
      "Anthracnose &  Powdery mildew"
    ],
    "dosageRate": "1 gm/litre of water; 2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0370",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Iprothane M-45",
    "registrationNo": "AP-2150",
    "registrationHolder": "A M Traders",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0290",
    "type": "Fungicide",
    "commonName": "Iprodione  (35%) + Carbendazim (17.5%)",
    "tradeName": "Iprozim 26 WP",
    "registrationNo": "AP-1355",
    "registrationHolder": "Oroni International Limited",
    "crops": [
      "Mustard",
      "Onion",
      "Potato",
      "Sugarcane"
    ],
    "pests": [
      "Alternaria bright",
      "Purple blotch",
      "Late blight",
      "Sett rot"
    ],
    "dosageRate": "1 gm/litre of water; 2 gm/litre of water",
    "moaCode": "FRAC 2 + 1",
    "moaGroup": "Dicarboximides + MBC",
    "resistanceRisk": "High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Dual-systemic and contact fungicide for fruit rot, blight, and fungal rots",
      "Avoid breathing mist; wear protective clothing and mask",
      "Store tightly closed away from food and animal feed"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0367",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Isozeb 80 WP",
    "registrationNo": "AP-2147",
    "registrationHolder": "Isotope International",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Late &Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0037",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Jaingnoning 50 WP",
    "registrationNo": "AP-1074",
    "registrationHolder": "Sun Seed Pesticides",
    "crops": [
      "Sugarcane"
    ],
    "pests": [
      "Set rot"
    ],
    "dosageRate": "1 gm/liter of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0234",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Janata 5 EC",
    "registrationNo": "AP-2304",
    "registrationHolder": "Home Pest Control",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0359",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Jazz 80 WP",
    "registrationNo": "AP-2001",
    "registrationHolder": "Syngenta Bangladesh Limited",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Late &Early blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0139",
    "type": "Fungicide",
    "commonName": "Copper hydroxide",
    "tradeName": "Jibal 77 WP",
    "registrationNo": "AP-1876",
    "registrationHolder": "Intafa",
    "crops": [
      "Chili",
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Bactericide and contact fungicide with multi-site protein denaturation by cupric ions",
      "Effective against bacterial leaf blight, citrus canker, and downy mildews",
      "Do not tank-mix with strongly acidic compounds or Fosetyl-Al"
    ],
    "rotationNotes": "Low resistance risk. Alternate with biologicals (FRAC BM02) or dithiocarbamates (M03)."
  },
  {
    "id": "fung-0413",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Jovan 80 WP",
    "registrationNo": "AP-2490",
    "registrationHolder": "Heritage Agro Care",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0540",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "K-Tilt 250 EC",
    "registrationNo": "AP-1226",
    "registrationHolder": "Crop Protection & Care Centre",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0562",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "K-Zole 250 EC",
    "registrationNo": "AP-1627",
    "registrationHolder": "Kohinoor Agro Chemical",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0062",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Kandari 50 WP",
    "registrationNo": "AP-1849",
    "registrationHolder": "Smart Agrovet",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0002",
    "type": "Fungicide",
    "commonName": "Azoxystrobin (20% ) + Cyproconazole (8%)",
    "tradeName": "Karishma 28 SC",
    "registrationNo": "AP-2431",
    "registrationHolder": "Eon Trading House",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1200 ml",
    "moaCode": "FRAC 11 + 3",
    "moaGroup": "QoI + DMI (Strobilurin + Triazole)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Dual-action combination providing preventive, curative, and eradicant control",
      "Protects against sheath blight, leaf blast, and rust diseases with built-in resistance buffering",
      "Toxic to fish; do not drain treated paddy water into communal aquaculture channels"
    ],
    "rotationNotes": "Maximum 2 sprays per cycle. Follow with multi-site contact protectants like Mancozeb (FRAC M03)."
  },
  {
    "id": "fung-0570",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Kastilt 250 EC",
    "registrationNo": "AP-1713",
    "registrationHolder": "Krishan Agro Chemicals",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fun-0300",
    "type": "Fungicide",
    "commonName": "Kasugamycin + Copper Oxychloride",
    "tradeName": "Kasu-B 47 WP / Kasumin 2L",
    "registrationNo": "AP-1180",
    "registrationHolder": "Hokko Chemical / Haychem Bangladesh Ltd",
    "crops": [
      "Rice",
      "Tomato",
      "Citrus",
      "Potato"
    ],
    "pests": [
      "Bacterial leaf blight (Xanthomonas oryzae)",
      "Rice blast",
      "Bacterial canker"
    ],
    "dosageRate": "1.0 - 1.25 kg/ha (2.0 g/L water)",
    "moaCode": "FRAC 24 + M01",
    "moaGroup": "Hexopyranosyl antibiotic + Inorganic Copper",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Dual bactericide and fungicide action",
      "Essential for controlling aggressive bacterial blight during monsoon flood seasons"
    ],
    "rotationNotes": "Follow with Bismerthiazol or Streptomycin sulfate"
  },
  {
    "id": "fung-0292",
    "type": "Fungicide",
    "commonName": "Kasugamycin",
    "tradeName": "Kasumin 2% Liquid",
    "registrationNo": "AP-1357",
    "registrationHolder": "Shetu Corporation Limited",
    "crops": [
      "Chili",
      "Wheat",
      "Mango"
    ],
    "pests": [
      "Anthracnose",
      "Leaf rust",
      "Bacterial blight"
    ],
    "dosageRate": "0.5 ml/Litre of water",
    "moaCode": "FRAC 24",
    "moaGroup": "Kasugamycin (Aminoglycoside antibiotic)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SL",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Biological antibiotic origin; low mammalian toxicity",
      "Excellent preventative against both bacteria and fungi"
    ],
    "rotationNotes": "Alternate with Copper fungicides (FRAC M01)"
  },
  {
    "id": "fung-0377",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Kazizeb 80 WP",
    "registrationNo": "AP-2157",
    "registrationHolder": "S K Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0256",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Kazol 5 EC",
    "registrationNo": "AP-3090",
    "registrationHolder": "Gurpukur Corporation",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 ml; 500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0329",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Kencozeb M-45",
    "registrationNo": "AP-1373",
    "registrationHolder": "S I Agro International",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Early & Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0505",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Kingstar 72 WP",
    "registrationNo": "AP-1692",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0322",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Kinmazeb 80 WP",
    "registrationNo": "AP-973",
    "registrationHolder": "Omnichem Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Early & Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0386",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Kishzeb 80 WP",
    "registrationNo": "AP-2463",
    "registrationHolder": "Kishan Agro Chemicals",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0514",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Kismil 72 WP",
    "registrationNo": "AP-1904",
    "registrationHolder": "Krishan Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0056",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Knobin 50 WP",
    "registrationNo": "AP-1772",
    "registrationHolder": "ICI Agricare",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "1.00 Kg",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0009",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Knowin 50 WP",
    "registrationNo": "AP-241",
    "registrationHolder": "McDonald Bangladesh (Pvt) Limited",
    "crops": [
      "Rice",
      "Guava",
      "Tea",
      "Banana",
      "Sugarcane",
      "Mango"
    ],
    "pests": [
      "Sheath blight",
      "Anthracnose",
      "Red rust",
      "Black rot",
      "Die back & Gall",
      "Sigatoka",
      "Pineapple disease",
      "Wilt & red rot",
      "Pine apple"
    ],
    "dosageRate": "1.00 Kg/ha (1 - 2 gm/L of water)",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Pre-mix carefully in bucket before tank filling",
      "Avoid spray drift to non-target crops"
    ],
    "rotationNotes": "Rotate with DMI fungicides (Propiconazole)"
  },
  {
    "id": "fun-0311",
    "type": "Fungicide",
    "commonName": "Copper Hydroxide",
    "tradeName": "Kocide 2000 53.8 DF / Champ DP",
    "registrationNo": "AP-1270",
    "registrationHolder": "Corteva Agriscience / Petrochem Ltd",
    "crops": [
      "Potato",
      "Tomato",
      "Citrus",
      "Rice"
    ],
    "pests": [
      "Late blight",
      "Bacterial canker",
      "Bacterial leaf streak",
      "Downy mildew"
    ],
    "dosageRate": "1.5 kg/ha (2.0 g/L water)",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic Copper (Multi-site contact activity)",
    "resistanceRisk": "Low",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WDG",
    "phiDays": 3,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High bio-availability with superior copper ion release per gram",
      "No fungal resistance recorded worldwide; critical resistance breaker"
    ],
    "rotationNotes": "Use as anchor tank-mix partner with single-site systemic fungicides"
  },
  {
    "id": "fung-0227",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Konock 5 EC",
    "registrationNo": "AP-1872",
    "registrationHolder": "Crop Protection & Care Center",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0519",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Kozeb 72 WP",
    "registrationNo": "AP-2173",
    "registrationHolder": "Padma Agro Sprayers Co.",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0205",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Krizole 5 EC",
    "registrationNo": "AP-1199",
    "registrationHolder": "McDonald Crop Care Limited",
    "crops": [
      "Mango",
      "Banana",
      "Rice"
    ],
    "pests": [
      "Anthracnose",
      "Sigatoka",
      "Sheath blight"
    ],
    "dosageRate": "1 ml/litre of water; 500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0589",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Kumulus DF",
    "registrationNo": "AP-175",
    "registrationHolder": "BASF Bangladesh Limited",
    "crops": [
      "Jute",
      "Betel vine",
      "Tea",
      "Vegetables",
      "Ground nut"
    ],
    "pests": [
      "Yellow mite",
      "Powdery mildew",
      "Red spider mite",
      "Tikka"
    ],
    "dosageRate": "2.00 Kg; 2 gm/Litre of water",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "DF",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant for powdery mildew and red spider mites",
      "Avoid high heat applications (>32°C) to prevent leaf scorching",
      "Do not mix with petroleum or emulsified oils"
    ],
    "rotationNotes": "Ideal low-risk rotational partner across all crop stages."
  },
  {
    "id": "fung-0330",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Kusum 80 WP",
    "registrationNo": "AP-1374",
    "registrationHolder": "Crop Protection & Care Center",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0471",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Larconil 72 WP",
    "registrationNo": "AP-2169",
    "registrationHolder": "Larsen Chemicals Industries (Pvt) Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0120",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Larkzim 50 WP",
    "registrationNo": "AP-3239",
    "registrationHolder": "Balak Enterprise",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0061",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Lazim 50 WP",
    "registrationNo": "AP-1848",
    "registrationHolder": "Sweet Agrovet Limited",
    "crops": [
      "Tea",
      "Rice"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back",
      "Sheath blight"
    ],
    "dosageRate": "750 gm in 1000 lt of water; 1.00 Kg",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0119",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Lidazin 50 WP",
    "registrationNo": "AP-3238",
    "registrationHolder": "Lily Traders",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0262",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Lilizole 5 EC",
    "registrationNo": "AP-3230",
    "registrationHolder": "Lily Traders",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0303",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "LM 45",
    "registrationNo": "AP-526",
    "registrationHolder": "The Limit Agroproducts Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0057",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Longzim 50 WP",
    "registrationNo": "AP-1843",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0159",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "M-Cop 50 WP",
    "registrationNo": "AP-2778",
    "registrationHolder": "Mamun Agro Products Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "2.50 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0101",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "M-Hitter 50 WP",
    "registrationNo": "AP-2784",
    "registrationHolder": "United Agri Care Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0317",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "M-Power 80 WP",
    "registrationNo": "AP-809",
    "registrationHolder": "Maitri Agro Industries",
    "crops": [
      "Banana",
      "Mango"
    ],
    "pests": [
      "Sigatoka",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0538",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "M-Tilt 25 EC",
    "registrationNo": "AP-1135",
    "registrationHolder": "Meghna Fertilizer & Agro Chemicals Indus",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0414",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "M-Zeb 80 WP",
    "registrationNo": "AP-2491",
    "registrationHolder": "Mamun Agro Products Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0088",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Mabendazim 50 WP",
    "registrationNo": "AP-2450",
    "registrationHolder": "Mabco Bangladesh",
    "crops": [
      "Rice",
      "Wheat",
      "Soybean",
      "Maize",
      "Tea",
      "Tomato",
      "Banana"
    ],
    "pests": [
      "Sheath blight",
      "Brown spot",
      "Wheat leaf rust",
      "Blast",
      "Red rust",
      "Black rot",
      "Die back",
      "Early blight",
      "Sigatoka"
    ],
    "dosageRate": "600 ml/ha (1.2 ml/L water)",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Unique vapor redistribution inside thick plant foliage",
      "Enhanced grain filling and stay-green physiology"
    ],
    "rotationNotes": "Never exceed 2 sprays; rotate with Triazoles (FRAC 3)"
  },
  {
    "id": "fung-0409",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Maczeb 80 WP",
    "registrationNo": "AP-2486",
    "registrationHolder": "Mahir Agro Care",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0246",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Maczole 5 EC",
    "registrationNo": "AP-2780",
    "registrationHolder": "Mahir Agro Care",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0355",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Magnate 80 WP",
    "registrationNo": "AP-1922",
    "registrationHolder": "Rahman Pesticide & Chemicals Co.",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0116",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Magpai 50 WP",
    "registrationNo": "AP-3134",
    "registrationHolder": "Apex Agro Industries Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0082",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Mahizim 50 WP",
    "registrationNo": "AP-2241",
    "registrationHolder": "Mahir Agro Care",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "1.00 Kg",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0436",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mahzeb 80 WP",
    "registrationNo": "AP-3110",
    "registrationHolder": "Mahbub Enterprise",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0426",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mamcoz 80 WP",
    "registrationNo": "AP-3100",
    "registrationHolder": "Aartessa Trading",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0445",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Mancarb 72 WP",
    "registrationNo": "AP-2166",
    "registrationHolder": "East West Crop Science Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Onion"
    ],
    "pests": [
      "Late blight & Late blight",
      "Early blight",
      "Purple blotch"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0450",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Mancodazim Plus 75 WP",
    "registrationNo": "AP-2524",
    "registrationHolder": "Unique Agro Technology Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0493",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Mancolax 72 WP",
    "registrationNo": "AP-977",
    "registrationHolder": "SAMP Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0485",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Mancolaxyl 72 WP",
    "registrationNo": "AP-466",
    "registrationHolder": "Agro Continent Bangladesh",
    "crops": [
      "Potato",
      "Chili"
    ],
    "pests": [
      "Late blight",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0452",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Mancor 75 WP",
    "registrationNo": "AP-2526",
    "registrationHolder": "Corbel Chemical International Ltd.",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0324",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mancothane 80 WP",
    "registrationNo": "AP-1037",
    "registrationHolder": "Agribusiness International",
    "crops": [
      "Tomato",
      "Potato",
      "Ground nut"
    ],
    "pests": [
      "Early & Late blight",
      "Late blight",
      "Powder mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0316",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mancovit 80 WP",
    "registrationNo": "AP-787",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Onion"
    ],
    "pests": [
      "Late blight",
      "Early blight",
      "Purple blotch"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0344",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mancoz 80 WP",
    "registrationNo": "AP-1694",
    "registrationHolder": "Unicrop Protection Limited",
    "crops": [
      "Potato",
      "Mango"
    ],
    "pests": [
      "Late blight",
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0525",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Mancozil 72 WP",
    "registrationNo": "AP-2179",
    "registrationHolder": "Joary Agro",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0488",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Mancozim 72 WP",
    "registrationNo": "AP-666",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Potato",
      "Tea"
    ],
    "pests": [
      "Late blight",
      "Red rust"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0394",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mancozim 80 WP",
    "registrationNo": "AP-2471",
    "registrationHolder": "Agrinet Crop Care Bangladesh",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0315",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Manner M-45",
    "registrationNo": "AP-786",
    "registrationHolder": "SAMP Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0371",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mansis 80 WP",
    "registrationNo": "AP-2151",
    "registrationHolder": "Symbiosis Technology",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0128",
    "type": "Fungicide",
    "commonName": "Carboxin (17.5%) + Thiram (17.5%)",
    "tradeName": "Mapvax 75 WP",
    "registrationNo": "AP-1389",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Jute",
      "Wheat"
    ],
    "pests": [
      "Seed rot",
      "Seedling disease wilting soft",
      "rot",
      "Stem rot",
      "Anthracnose",
      "Black bont",
      "Seedling blight",
      "Foot rot"
    ],
    "dosageRate": "4 gm/Kg seed; 3 gm/Kg seed",
    "moaCode": "FRAC 7 + M03",
    "moaGroup": "SDHI (Succinate dehydrogenase) + Dithiocarbamate",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Premium seed dresser for wheat loose smut, rice seedling blight, and collar rot",
      "Systemic SDHI penetrates embryo while Thiram shields seed surface against soil-borne fungi",
      "Treated seed must not be used for food, feed, or oil extraction"
    ],
    "rotationNotes": "Primary seed treatment; follow in-crop with foliar fungicides from different MoA groups."
  },
  {
    "id": "fung-0427",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Maricozeb 80 WP",
    "registrationNo": "AP-3101",
    "registrationHolder": "Mary Gold Agro Science",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0024",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Massive 50 WP",
    "registrationNo": "AP-755",
    "registrationHolder": "Mosco Marketing Company",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Wilt"
    ],
    "dosageRate": "2 gm /litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0288",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Match 50 WP",
    "registrationNo": "AP-3148",
    "registrationHolder": "Amco Agricultural Industries",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria spot"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0489",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Matco 72 WP",
    "registrationNo": "AP-714",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0555",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Maxicon 25 EC",
    "registrationNo": "AP-1382",
    "registrationHolder": "Integrated Crop Solution Bangladesh",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0511",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Maxil 72 WP",
    "registrationNo": "AP-1898",
    "registrationHolder": "Mabco Bangladesh",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0403",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mcozeb 80 WP",
    "registrationNo": "AP-2480",
    "registrationHolder": "M H Crop Care",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0301",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "McZidan 80 WP",
    "registrationNo": "AP-465",
    "registrationHolder": "McDonald Bangladesh (Pvt) Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Mango"
    ],
    "pests": [
      "Late blight",
      "Early blight",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0325",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Meena 80 WP",
    "registrationNo": "AP-1053",
    "registrationHolder": "East West Chemicals Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early & Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0326",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Meena 80 WP",
    "registrationNo": "AP-1054",
    "registrationHolder": "East West Chemicals Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Mango"
    ],
    "pests": [
      "Late blight",
      "Early & Late blight",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0327",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Meena 80 WP",
    "registrationNo": "AP-1055",
    "registrationHolder": "East West Chemicals Limited",
    "crops": [
      "Mango",
      "Rice"
    ],
    "pests": [
      "Anthracnose",
      "Broad leaf & Sedges",
      "Annual grasses"
    ],
    "dosageRate": "2 gm/Litre of water; 2.00 Litre",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0093",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Megadazim 50 WP",
    "registrationNo": "AP-2456",
    "registrationHolder": "Marstrade International Culture",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0199",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Megazole 5 EC",
    "registrationNo": "AP-917",
    "registrationHolder": "Mosco Marketing Company",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0278",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Memoral 50 WP",
    "registrationNo": "AP-1884",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0395",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mentor 80 WP",
    "registrationNo": "AP-2472",
    "registrationHolder": "Classic Agrovet Limited",
    "crops": [
      "Potato",
      "Mango"
    ],
    "pests": [
      "Late blight",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0188",
    "type": "Fungicide",
    "commonName": "Diniconazole",
    "tradeName": "Merabow 12.5 WP",
    "registrationNo": "AP-984",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Ground nut"
    ],
    "pests": [
      "Tikka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with high acropetal translocation for powdery mildews and rusts",
      "Ergosterol synthesis inhibitor with strong curative kickback action",
      "Wear standard PPE and do not contaminate farm water supplies"
    ],
    "rotationNotes": "Rotate with multi-site contact fungicides (FRAC M03, M02)."
  },
  {
    "id": "fung-0337",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Merry 80 WP",
    "registrationNo": "AP-1683",
    "registrationHolder": "Valent Tech Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0486",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Metalco 72 WP",
    "registrationNo": "AP-503",
    "registrationHolder": "A-Intraco (Bangladesh) Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0494",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Metamul 72 WP",
    "registrationNo": "AP-1049",
    "registrationHolder": "Bony Enterprise",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0484",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Metaril 72 WP",
    "registrationNo": "AP-447",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0594",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Microsul 80 DF",
    "registrationNo": "AP-502",
    "registrationHolder": "Chemolimpex Agro Limited",
    "crops": [
      "Tea",
      "Betel vine"
    ],
    "pests": [
      "Red spider mite",
      "Powdery mildew"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "DF",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant for powdery mildew and red spider mites",
      "Avoid high heat applications (>32°C) to prevent leaf scorching",
      "Do not mix with petroleum or emulsified oils"
    ],
    "rotationNotes": "Ideal low-risk rotational partner across all crop stages."
  },
  {
    "id": "fung-0365",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Might 80 WP",
    "registrationNo": "AP-2145",
    "registrationHolder": "Dreamland Agro Products",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Late &Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0524",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Milcare 72 WP",
    "registrationNo": "AP-2178",
    "registrationHolder": "Care Agrotech",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0539",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Miltilt 250 EC",
    "registrationNo": "AP-1136",
    "registrationHolder": "Mimpex Agrochemicals Limited",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0495",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Milzeb 72 WP",
    "registrationNo": "AP-1077",
    "registrationHolder": "Intefa",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0045",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Mine 50 WP",
    "registrationNo": "AP-1377",
    "registrationHolder": "S I Agro International",
    "crops": [
      "Tomato",
      "Wheat"
    ],
    "pests": [
      "Early blight",
      "Late rust"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0109",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Minzim 50 WP",
    "registrationNo": "AP-3127",
    "registrationHolder": "Meem Corporation",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0182",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Monizole 300 EC",
    "registrationNo": "AP-3248",
    "registrationHolder": "Agro Monitor",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0340",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Monozeb 80 WP",
    "registrationNo": "AP-1689",
    "registrationHolder": "Mosco Marketing Company",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0475",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "More 72 WP",
    "registrationNo": "AP-2521",
    "registrationHolder": "McDonald Crop Care Limited",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0479",
    "type": "Fungicide",
    "commonName": "Mancozeb (45%) + Fosetyl AI (25%)",
    "tradeName": "Mosafir 70 WP",
    "registrationNo": "AP-2533",
    "registrationHolder": "Mahin Enterprise Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late bight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + P07",
    "moaGroup": "Dithiocarbamate + Phosphonate host defense",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Combines broad-spectrum contact protection with systemic stimulated plant defense mechanisms",
      "Fosetyl-Al moves both upward and downward (amphimobile) through xylem and phloem",
      "Wear standard PPE and avoid spraying during midday peak sun"
    ],
    "rotationNotes": "Excellent rotational product for late blight and downy mildews."
  },
  {
    "id": "fung-0310",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mosum M 80 WP",
    "registrationNo": "AP-626",
    "registrationHolder": "Axil Life Sciences Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0375",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Mouzeb 80 WP",
    "registrationNo": "AP-2155",
    "registrationHolder": "Mou International",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0156",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "MS Vit 50 WP",
    "registrationNo": "AP-2506",
    "registrationHolder": "M S Agro Chemicals Company Ltd",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot & Red rust"
    ],
    "dosageRate": "2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0434",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "MZ-45",
    "registrationNo": "AP-3108",
    "registrationHolder": "Mamun Agro Products Limited",
    "crops": [
      "Jute"
    ],
    "pests": [
      "Stem rot"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0358",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Naczeb 80 WP",
    "registrationNo": "AP-1928",
    "registrationHolder": "National AgriCare Import & Export Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0094",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Nainzim 50 WP",
    "registrationNo": "AP-2457",
    "registrationHolder": "Nafis Crop Care",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0598",
    "type": "Fungicide",
    "commonName": "Tebuconazole (50%) + Trifloxystrobin (25%)",
    "tradeName": "Nativo 75 WG",
    "registrationNo": "AP-1776",
    "registrationHolder": "Bayer CropScience Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight",
      "Neck blast"
    ],
    "dosageRate": "250 gm",
    "moaCode": "FRAC 3 + 11",
    "moaGroup": "DMI + QoI (Triazole + Strobilurin)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Premium broad-spectrum dual-action fungicide for sheath blight, blast, and dirty panicle",
      "Provides mesostemic redistribution (Trifloxystrobin) and systemic xylem mobility (Tebuconazole)",
      "Toxic to aquatic organisms; do not spray near open water canals"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Follow with multi-site contact protectants."
  },
  {
    "id": "fun-0389",
    "type": "Fungicide",
    "commonName": "Trifloxystrobin + Tebuconazole",
    "tradeName": "Nativo 75 WG",
    "registrationNo": "AP-2050",
    "registrationHolder": "Bayer CropScience Ltd",
    "crops": [
      "Rice",
      "Tomato",
      "Mango",
      "Chilli",
      "Potato"
    ],
    "pests": [
      "Neck blast",
      "Sheath blight",
      "False smut (Ustilaginoidea virens)",
      "Anthracnose",
      "Early blight"
    ],
    "dosageRate": "250 - 300 g/ha (0.5 g/L water)",
    "moaCode": "FRAC 11 + 3",
    "moaGroup": "Strobilurin + Triazole Synergistic Complex",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Mesostemic binding to waxy leaf surface with slow vapor redistribution",
      "Apply at boot leaf / early heading stage for clean, golden grain development"
    ],
    "rotationNotes": "Alternate with Isoprothiolane (FRAC 6) or Tricyclazole (FRAC 16.1)"
  },
  {
    "id": "fun-0390",
    "type": "Fungicide",
    "commonName": "Tebuconazole (50%) + Trifloxystrobin (25%)",
    "tradeName": "Nativo 75 WP",
    "registrationNo": "AP-1502",
    "registrationHolder": "Bayer CropScience Limited",
    "crops": [
      "Banana",
      "Rice",
      "Onion"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Blast",
      "Purple blotch"
    ],
    "dosageRate": "200 - 300 gm/ha (0.5 gm/Litre of water)",
    "moaCode": "FRAC 3 + FRAC 11",
    "moaGroup": "DMI (Triazole) + QoI (Strobilurin)",
    "resistanceRisk": "Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High systemic power and mesostemic rainfastness",
      "Wear protective face mask and gloves"
    ],
    "rotationNotes": "Follow with multi-site contact (Mancozeb or Copper)"
  },
  {
    "id": "fung-0244",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Nato 10 EC",
    "registrationNo": "AP-2618",
    "registrationHolder": "Agro Chem Agribusiness",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0123",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Natzim 50 WP",
    "registrationNo": "AP-3242",
    "registrationHolder": "National Green Enterprise",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0016",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Nayan 50 WP",
    "registrationNo": "AP-720",
    "registrationHolder": "Anika Enterprise",
    "crops": [
      "Tomato",
      "Cabbage",
      "Cauli",
      "Sugarcane",
      "Banana"
    ],
    "pests": [
      "Seedling rot",
      "Set rot",
      "Sigatoka"
    ],
    "dosageRate": "1 gm/Kg seed; 1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0293",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Nemispore 80 WP",
    "registrationNo": "AP-166",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late & Early blight"
    ],
    "dosageRate": "2.50 Kg/1000Lt water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0400",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Netcozeb 80 WP",
    "registrationNo": "AP-2477",
    "registrationHolder": "Agrinet Crop Scence Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0106",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Neustin 50 WP",
    "registrationNo": "AP-3124",
    "registrationHolder": "Biotech Agrovet",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Seedling rot"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0437",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "New Fill 80 WP",
    "registrationNo": "AP-3234",
    "registrationHolder": "Agri Source",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0085",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Newzim 50 WP",
    "registrationNo": "AP-2244",
    "registrationHolder": "Blessing Agrovet Industries Ltd",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0550",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Niconazole 250 EC",
    "registrationNo": "AP-1359",
    "registrationHolder": "Nafis Crop Care",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0366",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Nikizeb 80 WP",
    "registrationNo": "AP-2146",
    "registrationHolder": "Anika Enterprise",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Late &Early blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0392",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Nokozeb 80 WP",
    "registrationNo": "AP-2469",
    "registrationHolder": "Nokon Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0047",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Nova 50 WP",
    "registrationNo": "AP-1384",
    "registrationHolder": "Eon Agro Industries Limited",
    "crops": [
      "Wheat",
      "Tea"
    ],
    "pests": [
      "Leaf blight",
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "1 gm/litre of water; 750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0510",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Novanil 72 WP",
    "registrationNo": "AP-1897",
    "registrationHolder": "Eon Agro Industries Limited",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Late & Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0191",
    "type": "Fungicide",
    "commonName": "Fusilazole",
    "tradeName": "Nustar 40 EC",
    "registrationNo": "AP-1523",
    "registrationHolder": "Petrochem Agro Industries Ltd.",
    "crops": [
      "Rice",
      "Chili"
    ],
    "pests": [
      "Sheath blight",
      "Anthracnose"
    ],
    "dosageRate": "200 ml; 150 ml/ha",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with vapor redistribution for deep canopy protection",
      "Ergosterol biosynthesis inhibitor with curative properties",
      "Wear protective gloves and avoid inhalation"
    ],
    "rotationNotes": "Rotate with non-DMI fungicides (FRAC 11, M03)."
  },
  {
    "id": "fung-0564",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "O-Tilt 250 EC",
    "registrationNo": "AP-1630",
    "registrationHolder": "Orbit Agro Industries",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0412",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "O-Zeb 80 WP",
    "registrationNo": "AP-2489",
    "registrationHolder": "Green Bangla Agrovet Limited",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0280",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Okral 50 WP",
    "registrationNo": "AP-1927",
    "registrationHolder": "Marshal Agrovet Chemical Industries Ltd",
    "crops": [
      "Onion",
      "Mustard",
      "Rice"
    ],
    "pests": [
      "Purple blotch",
      "Alternaria blight",
      "Broad leaf & Grass weed",
      "Sedge"
    ],
    "dosageRate": "2 gm/litre of water; 1 gm/litre of water; 100 ml",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0347",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Onezeb 80 WP",
    "registrationNo": "AP-1700",
    "registrationHolder": "One Agro Concern",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0320",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Onthane 80 WP",
    "registrationNo": "AP-965",
    "registrationHolder": "One Agro Concern",
    "crops": [
      "Potato & Tomato"
    ],
    "pests": [
      "Early & Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0190",
    "type": "Fungicide",
    "commonName": "Epoxiconazol",
    "tradeName": "Opal 7.5 EC",
    "registrationNo": "AP-2314",
    "registrationHolder": "BASF Bangladesh Limited",
    "crops": [
      "Rice",
      "Cucurbit"
    ],
    "pests": [
      "Sheath blight",
      "Powder mildew"
    ],
    "dosageRate": "1.25 Litre; 2.5 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole for cereal rusts, leaf spots, and sheath rot",
      "Rapid leaf uptake and long-lasting curative protection",
      "Harmful if swallowed; wear protective gloves, apron, and face mask"
    ],
    "rotationNotes": "Rotate with Strobilurins (FRAC 11) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0346",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Oppose 80 WP",
    "registrationNo": "AP-1698",
    "registrationHolder": "Agro Continent Bangladesh",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0053",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Orgazim 50 WP",
    "registrationNo": "AP-1680",
    "registrationHolder": "Green Care Bangladesh",
    "crops": [
      "Rice",
      "Potato",
      "Tomato",
      "Mango",
      "Chilli",
      "Sugarcane"
    ],
    "pests": [
      "Sheath blight (Rhizoctonia solani)",
      "Rice blast",
      "Late blight",
      "Early blight",
      "Anthracnose",
      "Sett rot"
    ],
    "dosageRate": "500 ml/ha (1.0 ml/L water)",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Broad spectrum preventive and curative activity",
      "Produces prominent \"Green Leaf Effect\" boosting grain filling and yield",
      "Toxic to aquatic organisms; maintain buffer zone from fish ponds"
    ],
    "rotationNotes": "Strict maximum of 2 applications per season; alternate with multi-site contact fungicide (FRAC M03/M05)"
  },
  {
    "id": "fung-0201",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Orozole 5 SC",
    "registrationNo": "AP-1020",
    "registrationHolder": "Oroni International Limited",
    "crops": [
      "Rice",
      "Tea",
      "Mango",
      "Chilli",
      "Groundnut",
      "Banana"
    ],
    "pests": [
      "Sheath blight",
      "Powdery mildew (Oidium mangiferae)",
      "Tikka disease",
      "Black rot",
      "Sigatoka"
    ],
    "dosageRate": "1.0 L/ha (2.0 ml/L water)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Rapid translaminar and systemic absorption with long residual life",
      "Avoid overdosing on young shoots to prevent growth stunting"
    ],
    "rotationNotes": "Rotate with Strobilurin (FRAC 11) or Copper (FRAC M01)"
  },
  {
    "id": "fung-0380",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Orzeb 80 WP",
    "registrationNo": "AP-2160",
    "registrationHolder": "Orbit Agro Industries",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0146",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Oxicob 50 WP",
    "registrationNo": "AP-791",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "3.50 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0142",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Oxivit 50 WP",
    "registrationNo": "AP-616",
    "registrationHolder": "SAM Agro Chemical",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Early blight"
    ],
    "dosageRate": "3.50 Kg; 3.5 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0160",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Oxycol 50 WP",
    "registrationNo": "AP-3142",
    "registrationHolder": "Lorota International",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0192",
    "type": "Fungicide",
    "commonName": "Fusilazole (12.5%) + Carbendazim (25%)",
    "tradeName": "Pacer 37.5 SC",
    "registrationNo": "AP-3141",
    "registrationHolder": "Eon Trading House",
    "crops": [
      "Wheat"
    ],
    "pests": [
      "Leaf blight"
    ],
    "dosageRate": "600 ml",
    "moaCode": "FRAC 3 + 1",
    "moaGroup": "DMI + MBC",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Curative and preventive systemic fungicide combination",
      "Dual-mode interference with fungal sterol synthesis and cell division",
      "Wear PPE and do not contaminate local water sources"
    ],
    "rotationNotes": "Rotate with Strobilurins (FRAC 11) or Mancozeb (FRAC M03)."
  },
  {
    "id": "fung-0457",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Pafman 750 WP",
    "registrationNo": "AP-2531",
    "registrationHolder": "PAFS Agro International Co.",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0197",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Paragon 5 EC",
    "registrationNo": "AP-858",
    "registrationHolder": "Agro Continent Bangladesh",
    "crops": [
      "Banana",
      "Tea"
    ],
    "pests": [
      "Sigatoka",
      "Die back",
      "Black rot",
      "Red rust"
    ],
    "dosageRate": "500 ml; 750 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0137",
    "type": "Fungicide",
    "commonName": "Copper hydroxide",
    "tradeName": "Parasol 77 WP",
    "registrationNo": "AP-1360",
    "registrationHolder": "Eminence Chemical Industries Ltd",
    "crops": [
      "Potato",
      "Chili"
    ],
    "pests": [
      "Late blight",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Bactericide and contact fungicide with multi-site protein denaturation by cupric ions",
      "Effective against bacterial leaf blight, citrus canker, and downy mildews",
      "Do not tank-mix with strongly acidic compounds or Fosetyl-Al"
    ],
    "rotationNotes": "Low resistance risk. Alternate with biologicals (FRAC BM02) or dithiocarbamates (M03)."
  },
  {
    "id": "fung-0100",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Parastine50 WP",
    "registrationNo": "AP-2783",
    "registrationHolder": "Perfect Agro Care",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0421",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Parazeb 80 WP",
    "registrationNo": "AP-3095",
    "registrationHolder": "Padma Agro Sprayers Co.",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0568",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Parazilt 250 EC",
    "registrationNo": "AP-1710",
    "registrationHolder": "Padma Agro Sprayers Co.",
    "crops": [
      "Tea",
      "Chilli",
      "Apple",
      "Roses",
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Red spider mite",
      "Two-spotted spider mite",
      "Yellow tea mite",
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "1.0 L/ha (2.0 ml/L water)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High contact toxicity with ovicidal activity on summer mite eggs",
      "Ensure thorough coverage on undersides of mature tea leaves"
    ],
    "rotationNotes": "Do not follow with another METI compound (Pyranica/Ortus)"
  },
  {
    "id": "fung-0501",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Parilaxyl 72 WP",
    "registrationNo": "AP-1632",
    "registrationHolder": "Petrochem (Bangladesh) Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0415",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Payzeb 80 WP",
    "registrationNo": "AP-2492",
    "registrationHolder": "Prestige Agro Dragon",
    "crops": [
      "Cucurbit"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0029",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Pearl 50 DF",
    "registrationNo": "AP-980",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Cucurbits",
      "Grapes",
      "Garden pea",
      "Wheat"
    ],
    "pests": [
      "Late blight",
      "Downy mildew (Pseudoperonospora cubensis)",
      "Powdery mildew"
    ],
    "dosageRate": "2.0 kg/ha (2.5 g/L water)",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Kickback \"curative\" action stops incubating mycelium inside infected leaves up to 48 hours post-infection",
      "Excellent resistance profile against Phytophthora"
    ],
    "rotationNotes": "Rotate with Fluopicolide (FRAC 43) or Dimethomorph (FRAC 40)"
  },
  {
    "id": "fung-0233",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Pelert 5 EC",
    "registrationNo": "AP-2303",
    "registrationHolder": "Petrochem Agro Industries Ltd.",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0294",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Pencozeb 80 WP",
    "registrationNo": "AP-242",
    "registrationHolder": "Shetu Pesticides Limited",
    "crops": [
      "Potato",
      "Ground nut",
      "Tomato",
      "Mango"
    ],
    "pests": [
      "Late blight",
      "Tikka rust",
      "Early blight",
      "Anthracnose"
    ],
    "dosageRate": "2.24 kg; 2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0341",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Percozeb 80 WP",
    "registrationNo": "AP-1690",
    "registrationHolder": "Perfect Agro Care",
    "crops": [
      "Jute",
      "Cotton",
      "Groundnut",
      "Soybean",
      "Blackgram",
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Echinochloa",
      "Dactyloctenium aegyptium",
      "Digitaria sanguinalis",
      "Eleusine indica",
      "Late blight",
      "Alternaria blight"
    ],
    "dosageRate": "1.0 L/ha (2.0 ml/L water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 30,
    "reiHours": 24,
    "waterVolumeLPerHa": 400,
    "safetyNotes": [
      "Highly selective graminicide: Kills grassy weeds inside broadleaf crops (Jute, Soybean, Groundnut)",
      "Harmless to broadleaf plants; absorption complete in 1 hour"
    ],
    "rotationNotes": "Rotate with Dinitroanilines (HRAC 3) to prevent ACCase grass resistance"
  },
  {
    "id": "fung-0172",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Perk 300 EC",
    "registrationNo": "AP-2544",
    "registrationHolder": "Aama Green Care",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0319",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Pestcozeb 80 WP",
    "registrationNo": "AP-861",
    "registrationHolder": "Home Pest Control",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Powdery mildew",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0554",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Pesticide 250 EC",
    "registrationNo": "AP-1381",
    "registrationHolder": "Home Pest Control",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0384",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Phyto 80 WP",
    "registrationNo": "AP-2164",
    "registrationHolder": "S S Vision Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Late & Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0537",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Pilter 250 EC",
    "registrationNo": "AP-1090",
    "registrationHolder": "Petrochem (Bangladesh) Limited",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0150",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Pipertox 50 WP",
    "registrationNo": "AP-1057",
    "registrationHolder": "Agribusiness International",
    "crops": [
      "Tomato",
      "Potato",
      "Mango"
    ],
    "pests": [
      "Early & Late blight",
      "Late blight",
      "Anthracnose"
    ],
    "dosageRate": "4 gm/litre of water; 2 gm/litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0213",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Pochamin 10 EC",
    "registrationNo": "AP-1602",
    "registrationHolder": "Axil Life Sciences Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0523",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Pocomet 72 WP",
    "registrationNo": "AP-2177",
    "registrationHolder": "Raven Aqua Agriculture Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0153",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Polyco 50 WP",
    "registrationNo": "AP-1841",
    "registrationHolder": "Polymer Agro Industries Ltd.",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot & Red rust"
    ],
    "dosageRate": "2.80 Kg",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0498",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Polymil 72 WP",
    "registrationNo": "AP-1387",
    "registrationHolder": "Polymer Agro Industries Ltd.",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0286",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Pottary 50 WP",
    "registrationNo": "AP-3146",
    "registrationHolder": "Aama Green Care",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0004",
    "type": "Fungicide",
    "commonName": "Azoxystrobin (20% ) + Difenoconazole (12.5%)",
    "tradeName": "Power Blast 325 SC",
    "registrationNo": "AP-2777",
    "registrationHolder": "Agronet Crop Science Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight",
      "Broad leaf & Sedge"
    ],
    "dosageRate": "1 ml/Litre of water; 150 gm",
    "moaCode": "FRAC 11 + 3",
    "moaGroup": "QoI + DMI (Strobilurin + Triazole)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Synergistic systemic mixture for sheath blight, dirty panicle, and blast in rice and vegetable anthracnose",
      "Rapid translaminar uptake within 2 hours; rainfast once dry",
      "Wear rubber gloves and mask during spray preparation"
    ],
    "rotationNotes": "Rotate with SDHI (FRAC 7) or contact dithiocarbamates (FRAC M03)."
  },
  {
    "id": "fung-0558",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Pracare 250 EC",
    "registrationNo": "AP-1599",
    "registrationHolder": "Prestige Agro Dragon",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0544",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Pratilt 250 EC",
    "registrationNo": "AP-1246",
    "registrationHolder": "Pratasha International",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0513",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Primecare 72 WP",
    "registrationNo": "AP-1902",
    "registrationHolder": "Prestige Agro Dragon",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0225",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Primezole 5 EC",
    "registrationNo": "AP-1869",
    "registrationHolder": "Prime Agro Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0253",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Pro-zole 5 EC",
    "registrationNo": "AP-3087",
    "registrationHolder": "Pratasha International",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0587",
    "type": "Fungicide",
    "commonName": "Propineb",
    "tradeName": "Procol 70 WP",
    "registrationNo": "AP-1892",
    "registrationHolder": "Assign Crop Care Limited",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site zinc-bearing contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing bioavailable zinc for enhanced crop vigor",
      "Prevents spore germination across early blight, late blight, and downy mildews",
      "Wear protective gloves and mask; keep packaging sealed and dry"
    ],
    "rotationNotes": "Zero resistance risk. Ideal mixing partner and foundational rotational anchor."
  },
  {
    "id": "fung-0566",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Procon 25 EC",
    "registrationNo": "AP-1705",
    "registrationHolder": "Classic Agrovet Limited",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0528",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Progast 25 EC",
    "registrationNo": "AP-710",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Grain stores",
      "Tobacco warehouses",
      "Processed flour silos",
      "Banana",
      "Wheat",
      "Rice",
      "Tea"
    ],
    "pests": [
      "Cigarette beetle (Lasioderma serricorne)",
      "Warehouse moth (Ephestia elutella)",
      "Grain beetles",
      "Sigatoka",
      "Leaf blight",
      "Sheath blight",
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "1 plate per 30-40 m³ space",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "Plate",
    "phiDays": 14,
    "reiHours": 72,
    "waterVolumeLPerHa": 0,
    "safetyNotes": [
      "Releases phosphine gas more rapidly than aluminium phosphide with zero powder residue left in commodities",
      "Professional certified fumigators only"
    ],
    "rotationNotes": "Follow with vacuum cleaning and empty space residual spray"
  },
  {
    "id": "fung-0527",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Propi 25 EC",
    "registrationNo": "AP-624",
    "registrationHolder": "Omnichem Limited",
    "crops": [
      "Rice",
      "Wheat",
      "Tea",
      "Banana",
      "Sugarcane"
    ],
    "pests": [
      "Sheath blight",
      "Leaf blight",
      "Red rust",
      "Die-back",
      "Black rot",
      "Sigatoka",
      "Sett rot"
    ],
    "dosageRate": "500 ml; 1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0534",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Propiate 25 EC",
    "registrationNo": "AP-1050",
    "registrationHolder": "Agrimax Bangladesh Limited",
    "crops": [
      "Banana",
      "Wheat",
      "Rice",
      "Tea"
    ],
    "pests": [
      "Sigatoka",
      "Leaf blight",
      "Sheath blight",
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0543",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Protilt 250 EC",
    "registrationNo": "AP-1245",
    "registrationHolder": "Assign Crop Care Limited",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0127",
    "type": "Fungicide",
    "commonName": "Carboxin (17.5%) + Thiram (17.5%)",
    "tradeName": "Provax 200 WP",
    "registrationNo": "AP-1146",
    "registrationHolder": "Hossain Enterprise C.C. Limited",
    "crops": [
      "Wheat",
      "Jute",
      "Rice",
      "Brinjal",
      "Bottle gourd",
      "Potato"
    ],
    "pests": [
      "Seedling blight",
      "Foot rot",
      "Seed rot",
      "Wilting",
      "Soft rot",
      "Anthracnose",
      "Bipolaris oryzae",
      "Black scurf",
      "Seedling disease",
      "(Seed borne) Bipolaris oryzae",
      "Black scarf"
    ],
    "dosageRate": "2 - 4 gm/Kg seed (2.5 gm/L water)",
    "moaCode": "FRAC 7 + M03",
    "moaGroup": "SDHI (Succinate dehydrogenase) + Dithiocarbamate",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 45,
    "reiHours": 24,
    "waterVolumeLPerHa": 400,
    "safetyNotes": [
      "Primarily used as seed dresser",
      "Do not feed treated seeds to livestock or birds",
      "Wear dust mask during slurry preparation"
    ],
    "rotationNotes": "Dual action contact + systemic prevents seedborne pathogen resistance"
  },
  {
    "id": "fung-0574",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Prozole 250 EC",
    "registrationNo": "AP-1717",
    "registrationHolder": "Agrinet Crop Care Bangladesh",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0393",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Putazeb 80 WP",
    "registrationNo": "AP-2470",
    "registrationHolder": "Prime Agro Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0076",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Qubee 50 WP",
    "registrationNo": "AP-2125",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Tomato",
      "Cucurbit"
    ],
    "pests": [
      "Wilt",
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water; 1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0184",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Quilt 300 EC",
    "registrationNo": "AP-3250",
    "registrationHolder": "Bangladesh Agricultural Industries",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0516",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "R-Mil 72 WP",
    "registrationNo": "AP-2170",
    "registrationHolder": "Rahman Pesticides & Chemicals Co.",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0064",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "R-zim 50 WP",
    "registrationNo": "AP-1851",
    "registrationHolder": "Bengal Agro Chemicals Industries",
    "crops": [
      "Tea",
      "Tomato"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back",
      "Wilt & Early blight"
    ],
    "dosageRate": "750 gm in 1000 lt of water; 2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0585",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Ractilt 250 EC",
    "registrationNo": "AP-1730",
    "registrationHolder": "Spectrum Engineering Consortium Ltd",
    "crops": [
      "Cotton",
      "Tomato",
      "Cabbage",
      "Pigeonpea",
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Helicoverpa armigera",
      "Fruit borer",
      "Diamondback moth",
      "Pod borer",
      "Leaf blight",
      "Sheath blight",
      "BPH"
    ],
    "dosageRate": "350 ml/ha (0.7 ml/L water)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 5,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Bio-activated inside the insect gut into active toxic metabolite",
      "Effective against organophosphate- and pyrethroid-resistant caterpillar strains"
    ],
    "rotationNotes": "Rotate with Group 28 (Diamides) or Group 5 (Spinosyns)"
  },
  {
    "id": "fung-0399",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Rafizeb 80 WP",
    "registrationNo": "AP-2476",
    "registrationHolder": "Ashrafi Agro Science",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0005",
    "type": "Fungicide",
    "commonName": "Azoxystrobin (20% ) + Difenoconazole (12.5%)",
    "tradeName": "Rai 325 SC",
    "registrationNo": "AP-3111",
    "registrationHolder": "Crop Protection & Care Center",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 11 + 3",
    "moaGroup": "QoI + DMI (Strobilurin + Triazole)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Synergistic systemic mixture for sheath blight, dirty panicle, and blast in rice and vegetable anthracnose",
      "Rapid translaminar uptake within 2 hours; rainfast once dry",
      "Wear rubber gloves and mask during spray preparation"
    ],
    "rotationNotes": "Rotate with SDHI (FRAC 7) or contact dithiocarbamates (FRAC M03)."
  },
  {
    "id": "fung-0417",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Rainazeb 80 WP",
    "registrationNo": "AP-2494",
    "registrationHolder": "Raina Associates",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0087",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Rajzim 50 WP",
    "registrationNo": "AP-2449",
    "registrationHolder": "Bongshe Moharaj & Agro Technology",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0103",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Ranazim 50 WP",
    "registrationNo": "AP-3121",
    "registrationHolder": "Runner Agro Products Limited",
    "crops": [
      "Tea",
      "Tomato"
    ],
    "pests": [
      "Die back",
      "Black rot",
      "Wilt"
    ],
    "dosageRate": "750 gm; 2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0077",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Ravistin 50 WP",
    "registrationNo": "AP-2126",
    "registrationHolder": "Raven Aqua Agriculture Ltd",
    "crops": [
      "Tomato",
      "Banana"
    ],
    "pests": [
      "Wilt",
      "Sigatoka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0084",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Ravzim 50 WP",
    "registrationNo": "AP-2243",
    "registrationHolder": "Raven Aqua Agriculture Ltd",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0231",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Ravzole 5 EC",
    "registrationNo": "AP-2180",
    "registrationHolder": "Raven Agro Chemicals Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0297",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Razland 80 WP",
    "registrationNo": "AP-351",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Potato & Tomato"
    ],
    "pests": [
      "Late & Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0052",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Regard 50 WP",
    "registrationNo": "AP-1678",
    "registrationHolder": "Agro Continent Bangladesh",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0360",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Rekazeb 80 WP",
    "registrationNo": "AP-2140",
    "registrationHolder": "T H Pesticides",
    "crops": [
      "Rice",
      "Tea",
      "Potato"
    ],
    "pests": [
      "Annual grasses",
      "Perennial sedges",
      "Broadleaf weeds (Monochoria, Ludwigia)",
      "Die back",
      "Black rot",
      "Late blight"
    ],
    "dosageRate": "10 kg/ha (Broadcasting granule)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "GR",
    "phiDays": 45,
    "reiHours": 12,
    "waterVolumeLPerHa": 0,
    "safetyNotes": [
      "Direct broadcast granular formulation mixed with dry sand or fertilizer",
      "Zero knapsack spray water required; major labor-saving herbicide"
    ],
    "rotationNotes": "Follow with manual spot weeding if deep-rooted perennials emerge"
  },
  {
    "id": "fung-0071",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Rekazim 50 WP",
    "registrationNo": "AP-2120",
    "registrationHolder": "T H Pesticides",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0461",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Rekazin 75 WP",
    "registrationNo": "AP-3254",
    "registrationHolder": "T H Pesticides",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0099",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Reliable 50 WP",
    "registrationNo": "AP-2617",
    "registrationHolder": "Delta Agro Chemicals",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0440",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Relux 75 WP",
    "registrationNo": "AP-1696",
    "registrationHolder": "Crop Protection & Care Center",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0507",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Remil 72 WP",
    "registrationNo": "AP-1699",
    "registrationHolder": "Retina Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0532",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Result 250 EC",
    "registrationNo": "AP-976",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Banana",
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Sigatoka",
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0345",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Rexizeb 80 WP",
    "registrationNo": "AP-1697",
    "registrationHolder": "Reximco Insecticides Limited",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0238",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Rexizole 5 EC",
    "registrationNo": "AP-2498",
    "registrationHolder": "Reximco Insecticides Limited",
    "crops": [
      "Tea",
      "Mango"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot",
      "Anthracnose"
    ],
    "dosageRate": "750 ml in 1000 lt of water; 1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0287",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Rexral 50 WP",
    "registrationNo": "AP-3147",
    "registrationHolder": "Reximco Insecticides Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0476",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Ricomil 72 WP",
    "registrationNo": "AP-3138",
    "registrationHolder": "Rico Agrovet",
    "crops": [
      "Tea",
      "Potato"
    ],
    "pests": [
      "Die back",
      "Black rot",
      "Late blight"
    ],
    "dosageRate": "2.00 Kg; 2 gm/litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0565",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Riconazole 250 EC",
    "registrationNo": "AP-1679",
    "registrationHolder": "Rico Agrovet",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0349",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Ricozeb 80 WP",
    "registrationNo": "AP-1859",
    "registrationHolder": "Rico Agrovet Industries Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0177",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Ricozole 300 EC",
    "registrationNo": "AP-3080",
    "registrationHolder": "Rico Agrovet",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0487",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Ridomil Gold MZ 68 WG",
    "registrationNo": "AP-525",
    "registrationHolder": "Syngenta Bangladesh Limited",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Early & Late blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/litre of water (2.00 Kg/ha)",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WG",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic acropetal transport into new growth",
      "Do not apply curatively when foliage blight exceeds 5%"
    ],
    "rotationNotes": "Never exceed 2-3 sprays per season. Alternate with Dimethomorph or Cymoxanil"
  },
  {
    "id": "fun-0487",
    "type": "Fungicide",
    "commonName": "Metalaxyl + Mancozeb",
    "tradeName": "Ridomil Gold MZ 68 WG",
    "registrationNo": "AP-512",
    "registrationHolder": "Syngenta Bangladesh Ltd",
    "crops": [
      "Potato",
      "Tomato",
      "Mustard",
      "Cucurbits"
    ],
    "pests": [
      "Late blight (Phytophthora infestans)",
      "Downy mildew",
      "White rust"
    ],
    "dosageRate": "1.5 - 2.0 kg/ha (2.0 - 2.5 g/L water)",
    "moaCode": "FRAC 4 + M03",
    "moaGroup": "PA (Phenylamides) + Multi-site Dithiocarbamate",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WDG",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic uptake within 30 minutes protects new vegetative potato shoots",
      "Multi-site mancozeb prevents single-site metalaxyl resistance mutation"
    ],
    "rotationNotes": "Follow with Dimethomorph (FRAC 40) or Cymoxanil (FRAC 27) during heavy fog spells"
  },
  {
    "id": "fung-0569",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Rilt 250 EC",
    "registrationNo": "AP-1712",
    "registrationHolder": "R K Agro Products Limited",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0122",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Rimzim 50 WP",
    "registrationNo": "AP-3241",
    "registrationHolder": "Cobra Land Care",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0165",
    "type": "Fungicide",
    "commonName": "Difenoconazole",
    "tradeName": "Rofenon 25 EC",
    "registrationNo": "AP-1711",
    "registrationHolder": "Aartessa Trading",
    "crops": [
      "Rice",
      "Onion"
    ],
    "pests": [
      "Sheath blight",
      "Purple blotch"
    ],
    "dosageRate": "500 ml; 0.5 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Demethylation inhibitor - Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High-potency systemic triazole providing preventive and curative control of blast, sheath blight, and leaf spots",
      "Inhibits fungal ergosterol biosynthesis at the C14-demethylase enzyme",
      "Toxic to aquatic organisms; maintain strict aquatic buffer distances"
    ],
    "rotationNotes": "Maximum 3 applications per season. Alternate with FRAC 11 (QoI) or FRAC M03."
  },
  {
    "id": "fung-0089",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Roin 50 WP",
    "registrationNo": "AP-2452",
    "registrationHolder": "D M International",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0592",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Ronovit 80 WG",
    "registrationNo": "AP-444",
    "registrationHolder": "National AgriCare Import & Export Ltd",
    "crops": [
      "Tea",
      "Jute",
      "Betel vine"
    ],
    "pests": [
      "Red spider mite",
      "Yellow mite",
      "Powdery mildew"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant for powdery mildew and red spider mites",
      "Avoid high heat applications (>32°C) to prevent leaf scorching",
      "Do not mix with petroleum or emulsified oils"
    ],
    "rotationNotes": "Ideal low-risk rotational partner across all crop stages."
  },
  {
    "id": "fung-0132",
    "type": "Fungicide",
    "commonName": "Chlorothalonil",
    "tradeName": "Rotanil 500 SC",
    "registrationNo": "AP-2701",
    "registrationHolder": "Agro Arena Associates",
    "crops": [
      "Tea",
      "Potato"
    ],
    "pests": [
      "Die back",
      "Black rot",
      "Late blight"
    ],
    "dosageRate": "2.00 Litre; 2 ml/Litre of water",
    "moaCode": "FRAC M05",
    "moaGroup": "Multi-site contact (Chloronitriles)",
    "resistanceRisk": "Low",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact fungicide that deactivates glutathione and fungal cell enzymes",
      "Eye irritant and potential skin sensitizer; wear chemical goggles and face shield",
      "Toxic to fish and aquatic life; avoid spraying near ponds and canals"
    ],
    "rotationNotes": "Zero reported fungal resistance. Cornerstone mixing/rotational partner for single-site systemics."
  },
  {
    "id": "fung-0289",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Rotund 50 WP",
    "registrationNo": "AP-3149",
    "registrationHolder": "Maitri Agro Industries",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria spot"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0270",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Rovanon 50 WP",
    "registrationNo": "AP-1385",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Onion",
      "Mustard"
    ],
    "pests": [
      "Purple blotch",
      "Alternaria bright"
    ],
    "dosageRate": "2 gm/litre of water; 1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0266",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Rovral 50 WP",
    "registrationNo": "AP-143",
    "registrationHolder": "Bayer CropScience Limited",
    "crops": [
      "Mustard",
      "Onion"
    ],
    "pests": [
      "Alternaria spot",
      "Purple blotch"
    ],
    "dosageRate": "1.00 Kg/ha (2 gm/Litre of water)",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Preventative and curative contact action",
      "Do not exceed 3 applications per season"
    ],
    "rotationNotes": "Rotate with Mancozeb (M03) or Azoxystrobin (11)"
  },
  {
    "id": "fung-0404",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Rozeb 80 WP",
    "registrationNo": "AP-2481",
    "registrationHolder": "Roza Agro",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0282",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "RPC 50 WP",
    "registrationNo": "AP-2541",
    "registrationHolder": "Rahman Pesticide & Chemicals Co.",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0167",
    "type": "Fungicide",
    "commonName": "Difenoconazole",
    "tradeName": "Run 250 EC",
    "registrationNo": "AP-2305",
    "registrationHolder": "East West Chemicals Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "0.5 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Demethylation inhibitor - Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High-potency systemic triazole providing preventive and curative control of blast, sheath blight, and leaf spots",
      "Inhibits fungal ergosterol biosynthesis at the C14-demethylase enzyme",
      "Toxic to aquatic organisms; maintain strict aquatic buffer distances"
    ],
    "rotationNotes": "Maximum 3 applications per season. Alternate with FRAC 11 (QoI) or FRAC M03."
  },
  {
    "id": "fung-0105",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Rupali 50 WP",
    "registrationNo": "AP-3123",
    "registrationHolder": "Aristocrat Agro Services Ltd.",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0285",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Ruvi One 50 WP",
    "registrationNo": "AP-3145",
    "registrationHolder": "Astron Agri Care Bangladesh",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot"
    ],
    "dosageRate": "1.00 Kg",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0546",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "S-Tilt 25 EC",
    "registrationNo": "AP-1348",
    "registrationHolder": "SAM Agro Chemical",
    "crops": [
      "Banana",
      "Wheat",
      "Rice",
      "Tea"
    ],
    "pests": [
      "Sigatoka",
      "Leaf blight",
      "Sheath blight",
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0503",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "S-Tox 72 WP",
    "registrationNo": "AP-1684",
    "registrationHolder": "Assign Crop Care Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0254",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "S-Zole EC",
    "registrationNo": "AP-3088",
    "registrationHolder": "S M Agro International",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0545",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Safatilt 250 EC",
    "registrationNo": "AP-1247",
    "registrationHolder": "Sweet Agrovet Limited",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0175",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Safemaster 300 EC",
    "registrationNo": "AP-2775",
    "registrationHolder": "Surovi Agro Industries Limited",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "0.5 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0497",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Safemil 72 WP",
    "registrationNo": "AP-1376",
    "registrationHolder": "Sweet Agrovet Limited",
    "crops": [
      "Potato",
      "Tomato",
      "Onion"
    ],
    "pests": [
      "Late blight",
      "Early & Late blight",
      "Purple blotch"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0118",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Sahzim 50 WP",
    "registrationNo": "AP-3236",
    "registrationHolder": "Shahjalal Agro Industries",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0264",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Sahzole 5 EC",
    "registrationNo": "AP-3232",
    "registrationHolder": "Shahjalal Agro Industries",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0422",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Saila 80 WP",
    "registrationNo": "AP-3096",
    "registrationHolder": "Swazis International",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0387",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Samthane 80 WP",
    "registrationNo": "AP-2464",
    "registrationHolder": "Shabujbangla Agro Industries",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0472",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Sanil 72 WP",
    "registrationNo": "AP-2518",
    "registrationHolder": "Sreejoni Agro Chemicals",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0081",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Sarazim 50 WP",
    "registrationNo": "AP-2130",
    "registrationHolder": "Sara Chemicals Limited",
    "crops": [
      "Mango",
      "Tomato"
    ],
    "pests": [
      "Anthracnose",
      "Wilt"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0571",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Satilt 250 EC",
    "registrationNo": "AP-1714",
    "registrationHolder": "Sadik Agrochemicals Co.",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0321",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Saver 80 WP",
    "registrationNo": "AP-970",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Tomato",
      "Wheat"
    ],
    "pests": [
      "Early & Late blight",
      "Leaf blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0112",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Savistin 50 WP",
    "registrationNo": "AP-3130",
    "registrationHolder": "Retina Agro Chemical",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0597",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Savit 80 WDG",
    "registrationNo": "AP-1895",
    "registrationHolder": "Modern Agro Care",
    "crops": [
      "Betel vine",
      "Tea"
    ],
    "pests": [
      "Powdery mildew",
      "Red spider mite"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant for powdery mildew and red spider mites",
      "Avoid high heat applications (>32°C) to prevent leaf scorching",
      "Do not mix with petroleum or emulsified oils"
    ],
    "rotationNotes": "Ideal low-risk rotational partner across all crop stages."
  },
  {
    "id": "fung-0164",
    "type": "Fungicide",
    "commonName": "Difenoconazole",
    "tradeName": "Score 250 EC",
    "registrationNo": "AP-384",
    "registrationHolder": "Syngenta Bangladesh Limited",
    "crops": [
      "Onion",
      "Chili",
      "Betel vine",
      "Banana",
      "Rice",
      "Mango"
    ],
    "pests": [
      "Purple blotch",
      "Leaf spot",
      "Foot rot",
      "Sigatoka",
      "Sheath blight",
      "Anthracnose"
    ],
    "dosageRate": "0.5 - 1 ml/Litre of water (500 ml/ha)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Demethylation inhibitor - Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Strong systemic xylem mobility with translaminar protection",
      "Do not underdose",
      "Wear eye protection during dilution"
    ],
    "rotationNotes": "Rotate with FRAC 11 (Azoxystrobin) or FRAC M03 (Mancozeb). Max 2-3 sprays/season"
  },
  {
    "id": "fun-0519",
    "type": "Fungicide",
    "commonName": "Difenoconazole",
    "tradeName": "Score 250 EC",
    "registrationNo": "AP-810",
    "registrationHolder": "Syngenta Bangladesh Ltd",
    "crops": [
      "Rice",
      "Potato",
      "Tomato",
      "Chilli",
      "Onion"
    ],
    "pests": [
      "Early blight (Alternaria solani)",
      "Die-back & Fruit rot",
      "Purple blotch",
      "Anthracnose"
    ],
    "dosageRate": "500 ml/ha (1.0 ml/L water)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazole)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard systemic fungicide against Alternaria leaf blights",
      "Very rapid plant penetration within 2 hours"
    ],
    "rotationNotes": "Alternate with Chlorothalonil (M05) or Iprodione (2)"
  },
  {
    "id": "fung-0023",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Seadazim 50 WP",
    "registrationNo": "AP-754",
    "registrationHolder": "Sea Trade Fertilizer Limited",
    "crops": [
      "Sugarcane",
      "Banana",
      "Tea"
    ],
    "pests": [
      "Set rot",
      "Sigatoka",
      "Red rust disease"
    ],
    "dosageRate": "1 gm/litre of water; 750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0073",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Seaszim 50 WP",
    "registrationNo": "AP-2122",
    "registrationHolder": "Sealand Agro Industries Limited",
    "crops": [
      "Chili"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0229",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Seconazole 5 EC",
    "registrationNo": "AP-1874",
    "registrationHolder": "Sealand Agro Industries Limited",
    "crops": [
      "Mango",
      "Banana"
    ],
    "pests": [
      "Anthracnose",
      "Powdery mildew",
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0381",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Secozeb 80 WP",
    "registrationNo": "AP-2161",
    "registrationHolder": "Sun Seed Pesticides",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Late & Early blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fun-0524",
    "type": "Fungicide",
    "commonName": "Fenamidone + Mancozeb",
    "tradeName": "Sectin 60 WG",
    "registrationNo": "AP-1830",
    "registrationHolder": "Bayer CropScience Ltd",
    "crops": [
      "Potato",
      "Tomato",
      "Grapes"
    ],
    "pests": [
      "Late blight",
      "Downy mildew"
    ],
    "dosageRate": "1.5 kg/ha (2.0 g/L water)",
    "moaCode": "FRAC 11 + M03",
    "moaGroup": "QoI Imidazolinone + Multi-site Dithiocarbamate",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WDG",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Excellent translaminar antisporulant activity",
      "Prevents secondary spread of late blight during cloudy, humid conditions"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40)"
  },
  {
    "id": "fung-0373",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Security 80 WP",
    "registrationNo": "AP-2153",
    "registrationHolder": "Crop Life Agro Chemicals Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0202",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Sedozole 5 EC",
    "registrationNo": "AP-1045",
    "registrationHolder": "MARP Bangladesh",
    "crops": [
      "Garden pea"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0431",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Seedman 80 WP",
    "registrationNo": "AP-3105",
    "registrationHolder": "Seed Link Enterprise",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0247",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Setel 5 EC",
    "registrationNo": "AP-2781",
    "registrationHolder": "Rahman Pesticide & Chemicals Co.",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1 ml/litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0274",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Sevral 50 WP",
    "registrationNo": "AP-1706",
    "registrationHolder": "Atherton Imbros Company Limited",
    "crops": [
      "Mustard",
      "Chili",
      "Onion"
    ],
    "pests": [
      "Alternaria bright",
      "Anthracnose",
      "Purple blotch"
    ],
    "dosageRate": "2 gm/litre of water; 1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0218",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Shabab 5 EC",
    "registrationNo": "AP-1758",
    "registrationHolder": "Intefa",
    "crops": [
      "Banana",
      "Mango",
      "Rice"
    ],
    "pests": [
      "Sigatoka",
      "Anthracnose",
      "Powdery mildew",
      "Sheath blight"
    ],
    "dosageRate": "1 ml/Litre of water; 2 ml/Litre of water; 500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0454",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Shade 75 WP",
    "registrationNo": "AP-2528",
    "registrationHolder": "Agro Link (BD)",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0615",
    "type": "Fungicide",
    "commonName": "Validamycin",
    "tradeName": "Sheathmar 3 L",
    "registrationNo": "AP-1137",
    "registrationHolder": "Shetu Corporation Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 26",
    "moaGroup": "Glucopyranosyl antibiotic (Trehalase inhibitor)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Biological antibiotic fungicide specifically targeting Rhizoctonia solani (Sheath blight)",
      "Inhibits trehalase enzyme, starving hyphae and stopping lesion progression",
      "Environmentally benign, safe to predatory insects, spiders, and fish at labeled rates"
    ],
    "rotationNotes": "Rotate with Hexaconazole (FRAC 3) or Azoxystrobin (FRAC 11) for comprehensive sheath blight management."
  },
  {
    "id": "fung-0130",
    "type": "Fungicide",
    "commonName": "Carbendazim (17.5%)+Iprodione (35%)",
    "tradeName": "Shelter 52.5 WP",
    "registrationNo": "AP-3251",
    "registrationHolder": "Surovi Agro Industries Limited",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1 + 2",
    "moaGroup": "MBC + Dicarboximide",
    "resistanceRisk": "High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Synergistic combination for Botrytis, Alternaria leaf spot, and stem rot",
      "Curative and translaminar systemic action",
      "Wear gloves, long sleeves, and safety glasses"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or triazoles (FRAC 3)."
  },
  {
    "id": "fung-0372",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Shield 70 WDG",
    "registrationNo": "AP-2152",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WDG",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0010",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Shincar 50 WP",
    "registrationNo": "AP-355",
    "registrationHolder": "Omnichem Limited",
    "crops": [
      "Tobacco"
    ],
    "pests": [
      "Frog eye & Leaf spot"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0573",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Shine 250 EC",
    "registrationNo": "AP-1716",
    "registrationHolder": "M/S Parvin Agro Chemicals",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0309",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Shinmazeb 80 WP",
    "registrationNo": "AP-615",
    "registrationHolder": "Petrochem (Bangladesh) Limited",
    "crops": [
      "Rice",
      "Vegetables",
      "Tea",
      "Jute",
      "Mango",
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Rice leaf folder",
      "Thrips",
      "Looper caterpillars",
      "Hairy caterpillar",
      "Mango hopper",
      "Late blight",
      "Early blight"
    ],
    "dosageRate": "1.0 L/ha (1.5 ml/L water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent contact and stomach poison with repellency properties",
      "Causes transient facial tingling (paraesthesia); wash skin with cold water and apply Vitamin E cream"
    ],
    "rotationNotes": "Follow with Diamide (Group 28) or Insect Growth Regulator (Group 15)"
  },
  {
    "id": "fung-0388",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Siamzeb 80 WP",
    "registrationNo": "AP-2465",
    "registrationHolder": "Siam Crop Care",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0070",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Siamzim 50 WP",
    "registrationNo": "AP-2119",
    "registrationHolder": "Siam Crop Care",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0242",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Sicohexa 5 EC",
    "registrationNo": "AP-2502",
    "registrationHolder": "S S Vision Limited",
    "crops": [
      "Cucurbits",
      "Banana"
    ],
    "pests": [
      "Powdery mildew",
      "Sigatoka"
    ],
    "dosageRate": "1 ml/Litre of water; 1 ml/litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0079",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Sicozim 50 WP",
    "registrationNo": "AP-2128",
    "registrationHolder": "Siraj Agro International",
    "crops": [
      "Cucurbit"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0535",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Silt 25 EC",
    "registrationNo": "AP-1051",
    "registrationHolder": "Atherton Imbros Company Limited",
    "crops": [
      "Wheat",
      "Rice",
      "Banana"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight",
      "Sigatoka"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0356",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Sinewzeb 80 WP",
    "registrationNo": "AP-1923",
    "registrationHolder": "Safi Agro",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0271",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Sinobral 50 WP",
    "registrationNo": "AP-1701",
    "registrationHolder": "Omnechem Limited",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria bright"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0033",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Sinodazim 50 WP",
    "registrationNo": "AP-1022",
    "registrationHolder": "Global Agrovet Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "1.00 Kg",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0492",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Sinomil 72 WP",
    "registrationNo": "AP-857",
    "registrationHolder": "Sinochem Bangladesh (Pvt) Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0353",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Sinozeb 80 WP",
    "registrationNo": "AP-1903",
    "registrationHolder": "Supreme Seed Company",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Early blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0044",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Sinozim 50 WP",
    "registrationNo": "AP-1347",
    "registrationHolder": "Aranya Crop Care Limited",
    "crops": [
      "Cucurbit",
      "Chili"
    ],
    "pests": [
      "Powdery mildew",
      "Anthracnose"
    ],
    "dosageRate": "1 gm/liter of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0039",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Sistin 50 WP",
    "registrationNo": "AP-1088",
    "registrationHolder": "King Tech Corporation Bangladesh",
    "crops": [
      "Garden pea",
      "Tea",
      "Chili"
    ],
    "pests": [
      "Powdery mildew",
      "Red rust disease",
      "Anthracnose"
    ],
    "dosageRate": "1 gm/liter of water; 750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0001",
    "type": "Fungicide",
    "commonName": "Azoxystrobin",
    "tradeName": "Sitro 25 SC",
    "registrationNo": "AP-3153",
    "registrationHolder": "S I Agro International",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot",
      "Block rot"
    ],
    "dosageRate": "500 ml/ha",
    "moaCode": "FRAC 11",
    "moaGroup": "QoI (Quinone outside Inhibitor - Strobilurins)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Highly toxic to aquatic organisms",
      "Limit QoI applications to maximum 2 per season",
      "Do not apply curatively when infection is heavy"
    ],
    "rotationNotes": "Must alternate with FRAC 3 (Hexaconazole/Propiconazole) or FRAC M01 (Copper)"
  },
  {
    "id": "fung-0577",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Smartilt 250 EC",
    "registrationNo": "AP-1720",
    "registrationHolder": "Smart Agrovet",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0357",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Smartzeb 80 WP",
    "registrationNo": "AP-1925",
    "registrationHolder": "Smart Agrovet",
    "crops": [
      "Rice",
      "Brinjal",
      "Cabbage",
      "Tomato",
      "Cotton",
      "Potato"
    ],
    "pests": [
      "Yellow stem borer",
      "Rice leaf folder",
      "Brinjal fruit borer",
      "Diamondback moth",
      "Pod borer",
      "Late blight"
    ],
    "dosageRate": "100 - 120 ml/ha (0.2 ml/L water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SC",
    "phiDays": 5,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Remarkable rainfastness within 2 hours",
      "Safe for parasitoid wasps (Trichogramma) and predatory spiders"
    ],
    "rotationNotes": "Do not follow directly with Chlorantraniliprole; rotate with Group 6 (Emamectin) or Group 15 (Lufenuron)"
  },
  {
    "id": "fung-0512",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Spilaxyl 72 WP",
    "registrationNo": "AP-1901",
    "registrationHolder": "Square Pharmaceuticals Limited",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Late & Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0557",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Spilt 250 EC",
    "registrationNo": "AP-1597",
    "registrationHolder": "Square Pharmaceuticals Limited",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0470",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Sprinter 72 WP",
    "registrationNo": "AP-1899",
    "registrationHolder": "Mahin Enterprise Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0611",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Star 75 WP",
    "registrationNo": "AP-1771",
    "registrationHolder": "Assign Crop Care Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0054",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Starzim 50 WP",
    "registrationNo": "AP-1681",
    "registrationHolder": "Pace Agro International",
    "crops": [
      "Sugarcane"
    ],
    "pests": [
      "Sett rot"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0090",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Stazim 50 WP",
    "registrationNo": "AP-2453",
    "registrationHolder": "Astron Agri Care Bangladesh",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0352",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Stellazeb 80 WP",
    "registrationNo": "AP-1900",
    "registrationHolder": "Raven Aqua Agriculture Limited",
    "crops": [
      "Tomato",
      "Banana"
    ],
    "pests": [
      "Late &Early blight",
      "Sigatoka"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0548",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Stilt 250 EC",
    "registrationNo": "AP-1351",
    "registrationHolder": "S I Agro International",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0609",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Sublast 75 WP",
    "registrationNo": "AP-1769",
    "registrationHolder": "Surovi Agro Industries Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0095",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Sufi 50 WP",
    "registrationNo": "AP-2458",
    "registrationHolder": "Valent Tech Limited",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0354",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Sukria 80 WP",
    "registrationNo": "AP-1920",
    "registrationHolder": "ACE Farming Solutions",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0141",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Sulcox 50 WP",
    "registrationNo": "AP-528",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Tea",
      "Pulse & Oil crops",
      "Onion"
    ],
    "pests": [
      "Die back",
      "Black rot & Red rust",
      "Leaf spot",
      "Purple blotch"
    ],
    "dosageRate": "2.80 Kg/ha (2 gm/Litre of water)",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Wear dust mask when opening bag",
      "Keep away from waterways"
    ],
    "rotationNotes": "Effective baseline against bacterial and fungal infections"
  },
  {
    "id": "fung-0591",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Sulfin 80 WP",
    "registrationNo": "AP-243",
    "registrationHolder": "Shetu Pesticides Limited",
    "crops": [
      "Tea",
      "Rice",
      "Rubber",
      "Betel vine"
    ],
    "pests": [
      "Mikania creeper",
      "Bagracote",
      "Monochoria vaginalis",
      "Ludwigia octovalvis",
      "Sphenoclea zeylanica",
      "Powdery mildew",
      "Red spider mite"
    ],
    "dosageRate": "2.24 - 3.00 Litre/ha",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SL",
    "phiDays": 60,
    "reiHours": 48,
    "waterVolumeLPerHa": 400,
    "safetyNotes": [
      "Selective post-emergence broadleaf weed killer",
      "Severe vapor drift hazard to sensitive broadleaf crops like cotton, tomato, chili",
      "Use coarse droplet nozzles only"
    ],
    "rotationNotes": "Rotate with ALS inhibitors (HRAC 2) or Pre-emergence chloroacetamides"
  },
  {
    "id": "fung-0588",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Sulfotox 80 WP",
    "registrationNo": "AP-141",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Rice",
      "Vegetables",
      "Mango",
      "Tea",
      "Betel vine"
    ],
    "pests": [
      "Hispa",
      "Leaf roller",
      "GLH",
      "Thrips & Bug",
      "Aphids",
      "Yapsilla",
      "Mites",
      "Mosquito bug",
      "Red spider mite",
      "Powdery mildew"
    ],
    "dosageRate": "1.12 - 2.20 Litre/ha",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 48,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Strong systemic action inside plant sap",
      "Has characteristic offensive odor",
      "Antidote: Atropine sulfate"
    ],
    "rotationNotes": "Do not use repeatedly on aphids. Alternate with Pymetrozine (9B) or Imidacloprid (4A)"
  },
  {
    "id": "fung-0500",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Sultan 72 WP",
    "registrationNo": "AP-1616",
    "registrationHolder": "Surovi Agro Industries Limited",
    "crops": [
      "Potato",
      "Chili",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0217",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Sun Plus 5 EC",
    "registrationNo": "AP-1708",
    "registrationHolder": "Sun Seed Pesticides",
    "crops": [
      "Mango",
      "Banana"
    ],
    "pests": [
      "Anthracnose",
      "Sigatoka"
    ],
    "dosageRate": "2 ml/Litre of water; 1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0549",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Sunconazole 250 EC",
    "registrationNo": "AP-1358",
    "registrationHolder": "Sun Seed Pesticides",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0298",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Suncozeb 80 WP",
    "registrationNo": "AP-352",
    "registrationHolder": "Shetu Corporation Limited",
    "crops": [
      "Potato & Tomato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0480",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Sundomil 72 WP",
    "registrationNo": "AP-394",
    "registrationHolder": "Shetu Corporation Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0575",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Sunilt 250 EC",
    "registrationNo": "AP-1718",
    "registrationHolder": "Sun Corporation",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0464",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Sunoxanil 72 WP",
    "registrationNo": "AP-796",
    "registrationHolder": "McDonald Bangladesh (Pvt) Limited",
    "crops": [
      "Potato",
      "Mango",
      "Onion",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Anthracnose",
      "Powdery mildew",
      "Purple blotch",
      "Late blight & Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0140",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Sunvit 50 WP",
    "registrationNo": "AP-527",
    "registrationHolder": "McDonald Bangladesh (Pvt) Limited",
    "crops": [
      "Tea",
      "Sesame"
    ],
    "pests": [
      "Red rust",
      "Leaf spot"
    ],
    "dosageRate": "2.80 - 3.40 Kg/ha",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Protective contact shield",
      "Ensure good canopy coverage on both leaf sides"
    ],
    "rotationNotes": "Can be tank-mixed with Mancozeb or rotated with Triazoles"
  },
  {
    "id": "fung-0593",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Sunvit 80 WDG",
    "registrationNo": "AP-463",
    "registrationHolder": "Shetu Corporation Limited",
    "crops": [
      "Betel vine",
      "Tea"
    ],
    "pests": [
      "Powdery mildew",
      "Red spider mite"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant for powdery mildew and red spider mites",
      "Avoid high heat applications (>32°C) to prevent leaf scorching",
      "Do not mix with petroleum or emulsified oils"
    ],
    "rotationNotes": "Ideal low-risk rotational partner across all crop stages."
  },
  {
    "id": "fung-0533",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Super Tilt 250 EC",
    "registrationNo": "AP-1046",
    "registrationHolder": "Chemolimpex Agro Limited",
    "crops": [
      "Banana",
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Sigatoka",
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0138",
    "type": "Fungicide",
    "commonName": "Copper hydroxide",
    "tradeName": "Superex 77 WP",
    "registrationNo": "AP-1861",
    "registrationHolder": "Rajib Agro Chemicals Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot",
      "Red rust"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Bactericide and contact fungicide with multi-site protein denaturation by cupric ions",
      "Effective against bacterial leaf blight, citrus canker, and downy mildews",
      "Do not tank-mix with strongly acidic compounds or Fosetyl-Al"
    ],
    "rotationNotes": "Low resistance risk. Alternate with biologicals (FRAC BM02) or dithiocarbamates (M03)."
  },
  {
    "id": "fung-0060",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Superzim 50 WP",
    "registrationNo": "AP-1847",
    "registrationHolder": "Mery Gold Agro Science",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0433",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Sur 80 WP",
    "registrationNo": "AP-3107",
    "registrationHolder": "Surjo Products",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0096",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Suzim 50 WP",
    "registrationNo": "AP-2459",
    "registrationHolder": "Surovi Agro Industries Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0249",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "T-Hexa 5 EC",
    "registrationNo": "AP-3083",
    "registrationHolder": "H P Distributor",
    "crops": [
      "Tea",
      "Warehouse"
    ],
    "pests": [
      "Die back",
      "Black rot",
      "Stored grain pests"
    ],
    "dosageRate": "750 ml; 1-2 tablets/ton",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0107",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Tajarat 50 WP",
    "registrationNo": "AP-3125",
    "registrationHolder": "Tajarat Agro Industries Limited",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Seedling rot"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0361",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Tazazeb 80 WP",
    "registrationNo": "AP-2141",
    "registrationHolder": "R K Agro Products Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot"
    ],
    "dosageRate": "2.00 Kg",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0284",
    "type": "Fungicide",
    "commonName": "Iprodione",
    "tradeName": "Telus 50 WP",
    "registrationNo": "AP-2543",
    "registrationHolder": "Anika Agro Chemicals",
    "crops": [
      "Mustard"
    ],
    "pests": [
      "Alternaria blight"
    ],
    "dosageRate": "1 gm/litre of water",
    "moaCode": "FRAC 2",
    "moaGroup": "Dicarboximides (MAP/Histidine-kinase)",
    "resistanceRisk": "Medium to High",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia",
      "Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction",
      "Avoid ingestion and dermal contact; use chemical-proof gloves"
    ],
    "rotationNotes": "Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03."
  },
  {
    "id": "fung-0416",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Tencozeb 80 WP",
    "registrationNo": "AP-2493",
    "registrationHolder": "West Agro Chemicals Industries",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0590",
    "type": "Fungicide",
    "commonName": "Sulfur (80%)",
    "tradeName": "Thiovit 80 WG",
    "registrationNo": "AP-210",
    "registrationHolder": "Syngenta Bangladesh Limited",
    "crops": [
      "Jute",
      "Cotton",
      "Vegetables",
      "Betel vine",
      "Tea",
      "Potato",
      "Mango",
      "Tomato",
      "Chili",
      "Rice"
    ],
    "pests": [
      "Jute hairy caterpillar (Spilosoma obliqua)",
      "Spotted bollworm",
      "Diamondback moth",
      "Yellow mite",
      "Powdery mildew",
      "Red spider mite",
      "Late blight",
      "Brown spot"
    ],
    "dosageRate": "1.0 L/ha (1.5 ml/L water)",
    "moaCode": "FRAC M02 / IRAC UN",
    "moaGroup": "Inorganic sulfur (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Cost-effective contact pyrethroid for jute caterpillars",
      "Wear rubber gloves and boots"
    ],
    "rotationNotes": "Alternate with Cartap (14) or Bacillus thuringiensis"
  },
  {
    "id": "fung-0526",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Tilt 250 EC",
    "registrationNo": "AP-177",
    "registrationHolder": "Syngenta Bangladesh Limited",
    "crops": [
      "Rice",
      "Potato",
      "Onion",
      "Wheat",
      "Tea",
      "Banana"
    ],
    "pests": [
      "Broad leaf and Sedge weeds",
      "Chenopodium",
      "Echinochloa",
      "Sheath blight",
      "Leaf blight",
      "Red rust",
      "Die-back",
      "Black rot",
      "Sigatoka",
      "Sheath rot"
    ],
    "dosageRate": "1.00 - 2.00 Litre/ha",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 60,
    "reiHours": 24,
    "waterVolumeLPerHa": 400,
    "safetyNotes": [
      "Creates chemical barrier layer on soil and water surface",
      "Do not disturb soil surface after application"
    ],
    "rotationNotes": "Alternate with Pretilachlor in transplanted rice"
  },
  {
    "id": "fun-0588",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Tilt 250 EC",
    "registrationNo": "AP-172",
    "registrationHolder": "Syngenta Bangladesh Limited",
    "crops": [
      "Wheat",
      "Rice",
      "Chili",
      "Guava",
      "Banana",
      "Mango",
      "Citrus",
      "Betel leaf"
    ],
    "pests": [
      "Leaf rust",
      "Sheath blight",
      "Anthracnose",
      "Sigatoka",
      "Powdery mildew",
      "Die back",
      "Leaf spot"
    ],
    "dosageRate": "0.5 - 1 ml/Litre of water (560 ml - 1.00 L/ha)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI-fungicides (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "EC",
    "phiDays": 21,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High systemic acropetal movement",
      "Skin and eye irritant",
      "Avoid spraying in midday heat"
    ],
    "rotationNotes": "Rotate with Strobilurins (FRAC 11) or Multi-site protectors (FRAC M03)"
  },
  {
    "id": "fun-0589",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Tilt 250 EC / Banner 25 EC",
    "registrationNo": "AP-620",
    "registrationHolder": "Syngenta Bangladesh Ltd",
    "crops": [
      "Rice",
      "Wheat",
      "Tea",
      "Groundnut"
    ],
    "pests": [
      "Sheath blight",
      "Wheat leaf rust (Puccinia)",
      "Karnal bunt",
      "Blister blight"
    ],
    "dosageRate": "500 ml/ha (1.0 ml/L water)",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazole)",
    "resistanceRisk": "Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High vapor activity redistributes chemical inside dense crop canopies",
      "Wear eye goggles when measuring concentrate"
    ],
    "rotationNotes": "Rotate with Mancozeb (M03) or Azoxystrobin (11)"
  },
  {
    "id": "fung-0198",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Titan 5 EC",
    "registrationNo": "AP-895",
    "registrationHolder": "Larsen Chemical Industries (Pvt) Ltd",
    "crops": [
      "Tea",
      "Rice",
      "Ground nut",
      "Mango",
      "Banana"
    ],
    "pests": [
      "Red rust",
      "Sheath blight",
      "Tikka disease",
      "Anthracnose",
      "Sigatoka"
    ],
    "dosageRate": "500 ml; 1.00 Litre; 1 m/litre of water; 1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0584",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Titom 250 EC",
    "registrationNo": "AP-1729",
    "registrationHolder": "Delta Agro Chemicals",
    "crops": [
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Leaf blight",
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0074",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Tolper 50 WP",
    "registrationNo": "AP-2123",
    "registrationHolder": "Meghna Fertilizer & Agro Chemicals Indus",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Seedling rot"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0542",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Topcon 25 EC",
    "registrationNo": "AP-1234",
    "registrationHolder": "Top Agro Enterprise",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0148",
    "type": "Fungicide",
    "commonName": "Copper oxychloride",
    "tradeName": "Topgun 50 DF",
    "registrationNo": "AP-974",
    "registrationHolder": "Global Agrochemicals Limited",
    "crops": [
      "Potato and Tomato"
    ],
    "pests": [
      "Early & Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "DF",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases",
      "Maintain uniform suspension with continuous spray agitation",
      "Corrosive to metal equipment; clean sprayers thoroughly after use"
    ],
    "rotationNotes": "No resistance issues. Ideal for disease suppression and resistance stewardship."
  },
  {
    "id": "fung-0496",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Topmil 72 WP",
    "registrationNo": "AP-1243",
    "registrationHolder": "Top Agro Enterprise",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fun-0596",
    "type": "Fungicide",
    "commonName": "Thiophanate-Methyl",
    "tradeName": "Topsin-M 70 WP / Roko 70 WP",
    "registrationNo": "AP-310",
    "registrationHolder": "Nippon Soda / Shetu Pesticides Ltd",
    "crops": [
      "Rice",
      "Vegetables",
      "Apple",
      "Papaya"
    ],
    "pests": [
      "Rice blast",
      "Powdery mildew",
      "Anthracnose",
      "Collar rot"
    ],
    "dosageRate": "1.0 kg/ha (1.5 g/L water)",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl benzimidazole carbamate precursor)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Metabolizes into carbendazim inside the target fungal pathogen",
      "Fast wound healing action on pruning cuts"
    ],
    "rotationNotes": "Follow with Mancozeb (M03) or Copper (M01)"
  },
  {
    "id": "fung-0113",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Topzim 50 WP",
    "registrationNo": "AP-3131",
    "registrationHolder": "Kohinoor Agro Chemical",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Anthracnose"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0051",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Towin 50 WP",
    "registrationNo": "AP-1677",
    "registrationHolder": "Marshal Agrovet Chemical Industries Ltd",
    "crops": [
      "Chili",
      "Tea"
    ],
    "pests": [
      "Anthracnose",
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "1 gm/litre of water; 750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0601",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Tricore 75 WP",
    "registrationNo": "AP-1075",
    "registrationHolder": "MAP Agro Industries Limited",
    "crops": [
      "Tomato",
      "Potato",
      "Rice"
    ],
    "pests": [
      "Early & Late blight",
      "Blast disease"
    ],
    "dosageRate": "2 gm/litre of water (2.00 Kg/ha)",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WG",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic acropetal transport into new growth",
      "Do not apply curatively when foliage blight exceeds 5%"
    ],
    "rotationNotes": "Never exceed 2-3 sprays per season. Alternate with Dimethomorph or Cymoxanil"
  },
  {
    "id": "fung-0603",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Trifol 75 WP",
    "registrationNo": "AP-1138",
    "registrationHolder": "Sinochem Bangladesh (Pvt) Limited",
    "crops": [
      "Potato",
      "Cotton",
      "Tea",
      "Rice"
    ],
    "pests": [
      "Aphid",
      "Jassid",
      "White fly",
      "Termite",
      "Cutworm",
      "Blast disease"
    ],
    "dosageRate": "1 - 2 ml/Litre of water (600 ml - 4.00 L/ha)",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "EC",
    "phiDays": 21,
    "reiHours": 48,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High knockdown plus long residual; strong vapor action",
      "Wear complete PPE: coveralls, respirator, chemical gloves",
      "Keep clear of fish farming areas"
    ],
    "rotationNotes": "Use as emergency knockdown; alternate with Diamides (28) or Spinosad (5)"
  },
  {
    "id": "fung-0612",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Trisole 75 WP",
    "registrationNo": "AP-1878",
    "registrationHolder": "Asia Trade International",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  },
  {
    "id": "fung-0043",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Trizim 50 WP",
    "registrationNo": "AP-1309",
    "registrationHolder": "Amco Agricultural Industries",
    "crops": [
      "Tea",
      "Chili"
    ],
    "pests": [
      "Red rust disease",
      "Anthracnose"
    ],
    "dosageRate": "750 gm; 2 gm/litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0600",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Trooper 75 WP",
    "registrationNo": "AP-604",
    "registrationHolder": "A-Intraco (Bangladesh) Limited",
    "crops": [
      "Rice",
      "Banana",
      "Mango"
    ],
    "pests": [
      "Neck blast",
      "Leaf blast",
      "Sigatoka",
      "Anthracnose",
      "Blast disease"
    ],
    "dosageRate": "400 gm/ha (2 - 3 gm/Litre of water)",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 21,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Specialized blast fungicide; blocks appressorium penetration into leaf epidermis",
      "Preventative spray at panicle emergence is essential"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (6) or Kasugamycin (24)"
  },
  {
    "id": "fun-0604",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Trooper 75 WP",
    "registrationNo": "AP-985",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Rice",
      "Banana",
      "Mango"
    ],
    "pests": [
      "Neck blast",
      "Leaf blast",
      "Sigatoka",
      "Anthracnose"
    ],
    "dosageRate": "400 gm/ha (2 - 3 gm/Litre of water)",
    "moaCode": "FRAC 16.1",
    "moaGroup": "Melanin Biosynthesis Inhibitor (MBI-R)",
    "resistanceRisk": "Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 21,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Specialized blast fungicide; blocks appressorium penetration into leaf epidermis",
      "Preventative spray at panicle emergence is essential"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (6) or Kasugamycin (24)"
  },
  {
    "id": "fun-0605",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Trooper 75 WP / Beam 75 WP",
    "registrationNo": "AP-1190",
    "registrationHolder": "Corteva Agriscience / Auto Crop Care Ltd",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Rice blast (Pyricularia oryzae) - Leaf blast, Neck blast, Node blast"
    ],
    "dosageRate": "400 g/ha (0.8 g/L water)",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin biosynthesis inhibitors - Reductase)",
    "resistanceRisk": "Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 21,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "The benchmark systemic blast prophylactic in Asian rice cultivation",
      "Inhibits melanin synthesis preventing appressorium penetration through rice epidermis"
    ],
    "rotationNotes": "Alternate with Isoprothiolane (6) or Kasugamycin (24)"
  },
  {
    "id": "fung-0059",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Turbo 50 WP",
    "registrationNo": "AP-1846",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0176",
    "type": "Fungicide",
    "commonName": "Propiconazole (15%)",
    "tradeName": "Two Zole 30 SC",
    "registrationNo": "AP-3079",
    "registrationHolder": "East West Crop Science Limited",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "SC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases",
      "Interferes with fungal ergosterol production leading to cell wall breakdown",
      "Wear standard protective gloves and protective goggles"
    ],
    "rotationNotes": "Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7)."
  },
  {
    "id": "fung-0336",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Tyzeb 80 WP",
    "registrationNo": "AP-1631",
    "registrationHolder": "Sweet Agrovet Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0447",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Tyzeb Gold 75 WP",
    "registrationNo": "AP-2168",
    "registrationHolder": "Sweet Agrovet Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0261",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Unihexa 5 EC",
    "registrationNo": "AP-3229",
    "registrationHolder": "Unicrop Protection Limited",
    "crops": [
      "Cucumber"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0439",
    "type": "Fungicide",
    "commonName": "Mancozeb (63%) + Carbendazim (12%)",
    "tradeName": "Unisaaf 75 WP",
    "registrationNo": "AP-1021",
    "registrationHolder": "United Phosphorus (Bangladesh) Ltd",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "1.00 Kg",
    "moaCode": "FRAC M03 + 1",
    "moaGroup": "Multi-site contact + MBC",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Widely used dual-action fungicide combining systemic curative reach with contact exterior shield",
      "Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off",
      "Ensure complete foliar coverage on upper and lower leaf surfaces"
    ],
    "rotationNotes": "Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11)."
  },
  {
    "id": "fung-0406",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Unizeb 80 WP",
    "registrationNo": "AP-2483",
    "registrationHolder": "Unifarma (Bangladesh) Industries",
    "crops": [
      "Tomato"
    ],
    "pests": [
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0068",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "UniZoom 50 WP",
    "registrationNo": "AP-1930",
    "registrationHolder": "United Phosphorus (Bangladesh) Ltd",
    "crops": [
      "Maize"
    ],
    "pests": [
      "Brown spot"
    ],
    "dosageRate": "1 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0314",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Uthane 80 WP",
    "registrationNo": "AP-785",
    "registrationHolder": "United Phosphorus (Bangladesh) Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0614",
    "type": "Fungicide",
    "commonName": "Validamycin",
    "tradeName": "Validacin 3 L",
    "registrationNo": "AP-440",
    "registrationHolder": "Auto Crop Care Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 26",
    "moaGroup": "Glucopyranosyl antibiotic (Trehalase inhibitor)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Biological antibiotic fungicide specifically targeting Rhizoctonia solani (Sheath blight)",
      "Inhibits trehalase enzyme, starving hyphae and stopping lesion progression",
      "Environmentally benign, safe to predatory insects, spiders, and fish at labeled rates"
    ],
    "rotationNotes": "Rotate with Hexaconazole (FRAC 3) or Azoxystrobin (FRAC 11) for comprehensive sheath blight management."
  },
  {
    "id": "fun-0616",
    "type": "Fungicide",
    "commonName": "Validamycin",
    "tradeName": "Validacin 3 L / Sheathmar 3 L",
    "registrationNo": "AP-390",
    "registrationHolder": "Sumitomo Chemical / Shetu Pesticides Ltd",
    "crops": [
      "Rice",
      "Potato",
      "Vegetables"
    ],
    "pests": [
      "Sheath blight (Rhizoctonia solani)",
      "Black scurf",
      "Damping-off"
    ],
    "dosageRate": "1.25 L/ha (2.5 ml/L water)",
    "moaCode": "FRAC 26",
    "moaGroup": "Glucopyranosyl antibiotic (Trehalase inhibitor)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SL",
    "phiDays": 14,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Naturally produced by Streptomyces hygroscopicus var. limoneus",
      "Arrests hyphal branching of Rhizoctonia with very low environmental toxicity"
    ],
    "rotationNotes": "Alternate with Hexaconazole (FRAC 3) or Thifluzamide (FRAC 7)"
  },
  {
    "id": "fung-0169",
    "type": "Fungicide",
    "commonName": "Difenoconazole",
    "tradeName": "Venga 10 WDG",
    "registrationNo": "AP-2786",
    "registrationHolder": "Active Crop Care Limited",
    "crops": [
      "Banana"
    ],
    "pests": [
      "Sigatoka"
    ],
    "dosageRate": "1gm/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Demethylation inhibitor - Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WDG",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "High-potency systemic triazole providing preventive and curative control of blast, sheath blight, and leaf spots",
      "Inhibits fungal ergosterol biosynthesis at the C14-demethylase enzyme",
      "Toxic to aquatic organisms; maintain strict aquatic buffer distances"
    ],
    "rotationNotes": "Maximum 3 applications per season. Alternate with FRAC 11 (QoI) or FRAC M03."
  },
  {
    "id": "fung-0237",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Visha 5 EC",
    "registrationNo": "AP-2497",
    "registrationHolder": "Nidus Agro",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die-back",
      "Black rot"
    ],
    "dosageRate": "750 ml in 1000 lt of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0129",
    "type": "Fungicide",
    "commonName": "Carboxin (17.5%) + Thiram (17.5%)",
    "tradeName": "VitaFlo 200 FF",
    "registrationNo": "AP-1611",
    "registrationHolder": "Hossain Enterprise C.C. Limited",
    "crops": [
      "Jute",
      "Wheat",
      "Rice"
    ],
    "pests": [
      "Seed rot",
      "Black bend",
      "Die back",
      "Seedling blight",
      "Foot rot",
      "Seed treatment"
    ],
    "dosageRate": "2.5-3 ml/kg seed; 5 ml/kg seed",
    "moaCode": "FRAC 7 + M03",
    "moaGroup": "SDHI (Succinate dehydrogenase) + Dithiocarbamate",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Premium seed dresser for wheat loose smut, rice seedling blight, and collar rot",
      "Systemic SDHI penetrates embryo while Thiram shields seed surface against soil-borne fungi",
      "Treated seed must not be used for food, feed, or oil extraction"
    ],
    "rotationNotes": "Primary seed treatment; follow in-crop with foliar fungicides from different MoA groups."
  },
  {
    "id": "fung-0482",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Vitamyl 72 MZ",
    "registrationNo": "AP-445",
    "registrationHolder": "Shetu Pesticides Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0424",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Vizeb 80 WP",
    "registrationNo": "AP-3098",
    "registrationHolder": "Green View Bangladesh",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Early blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0307",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Vondozeb 42 SC",
    "registrationNo": "AP-608",
    "registrationHolder": "Naafco (Private) Limited",
    "crops": [
      "Banana",
      "Potato"
    ],
    "pests": [
      "Sigatoka",
      "Late blight"
    ],
    "dosageRate": "3 ml litre of water; 2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0019",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Vulcan 50 WP",
    "registrationNo": "AP-730",
    "registrationHolder": "Atherton Imbros Company Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "1.00 Kg",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0136",
    "type": "Fungicide",
    "commonName": "Copper hydroxide",
    "tradeName": "Win 77 WP",
    "registrationNo": "AP-1119",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Tomato",
      "Potato"
    ],
    "pests": [
      "Early & Late blight",
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M01",
    "moaGroup": "Inorganic copper (Multi-site)",
    "resistanceRisk": "Low",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Bactericide and contact fungicide with multi-site protein denaturation by cupric ions",
      "Effective against bacterial leaf blight, citrus canker, and downy mildews",
      "Do not tank-mix with strongly acidic compounds or Fosetyl-Al"
    ],
    "rotationNotes": "Low resistance risk. Alternate with biologicals (FRAC BM02) or dithiocarbamates (M03)."
  },
  {
    "id": "fung-0248",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Winzole 10 EC",
    "registrationNo": "AP-2782",
    "registrationHolder": "A R Khan & Co.",
    "crops": [
      "Mango"
    ],
    "pests": [
      "Powdery mildew",
      "Anthracnose"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0521",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "X-Mil 72 WP",
    "registrationNo": "AP-2175",
    "registrationHolder": "Crop Life Agro Chemicals Ltd",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0170",
    "type": "Fungicide",
    "commonName": "Difenoconazole (15%)",
    "tradeName": "X-Tra Care 300 EC",
    "registrationNo": "AP-1773",
    "registrationHolder": "Haychem (Bangladesh) Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Sheath blight"
    ],
    "dosageRate": "120 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazole systemic)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic curative triazole targeting fungal ergosterol pathway",
      "Effective across vegetables, rice, and orchard fruit spots",
      "Wear protective gloves and avoid contact with skin and eyes"
    ],
    "rotationNotes": "Alternate with non-DMI fungicides (FRAC 11, FRAC M03, FRAC 7)."
  },
  {
    "id": "fung-0072",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Xenon 50 WP",
    "registrationNo": "AP-2121",
    "registrationHolder": "Joary Agro",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Black rot",
      "Die back"
    ],
    "dosageRate": "750 gm in 1000 lt of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0200",
    "type": "Fungicide",
    "commonName": "Hexaconazole",
    "tradeName": "Xentho 5 EC",
    "registrationNo": "AP-978",
    "registrationHolder": "SAMP Limited",
    "crops": [
      "Garden pea"
    ],
    "pests": [
      "Powdery mildew"
    ],
    "dosageRate": "1 ml/Litre of water",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic triazole with protective, curative, and antisporulant properties",
      "Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose",
      "Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03)."
  },
  {
    "id": "fung-0469",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Cymoxanil (8%)",
    "tradeName": "Xtramil 720 WP",
    "registrationNo": "AP-1885",
    "registrationHolder": "ACI Formulations Limited",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 27",
    "moaGroup": "Dithiocarbamate + Cyanoacetamide-oxime",
    "resistanceRisk": "Medium",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Penetrating curative and contact protectant designed specifically for potato late blight",
      "Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores",
      "Apply at first sign of blight weather or disease warnings"
    ],
    "rotationNotes": "Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43)."
  },
  {
    "id": "fung-0335",
    "type": "Fungicide",
    "commonName": "Mancozeb",
    "tradeName": "Y-thene M 45",
    "registrationNo": "AP-1626",
    "registrationHolder": "Marshal Agrovet Chemical Industries Ltd",
    "crops": [
      "Potato",
      "Tomato"
    ],
    "pests": [
      "Late blight",
      "Alternaria blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "EC",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Multi-site contact protectant containing zinc and manganese micronutrients",
      "Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes",
      "Do not inhale dust during mixing; wear dust mask and wash hands before eating"
    ],
    "rotationNotes": "No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics."
  },
  {
    "id": "fung-0522",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Z-Mil 72 WP",
    "registrationNo": "AP-2176",
    "registrationHolder": "Modern Agro Care",
    "crops": [
      "Potato"
    ],
    "pests": [
      "Late blight"
    ],
    "dosageRate": "2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0115",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Zamka 50 WP",
    "registrationNo": "AP-3133",
    "registrationHolder": "Modern Agri Care",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust",
      "Die back",
      "Black rot"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0481",
    "type": "Fungicide",
    "commonName": "Mancozeb (64%) + Metalaxyl (8%)",
    "tradeName": "Zhe Metalex 72 WP",
    "registrationNo": "AP-412",
    "registrationHolder": "Sea Trade Fertilizer Limited",
    "crops": [
      "Tomato",
      "Potato",
      "Mango"
    ],
    "pests": [
      "Late blight",
      "Anthracnose"
    ],
    "dosageRate": "2.00 Kg; 2 gm/Litre of water",
    "moaCode": "FRAC M03 + 4",
    "moaGroup": "Dithiocarbamate + PA (Phenylamide)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "WP",
    "phiDays": 7,
    "reiHours": 12,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Gold standard combination for late blight, downy mildew, and phytophthora rot",
      "Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots",
      "Prevent resistance by limiting to 2-3 applications per crop season"
    ],
    "rotationNotes": "Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21)."
  },
  {
    "id": "fung-0541",
    "type": "Fungicide",
    "commonName": "Propiconazole",
    "tradeName": "Zilt 25 EC",
    "registrationNo": "AP-1227",
    "registrationHolder": "Prime Agro Limited",
    "crops": [
      "Banana",
      "Rice",
      "Wheat"
    ],
    "pests": [
      "Sigatoka",
      "Sheath blight",
      "Leaf blight"
    ],
    "dosageRate": "500 ml",
    "moaCode": "FRAC 3",
    "moaGroup": "DMI (Triazoles)",
    "resistanceRisk": "Medium",
    "toxicityClass": "III - Slightly Hazardous",
    "whoColor": "#3b82f6",
    "formulation": "EC",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals",
      "Rapid absorption within 1 hour; exhibits strong acropetal translocation",
      "Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations"
    ],
    "rotationNotes": "Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season."
  },
  {
    "id": "fung-0616",
    "type": "Fungicide",
    "commonName": "Zineb",
    "tradeName": "Ziman 80 WP",
    "registrationNo": "AP-1120",
    "registrationHolder": "Alpha Agro Limited",
    "crops": [
      "Cotton",
      "Mustard",
      "Tea",
      "Brinjal",
      "Chilli",
      "Tomato"
    ],
    "pests": [
      "Aphids (Lipaphis erysimi)",
      "Jassids",
      "Whitefly",
      "Thrips",
      "Mealybug",
      "Late blight"
    ],
    "dosageRate": "125 g/ha (0.25 g/L water)",
    "moaCode": "FRAC M03",
    "moaGroup": "Dithiocarbamates (Multi-site contact)",
    "resistanceRisk": "Low",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "SP",
    "phiDays": 7,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Rapid translaminar action with excellent contact activity",
      "Do not spray when honeybees are pollinating mustard flowers"
    ],
    "rotationNotes": "Rotate with Sulfoxaflor (4C) or Flonicamid (29)"
  },
  {
    "id": "fung-0031",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Zimguard 50 WP",
    "registrationNo": "AP-992",
    "registrationHolder": "Padma Agro Sprayers Co.",
    "crops": [
      "Tea"
    ],
    "pests": [
      "Red rust"
    ],
    "dosageRate": "750 gm",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0017",
    "type": "Fungicide",
    "commonName": "Carbendazim",
    "tradeName": "Zimper 50 WP",
    "registrationNo": "AP-725",
    "registrationHolder": "Prime Agro Limited",
    "crops": [
      "Banana",
      "Tomato",
      "Rice",
      "Sugarcane",
      "Tea"
    ],
    "pests": [
      "Sigatoka",
      "Wilt",
      "Sheath blight",
      "Set rot",
      "Red rust disease"
    ],
    "dosageRate": "2 gm/Litre of water; 1.00 Kg; 1 gm/Litre of water; 750 gm/Litre of water",
    "moaCode": "FRAC 1",
    "moaGroup": "MBC (Methyl Benzimidazole Carbamates)",
    "resistanceRisk": "High",
    "toxicityClass": "U - Unlikely to Present Hazard",
    "whoColor": "#10b981",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 800,
    "safetyNotes": [
      "Systemic fungicide inhibiting beta-tubulin polymerization during cell division",
      "High cross-resistance risk within all MBC fungicides",
      "Wear protective gloves and avoid breathing spray mist"
    ],
    "rotationNotes": "Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01)."
  },
  {
    "id": "fung-0606",
    "type": "Fungicide",
    "commonName": "Tricyclazole",
    "tradeName": "Zole 75 WP",
    "registrationNo": "AP-1612",
    "registrationHolder": "Atherton Imbros Company Limited",
    "crops": [
      "Rice"
    ],
    "pests": [
      "Blast disease"
    ],
    "dosageRate": "400 gm",
    "moaCode": "FRAC 16.1",
    "moaGroup": "MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)",
    "resistanceRisk": "Low to Medium",
    "toxicityClass": "II - Moderately Hazardous",
    "whoColor": "#eab308",
    "formulation": "WP",
    "phiDays": 14,
    "reiHours": 24,
    "waterVolumeLPerHa": 500,
    "safetyNotes": [
      "Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)",
      "Inhibits fungal appressorium melanization, preventing mechanical leaf penetration",
      "Must be applied preventatively before neck blast emergence (at booting / early heading stage)"
    ],
    "rotationNotes": "Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11)."
  }
];
