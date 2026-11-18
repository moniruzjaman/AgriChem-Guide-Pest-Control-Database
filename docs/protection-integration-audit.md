# Protection Intelligence Integration — Repository Audit

**Repo:** PesticideNext / AgriChem-Guide-Pest-Control-Database (`pesticide.krishiai.live`)
**Audit date:** 2026-11-18 · **Audit type:** source-code-first (all claims carry file:line evidence)
**Scope:** routes/navigation, intelligence pipeline, KWI integration, registry/loader, eligibility, MoA rotation, spray history, field records, tests.

---

## 1. Baseline status (before any change)

| Check | Command | Result |
|---|---|---|
| Typecheck | `npm run lint` (= `tsc --noEmit`) | ✅ clean |
| Unit tests | `npm test` (= `vitest run`) | ✅ 62 passed / 0 failed (2 files) |
| Production build | `npm run build` | ✅ (see §9) |

Test inventory: `src/utils/__tests__/moaRotationEngine.test.ts` (11 describes, ~35 `it`) and `src/utils/__tests__/scanUtils.test.ts` (9 describes). Vitest config: node environment, `src/**/*.{test,spec}.{ts,tsx}`. There is **no ESLint** — "lint" is purely `tsc --noEmit` (package.json:12). tsconfig is lenient (no `strict`, no `strictNullChecks`; tsconfig.json:1-26).

---

## 2. Routes & navigation

State-based navigation with hash-routing sync — **no react-router**. `AppTab` union at `src/types/index.ts:161`:
`'home' | 'database' | 'calculator' | 'rotation' | 'safety' | 'guidebook' | 'alerts' | 'myfield' | 'intelligence' | 'specialist'`.

| Tab | Component | Render site |
|---|---|---|
| home | `HomeView` (eager) | App.tsx:435-447 |
| database | `DatabaseView` (lazy) | App.tsx:449-463 |
| calculator | `DosageCalculatorModal` inline-as-page | App.tsx:465-498 |
| rotation | `RotationPlanner` (lazy) | App.tsx:500-509 |
| safety | `SafetyView` (lazy) | App.tsx:511-518 |
| guidebook | `Guidebook` (lazy) | App.tsx:520-524 |
| alerts | `NotificationCenter` (lazy) | App.tsx:526-535 |
| intelligence | `PesticideIntelligenceView` (**eager**) | App.tsx:537 |
| specialist | `SpecialistSearchView` (lazy) | App.tsx:539-547 |
| myfield | `MyFieldView` (lazy; embeds `SprayLogView` at MyFieldView.tsx:29-31,403) | App.tsx:549-556 |

**Pattern to add a tab** (needed for Task 6): extend `AppTab` union (types/index.ts:161) → add to `VALID_TABS` whitelist (App.tsx:189) → lazy-declare + render in the App switch (pattern App.tsx:39-44, 500-509) → Navbar tab button (Navbar.tsx:434 one-liner pattern) → NavigationDrawer entry (NavigationDrawer.tsx:199) → BottomNav `MORE_TABS` array (BottomNav.tsx:34).

Design system: `pn-tokens.css` token block (`--green #006a4e`, `--red #f42a41`, `--golden #e3b341`, `--bg #f5f8f5`, Hind Siliguri / IBM Plex Mono), re-declared per-tab root (`.acg-db`, `.acg-sf`, …). Bangla-first i18n via `LanguageContext` (`useLanguage()` → `language`, `t(key)`, `formatNum`); newer components use inline `{language === 'bn' ? '…' : '…'}` ternaries.

PWA/offline: VitePWA autoUpdate, workbox `pn-v6` precache ≤10 MiB (the ~7.5 MB DB JSON is runtime-cached NetworkFirst), `useOnlineStatus` hook + `OfflineIndicator` floating toast; dev has no service worker.

---

## 3. Intelligence pipeline & KWI integration

