import { basename, resolve } from 'path';
import { loadEnv, Plugin, ResolvedConfig } from 'vite';
import { readFileSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';
import Q3Rcon from 'quake3-rcon';

function updateFxmanifest(outDir: string) {
  const {
    'src/client/index.ts': client,
    'src/server/index.ts': server,
  } = JSON.parse(readFileSync(resolve(outDir, 'manifest.json'), 'utf8'));

  const fxmanifest = resolve(outDir, 'fxmanifest.lua');
  const fxmanifestData = readFileSync(fxmanifest, 'utf-8');
  writeFileSync(
    fxmanifest,
    fxmanifestData
      .replace(client.src, client.file)
      .replace(server.src, server.file),
    'utf-8'
  );
}

function copyResourceToServer(from: string, to: string) {
  if (!to) return;
  copySync(from, to);
}

function restartResource(rconConnection: string, resourceName: string) {
  if (!rconConnection) return;
  const [address, port, password] = rconConnection.split(';');
  const rcon = new Q3Rcon({ address, port, password });
  rcon.send(`ensure ${resourceName}`, (response: string) =>
    console.log(response.substring(6))
  );
}

export default function nuiBuild(mode: string): Plugin {
  const { BUILD_COPY_PATH: copyPath, BUILD_RCON: rconConnection } = loadEnv(
    mode,
    process.cwd(),
    ''
  );
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
    async closeBundle() {
      updateFxmanifest(config.build.outDir);
      copyResourceToServer(config.build.outDir, copyPath);
      restartResource(rconConnection, resourceName);
    },
  };
}
