import { defineConfig } from 'vite';
import fs from 'fs/promises';
const { resolve } = require('path');
import react from '@vitejs/plugin-react';
const reactSvgPlugin = require('vite-plugin-react-svg');

import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), reactSvgPlugin()],
  base: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  // esbuild: {
  //   loader: 'jsx',
  //   include: /src\/.*\.jsx?$/,
  //   // loader: "tsx",
  //   // include: /src\/.*\.[tj]sx?$/,
  //   exclude: [],
  // },

  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [
  //       {
  //         name: 'load-js-files-as-jsx',
  //         setup(build) {
  //           build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
  //             loader: 'jsx',
  //             contents: await fs.readFile(args.path, 'utf8'),
  //           }));
  //         },
  //       },
  //     ],
  //   },
  // },
  build: {
    manifest: true,
    rollupOptions: {},
  },
});
