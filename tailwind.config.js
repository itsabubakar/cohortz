/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/preset");

module.exports = {
  presets: [nativewind],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./stores/**/*.{js,jsx,ts,tsx}",
    "./ui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}