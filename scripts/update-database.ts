import fs from 'fs';
import path from 'path';
import { PESTICIDES_DATABASE as EXISTING_DB } from '../src/data/pesticidesData';
import { ChemicalProduct } from '../src/types';

// Comprehensive MoA Intelligence Mapping for Bangladesh Agricultural Extension Registry
const MOA_INTEL: Record<string, {
  moaCode: string;
  moaGroup: string;
  resistanceRisk: 'Low' | 'Medium' | 'High' | 'Low to Medium' | 'Medium to High' | 'Unknown';
  toxicityClass: 'Ia - Extremely Hazardous' | 'Ib - Highly Hazardous' | 'II - Moderately Hazardous' | 'III - Slightly Hazardous' | 'U - Unlikely to Present Hazard';
  whoColor: string;
  targetSite?: string;
  defaultSafety: string[];
  rotationStrategy: string;
}> = {
  // MITICIDES
  'Bromopropylate': {
    moaCode: 'IRAC UN',
    moaGroup: 'Benzilate (Unknown / Non-specific)',
    resistanceRisk: 'Low',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Contact acaricide with residual action on mite nymphs and adults', 'Toxic to aquatic organisms; avoid contamination of water bodies', 'Wear protective clothing, gloves, and eye protection during spraying'],
    rotationStrategy: 'Rotate with Hexythiazox (IRAC 10A) or Propargite (IRAC 12C) to preserve miticide sensitivity.'
  },
  'Ethion': {
    moaCode: 'IRAC 1B',
    moaGroup: 'Organophosphates (AChE inhibitor)',
    resistanceRisk: 'High',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Cholinesterase inhibitor; antidote is Atropine sulfate accompanied by PAM under medical supervision', 'Highly toxic to bees and freshwater fish; do not apply during active crop bloom', 'Wear full personal protective equipment including respirator and nitrile gloves'],
    rotationStrategy: 'High resistance risk. Rotate outside Group 1 to Propargite (12C), Hexythiazox (10A), or Sulphur (UN).'
  },
  'Fenpropathrin': {
    moaCode: 'IRAC 3A',
    moaGroup: 'Pyrethroids (Sodium channel modulator)',
    resistanceRisk: 'High',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Neurotoxin with fast knockdown on adult mites and chewing pests', 'Extremely hazardous to fish and aquatic invertebrates; establish a 15-meter buffer zone', 'May cause facial paresthesia upon direct skin contact; wash immediately with soap and water'],
    rotationStrategy: 'Strictly limit to 1 application per cycle; rotate with non-pyrethroid miticides (IRAC 10A, 12C).'
  },
  'Hexythiazox': {
    moaCode: 'IRAC 10A',
    moaGroup: 'Hexythiazox (Growth inhibitor - chitin biosynthesis)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Ovicidal and larvicidal mite growth regulator with prolonged residual control', 'Relatively safe for beneficial predatory mites and honeybees when dry', 'Apply at first appearance of eggs or young protonymphs for maximum efficacy'],
    rotationStrategy: 'Apply once per season at early mite emergence; rotate with adulticides (IRAC 12C or IRAC 6).'
  },
  'Hexathazox': {
    moaCode: 'IRAC 10A',
    moaGroup: 'Hexythiazox (Growth inhibitor - chitin biosynthesis)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Mite growth regulator targeting eggs and larval stages', 'Low hazard to non-target predatory mites and pollinators', 'Use appropriate protective gear and avoid drift'],
    rotationStrategy: 'Rotate with adulticidal miticides (IRAC 12C, IRAC UN).'
  },
  'Propargite': {
    moaCode: 'IRAC 12C',
    moaGroup: 'Organosulfur (Inhibitor of oxidative phosphorylation)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Contact miticide with vapor action; highly effective against motile forms of red spider mites', 'Skin and eye irritant; wear face shield and chemical-resistant protective gear', 'Do not combine with alkaline substances or solvent oils'],
    rotationStrategy: 'Alternate with Hexythiazox (10A) or Sulphur (UN) to break generation cycles.'
  },
  'Propergite': {
    moaCode: 'IRAC 12C',
    moaGroup: 'Organosulfur (Inhibitor of oxidative phosphorylation)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Contact miticide with vapor action against nymphs and adult spider mites', 'Avoid skin and eye exposure; wear protective goggles and gloves', 'Toxic to aquatic invertebrates; avoid runoff'],
    rotationStrategy: 'Alternate with Hexythiazox (10A) or Sulphur (UN).'
  },
  'Sulphur': {
    moaCode: 'FRAC M02 / IRAC UN',
    moaGroup: 'Inorganic sulfur (Multi-site contact)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Dual-action protectant fungicide and miticide with multi-site contact action', 'Do not apply when ambient temperatures exceed 32°C to prevent crop scorch / phytotoxicity', 'Do not mix with mineral oils or apply within 21 days of an oil spray'],
    rotationStrategy: 'Zero known resistance development. Cornerstone resistance-management partner for systemic fungicides and miticides.'
  },
  'Sulfur (80%)': {
    moaCode: 'FRAC M02 / IRAC UN',
    moaGroup: 'Inorganic sulfur (Multi-site contact)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Multi-site contact protectant for powdery mildew and red spider mites', 'Avoid high heat applications (>32°C) to prevent leaf scorching', 'Do not mix with petroleum or emulsified oils'],
    rotationStrategy: 'Ideal low-risk rotational partner across all crop stages.'
  },

  // FUNGICIDES
  'Azoxystrobin': {
    moaCode: 'FRAC 11',
    moaGroup: 'QoI (Quinone outside Inhibitor - Strobilurins)',
    resistanceRisk: 'High',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Broad-spectrum systemic and translaminar strobilurin fungicide with greening physiological effect', 'High intrinsic resistance risk through cytochrome b (G143A) mutation', 'Wear standard gloves, protective footwear, and eye protection during spray prep'],
    rotationStrategy: 'Strictly limit to 2 applications per season. Alternate with FRAC 3 (Triazoles) or FRAC M03 (Mancozeb).'
  },
  'Azoxystrobin (20% ) + Cyproconazole (8%)': {
    moaCode: 'FRAC 11 + 3',
    moaGroup: 'QoI + DMI (Strobilurin + Triazole)',
    resistanceRisk: 'Medium to High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Dual-action combination providing preventive, curative, and eradicant control', 'Protects against sheath blight, leaf blast, and rust diseases with built-in resistance buffering', 'Toxic to fish; do not drain treated paddy water into communal aquaculture channels'],
    rotationStrategy: 'Maximum 2 sprays per cycle. Follow with multi-site contact protectants like Mancozeb (FRAC M03).'
  },
  'Azoxystrobin (20% ) + Difenoconazole (12.5%)': {
    moaCode: 'FRAC 11 + 3',
    moaGroup: 'QoI + DMI (Strobilurin + Triazole)',
    resistanceRisk: 'Medium to High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Synergistic systemic mixture for sheath blight, dirty panicle, and blast in rice and vegetable anthracnose', 'Rapid translaminar uptake within 2 hours; rainfast once dry', 'Wear rubber gloves and mask during spray preparation'],
    rotationStrategy: 'Rotate with SDHI (FRAC 7) or contact dithiocarbamates (FRAC M03).'
  },
  'Benalaxyl (8%) + Mancozeb (64%)': {
    moaCode: 'FRAC 4 + M03',
    moaGroup: 'PA (Phenylamide) + Multi-site contact',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Systemic phenylamide combined with broad-spectrum protectant for oomycete diseases (Late blight, Downy mildew)', 'Benalaxyl inhibits fungal RNA polymerase I while Mancozeb prevents multi-enzyme spore germination', 'Wash thoroughly after use and store in a sealed, moisture-proof container'],
    rotationStrategy: 'Limit to 2-3 preventive applications during blight risk periods; alternate with CAA (FRAC 40) or Copper (FRAC M01).'
  },
  'Carbendazim': {
    moaCode: 'FRAC 1',
    moaGroup: 'MBC (Methyl Benzimidazole Carbamates)',
    resistanceRisk: 'High',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Systemic fungicide inhibiting beta-tubulin polymerization during cell division', 'High cross-resistance risk within all MBC fungicides', 'Wear protective gloves and avoid breathing spray mist'],
    rotationStrategy: 'Never apply consecutively. Must be tank-mixed or alternated with multi-site contact fungicides (M03, M01).'
  },
  'Carbendazim ( 32.5%) + Hexaconazole (2.5%)': {
    moaCode: 'FRAC 1 + 3',
    moaGroup: 'MBC + DMI (Benzimidazole + Triazole)',
    resistanceRisk: 'High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Dual-systemic fungicide targeting fungal mitosis and sterol biosynthesis simultaneously', 'Curative and preventive for sheath blight, stem rot, and tikka leaf spot', 'Wear standard PPE and avoid spraying during high wind'],
    rotationStrategy: 'Rotate with QoI (FRAC 11) or contact protectants (FRAC M05, M03).'
  },
  'Carbendazim (17.5%)+Iprodione (35%)': {
    moaCode: 'FRAC 1 + 2',
    moaGroup: 'MBC + Dicarboximide',
    resistanceRisk: 'High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Synergistic combination for Botrytis, Alternaria leaf spot, and stem rot', 'Curative and translaminar systemic action', 'Wear gloves, long sleeves, and safety glasses'],
    rotationStrategy: 'Rotate with multi-site protectants (FRAC M03) or triazoles (FRAC 3).'
  },
  'Carboxin (17.5%) + Thiram (17.5%)': {
    moaCode: 'FRAC 7 + M03',
    moaGroup: 'SDHI (Succinate dehydrogenase) + Dithiocarbamate',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Premium seed dresser for wheat loose smut, rice seedling blight, and collar rot', 'Systemic SDHI penetrates embryo while Thiram shields seed surface against soil-borne fungi', 'Treated seed must not be used for food, feed, or oil extraction'],
    rotationStrategy: 'Primary seed treatment; follow in-crop with foliar fungicides from different MoA groups.'
  },
  'Chlorothalonil': {
    moaCode: 'FRAC M05',
    moaGroup: 'Multi-site contact (Chloronitriles)',
    resistanceRisk: 'Low',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Multi-site contact fungicide that deactivates glutathione and fungal cell enzymes', 'Eye irritant and potential skin sensitizer; wear chemical goggles and face shield', 'Toxic to fish and aquatic life; avoid spraying near ponds and canals'],
    rotationStrategy: 'Zero reported fungal resistance. Cornerstone mixing/rotational partner for single-site systemics.'
  },
  'Copper hydroxide': {
    moaCode: 'FRAC M01',
    moaGroup: 'Inorganic copper (Multi-site)',
    resistanceRisk: 'Low',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Bactericide and contact fungicide with multi-site protein denaturation by cupric ions', 'Effective against bacterial leaf blight, citrus canker, and downy mildews', 'Do not tank-mix with strongly acidic compounds or Fosetyl-Al'],
    rotationStrategy: 'Low resistance risk. Alternate with biologicals (FRAC BM02) or dithiocarbamates (M03).'
  },
  'Copper oxychloride': {
    moaCode: 'FRAC M01',
    moaGroup: 'Inorganic copper (Multi-site)',
    resistanceRisk: 'Low',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Inorganic copper contact protectant against fungal leaf spots, blights, and bacterial diseases', 'Maintain uniform suspension with continuous spray agitation', 'Corrosive to metal equipment; clean sprayers thoroughly after use'],
    rotationStrategy: 'No resistance issues. Ideal for disease suppression and resistance stewardship.'
  },
  'Dichloran': {
    moaCode: 'FRAC 14',
    moaGroup: 'Aromatic hydrocarbons (Lipid peroxidation)',
    resistanceRisk: 'Medium',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Targeted fungicide for Sclerotinia, Botrytis, and Rhizopus soft rots', 'Wear full protective suit and organic vapor mask during mixing', 'Observe strict harvest intervals for root crops and fruits'],
    rotationStrategy: 'Alternate with dicarboximides (FRAC 2) or triazoles (FRAC 3).'
  },
  'Difenoconazole': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Demethylation inhibitor - Triazoles)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['High-potency systemic triazole providing preventive and curative control of blast, sheath blight, and leaf spots', 'Inhibits fungal ergosterol biosynthesis at the C14-demethylase enzyme', 'Toxic to aquatic organisms; maintain strict aquatic buffer distances'],
    rotationStrategy: 'Maximum 3 applications per season. Alternate with FRAC 11 (QoI) or FRAC M03.'
  },
  'Difenoconazole (15%)': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Triazole systemic)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Systemic curative triazole targeting fungal ergosterol pathway', 'Effective across vegetables, rice, and orchard fruit spots', 'Wear protective gloves and avoid contact with skin and eyes'],
    rotationStrategy: 'Alternate with non-DMI fungicides (FRAC 11, FRAC M03, FRAC 7).'
  },
  'Dimethomorph (9%) + Mancozeb (60%)': {
    moaCode: 'FRAC 40 + M03',
    moaGroup: 'CAA (Cell wall biosynthesis) + Multi-site',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Curative and antisporulant action against potato late blight and cucurbit downy mildew', 'Dimethomorph disrupts phospholipid synthesis and cell wall formation in oomycetes', 'Apply early morning or late afternoon for thorough leaf coverage'],
    rotationStrategy: 'Rotate with Phenylamides (FRAC 4) or Cyazofamid (FRAC 21) to prevent CAA resistance.'
  },
  'Diniconazole': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Triazoles)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Systemic triazole with high acropetal translocation for powdery mildews and rusts', 'Ergosterol synthesis inhibitor with strong curative kickback action', 'Wear standard PPE and do not contaminate farm water supplies'],
    rotationStrategy: 'Rotate with multi-site contact fungicides (FRAC M03, M02).'
  },
  'Edifenphos': {
    moaCode: 'FRAC 20',
    moaGroup: 'Phosphorothiolates (Phospholipid biosynthesis)',
    resistanceRisk: 'Medium',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Organophosphorus fungicide highly effective for rice blast (Pyricularia oryzae)', 'Cholinesterase inhibitor; antidote is Atropine sulfate', 'Toxic to fish; strictly avoid draining water from treated paddies into fish culture'],
    rotationStrategy: 'Rotate with Tricyclazole (FRAC 16.1) or Kasugamycin (FRAC 24).'
  },
  'Epoxiconazol': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Triazoles)',
    resistanceRisk: 'Medium',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Systemic broad-spectrum triazole for cereal rusts, leaf spots, and sheath rot', 'Rapid leaf uptake and long-lasting curative protection', 'Harmful if swallowed; wear protective gloves, apron, and face mask'],
    rotationStrategy: 'Rotate with Strobilurins (FRAC 11) or SDHIs (FRAC 7).'
  },
  'Epoxiconazol (12.5%) + Carbendazim (12.5%)': {
    moaCode: 'FRAC 3 + 1',
    moaGroup: 'DMI + MBC',
    resistanceRisk: 'Medium to High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Broad-spectrum curative systemic blend controlling sheath blight and blast', 'Dual attack on fungal sterols and microtubule spindle formation', 'Wear protective eyewear and gloves during dilution'],
    rotationStrategy: 'Rotate with QoI (FRAC 11) or multi-site contact protectants.'
  },
  'Flusilazole': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Triazoles)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Potent systemic organosilicon triazole with vapor redistribution in plant canopy', 'Curative and eradicative against scab, rust, and powdery mildew', 'Wear nitrile gloves, goggles, and protective outerwear'],
    rotationStrategy: 'Limit to 2 sprays per season; alternate with multi-site contact fungicides.'
  },
  'Fusilazole': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Triazoles)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Systemic triazole with vapor redistribution for deep canopy protection', 'Ergosterol biosynthesis inhibitor with curative properties', 'Wear protective gloves and avoid inhalation'],
    rotationStrategy: 'Rotate with non-DMI fungicides (FRAC 11, M03).'
  },
  'Flusilazole (12.5%) + Carbendazim (25%)': {
    moaCode: 'FRAC 3 + 1',
    moaGroup: 'DMI + MBC',
    resistanceRisk: 'Medium to High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['High-strength dual-systemic fungicide for aggressive foliar blight and blast infections', 'Rapid upward translaminar movement into new emerging leaves', 'Avoid contact with skin, eyes, and clothing'],
    rotationStrategy: 'Rotate with QoI (FRAC 11) or contact protectants (FRAC M03, M01).'
  },
  'Fusilazole (12.5%) + Carbendazim (25%)': {
    moaCode: 'FRAC 3 + 1',
    moaGroup: 'DMI + MBC',
    resistanceRisk: 'Medium to High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Curative and preventive systemic fungicide combination', 'Dual-mode interference with fungal sterol synthesis and cell division', 'Wear PPE and do not contaminate local water sources'],
    rotationStrategy: 'Rotate with Strobilurins (FRAC 11) or Mancozeb (FRAC M03).'
  },
  'Hexaconazole': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Triazoles)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Systemic triazole with protective, curative, and antisporulant properties', 'Prime choice for rice sheath blight (Rhizoctonia solani) and mango anthracnose', 'Toxic to aquatic organisms; maintain 10-meter boundary from irrigation ditches'],
    rotationStrategy: 'Rotate with QoI (FRAC 11), SDHI (FRAC 7), or multi-site dithiocarbamates (M03).'
  },
  'Iprodione': {
    moaCode: 'FRAC 2',
    moaGroup: 'Dicarboximides (MAP/Histidine-kinase)',
    resistanceRisk: 'Medium to High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Contact and translaminar fungicide with protective and curative action against Alternaria, Botrytis, and Sclerotinia', 'Inhibits fungal DNA and lipid peroxidation via osmotic signal transduction', 'Avoid ingestion and dermal contact; use chemical-proof gloves'],
    rotationStrategy: 'Limit to 2 applications per crop cycle. Alternate with FRAC 7, FRAC 3, or FRAC M03.'
  },
  'Iprodione (35%) + Carbendazim (17.5%)': {
    moaCode: 'FRAC 2 + 1',
    moaGroup: 'Dicarboximides + MBC',
    resistanceRisk: 'High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Broad-spectrum curative and preventive blend for sheath blight, stem rot, and fruit rot', 'Dual action on tubulin polymerization and cellular signal transduction', 'Wear personal protective equipment during spray mixing and application'],
    rotationStrategy: 'Rotate with multi-site contact fungicides (FRAC M03) or triazoles (FRAC 3).'
  },
  'Iprodione  (35%) + Carbendazim (17.5%)': {
    moaCode: 'FRAC 2 + 1',
    moaGroup: 'Dicarboximides + MBC',
    resistanceRisk: 'High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Dual-systemic and contact fungicide for fruit rot, blight, and fungal rots', 'Avoid breathing mist; wear protective clothing and mask', 'Store tightly closed away from food and animal feed'],
    rotationStrategy: 'Rotate with multi-site protectants (FRAC M03) or strobilurins (FRAC 11).'
  },
  'Isoprothiolane': {
    moaCode: 'FRAC 32',
    moaGroup: 'Isoprothiolane (Thiophene carboxylate)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Systemic fungicide with specialized activity against rice blast (leaf blast, neck blast, and node blast)', 'Inhibits phospholipid biosynthesis and fatty acid methyl-transferase in Pyricularia oryzae', 'Also suppresses planthopper feeding behavior on rice stems'],
    rotationStrategy: 'Alternate with Tricyclazole (FRAC 16.1) or Kasugamycin (FRAC 24) to manage blast resistance.'
  },
  'Kasugamycin': {
    moaCode: 'FRAC 24',
    moaGroup: 'Kasugamycin (Aminoglycoside antibiotic)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Antibiotic systemic fungicide and bactericide preventing protein synthesis in fungal ribosomes', 'Safe for beneficial organisms, mammals, and aquatic species at recommended rates', 'Provides preventative and curative protection against blast and bacterial leaf diseases'],
    rotationStrategy: 'Rotate with Tricyclazole (FRAC 16.1) or Copper hydroxide (FRAC M01).'
  },
  'Mancozeb': {
    moaCode: 'FRAC M03',
    moaGroup: 'Dithiocarbamates (Multi-site contact)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Multi-site contact protectant containing zinc and manganese micronutrients', 'Inactivates essential sulfhydryl (-SH) groups in fungal respiratory enzymes', 'Do not inhale dust during mixing; wear dust mask and wash hands before eating'],
    rotationStrategy: 'No known fungal resistance after decades of global use. Ideal mixing and rotation partner for all single-site systemics.'
  },
  'Mancozeb  (12%) + Copper (30%)': {
    moaCode: 'FRAC M03 + M01',
    moaGroup: 'Dithiocarbamate + Inorganic copper',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Dual-contact protectant against fungal leaf spots, downy mildew, and bacterial blight', 'Provides multi-site enzyme inactivation without single-point target vulnerability', 'Do not tank mix with acidifying adjuvants'],
    rotationStrategy: 'Cornerstone resistance stewardship fungicide. Low resistance risk.'
  },
  'Mancozeb (45%) + Fosetyl AI (25%)': {
    moaCode: 'FRAC M03 + P07',
    moaGroup: 'Dithiocarbamate + Phosphonate host defense',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Combines broad-spectrum contact protection with systemic stimulated plant defense mechanisms', 'Fosetyl-Al moves both upward and downward (amphimobile) through xylem and phloem', 'Wear standard PPE and avoid spraying during midday peak sun'],
    rotationStrategy: 'Excellent rotational product for late blight and downy mildews.'
  },
  'Mancozeb (63%) + Carbendazim (12%)': {
    moaCode: 'FRAC M03 + 1',
    moaGroup: 'Multi-site contact + MBC',
    resistanceRisk: 'Medium',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Widely used dual-action fungicide combining systemic curative reach with contact exterior shield', 'Effective against blast, sheath rot, Tikka leaf spot, anthracnose, and damping off', 'Ensure complete foliar coverage on upper and lower leaf surfaces'],
    rotationStrategy: 'Rotate with Triazoles (FRAC 3) or Strobilurins (FRAC 11).'
  },
  'Mancozeb (64%) + Cymoxanil (8%)': {
    moaCode: 'FRAC M03 + 27',
    moaGroup: 'Dithiocarbamate + Cyanoacetamide-oxime',
    resistanceRisk: 'Medium',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Penetrating curative and contact protectant designed specifically for potato late blight', 'Cymoxanil provides 2-3 day kickback activity inside leaf tissue while Mancozeb protects new spores', 'Apply at first sign of blight weather or disease warnings'],
    rotationStrategy: 'Alternate with Dimethomorph (FRAC 40) or Fluopicolide (FRAC 43).'
  },
  'Mancozeb (64%) + Metalaxyl (8%)': {
    moaCode: 'FRAC M03 + 4',
    moaGroup: 'Dithiocarbamate + PA (Phenylamide)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Gold standard combination for late blight, downy mildew, and phytophthora rot', 'Metalaxyl provides fast systemic xylem transport to protect new un-sprayed shoots', 'Prevent resistance by limiting to 2-3 applications per crop season'],
    rotationStrategy: 'Rotate with CAA fungicides (FRAC 40) or Cyazofamid (FRAC 21).'
  },
  'Propiconazole': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Triazoles)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Potent systemic curative triazole for sheath blight, rust, and leaf blast in rice and cereals', 'Rapid absorption within 1 hour; exhibits strong acropetal translocation', 'Toxic to fish; do not apply near open water bodies or fish-cum-paddy operations'],
    rotationStrategy: 'Rotate with QoI (FRAC 11) or Mancozeb (FRAC M03). Limit to 2 sprays per season.'
  },
  'Propiconazole (15%)': {
    moaCode: 'FRAC 3',
    moaGroup: 'DMI (Triazoles)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Systemic broad-spectrum triazole controlling rusts, blights, and spot diseases', 'Interferes with fungal ergosterol production leading to cell wall breakdown', 'Wear standard protective gloves and protective goggles'],
    rotationStrategy: 'Rotate with multi-site protectants (FRAC M03) or SDHIs (FRAC 7).'
  },
  'Propineb': {
    moaCode: 'FRAC M03',
    moaGroup: 'Dithiocarbamates (Multi-site zinc-bearing contact)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Multi-site contact protectant containing bioavailable zinc for enhanced crop vigor', 'Prevents spore germination across early blight, late blight, and downy mildews', 'Wear protective gloves and mask; keep packaging sealed and dry'],
    rotationStrategy: 'Zero resistance risk. Ideal mixing partner and foundational rotational anchor.'
  },
  'Tebuconazole (50%) + Trifloxystrobin (25%)': {
    moaCode: 'FRAC 3 + 11',
    moaGroup: 'DMI + QoI (Triazole + Strobilurin)',
    resistanceRisk: 'Medium to High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Premium broad-spectrum dual-action fungicide for sheath blight, blast, and dirty panicle', 'Provides mesostemic redistribution (Trifloxystrobin) and systemic xylem mobility (Tebuconazole)', 'Toxic to aquatic organisms; do not spray near open water canals'],
    rotationStrategy: 'Limit to 2 applications per crop cycle. Follow with multi-site contact protectants.'
  },
  'Tricyclazole': {
    moaCode: 'FRAC 16.1',
    moaGroup: 'MBI-D (Melanin Biosynthesis Inhibitor - Dehydratase)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Systemic specialty fungicide specifically developed for rice blast (Pyricularia oryzae)', 'Inhibits fungal appressorium melanization, preventing mechanical leaf penetration', 'Must be applied preventatively before neck blast emergence (at booting / early heading stage)'],
    rotationStrategy: 'Rotate with Isoprothiolane (FRAC 32), Kasugamycin (FRAC 24), or Azoxystrobin (FRAC 11).'
  },
  'Validamycin': {
    moaCode: 'FRAC 26',
    moaGroup: 'Glucopyranosyl antibiotic (Trehalase inhibitor)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Biological antibiotic fungicide specifically targeting Rhizoctonia solani (Sheath blight)', 'Inhibits trehalase enzyme, starving hyphae and stopping lesion progression', 'Environmentally benign, safe to predatory insects, spiders, and fish at labeled rates'],
    rotationStrategy: 'Rotate with Hexaconazole (FRAC 3) or Azoxystrobin (FRAC 11) for comprehensive sheath blight management.'
  },
  'Zineb': {
    moaCode: 'FRAC M03',
    moaGroup: 'Dithiocarbamates (Multi-site contact)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Multi-site contact protectant containing organic zinc for disease prevention and foliar greening', 'Broad-spectrum suppression of early blight, anthracnose, and leaf rusts', 'Wear protective gloves and dust mask when measuring and mixing powder'],
    rotationStrategy: 'Zero resistance risk. Ideal for tank mixtures and resistance prevention.'
  },

  // HERBICIDES
  'Acetochlor (14%) + Bensulfuron Methyl (4%)': {
    moaCode: 'HRAC 15 + 2 (K3 + B)',
    moaGroup: 'VLCFA inhibitor + ALS inhibitor',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Selective early pre-to-post emergence herbicide for transplanted paddy rice', 'Acetochlor controls annual grasses while Bensulfuron-methyl targets broadleaf weeds and sedges', 'Maintain 2-3 cm standing water for 3-5 days after application for optimal activation'],
    rotationStrategy: 'Rotate with HRAC 4 (synthetic auxins) or mechanical hand weeding in alternate seasons.'
  },
  'Bensulfuron Methyl (4%) + Acetochlor (14%)': {
    moaCode: 'HRAC 2 + 15 (B + K3)',
    moaGroup: 'ALS inhibitor + VLCFA inhibitor',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Early weed controller in transplanted rice providing broad-spectrum suppression', 'Ensure level field conditions to avoid puddle pooling and localized phytotoxicity', 'Wear boots and rubber gloves when broadcasting or spraying'],
    rotationStrategy: 'Rotate with non-ALS herbicides (HRAC 15 alone or HRAC 4).'
  },
  'Bensulfuron methyl (4%) + Bispyribac sodium (4%)': {
    moaCode: 'HRAC 2 (B)',
    moaGroup: 'ALS (Acetolactate synthase) inhibitors',
    resistanceRisk: 'High',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Post-emergence selective herbicide for grasses, broadleaves, and sedges in rice', 'Inhibits plant branched-chain amino acid biosynthesis (valine, leucine, isoleucine)', 'Re-flood the paddy 24-48 hours after application to suppress weed regrowth'],
    rotationStrategy: 'Both active ingredients share Group 2. High risk of ALS weed resistance; rotate with HRAC 15 or HRAC 4.'
  },
  'Anilofos': {
    moaCode: 'HRAC 15 (K3)',
    moaGroup: 'VLCFA (Very long chain fatty acid) inhibitors',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Selective organophosphorus pre-emergence herbicide for transplanted rice', 'Controls Echinochloa barnyard grass and annual sedges during germination', 'Harmful if swallowed or absorbed through skin; wear nitrile gloves and protective eyewear'],
    rotationStrategy: 'Rotate with ALS inhibitors (HRAC 2) or synthetic auxins (HRAC 4).'
  },
  'Bispyribac-sodium': {
    moaCode: 'HRAC 2 (B)',
    moaGroup: 'ALS (Acetolactate synthase) inhibitors',
    resistanceRisk: 'High',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Highly selective post-emergence herbicide for barnyard grass, broadleaf weeds, and sedges in direct-seeded and transplanted rice', 'Apply at 2 to 4-leaf stage of weeds; drain excess water before application', 'Transient leaf yellowing may occur under extreme heat but plants recover within 7-10 days'],
    rotationStrategy: 'High resistance risk if used continuously. Rotate with HRAC 15 (Pretilachlor) or HRAC 4 (MCPA).'
  },
  'Butachlor': {
    moaCode: 'HRAC 15 (K3)',
    moaGroup: 'Chloroacetamides (VLCFA inhibitor)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Selective pre-emergence herbicide for transplanted and seeded paddy rice', 'Inhibits shoot elongation and seedling cell division in germinating weed seeds', 'Apply 3-5 days after transplanting in standing water (2-3 cm); maintain water for 3 days'],
    rotationStrategy: 'Low resistance risk. Ideal base herbicide in rotation with post-emergence ALS inhibitors.'
  },
  'Cinmethylin': {
    moaCode: 'HRAC 30 (Q)',
    moaGroup: 'FAT (Fatty acid thioesterase) inhibitor',
    resistanceRisk: 'Low',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Modern pre-to-early post emergence herbicide with a novel biochemical site of action', 'Inhibits plant fatty acid thioesterases, starving membrane development in grass weeds', 'Safe to rice crops with no cross-resistance to ALS or ACCase resistant biotypes'],
    rotationStrategy: 'Excellent resistance breaker for fields with ALS-resistant barnyard grass.'
  },
  'Diuron': {
    moaCode: 'HRAC 5 (C2)',
    moaGroup: 'Photosystem II inhibitor (Ureas)',
    resistanceRisk: 'Medium to High',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Selective soil-residual herbicide for tea plantations and non-crop borders', 'Inhibits photosynthetic electron transport at Photosystem II', 'Apply to clean weed-free soil or tank-mix with a knockdown herbicide; avoid spray drift onto tea bushes'],
    rotationStrategy: 'Rotate with Glyphosate (HRAC 9) or Oxyfluorfen (HRAC 14).'
  },
  'Ethoxysulfuron': {
    moaCode: 'HRAC 2 (B)',
    moaGroup: 'ALS (Sulfonylureas) inhibitor',
    resistanceRisk: 'High',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Early to mid post-emergence herbicide for broadleaf weeds and annual/perennial sedges in rice', 'Absorbed through weed foliage and roots, halting cell growth within hours', 'Drain paddy field before spraying so weed foliage is exposed; re-flood within 48 hours'],
    rotationStrategy: 'Rotate with non-ALS herbicides (HRAC 15, HRAC 4) to prevent sulfonylurea resistance.'
  },
  'Glyphosate': {
    moaCode: 'HRAC 9 (G)',
    moaGroup: 'EPSP synthase inhibitor (Glycines)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Non-selective broad-spectrum systemic herbicide translocated to roots and rhizomes', 'Use strictly with spray shields/hoods in tea and orchard inter-rows; zero crop contact permitted', 'Use clean, dirt-free water to prevent herbicide deactivation by suspended clay particles'],
    rotationStrategy: 'Do not use as sole weed control method. Integrate mechanical weeding and cover cropping.'
  },
  'MCPA': {
    moaCode: 'HRAC 4 (O)',
    moaGroup: 'Synthetic auxins (Phenoxy-carboxylates)',
    resistanceRisk: 'Medium',
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    defaultSafety: ['Selective post-emergence systemic hormone herbicide for broadleaf weeds and sedges', 'Causes uncontrolled cell elongation, stem twisting (epinasty), and vascular collapse in dicots', 'Do not spray near sensitive broadleaf crops (cotton, tomato, vegetables) due to vapor drift'],
    rotationStrategy: 'Outstanding rotational partner to break resistance in ALS-treated paddy fields.'
  },
  'Oxadiargyl': {
    moaCode: 'HRAC 14 (E)',
    moaGroup: 'PPO (Protoporphyrinogen oxidase) inhibitor',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Pre-emergence and early post-emergence selective herbicide for transplanted rice and onion', 'Creates a chemical barrier on the soil surface that disrupts germinating weed cell membranes', 'Maintain uniform soil moisture; do not disturb the treated soil layer after application'],
    rotationStrategy: 'Rotate with VLCFA inhibitors (HRAC 15) or ALS inhibitors (HRAC 2).'
  },
  'Oxadiazon': {
    moaCode: 'HRAC 14 (E)',
    moaGroup: 'PPO (Oxadiazoles) inhibitor',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Selective pre-emergence herbicide forming a persistent chemical barrier on the soil surface', 'Controls grasses and broadleaf weeds in rice; absorbed primarily by emerging shoots', 'Apply within 2-4 days of rice transplanting; avoid spraying stressed or submerged seedlings'],
    rotationStrategy: 'Rotate with Chloroacetamides (HRAC 15) or synthetic auxins (HRAC 4).'
  },
  'Oxyfluorfen': {
    moaCode: 'HRAC 14 (E)',
    moaGroup: 'PPO (Diphenyl ethers) inhibitor',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Contact and soil-residual herbicide requiring light for activation and membrane disruption', 'Primarily utilized in tea and plantation crops as directed pre-emergence spray', 'Avoid contact with green crop leaves; wear eye protection and gloves during spraying'],
    rotationStrategy: 'Rotate with Glyphosate (HRAC 9) or Diuron (HRAC 5).'
  },
  'Pendimethalin': {
    moaCode: 'HRAC 3 (K1)',
    moaGroup: 'Microtubule assembly inhibitor (Dinitroanilines)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Selective pre-emergence soil herbicide for onion, garlic, cotton, and vegetables', 'Inhibits root and shoot development in germinating weed seedlings', 'Stains skin and clothing bright yellow; wear protective overalls, gloves, and rubber boots'],
    rotationStrategy: 'Low resistance risk. Key foundational pre-emergence herbicide in vegetable rotations.'
  },
  'Penoxsulam': {
    moaCode: 'HRAC 2 (B)',
    moaGroup: 'ALS (Triazolopyrimidines) inhibitor',
    resistanceRisk: 'High',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Post-emergence selective herbicide for grasses, broadleaves, and sedges in rice', 'Absorbed through leaves, stems, and roots with rapid systemic translocation', 'Apply when weeds are at 2-4 leaf stage; maintain moist field conditions for 7 days'],
    rotationStrategy: 'High resistance risk. Must be rotated with HRAC 15 (Pretilachlor) or HRAC 4 (MCPA).'
  },
  'Pretilachlor': {
    moaCode: 'HRAC 15 (K3)',
    moaGroup: 'Chloroacetamides (VLCFA inhibitor)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Premier selective pre-to-early post-emergence herbicide for transplanted rice', 'Suppresses protein and lipid synthesis in emerging grass shoots (Echinochloa crus-galli)', 'Apply 0-4 days after transplanting in 2-3 cm standing water; keep water impounded for 3 days'],
    rotationStrategy: 'Low resistance risk. Foundation herbicide in rice weed rotation programs.'
  },
  'Pyrazosulfuron-ethyl': {
    moaCode: 'HRAC 2 (B)',
    moaGroup: 'ALS (Sulfonylureas) inhibitor',
    resistanceRisk: 'High',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Low-dose selective early post-emergence herbicide for broadleaf weeds and sedges in rice', 'Stops weed growth within hours of absorption; complete plant dieback occurs over 7-14 days', 'Ensure even field leveling to prevent water pooling and localized crop stunting'],
    rotationStrategy: 'Rotate with Chloroacetamides (HRAC 15) or synthetic auxins (HRAC 4).'
  },
  'Quinclorac': {
    moaCode: 'HRAC 4 (O)',
    moaGroup: 'Synthetic auxins (Quinoline carboxylic acids)',
    resistanceRisk: 'Medium',
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    defaultSafety: ['Highly selective herbicide for barnyard grass (Echinochloa) and select broadleaves in rice', 'Stimulates uncontrolled ethylene and cyanide production in susceptible grass weeds', 'Safe to rice at all growth stages; avoid spray drift onto nearby solanaceous crops (tomatoes)'],
    rotationStrategy: 'Rotate with ALS inhibitors (HRAC 2) or VLCFA inhibitors (HRAC 15).'
  },
  'Triasulfuron': {
    moaCode: 'HRAC 2 (B)',
    moaGroup: 'ALS (Sulfonylureas) inhibitor',
    resistanceRisk: 'High',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Ultra-low dose selective herbicide for broadleaf weed control in rice and wheat', 'Rapidly halts cell division at root and shoot growing points', 'Do not exceed labeled dosage; rotate crops carefully following wheat/rice harvest'],
    rotationStrategy: 'Rotate with HRAC 4 (MCPA/2,4-D) to prevent sulfonylurea resistance.'
  },

  // BIO-PESTICIDES
  'Bacillus thuringiensis': {
    moaCode: 'IRAC 11A',
    moaGroup: 'Microbial disruptors of insect midgut membranes (Bt delta-endotoxin)',
    resistanceRisk: 'Medium',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Biological insecticide releasing crystalline Cry proteins that perforate caterpillar gut membranes', 'Zero chemical residues; completely safe for honeybees, predatory spiders, birds, and fish', 'Apply in late afternoon when ultraviolet sunlight degradation is minimal'],
    rotationStrategy: 'Rotate with Spinosad (IRAC 5) or Diamides (IRAC 28) for diamondback moth control.'
  },
  'Beauveria bassiana': {
    moaCode: 'IRAC UNF',
    moaGroup: 'Entomopathogenic fungi (Mechanical and enzymatic cuticle penetration)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Entomopathogenic fungus whose conidia germinate on insect cuticle and consume haemolymph', 'Controls brinjal shoot and fruit borer, whiteflies, and aphids without toxic chemical residues', 'Do not tank-mix with chemical fungicides; apply during humid evening hours'],
    rotationStrategy: 'Ideal IPM biological agent in rotation with chemical insecticides.'
  },
  'Nuclear Polyhedrosis Virus (NPV)': {
    moaCode: 'IRAC 31',
    moaGroup: 'Baculoviruses (Occlusion-derived virus insecticidal occlusion bodies)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Species-specific viral pathogen lethal to Helicoverpa and Spodoptera caterpillar larvae', 'Completely non-toxic to humans, domestic animals, beneficial pollinators, and wildlife', 'Apply with an adjuvant or jaggery/sugar solution in early morning or evening'],
    rotationStrategy: 'Zero chemical resistance cross-over. Superb biological tool for tomato fruit borer IPM.'
  },
  'Paecilomyces fumosoroseus': {
    moaCode: 'IRAC UNF',
    moaGroup: 'Entomopathogenic fungi (Spore germination and hyphal invasion)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Beneficial entomopathogenic fungus infecting sucking pests, whiteflies, and lepidopteran larvae', 'Natural biological agent with zero worker re-entry restriction and zero harvest withholding interval', 'Store in cool temperature (<25°C); avoid direct sunlight and chemical fungicides'],
    rotationStrategy: 'Rotate with botanical extracts (Neem) and bio-friendly synthetics.'
  },
  'Paecilomyces lilacinus': {
    moaCode: 'Nema UN',
    moaGroup: 'Bionematicide (Egg and juvenile parasitic hyphal fungus)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Bionematicide whose mycelium parasitizes root-knot nematode (Meloidogyne) eggs and females', 'Incorporate into root zone soil with compost or moist organic mulch for maximum colonization', 'Harmless to earthworms and beneficial soil microbiology; zero chemical toxic residues'],
    rotationStrategy: 'Use as soil foundation treatment before transplanting; combine with crop rotation.'
  },
  'Trichoderma harzianum': {
    moaCode: 'FRAC BM02',
    moaGroup: 'Microbial biofungicide (Mycoparasitism & antibiosis)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Beneficial antagonistic fungus colonizing roots and parasitizing Pythium, Rhizoctonia, and Fusarium', 'Produces hydrolytic chitinases and induces systemic plant immune resistance', 'Do not apply chemical fungicides to soil within 14 days of Trichoderma inoculation'],
    rotationStrategy: 'Foundational biological seed and root inoculant across all vegetable production.'
  },
  'Trichoderma viride': {
    moaCode: 'FRAC BM02',
    moaGroup: 'Microbial biofungicide (Mycoparasitism & competitive exclusion)',
    resistanceRisk: 'Low',
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    defaultSafety: ['Antagonistic biological fungus controlling damping off, collar rot, and soil-borne wilt diseases', 'Accelerates seed germination and root vigor through beneficial plant growth promotion', 'Store in cool dry conditions; apply as seed coating or drench around seedling base'],
    rotationStrategy: 'Zero chemical resistance development. Safe for organic and conventional IPM farming.'
  },

  // RODENTICIDES
  'Bromadiolone': {
    moaCode: 'Anticoagulant FGAR',
    moaGroup: 'Second-generation anticoagulant (Vitamin K epoxide reductase inhibitor)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'Ia - Extremely Hazardous',
    whoColor: '#ef4444',
    defaultSafety: ['DEADLY ACUTE TOXICITY: Single-feeding anticoagulant causing delayed internal hemorrhage and mortality', 'Specific physiological antidote is Vitamin K1 (phytomenadione) administered under medical direction', 'Place exclusively in tamper-evident secured bait stations away from children, livestock, and pets'],
    rotationStrategy: 'Alternate with Zinc Phosphide (Acute) to eliminate bait-shy or anticoagulant-tolerant rodent populations.'
  },
  'Zinc Phosphide': {
    moaCode: 'Metabolic Acute',
    moaGroup: 'Acute metabolic respiratory toxin (Phosphine gas release upon stomach acid contact)',
    resistanceRisk: 'Low',
    toxicityClass: 'Ib - Highly Hazardous',
    whoColor: '#ef4444',
    defaultSafety: ['LETHAL METABOLIC POISON: Reacts with gastric acid to release toxic phosphine gas, causing cardiac arrest', 'Pre-bait with un-poisoned grain for 2-3 consecutive days before placing toxic bait to avoid bait shyness', 'Strictly place inside active rodent burrows or secure bait stations; wear impermeable gloves'],
    rotationStrategy: 'Use acute bait once per season; follow up with anticoagulant Bromadiolone bait blocks.'
  },

  // STORED GRAIN PEST
  'Aluminium phosphide': {
    moaCode: 'IRAC 24A',
    moaGroup: 'Phosphine gas generator (Mitochondrial cytochrome c oxidase inhibitor)',
    resistanceRisk: 'Low to Medium',
    toxicityClass: 'Ia - Extremely Hazardous',
    whoColor: '#ef4444',
    defaultSafety: ['LETHAL RESTRICTED FUMIGANT: Reacts with atmospheric humidity generating deadly phosphine (PH3) gas', 'Strictly restricted to certified professional fumigators wearing full-face gas masks with phosphine canisters', 'Fumigation area must be hermetically gas-tight; maintain minimum 7-10 day exposure followed by 48-hour aeration'],
    rotationStrategy: 'Ensure complete gas seal and lethal concentration maintenance to prevent phosphine resistance in grain beetles.'
  }
};

