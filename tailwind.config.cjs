const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.html"],
  theme: {
    extend: {
      boxShadow: {
        'inner-all': 'inset 0 -1 3px 1px rgb(0 0 0 / 0.05);',
      },
      colors: {
        'gray-1000': '#FFF'
      }
    },
    fontFamily: {
      'Inconsolata': ['Inconsolata']
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.5xl') },
        'h2': { fontSize: theme('fontSize.4xl') },
        'h3': { fontSize: theme('fontSize.3xl') },
        'h4': { fontSize: theme('fontSize.2xl') },
        'h5': { fontSize: theme('fontSize.xl') },
        'body': {
          color: theme('textColor.white'),
          fontSize: theme('fontSize.lg'),
        },
      })
    })
  ],
}