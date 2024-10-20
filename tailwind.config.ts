import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.6rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#18181b",
        secondary: "#134CC9",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.75)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-down": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.75)", opacity: "0" },
        },
      },
      animation: {
        slide: "slide 2s infinite linear",
        "slide-up": "slide-up 0.2s ease-out forwards",
        "slide-down": "slide-down 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
