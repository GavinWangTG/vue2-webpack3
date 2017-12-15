var config = require('./config.js')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./util.js')
var baseWebpackConfig = require('./webpack.base.conf.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 将热加载文件添加到 chunks中
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./webpack/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ 
            sourceMap: config.dev.cssSourceMap,
            extract: true,
            usePostCSS: true 
        })
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin(
            utils.assetsPath("css/[name].[chunkhash:8].css"),{
            allChunks: true
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