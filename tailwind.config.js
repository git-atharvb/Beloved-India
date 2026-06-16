/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 1vw + 0.5rem, 1rem)',
        'fluid-base': 'clamp(1rem, 1.5vw + 0.5rem, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 2vw + 0.5rem, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 3vw + 0.5rem, 2rem)',
        'fluid-2xl': 'clamp(2rem, 4vw + 1rem, 3rem)',
        'fluid-3xl': 'clamp(2.5rem, 5vw + 1rem, 4rem)',
        'fluid-4xl': 'clamp(3rem, 7vw + 1rem, 5rem)',
      },
      colors: {
        background: 'var(--bg-primary)',
        foreground: 'var(--fg-primary)',
        surface: 'var(--surface-primary)',
        card: 'var(--bg-secondary)',
        'card-foreground': 'var(--fg-primary)',
        border: 'var(--border-primary)',
        muted: 'var(--bg-tertiary)',
        hover: 'var(--surface-hover)',
        
        // Vibrant Palette
        'brand-saffron': 'var(--color-saffron)',
        'brand-emerald': 'var(--color-emerald)',
        'brand-blue': 'var(--color-blue)',
        'brand-gold': 'var(--color-gold)',
        'brand-pink': 'var(--color-pink)',
        'brand-violet': 'var(--color-violet)',
        'brand-crimson': 'var(--color-crimson)',
        'brand-skyblue': 'var(--color-skyblue)',
        'brand-yellow': 'var(--color-yellow)',
        'brand-green': 'var(--color-green)',

        // Legacy Mappings
        'primary-saffron': 'var(--color-saffron)',
        'primary-green': 'var(--color-emerald)',
        'primary-blue': 'var(--color-blue)',
        'accent-gold': 'var(--color-gold)',
        'accent-copper': 'var(--color-saffron)',
        'accent-teal': 'var(--color-blue)',
        'accent-magenta': 'var(--color-pink)',
        'accent-violet': 'var(--color-violet)',
        'accent-emerald': 'var(--color-emerald)',
        'accent-coral': 'var(--color-saffron)',
        'accent-indigo': 'var(--color-violet)',

        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'fg-primary': 'var(--fg-primary)',
        'fg-secondary': 'var(--fg-secondary)',
        'fg-muted': 'var(--fg-muted)',
      },
      boxShadow: {
        'premium-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'premium-md': '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'premium-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glow-saffron': '0 0 20px rgba(255, 153, 51, 0.4)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.4)',
        'neo-glow': '0 0 20px var(--neo-glow-color)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'mesh-saffron': 'radial-gradient(at 0% 0%, hsla(28,100%,74%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(340,100%,76%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(22,100%,77%,1) 0, transparent 50%)',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        decorative: ['Playfair Display', 'serif'],
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob-spin': 'blobSpin 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: .7, transform: 'scale(1.05)' },
        },
        blobSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        }
      }
    },
  },
  plugins: [],
};
