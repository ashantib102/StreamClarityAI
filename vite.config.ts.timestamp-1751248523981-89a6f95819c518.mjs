// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "inject-api-keys",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "api-config.js",
          source: `
// API Configuration for Chrome Extension
window.API_CONFIG = {
  OPENAI_API_KEY: "${process.env.VITE_OPENAI_API_KEY || ""}",
  YOUTUBE_API_KEY: "${process.env.VITE_YOUTUBE_API_KEY || ""}"
};
          `.trim()
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB7XG4gICAgICBuYW1lOiAnaW5qZWN0LWFwaS1rZXlzJyxcbiAgICAgIGdlbmVyYXRlQnVuZGxlKCkge1xuICAgICAgICAvLyBDcmVhdGUgYSBzY3JpcHQgdGhhdCBpbmplY3RzIEFQSSBrZXlzIGludG8gdGhlIGV4dGVuc2lvbiBjb250ZXh0XG4gICAgICAgIHRoaXMuZW1pdEZpbGUoe1xuICAgICAgICAgIHR5cGU6ICdhc3NldCcsXG4gICAgICAgICAgZmlsZU5hbWU6ICdhcGktY29uZmlnLmpzJyxcbiAgICAgICAgICBzb3VyY2U6IGBcbi8vIEFQSSBDb25maWd1cmF0aW9uIGZvciBDaHJvbWUgRXh0ZW5zaW9uXG53aW5kb3cuQVBJX0NPTkZJRyA9IHtcbiAgT1BFTkFJX0FQSV9LRVk6IFwiJHtwcm9jZXNzLmVudi5WSVRFX09QRU5BSV9BUElfS0VZIHx8ICcnfVwiLFxuICBZT1VUVUJFX0FQSV9LRVk6IFwiJHtwcm9jZXNzLmVudi5WSVRFX1lPVVRVQkVfQVBJX0tFWSB8fCAnJ31cIlxufTtcbiAgICAgICAgICBgLnRyaW0oKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFGeEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ047QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUVmLGFBQUssU0FBUztBQUFBLFVBQ1osTUFBTTtBQUFBLFVBQ04sVUFBVTtBQUFBLFVBQ1YsUUFBUTtBQUFBO0FBQUE7QUFBQSxxQkFHRyxRQUFRLElBQUksdUJBQXVCLEVBQUU7QUFBQSxzQkFDcEMsUUFBUSxJQUFJLHdCQUF3QixFQUFFO0FBQUE7QUFBQSxZQUVoRCxLQUFLO0FBQUEsUUFDVCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxNQUFNLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3ZDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