// Helper to determine formulation code
function determineFormulation(tradeName: string, dosageRate: string): string {
  const upper = tradeName.toUpperCase();
  if (upper.includes('EC')) return 'EC';
  if (upper.includes('SC')) return 'SC';
  if (upper.includes('WP')) return 'WP';
  if (upper.includes('WDG') || upper.includes('WG')) return 'WDG';
  if (upper.includes('DF')) return 'DF';
  if (upper.includes('GR') || upper.includes(' 5G')) return 'GR';
  if (upper.includes('SL')) return 'SL';
  if (upper.includes('SP')) return 'SP';
  if (upper.includes('OD')) return 'OD';
  if (upper.includes('FS')) return 'FS';
  if (upper.includes('CS')) return 'CS';
  if (upper.includes('SE')) return 'SE';
  if (upper.includes('EW')) return 'EW';
  if (upper.includes('ULV')) return 'ULV';
  if (dosageRate.toLowerCase().includes('tablet')) return 'Tablet';
  if (dosageRate.toLowerCase().includes('bait')) return 'Bait';
  if (upper.includes('POWDER') || dosageRate.toLowerCase().includes('kg')) return 'WP';
  return 'EC';
}

// Helper to determine PHI and REI
function determineSafetyMetrics(type: string, commonName: string, crops: string[], toxicityClass: string) {
  if (type === 'Stored Grain') {
    return { phiDays: 0, reiHours: 72, waterVolume: 0 };
  }
  if (type === 'Rodenticide') {
    return { phiDays: 0, reiHours: 0, waterVolume: 0 };
  }
  if (type === 'Bio Pesticide') {
    return { phiDays: 1, reiHours: 4, waterVolume: 500 };
  }

  const hasTea = crops.some(c => c.toLowerCase().includes('tea'));
  const hasRice = crops.some(c => c.toLowerCase().includes('rice'));
  const hasVeg = crops.some(c => ['tomato', 'brinjal', 'cabbage', 'cauliflower', 'chili', 'bean', 'potato'].some(v => c.toLowerCase().includes(v)));

  let waterVolume = 500;
  if (hasTea) waterVolume = 800;
  else if (hasRice) waterVolume = 500;
  else if (hasVeg) waterVolume = 500;

  let phiDays = 14;
  let reiHours = 24;

  if (type === 'Herbicide') {
    if (commonName.toLowerCase().includes('glyphosate')) {
      phiDays = 14;
      reiHours = 24;
      waterVolume = hasTea ? 500 : 400;
    } else {
      // Selective rice/onion herbicides
      phiDays = 30;
      reiHours = 24;
    }
  } else if (type === 'Fungicide') {
    if (commonName.toLowerCase().includes('mancozeb') || commonName.toLowerCase().includes('copper') || commonName.toLowerCase().includes('sulphur')) {
      phiDays = 7;
      reiHours = 12;
    } else {
      phiDays = 14;
      reiHours = 24;
    }
  } else if (type === 'Miticide') {
    if (commonName.toLowerCase().includes('sulphur')) {
      phiDays = 3;
      reiHours = 12;
    } else if (commonName.toLowerCase().includes('hexythiazox')) {
      phiDays = 7;
      reiHours = 12;
    } else {
      phiDays = 14;
      reiHours = 24;
    }
  }

  if (toxicityClass.includes('Ia')) {
    reiHours = Math.max(reiHours, 48);
  } else if (toxicityClass.includes('Ib')) {
    reiHours = Math.max(reiHours, 24);
  }

  return { phiDays, reiHours, waterVolume };
}

