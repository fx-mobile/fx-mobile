'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
    // 使用临时构建字段
const utils = require('./utils');

module.exports = {
    build: {
        // 导入prod.env.js配置文件，只要用来指定当前环境，详细见(1)
        env: require('./prod.env'),
        // 下面是相对路径的拼接，假如当前跟目录是config，那么下面配置的index属性的属性值就是dist/index.html
        index: path.resolve(__dirname, '../dist/index.html'),
        // 下面定义的是静态资源的根目录 也就是dist目录
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 下面定义的是静态资源根目录的子目录static，也就是dist目录下面的static
        assetsSubDirectory: 'static',
        // 下面定义的是静态资源的公开路径，也就是真正的引用路径
        assetsPublicPath: '/',
        // 下面定义是否生成生产环境的sourcmap，sourcmap是用来debug编译后文件的，通过映射到编译前文件来实现
        productionSourceMap: (process.env.NODE_ENV != 'production'),
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // 下面是是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
        productionGzip: false,
        // 下面定义要压缩哪些类型的文件
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        // 下面是用来开启编译完成后的报告，可以通过设置值为true和false来开启或关闭
        // 下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8062,
        host: utils.getLocalIP(),
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/v1': {
                target: 'https://www.easy-mock.com/mock/58ff650c739ac1685205a1a7/*',
                changeOrigin: true
            },
            
        },
        poll: false,
        cssSourceMap: false
    }
}
