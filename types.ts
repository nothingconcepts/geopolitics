
export enum Category {
  MIDDLE_EAST = 'Middle East',
  GLOBAL = 'Global',
  ENERGY = 'Energy & Trade',
  DEFENSE = 'Defense & Security',
  PREMIUM_SECRET = 'Deep Intel (Premium)',
}

export enum Impact {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MODERATE = 'Moderate',
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  impact: Impact;
  author: string;
  date: string;
  imageUrl: string;
  isPremium: boolean;
  readTime: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

export interface FilterState {
  category: Category | 'All';
  searchQuery: string;
}
