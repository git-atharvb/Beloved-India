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
        
        // Indian-inspired colors
        'primary-saffron': 'var(--primary-saffron)',
        'primary-green': 'var(--primary-green)',
        'primary-blue': 'var(--primary-blue)',
        'accent-gold': 'var(--accent-gold)',
        'accent-copper': 'var(--accent-copper)',
        'accent-teal': 'var(--accent-teal)',
        'accent-magenta': 'var(--accent-magenta)',
        'accent-violet': 'var(--accent-violet)',
        'accent-emerald': 'var(--accent-emerald)',
        'accent-coral': 'var(--accent-coral)',
        'accent-indigo': 'var(--accent-indigo)',
        
        // Background colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        
        // Foreground colors
        'fg-primary': 'var(--fg-primary)',
        'fg-secondary': 'var(--fg-secondary)',
        'fg-muted': 'var(--fg-muted)',
      },
      boxShadow: {
        'premium-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'premium-md': '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'premium-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glow-saffron': '0 0 20px rgba(255, 153, 51, 0.4)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        decorative: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
