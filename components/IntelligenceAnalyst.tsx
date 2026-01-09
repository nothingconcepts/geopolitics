
import React, { useState } from 'react';
import { getIntelligenceBriefing } from '../services/geminiService';

interface Props {
  lang: 'en' | 'ar';
  isDark: boolean;
}

const IntelligenceAnalyst: React.FC<Props> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const [briefing, setBriefing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setBriefing(null);
    try {
      const result = await getIntelligenceBriefing(query);
      setBriefing(result || '');
    } catch (err) {
      setBriefing("An unexpected failure occurred in the synthesis engine.");
    } finally {
      setLoading(false);
    }
  };

  const labels = {
    en: {
      title: 'Intelligence Synthesizer',
      desc: 'Real-time vector analysis powered by Gemini 3 Pro.',
      placeholder: "e.g. 'Levant Gas Security'...",
      btn: 'Generate Intel',
      processing: 'Synthesizing...',
      output: 'Encrypted Output'
    },
    ar: {
      title: 'محلل الاستخبارات',
      desc: 'تحليل المسارات في الوقت الفعلي مدعوم بـ Gemini 3 Pro.',
      placeholder: "مثال: 'أمن الغاز في المشرق'...",
      btn: 'توليد المعلومات',
      processing: 'جاري التحليل...',
      output: 'مخرجات مشفرة'
    }
  };

  const l = labels[lang];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden transition-all">
      <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} p-4 opacity-5 dark:opacity-10 pointer-events-none`}>
         <svg className="w-32 h-32 text-brand-red" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
      </div>

      <div className="flex flex-col md:flex-row md:items-end gap-8 mb-10 relative z-10">
        <div className="flex-grow">
          <h2 className="text-3xl font-serif font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{l.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{l.desc}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder={l.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-6 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-brand-red transition-all font-bold text-lg min-w-[300px] rounded-xl"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !query}
            className="bg-[#8e1a1a] hover:bg-[#7a1616] disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-black px-10 py-4 transition-all uppercase tracking-[0.2em] text-[10px] whitespace-nowrap shadow-lg rounded-xl flex items-center justify-center min-w-[160px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {l.processing}
              </span>
            ) : l.btn}
          </button>
        </div>
      </div>

      {briefing && (
        <div className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 p-10 rounded-xl animate-in fade-in slide-in-from-bottom-4 relative">
          <button 
            onClick={() => setBriefing(null)} 
            className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-slate-400 hover:text-brand-red transition-colors`}
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black text-brand-red border border-brand-red/30 px-3 py-1 uppercase tracking-[0.3em]">{l.output}</span>
            <div className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-800"></div>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-200 leading-relaxed font-serif text-xl italic selection:bg-brand-red/40 whitespace-pre-wrap">
            {briefing}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligenceAnalyst;
