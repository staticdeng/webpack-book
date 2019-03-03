# webpack编译es6

webpack默认支持编译**ES module、Commonjs和AMD模块化**规范的es5代码，要想webpack编译es6为es5代码，需要用Babel编译。

## babel-loader

用babel编译用到的loader为babel-loader，现在babel-loader改了大版本，可以分为新旧两个版本babel-loader 8.x和babel-loader 7.x，对应的一些其他包如babel-core、babel-preset-env等都需要区分来安装，本文档中用新版的安装方式。

安装新版babel-loader 8.x：

```
npm i -D babel-loader @babel/core @babel/preset-env
```

安装旧版babel-loader 7.x：

```
npm i -D babel-loader@7 babel-core babel-preset-env webpack
```
其中babel-core为babel的核心库，当使用babel-loader编译es6代码的时候，还要设置babel的规范，这时候babel-preset-env就发挥了作用，babel-preset-env包含了es2015，es2016，es2017规范等。

将下面配置拷贝到webpack.config.babel.js中：

```js
module.exports = {
    entry: {
        app_babel: './app.babel.js',
        app_polyfill: './app.polyfill.js',
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets 也可以放到.babelrc文件里
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: '/node_modules/'
            }
        ]
    }
}
```
把下面es6类拷贝到app.babel.js：

```js
// app.babel.js
class Person{
    constructor(name) {
        this.name = name
    }
}
var p1 = new Person('test');
```

命令行运行webpack --config webpack.config.babel.js，打开app.babel.[hash].js文件，可以看到es6的class被编译成了es5的代码。

#### @babel/preset-env的作用

如果我们注释掉module.rules.use.options.presets: ['@babel/preset-env']的配置，打包后再打开app.[hash].js文件，可以看到es6 class没有被编译成es5的class!! 这就是@babel/preset-env的作用。加上@babel/preset-env的配置，babel-loader才会按照对应的规范编译代码。

## babel polyfill和babel runtime transform

es6中的一些语法和函数，babel-loader并不能处理成es5代码，这时候需要用到全局垫片或者局部垫片来处理。

常见不能处理的es6语法有：

> Promise、Generator、Set、Map、Array.from...

### babel-polyfill

全局垫片，会全部引入打包文件中，为应用而生。

安装：

```
npm i -S babel-polyfill
```

使用：

```js
// 在应用中
import 'babel-polyfill'
```

将下面代码拷贝到app.polyfill.js：

```js
import 'babel-polyfill'; // 在没有引入babel-polyfill之前，不会打包多余代码
function timeOut() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout')
        }, 1000)
    })
}
timeOut().then(result => {
    console.log(result);
})
```
命令行运行webpack --config webpack.config.babel.js，分别测试babel-polyfill引入和没有引入的情况，会发现打包后的app.polyfill.[hash].js文件大小分别为280KB和3KB，这是因为import 'babel-polyfill'会引入一些处理es6语法的代码，这就是全局垫片的作用。

### @babel/plugin-transform-runtime和@babel/runtime

局部垫片，为开发框架和组件准备。

安装新版：

```
npm i -D @babel/plugin-transform-runtime
npm i -S @babel/runtime
```
安装旧版：

```
npm i -D babel-plugin-transform-runtime
npm i -S babel-runtime
npm i -S @babel/runtime-corejs2
```

本文档中用新版的安装方式，在webpack配置中加上runtime的配置：

全部配置在webpack.config.runtime.js中：

```js
use: {
    loader: 'babel-loader',
    options: {
        ...,
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    'corejs': 2,
                    'helpers': true,
                    'regenerator': true,
                    'useESModules': true
                }
            ]
        ]
    }
},
```
把下面promise的代码拷贝到app.runtime.js：

注意没有import 'babel-polyfill'，不使用全局垫片的方式。

```js
function timeOut() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout')
        }, 1000)
    })
}
timeOut().then(result => {
    console.log(result);
})
```
命令行运行webpack --config webpack.config.runtime.js，打开生成的app.runtime.[hash].js，文件大小为88KB，查看源码，会发现Promise的实现是通过require node_modules里面对应的模块来实现的，因为在开发框架或组件过程中我们只是使用而已，这就是局部垫片的作用。

所以我们在实际的项目中，使用babel-polyfill；在框架、组件库中，使用@babel/plugin-transform-runtime。

**注：所有源代码路径在当前文件夹**

