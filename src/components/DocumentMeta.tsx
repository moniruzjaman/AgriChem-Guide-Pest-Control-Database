import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppTab } from '../types';

const THEME_COLOR: Record<AppTab, string> = {
  home: '#006a4e',
  database: '#006a4e',
  calculator: '#006a4e',
  rotation: '#f42a41',
  safety: '#006a4e',
  guidebook: '#006a4e',
  alerts: '#f42a41',
  myfield: '#e3b341'
};

const TAB_META: Record<AppTab, {
  en: { title: string; description: string };
  bn: { title: string; description: string };
}> = {
  home: {
    en: {
      title: 'PesticideNext — পরের স্প্রে, আর ভুল হবে না।',
      description: '5,052+ DAE pesticides, MoA rotation, tank calculator, and pocket book for Bangladesh.'
    },
    bn: {
      title: 'পেস্টিসাইডনেক্সট — পরের স্প্রে, আর ভুল হবে না।',
      description: 'বাংলাদেশের মাঠ ফসলের জন্য ৫,০৫২+ DAE বালাইনাশক, MoA রোটেশন, ট্যাংক ক্যালকুলেটর ও পকেট বুক।'
    }
  },
  database: {
    en: {
      title: 'PesticideNext — Crop Chemical Database',
      description: 'Find DAE-registered pesticides, MoA codes, formulations, PHI and target pests with registered dosage rates.'
    },
    bn: {
      title: 'পেস্টিসাইডনেক্সট — রাসায়নিক ডাটাবেস',
      description: 'ফসল, বালাই, ট্রেড নাম ও MoA কোড দিয়ে ডিএই নিবন্ধিত বালাইনাশক খুঁজুন। পকেট বুক গাইড ডাউনলোড করুন।'
    }
  },
  calculator: {
    en: {
      title: 'PesticideNext — Dosage & Tank Mix Calculator',
      description: 'Knapsack sprayer tank calibration, dosage rates, water volume, and field area conversions.'
    },
    bn: {
      title: 'পেস্টিসাইডনেক্সট — মাত্রা ক্যালকুলেটর',
      description: 'ন্যাপস্যাক স্প্রেয়ার ট্যাংক মিশ্রণ, পানির পরিমাণ ও জমির আয়তন হিসাব করুন।'
    }
  },
  rotation: {
    en: {
      title: 'PesticideNext — MoA Rotation Planner',
      description: 'Build IRAC, FRAC, and HRAC spray sequences that break resistance.'
    },
    bn: {
      title: 'পেস্টিসাইডনেক্সট — MoA ঘূর্ণন পরিকল্পনা',
      description: 'প্রতিরোধ ভাঙতে IRAC, FRAC ও HRAC স্প্রে ক্রম তৈরি করুন।'
    }
  },
  safety: {
    en: {
      title: 'PesticideNext — Safety & PPE',
      description: 'WHO hazard bands, pre-spray PPE checklist, and first-aid protocols.'
    },
    bn: {
      title: 'পেস্টিসাইডনেক্সট — নিরাপত্তা ও পিপিই',
      description: 'ডব্লিউএইচও বিপদ শ্রেণি, স্প্রে-পূর্ব পিপিই চেকলিস্ট ও প্রাথমিক চিকিৎসা।'
    }
  },
  guidebook: {
    en: {
      title: 'PesticideNext — Pocket Book Guide',
      description: 'Download the A5 field pocket book: calibration, W.A.L.E.S., PHI, and crop tables.'
    },
    bn: {
      title: 'পেস্টিসাইডনেক্সট — পকেট বুক গাইড',
      description: 'A5 পকেট বুক ডাউনলোড করুন: ক্যালিব্রেশন, W.A.L.E.S., PHI ও ফসলভিত্তিক তালিকা।'
    }
  },
  alerts: {
    en: {
      title: 'PesticideNext — Regulatory Alerts',
      description: 'Seasonal pest warnings, restricted-use notices, and harvest-interval reminders.'
    },
    bn: {
      title: 'পেস্টিসাইডনেক্সট — নিয়ন্ত্রক সতর্কতা',
      description: 'মৌসুমি বালাই সতর্কতা, নিষিদ্ধ তালিকা ও ফসল তোলার বিরতি।'
    }
  },
  myfield: {
    en: {
      title: 'PesticideNext — My Field & Spray History',
      description: 'Log every spray. The app remembers which MoA group was used so the next spray can rotate — preventing resistance.'
    },
    bn: {
      title: 'পেস্টিসাইডনেক্সট — আমার জমি ও স্প্রে ইতিহাস',
      description: 'প্রতিটি স্প্রে লগ করুন। অ্যাপ মনে রাখবে কোন গ্রুপ ব্যবহার হয়েছে — যাতে পরবর্তী স্প্রে ঘূর্ণন করা যায় ও প্রতিরোধ গড়ে না ওঠে।'
    }
  }
};

