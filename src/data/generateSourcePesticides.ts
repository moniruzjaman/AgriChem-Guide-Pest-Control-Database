import fs from 'fs';
import path from 'path';
import { ChemicalProduct } from '../types';
import { resolveMoA, MOA_DATABASE, MoAResolution } from './moaResolver';

interface SourceProduct {
  type: string;
  commonName: string;
  tradeName: string;
  registrationNo: string;
  registrationHolder: string;
  crops: string[];
  pests: string[];
  dosageRate: string;
  moaCode: string;
  moaGroup: string;
  moaSubGroup?: string;
  moaTargetSite?: string;
  resistanceRisk: string;
  toxicityClass: string;
  whoColor: string;
  formulation: string;
  phiDays: number;
  reiHours: number;
  waterVolumeLPerHa: number;
  safetyNotes: string[];
  rotationNotes: string;
}

const SOURCE_DIR = '/tmp/attachments/agent_755884cf-a912-46d4-9339-87abd012fab2/4d4d6a95-d659-49d3-a74a-2cc6d4bbbe57/9a460028-5eea-4c6a-9eaa-986180fb86c2';
const OUTPUT_PATH = path.resolve(__dirname, '../data/sourcePesticidesData.ts');

const CATEGORY_MAP: Record<string, string> = {
  insecticides: 'Insecticide',
  fungicides: 'Fungicide',
  herbicides: 'Herbicide',
  miticides: 'Miticide',
};

const MOA_JS_MAP: Record<string, { code: string; group: string; risk: string }> = {};
MOA_DATABASE.forEach((moa) => {
  moa.primaryActives.forEach((active) => {
    const key = active.toLowerCase().replace(/\s+/g, ' ');
    MOA_JS_MAP[key] = { code: moa.code, group: moa.name, risk: moa.resistanceRisk };
  });
});

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);
  return fields;
}

function parseCSVFile(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow = '';
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '"') {
      if (inQuotes && content[i + 1] === '"') {
        currentRow += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === '\n' && !inQuotes) {
      const row = parseCSVLine(currentRow);
      if (row.some((f) => f.trim() !== '')) rows.push(row);
      currentRow = '';
    } else if (char === '\r') {
      continue;
    } else {
      currentRow += char;
    }
  }
  if (currentRow.trim()) {
    const row = parseCSVLine(currentRow);
    if (row.some((f) => f.trim() !== '')) rows.push(row);
  }
  return rows;
}

function inferCategory(filePath: string): string {
  const base = path.basename(filePath).toLowerCase();
  for (const [key, cat] of Object.entries(CATEGORY_MAP)) {
    if (base.includes(key)) return cat;
  }
  return 'Insecticide';
}

function detectFormulation(tradeName: string): string {
  if (!tradeName) return 'Unknown';
  const upper = tradeName.toUpperCase();
  const patterns: [RegExp, string][] = [
    [/\bEC\b/, 'EC'], [/\bSC\b/, 'SC'], [/\bWP\b/, 'WP'], [/\bWDG\b/, 'WDG'],
    [/\bWG\b/, 'WG'], [/\bDF\b/, 'DF'], [/\bGR\b/, 'GR'], [/\bSL\b/, 'SL'],
    [/\bSP\b/, 'SP'], [/\bULV\b/, 'ULV'], [/\bEW\b/, 'EW'], [/\bFS\b/, 'FS'],
    [/\bOD\b/, 'OD'], [/\bSE\b/, 'SE'], [/\bCS\b/, 'CS'], [/\bDC\b/, 'DC'],
    [/\bMC\b/, 'MC'], [/\bZC\b/, 'ZC'], [/\bSG\b/, 'SG'], [/\bLURE?\b/, 'Lure'],
    [/\bTABLET\b/, 'Tablet'], [/\bPOWDER\b/, 'Powder'],
  ];
  for (const [pattern, form] of patterns) {
    if (pattern.test(upper)) return form;
  }
  return 'Unknown';
}

function resolveMoAForProduct(commonName: string): { code: string; group: string; risk: string; subGroup?: string; targetSite?: string; resolved: boolean; committees: string[] } {
  const resolved = resolveMoA(commonName);
  if (!resolved.resolved) {
    return { code: 'Unknown', group: 'Unknown', risk: 'Unknown', resolved: false, committees: [] };
  }
  const moa = MOA_DATABASE.find((m) => m.code === resolved.moaCode) || MOA_DATABASE.find((m) => m.code.startsWith(resolved.moaCode.split(' ')[0] + ' '));
  return {
    code: resolved.moaCode,
    group: resolved.moaGroup,
    risk: resolved.resistanceRisk,
    subGroup: moa?.subGroup,
    targetSite: moa?.targetSite,
    resolved: resolved.resolved,
    committees: resolved.committees,
  };
}

