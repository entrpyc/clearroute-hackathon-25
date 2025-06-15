import type { Config } from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbar, tailwindAnimate],
};

export default config;
