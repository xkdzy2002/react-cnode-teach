let express = require('express')
let ReactSSR = require('react-dom/server')
let fs = require('fs')
let path = require('path')

let isDev = process.env.NODE_ENV === 'development'

let app = express()

if (!isDev) {
    let serverEntry = require('../dist/server-entry').default
    let template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
    app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.get('*', function (req, res) {
        let app = ReactSSR.renderToString(serverEntry)
        // template.replace('<app></app>', app)
        res.send(template.replace('<!-- app -->', app))
    })
}else{
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3333, function () {
    console.log('server is listening on 3333')
})