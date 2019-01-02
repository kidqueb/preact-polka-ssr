const merge = require('webpack-merge')
const common = require('./webpack.common.client.js')

module.exports = merge(common, {
  mode: 'production'
})
