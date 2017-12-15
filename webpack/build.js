// https://github.com/shelljs/shelljs
require('shelljs/global') //Unix shell 命令

const path = require('path')
const config = require('./config.js')
const ora = require('ora')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf.js')
const spinner = ora('building for production...')
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)

//删除资源文件夹
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})