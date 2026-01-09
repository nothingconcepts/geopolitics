
import React from 'react';
import { Article, Impact } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  const impactColors = {
    [Impact.CRITICAL]: 'bg-red-600',
    [Impact.HIGH]: 'bg-orange-500',
    [Impact.MODERATE]: 'bg-blue-500',
  };

  return (
    <div 
      onClick={() => onSelect(article)}
      className="group relative bg-slate-900 border border-slate-800 rounded-lg overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-4 left-4 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${impactColors[article.impact]} rounded-sm`}>
          {article.impact} Impact
        </div>
        {article.isPremium && (
          <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Secret / Premium
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-amber-500 text-[11px] font-semibold uppercase tracking-wider mb-2">
          {article.category}
        </div>
        <h3 className="font-serif text-xl font-bold mb-3 leading-tight group-hover:text-amber-50 transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800 pt-4">
          <div className="flex flex-col">
            <span className="font-medium text-slate-300">{article.author}</span>
            <span>{article.date}</span>
          </div>
          <div className="font-mono">{article.readTime}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
