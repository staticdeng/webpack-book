# 使用middleware搭建server

我们可以用webpack-dev-server来搭建本地的服务器，webpack-dev-server的原理是用express结合中间件(middleware)来实现的，其实我们自己可以用express或者koa结合webpack的开发中间件来搭建开发环境，这样能使我们的配置更加灵活。

搭建简单的server需要用到的依赖有：

_express or koa
webpack-dev-middleware
webpack-hot-middleware 用作热更新
http-proxy-middleware 用作代理
open 命令行打开浏览器_

安装依赖--save-dev，新建配置服务的文件server.js，拷贝下面代码：

```js
const express = require('express')
const webpack = require('webpack')
const opn = require('opn')

const app = express()
const port = 8080

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')
const compiler = webpack(config) // 用webpack执行配置

// 使用middleware将webpack和express服务连接起来
app.use(webpackDevMiddleware(compiler, {}))
app.use(webpackHotMiddleware(compiler))


app.listen(port, function(){
    console.log('success listen to' + port)
    opn('http://localhost:' + port) // 打开浏览器
})
```

这样就配置好了server，其他模块热更新的配置和上次案例中的webpack-dev-server一样，命令行运行node server.js，打开浏览器测试，发现热更新并没有生效，因为还需要修改wepack.config.js的entry：

```js
entry: {
    app: [
        'webpack-hot-middleware/client?noInfo=true&reload=true',
        './src/app.js'
    ]
}
```
再次运行node server.js，js和css的模块热更新生效。

如果还需要代理配置，可以查看我的完整源代码。

**注：所有源代码路径在当前文件夹**
