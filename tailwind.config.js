/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'alliance-blue': '#0000FF',
        'alliance-red': '#FF0000',
      },
    },
  },
  plugins: [],
}
