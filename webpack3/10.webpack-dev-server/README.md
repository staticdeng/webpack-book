# webpack-dev-server

webpack-dev-server是webpack官方提供的一个服务器，支持live reloading，模块热更新，接口代理，浏览器显示编译错误，支持https等.

安装：

```bash
npm i -D webpack-dev-server
```

配置：

```js
module.exports = {
    devServer: {
        port: 8081
    }
}
```
这样就最简单地配置了webpack-dev-server，命令行运行webpack-dev-server就可以启动服务，运行在8081端口.(本案例中在package.json配置好了，直接npm run dev).

#### 接口代理

项目中如果涉及到跨域问题，可以用proxy配置代理转发解决跨域.

```js
devServer: {
    port: 8081,
    // 可以用proxy代理转发解决跨域
    proxy: {
        // 访问http://localhost:8081/api/*/的所有地址都会转发到https://m.weibo.cn/api/*/接口
        '/api': {
            target: 'https://m.weibo.cn'
        }
    }
}
```

#### 模块热更新(module hot reloading)

模块热更新可以保持应用的数据状态，样式调试更快，在不刷新浏览器的情况下进行模块的更新，而live reloading则需要刷新浏览器达到更新，这是两者的区别。

配置模块热更新需要设置devServer.hot: true，还需要配置webpack的内置插件webpack.HotModuleReplacementPlugin()和webpack.NamedModulesPlugin()，下面是模块热更新的具体配置：

```js
module.exports = {
    devServer: {
        port: 8081,
        hot: ture
    },
    plugins: [
        ...
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}
```

加上上面配置后，就可以进行css的模块热更新，但是发现改动js并没有进行js的模块热更新，因为还需要在js的入口加上下面的代码：

比如入口文件为src/app.js，在里面加上accept()启用js的模块热更新，webpack-dev-server就根据这个配置进行js的模块替换：

```js
if(module.hot) {
    module.hot.accept();
}
```

至此，js和css的模块热更新配置完成。

**注：所有源代码路径在当前文件夹**