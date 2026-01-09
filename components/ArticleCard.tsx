
import React from 'react';
import { Article, Impact } from '../types';
import { theme } from '../theme';
import { translations } from '../translations';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  lang: 'en' | 'ar';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect, lang }) => {
  const t = translations[lang];
  
  const impactColors = {
    [Impact.CRITICAL]: `bg-brand-red`,
    [Impact.HIGH]: 'bg-red-800',
    [Impact.MODERATE]: 'bg-slate-500 dark:bg-slate-600',
  };

  return (
    <div 
      onClick={() => onSelect(article)}
      className="group relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-brand-red/50 transition-all duration-500 flex flex-col h-full rounded-2xl shadow-sm dark:shadow-none"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        <div className={`absolute top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ${impactColors[article.impact] || 'bg-red-900'}`}>
          {article.impact} {t.impact}
        </div>
        {article.isPremium && (
          <div className={`absolute bottom-0 ${lang === 'ar' ? 'left-0' : 'right-0'} bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest border-${lang === 'ar' ? 'r' : 'l'} border-t border-slate-800`}>
            {t.exclusive}
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-brand-red text-[11px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
          {article.category}
        </div>
        <h3 className="font-serif text-2xl font-bold mb-4 leading-tight text-slate-900 dark:text-slate-100 group-hover:text-brand-red dark:group-hover:text-white transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-5 font-black uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="text-slate-700 dark:text-slate-300">{article.author}</span>
            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
            <span>{article.date}</span>
          </div>
          <div className="text-brand-red">{article.readTime}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
