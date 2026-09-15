import { ChemicalProduct } from '../types';
import { INSECTICIDES_DATABASE } from './insecticidesData';
import { FUNGICIDES_DATABASE } from './fungicidesData';
import { HERBICIDES_DATABASE } from './herbicidesData';
import { MITICIDES_DATABASE } from './miticidesData';
import { BIO_AND_OTHER_DATABASE } from './bioAndOtherData';
import { ALL_PESTICIDES_DATABASE } from './allPesticidesData';

/**
 * Curated, hand-enriched dataset. Treated as authoritative — when a product
 * appears both here and in the DAE register dump below, the curated entry
 * wins and the DAE duplicate is filtered out.
 */
const CURATED_DATABASE: ChemicalProduct[] = [
  ...INSECTICIDES_DATABASE,
  ...FUNGICIDES_DATABASE,
  ...HERBICIDES_DATABASE,
  ...MITICIDES_DATABASE,
  ...BIO_AND_OTHER_DATABASE,
];

/**
 * Build a deduplicated master database. Curated entries are emitted first;
 * DAE entries are appended only when their registration number is not
 * already present in the curated set. This avoids duplicate cards in the
 * database view while still exposing the full DAE register (5,000+ rows).
 *
 * The merge runs once at module load and the result is memoised in
 * ``PESTICIDES_DATABASE`` for the lifetime of the page.
 */
function buildMergedDatabase(): ChemicalProduct[] {
  const seenRegNos = new Set<string>();
  const merged: ChemicalProduct[] = [];

  // 1. Curated dataset first (authoritative).
  for (const product of CURATED_DATABASE) {
    const regNo = (product.registrationNo ?? '').toLowerCase().trim();
    if (regNo && !seenRegNos.has(regNo)) {
      seenRegNos.add(regNo);
    }
    merged.push(product);
  }

  // 2. DAE register dump — skip duplicates by registration number.
  let daeAppended = 0;
  for (const product of ALL_PESTICIDES_DATABASE) {
    const regNo = (product.registrationNo ?? '').toLowerCase().trim();
    if (regNo && seenRegNos.has(regNo)) {
      continue;
    }
    if (regNo) {
      seenRegNos.add(regNo);
    }
    merged.push(product);
    daeAppended += 1;
  }

  // Defensive: if the dedupe filtered too aggressively, log a warning in dev.
  // (In production this is a no-op aside from setting the property.)
  if (typeof console !== 'undefined' && console.debug) {
    console.debug(
      `[pesticidesData] curated=${CURATED_DATABASE.length} ` +
        `daeTotal=${ALL_PESTICIDES_DATABASE.length} ` +
        `daeAppended=${daeAppended} mergedTotal=${merged.length}`
    );
  }

  return merged;
}

export const PESTICIDES_DATABASE: ChemicalProduct[] = buildMergedDatabase();

/**
 * Curated crop filter list. Augmented at runtime with the union of all
 * crops referenced by ``PESTICIDES_DATABASE`` so that the database filter
 * dropdown always exposes every available crop, including new ones
 * surfaced from the DAE register dump (e.g. "Cucurbits", "Pulses",
 * "Citrus", etc.).
 */
const BASE_CROP_LIST: string[] = [
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
  'Warehouse',
];

const EXTRA_CROPS_FROM_DATABASE: string[] = (() => {
  const seen = new Set<string>(BASE_CROP_LIST.map((c) => c.toLowerCase()));
  const extras: string[] = [];
  for (const product of PESTICIDES_DATABASE) {
    for (const crop of product.crops ?? []) {
      const key = crop.toLowerCase().trim();
      if (key && !seen.has(key)) {
        seen.add(key);
        extras.push(crop.trim());
      }
    }
  }
  // Sort alphabetically for stable filter UI.
  extras.sort((a, b) => a.localeCompare(b));
  return extras;
})();

export const CROP_LIST: string[] = [...BASE_CROP_LIST, ...EXTRA_CROPS_FROM_DATABASE];
