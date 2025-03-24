import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    https: {
      key: fs.readFileSync('C:/dev/cert/key_decrypted.pem'),  // Använd key_decrypted.pem om du tog bort lösenordet
      cert: fs.readFileSync('C:/dev/cert/cert.pem'),
    },
  },
  plugins: [
    react(),
    // Inaktivera temporärt componentTagger som verkar orsaka problem
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Lägg till crypto polyfill
      "crypto": "crypto-browserify"
    },
  },
}));