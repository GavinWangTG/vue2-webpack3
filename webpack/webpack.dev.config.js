
const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const utils = require('./util.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin(utils.assetsPath('css/style.[chunkhash:8].css')); //配置外部css单独打包到文件
const extractSCSS = new ExtractTextPlugin(utils.assetsPath('css/[name].[chunkhash:8].css')); //配置布局scss单独打包到文件

module.exports = {
	entry: {
		app: './app/main.js'
	},
	output: {
		path: config.build.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.json', '.vue'],
		alias: {
            vue$: 'vue/dist/vue.js',
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
				//不建议直接在.vue文件中写style样式(该配置还不完善)
				options: {
		          	loaders: {
		            	css: ExtractTextPlugin.extract({
			              	use: 'css-loader',
			              	fallback: 'vue-style-loader'
		            	})
		          	}
		        }
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: extractCSS.extract(['css-loader'])
			},
			{
				test: /\.scss$/i,
				exclude: /node_modules/,
		        use: extractSCSS.extract([
		        	{loader: 'css-loader'},
		        	{loader: 'sass-loader'},
		        	{
		        		loader: 'postcss-loader',
	          			options: {
	          				plugins: (loader)=>[
				                require('autoprefixer')({
				                    browsers: ['last 10 versions']
				                })
				            ]
	          			}
		        	}
		        ])
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)(\?.*)?$/,
				exclude: /node_modules/,
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
				exclude: /node_modules/,
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
        extractCSS,
        extractSCSS
    ]
}