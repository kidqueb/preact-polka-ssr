const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./common.js')

module.exports = merge(common, {
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
