const { basename, dirname, resolve } = require('path');
const { build, loadEnv } = require('vite');
const { copySync, emptyDirSync } = require('fs-extra');
const Q3Rcon = require('quake3-rcon');
const { watch } = require('chokidar');
const { debounce } = require('lodash');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const outDir = 'dist';
const compiler = webpack(webpackConfig);

const run = asyncDebounce(async () => {
  emptyDirSync(outDir);

  await Promise.all([
    webpackBuild(),
    build({
      build: {
        outDir,
        emptyOutDir: false,
      },
    }),
  ]);

  const { BUILD_COPY_PATH: copyPath, BUILD_RCON: rconConnection } = loadEnv(
    'build',
    process.cwd(),
    ''
  );
  const resourceName = copyPath
    ? basename(copyPath)
    : basename(resolve(dirname(''), '../'));

  copyResourceToServer(resolve(dirname(''), 'dist'), copyPath);
  restartResource(rconConnection, resourceName);
}, 500);

run();
watch('src', { ignoreInitial: true }).on('all', run);

async function webpackBuild() {
  return new Promise<void>((resolve) =>
    compiler.run((err: any, stats: any) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        return resolve();
      }

      if (stats.hasErrors() || stats.hasWarnings()) {
        console.error(stats.toString('errors-warnings'));
      } else {
        console.log(stats.toString('summary'));
      }

      compiler.close(() => {
        resolve();
      });
    })
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

function asyncDebounce<F extends (...args: any[]) => Promise<any>>(
  func: F,
  wait?: number
) {
  const debounced = debounce(
    (resolve: any, reject: any, args: Parameters<F>) => {
      func(...args)
        .then(resolve)
        .catch(reject);
    },
    wait
  );
  return (...args: Parameters<F>): ReturnType<F> =>
    new Promise((resolve, reject) => {
      debounced(resolve, reject, args);
    }) as ReturnType<F>;
}
