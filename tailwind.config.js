/** @type {import('tailwindcss').Config} */


const shadow = '4px 4px 0 rgba(18, 47, 76, 0.25)'

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',],
  theme: {
    extend: {
      boxShadow: {
        hackuta: shadow,
      },
      colors: {
        'hackuta-black': '#130D08',
        'hackuta-beige': '#D2C2A9',
        'hackuta-blue': '#2869A9',
        'hackuta-darkblue': '#122F4C',
        'hackuta-red': '#AF2922',
        'hackuta-darkred': '#8C1B16',
        'hackuta-yellow': '#F8B92A',
      },
      dropShadow: {
        hackuta: shadow,
      },
      fontFamily: {
        heading: ['var(--font-bungee)', 'sans-serif'],
        body: ['var(--font-atkinson)', 'sans-serif'],
        saotorpes: ['var(--font-sao-torpes)', 'sans-serif'],
        shrimp: ['var(--font-shrimp)', 'sans-serif'],
      },
      keyFrames: {
        'jump-shaking': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateY(-9px)' },
          '35%': { transform: 'translateY(-9px) rotate(17deg)' },
          '55%': { transform: 'translateY(-9px) rotate(-17deg)' },
          '65%': { transform: 'translateY(-9px) rotate(17deg)' },
          '75%': { transform: 'translateY(-9px) rotate(-17deg)' },
          '100%': { transform: 'translateY(0) rotate(0)' },
        }
      }
    },
  },
  plugins: [],
}