/**
 * BottomNav.tsx
 * =============
 * Mobile-first bottom navigation bar: Home · Search/Scan (center action)
 * · My Field (with built-in intelligence badge) · More.
 *
 * Design notes for layman farmers:
 *  - Only 4 thumb-reachable targets; everything else lives behind "More".
 *  - The center button is the app's core job: open search, and from there
 *    scan a bottle label (Bangla OCR). Long labels / typing are hard in the
 *    field — camera is easier.
 *  - "My Field" carries a small dot when the built-in intelligence engine
 *    has something to say (spray window / rotation guard), so farmers see
 *    the intelligence without hunting for it. Tap opens the field desk;
 *    the intelligence panel inside can also be opened directly ("by click").
 */

import React from 'react';
import { Home, ScanSearch, Sprout, Menu, BrainCircuit } from 'lucide-react';
import type { AppTab } from '../types';
import { useLanguage } from '../context/LanguageContext';

export interface BottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  /** Opens the unified Search sheet (search box + scan + quick chips). */
  onOpenSearch: () => void;
  onOpenDrawer: () => void;
  /** True when the intelligence engine has an actionable insight. */
  intelligenceReady?: boolean;
}

/** Tabs that should highlight the "More" button instead of a primary one. */
const MORE_TABS: AppTab[] = ['calculator', 'rotation', 'safety', 'guidebook', 'alerts', 'intelligence', 'specialist'];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenDrawer,
  intelligenceReady = false,
}) => {
  const { language } = useLanguage();
  const bn = language === 'bn';

  const itemBase =
    'relative flex flex-col items-center justify-center gap-0.5 px-1 py-2 rounded-xl text-[10px] font-bold transition-colors cursor-pointer select-none min-w-0';
  const inactive = 'text-slate-500 hover:text-emerald-800';
  const active = 'text-[#006a4e]';

  return (
    <nav
      aria-label={bn ? 'প্রধান নেভিগেশন' : 'Primary navigation'}
      className="pn-bottomnav fixed bottom-0 inset-x-0 z-[60] md:hidden bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      className="pn-bottomnav fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {/* Home */}
        <button
          id="bottomnav-home"
          type="button"
          onClick={() => setActiveTab('home')}
          className={`${itemBase} ${activeTab === 'home' ? active : inactive}`}
          aria-current={activeTab === 'home' ? 'page' : undefined}
        >
          <Home className="w-6 h-6" />
          <span>{bn ? 'হোম' : 'Home'}</span>
        </button>

        {/* Search / Scan — center action */}
        <button
          id="bottomnav-search"
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center -mt-5 cursor-pointer select-none"
          aria-label={bn ? 'খুঁজুন বা লেবেল স্ক্যান করুন' : 'Search or scan a label'}
        >
          <span
            className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg border-4 border-white transition-colors ${
              activeTab === 'database' ? 'bg-[#f42a41]' : 'bg-[#006a4e] active:bg-emerald-900'
            }`}
          >
            <ScanSearch className="w-7 h-7 text-white" />
          </span>
          <span className={`text-[10px] font-bold -mt-1 ${activeTab === 'database' ? 'text-[#f42a41]' : 'text-slate-600'}`}>
            {bn ? 'খুঁজুন/স্ক্যান' : 'Search/Scan'}
          </span>
        </button>

        {/* My Field — intelligence by click / built-in badge */}
        <button
          id="bottomnav-myfield"
          type="button"
          onClick={() => setActiveTab('myfield')}
          className={`${itemBase} ${activeTab === 'myfield' || activeTab === 'intelligence' ? active : inactive}`}
          aria-current={activeTab === 'myfield' ? 'page' : undefined}
          title={bn ? 'আমার জমি — মাঠের ইন্টেলিজেন্স' : 'My Field — built-in intelligence'}
        >
          <span className="relative">
            <Sprout className="w-6 h-6" />
            {intelligenceReady && (
              <span className="absolute -top-1 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 border-2 border-white">
                <BrainCircuit className="w-2.5 h-2.5 text-white" />
              </span>
            )}
          </span>
          <span>{bn ? 'আমার জমি' : 'My Field'}</span>
        </button>

        {/* More */}
        <button
          id="bottomnav-more"
          type="button"
          onClick={onOpenDrawer}
          className={`${itemBase} ${MORE_TABS.includes(activeTab) ? active : inactive}`}
        >
          <Menu className="w-6 h-6" />
          <span>{bn ? 'আরও' : 'More'}</span>
        </button>
      </div>
    </nav>
  );
};
