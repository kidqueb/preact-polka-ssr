const merge = require('webpack-merge')
const shared = require('../shared.js')

module.exports = merge(shared, {
  target: 'node',
  entry: {
    server: './src/server/index.js'
  },
  output: {
    filename: '[name].js',
  }
})
