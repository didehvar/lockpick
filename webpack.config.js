const { resolve } = require('path');
const { IgnorePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

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
        loader: 'ts-loader',
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
  plugins: [
    new IgnorePlugin(/^pg-native$/),
    new FilterWarningsPlugin({
      exclude: [
        /mongodb/,
        /mssql/,
        /mysql/,
        /mysql2/,
        /oracledb/,
        /pg/,
        /pg-native/,
        /pg-query-stream/,
        /react-native-sqlite-storage/,
        /redis/,
        /sqlite3/,
        /sql.js/,
        /typeorm-aurora-data-api-driver/,
        /@sap\/hana-client/,
        /hdb-pool/,
      ],
    }),
  ],
});

module.exports = [
  merge(commonConfig('client'), {}),
  merge(commonConfig('server'), {
    target: 'node12',
    node: {
      __dirname: true,
    },
    optimization: {
      minimize: false,
    },
  }),
];
