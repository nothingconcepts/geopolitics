
export const theme = {
  // Brand Identity
  branding: {
    name: 'GEOPOLITICS',
    tagline: 'Global Intelligence Database',
    logoLetter: 'G',
  },

  // Color Palette (Tailwind-compatible)
  colors: {
    primary: '#8e1a1a', // Al-Joumhouria Signature Red
    primaryHover: '#7a1616',
    background: {
      dark: '#020617', // Deep Slate/Navy
      light: '#f8fafc', // Slate 50
    },
    surface: {
      dark: '#0f172a', // Slate 900
      light: '#ffffff', // White
    },
    text: {
      dark: '#f8fafc',
      light: '#0f172a',
      muted: '#64748b',
    },
    border: {
      dark: '#1e293b',
      light: '#e2e8f0',
    }
  },

  // Typography
  fonts: {
    serif: "'Playfair Display', serif",
    sans: "'Inter', 'Noto Sans Arabic', sans-serif",
  },

  // UI Components Config (For v0 prompt usage)
  ui: {
    borderRadius: '1.5rem',
    shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
