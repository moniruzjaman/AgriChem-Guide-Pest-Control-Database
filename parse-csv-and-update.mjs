import fs from 'fs';
import path from 'path';

const DEFAULT_SOURCE_DIR = '/tmp/attachments/agent_755884cf-a912-46d4-9339-87abd012fab2/4d4d6a95-d659-49d3-a74a-2cc6d4bbbe57/9a460028-5eea-4c6a-9eaa-986180fb86c2';
const OUTPUT_PATH = path.resolve(__dirname, 'src/data/sourcePesticidesData.ts');

const sourcePaths = process.argv.slice(2);
const csvFiles = sourcePaths.length > 0
  ? sourcePaths.map((p) => (p.endsWith('.csv') ? p : path.join(p, '*.csv')).replace(/\/\*$/, '')).flatMap((p) => {
      if (p.endsWith('.csv')) return [p];
      const dir = p;
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir).filter((f) => f.endsWith('.csv')).map((f) => path.join(dir, f));
    })
  : fs.readdirSync(DEFAULT_SOURCE_DIR).filter((f) => f.endsWith('.csv')).map((f) => path.join(DEFAULT_SOURCE_DIR, f)).sort();

const CATEGORY_MAP = { insecticides: 'Insecticide', fungicides: 'Fungicide', herbicides: 'Herbicide', miticides: 'Miticide' };

function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (c === ',' && !inQuotes) { fields.push(current); current = ''; }
    else { current += c; }
  }
  fields.push(current);
  return fields;
}

function parseCSVFile(content) {
  const rows = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (c === '"') {
      if (inQ && content[i + 1] === '"') { cur += '"'; i++; }
      else { inQ = !inQ; }
    } else if (c === '\n' && !inQ) {
      const row = parseCSVLine(cur);
      if (row.some((f) => f.trim())) rows.push(row);
      cur = '';
    } else if (c !== '\r') { cur += c; }
  }
  if (cur.trim()) { const row = parseCSVLine(cur); if (row.some((f) => f.trim())) rows.push(row); }
  return rows;
}

function inferCategory(filePath) {
  const base = path.basename(filePath).toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_MAP)) { if (base.includes(k)) return v; }
  return 'Insecticide';
}

