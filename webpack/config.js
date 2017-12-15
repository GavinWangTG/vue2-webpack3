
const path = require('path')

module.exports = {
    build: {
        env: {NODE_ENV: '"production"'},
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static/',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {NODE_ENV: '"development"'},
        port: 8089,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        context: [ //代理路径
            
        ],
        proxypath: '',
        cssSourceMap: false
    }
}