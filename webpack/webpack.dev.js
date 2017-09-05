var config = require('./config.js')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./util.js')
var baseWebpackConfig = require('./webpack.dev.config.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 将热加载文件添加到 chunks中
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./webpack/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {

    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[chunkhash:8].css')
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"development"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
            inject: true
        })
    ]
})