const MOA_MAPPING = {
  'abamectin': { moaCode: 'IRAC 6', moaGroup: 'Avermectins (GluCl allosteric modulators)', resistanceRisk: 'Medium' },
  'acetamiprid': { moaCode: 'IRAC 4A', moaGroup: 'Neonicotinoids (nAChR competitive modulators)', resistanceRisk: 'High' },
  'acephate': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High' },
  'alpha cypermethrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High' },
  'azoxystrobin': { moaCode: 'FRAC 11', moaGroup: 'QoI (Quinone outside Inhibitor - strobilurin)', resistanceRisk: 'High' },
  'bifenthrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High' },
  'bromopropylate': { moaCode: 'IRAC UN', moaGroup: 'Unknown / Multi-target', resistanceRisk: 'Low' },
  'buprofezin': { moaCode: 'IRAC 16', moaGroup: 'Buprofezin (Chitin synthesis inhibitor)', resistanceRisk: 'Medium' },
  'carbaryl': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High' },
  'carbofuran': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High' },
  'carbosulfan': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High' },
  'cartap hydrochloride': { moaCode: 'IRAC 14', moaGroup: 'Nereistoxin analogues (nAChR blocker)', resistanceRisk: 'Medium' },
  'chlorantraniliprole': { moaCode: 'IRAC 28', moaGroup: 'Diamides (Ryanodine receptor modulators)', resistanceRisk: 'Low to Medium' },
  'chlorfenapyr': { moaCode: 'IRAC 13', moaGroup: 'Pyrroles (Uncouplers of oxidative phosphorylation)', resistanceRisk: 'Medium' },
  'chlorpyrifos': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High' },
  'cypermethrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High' },
  'deltamethrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High' },
  'dimethoate': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High' },
  'difenoconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Demethylation inhibitor - Triazoles)', resistanceRisk: 'Medium' },
  'diniconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium' },
  'endosulfan': { moaCode: 'IRAC 2A', moaGroup: 'Cyclodiene organochlorines (GABA-gated chloride channel blockers)', resistanceRisk: 'High' },
  'epoxiconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium' },
  'ethion': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High' },
  'ethiprole': { moaCode: 'IRAC 2B', moaGroup: 'Phenylpyrazoles', resistanceRisk: 'Medium' },
  'fenthion': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High' },
  'fenitrothion': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High' },
  'fenpropathrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High' },
  'fenvalerate': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High' },
  'fipronil': { moaCode: 'IRAC 2B', moaGroup: 'Phenylpyrazoles (GABA-gated chloride channel blockers)', resistanceRisk: 'Medium to High' },
  'flusilazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium' },
  'glyphosate': { moaCode: 'HRAC 9', moaGroup: 'EPSP Synthase Inhibitors (Glycines)', resistanceRisk: 'Medium to High' },
  'hexaconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium' },
  'hexythiazox': { moaCode: 'IRAC 10A', moaGroup: 'Hexythiazox (Growth inhibitor - chitin synthesis)', resistanceRisk: 'Low to Medium' },
  'imidacloprid': { moaCode: 'IRAC 4A', moaGroup: 'Neonicotinoids (nAChR competitive modulators)', resistanceRisk: 'High' },
  'indoxacarb': { moaCode: 'IRAC 22A', moaGroup: 'Oxadiazines (Voltage-dependent Na channel blockers)', resistanceRisk: 'Medium' },
  'iprodione': { moaCode: 'FRAC 2', moaGroup: 'Dicarboximides', resistanceRisk: 'Medium to High' },
  'isoprothiolane': { moaCode: 'FRAC 6', moaGroup: 'Phosphorothiolates', resistanceRisk: 'Medium' },
  'kasugamycin': { moaCode: 'FRAC 24', moaGroup: 'Kasugamycin (Aminoglycoside antibiotic)', resistanceRisk: 'Low to Medium' },
  'lambda cyhalothrin': { moaCode: 'IRAC 3A', moaGroup: 'Pyrethroids (Sodium channel modulator)', resistanceRisk: 'High' },
  'lufenuron': { moaCode: 'IRAC 15', moaGroup: 'Benzoylureas (Chitin biosynthesis inhibitors, type 0)', resistanceRisk: 'Medium' },
  'malathion': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High' },
  'mancozeb': { moaCode: 'FRAC M03', moaGroup: 'Dithiocarbamates (Multi-site contact)', resistanceRisk: 'Low' },
  'methomyl': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High' },
  'metalaxyl': { moaCode: 'FRAC 4', moaGroup: 'PA (Phenylamide - RNA polymerase I)', resistanceRisk: 'High' },
  'milbemycins': { moaCode: 'IRAC 6', moaGroup: 'Milbemycins (GluCl allosteric modulators)', resistanceRisk: 'Medium' },
  'pymetrozine': { moaCode: 'IRAC 9B', moaGroup: 'Pyridine azomethines (Selective feeding blockers)', resistanceRisk: 'Low to Medium' },
  'propamocarb': { moaCode: 'FRAC 28', moaGroup: 'Carbamates (Cell membrane permeability)', resistanceRisk: 'Low to Medium' },
  'propiconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium' },
  'propineb': { moaCode: 'FRAC M03', moaGroup: 'Dithiocarbamates (Multi-site contact)', resistanceRisk: 'Low' },
  'propargite': { moaCode: 'IRAC 12C', moaGroup: 'Organosulfurs (Inhibitor of oxidative phosphorylation)', resistanceRisk: 'Medium' },
  'pyraclostrobin': { moaCode: 'FRAC 11', moaGroup: 'QoI (Quinone outside Inhibitor - strobilurin)', resistanceRisk: 'High' },
  'quinalphos': { moaCode: 'IRAC 1B', moaGroup: 'Organophosphates (AChE inhibitor)', resistanceRisk: 'High' },
  'spinosad': { moaCode: 'IRAC 5', moaGroup: 'Spinosyns (nAChR allosteric modulators)', resistanceRisk: 'Medium' },
  'spinetoram': { moaCode: 'IRAC 5', moaGroup: 'Spinosyns (nAChR allosteric modulators)', resistanceRisk: 'Medium' },
  'spirotetramat': { moaCode: 'IRAC 23', moaGroup: 'Tetramic acid derivatives (Lipid biosynthesis inhibitor)', resistanceRisk: 'Low to Medium' },
  'sulphur': { moaCode: 'FRAC M02 / IRAC UN', moaGroup: 'Inorganic sulfur (Multi-site contact)', resistanceRisk: 'Low' },
  'tebuconazole': { moaCode: 'FRAC 3', moaGroup: 'DMI (Triazoles)', resistanceRisk: 'Medium' },
  'thiodicarb': { moaCode: 'IRAC 1A', moaGroup: 'Carbamates (AChE inhibitor)', resistanceRisk: 'High' },
  'thiamethoxam': { moaCode: 'IRAC 4A', moaGroup: 'Neonicotinoids (nAChR competitive modulators)', resistanceRisk: 'High' },
  'thiophanate-methyl': { moaCode: 'FRAC 1', moaGroup: 'MBC (Methyl Benzimidazole Carbamates)', resistanceRisk: 'High' },
  'tricyclazole': { moaCode: 'FRAC 30', moaGroup: 'Melanin biosynthesis inhibitors (MBI)', resistanceRisk: 'Low to Medium' },
  'tridemorph': { moaCode: 'FRAC 5', moaGroup: 'Morpholines (Sterol biosynthesis inhibitor)', resistanceRisk: 'Medium' },
  'zineb': { moaCode: 'FRAC M03', moaGroup: 'Dithiocarbamates (Multi-site contact)', resistanceRisk: 'Low' },
};

