module.exports = {
    plugins: {
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
        'cssnano': {}, // 压缩css
        'postcss-sprites': { spritePath: 'dist/assets/' }, // 自动合成雪碧图，spritePath指定雪碧图输出路径(默认根目录)
    }
}