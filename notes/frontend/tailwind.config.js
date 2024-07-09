import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: { colors: {
      'custom-purple': '#450A5B',
      'custom-purple-dark': '#340B42',
    },},
  },
  plugins: [daisyui,
  ],
}