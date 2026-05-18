/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e14',
        'bg-soft': '#0f1620',
        defense: '#00b4d8',
        attack: '#ff4444',
        ball: '#f5c542',
        accent: '#00dc82',
        error: '#ff4444',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pulseRing: {
          '0%,100%': { opacity: '0.9', strokeWidth: '2' },
          '50%': { opacity: '0.3', strokeWidth: '5' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-60px)', opacity: '0' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%,60%': { transform: 'translateX(-6px)' },
          '40%,80%': { transform: 'translateX(6px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        flashGreen: {
          '0%': { opacity: '0' },
          '15%': { opacity: '0.55' },
          '100%': { opacity: '0' },
        },
        flashRed: {
          '0%': { opacity: '0' },
          '15%': { opacity: '0.55' },
          '100%': { opacity: '0' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translateY(420px) rotate(540deg)', opacity: '0' },
        },
        nowCue: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '22%': { transform: 'scale(1.15)', opacity: '1' },
          '55%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        borderPulse: {
          '0%': { opacity: '0' },
          '20%': { opacity: '0.9' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 1.3s ease-in-out infinite',
        floatUp: 'floatUp 1s ease-out forwards',
        shake: 'shake 0.4s ease-in-out',
        pop: 'pop 0.3s ease-out',
        flashGreen: 'flashGreen 0.6s ease-out forwards',
        flashRed: 'flashRed 0.6s ease-out forwards',
        confetti: 'confetti 2.4s ease-in forwards',
        nowCue: 'nowCue 0.85s ease-out forwards',
        borderPulse: 'borderPulse 0.85s ease-out forwards',
      },
    },
  },
  plugins: [],
}
