import { basename, resolve } from 'path';
import { loadEnv, Plugin, ResolvedConfig } from 'vite';

export default function nuiBuild(mode: string): Plugin {
  const { BUILD_COPY_PATH: copyPath } = loadEnv(mode, process.cwd(), '');
  const resourceName = copyPath
    ? basename(copyPath)
    : basename(resolve(__dirname, '../'));

  let config: ResolvedConfig | undefined;

  return {
    name: 'nui-build',
    apply: 'build',
    configResolved(resolvedConfig) {
      resolvedConfig.base = `nui://${resourceName}${copyPath ? '' : '/dist'}/`;
      config = resolvedConfig;
    },
  };
}
