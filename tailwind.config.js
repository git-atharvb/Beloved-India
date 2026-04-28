/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF9933',   // Saffron
          400: '#FFB366', // Lighter shade for text-primary-400 in Hero
          500: '#FF9933', // Explicitly define 500 if used elsewhere
          600: '#E68A2E', // Darker shade for from-primary-600 in Footer
        },
        secondary: {
          DEFAULT: '#000080', // Deep Blue
        },
        accent: {
          DEFAULT: '#138808',    // India Green
          400: '#1AC71A', // Lighter shade for text-accent-400 in Hero
          500: '#138808', // Explicitly define 500 if used elsewhere
          600: '#0F6B06', // Darker shade for to-accent-600 in Footer
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        decorative: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.entries(colorObj).reduce((vars, [key, value]) => {
          const cssVar = key === 'DEFAULT' ? `--tw-${colorGroup}` : `--tw-${colorGroup}-${key}`;
          const newVars = typeof value === 'string' ? { [cssVar]: value } : extractColorVars(value, key);
          return { ...vars, ...newVars };
        }, {});
      }
      addBase({ ':root': extractColorVars(theme('colors')) });
    },
  ],
}