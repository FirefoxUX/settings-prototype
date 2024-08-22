import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@src': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: (d: any) => {
          const prepend = `@use "src/styles/utils.sass" as utils\n`
          const match = d.match(/^\s*/)
          const spaces = match ? match[0] : ''
          return `${spaces}${prepend}\n${d}`
        },
      },
    },
  },
})
