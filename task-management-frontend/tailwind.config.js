// tailwind.config.js 
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#c266a7',
        secondary: '#f3f4f6',
        text: '#e5e7eb',
        darkbg: '#1c2127',

      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s ease-out',
      },
    },
  },
  plugins: [],
}
