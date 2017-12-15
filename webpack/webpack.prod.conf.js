
/*
* 第一种打包方式
*/

const pkg = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const utils = require('./util.js');
const baseWebpackConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
	module: {
	    rules: utils.styleLoaders({
	      	sourceMap: config.build.productionSourceMap,
		    extract: true,
		    usePostCSS: true
	    })
	},
	output: {
		path: config.build.assetsRoot,
		publicPath: config.build.assetsPublicPath,
		filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
		chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
	},
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
		//js 代码压缩
		new webpack.optimize.UglifyJsPlugin({
	      	compress: {
                warnings: false
            }
	    }),
	    //生成新的HTML文件
		new HtmlWebpackPlugin({
            template: './index.html'
        }),
        //提取css到文件夹中(第一种方式，外部引入的css 和 项目所写的scss单独打包)
        new ExtractTextPlugin(utils.assetsPath("css/[name].[chunkhash:8].css")),
		//提取公共js
		new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        //生成公共的js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
    ]
})