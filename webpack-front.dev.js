const merge = require('webpack-merge');
const common = require('./webpack-front.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
});
