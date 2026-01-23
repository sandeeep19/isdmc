import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B4F6C", // Ganga Blue
          dark: "#083d52",
          light: "#0d6b8f",
        },
        accent: {
          DEFAULT: "#FF8C42", // Banarasi Saffron
          dark: "#e6732a",
          light: "#ffa366",
        },
        secondary: {
          DEFAULT: "#F2E9E4", // River Sand
          dark: "#e8d9d0",
          light: "#faf5f2",
        },
        support: {
          DEFAULT: "#6B8E23", // Algae Green
          dark: "#5a7a1d",
          light: "#7ca329",
        },
        neutral: {
          ink: "#111827",
          slate: "#334155",
          mist: "#F8FAFC",
        },
      },
      fontFamily: {
        heading: ["Merriweather", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
