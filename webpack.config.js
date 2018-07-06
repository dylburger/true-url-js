const path = require('path');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  JS: path.resolve(__dirname, 'js'),
};

module.exports = {
  entry: path.join(paths.JS, 'trueUrl.js'),
  output: {
    path: paths.DIST,
    filename: 'trueUrl.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
