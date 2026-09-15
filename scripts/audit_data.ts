/**
 * Audit script: verify the merged catalogue counts that every view should
 * display after loading through src/data/loadDatabase.ts.
 *
 * Run with:  bun run scripts/audit_data.ts
 */
import { loadDatabase } from '../src/data/loadDatabase';

const { products, baselineCount, cropList } = await loadDatabase();

const byType: Record<string, number> = {};
for (const p of products) {
  byType[p.type] = (byType[p.type] ?? 0) + 1;
}

const withRecs = products.filter((p) => (p.recommendations?.length ?? 0) > 0).length;
const sources: Record<string, number> = {};
for (const p of products) {
  const key = p.source ?? 'curated';
  sources[key] = (sources[key] ?? 0) + 1;
}

console.log('=== MERGED CATALOGUE (what the app displays) ===');
console.log('baseline (built-in) products :', baselineCount);
console.log('products incl. custom rows  :', products.length);
console.log('crop list entries           :', cropList.length);
console.log('structured recommendations  :', withRecs);

console.log('\n=== SOURCE BREAKDOWN ===');
console.log(JSON.stringify(sources, null, 2));

console.log('\n=== TYPE BREAKDOWN (after Stored Grain normalisation) ===');
console.log(JSON.stringify(byType, null, 2));

// Hard assertions — fail loudly if the merged data regresses.
//   136 crops = the original 137 minus the malformed `"` artifact row.
//   5,439 recs = 4,454 DAE rows + 985 curated entries enriched from their DAE twin.
const expected = { baseline: 5711, recs: 5439, crops: 136 };
const problems: string[] = [];
if (baselineCount !== expected.baseline)
  problems.push(`baselineCount ${baselineCount} != ${expected.baseline}`);
if (withRecs !== expected.recs)
  problems.push(`recommendations ${withRecs} != ${expected.recs}`);
if (cropList.length !== expected.crops)
  problems.push(`cropList ${cropList.length} != ${expected.crops}`);
if (byType['Stored Grain'])
  problems.push('legacy "Stored Grain" type still present — should be normalised');

if (problems.length) {
  console.error('\n❌ AUDIT FAILED:\n' + problems.map((p) => ` - ${p}`).join('\n'));
  process.exit(1);
}
console.log('\n✅ AUDIT PASSED — merged catalogue intact and consistent.');
