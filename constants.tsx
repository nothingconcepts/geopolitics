
import { Article, Category, Impact, Job } from './types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Suez Re-Routing: Economic Implications of the New Maritime Corridor',
    excerpt: 'As global trade shifts, the Middle East faces a pivotal moment in maritime logistics that could redefine regional power dynamics for decades.',
    category: Category.ENERGY,
    impact: Impact.CRITICAL,
    author: 'Dr. Elias Mansour',
    date: 'Oct 24, 2024',
    imageUrl: 'https://picsum.photos/seed/suez/800/450',
    isPremium: false,
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Secret Negotiations: Behind the Scenes of the Riyadh-Tehran Energy Accord',
    excerpt: 'Leaked documents suggest a clandestine framework for energy stability that bypassed traditional Western mediators.',
    category: Category.PREMIUM_SECRET,
    impact: Impact.CRITICAL,
    author: 'Special Correspondent',
    date: 'Oct 23, 2024',
    imageUrl: 'https://picsum.photos/seed/secret/800/450',
    isPremium: true,
    readTime: '12 min read'
  },
  {
    id: '3',
    title: 'Quantum Defense: The Next Arms Race in the Levant',
    excerpt: 'How emerging technologies are disrupting traditional deterrence models in the Eastern Mediterranean.',
    category: Category.DEFENSE,
    impact: Impact.HIGH,
    author: 'Sarah Jenkins',
    date: 'Oct 22, 2024',
    imageUrl: 'https://picsum.photos/seed/quantum/800/450',
    isPremium: false,
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Lebanon Banking Restructuring: The Geopolitical Cost of Recovery',
    excerpt: 'The intersection of financial reform and regional influence in the quest for Lebanese stability.',
    category: Category.MIDDLE_EAST,
    impact: Impact.HIGH,
    author: 'Marc Haddad',
    date: 'Oct 21, 2024',
    imageUrl: 'https://picsum.photos/seed/lebanon/800/450',
    isPremium: false,
    readTime: '10 min read'
  },
  {
    id: '5',
    title: 'The Arctic Front: Why the Middle East is Investing in Polar Interests',
    excerpt: 'Unconventional sovereign wealth moves are positioning Gulf nations in the race for future Arctic resources.',
    category: Category.GLOBAL,
    impact: Impact.MODERATE,
    author: 'Elena Volkov',
    date: 'Oct 20, 2024',
    imageUrl: 'https://picsum.photos/seed/arctic/800/450',
    isPremium: true,
    readTime: '7 min read'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior Geopolitical Analyst',
    department: 'Middle East & North Africa Bureau',
    location: 'Beirut / Remote',
    type: 'Full-Time'
  },
  {
    id: 'j2',
    title: 'Director of Intelligence Partnerships',
    department: 'Strategic Relations',
    location: 'London',
    type: 'Full-Time'
  },
  {
    id: 'j3',
    title: 'Junior Policy Researcher',
    department: 'Energy Security',
    location: 'Dubai',
    type: 'Hybrid'
  }
];
