const path = require('path')

module.exports = {
  target: 'node',
  entry: {
    server: './src/server.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: process.env.NODE_ENV === 'production' ? 'file-loader' : 'url-loader'
			}
    ]
  }
}
