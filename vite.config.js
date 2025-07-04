import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from .env file in the root directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Define global constants which can be replaced at build time.
    define: {
      // This ensures that `process.env.API_KEY` in your application code
      // is replaced with the value of VITE_API_KEY from your .env file.
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
      'process.env.USE_MOCK_IMAGES': JSON.stringify(env.VITE_USE_MOCK_IMAGES),
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
      open: true, // Automatically open the app in the browser on server start
    },
  };
});