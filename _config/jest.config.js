const { defaults } = require('jest-config');

module.exports = {
  name: "project",
  verbose: true,
  testRegex: "tests/.*\\.(js|jsx)$",
  rootDir: '../',
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1"
  },
}
