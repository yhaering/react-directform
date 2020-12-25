import { mergeWithCustomize } from 'webpack-merge';
import defaultConfig from './webpack.config';
import HtmlWebpackPlugin = require('html-webpack-plugin');

export default mergeWithCustomize({
  customizeObject: (a, b, key) => {
    if (key === 'output') {
      return {
        filename: 'index.js',
      };
    }
    return undefined;
  },
})(defaultConfig, {
  entry: './sandbox/index.tsx',
  mode: 'development',
  devtool: 'source-map',
  output: {},
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
