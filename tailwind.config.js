/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        foreground: 'var(--fg-color)',
        surface: 'var(--surface-color)',
        card: 'var(--card-bg)',
        'card-foreground': 'var(--card-fg)',
        border: 'var(--border-color)',
        muted: 'var(--muted-bg)',
        hover: 'var(--hover-bg)',
        primary: {
          50: '#fff3e3',
          100: '#ffe0c6',
          200: '#ffc393',
          300: '#ff9d5e',
          400: '#ff7f39',
          500: '#ff6a31',
          600: '#e55c2b',
          700: '#b84823',
          800: '#8f3a1d',
          900: '#692d18',
        },
        sunrise: {
          50: '#fff6e8',
          100: '#ffe6c8',
          200: '#ffd09a',
          300: '#ffc072',
          400: '#ffaf4d',
          500: '#ff9f34',
          600: '#e0862e',
          700: '#b06824',
          800: '#864d1f',
          900: '#5d3817',
        },
        oasis: {
          50: '#e8f9f0',
          100: '#c9f0e2',
          200: '#9fe3cb',
          300: '#6fd4ae',
          400: '#42c291',
          500: '#26aa77',
          600: '#1d8c65',
          700: '#186d52',
          800: '#14523f',
          900: '#103730',
        },
        twilight: {
          50: '#eef0ff',
          100: '#dce1ff',
          200: '#b8c4ff',
          300: '#8ea0ff',
          400: '#6c7dff',
          500: '#4f5ffb',
          600: '#404ce7',
          700: '#3438b8',
          800: '#2a2c8d',
          900: '#22246c',
        },
        neutral: {
          50: '#f8fafb',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        glow: '0 20px 90px rgba(255, 154, 51, 0.16)',
        soft: '0 18px 60px rgba(15, 23, 42, 0.12)',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        decorative: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.entries(colorObj).reduce((vars, [key, value]) => {
          const cssVar = key === 'DEFAULT' ? `--tw-${colorGroup}` : `--tw-${colorGroup}-${key}`;
          const newVars = typeof value === 'string' ? { [cssVar]: value } : extractColorVars(value, `${colorGroup}-${key}`);
          return { ...vars, ...newVars };
        }, {});
      }
      addBase({ ':root': extractColorVars(theme('colors')) });
    },
  ],
};
