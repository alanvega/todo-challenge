/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './icons/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'img-landscape': 'url("/images/landscape.jpg")',
      },
    },
  },
  plugins: [],
}
