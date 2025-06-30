import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-api-keys',
      generateBundle() {
        // Create a script that injects API keys into the extension context
        this.emitFile({
          type: 'asset',
          fileName: 'api-config.js',
          source: `
// API Configuration for Chrome Extension
window.API_CONFIG = {
  OPENAI_API_KEY: "${process.env.VITE_OPENAI_API_KEY || ''}",
  YOUTUBE_API_KEY: "${process.env.VITE_YOUTUBE_API_KEY || ''}"
};
          `.trim()
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});