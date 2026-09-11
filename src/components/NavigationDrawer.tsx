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
  AlertCircle
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

  const getStepStatus = (tab: AppTab) => {
    // Return a little badge indicating progress status or active state
    if (activeTab === tab) {
      return (
        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse border border-emerald-300">
          {language === 'bn' ? 'চলমান' : 'Viewing'}
        </span>
      );
    }
    return null;
  };

  const roadmapSteps = [
    {
      id: 'database' as AppTab,
      step: '1',
      titleEn: 'Browse Chemical Database',
      titleBn: 'নিবন্ধিত রাসায়নিক খুঁজুন',
      descEn: `Search ${totalProductsCount} formulations, check PHI, and locate target pests.`,
      descBn: `${formatNum(totalProductsCount)}টি অনুমোদিত বালাইনাশক, ফসল তোলার বিরতি ও বালাই দমন মাত্রা দেখুন।`,
      icon: Database,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      id: 'calculator' as AppTab,
      step: '2',
      titleEn: 'Calibrate & Calculate',
      titleBn: 'মাঠের ডোজ ও স্প্রেয়ার হিসাব',
      descEn: 'Configure 16L knapsacks and map water volume to your land area.',
      descBn: '১৬ লিটার ন্যাপস্যাক ও শতক/বিঘা জমির জন্য রাসায়নিকের সঠিক মাত্রা বের করুন।',
      icon: Calculator,
      color: 'text-teal-600 bg-teal-50 border-teal-100',
    },
    {
      id: 'rotation' as AppTab,
      step: '3',
      titleEn: 'Rotate Spray Mechanisms',
      titleBn: 'প্রতিরোধ দমনে স্প্রে আবর্তন',
      descEn: 'Design rotational cycles using IRAC/FRAC to avoid pest immunity.',
      descBn: 'একই গ্রুপের পুনরাবৃত্তি ঠেকাতে বৈজ্ঞানিক আবর্তন ও স্প্রে শিডিউল করুন।',
      icon: RotateCw,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      id: 'safety' as AppTab,
      step: '4',
      titleEn: 'Verify Safety Protocols',
      titleBn: 'ডব্লিউএইচও বিপদসীমা ও পিপিই',
      descEn: 'Review toxicity bands (Red-Green) and complete the PPE checklist.',
      descBn: 'লাল, হলুদ, নীল ও সবুজ বিপদ সংকেত বুঝে স্প্রে করার সুরক্ষামূলক গিয়ার নিন।',
      icon: ShieldCheck,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      id: 'guidebook' as AppTab,
      step: '5',
      titleEn: 'Field Handout / PDF Guide',
      titleBn: 'পকেট গাইডবুক ও ওয়াক্স অর্ডার',
      descEn: 'Study golden W.A.L.E.S mixing rules and export an A5 pocket book.',
      descBn: 'একাধিক বালাইনাশক মিশ্রণের বৈজ্ঞানিক W.A.L.E.S নিয়মাবলি ও A5 পিডিএফ।',
      icon: BookOpen,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    }
  ];

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
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-200"
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
                      {language === 'bn' ? 'অ্যাগ্রিকেম গাইড স্টেশন' : 'AgriChem Navigation'}
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
                    {language === 'bn' ? '১০০% অফলাইন' : '100% Offline'}
                  </span>
                </div>
              </div>
            </div>

            {/* Drawer Scrollable Navigation Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
              
              {/* SECTION 1: Standard Route Tabs list */}
              <div className="space-y-2.5">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                  {language === 'bn' ? 'প্রধান মেনু' : 'Primary Tabs'}
                </h3>
                
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleTabClick('home')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      activeTab === 'home'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Home className={`w-4 h-4 ${activeTab === 'home' ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <span>{t('tab_home')}</span>
                    </div>
                    {getStepStatus('home')}
                  </button>

                  <button
                    onClick={() => handleTabClick('database')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      activeTab === 'database'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Database className={`w-4 h-4 ${activeTab === 'database' ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <span>{t('tab_database')}</span>
                    </div>
                    {getStepStatus('database')}
                  </button>

                  <button
                    onClick={() => handleTabClick('calculator')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      activeTab === 'calculator'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Calculator className={`w-4 h-4 ${activeTab === 'calculator' ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <span>{t('tab_calculator')}</span>
                    </div>
                    {getStepStatus('calculator')}
                  </button>

                  <button
                    onClick={() => handleTabClick('rotation')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      activeTab === 'rotation'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RotateCw className={`w-4 h-4 ${activeTab === 'rotation' ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <span>{t('tab_rotation')}</span>
                    </div>
                    {getStepStatus('rotation')}
                  </button>

                  <button
                    onClick={() => handleTabClick('safety')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      activeTab === 'safety'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className={`w-4 h-4 ${activeTab === 'safety' ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <span>{t('tab_safety')}</span>
                    </div>
                    {getStepStatus('safety')}
                  </button>

                  <button
                    onClick={() => handleTabClick('guidebook')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      activeTab === 'guidebook'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className={`w-4 h-4 ${activeTab === 'guidebook' ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <span>{t('tab_guidebook')}</span>
                    </div>
                    {getStepStatus('guidebook')}
                  </button>

                  <button
                    onClick={() => handleTabClick('alerts')}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      activeTab === 'alerts'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bell className={`w-4 h-4 ${activeTab === 'alerts' ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <span>{t('tab_alerts')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {unreadAlertCount > 0 && (
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full text-[10px] border border-amber-200 animate-pulse">
                          {formatNum(unreadAlertCount)} {language === 'bn' ? 'টি নতুন' : 'new'}
                        </span>
                      )}
                      {getStepStatus('alerts')}
                    </div>
                  </button>
                </div>
              </div>

              {/* SECTION 2: What to do next (Structured Field Roadmap) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-1.5 px-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'bn' ? 'ফিল্ড কন্ট্রোল কাজের বৈজ্ঞানিক ধাপ' : 'Recommended Spray Workflow'}
                  </h3>
                </div>

                <div className="relative border-l-2 border-slate-150 pl-3 ml-2 space-y-4">
                  {roadmapSteps.map((step) => {
                    const StepIcon = step.icon;
                    const isActive = activeTab === step.id;
                    return (
                      <div 
                        key={step.id}
                        onClick={() => handleTabClick(step.id)}
                        className={`group relative pl-2 cursor-pointer transition-all ${isActive ? 'scale-101' : 'hover:scale-100.5'}`}
                      >
                        {/* Step Marker Circle */}
                        <div className={`absolute -left-[23px] top-1.5 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-2xs transition-colors ${
                          isActive 
                            ? 'bg-emerald-700 border-emerald-700 text-white font-extrabold' 
                            : 'bg-white border-slate-300 text-slate-400 group-hover:border-emerald-600 group-hover:bg-emerald-50'
                        }`}>
                          {step.step}
                        </div>

                        <div className={`border p-3 rounded-xl transition ${
                          isActive 
                            ? 'bg-emerald-50/50 border-emerald-300/80 shadow-3xs' 
                            : 'bg-white border-slate-200 group-hover:border-slate-300'
                        }`}>
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg border ${step.color}`}>
                              <StepIcon className="w-3.5 h-3.5" />
                            </div>
                            <h4 className={`text-[12px] font-bold ${isActive ? 'text-emerald-950' : 'text-slate-800'}`}>
                              {language === 'bn' ? step.titleBn : step.titleEn}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1.5 leading-normal">
                            {language === 'bn' ? step.descBn : step.descEn}
                          </p>
                          <div className="mt-2 flex items-center justify-end text-[10px] text-emerald-700 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>{language === 'bn' ? 'যান' : 'Go to Tab'}</span>
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                      <span className="font-bold text-slate-800">AgriChem Pro Mobile</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                        PWA
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {language === 'bn' ? 'অফলাইন ডেটাবেজ ও ইনস্টলেশন সম্পন্ন' : 'Fully cached for offline field operations'}
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
