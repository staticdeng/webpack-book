# webpack编译typescript

typescript是js的超集，webpack编译typescript，需要用typescript-loader。

关于typescript学习，可以看一下我的这个文档，非常详细：[传送门](https://github.com/dzfrontend/start-with-typescript)

## 安装 

安装ts-loader：

```
npm i typescript ts-loader@3 --D
```

或者安装awesome-typescript-loader

```
npm i typescript awesome-typescript-loader -D
```

## 配置

typescript在使用过程中，需要配置tsconfig.json，关于配置，可以看官方文档。

将下面代码拷贝到webpack.config.ts.js：

```js
module.exports = {
    entry: {
        'app': './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
}
```
此外，还要配置tsconfig.json：

```json
{
    // 编译选项
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "allowJs": true
    },
    // 包含./src目录所有文件
    "include": [
        "./src/*"
    ],
    "exclude": [
        "/node_modules/"
    ]
}
```

将下面代码拷贝到./src/app.ts：

```ts
interface Cat {
    name: String,
    gender: String
}

function touchCat(cat: Cat) {
    console.log(cat.name, cat.gender);
}

touchCat({
    name: 'Tom',
    gender: 'male'
});
```

命令行运行webpack --config webpack.config.ts.js，生成打包文件app.bundle.js，里面代码为将./src/app.ts编译成js的代码。

## ts类型声明文件

如果我们在项目中只用一些类库如vue、lodashd等，想要webpack打包的时候对使用这些库的api的代码做相应的类型验证，就需要安装类型声明文件。

例如想要lodash支持类型声明，对其api传入参数作验证，及时发现错误，则需要安装lodash的类型声明文件：

```
npm i @types/loash -S
```

安装后无需任何其他配置，在编辑器中使用loash的方法时，传入参数类型不一致，编辑器会进行类型检查报错，并且运行webpack打包，命令行也会报错；当然，也可以选择不安装类库的类型声明文件，这样就不能进行及时排查错误啦！同理，类型声明文件同样适用于react、vue等。
