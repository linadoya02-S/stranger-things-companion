/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Stranger Things palette
        "st-red": "#C1121F",
        "st-dark": "#0A0A0F",
        "st-darker": "#050508",
        "st-surface": "#12121A",
        "st-card": "#1A1A27",
        "st-border": "#2A2A3F",
        "st-gold": "#D4AF37",
        "st-blue": "#3A86FF",
        "st-text": "#E8E8F0",
        "st-muted": "#7B7B9A",
        "st-upside": "#6B0F1A",
      },
      fontFamily: {
        "st-title": ["BentonSans-Bold"],
        "st-body": ["Montserrat-Regular"],
        "st-mono": ["ShareTechMono-Regular"],
      },
    },
  },
  plugins: [],
};
