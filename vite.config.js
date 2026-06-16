import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path matches the GitHub Pages repo name so assets resolve correctly
// at https://berylhu43.github.io/personal_web_skill_test/
export default defineConfig({
  plugins: [react()],
  base: '/personal_web_skill_test/',
})
