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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // 将entry名为vendor的代码提取为公共代码
            minChunks: Infinity
        }),
        // 需要的话进一步提取runtime
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
}