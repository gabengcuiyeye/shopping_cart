var webpack = require('webpack');
module.exports = {
    entry: './src/shoppingCart/public/index.js',
    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    vue: {
        loaders: {
            html: 'pug',
            css: 'style!css!stylus',
        },
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime']
    }
}
