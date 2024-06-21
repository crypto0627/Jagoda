import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      backgroundImage:{
        'image': 'url(/beachVid.mp4)'
      },
      colors: {
        primary: {
          100: '#709dff',
          200: '#5651e5'
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config

