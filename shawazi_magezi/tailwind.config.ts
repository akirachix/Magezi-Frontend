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
        customGreen: "#508408",
        'secondary-light': '#FFEDD5',
        hover: "#508408",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
export default config;
