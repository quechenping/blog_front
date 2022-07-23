module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
