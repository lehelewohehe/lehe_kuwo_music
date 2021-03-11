const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const readEnv = require('./readEnv');
const env = readEnv('./.env.production');

module.exports = webpackMerge.merge(baseConfig, {
  mode: "production",
  plugins:[
    new webpack.DefinePlugin({ // 定义环境和变量
      'process.env': {
        NODE_ENV: "'production'",
        ...env
      }
    })
  ]
});