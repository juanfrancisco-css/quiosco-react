import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    input: [
        'src/index.css',
        'src/App.jsx',
    ],
    refresh: true,
})],
})
