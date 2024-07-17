/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')"
      },
      backgroundSize: {
        '100%':'100% 100%'
      },
      colors: {
        'header-color': 'rgba(255, 255, 255, 0.6)',
        'header-border-color':'rgba(5, 5, 5, 0.06)'
      },
      lineHeight: {
        '14': '56px',
      }
    },
  },
  plugins: [],
}

