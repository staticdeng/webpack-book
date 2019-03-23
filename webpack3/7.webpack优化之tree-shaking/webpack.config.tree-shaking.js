const path = require('path');
const webpack = require('webpack');
const globAll = require('glob-all');
const PurifyCSS = require('purifycss-webpack');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        // js tree-shaking
        new webpack.optimize.UglifyJsPlugin(),
        // css tree-shaking去除无用的css
        new PurifyCSS({
            paths: globAll.sync([
                path.resolve(__dirname, './*.html'),
                path.resolve(__dirname, './src/*.js'),
            ])
        })
    ]
}