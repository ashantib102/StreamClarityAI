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
  console.log('Current working directory:', process.cwd());
  console.log('Environment variables loaded:', Object.keys(env).filter(key => key.startsWith('VITE_')));
  console.log('VITE_OPENAI_API_KEY present:', !!env.VITE_OPENAI_API_KEY);
  console.log('VITE_YOUTUBE_API_KEY present:', !!env.VITE_YOUTUBE_API_KEY);
  
  return {
    plugins: [
      react(),
      {
        name: 'inject-api-keys',
        generateBundle() {
          console.log('=== API Key Injection Plugin ===');
          
          // Read the background.js file and inject API keys
          const backgroundPath = resolve(__dirname, 'public/background.js');
          let backgroundContent = fs.readFileSync(backgroundPath, 'utf-8');
          
          // Get API keys from environment
          const openaiKey = env.VITE_OPENAI_API_KEY || '';
          const youtubeKey = env.VITE_YOUTUBE_API_KEY || '';
          
          console.log('Injecting API keys...');
          console.log('OpenAI key present:', !!openaiKey);
          console.log('OpenAI key length:', openaiKey.length);
          console.log('YouTube key present:', !!youtubeKey);
          console.log('YouTube key length:', youtubeKey.length);
          
          if (!openaiKey || !youtubeKey) {
            console.error('❌ ERROR: API keys not found in environment variables');
            console.error('Make sure you have a .env file with VITE_OPENAI_API_KEY and VITE_YOUTUBE_API_KEY');
            console.error('Current env keys:', Object.keys(env).filter(key => key.startsWith('VITE_')));
          }
          
          // Inject the API keys at the top of the background script
          const apiKeysInjection = `// API Keys injected during build
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