/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          1: '#542F85',
          2: '#703897',
          3: '#A049B1',
          4: '#D09FDA',
          5: '#F3E8F5'
        },
        gray: {
          2: '#DBDDE1',
          25: '#F5F5F5',
          50: '#EEEEEE',
          100: '#D4D5D8',
          200: '#B7B9C0',
          700:'#50535E',
          800: '#3E4149'
        },
        butter: "#D4D5D8",
        dark: '#2B2D32',
        graymatter: '#50535E',
        orange: {
          600: '#F29A38'
        },
        red: {
          50:'#F6E9E7',
          800: '#C0492C',
          900:'#A83C23'
        },
        yellow: {
          50: '#FCF7E1',
          700:'#E89937'
        },
        green: {
          50:'#E4F7EC',
          800: '#3A843F'
        }
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        medium: '0px 8px 24px 0px rgba(0, 35, 11, 0.12)'
      }
    }
  },
  plugins: []
}
