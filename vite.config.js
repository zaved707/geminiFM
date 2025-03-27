// vite.config.js
import tailwindcss from '@tailwindcss/vite'
export default {
    // config options
    server: {
        proxy: {
          '/api': 'http://localhost:5000'
        }
      },
    plugins: [
        tailwindcss(),
      ],
  }