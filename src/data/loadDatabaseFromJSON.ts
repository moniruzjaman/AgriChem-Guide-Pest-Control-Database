/**
 * loadDatabaseFromJSON.ts
 * =======================
 *
 * Fetches the pre-computed pesticide database JSON at runtime instead of
 * bundling 7+ MB of inline TypeScript data in the JS bundle.
 *
 * The JSON file at /downloads/pesticide_database.json contains the same
 * ChemicalProduct[] array that allPesticidesData.ts used to produce at
 * module load time, but as a compact JSON fetch (~2.4 MB gzipped).
 *
 * On first load, this adds a network fetch (~1-2 seconds on 3G). On
 * subsequent loads, the service worker runtime cache serves it instantly.
 */

import type { ChemicalProduct, ChemicalType } from '../types';

/** URL of the pre-computed JSON database (served from /public/downloads/). */
const DATABASE_JSON_URL = '/downloads/pesticide_database.json';

/**
 * Raw product shape from the JSON (matches the Python generator's output).
 * Most fields map directly to ChemicalProduct; a few need type coercion.
 */
interface RawProduct {
  id: string;
  type: string;
  commonName: string;
  activeIngredients?: string[];
  tradeName: string;
  registrationNo: string;
  registrationHolder: string;
  crops: string[];
  pests: string[];
  dosageRate: string;
  moaCode?: string | null;
  recommendations?: string[] | null;
  source?: string;
  scheme?: string | null;
  groupNo?: string | null;
  moaDescription?: string | null;
  targetSite?: string | null;
  hhpStatus?: string | null;
  hazardousActivesMatched?: string | null;
  euGlobalRegulatoryStatus?: string | null;
  bangladeshPolicyAction?: string | null;
  policyRiskTier?: string | null;
  formulationCode?: string | null;
  formulationTypePhysicality?: string | null;
  physicalForm?: string | null;
  coFormulantInertConcern?: string | null;
}

/**
 * Fetch and parse the pre-computed pesticide database JSON.
 *
 * Returns a ChemicalProduct[] array ready for merging with curated data.
 * If the fetch fails (e.g. offline before first cache), returns an empty
 * array so the app still loads with curated data only.
 */
async function readRawProducts(): Promise<RawProduct[]> {
  if (typeof window !== 'undefined') {
    const response = await fetch(DATABASE_JSON_URL, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as RawProduct[];
  }

  const { readFile } = await import('node:fs/promises');
  const { fileURLToPath } = await import('node:url');
  const { dirname, resolve } = await import('node:path');
  const here = dirname(fileURLToPath(import.meta.url));
  const jsonPath = resolve(here, '../../public/downloads/pesticide_database.json');
  const text = await readFile(jsonPath, 'utf8');
  return JSON.parse(text) as RawProduct[];
}

export async function loadDatabaseFromJSON(): Promise<ChemicalProduct[]> {
  try {
    const raw = await readRawProducts();

    // Map raw JSON products to ChemicalProduct shape
    const products: ChemicalProduct[] = raw.map((r) => {
      const type = r.type as ChemicalType;
      const moaCode = r.moaCode ?? undefined;
      return {
        id: r.id,
        type,
        commonName: r.commonName,
        activeIngredients: r.activeIngredients,
        tradeName: r.tradeName,
        registrationNo: r.registrationNo,
        registrationHolder: r.registrationHolder,
        crops: r.crops,
        pests: r.pests,
        dosageRate: r.dosageRate,
        moaCode,
        recommendations: r.recommendations ?? undefined,
        source: (r.source as 'curated' | 'dae-register') ?? 'dae-register',
        // Policy enrichment fields
        scheme: r.scheme ?? undefined,
        groupNo: r.groupNo ?? undefined,
        moaDescription: r.moaDescription ?? undefined,
        targetSite: r.targetSite ?? undefined,
        hhpStatus: r.hhpStatus ?? undefined,
        hazardousActivesMatched: r.hazardousActivesMatched ?? undefined,
        euGlobalRegulatoryStatus: r.euGlobalRegulatoryStatus ?? undefined,
        bangladeshPolicyAction: r.bangladeshPolicyAction ?? undefined,
        policyRiskTier: r.policyRiskTier as ChemicalProduct['policyRiskTier'],
        formulationCode: r.formulationCode ?? undefined,
        formulationTypePhysicality: r.formulationTypePhysicality ?? undefined,
        coFormulantInertConcern: r.coFormulantInertConcern ?? undefined,
      };
    });

    if (typeof console !== 'undefined' && console.debug) {
      console.debug(
        `[loadDatabaseFromJSON] Loaded ${products.length.toLocaleString()} products from JSON`
      );
    }

    return products;
  } catch (err) {
    console.warn('[loadDatabaseFromJSON] Failed to fetch database JSON:', err);
    return [];
  }
}
