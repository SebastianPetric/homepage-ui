const defaultTheme = require("tailwindcss/defaultTheme");

// tailwind.config.cjs
module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        imageColor: "#101115",
        textColor: "#101115",
        accentColor: "#129776"
      },
      fontFamily: {
        pacifico: ['pacifico', 'sans-serif'],
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
