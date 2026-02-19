import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: "#050507",
          surface: "#0f1117",
          glass: "rgba(15, 17, 23, 0.85)",
          border: "rgba(255,255,255,0.08)",
          cyan: "#67e8f9",
          violet: "#c084fc",
          emerald: "#4ade80",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
