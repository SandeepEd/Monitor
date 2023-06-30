import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ 
  server: {
    proxy: {
      '/api': {
        target: 'http://admin:t3st1u1999@129.79.38.39/Monarch/syncconnect/sdk.aspx',
      },
    },
  },
  plugins: [react()],
})
