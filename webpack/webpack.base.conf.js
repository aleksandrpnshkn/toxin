const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const glob = require('glob');

const PATHS = {
  src: path.join(__dirname, './../src'),
  dist: path.join(__dirname, './../build'),
  assets: 'assets',
};

const PAGES_DIR = `${PATHS.src}/pages`;
const PAGES = glob.sync(`${PAGES_DIR}/**/*.pug`).map((pagePath) => path.basename(pagePath));

const { baseUrl } = require('../config');

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    main: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}/js/[name].[hash].js`,
    path: PATHS.dist,
    // publicPath: '/', // Relative paths for Github Pages
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader',
      options: {
        self: true, // https://stackoverflow.com/questions/38980925/make-variable-accessible-in-all-pug-files
      },
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img',
            publicPath: `${baseUrl}assets/img`,
          },
        },
      ],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/[name].[hash].css`,
    }),
    ...PAGES.map((page) => new HtmlPlugin({
      template: `${PAGES_DIR}/${page.split('.')[0]}/${page}`,
      filename: `./${page.replace(/\.pug$/, '.html')}`,
      baseUrl,
    })),
    new CopyPlugin([
      { from: `${PATHS.src}/assets`, to: `${PATHS.assets}` },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ]
};
