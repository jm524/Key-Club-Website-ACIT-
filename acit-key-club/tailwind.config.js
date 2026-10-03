// Overview: Tailwind CSS styling configuration setting official Key Club brand colors.

/** @type {import('tailwindcss').Config} */
export default {
  // Scans project files to generate matching CSS classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Official Key Club International brand colors
      colors: {
        'nj-navy': '#002B49',     // Deep Navy: headers, main navbar, hero backdrop
        'kc-blue': '#00539B',     // Key Club Blue: buttons, active borders, links
        'kc-gold': '#FFC72C',     // Key Club Gold: badges, accents, highlights
        'kc-light-blue': '#C0D7E0', // Soft Blue: subtle borders and card highlights
        'kc-dark-gold': '#F0B800',  // Dark Gold: hover states
        'neutral-light': '#F8FAFC', // Neutral Light: clean section backgrounds
      },
    },
  },
  plugins: [],
}
