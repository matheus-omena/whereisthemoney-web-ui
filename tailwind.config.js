module.exports = {
  darkMode: "class",
  content: [
    './src/**/*.tsx',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    container: false
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),    
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
          '@screen 2xl': {
            maxWidth: '1320px',
          },
        }
      })
    }
  ]
}