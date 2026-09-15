/**
 * Quick smoke test for the merged PESTICIDES_DATABASE.
 *
 * Verifies that:
 *   1. PESTICIDES_DATABASE has substantially more entries than the curated
 *      set alone (i.e. the DAE register dump was actually merged in).
 *   2. CROP_LIST now contains new crops surfaced from the DAE register.
 *   3. Some products have populated `recommendations` arrays with multiple
 *      lines (proving the newline fix flowed through end-to-end).
 *   4. No two products in PESTICIDES_DATABASE share the same registration
 *      number (dedupe is working).
 *
 * Run with: bun run scripts/smoke-test.ts
 */
import { PESTICIDES_DATABASE, CROP_LIST } from '../src/data/pesticidesData';

console.log('--- PESTICIDES_DATABASE smoke test ---');
console.log(`Total products: ${PESTICIDES_DATABASE.length}`);
console.log(`Total crops in CROP_LIST: ${CROP_LIST.length}`);

// Count products with recommendations
const withRecs = PESTICIDES_DATABASE.filter((p) => (p.recommendations?.length ?? 0) > 0);
console.log(`Products with structured recommendations: ${withRecs.length}`);

// Find a product with multiple recommendation lines (multi-line proof)
const multiLine = PESTICIDES_DATABASE.find(
  (p) => (p.recommendations?.length ?? 0) >= 3
);
if (multiLine) {
  console.log('\nSample multi-line recommendations product:');
  console.log(`  tradeName:        ${multiLine.tradeName} (${multiLine.registrationNo})`);
  console.log(`  commonName:       ${multiLine.commonName}`);
  console.log(`  type:             ${multiLine.type}`);
  console.log(`  moaCode:          ${multiLine.moaCode}`);
  console.log(`  moaGroup:         ${multiLine.moaGroup}`);
  console.log(`  resistanceRisk:   ${multiLine.resistanceRisk}`);
  console.log(`  toxicityClass:    ${multiLine.toxicityClass}`);
  console.log(`  recommendations:`);
  for (const line of multiLine.recommendations ?? []) {
    console.log(`    - ${line}`);
  }
} else {
  console.warn('WARN: no product with >=3 recommendation lines found');
}

// Dedupe check: count distinct registration numbers
const regNos = new Set<string>();
let dupes = 0;
for (const p of PESTICIDES_DATABASE) {
  const key = (p.registrationNo ?? '').toLowerCase().trim();
  if (regNos.has(key)) dupes += 1;
  else regNos.add(key);
}
console.log(`\nDistinct registration numbers: ${regNos.size}`);
console.log(`Duplicate registration numbers: ${dupes}`);

// Per-type counts
const byType: Record<string, number> = {};
for (const p of PESTICIDES_DATABASE) {
  byType[p.type] = (byType[p.type] ?? 0) + 1;
}
console.log('\nProducts per type:');
for (const [t, n] of Object.entries(byType).sort()) {
  console.log(`  ${t.padEnd(28)} ${n}`);
}

console.log('\n--- sample of new crops surfaced from DAE register ---');
const baseCrops = new Set([
  'All Crops','Rice','Potato','Tomato','Brinjal','Mango','Jute','Tea','Cabbage',
  'Cauliflower','Chili','Chilli','Bean','Wheat','Sugarcane','Onion','Cotton',
  'Maize','Cucumber','Bitter Gourd','Pointed Gourd','Mustard','Groundnut',
  'Store & Field','Warehouse',
]);
const newCrops = CROP_LIST.filter((c) => !baseCrops.has(c)).slice(0, 25);
console.log(`  ${newCrops.join(', ')}`);
