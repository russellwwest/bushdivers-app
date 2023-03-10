import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

const hash = Math.floor(Math.random() * 90000) + 10000

export default defineConfig({
  plugins: [
    laravel(['resources/js/app.jsx']),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name]' + hash + '.js',
        chunkFileNames: '[name]' + hash + '.js',
        assetFileNames: '[name]' + hash + '.[ext]'
      }
    }
  }
})
