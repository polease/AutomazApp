/* eslint-env node */

import { chrome } from '../../.electron-vendors.cache.json';
import { join } from 'path';
import { builtinModules } from 'module';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vuetify/vite-plugin'

const PACKAGE_ROOT = __dirname;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    root: "./",
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    publicDir: 'assets',
    rollupOptions: {
      input: {
        index: join(PACKAGE_ROOT, 'index.html'),
        editor: join(PACKAGE_ROOT, 'editor.html'),
        host: join(PACKAGE_ROOT, 'host.html'),
      },

      external: [
        ...builtinModules.flatMap(p => [p, `node:${p}`]),
      ],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    environment: 'happy-dom',
  },
};

export default config;
