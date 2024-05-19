/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: { max: "450px" },
    },
    extend: {
      colors: {
        "light-yellow": "#eeeeee",
        "theme-yellow": "#FFD369",
        "dark-black": "#222831",
        "light-black": "#393e46",
      },
    },
  },
  plugins: [],
  important: true,
};
