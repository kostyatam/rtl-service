'use strict';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: ['./client/main'],
    output: {
        path: __dirname + "/dist",
        filename: 'bundle-[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        }),
        new ExtractTextPlugin("styles.css")
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                query: {
                    mimetype: 'image/png'
                }
            },
            {
                test: /\.jade$/,
                loader: 'jade-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
}