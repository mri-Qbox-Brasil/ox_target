import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mriqbox/ui-kit/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindAnimate
  ],
}
