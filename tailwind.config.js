/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "luxury-gold": "#D4AF37",
        "luxury-gold-light": "#F4E4A1",
        "luxury-gold-dark": "#B8941F",
        "luxury-gold-hover": "#E6C556",
        "luxury-platinum": "#E5E4E2",
        "luxury-charcoal": "#36454F",
        "luxury-midnight": "#191970",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { filter: "brightness(1) drop-shadow(0 0 0 rgba(255, 255, 255, 0))" },
          "50%": { filter: "brightness(1.2) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))" },
          "100%": { filter: "brightness(1) drop-shadow(0 0 0 rgba(255, 255, 255, 0))" },
        },
      },
    },
  },
  plugins: [],
}
