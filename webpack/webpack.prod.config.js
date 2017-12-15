/*
* 第二种打包方式，节约打包时间（几秒钟），缺点须写两套配置
*/

const pkg = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const utils = require('./util.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const extractCSS = new ExtractTextPlugin(utils.assetsPath('css/style.[chunkhash:8].css')); //配置外部css单独打包到文件
const extractSCSS = new ExtractTextPlugin(utils.assetsPath('css/[name].[chunkhash:8].css')); //配置布局scss单独打包到文件

module.exports = {
	entry: {
		app: './app/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
		chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
	},
	resolve: {
		extensions: ['.js', '.json', '.vue'],
		alias: {
            vue$: 'vue/dist/vue.js',
            '@': resolve('app')
        }
	},
	resolveLoader: {
        modules: ["node_modules"]
    },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
		          	loaders: {
		            	scss: ExtractTextPlugin.extract({
			              	use: [
			              		{ loader: 'style-loader'},
		          				{ loader: 'css-loader'},
		          				{ loader: 'sass-loader'}
		          			],
			              	fallback: 'vue-style-loader'
		            	})
		          	}
		        }
			},
			{
				test: /\.css$/,
				use: extractCSS.extract({
					fallback: "style-loader",
					use:[
                        {
                            loader: 'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        }
                    ]
				})
			},
			{
	        	test: /\.scss$/,
	            use: extractSCSS.extract({
	                fallback: "style-loader",
	                use: [
	                	{
	                		loader: 'css-loader',
	                		options:{
                                minimize: true //css压缩
                            }
	                	},
	                	{loader: 'postcss-loader'},
	                	{loader: 'sass-loader'},
	                ]
	            })
		    },
			{
				test: /\.(png|jpg|jpeg|svg|gif)(\?.*)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: utils.assetsPath('images/[name].[ext]')
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: utils.assetsPath('fonts/[name].[ext]')
						}
					}
				]
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			}
		]
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
        extractCSS,
        extractSCSS,
        //提取css到文件夹中(第二种方式，所有文件都打包到一个文件中)
 		// new ExtractTextPlugin(utils.assetsPath("css/[name].[chunkhash:8].css"),{
 		// 	allChunks: true
 		// }),
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
}