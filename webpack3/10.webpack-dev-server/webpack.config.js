
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|le|c)ss$/, // sass/scss/less/css文件
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    devServer: {
        port: 8081,
        hot: true,
        // 可以用proxy代理转发解决跨域
        proxy: {
            // 访问http://localhost:8081/api/*/的所有地址都会转发到https://m.weibo.cn/api/*/接口
            '/api': {
                target: 'https://m.weibo.cn'
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}