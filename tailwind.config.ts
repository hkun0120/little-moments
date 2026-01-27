import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdecd6',
          200: '#fad5ac',
          300: '#f6b777',
          400: '#f19140',
          500: '#ed751b',
          600: '#de5a11',
          700: '#b84310',
          800: '#933615',
          900: '#772f14',
        },
        warm: {
          50: '#fffbf5',
          100: '#fff5e8',
          200: '#ffe8cc',
          300: '#ffd7a3',
          400: '#ffbe6b',
          500: '#ffa033',
          600: '#f08000',
          700: '#c76200',
          800: '#9e4d00',
          900: '#7f3f00',
        },
        soft: {
          pink: '#fce7f3',
          blue: '#dbeafe',
          green: '#dcfce7',
          yellow: '#fef9c3',
          purple: '#f3e8ff',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
