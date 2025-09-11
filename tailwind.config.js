/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Optimisations de performance
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Optimisations de couleurs
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
  // Optimisations de build
  corePlugins: {
    // Désactiver les plugins non utilisés pour réduire la taille
    preflight: true,
    container: false,
    accessibility: false,
    pointerEvents: false,
    visibility: false,
    position: true,
    inset: true,
    isolation: false,
    zIndex: true,
    order: false,
    gridColumn: false,
    gridColumnStart: false,
    gridColumnEnd: false,
    gridRow: false,
    gridRowStart: false,
    gridRowEnd: false,
    float: false,
    clear: false,
    objectFit: false,
    objectPosition: false,
    overflow: true,
    overscrollBehavior: false,
    position: true,
    inset: true,
    visibility: false,
    zIndex: true,
  },
  // Purge agressif - configuration v3
  safelist: [
    'animate-spin',
    'animate-pulse',
    'animate-bounce',
    'gpu-accelerated',
    'smooth-scroll',
  ],
};
