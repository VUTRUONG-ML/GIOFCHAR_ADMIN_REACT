/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
    "./src/assets/css/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#f59e0b",
        accent: "#10b981",
        neutral: "#f3f4f6",
      },
      spacing: {
        128: "32rem", // ví dụ spacing lớn
        144: "36rem",
      },
      borderRadius: {
        xl: "1rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
