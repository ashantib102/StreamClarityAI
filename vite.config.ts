import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('=== Environment Debug Info ===');
  console.log('Mode:', mode);
  console.log('VITE_OPENAI_API_KEY present:', !!env.VITE_OPENAI_API_KEY);
  console.log('VITE_YOUTUBE_API_KEY present:', !!env.VITE_YOUTUBE_API_KEY);
  
  return {
    plugins: [
      react(),
      {
        name: 'inject-api-keys',
        writeBundle() {
          console.log('=== API Key Injection Plugin ===');
          
          // Get API keys from environment
          const openaiKey = env.VITE_OPENAI_API_KEY || '';
          const youtubeKey = env.VITE_YOUTUBE_API_KEY || '';
          
          console.log('OpenAI key present:', !!openaiKey);
          console.log('YouTube key present:', !!youtubeKey);
          
          if (!openaiKey || !youtubeKey) {
            console.error('❌ ERROR: API keys not found in environment variables');
            console.error('Make sure you have a .env file with VITE_OPENAI_API_KEY and VITE_YOUTUBE_API_KEY');
            throw new Error('Missing API keys in environment variables');
          }
          
          // Read the source background.js file
          const backgroundSourcePath = resolve(__dirname, 'public/background.js');
          const backgroundDistPath = resolve(__dirname, 'dist/background.js');
          
          let backgroundContent = fs.readFileSync(backgroundSourcePath, 'utf-8');
          
          // Inject the API keys at the top of the background script
          const apiKeysInjection = `// API Keys injected during build
const OPENAI_API_KEY = '${openaiKey}';
const YOUTUBE_API_KEY = '${youtubeKey}';

`;
          
          backgroundContent = apiKeysInjection + backgroundContent;
          
          // Write the modified background.js to dist folder
          fs.writeFileSync(backgroundDistPath, backgroundContent);
          
          console.log('✅ Background.js generated with API keys');
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
  };
});