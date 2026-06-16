import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Root base path for the user/profile GitHub Pages site at
// https://berylhu43.github.io/ (repo must be named berylhu43.github.io)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
