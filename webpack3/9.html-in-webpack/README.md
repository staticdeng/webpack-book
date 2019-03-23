# html in webpack

html中自动载入打包的css和js，将manifest直接插入到html中减小请求等。

## 生成html

生成html动载入打包的css和js，用到html-webpack-plugin插件。

安装：

```bash
npm i -D html-webpack-plugin
```

配置：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
...
plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        minify: {
            collapseWhitespace: true
        }
    })
]
```

## 提取manifest配合优化

将webpack的runtime公共打包文件manifest插入到html中，可以减少http请求，达到优化的目的，用到html-webpack-inline-chunk-plugin：

```bash
npm i -D html-webpack-inline-chunk-plugin
```

配置要结合CommonsChunkPlugin(提取manifest)使用：

```js
const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin');
...
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'mainfest',
    }),
    new HtmlInlinkChunkPlugin({
        inlineChunks: ['mainfest'] // mainfest对应CommonsChunkPlugin提取出来的webpack runtime代码
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        minify: {
            collapseWhitespace: true
        }
    })
]
```

这样配置后manifest将会插入到html的script标签中.

**注：所有源代码路径在当前文件夹**


