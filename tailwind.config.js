/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- TAMBAHKAN INI
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
