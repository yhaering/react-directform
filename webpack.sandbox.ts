import { merge } from 'webpack-merge';
import defaultConfig from './webpack.config';
import HtmlWebpackPlugin = require('html-webpack-plugin');

export default merge(defaultConfig, {
  entry: './sandbox/index.tsx',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /$.scss/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './sandbox/index.html',
    }),
  ],
});
