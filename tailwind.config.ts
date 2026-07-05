import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#030006',
        obsidian: '#090012',
        harmonic: {
          purple: '#8b5cf6',
          neon: '#b76cff',
          glow: '#d8b4fe',
          glass: 'rgba(255,255,255,0.08)',
        },
      },
      boxShadow: {
        'purple-glow': '0 0 40px rgba(183, 108, 255, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
