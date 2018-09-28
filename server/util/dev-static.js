const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const Module = module.constructor

// 参考nodejs的FS
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
// 直接使用内存文件系统
serverCompiler.outputFileSystem = mfs
let serverBundle
// 配置要点
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(error))
    stats.warnings.forEach(warn => console.warn(warn))

    // 编译路径
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )

    // 将字符串转化成模块编译，注意需要增加utf-8
    const bundle = mfs.readFileSync(bundlePath, 'utf-8')
    const m = new Module()
    m._compile(bundle, 'server-entry.js')
    // 配置要点
    serverBundle = m.exports.default
})

module.exports = function (app) {
    app.use('/public', proxy({
        target: 'http://localhost:8888'
    }))

    app.get('*', function (req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->', content))
        })
    })
}