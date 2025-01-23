/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      fontSize: {
        // 'sm': '1px',
        // 'md': '16px',
        // 'lg': '18px',
        // 'xl': '20px',
      },
      screens: {
        '3xl': '1920px', // Custom breakpoint for 3xl screens
      },
    },
  },
  plugins: [],
}

