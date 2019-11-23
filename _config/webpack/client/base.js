const merge = require('webpack-merge')
const shared = require('../shared.js')
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = merge(shared, {
  entry: {
    client: './src/client/index.js'
  },
  output: {
    filename: isDev ? '[name].dev.js' : '[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ExtractCssChunks.loader, 'css-loader', 'sass-loader']
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
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new ManifestPlugin(),
    new ExtractCssChunks({
      filename: isDev ? '[name].dev.css' : '[name].[hash].css',
      chunkFilename: isDev ? '[name].dev.css' : '[name].[hash].css'
    })
  ]
})
