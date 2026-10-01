# পেস্টিসাইডনেক্সট — PesticideNext

> **পরের স্প্রে, আর ভুল হবে না।**
> *The next spray, without the mistake.*

A bilingual (Bangla / English) Progressive Web App that helps farmers, dealers, and field officers in Bangladesh choose the right pesticide, dose it correctly, and rotate modes of action to prevent resistance.

**🔗 Live:** [pesticidenext.live](https://pesticidenext.live/) · **Preview fallback:** [pesticidenext.vercel.app](https://pesticidenext.vercel.app/) (Vercel preview only — canonical OG / Twitter URLs always point to `pesticidenext.live`)

---

## ✨ Key Features

- 🗂️ **Pesticide Database** — 5,711+ DAE-registered products (insecticides, fungicides, herbicides, miticides, bio-pesticides, rodenticides, stored-grain protectants). Grouped by category section headers (color-coded by IRAC red / FRAC golden / HRAC green) with live counts of ingredients, brands, and MoA groups per category ([`src/components/DatabaseView.tsx`](src/components/DatabaseView.tsx)).
- 🧮 **Knapsack Sprayer Tank Calculator** — computes the correct amount of product and water per tank from label doses (g/ha, g/L, ml/L etc.) ([`src/utils/calculator.ts`](src/utils/calculator.ts), [`DosageCalculatorModal.tsx`](src/components/DosageCalculatorModal.tsx)).
- 🔄 **MoA Rotation Planner** — IRAC / FRAC / HRAC mode-of-action classification with a multi-step rotation sequence builder that flags back-to-back same-group applications as conflicts ([`src/data/moaData.ts`](src/data/moaData.ts), [`RotationPlanner.tsx`](src/components/RotationPlanner.tsx), [`NextSprayGuide.tsx`](src/components/NextSprayGuide.tsx)).
- 🛡️ **Safety & PPE Checklists** — interactive 10-point pre-spray / during-spray / post-spray checklist with progress bar, WHO toxicity band cards (red / yellow / blue / green), and emergency first-aid protocols including specific antidotes ([`SafetyView.tsx`](src/components/SafetyView.tsx)).
- 📖 **Field Guidebook** — 5 chapters: crop schedules (PDF export), sprayer calibration, resistance science, W.A.L.E.S. tank-mix simulator, and PHI / food-safety compliance ([`Guidebook.tsx`](src/components/Guidebook.tsx)).
- 📄 **PDF Export** — generate crop guides and single-product safety sheets as PDF via jsPDF ([`src/utils/pdfExport.ts`](src/utils/pdfExport.ts)).
- 🔔 **Regulatory & Seasonal Alerts** — push-notification center for bans, restrictions, and pest-outbreak warnings from the Department of Agricultural Extension, with a custom-alert composer ([`NotificationCenter.tsx`](src/components/NotificationCenter.tsx), [`src/data/regulatoryAlertsData.ts`](src/data/regulatoryAlertsData.ts), [`src/utils/notifications.ts`](src/utils/notifications.ts)).
- 📱 **PWA & Offline Support** — installable, service-worker cached (Workbox with `cacheId: 'pn-v2'`), with an offline indicator, dynamic apple-touch icons per tab, and a one-shot cache-cleanup hook that purges stale precaches from previous builds ([`vite.config.ts`](vite.config.ts), [`src/utils/cleanupCaches.ts`](src/utils/cleanupCaches.ts)).
- 🌐 **Bangla / English i18n** — full language switching via context; Bengali numerals, crop/pest/dosage translations, and a Hind Siliguri + IBM Plex Mono typography stack ([`src/context/LanguageContext.tsx`](src/context/LanguageContext.tsx), [`src/utils/i18n.ts`](src/utils/i18n.ts)).
- 👥 **Live Visitor Counter** — total / unique / active-user tracking backed by the Express server.
- 🔗 **Social Sharing with correct OG previews** — the server rewrites an `OG_IMAGE_ORIGIN` placeholder per request so WhatsApp / Facebook / Telegram / X / LinkedIn crawlers always see absolute image URLs matching the deployed domain.

## 🎨 Design language

The app uses a "pain-point editorial" design language across all tabs:

- **Bangladesh official palette:** bottle green `#006a4e`, flag red `#f42a41`, golden accent `#e3b341`, paper background `#f5f8f5` with a subtle SVG grain texture.
- **Typography:** Hind Siliguri display headlines (Bengali + Latin), IBM Plex Mono micro-labels, Inter / system-ui fallback.
- **Card family:** white cards with 3px scheme-toned top borders (red for IRAC-leaning insecticides, golden for FRAC-leaning fungicides, green for HRAC-leaning herbicides), hover-lift, dark-green panels with golden offset shadow for the "logic" sections.
- **Mobile-first:** every tab uses a `.pn-head` collapse pattern (eyebrow + headline stay, lede + trust bullets hide behind a toggle on small screens, expand automatically on md+). Desktop gets an additional sticker card with live counts.
- Shared design tokens live in [`src/components/pn-tokens.css`](src/components/pn-tokens.css) so every tab speaks the same visual dialect.

## 🛠 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 19, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion (`motion`), lucide-react icons |
| Backend    | Express (dev: Vite middleware mode; prod: static `dist/` + SPA fallback), `tsx` runner |
| PWA        | `vite-plugin-pwa` (Workbox service worker, `cacheId: 'pn-v2'`, auto-update + cleanup) |
| PDF        | `jspdf` + `jspdf-autotable` |
| Analytics  | `@vercel/analytics` |
| Data prep  | Python 3 (CSV → TypeScript codegen), Bun/TypeScript audit script |

## 📁 Project Structure

```
├── server.ts               # Express server: visitor API, Vite dev middleware, prod static + OG rewriting
├── index.html              # App shell with SEO/OG/Twitter meta tags (canonical = pesticidenext.live)
├── vite.config.ts          # Vite + PWA config (cacheId: 'pn-v2', skipWaiting, cleanupOutdatedCaches)
├── metadata.json           # AI Studio app metadata (name = tagline)
├── data_raw/               # Source CSVs (DAE pesticide registers, product lists)
├── scripts/
│   ├── regenerate_all_pesticides.py  # data_raw/all_pesticides.csv → src/data/all_pesticides.ts
│   └── audit_data.ts                 # Verifies merged catalogue counts (run with bun)
├── public/                 # Icons, manifests, OG images (bn/en — 1200×630 Retina PNGs), partner logos
└── src/
    ├── App.tsx             # Root component, hash routing, visitor pings, footer with tagline
    ├── main.tsx            # Boot: storage migration + PWA cache cleanup, then React mount
    ├── components/          # Views & UI — DatabaseView, RotationPlanner, SafetyView, Guidebook, NotificationCenter
    │   └── pn-tokens.css   # Shared design tokens (Bangladesh palette, paper grain, card/chip/button families)
    ├── context/            # LanguageContext (bn/en)
    ├── data/               # Generated & curated pesticide datasets, MoA data, alerts
    ├── hooks/               # useOnlineStatus, usePWAInstall
    ├── types/              # Shared TypeScript types
    └── utils/
        ├── i18n.ts              # Bangla/English UI translations (app_tagline = "পরের স্প্রে, আর ভুল হবে না।")
        ├── migrateStorage.ts   # One-time localStorage migration: agrichem_* → pesticidenext_*
        ├── cleanupCaches.ts    # One-shot PWA cache purge for stale precaches
        ├── calculator.ts       # Knapsack tank-mix math
        ├── pdfExport.ts        # Crop guides + single-product safety sheets as PDF
        ├── notifications.ts   # Browser push notification helpers
        └── bnAgri.ts           # Bengali transliteration tables for crops / pests / toxicity / dosage / notes
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (Bun also works)
- Python 3 (only needed to regenerate data files)

### Install & run (development)

```bash
npm install          # or: bun install
cp .env.example .env # fill in values if you use them locally
npm run dev          # starts Express + Vite on http://localhost:3000
```

In development, `server.ts` runs Vite in middleware mode, so hot reload works while the `/api/visitors/*` endpoints are available from the same origin.

### Build & run (production)

```bash
npm run build   # Vite bundle → dist/ + esbuild server → dist/server.cjs
npm start       # node dist/server.cjs (serves dist/ with SPA fallback & OG rewriting)
```

Set `NODE_ENV=production` before `npm start`. The server listens on port **3000** at `0.0.0.0`.

### Other scripts

```bash
npm run lint     # tsc --noEmit type check
npm run preview  # vite preview
npm run clean    # remove dist/ and server.js
```

## ⚙️ Environment Variables

Copy [`.env.example`](.env.example) to `.env`:

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | API key for Gemini AI calls (auto-injected when deployed via Google AI Studio) |
| `APP_URL` | Public URL where the app is hosted (used for self-referential links / callbacks) |

## 🧪 Data Pipeline

The pesticide catalogue is generated from raw CSV registers in [`data_raw/`](data_raw):

```bash
python3 scripts/regenerate_all_pesticides.py   # regenerates src/data/all_pesticides.ts
bun run scripts/audit_data.ts                  # audits merged catalogue counts by type/source
```

`src/data/loadDatabase.ts` merges the generated dataset with curated data at load time; all views read through it so displayed counts stay consistent.

## 🌐 Deployment & Domains

| Role | Domain | Notes |
|------|--------|-------|
| **Primary (canonical)** | `pesticidenext.live` | All OG / Twitter / canonical URLs in `index.html` point here. Social crawlers see this domain. |
| **Preview fallback** | `pesticidenext.vercel.app` | Vercel preview deploy — used for testing only. The server.ts `OG_IMAGE_ORIGIN` placeholder rewriting means even this preview deploy will rewrite `pesticidenext.live` → `pesticidenext.vercel.app` per request, so crawlers fetching the preview URL see preview URLs. |
| **GitHub Pages** | `moniruzjaman.github.io/AgriChem-Guide-Pest-Control-Database` | Built by `.github/workflows/deploy.yml`. Same OG rewriting applies. |
| **Local dev** | `localhost:3000` | `tsx server.ts` — Vite middleware mode. |

### How OG URL rewriting works

`index.html` is built with `https://pesticidenext.live` as the placeholder origin in every OG / Twitter / canonical tag. At runtime in production mode, `server.ts` reads `X-Forwarded-Proto` and `X-Forwarded-Host` (or falls back to `req.protocol` + `req.headers.host`) to compute the actual origin the request was served from, then string-replaces `https://pesticidenext.live` with that origin before responding.

This means:
- Crawlers fetching `pesticidenext.live/...` see `pesticidenext.live` URLs (correct).
- Crawlers fetching `pesticidenext.vercel.app/...` see `pesticidenext.vercel.app` URLs (correct for that preview).
- Crawlers fetching `localhost:3000` see `http://localhost:3000` URLs (correct for local debugging).

### PWA cache invalidation

Returning users get the new build automatically because:
1. The service worker is registered with `registerType: 'autoUpdate'` + `skipWaiting: true` + `clientsClaim: true` — the new SW takes over immediately on the next navigation.
2. The Workbox `cacheId` is `'pn-v2'`. When bumped on a breaking release, the new SW populates a fresh `pn-v2-precache-v2` cache while the old `workbox-precache-v2` cache becomes orphaned.
3. `src/utils/cleanupCaches.ts` runs on every boot and deletes any cache whose name doesn't start with `pn-v2`, reclaiming disk space.
4. `cleanupOutdatedCaches: true` in the Workbox config also cleans up caches with the Workbox-recognized outdated format.

To force a fresh cache on the next breaking release, bump the `cacheId` string in `vite.config.ts` (e.g. `pn-v2` → `pn-v3`).

## 🤝 Partners

Data curated with reference to the Plant Protection Act (PTAC) registers and the Plant Detective programme (logos in [`public/`](public)).

## ⚠️ Disclaimer

PesticideNext is an informational aid. Always follow the product label and Department of Agricultural Extension (DAE) regulations; consult a licensed agronomist or your local Sub-Assistant Agriculture Officer before applying any chemical. Every tab in the app ends with an official-source + verify-with-local-DAE-officer disclaimer banner.

## 📝 License

This project is shared for educational and field-extension purposes. Verify current product labels and DAE registrations before any field application.
