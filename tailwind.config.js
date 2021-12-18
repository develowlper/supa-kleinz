module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: { hover: '0.25rem 0.25rem' },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Source Code Pro', 'monospace'],
      serif: ['Poiret One', 'serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
