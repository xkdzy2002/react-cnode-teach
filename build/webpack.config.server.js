let path = require('path')

module.exports = {
    // 支持在node.js中执行
    target: 'node',
    mode: 'development',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        // publicPath: '/public'
        publicPath: '/public',
        libraryTarget: 'commonjs2'
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
                    loader: "babel-loader"
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [path.join(__dirname, '../node_modules')]
            }
        ]
    }
}
