import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0f172a',
          800: '#172554',
          700: '#1e3a8a',
          600: '#1d4ed8',
          500: '#2563eb'
        },
        accent: {
          amber: '#f59e0b'
        }
      },
      boxShadow: {
        panel: '0 10px 30px -12px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
