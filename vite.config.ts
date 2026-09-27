import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The Spooder backend proxies none of this for us in dev - it only serves the
// production build (see ../Spooder/src/core/service/WebService.ts). These are
// every API prefix used by src/app/api/*Slice.ts's fetchBaseQuery baseUrls, plus the
// module UIs the node editor loads and the module routes their inspectors call.
const apiPrefixes = [
  '/mod',
  '/theme',
  '/modules',
  '/twitch',
  '/discord',
];

export default defineConfig(({ command }) => ({
  // This app is served at /mod by the backend (unlike main, which is served at /),
  // so built asset URLs need to resolve under that path prefix.
  base: '/mod/',
  resolve: {
    // The node graph editor and module SDK are linked in from the main WebUI's checkout. Kept as
    // symlinks, their imports (react, redux, the component library) resolve from this app's
    // node_modules - followed to their real path they'd find the main WebUI's copies instead,
    // and the app would end up with two of each.
    preserveSymlinks: true,
    dedupe: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'react-hook-form'],
  },
  // Served as source rather than pre-bundled, so they resolve like the rest of the app.
  optimizeDeps: { exclude: ['@spooder/webui-module-sdk', '@spooder/webui-node-graph'] },
  plugins: [
    react(),
    // The host half of module federation: the installed WebUI modules are built with their
    // shared libraries left out (`import: false`), so this app has to declare the same ones or
    // a module fails to load. Build only - turning it on in dev breaks the dev server, for the
    // same reason as in the main WebUI.
    ...(command === 'build'
      ? federation({
          name: 'spooder_modui',
          remotes: {},
          shared: {
            react: { singleton: true, requiredVersion: '^18.0.0' },
            'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
            'react-redux': { singleton: true },
            '@reduxjs/toolkit': { singleton: true },
            'react-hook-form': { singleton: true },
            '@spooder/webui-component-library': { singleton: true },
            '@spooder/webui-module-sdk': { singleton: true, requiredVersion: '^0.6.0' },
          },
        })
      : []),
  ],
  server: {
    port: 3001,
    proxy: Object.fromEntries(
      apiPrefixes.map((prefix) => [prefix, { target: 'http://localhost:3000', changeOrigin: true }]),
    ),
  },
  build: {
    // The backend expects a folder literally named `build`, not Vite's default `dist`.
    outDir: 'build',
    // Federation's runtime uses top-level await.
    target: 'esnext',
  },
}));
