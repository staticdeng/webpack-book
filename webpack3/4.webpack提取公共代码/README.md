# webpack提取公共代码

在webpack打包中，模块A和模块B同时引入了模块C，如果不提取公共模块C，就会造成打包代码冗余。所以需要提取公共代码，提高用户加载速度。

## CommonsChunkPlugin

webpack3中通过内置插件webpack.optimize.CommonsChunkPlugin(options)来提取公共代码，下面是ComonsChunkPlugin的可配置的属性：

* name：chunk的名称
* filename：公用代码打包的文件名
* minChunks： 既可以是数字，也可以是函数，还可以是Infinity。为数字时表示最小出现代码的次数，比如说设置为2，则出现2次以上就会打包成公共代码
* chunks：指定从哪些chunk当中去找公共模块，省略该选项的时候，默认就是entry chunks

为了演示提取公共代码，把下面配置拷贝到webpack.config.CommonsChunkPlugin.js：

```js
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        })
    ]
}
```
上面配置中指定了两个入口模块pageA和pageB。

./src/pageA：

```js
import './module';
console.log('this is pageA');
export default 'pageA';
```

./src/pageB：

```js
import './module';
console.log('this is pageB');
export default 'pageB';
```

pageA和pageB都引用了公共模块./module：

```js
const s = 'this is module'
export default s;
```

命令行运行webpack --config webpack.config.CommonsChunkPlugin.js，分别生成了/dist/pageA.bundle.js、/dist/pageB.bundle.js和/dist/common.bundle.js。

打开代码会发现，公共模块./module的代码打包在了common.bundle.js里面（common.bundle.js是webpack模块代码，现在加入了公共代码./module），而pageA和pageB分别在自己打包文件里，任务完成。

## 第三方库单独打包

项目中如果pageA和pageB都引入了第三方库如import * as _ from 'lodash'，想要把第三方库单独打包，则需要在entry处的value值用数组指定第三方库名，并且需要修改CommonsChunkPlugin的配置，可以配置多个，如下所示：

webpack.config.CommonsChunkPlugin.js：

```js
module.exports = {
    entry: {
        ...,
        'vendor': ['lodash'] // 将业务代码和第三方引用包如lodash、react等区分开，用数组形式指定多个
    },
    plugins: [
        // pageA和pageB的公共代码提取用CommonsChunkPlugin，只适用于多entry的情况，如果entry为单个，这个就不起作用
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            chunks: ['pageA', 'pageB'] // pageA和pageB都用了vendor，这里要指定chunks，不然会报错
        }),
        // 第三方引用包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity // 无穷
        }),
        // 将第三方引用包代码和webpack代码区分开
        new webpack.optimize.CommonsChunkPlugin({
            name: 'webpackModule',
            minChunks: Infinity
        })
    ]
}
```
这样配置后，webpack打包后dist文件夹下文件会分别为：

pageA.bundle.js：pageA的代码
pageB.bundle.js：pageB的代码
common.bundle.js：pageA和pageB共同引入模块代码./module
verdor.bundle.js：pageA和pageB引入第三方代码库的代码
webpackModule.bundle.js：webpack的模块代码

