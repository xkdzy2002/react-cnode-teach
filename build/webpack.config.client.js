let path = require('path')
let webpack = require('webpack')
let HTMLPlugin = require('html-webpack-plugin')

let isDev = process.env.NODE_ENV === 'development'

let config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },

    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        // publicPath: '/public'
        publicPath: '/public/'
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: [path.join(__dirname, '../node_modules')]
            }
        ]
    },
    plugins: [
        // 生成html文件，将js等代码注入到html中
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
}


// localhost:8888/filename
if (isDev) {
    config.entry = {
        app: [
            // 用于代码热更新
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }

    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }

    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
