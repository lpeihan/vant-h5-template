'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./utils/paths');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [];
if (isProd) {
  const filename = 'css/[name].[contenthash:8].css';

  plugins.push(
    new MiniCssExtractPlugin({
      filename,
      chunkFilename: filename,
    }),
  );
}

const genStyleRules = () => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // how many loaders before css-loader should be applied to [@import]ed resources.
      // stylePostLoader injected by vue-loader + postcss-loader
      importLoaders: 1 + 1,
      esModule: false, // css-loader using ES Modules as default in v4, but vue-style-loader support cjs only.
    },
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      // postcssOptions: {
      //   config: paths.resolve('postcss.config.js'),
      // },
      postcssOptions: (loaderContext) => {
        const resourcePath = loaderContext.resourcePath;

        if (resourcePath.includes('/admin/')) {
          return {
            config: paths.resolve('admin/postcss.config.admin.js'),
          };
        }

        return {
          config: paths.resolve('postcss.config.js'),
        };
      },
    },
  };
  const extractPluginLoader = {
    loader: MiniCssExtractPlugin.loader,
  };
  const vueStyleLoader = {
    loader: 'vue-style-loader',
  };

  function createCSSRule(test, loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader];

    if (isProd) {
      loaders.unshift(extractPluginLoader);
    } else {
      loaders.unshift(vueStyleLoader);
    }

    if (loader) {
      loaders.push({ loader, options: loaderOptions });
      loaders.push({
        loader: 'style-resources-loader',
        options: {
          patterns: [
            // paths.resolve('src/styles/mixins.less'),
            // paths.resolve('src/styles/vars.less'),
          ],
        },
      });
    }

    return { test, use: loaders };
  }

  return [
    createCSSRule(/\.css$/),
    createCSSRule(/\.p(ost)?css$/),
    createCSSRule(/\.less$/, 'less-loader'),
  ];
};

module.exports = {
  plugins,
  module: {
    rules: genStyleRules(),
  },
};
