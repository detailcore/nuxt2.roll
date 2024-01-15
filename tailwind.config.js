const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {},
    screens: {
      ...defaultTheme.screens,

      xs: { max: '639px' },
      // => @media (max-width: 639px) { ... }

      md: '980px',
      // => @media (min-width: 980px) { ... }

      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
