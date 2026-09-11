import React, { useState } from 'react';
import { 
  Database, 
  Calculator, 
  RotateCw, 
  ShieldCheck, 
  BookOpen, 
  Bell, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  Download, 
  CheckCircle2, 
  Layers, 
  FlaskConical, 
  AlertTriangle,
  FileText,
  Compass,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ChemicalProduct, AppTab } from '../types';
import { CollapsibleUserGuide } from './CollapsibleUserGuide';

interface HomeViewProps {
  products: ChemicalProduct[];
  onNavigateTab: (tab: AppTab) => void;
  onSelectCropFilter: (crop: string) => void;
  onOpenShareModal: () => void;
  totalProductsCount: number;
  onOpenDrawer: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onNavigateTab,
  onSelectCropFilter,
  onOpenShareModal,
  totalProductsCount,
  onOpenDrawer
}) => {
  const { language, t, formatNum, transCrop } = useLanguage();
  const [activePreviewFeature, setActivePreviewFeature] = useState<number>(0);

  // Offline PWA Sync Status States
  const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? window.navigator.onLine : true);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'checking' | 'success'>('idle');

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleTriggerSync = () => {
    setSyncStatus('checking');
    setTimeout(() => {
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1200);
  };

  // Quick Field Diagnostic Matcher States
  const [selectedDiagCrop, setSelectedDiagCrop] = useState<'Rice' | 'Potato' | 'Tomato' | 'Mango'>('Rice');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('blast');

  const diagnosticData: Record<string, {
    cropNameEn: string;
    cropNameBn: string;
    symptoms: {
      id: string;
      titleEn: string;
      titleBn: string;
      symptomEn: string;
      symptomBn: string;
      diagnosisEn: string;
      diagnosisBn: string;
      ingredientEn: string;
      ingredientBn: string;
      moaEn: string;
      moaBn: string;
      rateEn: string;
      rateBn: string;
      phiEn: string;
      phiBn: string;
    }[];
  }> = {
    Rice: {
      cropNameEn: "Rice",
      cropNameBn: "ধান",
      symptoms: [
        {
          id: "blast",
          titleEn: "Leaf Blast Disease",
          titleBn: "ধানের ব্লাস্ট রোগ",
          symptomEn: "Diamond or eye-shaped spots on leaves, grey centers with reddish-brown margins. Severe cases lead to neck rot and blank heads.",
          symptomBn: "পাতায় চোখ বা হীরা আকৃতির দাগ, মাঝখানে ধূসর ও চারপাশ বাদামী রঙের ক্ষতের সৃষ্টি হয়। মারাত্মক আক্রমণে গলার অংশ পচে বা শুকিয়ে শীষ ভেঙে পড়ে।",
          diagnosisEn: "Rice Blast (Magnaporthe oryzae / Pyricularia oryzae fungus)",
          diagnosisBn: "ধানের ব্লাস্ট রোগ (ছত্রাকজনিত বালাই)",
          ingredientEn: "Tricyclazole (e.g. Trooper 75 WP) or Pyroquilon",
          ingredientBn: "ট্রাইসাইক্লাজল অথবা পাইরোকুইলন",
          moaEn: "FRAC Group 16.1 / 16.2 (Melanin Biosynthesis Inhibitor - MBI)",
          moaBn: "FRAC গ্রুপ ১৬.১ / ১৬.২ (মেলানিন তৈরি বাধাগ্রস্তকারী)",
          rateEn: "0.8g per Litre of water (approx. 13g per 16L Knapsack tank)",
          rateBn: "০.৮ গ্রাম প্রতি লিটার পানি (১৬ লিটার স্প্রেয়ারে প্রায় ১৩ গ্রাম)",
          phiEn: "21 Days safe pre-harvest interval",
          phiBn: "ফসল তোলার ২১ দিন পূর্বে স্প্রে বন্ধ করুন"
        },
        {
          id: "bph",
          titleEn: "Brown Plant Hopper (BPH)",
          titleBn: "বাদামী গাছ ফড়িং (কারেন্ট পোকা)",
          symptomEn: "Circular patches of dried, straw-colored rice plants. Large numbers of tiny brown bugs visible at the base of the stems.",
          symptomBn: "ধান খেতে বৃত্তাকার আকারে গাছ হঠাৎ শুকিয়ে খড়ের মতো পুড়ে যাওয়া রং ধারণ করে। গাছের গোড়ায় শত শত ছোট ছোট বাদামী ফড়িং বা পোকা দেখা যায়।",
          diagnosisEn: "Brown Plant Hopper (Nilaparvata lugens)",
          diagnosisBn: "বাদামী গাছ ফড়িং / কারেন্ট পোকা (শোষক পোকা বালাই)",
          ingredientEn: "Pymetrozine (e.g. Plenum 50 WG) or Imidacloprid",
          ingredientBn: "পাইমেট্রোজিন অথবা ইমিডাক্লোপ্রিড",
          moaEn: "IRAC Group 9B / 4A (Selective Feeding Blocker / Neonicotinoid)",
          moaBn: "IRAC গ্রুপ ৯বি / ৪এ (আহার বন্ধকারী / স্নায়ুতন্ত্রের নিকোটিনিক রিসেপ্টর ব্লক)",
          rateEn: "0.6g per Litre of water (approx. 10g per 16L Knapsack tank)",
          rateBn: "০.৬ গ্রাম প্রতি লিটার পানি (১৬ লিটার স্প্রেয়ারে ১০ গ্রাম)",
          phiEn: "14 Days safe pre-harvest interval",
          phiBn: "ফসল তোলার ১৪ দিন পূর্বে স্প্রে বন্ধ করুন"
        },
        {
          id: "stemborer",
          titleEn: "Yellow Stem Borer",
          titleBn: "ধানের মাজরা পোকা",
          symptomEn: "Dead central leaf whorl in vegetative stage ('dead heart') or white, papery, empty grain heads in reproductive stage ('white head').",
          symptomBn: "বাড়ন্ত অবস্থায় মাঝখানের কুশি শুকিয়ে যায় যাকে 'ডেড হার্ট' বলে। শীষ আসার পর সমস্ত দানা চিটা ও সাদা হয়ে খড়া থাকে যাকে 'হোয়াইট হেড' বলে।",
          diagnosisEn: "Yellow Stem Borer (Scirpophaga incertulas larva)",
          diagnosisBn: "ধানের হলুদ মাজরা পোকা (লার্ভা আক্রান্ত বালাই)",
          ingredientEn: "Cartap Hydrochloride (e.g. Suntaf 50 SP) or Chlorantraniliprole",
          ingredientBn: "কারটাপ হাইড্রোক্লোরাইড অথবা ক্লোরেন্ট্রানিলিপ্রোল",
          moaEn: "IRAC Group 14 / 28 (Nicotinic acetylcholine receptor blocker / Ryanodine receptor modulator)",
          moaBn: "IRAC গ্রুপ ১৪ / ২৮ (নিকোটিনিক রিসেপ্টর ব্লকার / পেশী সংকোচন সংকেত বন্ধকারী)",
          rateEn: "2.0g per Litre (Cartap) or 0.15g per Litre",
          rateBn: "২.০ গ্রাম প্রতি লিটার (কারটাপ) অথবা ০.১৫ গ্রাম প্রতি লিটার",
          phiEn: "21 Days safe pre-harvest interval",
          phiBn: "ফসল তোলার ২১ দিন পূর্বে স্প্রে বন্ধ করুন"
        }
      ]
    },
    Potato: {
      cropNameEn: "Potato",
      cropNameBn: "আলু",
      symptoms: [
        {
          id: "lateblight",
          titleEn: "Late Blight Disease",
          titleBn: "আলুর লেট ব্লাইট (মড়ক)",
          symptomEn: "Rapidly spreading water-soaked dark green/brown spots starting at tips. Fuzzy white mold grows on the underside of leaves under high moisture.",
          symptomBn: "পাতার ডগা থেকে শুরু হওয়া দ্রুত ছড়িয়ে পড়া ভেজা পচা গন্ধযুক্ত কালচে দাগ। কুয়াশাচ্ছন্ন ও স্যাঁতসেঁতে আবহাওয়ায় পাতার নিচে সাদা সুতার মতো ছত্রাক জন্মে।",
          diagnosisEn: "Late Blight (Phytophthora infestans oomycete - highly destructive)",
          diagnosisBn: "আলুর লেট ব্লাইট / মড়ক রোগ (উওমাইসিট বালাই)",
          ingredientEn: "Mancozeb + Metalaxyl (e.g. Ridomil Gold) or Cymoxanil",
          ingredientBn: "ম্যানকোজেব + মেটালাক্সিল অথবা সাইমোক্সানিল",
          moaEn: "FRAC Group M03 + 4 (Multi-site contact activity + Systemic RNA Polymerase I)",
          moaBn: "FRAC গ্রুপ M03 + ৪ (বহু-মুখী কন্টাক্ট অ্যাকশন + সিস্টেমিক আরএনএ পলিমারেজ ১)",
          rateEn: "2.0g per Litre of water (approx. 32g per 16L Knapsack tank)",
          rateBn: "২.০ গ্রাম প্রতি লিটার (১৬ লিটার স্প্রেয়ারে ৩২ গ্রাম)",
          phiEn: "14 Days safe pre-harvest interval",
          phiBn: "আলু তোলার ১৪ দিন পূর্বে স্প্রে বন্ধ করুন"
        },
        {
          id: "earlyblight",
          titleEn: "Early Blight Disease",
          titleBn: "আলুর আগাম ধসা রোগ",
          symptomEn: "Target-board like concentric dark rings or spots on older leaves near the base of the plant.",
          symptomBn: "গাছের নিচের বয়স্ক পাতায় লক্ষ্যবস্তু বা টার্গেট-বোর্ডের মতো বৃত্তাকার বলয়যুক্ত কালচে বা বাদামী দাগ দেখা যায়।",
          diagnosisEn: "Early Blight (Alternaria solani fungus)",
          diagnosisBn: "আলুর আগাম ধসা রোগ (অল্টারনারিয়া ছত্রাকজনিত বালাই)",
          ingredientEn: "Difenoconazole + Azoxystrobin (e.g. Amistar Top)",
          ingredientBn: "ডিফেনোকোনাজল + অ্যাজক্সিস্ট্রবিন",
          moaEn: "FRAC Group 3 + 11 (Demethylation Inhibitor - DMI + Quinone Outside Inhibitor - QoI)",
          moaBn: "FRAC গ্রুপ ৩ + ১১ (স্টেরল বায়োসিন্থেসিস দমন + কুইনোন রেসপিরেটরি বাধা)",
          rateEn: "1.0ml per Litre of water (approx. 16ml per 16L Knapsack tank)",
          rateBn: "১.০ মিলি প্রতি লিটার (১৬ লিটার স্প্রেয়ারে ১৬ মিলি)",
          phiEn: "14 Days safe pre-harvest interval",
          phiBn: "আলু তোলার ১৪ দিন পূর্বে স্প্রে বন্ধ করুন"
        }
      ]
    },
    Tomato: {
      cropNameEn: "Tomato",
      cropNameBn: "টমেটো",
      symptoms: [
        {
          id: "leafminer",
          titleEn: "Tuta absoluta Leaf Miner",
          titleBn: "টমেটোর টুটা পাতা সুরঙ্গকারী",
          symptomEn: "Large white blotchy mines or galleries in the leaves. Small holes at the base of tomatoes with dark frass.",
          symptomBn: "পাতার মাঝে বড় সুড়ঙ্গ বা গ্যালারির মতো ফ্যাকাশে দাগ। টমেটোর বোঁটার চারপাশে বা গায়ে ছোট ছিদ্র এবং কালো রঙের বিষ্ঠা দেখা যায়।",
          diagnosisEn: "Tuta absoluta (South American Tomato Pinworm larva)",
          diagnosisBn: "টমেটোর টুটা অ্যাবসোলুটা পোকা (লার্ভা বালাই)",
          ingredientEn: "Emamectin Benzoate (e.g. Proclaim 5 SG) or Spinosad",
          ingredientBn: "এমামেক্টিন বেনজয়েট অথবা স্পিনোস্যাড",
          moaEn: "IRAC Group 6 / 5 (Glutamate-gated chloride channel activator / Nicotinic acetylcholine modulator)",
          moaBn: "IRAC গ্রুপ ৬ / ৫ (স্নায়ুতন্ত্র ও পেশী পক্ষাঘাতকারী এবং কর্ডোটোনাল অ্যাক্টিভেটর)",
          rateEn: "1.0g per Litre (Emamectin) or 0.4ml per Litre",
          rateBn: "১.০ গ্রাম প্রতি লিটার (এমামেক্টিন) অথবা ০.৪ মিলি প্রতি লিটার",
          phiEn: "7 Days short safe pre-harvest interval",
          phiBn: "টমেটো তোলার ৭ দিন পূর্বে স্প্রে বন্ধ করুন"
        },
        {
          id: "wilt",
          titleEn: "Bacterial Wilt",
          titleBn: "টমেটোর ব্যাকটেরিয়াজনিত ঢলে পড়া",
          symptomEn: "Rapid wilting of entire plant during daytime while leaves remain green. Stems show brown discoloration when cut.",
          symptomBn: "সবুজ পাতা থাকা সত্ত্বেও দিনের বেলায় হঠাৎ সম্পূর্ণ গাছটি ঢলে পড়ে ও মরে যায়। আক্রান্ত কাণ্ড কাটলে ভেতরের নালী বাদামী রঙের দেখায়।",
          diagnosisEn: "Bacterial Wilt (Ralstonia solanacearum bacteria)",
          diagnosisBn: "টমেটোর ব্যাকটেরিয়াজনিত ঢলে পড়া রোগ (ব্যাকটেরিয়া বালাই)",
          ingredientEn: "Copper Oxychloride (e.g. Cupravit) + Agricultural Streptomycin",
          ingredientBn: "কপার অক্সিক্লোরাইড এবং কৃষিজাত স্ট্রেপ্টোমাইসিন সালফেট",
          moaEn: "FRAC Group M01 (Multi-site inorganic copper) + FRAC Group 25 (Hexopyranoside antibiotic)",
          moaBn: "FRAC গ্রুপ M01 (মাল্টি-সাইট কপার) + FRAC গ্রুপ ২৫ (অ্যান্টিবায়োটিক দমন)",
          rateEn: "4.0g per Litre of water (Copper Oxychloride)",
          rateBn: "৪.০ গ্রাম প্রতি লিটার পানি (কপার অক্সিক্লোরাইড)",
          phiEn: "7 Days safe pre-harvest interval",
          phiBn: "টমেটো তোলার ৭ দিন পূর্বে স্প্রে বন্ধ করুন"
        }
      ]
    },
    Mango: {
      cropNameEn: "Mango",
      cropNameBn: "আম",
      symptoms: [
        {
          id: "hopper",
          titleEn: "Mango Hopper Insect",
          titleBn: "আমের হপার পোকা",
          symptomEn: "Large numbers of tiny brown wedge-shaped insects jumping from flower panicles. Black sticky honey-dew soot on leaves.",
          symptomBn: "মুকুল ও কচি ডালে বসে রস চুষে খাওয়া শত শত ছোট ধূসর-বাদামী পোকা। পাতা ও মুকুলে আঠালো তরল নিঃসৃত করে যার ওপর কালো ছাইয়ের মতো ছত্রাক জন্মে।",
          diagnosisEn: "Mango Leaf Hopper (Idioscopus clypealis)",
          diagnosisBn: "আমের শোষক হপার পোকা (রস চোষক বালাই)",
          ingredientEn: "Imidacloprid (e.g. Admire) or Thiamethoxam",
          ingredientBn: "ইমিডাক্লোপ্রিড অথবা থায়ামেথক্সাম",
          moaEn: "IRAC Group 4A (Neonicotinoid Systemic Insecticide)",
          moaBn: "IRAC গ্রুপ ৪এ (পদ্ধতিগত অন্তর্বাহী শোষক নিষ্ক্রিয়কারী)",
          rateEn: "0.25ml or 0.2g per Litre of water",
          rateBn: "০.২৫ মিলি অথবা ০.২ গ্রাম প্রতি লিটার পানি",
          phiEn: "14 Days safe pre-harvest interval",
          phiBn: "ফল সংগ্রহের ১৪ দিন পূর্বে স্প্রে বন্ধ করুন"
        },
        {
          id: "anthracnose",
          titleEn: "Mango Anthracnose",
          titleBn: "আমের অ্যানথ্রাকনোজ (কালো দাগ)",
          symptomEn: "Irregular black or dark brown spots on flowers, young leaves, and developing green mangoes causing fruit drop.",
          symptomBn: "মুকুল, পাতা ও কচি আমের ওপর ছোট কালো বা কালচে বাদামী রঙের ছোপ ছোপ পচা দাগ পড়ে যার কারণে ফল ঝরে যায়।",
          diagnosisEn: "Mango Anthracnose (Colletotrichum gloeosporioides fungus)",
          diagnosisBn: "আমের অ্যানথ্রাকনোজ রোগ (ছত্রাকজনিত কালো পচা বালাই)",
          ingredientEn: "Carbendazim (e.g. Autostin) or Azoxystrobin",
          ingredientBn: "কার্বেন্ডাজিম অথবা অ্যাজক্সিস্ট্রবিন",
          moaEn: "FRAC Group 1 / 11 (MBC - Methyl Benzimidazole Carbamate / QoI)",
          moaBn: "FRAC গ্রুপ ১ / ১১ (কোষ বিভাজন ব্যাহতকারী / শ্বাস-প্রশ্বাস নিষ্ক্রিয়কারী)",
          rateEn: "1.0g per Litre (Carbendazim) or 1.0ml per Litre (Azoxystrobin)",
          rateBn: "১.০ গ্রাম প্রতি লিটার (কার্বেন্ডাজিম) অথবা ১.০ মিলি প্রতি লিটার (অ্যাজক্সিস্ট্রবিন)",
          phiEn: "15 Days safe pre-harvest interval",
          phiBn: "ফল সংগ্রহের ১৫ দিন পূর্বে স্প্রে বন্ধ করুন"
        }
      ]
    }
  };

  // Popular crops for quick navigation
  const popularCrops = [
    { en: 'Rice', bn: 'ধান', count: 28 },
    { en: 'Potato', bn: 'আলু', count: 18 },
    { en: 'Tomato', bn: 'টমেটো', count: 16 },
    { en: 'Brinjal', bn: 'বেগুন', count: 15 },
    { en: 'Mango', bn: 'আম', count: 12 },
    { en: 'Chilli', bn: 'মরিচ', count: 11 }
  ];

  // Feature definitions with detailed summaries for the Hero Section
  const features = [
    {
      id: 'database' as AppTab,
      titleEn: 'DAE Registered Chemical Database',
      titleBn: 'ডিএই নিবন্ধিত রাসায়নিক ডাটাবেস',
      subtitleEn: '70+ Approved Formulations & Active Ingredients',
      subtitleBn: '৭০+ অনুমোদিত সক্রিয় উপাদান ও বাণিজ্য নাম',
      descEn: 'Instant search across Bangladesh DAE-registered insecticides, fungicides, herbicides, and miticides. Includes verified trade names, target pests, label application rates, PHI (Pre-Harvest Interval) and REI safety windows.',
      descBn: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) নিবন্ধিত কীটনাশক, ছত্রাকনাশক, আগাছানাশক ও মাকড়নাশকের পূর্ণাঙ্গ তালিকা। অনুমোদিত বাণিজ্য নাম, লক্ষ্য বালাই, প্রতি হেক্টরে সঠিক প্রয়োগ মাত্রা, ফসল তোলার নিরাপদ বিরতি (PHI) ও রি-এন্ট্রি সময়কাল দেখুন।',
      icon: Database,
      badgeEn: '70+ Dossiers',
      badgeBn: '৭০+ রাসায়নিক',
      themeColor: 'from-emerald-500 to-emerald-700',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      lightGlow: 'hover:shadow-emerald-500/10',
      statLabelEn: 'Active Ingredients',
      statLabelBn: 'সক্রিয় উপাদান',
      statValue: `${totalProductsCount}+`,
      highlightsEn: ['Official DAE Registration', 'PHI & REI Safety Windows', 'Target Pest Index', 'Trade Names Dossier'],
      highlightsBn: ['ডিএই অফিসিয়াল নিবন্ধন', 'PHI ও REI নিরাপদ সময়', 'বালাই ও রোগের পূর্ণাঙ্গ তালিকা', 'ব্র্যান্ড ও বাণিজ্য নাম']
    },
    {
      id: 'calculator' as AppTab,
      titleEn: 'Knapsack Sprayer & Dosage Calculator',
      titleBn: 'মাঠপর্যায়ের মাত্রা ও ট্যাংক ক্যালকুলেটর',
      subtitleEn: 'Knapsack 16L, 10L, 20L & Land Unit Conversions',
      subtitleBn: '১৬L, ১০L, ২০L স্প্রেয়ার ও শতক/বিঘা হিসাব',
      descEn: 'Never over-spray or under-dose chemicals. Calibrate knapsack sprayers for 16L, 10L, or 20L tanks. Convert between Decimal/Shatak, Katha, Bigha, Acre, and Hectares with accurate active ingredient grams/milliliters and water volumes.',
      descBn: 'অতিরিক্ত বা কম বালাইনাশক ব্যবহারের ঝুঁকি দূর করুন। ১৬ লিটার, ১০ লিটার ও ২০ লিটার ন্যাপস্যাক স্প্রেয়ারের জন্য শতক, কাঠা, বিঘা বা একর জমিতে মোট কয় ট্যাংক স্প্রে প্রয়োজন এবং প্রতি ট্যাংকে ঠিক কত মিলি বা গ্রাম ওষুধ মেশাতে হবে তা এক নিমিষে হিসাব করুন।',
      icon: Calculator,
      badgeEn: 'Knapsack Calibrated',
      badgeBn: 'ন্যাপস্যাক ট্যাংক মিশ্রণ',
      themeColor: 'from-teal-500 to-teal-700',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      lightGlow: 'hover:shadow-teal-500/10',
      statLabelEn: 'Sprayer Sizes',
      statLabelBn: 'ট্যাংক সাইজ',
      statValue: '10L/16L/20L',
      highlightsEn: ['16L / 20L Knapsack Math', 'Shatak & Bigha Conversions', 'Total Water Volume Check', 'Tank Count Estimation'],
      highlightsBn: ['১৬L ও ২০L ট্যাংক মিশ্রণ', 'শতক ও বিঘা রূপান্তর', 'মোট পানির সঠিক পরিমাণ', 'প্রয়োজনীয় স্প্রেয়ার সংখ্যা']
    },
    {
      id: 'rotation' as AppTab,
      titleEn: 'MoA Resistance Rotation Planner',
      titleBn: 'MoA ক্রিয়া-কৌশল ঘূর্ণন পরিকল্পনা',
      subtitleEn: 'IRAC, FRAC & HRAC Scientific Spray Schedules',
      subtitleBn: 'IRAC, FRAC ও HRAC বৈজ্ঞানিক স্প্রে ক্রম',
      descEn: 'Stop pest and fungal resistance before it destroys crop yields. Plan rotational spray schedules categorized by IRAC (insecticides), FRAC (fungicides), and HRAC (herbicides). Built-in validation detects consecutive applications of the same mode of action.',
      descBn: 'একই গ্রুপের ওষুধ বারবার ব্যবহারে পোকা ও রোগের প্রতিরোধ ক্ষমতা তৈরি হয়। IRAC, FRAC ও HRAC আন্তর্জাতিক বৈজ্ঞানিক শ্রেণিবিন্যাস অনুযায়ী স্প্রে ক্রম তৈরি করুন। পরপর একই MoA গ্রুপের প্রয়োগ ঘটলে সিস্টেম স্বয়ংক্রিয়ভাবে সতর্কতা প্রদান করে।',
      icon: RotateCw,
      badgeEn: 'IRAC • FRAC • HRAC',
      badgeBn: 'প্রতিরোধ রোধ',
      themeColor: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      lightGlow: 'hover:shadow-blue-500/10',
      statLabelEn: 'Committees Covered',
      statLabelBn: 'আন্তর্জাতিক কমিটি',
      statValue: 'IRAC/FRAC/HRAC',
      highlightsEn: ['Prevent Pest Resistance', 'Real-time Conflict Detection', 'Crop Lifecycle Windows', 'Action Mechanism Grouping'],
      highlightsBn: ['বালাই প্রতিরোধ ক্ষমতা দমন', 'একই গ্রুপের ব্যবহারে সতর্কতা', 'ফসলের জীবনচক্রভিত্তিক ধাপ', 'সক্রিয় ক্রিয়া-কৌশল গ্রুপ']
    },
    {
      id: 'safety' as AppTab,
      titleEn: 'WHO Hazard Classes & PPE Checklists',
      titleBn: 'নিরাপত্তা, পিপিই ও জরুরি চিকিৎসা',
      subtitleEn: 'WHO Color Bands, Protective Gear & First-Aid',
      subtitleBn: 'WHO কালার ব্যান্ড, সুরক্ষামূলক গিয়ার ও প্রতিষেধক',
      descEn: 'Protect human life and the agricultural ecosystem. Features WHO toxicity color bands (Red, Yellow, Blue, Green), an interactive pre-spray PPE gear checklist, safe chemical mixing instructions, and emergency poisoning first-aid protocols.',
      descBn: 'কৃষক ও স্প্রেয়ার কর্মীদের স্বাস্থ্য সুরক্ষা নিশ্চিত করুন। WHO আন্তর্জাতিক বিপদ কালার ব্যান্ড (লাল, হলুদ, নীল, সবুজ), স্প্রে করার পূর্বে পিপিই সরঞ্জামের ইন্টারেক্টিভ চেকলিস্ট, বিষক্রিয়া প্রতিরোধের নিয়মাবলি এবং জরুরি চিকিৎসার বিস্তারিত প্রোটোকল।',
      icon: ShieldCheck,
      badgeEn: 'WHO Standards',
      badgeBn: 'ডব্লিউএইচও মানদণ্ড',
      themeColor: 'from-amber-500 to-amber-700',
      textColor: 'text-amber-800',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      lightGlow: 'hover:shadow-amber-500/10',
      statLabelEn: 'Toxicity Bands',
      statLabelBn: 'বিপদ শ্রেণি',
      statValue: 'Ia, Ib, II, III, U',
      highlightsEn: ['WHO Hazard Bands (Ia-U)', 'Pre-Spray PPE Checklist', 'Emergency Poisoning Protocol', 'Safe Disposal Guidance'],
      highlightsBn: ['WHO বিপদ শ্রেণি (Ia-U)', 'স্প্রে-পূর্ব পিপিই চেকলিস্ট', 'জরুরি প্রাথমিক চিকিৎসা', 'নিরাপদ বোতল অপসারণ']
    },
    {
      id: 'guidebook' as AppTab,
      titleEn: 'A5 Field Pocket Guidebook & Mixing Order',
      titleBn: 'মাঠ পকেট বুক গাইড ও W.A.L.E.S. নিয়ম',
      subtitleEn: 'Printable A5 Field Manual & Nozzle Calibration',
      subtitleBn: 'মুদ্রণযোগ্য A5 পকেট বুক ও নোজল ক্যালিব্রেশন',
      descEn: 'Carry the field handbook right in your pocket. Features the golden W.A.L.E.S. rule for safe tank mixing sequences, nozzle spray calibration formulas, crop-by-crop chemical tables, and 1-click printable A5 PDF export for offline field work.',
      descBn: 'মাঠে ইন্টারনেট ছাড়াই ব্যবহার করুন। একাধিক বালাইনাশক সঠিকভাবে মেশানোর বৈজ্ঞানিক W.A.L.E.S. ক্রমানুসার, নোজল ক্যালিব্রেশন পদ্ধতি এবং মাঠপর্যায়ে ব্যবহারের জন্য সরাসরি এক ক্লিকে ডাউনলোডযোগ্য ও মুদ্রণযোগ্য A5 ফিল্ড পকেট বুক (PDF)।',
      icon: BookOpen,
      badgeEn: 'Printable A5 PDF',
      badgeBn: 'মুদ্রণযোগ্য A5 PDF',
      themeColor: 'from-emerald-600 to-green-800',
      textColor: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      lightGlow: 'hover:shadow-emerald-500/10',
      statLabelEn: 'Offline Access',
      statLabelBn: 'অফলাইন সুবিধা',
      statValue: '100% PWA',
      highlightsEn: ['W.A.L.E.S. Mixing Sequence', 'Nozzle Flow Rate Math', 'Downloadable A5 PDF', 'Compact Field Format'],
      highlightsBn: ['W.A.L.E.S. মিশ্রণের নিয়ম', 'নোজল স্প্রে ক্যালিব্রেশন', 'ডাউনলোডযোগ্য A5 PDF', 'সহজ বহনযোগ্য পকেট সাইজ']
    },
    {
      id: 'alerts' as AppTab,
      titleEn: 'Regulatory Alerts & Seasonal Outbreaks',
      titleBn: 'নিয়ন্ত্রক নোটিশ ও মৌসুমি সতর্কতা',
      subtitleEn: 'Banned Pesticides, Outbreak Warnings & PHI Notices',
      subtitleBn: 'নিষিদ্ধ তালিকা, আক্রমণের পূর্বাভাস ও সতর্কবার্তা',
      descEn: 'Stay legally compliant and environmentally responsible. Real-time updates on seasonal pest outbreaks (e.g. Fall Armyworm, BPH, Late Blight), official lists of banned pesticides in Bangladesh, and pre-harvest safety interval reminders.',
      descBn: 'সরকারি আইন ও পরিবেশগত নিয়ম মেনে চলুন। মৌসুমি বালাই আক্রমণ (যেমন: ধানের মাজরা, কারেন্ট পোকা, আলুর মড়ক রোগ) এর সময়োপযোগী পূর্বাভাস, বাংলাদেশে নিষিদ্ধ বা নিয়ন্ত্রিত বালাইনাশকের হালনাগাদ তালিকা ও ফসল তোলার বিরতি সতর্কতা।',
      icon: Bell,
      badgeEn: 'Compliance & Alerts',
      badgeBn: 'জরুরি সতর্কতা',
      themeColor: 'from-rose-500 to-rose-700',
      textColor: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      lightGlow: 'hover:shadow-rose-500/10',
      statLabelEn: 'Regulatory Status',
      statLabelBn: 'নিয়ন্ত্রক তথ্য',
      statValue: 'DAE / MoA',
      highlightsEn: ['Seasonal Outbreak Alerts', 'Banned Pesticide Warnings', 'Pre-Harvest Notifications', 'Compliance Check'],
      highlightsBn: ['মৌসুমি বালাই পূর্বাভাস', 'নিষিদ্ধ বালাইনাশক তালিকা', 'ফসল কাটার বিরতি নোটিশ', 'আইনগত নির্দেশনা']
    }
  ];

  const currentPreview = features[activePreviewFeature];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION: Summary of Each Feature with Visual Animations */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/60 shadow-xl">
        {/* Subtle decorative background light blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Announcement Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 backdrop-blur-md text-emerald-200 text-xs font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {language === 'bn' 
                  ? 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) রেফারেন্স ভিত্তিক পূর্ণাঙ্গ প্ল্যাটফর্ম' 
                  : 'DAE Official Reference & Scientific Resistance Suite'}
              </span>
            </div>

            {/* In-Hero Share Quick Trigger */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/40 text-xs font-semibold backdrop-blur-md shadow-xs transition cursor-pointer"
              title={language === 'bn' ? 'প্ল্যাটফর্মটি সহকর্মী ও কৃষকদের সাথে শেয়ার করুন' : 'Share platform with fellow agronomists'}
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-200" />
              <span>{language === 'bn' ? 'শেয়ার করুন' : 'Share Platform'}</span>
              <span className="bg-emerald-800 px-1.5 py-0.2 rounded text-[10px] text-emerald-200 font-bold">1-Click</span>
            </motion.button>
          </motion.div>

          {/* Main Hero Header & Call to Action */}
          <div className="max-w-4xl space-y-5">
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
            >
              {language === 'bn' ? (
                <>
                  আধুনিক ফসলের <span className="text-emerald-400">বালাই ব্যবস্থাপনা</span> ও নির্ভুল <span className="text-teal-300">রাসায়নিক মাত্রা</span> সহায়িকা
                </>
              ) : (
                <>
                  Precision Agricultural <span className="text-emerald-400">Chemical Guide</span> & Field <span className="text-teal-300">Crop Protection</span>
                </>
              )}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-3xl"
            >
              {language === 'bn' ? (
                'মাঠপর্যায়ে সঠিক বালাইনাশক নির্বাচন, ন্যাপস্যাক স্প্রেয়ারের নির্ভুল ট্যাংক মিশ্রণ, পোকা ও ছত্রাকের প্রতিরোধ ক্ষমতা ভাঙতে বৈজ্ঞানিক MoA আবর্তন, WHO নিরাপত্তা এবং অফলাইন পকেট বুক গাইডের সমন্বিত ডিজিটাল সিস্টেম।'
              ) : (
                'Streamline field chemical selection, calculate accurate 16L knapsack sprayer tank mixes, eliminate chemical resistance with IRAC/FRAC MoA rotations, enforce WHO safety standards, and carry an offline field manual.'
              )}
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                id="hero-cta-drawer"
                onClick={onOpenDrawer}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-950" />
                <span>{language === 'bn' ? 'দিকনির্দেশক গাইড মেনু' : 'Guide Menu Drawer'}</span>
                <span className="bg-amber-600/25 text-amber-950 px-1.5 py-0.2 rounded text-[10px] font-black">New</span>
              </button>

              <button
                id="hero-cta-database"
                onClick={() => onNavigateTab('database')}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition shadow-lg shadow-emerald-900/40 cursor-pointer"
              >
                <Database className="w-4 h-4" />
                <span>{language === 'bn' ? 'রাসায়নিক ডাটাবেস ব্রাউজ করুন' : 'Explore Chemical Database'}</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                id="hero-cta-calculator"
                onClick={() => onNavigateTab('calculator')}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700/90 border border-emerald-600/50 text-white font-semibold text-sm backdrop-blur-md transition shadow-sm cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-teal-300" />
                <span>{language === 'bn' ? 'ট্যাংক মাত্রা ক্যালকুলেটর' : 'Launch Tank Calculator'}</span>
              </button>

              <button
                id="hero-cta-share"
                onClick={onOpenShareModal}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-emerald-200 hover:text-white font-semibold text-sm backdrop-blur-md transition cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? 'অ্যাপটি শেয়ার করুন' : 'Share with Others'}</span>
              </button>

              <button
                id="hero-cta-guidebook"
                onClick={() => onNavigateTab('guidebook')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-emerald-300 hover:text-white font-medium text-sm transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'bn' ? 'A5 পকেট বুক গাইড' : 'A5 Pocket Book'}</span>
              </button>
            </motion.div>
          </div>

          {/* Quick Stats Banner Inside Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-10 mt-10 border-t border-emerald-800/60"
          >
            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3.5 border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                {formatNum(totalProductsCount)}+
              </span>
              <span className="text-xs text-emerald-200/80 font-medium">
                {language === 'bn' ? 'DAE নিবন্ধিত ফর্মুলেশন' : 'DAE Approved Chemicals'}
              </span>
            </div>

            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3.5 border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black text-teal-300">
                {formatNum(16)}L / {formatNum(20)}L
              </span>
              <span className="text-xs text-emerald-200/80 font-medium">
                {language === 'bn' ? 'ন্যাপস্যাক ট্যাংক ক্যালিব্রেশন' : 'Knapsack Sprayer Tank Math'}
              </span>
            </div>

            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3.5 border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                ১০০%
              </span>
              <span className="text-xs text-emerald-200/80 font-medium">
                {language === 'bn' ? 'অফলাইন ফিল্ড প্রস্তুতি (PWA)' : 'Offline Ready (PWA)'}
              </span>
            </div>

            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3.5 border border-white/10">
              <span className="block text-2xl sm:text-3xl font-black text-amber-400">
                ৩টি
              </span>
              <span className="text-xs text-emerald-200/80 font-medium">
                {language === 'bn' ? 'IRAC / FRAC / HRAC মানদণ্ড' : 'Scientific MoA Standards'}
              </span>
            </div>
          </motion.div>

          {/* PWA offline/online & Sync Status widget */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs backdrop-blur-md"
          >
            <div className="flex flex-wrap items-center gap-3">
              {isOnline ? (
                <span className="flex items-center gap-1.5 text-emerald-300 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {language === 'bn' ? 'সিস্টেম অনলাইন' : 'System Online'}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  {language === 'bn' ? 'অফলাইন মোড সক্রিয়' : 'Offline Mode Active'}
                </span>
              )}
              <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
              <p className="text-emerald-100/90 font-medium">
                {language === 'bn' 
                  ? 'লোকাল ডেটাবেস ক্যাশ: ১৮৭টি ডিএই নিবন্ধিত রাসায়নিক সক্রিয় রয়েছে।' 
                  : 'Local PWA Cache: DAE Registered Chemical Formulations Securely Cached.'}
              </p>
            </div>

            <button
              onClick={handleTriggerSync}
              disabled={syncStatus === 'checking'}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-[11px] border border-white/10 transition disabled:opacity-50 cursor-pointer"
            >
              {syncStatus === 'idle' && (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{language === 'bn' ? 'ক্যাশ রি-ভ্যালিডেট করুন' : 'Verify Local Integrity'}</span>
                </>
              )}
              {syncStatus === 'checking' && (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                  <span>{language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Checking Cache Integrity...'}</span>
                </>
              )}
              {syncStatus === 'success' && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'লোকাল ক্যাশ সচল ও নিরাপদ!' : 'Local Cache 100% Validated!'}</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE FEATURES SUMMARY GRID (Animated Cards with Icons & Direct Navigation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
            {language === 'bn' ? '৬টি মূল ফিচার ও সমাধান' : 'Core Features & Capabilities'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {language === 'bn' ? 'ফসলের সুরক্ষায় প্রতিটি ফিচারের তাৎক্ষণিক সারসংক্ষেপ' : 'Complete Summary of Every Core Feature'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mt-1">
            {language === 'bn' 
              ? 'নিচে প্রতিটি ফিচারের সংক্ষিপ্ত বিবরণ দেওয়া হলো। প্রয়োজনীয় যেকোনো টুলে সরাসরি প্রবেশ করতে কার্ডটিতে ক্লিক করুন।' 
              : 'Explore each specialized tool designed to elevate farming safety, field precision, and crop protection.'}
          </p>
        </div>

        {/* Collapsible User Guide */}
        <div className="mb-8">
          <CollapsibleUserGuide
            pageKey="home"
            titleEn="AgriChem Pro Field Suite Guide"
            titleBn="অ্যাগ্রিকেম প্রো স্যুট গাইড ও ভূমিকা"
            subtitleEn="Learn how to navigate our integrated offline-first crop protection toolkit."
            subtitleBn="আমাদের সমন্বিত অফলাইন ফসল সুরক্ষা টুলের সঠিক ব্যবহার ও সঠিক নেভিগেশন জানুন।"
            stepsEn={[
              "Open the Guide Menu Drawer (Compass button) at any time to see your recommended field spray workflow.",
              "Search registered products, check Pre-Harvest Intervals (PHI), and view active ingredients in the Chemical Database.",
              "Use the Knapsack Sprayer Dosage Calculator before mixing to avoid under-dosage or crop toxicity.",
              "Coordinate anti-resistance schedules in the MoA Rotation Planner to maintain chemical effectiveness.",
              "Check the WHO Hazard Classes and PPE Safety gear before stepping onto your farmland."
            ]}
            stepsBn={[
              "দিকনির্দেশক গাইড মেনু ড্রয়ার (Compass বোতাম) যেকোনো সময় খুলে আপনার বৈজ্ঞানিক স্প্রে কাজের ধাপগুলো দেখুন।",
              "রাসায়নিক ডাটাবেস থেকে অনুমোদিত বালাইনাশক খুঁজুন, ফসল তোলার নিরাপদ বিরতি (PHI) এবং উপাদান পরীক্ষা করুন।",
              "অতিরিক্ত বা কম মাত্রা এড়াতে ওষুধ মেশানোর পূর্বে ন্যাপস্যাক স্প্রেয়ার ট্যাংক ক্যালকুলেটর ব্যবহার করুন।",
              "বালাই ও ছত্রাকের রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি দমন করতে MoA রোটেশন প্ল্যানার ব্যবহার করে বৈজ্ঞানিক আবর্তন তৈরি করুন।",
              "জমিতে ওষুধ ছিটানোর পূর্বে ডব্লিউএইচও (WHO) বিপদ শ্রেণি ও পিপিই (PPE) সুরক্ষামূলক গিয়ার চেকলিস্ট মিলিয়ে নিন।"
            ]}
            proTipsEn={[
              "Always reference the official DAE Registration codes printed on chemical containers.",
              "This app is a Progressive Web App (PWA) - bookmark it or install to home screen for 100% offline field access."
            ]}
            proTipsBn={[
              "সর্বদা বোতল বা প্যাকেটের গায়ে থাকা সরকারি ডিএই (DAE) নিবন্ধন কোড মিলিয়ে দেখুন।",
              "এই অ্যাপটি পিডব্লিউএ (PWA) প্রযুক্তি সমৃদ্ধ, অফলাইনে মাঠে ব্যবহারের জন্য মোবাইলের হোম স্ক্রিনে ইনস্টল করে নিন।"
            ]}
          />
        </div>

        {/* 6 Feature Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigateTab(feature.id)}
                className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Top colored accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.themeColor}`}></div>

                <div>
                  {/* Card Header with Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.borderColor} border flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs`}>
                      <Icon className={`w-6 h-6 ${feature.textColor}`} />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${feature.bgColor} ${feature.textColor} border ${feature.borderColor}`}>
                      {language === 'bn' ? feature.badgeBn : feature.badgeEn}
                    </span>
                  </div>

                  {/* Feature Title & Subtitle */}
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {language === 'bn' ? feature.titleBn : feature.titleEn}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800/80 mb-3 mt-0.5">
                    {language === 'bn' ? feature.subtitleBn : feature.subtitleEn}
                  </p>

                  {/* Feature Comprehensive Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'bn' ? feature.descBn : feature.descEn}
                  </p>

                  {/* Feature Highlights Pills */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {(language === 'bn' ? feature.highlightsBn : feature.highlightsEn).map((pill, pIdx) => (
                      <span 
                        key={pIdx}
                        className="text-[10px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/80"
                      >
                        ✓ {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Direct Navigation Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-medium">
                    <span>{language === 'bn' ? feature.statLabelBn : feature.statLabelEn}: </span>
                    <span className="font-bold text-slate-800">{feature.statValue}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold ${feature.textColor} group-hover:translate-x-1 transition-transform`}>
                    <span>{language === 'bn' ? 'ব্যবহার করুন' : 'Launch Tool'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE FEATURE DEEP-DIVE PREVIEWER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-800">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Left Column: Interactive Tab Selectors */}
            <div className="w-full lg:w-5/12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ইন্টারেক্টিভ ফিচার নেভিগেটর' : 'Interactive Feature Inspector'}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {language === 'bn' ? 'প্রতিটি ফিচারের বাস্তব কার্যক্রম দেখুন' : 'Explore Feature Workflows in Action'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'bn' 
                  ? 'যেকোনো ফিচারের উপর ক্লিক করে তার লাইভ ড্যাশবোর্ড ও নমুনা কার্যক্রম পর্যালোচনা করুন।' 
                  : 'Select any feature tab to view its field workflow, key inputs, and how it solves crop protection challenges.'}
              </p>

              {/* Feature Tab Buttons */}
              <div className="space-y-2 pt-2">
                {features.map((item, fIdx) => {
                  const Icon = item.icon;
                  const isSelected = activePreviewFeature === fIdx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePreviewFeature(fIdx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md' 
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-950' : 'text-emerald-400'}`} />
                        <span>{language === 'bn' ? item.titleBn : item.titleEn}</span>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-40'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Live Feature Showcase Preview Card */}
            <div className="w-full lg:w-7/12">
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <currentPreview.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white">
                        {language === 'bn' ? currentPreview.titleBn : currentPreview.titleEn}
                      </h4>
                      <p className="text-xs text-emerald-400 font-medium">
                        {language === 'bn' ? currentPreview.subtitleBn : currentPreview.subtitleEn}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono bg-slate-900 text-emerald-300 px-2.5 py-1 rounded-md border border-slate-700">
                    {currentPreview.statValue}
                  </span>
                </div>

                {/* Body details */}
                <div className="py-4 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'bn' ? currentPreview.descBn : currentPreview.descEn}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    {(language === 'bn' ? currentPreview.highlightsBn : currentPreview.highlightsEn).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-xs text-slate-200 font-medium">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview Card Actions */}
                <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                  <button
                    onClick={onOpenShareModal}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer font-medium"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'bn' ? 'এই ফিচার শেয়ার করুন' : 'Share Feature'}</span>
                  </button>

                  <button
                    onClick={() => onNavigateTab(currentPreview.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition shadow-sm cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'সরাসরি টুলটিতে প্রবেশ করুন' : 'Launch Feature Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 INTERACTIVE FIELD DIAGNOSTIC MATCH TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>{language === 'bn' ? 'স্মার্ট ফিল্ড ডায়াগনস্টিক অ্যাসিস্ট্যান্ট' : 'Smart Field Diagnostic Matcher'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'bn' ? 'উপসর্গ দেখে বালাই ও সমাধান ম্যাচ করুন' : 'Match Field Symptoms to DAE Solutions'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'bn' 
                  ? 'আপনার জমিতে দেখা দেওয়া লক্ষণটি সিলেক্ট করুন এবং সাথে সাথে সঠিক ওষুধ, আন্তর্জাতিক MoA গ্রুপ ও প্রয়োগ মাত্রা জেনে নিন।' 
                  : 'Select your crop and click any observed leaf or pest symptom to instantly pull up verified active ingredients, dosage rates, and safety windows.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Box: Crop Selector Tabs & Symptoms Grid */}
            <div className="lg:col-span-5 space-y-6">
              {/* Crop Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                {(Object.keys(diagnosticData) as Array<keyof typeof diagnosticData>).map((cropKey) => (
                  <button
                    key={cropKey}
                    onClick={() => {
                      setSelectedDiagCrop(cropKey);
                      setSelectedSymptomId(diagnosticData[cropKey].symptoms[0].id);
                    }}
                    className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedDiagCrop === cropKey
                        ? 'bg-white text-emerald-800 shadow-sm'
                        : 'text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    {language === 'bn' ? diagnosticData[cropKey].cropNameBn : diagnosticData[cropKey].cropNameEn}
                  </button>
                ))}
              </div>

              {/* Symptoms Accordion/Grid */}
              <div className="space-y-3">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {language === 'bn' ? 'লক্ষণ বা উপসর্গ সমূহ' : 'Observed Symptoms'}
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {diagnosticData[selectedDiagCrop].symptoms.map((symptom) => {
                    const isSelected = selectedSymptomId === symptom.id;
                    return (
                      <button
                        key={symptom.id}
                        onClick={() => setSelectedSymptomId(symptom.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500/80 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <span className={`block text-xs font-bold ${isSelected ? 'text-emerald-950' : 'text-slate-900'}`}>
                            {language === 'bn' ? symptom.titleBn : symptom.titleEn}
                          </span>
                          <span className="block text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {language === 'bn' ? symptom.symptomBn : symptom.symptomEn}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Box: Actionable Diagnosis Details */}
            <div className="lg:col-span-7">
              {(() => {
                const activeSymptom = diagnosticData[selectedDiagCrop].symptoms.find(s => s.id === selectedSymptomId);
                if (!activeSymptom) return null;
                return (
                  <motion.div
                    key={activeSymptom.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      {/* Diagnostic Title Header */}
                      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                            {language === 'bn' ? 'সম্ভাব্য রোগ / আক্রমণকারী বালাই' : 'Verified Field Diagnosis'}
                          </span>
                          <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">
                            {language === 'bn' ? activeSymptom.diagnosisBn : activeSymptom.diagnosisEn}
                          </h4>
                        </div>
                        <span className="bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-md shrink-0">
                          {language === 'bn' ? 'জরুরি সমাধান' : 'High Priority'}
                        </span>
                      </div>

                      {/* Symptom Full Text */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                          {language === 'bn' ? 'লক্ষণ বিবরণ' : 'Observed Symptoms Description'}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed bg-white border border-slate-200/80 p-3 rounded-xl">
                          {language === 'bn' ? activeSymptom.symptomBn : activeSymptom.symptomEn}
                        </p>
                      </div>

                      {/* Ingredient and Moa details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
                          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                            {language === 'bn' ? 'সুপারিশকৃত সক্রিয় উপাদান' : 'Recommended Active Ingredient'}
                          </span>
                          <span className="text-xs font-extrabold text-slate-900">
                            {language === 'bn' ? activeSymptom.ingredientBn : activeSymptom.ingredientEn}
                          </span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
                          <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block mb-1">
                            {language === 'bn' ? 'আন্তর্জাতিক MoA গ্রুপ' : 'Scientific MoA Grouping'}
                          </span>
                          <span className="text-xs font-bold text-slate-900 block">
                            {language === 'bn' ? activeSymptom.moaBn : activeSymptom.moaEn}
                          </span>
                        </div>
                      </div>

                      {/* Dosage rate and PHI details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                            {language === 'bn' ? 'সুপারিশকৃত প্রয়োগ মাত্রা (প্রতি লিটার)' : 'Field Dosage Rate (per Litre)'}
                          </span>
                          <span className="text-xs font-extrabold text-emerald-950">
                            {language === 'bn' ? activeSymptom.rateBn : activeSymptom.rateEn}
                          </span>
                        </div>

                        <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100 shadow-2xs">
                          <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block mb-1">
                            {language === 'bn' ? 'ফসল তোলার নিরাপদ বিরতি (PHI)' : 'Pre-Harvest Interval (PHI)'}
                          </span>
                          <span className="text-xs font-extrabold text-amber-950 block">
                            {language === 'bn' ? activeSymptom.phiBn : activeSymptom.phiEn}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Database Search Action Button */}
                    <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-[10px] text-slate-500 font-medium text-center sm:text-left">
                        {language === 'bn'
                          ? 'নিচের বোতামটিতে ক্লিক করলে সরাসরি এই সক্রিয় উপাদানটি ডাটাবেসে সার্চ হয়ে অনুমোদিত ব্র্যান্ডগুলোর তালিকা দেখাবে।'
                          : 'Click below to instantly query the chemical database for this active ingredient and explore registered brand trade names.'}
                      </p>
                      <button
                        onClick={() => {
                          const queryVal = activeSymptom.ingredientEn.includes(' or ')
                            ? activeSymptom.ingredientEn.split(' or ')[0]
                            : activeSymptom.ingredientEn.split(' (')[0];
                          onSelectCropFilter(queryVal);
                        }}
                        className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                      >
                        <Database className="w-4 h-4 text-emerald-100" />
                        <span>{language === 'bn' ? 'অনুমোদিত ব্র্যান্ডসমূহ দেখুন' : 'Explore Approved Brands'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
                      </button>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 4. QUICK POPULAR CROPS SHORTCUTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-600" />
                {language === 'bn' ? 'জনপ্রিয় ফসলের বালাইনাশক এক ক্লিকে খুঁজুন' : 'Quick Crop Pesticide Search'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn' 
                  ? 'যেকোনো ফসলে ক্লিক করলে সরাসরি ডাটাবেসে ফিল্টার হয়ে যাবে' 
                  : 'Click on any crop to jump directly into the pre-filtered chemical database'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('database')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'bn' ? 'সকল ফসল দেখুন' : 'View All Crops'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {popularCrops.map((crop) => (
              <button
                key={crop.en}
                onClick={() => onSelectCropFilter(crop.en)}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/60 transition group cursor-pointer text-left"
              >
                <div>
                  <span className="block font-bold text-xs text-slate-800 group-hover:text-emerald-900">
                    {language === 'bn' ? crop.bn : crop.en}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {formatNum(crop.count)} {language === 'bn' ? 'টি সমাধান' : 'solutions'}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHARE BANNER & SOCIAL ENGAGEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-emerald-700">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 bg-emerald-700/60 px-2.5 py-0.5 rounded-full inline-block">
              {language === 'bn' ? 'কৃষক ভাই ও কর্মকর্তাদের জন্য' : 'For Farmers, Officers & Dealers'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {language === 'bn' 
                ? 'এগ্রিকেম প্রো শেয়ার করে নিরাপদ ও বিষমুক্ত কৃষিতে অবদান রাখুন' 
                : 'Share AgriChem Pro & Promote Safe Chemical Stewardship'}
            </h3>
            <p className="text-xs text-emerald-100 max-w-xl">
              {language === 'bn'
                ? 'হোয়াটসঅ্যাপ, ফেসবুক ও টেলিগ্রামের মাধ্যমে আপনার পরিচিত কৃষক ভাই, উপসহকারী কৃষি কর্মকর্তা (SAAO) এবং বালাইনাশক ডিলারদের মাঝে ছড়িয়ে দিন।'
                : 'Share via WhatsApp, Facebook, or direct link with farmers, sub-assistant agriculture officers, and input dealers across Bangladesh.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onOpenShareModal}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-sm shadow-md transition cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-emerald-700" />
              <span>{language === 'bn' ? 'এখনই শেয়ার করুন' : 'Share Now'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('guidebook')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm border border-emerald-500/50 shadow-xs transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'bn' ? 'পকেট গাইড' : 'Pocket Guide'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
