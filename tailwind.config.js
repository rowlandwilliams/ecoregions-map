const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        default: ["default"],
        "default-medium": ["default-medium"],
        "default-bold": ["default-bold"],
      },
    },
    colors: {
      ...colors,
      transparent: "transparent",
      current: "currentColor",
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
