import React from 'react';
import { WifiOff, ShieldCheck } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useLanguage } from '../context/LanguageContext';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { language } = useLanguage();

  if (isOnline) return null;

  return (
    <div 
      id="pwa-offline-indicator"
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 rounded-xl bg-amber-600 px-4 py-3 text-white shadow-xl border border-amber-500 animate-bounce-slow max-w-sm sm:max-w-md"
    >
      <div className="p-1 rounded-lg bg-amber-700/80 shrink-0">
        <WifiOff className="w-4 h-4 text-amber-200" />
      </div>
      <div className="text-xs">
        <div className="flex items-center gap-1 font-bold text-amber-100">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'bn' ? 'অফলাইন মোড সক্রিয়' : 'Offline Mode Active'}</span>
        </div>
        <p className="text-white/90 font-medium mt-0.5 leading-relaxed">
          {language === 'bn' 
            ? '৪,২৬২টি বালাইনাশক ও নির্দেশিকা অফলাইনে ব্যবহারের জন্য সম্পূর্ণ নিরাপদ রাখা হয়েছে।'
            : '4,262+ pesticides, formulas & guides are fully cached for field-work.'}
        </p>
      </div>
    </div>
  );
};
