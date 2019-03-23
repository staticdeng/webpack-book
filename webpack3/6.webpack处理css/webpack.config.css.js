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