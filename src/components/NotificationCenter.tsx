import React, { useState } from 'react';
import { RegulatoryAlert } from '../types';
import {
  Bell,
  BellRing,
  ShieldAlert,
  Send,
  Plus,
  Trash2,
  Sprout,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Megaphone,
  Flower2,
  Calendar,
  FileText,
} from 'lucide-react';
import {
  requestPushPermission,
  triggerAlertNotification,
  sendPushNotification,
} from '../utils/notifications';
import { useLanguage } from '../context/LanguageContext';
import { CollapsibleUserGuide } from './CollapsibleUserGuide';
import './NotificationCenter.css';
import './pn-tokens.css';

interface NotificationCenterProps {
  alerts: RegulatoryAlert[];
  onMarkRead: (id: string) => void;
  onAddCustomAlert: (alert: RegulatoryAlert) => void;
  onDeleteAlert?: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  alerts,
  onMarkRead,
  onAddCustomAlert,
  onDeleteAlert
}) => {
  const { language, transCrop, formatNum } = useLanguage();
  const bn = language === 'bn';
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'regulatory' | 'seasonal'>('all');
  const [permissionStatus, setPermissionStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [headOpen, setHeadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'regulatory' | 'seasonal'>('seasonal');
  const [newSeverity, setNewSeverity] = useState<'high' | 'medium' | 'info'>('medium');
  const [newCrops, setNewCrops] = useState('ধান');
  const [newSummary, setNewSummary] = useState('');
  const [newDetails, setNewDetails] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRequestPermission = async () => {
    const res = await requestPushPermission();
    setPermissionStatus(res);
    if (res === 'granted') {
      showToast(
        bn ? 'পুশ নোটিফিকেশন সফলভাবে চালু করা হয়েছে!' : 'Push notifications successfully enabled on your device!'
      );
      sendPushNotification(
        bn
          ? 'পেস্টিসাইডনেক্সট: সরকারি নির্দেশিকা ও মৌসুমী সতর্কতা সক্রিয়'
          : 'PesticideNext Compliance & Seasonal Alerts Activated',
        {
          body: bn
            ? 'আপনি গুরুত্বপূর্ণ সরকারি প্রবিধান ও আঞ্চলিক বালাই আবির্ভাব সতর্কতা পাবেন।'
            : 'You will receive critical regulatory updates and regional pest emergence warnings.'
        }
      );
    } else {
      showToast(
        bn
          ? 'ব্রাউজারে নোটিফিকেশন অনুমতি বাতিল বা ব্লক করা হয়েছে।'
          : 'Notification permission was declined or blocked in browser settings.'
      );
    }
  };

  const handleTriggerTestPush = () => {
    const success = sendPushNotification(
      bn
        ? 'পেস্টিসাইডনেক্সট নমুনা সতর্কতা: মৌসুমী বালাই পরামর্শ'
        : 'PesticideNext Test Alert: Seasonal Pest Advisory',
      {
        body: bn
          ? 'আপনার এলাকার ধানে বাদামি গাছফড়িং (BPH) দেখা গেছে। গোছা ফাঁক করে গাছের গোড়া পরীক্ষা করুন।'
          : 'Brown Plant Hopper (BPH) activity reported in your regional rice clusters. Inspect plant base.'
      }
    );
    if (success) {
      showToast(bn ? 'পুশ অ্যালার্ট আপনার ডিভাইসে পাঠানো হয়েছে!' : 'Push alert sent to your notification tray!');
    } else {
      showToast(
        bn
          ? 'সতর্কতা: ডিভাইসে সরাসরি পুশ পেতে উপরের বাটন চেপে ব্রাউজার নোটিফিকেশন অনুমতি দিন।'
          : 'Notice: Displaying in-app alert. Enable browser push permission above for desktop/mobile tray push.'
      );
    }
  };

  const handleSendSingleAlert = (alert: RegulatoryAlert) => {
    onMarkRead(alert.id);
    const pushed = triggerAlertNotification(alert);
    if (pushed) {
      showToast(
        bn ? `পুশ নোটিফিকেশন পাঠানো হয়েছে: "${alert.title}"` : `Push alert sent: "${alert.title}"`
      );
    } else {
      showToast(
        bn ? `সতর্কবার্তা সক্রিয় করা হয়েছে: "${alert.title}"` : `Alert triggered: "${alert.title}"`
      );
    }
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const custom: RegulatoryAlert = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      severity: newSeverity,
      date: new Date().toISOString().split('T')[0],
      targetCrops: newCrops.split(',').map((c) => c.trim()),
      summary: newSummary,
      details: newDetails || newSummary,
      actionRequired: bn
        ? 'পেস্টিসাইডনেক্সট গাইডবুকের কৃষিবিদ পরামর্শ মেনে চলুন।'
        : 'Follow agronomic recommendations in the PesticideNext Guidebook.',
      read: false
    };

    onAddCustomAlert(custom);
    triggerAlertNotification(custom);
    showToast(
      bn ? 'নতুন মৌসুমী সতর্কতা নির্ধারিত ও পাঠানো হয়েছে!' : 'New seasonal application alert scheduled and dispatched!'
    );
    setNewTitle('');
    setNewSummary('');
    setNewDetails('');
    setShowAddForm(false);
  };

  const filteredAlerts = alerts.filter((a) => {
    if (selectedFilter === 'all') return true;
    return a.category === selectedFilter;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;
  const regCount = alerts.filter((a) => a.category === 'regulatory').length;
  const seaCount = alerts.filter((a) => a.category === 'seasonal').length;
  const highCount = alerts.filter((a) => a.severity === 'high').length;

  // ---------------------------------------------------------------- bilingual
  const copy = bn
    ? {
        eyebrow: 'সরকারি নজরদারি ও ফিল্ড টেলিমেট্রি পুশ অ্যালার্ট',
        h1a: 'নিয়ন্ত্রণ আদেশ আসবে —',
        h1b: 'আপনাকে অবাক করবে না।',
        lede:
          'প্রতিটি মৌসুমে নতুন নিষেধাজ্ঞা, নতুন পোকা আক্রমণ, নতুন আবহাওয়া সতর্কতা — কৃষকের কাছে এগুলো অপ্রত্যাশিত নয়, শুধু তাকে আগে জানানো দরকার। এই ফিড সেই জানানোর জায়গা।',
        ctaEnable: 'পুশ নোটিফিকেশন চালু করুন',
        ctaTest: 'নমুনা পুশ পাঠান',
        ctaNew: 'নতুন কাস্টম সতর্কতা যুক্ত করুন',
        ctaCancel: 'বাতিল করুন',
        ctaPush: 'পুশ অ্যালার্ট পাঠান',
        ctaSave: 'সংরক্ষণ ও পুশ সম্প্রচার',
        ctaDelete: 'মুছে ফেলুন',
        trust1: 'সকল নিয়ন্ত্রক আদেশ ও মৌসুমী সতর্কতা এখানেই সংরক্ষিত থাকে।',
        trust2: 'ব্রাউজার পুশ চালু থাকলে অফলাইনেও আপনার ডিভাইসে সরাসরি আসবে।',
        stickerKicker: 'এই মুহূর্তে ফিডে',
        sticker1Foot: 'অপঠিত সতর্কবার্তা',
        sticker2Foot: 'সরকারি প্রবিধান',
        sticker3Foot: 'মৌসুমী পূর্বাভাস',
        sticker4Foot: 'জরুরি অগ্রাধিকার',
        stickerFoot: 'প্রতিটি আইটেম আপনার ফিল্ড ক্যালেন্ডারে যুক্ত হয়।',
        stat1Value: `${formatNum(alerts.length)}`,
        stat1Label: 'মোট সতর্কবার্তা',
        stat1Detail: 'নিয়ন্ত্রক · মৌসুমী',
        stat2Value: `${formatNum(unreadCount)}`,
        stat2Label: 'অপঠিত',
        stat2Detail: 'এখনো পড়া হয়নি',
        stat3Value: `${formatNum(highCount)}`,
        stat3Label: 'জরুরি অগ্রাধিকার',
        stat3Detail: 'অবিলম্বে পদক্ষেপ',
        stat4Value: bn ? 'PWA' : 'PWA',
        stat4Label: 'অফলাইন পুশ',
        stat4Detail: 'সার্ভিস ওয়ার্কার',
        filterAll: `সকল বার্তা`,
        filterReg: `সরকারি প্রবিধান`,
        filterSea: `মৌসুমী পূর্বাভাস`,
        permOk: 'ব্রাউজার পুশ নোটিফিকেশন সক্রিয় রয়েছে',
        formKicker: 'কাস্টম সতর্কতা নির্ধারণ',
        formTitle: 'নিজের মৌসুমী বা নিয়ন্ত্রক সতর্কবার্তা তৈরি করুন।',
        formSub: 'প্রতিটি কাস্টম সতর্কতা স্থানীয় মাঠকর্মীদের কাছে পুশ হিসেবে সম্প্রচারিত হয়।',
        formLabelTitle: 'সতর্কবার্তার শিরোনাম',
        formLabelCat: 'ক্যাটাগরি',
        formLabelCrops: 'প্রযোজ্য ফসল (কমা দিয়ে লিখুন)',
        formLabelSev: 'গুরুত্বের মাত্রা',
        formLabelSummary: 'সংক্ষিপ্ত সারসংক্ষেপ',
        formLabelDetails: 'বিস্তারিত দিকনির্দেশনা ও করণীয়',
        formSevHigh: 'উচ্চ গুরুত্ব (জরুরি পদক্ষেপ আবশ্যক)',
        formSevMed: 'মাঝারি গুরুত্ব (পরামর্শ)',
        formSevInfo: 'সাধারণ তথ্য',
        formCatSea: 'মৌসুমী প্রয়োগ সতর্কতা',
        formCatReg: 'সরকারি প্রবিধান ও কমপ্লায়েন্স',
        formPhTitle: 'যেমন: কুমিল্লা অঞ্চলে ধানে প্রাথমিক ব্লাস্ট রোগের প্রাদুর্ভাব',
        formPhCrops: 'ধান, আলু, পাট',
        formPhSummary: '১ লাইনের সংক্ষিপ্ত নির্দেশনামূলক বিবরণ',
        formPhDetails: 'প্রস্তাবিত বালাইনাশক, স্প্রে সময় ও সতর্কতা...',
        sevHigh: 'জরুরি অগ্রাধিকার',
        sevMed: 'পরামর্শমূলক',
        sevInfo: 'সাধারণ তথ্য',
        catReg: 'সরকারি প্রবিধান',
        catSea: 'মৌসুমী সতর্কতা',
        actionLabel: 'জরুরি পদক্ষেপ:',
        emptyTitle: 'এই ফিল্টারে কোনো সতর্কবার্তা নেই।',
        emptyDesc: 'অন্য ক্যাটাগরি বেছে নিন বা নতুন কাস্টম সতর্কবার্তা যোগ করুন।'
      }
    : {
        eyebrow: 'Compliance Watch & Field Telemetry Push Alerts',
        h1a: 'Regulations will land —',
        h1b: "they won't surprise you.",
        lede:
          'Every season brings new bans, new pest outbreaks, new weather advisories — to a farmer these are never unexpected, they only need to be told ahead of time. This feed is where the telling happens.',
        ctaEnable: 'Enable device push notifications',
        ctaTest: 'Send sample field alert',
        ctaNew: 'Schedule custom alert',
        ctaCancel: 'Cancel new alert',
        ctaPush: 'Send push alert',
        ctaSave: 'Broadcast & save alert',
        ctaDelete: 'Delete reminder',
        trust1: 'Every regulatory mandate and seasonal warning is archived here.',
        trust2: 'With browser push enabled, alerts land directly on your device, even offline.',
        stickerKicker: 'Live in your feed',
        sticker1Foot: 'unread alerts',
        sticker2Foot: 'regulatory mandates',
        sticker3Foot: 'seasonal early warnings',
        sticker4Foot: 'high-priority items',
        stickerFoot: 'Every item maps onto your field calendar.',
        stat1Value: `${formatNum(alerts.length)}`,
        stat1Label: 'total alerts',
        stat1Detail: 'regulatory · seasonal',
        stat2Value: `${formatNum(unreadCount)}`,
        stat2Label: 'unread',
        stat2Detail: 'still pending review',
        stat3Value: `${formatNum(highCount)}`,
        stat3Label: 'high priority',
        stat3Detail: 'immediate action',
        stat4Value: 'PWA',
        stat4Label: 'offline push',
        stat4Detail: 'service worker',
        filterAll: 'All alerts',
        filterReg: 'Regulatory compliance',
        filterSea: 'Seasonal early warnings',
        permOk: 'Browser push notifications are active',
        formKicker: 'Schedule a custom alert',
        formTitle: 'Compose your own seasonal or compliance notice.',
        formSub: 'Each custom alert is dispatched as a push to the local agronomy team.',
        formLabelTitle: 'Alert title',
        formLabelCat: 'Category',
        formLabelCrops: 'Target crops (comma separated)',
        formLabelSev: 'Severity level',
        formLabelSummary: 'Brief summary',
        formLabelDetails: 'Detailed guidance & instructions',
        formSevHigh: 'High Severity (Immediate Attention)',
        formSevMed: 'Medium Severity (Advisory)',
        formSevInfo: 'Informational Notification',
        formCatSea: 'Seasonal Application Alert',
        formCatReg: 'Regulatory Compliance Notice',
        formPhTitle: 'e.g., Early Blast Sighting Warning in Comilla District',
        formPhCrops: 'Rice, Potato, Jute',
        formPhSummary: 'Short 1-sentence action summary',
        formPhDetails: 'Recommended actions, chemicals, and timing...',
        sevHigh: 'High priority',
        sevMed: 'Medium advisory',
        sevInfo: 'Information',
        catReg: 'Regulatory',
        catSea: 'Seasonal',
        actionLabel: 'Action Required:',
        emptyTitle: 'No alerts in this filter.',
        emptyDesc: 'Pick another category or schedule a new custom alert.'
      };

  return (
    <div className="acg-al pn-tokens" id="notifications-view">
      {/* toast popup */}
      {toastMessage && (
        <div className="acg-al-toast">
          <BellRing size={18} color="#e3b341" />
          <span style={{ fontSize: 12, lineHeight: 1.5 }}>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="acg-al-toast__close"
            aria-label="close"
          >
            ✕
          </button>
        </div>
      )}

      {/* -------------------------- header (editorial hero) */}
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
                <li><ShieldAlert size={14} /> {copy.trust1}</li>
                <li><BellRing size={14} /> {copy.trust2}</li>
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

          {/* desktop sticker: live counts */}
          <aside className="pn-sticker">
            <p className="pn-sticker__kicker">{copy.stickerKicker}</p>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">{formatNum(unreadCount)}</span>
              <Megaphone size={14} color="#f42a41" />
              <span className="pn-sticker__label">{copy.sticker1Foot}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">{formatNum(regCount)}</span>
              <ShieldAlert size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker2Foot}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">{formatNum(seaCount)}</span>
              <Sprout size={14} color="#006a4e" />
              <span className="pn-sticker__label">{copy.sticker3Foot}</span>
            </div>
            <div className="pn-sticker__row">
              <span className="pn-sticker__num">{formatNum(highCount)}</span>
              <BellRing size={14} color="#e3b341" />
              <span className="pn-sticker__label">{copy.sticker4Foot}</span>
            </div>
            <p className="pn-sticker__foot">
              <Calendar size={14} /> {copy.stickerFoot}
            </p>
          </aside>
        </div>
      </section>

      {/* -------------------------- stats band */}
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

      {/* -------------------------- main panels */}
      <section className="pn-shell acg-al-panels">
        {/* Collapsible User Guide */}
        <div className="acg-guide-wrap">
          <CollapsibleUserGuide
            pageKey="alerts"
            titleEn="Compliance & Seasonal Alerting Manual"
            titleBn="কমপ্লায়েন্স ও মৌসুমী সতর্কীকরণ নির্দেশিকা"
            subtitleEn="Learn how browser push notifications and regulatory updates guard crop health."
            subtitleBn="ব্রাউজার পুশ নোটিফিকেশন ও নতুন সরকারি প্রবিধান কীভাবে ফসলের সুরক্ষা নিশ্চিত করে তা জানুন।"
            stepsEn={[
              "Click 'Enable Device Push Notifications' to receive instant offline alerts on banned pesticides or sudden pest outbreaks.",
              "Click 'Send Sample Field Alert' to trigger an immediate browser test notification on your screen.",
              "Filter alerts using the category chips: All, Regulatory (compliance & bans), or Seasonal (pest warnings).",
              "Select any active alert card to expand, marking it as read and noting the required field action.",
              "Use 'Schedule Custom Alert' to create pest early warnings for Rice Blast, Late Blight, or sudden crop outbreaks."
            ]}
            stepsBn={[
              "নিষিদ্ধ বালাইনাশক বা আকস্মিক পোকার আক্রমণ সম্পর্কিত অফলাইন পুশ নোটিফিকেশন পেতে 'পুশ নোটিফিকেশন চালু করুন' এ ক্লিক করুন।",
              "তাত্ক্ষণিকভাবে আপনার স্ক্রিনে একটি ব্রাউজার টেস্ট নোটিফিকেশন পরীক্ষা করতে 'নমুনা পুশ অ্যালার্ট পাঠান' এ ক্লিক করুন।",
              "অ্যালার্টগুলো ফিল্টার করতে অল, রেগুলেটরি (সরকারি নিষেধাজ্ঞা ও আইন) বা মৌসুমী (বালাই ও রোগ আক্রমণ সতর্কতা) ক্যাটাগরি বেছে নিন।",
              "যেকোনো সক্রিয় অ্যালার্টে ক্লিক করে বিস্তারিত পড়ুন এবং মাঠে কী করণীয় তা জেনে নিন।",
              "ধানের ব্লাস্ট, আলুর লেট ব্লাইট বা আবহাওয়াজনিত বালাই সতর্কতা তৈরি করতে 'কাস্টম সতর্কতা যুক্ত করুন' ফর্মটি ব্যবহার করুন।"
            ]}
            proTipsEn={[
              'Regulatory compliance keeps farmers safe from exporting residue-heavy crops. Match alerts against your database selections.',
              'Push notifications work 100% offline using standard browser Service Workers if installed as a PWA on your device.'
            ]}
            proTipsBn={[
              'কমপ্লায়েন্স মেনে চললে অতিরিক্ত বালাইনাশকের অবশিষ্টাংশ মুক্ত রফতানিযোগ্য ফসল উৎপাদন করা সম্ভব হয়।',
              'আপনার ডিভাইসে পিডব্লিউএ (PWA) ইনস্টল করা থাকলে স্ট্যান্ডার্ড ব্রাউজার সার্ভিস ওয়ার্কারের মাধ্যমে অফলাইনেও পুশ অ্যালার্ট কাজ করবে।'
            ]}
          />
        </div>

        {/* Permission banner */}
        <div className="acg-al-perm">
          {permissionStatus === 'granted' ? (
            <span className="acg-al-perm__ok">
              <CheckCircle2 size={14} /> {copy.permOk}
            </span>
          ) : (
            <div className="acg-al-perm__ok" style={{ color: 'var(--red-800)' }}>
              <Bell size={14} color="#f42a41" /> {bn ? 'পুশ নোটিফিকেশন এখনো বন্ধ আছে' : 'Push notifications are off'}
            </div>
          )}
          <div className="acg-al-perm__row">
            {permissionStatus !== 'granted' && (
              <button type="button" className="pn-btn" onClick={handleRequestPermission}>
                <Bell size={14} /> {copy.ctaEnable}
              </button>
            )}
            <button type="button" className="pn-btn pn-btn--outline" onClick={handleTriggerTestPush}>
              <Send size={14} /> {copy.ctaTest}
            </button>
            <button
              type="button"
              className={`pn-btn ${showAddForm ? 'pn-btn--red' : 'pn-btn--gold'}`}
              onClick={() => setShowAddForm((v) => !v)}
            >
              <Plus size={14} /> {showAddForm ? copy.ctaCancel : copy.ctaNew}
            </button>
          </div>
        </div>

        {/* Custom alert form */}
        {showAddForm && (
          <form className="acg-al-form" onSubmit={handleCreateAlert}>
            <div className="pn-card__kicker">{copy.formKicker}</div>
            <h2 className="pn-card__title">{copy.formTitle}</h2>
            <p className="pn-card__sub">{copy.formSub}</p>

            <div className="acg-al-form__grid">
              <div className="acg-al-form__row--full">
                <label className="acg-al-form__label">{copy.formLabelTitle}</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={copy.formPhTitle}
                  className="acg-al-form__input"
                />
              </div>
              <div>
                <label className="acg-al-form__label">{copy.formLabelCat}</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="acg-al-form__select"
                >
                  <option value="seasonal">{copy.formCatSea}</option>
                  <option value="regulatory">{copy.formCatReg}</option>
                </select>
              </div>
              <div>
                <label className="acg-al-form__label">{copy.formLabelSev}</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as any)}
                  className="acg-al-form__select"
                >
                  <option value="high">{copy.formSevHigh}</option>
                  <option value="medium">{copy.formSevMed}</option>
                  <option value="info">{copy.formSevInfo}</option>
                </select>
              </div>
              <div className="acg-al-form__row--full">
                <label className="acg-al-form__label">{copy.formLabelCrops}</label>
                <input
                  type="text"
                  value={newCrops}
                  onChange={(e) => setNewCrops(e.target.value)}
                  placeholder={copy.formPhCrops}
                  className="acg-al-form__input"
                />
              </div>
              <div className="acg-al-form__row--full">
                <label className="acg-al-form__label">{copy.formLabelSummary}</label>
                <input
                  type="text"
                  required
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder={copy.formPhSummary}
                  className="acg-al-form__input"
                />
              </div>
              <div className="acg-al-form__row--full">
                <label className="acg-al-form__label">{copy.formLabelDetails}</label>
                <textarea
                  rows={2}
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder={copy.formPhDetails}
                  className="acg-al-form__textarea"
                />
              </div>
            </div>

            <div className="acg-al-form__foot">
              <button
                type="button"
                className="pn-linkbtn pn-linkbtn--muted"
                onClick={() => setShowAddForm(false)}
              >
                {copy.ctaCancel}
              </button>
              <button type="submit" className="pn-btn">
                <Sparkles size={14} /> {copy.ctaSave}
              </button>
            </div>
          </form>
        )}

        {/* Filter chips */}
        <div className="acg-al-filters">
          <button
            type="button"
            className={`acg-al-filter ${selectedFilter === 'all' ? 'acg-al-filter--active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            {copy.filterAll} <span className="acg-al-filter__count">{formatNum(alerts.length)}</span>
          </button>
          <button
            type="button"
            className={`acg-al-filter ${selectedFilter === 'regulatory' ? 'acg-al-filter--active' : ''}`}
            onClick={() => setSelectedFilter('regulatory')}
          >
            <ShieldAlert size={12} /> {copy.filterReg}{' '}
            <span className="acg-al-filter__count">{formatNum(regCount)}</span>
          </button>
          <button
            type="button"
            className={`acg-al-filter ${selectedFilter === 'seasonal' ? 'acg-al-filter--active' : ''}`}
            onClick={() => setSelectedFilter('seasonal')}
          >
            <Sprout size={12} /> {copy.filterSea} <span className="acg-al-filter__count">{formatNum(seaCount)}</span>
          </button>
        </div>

        {/* Alert feed */}
        <div className="acg-al-feed">
          {filteredAlerts.length === 0 && (
            <div className="pn-card pn-card--red">
              <div className="pn-card__kicker">{copy.emptyTitle}</div>
              <p className="pn-card__sub">{copy.emptyDesc}</p>
            </div>
          )}
          {filteredAlerts.map((alert) => {
            const isHigh = alert.severity === 'high';
            const isReg = alert.category === 'regulatory';
            const sevClass =
              alert.severity === 'high'
                ? ''
                : alert.severity === 'medium'
                ? 'acg-al-card__sev--med'
                : 'acg-al-card__sev--info';
            return (
              <article
                key={alert.id}
                className={`acg-al-card ${isReg ? 'acg-al-card--reg' : 'acg-al-card--sea'} ${
                  isHigh ? 'acg-al-card--high' : ''
                }`}
              >
                <div className="acg-al-card__head">
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                    <span className="acg-al-card__icon">
                      {isReg ? <ShieldAlert size={18} /> : <Sprout size={18} />}
                    </span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div className="acg-al-card__title-row">
                        <span className={`acg-al-card__sev ${sevClass}`}>
                          {alert.severity === 'high'
                            ? copy.sevHigh
                            : alert.severity === 'medium'
                            ? copy.sevMed
                            : copy.sevInfo}
                        </span>
                        <span className="acg-al-card__cat">{isReg ? copy.catReg : copy.catSea}</span>
                        <span className="acg-al-card__date">· {formatNum(alert.date)}</span>
                      </div>
                      <h3 className="acg-al-card__title">{alert.title}</h3>
                      <p className="acg-al-card__summary">{alert.summary}</p>
                    </div>
                  </div>
                </div>

                {alert.details && (
                  <div className="acg-al-card__body">
                    <p>{alert.details}</p>
                  </div>
                )}

                {alert.actionRequired && (
                  <div className="acg-al-card__action">
                    <b>{copy.actionLabel}</b>
                    {alert.actionRequired}
                  </div>
                )}

                {(alert.targetCrops?.length || alert.targetChemicals?.length) ? (
                  <div className="acg-al-card__tags">
                    {alert.targetCrops && alert.targetCrops.length > 0 && (
                      <>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {bn ? 'ফসল:' : 'Crops:'}
                        </span>
                        {alert.targetCrops.map((c, i) => (
                          <span key={i} className="acg-al-card__tag acg-al-card__tag--green">
                            {transCrop(c)}
                          </span>
                        ))}
                      </>
                    )}
                    {alert.targetChemicals && alert.targetChemicals.length > 0 && (
                      <>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginLeft: 'auto' }}>
                          {bn ? 'রাসায়নিক:' : 'Chemicals:'}
                        </span>
                        {alert.targetChemicals.map((chem, i) => (
                          <span key={i} className="acg-al-card__tag acg-al-card__tag--gold">
                            {chem}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                ) : null}

                <div className="acg-al-card__actions">
                  <button
                    type="button"
                    className="pn-btn"
                    onClick={() => handleSendSingleAlert(alert)}
                    title={copy.ctaPush}
                  >
                    <Send size={13} /> {copy.ctaPush}
                  </button>
                  {onDeleteAlert && alert.id.startsWith('custom-') && (
                    <button
                      type="button"
                      className="pn-linkbtn pn-linkbtn--muted"
                      onClick={() => onDeleteAlert(alert.id)}
                      title={copy.ctaDelete}
                    >
                      <Trash2 size={13} /> {copy.ctaDelete}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Official compliance disclaimer */}
        <div className="acg-al-disclaim" style={{
          marginTop: 24,
          background: 'var(--golden-tint)',
          border: '1px solid var(--golden-tint-line)',
          padding: '16px 18px',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start'
        }}>
          <ShieldAlert size={18} color="#8a6d1d" style={{ flex: 'none', marginTop: 2 }} />
          <div>
            <strong style={{
              display: 'block',
              fontFamily: 'var(--display)',
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--golden-ink)'
            }}>
              {bn ? 'সরকারি নিয়ন্ত্রণমূলক তথ্যসূত্র ও কমপ্লায়েন্স ডিসক্লেইমার' : 'Official Regulatory Reference & Compliance Disclaimer'}
            </strong>
            <p style={{
              marginTop: 4,
              fontSize: 11.5,
              lineHeight: 1.7,
              color: '#6b5a26'
            }}>
              {bn
                ? 'এই ফিডে প্রদর্শিত সরকারি আদেশ ও মৌসুমী সতর্কতাগুলো কৃষি সম্প্রসারণ অধিদপ্তর (DAE), উদ্ভিদ সংরক্ষণ উইং এবং আন্তর্জাতিক বালাইনাশক নিয়ন্ত্রণ সংস্থার প্রকাশিত নির্দেশিকা থেকে সংকলিত। এই অ্যালার্টগুলো শুধুমাত্র সাধারণ সতর্কীকরণের উদ্দেশ্যে — কোনো আইনি বা কৃষিবিদ পরামর্শের বিকল্প নয়। প্রতিটি মাঠ-স্তরের সিদ্ধান্তের আগে অবশ্যই নিকটস্থ উপ-সহকারী কৃষি কর্মকর্তা বা DAE ফিল্ড অফিসারের সাথে যোগাযোগ করুন এবং পণ্যের বর্তমান লেবেল যাচাই করুন।'
                : 'The regulatory mandates and seasonal advisories shown in this feed are compiled from official publications by the Department of Agricultural Extension (DAE), the Plant Protection Wing, and international pesticide stewardship organizations. These alerts are for general awareness only — they do not constitute legal or agronomic advice. Always consult with your local Sub-Assistant Agriculture Officer or DAE field officer before any field-level decision, and verify the current product label.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
