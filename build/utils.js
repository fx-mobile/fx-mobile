'use strict'
const path = require('path')
const config = require('../config')
const isBuildMode = require('./isBuildMode')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

function resolveResrouce(name) {
    return path.resolve(__dirname,'../src/assets/scss/' + name);
}

exports.assetsPath = function(_path) {
    const assetsSubDirectory = isBuildMode ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: isBuildMode,
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [
            cssLoader,
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [resolveResrouce('global.scss')]
                }
            }
        ]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            loaders.unshift(MiniCssExtractPlugin.loader)
            return loaders
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    function generateSassResourceLoader() {
        const loaders = [
            cssLoader,
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [resolveResrouce('global.scss')]
                }
            }
        ]
        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            loaders.unshift(MiniCssExtractPlugin.loader)
            return loaders
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        // sass: generateLoaders('sass', { indentedSyntax: true }),
        // scss: generateLoaders('sass'),
        sass: generateSassResourceLoader(),
        scss: generateSassResourceLoader(),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    const output = []
    const loaders = exports.cssLoaders(options)
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}