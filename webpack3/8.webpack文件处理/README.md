# webpack文件处理

webpack中需要处理的文件有：

> 图片处理  
> 字体文件处理  
> 通过script标签引入的第三方js库处理

## 图片处理

图片处理中涉及到：

> css中引入的图片处理  
> 如果图片不需要压缩（如图片太小），就需要base64编码  
> 自动合成雪碧图  
> 压缩图片  

css中处理图片用file-loader或者url-loader,base64编码用url-loader,压缩图片用image-webpack-loader,合成雪碧图用postcss-sprites.

项目中涉及到很多css操作，所以在之前[webpack处理css](../6.webpack处理css)的配置上开始文件处理：

安装：

```bash
# url-loader和file-loader作用一样，这里只安装url-loader
npm i -D file-loader url-loader image-webpack-loader postcss-sprites
```

<font color=#FFA500>处理css中的图片</font>

在webpack.config.file.js的module.rules加上如下配置：

```js
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 5000,
                name: '[name][hash:5].[ext]', // 打包图片名，ext为后缀 
                // 下面为file-loader的配置
                publicPath: 'assets/', // 图片引入前缀目录
                outputPath: 'assets/', // 图片处理后目录
                useRelativePath: true
            }
        }
    ]
}
```

上面`limit: 5000`代表css中引入图片小于5k则会自动压缩成base64编码图片存在css中,否则拷贝图片到生产目录并在css中引入图片路径；还可以通过publicPath、outputPath和useRelativePath配置相关的图片处理目录和引入目录。

<font color=#FFA500>压缩图片</font>

```js
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [
        ...
        {
            loader: 'image-webpack-loader',
            options: {
                pngquant: {
                    quality: 80
                }
            }
        }
    ]
}
```

用`quality`指定图片压缩的质量.

<font color=#FFA500>自动将所有单个背景图合成一张背景图：</font>

在postcss.config.js里面加上postcss-sprites的配置：

```js
module.exports = {
    plugins: {
        ... // 其他postcss插件配置
        'postcss-sprites': {}, // 自动合成雪碧图
    }
}
```

加上以上配置后，平时我们在css中单独引入的背景图片，就会打包成一个雪碧图，并且在css的打包文件中会自动给我们计算出background-position，是不是很方便:heart_eyes:


## 处理字体文件

字体文件处理也主要用file-loader和url-loader.

在配置中加上下面配置就可以处理字体文件，和处理图片类似：

```js
{
    test: /\.(eot|woff2?|ttf|svg)$/,
    use: {
        loader: 'url-loader'
    }
}
```

## 处理第三方js库

当我们想用第三方js库，比如jquery，webpack中可以通过webpack.providePlugin来处理以便我们使用第三方js库，当然也可以不用webpack处理，我们通过script标签引用，然后使用window对象下的第三方js库方法。

```bash
npm i -S jquery
```

安装jquery模块后，在webpack的plugins里面用webpack.providePlugin在每个模块中注入jquery。

```js
plugins: {
    new webpack.ProvidePlugin({
        $: 'jquery', // 找到node_modules里面模块jquery，指定模块为$，页面中就可以直接只用jquery的$
    })
}
```

**注：所有源代码路径在当前文件夹**