/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Uber Move',
          'UberMove',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        uber: [
          'Inter',
          'Uber Move',
          'UberMove',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      fontSize: {
        'display': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'heading': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.025em' }],
        'subheading': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.025em' }],
        'body': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'small': ['0.75rem', { lineHeight: '1.3', letterSpacing: '0' }],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6', // blue-500
          dark: '#1e40af', // blue-800
        },
        accent: {
          DEFAULT: '#06b6d4', // cyan-500
          light: '#67e8f9', // cyan-300
          dark: '#0e7490', // cyan-700
        },
        neutral: {
          light: '#f3f4f6', // gray-100
          DEFAULT: '#374151', // gray-700
          dark: '#111827', // gray-900
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
