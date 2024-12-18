import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
//import vitePluginSass from 'vite-plugin-sass'

export default defineConfig({
  base: '/noper_app_front/',
  build: {
    chunkSizeWarningLimit: 3000,
    outDir: 'dist',
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    host: '0.0.0.0', // Это нужно для того, чтобы сервер Vite был доступен из контейнеров Docker
    port: 3000, // Убедитесь, что порт совпадает с тем, что указан в конфигурации Nginx
  },
})
