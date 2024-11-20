/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { customGreen: "#1B3E31",
        customBG2: "#1D3334",
        customBGmain: "#1F2E36",
        customLastBG: "#02113b"
    },
    
         }
  },
  plugins: [],
}