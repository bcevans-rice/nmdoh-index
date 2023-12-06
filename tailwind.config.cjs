/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Oxygen'],
    },
    extend: {
      fontFamily: {
        'sans': ['Oxygen'],
      },
      fontSize: {
        'xl': '1.333rem',
        '4xl': '2.444rem'
      },
      colors: {
        'nmdoh-purple': '#4f2d90',
        'nmdoh-purple-2': '#3f2473',
        'nmdoh-green': '#89bd3c',
        'nmdoh-green-2': '#518701',
        'nmdoh-gray-1': '#333333',
        'nmdoh-gray-2': '#444444',
        'nmdoh-gray-3': '#757575',
        'nmdoh-gray-4': '#fafafa'
      },
      backgroundImage: {
        'header-background': "url(https://index.driversofhealthtx.org/purple-header-bg.svg)",
      },
      width: {
        '450': '450px'
      }
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
