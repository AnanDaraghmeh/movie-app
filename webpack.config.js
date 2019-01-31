const path = require('path');

module.exports = {
    entry: {
        index: './src/js/index.js',
        movie: './src/js/movie.js',
        watchlist: './src/js/watchlist.js',
        base: './src/js/base.js'
    },
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: '[name].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-env']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}