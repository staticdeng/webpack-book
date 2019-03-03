module.exports = {
    entry: {
        app_runtime: './app.runtime.js',
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
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    'corejs': 2,
                                    'helpers': true,
                                    'regenerator': true,
                                    'useESModules': true
                                }
                            ]
                        ]
                    }

                },
                exclude: '/node_modules/'
            }
        ]
    }
}