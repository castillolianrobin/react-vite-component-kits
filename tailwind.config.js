  /* eslint-disable @typescript-eslint/no-var-requires */
  // eslint-disable-next-line no-undef
  const colors = require('tailwindcss/colors')

  /** @type {import('tailwindcss').Config} */
  // eslint-disable-next-line no-undef
  module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/vue-tailwind-datepicker/**/*.js",
    ],
    darkMode: 'class',
    safelist: [
      {
        pattern: /(bg|text|border|outline|fill)-(primary|secondary|success|error|warning)-(200|500|400)/,
        variants: ['active', 'hover', 'focus', 'group-focus-within', 'group-hover', 'disabled', 'even'],
      },
      {
        pattern: /(bg|text|border|outline)-(white|black)/,
        variants: ['active', 'hover', 'focus', 'group-focus-within', 'group-hover', 'disabled', 'even'],
      },
    ],
    theme: {
      extend: {
        colors: {
          primary: colors.sky,
          secondary: colors.slate,
          info: colors.blue,
          alert: colors.orange,
          error: colors.rose,
          success: colors.green,
          // Date Picker colors
          // "vtd-primary": colors.emerald,
          // "vtd-secondary": colors.zinc,
        },
        gridTemplateColumns: {
          dashboard: "auto 1fr",
        },
        gridTemplateRows: {
          dashboard: "auto 1fr",
        },
        keyframes: {
          shake: {
            '0%, 100%': { transform: 'translateX(-1%)' },
            '50%': { transform: 'translateX(1%)' },
          }
        },
        animation: {
          'modal': 'shake 0.3s linear 1',
        }
      },
    },
    plugins: [],
  }
  