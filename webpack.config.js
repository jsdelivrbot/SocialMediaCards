const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildDir = 'dist';

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname + '/' + buildDir),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([buildDir]),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new ExtractTextPlugin("styles.css")
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  resolveLoader: {
   moduleExtensions: ["-loader"]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    port: 9000,
    compress: true
  },
  devtool: 'inline-source-map'
};