function resolveMoAJS(name) {
  if (!name || !name.trim()) return { moaCode: 'Unknown', moaGroup: 'Unknown' };
  const lower = name.trim().toLowerCase();
  if (MOA_MAPPING[lower]) return MOA_MAPPING[lower];
  if (name.includes('+')) {
    const parts = name.split('+').map((p) => p.trim());
    const codes = []; const groups = []; let hasUnknown = false;
    for (const part of parts) {
      const r = resolveMoAJS(part);
      if (r.moaCode === 'Unknown') hasUnknown = true;
      codes.push(r.moaCode); groups.push(r.moaGroup);
    }
    return { moaCode: hasUnknown ? 'Unknown' : codes.join(' + '), moaGroup: hasUnknown ? 'Unknown' : groups.join(' + ') };
  }
  if (name.includes('(') && name.includes(')')) {
    const m = name.match(/\(([^)]+)\)/);
    if (m) {
      const r = resolveMoAJS(m[1]);
      if (r.moaCode !== 'Unknown') return r;
    }
  }
  return { moaCode: 'Unknown', moaGroup: 'Unknown' };
}

function detectFormulation(tradeName) {
  if (!tradeName) return 'Unknown';
  const u = tradeName.toUpperCase();
  const patterns: [RegExp, string][] = [
    [/\bEC\b/, 'EC'], [/\bSC\b/, 'SC'], [/\bWP\b/, 'WP'], [/\bWDG\b/, 'WDG'], [/\bWG\b/, 'WG'],
    [/\bDF\b/, 'DF'], [/\bGR\b/, 'GR'], [/\bSL\b/, 'SL'], [/\bSP\b/, 'SP'], [/\bULV\b/, 'ULV'],
    [/\bEW\b/, 'EW'], [/\bFS\b/, 'FS'], [/\bOD\b/, 'OD'], [/\bSE\b/, 'SE'], [/\bCS\b/, 'CS'],
    [/\bDC\b/, 'DC'], [/\bMC\b/, 'MC'], [/\bZC\b/, 'ZC'], [/\bSG\b/, 'SG'], [/\bLURE?\b/, 'Lure'],
    [/\bTABLET\b/, 'Tablet'], [/\bPOWDER\b/, 'Powder'],
  ];
  for (const [p, f] of patterns) { if (p.test(u)) return f; }
  return 'Unknown';
}

function extractProducts(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const category = inferCategory(filePath);
  const rows = parseCSVFile(content);

  let headerIdx = -1;
  let fileTitle = '';
  for (let i = 0; i < rows.length; i++) {
    const t = rows[i].join(' ').toLowerCase();
    if (t.includes('registered') && (t.includes('insecticides') || t.includes('fungicides') || t.includes('herbicides') || t.includes('miticides'))) {
      fileTitle = rows[i].join(' ').trim();
    }
    if (t.includes('common name') && t.includes('brand name') && t.includes('registration no')) { headerIdx = i; break; }
  }
  if (headerIdx === -1) headerIdx = 4;

  const products = [];
  let lastCN = '';

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 10) continue;

    let cn = row[2] ? row[2].trim() : '';
    if (!cn) cn = lastCN;
    else lastCN = cn;
    if (!cn) continue;

    const crops = row[7] ? row[7].split(',').map((c) => c.trim()).filter(Boolean) : [];
    const pests = row[8] ? row[8].split(',').map((p) => p.trim()).filter(Boolean) : [];
    const moa = resolveMoAJS(cn);

    products.push({
      type: inferCategory(filePath),
      commonName: cn,
      tradeName: row[4] ? row[4].trim() : '',
      registrationNo: row[5] ? row[5].trim() : '',
      registrationHolder: row[6] ? row[6].trim() : '',
      crops, pests, dosageRate: row[9] ? row[9].trim() : '',
      moaCode: moa.moaCode, moaGroup: moa.moaGroup, resistanceRisk: moa.moaCode === 'Unknown' ? 'Unknown' : (MOA_MAPPING[cn.toLowerCase()]?.resistanceRisk || 'Medium'),
      toxicityClass: 'III - Slightly Hazardous',
      whoColor: moa.moaCode === 'Unknown' || moa.moaCode.includes('UN') ? '#3b82f6' : '#eab308',
      formulation: detectFormulation(row[4] || ''),
      phiDays: 14, reiHours: 24, waterVolumeLPerHa: 500,
      safetyNotes: [], rotationNotes: '',
    });
  }
  return products;
}

