const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
    addVariablesForColors,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  addBase({
    ":root": newVars,
  });
}