import React, { useState } from 'react';
import { ChemicalProduct } from '../types';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  HeartHandshake,
  Trash2,
  Fish,
  Flower2,
  Droplet,
  FileDown,
  RotateCcw,
  Sparkles,
  CheckSquare,
  Square,
  ChevronDown,
  Activity,
  Wind,
  Droplets,
  Crosshair,
  Footprints,
  Ban,
  Recycle,
  ShowerHead,
  Clock,
  HardHat,
} from 'lucide-react';
import { exportSingleProductPDF } from '../utils/pdfExport';
import { useLanguage } from '../context/LanguageContext';
import { CollapsibleUserGuide } from './CollapsibleUserGuide';
import './SafetyView.css';
import './pn-tokens.css';

interface SafetyViewProps {
  products: ChemicalProduct[];
  onOpenSafetyModal: (product: ChemicalProduct) => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({ products, onOpenSafetyModal }) => {
  const { language, formatNum } = useLanguage();
  const bn = language === 'bn';
  const [selectedProduct, setSelectedProduct] = useState<ChemicalProduct>(products[0]);
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({});
  const [headOpen, setHeadOpen] = useState(false);

  const toggleCheck = (id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    setChecks({});
  };

  const checklistItems = [
    {
      id: 'c1',
      phase: bn ? 'স্প্রে করার পূর্বে' : 'Pre-Spray',
      icon: <Crosshair size={14} />,
      title: bn ? 'স্প্রেয়ার যন্ত্রপাতির সার্বিক নিরীক্ষণ' : 'Inspection of Spraying Equipment',
      desc: bn ? 'প্রথমে পরিষ্কার পানি দিয়ে ন্যাপস্যাক স্প্রেয়ার ট্যাংক, হোস পাইপ, ট্রিগার ল্যান্স ও গ্যাসকেটে কোনো লিকেজ আছে কি না পরীক্ষা করুন।' : 'Check knapsack sprayer tank, hoses, trigger lance, and gaskets for leaks with clean water.'
    },
    {
      id: 'c2',
      phase: bn ? 'স্প্রে করার পূর্বে' : 'Pre-Spray',
      icon: <Activity size={14} />,
      title: bn ? 'নোজল ক্যালিব্রেশন ও পরিষ্কার রাখা' : 'Calibrated Nozzle Check',
      desc: bn ? 'নোজল দিয়ে সুষম স্প্রে ফ্যান বা কোণ বের হচ্ছে কি না যাচাই করুন। জ্যাম হওয়া নোজল টুথব্রাশ দিয়ে পরিষ্কার করুন — কখনো মুখে ফুঁ দেবেন না!' : 'Verify uniform spray fan/cone pattern. Clean clogged nozzles with a soft toothbrush — NEVER blow through with mouth!'
    },
    {
      id: 'c3',
      phase: bn ? 'স্প্রে করার পূর্বে' : 'Pre-Spray',
      icon: <Wind size={14} />,
      title: bn ? 'আবহাওয়া ও বাতাসের গতি মূল্যায়ন' : 'Weather & Wind Assessment',
      desc: bn ? 'বাতাসের গতিবেগ ১০ কিমি/ঘণ্টার কম কি না নিশ্চিত করুন। তীব্র রোদ/দুপুরের গরমে (>৩২°সে) বা বৃষ্টির পূর্বাভাবে স্প্রে স্থগিত রাখুন।' : 'Confirm wind speed is under 10 km/h. Avoid spraying during midday tropical heat (>32°C) or impending rain.'
    },
    {
      id: 'c4',
      phase: bn ? 'স্প্রে করার পূর্বে' : 'Pre-Spray',
      icon: <HardHat size={14} />,
      title: bn ? 'সম্পূর্ণ ব্যক্তিগত সুরক্ষা সামগ্রী (PPE) পরিধান' : 'Complete PPE Donning',
      desc: bn ? 'নাইট্রিল বা রাবার গ্লাভস, বাষ্পরোধী রেসপিরেটর বা মাস্ক, প্রতিরক্ষামূলক গগলস এবং গামবুট বাধ্যতামূলকভাবে পরিধান করুন।' : 'Wear chemical-resistant nitrile gloves, vapor respirator or N95 mask, safety goggles, and rubber gumboots.'
    },
    {
      id: 'c5',
      phase: bn ? 'স্প্রে করার সময়' : 'During Spray',
      icon: <Wind size={14} />,
      title: bn ? 'বাতাসের অনুকূলে স্প্রে পরিচালনা' : 'Maintain Upwind Spray Path',
      desc: bn ? 'সবসময় বাতাসের অনুকূলে বা আড়াআড়ি হাঁটুন যাতে রাসায়নিক কুয়াশা স্প্রেকারীর শরীর ও শ্বাসযন্ত্রের বিপরীতে দূরে উড়ে যায়।' : 'Always walk backwards or crosswind so spray mist drifts AWAY from your body and breathing zone.'
    },
    {
      id: 'c6',
      phase: bn ? 'স্প্রে করার সময়' : 'During Spray',
      icon: <Ban size={14} />,
      title: bn ? 'খাবার, পানীয় ও ধূমপান সম্পূর্ণ নিষিদ্ধ' : 'Zero Food / Drink / Smoking Policy',
      desc: bn ? 'বালাইনাশক হ্যান্ডলিং ও স্প্রে চলাকালীন খাবার খাওয়া, পানি পান বা ধূমপান/তামাক সেবন সম্পূর্ণভাবে এড়িয়ে চলুন।' : 'Never eat, drink, chew tobacco, or smoke while handling or applying agricultural chemicals.'
    },
    {
      id: 'c7',
      phase: bn ? 'স্প্রে করার সময়' : 'During Spray',
      icon: <Fish size={14} />,
      title: bn ? 'জলাশয় ও মৌমাছি সুরক্ষা নিশ্চিতকরণ' : 'Protect Waterways & Bee Hives',
      desc: bn ? 'পুকুর, খাল বা জলাশয় এবং মৌমাছির বাক্স থেকে কমপক্ষে ১৫ মিটার বাফার দূরত্ব বজায় রাখুন।' : 'Maintain 15-meter buffer from open ponds or bee apiaries. Close hive entrances if spraying nearby.'
    },
    {
      id: 'c8',
      phase: bn ? 'স্প্রে পরবর্তী' : 'Post-Spray',
      icon: <Recycle size={14} />,
      title: bn ? 'খালি বোতল ৩ বার ধৌতকরণ ও নিষ্ক্রিয়করণ' : 'Triple Rinse Empty Containers',
      desc: bn ? 'খালি বোতল ৩ বার পানি দিয়ে ধুয়ে সেই পানি স্প্রে ট্যাংকে ঢালুন। গৃহস্থালির কাজে ব্যবহার রোধে বোতলের তলায় ফুটো করে ফেলুন।' : 'Rinse container 3 times into the spray tank. Puncture bottom to prevent household domestic reuse.'
    },
    {
      id: 'c9',
      phase: bn ? 'স্প্রে পরবর্তী' : 'Post-Spray',
      icon: <ShowerHead size={14} />,
      title: bn ? 'শারীরিক বিশোধন ও গোসল' : 'Personal Decontamination',
      desc: bn ? 'হাত, মুখমণ্ডল ও সারা শরীর প্রচুর ঠান্ডা পানি ও সাবান দিয়ে ধুয়ে গোসল করুন। ব্যবহৃত কাপড় পরিবারের কাপড় থেকে আলাদা ধোবেন।' : 'Wash hands, face, and body with cold water and soap immediately. Wash spray clothes separately from family laundry.'
    },
    {
      id: 'c10',
      phase: bn ? 'স্প্রে পরবর্তী' : 'Post-Spray',
      icon: <Clock size={14} />,
      title: bn ? 'জমিতে প্রবেশের ব্যবধান (REI) ও লাল নিশানা' : 'Field Re-Entry Interval (REI) & Red Signage',
      desc: bn ? 'জমির চারপাশে লাল ফিতা বা সতর্কীকরণ সাইনবোর্ড টানিয়ে রাখুন যাতে নির্দিষ্ট সময়ের পূর্বে কোনো মানুষ বা গবাদিপশু জমিতে না ঢোকে।' : 'Post red warning tape or caution signage around the field so that no person or livestock enters before the specified safe period.'
    }
  ];

  const checkedCount = Object.values(checks).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / checklistItems.length) * 100);

  // ---- bilingual editorial copy deck ------------------------------------
  const copy = bn
    ? {
        eyebrow: 'পেশাগত স্বাস্থ্য ও পরিবেশগত নিরাপত্তা নির্দেশিকা',
        h1a: 'আপনার শরীরই',
        h1b: 'সবচেয়ে গুরুত্বপূর্ণ যন্ত্র।',
        lede:
          'প্রতিটি স্প্রে বোতলে এমন একটি রাসায়নিক আছে যা পোকা মারে — কিন্তু ভুল করলে সেটা আপনাকেও মারে। চেকলিস্টটি ১০ দফায় সাজানো — প্রতিটি দফা এমন একটি বিন্দু যেখানে একজন কৃষকের চোখ থাকা দরকার, কারণ সেখানেই এক্সপোজার ঘটে।',
        ctaReset: 'চেকলিস্ট রিসেট',
        ctaPdf: 'পিডিএফ শিট ডাউনলোড',
        trust1: 'WHO শ্রেণিবিভাগ অনুসারে লাল ব্যান্ড মানে চরম বিপজ্জনক, সবুজ মানে তুলনামূলক নিরাপদ।',
        trust2: 'প্রতিটি পণ্যের নিরাপত্তা ডসিয়ার সরাসরি এখান থেকে পিডিএফে রপ্তানি করা যায়।',
        stickerKicker: 'সবচেয়ে ঝুঁকিপূর্ণ মুহূর্ত',
        sticker1: 'মিশ্রণ তৈরির সময় — সর্বোচ্চ এক্সপোজার ঝুঁকি।',
        sticker2: 'বাতাসের বিপরীতে হাঁটা — কুয়াশা সরাসরি শ্বাসযন্ত্রে।',
        sticker3: 'খালি বোতল ফেলা — পরিবারের কাছে দ্বিতীয় বিষ।',
        stickerFoot: 'এই তিন মুহূর্তে সর্বোচ্চ সতর্কতা প্রয়োজন।',
        stat1Value: '১০',
        stat1Label: 'দফা চেকলিস্ট',
        stat1Detail: 'প্রি-স্প্রে · স্প্রে · পোস্ট',
        stat2Value: '০৪',
        stat2Label: 'WHO রঙিন ব্যান্ড',
        stat2Detail: 'লাল · হলুদ · নীল · সবুজ',
        stat3Value: '০৩',
        stat3Label: 'জরুরি প্রতিক্রিয়া',
        stat3Detail: 'ত্বক · চোখ · অ্যান্টিডোট',
        stat4Value: '১৫মি',
        stat4Label: 'বাফার জোন',
        stat4Detail: 'জলাশয় ও মৌমাছি',
        checkKicker: 'ইন্টারেক্টিভ মাঠ চেকলিস্ট',
        checkTitle: 'প্রতিটি স্প্রের আগে এই ১০ দফা পূরণ করুন।',
        checkSub: 'প্রতিটি ট্যাপ আপনার মাঠকর্মীর সুরক্ষা প্রোটোকলে একটি নিশ্চয়তা হিসেবে লেখা হয়ে যায়।',
        progressLabel: 'অগ্রগতি',
        progressDone: 'সম্পূর্ণ',
        progressReady: 'প্রস্তুত',
        whoKicker: 'WHO বিষাক্ততা শ্রেণি',
        whoTitle: 'বোতলের নিচের রঙিন ব্যান্ড পড়তে শিখুন — সেটাই প্রথম সতর্কবার্তা।',
        whoSub: 'প্রতিটি পণ্যের বোতলে নিচের দিকে ত্রিকোণ রঙিন ব্যান্ড থাকে যা স্তন্যপায়ী প্রাণীর প্রতি তীব্র বিষাক্ততা নির্দেশ করে।',
        whoRedTitle: 'ক্লাস Ia & Ib — চরম বিপজ্জনক',
        whoRedChip: 'গাঢ লাল ব্যান্ড',
        whoRedDesc: 'মৌখিক LD50 < ৫০ মিগ্রা/কেজি। প্রতীক: খুলি ও হাড়ের চিহ্ন (POISON)। যেমন: অ্যালুমিনিয়াম ফসফাইড, কার্বোফিউরান। কেবল লাইসেন্সধারী ফিউমিগেটরের জন্য।',
        whoYellowTitle: 'ক্লাস II — মাঝারি বিপজ্জনক',
        whoYellowChip: 'উজ্জ্বল হলুদ ব্যান্ড',
        whoYellowDesc: 'মৌখিক LD50 ৫০-২০০০ মিগ্রা/কেজি। সতর্কবাণী: বিপদ / সাবধান (DANGER/WARNING)। যেমন: ক্লোরপাইরিফস, সাইপারমেথ্রিন, কারটাপ। পূর্ণ PPE আবশ্যক।',
        whoBlueTitle: 'ক্লাস III — সামান্য বিপজ্জনক',
        whoBlueChip: 'উজ্জ্বল নীল ব্যান্ড',
        whoBlueDesc: 'মৌখিক LD50 > ২০০০ মিগ্রা/কেজি। সতর্কবাণী: সতর্কতা (CAUTION)। যেমন: ম্যানকোজেব, হেক্সাকোনাজল, সালফার, ইমিডাক্লোপ্রিড। গ্লাভস ও মাস্ক প্রয়োজনীয়।',
        whoGreenTitle: 'ক্লাস U — ঝুঁকি সৃষ্টির সম্ভাবনা ক্ষীণ',
        whoGreenChip: 'উজ্জ্বল সবুজ ব্যান্ড',
        whoGreenDesc: 'মৌখিক LD50 > ৫০০০ মিগ্রা/কেজি। সংকেত: সাবধানতা। যেমন: জৈব বালাইনাশক, কিউলিউর ফেরোমোন ট্র্যাপ, ট্রাইকোডার্মা। আইপিএম-এর জন্য সবচেয়ে নিরাপদ।',
        emergKicker: 'জরুরি চিকিৎসা প্রতিক্রিয়া',
        emergTitle: 'বিষক্রিয়া হলে প্রথম ১৫ মিনিট সবচেয়ে গুরুত্বপূর্ণ।',
        emergSub: 'যেকোনো দুর্ঘটনা বা বিষক্রিয়ায় রোগীকে অবিলম্বে নিকটস্থ উপজেলা স্বাস্থ্য কমপ্লেক্সে নিয়ে যান। সাথে বালাইনাশকের বোতল বা মোড়ক অবশ্যই নেবেন!',
        emerg1Title: '১. ত্বকে বিষাক্ত রাসায়নিক লাগলে',
        emerg1Desc: 'তাত্ক্ষণিকভাবে দূষিত কাপড়, জুতা ও মোজা খুলে ফেলুন। অন্তত ১৫ মিনিট প্রচুর ঠান্ডা পরিষ্কার পানি ও সাবান দিয়ে ত্বক ধুয়ে ফেলুন। লোমকূপ যেন খুলে না যায় সেজন্য অতিরিক্ত ঘষাঘষি করবেন না।',
        emerg2Title: '২. চোখে রাসায়নিকের ছিটা পড়লে',
        emerg2Desc: 'চোখের পাতা দুটি আঙুল দিয়ে প্রশস্ত করে খুলে ধরুন এবং পরিষ্কার বিশুদ্ধ পানি বা স্যালাইন দিয়ে টানা ১৫ মিনিট চোখের কোণ থেকে ধুয়ে ফেলুন। চিকিৎসকের পরামর্শ ছাড়া কোনো ড্রপ দেবেন না।',
        emerg3Title: '৩. সুনির্দিষ্ট অ্যান্টিডোট নির্দেশিকা',
        emerg3Items: [
          { label: 'অর্গানোফসফেট ও কার্বামেট:', value: 'অ্যাট্রোপিন সালফেট ইনজেকশন (চিকিৎসক দ্বারা প্রয়োগযোগ্য)।' },
          { label: 'ইঁদুরনাশক (জিংক ফসফাইড/ব্রোডিফাকুম):', value: 'ভিটামিন কে-১ (Vitamin K1)।' },
          { label: 'সিন্থেটিক পাইরেথ্রয়েড:', value: 'মুখে জ্বালাপোড়ার জন্য ভিটামিন ই ক্রিম; লক্ষণভিত্তিক উপশম।' }
        ],
        dossierKicker: 'পণ্য-নির্দিষ্ট নিরাপত্তা শিট',
        dossierTitle: 'যেকোনো পণ্যের জন্য নিরাপত্তা চেকলিস্ট খুলুন।',
        dossierSub: 'নির্বাচন করুন — আপনি সেই পণ্যের নিরাপত্তা প্রোফাইল, PPE সামগ্রী ও অ্যান্টিডোট তথ্য দেখতে পাবেন।',
        dossierBtn: 'নিরাপত্তা চেকলিস্ট খুলুন',
        dossierPdf: 'পিডিএফ শিট',
        disclaimTitle: 'অফিসিয়াল স্বাস্থ্য ও বালাইনাশক বিষক্রিয়া নির্দেশিকা ডিসক্লেইমার',
        disclaimBody: 'এখানে উল্লিখিত বালাইনাশক ঝুঁকি শ্রেণীবিভাগ বিশ্ব স্বাস্থ্য সংস্থা (WHO) গাইডলাইন এবং প্রাথমিক চিকিৎসা ও অ্যান্টিডোট প্রোটোকলগুলো ডিএই (DAE) ও উদ্ভিদ রোগতত্ত্ব ম্যানুয়াল অনুসরণে প্রণীত। এই নির্দেশিকা শুধুমাত্র সাধারণ শিক্ষার উদ্দেশ্যে তৈরি। তীব্র বিষক্রিয়া বা বালাইনাশক এক্সপোজারের ক্ষেত্রে কোনো বিলম্ব না করে আক্রান্ত ব্যক্তিকে নিকটস্থ উপজেলা স্বাস্থ্য কমপ্লেক্স বা সরকারি মেডিকেল কলেজ হাসপাতালে নিয়ে যান এবং চিকিৎসকের সরাসরি পরামর্শ নিন।'
      }
    : {
        eyebrow: 'Field Occupational Health & Environmental Safety Directive',
        h1a: 'Your body is',
        h1b: "the field's most valuable tool.",
        lede:
          'Every spray bottle contains a chemical that kills pests — but applied wrong, the same chemical can poison you. This checklist is organized into ten decision points — each one is a moment where a farmer needs eyes on, because that is exactly where exposure happens.',
        ctaReset: 'Reset checklist',
        ctaPdf: 'Download PDF sheet',
        trust1: 'WHO classification: the red band means extreme hazard, the green band means relatively safe.',
        trust2: 'Every product safety dossier is exportable as a one-page PDF directly from here.',
        stickerKicker: 'Highest-risk moments',
        sticker1: 'While mixing — peak exposure window.',
        sticker2: 'Walking downwind — mist straight into the breathing zone.',
        sticker3: 'Discarded empty bottles — a second poison for the household.',
        stickerFoot: 'Maximum caution needed at these three moments.',
        stat1Value: '10',
        stat1Label: 'point checklist',
        stat1Detail: 'pre · during · post spray',
        stat2Value: '04',
        stat2Label: 'WHO color bands',
        stat2Detail: 'red · yellow · blue · green',
        stat3Value: '03',
        stat3Label: 'emergency responses',
        stat3Detail: 'skin · eye · antidote',
        stat4Value: '15m',
        stat4Label: 'buffer zone',
        stat4Detail: 'water & beehives',
        checkKicker: 'Interactive field checklist',
        checkTitle: 'Run through these ten points before every spray.',
        checkSub: 'Each tap is a recorded guarantee inside the field-worker safety protocol.',
        progressLabel: 'Progress',
        progressDone: 'Complete',
        progressReady: 'Ready',
        whoKicker: 'WHO toxicity classes',
        whoTitle: 'Read the colored band at the bottom of every bottle — that is the first warning.',
        whoSub: 'Pesticide containers carry a lower-triangle color band indicating acute mammalian toxicity.',
        whoRedTitle: 'Class Ia & Ib — Extremely Hazardous',
        whoRedChip: 'BRIGHT RED BAND',
        whoRedDesc: 'Oral LD50 < 50 mg/kg. Symbol: skull & crossbones (POISON). Examples: Aluminium Phosphide, Carbofuran. Restricted strictly to licensed fumigators.',
        whoYellowTitle: 'Class II — Moderately Hazardous',
        whoYellowChip: 'BRIGHT YELLOW BAND',
        whoYellowDesc: 'Oral LD50 50-2000 mg/kg. Signal word: DANGER / WARNING. Examples: Chlorpyrifos, Cypermethrin, Cartap. Full PPE mandatory.',
        whoBlueTitle: 'Class III — Slightly Hazardous',
        whoBlueChip: 'BRIGHT BLUE BAND',
        whoBlueDesc: 'Oral LD50 > 2000 mg/kg. Signal word: CAUTION. Examples: Mancozeb, Hexaconazole, Sulphur, Imidacloprid. Standard gloves and mask required.',
        whoGreenTitle: 'Class U — Unlikely to Present Hazard',
        whoGreenChip: 'BRIGHT GREEN BAND',
        whoGreenDesc: 'Oral LD50 > 5000 mg/kg. Signal word: CAUTION. Examples: Bio-pesticides, Cuelure pheromones, Trichoderma. Safest profile for IPM.',
        emergKicker: 'Emergency medical response',
        emergTitle: 'In a poisoning event, the first 15 minutes are decisive.',
        emergSub: 'Transport the patient immediately to the nearest Upazila Health Complex or hospital. Always carry the chemical container or label with you!',
        emerg1Title: '1. Skin & Dermal Contamination',
        emerg1Desc: 'Immediately strip off all contaminated clothing, shoes, and socks. Drench skin with copious cold running water for at least 15 minutes. Wash thoroughly with soap. Do not scrub harshly to avoid opening skin pores.',
        emerg2Title: '2. Eye Splash Exposure',
        emerg2Desc: 'Hold eyelids open wide and flush continuously under gentle clean water or saline for 15 minutes. Do not use chemical antidotes or eye drops without doctor instruction. Seek immediate ophthalmologic examination.',
        emerg3Title: '3. Specific Antidotes Reference',
        emerg3Items: [
          { label: 'Organophosphates & Carbamates:', value: 'Atropine Sulfate injection (administered by physician).' },
          { label: 'Anticoagulant Rodenticides:', value: 'Vitamin K1.' },
          { label: 'Synthetic Pyrethroids:', value: 'Vitamin E cream for facial paraesthesia; symptomatic relief.' }
        ],
        dossierKicker: 'Product-specific safety sheet',
        dossierTitle: 'Open the safety checklist for any registered product.',
        dossierSub: 'Pick a product — you will see its hazard profile, mandatory PPE, and antidote reference.',
        dossierBtn: 'Open safety checklist',
        dossierPdf: 'PDF sheet',
        disclaimTitle: 'Official Toxicology Reference & Safety Disclaimer',
        disclaimBody: 'The chemical hazard classifications shown are matched to official World Health Organization (WHO) toxicity indices, and the first-aid and antidote recommendations are referenced from published Department of Agricultural Extension (DAE) guidelines. This sheet is for reference purposes only. In the event of severe chemical poisoning or exposure, do not delay — immediately transport the patient to the nearest Upazila Health Complex or government hospital and consult a medical practitioner.'
      };

  return (
    <div className="acg-sf pn-tokens">
      {/* -------------------------------------------- header (editorial hero) */}
      <section className="pn-shell">
        <div className={`pn-head ${headOpen ? 'pn-head--open' : ''}`}>
          <div>
            <p className="pn-eyebrow">
              <span className="pn-dot" /> {copy.eyebrow}
            </p>
            <h1 className="pn-h1">
              {copy.h1a}
              <br />
              <em>{copy.h1b}</em>
            </h1>
            <div className="pn-head__more">
              <p className="pn-lede">{copy.lede}</p>
              <ul className="pn-trust">
                <li><ShieldCheck size={14} /> {copy.trust1}</li>
                <li><FileDown size={14} /> {copy.trust2}</li>
              </ul>
            </div>
            <button
              className="pn-head__toggle"
              onClick={() => setHeadOpen((o) => !o)}
              type="button"
            >
              <ChevronDown size={14} />
              {bn ? 'বিস্তারিত' : 'Details'}
            </button>
          </div>

          <aside className="pn-sticker">
            <p className="pn-sticker__kicker">{copy.stickerKicker}</p>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">01</span>
              <Droplet size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker1}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">02</span>
              <Wind size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker2}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">03</span>
              <Trash2 size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker3}</span>
            </div>
            <p className="pn-sticker__foot">
              <ShieldAlert size={14} /> {copy.stickerFoot}
            </p>
          </aside>
        </div>
      </section>

      {/* ----------------------------------------------------------- stats band */}
      <section className="pn-shell">
        <div className="pn-stats">
          <div className="pn-stat">
            <div className="pn-stat__value">{copy.stat1Value}</div>
            <div className="pn-stat__label">{copy.stat1Label}</div>
            <div className="pn-stat__detail">{copy.stat1Detail}</div>
          </div>
          <div className="pn-stat">
            <div className="pn-stat__value">{copy.stat2Value}</div>
            <div className="pn-stat__label">{copy.stat2Label}</div>
            <div className="pn-stat__detail">{copy.stat2Detail}</div>
          </div>
          <div className="pn-stat">
            <div className="pn-stat__value">{copy.stat3Value}</div>
            <div className="pn-stat__label">{copy.stat3Label}</div>
            <div className="pn-stat__detail">{copy.stat3Detail}</div>
          </div>
          <div className="pn-stat">
            <div className="pn-stat__value">{copy.stat4Value}</div>
            <div className="pn-stat__label">{copy.stat4Label}</div>
            <div className="pn-stat__detail">{copy.stat4Detail}</div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- interactive checklist */}
      <section className="pn-shell acg-sf-panels">
        {/* Collapsible User Guide */}
        <div className="acg-guide-wrap">
          <CollapsibleUserGuide
            pageKey="safety"
            titleEn="Occupational Health & Safety Guide"
            titleBn="পেশাগত স্বাস্থ্য ও নিরাপত্তা গাইড"
            subtitleEn="Understand pesticide toxicity colors, mixing safety, and knapsack handling."
            subtitleBn="বালাইনাশকের বিষাক্ততার কালার ব্যান্ড, মিশ্রণ সুরক্ষা ও স্প্রে করার নিয়ম।"
            stepsEn={[
              'Run through the Interactive 10-Point Checklist to verify nozzle and wind conditions before opening chemical bottles.',
              'Inspect the WHO Hazard Class Bands (Red = extreme hazard, green = relatively safe) to prepare PPE equipment.',
              'Wear mandatory PPE layers (eye goggles, rubber gloves, mask, and tall boots) while opening and mixing chemical powders.',
              'Never stand downwind while spraying — always move so the mist blows away from your face and skin.',
              'Triple-rinse empty plastic bottles, puncture them, and dispose of them in dedicated chemical recycle pits.'
            ]}
            stepsBn={[
              'রাসায়নিক বোতল খোলার পূর্বে নোজল ও বাতাসের দিক পরীক্ষা করতে ১০-দফার ইন্টারেক্টিভ নিরাপত্তা চেকলিস্টটি পূরণ করুন।',
              'উপযুক্ত পিপিই (PPE) বা সুরক্ষামূলক গিয়ার প্রস্তুত করতে ডব্লিউএইচও (WHO) বিপদ শ্রেণি ব্যান্ড (লাল মানে তীব্র বিপজ্জনক, সবুজ মানে তুলনামূলক নিরাপদ) দেখে নিন।',
              'ওষুধ তৈরি ও মেশানোর সময় অবশ্যই মাস্ক, রাবারের গ্লাভস, গগলস ও বুট জুতা পরিধান করুন।',
              'কখনো বাতাসের বিপরীতে দাঁড়িয়ে স্প্রে করবেন না — এমন অবস্থানে থাকুন যেন বাতাসের কারণে স্প্রে আপনার ত্বকে বা চোখে উড়ে না আসে।',
              'খালি বোতলগুলো ট্রিপল রিন্স বা ৩ বার ধুয়ে ছিদ্র করুন এবং নির্দিষ্ট ডাস্টবিন বা মাটিতে গর্ত করে পুঁতে ফেলুন।'
            ]}
            proTipsEn={[
              'If chemical makes skin contact, immediately wash with running soap water for 15 minutes. Seek medical assistance if irritation persists.',
              'Never use domestic kitchen utensils to mix chemical formulations — reserve dedicated containers for agricultural usage.'
            ]}
            proTipsBn={[
              'ত্বকে ওষুধ লাগলে সাথে সাথে সাবান পানি দিয়ে অন্তত ১৫ মিনিট ভালো করে ধুয়ে নিন। সমস্যা গুরুতর হলে ডাক্তারের শরণাপন্ন হোন।',
              'রান্নাঘরের হাঁড়ি-পাতিল বা চামচ দিয়ে বালাইনাশক গুলবেন না — বালাইনাশক গোলার জন্য সর্বদা আলাদা পাত্র ও কাঠি নির্দিষ্ট রাখুন।'
            ]}
          />
        </div>

        {/* 10-Point Interactive Checklist */}
        <div className="pn-card pn-card--red">
          <div className="pn-card__kicker">{copy.checkKicker}</div>
          <h2 className="pn-card__title">{copy.checkTitle}</h2>
          <p className="pn-card__sub">{copy.checkSub}</p>

          {/* progress bar */}
          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span className="pn-card__kicker" style={{ color: 'var(--muted)' }}>
                {copy.progressLabel}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)' }}>
                {formatNum(checkedCount)} / {formatNum(checklistItems.length)} · {formatNum(progressPercent)}%{' '}
                {progressPercent === 100 ? copy.progressDone : copy.progressReady}
              </span>
            </div>
            <div className="acg-sf-progress">
              <div
                className={`acg-sf-progress__bar ${progressPercent === 100 ? 'acg-sf-progress__bar--done' : ''}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* checklist grid */}
          <div className="acg-sf-checks">
            {checklistItems.map((item) => {
              const isDone = !!checks[item.id];
              return (
                <div
                  key={item.id}
                  className={`acg-sf-check ${isDone ? 'acg-sf-check--done' : ''}`}
                  onClick={() => toggleCheck(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCheck(item.id);
                    }
                  }}
                >
                  <span className="acg-sf-check__box">
                    {isDone && <CheckSquare size={14} />}
                  </span>
                  <div style={{ flex: 1 }}>
                    <span className="acg-sf-check__phase">
                      {item.icon} {item.phase}
                    </span>
                    <div className="acg-sf-check__title">{item.title}</div>
                    <p className="acg-sf-check__desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* reset row */}
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            {checkedCount > 0 && (
              <button className="pn-linkbtn" onClick={resetChecklist} type="button">
                <RotateCcw size={13} /> {copy.ctaReset}
              </button>
            )}
          </div>
        </div>

        {/* WHO Toxicity Bands */}
        <div className="pn-card">
          <div className="pn-card__kicker">{copy.whoKicker}</div>
          <h2 className="pn-card__title">{copy.whoTitle}</h2>
          <p className="pn-card__sub">{copy.whoSub}</p>

          <div className="acg-sf-who">
            <div className="acg-sf-who-card" style={{ borderTop: '3px solid #dc2626' }}>
              <div className="acg-sf-who-card__band" style={{ background: '#dc2626' }} />
              <div className="acg-sf-who-card__title">{copy.whoRedTitle}</div>
              <span className="acg-sf-who-card__chip" style={{ background: '#dc2626' }}>
                {copy.whoRedChip}
              </span>
              <p className="acg-sf-who-card__p">{copy.whoRedDesc}</p>
            </div>
            <div className="acg-sf-who-card" style={{ borderTop: '3px solid #facc15' }}>
              <div className="acg-sf-who-card__band" style={{ background: '#facc15' }} />
              <div className="acg-sf-who-card__title">{copy.whoYellowTitle}</div>
              <span className="acg-sf-who-card__chip" style={{ background: '#facc15', color: '#422006' }}>
                {copy.whoYellowChip}
              </span>
              <p className="acg-sf-who-card__p">{copy.whoYellowDesc}</p>
            </div>
            <div className="acg-sf-who-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="acg-sf-who-card__band" style={{ background: '#3b82f6' }} />
              <div className="acg-sf-who-card__title">{copy.whoBlueTitle}</div>
              <span className="acg-sf-who-card__chip" style={{ background: '#3b82f6' }}>
                {copy.whoBlueChip}
              </span>
              <p className="acg-sf-who-card__p">{copy.whoBlueDesc}</p>
            </div>
            <div className="acg-sf-who-card" style={{ borderTop: '3px solid #10b981' }}>
              <div className="acg-sf-who-card__band" style={{ background: '#10b981' }} />
              <div className="acg-sf-who-card__title">{copy.whoGreenTitle}</div>
              <span className="acg-sf-who-card__chip" style={{ background: '#10b981' }}>
                {copy.whoGreenChip}
              </span>
              <p className="acg-sf-who-card__p">{copy.whoGreenDesc}</p>
            </div>
          </div>
        </div>

        {/* Emergency First Aid — deep green panel */}
        <div className="pn-panel">
          <div className="pn-panel__title">
            <HeartHandshake size={20} />
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--golden)', fontWeight: 500 }}>
                {copy.emergKicker}
              </div>
              <div>{copy.emergTitle}</div>
            </div>
          </div>
          <p style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)' }}>
            {copy.emergSub}
          </p>
          <div className="acg-sf-emerg">
            <div className="acg-sf-emerg-card">
              <h4>{copy.emerg1Title}</h4>
              <p>{copy.emerg1Desc}</p>
            </div>
            <div className="acg-sf-emerg-card">
              <h4>{copy.emerg2Title}</h4>
              <p>{copy.emerg2Desc}</p>
            </div>
            <div className="acg-sf-emerg-card">
              <h4>{copy.emerg3Title}</h4>
              <ul>
                {copy.emerg3Items.map((it, i) => (
                  <li key={i}>
                    <strong>{it.label}</strong> {it.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product-specific safety dossier picker */}
        <div className="acg-sf-dossier">
          <div className="pn-card__kicker">{copy.dossierKicker}</div>
          <h2 className="pn-card__title">{copy.dossierTitle}</h2>
          <p className="pn-card__sub">{copy.dossierSub}</p>

          <div className="acg-sf-dossier__row">
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const found = products.find((p) => p.id === e.target.value);
                if (found) setSelectedProduct(found);
              }}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.tradeName} ({p.commonName})
                </option>
              ))}
            </select>

            <button
              className="pn-btn pn-btn--gold"
              onClick={() => onOpenSafetyModal(selectedProduct)}
              type="button"
            >
              <ShieldAlert size={14} /> {copy.dossierBtn}
            </button>

            <button
              className="pn-btn pn-btn--outline"
              onClick={() => exportSingleProductPDF(selectedProduct)}
              type="button"
            >
              <FileDown size={14} /> {copy.dossierPdf}
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="acg-sf-disclaim">
          <ShieldAlert size={18} />
          <div>
            <strong>{copy.disclaimTitle}</strong>
            <p>{copy.disclaimBody}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
