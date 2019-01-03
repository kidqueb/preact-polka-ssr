const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    app: './src/app/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/'
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: process.env.NODE_ENV === 'production' ? 'file-loader' : 'url-loader'
			}
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    }
  },
  plugins: [
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ]
}