function escapeTS(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

function main() {
  console.log(`Found ${csvFiles.length} CSV files:`);
  csvFiles.forEach((f) => console.log(`  ${path.basename(f)}`));

  const allProducts = [];
  for (const fp of csvFiles) {
    const prods = extractProducts(fp);
    console.log(`  ${path.basename(fp)}: ${prods.length} raw rows`);
    allProducts.push(...prods);
  }
  console.log(`Total raw rows: ${allProducts.length}`);

  const productMap = new Map<string, any>();
  const typeCounts: Record<string, number> = {};

  for (const row of allProducts) {
    const key = `${row.registrationNo}|${row.tradeName}|${row.commonName}`;
    if (productMap.has(key)) {
      const ex = productMap.get(key);
      ex.crops = [...new Set([...ex.crops, ...row.crops])];
      ex.pests = [...new Set([...ex.pests, ...row.pests])];
      if (row.dosageRate && !ex.dosageRate.includes(row.dosageRate)) ex.dosageRate += `; ${row.dosageRate}`;
    } else {
      const prefix = row.type.toLowerCase().substring(0, 3);
      const idx = typeCounts[row.type] || 0;
      typeCounts[row.type] = idx + 1;
      productMap.set(key, { id: `${prefix}-${String(idx + 1).padStart(3, '0')}`, ...row });
    }
  }

  const unique = Array.from(productMap.values());
  console.log(`Unique products after merging: ${unique.length}`);
  console.log(`By type:`, typeCounts);

  let unresolved = 0;
  unique.forEach((p) => { if (p.moaCode === 'Unknown' || p.moaCode.includes('UN')) unresolved++; });
  console.log(`Unresolved MoA entries: ${unresolved}`);

  const sources = csvFiles.map((f) => path.basename(f));
  const date = new Date().toISOString().split('T')[0];

  const entries = unique
    .map((p) => `  {\n    id: '${p.id}',\n    type: '${p.type}',\n    commonName: '${escapeTS(p.commonName)}',\n    tradeName: '${escapeTS(p.tradeName)}',\n    registrationNo: '${escapeTS(p.registrationNo)}',\n    registrationHolder: '${escapeTS(p.registrationHolder)}',\n    crops: [${p.crops.map((c) => `'${escapeTS(c)}'`).join(', ')}],\n    pests: [${p.pests.map((q) => `'${escapeTS(q)}'`).join(', ')}],\n    dosageRate: '${escapeTS(p.dosageRate)}',\n    moaCode: '${p.moaCode}',\n    moaGroup: '${escapeTS(p.moaGroup)}',\n    resistanceRisk: '${p.resistanceRisk}',\n    toxicityClass: '${p.toxicityClass}',\n    whoColor: '${p.whoColor}',\n    formulation: '${p.formulation}',\n    phiDays: ${p.phiDays},\n    reiHours: ${p.reiHours},\n    waterVolumeLPerHa: ${p.waterVolumeLPerHa},\n    safetyNotes: ${JSON.stringify(p.safetyNotes)},\n    rotationNotes: '${escapeTS(p.rotationNotes)}'\n  }`)
    .join(',\n');

  const output = `import { ChemicalProduct } from '../types';

export const SOURCE_META = {
  sources: ${JSON.stringify(sources, null, 2)},
  meeting: '81st PTAC Meeting',
  extractionDate: '${date}',
} as const;

export const SOURCE_PESTICIDES: ChemicalProduct[] = [
${entries}
];
`;

  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`Generated: ${OUTPUT_PATH}`);
  console.log(`Total products in sourcePesticidesData.ts: ${unique.length}`);
}

main();
