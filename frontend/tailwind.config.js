/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: { max: "450px" },
    },
    extend: {
      backgroundImage: (theme) => ({
        "gradient-black":
          "linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(0,0,0,1) 95%);",
      }),
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
