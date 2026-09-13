import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronDown, ChevronUp, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CollapsibleUserGuideProps {
  pageKey: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  stepsEn: string[];
  stepsBn: string[];
  proTipsEn?: string[];
  proTipsBn?: string[];
}

export const CollapsibleUserGuide: React.FC<CollapsibleUserGuideProps> = ({
  pageKey,
  titleEn,
  titleBn,
  subtitleEn,
  subtitleBn,
  stepsEn,
  stepsBn,
  proTipsEn = [],
  proTipsBn = []
}) => {
  const { language } = useLanguage();
  
  // Persist open/closed status per page key in localStorage
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`guide_open_${pageKey}`);
      // Default to true for better discovery on first use
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`guide_open_${pageKey}`, String(nextState));
    }
  };

  const title = language === 'bn' ? titleBn : titleEn;
  const subtitle = language === 'bn' ? subtitleBn : subtitleEn;
  const steps = language === 'bn' ? stepsBn : stepsEn;
  const proTips = language === 'bn' ? proTipsBn : proTipsEn;

  return (
    <div 
      id={`user-guide-${pageKey}`}
      className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 shadow-3xs transition-all duration-200"
    >
      {/* Header Panel */}
      <div 
        onClick={toggleOpen}
        className="flex items-center justify-between cursor-pointer select-none gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200 shrink-0">
            <HelpCircle className="w-5 h-5 text-emerald-700 animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-emerald-950 tracking-tight leading-tight">
                {title}
              </h4>
              <span className="bg-emerald-200/60 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider shrink-0">
                {language === 'bn' ? 'ব্যবহার নির্দেশিকা' : 'Field Manual'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800/80 mt-0.5 font-medium leading-normal">
              {subtitle}
            </p>
          </div>
        </div>

        <button 
          className="p-1.5 rounded-lg hover:bg-emerald-100/80 text-emerald-800 transition"
          aria-label={isOpen ? 'Collapse user guide' : 'Expand user guide'}
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-emerald-200/50 space-y-4">
              
              {/* Instruction Steps List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-800/70 font-bold block">
                    {language === 'bn' ? 'ধাপ-ভিত্তিক পরিচালনা পদ্ধতি:' : 'Step-by-Step Instructions:'}
                  </span>
                  
                  <ul className="space-y-2">
                    {steps.map((step, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-[11px] text-slate-700 leading-relaxed">
                        <span className="w-4.5 h-4.5 bg-emerald-600/10 border border-emerald-300 text-emerald-800 font-bold text-[10px] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Tips / Advisory Panel */}
                {proTips.length > 0 && (
                  <div className="bg-white/80 border border-emerald-200/50 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] uppercase tracking-wider font-extrabold block">
                        {language === 'bn' ? 'অ্যাডভাইসরি ও বৈজ্ঞানিক টিপস:' : 'Scientific Advisory & Tips:'}
                      </span>
                    </div>

                    <ul className="space-y-1.5">
                      {proTips.map((tip, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-[11px] text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Offline Disclaimer footnote */}
              <div className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>
                  {language === 'bn' 
                    ? 'তথ্যসূত্র: কৃষি সম্প্রসারণ অধিদপ্তর (DAE), বাংলাদেশ সরকার। শতভাগ অফলাইন ও অফলাইন-এনক্রিপ্টেড।' 
                    : 'Reference: Department of Agricultural Extension (DAE), Government of Bangladesh. 100% Offline.'}
                </span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
