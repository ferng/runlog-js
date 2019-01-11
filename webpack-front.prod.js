const merge = require('webpack-merge');
const common = require('./webpack-front.common.js');

module.exports = merge(common, {
  mode: 'production',
});
