var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash'] // 将业务代码和第三方引用包如lodash、react等区分开，用数组形式可指定多个
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        // chunkFilename: '[name].chunk.js'
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