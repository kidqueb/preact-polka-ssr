const path = require('path')
const merge = require('webpack-merge')
const NodemonPlugin = require('nodemon-webpack-plugin')
const base = require('./base.js')

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new NodemonPlugin({
      watch: path.resolve('./dist'),
      script: './dist/server.js'
    })
  ]
});
