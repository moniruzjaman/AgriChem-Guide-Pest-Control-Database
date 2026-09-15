import { MOA_DATABASE } from './moaData';
import { ChemicalProduct } from '../types';

export interface MoAResolution {
  moaCode: string;
  moaGroup: string;
  moaSubGroup?: string;
  moaTargetSite?: string;
  resistanceRisk: string;
  resolved: boolean;
  committees: string[];
}

const ALIASES: Record<string, string> = {
  'emamectin': 'Emamectin Benzoate',
  'emamectin benzoate': 'Emamectin Benzoate',
  'milbemectin': 'Milbemycins',
  'milbemycin': 'Milbemycins',
  'sulfur': 'Sulphur',
  'sulphur 80% wg': 'Sulphur',
  'sulphur 80% wp': 'Sulphur',
  'copper hydroxide': 'Copper hydroxide',
  'copper oxychloride': 'Copper oxychloride',
  'tri basic copper sulph': 'Tri Basic Copper Sulpha',
  'tri basic copper supha': 'Tri Basic Copper Sulpha',
  'tri basic copper sulpha': 'Tri Basic Copper Sulpha',
  'cartap': 'Cartap Hydrochloride',
  'thiodicarb': 'Thiodicarb',
  'methomyl': 'Methomyl',
  'propiconazole': 'Propiconazole',
  'chlorfenapyr': 'Chlorfenapyr',
  'buprofezin': 'Buprofezin',
  'pymetrozine': 'Pymetrozine',
  'spirotetramat': 'Spirotetramat',
  'spinosad': 'Spinosad',
  'spinetoram': 'Spinetoram',
  'abamectin': 'Abamectin',
  'acetamiprid': 'Acetamiprid',
  'imidacloprid': 'Imidacloprid',
  'thiamethoxam': 'Thiamethoxam',
  'thiacloprid': 'Thiacloprid',
  'clothianidin': 'Clothianidin',
  'chlorantraniliprole': 'Chlorantraniliprole',
  'cypermethrin': 'Cypermethrin',
  'alpha cypermethrin': 'Alpha Cypermethrin',
  'beta cypermethrin': 'Beta Cypermethrin',
  'zeta cypermethrin': 'Zeta Cypermethrin',
  'deltamethrin': 'Deltamethrin',
  'lambda cyhalothrin': 'Lambda Cyhalothrin',
  'bifenthrin': 'Bifenthrin',
  'fenvalerate': 'Fenvalerate',
  'esfenvalerate': 'Esfenvalerate',
  'fenpropathrin': 'Fenpropathrin',
  'endosulfan': 'Endosulfan',
  'chlordane': 'Chlordane',
  'ethiprole': 'Ethiprole',
  'fipronil': 'Fipronil',
  'acephate': 'Acephate',
  'chlorpyrifos': 'Chlorpyrifos',
  'diazinon': 'Diazinon',
  'dimethoate': 'Dimethoate',
  'fenitrothion': 'Fenitrothion',
  'fenthion': 'Fenthion',
  'malathion': 'Malathion',
  'phenthoate': 'Phenthoate',
  'quinalphos': 'Quinalphos',
  'profenofos': 'Profenofos',
  'triazophos': 'Triazophos',
  'carbaryl': 'Carbaryl',
  'carbofuran': 'Carbofuran',
  'carbosulfan': 'Carbosulfan',
  'isoprocarb (micp)': 'Isoprocarb (MIPC)',
  'isoprocarb': 'Isoprocarb (MIPC)',
  'aldicarb': 'Aldicarb',
  'hexythiazox': 'Hexythiazox',
  'propargite': 'Propargite',
  'bromopropylate': 'Bromopropylate',
  'isoprothiolane': 'Isoprothiolane',
  'kasugamycin': 'Kasugamycin',
  'mancozeb': 'Mancozeb',
  'metalaxyl': 'Metalaxyl',
  'metiram complex': 'Metiram complex',
  'mismarthiozol': 'Mismarthiozol',
  'propamocarb': 'Propamocarb',
  'propineb': 'Propineb',
  'tricyclazole': 'Tricyclazole',
  'tridemorph': 'Tridemorph',
  'zineb': 'Zineb',
  'azoxystrobin': 'Azoxystrobin',
  'carbendazim': 'Carbendazim',
  'chlorothalonil': 'Chlorothalonil',
  'difenoconazole': 'Difenoconazole',
  'diniconazole': 'Diniconazole',
  'edifenphos': 'Edifenphos',
  'epoxiconazole': 'Epoxiconazole',
  'flusilazole': 'Flusilazole',
  'iprodione': 'Iprodione',
  'thiophanate-methyl': 'Thiophanate-methyl',
  'tebuconazole': 'Tebuconazole',
};

