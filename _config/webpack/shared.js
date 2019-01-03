const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-transform-modules-commonjs",
            "@babel/plugin-transform-react-constant-elements",
            ["@babel/plugin-transform-react-jsx", { "pragma": "h" }]
          ],
          presets: [
            ["@babel/preset-env", {
              useBuiltIns: "usage",
              targets: {
                "node": "current",
                "browsers": ["last 2 versions"]
              }
            }]
          ],
          env: {
            production: {
              plugins: ["transform-react-remove-prop-types"]
            }
          }
        }
      }
    ]
  }
}
