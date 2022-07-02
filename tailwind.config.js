/** @type {import('tailwindcss').Config} */
module.exports = {
  node: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E1434B'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
