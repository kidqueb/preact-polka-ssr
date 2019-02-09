const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../../dist')
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, '../../src'),
      components: path.join(__dirname, '../../src/app/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  }
};
