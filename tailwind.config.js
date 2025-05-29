/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f2fe',
        'neon-purple': '#4facfe',
        'neon-green': '#00ff87',
        dark: {
          DEFAULT: '#000000',
          lighter: '#121212',
          border: '#2a2b36',
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 242, 254, 0.5)',
        'neon-purple': '0 0 20px rgba(79, 172, 254, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 135, 0.5)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};