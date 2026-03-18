import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#F5F0E8",
        obsidian: "#0A0A0A",
        concrete: "#8C8C8C",
        steel: "#4A6FA5",
        earth: "#8B6F47",
        ash: "#C4C4C4",
        graphite: "#2A2A2A",
        mist: "#E8E4DC",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.3em",
        "ultra-wide": "0.5em",
      },
    },
  },
  plugins: [],
};
export default config;
