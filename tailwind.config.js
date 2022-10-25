/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: { max: "350px" },
      sm: { max: "769px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { max: "1900px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
