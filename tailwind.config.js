/** @type {import('tailwindcss').Config} */
module.exports = {
  node: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E1434B',
        orangeLight: '#fbd4bc',
        blueLight: '#d5dbed'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
