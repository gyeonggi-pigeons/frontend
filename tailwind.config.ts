import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "2xs": { min: "276px", max: "359px" }, // Fold
        xs: { min: "360px", max: "389px" }, // Mobile
        "2sm": { min: "390px", max: "560px" }, // Wide Mobile
        web: { min: "561px" }, // Web
      },
    },
  },
  plugins: [],
};
export default config;
