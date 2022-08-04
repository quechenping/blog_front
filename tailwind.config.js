module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
