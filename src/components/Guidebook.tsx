import React, { useState } from 'react';
import { ChemicalProduct } from '../types';
import {
  BookOpen,
  FileDown,
  Layers,
  Compass,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Droplet,
  Sprout,
  Clock,
  Play,
  RefreshCw,
  Check,
  ChevronDown,
  Sparkles,
  Beaker,
} from 'lucide-react';
import { exportCropGuidePDF } from '../utils/pdfExport';
import { MOA_DATABASE } from '../data/moaData';
import { useLanguage } from '../context/LanguageContext';
import { CollapsibleUserGuide } from './CollapsibleUserGuide';
import './Guidebook.css';
import './pn-tokens.css';

interface GuidebookProps {
  products: ChemicalProduct[];
}

export const Guidebook: React.FC<GuidebookProps> = ({ products }) => {
  const { language, transCrop, transPest, transRisk, formatNum } = useLanguage();
  const bn = language === 'bn';
  const [activeChapter, setActiveChapter] = useState<'calibration' | 'resistance' | 'wales' | 'crops' | 'phi'>('crops');
  const [headOpen, setHeadOpen] = useState(false);

  const [walesSelections, setWalesSelections] = useState({
    wp: true,
    sc: true,
    ec: true,
    st: true
  });
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    let current = 1;
    const interval = setInterval(() => {
      current += 1;

      if (current === 2 && !walesSelections.wp) current = 3;
      if (current === 4 && !walesSelections.sc) current = 5;
      if (current === 5 && !walesSelections.ec) current = 6;
      if (current === 6 && !walesSelections.st) current = 7;

      if (current > 7) {
        clearInterval(interval);
        setIsSimulating(false);
      } else {
        setSimStep(current);
      }
    }, 2000);
  };

  const resetSimulation = () => {
    setSimStep(0);
    setIsSimulating(false);
  };

  const cropsList = ['Rice', 'Potato', 'Mango', 'Tea', 'Brinjal', 'Tomato', 'Jute', 'Stored grain in Rice'];

  // ----------------------------------------------------- bilingual copy --
  const copy = bn
    ? {
        eyebrow: 'মাঠপর্যায়ের কৃষিবিদ ও সম্প্রসারণ কর্মকর্তা হ্যান্ডবুক',
        h1a: 'স্প্রে বুম থেকে',
        h1b: 'ফসল তোলার ঝুড়ি —',
        h1c: 'সব এক নির্দেশিকায়।',
        lede:
          'এই হ্যান্ডবুক ফিল্ড অফিসারদের জন্য সাজানো — ক্যালিব্রেশন গণিত, প্রতিরোধ ভাঙার ঘূর্ণন বিজ্ঞান, ট্যাংক মিক্সিং নিয়মাবলী (W.A.L.E.S.), এবং অফলাইনে ব্যবহারের জন্য ফসলভিত্তিক পিডিএফ গাইড। প্রতিটি অধ্যায় এমন একটি সিদ্ধান্ত যা কৃষকের হাতে পৌঁছানোর আগে ফিল্ড অফিসারকে চিন্তা করতে হবে।',
        trust1: 'সকল প্রোটোকল BARI · BRRI · DAE এবং IRAC · FRAC কমিটির অনুমোদিত নির্দেশিকা অনুসরণে প্রণীত।',
        trust2: 'ফসলভিত্তিক প্রতিটি গাইড অফলাইন ব্যবহারের জন্য পিডিএফে রপ্তানি করা যায়।',
        stickerKicker: '৫টি অধ্যায়',
        sticker1Foot: 'ফসলভিত্তিক সময়সূচী',
        sticker2Foot: 'স্প্রেয়ার ক্যালিব্রেশন',
        sticker3Foot: 'প্রতিরোধ বিজ্ঞান',
        sticker4Foot: 'W.A.L.E.S. মিক্সিং',
        sticker5Foot: 'PHI ও খাদ্য নিরাপত্তা',
        stickerFoot: 'প্রতিটি অধ্যায় একটি সিদ্ধান্তের চেকপয়েন্ট।',
        stat1Value: `${formatNum(cropsList.length)}`,
        stat1Label: 'ফসলভিত্তিক গাইড',
        stat1Detail: 'পিডিএফ রপ্তানিযোগ্য',
        stat2Value: '০৩',
        stat2Label: 'ধাপ ক্যালিব্রেশন',
        stat2Detail: 'হাঁটা · নিঃসরণ · হেক্টর',
        stat3Value: '০৫',
        stat3Label: 'W.A.L.E.S. ধাপ',
        stat3Detail: 'ট্যাংক মিক্সিং ক্রম',
        stat4Value: 'PHI',
        stat4Label: 'খাদ্য সুরক্ষা',
        stat4Detail: 'ভোক্তা · রপতানি',
        chapterCrops: 'ফসলভিত্তিক সময়সূচী',
        chapterCalibration: 'স্প্রেয়ার ক্যালিব্রেশন',
        chapterResistance: 'প্রতিরোধ ও MoA',
        chapterWales: 'W.A.L.E.S. মিক্সিং',
        chapterPhi: 'PHI ও খাদ্য নিরাপত্তা',
        cropsKicker: 'অধ্যায় ১ · ফসল সময়সূচী',
        cropsTitle: 'প্রতিটি ফসলের জন্য অনুমোদিত রাসায়নিকের সম্পূর্ণ তালিকা, মাত্রা সহ পিডিএফে।',
        cropsSub: 'মাঠপর্যায়ে ইন্টারনেট ছাড়াই ব্যবহারের জন্য প্রতিটি ফসলের সম্পূর্ণ রাসায়নিক বিবরণ ও মাত্রা সম্বলিত পিডিএফ ডাউনলোড করুন।',
        cropsLabelPests: 'প্রধান নিয়ন্ত্রিত বালাই ও রোগবালাই',
        cropsInsect: 'কীটনাশক',
        cropsFungi: 'ছত্রাকনাশক',
        cropsOther: 'অন্যান্য/আগাছানাশক',
        cropsPdfBtn: (c: string) => `${c} গাইড ডাউনলোড (PDF)`,
        calKicker: 'অধ্যায় ২ · ক্যালিব্রেশন ম্যানুয়াল',
        calTitle: 'ন্যাপস্যাক স্প্রেয়ারের ৩-ধাপে ক্যালিব্রেশন পদ্ধতি।',
        calSub: 'স্প্রেয়ার ক্যালিব্রেট না করে কখনোই জমিতে বালাইনাশক প্রয়োগ করবেন না। ক্যালিব্রেশন ভুল হলে কম মাত্রায় প্রয়োগ হতে পারে (যা পোকার প্রতিরোধ ক্ষমতা বাড়ায়) অথবা অতিরিক্ত মাত্রায় প্রয়োগ হয়ে ফসল পুড়ে যেতে পারে ও ক্ষতিকর অবশিষ্টাংশ থেকে যায়।',
        calStep1Title: '২৫ মিটার হাঁটার গতি নির্ধারণ করুন',
        calStep1Desc: 'জমিতে ২৫ মিটার চিহ্নিত করুন। স্প্রে ট্যাংকে অর্ধেক পরিষ্কার পানি নিয়ে আপনার স্বাভাবিক হাঁটার গতিতে হাঁটুন এবং সময় স্টপওয়াচে রেকর্ড করুন (যেমন: ২০ সেকেন্ড)।',
        calStep2Title: 'নজলের পানি নিঃসরণ সংগ্রহ ও পরিমাপ',
        calStep2Desc: 'স্প্রেয়ার পাম্প করে স্বাভাবিক চাপে আনুন। ধাপ ১ এর নির্ধারিত সময়ে (২০ সেকেন্ড) একটি মাপক জগে নজলের পানি সংগ্রহ করে মিলিলিটারে মাপুন (যেমন: ৪০০ মিলি)।',
        calStep3Title: 'প্রতি হেক্টরে পানির পরিমাণ হিসাব করুন',
        calStep3Desc: 'সূত্র: লিটার/হেক্টর = (নিঃসরণ মিলি × ৪০০) / (স্প্রে প্রস্থ মিটার × ১০০০)। ০.৫ মিটার প্রস্থ হলে ৪০০ মিলি নিঃসরনের জন্য প্রয়োজন হবে ৩২০ লিটার/হেক্টর।',
        calNozzleTitle: 'ব্যবহারের লক্ষ্য অনুযায়ী সঠিক নজল নির্বাচন',
        calNozzleHollowTitle: 'ফাঁপা কোণ নজল (Hollow Cone):',
        calNozzleHollowDesc: 'স্পর্শীয় কীটনাশক ও ছত্রাকনাশকের জন্য উপযুক্ত যা সূক্ষ্ম বিন্দুর মাধ্যমে পাতার সর্বত্র প্রবেশ করে।',
        calNozzleFlatTitle: 'ফ্ল্যাট ফ্যান নজল (Flat Fan):',
        calNozzleFlatDesc: 'মাটিতে প্রয়োগকারী প্রাক-অঙ্কুরোদগম আগাছানাশকের জন্য সমতল ও সুষম স্প্রে নিশ্চিত করে।',
        calNozzleAirTitle: 'লো-ড্রিফ্ট / এয়ার ইনডাকশন নজল:',
        calNozzleAirDesc: 'বাতাসের বেগ ৮-১০ কিমি/ঘণ্টা থাকলে বাতাসে উড়ে যাওয়া রোধ করে পাশের জলাশয় বাঁচাতে ব্যবহৃত হয়।',
        resKicker: 'অধ্যায় ৩ · প্রতিরোধের মূল কারণ',
        resTitle: 'IRAC, FRAC ও HRAC প্রতিরোধ প্রতিরোধী ব্যবস্থাপনা।',
        resSub: 'পোকা ও ছত্রাকের মাঝে প্রাকৃতিকভাবে কিছু প্রতিরোধসম্পন্ন জিন থাকে। একই গ্রুপের রাসায়নিক বারংবার প্রয়োগ করলে সংবেদনশীলগুলো মারা যায় কিন্তু প্রতিরোধী রূপান্তরগুলো দ্রুত বংশবৃদ্ধি করে মহামারি আকার ধারণ করে।',
        res1Title: 'টার্গেট-সাইট বনাম মেটাবলিক প্রতিরোধ',
        res1Target: 'টার্গেট-সাইট প্রতিরোধ:',
        res1TargetDesc: 'এনজাইম বা স্নায়ু রিসেপ্টরে জিনগত পরিবর্তনের ফলে রাসায়নিক উপাদান আর সেখানে যুক্ত হতে পারে না (যেমন: সিন্থেটিক পাইরেথ্রয়েড প্রতিরোধে kdr জিন মিউটেশন)।',
        res1Metab: 'মেটাবলিক প্রতিরোধ:',
        res1MetabDesc: 'পোকার দেহে অতিরিক্ত বিষনাশক এনজাইম (সাইটোক্রোম P450) তৈরি হয় যা বিষ কাজ করার আগেই নিষ্ক্রিয় করে ফেলে।',
        res2Title: 'মাল্টি-সাইট প্রতিক্ষামূলক ছত্রাকনাশকের গুরুত্ব',
        res2Desc: 'ম্যানকোজেব (FRAC M03), কপার হাইড্রোক্সাইড (FRAC M01) এবং সালফার (FRAC M02) ছত্রাকের একাধিক জৈব বিপাকীয় পথ একসাথে আক্রমণ করে।',
        res2Desc2: 'যেহেতু ছত্রাক একসাথে ৩০টি মিউটেশন ঘটাতে পারে না, তাই বিগত ৬০ বছরে মাল্টি-সাইট ছত্রাকনাশকের বিরুদ্ধে কোনো প্রতিরোধ গড়ে ওঠেনি। সবসময় একক-সাইটের সাথে মাল্টি-সাইট মিশিয়ে বা পর্যায়ক্রমে স্প্রে করুন!',
        resTableTitle: 'প্রধান নিবন্ধিত ক্রিয়া কৌশল (MoA) কোড রেফারেন্স',
        walesKicker: 'অধ্যায় ৪ · ট্যাংক মিক্স প্রোটোকল',
        walesTitle: 'W.A.L.E.S. বৈশ্বিক ট্যাংক মিক্সিং নিয়ম।',
        walesSub: 'ভুল ক্রমে রাসায়নিক মেশালে দ্রবণ জমাট বাঁধে, নজল আটকে যায়, তলানি পড়ে এবং রাসায়নিক কার্যকারিতা নষ্ট হয়। সবসময় W.A.L.E.S. ক্রম মেনে চলুন!',
        walesSimTitle: 'ইন্টারেক্টিভ W.A.L.E.S. ট্যাংক মিক্সিং সিমুলেটর',
        walesSimSub: 'মাঠপর্যায়ে ওষুধের বিক্রিয়া ও নজল ব্লকেজ এড়াতে সাহায্য করে।',
        walesSimStart: 'সিমুলেশন দেখুন',
        walesSimReset: 'পুনরায় সেট করুন',
        walesStepLabel: 'সিমুলেশন ধাপ',
        walesJarTitle: '১৫ মিনিটের কাচের জার সামঞ্জস্য পরীক্ষা',
        walesJarDesc: 'বড় ট্যাংকে মেশানোর আগে ৫০০ মিলি পানিতে কাচের জারে আনুপাতিক হারে রাসায়নিক মিশিয়ে ১৫ মিনিট রেখে দিন। যদি তাপ উৎপন্ন হয়, দলা বাঁধে বা তেলের স্তর আলাদা হয় তবে সেগুলো কখনোই একসাথে মেশানো যাবে না।',
        phiKicker: 'অধ্যায় ৫ · খাদ্য নিরাপত্তা ও বিষাক্ত অবশিষ্টাংশ কমপ্লায়েন্স',
        phiTitle: 'ফসল তোলার পূর্ববর্তী বিরতিকাল (PHI) ও সর্বোচ্চ অবশিষ্টাংশ সীমা (MRL)।',
        phiSub: 'ফসল তোলার পূর্ববর্তী বিরতিকাল (PHI) হলো সর্বশেষ বালাইনাশক স্প্রে করা এবং ফসল তোলার মধ্যবর্তী আইনগতভাবে বাধ্যতামূলক ন্যূনতম দিনের সংখ্যা।',
        phi1Title: 'ধারাবাহিক ফসল (বেগুন, টমেটো, শিম)',
        phi1Desc: 'যেসব সবজি প্রতি ৩-৪ দিন পরপর তোলা হয় সেগুলোর জন্য অতি স্বল্প PHI যুক্ত উপাদান আবশ্যক। দীর্ঘস্থায়ী ক্লোরপাইরিফস (২১ দিন) বা ম্যানকোজেব (৭ দিন) স্প্রে করলে ভোক্তাদের জন্য মারাত্মক স্বাস্থ্যঝুঁকি ও রপ্তানি নিষেধাজ্ঞা তৈরি হয়।',
        phi1Rec: 'ধারাবাহিক ফসল তোলার জন্য প্রস্তাবিত: এমামেকটিন বেনজয়েট (৩ দিন PHI), স্পিনোস্যাড (৩ দিন PHI), কিউলিউর ফেরোমোন ফাঁদ (০ দিন PHI)।',
        phi2Title: 'দীর্ঘ মেয়াদী মাঠ ফসল (বোরো ধান, চা, আলু)',
        phi2Desc: 'বৃদ্ধির প্রাথমিক পর্যায়ে বা কুশি গজানোর সময় প্রয়োগকৃত উপাদান (যেমন: কারটাপ, কার্বোফিউরান) ফসল পাকার অনেক আগেই প্রাকৃতিকভাবে ভেঙে যায়।',
        phi2Rec: 'ধানের ব্লাস্ট বা আলুর লেট ব্লাইটের জন্য দেরিতে স্প্রে করার ক্ষেত্রে ফসল তোলার অন্তত ১৪ দিন আগে স্প্রে শেষ করতে হবে।',
        disclaimTitle: 'অফিসিয়াল হ্যান্ডবুক তথ্যসূত্র ও বৈজ্ঞানিক ডিসক্লেইমার',
        disclaimBody: 'এই হ্যান্ডবুক ও বৈজ্ঞানিক নির্দেশিকাগুলো বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI), বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI), কৃষি সম্প্রসারণ অধিদপ্তর (DAE) এবং আন্তর্জাতিক IRAC / FRAC প্রতিরোধ কমিটির বালাইনাশক নীতি অনুসরণ করে সংকলিত হয়েছে। এটি শুধুমাত্র মাঠ কর্মকর্তা ও শিক্ষার্থীদের সাধারণ প্রশিক্ষণের জন্য তৈরি। জমিতে যেকোনো রাসায়নিক বালাইনাশক ছিটানোর পূর্বে সর্বদা আপনার স্থানীয় উপ-সহকারী কৃষি কর্মকর্তা বা ডিএই কর্মকর্তাদের পরামর্শ নিন।'
      }
    : {
        eyebrow: 'Field Agronomist Handbook & Reference Manual',
        h1a: 'From spray boom',
        h1b: 'to harvest basket —',
        h1c: 'one field-ready manual.',
        lede:
          'This handbook is organized for field officers — calibration mathematics, anti-resistance rotation science, tank-mix sequences (W.A.L.E.S.), and crop-wise PDF guides for offline use. Each chapter is a decision the field officer has to think through before it reaches the farmer.',
        trust1: 'Every protocol compiled from BARI · BRRI · DAE and IRAC · FRAC committee-approved guidelines.',
        trust2: 'Each crop guide is exportable as a print-ready PDF for offline extension visits.',
        stickerKicker: 'Five chapters',
        sticker1Foot: 'crop schedules',
        sticker2Foot: 'sprayer calibration',
        sticker3Foot: 'resistance science',
        sticker4Foot: 'W.A.L.E.S. mixing',
        sticker5Foot: 'PHI & food safety',
        stickerFoot: 'Each chapter is a decision checkpoint.',
        stat1Value: `${formatNum(cropsList.length)}`,
        stat1Label: 'crop guides',
        stat1Detail: 'PDF exportable',
        stat2Value: '03',
        stat2Label: 'calibration steps',
        stat2Detail: 'walk · discharge · per ha',
        stat3Value: '05',
        stat3Label: 'W.A.L.E.S. steps',
        stat3Detail: 'tank mix order',
        stat4Value: 'PHI',
        stat4Label: 'food safety',
        stat4Detail: 'consumer · export',
        chapterCrops: 'Crop schedules',
        chapterCalibration: 'Sprayer calibration',
        chapterResistance: 'Resistance & MoA',
        chapterWales: 'W.A.L.E.S. mixing',
        chapterPhi: 'PHI & food safety',
        cropsKicker: 'Chapter 1 · crop schedules',
        cropsTitle: 'The complete list of approved chemicals for every crop — with rates, as a print-ready PDF.',
        cropsSub: 'Download comprehensive, print-ready field guides for each crop to take offline on extension visits.',
        cropsLabelPests: 'Key controlled pests & diseases',
        cropsInsect: 'Insecticides',
        cropsFungi: 'Fungicides',
        cropsOther: 'Herbicides / others',
        cropsPdfBtn: (c: string) => `Export ${c} guide (PDF)`,
        calKicker: 'Chapter 2 · calibration manual',
        calTitle: 'The 3-step field knapsack sprayer calibration formula.',
        calSub: 'Never apply chemicals without calibrating. Improper calibration causes either underdosing (leading to resistance) or overdosing (causing phytotoxicity and illegal residues).',
        calStep1Title: 'Measure 25-meter walking speed',
        calStep1Desc: 'Pace out a 25-meter test strip in the target crop field. Walk at your normal, comfortable spraying pace with the knapsack sprayer half-full of clean water. Record the time in seconds (e.g. 20 seconds).',
        calStep2Title: 'Collect nozzle discharge',
        calStep2Desc: 'Pump the sprayer to standard operating pressure (2.5-3.0 bar). Direct nozzle output into a measuring jug for exactly the same duration measured in step 1 (20 seconds). Measure output in millilitres (e.g. 400 ml).',
        calStep3Title: 'Calculate water volume per hectare',
        calStep3Desc: 'Formula: L/ha = (Discharge (ml) × 400) / (Spray Swath Width (m) × 1000). With a 0.5m swath, 400 ml gives: (400 × 400) / 500 = 320 Litres/hectare.',
        calNozzleTitle: 'Correct nozzle selection by application target',
        calNozzleHollowTitle: 'Hollow Cone Nozzles:',
        calNozzleHollowDesc: 'Best for contact insecticides and fungicides requiring fine droplets for 3D canopy penetration.',
        calNozzleFlatTitle: 'Flat Fan Nozzles:',
        calNozzleFlatDesc: 'Best for soil-applied pre-emergence herbicides (Pyrazosulfuron, Pretilachlor) giving uniform band spray.',
        calNozzleAirTitle: 'Air Induction / Low-Drift:',
        calNozzleAirDesc: 'Used when winds approach 8-10 km/h to minimize aerosol drift into neighboring waterways.',
        resKicker: 'Chapter 3 · mechanisms of resistance',
        resTitle: 'IRAC, FRAC & HRAC anti-resistance principles.',
        resSub: 'Insect, fungal, and weed populations naturally possess rare genetic variations. Continuous reliance on a single chemical group systematically eliminates susceptible individuals, multiplying resistant mutants.',
        res1Title: 'Target-Site vs Metabolic Resistance',
        res1Target: 'Target-Site Resistance:',
        res1TargetDesc: 'A single point mutation alters the enzyme or receptor protein so the pesticide cannot bind (e.g. sodium channel gene mutation kdr giving synthetic pyrethroid resistance).',
        res1Metab: 'Metabolic Resistance:',
        res1MetabDesc: 'The pest overproduces detoxifying enzymes (Cytochrome P450 monooxygenases or Esterases) that degrade the chemical before it hits the target.',
        res2Title: 'Why Multi-Site Protectants Are Vital',
        res2Desc: 'Chemicals like Mancozeb (FRAC M03), Copper Hydroxide (FRAC M01), and Sulphur (FRAC M02) attack dozens of fungal metabolic enzymes simultaneously.',
        res2Desc2: 'Because fungi cannot evolve 30 simultaneous mutations, no field resistance has ever developed to multi-site fungicides in 60+ years of global use. Always tank-mix or alternate single-site systemics with a multi-site anchor!',
        resTableTitle: 'Primary Registered Mode of Action Codes Reference',
        walesKicker: 'Chapter 4 · tank mix protocol',
        walesTitle: 'The W.A.L.E.S. universal tank mixing order.',
        walesSub: 'Adding pesticides into a spray tank in the wrong order causes curdling, nozzle clogging, sedimentation, and chemical deactivation. Always follow W.A.L.E.S. sequence!',
        walesSimTitle: 'Interactive W.A.L.E.S. tank mix simulator',
        walesSimSub: 'Simulate chemical mixing sequences to avoid nozzle clogging reactions.',
        walesSimStart: 'Start simulation',
        walesSimReset: 'Reset',
        walesStepLabel: 'simulation step',
        walesJarTitle: 'The 15-minute glass jar compatibility test',
        walesJarDesc: 'Before mixing in a large tank, mix proportional amounts of the intended chemicals in 500 ml of water in a clear glass jar. Let stand for 15 minutes. If heat develops, clumping occurs, or an oil layer separates, the chemicals are physically incompatible and must not be tank-mixed.',
        phiKicker: 'Chapter 5 · food safety compliance',
        phiTitle: 'Pre-Harvest Intervals (PHI) & Maximum Residue Limits (MRL).',
        phiSub: 'The Pre-Harvest Interval (PHI) is the legal minimum number of days that must elapse between the last pesticide spray and crop harvest.',
        phi1Title: 'Continuous-Harvest Crops (Brinjal, Tomato, Beans)',
        phi1Desc: 'Vegetables picked every 3 to 4 days require active ingredients with ultra-short PHIs. Using Chlorpyrifos (21-day PHI) or Mancozeb (7-day PHI) on harvesting crops causes severe chemical toxicity in consumers and export bans.',
        phi1Rec: 'Recommended for continuous harvest: Emamectin Benzoate (3-day PHI), Spinosad (3-day PHI), Cuelure Pheromone Traps (0-day PHI).',
        phi2Title: 'Long-Cycle Field Crops (Boro Rice, Tea, Potato)',
        phi2Desc: 'Chemicals applied during early vegetative or tillering stages (such as Cartap, Carbofuran, or Pretilachlor) break down naturally via photolysis and microbial degradation long before grain harvest.',
        phi2Rec: 'Late-season sprays for blast or late blight must be cut off at least 14 days before harvest.',
        disclaimTitle: 'Official Handbook Sources & Scientific Disclaimer',
        disclaimBody: 'The agronomist reference charts, mixing hierarchies, and resistance prevention models provided in this handbook are compiled from official publications by BARI, BRRI, the Department of Agricultural Extension (DAE), and international stewardship networks (IRAC / FRAC). They are intended for educational and field orientation purposes. Always verify exact product labels and consult with local DAE agronomists before application.'
      };

  // W.A.L.E.S. step meta used both in the static list and the simulator
  const walesSteps = [
    {
      letter: 'W',
      title: bn ? 'ওয়েটেবল পাউডার ও দানাদার (WP, WDG, DF)' : 'Wettable Powders & Granules (WP, WDG, DF)',
      desc: bn
        ? 'ট্যাংক অর্ধেক পানি দিয়ে ভরুন। পাউডারকে আলাদা বালতিতে অল্প পানিতে মিশিয়ে পেস্ট তৈরি করে ঢালুন। নাড়তে থাকুন যাতে সম্পূর্ণ দ্রবীভূত হয়।'
        : 'Fill tank 1/2 full of water. Pre-slurry powders with a little water in a bucket first, then pour in. Let dissolve completely with agitation.'
    },
    {
      letter: 'A',
      title: bn ? 'ভালোভাবে নাড়ুন (Agitate Thoroughly)' : 'Agitate Thoroughly',
      desc: bn
        ? 'মিক্সিং ও ফিলিং প্রক্রিয়ার শুরু থেকে শেষ পর্যায় পর্যন্ত ট্যাংক অনবরত নাড়তে থাকুন।'
        : 'Start mechanical or manual tank agitation and maintain it throughout the entire mixing and filling process.'
    },
    {
      letter: 'L',
      title: bn ? 'তরল ফ্লোয়েবল ও সাসপেনশন কনসেন্ট্রেট (SC, SL, F)' : 'Liquid Flowables & Suspension Concentrates (SC, SL, F)',
      desc: bn
        ? 'এরপর জলীয় তরল বালাইনাশক যোগ করুন। এগুলো পানিতে সহজে এবং সমানভাবে মিশে যায়।'
        : 'Add aqueous liquid products next. Because they are pre-dispersed in water carriers, they mix smoothly into the agitated water.'
    },
    {
      letter: 'E',
      title: bn ? 'ইমালসিফাইয়েবল কনসেন্ট্রেট (EC, EW)' : 'Emulsifiable Concentrates (EC, EW)',
      desc: bn
        ? 'এরপর তেলভিত্তিক বালাইনাশক মেশান। পাউডারের আগে EC মেশালে পাউডারের গায়ে তেলের প্রলেপ পড়ে তা আর দ্রবীভূত হতে পারে না।'
        : 'Add solvent/oil-based formulations next. They will form a cloudy milky emulsion. Adding EC before powders can coat powder granules with oil, preventing them from dissolving.'
    },
    {
      letter: 'S',
      title: bn ? 'সারফ্যাক্ট্যান্ট, স্টিকার ও পাতা সার (Surfactants)' : 'Surfactants, Stickers & Foliar Fertilizers',
      desc: bn
        ? 'সবশেষে স্টিকার, স্প্রেডার, মাইক্রোনিউট্রিয়েন্ট (জিঙ্ক, বোরন) যোগ করে বাকি পানি দিয়ে ট্যাংক পূর্ণ করুন।'
        : 'Add stickers, non-ionic spreaders, micronutrients (Zinc, Boron), or soluble salts last. Fill tank with remaining water to final volume.'
    }
  ];

  return (
    <div className="acg-gb pn-tokens" id="guidebook-container">
      {/* ------------------------------------------- editorial hero */}
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
              <br />
              {copy.h1c}
            </h1>
            <div className="pn-head__more">
              <p className="pn-lede">{copy.lede}</p>
              <ul className="pn-trust">
                <li><ShieldCheck size={14} /> {copy.trust1}</li>
                <li><FileDown size={14} /> {copy.trust2}</li>
              </ul>
            </div>
            <button
              type="button"
              className="pn-head__toggle"
              onClick={() => setHeadOpen((o) => !o)}
            >
              <ChevronDown size={14} />
              {bn ? 'বিস্তারিত' : 'Details'}
            </button>
          </div>

          <aside className="pn-sticker">
            <p className="pn-sticker__kicker">{copy.stickerKicker}</p>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">01</span>
              <Sprout size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker1Foot}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">02</span>
              <Compass size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker2Foot}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">03</span>
              <Layers size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker3Foot}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">04</span>
              <Droplet size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker4Foot}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">05</span>
              <Clock size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker5Foot}</span>
            </div>
            <p className="pn-sticker__foot">
              <BookOpen size={14} /> {copy.stickerFoot}
            </p>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------- stats band */}
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

      {/* ------------------------------------------- main panels */}
      <section className="pn-shell acg-gb-panels">
        {/* Collapsible user guide */}
        <div className="acg-guide-wrap">
          <CollapsibleUserGuide
            pageKey="guidebook"
            titleEn="Field Guidebook & W.A.L.E.S. Mixing Guide"
            titleBn="মাঠ নির্দেশিকা ও W.A.L.E.S. মিক্সিং গাইড"
            subtitleEn="Learn standard chemical mixing order rules and sprayer calibration guidelines."
            subtitleBn="সদস্যদের সঠিকভাবে রাসায়নিক মেশানোর বৈজ্ঞানিক অর্ডার এবং স্প্রেয়ার ক্যালিব্রেশন প্রোটোকল জানুন।"
            stepsEn={[
              'Navigate through the handbook chapters: Crop Schedules, Sprayer Calibration, Resistance, and W.A.L.E.S. mixing.',
              "Use the 'Crop Schedules' tab to print or export comprehensive A5 chemical reference sheets for Rice, Potato, Tomato, etc.",
              'Study the Calibration tab to adjust nozzle flow rates and calculate step-lengths to achieve even mist coverage.',
              'Observe the W.A.L.E.S. Mixing sequence: Wettable powders first, Agitate next, Liquid flowables third, Emulsifiable concentrates last.',
              'Apply the Pre-Harvest Interval (PHI) safety counts to protect consumers and meet food export rules.'
            ]}
            stepsBn={[
              'নির্দেশিকার চ্যাপ্টারগুলো ব্যবহার করুন: ফসলের চার্ট, স্প্রেয়ার ক্যালিব্রেশন, রেজিসট্যান্স বিজ্ঞান এবং W.A.L.E.S. মিশ্রণ বিধি।',
              'নির্দিষ্ট ফসলের (যেমন: ধান, আলু, টমেটো) সমন্বিত স্প্রে সময়সূচী ও A5 পকেট বুক ডাউনলোড করতে "ফসলভিত্তিক সময়সূচী" ট্যাব ব্যবহার করুন।',
              'সুষম কভার পেতে নোজলের প্রবাহের হার এবং হাটার গতি সামঞ্জস্য করার নিয়ম জানুন।',
              'বালাইনাশক গোলার বৈজ্ঞানিক ক্রম W.A.L.E.S. মেনে চলুন: প্রথমে পাউডার জাতীয় ওষুধ (W), ভালোমতো নাড়ানো (A), তরল বা লিকুইড (L), সবশেষে ইমালসিফাইড তরল (E.S.)।',
              'ভোক্তাদের স্বাস্থ্য সুরক্ষিত করতে এবং রপতানি মান বজায় রাখতে PHI এর বৈজ্ঞানিক সময়সূচীগুলো মেনে চলুন।'
            ]}
            proTipsEn={[
              'Following the W.A.L.E.S. protocol prevents chemical reactions that clog nozzles and cause active ingredient precipitation.',
              'Pesticides should be sprayed in the early morning or late afternoon to avoid wind gusts and high sun degradation.'
            ]}
            proTipsBn={[
              'W.A.L.E.S. নিয়ম অনুসরণ করলে রাসায়নিক বিক্রিয়ার কারণে জমাট বেঁধে নোজল জ্যাম বা বন্ধ হওয়ার ঝুঁকি থাকে না।',
              'তীব্র বাতাস ও রোদের কারণে ওষুধের কার্যকারিতা হ্রাস এড়াতে বালাইনাশক খুব সকালে অথবা পড়ন্ত বিকেলে স্প্রে করুন।'
            ]}
          />
        </div>

        {/* Chapter selector */}
        <div className="acg-gb-chapters">
          <button
            type="button"
            className={`acg-gb-chapter ${activeChapter === 'crops' ? 'acg-gb-chapter--active' : ''}`}
            onClick={() => setActiveChapter('crops')}
          >
            <Sprout size={13} /> {copy.chapterCrops}
          </button>
          <button
            type="button"
            className={`acg-gb-chapter ${activeChapter === 'calibration' ? 'acg-gb-chapter--active' : ''}`}
            onClick={() => setActiveChapter('calibration')}
          >
            <Compass size={13} /> {copy.chapterCalibration}
          </button>
          <button
            type="button"
            className={`acg-gb-chapter ${activeChapter === 'resistance' ? 'acg-gb-chapter--active' : ''}`}
            onClick={() => setActiveChapter('resistance')}
          >
            <Layers size={13} /> {copy.chapterResistance}
          </button>
          <button
            type="button"
            className={`acg-gb-chapter ${activeChapter === 'wales' ? 'acg-gb-chapter--active' : ''}`}
            onClick={() => setActiveChapter('wales')}
          >
            <Droplet size={13} /> {copy.chapterWales}
          </button>
          <button
            type="button"
            className={`acg-gb-chapter ${activeChapter === 'phi' ? 'acg-gb-chapter--active' : ''}`}
            onClick={() => setActiveChapter('phi')}
          >
            <Clock size={13} /> {copy.chapterPhi}
          </button>
        </div>

        {/* ----------------- chapter 1: crop schedules */}
        {activeChapter === 'crops' && (
          <div>
            <div className="acg-gb-chapter-head">
              <span className="acg-gb-chapter-head__kicker">{copy.cropsKicker}</span>
              <h2 className="acg-gb-chapter-head__title">{copy.cropsTitle}</h2>
              <p className="acg-gb-chapter-head__sub">{copy.cropsSub}</p>
            </div>

            <div className="acg-gb-crops">
              {cropsList.map((cropName) => {
                const matchingProds = products.filter((p) => p.crops.includes(cropName));
                const pestsForCrop = Array.from(
                  new Set(matchingProds.flatMap((p) => p.pests))
                );
                return (
                  <article key={cropName} className="acg-gb-crop">
                    <header className="acg-gb-crop__head">
                      <span className="acg-gb-crop__count">
                        {formatNum(matchingProds.length)} {bn ? 'টি নিবন্ধিত' : 'registered'}
                      </span>
                      <Sprout size={16} color="#006a4e" />
                    </header>
                    <h3 className="acg-gb-crop__title">{transCrop(cropName)}</h3>

                    <div>
                      <span className="acg-gb-crop__label">{copy.cropsLabelPests}</span>
                      <p className="acg-gb-crop__pests">
                        {pestsForCrop.slice(0, 4).map((p) => transPest(String(p))).join(', ')}
                        {pestsForCrop.length > 4
                          ? (bn ? ` আরও ${formatNum(pestsForCrop.length - 4)} টি` : ` + ${formatNum(pestsForCrop.length - 4)} more`)
                          : ''}
                      </p>
                    </div>

                    <div className="acg-gb-crop__breakdown">
                      <div className="acg-gb-crop__breakdown-row">
                        <span className="acg-gb-crop__breakdown-label">{copy.cropsInsect}</span>
                        <span className="acg-gb-crop__breakdown-value">
                          {formatNum(matchingProds.filter((p) => p.type === 'Insecticide').length)}
                        </span>
                      </div>
                      <div className="acg-gb-crop__breakdown-row">
                        <span className="acg-gb-crop__breakdown-label">{copy.cropsFungi}</span>
                        <span className="acg-gb-crop__breakdown-value">
                          {formatNum(matchingProds.filter((p) => p.type === 'Fungicide').length)}
                        </span>
                      </div>
                      <div className="acg-gb-crop__breakdown-row">
                        <span className="acg-gb-crop__breakdown-label">{copy.cropsOther}</span>
                        <span className="acg-gb-crop__breakdown-value">
                          {formatNum(matchingProds.filter((p) => p.type !== 'Insecticide' && p.type !== 'Fungicide').length)}
                        </span>
                      </div>
                    </div>

                    <footer className="acg-gb-crop__foot">
                      <button
                        type="button"
                        className="pn-btn"
                        onClick={() => exportCropGuidePDF(cropName, matchingProds)}
                      >
                        <FileDown size={14} /> {copy.cropsPdfBtn(transCrop(cropName))}
                      </button>
                    </footer>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ----------------- chapter 2: calibration */}
        {activeChapter === 'calibration' && (
          <div className="pn-card">
            <div className="acg-gb-chapter-head">
              <span className="acg-gb-chapter-head__kicker">{copy.calKicker}</span>
              <h2 className="acg-gb-chapter-head__title">{copy.calTitle}</h2>
              <p className="acg-gb-chapter-head__sub">{copy.calSub}</p>
            </div>

            <div className="acg-gb-cal">
              <div className="acg-gb-cal-step">
                <span className="acg-gb-cal-step__num">{formatNum(1)}</span>
                <h4 className="acg-gb-cal-step__title">{copy.calStep1Title}</h4>
                <p className="acg-gb-cal-step__p">{copy.calStep1Desc}</p>
              </div>
              <div className="acg-gb-cal-step">
                <span className="acg-gb-cal-step__num">{formatNum(2)}</span>
                <h4 className="acg-gb-cal-step__title">{copy.calStep2Title}</h4>
                <p className="acg-gb-cal-step__p">{copy.calStep2Desc}</p>
              </div>
              <div className="acg-gb-cal-step">
                <span className="acg-gb-cal-step__num">{formatNum(3)}</span>
                <h4 className="acg-gb-cal-step__title">{copy.calStep3Title}</h4>
                <p className="acg-gb-cal-step__p">{copy.calStep3Desc}</p>
              </div>
            </div>

            <div className="acg-gb-info">
              <h4>
                <CheckCircle2 size={16} /> {copy.calNozzleTitle}
              </h4>
              <div className="acg-gb-nozzles">
                <div className="acg-gb-nozzle">
                  <b>{copy.calNozzleHollowTitle}</b>
                  <p>{copy.calNozzleHollowDesc}</p>
                </div>
                <div className="acg-gb-nozzle">
                  <b>{copy.calNozzleFlatTitle}</b>
                  <p>{copy.calNozzleFlatDesc}</p>
                </div>
                <div className="acg-gb-nozzle">
                  <b>{copy.calNozzleAirTitle}</b>
                  <p>{copy.calNozzleAirDesc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- chapter 3: resistance science */}
        {activeChapter === 'resistance' && (
          <div className="pn-card pn-card--red">
            <div className="acg-gb-chapter-head">
              <span className="acg-gb-chapter-head__kicker">{copy.resKicker}</span>
              <h2 className="acg-gb-chapter-head__title">{copy.resTitle}</h2>
              <p className="acg-gb-chapter-head__sub">{copy.resSub}</p>
            </div>

            <div className="acg-gb-res">
              <div className="acg-gb-res-card">
                <h4 className="acg-gb-res-card__title">
                  <AlertTriangle size={15} color="#f42a41" /> {copy.res1Title}
                </h4>
                <p>
                  <strong>{copy.res1Target}</strong> {copy.res1TargetDesc}
                </p>
                <p style={{ marginTop: 8 }}>
                  <strong>{copy.res1Metab}</strong> {copy.res1MetabDesc}
                </p>
              </div>
              <div className="acg-gb-res-card acg-gb-res-card--ok">
                <h4 className="acg-gb-res-card__title">
                  <ShieldCheck size={15} color="#006a4e" /> {copy.res2Title}
                </h4>
                <p>{copy.res2Desc}</p>
                <p style={{ marginTop: 8 }}>{copy.res2Desc2}</p>
              </div>
            </div>

            {/* MoA reference table */}
            <div style={{ marginTop: 20, overflowX: 'auto' }}>
              <h4 style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 14,
                color: 'var(--ink)',
                marginBottom: 10
              }}>
                {copy.resTableTitle}
              </h4>
              <table className="acg-gb-table">
                <thead>
                  <tr>
                    <th>{bn ? 'MoA কোড' : 'MoA code'}</th>
                    <th>{bn ? 'কমিটি' : 'Committee'}</th>
                    <th>{bn ? 'রাসায়নিক গ্রুপ' : 'Chemical family'}</th>
                    <th>{bn ? 'টার্গেট সাইট' : 'Target site'}</th>
                    <th>{bn ? 'ঝুঁকি' : 'Risk'}</th>
                  </tr>
                </thead>
                <tbody>
                  {MOA_DATABASE.slice(0, 10).map((m) => (
                    <tr key={m.code}>
                      <td><b>{m.code}</b></td>
                      <td>{m.type || m.committee}</td>
                      <td>{bn && m.nameBn ? m.nameBn : m.name}</td>
                      <td>{bn && m.targetSiteBn ? m.targetSiteBn : m.targetSite}</td>
                      <td>
                        <span className={`pn-chip ${
                          m.resistanceRisk === 'High'
                            ? ''
                            : m.resistanceRisk === 'Medium'
                            ? 'pn-chip--gold'
                            : 'pn-chip--green'
                        }`}>
                          {transRisk(m.resistanceRisk)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------- chapter 4: W.A.L.E.S. */}
        {activeChapter === 'wales' && (
          <div className="pn-card pn-card--gold">
            <div className="acg-gb-chapter-head">
              <span className="acg-gb-chapter-head__kicker">{copy.walesKicker}</span>
              <h2 className="acg-gb-chapter-head__title">{copy.walesTitle}</h2>
              <p className="acg-gb-chapter-head__sub">{copy.walesSub}</p>
            </div>

            {/* Static reference list of the 5 steps */}
            <div style={{ display: 'grid', gap: 10 }}>
              {walesSteps.map((step) => (
                <div key={step.letter} style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: 14,
                  padding: '12px 14px',
                  background: '#fbfcfb',
                  border: '1px solid var(--line)',
                  alignItems: 'center'
                }}>
                  <span style={{
                    width: 36,
                    height: 36,
                    borderRadius: 4,
                    background: 'var(--green-900)',
                    color: '#fff',
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 18,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {step.letter}
                  </span>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 700,
                      fontSize: 13.5,
                      color: 'var(--ink)'
                    }}>{step.title}</h4>
                    <p style={{ marginTop: 4, fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive simulator */}
            <div style={{
              marginTop: 22,
              background: 'var(--paper-muted)',
              border: '1px solid var(--line)',
              padding: '22px 22px 20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
                paddingBottom: 12,
                borderBottom: '1px solid var(--line)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Beaker size={20} color="#006a4e" />
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 700,
                      fontSize: 15,
                      color: 'var(--ink)'
                    }}>{copy.walesSimTitle}</h4>
                    <p style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{copy.walesSimSub}</p>
                  </div>
                </div>
                <span className="pn-chip pn-chip--gold">
                  <Sparkles size={11} /> {bn ? 'স্মার্ট টুল' : 'Smart tool'}
                </span>
              </div>

              <div className="acg-gb-wales-grid" style={{ marginTop: 18 }}>
                {/* Formulations checklist */}
                <div className="acg-gb-wales-form">
                  <h4>{bn ? '১. ওষুধ নির্বাচন করুন' : '1. Select formulations to mix'}</h4>
                  <div>
                    <label className="acg-gb-wales-form__row">
                      <span>[W] WP / WDG / DF · {bn ? 'পাউডার বা দানাদার' : 'Dry powders / WDG'}</span>
                      <input
                        type="checkbox"
                        checked={walesSelections.wp}
                        disabled={isSimulating}
                        onChange={(e) => setWalesSelections({ ...walesSelections, wp: e.target.checked })}
                      />
                    </label>
                    <label className="acg-gb-wales-form__row">
                      <span>[L] SC / SL · {bn ? 'জলীয় তরল' : 'Liquid flowables'}</span>
                      <input
                        type="checkbox"
                        checked={walesSelections.sc}
                        disabled={isSimulating}
                        onChange={(e) => setWalesSelections({ ...walesSelections, sc: e.target.checked })}
                      />
                    </label>
                    <label className="acg-gb-wales-form__row">
                      <span>[E] EC / EW · {bn ? 'তেলভিত্তিক' : 'Oil-based EC'}</span>
                      <input
                        type="checkbox"
                        checked={walesSelections.ec}
                        disabled={isSimulating}
                        onChange={(e) => setWalesSelections({ ...walesSelections, ec: e.target.checked })}
                      />
                    </label>
                    <label className="acg-gb-wales-form__row">
                      <span>[S] {bn ? 'স্টিকার / সারফ্যাক্ট্যান্ট' : 'Stickers / surfactants'}</span>
                      <input
                        type="checkbox"
                        checked={walesSelections.st}
                        disabled={isSimulating}
                        onChange={(e) => setWalesSelections({ ...walesSelections, st: e.target.checked })}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button
                      type="button"
                      className="pn-btn"
                      onClick={runSimulation}
                      disabled={
                        isSimulating ||
                        (!walesSelections.wp && !walesSelections.sc && !walesSelections.ec && !walesSelections.st)
                      }
                    >
                      <Play size={13} /> {copy.walesSimStart}
                    </button>
                    <button
                      type="button"
                      className="pn-linkbtn pn-linkbtn--muted"
                      onClick={resetSimulation}
                      title={copy.walesSimReset}
                    >
                      <RefreshCw size={13} /> {copy.walesSimReset}
                    </button>
                  </div>
                </div>

                {/* Simulation stage — beaker + step text */}
                <div className="acg-gb-wales-stage">
                  <span style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: 8
                  }}>
                    {copy.walesStepLabel} {formatNum(simStep)} / {formatNum(7)}
                  </span>

                  {/* Beaker */}
                  <div style={{
                    position: 'relative',
                    width: 96,
                    height: 160,
                    background: '#f5f8f5',
                    border: '3px solid var(--line)',
                    borderBottomLeftRadius: 14,
                    borderBottomRightRadius: 14,
                    overflow: 'hidden',
                    margin: '0 auto 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}>
                    {simStep >= 6 && (
                      <div style={{ height: 16, background: '#10b981', width: '100%' }} />
                    )}
                    {simStep >= 5 && (
                      <div style={{
                        height: 32, background: '#8b5cf6', width: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontFamily: 'var(--mono)', fontSize: 8, fontWeight: 700
                      }}>
                        {bn ? 'EC' : 'EC'}
                      </div>
                    )}
                    {simStep >= 4 && (
                      <div style={{
                        height: 40, background: '#3b82f6', width: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontFamily: 'var(--mono)', fontSize: 8, fontWeight: 700
                      }}>
                        SC
                      </div>
                    )}
                    {simStep >= 2 && simStep !== 3 && (
                      <div style={{
                        height: 48, background: '#facc15', width: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#422006', fontFamily: 'var(--mono)', fontSize: 8, fontWeight: 700
                      }}>
                        WP
                      </div>
                    )}
                    {simStep === 3 && (
                      <div style={{
                        height: 80, background: '#3b82f6', width: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700,
                        animation: 'pn-spin 2s linear infinite'
                      }}>
                        {bn ? '🌀 নাড়ানো হচ্ছে...' : '🌀 AGITATING...'}
                      </div>
                    )}
                    {simStep >= 1 && (
                      <div style={{
                        width: '100%',
                        background: '#67e8f9',
                        height: simStep === 7 ? '100%' : 56,
                        transition: 'height 0.6s ease',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: 6,
                        color: '#0c4a6e',
                        fontFamily: 'var(--mono)',
                        fontSize: 8,
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        {bn ? 'পানি' : 'Water'}
                      </div>
                    )}
                  </div>

                  <p style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    minHeight: 50
                  }}>
                    {simStep === 0 && (bn
                      ? 'যে ওষুধগুলো মেশাবেন তা নির্বাচন করুন, তারপর সঠিক এবং নিরাপদ গোলার ক্রম দেখতে "সিমুলেশন দেখুন" ক্লিক করুন।'
                      : "Select the formulations you plan to mix, then click 'Start simulation' to visualize the correct, safe pouring order.")}
                    {simStep === 1 && (bn
                      ? 'ধাপ ১: প্রথমে স্প্রে ট্যাংক অর্ধেক (৫০%) পানি দিয়ে পূর্ণ করুন। খালি ট্যাংকে কখনো রাসায়নিক ওষুধ ঢালবেন না!'
                      : 'Step 1: Fill the spray tank 1/2 full with clean water first. Never pour dry chemicals directly into an empty tank!')}
                    {simStep === 2 && (bn
                      ? 'ধাপ ২: প্রথমে পাউডার [WP] বা দানাদার [WDG] ওষুধ যোগ করুন। এগুলোকে বালতিতে আলাদা পানিতে পেস্ট করে ঢালুন এবং সম্পূর্ণ গলতে দিন।'
                      : 'Step 2: Add Wettable Powders [WP] / Granules [WDG] first. Slurry in a bucket with water first, then let dissolve completely.')}
                    {simStep === 3 && (bn
                      ? 'ধাপ ৩: ভালোভাবে নাড়ুন (Agitate Thoroughly)! পাউডার যাতে নিচে জমা না হতে পারে তার জন্য অনবরত নাড়তে থাকুন।'
                      : 'Step 3: Agitate thoroughly! Maintain continuous agitation so dry powders dissolve and do not settle.')}
                    {simStep === 4 && (bn
                      ? 'ধাপ ৪: এরপর তরল বা লিকুইড সাসপেনশন [SC/SL] ওষুধ মেশান। এগুলো পানির সাথে সহজেই মিশে যাবে।'
                      : 'Step 4: Add Liquid Flowables / Suspension Concentrates [SC] next. They mix smoothly into the water carrier.')}
                    {simStep === 5 && (bn
                      ? 'ধাপ ৫: এরপর তেলভিত্তিক বা ইমালসিফায়েবল কনসেন্ট্রেট [EC] ওষুধ মেশান। সবশেষে EC মেশালে পাউডারে তেলের আস্তরণ পড়ে না।'
                      : 'Step 5: Add Emulsifiable Concentrates [EC]. Adding oil-based EC last prevents oil coating powder granules, which stops dissolution.')}
                    {simStep === 6 && (bn
                      ? 'ধাপ ৬: পাতার সাথে ওষুধের লেগে থাকা ও ছড়ানো বাড়াতে সবশেষে স্টিকার বা স্প্রেডার যোগ করুন।'
                      : 'Step 6: Add Stickers, Spreaders, or Soluble Foliar Salts last to maximize chemical leaf adhesion.')}
                    {simStep === 7 && (bn
                      ? 'ধাপ ৭: বাকি অংশ সম্পূর্ণ পানি দিয়ে পূর্ণ করুন। বালাইনাশক এখন সঠিক নিয়মে মিশ্রিত এবং নিরাপদভাবে স্প্রে করার জন্য প্রস্তুত!'
                      : 'Step 7: Fill the remaining tank with water to full volume. Mix is complete, fully dispersed, and safe to spray!')}
                  </p>

                  {simStep === 7 && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      marginTop: 8, color: 'var(--green)',
                      fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600
                    }}>
                      <Check size={14} /> {bn ? 'সফলভাবে সম্পন্ন হয়েছে!' : 'Success! No precipitation danger.'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="acg-gb-advisory">
              <Beaker size={18} />
              <div>
                <strong>{copy.walesJarTitle}</strong>
                <p>{copy.walesJarDesc}</p>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- chapter 5: PHI */}
        {activeChapter === 'phi' && (
          <div className="pn-card pn-card--red">
            <div className="acg-gb-chapter-head">
              <span className="acg-gb-chapter-head__kicker">{copy.phiKicker}</span>
              <h2 className="acg-gb-chapter-head__title">{copy.phiTitle}</h2>
              <p className="acg-gb-chapter-head__sub">{copy.phiSub}</p>
            </div>

            <div className="acg-gb-phi-grid">
              <div className="acg-gb-phi-card">
                <h4 className="acg-gb-phi-card__title">{copy.phi1Title}</h4>
                <p className="acg-gb-phi-card__p">{copy.phi1Desc}</p>
                <div className="acg-gb-advisory" style={{ marginTop: 10 }}>
                  <CheckCircle2 size={16} color="#8a6d1d" />
                  <p>{copy.phi1Rec}</p>
                </div>
              </div>
              <div className="acg-gb-phi-card" style={{ borderLeftColor: 'var(--green)' }}>
                <h4 className="acg-gb-phi-card__title">{copy.phi2Title}</h4>
                <p className="acg-gb-phi-card__p">{copy.phi2Desc}</p>
                <div className="acg-gb-advisory" style={{
                  marginTop: 10,
                  background: '#eef5ef',
                  borderColor: '#c5ddd0'
                }}>
                  <Clock size={16} color="#006a4e" />
                  <p style={{ color: '#1a3d2c' }}>{copy.phi2Rec}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="acg-gb-advisory">
          <AlertTriangle size={18} />
          <div>
            <strong>{copy.disclaimTitle}</strong>
            <p>{copy.disclaimBody}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
