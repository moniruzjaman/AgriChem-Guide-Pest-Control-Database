# এগ্রিকেম প্রো — AgriChem Pro

**আধুনিক বালাই ব্যবস্থাপনা ও সঠিক রাসায়নিক মাত্রা সহায়িকা**
*(Modern Pest Management & Correct Chemical Dosage Guide for Bangladesh)*

AgriChem Pro is a bilingual (Bangla / English) Progressive Web App that helps farmers, dealers, and advisors in Bangladesh choose the right pesticide, dose it correctly, and rotate modes of action to prevent resistance.

## ✨ Key Features

- 🗂️ **Pesticide Database** — 5,700+ DAE-registered products (insecticides, fungicides, herbicides, miticides, bio-pesticides) with crop/pest recommendations, searchable and filterable by category ([`src/components/DatabaseView.tsx`](src/components/DatabaseView.tsx)).
- 🧮 **Knapsack Sprayer Tank Calculator** — computes the correct amount of product and water per tank from label doses (g/ha, g/L, ml/L etc.) ([`src/utils/calculator.ts`](src/utils/calculator.ts), [`DosageCalculatorModal.tsx`](src/components/DosageCalculatorModal.tsx)).
- 🔄 **MoA Rotation Planner** — IRAC/FRAC/HRAC mode-of-action classification to help plan rotations and delay resistance ([`src/data/moaData.ts`](src/data/moaData.ts), [`RotationPlanner.tsx`](src/components/RotationPlanner.tsx), [`NextSprayGuide.tsx`](src/components/NextSprayGuide.tsx)).
- 📖 **Offline Pocket Book / Guidebook** — free printable field manual with safety checklist ([`Guidebook.tsx`](src/components/Guidebook.tsx), [`SafetyView.tsx`](src/components/SafetyView.tsx)).
- 📄 **PDF Export** — generate product cards and pocket-book pages as PDF via jsPDF ([`src/utils/pdfExport.ts`](src/utils/pdfExport.ts)).
- 🔔 **Regulatory Alerts & Notifications** — ban/restriction alerts from the Department of Agricultural Extension with browser push notifications ([`src/data/regulatoryAlertsData.ts`](src/data/regulatoryAlertsData.ts), [`NotificationCenter.tsx`](src/components/NotificationCenter.tsx), [`src/utils/notifications.ts`](src/utils/notifications.ts)).
- 📱 **PWA & Offline Support** — installable, service-worker cached, with an offline indicator; dynamic apple-touch icons per tab ([`vite.config.ts`](vite.config.ts) with `vite-plugin-pwa`).
- 🌐 **Bangla / English i18n** — full language switching via context ([`src/context/LanguageContext.tsx`](src/context/LanguageContext.tsx), [`src/utils/i18n.ts`](src/utils/i18n.ts)).
- 👥 **Live Visitor Counter** — total / unique / active-user tracking backed by the Express server.
- 🔗 **Social Sharing with correct OG previews** — the server rewrites an `OG_IMAGE_ORIGIN` placeholder per request so WhatsApp/Facebook/Telegram/X crawlers always see absolute image URLs matching the deployed domain.

## 🛠 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 19, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion (`motion`), lucide-react icons |
| Backend    | Express (dev: Vite middleware mode; prod: static `dist/` + SPA fallback), `tsx` runner |
| PWA        | `vite-plugin-pwa` (Workbox service worker, web manifest) |
| PDF        | `jspdf` + `jspdf-autotable` |
| Analytics  | `@vercel/analytics` |
| Data prep  | Python 3 (CSV → TypeScript codegen), Bun/TypeScript audit script |

## 📁 Project Structure

```
├── server.ts               # Express server: visitor API, Vite dev middleware, prod static + OG rewriting
├── index.html              # App shell with SEO/OG/Twitter meta tags
├── vite.config.ts          # Vite + PWA configuration
├── metadata.json           # AI Studio app metadata (name, capabilities)
├── data_raw/               # Source CSVs (DAE pesticide registers, product lists)
├── scripts/
│   ├── regenerate_all_pesticides.py  # data_raw/all_pesticides.csv → src/data/all_pesticides.ts
│   └── audit_data.ts                 # Verifies merged catalogue counts (run with bun)
├── public/                 # Icons, manifests, OG images (bn/en), partner logos
└── src/
    ├── App.tsx             # Root component, hash routing, visitor pings
    ├── components/         # Views & UI (database, calculator, rotation planner, guidebook, …)
    ├── context/            # LanguageContext (bn/en)
    ├── data/               # Generated & curated pesticide datasets, MoA data, alerts
    ├── hooks/              # useOnlineStatus, usePWAInstall
    ├── types/              # Shared TypeScript types
    └── utils/              # i18n, calculator, pdfExport, notifications, bnAgri helpers
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

## 🌐 Deployment Notes

- Designed to run behind Vercel/Cloudflare/Nginx: the server trusts `X-Forwarded-Proto` / `X-Forwarded-Host` when rewriting OG URLs and detecting client IPs.
- Visitor counts persist in `visitor_counts.json` (written atomically). Mount persistent storage for this file if you need counts to survive redeploys.
- Static builds work on any domain — the built `index.html` contains a placeholder origin that is replaced per request.

## 🤝 Partners

Data curated with reference to the Plant Protection Act (PTAC) registers and the Plant Detective programme (logos in [`public/`](public)).

## ⚠️ Disclaimer

AgriChem Pro is an informational aid. Always follow the product label and Department of Agricultural Extension (DAE) regulations; consult a licensed agronomist before applying any chemical.
