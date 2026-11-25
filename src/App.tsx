import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { ChemicalProduct, RegulatoryAlert, AppTab } from './types';
import { loadDatabase } from './data/loadDatabase';
import { INITIAL_REGULATORY_ALERTS } from './data/regulatoryAlertsData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { SearchSheet } from './components/SearchSheet';
import { HomeView } from './components/HomeView';
import { TabContentCollapsible } from './components/TabContentCollapsible';
import { loadPersona, savePersona, type PersonaId } from './utils/userCategories';
import { ShareModal } from './components/ShareModal';
import { DocumentMeta } from './components/DocumentMeta';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useLanguage } from './context/LanguageContext';
import { useReadAloud } from './hooks/useReadAloud';
import { useOnlineStatus } from './hooks/useOnlineStatus';
const PesticideIntelligenceView = lazy(() =>
  import('./components/PesticideIntelligenceView').then((m) => ({ default: m.PesticideIntelligenceView }))
);
const MyFieldView = lazy(() => import('./components/MyFieldView').then(m => ({ default: m.MyFieldView })));
const SpecialistSearchView = lazy(() => import('./components/SpecialistSearchView'));
import { detectSharedVisit, flushPendingDownloads } from './utils/analytics';
import {
  Leaf,
  Share2,
  Users,
  Eye,
  Download,
  ExternalLink
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Footer OG-preview links — this app + the companion projects. Every card
// embeds the target page's REAL og:image (fetched/verified from each page's
// meta tags) so visitors see a visual preview of what they are opening.
// Images fail gracefully: a gradient + emoji placeholder sits behind each
// <img>, revealed by onError.
// ---------------------------------------------------------------------------
interface RelatedLink {
  url: string;
  image: string;
  alt: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  emoji: string;
  badgeEn?: string;
  badgeBn?: string;
}

const RELATED_LINKS: RelatedLink[] = [
  {
    url: 'https://pesticide.krishiai.live/',
    image: 'https://pesticide.krishiai.live/og-image.png',
    alt: 'পেস্টিসাইডনেক্সট (PesticideNext) — পরের স্প্রে, আর ভুল হবে না।',
    titleEn: 'PesticideNext — this app',
    titleBn: 'পেস্টিসাইডনেক্সট — এই অ্যাপ',
    descEn: 'Registered pesticide directory built on the public DAE register — smart search, MoA rotation planner, tank-mix dosage calculator, field calibration, PPE checklists and compliance alerts.',
    descBn: 'DAE-এর প্রকাশ্য নিবন্ধন তালিকার ভিত্তিতে নিবন্ধিত বালাইনাশক ডিরেক্টরি — স্মার্ট সার্চ, MoA ঘূর্ণন পরিকল্পনা, ট্যাংক-মিক্স ডোজ ক্যালকুলেটর, ফিল্ড ক্যালিব্রেশন, PPE চেকলিস্ট ও নিয়ন্ত্রক অ্যালার্ট।',
    emoji: '🌾',
    badgeEn: 'This app',
    badgeBn: 'এই অ্যাপ',
  },
  {
    url: 'https://moniruzjaman.github.io/pesticide-reform/',
    image: 'https://raw.githubusercontent.com/moniruzjaman/pesticide-reform/main/social-preview.png',
    alt: 'Pesticide Reform — MoA Group/Code on Pesticide Labels (Submission Dossier v4.0.0)',
    titleEn: 'Pesticide Reform — label dossier',
    titleBn: 'পেস্টিসাইড রিফর্ম — লেবেল ডজিয়ার',
    descEn: 'Policy dossier proposing international IRAC/FRAC/HRAC MoA group codes on registered pesticide labels — DAE Kurigram submission under the Pesticides Act, 2018.',
    descBn: 'নিবন্ধিত বালাইনাশকের লেবেলে আন্তর্জাতিক IRAC/FRAC/HRAC MoA গ্রুপ কোড যুক্ত করার নীতিগত প্রস্তাব — বালাইনাশক আইন ২০১৮-এর আওতায় DAE কুড়িগ্রাম সাবমিশন ডজিয়ার।',
    emoji: '🏷️',
  },
  {
    url: 'https://pesticideact2018.vercel.app/',
    image: 'https://raw.githubusercontent.com/moniruzjaman/pesticide_act_2018/main/public/og-image.png',
    alt: 'বালাইনাশক আইন, ২০১৮ — সমন্বিত ফিল্ড গাইড',
    titleEn: 'Pesticide Act 2018 — field guide',
    titleBn: 'বালাইনাশক আইন ২০১৮ — ফিল্ড গাইড',
    descEn: 'Interactive legal reference for retailers and extension officers — all 36 sections, a 47-slide training deck, download centre and an offline AI assistant.',
    descBn: 'খুচরা বিক্রেতা ও সম্প্রসারণ কর্মকর্তাদের জন্য ইন্টারঅ্যাকটিভ আইনি রেফারেন্স — ৩৬টি ধারা, ৪৭ স্লাইডের প্রশিক্ষণ ডেক, ডাউনলোড সেন্টার ও অফলাইন AI সহায়ক।',
    emoji: '⚖️',
  },
  {
    url: 'https://moniruzjaman.github.io/portfolio/',
    image: 'https://moniruzjaman.github.io/portfolio/og/home.png',
    alt: 'Abu Md. Moniruzjaman — Portfolio · Agricultural Extension & Digital Tools',
    titleEn: "The developer's portfolio",
    titleBn: 'নির্মাতার পোর্টফোলিও',
    descEn: 'Abu Md. Moniruzjaman — Additional Deputy Director (Horticulture), DAE Bangladesh, building digital tools for smallholder farmers. Selected work, career and field writing.',
    descBn: 'আবু এমডি মনিরুজ্জামান — উপ-পরিচালক (উদ্যান), DAE বাংলাদেশ; ক্ষুদ্র কৃষকের জন্য ডিজিটাল টুলস নির্মাতা। নির্বাচিত কাজ, ক্যারিয়ার ও মাঠ-লেখনী।',
    emoji: '🌿',
  },
];

// ---------------------------------------------------------------------------
// Code-split views: each tab (and the heavy modals) lives in its own lazy
// chunk so the initial bundle only pays for the shell. The multi-MB product
// database itself is split separately via loadDatabase()'s dynamic import.
// ---------------------------------------------------------------------------
const DatabaseView = lazy(() =>
  import('./components/DatabaseView').then((m) => ({ default: m.DatabaseView }))
);
const Guidebook = lazy(() =>
  import('./components/Guidebook').then((m) => ({ default: m.Guidebook }))
);
const ProtectionView = lazy(() =>
  import('./components/ProtectionView').then((m) => ({ default: m.ProtectionView }))
);
const RotationPlanner = lazy(() =>
  import('./components/RotationPlanner').then((m) => ({ default: m.RotationPlanner }))
);
const SafetyView = lazy(() =>
  import('./components/SafetyView').then((m) => ({ default: m.SafetyView }))
);
const NotificationCenter = lazy(() =>
  import('./components/NotificationCenter').then((m) => ({ default: m.NotificationCenter }))
);
const SprayLogView = lazy(() =>
  import('./components/SprayLogView').then((m) => ({ default: m.SprayLogView }))
);
const NavigationDrawer = lazy(() =>
  import('./components/NavigationDrawer').then((m) => ({ default: m.NavigationDrawer }))
);
const DosageCalculatorModal = lazy(() =>
  import('./components/DosageCalculatorModal').then((m) => ({ default: m.DosageCalculatorModal }))
);
const ProductDetailModal = lazy(() =>
  import('./components/ProductDetailModal').then((m) => ({ default: m.ProductDetailModal }))
);
const SafetyChecklistModal = lazy(() =>
  import('./components/SafetyChecklistModal').then((m) => ({ default: m.SafetyChecklistModal }))
);
const MoreView = lazy(() =>
  import('./components/MoreView').then((m) => ({ default: m.MoreView }))
);
const LabelScannerModal = lazy(() =>
  import('./components/LabelScannerModal').then((m) => ({ default: m.LabelScannerModal }))
);

/** Lightweight brand splash shown while the product database chunk loads. */
function DatabaseSplash({ language }: { language: 'bn' | 'en' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50">
      <div className="relative flex items-center justify-center">
        <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-emerald-200 opacity-60"></span>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-800 shadow-lg">
          <Leaf className="h-8 w-8 text-emerald-50" />
        </div>
      </div>
      <p className="mt-6 text-sm font-bold text-slate-800">
        {language === 'bn' ? 'সম্পূর্ণ বালাইনাশক ডাটাবেস লোড হচ্ছে…' : 'Loading the full pesticide database…'}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {language === 'bn' ? 'সর্বশেষ নিবন্ধিত বালাইনাশক প্রস্তুত করা হচ্ছে' : 'Preparing the latest registered products'}
      </p>
    </div>
  );
}

export default function App() {
  const { language, formatNum } = useLanguage();

  // ---------------------------------------------------------------------------
  // Product catalogue — hydrated asynchronously from the merged database
  // chunk (curated + full DAE register + any user-imported customs).
  // Views only render once the full dataset is ready, so every counter,
  // filter, and card grid reflects the complete merged catalogue.
  // ---------------------------------------------------------------------------
  const [products, setProducts] = useState<ChemicalProduct[] | null>(null);
  const [baselineCount, setBaselineCount] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  const hydrateProducts = React.useCallback(() => {
    setLoadError(null);
    loadDatabase()
      .then(({ products: merged, baselineCount: base }) => {
        setProducts(merged);
        setBaselineCount(base);
      })
      .catch((err) => {
        console.error('Failed to load product database:', err);
        setLoadError(
          language === 'bn'
            ? 'ডাটাবেস লোড করা যায়নি। ইন্টারনেট সংযোগ যাচাই করে আবার চেষ্টা করুন।'
            : 'Could not load the database. Check your connection and try again.'
        );
      });
  }, [language]);

  useEffect(() => {
    hydrateProducts();
    // Re-hydration on language change is unnecessary; run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProducts = (newProducts: ChemicalProduct[]) => {
    if (!products) return;
    // Baseline (built-in) entries are the first ``baselineCount`` items of
    // the merged catalogue; everything else is a user-imported custom row.
    const baseRegNos = new Set(
      products
        .slice(0, baselineCount)
        .map((p) => p.registrationNo.toLowerCase().trim())
    );
    const customOnly = newProducts.filter(
      (p) => p.registrationNo && !baseRegNos.has(p.registrationNo.toLowerCase().trim())
    );

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('pesticidenext_custom_products', JSON.stringify(customOnly));
    }
    setProducts(newProducts);
  };

  const handleResetProducts = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('pesticidenext_custom_products');
    }
    if (!products) return;
    // Drop every non-baseline (custom) product: baseline entries are the
    // first ``baselineCount`` items of the merged catalogue.
    setProducts((prev) => (prev ? prev.slice(0, baselineCount) : prev));
  };

  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // User category (persona) — Farmer / Cadre officer / Researcher / Policy.
  // Persisted locally; drives search placeholders, quick-search chips, and
  // preset Specialist filters. Farmers get the simple bottom-nav experience;
  // specialists get "Special Search" shortcuts.
  // ---------------------------------------------------------------------------
  const [persona, setPersona] = useState<PersonaId>(() => loadPersona());
  const handlePersonaChange = (id: PersonaId) => {
    setPersona(id);
    savePersona(id);
  };

  // Built-in intelligence badge for the My Field tab: show a dot when there's
  // spray history (rotation advice ready) OR the user is on the My Field tab
  // OR the intelligence view (the engine has loaded at least once).
  const intelligenceReady =
    (typeof window !== 'undefined' &&
      !!window.localStorage.getItem('pesticidenext_spray_history')) ||
    activeTab === 'intelligence' ||
    activeTab === 'myfield';

  // ---------------------------------------------------------------------------
  // Hash routing — lets shared deep links (e.g. `/?from=share#database`) land
  // on the correct tab instead of always opening at Home. ShareModal builds
  // URLs with the tab name in the hash; this effect reads it on mount and on
  // every `hashchange`, validates it against the known AppTab set, and
  // navigates. Invalid / empty hashes are ignored (stay on current tab).
  // We also push the hash back into the URL when the user switches tabs
  // in-app, so the browser back/forward buttons and copy-url keep working.
  // ---------------------------------------------------------------------------
  const VALID_TABS: AppTab[] = ['home', 'database', 'calculator', 'rotation', 'safety', 'guidebook', 'alerts', 'myfield', 'intelligence', 'protection', 'specialist', 'more'];

  useEffect(() => {
    const tabFromHash = (hash: string): AppTab | null => {
      const clean = hash.replace(/^#\/?/, '').split(/[?&]/)[0].toLowerCase();
      if (!clean) return null;
      return (VALID_TABS as string[]).includes(clean) ? (clean as AppTab) : null;
    };

    const applyHash = () => {
      const tab = tabFromHash(window.location.hash);
      if (tab) setActiveTab(tab);
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the user navigates in-app (clicks a nav button), reflect it into the
  // URL hash so the address bar, back button, and copy-link stay in sync.
  // Skip pushing when the hash already matches (avoids extra history entries).
  useEffect(() => {
    const expected = `#${activeTab}`;
    if (window.location.hash !== expected && activeTab !== 'home') {
      // Use replaceState for the first sync so we don't pile up a back-entry
      // on every initial navigation; pushState thereafter so back works.
      window.history.pushState(null, '', expected);
    } else if (activeTab === 'home' && window.location.hash) {
      // On Home, clear the hash so the URL is clean.
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [activeTab]);

  // ---------------------------------------------------------------------------
  // Read-aloud (TTS) — Web Speech API hook surfaced as a speaker icon in the
  // navbar right beside the Share button. The main content region is captured
  // via ref so the current tab's visible text can be spoken on demand.
  // ---------------------------------------------------------------------------
  const readAloud = useReadAloud(language);
  const mainContentRef = useRef<HTMLElement | null>(null);

  // Stop any active speech whenever the user navigates to a different tab.
  useEffect(() => {
    readAloud.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleReadAloudToggle = () => {
    const el = mainContentRef.current;
    if (!el) return;
    readAloud.toggle(el.innerText);
  };

  // On load: detect if this visit came from a shared link (?from=share etc.)
  // and retry any download events that failed while offline. This powers the
  // "did the shared person actually open it?" analytics on the server.
  useEffect(() => {
    detectSharedVisit();
    flushPendingDownloads();
  }, []);

  // Real-time visitor counts state
  const [visitorStats, setVisitorStats] = useState<{ total: number; unique: number; active: number; downloads: number; shareDownloads: number } | null>(null);

  // Offline-safe + static-host-safe visitor counter.
  // - Skips ALL network calls when offline (useOnlineStatus hook).
  // - Stops polling after 2 consecutive failures (e.g. static host with no
  //   /api backend, or backend down) so the console stays quiet and the app
  //   keeps working fully offline.
  // - Polls every 60s (was 10s) to reduce background traffic.
  const isOnline = useOnlineStatus();
  useEffect(() => {
    if (!isOnline) return; // never poll while offline

    let isNewSession = false;
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('pesticidenext_session_started')) {
        sessionStorage.setItem('pesticidenext_session_started', 'true');
        isNewSession = true;
      }
    }

    let failures = 0;
    let cancelled = false;

    const fetchHit = async () => {
      try {
        const response = await fetch('/api/visitors/hit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isNewSession }),
        });
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (!cancelled) { setVisitorStats(data); failures = 0; }
        } else { failures++; }
      } catch {
        failures++;
      }
    };

    const fetchStats = async () => {
      if (failures >= 2) return; // backend unavailable — stop polling silently
      try {
        const response = await fetch('/api/visitors/stats');
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (!cancelled) { setVisitorStats(data); failures = 0; }
        } else { failures++; }
      } catch {
        failures++;
      }
    };

    fetchHit();
    const interval = setInterval(fetchStats, 60000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [isOnline]);

  // Modals state
  const [detailProduct, setDetailProduct] = useState<ChemicalProduct | null>(null);
  const [calcProduct, setCalcProduct] = useState<ChemicalProduct | null>(null);
  const [safetyProduct, setSafetyProduct] = useState<ChemicalProduct | null>(null);

  // Alerts & Notifications state with localStorage persistence
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pesticidenext_alerts');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to parse alerts from storage:', e);
        }
      }
    }
    return INITIAL_REGULATORY_ALERTS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pesticidenext_alerts', JSON.stringify(alerts));
    }
  }, [alerts]);

  const unreadAlertCount = alerts.filter((a) => !a.read).length;

  const handleMarkAlertRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
  };

  const handleAddCustomAlert = (alert: RegulatoryAlert) => {
    setAlerts((prev) => [alert, ...prev]);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // ---------------------------------------------------------------------------
  // Splash / error gate: nothing renders until the merged database is ready,
  // guaranteeing the new dataset shows up everywhere from the first paint.
  // ---------------------------------------------------------------------------
  if (!products) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <DocumentMeta activeTab={activeTab} />
        {loadError ? (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 shadow-sm">
              <Leaf className="h-8 w-8 text-rose-600" />
            </div>
            <p className="mt-6 max-w-sm text-sm font-semibold text-slate-800">{loadError}</p>
            <button
              onClick={hydrateProducts}
              className="mt-4 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
            >
              {language === 'bn' ? 'আবার চেষ্টা করুন' : 'Retry'}
            </button>
          </div>
        ) : (
          <DatabaseSplash language={language} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Dynamic Tab & SEO Meta */}
      <DocumentMeta activeTab={activeTab} />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        unreadAlertCount={unreadAlertCount}
        onOpenAlerts={() => setActiveTab('alerts')}
        onOpenShare={() => setIsShareModalOpen(true)}
        readAloudSupported={readAloud.supported}
        readAloudSpeaking={readAloud.speaking}
        onToggleReadAloud={handleReadAloudToggle}
        totalProductsCount={products.length}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenScan={() => setIsScanOpen(true)}
        onOpenSearchSheet={() => setIsSearchSheetOpen(true)}
        persona={persona}
        onPersonaChange={handlePersonaChange}
      />

      {/* Mobile Bottom Nav — Home · Search/Scan · My Field (intelligence) · More */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchSheetOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        intelligenceReady={intelligenceReady}
      />

      {/* Unified Search / Scan sheet with layman-first smart results */}
      <SearchSheet
        isOpen={isSearchSheetOpen}
        onClose={() => setIsSearchSheetOpen(false)}
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenScan={() => {
          setIsSearchSheetOpen(false);
          setIsScanOpen(true);
        }}
        onSelectProduct={(p) => setDetailProduct(p)}
        persona={persona}
        onPersonaChange={handlePersonaChange}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Main View Area */}
      <main className="flex-1 pn-main" ref={mainContentRef}>
        {activeTab === 'home' && (
          <HomeView
            products={products}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onSelectCropFilter={(crop) => {
              setSearchQuery(crop);
              setActiveTab('database');
            }}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            totalProductsCount={products.length}
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />
        )}

        {activeTab === 'database' && (
          <TabContentCollapsible
            tab="database"
            title={language === 'bn' ? 'নিবন্ধিত বালাইনাশক ক্যাটালগ' : 'Registered pesticide catalogue'}
            subtitle={language === 'bn' ? `${formatNum(products.length)} পণ্য` : `${formatNum(products.length)} products`}
          >
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <DatabaseView
              products={products}
              baselineCount={baselineCount}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectProduct={(p) => setDetailProduct(p)}
              onOpenCalculator={(p) => setCalcProduct(p)}
              onOpenSafety={(p) => setSafetyProduct(p)}
              onUpdateProducts={handleUpdateProducts}
              onResetProducts={handleResetProducts}
            />
          </Suspense>
          </TabContentCollapsible>
        )}

        {activeTab === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <TabContentCollapsible
            tab="calculator"
            title={language === 'bn' ? 'মাত্রা ও ট্যাংক মিক্স স্টেশন' : 'Dosage & Tank Mix Station'}
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-teal-600" />
                  {language === 'bn' ? 'ইন্টারেক্টিভ মাঠপর্যায়ের মাত্রা ও ট্যাংক মিক্সিং স্টেশন' : 'Interactive Field Dosage & Tank Mix Station'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'bn'
                    ? 'ন্যাপস্যাক স্প্রেয়ার ট্যাংক, পানির পরিমাণ এবং জমির আয়তন অনুযায়ী নির্ভুল মাত্রা হিসাব করতে যেকোনো নিবন্ধিত বালাইনাশক নির্বাচন করুন।'
                    : 'Select any registered chemical to calculate precise knapsack tank mix rates, water volume, and area conversions.'}
                </p>
              </div>

              <button
                onClick={() => setCalcProduct(products[0])}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer"
              >
                {language === 'bn' ? 'ক্যালকুলেটর ডায়ালগ খুলুন' : 'Launch Knapsack Calculator Dialog'}
              </button>
            </div>

            {/* Render calculator directly */}
            <Suspense fallback={<DatabaseSplash language={language} />}>
              <DosageCalculatorModal
                products={products}
                selectedProduct={calcProduct || products[0]}
                onClose={() => setActiveTab('database')}
                onSelectProduct={(p) => setCalcProduct(p)}
              />
            </Suspense>
          </TabContentCollapsible>
          </div>
        )}

        {activeTab === 'rotation' && (
          <TabContentCollapsible
            tab="rotation"
            title={language === 'bn' ? 'MoA ঘোরান পরিকল্পক' : 'MoA Rotation Planner'}
          >
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <RotationPlanner
              products={products}
              onSelectProduct={(p) => setDetailProduct(p)}
              onOpenCalculator={(p) => setCalcProduct(p)}
              onOpenSafety={(p) => setSafetyProduct(p)}
            />
          </Suspense>
          </TabContentCollapsible>
        )}

        {activeTab === 'safety' && (
          <TabContentCollapsible
            tab="safety"
            title={language === 'bn' ? 'নিরাপত্তা ও পিপিই' : 'Safety & PPE'}
          >
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <SafetyView
              products={products}
              onOpenSafetyModal={(p) => setSafetyProduct(p)}
            />
          </Suspense>
          </TabContentCollapsible>
        )}

        {activeTab === 'guidebook' && (
          <TabContentCollapsible
            tab="guidebook"
            title={language === 'bn' ? 'ক্ষেত হ্যান্ডবুক' : 'Field Guidebook'}
          >
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <Guidebook products={products} />
          </Suspense>
          </TabContentCollapsible>
        )}

        {activeTab === 'alerts' && (
          <TabContentCollapsible
            tab="alerts"
            title={language === 'bn' ? 'সতর্কতা কেন্দ্র' : 'Alert Center'}
          >
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <NotificationCenter
              alerts={alerts}
              onMarkRead={handleMarkAlertRead}
              onAddCustomAlert={handleAddCustomAlert}
              onDeleteAlert={handleDeleteAlert}
            />
          </Suspense>
          </TabContentCollapsible>
        )}

        {activeTab === 'intelligence' && (
          <TabContentCollapsible
            tab="intelligence"
            title={language === 'bn' ? 'কীটনাশক বুদ্ধিমত্তা' : 'Pesticide Intelligence'}
          >
            <Suspense fallback={<DatabaseSplash language={language} />}><PesticideIntelligenceView products={products} /></Suspense>
          </TabContentCollapsible>
        )}

        {/* ── PROTECTION — integrated protection workflow ── */}
        {activeTab === 'protection' && (
          <TabContentCollapsible
            tab="protection"
            title={language === 'bn' ? 'সমন্বিত ফসল সুরক্ষা' : 'Integrated Protection'}
          >
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <ProtectionView />
          </Suspense>
          </TabContentCollapsible>
        )}

        {activeTab === 'specialist' && (
          <TabContentCollapsible
            tab="specialist"
            title={language === 'bn' ? 'বিশেষজ্ঞ অনুসন্ধান' : 'Specialist Search'}
          >
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <SpecialistSearchView
              products={products}
              onProductClick={(p) => setDetailProduct(p)}
              persona={persona}
            />
          </Suspense>
          </TabContentCollapsible>
        )}

        {activeTab === 'more' && (
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <MoreView />
          </Suspense>
        )}

        {activeTab === 'myfield' && (
          <TabContentCollapsible
            tab="myfield"
            title={language === 'bn' ? 'আমার মাঠ' : 'My Field'}
          >
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <MyFieldView
              products={products}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          </Suspense>
          </TabContentCollapsible>
        )}
      </main>

      {/* Global Modals */}
      <Suspense fallback={null}>
        <NavigationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadAlertCount={unreadAlertCount}
          totalProductsCount={products.length}
          onOpenShare={() => {
            setIsDrawerOpen(false);
            setIsShareModalOpen(true);
          }}
        />
      </Suspense>

      {detailProduct && (
        <Suspense fallback={null}>
          <ProductDetailModal
            product={detailProduct}
            onClose={() => setDetailProduct(null)}
            onOpenDosageCalculator={(p) => {
              setDetailProduct(null);
              setCalcProduct(p);
            }}
          />
        </Suspense>
      )}

      {calcProduct && activeTab !== 'calculator' && (
        <Suspense fallback={null}>
          <DosageCalculatorModal
            products={products}
            selectedProduct={calcProduct}
            onClose={() => setCalcProduct(null)}
            onSelectProduct={(p) => setCalcProduct(p)}
          />
        </Suspense>
      )}

      {safetyProduct && (
        <Suspense fallback={null}>
          <SafetyChecklistModal
            product={safetyProduct}
            onClose={() => setSafetyProduct(null)}
          />
        </Suspense>
      )}

      {/* Social & Meta Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        activeTab={activeTab}
      />

      <Suspense fallback={null}>
        <LabelScannerModal
          open={isScanOpen}
          products={products}
          onClose={() => setIsScanOpen(false)}
          onSelectProduct={(p) => {
            setIsScanOpen(false);
            setSearchQuery(p.tradeName);
            setDetailProduct(p);
            setActiveTab('database');
          }}
        />
      </Suspense>

      {/* PWA Floating Offline Indicator */}
      <OfflineIndicator />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/icons/icon-192.png"
              alt={language === 'bn' ? 'পেস্টিসাইডনেক্সট লোগো' : 'PesticideNext Logo'}
              className="w-8 h-8 rounded-lg object-contain shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-bold text-slate-900">
                {language === 'bn' ? 'পেস্টিসাইডনেক্সট — পরের স্প্রে, আর ভুল হবে না।' : 'PesticideNext — The next spray, without the mistake.'}
              </p>
              <p className="text-[11px] text-slate-400">
                {language === 'bn' ? 'পণ্যের তথ্য কৃষি সম্প্রসারণ অধিদপ্তর (DAE)-এর প্রকাশ্য নিবন্ধন তালিকা থেকে সংগ্রহ করা হয়েছে — এটি সরকারি অ্যাপ নয়।' : 'Product data sourced from the public DAE register — this is not a government app.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Live Traffic Counters */}
            {visitorStats && (
              <div className="flex flex-wrap items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-[11px] font-medium text-slate-500">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {language === 'bn' ? 'ইউনিক ভিজিটর:' : 'Unique Visitors:'}{' '}
                    <strong className="text-slate-800">{formatNum(visitorStats.unique)}</strong>
                  </span>
                </div>
                <div className="h-3 w-px bg-slate-200" />
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>
                    {language === 'bn' ? 'মোট ভিজিট:' : 'Total Visits:'}{' '}
                    <strong className="text-slate-800">{formatNum(visitorStats.total)}</strong>
                  </span>
                </div>
                <div className="h-3 w-px bg-slate-200" />
                <div className="flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>
                    {language === 'bn' ? 'অনলাইন:' : 'Online:'}{' '}
                    <strong className="text-slate-800">{formatNum(visitorStats.active)}</strong>
                  </span>
                </div>
                <div className="h-3 w-px bg-slate-200" />
                <div className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-violet-600" />
                  <span title={language === 'bn' ? 'মোট ডাউনলোড (PDF/গাইড)' : 'Total PDF/guide downloads'}>
                    {language === 'bn' ? 'ডাউনলোড:' : 'Downloads:'}{' '}
                    <strong className="text-slate-800">{formatNum(visitorStats.downloads ?? 0)}</strong>
                  </span>
                </div>
                {(visitorStats.shareDownloads ?? 0) > 0 && (
                  <>
                    <div className="h-3 w-px bg-slate-200" />
                    <div className="flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span title={language === 'bn' ? 'শেয়ার করা লিংক খুলে ডাউনলোড হয়েছে' : 'Downloads made by visitors who opened a shared link'}>
                        {language === 'bn' ? 'শেয়ার থেকে:' : 'Via share:'}{' '}
                        <strong className="text-slate-800">{formatNum(visitorStats.shareDownloads)}</strong>
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            <button onClick={() => setActiveTab('home')} className="hover:text-emerald-700 cursor-pointer font-bold text-slate-800">
              {language === 'bn' ? 'হোম' : 'Home'}
            </button>
            <button onClick={() => setActiveTab('database')} className="hover:text-emerald-700 cursor-pointer">
              {language === 'bn' ? 'রাসায়নিক ডিরেক্টরি' : 'Chemical Directory'}
            </button>
            <button onClick={() => setActiveTab('rotation')} className="hover:text-emerald-700 cursor-pointer">
              {language === 'bn' ? 'MoA ঘূর্ণন' : 'MoA Rotation'}
            </button>
            <button onClick={() => setActiveTab('safety')} className="hover:text-emerald-700 cursor-pointer">
              {language === 'bn' ? 'পিপিই চেকলিস্ট' : 'PPE Checklists'}
            </button>
            <button onClick={() => setActiveTab('guidebook')} className="hover:text-emerald-700 cursor-pointer">
              {language === 'bn' ? 'ফিল্ড ক্যালিব্রেশন' : 'Field Calibration'}
            </button>
            <button onClick={() => setActiveTab('alerts')} className="hover:text-emerald-700 cursor-pointer">
              {language === 'bn' ? 'নিয়ন্ত্রক নোটিফিকেশন' : 'Compliance Alerts'}
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold border border-emerald-200 cursor-pointer transition"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'bn' ? 'শেয়ার করুন' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* OG-image preview strip — this app + companion projects. Each card
            shows the target page's real og:image with a one-line "what it is",
            so the footer alone gives a clear understanding of the whole
            ecosystem. Cards open in a new tab; images fail gracefully to a
            gradient + emoji placeholder. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 mt-6 pt-6">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            {language === 'bn' ? 'এই অ্যাপ ও সম্পর্কিত প্রজেক্ট — এক নজরে' : 'This app & related projects — at a glance'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {RELATED_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all p-2.5 flex flex-col gap-2"
              >
                {/* Preview: real og:image over a graceful fallback */}
                <div className="relative aspect-[1200/630] rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-slate-100">
                    <span className="text-3xl" aria-hidden>{link.emoji}</span>
                  </div>
                  <img
                    src={link.image}
                    alt={link.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {link.badgeEn && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-sm">
                      {language === 'bn' ? link.badgeBn : link.badgeEn}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5 leading-snug">
                    <span className="truncate">{language === 'bn' ? link.titleBn : link.titleEn}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 opacity-60 group-hover:opacity-100 group-hover:text-emerald-600 transition-opacity" />
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1 line-clamp-3">
                    {language === 'bn' ? link.descBn : link.descEn}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
