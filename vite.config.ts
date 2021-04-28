import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import nuiBuild from './plugins/nui-build';

export default ({ mode }) => {
  return defineConfig({
    plugins: [vue(), nuiBuild(mode)],

    build: {
      manifest: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          client: resolve(__dirname, 'src/client/index.ts'),
          server: resolve(__dirname, 'src/server/index.ts'),
        },
      },
    },
  });
};
