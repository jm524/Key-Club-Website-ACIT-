// Overview: Vite configuration defining dev server and build plugins.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Development server and build settings
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
