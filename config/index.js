'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
    // 使用临时构建字段
const utils = require('./utils');

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: "",
        productionSourceMap: (process.env.NODE_ENV != 'production'),
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8062,
        host: utils.getLocalIP(),
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        proxyTable: {
            '/v1': {
                target: 'https://www.easy-mock.com/mock/58ff650c739ac1685205a1a7/foresee',
                changeOrigin: true
            },
            
        },
        poll: false,
        cssSourceMap: false
    }
}