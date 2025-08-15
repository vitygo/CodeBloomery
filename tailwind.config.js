/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        screens: {
          'lg-monitor': '1600px',   // великий монітор ~2K
          'xl-monitor': '2560px',   // 2.5K / 4K екран
          'xxl-monitor': '3840px',  // 4K екран
          '3xl': '2000px',
        },
      },
    },
    plugins: [],
  }