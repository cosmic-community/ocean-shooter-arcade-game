/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          dark: '#0a1628',
          deep: '#1a2f4f',
          medium: '#2a4f7f',
          light: '#4a7faf',
          surface: '#6aafdf',
        },
        arcade: {
          yellow: '#ffff00',
          red: '#ff0000',
          green: '#00ff00',
          cyan: '#00ffff',
        },
      },
      fontFamily: {
        arcade: ['Press Start 2P', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        swim: 'swim 3s ease-in-out infinite',
        shoot: 'shoot 0.5s ease-out forwards',
        hit: 'hit 0.3s ease-out forwards',
      },
      keyframes: {
        swim: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shoot: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
        hit: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1.5) rotate(180deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}