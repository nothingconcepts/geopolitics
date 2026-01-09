
import React from 'react';
import { theme } from '../theme';
import { translations } from '../translations';

interface Props {
  lang: 'en' | 'ar';
}

const NewsTicker: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  
  const headlines = lang === 'en' ? [
    "URGENT: LEVANT ENERGY CORRIDOR NEGOTIATIONS REACH STALEMATE",
    "MARKET ALERT: GLOBAL SHIPPING RATES SURGE 14% ON RED SEA TENSIONS",
    "TECH INTEL: NEW QUANTUM ENCRYPTION PROTOCOLS DETECTED IN SINGAPORE",
    "DIPLOMACY: RIYADH PROPOSES MULTILATERAL TRADE FRAMEWORK",
    "SECURITY: CYBER ATTACK ON BALTIC POWER GRID MITIGATED"
  ] : [
    "عاجل: مفاوضات ممر الطاقة في المشرق تصل إلى طريق مسدود",
    "تنبيه السوق: أسعار الشحن العالمية ترتفع بنسبة ١٤٪ بسبب توترات البحر الأحمر",
    "استخبارات التكنولوجيا: رصد بروتوكولات تشفير كمي جديدة في سنغافورة",
    "الدبلوماسية: الرياض تقترح إطار عمل تجاري متعدد الأطراف",
    "الأمن: التخفيف من هجوم سيبراني على شبكة الطاقة في البلطيق"
  ];

  return (
    <div className="bg-slate-100 dark:bg-black border-b border-slate-200 dark:border-slate-900 py-2 overflow-hidden whitespace-nowrap flex items-center h-10">
      <div 
        className="bg-brand-red text-white text-[9px] font-black px-4 py-1 z-10 uppercase tracking-widest flex items-center gap-2 h-full shrink-0"
      >
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
        {t.liveIntel}
      </div>
      <div className={`flex ${lang === 'ar' ? 'animate-marquee-rtl' : 'animate-marquee'} hover:pause-marquee`}>
        {[...headlines, ...headlines].map((text, i) => (
          <span key={i} className="text-slate-500 dark:text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mx-10">
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 50s linear infinite;
        }
        .animate-marquee-rtl {
          display: inline-flex;
          animation: marquee-rtl 50s linear infinite;
        }
        .pause-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
