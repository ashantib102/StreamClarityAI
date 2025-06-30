// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "fs";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "inject-api-keys",
      generateBundle() {
        const backgroundPath = resolve(__vite_injected_original_dirname, "public/background.js");
        let backgroundContent = fs.readFileSync(backgroundPath, "utf-8");
        const openaiKey = process.env.VITE_OPENAI_API_KEY || "";
        const youtubeKey = process.env.VITE_YOUTUBE_API_KEY || "";
        const apiKeysInjection = `
// API Keys injected during build
const OPENAI_API_KEY = '${openaiKey}';
const YOUTUBE_API_KEY = '${youtubeKey}';

`;
        backgroundContent = apiKeysInjection + backgroundContent;
        this.emitFile({
          type: "asset",
          fileName: "background.js",
          source: backgroundContent
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAge1xuICAgICAgbmFtZTogJ2luamVjdC1hcGkta2V5cycsXG4gICAgICBnZW5lcmF0ZUJ1bmRsZSgpIHtcbiAgICAgICAgLy8gUmVhZCB0aGUgYmFja2dyb3VuZC5qcyBmaWxlIGFuZCBpbmplY3QgQVBJIGtleXNcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZFBhdGggPSByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYy9iYWNrZ3JvdW5kLmpzJyk7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kQ29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhiYWNrZ3JvdW5kUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICAgIFxuICAgICAgICAvLyBSZXBsYWNlIHBsYWNlaG9sZGVyIHZhbHVlcyB3aXRoIGFjdHVhbCBBUEkga2V5c1xuICAgICAgICBjb25zdCBvcGVuYWlLZXkgPSBwcm9jZXNzLmVudi5WSVRFX09QRU5BSV9BUElfS0VZIHx8ICcnO1xuICAgICAgICBjb25zdCB5b3V0dWJlS2V5ID0gcHJvY2Vzcy5lbnYuVklURV9ZT1VUVUJFX0FQSV9LRVkgfHwgJyc7XG4gICAgICAgIFxuICAgICAgICAvLyBJbmplY3QgdGhlIEFQSSBrZXlzIGF0IHRoZSB0b3Agb2YgdGhlIGJhY2tncm91bmQgc2NyaXB0XG4gICAgICAgIGNvbnN0IGFwaUtleXNJbmplY3Rpb24gPSBgXG4vLyBBUEkgS2V5cyBpbmplY3RlZCBkdXJpbmcgYnVpbGRcbmNvbnN0IE9QRU5BSV9BUElfS0VZID0gJyR7b3BlbmFpS2V5fSc7XG5jb25zdCBZT1VUVUJFX0FQSV9LRVkgPSAnJHt5b3V0dWJlS2V5fSc7XG5cbmA7XG4gICAgICAgIFxuICAgICAgICBiYWNrZ3JvdW5kQ29udGVudCA9IGFwaUtleXNJbmplY3Rpb24gKyBiYWNrZ3JvdW5kQ29udGVudDtcbiAgICAgICAgXG4gICAgICAgIC8vIEVtaXQgdGhlIG1vZGlmaWVkIGJhY2tncm91bmQuanNcbiAgICAgICAgdGhpcy5lbWl0RmlsZSh7XG4gICAgICAgICAgdHlwZTogJ2Fzc2V0JyxcbiAgICAgICAgICBmaWxlTmFtZTogJ2JhY2tncm91bmQuanMnLFxuICAgICAgICAgIHNvdXJjZTogYmFja2dyb3VuZENvbnRlbnRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sUUFBUTtBQUhmLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFFZixjQUFNLGlCQUFpQixRQUFRLGtDQUFXLHNCQUFzQjtBQUNoRSxZQUFJLG9CQUFvQixHQUFHLGFBQWEsZ0JBQWdCLE9BQU87QUFHL0QsY0FBTSxZQUFZLFFBQVEsSUFBSSx1QkFBdUI7QUFDckQsY0FBTSxhQUFhLFFBQVEsSUFBSSx3QkFBd0I7QUFHdkQsY0FBTSxtQkFBbUI7QUFBQTtBQUFBLDBCQUVQLFNBQVM7QUFBQSwyQkFDUixVQUFVO0FBQUE7QUFBQTtBQUk3Qiw0QkFBb0IsbUJBQW1CO0FBR3ZDLGFBQUssU0FBUztBQUFBLFVBQ1osTUFBTTtBQUFBLFVBQ04sVUFBVTtBQUFBLFVBQ1YsUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUN2QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
