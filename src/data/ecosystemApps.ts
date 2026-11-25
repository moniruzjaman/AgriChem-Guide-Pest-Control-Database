/**
 * ecosystemApps.ts
 * ================
 * The companion-app catalogue behind the "More" tab. Every entry pairs a
 * REAL og-image (fetched and verified HTTP 200 from each app's own meta
 * tags — no invented previews) with an honest, specific statement of what
 * that app lets the user DO: read, listen, understand, practise or file.
 *
 * Images fail gracefully in the UI: a gradient + emoji placeholder sits
 * behind every <img>, revealed by onError — same contract as the footer
 * RELATED_LINKS strip.
 *
 * Verified og-sources (2026-11-25):
 * - diagnostic-field-guide  https://moniruzjaman.github.io/diagnostic-field-guide/og-image.jpg?v=4
 * - CABI Plant Detective    https://cabi.krishiai.live/og-share.png
 * - Pesticide Act 2018      https://raw.githubusercontent.com/moniruzjaman/pesticide_act_2018/main/public/og-image.png
 * - Pesticide Reform        https://raw.githubusercontent.com/moniruzjaman/pesticide-reform/main/social-preview.png
 * - Portfolio               https://moniruzjaman.github.io/portfolio/og/home.png
 * - PesticideNext (self)    https://pesticide.krishiai.live/og-image.png
 */

export type EcosystemAppKind = 'diagnosis' | 'legal' | 'policy' | 'portfolio' | 'self';

