/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2a324b',
          light: '#3a4258',
          dark: '#1a1f2e',
        },
        success: '#00dc82',
        info: '#3b82f6',
        warning: '#f59e0b',
        danger: '#ef4444',
        dark: {
          DEFAULT: '#0d1117',
          lighter: '#1a1f2e',
          border: '#2a324b',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 220, 130, 0.2)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};