```
UI: PesticideIntelligenceView.tsx / MyFieldView.tsx
      ↓ runPesticideIntelligence() / useWeatherIntelligence()
HOOK: useWeatherIntelligence.ts (also pulls spray history via lastMoaForCrop)
      ↓
ENGINE: src/intelligence/pesticideIntelligence.ts:340 (runPesticideIntelligence)
      ↓
KWI: src/lib/kwi/index.ts:92 (WeatherIntelligence facade — EMBEDDED LIBRARY COPY)
      ├─ providers/open-meteo.ts:68 → https://api.open-meteo.com/v1 (only network call)
      ├─ engines/risk-engine.ts:699 (computeRiskDashboard)
      ├─ engines/disease-engine.ts:420 (generateDiseaseForecast)
      ├─ engines/recommendation-engine.ts, calendar-engine.ts, operation-windows.ts:94
      └─ engines/crop-configs.ts (+new: 9, +extended: 33 → 45 crops)
```

**Critical finding:** the app consumes KWI as an **embedded copy at `src/lib/kwi/`** — it never calls web.krishiai.live over HTTP. The only network call is Open-Meteo. The reference repo's engines (`kwi-ref/src/lib/kwi/engines/`) are a **divergent fork**: every shared engine file differs; kwi-ref additionally has `pest-engine.ts` (417 lines, `generatePestForecast` → `PestForecast { pests: PestRiskAssessment[], overallFavorability, spreadRisk, confidence }`) which pesticide-next lacks entirely.

### Gaps in the current integration (Task 2 targets)

1. **Pest engine missing** — the `pest` input is only used for substring product filtering (pesticideIntelligence.ts:140-146); no weather-driven pest-pressure scoring exists.
2. **Risk dashboard computed then discarded** — `analyze()` runs `computeRiskDashboard` (lib/kwi/index.ts:154) but `runPesticideIntelligence` never reads `kwiResult.risks` — no per-category risk, no alerts, in `PesticideIntelligenceResult` (pesticideIntelligence.ts:75-90). Only generic wind/rain warnings survive (`buildWarnings` :313).
3. **Disease risk partially collapsed** — `KwiDiseaseSummary` (pesticideIntelligence.ts:92-103) keeps name/risk/level/actions but drops `confidence`, `contributingFactors`, `symptoms`, `economicThreshold`. Worse: `useWeatherIntelligence` never passes `sowingDate`/`growthStage` → `activeCrops` always `[]` → disease list empty → fallback to a crude humidity heuristic (pesticideIntelligence.ts:224-237); `cropCalendar` always null.
4. **No freshness/confidence in the public result** — only `cacheHit` + `generatedAt`; drops `fetchedAt`, `stale`, per-metric confidence (`IntelligenceMetadata.metrics`, index.ts:68-75). No stale-TTL guard in the hook (error keeps last result with no age indicator); kwi-ref's 2-hour stale-cache fallback (use-kwi.ts:219-243) is absent.
5. **Spray windows are 1-hour slices** — `calculateOperationWindows` emits per-hour windows; kwi-ref's consolidated `WeeklyPlan.bestWindows.spray {start,end,confidence}` is unused.
6. **Crop mapping skew** — `CROP_NAME_MAP` (pesticideIntelligence.ts:449-477) maps only 12 names and falls back maize→rice.
7. **`src/lib/kwi/api.ts` `createIntelligenceHandler` is dead code** (zero call sites).

---

## 4. Database loader & registry architecture

`src/data/loadDatabase.ts` is the single source of truth (memoized promise, loadDatabase.ts:235-288):

```
data_raw/*.csv → scripts/*.py (offline) → public/downloads/pesticide_database.json (9,641 products, 7.64 MB, runtime fetch, SW-cached)
+ src/data/curatedData.ts (authoritative curated DB, lazy inline)
+ src/data/bdRegisterLatest.ts (BD_OVERLAY_BY_REG + 184 PTAC extras)
+ localStorage pesticidenext_custom_products
→ mergeWithCurated (dedupe key = normalized registrationNo) → applyBdOverlay → ChemicalProduct[]
```

Dedupe key: normalized `registrationNo` (case-insensitive, trimmed). Overlay contributes toxicityClass, phiDays, reiHours, resistanceRisk, moaCode-when-missing.

### CSV quality — `data_raw/all_pesticides.csv` (Task 4 audit)

