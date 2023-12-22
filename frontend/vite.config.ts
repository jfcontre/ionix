import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

const env = loadEnv(
  'all',
  process.cwd()
);

let port = +env.VITE_PORT || 3001
export default defineConfig({
  plugins: [react()],
  server: {
    port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})