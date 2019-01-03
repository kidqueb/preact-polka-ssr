const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./base.js')

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  optimization: {
    minimize: false
  }
});
