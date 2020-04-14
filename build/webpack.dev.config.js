"use strict";
const path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  merge = require("webpack-merge"),
  baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./client/entry.js",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "chunk.[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              import: true,
              localsConvention: "camelCase",
              importLoaders: 2,
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:8]",
              },
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|ttf|eot|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader?minimize=false",
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: "./static/BookMark.ico",
      filename: "../views/dev/index.html",
      template: "./views/tpl/index.html",
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
});
