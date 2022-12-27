const defaultTheme = require("tailwindcss/defaultTheme")

// tailwind.config.cjs
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "imageColor": "#101115",
      },
      fontFamily: {
        "sans": ["Poppins", ...defaultTheme.fontFamily.sans],
        "serif": [...defaultTheme.fontFamily.serif],
        "mono": [...defaultTheme.fontFamily.mono]
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}