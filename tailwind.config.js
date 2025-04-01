/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure this path matches your project
  theme: {
    extend: {},
  },
  plugins: [
	require("@tailwindcss/postcss")(),
  ],
};