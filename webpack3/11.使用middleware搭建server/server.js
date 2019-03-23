const express = require('express')
const webpack = require('webpack')
const opn = require('opn')

const app = express()
const port = 8080

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')

const config = require('./webpack.config')
const compiler = webpack(config) // 用webpack执行配置
const proxyTable = require('./proxy')

// 使用middleware将webpack和express服务连接起来
for(let context in proxyTable) {
    app.use(proxyMiddleware(context, proxyTable[context]))
}
app.use(webpackDevMiddleware(compiler, {}))
app.use(webpackHotMiddleware(compiler))


app.listen(port, function(){
    console.log('success listen to' + port)
    opn('http://localhost:' + port) // 打开浏览器
})