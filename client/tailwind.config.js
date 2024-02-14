/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors:{
        primaryColor: '#6247AA',
        secondaryColor: '#102B3F',
        accent: '#A06CD5',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
