const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      ...fontFamily,
      sans: ["Inter", ...fontFamily.sans],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            //       color: '#333',
            //       a: {
            //         color: '#3182ce',
            //         '&:hover': {
            //           color: '#2c5282',
            //         },
            //       },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
