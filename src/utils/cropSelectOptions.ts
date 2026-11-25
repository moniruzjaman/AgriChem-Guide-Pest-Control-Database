/**
 * cropSelectOptions.ts
 * ====================
 * Shared crop option builder — the single source every tab uses to fill
 * crop pickers with the full crop list from the pesticide database.
 *
 * Why: the database's registered products mention 100+ distinct crops,
 * but forms across the app each built their own list (SprayLog left crop
 * as free text, ProtectionView hardcoded 12, MyFieldView capped at 80 and
 * used a native <select>). This helper derives options from the products
 * the app already loaded, translates labels, and hands them to the shared
 * SearchableSelect combobox so crop entry everywhere becomes type-to-
 * filter instead of typing from memory.
 */

import type { ChemicalProduct } from '../types';
import type { SearchableSelectOption } from '../components/SearchableSelect';

/** All distinct crops in the product database, sorted alphabetically. */
export function databaseCrops(products: ChemicalProduct[] | null | undefined): string[] {
  if (!products || products.length === 0) return [];
  const set = new Set<string>();
  products.forEach((p) => p.crops.forEach((c) => {
    const v = (c || '').trim();
    if (v) set.add(v);
  }));
  return Array.from(set).sort();
}

/** All distinct pests in the product database, sorted alphabetically. */
export function databasePests(products: ChemicalProduct[] | null | undefined): string[] {
  if (!products || products.length === 0) return [];
  const set = new Set<string>();
  products.forEach((p) => p.pests.forEach((x) => {
    const v = (x || '').trim();
    if (v) set.add(v);
  }));
  return Array.from(set).sort();
}

/**
 * SearchableSelect options for every database crop. `transCrop` comes from
 * the LanguageContext so labels render Bangla in bn mode; the raw English
 * value rides along as a search keyword so either script matches.
 */
export function databaseCropOptions(
  products: ChemicalProduct[] | null | undefined,
  transCrop: (c: string) => string
): SearchableSelectOption[] {
  return databaseCrops(products).map((c) => ({
    value: c,
    label: transCrop(c),
    keywords: c,
  }));
}

/** Same as databaseCropOptions but for pests (label + EN keyword). */
export function databasePestOptions(
  products: ChemicalProduct[] | null | undefined,
  transPest: (p: string) => string
): SearchableSelectOption[] {
  return databasePests(products).map((p) => ({
    value: p,
    label: transPest(p),
    keywords: p,
  }));
}
