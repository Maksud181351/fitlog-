module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: { extend: {
    colors: { bg: "#0a0b0e", panel: "#111318", line: "#1f2229", accent: "#ccff00" },
    fontFamily: { display: ["var(--font-oswald)", "sans-serif"], sans: ["var(--font-inter)", "sans-serif"] },
  } },
  plugins: [],
};
