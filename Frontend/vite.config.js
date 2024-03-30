import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({ 
  server: {
    proxy: {
      "/api": "https://backend.lunar-edge.online",
    }  
  } ,
  plugins: [react()],
})
