var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        'pageA': './src/pageA',
        'vendor': ['lodash'] // 指定单独打包的第三方库(和CommonsChunkPlugin结合使用)，可以用数组指定多个
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js', // code splitting的chunk是异步(动态)加载，需要指定chunkFilename(具体可以了解和filename的区别)
        publicPath: './dist/' // 动态加载的路径
    },
    plugins: [
        // 为异步公共加载的代码打一个的包
        new webpack.optimize.CommonsChunkPlugin({
            async: 'async-common', // 异步公共的代码
            children: true, // 要加上children，会从入口的子依赖开始找
            minChunks: 2 // 出现2次或以上相同代码就打包
        }),
        // 为第三方库和和manifest(webpack runtime)单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
    ]
}