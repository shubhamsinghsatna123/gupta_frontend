import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Base path configuration:
// - Default: '/' (works for Vercel, Netlify, etc.)
// - For GitHub Pages: Use BASE_PATH=/gupta/ environment variable
// - Can be overridden with --base flag in build command
export default defineConfig(({ command, mode }) => {
  // Check for BASE_PATH environment variable (for GitHub Pages)
  // If not set, use '/' (works for Vercel and most platforms)
  const base = process.env.BASE_PATH || '/'
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'build',
    },
  }
})

