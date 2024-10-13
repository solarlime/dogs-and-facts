/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        '.yarn/',
        '.pnp.cjs',
        '.pnp.loader.mjs',
        '.eslintrc.cjs',
        'vite.config.ts',
        'node_modules/',
        'src/setupTests.ts',
        'src/vite-env.d.ts',
        'dist',
      ],
    },
  },
  plugins: [react()],
});
