import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
//import vitePluginSass from 'vite-plugin-sass'

export default defineConfig({
  base: '/noper_app_front/',
  build: {
    chunkSizeWarningLimit: 3000, //лимит для чанков
    cssCodeSplit: true,
    minify: 'terser', // включаем минификацию, если это еще не сделано
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext', // используем более оптимизированный target
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2015',
    },
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    host: true,
    port: 3000, 
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
})
