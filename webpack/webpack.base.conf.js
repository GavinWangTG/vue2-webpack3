
const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const utils = require('./util.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: './app/main.js'
	},
	output: {
		path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
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
				options: vueLoaderConfig
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
						loader: 'url-loader',
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
	}
}