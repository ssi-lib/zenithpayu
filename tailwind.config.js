/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pri': '#0581ce',
        'icon': '#0076be',
        'feature': '#f1f5f6',
        'lightgray': '#8e9a9d'
      },
    },
  },
  plugins: [],
};
