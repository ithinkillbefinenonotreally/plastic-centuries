/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'clinical-white': '#F8FBFF',
        'archival-blue': '#DCEEFF',
        'research-blue': '#1E3A5F',
        'deep-slate': '#1A1A1A',
        'muted-blue': '#8FACC8',
        'border-blue': '#C4D9EE',
      },
      fontFamily: {
        'ibm': ['var(--font-ibm-plex-sans)', 'sans-serif'],
        'ibm-mono': ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'drift': 'drift 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        drift: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
      },
    },
  },
  plugins: [],
};
