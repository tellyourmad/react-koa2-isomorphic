'use strict'
const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.config');

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
        externals[filename] = `commonjs ${filename}`
        return externals
    }, {})
}



let clientConfig = merge(baseWebpackConfig,{
	entry:{
		bundle:[
			'./client/entry.js'
		],
		vendor:[
            "react-hammerjs",
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'iscroll',
            'react-iscroll',
            'superagent',
            'react-router-dom',
            'react-validate'
		]
	},
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
		loaders: [
			{
				test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        'css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]',
                        'postcss-loader',
                        'less-loader'
                    ]
                })
			},
			{
                test: /\.(png|jpg|ttf|eot|svg|gif)$/,
				loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
			},
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=true'
            }
		]
	},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].[chunkhash:8].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            favicon: './static/BookMark.png',
            filename: '../../views/prod/index.html',
            template: './views/tpl/index.html'
        }),
        new ProgressBarPlugin({summary: false}),
        new ExtractTextPlugin('./[name].[contenthash:8].css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'ROOT_LOCAL': JSON.stringify('/'),
            '__isServer__': false,
            '__isClient__': true
        })
    ]
});


let serverConfig = merge(baseWebpackConfig,{
    entry:{
        server: './server/server.prod'
    },
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        chunkFilename: 'chunk.[name].js',
        filename: '[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'css-loader/locals?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]!postcss-loader!less-loader'
            },
            {
                test: /\.(png|jpg|ttf|eot|svg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader:'babel-loader'
            }
        ]
    },
    externals: getExternals(),
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.port': JSON.stringify(process.env.port),
            'ROOT_LOCAL': JSON.stringify('/'),
            '__isServer__': true,
            '__isClient__': false
        })
    ]
});

module.exports = [clientConfig, serverConfig]