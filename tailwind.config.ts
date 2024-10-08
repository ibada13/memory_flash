import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dbg: "#0b0c15",
        dt: "#e4e4e9",
        dp: "#949adb",
        ds: "#1b2590",
        da:"#394af3",
      },
    },
  },
  plugins: [],
};
export default config;
