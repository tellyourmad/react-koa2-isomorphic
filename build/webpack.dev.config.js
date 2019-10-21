'use strict'
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin'),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig,{
    devtool: 'eval-source-map',
    entry:'./client/entry.js',
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]!postcss-loader!less-loader'
            },
            {
                test: /\.(png|jpg|ttf|eot|svg|gif)$/,
                loader: 'url-loader?limit=8000'
            },
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=false'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            favicon: './static/BookMark.png',
            filename: '../views/dev/index.html',
            template: './views/tpl/index.html'
        }),
        new ProgressBarPlugin({summary: false}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});
