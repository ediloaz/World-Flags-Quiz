import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      animation: {
        pulseSlow: "pulse 4s ease-in-out infinite"
      },
      colors: {
        primary: "#0F172A",
        accent: "#38BDF8"
      }
    }
  },
  plugins: []
};

export default config;
