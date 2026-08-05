import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The Spooder backend proxies none of this for us in dev - it only serves the
// production build (see ../Spooder/src/core/service/WebService.ts). These are
// every API prefix used by src/Request.ts's fetch() calls.
const apiPrefixes = [
  '/theme',
  '/shares',
];

export default defineConfig({
  base: '/share/',
  plugins: [react()],
  server: {
    port: 3001,
    proxy: Object.fromEntries(
      apiPrefixes.map((prefix) => [prefix, { target: 'http://localhost:3000', changeOrigin: true }]),
    ),
  },
  build: {
    // The backend expects a folder literally named `build`, not Vite's default `dist`.
    outDir: 'build',
  },
});
