'use strict';

const ProgressPlugin = require('progress-webpack-plugin');
const { merge } = require('webpack-merge');

const cssConf = require('./css.conf');
const webpackBaseConf = require('./webpack.base.conf');

module.exports = merge(webpackBaseConf, cssConf, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  plugins: [new ProgressPlugin(true)],

  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    open: true,
    host: '0.0.0.0',
    port: 8088,
    hot: true,
    client: {
      overlay: false,
      webSocketTransport: 'ws',
      reconnect: true,
    },
    proxy: [
      {
        context: ['/api/v1'],
        target: '',
      },
    ],
    setupMiddlewares(middlewares, devServer) {
      require('../mocks/index')(devServer.app);

      return middlewares;
    },
  },

  infrastructureLogging: {
    level: 'warn',
  },

  stats: {
    assets: false,
    modules: false,
  },
});
