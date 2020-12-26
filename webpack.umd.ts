import { merge } from 'webpack-merge';
import defaultConfig from './webpack.config';

export default merge(defaultConfig, {
  output: {
    libraryTarget: 'umd',
    library: 'react-directform',
    filename: 'react-directform.umd.js',
  },
});