// Map CSV type to clean TypeScript ChemicalProduct type
function mapProductType(rawType: string): 'Insecticide' | 'Fungicide' | 'Herbicide' | 'Miticide' | 'Bio Pesticide' | 'Stored Grain' | 'Rodenticide' {
  const upper = rawType.toUpperCase().trim();
  if (upper.includes('MITICIDE')) return 'Miticide';
  if (upper.includes('FUNGICIDE')) return 'Fungicide';
  if (upper.includes('HERBICIDE')) return 'Herbicide';
  if (upper.includes('BIO')) return 'Bio Pesticide';
  if (upper.includes('RODENT')) return 'Rodenticide';
  if (upper.includes('STORED')) return 'Stored Grain';
  return 'Insecticide';
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"' && (j === 0 || line[j - 1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

// Main execution
console.log('Loading CSV data and existing database...');
const csvPath = path.resolve('data_raw/products.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.trim().split('\n');

// Group CSV rows by registration number and trade name
const csvProductMap = new Map<string, any>();

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const fields = parseCSVLine(line);
  if (fields.length < 8) continue;

  const rawType = fields[0];
  const commonName = fields[1];
  const tradeName = fields[2];
  const regNo = fields[3];
  const holder = fields[4];
  const crops = fields[5].split(',').map(c => c.trim()).filter(Boolean);
  const pests = fields[6].split(',').map(p => p.trim()).filter(Boolean);
  const dose = fields[7];

  const key = regNo ? regNo.trim().toUpperCase() : `${tradeName.trim().toUpperCase()}::${commonName.trim().toUpperCase()}`;

  if (!csvProductMap.has(key)) {
    csvProductMap.set(key, {
      rawType,
      commonName,
      tradeName,
      registrationNo: regNo,
      registrationHolder: holder,
      crops,
      pests,
      dosageRate: dose
    });
  } else {
    const existing = csvProductMap.get(key);
    existing.crops = Array.from(new Set([...existing.crops, ...crops]));
    existing.pests = Array.from(new Set([...existing.pests, ...pests]));
    if (dose && !existing.dosageRate.includes(dose)) {
      existing.dosageRate += '; ' + dose;
    }
  }
}

// Also load registered insecticides from PTAC 81 dataset
const ptacCsvPath = path.resolve('data_raw/insecticides_ptac81_part1.csv');
if (fs.existsSync(ptacCsvPath)) {
  const ptacContent = fs.readFileSync(ptacCsvPath, 'utf-8');
  const ptacLines = ptacContent.trim().split('\n');
  for (let i = 1; i < ptacLines.length; i++) {
    const line = ptacLines[i].trim();
    if (!line) continue;
    const fields = parseCSVLine(line);
    if (fields.length < 7) continue;

    const commonName = fields[2] || 'Abamectin';
    const tradeName = fields[4];
    const regNo = fields[5];
    const holder = fields[6];
    const crops = (fields[7] || '').split(/[,|/]/).map(c => c.trim()).filter(Boolean);
    const pests = (fields[8] || '').split(/[,|/]/).map(p => p.trim()).filter(Boolean);
    const dose = fields[9] || '1.25 L/ha (1.25 ml/L of water)';

    if (!tradeName) continue;

    const key = regNo ? regNo.trim().toUpperCase() : `${tradeName.trim().toUpperCase()}::${commonName.trim().toUpperCase()}`;
    if (!csvProductMap.has(key)) {
      csvProductMap.set(key, {
        rawType: 'Insecticide',
        commonName,
        tradeName,
        registrationNo: regNo,
        registrationHolder: holder,
        crops: crops.length > 0 ? crops : ['Tea', 'Brinjal', 'Jujube'],
        pests: pests.length > 0 ? pests : ['Red spider mite', 'Mite', 'BPH'],
        dosageRate: dose
      });
    } else {
      const existing = csvProductMap.get(key);
      existing.crops = Array.from(new Set([...existing.crops, ...crops]));
      existing.pests = Array.from(new Set([...existing.pests, ...pests]));
      if (dose && !existing.dosageRate.includes(dose)) {
        existing.dosageRate += '; ' + dose;
      }
    }
  }
}

console.log(`Parsed ${csvProductMap.size} unique products from combined CSV datasets.`);

// Index existing curated products
const existingByRegNo = new Map<string, ChemicalProduct>();
const existingByTradeCommon = new Map<string, ChemicalProduct>();
EXISTING_DB.forEach(p => {
  if (p.registrationNo) existingByRegNo.set(p.registrationNo.trim().toUpperCase(), p);
  existingByTradeCommon.set(`${p.tradeName.trim().toUpperCase()}::${p.commonName.trim().toUpperCase()}`, p);
});

// Process CSV products into ChemicalProduct objects
const processedProducts: ChemicalProduct[] = [];
let idCounters: Record<string, number> = {
  mit: 1,
  fung: 1,
  herb: 1,
  bio: 1,
  rod: 1,
  str: 1,
  ins: 1
};

csvProductMap.forEach(item => {
  const type = mapProductType(item.rawType);
  const regKey = item.registrationNo ? item.registrationNo.trim().toUpperCase() : null;
  const tradeCommonKey = `${item.tradeName.trim().toUpperCase()}::${item.commonName.trim().toUpperCase()}`;

  const existing = (regKey && existingByRegNo.get(regKey)) || existingByTradeCommon.get(tradeCommonKey);

  const intel = MOA_INTEL[item.commonName] || (existing ? {
    moaCode: existing.moaCode,
    moaGroup: existing.moaGroup,
    resistanceRisk: existing.resistanceRisk,
    toxicityClass: existing.toxicityClass,
    whoColor: existing.whoColor,
    defaultSafety: existing.safetyNotes,
    rotationStrategy: existing.rotationNotes
  } : {
    moaCode: 'Unknown',
    moaGroup: 'General Agrochemical',
    resistanceRisk: 'Medium' as const,
    toxicityClass: 'III - Slightly Hazardous' as const,
    whoColor: '#3b82f6',
    defaultSafety: ['Follow standard agricultural chemical safety precautions', 'Wear protective gloves and mask during spray application'],
    rotationStrategy: 'Rotate with different chemical classes to maintain efficacy.'
  });

  const formulation = existing?.formulation || determineFormulation(item.tradeName, item.dosageRate);
  const safetyMetrics = determineSafetyMetrics(type, item.commonName, item.crops, intel.toxicityClass);

  let prefix = 'fung';
  if (type === 'Miticide') prefix = 'mit';
  else if (type === 'Herbicide') prefix = 'herb';
  else if (type === 'Bio Pesticide') prefix = 'bio';
  else if (type === 'Rodenticide') prefix = 'rod';
  else if (type === 'Stored Grain') prefix = 'str';
  else if (type === 'Insecticide') prefix = 'ins';

  const id = `${prefix}-${String(idCounters[prefix]++).padStart(4, '0')}`;

  // Combine crops and pests
  const crops = existing ? Array.from(new Set([...existing.crops, ...item.crops])) : item.crops;
  const pests = existing ? Array.from(new Set([...existing.pests, ...item.pests])) : item.pests;
  const dosageRate = existing ? (existing.dosageRate || item.dosageRate) : item.dosageRate;
  const safetyNotes = (existing && existing.safetyNotes && existing.safetyNotes.length > 0)
    ? existing.safetyNotes
    : intel.defaultSafety;
  const rotationNotes = (existing && existing.rotationNotes)
    ? existing.rotationNotes
    : intel.rotationStrategy;

  processedProducts.push({
    id,
    type,
    commonName: item.commonName,
    tradeName: item.tradeName,
    registrationNo: item.registrationNo,
    registrationHolder: item.registrationHolder,
    crops,
    pests,
    dosageRate,
    moaCode: intel.moaCode,
    moaGroup: intel.moaGroup,
    resistanceRisk: intel.resistanceRisk,
    toxicityClass: intel.toxicityClass,
    whoColor: intel.whoColor,
    formulation,
    phiDays: existing?.phiDays ?? safetyMetrics.phiDays,
    reiHours: existing?.reiHours ?? safetyMetrics.reiHours,
    waterVolumeLPerHa: existing?.waterVolumeLPerHa ?? safetyMetrics.waterVolume,
    safetyNotes,
    rotationNotes
  });
});

// Also include any curated Insecticides and other existing products that weren't in the CSV
const existingIncluded = new Set(processedProducts.map(p => p.registrationNo.trim().toUpperCase()));
const additionalExisting: ChemicalProduct[] = [];

EXISTING_DB.forEach(p => {
  const key = p.registrationNo ? p.registrationNo.trim().toUpperCase() : null;
  if (!key || !existingIncluded.has(key)) {
    additionalExisting.push(p);
  }
});

console.log(`Adding ${additionalExisting.length} existing products (including curated insecticides) not covered in the new CSV.`);
const allProducts = [...processedProducts, ...additionalExisting];

// Ensure all product IDs are strictly unique
const usedIds = new Set<string>();
allProducts.forEach((p, idx) => {
  let prefix = 'gen';
  if (p.type === 'Insecticide') prefix = 'ins';
  else if (p.type === 'Fungicide') prefix = 'fun';
  else if (p.type === 'Herbicide') prefix = 'herb';
  else if (p.type === 'Miticide') prefix = 'mit';
  else if (p.type === 'Bio Pesticide') prefix = 'bio';
  else if (p.type === 'Rodenticide') prefix = 'rod';
  else if (p.type === 'Stored Grain') prefix = 'str';

  if (!p.id || usedIds.has(p.id)) {
    let counter = idx + 1;
    let newId = `${prefix}-${String(counter).padStart(4, '0')}`;
    while (usedIds.has(newId)) {
      counter++;
      newId = `${prefix}-${String(counter).padStart(4, '0')}`;
    }
    p.id = newId;
  }
  usedIds.add(p.id);
});

// Sort products by type and trade name
allProducts.sort((a, b) => {
  if (a.type !== b.type) return a.type.localeCompare(b.type);
  return a.tradeName.localeCompare(b.tradeName);
});

console.log(`Total enriched products: ${allProducts.length}`);

// Categorize for modular storage
const insecticides = allProducts.filter(p => p.type === 'Insecticide');
const fungicides = allProducts.filter(p => p.type === 'Fungicide');
const herbicides = allProducts.filter(p => p.type === 'Herbicide');
const miticides = allProducts.filter(p => p.type === 'Miticide');
const bioAndOthers = allProducts.filter(p => ['Bio Pesticide', 'Rodenticide', 'Stored Grain'].includes(p.type));

console.log('Category Counts:');
console.log(`- Insecticides: ${insecticides.length}`);
console.log(`- Fungicides: ${fungicides.length}`);
console.log(`- Herbicides: ${herbicides.length}`);
console.log(`- Miticides: ${miticides.length}`);
console.log(`- Bio & Others: ${bioAndOthers.length}`);

// Helper to format TS file
function generateTSFile(exportName: string, items: ChemicalProduct[]) {
  return `import { ChemicalProduct } from '../types';\n\nexport const ${exportName}: ChemicalProduct[] = ${JSON.stringify(items, null, 2)};\n`;
}

// Write modular files
fs.writeFileSync('src/data/insecticidesData.ts', generateTSFile('INSECTICIDES_DATABASE', insecticides));
fs.writeFileSync('src/data/fungicidesData.ts', generateTSFile('FUNGICIDES_DATABASE', fungicides));
fs.writeFileSync('src/data/herbicidesData.ts', generateTSFile('HERBICIDES_DATABASE', herbicides));
fs.writeFileSync('src/data/miticidesData.ts', generateTSFile('MITICIDES_DATABASE', miticides));
fs.writeFileSync('src/data/bioAndOtherData.ts', generateTSFile('BIO_AND_OTHER_DATABASE', bioAndOthers));

// Write master pesticidesData.ts
const masterContent = `import { ChemicalProduct } from '../types';
import { INSECTICIDES_DATABASE } from './insecticidesData';
import { FUNGICIDES_DATABASE } from './fungicidesData';
import { HERBICIDES_DATABASE } from './herbicidesData';
import { MITICIDES_DATABASE } from './miticidesData';
import { BIO_AND_OTHER_DATABASE } from './bioAndOtherData';

export const PESTICIDES_DATABASE: ChemicalProduct[] = [
  ...INSECTICIDES_DATABASE,
  ...FUNGICIDES_DATABASE,
  ...HERBICIDES_DATABASE,
  ...MITICIDES_DATABASE,
  ...BIO_AND_OTHER_DATABASE,
];

export const CROP_LIST: string[] = [
  'All Crops',
  'Rice',
  'Potato',
  'Tomato',
  'Brinjal',
  'Mango',
  'Jute',
  'Tea',
  'Cabbage',
  'Cauliflower',
  'Chili',
  'Chilli',
  'Bean',
  'Wheat',
  'Sugarcane',
  'Onion',
  'Cotton',
  'Maize',
  'Cucumber',
  'Bitter Gourd',
  'Pointed Gourd',
  'Mustard',
  'Groundnut',
  'Store & Field',
  'Warehouse'
];
`;

fs.writeFileSync('src/data/pesticidesData.ts', masterContent);
console.log('Database successfully generated and written permanently to modular files in src/data/!');
