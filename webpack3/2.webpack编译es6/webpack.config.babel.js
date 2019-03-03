module.exports = {
    entry: {
        app_babel: './app.babel.js',
        app_polyfill: './app.polyfill.js',
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    // options里的配置可以放到.babelrc文件里
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: '/node_modules/'
            }
        ]
    }
}