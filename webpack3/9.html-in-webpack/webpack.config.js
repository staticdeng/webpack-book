const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
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
}