import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-api-keys',
      generateBundle() {
        // Read the background.js file and inject API keys
        const backgroundPath = resolve(__dirname, 'public/background.js');
        let backgroundContent = fs.readFileSync(backgroundPath, 'utf-8');
        
        // Replace placeholder values with actual API keys
        const openaiKey = process.env.VITE_OPENAI_API_KEY || '';
        const youtubeKey = process.env.VITE_YOUTUBE_API_KEY || '';
        
        // Inject the API keys at the top of the background script
        const apiKeysInjection = `
// API Keys injected during build
const OPENAI_API_KEY = '${openaiKey}';
const YOUTUBE_API_KEY = '${youtubeKey}';

`;
        
        backgroundContent = apiKeysInjection + backgroundContent;
        
        // Emit the modified background.js
        this.emitFile({
          type: 'asset',
          fileName: 'background.js',
          source: backgroundContent
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