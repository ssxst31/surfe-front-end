/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "-2xl": { max: "1535px" },
        // => @media (min-width: 640px) { ... }

        "-xl": { max: "1280px" },
        // => @media (min-width: 768px) { ... }

        "-lg": { max: "1024px" },
        // => @media (min-width: 1024px) { ... }

        "-md": { max: "768px" },
        // => @media (min-width: 1280px) { ... }

        "-sm": { max: "640px" },
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
