import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--surface)",
          "container-highest": "var(--surface-container-highest)",
          "container-high": "var(--surface-container-high)",
          "container-low": "var(--surface-container-low)",
        },
        outline: {
          DEFAULT: "var(--outline)",
          variant: "var(--outline-variant)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;