const merge = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin");
const base = require('./base.js')

module.exports = merge(base, {
  mode: 'production',
  optimization: {
		minimizer: [new TerserPlugin()]
	}
});
