import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Compass, 
  Home, 
  Database, 
  Calculator, 
  RotateCw, 
  ShieldCheck,
  BookOpen,
  Bell,
  Share2,
  Languages,
  Info,
  ArrowRight,
  Sparkles,
  Zap,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  NotebookPen,
  BrainCircuit
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AppTab } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  unreadAlertCount: number;
  totalProductsCount: number;
  onOpenShare: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  unreadAlertCount,
  totalProductsCount,
  onOpenShare
}) => {
  const { language, toggleLanguage, t, formatNum } = useLanguage();

  const handleTabClick = (tab: AppTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Sliding Navigation Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="acg-drawer-scope fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-200"
          >
            {/* Drawer Header Box */}
            <div className="p-5 border-b border-slate-100 bg-emerald-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-32 h-32 rounded-full bg-emerald-800/40 blur-2xl"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                    <Compass className="w-5 h-5 text-emerald-300 animate-spin-slow" />
                  </div>
                  <div>
                    <h2 className="font-black text-sm tracking-wide uppercase">
                      {language === 'bn' ? 'পেস্টিসাইডনেক্সট গাইড স্টেশন' : 'PesticideNext Navigation'}
                    </h2>
                    <p className="text-[10px] text-emerald-200 font-medium">
                      {language === 'bn' ? '১-ক্লিক ফিল্ড গাইড ও ড্যাশবোর্ড' : '1-Click Interactive Assistant'}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition cursor-pointer"
                  title={language === 'bn' ? 'বন্ধ করুন' : 'Close drawer'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer App Identity Summary */}
              <div className="mt-5 flex items-center justify-between bg-emerald-950/60 rounded-xl p-3 border border-emerald-800/30 relative z-10 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-emerald-400 font-bold block">
                    {language === 'bn' ? 'নিবন্ধিত রাসায়নিক' : 'System Database'}
                  </span>
                  <span className="font-extrabold text-white text-sm">
                    {formatNum(totalProductsCount)} {language === 'bn' ? 'টি বালাইনাশক' : 'Products'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-emerald-400 font-bold block">
                    {language === 'bn' ? 'অফলাইন অ্যাক্সেস' : 'PWA Compliance'}
                  </span>
                  <span className="font-extrabold text-emerald-300 text-sm flex items-center justify-end gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                    {language === 'bn' ? 'অফলাইন সুবিধা আছে' : 'Offline-ready'}
                  </span>
                </div>
              </div>
            </div>

            {/* Drawer Scrollable Navigation Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
              
              <div className="space-y-5">
                <section className="space-y-2">
                  <h3 className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {language === 'bn' ? 'শুরু করুন' : 'Start here'}
                  </h3>
                  <button onClick={() => handleTabClick('protection')} className="w-full flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left hover:bg-emerald-100 transition">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-700 text-white"><ShieldCheck className="h-5 w-5" /></span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-sm text-emerald-950">{language === 'bn' ? 'ফসলের সমস্যা বুঝুন' : 'Understand a crop problem'}</strong>
                      <span className="mt-0.5 block text-xs leading-relaxed text-emerald-900/75">{language === 'bn' ? 'মাঠ পর্যবেক্ষণ, ঝুঁকি, করণীয় ও পণ্য যাচাই—ধাপে ধাপে' : 'Field observations, risk, next steps and product checks in one guided flow'}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-emerald-700" />
                  </button>
                  <button onClick={() => handleTabClick('database')} className="w-full flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50 transition">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-700"><Database className="h-5 w-5" /></span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-sm text-slate-900">{language === 'bn' ? 'নিবন্ধিত পণ্য খুঁজুন' : 'Find registered products'}</strong>
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{language === 'bn' ? 'ব্র্যান্ড, সক্রিয় উপাদান বা নিবন্ধন নম্বর দিয়ে খুঁজুন' : 'Search by brand, active ingredient or registration number'}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                  </button>
                </section>

                <section className="space-y-2">
                  <h3 className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {language === 'bn' ? 'মাঠের কাজের সরঞ্জাম' : 'Field tools'}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {([
                      { id: 'myfield' as AppTab, icon: NotebookPen, bn: 'আমার জমি ও স্প্রে ইতিহাস', en: 'My field & spray history', descBn: 'জমি ও প্রয়োগের রেকর্ড রাখুন', descEn: 'Keep field and application records' },
                      { id: 'calculator' as AppTab, icon: Calculator, bn: 'ডোজ হিসাব', en: 'Dose calculator', descBn: 'লেবেলের মাত্রা অনুযায়ী ট্যাংকের হিসাব করুন', descEn: 'Calculate tank quantities from label rates' },
                      { id: 'safety' as AppTab, icon: ShieldCheck, bn: 'নিরাপদ ব্যবহার', en: 'Safe use', descBn: 'PPE, PHI, REI ও জরুরি নিরাপত্তা নির্দেশনা', descEn: 'PPE, PHI, REI and emergency guidance' },
                    ]).map(item => (
                      <button key={item.id} onClick={() => handleTabClick(item.id)} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-emerald-300 hover:bg-emerald-50/50 transition">
                        <item.icon className="h-5 w-5 shrink-0 text-emerald-700" />
                        <span className="min-w-0 flex-1">
                          <strong className="block text-xs text-slate-800">{language === 'bn' ? item.bn : item.en}</strong>
                          <span className="mt-0.5 block text-[11px] text-slate-500">{language === 'bn' ? item.descBn : item.descEn}</span>
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-2">
                  <h3 className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {language === 'bn' ? 'শিখুন ও পরিকল্পনা করুন' : 'Learn & plan'}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {([
                      { id: 'rotation' as AppTab, icon: RotateCw, bn: 'স্প্রে গ্রুপ পরিবর্তন', en: 'Plan spray-group rotation', descBn: 'IRAC, FRAC ও HRAC গ্রুপ বুঝুন', descEn: 'Understand IRAC, FRAC and HRAC groups' },
                      { id: 'guidebook' as AppTab, icon: BookOpen, bn: 'মাঠ নির্দেশিকা', en: 'Field handbook', descBn: 'ক্যালিব্রেশন, IPM ও নিরাপত্তা শিখুন', descEn: 'Learn calibration, IPM and safety' },
                      { id: 'alerts' as AppTab, icon: Bell, bn: 'সতর্কবার্তা ও আপডেট', en: 'Alerts & updates', descBn: 'নিয়ন্ত্রক ও মৌসুমি তথ্য দেখুন', descEn: 'Review regulatory and seasonal updates' },
                    ]).map(item => (
                      <button key={item.id} onClick={() => handleTabClick(item.id)} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-emerald-300 hover:bg-emerald-50/50 transition">
                        <item.icon className="h-5 w-5 shrink-0 text-emerald-700" />
                        <span className="min-w-0 flex-1">
                          <strong className="block text-xs text-slate-800">{language === 'bn' ? item.bn : item.en}</strong>
                          <span className="mt-0.5 block text-[11px] text-slate-500">{language === 'bn' ? item.descBn : item.descEn}</span>
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-2">
                  <h3 className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {language === 'bn' ? 'বিশেষজ্ঞদের জন্য' : 'For specialists'}
                  </h3>
                  <button onClick={() => handleTabClick('specialist')} className="w-full flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-emerald-300 hover:bg-emerald-50/50 transition">
                    <Compass className="h-5 w-5 shrink-0 text-emerald-700" />
                    <span className="min-w-0 flex-1">
                      <strong className="block text-xs text-slate-800">{language === 'bn' ? 'বিশেষজ্ঞ অনুসন্ধান' : 'Specialist search'}</strong>
                      <span className="mt-0.5 block text-[11px] text-slate-500">{language === 'bn' ? 'নীতিমালা, HHP, MoA ও নিয়ন্ত্রক তথ্য' : 'Policy, HHP, MoA and regulatory information'}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  </button>
                </section>
              </div>

              {/* SECTION 3: System / PWA Check */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'bn' ? 'ডিভাইস ও সংযোগ স্থিতি' : 'Device & Connection Status'}
                </span>
                
                <div className="flex items-center gap-3 text-xs">
                  <div className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800">PesticideNext Mobile</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        PWA
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {language === 'bn' ? 'ক্যাশ করা অংশ অফলাইনে চলে; লাইভ তথ্যের জন্য ইন্টারনেট লাগবে' : 'Cached tools work offline; live information needs internet'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer Panel */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 text-xs">
              
              {/* Language toggle trigger button inside drawer */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs transition shadow-2xs cursor-pointer select-none"
              >
                <Languages className="w-3.5 h-3.5 text-slate-500" />
                <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
              </button>

              {/* Share button inside drawer */}
              <button
                onClick={onOpenShare}
                className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs transition shadow-2xs cursor-pointer select-none"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'শেয়ার' : 'Share'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Dismiss'}
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
