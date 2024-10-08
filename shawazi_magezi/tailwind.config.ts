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
        background: "var(--background)",
        foreground: "#E4960E",
        primary: "#3E1C00",
        secondary: "#E4960E",
        hover: "#508408",
        white: "#FFFFFF",
        customGreen: '#CFF1A1',
      },
      fontSize: {
        '24': '24px',
        '16': '16px',
      },
    },
  },
  plugins: [],
};
export default config;
