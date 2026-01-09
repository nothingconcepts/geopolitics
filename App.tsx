
import React, { useState, useMemo, useEffect } from 'react';
import { Article, Category, FilterState } from './types';
import { MOCK_ARTICLES } from './constants';
import ArticleCard from './components/ArticleCard';
import IntelligenceAnalyst from './components/IntelligenceAnalyst';
import NewsTicker from './components/NewsTicker';
import { translations } from './translations';

type PageType = 'home' | 'geopolitics' | 'middle-east' | 'europe' | 'asia' | 'economy' | 'premium' | 'article';
type Language = 'en' | 'ar';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(true);
  
  const t = translations[lang];

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark');
      body.style.backgroundColor = '#020617';
    } else {
      body.classList.remove('dark');
      body.style.backgroundColor = '#f8fafc';
    }
  }, [isDark]);

  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    searchQuery: ''
  });

  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter(article => {
      const categoryMatch = filters.category === 'All' || article.category === filters.category;
      const searchMatch = article.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [filters]);

  const navigateToArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: PageType, categoryFilter: Category | 'All') => {
    setFilters(prev => ({ ...prev, category: categoryFilter, searchQuery: '' }));
    setCurrentPage(id);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bannerData = useMemo(() => ({
    home: {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
      title: t.banners.home.title,
      tagline: t.banners.home.tagline,
      label: t.activeMonitor
    },
    geopolitics: {
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=2070",
      title: t.banners.geopolitics.title,
      tagline: t.banners.geopolitics.tagline,
      label: t.commandPriority
    },
    'middle-east': {
      image: "https://images.unsplash.com/photo-1541410965313-5996e51ad18e?auto=format&fit=crop&q=80&w=2000",
      title: t.banners.middleEast.title,
      tagline: t.banners.middleEast.tagline,
      label: t.regionalIntel
    },
    europe: {
      image: "https://images.unsplash.com/photo-1467226632440-65f0b49574d9?auto=format&fit=crop&q=80&w=2070",
      title: t.banners.europe.title,
      tagline: t.banners.europe.tagline,
      label: t.securityFront
    },
    asia: {
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=2070",
      title: t.banners.asia.title,
      tagline: t.banners.asia.tagline,
      label: t.growthMatrix
    },
    economy: {
      image: "https://images.unsplash.com/photo-1611974717482-480928a6668a?auto=format&fit=crop&q=80&w=2070",
      title: t.banners.economy.title,
      tagline: t.banners.economy.tagline,
      label: t.financialCore
    },
    premium: {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
      title: t.banners.premium.title,
      tagline: t.banners.premium.tagline,
      label: t.level4Access
    }
  }), [t]);

  const renderHome = () => {
    const bannerKey = (currentPage === 'article' || !bannerData[currentPage]) ? 'home' : currentPage;
    const currentBanner = bannerData[bannerKey];

    return (
      <div className="space-y-20">
        <section className="relative h-[65vh] min-h-[450px] flex items-end p-10 md:p-16 rounded-[2.5rem] overflow-hidden group border border-slate-200 dark:border-slate-900 shadow-2xl w-full animate-in fade-in duration-700">
          <img 
            key={currentBanner.image}
            src={currentBanner.image} 
            alt={currentBanner.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] group-hover:scale-110 opacity-60 dark:opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 dark:from-slate-950 dark:via-slate-950/40 to-transparent"></div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-6 bg-slate-100/80 dark:bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-300 dark:border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#8e1a1a]"></span>
              <span className="font-black text-[9px] uppercase tracking-[0.5em] text-slate-800 dark:text-red-500">{currentBanner.label}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              {currentBanner.title}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
              {currentBanner.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigateToArticle(filteredArticles[0] || MOCK_ARTICLES[0])}
                className="bg-[#8e1a1a] text-white hover:opacity-90 transition-all font-black px-10 py-4 uppercase tracking-[0.3em] text-[10px] shadow-2xl rounded-xl flex items-center gap-3"
              >
                {t.accessBriefing}
                <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>
        </section>

        <IntelligenceAnalyst lang={lang} isDark={isDark} />

        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-8">
          <h2 className="text-2xl font-serif font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {t.latestVectors}
          </h2>
          <div className="relative group hidden md:block">
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 px-10 py-3 text-[10px] font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#8e1a1a] w-64 uppercase tracking-widest rounded-xl transition-all"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
            <svg className={`absolute ${lang === 'ar' ? 'right-3.5' : 'left-3.5'} top-3 w-4 h-4 text-slate-400 dark:text-slate-700 group-focus-within:text-[#8e1a1a] transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-32">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onSelect={navigateToArticle}
                lang={lang}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
              <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No intelligence matched your current search vectors.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderArticle = () => {
    if (!selectedArticle) return null;
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 animate-in fade-in duration-1000">
        <button 
          onClick={() => setCurrentPage('home')}
          className={`flex items-center gap-4 font-black text-[11px] uppercase tracking-[0.4em] mb-16 text-[#8e1a1a] hover:${lang === 'ar' ? 'translate-x-[10px]' : 'translate-x-[-10px]'} transition-transform`}
        >
          <svg className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          {t.backToTerminal}
        </button>
        <div className="mb-16">
          <div className="flex items-center gap-4 font-black text-[11px] uppercase tracking-[0.5em] mb-8 text-[#8e1a1a]">
            <div className="w-12 h-[2px] bg-[#8e1a1a]"></div>
            {selectedArticle.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-white mb-10 leading-tight tracking-tight">
            {selectedArticle.title}
          </h1>
          <div className={`flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 border-${lang === 'ar' ? 'r' : 'l'}-2 border-slate-200 dark:border-slate-800 ${lang === 'ar' ? 'pr' : 'pl'}-10 py-3`}>
            <span className="text-slate-700 dark:text-slate-200">{t.authoredBy} {selectedArticle.author}</span>
            <span className="text-slate-300 dark:text-slate-900">•</span>
            <span>{selectedArticle.date}</span>
            <span className="text-slate-300 dark:text-slate-900">•</span>
            <span className="text-[#8e1a1a]">{selectedArticle.readTime}</span>
          </div>
        </div>
        <div className="relative mb-20">
          <img 
            src={selectedArticle.imageUrl} 
            alt={selectedArticle.title} 
            className="w-full aspect-video object-cover shadow-2xl rounded-[2rem] opacity-100 dark:opacity-90 border border-slate-200 dark:border-slate-800"
          />
        </div>
        <div className="prose prose-slate dark:prose-invert prose-xl max-w-none text-slate-600 dark:text-slate-300 leading-relaxed font-serif selection:bg-[#8e1a1a]/30">
          <p className="text-2xl text-slate-900 dark:text-white font-black mb-12 leading-tight border-b border-slate-200 dark:border-slate-900 pb-12 italic">
            {selectedArticle.excerpt}
          </p>
          <p className="mb-10">
            The geopolitical implications of this shift extend beyond immediate economic metrics. Structural realignment is occurring across multiple nodes of power.
          </p>
          <blockquote className={`border-${lang === 'ar' ? 'r' : 'l'}-[8px] ${lang === 'ar' ? 'pr' : 'pl'}-10 my-16 italic text-3xl text-slate-900 dark:text-white font-black py-6 leading-tight bg-slate-100 dark:bg-slate-900/40 ${lang === 'ar' ? 'pl' : 'pr'}-10 rounded-${lang === 'ar' ? 'l' : 'r'}-[1.5rem] shadow-xl`} style={{ borderColor: '#8e1a1a' }}>
            "We are witnessing a profound reconfiguration of the global chessboard where traditional alliances are being tested by emerging digital and economic realities."
          </blockquote>
        </div>
      </div>
    );
  };

  const renderPremiumPlaceholder = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-950 rounded-[3rem] border border-slate-200 dark:border-slate-900 shadow-2xl">
      <div className="w-20 h-20 bg-red-900/10 rounded-full flex items-center justify-center mb-8 border border-red-900/20">
        <svg className="w-8 h-8 text-[#8e1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      </div>
      <h1 className="text-4xl font-serif font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">{t.accessRestricted}</h1>
      <p className="text-slate-500 font-bold uppercase tracking-[0.3em] max-w-xl text-[10px] leading-loose mb-10">{t.restrictedMsg}</p>
      <div className="flex gap-4">
        <button className="bg-[#8e1a1a] text-white px-10 py-4 font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:opacity-90 transition-all rounded-xl">
          {t.upgradeAccess}
        </button>
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white px-8 py-4 font-black uppercase tracking-[0.3em] text-[10px] rounded-xl"
        >
          {t.returnToDeck}
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="fixed top-0 w-full z-[60]">
        <div className="h-10 bg-slate-100 dark:bg-black border-b border-slate-200 dark:border-slate-900 px-6 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 overflow-hidden">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="hover:text-[#8e1a1a] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {lang === 'en' ? 'عربي' : 'English'}
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="hover:text-[#8e1a1a] transition-colors flex items-center gap-2"
            >
              {isDark ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                  Light
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  Dark
                </>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {t.operational}
          </div>
        </div>

        <NewsTicker lang={lang} />
        <header className="w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-900 h-24 flex items-center shadow-xl">
          <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
            <div 
              onClick={() => handleNavClick('home', 'All')}
              className="flex items-center gap-4 cursor-pointer group shrink-0"
            >
              <div className="flex items-center justify-center transition-all group-hover:scale-110">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8e1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H22" stroke="#8e1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 2C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="#8e1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="hidden xl:block">
                <h1 className="font-serif font-black text-2xl tracking-tighter leading-none text-slate-900 dark:text-white uppercase">{t.branding}</h1>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#8e1a1a]">{t.tagline}</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {[
                { id: 'geopolitics', label: t.nav.geopolitics, category: Category.GLOBAL },
                { id: 'middle-east', label: t.nav.middleEast, category: Category.MIDDLE_EAST },
                { id: 'europe', label: t.nav.europe, category: Category.GLOBAL },
                { id: 'asia', label: t.nav.asia, category: Category.GLOBAL },
                { id: 'economy', label: t.nav.economy, category: Category.ENERGY },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id as PageType, item.category as Category)} 
                  className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all py-3 border-b-2 hover:text-[#8e1a1a] ${
                    currentPage === item.id 
                      ? 'text-[#8e1a1a] border-[#8e1a1a]' 
                      : 'text-slate-500 border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-6 shrink-0">
              <button 
                onClick={() => setCurrentPage('premium')}
                className={`border text-white px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl rounded-xl ${currentPage === 'premium' ? 'bg-[#8e1a1a] border-[#8e1a1a]' : 'bg-slate-900 border-slate-800 hover:bg-[#8e1a1a]'}`}
              >
                {t.secrets}
              </button>
              <button className="lg:hidden text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-300 dark:border-slate-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      <main className="flex-grow container mx-auto px-6 md:px-12 pt-56 pb-32">
        {(currentPage === 'home' || currentPage === 'geopolitics' || currentPage === 'middle-east' || currentPage === 'europe' || currentPage === 'asia' || currentPage === 'economy') && renderHome()}
        {currentPage === 'article' && renderArticle()}
        {currentPage === 'premium' && renderPremiumPlaceholder()}
      </main>

      <footer className="bg-slate-100 dark:bg-black text-slate-900 dark:text-white py-32 border-t border-slate-200 dark:border-slate-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 border-b border-slate-200 dark:border-slate-900 pb-20 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-5 mb-10">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8e1a1a" strokeWidth="2"/>
                </svg>
                <h2 className="font-serif font-black text-3xl tracking-tighter uppercase">{t.branding}</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-600 text-[10px] font-black leading-[2] uppercase tracking-[0.3em] max-w-sm">
                Proprietary intelligence for global power shifts. Built for precision and uncompromising security.
              </p>
            </div>

            <div className="col-span-1">
              <h3 className="font-black text-[10px] uppercase tracking-[0.5em] mb-10 text-[#8e1a1a]">Vectors</h3>
              <ul className="space-y-6 text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-[#8e1a1a] transition-colors">{t.terminal}</button></li>
                <li><button onClick={() => setCurrentPage('premium')} className="hover:text-[#8e1a1a] transition-colors">{t.vault}</button></li>
                <li><a href="#" className="hover:text-[#8e1a1a] transition-colors">{t.contact}</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="font-black text-[10px] uppercase tracking-[0.5em] mb-10 text-[#8e1a1a]">Unit</h3>
              <ul className="space-y-6 text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">
                <li><a href="#" className="hover:text-[#8e1a1a] transition-colors">{t.security}</a></li>
                <li><a href="#" className="hover:text-[#8e1a1a] transition-colors">{t.privacy}</a></li>
                <li><a href="#" className="hover:text-[#8e1a1a] transition-colors">{t.press}</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] text-slate-400 dark:text-slate-800 font-black uppercase tracking-[0.4em]">
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              {t.operational} • {t.encrypted}
            </div>
            <div className="flex gap-10">
              <span>© 2024 AL JOUMHOURIA UNIT</span>
              <span>{t.branding} NETWORK</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
