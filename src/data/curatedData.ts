import { ChemicalProduct } from '../types';
import { INSECTICIDES_DATABASE } from './insecticidesData';
import { FUNGICIDES_DATABASE } from './fungicidesData';
import { HERBICIDES_DATABASE } from './herbicidesData';
import { MITICIDES_DATABASE } from './miticidesData';
import { BIO_AND_OTHER_DATABASE } from './bioAndOtherData';

/**
 * Curated, hand-enriched dataset. Treated as authoritative — when a product
 * appears both here and in the DAE register dump, the curated entry wins and
 * the DAE duplicate is filtered out (see loadDatabase.ts).
 *
 * NOTE: ``ADDITIONAL_PESTICIDES`` (former additionalPesticides.ts) was a
 * fully redundant copy of entries already present in the five databases
 * below and has been removed to avoid conflicting duplicates. Legacy
 * ``Stored Grain`` type labels are normalised to the canonical
 * ``Store Grain Insecticide`` class by loadDatabase.ts at merge time.
 *
 * This module is loaded via dynamic import (see loadDatabase.ts) so the
 * ~1.3 MB of curated records stays out of the main application bundle.
 */
export const CURATED_DATABASE: ChemicalProduct[] = [
  ...INSECTICIDES_DATABASE,
  ...FUNGICIDES_DATABASE,
  ...HERBICIDES_DATABASE,
  ...MITICIDES_DATABASE,
  ...BIO_AND_OTHER_DATABASE,
];
