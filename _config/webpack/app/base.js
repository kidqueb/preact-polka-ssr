const path = require('path')
const merge = require('webpack-merge')
const shared = require('../shared.js')
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = merge(shared, {
  entry: {
    app: './src/app/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
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
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
})