function upsertMeta(selector: string, attrs: Record<string, string>, createTag: 'meta' | 'link' = 'meta') {
  let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    el = document.createElement(createTag);
    const [[key, value]] = Object.entries(attrs);
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    if (el && el.getAttribute(key) !== value) {
      el.setAttribute(key, value);
    }
  });
  return el;
}

function setNamedMeta(attr: 'name' | 'property', key: string, content: string) {
  upsertMeta(`meta[${attr}="${key}"]`, { [attr]: key, content });
}

function absUrl(path: string) {
  if (typeof window === 'undefined') return path;
  try {
    // Use window.location.href (not origin) as the base so that a subpath
    // deploy (e.g. /AgriChem-Guide-Pest-Control-Database/ on the raw
    // github.io URL) is preserved. Using `origin` alone would drop the
    // subpath and produce 404s for /og-image.png etc.
    return new URL(path, window.location.href).href;
  } catch {
    return path;
  }
}

export const DocumentMeta: React.FC<{ activeTab: AppTab }> = ({ activeTab }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const copy = TAB_META[activeTab]?.[language] || TAB_META.database[language];
    const appName = language === 'bn' ? 'পেস্টিসাইডনেক্সট' : 'PesticideNext';
    const theme = THEME_COLOR[activeTab] || '#059669';
    const iconPng = `/icons/apple-touch-default.png`;
    // PNG, not SVG: WhatsApp / Facebook / Messenger / LinkedIn silently
    // reject SVG for og:image, leaving the preview card without an image.
    // The matching 1200x630 PNG is generated by scripts/render-og-image.py
    // and lives at /og-image.png (single file — bn/en variants were always
    // byte-identical so they were consolidated).
    const ogImage = '/og-image.png';
    const ogImageAbs = absUrl(ogImage);
    const canonicalUrl = absUrl('/');
    const ogImageAlt = `${appName} — পরের স্প্রে, আর ভুল হবে না।`;

    document.title = copy.title;
    document.documentElement.lang = language === 'bn' ? 'bn' : 'en';

    setNamedMeta('name', 'description', copy.description);
    setNamedMeta('name', 'application-name', appName);
    setNamedMeta('name', 'apple-mobile-web-app-title', appName);
    setNamedMeta('name', 'apple-mobile-web-app-capable', 'yes');
    setNamedMeta('name', 'mobile-web-app-capable', 'yes');
    setNamedMeta('name', 'apple-mobile-web-app-status-bar-style', 'black-translucent');
    setNamedMeta('name', 'theme-color', theme);
    setNamedMeta('name', 'msapplication-TileColor', theme);
    setNamedMeta('name', 'msapplication-TileImage', iconPng);

    setNamedMeta('property', 'og:title', copy.title);
    setNamedMeta('property', 'og:description', copy.description);
    setNamedMeta('property', 'og:type', 'website');
    setNamedMeta('property', 'og:locale', language === 'bn' ? 'bn_BD' : 'en_US');
    setNamedMeta('property', 'og:locale:alternate', language === 'bn' ? 'en_US' : 'bn_BD');
    setNamedMeta('property', 'og:site_name', appName);
    setNamedMeta('property', 'og:url', canonicalUrl);
    setNamedMeta('property', 'og:image', ogImageAbs);
    // og:image:secure_url is defined statically in index.html pointing at
    // the production domain — rewrite it here too so it matches the actual
    // runtime origin (important if the app is viewed on a preview/staging URL).
    setNamedMeta('property', 'og:image:secure_url', ogImageAbs);
    setNamedMeta('property', 'og:image:alt', ogImageAlt);
    setNamedMeta('property', 'og:image:width', '1200');
    setNamedMeta('property', 'og:image:height', '630');
    setNamedMeta('property', 'og:image:type', 'image/png');

    // Twitter / X card meta tags. Although Twitter/X is no longer a share
    // priority (the share button was replaced with LinkedIn in PR #33),
    // opengraph.xyz and similar preview validators flag the absence of
    // twitter:card as a defect — and without it, Twitter/X falls back to
    // a tiny summary card instead of the large-image preview. Adding
    // these tags costs nothing and keeps the preview card rendering
    // correctly on every platform that respects Twitter's card spec.
    setNamedMeta('name', 'twitter:card', 'summary_large_image');
    setNamedMeta('name', 'twitter:title', copy.title);
    setNamedMeta('name', 'twitter:description', copy.description);
    setNamedMeta('name', 'twitter:image', ogImageAbs);
    setNamedMeta('name', 'twitter:image:alt', ogImageAlt);

    // Schema.org WebApplication JSON-LD
    let scriptEl = document.head.querySelector('script[type="application/ld+json"]');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptEl);
    }
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': appName,
      'applicationCategory': 'AgriculturalApplication',
      'operatingSystem': 'All',
      'description': copy.description,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'BDT'
      },
      'featureList': language === 'bn' ? [
        'DAE অনুমোদিত বালাইনাশক ডাটাবেস',
        'ন্যাপস্যাক স্প্রেয়ার মাত্রা ক্যালকুলেটর',
        'IRAC ও FRAC ক্রিয়া কৌশল প্রতিরোধ ঘূর্ণন',
        'WHO বিষাক্ততা ব্যান্ড ও PPE চেকলিস্ট',
        'W.A.L.E.S. ট্যাংক মিক্সিং ক্রম ফিল্ড গাইড'
      ] : [
        'DAE-Registered Pesticide Database',
        'Knapsack Sprayer Tank Dosage Calculator',
        'IRAC and FRAC Mode-of-Action Resistance Rotation',
        'WHO Toxicity Hazard Bands and PPE Checklist',
        'W.A.L.E.S. Tank Mixing Order Field Pocket Guidebook'
      ]
    };
    scriptEl.textContent = JSON.stringify(structuredData);

    document.querySelectorAll('link[rel="icon"][type="image/svg+xml"]').forEach((el) => el.remove());
    upsertMeta('link[rel="icon"][sizes="any"]', { rel: 'icon', sizes: 'any', href: '/favicon.ico' }, 'link');
    upsertMeta('link[rel="icon"][type="image/png"]', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }, 'link');
    // Remove any legacy unsized/SVG apple-touch-icon (iOS cannot render SVG).
    document.querySelectorAll('link[rel="apple-touch-icon"]:not([sizes])').forEach((el) => el.remove());
    upsertMeta('link[rel="apple-touch-icon"][sizes="120x120"]', { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-touch-icon-120.png' }, 'link');
    upsertMeta('link[rel="apple-touch-icon"][sizes="152x152"]', { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-touch-icon-152.png' }, 'link');
    upsertMeta('link[rel="apple-touch-icon"][sizes="167x167"]', { rel: 'apple-touch-icon', sizes: '167x167', href: '/icons/apple-touch-icon-167.png' }, 'link');
    upsertMeta('link[rel="apple-touch-icon"][sizes="180x180"]', { rel: 'apple-touch-icon', sizes: '180x180', href: iconPng }, 'link');
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl }, 'link');

    document.documentElement.style.setProperty('--app-theme', theme);
  }, [activeTab, language]);

  return null;
};
