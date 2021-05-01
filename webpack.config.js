const { resolve } = require('path');
const { merge } = require('webpack-merge');

const commonConfig = (dir) => ({
  mode: 'production',
  entry: resolve(__dirname, `src/${dir}/index.ts`),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: `${dir}.js`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(__dirname, `src/${dir}/tsconfig.json`),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  performance: {
    hints: false,
  },
});

module.exports = [
  merge(commonConfig('client'), {}),
  merge(commonConfig('server'), {
    target: 'node12',
  }),
];
