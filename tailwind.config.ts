import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-color)',
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'accent': 'var(--accent-color)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-warm': '#f59e0b',
        'accent-cyan': '#22d3ee',
        'grid': 'var(--grid-color)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        handwriting: ['Caveat', 'cursive'],
        title: ['Space Grotesk', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 20px rgba(45, 212, 191, 0.1)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(45, 212, 191, 0.25)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('light', '.light &');
    })
  ]
}
