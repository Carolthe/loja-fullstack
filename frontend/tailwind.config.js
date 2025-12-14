/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        greenMain: '#0c748c',
        orangeMain: '#e36c14',
        highlightGreen: '#3cac8c',
        fontGray: '#6B7280',
        azulEscuro: '#003F62',
        amareloPrincipal: '#EAB308',
        azulPrincipal: '#5769a9'
      },
    },
  },
  plugins: [],
}

