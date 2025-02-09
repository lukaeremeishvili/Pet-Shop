import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { 
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config;
