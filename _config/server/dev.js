const path = require('path')
const merge = require('webpack-merge')
const NodemonPlugin = require('nodemon-webpack-plugin')
const common = require('./common.js')

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new NodemonPlugin({
      watch: path.resolve('./dist'),
      script: './dist/server.js'
    })
  ]
});