import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ChemicalProduct, RegulatoryAlert, AppTab } from './types';
import { loadDatabase } from './data/loadDatabase';
import { INITIAL_REGULATORY_ALERTS } from './data/regulatoryAlertsData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ShareModal } from './components/ShareModal';
import { DocumentMeta } from './components/DocumentMeta';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useLanguage } from './context/LanguageContext';
import { Analytics } from '@vercel/analytics/react';
import {
  Leaf,
  Share2,
  Users,
  Eye
} from 'lucide-react';

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
const RotationPlanner = lazy(() =>
  import('./components/RotationPlanner').then((m) => ({ default: m.RotationPlanner }))
);
const SafetyView = lazy(() =>
  import('./components/SafetyView').then((m) => ({ default: m.SafetyView }))
);
const NotificationCenter = lazy(() =>
  import('./components/NotificationCenter').then((m) => ({ default: m.NotificationCenter }))
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
        {language === 'bn' ? '৫,৭১১+ নিবন্ধিত বালাইনাশক প্রস্তুত করা হচ্ছে' : 'Preparing 5,711+ registered products'}
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
  // filter, and card grid reflects the complete 5,711-product catalogue.
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
      window.localStorage.setItem('agrichem_custom_products', JSON.stringify(customOnly));
    }
    setProducts(newProducts);
  };

  const handleResetProducts = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('agrichem_custom_products');
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

  // Real-time visitor counts state
  const [visitorStats, setVisitorStats] = useState<{ total: number; unique: number; active: number } | null>(null);

  useEffect(() => {
    let isNewSession = false;
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('agrichem_session_started')) {
        sessionStorage.setItem('agrichem_session_started', 'true');
        isNewSession = true;
      }
    }

    const fetchHit = async () => {
      try {
        const response = await fetch('/api/visitors/hit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isNewSession }),
        });
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setVisitorStats(data);
        }
      } catch (err) {
        console.warn('Failed to log visitor hit:', err);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/visitors/stats');
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setVisitorStats(data);
        }
      } catch (err) {
        console.warn('Failed to fetch visitor stats:', err);
      }
    };

    fetchHit();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  // Modals state
  const [detailProduct, setDetailProduct] = useState<ChemicalProduct | null>(null);
  const [calcProduct, setCalcProduct] = useState<ChemicalProduct | null>(null);
  const [safetyProduct, setSafetyProduct] = useState<ChemicalProduct | null>(null);

  // Alerts & Notifications state with localStorage persistence
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agrichem_alerts');
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
      localStorage.setItem('agrichem_alerts', JSON.stringify(alerts));
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
        totalProductsCount={products.length}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
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
        )}

        {activeTab === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
          </div>
        )}

        {activeTab === 'rotation' && (
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <RotationPlanner products={products} />
          </Suspense>
        )}

        {activeTab === 'safety' && (
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <SafetyView
              products={products}
              onOpenSafetyModal={(p) => setSafetyProduct(p)}
            />
          </Suspense>
        )}

        {activeTab === 'guidebook' && (
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <Guidebook products={products} />
          </Suspense>
        )}

        {activeTab === 'alerts' && (
          <Suspense fallback={<DatabaseSplash language={language} />}>
            <NotificationCenter
              alerts={alerts}
              onMarkRead={handleMarkAlertRead}
              onAddCustomAlert={handleAddCustomAlert}
              onDeleteAlert={handleDeleteAlert}
            />
          </Suspense>
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

      {/* PWA Floating Offline Indicator */}
      <OfflineIndicator />

      {/* Vercel Web Analytics */}
      <Analytics />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.svg"
              alt={language === 'bn' ? 'এগ্রিকেম প্রো লোগো' : 'AgriChem Pro Logo'}
              className="w-8 h-8 rounded-lg object-contain shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-bold text-slate-900">
                {language === 'bn' ? 'অ্যাগ্রিকেম প্রো — ফিল্ড কন্ট্রোলস ও ডাটাবেস গাইডবুক' : 'AgriChem Pro — Field Controls & Database Guidebook'}
              </p>
              <p className="text-[11px] text-slate-400">
                {language === 'bn' ? 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) অনুমোদিত অফিসিয়াল রেফারেন্স ডাটাবেস' : 'Department of Agricultural Extension (DAE) Official Reference Data'}
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
      </footer>
    </div>
  );
}
