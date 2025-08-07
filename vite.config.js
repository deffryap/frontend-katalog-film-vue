import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || 'https://katalog-film-be-prisma.netlify.app/')
  }
})
