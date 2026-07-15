import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0E0F12',
        surface: '#16181D',
        ink: '#E2E8F0',
        green: '#51F6DA',
        blue: '#51F6DA',
        tan: '#C8A96E',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
