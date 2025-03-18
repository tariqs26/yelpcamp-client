import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"

const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), "VITE_")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
