/**
 * Audit script: exact MoA group counts the app displays, computed with the
 * app's own code (src/utils/moaUtils.ts atomicMoaGroups / canonicalMoaCode)
 * over the same products array the views read (src/data/loadDatabase.ts).
 *
 * Run with:  bun run scripts/audit_moa_groups.ts
 */
import { atomicMoaGroups } from '../src/utils/moaUtils';
import { loadDatabase } from '../src/data/loadDatabase';

const { products } = await loadDatabase();

const withMoa = products.filter((p) => (p.moaCode || '').trim());
const rawSet = new Set(withMoa.map((p) => p.moaCode));
const atomic = atomicMoaGroups(withMoa.map((p) => p.moaCode));
const atomicSet = new Set(atomic);

// Per-scheme atomic split, mirroring the app's grouping (IRAC/FRAC/HRAC/other)
const per = { IRAC: 0, FRAC: 0, HRAC: 0, other: 0 } as Record<string, number>;
for (const g of atomicSet) {
  if (g.startsWith('IRAC')) per.IRAC += 1;
  else if (g.startsWith('FRAC')) per.FRAC += 1;
  else if (g.startsWith('HRAC')) per.HRAC += 1;
  else per.other += 1;
}

console.log('=== MoA GROUP COUNTS (app code, merged catalogue) ===');
console.log('products total                  :', products.length);
console.log('products with MoA                :', withMoa.length);
console.log('raw distinct code strings        :', rawSet.size);
console.log('atomic distinct groups           :', atomicSet.size);
console.log('atomic per-scheme                :', JSON.stringify(per));
console.log('combination products (multi-atom):', withMoa.filter((p) => atomicMoaGroups([p.moaCode]).length > 1).length);
