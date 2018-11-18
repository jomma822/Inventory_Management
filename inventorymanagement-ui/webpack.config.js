var path = require('path');
var webpack = require('webpack');


module.exports = {
    devtool: 'inline-source-map', 
    entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/only-dev-server',
        './src'
    ],
    output: {
        path: path.join(__dirname, 'public'), 
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.scss', '.css', '.json']
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css?$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                include: /\.json$/, 
                loaders: ["json-loader"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};