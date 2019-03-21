# 长缓存优化

什么是长缓存优化？

用户打开一个网页向服务器发送资源请求，服务器会通过响应头告诉浏览器这些资源在某个时间内被强缓存不用更新，这些资源可能有版本号，当版本号不发生改变的时候，浏览器不会向服务器发资源请求，而是会从本地读取缓存，这样就大大节省了用户访问网页的时间。

在webpack中，如果内容没有发生变化，则应该被浏览器缓存；当我们修改了代码，则应该只请求发生更新的代码，这就是webpack中长缓存的基础。

让我们来看看下面的场景：

* 改变app代码，第三方打包库vendor也发生变化

解决：

* 单独提取第三方库vendor
* 把hash改为chunkhash(chunkhash指的是代码块的hash，而hash则每次打包都会发生变化，第三方库可以看做一个代码块，如果库版本没有发生变化，chunkhash也不会发生变化)
* 提取webpack runtime代码(在低版本的webpack中，有可能上面两条都设置了，打包文件的hash还是会改变，就需要提取webpack runtime代码为单独打包文件)

先把打包文件hash设置为chunkhash，将本案例中用到的第三方库react和业务代码区分开单独提取，下面为配置：

webpack.config.js：

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['react'] // 将react单独提取，建一个独立的entry就可以了，这个entry名为vendor供后面使用
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlungin({
            name: 'vendor', // 将entry名为vendor的代码提取为公共代码
            minChunks: Infinity
        })
    ]
}
```

这样配置后，第三方库vendor即使在业务代码发生变化，打包后的vendor的hash名也不会发生变化，这样浏览器在请求资源的时候就会请求缓存资源了。

还有动态导入import()导入的模块，动态模块需要给定模块名称，这样打包的hash就不会发生改变，这里不做演示。关于更多的长缓存优化，可以看看网上的知识，这里就简单介绍到这里了。

**注：所有源代码路径在当前文件夹**