export interface EcosystemApp {
  id: string;
  url: string;
  /** Real og:image of the target app (verified live). */
  image: string;
  alt: string;
  titleEn: string;
  titleBn: string;
  /** One-line "what this app is" — the og:description essence. */
  summaryEn: string;
  summaryBn: string;
  /** What the user can DO in it: read / listen / practise / reference… */
  purposeEn: string;
  purposeBn: string;
  /** Feature chips rendered under the purpose line. */
  featuresEn: string[];
  featuresBn: string[];
  emoji: string;
  kind: EcosystemAppKind;
  badgeEn?: string;
  badgeBn?: string;
}

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: 'diagnostic-field-guide',
    url: 'https://moniruzjaman.github.io/diagnostic-field-guide/',
    image: 'https://moniruzjaman.github.io/diagnostic-field-guide/og-image.jpg?v=4',
    alt: 'উদ্ভিদ রোগনির্ণয় ফিল্ড গাইড — পড়ুন, যাচাই করুন, মাঠে প্রয়োগ করুন',
    titleEn: 'Plant Disease Diagnostic Field Guide',
    titleBn: 'উদ্ভিদ রোগনির্ণয় ফিল্ড গাইড',
    summaryEn:
      'A Bangla e-book and offline workbench for scientific crop diagnosis — 9 chapters, 265 photos.',
    summaryBn:
      'বৈজ্ঞানিক ফসল রোগনির্ণয়ের বাংলা ই-বুক ও অফলাইন ওয়ার্কবেঞ্চ — ৯ অধ্যায়, ২৬৫ ছবি।',
    purposeEn:
      'Read the chapters like a book, LISTEN to them with text-to-speech, understand the scientific diagnosis process, then verify your diagnosis in the field — 7 cause-group comparison, case saving and JSON/PDF export. Score mills a formula, not a confirmed diagnosis.',
    purposeBn:
      'অধ্যায়গুলো বইয়ের মতো পড়ুন, শোনার (TTS) মাধ্যমে শুনুন, বৈজ্ঞানিক রোগনির্ণয় প্রক্রিয়া বুঝুন, তারপর মাঠে গিয়ে যাচাই করুন — ৭ কারণগোষ্ঠী তুলনা, কেস সংরক্ষণ ও JSON/PDF রপ্তানি। স্কোর মিলের সূত্র, নিশ্চিত রোগনির্ণয় নয়।',
    featuresEn: ['9 chapters e-book', 'Listen (TTS)', '265 field photos', '7 cause-group compare', 'Case save + export', 'Works offline'],
    featuresBn: ['৯ অধ্যায়ের ই-বুক', 'শোনার সুবিধা (TTS)', '২৬৫ মাঠের ছবি', '৭ কারণগোষ্ঠী তুলনা', 'কেস সংরক্ষণ ও রপ্তানি', 'অফলাইনে চলে'],
    emoji: '🔬',
    kind: 'diagnosis',
    badgeEn: 'New',
    badgeBn: 'নতুন',
  },
  {
    id: 'cabi-diagnosis',
    url: 'https://cabi.krishiai.live/',
    image: 'https://cabi.krishiai.live/og-share.png',
    alt: 'উদ্ভিদ গোয়েন্দা — নির্ভুল শনাক্তকরণ, বিশেষজ্ঞ জ্ঞান, হাতে-কলমে অনুশীলন',
    titleEn: 'Plant Detective — CABI Smart Crop Diagnosis',
    titleBn: 'উদ্ভিদ গোয়েন্দা — CABI স্মার্ট রোগ নির্ণয়',
    summaryEn:
      'The full learning-and-practice app for crop diagnosis — identify, gain expert knowledge, build skill by hand.',
    summaryBn:
      'রোগ নির্ণয়ের পূর্ণাঙ্গ শেখা-ও-অনুশীলন অ্যাপ — নির্ভুল শনাক্তকরণ, বিশেষজ্ঞ জ্ঞান, হাতে-কলমে দক্ষতা।',
    purposeEn:
      'A complete app for boosting your diagnostic skill: learn the step-by-step CABI Plantwise method, go deeper into the science, clear your concepts through video and AUDIO, and sharpen decision-making by playing 5 interactive games. Snap a photo or describe symptoms for instant diagnosis and IPM advice.',
    purposeBn:
      'রোগনির্ণয় দক্ষতা বাড়ানোর পূর্ণাঙ্গ অ্যাপ: ধাপে ধাপে CABI Plantwise পদ্ধতি শিখুন, বৈজ্ঞানিক ধারণার গভীরে যান, ভিডিও ও অডিওর মাধ্যমে স্পষ্ট ধারণা নিন এবং ৫টি ইন্টারেক্টিভ গেম খেলে সিদ্ধান্ত গ্রহণের দক্ষতা বাড়ান। ছবি তুলুন বা লক্ষণ বলুন — তাৎক্ষণিক নির্ণয় ও IPM পরামর্শ।',
    featuresEn: ['Step-by-step method', 'Video + audio lessons', '5 interactive games', 'Photo diagnosis', 'IPM recommendations'],
    featuresBn: ['ধাপে ধাপে পদ্ধতি', 'ভিডিও + অডিও পাঠ', '৫টি ইন্টারেক্টিভ গেম', 'ছবি দিয়ে নির্ণয়', 'IPM সুপারিশ'],
    emoji: '🕵️',
    kind: 'diagnosis',
    badgeEn: 'Partner app',
    badgeBn: 'সহযোগী অ্যাপ',
  },
  {
    id: 'pesticide-act-2018',
    url: 'https://pesticideact2018.vercel.app/',
    image: 'https://raw.githubusercontent.com/moniruzjaman/pesticide_act_2018/main/public/og-image.png',
    alt: 'বালাইনাশক আইন, ২০১৮ — সমন্বিত ফিল্ড গাইড',
    titleEn: 'Pesticide Act 2018 — legal field guide',
    titleBn: 'বালাইনাশক আইন ২০১৮ — আইনি ফিল্ড গাইড',
    summaryEn:
      'Interactive legal reference for retailers and extension officers — all 36 sections with an offline AI assistant.',
    summaryBn:
      'খুচরা বিক্রেতা ও সম্প্রসারণ কর্মকর্তাদের ইন্টারঅ্যাকটিভ আইনি রেফারেন্স — ৩৬টি ধারা, অফলাইন AI সহায়কসহ।',
    purposeEn:
      'Know the law you work under: read all 36 sections of the Pesticides Act 2018 with plain-language explanation, study the 47-slide training deck, use the download centre and ask the offline AI assistant when a rule is unclear.',
    purposeBn:
      'যে আইনের অধীনে কাজ করেন তা জানুন: বালাইনাশক আইন ২০১৮-এর ৩৬টি ধারা সহজ ভাষায় পড়ুন, ৪৭ স্লাইডের প্রশিক্ষণ ডেক দেখুন, ডাউনলোড সেন্টার ব্যবহার করুন এবং নিয়ম অস্পষ্ট হলে অফলাইন AI সহায়ককে জিজ্ঞাসা করুন।',
    featuresEn: ['All 36 sections', '47-slide training deck', 'Download centre', 'Offline AI assistant'],
    featuresBn: ['৩৬টি ধারা সম্পূর্ণ', '৪৭ স্লাইডের প্রশিক্ষণ', 'ডাউনলোড সেন্টার', 'অফলাইন AI সহায়ক'],
    emoji: '⚖️',
    kind: 'legal',
    badgeEn: 'Partner app',
    badgeBn: 'সহযোগী অ্যাপ',
  },
  {
    id: 'pesticide-reform',
    url: 'https://moniruzjaman.github.io/pesticide-reform/',
    image: 'https://raw.githubusercontent.com/moniruzjaman/pesticide-reform/main/social-preview.png',
    alt: 'Pesticide Reform — MoA Group/Code on Pesticide Labels (Submission Dossier v4.0.0)',
    titleEn: 'Pesticide Reform — label policy dossier',
    titleBn: 'পেস্টিসাইড রিফর্ম — লেবেল নীতি ডজিয়ার',
    summaryEn:
      'Policy dossier proposing international IRAC/FRAC/HRAC MoA group codes on registered pesticide labels.',
    summaryBn:
      'নিবন্ধিত লেবেলে আন্তর্জাতিক MoA গ্রুপ কোড যোগ করার নীতিগত প্রস্তাব — DAE সাবমিশন ডজিয়ার।',
    purposeEn:
      'Understand the reform case: why every pesticide label in Bangladesh should carry its IRAC/FRAC/HRAC group code, the submission dossier filed with DAE under the Pesticides Act 2018, and the evidence behind it.',
    purposeBn:
      'সংস্কারের যুক্তি বুঝুন: বাংলাদেশের প্রতিটি বালাইনাশক লেবেলে কেন IRAC/FRAC/HRAC গ্রুপ কোড থাকা উচিত, বালাইনাশক আইন ২০১৮-এর অধীনে DAE-তে দাখিল করা সাবমিশন ডজিয়ার এবং তার প্রমাণভিত্তি।',
    featuresEn: ['Submission dossier v4', 'Evidence base', 'DAE filing'],
    featuresBn: ['সাবমিশন ডজিয়ার v4', 'প্রমাণভিত্তি', 'DAE দাখিল'],
    emoji: '🏷️',
    kind: 'policy',
  },
  {
    id: 'portfolio',
    url: 'https://moniruzjaman.github.io/portfolio/',
    image: 'https://moniruzjaman.github.io/portfolio/og/home.png',
    alt: 'Abu Md. Moniruzjaman — Portfolio · Agricultural Extension & Digital Tools',
    titleEn: "The developer's portfolio",
    titleBn: 'নির্মাতার পোর্টফোলিও',
    summaryEn:
      'Abu Md. Moniruzjaman — Additional Deputy Director (Horticulture), DAE Bangladesh, building digital tools for smallholder farmers.',
    summaryBn:
      'আবু এমডি মনিরুজ্জামান — উপ-পরিচালক (উদ্যান), DAE বাংলাদেশ; ক্ষুদ্র কৃষকের জন্য ডিজিটাল টুলস নির্মাতা।',
    purposeEn:
      'Meet the person behind these apps: selected work, career history and field writing from two decades inside agricultural extension.',
    purposeBn:
      'এই অ্যাপগুলোর নির্মাতার সাথে পরিচিত হোন: কৃষি সম্প্রসারণে দুই দশকের নির্বাচিত কাজ, ক্যারিয়ার ও মাঠ-লেখনী।',
    featuresEn: ['Selected work', 'Career', 'Field writing'],
    featuresBn: ['নির্বাচিত কাজ', 'ক্যারিয়ার', 'মাঠ-লেখনী'],
    emoji: '🌿',
    kind: 'portfolio',
  },
  {
    id: 'pesticidenext',
    url: 'https://pesticide.krishiai.live/',
    image: 'https://pesticide.krishiai.live/og-image.png',
    alt: 'পেস্টিসাইডনেক্সট (PesticideNext) — পরের স্প্রে, আর ভুল হবে না।',
    titleEn: 'PesticideNext — this app',
    titleBn: 'পেস্টিসাইডনেক্সট — এই অ্যাপ',
    summaryEn:
      'Registered pesticide directory on the public DAE register — search, MoA rotation planner, dosage calculator, PPE checklists.',
    summaryBn:
      'DAE-এর প্রকাশ্য নিবন্ধন তালিকার বালাইনাশক ডিরেক্টরি — সার্চ, MoA ঘূর্ণন পরিকল্পনা, ডোজ ক্যালকুলেটর, PPE চেকলিস্ট।',
    purposeEn:
      'The app you are inside right now: find the right registered chemical for a crop-pest pair, plan MoA rotation, calculate tank mixes and stay compliant with alerts.',
    purposeBn:
      'যে অ্যাপটিতে এখন আছেন: ফসল-পোকার জোড়ায় সঠিক নিবন্ধিত ওষুধ খুঁজুন, MoA ঘোরান পরিকল্পনা করুন, ট্যাংক মিক্স হিসাব করুন, সতর্কতায় থাকুন।',
    featuresEn: ['DAE registered database', 'MoA rotation', 'Tank calculator', 'Compliance alerts'],
    featuresBn: ['DAE নিবন্ধিত ডাটাবেস', 'MoA ঘোরান', 'ট্যাংক ক্যালকুলেটর', 'নিয়ন্ত্রক সতর্কতা'],
    emoji: '🌾',
    kind: 'self',
    badgeEn: 'This app',
    badgeBn: 'এই অ্যাপ',
  },
];
