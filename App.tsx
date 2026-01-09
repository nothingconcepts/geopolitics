
import React, { useState, useMemo } from 'react';
import { Article, Category, Impact, FilterState, Job } from './types';
import { MOCK_ARTICLES, MOCK_JOBS } from './constants';
import ArticleCard from './components/ArticleCard';
import IntelligenceAnalyst from './components/IntelligenceAnalyst';

type PageType = 'home' | 'careers' | 'premium' | 'article' | 'experts' | 'podcasts' | 'videos';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
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
    if (article.isPremium && !isPremiumUser) {
      setCurrentPage('premium');
    } else {
      setSelectedArticle(article);
      setCurrentPage('article');
      window.scrollTo(0, 0);
    }
  };

  const renderHome = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end p-8 md:p-16 rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1521295121683-42157ee93cf7?auto=format&fit=crop&q=80&w=2070" 
          alt="World Map Geopolitics" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-block px-3 py-1 mb-4 bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-widest rounded">Featured Briefing</div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-slate-50 leading-tight">Strategic Realignment: The New Global Order.</h1>
          <p className="text-lg text-slate-200 mb-8 opacity-90 max-w-xl">Deep dive into how changing alliances in the Levant are creating a new world order beyond the Westphalian system.</p>
          <button 
            onClick={() => navigateToArticle(MOCK_ARTICLES[0])}
            className="bg-slate-50 text-slate-950 hover:bg-amber-500 hover:text-slate-950 transition-all font-bold px-8 py-4 rounded-lg flex items-center gap-2"
          >
            Read Analysis 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </section>

      {/* Intelligence Analyst AI Tool */}
      <IntelligenceAnalyst />

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-md py-4 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            {['All', ...Object.values(Category)].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: cat as any }));
                  setCurrentPage('home');
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filters.category === cat 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search intelligence database..."
              className="bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 w-full md:w-64"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {filteredArticles.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            onSelect={navigateToArticle} 
          />
        ))}
      </div>
    </div>
  );

  const renderArticle = () => {
    if (!selectedArticle) return null;
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
        <button 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Analysis
        </button>
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 mb-4 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
            {selectedArticle.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-50 mb-6 leading-tight">
            {selectedArticle.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="font-semibold text-slate-300">By {selectedArticle.author}</span>
            <span>•</span>
            <span>Published {selectedArticle.date}</span>
            <span>•</span>
            <span>{selectedArticle.readTime}</span>
          </div>
        </div>
        <img 
          src={selectedArticle.imageUrl} 
          alt={selectedArticle.title} 
          className="w-full aspect-video object-cover rounded-2xl mb-12 shadow-2xl"
        />
        <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed font-serif">
          <p className="text-xl text-slate-200 font-medium mb-8">
            {selectedArticle.excerpt}
          </p>
          <p>
            In the current geopolitical landscape, the strategic repositioning of regional actors has created a vacuum that both traditional and emerging powers are eager to fill. This analysis delves into the underlying mechanisms driving these shifts.
          </p>
          <h2 className="text-2xl font-bold text-slate-50 mt-12 mb-6">The Strategic Pivot</h2>
          <p>
            Contrary to conventional wisdom, the realignment is not merely a reaction to external pressures but a calculated long-term strategy aimed at achieving multi-vector stability. Our intelligence suggest that recent developments in maritime corridors are just the beginning of a broader economic transformation.
          </p>
          <blockquote className="border-l-4 border-amber-500 pl-6 my-10 italic text-2xl text-amber-50 font-medium bg-slate-900 py-8 pr-8 rounded-r-xl">
            "The era of single-bloc dependency is over. We are entering an age of fluid alliances dictated by energy security and technological sovereignty."
          </blockquote>
          <p>
            As we look towards the end of the fiscal year, the emphasis will remain on defense integration and cross-border infrastructure. The Levant corridor, in particular, serves as a litmus test for the success of these new frameworks.
          </p>
        </div>
        <div className="mt-16 p-8 border-t border-slate-800 flex flex-col items-center">
          <p className="text-slate-400 mb-6">Want more deep intelligence like this?</p>
          <button 
            onClick={() => setCurrentPage('premium')}
            className="bg-amber-500 text-slate-950 font-bold px-10 py-4 rounded-lg hover:scale-105 transition-transform"
          >
            Access Secret Briefings
          </button>
        </div>
      </div>
    );
  };

  const renderPlaceholder = (title: string) => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
      <h1 className="text-5xl font-serif font-bold text-slate-50 mb-4">{title}</h1>
      <p className="text-slate-400 text-lg max-w-md">Our {title.toLowerCase()} hub is currently being updated with the latest intelligence. Check back shortly.</p>
      <button 
        onClick={() => setCurrentPage('home')}
        className="mt-8 text-amber-500 font-bold border-b border-amber-500 pb-1"
      >
        Return to Global Analysis
      </button>
    </div>
  );

  const renderPremium = () => (
    <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col md:flex-row items-center gap-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex-1 text-center md:text-left">
        <div className="inline-block px-4 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-widest rounded-full mb-6">
          Premium Subscription
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-50 mb-8 leading-tight">
          Unlock the World's Most <span className="italic text-amber-500 underline decoration-amber-500/30">Secret Briefings</span>.
        </h1>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
          Gain access to high-stakes intelligence, leaked diplomatic memos, and exclusive geopolitical analysis that isn't available to the general public.
        </p>
        <ul className="space-y-4 mb-10 text-slate-300">
          <li className="flex items-center gap-3">
            <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Daily "Special Secrets" Briefing
          </li>
          <li className="flex items-center gap-3">
            <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Advanced Policy Impact Forecasts
          </li>
          <li className="flex items-center gap-3">
            <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Access to our "Inner Circle" community
          </li>
        </ul>
        <button 
          onClick={() => {
            setIsPremiumUser(true);
            setCurrentPage('home');
          }}
          className="bg-slate-50 text-slate-950 hover:bg-amber-500 transition-colors font-bold px-12 py-5 rounded-full text-lg shadow-xl"
        >
          Subscribe for $250/year
        </button>
      </div>
      <div className="flex-1 w-full">
        <div className="relative aspect-square md:aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-8 flex flex-col justify-end">
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2070" 
            alt="Intelligence Center" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="relative z-10">
            <div className="bg-amber-500 text-slate-950 px-3 py-1 rounded w-fit text-[10px] font-bold uppercase mb-4">Sample Confidential Page</div>
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-slate-700/50 rounded blur-[2px]"></div>
              <div className="h-4 w-1/2 bg-slate-700/50 rounded blur-[2px]"></div>
              <div className="h-4 w-2/3 bg-slate-700/50 rounded blur-[2px]"></div>
              <div className="h-4 w-full bg-amber-500/20 rounded border border-amber-500/30 p-2 text-[10px] font-mono text-amber-200">
                [TOP SECRET] REDACTED INTEL ENCRYPTED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCareers = () => (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-slate-50 mb-6">Join the Frontline.</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We are looking for the sharpest minds in geopolitics, economics, and intelligence analysis to help us decode a world in flux.
        </p>
      </div>

      <div className="space-y-4">
        {MOCK_JOBS.map(job => (
          <div key={job.id} className="group bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-amber-500/50 transition-colors">
            <div>
              <div className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">{job.department}</div>
              <h3 className="text-2xl font-bold text-slate-50 group-hover:text-amber-50 transition-colors">{job.title}</h3>
              <div className="flex gap-4 mt-3 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {job.type}
                </span>
              </div>
            </div>
            <button className="bg-slate-800 text-slate-50 font-bold px-8 py-3 rounded-lg hover:bg-amber-500 hover:text-slate-950 transition-all">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header / Nav */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-900 h-20 flex items-center">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-xl group-hover:rotate-12 transition-transform">G</div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg tracking-tight leading-none">GEOPOLITICS</h1>
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.2em] opacity-80">Intelligence Hub</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 overflow-x-auto no-scrollbar">
            {[
              { id: 'home', label: 'Analysis' },
              { id: 'experts', label: 'Experts' },
              { id: 'regions', label: 'Regions' },
              { id: 'topics', label: 'Topics' },
              { id: 'podcasts', label: 'Podcasts' },
              { id: 'videos', label: 'Videos' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  if (item.id === 'home') {
                    setCurrentPage('home');
                    setFilters(prev => ({ ...prev, category: 'All' }));
                  } else {
                    setCurrentPage(item.id as PageType);
                  }
                }} 
                className={`text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap py-2 ${currentPage === item.id ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => setCurrentPage('premium')}
              className={`hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${currentPage === 'premium' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 border border-slate-800 hover:border-amber-500/50 hover:text-slate-200'}`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Secrets
            </button>
            <button className="lg:hidden text-slate-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'article' && renderArticle()}
        {currentPage === 'premium' && renderPremium()}
        {currentPage === 'careers' && renderCareers()}
        {currentPage === 'experts' && renderPlaceholder('Experts')}
        {currentPage === 'podcasts' && renderPlaceholder('Podcasts')}
        {currentPage === 'videos' && renderPlaceholder('Videos')}
        {currentPage === 'regions' && (
           <div className="py-12 animate-in fade-in">
             <h1 className="text-4xl font-serif font-bold text-slate-50 mb-8">Regions</h1>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {Object.values(Category).filter(c => c !== Category.PREMIUM_SECRET).map(region => (
                 <button 
                  key={region}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: region }));
                    setCurrentPage('home');
                  }}
                  className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center hover:border-amber-500/50 transition-colors group"
                 >
                   <div className="text-amber-500 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">EXPLORE</div>
                   <div className="text-xl font-bold">{region}</div>
                 </button>
               ))}
             </div>
           </div>
        )}
        {currentPage === 'topics' && (
           <div className="py-12 animate-in fade-in">
             <h1 className="text-4xl font-serif font-bold text-slate-50 mb-8">Topics</h1>
             <div className="flex flex-wrap gap-3">
               {['Energy Crisis', 'Quantum Warfare', 'Trade Corridors', 'Debt Restructuring', 'Arctic Frontier', 'NATO Expansion', 'Middle East Peace'].map(topic => (
                 <button 
                  key={topic}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, searchQuery: topic }));
                    setCurrentPage('home');
                  }}
                  className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all font-medium"
                 >
                   #{topic}
                 </button>
               ))}
             </div>
           </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-20 mt-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center font-black text-slate-950 text-base">G</div>
                <h2 className="font-bold text-lg text-slate-50 tracking-tighter">GEOPOLITICS</h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Leading intelligence and geopolitical analysis on global power shifts. Bold news, backed by rigorous research.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="text-slate-50 font-bold mb-6">Navigation</h3>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-amber-500 transition-colors">Analysis</button></li>
                <li><button onClick={() => setCurrentPage('experts')} className="hover:text-amber-500 transition-colors">Experts</button></li>
                <li><button onClick={() => setCurrentPage('podcasts')} className="hover:text-amber-500 transition-colors">Podcasts</button></li>
                <li><button onClick={() => setCurrentPage('videos')} className="hover:text-amber-500 transition-colors">Videos</button></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-slate-50 font-bold mb-6">Corporate</h3>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><button onClick={() => setCurrentPage('careers')} className="hover:text-amber-500 transition-colors text-left">Careers & Opportunities</button></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Digital Reports</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Contact Intelligence</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-slate-50 font-bold mb-6">Daily Intelligence</h3>
              <p className="text-sm text-slate-500 mb-4">Join our executive briefing newsletter.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="name@agency.gov"
                  className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                />
                <button className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded text-sm hover:bg-amber-600">Join</button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
            <div>© 2024 GEOPOLITICS. GLOBAL INTELLIGENCE DATABASE.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
              <a href="#" className="hover:text-slate-400">Security Protocols</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
