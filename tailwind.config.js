/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  variants: {
    // ...
     margin: ['hover'],
     margin: ['responsive', 'hover'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
