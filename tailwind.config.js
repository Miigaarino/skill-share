/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cool-black": "#222831",
        "cooler-black": "#393E46",
        "cool-cyan": "#00ADB5",
        "cool-gray": "#EEEEEE",
      },
    },
  },
  plugins: [],
};
