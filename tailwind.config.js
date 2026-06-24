/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // STESSARA palette — ONLY these
        crimson: '#980002',     // deep red — CTAs, titles
        rose: '#E97197',        // soft pink — collection/bag names
        ink: '#000000',         // black — header, footer, body text
        paper: '#FFFFFF',       // white — main background
        cream: '#FAF7F5',       // off-white — subtle section contrast
      },
      fontFamily: {
        // Tan Nimbus (paid) → substitute with Cormorant Garamond (close in spirit)
        display: ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        // Satoshi via Fontshare CDN
        sans: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        // Romie Italics (paid) → substitute with Playfair Display Italic
        script: ['var(--font-script)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'wide-luxe': '0.18em',
        'title-luxe': '0.12em',
      },
      transitionTimingFunction: {
        'silk': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'silk-in': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        '1000': '1000ms',
        '1200': '1200ms',
      },
      maxWidth: {
        '7xl': '80rem',
      },
      animation: {
        'ken-burns': 'kenBurns 8s ease-out infinite alternate',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
