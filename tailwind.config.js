/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
      colors: {
        custom: {
          "blue-1": "#C2CCFF", // very light
          "blue-2": "#A3ADFF", // light
          "blue-3": "#858EFF", // medium-light
          "blue-4": "#6770FF", // medium
          "blue-5": "#4E5CF5", // medium-dark
          "blue-6": "#3D4DEB", // darkest
        },
      },
      // just add border color, not border
      borderColor: {
        "custom": "#e6ebf4", // border-custom
      },
    },
  },
  plugins: [],
}