13 columns (`Pesticide Type, SL No (Common Name), Common Name, SL No (Products), Brand Name, Registration No, Registration Holder, Recommended Crops, Recommended Pests, Dosage Rate, Recommendations (Crop|Pest|Dosage), No. of Recommendations, MoA Code`), ASCII, 9,462 parsed records.

| Metric | Count |
|---|---|
| Missing Registration No | 1 |
| Duplicate regNo keys | 14 (each ×2) |
| Missing Common Name (AI) | 1,687 |
| Missing Recommended Crops | **4,685 (~50%)** |
| Missing Recommended Pests | **4,013 (~42%)** |
| Missing Dosage Rate | 4,014 |
| Missing MoA Code | **3,026 (~32%)** |

RegNo noise: `AP`, `AP(Bio)`, `AP (Bio)` variants + junk (`AP5615`, bare numbers). Type split: Insecticide 5,442 · Public Health 1,607 · Fungicide 1,052 · Herbicide 892 · Miticide 205 · Bio 161 · Store Grain 88 · Rodenticide 15. Runtime JSON: 9,641 products, 2,574 missing moaCode, 4,684 empty crops.

**No PHI/REI columns exist in the CSV at all** — those come only from the curated/overlay layers. No checksum/version manifest exists (metadata.json is app metadata only). No CI runs the data pipeline.

### Eligibility logic — STATUS: FILTER-ONLY

- Crop/pest matching is UI convenience: exact `Array.includes` (RotationPlanner.tsx:107-112, SprayLogView.tsx:165) or bidirectional substring (pesticideIntelligence.ts:132-146) — used for *ranking*, never gating.
- **No registration-status verification anywhere** (zero `verifyRegistration`/`isRegistered` hits). `policyRiskTier`/`euGlobalRegulatoryStatus`/`bangladeshPolicyAction` are display/filter fields (SpecialistSearchView.tsx:119-133), never gates.
- Nothing prevents logging a product on a crop/pest absent from its registration (`fCrop` is free text, SprayLogView.tsx:341).
- Dosage is a display string; no validation. MyFieldView's disclaimer (MyFieldView.tsx:408-412) explicitly delegates eligibility to DAE officials.

---

## 5. MoA rotation & spray history

**`src/utils/moaRotationEngine.ts`** (743 lines, pure, IRAC MoA Rotation Guide §4.2) — a compliance **validator**, not a planner: `runComplianceCheck` (:635) orchestrates WINDOW_ROTATION (BLOCK; 15-day sucking-pest / 30-day standard), SEASONAL_EXPOSURE_CAP (BLOCK; >50% of cycle or sprays), MAX_APPS_PER_WINDOW (BLOCK), SUBGROUP_RISK (FLAG), CROP_PHASE_MISMATCH (FLAG). Input `ComplianceCheckInput { log: ApplicationLogEntry[], proposedDate, proposedMoACode, crop, pest, availableMoACodes, … }` (:612-624). Taxonomy: `src/data/moaData.ts` MOA_DATABASE (IRAC/FRAC/HRAC, 835 lines, maintained by `scripts/update_moa_rotation_guide.py`).

**`src/hooks/useSprayHistory.ts`** — localStorage `pesticidenext_spray_history` (max 500). `SprayEntry` (:14-28): id, ts, date, productName, commonName, moaCode, moaGroup, type, crop, areaValue, areaUnit, fieldLabel?, notes?. An untyped `pest` is piggybacked via cast (SprayLogView.tsx:144/56). **Not captured:** dose applied, treated-area weather, operator, PPE, PHI countdown; crop phase + cycle dates are used for the live check then discarded.

SprayLogView runs `runComplianceCheck` at write time: PASS → save; FLAG → save with override justification; BLOCK → never saved.

---

## 6. Field records, scouting, outcomes — ALL ABSENT

- **No field profile exists** — despite the tab name, `MyFieldView` is a weather dashboard; crop selection is transient state, GPS lives in the hook. The KWI types `FarmProfile`/`ActiveCrop` (lib/kwi/types/index.ts:368-391) are never used. The de-facto field key is the free-text `fieldLabel` on spray entries.
- **No scouting/observation records** — no UI, no type, no storage key.
- **No diagnosis persistence** — HomeView's "Field diagnostic matcher" (HomeView.tsx:877-937) is read-only against static `DIAGNOSTIC_DATA` (homeContent.ts:263-300; Rice/Potato/Tomato/Mango), state discarded on unmount.
- **No outcome/follow-up/verification** — zero hooks/types/keys for effectiveness, recurrence, or resistance suspicion. The only audit trail is the FLAG-override note.

