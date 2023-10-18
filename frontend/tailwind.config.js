/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: { max: "450px" },
    },
    extend: {
      colors: {
        "light-yellow": "rgba(255, 241, 200, 0.58)",
        "theme-yellow": "#FFC107",
      },
    },
  },
  plugins: [],
  important: true,
};
