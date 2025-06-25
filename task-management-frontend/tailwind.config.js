// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#c266a7',
        secondary: '#f3f4f6',
        text: '#e5e7eb',         // Light text on dark background
        darkbg: '#1c2127',       // New background color
      },
    },
  },
  plugins: [],
}
