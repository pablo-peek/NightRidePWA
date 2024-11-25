/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-fast': 'fadeIn 0.5s ease-in-out .7s forwards',
        'delay-hero': 'fadeIn 0.4s ease-in-out 1.5s forwards',
        'logo': 'slideUp .4s ease-in-out 1.3s forwards',
        'text': 'slideUp .4s ease-in-out 1.4s forwards',
        'buttons': 'slideUp .4s ease-in-out 1.5s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' }, // Añadido scaleY
          '100%': { opacity: '1', transform: 'translateY(0)' },  // Añadido scaleY
        },
      },
    },
  },
  plugins: [],
}