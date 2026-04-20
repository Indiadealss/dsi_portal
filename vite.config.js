import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    legacy({
    targets: ['defaults', 'not IE 11']
  })
  ],

  build: {
    target: "es2015" // 🔥 important fix
  },
  optimizeDeps:{
    include : ["mammoth"]
  },
  server:{
    host: true,              // ✅ allow network & ngrok access
    port: 5173,
    strictPort: true,

    allowedHosts: "all",
     proxy:{
      "/api":{
        target:"http://localhost:5001",
        changeOrigin:true,
        secure:false,
      }
     }
  }

})
