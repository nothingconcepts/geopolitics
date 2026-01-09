
import React, { useState } from 'react';
import { getIntelligenceBriefing } from '../services/geminiService';

const IntelligenceAnalyst: React.FC = () => {
  const [query, setQuery] = useState('');
  const [briefing, setBriefing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setBriefing(null);
    const result = await getIntelligenceBriefing(query);
    setBriefing(result || '');
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-50">GeoPulse AI Analyst</h2>
          <p className="text-sm text-slate-400">Request an automated strategic intelligence briefing</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Enter a geopolitical topic (e.g., 'BRICS Expansion', 'Levant Gas Dispute')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
        />
        <button 
          onClick={handleGenerate}
          disabled={loading || !query}
          className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-slate-950 font-bold px-8 py-3 rounded-lg transition-colors whitespace-nowrap"
        >
          {loading ? 'Analyzing...' : 'Generate Briefing'}
        </button>
      </div>

      {briefing && (
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between items-center mb-4 pb-4 border-border border-b border-slate-800">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Classification: SECRET / INTERNAL USE ONLY</span>
            <button onClick={() => setBriefing(null)} className="text-slate-500 hover:text-slate-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-serif italic text-lg">
            {briefing}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligenceAnalyst;
