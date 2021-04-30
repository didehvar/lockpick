import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import nuiBuild from './plugins/nui-build';

export default ({ mode }) => {
  return defineConfig({
    plugins: [vue(), nuiBuild(mode)],
    build: {
      ...(mode === 'build'
        ? {
            watch: {
              buildDelay: 500,
            },
          }
        : {}),
    },
  });
};
