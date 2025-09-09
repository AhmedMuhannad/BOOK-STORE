/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Add your paths
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // ✅ Custom breakpoint smaller than sm
        "max-sm": { max: "639px" }, // ✅ For anything smaller than sm
      },
    },
  },
  plugins: [],
};
