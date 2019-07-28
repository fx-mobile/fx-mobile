'use strict'
require('./check-versions')()

const curEnv=process.argv.splice(2)[0]
// 临时构建字段
process.env.tmp = curEnv
process.env.NODE_ENV = curEnv
const envMap={
    dev:'开发环境',
    test:'测试环境',
    preproduction:'预生产环境',
    production:'生产环境',
}

const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')


console.log(chalk.yellowBright('正在构建： '+envMap[curEnv]+'...\n'))

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    console.log(chalk.yellowBright('构建完毕\n'))
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
