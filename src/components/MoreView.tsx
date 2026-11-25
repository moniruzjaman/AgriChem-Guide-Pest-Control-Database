/**
 * MoreView.tsx
 * ============
 * The "More" tab: one place where every app in this ecosystem is visible
 * with its REAL og-image and a purpose statement — what the user can
 * actually DO in that app (read, listen, practise, reference…), so the
 * diagnostic ebook, the CABI learning app, the legal guide and the rest
 * are discoverable instead of hiding in the footer.
 *
 * Layout: intro strip + responsive card grid. Each card = og-image (with
 * gradient+emoji fallback on error) → title → summary → purpose →
 * feature chips → open button (new tab, rel=noopener). Cards stay
 * single-column on phones.
 */

import React from 'react';
import { ExternalLink, Sparkles, BookOpen, Headphones, GraduationCap, ShieldCheck, Tag } from 'lucide-react';
import { ECOSYSTEM_APPS, type EcosystemApp } from '../data/ecosystemApps';
import { useLanguage } from '../context/LanguageContext';
import { TabContentCollapsible } from './TabContentCollapsible';

/** Per-kind icon shown beside the card title. */
const KIND_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  diagnosis: BookOpen,
  legal: ShieldCheck,
  policy: Tag,
  portfolio: Sparkles,
  self: Sparkles,
};

const AppCard: React.FC<{ app: EcosystemApp }> = ({ app }) => {
  const { language } = useLanguage();
  const bn = language === 'bn';
  const title = bn ? app.titleBn : app.titleEn;
  const summary = bn ? app.summaryBn : app.summaryEn;
  const purpose = bn ? app.purposeBn : app.purposeEn;
  const features = bn ? app.featuresBn : app.featuresEn;
  const KindIcon = KIND_ICON[app.kind] ?? Sparkles;

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`ecosystem-app-${app.id}`}
      className="group rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg transition-all p-3 flex flex-col gap-3"
    >
      {/* Real og-image with graceful gradient+emoji fallback */}
      <div className="relative aspect-[1200/630] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-slate-100">
          <span className="text-4xl" aria-hidden>{app.emoji}</span>
        </div>
        <img
          src={app.image}
          alt={app.alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        {app.badgeEn && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-sm">
            {bn ? app.badgeBn : app.badgeEn}
          </span>
        )}
      </div>

      {/* Identity */}
      <div className="min-w-0 px-1">
        <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5 leading-snug">
          <KindIcon className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className="truncate">{title}</span>
          <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 opacity-60 group-hover:opacity-100 group-hover:text-emerald-600 transition-opacity" />
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{summary}</p>
      </div>

      {/* Purpose — what the user can DO in this app */}
      <div className="px-1 pt-0 pb-1">
        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1 mb-1">
          <GraduationCap className="w-3 h-3" />
          {bn ? 'এই অ্যাপে যা করবেন' : 'What you do here'}
        </p>
        <p className="text-[11px] text-slate-600 leading-relaxed">{purpose}</p>
      </div>

      {/* Feature chips */}
      <div className="px-1 pb-1 flex flex-wrap gap-1.5">
        {features.map((f) => (
          <span
            key={f}
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap"
          >
            {f.toLowerCase().includes('listen') || f.includes('শোনার') ? (
              <Headphones className="w-2.5 h-2.5 inline-block mr-0.5 -mt-0.5 text-emerald-600" />
            ) : null}
            {f}
          </span>
        ))}
      </div>
    </a>
  );
};

export const MoreView: React.FC = () => {
  const { language } = useLanguage();
  const bn = language === 'bn';

  return (
    <TabContentCollapsible
      tab="more"
      title={bn ? 'সব অ্যাপ এক জায়গায়' : 'All apps in one place'}
      subtitle={bn ? 'ডায়াগনোসিস · আইন · নীতি — উদ্দেশ্যসহ' : 'Diagnosis · Law · Policy — with purposes'}
    >
      {/* Intro — tell the user what this tab is for */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 mb-4">
        <h1 className="text-base font-bold text-emerald-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          {bn ? 'সম্পর্কিত সব অ্যাপ — উদ্দেশ্য সহ' : 'Companion apps — with their purposes'}
        </h1>
        <p className="text-xs text-emerald-900/80 leading-relaxed mt-1.5">
          {bn
            ? 'এই ডিজিটাল বাস্তুতন্ত্রের প্রতিটি অ্যাপ আলাদা কাজের জন্য তৈরি। কার্ডের ছবি প্রতিটি অ্যাপের নিজের প্রকৃত প্রিভিউ (og-image); নিচের বর্ণনা বলে ওই অ্যাপে আপনি ঠিক কী করতে পারবেন — পড়া, শোনা, অনুশীলন বা আইন জানা। প্রতিটি কার্ড নতুন ট্যাবে খোলে।'
            : 'Every app in this ecosystem is built for a distinct job. The card images are each app\u2019s real preview (og-image); the text below states exactly what you can do there — read, listen, practise or know the law. Each card opens in a new tab.'}
        </p>
      </div>

      {/* App cards — single column on phones, 2 on tablets, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {ECOSYSTEM_APPS.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </TabContentCollapsible>
  );
};

export default MoreView;
