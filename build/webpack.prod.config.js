"use strict";
const path = require("path"),
  fs = require("fs"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin,
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  merge = require("webpack-merge"),
  baseWebpackConfig = require("./webpack.base.config");

function getExternals() {
  return fs
    .readdirSync(path.resolve(__dirname, "../node_modules"))
    .filter((filename) => !filename.includes(".bin"))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`;
      return externals;
    }, {});
}

let clientConfig = merge(baseWebpackConfig, {
  mode: "production",
  entry: "./client/entry.js",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "chunk.[name].[chunkhash:8].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              import: true,
              localsConvention: "camelCase",
              importLoaders: 2,
              modules: {
                localIdentName: "[hash:base64:8]",
              },
            },
          },
          {
            loader: "postcss-loader",
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|ttf|eot|svg|gif)$/,
        loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]",
      },
      {
        test: /\.html$/,
        loader: "html-loader?minimize=true",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "async", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      minSize: 30000, //合并前模块文件的体积
      minChunks: 1, //最少被引用次数
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~", //自动命名连接符
      cacheGroups: {
        // vendors: false,
        vendors: {
          chunks: "all",
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1, //敲黑板
          priority: -10, //优先级更高
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },

        // main: {
        //   name: entrypoint => {
        //     console.log(entrypoint);
        //     if (entrypoint == 0) {
        //       return "test";
        //     }
        //     return entrypoint;
        //   }
        // },
      },
      chunks: "async",
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      favicon: "./static/BookMark.ico",
      filename: "../../views/prod/index.html",
      template: "./views/tpl/index.html",
      chunksSortMode: "dependency",
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "chunk.[name].[contenthash:8].css",
      ignoreOrder: false,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      ROOT_LOCAL: JSON.stringify("/"),
      __isServer__: false,
      __isClient__: true,
    }),
  ].concat(
    process.env.NODE_ENV === "analyzer" ? [new BundleAnalyzerPlugin()] : []
  ),
});

let serverConfig = merge(baseWebpackConfig, {
  mode: "production",
  entry: {
    server: "./server/server.prod",
  },
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    chunkFilename: "chunk.[name].js",
    filename: "[name].js",
  },
  target: "node",
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "css-loader",
            options: {
              onlyLocals: true,
              import: true,
              localsConvention: "camelCase",
              importLoaders: 2,
              modules: {
                localIdentName: "[hash:base64:8]",
              },
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|ttf|eot|svg|gif)$/,
        loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  externals: getExternals(),
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.port": JSON.stringify(process.env.port),
      ROOT_LOCAL: JSON.stringify("/"),
      __isServer__: true,
      __isClient__: false,
    }),
  ],
});

module.exports = [clientConfig, serverConfig];
