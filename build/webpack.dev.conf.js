'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

let devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        port: config.dev.port,
        host: config.dev.host,
        hot: true,
        compress: true,
        open: true,
        clientLogLevel: 'warning', //配置在客户端的日志等级，这会影响到你在浏览器开发者工具控制台里看到的日志内容
        quiet: true, // necessary for FriendlyErrorsPlugin
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        proxy: config.dev.proxyTable,
        publicPath: config.dev.assetsPublicPath,
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ]
})

// 导出一个 promise 函数，这可以让 wepback 接受一个异步加载的配置
// 并在 resolve 的时候运行 这个配置
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})