function normalize(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

function cleanActive(active: string): string {
  return active.trim().replace(/\s*\(.*?\)\s*/g, '').trim();
}

function buildLookup(): Map<string, typeof MOA_DATABASE[0]> {
  const lookup = new Map<string, typeof MOA_DATABASE[0]>();
  MOA_DATABASE.forEach((moa) => {
    moa.primaryActives.forEach((active) => {
      lookup.set(normalize(active), moa);
      const cleaned = normalize(cleanActive(active));
      if (cleaned !== normalize(active)) {
        lookup.set(cleaned, moa);
      }
    });
  });
  return lookup;
}

function buildAliasLookup(): Map<string, typeof MOA_DATABASE[0]> {
  const aliasLookup = new Map<string, typeof MOA_DATABASE[0]>();
  const lookup = buildLookup();
  Object.entries(ALIASES).forEach(([alias, canonical]) => {
    const moa = lookup.get(normalize(canonical));
    if (moa) {
      aliasLookup.set(normalize(alias), moa);
    }
  });
  return aliasLookup;
}

const MOA_LOOKUP = buildLookup();
const MOA_ALIAS_LOOKUP = buildAliasLookup();

function resolveSingleActive(active: string): typeof MOA_DATABASE[0] | undefined {
  const norm = normalize(active);
  if (MOA_LOOKUP.has(norm)) return MOA_LOOKUP.get(norm);
  if (MOA_ALIAS_LOOKUP.has(norm)) return MOA_ALIAS_LOOKUP.get(norm);
  const simple = norm.replace(/[^a-z0-9]/g, '');
  for (const [key, moa] of MOA_LOOKUP) {
    const keySimple = key.replace(/[^a-z0-9]/g, '');
    if (keySimple === simple) return moa;
  }
  return undefined;
}

export function resolveMoA(commonName: string): MoAResolution {
  if (!commonName || !commonName.trim()) {
    return { moaCode: 'Unknown', moaGroup: 'Unknown', resistanceRisk: 'Unknown', resolved: false, committees: [] };
  }

  const name = commonName.trim();

  if (name.includes('+') || name.includes('&')) {
    const parts = name.split(/[+\&]/).map((p) => p.trim());
    const resolvedParts: MoAResolution[] = [];
    const committees = new Set<string>();
    let allUnknown = true;

    for (const part of parts) {
      if (part.includes('(') && part.includes(')')) {
        const match = part.match(/\(([^)]+)\)/);
        if (match) {
          const inner = match[1];
          const moa = resolveSingleActive(inner);
          if (moa) {
            resolvedParts.push({
              moaCode: moa.code,
              moaGroup: moa.name,
              moaSubGroup: moa.subGroup,
              moaTargetSite: moa.targetSite,
              resistanceRisk: moa.resistanceRisk,
              resolved: true,
              committees: [moa.type],
            });
            committees.add(moa.type);
            allUnknown = false;
          }
        }
      } else {
        const moa = resolveSingleActive(part);
        if (moa) {
          resolvedParts.push({
            moaCode: moa.code,
            moaGroup: moa.name,
            moaSubGroup: moa.subGroup,
            moaTargetSite: moa.targetSite,
            resistanceRisk: moa.resistanceRisk,
            resolved: true,
            committees: [moa.type],
          });
          committees.add(moa.type);
          allUnknown = false;
        }
      }
    }

    if (resolvedParts.length === 0) {
      return { moaCode: 'Unknown', moaGroup: 'Unknown', resistanceRisk: 'Unknown', resolved: false, committees: [] };
    }

    const moaCode = resolvedParts.map((p) => p.moaCode).join(' + ');
    const moaGroup = resolvedParts.map((p) => p.moaGroup).join(' + ');
    const resistanceRisk = resolvedParts.some((p) => p.resistanceRisk === 'High')
      ? 'High'
      : resolvedParts.some((p) => p.resistanceRisk === 'Medium to High' || p.resistanceRisk === 'Medium')
        ? 'Medium'
        : 'Low';

    return {
      moaCode,
      moaGroup,
      resistanceRisk,
      resolved: !allUnknown,
      committees: Array.from(committees),
    };
  }

  if (name.includes('(') && name.includes(')')) {
    const match = name.match(/\(([^)]+)\)/);
    if (match) {
      const inner = match[1];
      const moa = resolveSingleActive(inner);
      if (moa) {
        return {
          moaCode: moa.code,
          moaGroup: moa.name,
          moaSubGroup: moa.subGroup,
          moaTargetSite: moa.targetSite,
          resistanceRisk: moa.resistanceRisk,
          resolved: true,
          committees: [moa.type],
        };
      }
    }
  }

  const moa = resolveSingleActive(name);
  if (moa) {
    return {
      moaCode: moa.code,
      moaGroup: moa.name,
      moaSubGroup: moa.subGroup,
      moaTargetSite: moa.targetSite,
      resistanceRisk: moa.resistanceRisk,
      resolved: true,
      committees: [moa.type],
    };
  }

  return { moaCode: 'Unknown', moaGroup: 'Unknown', resistanceRisk: 'Unknown', resolved: false, committees: [] };
}

export function enrichProductWithMoA(product: ChemicalProduct): ChemicalProduct {
  const resolved = resolveMoA(product.commonName);
  return {
    ...product,
    moaCode: resolved.moaCode,
    moaGroup: resolved.moaGroup,
    moaSubGroup: resolved.moaSubGroup,
    moaTargetSite: resolved.moaTargetSite,
  };
}

export { MOA_DATABASE, MOA_LOOKUP, MOA_ALIAS_LOOKUP };