### localStorage key registry (all `pesticidenext_` namespace)

`pesticidenext_spray_history`, `pesticidenext_custom_products`, `pesticidenext_alerts`, `pesticidenext_lang`, `pesticidenext_persona`, `pesticidenext_scan_queue`, `pesticidenext_migrated_v1`, dynamic `guide_open_<pageKey>`; sessionStorage: `pesticidenext_session_started`, `pesticidenext_shared_visit`, `pesticidenext_pending_downloads`.

### Server (`server.ts`, Express)

`POST /api/downloads/log|beacon`, `POST /api/visitors/hit`, `GET /api/visitors/stats`, `GET /api/ppw/search` (live PPW proxy), `POST /api/intelligence` (server-side KWI run). No database; only `visitor_counts.json` persistence.

---

## 7. Gap summary → reuse map

| # | Gap | Reuse instead of rebuild |
|---|---|---|
| G1 | KWI output collapsed; disease starved (no crop context); risk dashboard discarded; pest engine absent | Extend `pesticideIntelligence.ts` + `useWeatherIntelligence.ts`; port `pest-engine.ts` from kwi-ref; pass crop/sowing context that `runPesticideIntelligence` **already accepts** (:357-374) |
| G2 | No protection decision engine (7 statuses, 12-step sequence) | New module `src/intelligence/protectionDecision.ts` consuming existing KWI result + eligibility + compliance — no reimplementation of engines |
| G3 | No eligibility engine (crop/target/registration gating) | New pure filter over existing `ChemicalProduct[]` from `loadDatabase()`; disclosure of missing data instead of silent pass |
| G4 | No validation report / import metadata for the registry | Extend `scripts/generate_runtime_json.py` to emit a build-time validation report + checksum manifest consumed at runtime; no runtime CSV parsing |
| G5 | MoA stewardship disconnected from decisions | Reuse `runComplianceCheck` + `useSprayHistory` as the single history source |
| G6 | No field/scouting/outcome ledger | New small typed stores following the `useSprayHistory` localStorage pattern (same namespace + quota handling); link via fieldId, not a new DB |
| G7 | No Protection tab | New tab following the documented add-tab pattern (§2), reusing pn-tokens design language; eager-load avoided (lazy) |
| G8 | Fork divergence with kwi-ref | Documented, not resolved here; embedded copy extended in place (porting pest-engine only) |

## 8. Files to change (planned)

**New:** `src/intelligence/protectionDecision.ts` (decision engine), `src/intelligence/productEligibility.ts` (eligibility), `src/lib/kwi/engines/pest-engine.ts` (ported), `src/hooks/useFieldRecords.ts` (field/scouting/decision/outcome ledger), `src/components/ProtectionView.tsx` (+css), `scripts/validate_registry.py` (validation report), `src/utils/__tests__/protectionDecision.test.ts`, `src/utils/__tests__/productEligibility.test.ts`, `src/utils/__tests__/protectionIntegration.test.ts`.
**Modified:** `src/intelligence/pesticideIntelligence.ts` (expose structured risk/pest/disease/freshness), `src/hooks/useWeatherIntelligence.ts` (crop context + stale guard), `src/types/index.ts` (AppTab + record types), `src/App.tsx` / `Navbar.tsx` / `NavigationDrawer.tsx` / `BottomNav.tsx` (tab), `src/data/loadDatabase.ts` (validation metadata attach), `package.json` (validate script).

## 9. Baseline build

Baseline production build (`npm run build` = vite build + esbuild server bundle): started before changes; result recorded in the delivery report (§Test results). Baseline typecheck and tests are green (§1), so any later failure is attributable to this sprint's changes.

---

*This audit is evidence-based; every claim was verified against the current working tree at the listed file:line locations. Implementation proceeds immediately after this document.*
