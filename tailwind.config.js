/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                 // 👈 add this
    "./src/**/*.{js,ts,jsx,tsx}",  
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
