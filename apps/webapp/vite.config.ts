import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
