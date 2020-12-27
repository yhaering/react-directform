import { merge } from 'webpack-merge';
import defaultConfig from './webpack.config';

export default merge(defaultConfig, {
  output: {
    filename: 'react-directform.cjs.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
    yup: 'yup',
  },
});
