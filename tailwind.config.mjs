/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        yellowTail: ["yellowTail", "cursive"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        cmyk: {
          ...require("daisyui/src/theming/themes")["cmyk"],
          primary: "#E02C2C",
          secondary: "#01388A",
        },
      },
    ],
  },
  plugins: [require("tailwindcss-fluid-type"), require("daisyui")],
};
