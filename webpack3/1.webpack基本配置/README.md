# webpack基本配置

本文档是webpack3环境，首先npm init初始化，然后安装webpack3。

```
npm i webpack@3.12.0 -g
```

由于命令行输入webpack --config webpack.config.js，webpack读取的是webpack.config.js里面的配置进行编译打包，下面来介绍一下webpack.config.js如何配置：

* entry

代码入口，打包入口，可以配置单个或者多个入口：

```js
module.exports = {
    entry: './index.js'
    // entry: ['./index.js', './app.js'] // 配置多个入口
}
```

entry也可以写成key、value的形式：

```js
module.exports = {
    entry: {
        index: ['./index.js', './app.js'],
        vendor: './verdor.js'
    }    
}
```
上面配置多个入口，key为文件别名，value为入口路径

* output

```js
module.exports = {
    entry: {
        index: './index.js',
    },
    output: {
        filename: '[name].[hash:5].js'
    }
}
```
[name]为entry里的key值，[hash:5]为MD5码，最后会生成index.hash.js打包文件

* loaders

处理文件，转换为模块

```js
module.exports = {
    module: {
        rules: [
            test: /\.css$/,
            use: 'css-loader'
        ]
    }
}
```
上面为配置压缩css的代码

* plugins

参与整个打包过程，打包优化和压缩，配置编译时的变量等等

```js
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.optimize.uglifyJsPlugin()
    ]
}
```
上面的plugins配置压缩js

常用的plugins：

优化相关：

    CommonsChunkPlugin 提取相同代码块
    UglifyjsWebpackPlugin 压缩js

功能相关：

    ExtractTextWebpackPlugin 提取打包单独文件
    HtmlWebpackPlugin 生成html
    HotModuleReplacementPlugin 热更新
    CopyWebpackPlugin 拷贝
