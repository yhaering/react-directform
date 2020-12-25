import { merge } from 'webpack-merge';
import defaultConfig from './webpack.config';

export default merge(defaultConfig, {
  entry: './sandbox/index.tsx',
  output: {
    libraryTarget: 'umd',
    library: 'react-directform',
    filename: 'react-directform.umd.js',
  },
});