function extractProducts(filePath: string): SourceProduct[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const category = inferCategory(filePath);
  const rows = parseCSVFile(content);

  let headerRowIndex = -1;
  let fileTitle = '';
  for (let i = 0; i < rows.length; i++) {
    const rowText = rows[i].join(' ').toLowerCase();
    if (rowText.includes('registered') && (rowText.includes('insecticides') || rowText.includes('fungicides') || rowText.includes('herbicides') || rowText.includes('miticides'))) {
      fileTitle = rows[i].join(' ').trim();
    }
    if (rowText.includes('common name') && rowText.includes('brand name') && rowText.includes('registration no')) {
      headerRowIndex = i;
      break;
    }
  }
  if (headerRowIndex === -1) headerRowIndex = 4;

  const products: SourceProduct[] = [];
  let lastCommonName = '';

  for (let i = headerRowIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 10) continue;

    let commonName = row[2] ? row[2].trim() : '';
    if (!commonName) commonName = lastCommonName;
    else lastCommonName = commonName;

    if (!commonName) continue;

    const type = inferCategory(filePath);
    const crops = row[7] ? row[7].split(',').map((c) => c.trim()).filter(Boolean) : [];
    const pests = row[8] ? row[8].split(',').map((p) => p.trim()).filter(Boolean) : [];
    const moaResolved = resolveMoAForProduct(commonName);

    products.push({
      type,
      commonName,
      tradeName: row[4] ? row[4].trim() : '',
      registrationNo: row[5] ? row[5].trim() : '',
      registrationHolder: row[6] ? row[6].trim() : '',
      crops,
      pests,
      dosageRate: row[9] ? row[9].trim() : '',
      moaCode: moaResolved.code,
      moaGroup: moaResolved.group,
      moaSubGroup: moaResolved.subGroup,
      moaTargetSite: moaResolved.targetSite,
      resistanceRisk: moaResolved.risk,
      toxicityClass: 'III - Slightly Hazardous',
      whoColor: moaResolved.code.includes('UN') || moaResolved.code === 'Unknown' ? '#3b82f6' : '#eab308',
      formulation: detectFormulation(row[4] || ''),
      phiDays: 14,
      reiHours: 24,
      waterVolumeLPerHa: 500,
      safetyNotes: [],
      rotationNotes: '',
    });
  }
  return products;
}

function escapeTS(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

function generateTypeScript(products: SourceProduct[], sources: string[], meeting: string, date: string): string {
  const entries = products
    .map((p) => {
      const moaSubGroup = p.moaSubGroup ? `\n    moaSubGroup: '${escapeTS(p.moaSubGroup)}',` : '';
      const moaTargetSite = p.moaTargetSite ? `\n    moaTargetSite: '${escapeTS(p.moaTargetSite)}',` : '';
      return `  {
    id: '${p.type.toLowerCase().substring(0, 3)}-${products.indexOf(p).toString().padStart(3, '0')}',
    type: '${p.type}',
    commonName: '${escapeTS(p.commonName)}',
    tradeName: '${escapeTS(p.tradeName)}',
    registrationNo: '${escapeTS(p.registrationNo)}',
    registrationHolder: '${escapeTS(p.registrationHolder)}',
    crops: [${p.crops.map((c) => `'${escapeTS(c)}'`).join(', ')}],
    pests: [${p.pests.map((p2) => `'${escapeTS(p2)}'`).join(', ')}],
    dosageRate: '${escapeTS(p.dosageRate)}',
    moaCode: '${p.moaCode}',
    moaGroup: '${escapeTS(p.moaGroup)}',${moaSubGroup}${moaTargetSite}
    resistanceRisk: '${p.resistanceRisk}',
    toxicityClass: '${p.toxicityClass}',
    whoColor: '${p.whoColor}',
    formulation: '${p.formulation}',
    phiDays: ${p.phiDays},
    reiHours: ${p.reiHours},
    waterVolumeLPerHa: ${p.waterVolumeLPerHa},
    safetyNotes: ${JSON.stringify(p.safetyNotes)},
    rotationNotes: '${escapeTS(p.rotationNotes)}'
  }`;
    })
    .join(',\n');

  return `import { ChemicalProduct } from '../types';

export const SOURCE_META = {
  sources: ${JSON.stringify(sources, null, 2)},
  meeting: '${meeting}',
  extractionDate: '${date}',
} as const;

export const SOURCE_PESTICIDES: ChemicalProduct[] = [
${entries}
];
`;
}

function main() {
  const files = fs.readdirSync(SOURCE_DIR).filter((f) => f.endsWith('.csv')).map((f) => path.join(SOURCE_DIR, f)).sort();
  console.log(`Processing ${files.length} CSV files`);

  const allProducts: SourceProduct[] = [];
  for (const filePath of files) {
    const products = extractProducts(filePath);
    console.log(`  ${path.basename(filePath)}: ${products.length} products`);
    allProducts.push(...products);
  }
  console.log(`Total products: ${allProducts.length}`);

  const seen = new Set<string>();
  const unique: SourceProduct[] = [];
  for (const p of allProducts) {
    const key = `${p.registrationNo}|${p.tradeName}|${p.commonName}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(p);
    }
  }
  console.log(`Unique products: ${unique.length}`);

  let unresolved = 0;
  unique.forEach((p) => { if (p.moaCode === 'Unknown' || p.moaCode.includes('UN')) unresolved++; });
  console.log(`Unresolved MoA: ${unresolved}`);

  const tsContent = generateTypeScript(unique, files.map((f) => path.basename(f)), '81st PTAC Meeting', new Date().toISOString().split('T')[0]);
  fs.writeFileSync(OUTPUT_PATH, tsContent);
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
