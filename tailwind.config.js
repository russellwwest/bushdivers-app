/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.jsx', './resources/**/*.css'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
  ],
}
