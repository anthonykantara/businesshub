/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        '600': '600ms'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeOut: {
          '0%': { opacity: '0.75', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(2)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 2s ease-out forwards'
      }
    },
  },
  plugins: [],
};