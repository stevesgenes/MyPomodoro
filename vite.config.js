import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/

// change base path to '/MyPomodoro/' for GitHub Pages deployment
// change base path to './' for local development/npm builds

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
})
