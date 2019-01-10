const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WorkboxPlugin = require('workbox-webpack-plugin')
const base = require('./base.js')

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: { keep_fnames: true }
      })
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      defaultSizes: 'gzip'
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        { urlPattern: /assets/, handler: 'cacheFirst' },
        { urlPattern: /.*/, handler: 'networkFirst' }
      ]
    })
  ]
})
