const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: './dist/'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|le|c)ss$/, // sass/scss/less/css文件
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader', // 提取后用style-loader把样式加载到页面中
                    // 继续使用其他loader处理css
                    use: [
                        'css-loader',
                        'postcss-loader', // postcss-loader放到css-loader之后，less/sass-loader之前
                        'sass-loader',
                        'less-loader'
                    ]
                })
            },
            // 处理图片
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000, // limit参数，代表css中引入的图片小于5k则会自动压缩成base64编码图片存在css中,否则拷贝图片到生产目录并在css中引入图片路径
                            name: '[name][hash:5].[ext]', // 打包图片名，ext为后缀 
                            // 下面为file-loader的配置
                            publicPath: 'assets/', // 图片引入前缀目录
                            outputPath: 'assets/', // 图片处理后目录
                            useRelativePath: true
                        }
                    },
                    // 压缩图片
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            pngquant: {
                                quality: 80
                            }
                        }
                    }
                ]
            },
            // 处理字体文件
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].bundle.css',
            allChunks: true, // 默认为false，为false不提取动态导入(import()方式)的模块的css文件
        })
    ]
}