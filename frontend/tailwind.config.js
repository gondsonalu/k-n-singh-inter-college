/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {

      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      colors: {
        primary: {
          50:  '#fef3e2',
          100: '#fde3b8',
          200: '#fbd08a',
          300: '#f9bc5c',
          400: '#f7ac3a',
          500: '#f59d1a',
          600: '#e08a0d',
          700: '#c47308',
          800: '#a85d04',
          900: '#7a4102',
        },
        college: {
          navy:   '#0d2b5e',
          gold:   '#f59d1a',
          cream:  '#fef9f0',
          dark:   '#0a1f44',
          accent: '#e53e3e',
        },
      },

      /* 🔥 EXISTING ANIMATIONS */
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-right': 'slideRight 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',

        /* 🔥 NEW SHINE ANIMATION */
        'shine': 'shine 3s linear infinite',
      },

      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        slideRight: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },

        /* 🔥 NEW SHINE KEYFRAME */
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },

    },
  },
  plugins: [],
}