import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from 'url';
import { defineConfig } from "vite";

// Convert the URL object to a file path
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})