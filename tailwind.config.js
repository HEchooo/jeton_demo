const {nextui} = require("@nextui-org/react");
module.exports = {
  darkMode: ['class'],
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        "mo": {'max': '767px'},
        "md": {'max': '1200px'}
      },
      fontSize: {
        'sg': '1.325rem',
        '4xl': '2rem'
      },
      backgroundImage: {
        'qr': 'linear-gradient(90deg, #97E0FF 0%, #6EB0FF 50%, #B499FF 100%)',
        'linear-green-table': 'linear-gradient(180deg, rgba(223, 244, 244, 0.6) 0%, rgba(223, 244, 244, 0.00) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "vs-black": '#131313',
        "vs-nav": '#34335A',
        "vs-part": '#F1EFF9',
        "vs-content": '#F6F6F6',
        "nav-color-active": '#3C406C',
        "primary": '#5C5BA0',
        "word-light": '#A3A4AD',
        "word-grey": '#5E5E66',
        "danger": '#FF3D3D',
        "vs-red": '#E34949',
        'hover': '#E1EAFC',
        "vs-btn": '#5C5BA0'
      },
      keyframes: {
        'vsTrans': {
            'from': { transform: 'translateX(-100%)'},
            'to': { transform: 'translateX(100%)'},
         }
      },
      animation: {
        'vsTrans': 'vsTrans 2s ease infinite',
      }
    },
  },
  plugins: [nextui()],
  corePlugins: {
    //preflight: false
  }
};