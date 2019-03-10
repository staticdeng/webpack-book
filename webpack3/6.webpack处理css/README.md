# webpack处理css

webpack中处理css的loader有style-loader、css-loader

## css-loader style-loader

css-loader可以让代码中能用import的方式导入css，style-loader处理css放到页面中的操作。

<font color=#6f4e37>安装：</font>

```bash
npm i -D style-loader css-loader
```

下面为webpack.config.css.js处理css的<font color=#6f4e37>配置</font>：

```js
rules: [
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    }
]
```
webpack打包时，写在后面的loader先执行，先执行css-loader处理在js里面import导入的css，然后执行style-loader把css放到页面中的处理。

在js中就可以import导入css：

```js
import './css/base.css';
```

style-loader、css-loader还有很多配置项，不同配置效果不一样，[具体可以看看这个](https://blog.csdn.net/TyrionJ/article/details/79288287)

## 配置less/sass

<font color=#6f4e37>安装：</font>

```bash
npm i -D less-loader less
npm i -D sass-loader node-sass
```

<font color=#6f4e37>配置：</font>

webpack.config.css.js：

```js
const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|le|c)ss$/, // sass/scss/less/css文件
                // 从后到前执行loader
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'less-loader'
                ]
            }
        ]
    }
}
```
在src/app.js里面引入css, less文件测试

```js
import './css/base.css';
import './css/common.less'
```
运行webpack --config webpack.config.css.js，打包后只生成一个js的打包文件：

```
app.bundle.js
```
因为base.css和common.less里面样式都在这个打包文件js里，app.bundle.js在页面中加载后，由于style-loader的作用，这些样式都会自动加载到页面中。

## 提取css

通过style-loader的方式只能将js打包文件中的css加载到页面中，实际上打包文件并没有做到js和css代码的分离，需要提取css的话，wenpack3中需要extract-text-webpack-plugin插件。

<font color=#6f4e37>安装：</font>

```bash
npm i -D extract-text-webpack-plugin
```

<font color=#6f4e37>需要配置两个地方：</font>

在loader里extract-text-webpack-plugin和style-loader结合起来使用，然后继续使用其他loader：

```js
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
...
{
    test: /\.(sa|sc|le|c)ss$/,
    use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader', // 提取后用style-loader把样式加载到页面中
        // 继续使用其他loader处理css
        use: [
            'css-loader',
            'sass-loader',
            'less-loader'
        ]
    })
}
```

<font color=#6f4e37>然后在plugins里面加上配置：</font>

```js
plugins: [
    new ExtractTextWebpackPlugin({
        filename: '[name].bundle.css',
        allChunks: true, // 默认为false，为false不提取动态导入(import()方式)的模块的css文件
    })
]
```
再次打包，css分离成功，生成：

```
app.bundle.js
app.bundle.css
```

## PostCSS

postcss是什么？postcss用JS插件转换CSS的工具，这些插件可以支持变量和混合、未来的CSS语法、内联图像等等。

<font color=#6f4e37>安装：</font>

```
npm i -D postcss postcss-loader postcss-preset-env cssnano
```

<font color=#6f4e37>PostCSS常用插件：</font>

postcss-preset-env： 用下一代CSS书写方式兼容现在浏览器，可以处理比如calc()、css variables等语法兼容。之前用的是postcss-cssnext，被postcss-preset-env取代

autoprefixer：为CSS补全浏览器前缀，由于postcss-preset-env已经内置了相关功能，安装postcss-preset-env，无需再安装autoprefixer

cssnano：压缩css

```css
a {
    display: flex;
}
```
比如上面css代码经过autoprefixer处理自动补全css兼容浏览器的前缀：

```css
a{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
```

<font color=#6f4e37>配置：</font>

postcss-loader放到css-loader之后，less/sass-loader之前：

```js
{
    test: /\.(sa|sc|le|c)ss$/,
    use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader', 
        use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
            'less-loader'
        ]
    })
}
```

然后新建postcss的配置文件postcss.config.js：

```js
module.exports = {
    plugins: {
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
        'cssnano': {}, // 压缩css
    }
}
```
这样postcss就配置成功啦:v:，里面就可以使用postcss语法啦！

