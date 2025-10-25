import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 3000,
    middlewareMode: false,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
      strict: true,
    },
    headers: {
      // Ensure proper MIME types for video files
      'Accept-Ranges': 'bytes',
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Custom plugin to handle URL decoding errors
    {
      name: 'url-decode-handler',
      configureServer(server: { middlewares: { use: (middleware: (req: { url?: string }, res: unknown, next: () => void) => void) => void } }) {
        server.middlewares.use((req: { url?: string }, res: unknown, next: () => void) => {
          try {
            if (req.url) {
              // Normalize the URL to prevent malformed URI errors
              req.url = req.url.replace(/\\/g, '/');
              // Try to decode the URL safely
              try {
                decodeURIComponent(req.url);
              } catch (e) {
                // If decoding fails, clean up the URL
                req.url = req.url.replace(/%(?![0-9A-Fa-f]{2})/g, '%25');
              }
            }
          } catch (error) {
            console.warn('URL processing warning:', error);
          }
          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src").replace(/\\/g, '/'),
    },
  },
  assetsInclude: ['**/*.mp4', '**/*.webm'],
  publicDir: 'public',
  optimizeDeps: {
    exclude: ['@videojs/http-streaming'],
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.mp4')) {
            return 'videos/[name].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
}));
