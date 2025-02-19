const paths = require('./paths')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    bundle: [paths.src + '/index.js'],
  },
  output: {
    path: paths.build,
    filename: '[name][contenthash].js',
    clean: false, //false - fix img/svg dissapear after reload;
    assetModuleFilename: '[name][ext]',
    publicPath: '/'
  },

  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },

      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /.(sass|scss|css)$/,

        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: paths.src + '/assets/icons/favicon.svg',
      template: paths.src + '/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        removeRedundantAttributes: false, // do not remove type="text"
      }
    }),
    new HtmlWebpackPlugin({
      favicon: paths.src + '/assets/icons/favicon.svg',
      template: paths.src + '/views/pages/mobile/mobile.html',
      filename: 'mobile/index.html',
      minify: {
        removeComments: true,
        removeRedundantAttributes: false, // do not remove type="text"
      }
    }),
    new HtmlWebpackPlugin({
      favicon: paths.src + '/assets/icons/favicon.svg',
      template: paths.src + '/views/pages/sdk/sdk.html',
      filename: 'sdk/index.html',
      minify: {
        removeComments: true,
        removeRedundantAttributes: false, // do not remove type="text"
      }
    }),
    new HtmlWebpackPlugin({
      favicon: paths.src + '/assets/icons/favicon.svg',
      template: paths.src + '/views/pages/cloud/cloud.html',
      filename: 'cloud/index.html',
      minify: {
        removeComments: true,
        removeRedundantAttributes: false, // do not remove type="text"
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: "static", to: "./" },
      ],
    }),
  ],
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
};
