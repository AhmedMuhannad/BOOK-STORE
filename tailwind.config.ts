import type { Config } from "tailwindcss";
const config: Config = {};
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}", // ✅ Add your paths
  "./public/index.html",
];
export const theme = {
  extend: {
    screens: {
      xs: "480px", // ✅ Custom breakpoint smaller than sm
      "max-sm": { max: "639px" }, // ✅ For anything smaller than sm
    },
  },
};
export const plugins = [];
